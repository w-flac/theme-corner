// 点赞功能类
class Upvote {
  constructor(storageKey, plural, apiEndpoint = "/apis/api.halo.run/v1alpha1/trackers/upvote", group = "content.halo.run") {
    this.storageKey = storageKey;
    this.plural = plural;
    this.apiEndpoint = apiEndpoint;
    this.group = group;
    this.liked = [];
    this.processing = false;
  }

  init() {
    this.liked = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
    document.addEventListener("click", this.handleClick.bind(this));
    this.liked.forEach((itemName) => this.setLikedState(itemName));
  }

  handleClick(e) {
    const btn = e.target.closest(".upvote-btn");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const itemName = btn.dataset.articleName || btn.dataset.pageName;
    if (itemName) this.click(itemName);
  }

  async click(itemName) {
    if (this.liked.includes(itemName) || this.processing) return;
    this.processing = true;

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ group: this.group, plural: this.plural, name: itemName }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      this.liked.push(itemName);
      localStorage.setItem(this.storageKey, JSON.stringify(this.liked));

      // 更新UI
      this.updateUI(itemName);
    } catch (err) {
      console.error("点赞失败，请重试:", err);
    } finally {
      this.processing = false;
    }
  }

  setLikedState(itemName) {
    this.updateButtonState(itemName);
  }

  updateUI(itemName) {
    // 更新计数
    const countEl = document.querySelector(`[data-upvote-post-name="${itemName}"], [data-upvote-page-name="${itemName}"]`);
    if (countEl) {
      const currentCount = parseInt(countEl.textContent) || 0;
      countEl.textContent = currentCount + 1;
    }

    // 更新按钮状态
    this.updateButtonState(itemName);
  }

  updateButtonState(itemName) {
    const btn = document.querySelector(`.upvote-btn[data-article-name="${itemName}"], .upvote-btn[data-page-name="${itemName}"]`);
    if (btn) {
      btn.disabled = true;
      btn.classList.add("cursor-not-allowed");

      // 替换心形图标为红色实心心形
      const svg = btn.querySelector("svg");
      if (svg) {
        svg.outerHTML = `<svg class="h-3.5 w-3.5 md:h-4.5 md:w-4.5" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z" fill="#ed4832"/>
        </svg>`;
      }
    }
  }
}
// 自动初始化点赞功能
document.addEventListener('DOMContentLoaded', () => {
  // 检查页面上是否有点赞按钮
  const hasArticleButton = document.querySelector('[data-article-name]');
  const hasPageButton = document.querySelector('[data-page-name]');


  if (hasArticleButton) {
    // 文章页面点赞
    const postUpvote = new Upvote("halo.upvoted.post.names", "posts");
    postUpvote.init();
  }

  if (hasPageButton) {
    // 页面页面点赞
    const pageUpvote = new Upvote("halo.upvoted.singlepage.names", "singlepages");
    pageUpvote.init();
  }
});

export { Upvote };
