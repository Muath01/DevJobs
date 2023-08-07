import { configureStore } from "@reduxjs/toolkit";
import signedReducer from "./singedReducer";
import jobReducer from "./jobReducer";
export const store = configureStore({
  reducer: {
    setSigned: signedReducer,
    saveJobs: jobReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
