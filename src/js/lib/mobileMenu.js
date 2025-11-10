/**
 * 移动端菜单按钮动画切换
 */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("mobile-menu-toggle");
  let menuIcon = document.getElementById("mobile-menu-icon");
  let isMenuOpen = false; // false = 三条横线, true = X 图标

  if (!menuToggle || !menuIcon) return;

  // 静态三条横线 SVG（初始状态，无动画）
  const staticMenuIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19"/></svg>`;

  // 三条横线 SVG（点击时）- 从三条横线变成 X
  const menuIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19;M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19"/></path></svg>`;

  // X 图标 SVG（点击时）- 从 X 变成三条横线
  const xIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19;M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19"/></path></svg>`;

  // 初始化 SVG（设置初始的静态三条横线，无动画）
  const initSVG = () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = staticMenuIconSVG;
    const newSVG = tempDiv.firstElementChild;
    newSVG.id = "mobile-menu-icon";
    newSVG.className = "h-6 w-6";
    menuIcon.parentNode.replaceChild(newSVG, menuIcon);
    menuIcon = document.getElementById("mobile-menu-icon");
  };

  // 页面加载时初始化（静态图标，无动画）
  initSVG();

  menuToggle.addEventListener("click", () => {
    // 切换状态
    isMenuOpen = !isMenuOpen;
    
    // 根据状态设置完整的 SVG
    // isMenuOpen = true 时：从横线变成 X（menuIconSVG）
    // isMenuOpen = false 时：从 X 变成横线（xIconSVG）
    const newSVGHTML = isMenuOpen ? menuIconSVG : xIconSVG;
    
    // 创建临时容器来解析 SVG
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = newSVGHTML;
    const newSVG = tempDiv.firstElementChild;
    
    // 设置属性
    newSVG.id = "mobile-menu-icon";
    newSVG.className = "h-6 w-6";
    
    // 替换旧的 SVG
    menuIcon.parentNode.replaceChild(newSVG, menuIcon);
    
    // 更新引用
    menuIcon = document.getElementById("mobile-menu-icon");
    
    // 强制重排以触发动画
    if (menuIcon) {
      menuIcon.offsetHeight;
    }
  });
});

