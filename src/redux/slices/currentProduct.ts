import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentProduct: {},
};

const addCurrentProduct = (state, action) => {
  state.currentProduct = action.payload.currentProduct;
};

const delCurrentProduct = state => {
  state.currentProduct = {};
};

const currentProductSlice = createSlice({
  name: 'currentproduct',
  initialState,
  reducers: { addCurrentProduct, delCurrentProduct },
});

export const currentProductActions = currentProductSlice.actions;

export const currentProductReducer = currentProductSlice.reducer;
