import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comment: {},
  flag: false,
  commentId: 0,
  commentEditing: {},
};

const currentComment = (state, action) => {
  state.comment = action.payload.curComment;
};

const changeFlag = state => {
  state.flag = !state.flag;
};

const commentEditing = (state, action) => {
  state.commentEditing = action.payload;
};

const clearCommentEditing = state => {
  state.commentEditing = {};
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    currentComment,
    changeFlag,
    commentEditing,
    clearCommentEditing,
  },
});

export const commentActions = commentSlice.actions;

export const commentReducer = commentSlice.reducer;
