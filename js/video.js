const docNodes = {
  tabList: document.getElementById('tab-list'),
};
// console.log(docNodes.tabList);
const events = {
  handleTabsClick: (function () {
    // 获取滑块
    const block = document.querySelector('.tabs-container > .tab-active-block');
    if (!block) {
      return;
    }
    const { width: blockWidth, left: blockLeft } =
      block.getBoundingClientRect();

    return function (event) {
      // 获取真正被点击的DOM节点
      const target = event.target;
      // 判断这个节点是不是<li />
      let node;
      if (target.tagName.toLowerCase() === 'a') {
        node = target.parentElement;
      } else {
        node = target;
      }

      // 取消上一个current类
      const lastCurrent = document.querySelector(
        '.tabs-container > .tabs > ul > li.current'
      );
      console.log(lastCurrent);
      if (!lastCurrent) {
        return;
      }
      lastCurrent.classList.remove('current');
      // 给li设置current类
      node.classList.add('current');

      console.log(node);

      // 获取li左侧和ul左侧之间的距离
      const offsetLeft = node.offsetLeft;
      // 获取li本身的宽度
      const liWidth = node.getBoundingClientRect().width;

      block.style.transform = `translateX(${
        offsetLeft + liWidth / 2 - blockWidth / 2 - blockLeft
      }px)`;
    };
  })(),
};

(function () {
  registerEvents();
})();

function registerEvents() {
  window.addEventListener('load', function () {
    if (docNodes.tabList) {
      docNodes.tabList.addEventListener('click', event =>
        events.handleTabsClick(event)
      );
    }
  });
}
