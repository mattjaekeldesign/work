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

// ===== Email Blocker Utility (Webflow-safe) =====
function liveBlockEmails() {
  document.querySelectorAll('input[type="email"][data-blocked-emails]').forEach(emailInput => {
    const blockedDomains = emailInput
      .getAttribute("data-blocked-emails")
      .split(",")
      .map(d => d.trim().toLowerCase());

    // Create error message element
    let errorMsg = emailInput.nextElementSibling;
    if (!errorMsg || !errorMsg.classList.contains("email-block-error")) {
      errorMsg = document.createElement("div");
      errorMsg.classList.add("email-block-error");
      errorMsg.style.color = "red";
      errorMsg.style.fontSize = "0.875rem";
      errorMsg.style.marginTop = "0.25rem";
      errorMsg.style.display = "none";
      errorMsg.textContent = "Please use a company email address.";
      emailInput.insertAdjacentElement("afterend", errorMsg);
    }

    const form = emailInput.closest("form");
    if (!form) return;
    const submitBtn = form.querySelector('[type="submit"]');

    // Validation function
    const validate = () => {
      const value = emailInput.value.trim().toLowerCase();
      const domain = value.split("@")[1] || "";

      if (blockedDomains.includes(domain)) {
        errorMsg.style.display = "block";
        if (submitBtn) submitBtn.disabled = true; // 🔒 prevent submission
      } else {
        errorMsg.style.display = "none";
        if (submitBtn) submitBtn.disabled = false; // ✅ re-enable
      }
    };

    // Run validation while typing and on leaving field
    emailInput.addEventListener("input", validate);
    emailInput.addEventListener("blur", validate);
  });
}

// ===== Init All Utilities =====
window.addEventListener("load", () => {
  limitChars();
  liveBlockEmails();
});
