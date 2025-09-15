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
        // Remove any old error text directly tied to this input
        const nextEl = field.nextElementSibling;
        if (nextEl && nextEl.classList.contains("error-text")) {
          nextEl.remove();
        }

        if (!field.value.trim()) {
          hasError = true;

          // Create error message element
          const errorMsg = document.createElement("div");
          errorMsg.classList.add("error-text");
          errorMsg.textContent = "Please fill out required form fields.";

          // ✅ Insert directly after the input itself
          field.insertAdjacentElement("afterend", errorMsg);

          console.log("Error added for field:", field.name || field.id || field.type);
        }
      });

      if (hasError) {
        e.preventDefault();
        e.stopImmediatePropagation(); // Stop Webflow AJAX
      }
    });
  });
}


// ===== Init All Utilities =====
window.addEventListener("load", () => {
  limitChars();
  requiredFieldErrors();
});
