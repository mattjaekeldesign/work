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

function blockEmailDomains() {
  document.querySelectorAll('input[type="email"][data-blocked-emails]').forEach(emailInput => {
    const blockedDomains = emailInput
      .getAttribute("data-blocked-emails")
      .split(",")
      .map(d => d.trim().toLowerCase());

    // Validate function
    const validate = () => {
      // Remove old error
      const nextEl = emailInput.nextElementSibling;
      if (nextEl && nextEl.classList.contains("error-text")) {
        nextEl.remove();
      }

      const value = emailInput.value.trim().toLowerCase();
      const domain = value.split("@")[1] || "";

      if (blockedDomains.includes(domain)) {
        const errorMsg = document.createElement("div");
        errorMsg.classList.add("error-text");
        errorMsg.textContent = "Please use a company email address.";
        emailInput.insertAdjacentElement("afterend", errorMsg);
        emailInput.classList.add("field-error");
      } else {
        emailInput.classList.remove("field-error");
      }
    };

    // Check while typing and when leaving the field
    emailInput.addEventListener("input", validate);
    emailInput.addEventListener("blur", validate);
  });
}

// ===== Init All Utilities =====
window.addEventListener("load", () => {
  limitChars();
  blockEmailDomains();
});
