import { configureStore } from "@reduxjs/toolkit";
import signedReducer from "./singedReducer";

export const store = configureStore({
  reducer: {
    setSigned: signedReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
