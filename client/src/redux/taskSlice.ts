import { createSlice } from '@reduxjs/toolkit';
import { fetchAddPost, fetchDeletePost, fetchPosts } from './thunkActions';

export type SliceState = {
    count: number;
    todoList: PostsType;
    isLoading: boolean;
  };

const initialState: SliceState = {
    count: 0,
    todoList: [],
    isLoading: true,
  };

const postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
      builder.addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.todoList = payload; // payload это response.data из thunk
        state.isLoading = false;
      });
      builder.addCase(fetchAddPost.fulfilled, (state, { payload }) => {
        state.todoList.push(payload); // данные из inputs от fetchAddTask
      });
      builder.addCase(fetchDeletePost.fulfilled, (state, { payload }) => {
        state.todoList = state.todoList.filter((el) => el.id !== payload);
      });
    },
  });
  export default postSlice.reducer;