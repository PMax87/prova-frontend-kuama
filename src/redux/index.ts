import { configureStore } from "@reduxjs/toolkit/react";
import FormDataReducer from "./FormDataReducer";

export const store = configureStore({
  reducer: {
    formData: FormDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
