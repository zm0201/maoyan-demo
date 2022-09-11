import { getJson } from '../api/http/index.js';

(function () {
  fetchHotMovies();
})();

function fetchHotMovies() {
  const renderMarkOrWantWatch = element => {
    if (element.showStateButton.content === '预售') {
      return `<div class="wish-box">
        <div class="txt">${element.wish}</div>
        <div class="wish">人想看</div>
      </div>`;
    } else {
      return `<div class="score-box">
        <div class="desc">观众评分</div>
        <div class="score">${element.mk}</div>
      </div>`;
    }
  };

  getJson('/movie/hot', { ci: 1, ct: '北京' }).then(res => {
    const topMoviesDOM = document.querySelector('.Top-rated-movies');
    if (topMoviesDOM) {
      const hots = res?.data?.data?.hot || [];
      hots.forEach(item => {
        topMoviesDOM.innerHTML += `
          <div class="Top-rated-movies-item">
            <img
              src="${item.img}"
              alt=""
              class="Top-rated-movies-img"
            />
            <div class="score">
              <span>观众评分</span>
              <span>${item.mk.toFixed(1)}</span>
            </div>
            <div class="score-bgc">
            </div>
            <p class="movie-name ellipsis">${item.nm}</p>
          </div>
        `;
      });
    }

    const hotListDom = document.querySelector('.movie-list');
    const listItems = res?.data?.data?.hot || [];
    listItems.forEach(element => {
      hotListDom.innerHTML += `<li class="movie-list-item">
            <img
              src="${element.img}"
              alt="movie"
              class="movie-list-item-img"
            />
            <div class="movie-content-box">
              <div class="movie-content">
                <div class="movie-title">
                  <p class="movie-title-name ellipsis">${element.nm}</p>
                  <div class="style"></div>
                </div>

                ${renderMarkOrWantWatch(element)}

                <div class="capital-role-box">
                  <p class="capital-role-desc">主演:</p>
                  <p class="capital-role ellipsis">${element.star}</p>
                </div>
                
                <div class="movie-number-box">
                  <p class="movie-count">${element.showInfo}</p>
                </div>
              </div>   
              <button
                class="button-to-buy"
                style="background: ${
                  element.showStateButton.color
                }; border-color: ${element.showStateButton.color}"
              >
                ${element.showStateButton.content}
              </button>
             </div>
          </li>`;
    });
  });
}
