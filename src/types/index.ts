import store from "../store/store";
import type { Action } from 'redux';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type PostPayload = {
    postId: number,
    user: IUser,
    title: string,
    content: string,
    dateCreated: string,
    dateModified?: string,
    postReplies: Array<IPostReply>
};

export type ProductAction = Action<string> & { payload: PostPayload };

export type IPost = {
    username: string,
    title: string,
    date: string,
};


export type IPostReply = {
    user: IUser,
    comment: string,
    isActive: boolean,
    dateCreated: string,
    subReplies: Array<ISubReply>
};

export type ISubReply = {
    user: IUser,
    comment: string,
    isActive: boolean,
    dateCreated: string,
};

export type IUser = {
    userId: number,
    name: string,
    profileImageURL: string
};

export type UserModel = {
    userId: number;
    email: string,
    firstName: string;
    lastName: string;
    dateJoined: string;
    active: boolean;
    role: string;
    profileImageURL: string;
}

export type HistoryModel = {
    id: number;
    userId: number;
    postId: number;
    viewDate: string;
}