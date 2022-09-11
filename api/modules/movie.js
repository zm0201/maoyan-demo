const BASE_URL = '/movie';

export function fetchHotMovies(cityId, cityName) {
  return new Promise(resolve => {
    getJson(`${BASE_URL}/hot`, { ci: cityId, ct: cityName })
      .then(res => {
        if (res?.data?.data?.hot) {
          resolve(res.data.data.hot);
        } else {
          return Promise.reject();
        }
      })
      .catch(err => {
        console.error(err.message);
        resolve(null);
      });
  });
}
