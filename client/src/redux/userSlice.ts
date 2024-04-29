// import { createSlice } from '@reduxjs/toolkit';
// export type SliceUseState = {
//     id: number,
//     login: string,
//     email: string,
//     password:string
// }
// const initialState: SliceUseState = {
//     id: 0,
//     login: '',
//     email: '',
//     password: '',

// };

// const userSlise = createSlice({
//     name: 'userSliace',
//     initialState,
//     reducers: {
//        setUser(state, action) {
//         state.id = action.payload.id;
//         state.login = action.payload.login;
//         state.email = action.payload.email;
//         state.password = action.payload.password
//        },
//        removeUser(state) {
//         state.id = 0;
//         state.login = '';
//         state.email = '';
//         state.password = ''
//        }
//     }
// })

// export const { setUser, removeUser } = userSlise.actions;
// export default userSlise.reducer

// import { createSlice } from '@reduxjs/toolkit';
// import { fetchPosts, fetchUserLogin, fetchUserLogout, fetchUserRegister } from './thunkActions';
// import { ICard } from '../types/types';

// export type UserSliceState = {
//     isLogin: boolean,
//     login: string,
//     topics: ICard[],
// }

// const initialState: UserSliceState = {
//     isLogin: false,
//     login: 'Гость',
//     topics: [],
// }

// const userSlice = createSlice({
//     name: 'userSlice',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchUserLogin.fulfilled, (state: UserSliceState, { payload }) => {
//             if (payload) {
//                state.isLogin = true;
//                state.login = payload.login;
//             }
//         }),
//         builder.addCase(fetchUserRegister.fulfilled, (state: UserSliceState, { payload }) => {
//             if (payload) state.isLogin = true
//         }),
//         builder.addCase(fetchUserLogout.fulfilled, (state: UserSliceState, { payload }) => {
//             if (payload === 200) state.isLogin = false
//         })
//         builder.addCase(fetchPosts.fulfilled, (state: UserSliceState, { payload }) => {
//             if (payload) state.topics = payload;
//         })
//     }
// })

// export default userSlice.reducer

import { createSlice } from "@reduxjs/toolkit";
import { fetchUserLogin, fetchUserLogout, fetchUserRegister, fetchUserInfo   } from "./thunkActions";
// import { fetchAddTodo, fetchDeleteTodo, fetchTodos, fetchUpdateTodo, fetchUserInfo } from "./thunkActions";

export interface IUser {
    id: number,
    login: string,
    password?: string,
}

export type UserSliceState = {
    user: IUser,
    logStatus: boolean
}

const initialUser: IUser = {
    id: 0,
    login: ''
}

const initialState: UserSliceState = {
    user: initialUser,
    logStatus: false
};

const todoSlice = createSlice({
    name: 'userSlice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUserRegister.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.logStatus=true
        })
        builder.addCase(fetchUserLogin.fulfilled, (state, { payload }) => {
            state.user = payload;
            state.logStatus=true
        })
        builder.addCase(fetchUserInfo.fulfilled, (state, { payload })=> {
            state.user = payload;
            state.logStatus=true
        })
        builder.addCase(fetchUserLogout.fulfilled, (state, { payload })=> {
            if (payload)
            state.user = initialUser;
            state.logStatus = false
        })
    },
    reducers: {}
}
)

export default todoSlice.reducer;