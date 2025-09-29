<div id="counter" data-target="1500">0</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const counter = document.getElementById("counter");
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const speed = 20; // smaller = faster

  const updateCounter = () => {
    if (count < target) {
      count += Math.ceil(target / 100); // step value
      counter.textContent = count.toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target.toLocaleString(); // final fix
    }
  };

  updateCounter();
});
</script>
