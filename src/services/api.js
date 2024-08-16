// 使用环境变量配置 API 基础地址
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

// 封装 API 地址
const API_ENDPOINTS = {
  getAssets: `${API_BASE_URL}/assets`,
  getAssetById: (id) => `${API_BASE_URL}/assets/${id}`,
  // 添加更多 API 接口地址
};

export default API_ENDPOINTS;