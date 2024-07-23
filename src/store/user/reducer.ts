import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAccessToken } from "../../config/axios.config";

const initialState = {
	token: "",
	expiresIn: "",
	user: null,
};

export interface IAccountState {
	token: string;
	expiresIn: string;
	user: any;
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateAccount(state: IAccountState, action: PayloadAction<IAccountState>) {
			state.token = action.payload.token;
			state.expiresIn = action.payload.expiresIn;
			state.user = action.payload.user;
			setAccessToken(action.payload.token);
		},
		deleteAccount(state: IAccountState) {
			(state.token = ""), (state.expiresIn = ""), (state.user = null);
			setAccessToken("");
		},
	},
});

export const { updateAccount, deleteAccount } = userSlice.actions;

export const UserReducer = userSlice.reducer;
