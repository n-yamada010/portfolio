const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".work-card");
const worksTitle = document.querySelector("#worksTitle");

const categoryTitles = {
  all: "ALL DESIGN",
  web: "WEB DESIGN",
  banner: "BANNER DESIGN",
  other: "OTHER DESIGN",
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    cards.forEach((card) => {
      const isVisible = selectedCategory === "all" || card.dataset.category === selectedCategory;
      card.hidden = !isVisible;
    });

    worksTitle.textContent = categoryTitles[selectedCategory];
  });
});

(() => {
  const header = document.querySelector("#mainNav");
  const menuButton = header?.querySelector(".header__menu-button");
  const backdrop = header?.querySelector(".header__backdrop");
  const menu = header?.querySelector(".header__menu");
  const menuLinks = [...(menu?.querySelectorAll("a") || [])];
  const desktopMedia = window.matchMedia("(min-width: 768px)");

  if (!header || !menuButton || !backdrop || !menu) return;

  const setMenuState = (isOpen, returnFocus = false) => {
    header.classList.toggle("is-menu-open", isOpen);
    document.body.classList.toggle("is-menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");

    if (!isOpen && returnFocus) {
      menuButton.focus({ preventScroll: true });
    }
  };

  menuButton.addEventListener("click", () => {
    setMenuState(!header.classList.contains("is-menu-open"));
  });

  backdrop.addEventListener("click", () => {
    setMenuState(false, true);
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.classList.contains("is-menu-open")) {
      setMenuState(false, true);
    }
  });

  const closeMenuOnDesktop = (event) => {
    if (event.matches) setMenuState(false);
  };

  if (desktopMedia.addEventListener) {
    desktopMedia.addEventListener("change", closeMenuOnDesktop);
  } else {
    desktopMedia.addListener(closeMenuOnDesktop);
  }
})();
