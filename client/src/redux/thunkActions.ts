import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { IInputs, PostsType, ILoginEmailPassword, IUser, ILoginPassword } from '../types/types';

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

// export const fetchUserLogin = createAsyncThunk(
//   'user/login', 
//   async(loginPassoword: ILoginPassword) => {
//     try {
//       const response = await axios.post<AxiosResponse<IUser>>('http://localhost:3000/api/users/login', 
//       loginPassoword, { withCredentials: true })
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)){
//         if (error.response && error.response.status === 400){
//           return Promise.reject(new Error(error.response.data.message));
//         }
//         if (error.response && error.response.status === 300){
//           return Promise.reject(new Error(error.response.data.message));
//         }
//       }
//       return Promise.reject(new Error('Произошла ошибка при входе'));
//     }
// });

// export const fetchUserLogin = createAsyncThunk(
//   'user/login', 
//   async(loginPassword: ILoginPassword, { rejectWithValue }) => {
//     try {
//       const response = await axios.post<IUser>(
//         'http://localhost:3000/api/users/login',
//         loginPassword,
//         { withCredentials: true }
//       );
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         const status = error.response ? error.response.status : null;
//         const errorMessage = error.response?.data?.message || 'Произошла ошибка при входе';

//         // Обработка ошибок в зависимости от статуса
//         switch (status) {
//           case 400:
//             return rejectWithValue(errorMessage); // Неверный пароль
//           case 300:
//             return rejectWithValue(errorMessage); // Пользователь не существует
//         }
//       }
//       return rejectWithValue('Неизвестная ошибка');
//     }
//   }
// );

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