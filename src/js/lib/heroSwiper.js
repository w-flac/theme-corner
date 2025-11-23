// ==========================================
// 📦 导入依赖
// ==========================================
import Swiper from "swiper";
import { Autoplay, Pagination } from "swiper/modules";

// ==========================================
// 🎠 初始化 Swiper
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  const swiperEl = document.getElementById("custom-hero");

  if (!swiperEl) {
    console.warn("⚠️ 未找到 #hero 元素，Swiper 初始化失败");
    return;
  }

  // 类型检查，确保 swiperEl 是 HTMLElement
  if (!(swiperEl instanceof HTMLElement)) {
    console.warn("⚠️ 找到的 #hero 元素不是有效的 HTMLElement");
    return;
  }

  try {
    const swiper = new Swiper(swiperEl, {
      modules: [Autoplay, Pagination],
      direction: "horizontal", // 水平方向（从左到右）
      spaceBetween: 30, // 无缝切换
      loop: true, // 循环播放
      speed: 1000, // 滑动动画速度
      autoplay: {
        delay: 5000, // 5秒切换
        disableOnInteraction: false,
        // 用户交互后继续自动播放
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },
    });
    console.log("✅ Swiper 初始化成功", swiper);
  } catch (error) {
    console.error("❌ Swiper 初始化失败:", error);
  }
});
