import { getJson } from '../api/http/index.js';

(function () {
  // const cityId = parseQuery()[0];
  const [cityId, cityName] = parseQuery();
  fetchHotMovies(cityId, cityName);
})();

function parseQuery() {
  const query = new URLSearchParams(parent.parent.location.search);
  const cityId = query.get('ci');
  const cityName = query.get('nm');
  return [cityId, cityName];
}

function fetchHotMovies(cityId, cityName) {
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

  getJson('/movie/hot', { ci: cityId || 1, ct: cityName || '北京' }).then(
    res => {
      const topMoviesDOM = document.querySelector('.Top-rated-movies');
      if (topMoviesDOM) {
        const hots = res?.data?.data?.hot || [];
        hots.sort((hotA, hotB) => {
          return hotA.mk - hotB.mk;
        });
        hots.reverse();
        hots.forEach(item => {
          const movieItem = document.createElement('div');
          movieItem.className = 'Top-rated-movies-item';

          const img = document.createElement('img');
          img.src = item.img;
          img.className = 'Top-rated-movies-img';

          movieItem.appendChild(img);

          const score = document.createElement('div');
          score.className = 'score';

          const text = document.createElement('span');
          text.textContent = '观众评分';

          const scoreValue = document.createElement('span');
          scoreValue.textContent = item.mk.toFixed(1);

          score.append(text, scoreValue);
          movieItem.appendChild(score);

          const scoreBgc = document.createElement('div');
          scoreBgc.className = 'score-bgc';

          const movieName = document.createElement('p');
          movieName.className = 'movie-name ellipsis';
          movieName.textContent = item.nm;

          movieItem.append(scoreBgc, movieName);

          topMoviesDOM.appendChild(movieItem);
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
    }
  );
}
