// ===== Character Limiter =====
function limitChars() {
  document.querySelectorAll('[data-mytool="limit-chars"]').forEach(el => {
    const max = parseInt(el.getAttribute("data-mytool-max"), 10);
    el.addEventListener("input", () => {
      if (el.value.length > max) {
        el.value = el.value.slice(0, max);
      }
    });
  });
}

function requiredFieldErrors() {
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", (e) => {
      let hasError = false;

      form.querySelectorAll("[required]").forEach(field => {
        // Remove any old error message before re-checking
        const existingError = field.parentNode.querySelector(".error-text");
        if (existingError) existingError.remove();

        if (!field.value.trim()) {
          hasError = true;

          // Create new error element
          const errorMsg = document.createElement("div");
          errorMsg.classList.add("error-text");
          errorMsg.textContent = "Please fill out required form fields.";

          // Place it *right after the input field*
          field.insertAdjacentElement("afterend", errorMsg);
        }
      });

      if (hasError) {
        e.preventDefault();
        e.stopImmediatePropagation(); // stop Webflow AJAX submit
      }
    });
  });
}


// ===== Init All Utilities =====
window.addEventListener("load", () => {
  limitChars();
  requiredFieldErrors();
});
