const config = {
  baseUrl: 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  requestInterceptor(config) {
    // todo
    console.log(config);
    return config;
  },
  responseInterceptor(response) {
    // todo
    console.log(response);
    return response;
  },
  errorInterceptor(error) {
    // todo
    console.log(error);
    return error;
  },
};

export default config;
