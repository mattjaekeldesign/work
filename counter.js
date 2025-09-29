// <div class="counter" data-target="7500">0</div>
<script>
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const speed = 20; // lower = faster
    
    const updateCounter = () => {
      if (count < target) {
        count += Math.ceil(target / 100);
        counter.textContent = count.toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    
    updateCounter();
  });
});
</script>
