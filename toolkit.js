// toolkit.js

(function () {
  function truncateText() {
    document.querySelectorAll("[data-truncate]").forEach(el => {
      const max = parseInt(el.getAttribute("data-truncate"), 10) || 100;
      const original = el.textContent.trim();

      if (original.length > max) {
        el.textContent = original.slice(0, max) + "...";
      }
    });
  }

  // Wait for Webflow and the page to finish loading
  window.addEventListener("load", () => {
    truncateText();
    // 🔌 Add other utilities here
  });
})();
