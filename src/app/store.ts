import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "features/api/apiSlice";
import { MODAL_SLICE, modalReduser } from "features/modal/modalSlice";
import { SEARCH_SLICE, searchReduser } from "features/search/searchSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [MODAL_SLICE]: modalReduser,
    [SEARCH_SLICE]: searchReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([apiSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
