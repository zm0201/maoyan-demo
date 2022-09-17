const docNodes = {
  headerMenuBtn: document.getElementById('header-menu-btn'),
  bottomNavWrapper: document.getElementById('bottom-nav-wrapper'),
};

const events = {
  //头部菜单按钮点击事件
  handleHeaderMenuClick() {
    const popNav = document.querySelector('body > .pop-nav');
    if (!popNav) {
      return;
    }
    popNav.style.display = 'block';
  },

  //底部nav 栏点击事件,current 切换
  handleNavClick(event) {
    //获取被点击的对象
    console.log(event.target);
    let node = event.target.children[0];
    console.log(node);
    //取消上一个current
    const lastCurrent = document.querySelector(
      '.footer > ul > li > a > .nav_item.current'
    );
    if (!lastCurrent) {
      return;
    }
    lastCurrent.classList.remove('current');
    //被点击对象添加 current 类
    node.classList.add('current');
  },

  // 头部弹出菜单隐藏事件
  handleHideMenu(event) {
    const popNav = document.querySelector('body > .pop-nav');
    if (!popNav) {
      return;
    }
    const menuBtn = document.querySelector('.header .navbar span');
    if (!menuBtn) {
      return;
    }
    const target = event.target;
    if ([popNav, menuBtn].includes(target) || popNav.contains(target)) {
      return;
    }
    popNav.style.display = 'none';
  },
};

(function () {
  registerEvents();
})();

function registerEvents() {
  // 注册隐藏右上角菜单的点击事件
  window.addEventListener('click', event => events.handleHideMenu(event));
  const iframe = document.querySelector('iframe[name="pages-wrapper"]');
  if (iframe) {
    iframe.contentWindow.addEventListener('click', event =>
      events.handleHideMenu(event)
    );
    iframe.contentWindow.addEventListener('load', () => {
      const innerIframe = iframe.contentDocument.querySelector(
        'iframe[name="movie-cinema-nav"]'
      );
      if (innerIframe) {
        innerIframe.contentWindow.addEventListener('click', event =>
          events.handleHideMenu(event)
        );
      }
    });
  }

  // 注册右上角菜单按钮的点击事件
  if (docNodes.headerMenuBtn) {
    docNodes.headerMenuBtn.addEventListener('click', () =>
      events.handleHeaderMenuClick()
    );
  }

  // 注册底部导航栏点击事件
  if (docNodes.bottomNavWrapper) {
    docNodes.bottomNavWrapper.addEventListener('click', event =>
      events.handleNavClick(event)
    );
  }
}
