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
