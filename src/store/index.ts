import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./user";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { useDispatch } from "react-redux";

const reducers = combineReducers({
	user: UserReducer,
});

const persistConfig = {
	key: "root",
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store: any = configureStore({
	reducer: persistedReducer,
	devTools: true,
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
export const dispatch = store.dispatch;
export const useAppDispatch = () => useDispatch<IAppDispatch>();
