(function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const layers = [...document.querySelectorAll("[data-parallax]")];
  if (reduce || !layers.length || innerWidth <= 800) return;
  let ticking = false;
  const paint = () => {
    const y = scrollY;
    for (const el of layers) {
      const parent = el.parentElement;
      const passed = y - (parent.getBoundingClientRect().top + y);
      el.style.transform = "translate3d(0," + (passed * Number(el.dataset.parallax)).toFixed(2) + "px,0)";
    }
    ticking = false;
  };
  addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(paint);
      ticking = true;
    }
  }, { passive: true });
  paint();
})();
