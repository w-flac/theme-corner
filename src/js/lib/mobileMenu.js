/**
 * 移动端菜单按钮动画切换
 */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("mobile-menu-toggle");
  let menuIcon = document.getElementById("mobile-menu-icon");
  let isMenuOpen = false;

  if (!menuToggle || !menuIcon) return;

  const staticMenuIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19"/></svg>`;

  const menuIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19;M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19"/></path></svg>`;

  const xIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19;M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19"/></path></svg>`;

  const initSVG = () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = staticMenuIconSVG;
    const newSVG = tempDiv.firstElementChild;
    newSVG.id = "mobile-menu-icon";
    newSVG.className = "h-6 w-6";
    menuIcon.parentNode.replaceChild(newSVG, menuIcon);
    menuIcon = document.getElementById("mobile-menu-icon");
  };

  initSVG();

  menuToggle.addEventListener("click", () => {
    // 切换状态
    isMenuOpen = !isMenuOpen;

    const newSVGHTML = isMenuOpen ? menuIconSVG : xIconSVG;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = newSVGHTML;
    const newSVG = tempDiv.firstElementChild;

    newSVG.id = "mobile-menu-icon";
    newSVG.className = "h-6 w-6";

    menuIcon.parentNode.replaceChild(newSVG, menuIcon);

    menuIcon = document.getElementById("mobile-menu-icon");

    if (menuIcon) {
      menuIcon.offsetHeight;
    }
  });
});
