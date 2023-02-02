const docNodes = {
  headerNav: document.getElementById('tab-items'),
  cityName: document.getElementById('city-name'),
};

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
        '.tabs-container > .left > ul > li.current'
      );
      if (!lastCurrent) {
        return;
      }
      lastCurrent.classList.remove('current');
      // 给li设置current类
      node.classList.add('current');

      // 获取li左侧和ul左侧之间的距离
      const offsetLeft = node.offsetLeft;
      // 获取li本身的宽度
      const liWidth = node.getBoundingClientRect().width;

      block.style.transform = `translateX(${
        offsetLeft + liWidth / 2 - blockWidth / 2
      }px)`;
    };
  })(),
};

(function () {
  registerEvents();
  const { 1: cityName } = parseQuery();
  docNodes.cityName.textContent = cityName || '北京';
})();

function parseQuery() {
  const query = new URLSearchParams(parent.location.search);
  const cityId = query.get('ci');
  const cityName = query.get('nm');
  return [cityId, cityName];
}

function registerEvents() {
  window.addEventListener('load', function () {
    if (docNodes.headerNav) {
      docNodes.headerNav.addEventListener('click', event =>
        events.handleTabsClick(event)
      );
    }
  });
}
