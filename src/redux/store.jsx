import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import favSlice from "./favSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["favorite"],
};

const reducers = combineReducers({
  fav: favSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

const persistor = persistStore(store);
export { store, persistor };
