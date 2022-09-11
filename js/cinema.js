import { getJson } from '../api/http/index.js';
const docNodes = {
  cinemaDOM: document.getElementById('cinema-box'),
};

if (docNodes.cinemaDOM) {
  getJson('/cinemas', { ci: 20, ct: '北京' }).then(res => {
    const cinima = data?.data;
    docNodes.cinemaDOM.innerHTML += `
       <div class="cinema-box" id="cinema-box">
        <div class="title">
          <div class="cinema-name">东融国际影城（马家堡店）</div>
          <span class="price"
            >23
            <p>元起</p></span
          >
        </div>

        <div class="location">
          <p>丰台区角门路19号院新荟城购物中心4楼</p>
          <p>300m</p>
        </div>

        <div class="lables">
          <div class="change lable-item">改签</div>
          <div class="return-ticket lable-item">退票</div>
          <div class="snack lable-item">小吃</div>
          <div class="vip lable-item">折扣卡</div>
          <div class="type lable-item">4DX厅</div>
        </div>

        <div class="card">
          <div class="logo">卡</div>
          <p class="text">开卡特惠，首单1张票最高立减8元</p>
        </div>
      </div>
      `;
  });
}
