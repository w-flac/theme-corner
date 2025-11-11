/**
 * 分享功能 - 点击复制链接并显示反馈
 */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.share-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const url = window.location.href;
      // 优先使用现代的Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).catch(() => {
          // 如果Clipboard API失败，使用降级方案
          fallbackCopy(url);
        });
      } else {
        // 降级方案：使用document.execCommand
        fallbackCopy(url);
      }
      // 降级复制函数
      function fallbackCopy(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        tempInput.style.position = 'fixed';
        tempInput.style.left = '-9999px';
        tempInput.style.top = '-9999px';
        document.body.appendChild(tempInput);

        try {
          tempInput.focus();
          tempInput.select();
          tempInput.setSelectionRange(0, 99999);
          const successful = document.execCommand('copy');
          if (!successful) {
            console.warn('复制失败');
          }
        } catch (err) {
          console.error('复制出错:', err);
        } finally {
          document.body.removeChild(tempInput);
        }
      }
      const spanElement = button.querySelector('span');
      const svgElement = button.querySelector('svg');
      spanElement.textContent = '已复制';
      svgElement.outerHTML = `<svg class="size-5" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path
          d="M878.08 731.274667a32 32 0 0 1-54.88-32.938667A360.789333 360.789333 0 0 0 874.666667 512c0-200.298667-162.368-362.666667-362.666667-362.666667S149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667a360.789333 360.789333 0 0 0 186.314667-51.445334 32 32 0 0 1 32.928 54.88A424.778667 424.778667 0 0 1 512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667c0 78.293333-21.152 153.568-60.586667 219.274667zM374.581333 489.450667l84.341334 83.989333 190.432-190.72a32 32 0 0 1 45.290666 45.226667l-213.013333 213.333333a32 32 0 0 1-45.226667 0.064l-106.986666-106.549333a32 32 0 1 1 45.162666-45.344z"
        ></path>
      </svg>`;
    });
  });
});
