import apiClient from './api';

export const fetchAssets = () => {
  console.log('apiClient',apiClient)
  return apiClient.get('/assets/');
  

};

export const exportAssets = () => {
  return apiClient.get('/assets/export/', { responseType: 'blob' });
};

export const importAssets = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post('/assets/import/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};