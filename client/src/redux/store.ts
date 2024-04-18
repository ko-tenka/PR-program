import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';
import taskSlice, { SliceState } from './taskSlice';

// import postSlice, { SliceState } from './postSlice';

type StoreType = {
    taskSlice: SliceState;
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    taskSlice,
  },
};

export const store = configureStore(storeOptions);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
