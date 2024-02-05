import store from "../store/store";
import type { Action } from 'redux';

export type RootState = ReturnType<typeof store.getState>;

export type ProductPayload = {
    id: string;
    name: string;
    quantity: number;
    price: number;
};

export type ProductAction = Action<string> & { payload: ProductPayload };

export type IPost = {
    username: string,
    title: string,
    date: string,
};


export type IPostReply = {
    userId: number,
    comment: string,
    isActive: boolean,
    dateCreated: Date,
    subReplies: Array<ISubReply>
};

export type ISubReply = {
    userId: number,
    comment: string,
    isActive: boolean,
    dateCreated: Date,
};

export type IUser = {
    userId: number, 
    firstName: string,
    lastName: string, 
    email: string, 
    password: string, 
    active: boolean,
    dateJoined: Date, 
    type: string, 
    profileImageURL: string
};