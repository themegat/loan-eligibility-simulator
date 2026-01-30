import { configureStore } from "@reduxjs/toolkit";
import { loansApi } from "./loansApi";

export const store = configureStore({
  reducer: {
    // [baseSplitApi.reducerPath]: baseSplitApi.reducer,
    [loansApi.reducerPath]: loansApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loansApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
