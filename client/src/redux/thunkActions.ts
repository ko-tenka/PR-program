import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { IInputs, PostsType, ILoginEmailPassword, IUser, ILoginPassword } from '../types/types';

export const fetchPosts = createAsyncThunk('posts/all', async () => { // 'posts/all' = это не URL
  try {
    const response = await axios.get<PostsType>(`http://localhost:3000/api/task/`); // URL ТУТ
    console.log("=======> консоль в санках на 9", response.data)
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
    console.log(response)
    console.log(response.data)
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
  async (loginEmailPassword: ILoginEmailPassword) => {
      try {
          const response: AxiosResponse<IUser> = await axios.post(
              'http://localhost:3000/api/users/registration',
              loginEmailPassword,
              { withCredentials: true }
          );
          return response.data;
      } catch (error) {
          if (axios.isAxiosError(error)) {
              if (error.response && error.response.status === 400) {
                return Promise.reject(new Error(error.response.data.message));
              }
          }
          return Promise.reject(new Error('Произошла ошибка при регистрации'));

      }
  }
);


export const fetchUserLogin = createAsyncThunk(
  'user/login', 
  async(loginPassword: ILoginPassword, { rejectWithValue }) => {
    try {
      const response = await axios.post<IUser>(
        'http://localhost:3000/api/users/login',
        loginPassword,
        { withCredentials: true }
      );
      if (response.status === 200){
        return 'Вы вошли'
      }
    } catch (error) {
      const errorMessage = error.response.status === 400? 'Не верный пароль' : 'Нет такого пользователя'
       return errorMessage 
    }
  }
);

export const fetchUserLogout = createAsyncThunk(
  'user/logout', 
  async() => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/logout', { withCredentials: true })
      return response.status;
    } catch (error) {
      console.log(error)
    }
  }
);

export const fetchUserInfo = createAsyncThunk('user/check', async () => {
  try {
      const response = await axios.get<IUser>('http://localhost:3000/api/users/', {withCredentials: true });
      return response.data;
  } catch (error) {
      console.log(error);
  }
})