import { RootState } from "../../types";

export const selectUser = (state: RootState) => {
    return state.user.user;
}

export const selectRequest = (state: RootState) => {
    return state.user.request;
}