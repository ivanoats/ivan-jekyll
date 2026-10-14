// Verdant theme runtime. Load this synchronously in <head>, before the
// stylesheet, so the stored preference is applied before first paint and there
// is no flash of the wrong theme.
//
// The preset's globalCss keys off data-theme-override, so without this script a
// page gets prefers-color-scheme only and an explicit Light/Dark choice cannot
// take effect. See docs/INSTALL.md.
//
// The constants below mirror src/theme.mjs; tests/theme-contract.test.mjs
// fails the build if the two ever drift apart.
(function () {
  const STORAGE_KEY = "verdant-theme-preference";
  const OVERRIDE_ATTR = "data-theme-override";
  const PREFERENCE_ATTR = "data-theme-preference";
  const RESOLVED_ATTR = "data-theme-resolved";
  const CONTROL_NAME = "theme-preference";
  const THEME_COLOR = { light: "#faf8f3", dark: "#15140f" };
  const RADIO_SELECTOR = `input[name="${CONTROL_NAME}"]`;
  const media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  // Declared before the functions that close over it: applyPreference runs
  // immediately below, and the listeners read it long after.
  let currentPreference = "system";

  function systemTheme() {
    return media?.matches ? "dark" : "light";
  }

  function readPreference() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      // Private mode or blocked storage: fall through to the system default.
    }
    return "system";
  }

  function persistPreference(value) {
    try {
      if (value === "system") window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage is unavailable; the choice still applies for this page view.
    }
  }

  // Browser chrome follows the resolved theme: an explicit choice pins every
  // theme-color meta to that theme; System restores the media-query fallbacks.
  function syncThemeColor(value, resolved) {
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      if (!meta.hasAttribute("data-media")) {
        meta.setAttribute("data-media", meta.getAttribute("media") || "");
        meta.setAttribute("data-content", meta.getAttribute("content") || "");
      }
      if (value === "system") {
        meta.setAttribute("media", meta.getAttribute("data-media"));
        meta.setAttribute("content", meta.getAttribute("data-content"));
      } else {
        meta.removeAttribute("media");
        meta.setAttribute("content", THEME_COLOR[resolved]);
      }
    }
  }

  function applyPreference(value) {
    const resolved = value === "system" ? systemTheme() : value;
    const root = document.documentElement;
    root.setAttribute(PREFERENCE_ATTR, value);
    root.setAttribute(RESOLVED_ATTR, resolved);
    if (value === "system") root.removeAttribute(OVERRIDE_ATTR);
    else root.setAttribute(OVERRIDE_ATTR, value);
    syncThemeColor(value, resolved);
    return resolved;
  }

  function syncControls() {
    for (const radio of document.querySelectorAll(RADIO_SELECTOR)) {
      radio.checked = radio.value === currentPreference;
    }
  }

  currentPreference = readPreference();
  applyPreference(currentPreference);

  // Declared once rather than per radio: every control shares one handler, and
  // the chosen value comes from the event, not from the loop.
  function handlePreferenceChange(event) {
    currentPreference = event.target.value;
    persistPreference(currentPreference);
    applyPreference(currentPreference);
  }

  function initializeControls() {
    syncControls();
    for (const radio of document.querySelectorAll(RADIO_SELECTOR)) {
      radio.addEventListener("change", handlePreferenceChange);
    }
  }

  // Async or dynamically imported scripts may run after DOMContentLoaded.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeControls, { once: true });
  } else {
    initializeControls();
  }

  // A page restored from the back/forward cache keeps its old DOM state:
  // re-read the stored choice in case it changed on another page meanwhile.
  window.addEventListener("pageshow", function (event) {
    if (!event.persisted) return;
    currentPreference = readPreference();
    applyPreference(currentPreference);
    syncControls();
  });

  if (media) {
    const onSystemChange = function () {
      if (currentPreference === "system") applyPreference("system");
    };
    if (typeof media.addEventListener === "function") media.addEventListener("change", onSystemChange);
    else if (typeof media.addListener === "function") media.addListener(onSystemChange);
  }
})();
