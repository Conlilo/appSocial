import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comment: {},
  flag: false,
  commentId: 0,
};

const currentComment = (state, action) => {
  state.comment = action.payload.curComment;
};

const changeFlag = state => {
  state.flag = !state.flag;
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: { currentComment, changeFlag },
});

export const commentActions = commentSlice.actions;

export const commentReducer = commentSlice.reducer;
