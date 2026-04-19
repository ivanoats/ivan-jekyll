// PurgeCSS scans static HTML to decide which CSS classes to keep.
// Classes the minimal-mistakes theme's JavaScript injects at runtime
// (assets/js/_main.js) are invisible to the scan and must be listed here,
// or they'll be stripped and the styles won't apply when the JS runs.
module.exports = {
  content: ["./_site/**/*.html"],
  css: ["./_site/assets/css/main.css"],
  safelist: {
    standard: [
      // Screen-reader-only spans inserted into heading anchors and the code-block
      // copy button. Without this, "Permalink" and "Copy code" text render
      // visible next to every heading and pre block.
      "sr-only",
      "sr-only-focusable",
      "screen-reader-text",
      "visually-hidden",
      "screen-reader-shortcut",
      // Classes on theme JS-injected elements.
      "header-link",
      "clipboard-helper",
      "clipboard-copy-button",
      "copied",
      // Dark/light toggle button injected by _includes/head/custom.html.
      "theme-toggle",
    ],
  },
};
