import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_PRODUCT_URL


export const fetchAllProducts = async () => {
  const response = await axios.get('/api/products')
  return response.data;
}

export const fetchProductDetails = async (productId: string) => {
  const response = await axios.get(`/api/products/${(productId)}`);
  return response.data;
};



export const fetchProductReviews = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_REVIEW_URL}`);
  return response.data;
};



