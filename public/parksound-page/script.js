const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Live clock in the floating nav (mirrors the portfolio home page).
(function () {
  const el = document.getElementById("floating-nav-time");
  if (!el) return;
  const tick = () => {
    el.textContent = new Date().toLocaleTimeString("en-US", { hour12: false });
  };
  tick();
  setInterval(tick, 1000);
})();
