import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { IInputs, PostsType, ILoginEmailPassword, IUser } from '../types/types';

export const fetchPosts = createAsyncThunk('posts/all', async () => { // 'posts/all' = это не URL
  try {
    const response = await axios.get<PostsType>(`http://localhost:3000/api/task/`); // URL ТУТ
    return response.data; //* это payload
  } catch (error) {
    console.log(error);
  }
});

export const fetchAddPost = createAsyncThunk('posts/add', async (inputs: IInputs) => {
  try {
    const response = await axios.post<IInputs, AxiosResponse<PostsType>>(
      `http://localhost:3000/api/task/`,
      inputs,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchDeletePost = createAsyncThunk('posts/del', 
async (id: number) => {
    const response = await axios.delete(`http://localhost:3000/api/task/${id}`);
    if (response.status === 200) {
      return id;
    }
});

export const fetchUserRegister = createAsyncThunk(
  'user/register', 
  async(loginEmailPassoword: ILoginEmailPassword) => {
    try {
      const response = await axios.post<AxiosResponse<IUser>>('http://localhost:3000/api/users/registration', 
      loginEmailPassoword, { withCredentials: true })
      return response.data;
    } catch (error) {
      console.log(error)
    }
});
