import { getJson } from '../api/http/index.js';

const docNodes = {
  cityBox: document.getElementById('city-box'),
  asideBar: document.getElementById('aside-bar'),
};

const events = {
  // handleCityBoxClick: function () {}
  handleCityBoxClick(event) {
    // 获取被点击的对象
    const target = event.target;
    console.log(target);
    if (target.className === 'label') {
      return;
    }

    const cityId = target.dataset.ci;
    const cityName = target.textContent;
    location.href = `/?ci=${cityId}&nm=${cityName}`;
  },

  handleAsideBarTouch(event) {
    // 阻止默认行为
    event.preventDefault();

    // 获取被触碰的节点
    const { clientX, clientY } = event.changedTouches[0];
    const target = document.elementFromPoint(clientX, clientY);

    const char = target.textContent;
    const label = document.querySelector(`#group-box-${char} > .label`);
    if (label) {
      label.scrollIntoView();
    }
  },
};

(function () {
  fetchCities();
  registerEvents();
})();

function fetchCities() {
  // 请求数据
  getJson('/city').then(res => {
    const cities = res?.data?.cts;
    // 获取城市拼音开头字母,转成大写字母,放到map里,key-开头字母,value-[以该字母开头的城市名...]
    const cityMap = new Map();
    cities.forEach(city => {
      const firstChar = city.py[0].toUpperCase();
      if (cityMap.has(firstChar)) {
        cityMap.get(firstChar).push(city);
      } else {
        cityMap.set(firstChar, [city]);
      }
    });
    // 开头字母转成数组,升序排列
    const chars = Array.from(cityMap.keys());
    chars.sort((charA, charB) => charA.charCodeAt() - charB.charCodeAt());

    // 渲染侧边栏的字母
    const characterDOMs = chars.map(char => {
      const characterDOM = document.createElement('div');
      characterDOM.className = 'nav-item';
      characterDOM.textContent = char;
      return characterDOM;
    });
    docNodes.asideBar.append(...characterDOMs);

    // 遍历开头字母,添加每组节点,渲染分组名
    chars.forEach(item => {
      const groupBox = document.createElement('div');
      groupBox.className = 'group-box';
      groupBox.id = `group-box-${item}`;
      docNodes.cityBox.appendChild(groupBox);

      const label = document.createElement('div');
      label.className = 'label';
      label.textContent = item;
      // 添加每组内 item 节点
      const cities = document.createElement('div');
      cities.className = 'cities';

      groupBox.append(label, cities);
      // 遍历 cityMap 中的 value (每组内所有元素),并渲染元素
      const cityItems = cityMap.get(item).map(city => {
        const cityItem = document.createElement('div');
        cityItem.className = 'city-item';
        cityItem.dataset.ci = city.id;
        cityItem.textContent = city.nm;
        return cityItem;
      });
      cities.append(...cityItems);

      // cityMap.get(item).forEach(city => {
      //   const cityItem = document.createElement('div');
      //   cityItem.className = 'city-item';
      //   cityItem.textContent = city.nm;
      //   cities.appendChild(cityItem);
      // });
    });
  });
}

function registerEvents() {
  docNodes.cityBox.addEventListener('click', event =>
    events.handleCityBoxClick(event)
  );

  docNodes.asideBar.addEventListener('touchstart', event =>
    events.handleAsideBarTouch(event)
  );

  docNodes.asideBar.addEventListener('touchmove', event =>
    events.handleAsideBarTouch(event)
  );

  docNodes.asideBar.addEventListener('touchend', event =>
    events.handleAsideBarTouch(event)
  );
}
