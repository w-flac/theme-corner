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
import "./lib/upvote.js";
