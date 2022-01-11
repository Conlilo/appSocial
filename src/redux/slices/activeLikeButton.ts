import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: false,
};

const activeBtn = state => {
  state.active = !state.active;
};

const activelikebuttonSlice = createSlice({
  name: 'activelikebutton',
  initialState,
  reducers: { activeBtn },
});

export const activelikebuttonActions = activelikebuttonSlice.actions;

export const activelikebuttonReducer = activelikebuttonSlice.reducer;
