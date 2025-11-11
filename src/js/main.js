// 防止闪屏：在 CSS 加载前设置主题（必须在最顶部立即执行）
(function () {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldUseDark = savedTheme === "dark" || (savedTheme === null && prefersDark);
  if (shouldUseDark) {
    document.documentElement.setAttribute("data-color-scheme", "dark");
  } else {
    document.documentElement.removeAttribute("data-color-scheme");
  }
})();

console.log("📦 [dev-build] 正在构建 main.js...");

import "./lib/themeToggle.js";
import "./lib/mobileMenu.js";
import "./lib/shareModal.js";
import "./lib/upvote.js";

function toggleMenu(button) {
  const menu = document.getElementById("children-" + button.id);
  if (!menu) return;

  const isHidden = menu.classList.contains("pointer-events-none");

  if (isHidden) {
    // 显示菜单
    menu.classList.remove("pointer-events-none", "opacity-0", "translate-y-1");
    menu.classList.add("pointer-events-auto", "opacity-100", "translate-y-0");
    menu.removeAttribute("aria-hidden");

    // 点击其他地方隐藏菜单
    const hideMenu = (event) => {
      if (!button.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.add("pointer-events-none", "opacity-0", "translate-y-1");
        menu.classList.remove("pointer-events-auto", "opacity-100", "translate-y-0");
        menu.setAttribute("aria-hidden", "true");
        document.removeEventListener("click", hideMenu); // 解绑事件
      }
    };
    document.addEventListener("click", hideMenu);
  } else {
    // 隐藏菜单
    menu.classList.add("pointer-events-none", "opacity-0", "translate-y-1");
    menu.classList.remove("pointer-events-auto", "opacity-100", "translate-y-0");
    menu.setAttribute("aria-hidden", "true");
  }
}
