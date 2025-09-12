import { combineReducers, configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenseSlice";
import budgetReducer from "./budgetSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
const rootReducer = combineReducers({
  expenseReducer,
  budgetReducer
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
