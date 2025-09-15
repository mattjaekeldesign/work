// 🔥 Truncate
<input type="text" data-mytool="limit-chars" data-mytool-max="24">
<script>
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('[data-mytool="limit-chars"]').forEach(el => {
      const max = parseInt(el.getAttribute("data-mytool-max"), 10);
      el.addEventListener("input", () => {
        if (el.value.length > max) {
          el.value = el.value.slice(0, max);
        }
      });
    });
  });
</script>

// ===== Email Blocker Utility =====
<script>
function blockEmails() {
  // Look for any email inputs with the data-blocked-emails attribute
  document.querySelectorAll('input[type="email"][data-blocked-emails]').forEach(emailInput => {
    const blockedDomains = emailInput
      .getAttribute("data-blocked-emails")
      .split(",")
      .map(d => d.trim().toLowerCase());

    // Create error message element
    const errorMsg = document.createElement("div");
    errorMsg.style.color = "red";
    errorMsg.style.fontSize = "0.875rem";
    errorMsg.style.marginTop = "0.25rem";
    errorMsg.style.display = "none";
    errorMsg.textContent = "Please use a company email address.";
    emailInput.insertAdjacentElement("afterend", errorMsg);

    // Prevent form submit if blocked domain is used
    emailInput.closest("form").addEventListener("submit", (e) => {
      const value = emailInput.value.trim().toLowerCase();
      const domain = value.split("@")[1] || "";

      if (blockedDomains.includes(domain)) {
        e.preventDefault();
        errorMsg.style.display = "block";
      } else {
        errorMsg.style.display = "none";
      }
    });
  });
}
  </script>
