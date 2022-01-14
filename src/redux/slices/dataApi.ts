import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataPost: [
    {
      id: 1,
      idUser: 2,
      timePost: '1 ngày trước',
      titlePost: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
      imagePost: [
        'https://picsum.photos/id/1/300',
        'https://picsum.photos/id/2/300',
        'https://picsum.photos/id/3/300',
      ],
      numLike: [...Array(10)],
      commentDetail: [
        {
          idComment: 1,
          idUserComment: 5,
          titleComment: 'Lorem ipsum dolor sit amet,',
          timeComment: '30 phút trước',
          repComment: [
            {
              idRepComment: 1,
              idUserRepComment: 5,
              titleRepComment: 'Lorem ipsum dolor sit amet,',
              timeRepComment: '20 phút trước',
            },
          ],
        },
        {
          idComment: 2,
          idUserComment: 5,
          titleComment: 'Lorem ipsum dolor sit amet,',
          timeComment: '30 phút trước',
          repComment: [
            {
              idRepComment: 1,
              idUserRepComment: 5,
              titleRepComment: 'Lorem ipsum dolor sit amet,',
              timeRepComment: '20 phút trước',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      idUser: 2,
      timePost: '1 ngày trước',
      titlePost: 'Lorem ipsum dolor sit amet,',
      imagePost: [
        'https://picsum.photos/id/4/300',
        'https://picsum.photos/id/5/300',
        'https://picsum.photos/id/6/300',
        'https://picsum.photos/id/7/300',
        'https://picsum.photos/id/8/300',
        'https://picsum.photos/id/9/300',
      ],
      numLike: [...Array(4)],
      commentDetail: [
        {
          idComment: 1,
          idUserComment: 5,
          titleComment: 'Lorem ipsum',
          timeComment: '10 phút trước',
          repComment: [],
        },
        {
          idComment: 2,
          idUserComment: 2,
          titleComment: 'Lorem ipsum',
          timeComment: '2 phút trước',
          repComment: [],
        },
        {
          idComment: 3,
          idUserComment: 1,
          titleComment: 'Lorem ipsum',
          timeComment: '2 phút trước',
          repComment: [],
        },
        {
          idComment: 4,
          idUserComment: 2,
          titleComment: 'Lorem ipsum',
          timeComment: 'Vừa xong',
          repComment: [],
        },
      ],
    },
    {
      id: 3,
      idUser: 2,
      timePost: '30 phút trước',
      titlePost: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
      imagePost: ['https://picsum.photos/id/10/300'],
      numLike: [...Array(2)],
      commentDetail: [
        {
          idComment: 1,
          idUserComment: 5,
          titleComment: 'consectetur',
          timeComment: '1 phút trước',
          repComment: [
            {
              idUserRepComment: 5,
              titleRepComment: 'consectetur',
              timeRepComment: 'Vừa xong',
            },
            {
              idUserRepComment: 5,
              titleRepComment: 'consectetur',
              timeRepComment: 'Vừa xong',
            },
            {
              idUserRepComment: 2,
              titleRepComment: 'consectetur',
              timeRepComment: 'Vừa xong',
            },
          ],
        },
        {
          idComment: 2,
          idUserComment: 3,
          titleComment: 'consectetur',
          timeComment: '1 phút trước',
          repComment: [],
        },
      ],
    },
    {
      id: 4,
      idUser: 4,
      timePost: '1 phút trước',
      titlePost: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
      imagePost: [
        'https://picsum.photos/id/11/300',
        'https://picsum.photos/id/12/300',
      ],
      numLike: [...Array(1)],
      commentDetail: [
        {
          idComment: 1,
          idUserComment: 5,
          titleComment: 'consectetur',
          timeComment: 'Vừa xong',
          repComment: [
            {
              idUserRepComment: 5,
              titleRepComment: 'consectetur',
              timeRepComment: 'Vừa xong',
            },
          ],
        },
      ],
    },
    {
      id: 5,
      idUser: 5,
      timePost: 'Vừa xong',
      titlePost: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
      imagePost: [
        'https://picsum.photos/id/13/300',
        'https://picsum.photos/id/14/300',
        'https://picsum.photos/id/15/300',
        'https://picsum.photos/id/16/300',
        'https://picsum.photos/id/17/300',
        'https://picsum.photos/id/18/300',
        'https://picsum.photos/id/19/300',
        'https://picsum.photos/id/20/300',
        'https://picsum.photos/id/21/300',
        'https://picsum.photos/id/22/300',
        'https://picsum.photos/id/23/300',
      ],
      numLike: [],
      commentDetail: [],
    },
  ],
  dataUser: [
    {
      id: 1,
      name: 'Chiến Nguyễn',
      username: '0984298754',
      password: '123456',
      avatar: 'https://i.pravatar.cc/30?img=1',
    },
    {
      id: 2,
      name: 'Hoàng',
      username: '0974793852',
      password: '1234567',
      avatar: 'https://i.pravatar.cc/30?img=2',
    },
    {
      id: 3,
      name: 'Dương Đạt',
      username: '0147258369',
      password: '123456',
      avatar: 'https://i.pravatar.cc/30?img=3',
    },
    {
      id: 4,
      name: 'Dương',
      username: '0987654321',
      password: '123456',
      avatar: 'https://i.pravatar.cc/30?img=4',
    },
    {
      id: 5,
      name: 'Kiên',
      username: '0369258147',
      password: '123456',
      avatar: 'https://i.pravatar.cc/30?img=5',
    },
    {
      id: 6,
      name: 'Văn Sĩ',
      username: '0978226026',
      password: '1234567',
      avatar: 'https://i.pravatar.cc/30?img=6',
    },
  ],
  store: [],
  idKeyPost: 100,
  idKeyComment: 100,
  idUserRep: 0,
  idCommentRep: 0,
  isLogin: false,
  accountLogin: {},
  imageCreate: [],
  token: '',
};

const addPost = (state, action) => {
  state.store.push({
    id: state.idKeyPost,
    idUser: action.payload.userLogin,
    timePost: 'Vừa xong',
    titlePost: action.payload.titlePost,
    imagePost: state.imageCreate,
    numLike: [],
    commentDetail: [],
  });
  state.idKeyPost += 1;
  state.imageCreate = [];
};

const editPost = (state, action) => {
  state.store.filter(x => x.id === action.payload.idPost)[0].titlePost =
    action.payload.titlePost;
  state.store.filter(x => x.id === action.payload.idPost)[0].imagePost =
    state.imageCreate;
};

const delPost = (state, acion) => {
  state.store = state.store.filter(x => x.id !== acion.payload.idPost);
};

const clearData = state => {
  state.imageCreate = [];
};

const addImageCreate = (state, action) => {
  state.imageCreate.push(action.payload);
};

const delImageCreate = (state, action) => {
  state.imageCreate = state.imageCreate.filter(x => x !== action.payload);
};

const Login = (state, action) => {
  state.isLogin = true;
  state.accountLogin = action.payload.userDispatch;
};

const Token = (state, action) => {
  state.token = action.payload.response;
};

const Logout = state => {
  state.isLogin = false;
};

const focusReplyUser = (state, action) => {
  state.idCommentRep = action.payload.idFocusRep;
  state.idUserRep = action.payload.idUserComment;
};

const defocusReplyUser = state => {
  state.idCommentRep = 0;
  state.idUserRep = 0;
};

const addCommentPost = (state, action) => {
  state.store
    .filter(x => x.id === action.payload.idPost)[0]
    .commentDetail.push({
      idComment: state.idKeyPost,
      idUserComment: 1,
      titleComment: action.payload.comment,
      timeComment: 'Vừa xong',
      repComment: [],
    });
  state.idKeyPost += 1;
};

const addReplyComment = (state, action) => {
  state.store
    .filter(x => x.id === action.payload.idPost)[0]
    .commentDetail.filter(x => x.idComment === action.payload.idCommentRep)[0]
    .repComment.push({
      idUserRepComment: 1,
      titleRepComment: action.payload.comment,
      timeRepComment: 'Vừa xong',
    });
  state.idUserRep = 0;
  state.idCommentRep = 0;
};

const publicStore = state => {
  state.store = state.dataPost;
};

const likedPost = (state, action) => {
  state.store
    .filter(x => x.id === action.payload.idPost)[0]
    .numLike.push(state.accountLogin.id);
};

const dislikedPost = (state, action) => {
  state.store.filter(x => x.id === action.payload.idPost)[0].numLike =
    state.store
      .filter(x => x.id === action.payload.idPost)[0]
      .numLike.filter(x => x !== state.accountLogin.id);
};

const testAction = () => {};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    publicStore,
    likedPost,
    dislikedPost,
    addCommentPost,
    defocusReplyUser,
    focusReplyUser,
    addReplyComment,
    addPost,
    Login,
    Logout,
    addImageCreate,
    testAction,
    delImageCreate,
    editPost,
    clearData,
    delPost,
    Token,
  },
});

export const dataActions = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
