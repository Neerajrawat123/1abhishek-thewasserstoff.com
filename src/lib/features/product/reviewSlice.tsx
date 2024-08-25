// /redux/slices/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  fetchProductReviews } from '../../api';

interface Review  {
  id: number;
  reviewerName: string;
  reviewerImg: string;
  comment: string;
  date: Date
 review_images: string[];


}
interface ProductState {
  data: Review | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  data: null,
  status: 'idle',
  error: null,
};

export const getProductReviews = createAsyncThunk(
  'review/fetchReviews',
  async (productId: string) => {
    const response = await fetchProductReviews(productId);
    return response;
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product details';
      });
  },
});

export default reviewSlice.reducer;
