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

    // Override Webflow's AJAX submit by using "onsubmit"
    const form = emailInput.closest("form");
    if (form) {
      form.addEventListener("submit", (e) => {
        const value = emailInput.value.trim().toLowerCase();
        const domain = value.split("@")[1] || "";

        if (blockedDomains.includes(domain)) {
          e.preventDefault();              // block browser default
          e.stopImmediatePropagation();    // block Webflow handler
          errorMsg.style.display = "block";
          return false;
        } else {
          errorMsg.style.display = "none";
        }
      }, true); // 👈 useCapture = true ensures this runs before Webflow's handler
    }
  });
}


// ===== Init All Utilities =====
window.addEventListener("load", () => {
  limitChars();
  blockEmails();
});
