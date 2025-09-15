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

// ===== Email Blocker Utility =====
function blockEmails() {
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

    // Validate on submit
    emailInput.closest("form").addEventListener("submit", (e) => {
      const value = emailInput.value.trim().toLowerCase();
      const domain = value.split("@")[1] || "";

      if (blockedDomains.includes(domain)) {
        e.preventDefault();
        e.stopImmediatePropagation(); // 🚫 stops Webflow from continuing AJAX submit
        errorMsg.style.display = "block";
      } else {
        errorMsg.style.display = "none";
      }
    });
  });
}

// ===== Init All Utilities =====
window.addEventListener("load", () => {
  limitChars();
  blockEmails();
});
