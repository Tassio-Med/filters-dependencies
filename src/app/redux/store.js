import { configureStore } from "@reduxjs/toolkit";
import { usuarioReducer, postReducer, albumReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    usuarios: usuarioReducer,
    albuns: albumReducer,
    post: postReducer, 
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;