/**
 * 主题切换器 - 使用 Tailwind class，支持持续点击
 */

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const moonIcon = document.getElementById("theme-dark");
  const sunIcon = document.getElementById("theme-light");
  const toggle = moonIcon?.closest("button") || sunIcon?.closest("button");

  if (!html || !toggle || !moonIcon || !sunIcon) return;

  // 获取当前主题
  const getCurrentTheme = () => html.getAttribute("data-color-scheme") === "dark";

  // 设置主题
  const setTheme = (isDark) => {
    if (isDark) {
      html.setAttribute("data-color-scheme", "dark");
    } else {
      html.removeAttribute("data-color-scheme");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // 初始化图标状态（无动画）
  const savedTheme = localStorage.getItem("theme");
  const initialDark = savedTheme === "dark" || getCurrentTheme();

  // 设置初始图标显示
  if (initialDark) {
    // 暗色模式：显示月亮（黄色）
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
    moonIcon.classList.remove("opacity-0", "rotate-90", "-rotate-90", "scale-50");
    moonIcon.classList.add("opacity-100", "rotate-0", "scale-100");
  } else {
    // 亮色模式：显示太阳
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
    sunIcon.classList.remove("opacity-0", "rotate-90", "-rotate-90", "scale-50");
    sunIcon.classList.add("opacity-100", "rotate-0", "scale-100");
  }

  setTheme(initialDark);

  // 点击切换（移除防抖，支持持续点击）
  toggle.addEventListener("click", () => {
    const currentTheme = getCurrentTheme();
    const newTheme = !currentTheme;

    setTheme(newTheme);

    // 获取当前图标元素（每次重新获取，因为可能被替换）
    const currentSunIcon = document.getElementById("theme-light");
    const currentMoonIcon = document.getElementById("theme-dark");

    // 动画切换图标
    if (newTheme) {
      // 切换到暗色：太阳淡出旋转，月亮淡入旋转（黄色）
      currentSunIcon.classList.remove("opacity-100", "rotate-0", "scale-100");
      currentSunIcon.classList.add("opacity-0", "-rotate-90", "scale-50");

      setTimeout(() => {
        currentSunIcon.classList.add("hidden");
        currentMoonIcon.classList.remove("hidden");

        // 强制重排
        currentMoonIcon.offsetHeight;

        // 从初始状态开始动画
        currentMoonIcon.classList.remove("opacity-100", "rotate-0", "scale-100");
        currentMoonIcon.classList.add("opacity-0", "rotate-90", "scale-50");

        // 触发淡入动画
        requestAnimationFrame(() => {
          currentMoonIcon.classList.remove("opacity-0", "rotate-90", "scale-50");
          currentMoonIcon.classList.add("opacity-100", "rotate-0", "scale-100");
        });
      }, 150);
    } else {
      // 切换到亮色：月亮淡出旋转，太阳淡入旋转
      currentMoonIcon.classList.remove("opacity-100", "rotate-0", "scale-100");
      currentMoonIcon.classList.add("opacity-0", "rotate-90", "scale-50");

      setTimeout(() => {
        currentMoonIcon.classList.add("hidden");
        currentSunIcon.classList.remove("hidden");

        // 重置太阳 SVG 动画：克隆并替换元素以重新触发动画
        const sunIconClone = currentSunIcon.cloneNode(true);
        currentSunIcon.parentNode.replaceChild(sunIconClone, currentSunIcon);
        const newSunIcon = document.getElementById("theme-light");

        // 强制重排
        newSunIcon.offsetHeight;

        // 从初始状态开始动画
        newSunIcon.classList.remove("opacity-100", "rotate-0", "scale-100");
        newSunIcon.classList.add("opacity-0", "-rotate-90", "scale-50");

        // 触发淡入动画
        requestAnimationFrame(() => {
          newSunIcon.classList.remove("opacity-0", "-rotate-90", "scale-50");
          newSunIcon.classList.add("opacity-100", "rotate-0", "scale-100");
        });
      }, 150);
    }
  });
});
