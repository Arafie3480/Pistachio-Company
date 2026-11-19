(() => {
  const header = document.querySelector("[data-gdf-header]");
  const menuBtn = document.querySelector("[data-gdf-menu]");
  const drawer = document.querySelector("[data-gdf-drawer]");
  const langSelects = document.querySelectorAll("[data-gdf-lang]");

  const onScroll = () => {
    if (!header) return;
    const home = header.getAttribute("data-home") === "1";
    const open = drawer?.classList.contains("is-open");
    const solid = !home || window.scrollY > 24 || open;
    header.classList.toggle("is-solid", solid);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", () => {
      const open = !drawer.classList.contains("is-open");
      drawer.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute(
        "aria-label",
        open
          ? menuBtn.getAttribute("data-label-close") || "Close menu"
          : menuBtn.getAttribute("data-label-open") || "Open menu"
      );
      document.body.style.overflow = open ? "hidden" : "";
      onScroll();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) {
        drawer.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        menuBtn.focus();
        onScroll();
      }
    });
  }

  langSelects.forEach((langSelect) => {
    langSelect.addEventListener("change", () => {
      const url = langSelect.value;
      if (url) window.location.href = url;
    });
  });
})();
