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

function inlineRequiredErrors() {
  document.querySelectorAll("[required]").forEach(field => {
    // Create a reusable function to show/hide error
    const validate = () => {
      // Remove any old error
      const nextEl = field.nextElementSibling;
      if (nextEl && nextEl.classList.contains("error-text")) {
        nextEl.remove();
      }

      // Check if empty
      if (!field.value.trim()) {
        const errorMsg = document.createElement("div");
        errorMsg.classList.add("error-text");
        errorMsg.textContent = "Please fill out this field.";
        field.insertAdjacentElement("afterend", errorMsg);
        field.classList.add("field-error");
      } else {
        field.classList.remove("field-error");
      }
    };

    // Show error when user leaves the field
    field.addEventListener("blur", validate);

    // Clear error live as they type
    field.addEventListener("input", () => {
      const nextEl = field.nextElementSibling;
      if (nextEl && nextEl.classList.contains("error-text")) {
        nextEl.remove();
      }
      field.classList.remove("field-error");
    });
  });
}

// ===== Init All Utilities =====
window.addEventListener("load", () => {
  limitChars();
  inlineRequiredErrors();
});
