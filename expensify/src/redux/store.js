import { combineReducers, configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
const rootReducer = combineReducers({
  expenseReducer
});
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);
