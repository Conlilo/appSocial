import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flag: false,
};

const changeFlag = (state, action) => {
  state.flag = action.payload;
};

const flagSlice = createSlice({
  name: 'flag',
  initialState,
  reducers: { changeFlag },
});

export const flagActions = flagSlice.actions;

export const flagReducer = flagSlice.reducer;
