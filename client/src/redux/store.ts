import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';
import taskSlice, { SliceState } from './taskSlice';
import userSlice, { UserSliceState } from './userSlice'
//SliceUseState

type StoreType = {
    taskSlice: SliceState;
    userSlice: UserSliceState;
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    taskSlice,
    userSlice,
  },
};

export const store = configureStore(storeOptions);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
