// Applies a saved light theme before first paint, so the page never flashes dark first. A file, not an inline
// script, because the Content-Security-Policy (netlify.toml) allows scripts from this origin only.
// The switch itself lives in src/components/theme.ts.
try {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.dataset.theme = 'light'
    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#f1f2f4')
  }
} catch (e) {
  // storage blocked: stay on the default theme
}
