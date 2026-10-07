// Screenshot pipeline: crop, blur personal data, export WebP into public/work/.
// Originals stay in source-images/ (gitignored) so unblurred data never deploys. Run: npm run images
import { mkdir, readFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import sharp from 'sharp'

const { images } = JSON.parse(await readFile('scripts/images.json', 'utf8'))

for (const img of images) {
  let buf = await readFile(`source-images/${img.src}`)
  if (img.crop) {
    const [left, top, width, height] = img.crop
    buf = await sharp(buf).extract({ left, top, width, height }).toBuffer()
  }
  if (img.blur?.length) {
    const layers = await Promise.all(
      img.blur.map(async ([left, top, width, height]) => ({
        // Pixelate then blur: unreadable even when sharpened, and soft enough to look intentional
        input: await sharp(buf).extract({ left, top, width, height })
          .resize(Math.max(1, Math.round(width / 24)), Math.max(1, Math.round(height / 24)))
          .resize(width, height, { kernel: 'nearest' }).blur(10).toBuffer(),
        left, top,
      })),
    )
    buf = await sharp(buf).composite(layers).toBuffer()
  }
  for (const w of img.widths) {
    const file = `public/work/${img.out}-${w}.webp`
    await mkdir(dirname(file), { recursive: true })
    await sharp(buf).resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(file)
  }
  const { width, height } = await sharp(buf).metadata()
  console.log(`${img.out}  ${width}x${height}  ${img.blur?.length ?? 0} blurred`)
}
