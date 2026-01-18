document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const moonIcon = document.getElementById("theme-dark");
  const sunIcon = document.getElementById("theme-light");
  const toggle = moonIcon?.closest("button") || sunIcon?.closest("button");

  if (!html || !toggle || !moonIcon || !sunIcon) return;

  const getCurrentTheme = () => html.getAttribute("data-color-scheme") === "dark";

  const setTheme = (isDark) => {
    if (isDark) {
      html.setAttribute("data-color-scheme", "dark");
    } else {
      html.removeAttribute("data-color-scheme");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const savedTheme = localStorage.getItem("theme");
  const initialDark = savedTheme === "dark" || getCurrentTheme();

  // 设置初始图标显示
  if (initialDark) {
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
    moonIcon.classList.remove("opacity-0", "rotate-90", "-rotate-90", "scale-50");
    moonIcon.classList.add("opacity-100", "rotate-0", "scale-100");
  } else {
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
    sunIcon.classList.remove("opacity-0", "rotate-90", "-rotate-90", "scale-50");
    sunIcon.classList.add("opacity-100", "rotate-0", "scale-100");
  }

  setTheme(initialDark);

  toggle.addEventListener("click", () => {
    const currentTheme = getCurrentTheme();
    const newTheme = !currentTheme;

    setTheme(newTheme);

    const currentSunIcon = document.getElementById("theme-light");
    const currentMoonIcon = document.getElementById("theme-dark");

    // 动画切换图标
    if (newTheme) {
      currentSunIcon.classList.remove("opacity-100", "rotate-0", "scale-100");
      currentSunIcon.classList.add("opacity-0", "-rotate-90", "scale-50");

      setTimeout(() => {
        currentSunIcon.classList.add("hidden");
        currentMoonIcon.classList.remove("hidden");

        const moonClone = currentMoonIcon.cloneNode(true);
        currentMoonIcon.parentNode.replaceChild(moonClone, currentMoonIcon);
        const newMoonIcon = document.getElementById("theme-dark");

        newMoonIcon.classList.add("opacity-0", "rotate-90", "scale-50", "transition-all", "duration-300", "ease-in-out");

        newMoonIcon.offsetHeight;

        newMoonIcon.classList.remove("opacity-0", "rotate-90", "scale-50");
        newMoonIcon.classList.add("opacity-100", "rotate-0", "scale-100");
      }, 150);
    } else {
      currentMoonIcon.classList.remove("opacity-100", "rotate-0", "scale-100");
      currentMoonIcon.classList.add("opacity-0", "rotate-90", "scale-50");

      setTimeout(() => {
        currentMoonIcon.classList.add("hidden");
        currentSunIcon.classList.remove("hidden");

        const sunIconClone = currentSunIcon.cloneNode(true);
        currentSunIcon.parentNode.replaceChild(sunIconClone, currentSunIcon);
        const newSunIcon = document.getElementById("theme-light");

        newSunIcon.offsetHeight;

        newSunIcon.classList.remove("opacity-100", "rotate-0", "scale-100");
        newSunIcon.classList.add("opacity-0", "-rotate-90", "scale-50");

        requestAnimationFrame(() => {
          newSunIcon.classList.remove("opacity-0", "-rotate-90", "scale-50");
          newSunIcon.classList.add("opacity-100", "rotate-0", "scale-100");
        });
      }, 150);
    }
  });
});
