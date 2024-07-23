import { IRootState } from "..";

export const selectUser = (state: IRootState) => state.user?.user;
export const selectToken = (state: IRootState) => state.user?.token;
