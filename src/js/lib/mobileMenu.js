/**
 * 移动端菜单按钮动画切换和菜单显示控制
 */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("mobile-btn");
  const menuPanel = document.getElementById("mobile-menu-panel");
  const iconBar = document.getElementById("icon-bar");
  const iconClose = document.getElementById("icon-close");

  if (!menuToggle) return;

  const openMenu = () => {
    // 禁止body滚动
    document.body.classList.add("overflow-hidden");

    menuPanel.classList.remove("pointer-events-none");
    menuPanel.classList.add("pointer-events-auto");
    menuPanel.removeAttribute("aria-hidden");

    menuPanel.offsetHeight;

    menuPanel.classList.remove("opacity-0", "scale-95");
    menuPanel.classList.add("opacity-100", "scale-100");

    const hideMenu = (event) => {
      if (!menuToggle.contains(event.target) && !menuPanel.contains(event.target)) {
        closeMenu();
        document.removeEventListener("click", hideMenu);
      }
    };
    setTimeout(() => {
      document.addEventListener("click", hideMenu);
    }, 100);
  };

  const closeMenu = () => {
    // 恢复body滚动
    document.body.classList.remove("overflow-hidden");

    menuPanel.classList.remove("opacity-100", "scale-100");
    menuPanel.classList.add("opacity-0", "scale-95");

    setTimeout(() => {
      menuPanel.classList.remove("pointer-events-auto");
      menuPanel.classList.add("pointer-events-none");
      menuPanel.setAttribute("aria-hidden", "true");
    }, 200); // 匹配动画时间
  };

  menuToggle.addEventListener("click", () => {
    const isHidden = menuPanel.classList.contains("pointer-events-none");

    if (isHidden) {
      // 打开菜单：立即显示X图标
      iconBar.classList.add("hidden");
      iconClose.classList.remove("hidden");
      openMenu();
    } else {
      // 关闭菜单：显示菜单图标
      iconBar.classList.remove("hidden");
      iconClose.classList.add("hidden");
      closeMenu();
    }
  });
});
