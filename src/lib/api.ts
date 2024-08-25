import axios from 'axios';

axios.defaults.baseURL = 'https://ca312691e93376c0a86e.free.beeceptor.com/'


export const fetchAllProducts = async () => {
  const response = await axios.get('/api/products')
  return response.data;
}

export const fetchProductDetails = async (productId: string) => {
  const response = await axios.get(`/api/products/${(productId)}`);
  return response.data;
};

export const fetchProductImages = async (productId: string) => {
  const response = await axios.get(`/api/products/${productId}/images`);
  return response.data;
};

export const fetchProductReviews = async (productId: string) => {
  const response = await axios.get(`/api/reviews`);
  return response.data;
};

export const fetchRelatedProducts = async (productId: string) => {
  const response = await axios.get(`/api/products/related`);
  return response.data;
};

