// /redux/slices/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductDetails } from '../../api';

interface Product  {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  main_image: string;
 other_images: string[];


}
interface ProductState {
  data: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  data: null,
  status: 'idle',
  error: null,
};

export const getProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (productId: string) => {
    const response = await fetchProductDetails(productId);
    return response;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product details';
      });
  },
});

export default productSlice.reducer;
