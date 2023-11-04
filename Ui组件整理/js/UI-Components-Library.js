zgzUi = (function () {
  /** 初始化粘性导航栏 -- 等待笔记
   * @param selector  - 指定要观察的元素的 CSS 选择器
   * @param {rootValue = null, thresholdValue = 0, rootMarginValue = "0px"} - IntersectionObserver常用设置参数
   * 使用说明：
   *  1. body标签条件sticky类名
   *  2. 目标元素相对于整个视口中
   * 核心逻辑：
   *  1. 目标元素的边界框与根元素的交叉，触发回调函数 (根元素通过root属性来设置)
   *  2. 交叉比例 (交叉比例通过threshold属性来设置，可以是一个数组)
   * 使用问题：
   *  1. 观察元素不在视口中，会出现向上的scroll，排除js问题，应该是css问题
   */
  function initializeStickyNavbar(selector, { rootValue = null, thresholdValue = 0, rootMarginValue = "0px" }) {
    const obserEl = document.querySelector(selector);
    // 被观察的元素进入或离开视口时被调用
    const obs = new IntersectionObserver(
      function (entries) {
        const ent = entries[0];
        console.log(ent);
        // 如果观察的元素不在视口中
        if (ent.isIntersecting === false) {
          document.body.classList.add("sticky");
        }
        // 如果观察的元素在视口中
        if (ent.isIntersecting === true) {
          document.body.classList.remove("sticky");
        }
      },
      {
        // In the viewport 配置观察者的选项(目标元素进入视口)
        /**
         * @param {null || rootEl} root -
         * @param {number || Array<number>} threshold
         * @param {px} rootMargin
         */
        root: rootValue, // 配置指定了观察者的根元素，null整个视口
        threshold: thresholdValue, // 观察目标元素的可见性与根元素（或视口）之间的交叉比例，当这个比例达到或超过指定的阈值时，观察者会触发回调函数
        rootMargin: rootMarginValue, // 目标元素进入视口之前的xx像素内触发回调函数，
      }
    );
    // 指定观察的目标元素，即希望在视口中监测何时进入或离开的元素
    obs.observe(obserEl);
  }
  /** 初始化滚动至顶部按钮
   * @param buttonId - 指定按钮滚动到顶部的 CSS 选择器
   * @param selector - 指定观察元素的 CSS 选择器
   */
  function initializeScrollToTopButton(buttonId, selector) {
    const scrollToTopBtn = document.querySelector(buttonId);
    const observeEl = document.querySelector(selector);
    const obs = new IntersectionObserver(
      function (entries) {
        const ent = entries[0];
        // 如果观察的元素不在视口中
        if (ent.isIntersecting === false) {
          scrollToTopBtn.classList.add("show");
        }
        // 如果观察的元素在视口中
        if (ent.isIntersecting === true) {
          scrollToTopBtn.classList.remove("show");
        }
      },
      {
        // In the viewport 配置观察者的选项(目标元素进入视口)
        /**
         * @param {null || rootEl} root -
         * @param {number || Array<number>} threshold
         * @param {px} rootMargin
         */
        root: null, // 配置指定了观察者的根元素，null整个视口
        threshold: 0, // 观察目标元素的可见性与根元素（或视口）之间的交叉比例，当这个比例达到或超过指定的阈值时，观察者会触发回调函数
        rootMargin: "1px", // 目标元素进入视口之前的xx像素内触发回调函数，
      }
    );
    // 指定观察的目标元素，即希望在视口中监测何时进入或离开的元素
    obs.observe(observeEl);
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  /** 初始化页面加载动画 */
  function initializeLoader(selector) {
    document.addEventListener("DOMContentLoaded", function (e) {
      setTimeout(() => {
        const loaderContainer = document.querySelector(selector);
        loaderContainer.style.display = "none"; // 页面加载完成后隐藏加载动画
        // 执行其他回调函数...
      }, 500);
    });
  }
  /** 初始化下拉框 */
  function initializeDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      const dropdownToggle = dropdown.querySelector(".dropdown__toggle");
      const dropdownMenu = dropdown.querySelector(".dropdown__menu");
      const dropdownType = dropdown.getAttribute("data-dropdown-type");
      // 切换菜单或按钮的显示和隐藏状态
      function toggleClassName() {
        dropdownMenu.classList.toggle("show");
        dropdownToggle.classList.toggle("show");
      }
      if (dropdownType === "click") {
        dropdownToggle.addEventListener("click", () => {
          toggleClassName();
        });
      } else if (dropdownType === "mouseover") {
        dropdown.addEventListener("mouseenter", () => {
          toggleClassName();
        });
        dropdown.addEventListener("mouseleave", () => {
          toggleClassName();
        });
      }
    });
    document.addEventListener("click", (event) => {
      dropdowns.forEach((dropdown) => {
        const dropdownMenu = dropdown.querySelector(".dropdown__menu");
        const dropdownToggle = dropdown.querySelector(".dropdown__toggle");
        if (!event.target.matches(".dropdown__toggle") && !event.target.matches(".dropdown-content a")) {
          dropdownMenu.classList.toggle("show");
          dropdownToggle.classList.toggle("show");
        }
      });
    });
  }
  /** 保持悬停状态
   * @param container - 执行保持悬停状态的主容器
   * @param item - 目标元素，添加后缀--active状态类
   */
  function keepHoverActive(navContainer, navItem) {
    const container = document.querySelector(navContainer);
    container.addEventListener("mouseover", function (e) {
      const tarEl = e.target.closest(navItem);
      if (!tarEl) return;
      // 清除样式
      Array.from(document.querySelectorAll(navItem)).forEach((el) => el.classList.remove(`${navItem.slice(1)}--active`));
      // 添加样式
      tarEl.classList.add(`${navItem.slice(1)}--active`);
    });
  }
  /** 选项卡切换
   * @param {*} tabContainer - 选项卡容器
   * @param {*} tabItem - 选项卡 data-tab = "1"
   * @param {*} tabContent - 选项卡内容 id = "1"
   * 使用说明：
   *  1. 选项卡data-tab值对应选项卡内容的id值，相互关联！
   */
  function operationsTab(tabContainer, tabItem, tabContent) {
    const container = document.querySelector(tabContainer);
    container.addEventListener("click", function (e) {
      const clicked = e.target.closest(tabItem);
      if (!clicked) return;
      document.querySelectorAll(tabItem).forEach((el) => el.classList.remove(`${tabItem.slice(1)}--active`));
      clicked.classList.add(`${tabItem.slice(1)}--active`);
      document.querySelectorAll(tabContent).forEach((el) => el.classList.remove(`${tabContent.slice(1)}--active`));
      document.querySelector(`${tabContent}--` + clicked.getAttribute("data-tab")).classList.add(`${tabContent.slice(1)}--active`);
    });
  }
  return (zgzUi = {
    initializeStickyNavbar(selector, rootValue = null, thresholdValue = 0, rootMarginValue = "0px") {
      initializeStickyNavbar(selector, rootValue = null, thresholdValue = 0, rootMarginValue = "0px");
    },
    initializeScrollToTopButton(buttonId, selector) {
      initializeScrollToTopButton(buttonId, selector);
    },
    initializeLoader(selector) {
      initializeLoader(selector);
    },
    initializeDropdowns() {
      initializeDropdowns();
    },
    keepHoverActive(navContainer, navItem) {
      keepHoverActive(navContainer, navItem);
    },
    operationsTab(tabContainer, tabItem, tabContent) {
      operationsTab(tabContainer, tabItem, tabContent);
    },
  });
})();
