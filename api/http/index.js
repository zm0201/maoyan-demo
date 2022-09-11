import originConfig from './config.js';

function get(url, params = {}, headers = {}) {
  // 请求拦截, 处理传入的三个参数
  const config = originConfig.requestInterceptor({ url, params, headers });

  // 把params转换为query参数的形式 => name=xiaoming&gender=0&age=18
  const query = new URLSearchParams();
  Object.keys(config.params).forEach(key => query.set(key, config.params[key]));
  const queryStr = query.toString();

  // 组装真正的请求地址
  const realUrl = `${originConfig.baseUrl + config.url}?${queryStr}`;
  // 发起请求并返回请求结果
  return fetch(realUrl, {
    headers: { ...originConfig.headers, ...config.headers },
  });
}

/**
 * GET请求 返回JSON
 * @param {string} url 接口路径
 * @param {Record<string, any>} params 请求参数
 * @param {Record<string, string>} headers 请求头
 */
export async function getJson(url, params = {}, headers = {}) {
  try {
    const response = await get(url, params, headers);
    const json = await response.json();
    return originConfig.responseInterceptor(json);
  } catch (error) {
    return originConfig.errorInterceptor(error);
  }
}

function post(url, params = {}, headers = {}) {
  // 请求拦截, 处理传入的三个参数
  const config = originConfig.requestInterceptor({ url, params, headers });
  // 组装真正的请求地址
  const realUrl = originConfig.baseUrl + config.url;
  // 发起请求并返回请求结果
  return fetch(realUrl, {
    method: 'post',
    body: JSON.stringify(params),
    headers: { ...originConfig.headers, ...config.headers },
  });
}

/**
 * POST请求 返回JSON
 * @param {string} url 接口路径
 * @param {Record<string, any>} params 请求参数
 * @param {Record<string, string>} headers 请求头
 */
export async function postJson(url, params = {}, headers = {}) {
  try {
    const response = await post(url, params, headers);
    const json = await response.json();
    return originConfig.responseInterceptor(json);
  } catch (error) {
    return originConfig.errorInterceptor(error);
  }
}
