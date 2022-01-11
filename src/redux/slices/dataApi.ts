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
      numLike: 10,
      numComment: 2,
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
      numLike: 4,
      numComment: 4,
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
      numLike: 0,
      numComment: 2,
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
      numLike: 1,
      numComment: 4,
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
      numLike: 0,
      numComment: 0,
      commentDetail: [],
    },
  ],
  dataUser: [
    {
      id: 1,
      name: 'Chiến Nguyễn',
      postLiked: [1, 3, 5],
      avatar: 'https://i.pravatar.cc/30',
    },
    {
      id: 2,
      name: 'Hoàng',
      postLiked: [],
      avatar: 'https://i.pravatar.cc/30',
    },
    {
      id: 3,
      name: 'Dương Đạt',
      postLiked: [],
      avatar: 'https://i.pravatar.cc/30',
    },
    {
      id: 4,
      name: 'Dương',
      postLiked: [],
      avatar: 'https://i.pravatar.cc/30',
    },
    {
      id: 5,
      name: 'Kiên',
      postLiked: [],
      avatar: 'https://i.pravatar.cc/30',
    },
  ],
  store: [],
  idKeyPost: 6,
};

const publicStore = state => {
  state.store = state.dataPost;
};

const likedPost = (state, action) => {
  state.dataUser[0].postLiked.push(action.payload.idPost);
};

const dislikedPost = (state, action) => {
  state.dataUser[0].postLiked = state.dataUser[0].postLiked.filter(
    x => x !== action.payload.idPost,
  );
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: { publicStore, likedPost, dislikedPost },
});

export const dataActions = dataSlice.actions;

export const dataReducer = dataSlice.reducer;
