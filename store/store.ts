import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// export type AppStore = ReturnType<typeof store.getState>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// import { configureStore } from '@reduxjs/toolkit'

// export default configureStore({
//   reducer: {}
// })
