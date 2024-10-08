import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import usersReducer from "./slices/users";
import coursesReducer from "./slices/courses";
import reservationsReducer from "./slices/reservations";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["users", "courses"]
};

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  courses: coursesReducer,
  reservations: reservationsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
