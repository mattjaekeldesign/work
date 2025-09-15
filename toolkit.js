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
        const existingError = field.parentNode.querySelector(".error-text");

        if (!field.value.trim()) {
          hasError = true;

          // Add error text if not already there
          if (!existingError) {
            const errorMsg = document.createElement("div");
            errorMsg.classList.add("error-text");
            errorMsg.textContent = "Please fill out required form fields.";
            field.insertAdjacentElement("afterend", errorMsg);
          }
        } else {
          // Remove error text if field is valid
          if (existingError) existingError.remove();
        }
      });

      if (hasError) {
        e.preventDefault();
        e.stopImmediatePropagation(); // stop Webflow’s AJAX submit
      }
    });
  });
}


// ===== Init All Utilities =====
window.addEventListener("load", () => {
  limitChars();
  requiredFieldErrors();
});
