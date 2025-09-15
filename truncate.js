// truncate.js
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-truncate]").forEach(el => {
    const max = parseInt(el.getAttribute("data-truncate"), 10) || 100;
    const original = el.textContent.trim();

    if (original.length > max) {
      el.textContent = original.slice(0, max) + "...";
    }
  });
});
