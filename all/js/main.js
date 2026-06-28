const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".work-card");
const worksTitle = document.querySelector("#worksTitle");
const menuButton = document.querySelector(".header__menu-button");
const menu = document.querySelector(".header__menu");

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

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "メニューを開く");
  menu.classList.remove("is-open");
  document.body.classList.remove("is-menu-open");
}

menuButton.addEventListener("click", () => {
  const shouldOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(shouldOpen));
  menuButton.setAttribute("aria-label", shouldOpen ? "メニューを閉じる" : "メニューを開く");
  menu.classList.toggle("is-open", shouldOpen);
  document.body.classList.toggle("is-menu-open", shouldOpen);
});

menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth >= 480) closeMenu();
});
