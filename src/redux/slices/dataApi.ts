import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataPost: [
    {
      id: 1,
      idUser: 2,
      timePost: '1 ngày trước',
      titlePost: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
      imagePost: [
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
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
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
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
      imagePost: ['https://picsum.photos/300'],
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
      imagePost: ['https://picsum.photos/300', 'https://picsum.photos/300'],
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
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
        'https://picsum.photos/300',
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
      postLiked: [1, 3, 5],
      avatar: 'https://i.pravatar.cc/30?img=1',
    },
    {
      id: 2,
      name: 'Hoàng',
      username: '0123456789',
      password: '123456',
      postLiked: [],
      avatar: 'https://i.pravatar.cc/30?img=2',
    },
    {
      id: 3,
      name: 'Dương Đạt',
      username: '0147258369',
      password: '123456',
      postLiked: [],
      avatar: 'https://i.pravatar.cc/30?img=3',
    },
    {
      id: 4,
      name: 'Dương',
      username: '0987654321',
      password: '123456',
      postLiked: [],
      avatar: 'https://i.pravatar.cc/30?img=4',
    },
    {
      id: 5,
      name: 'Kiên',
      username: '0369258147',
      password: '123456',
      postLiked: [],
      avatar: 'https://i.pravatar.cc/30?img=5',
    },
  ],
  store: [],
  idKeyPost: 100,
  idKeyComment: 100,
  idUserRep: 0,
  idCommentRep: 0,
  isLogin: false,
  accountLogin: {},
};

const Login = (state, action) => {
  state.isLogin = true;
  state.accountLogin = action.payload.userDispatch;
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

const addPost = (state, action) => {
  state.store.push({
    id: 5,
    idUser: 1,
    timePost: 'Vừa xong',
    titlePost: '',
    imagePost: [],
    numLike: 0,
    commentDetail: [],
  });
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
    testAction,
  },
});

export const dataActions = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
