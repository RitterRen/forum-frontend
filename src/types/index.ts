import store from "../store/store";
import type { Action, AnyAction } from 'redux';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Generics default type for ReturnType
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export type PostAction = Action<string> & { payload: any };
export type UserAction = Action<string> & { payload: IUser | string};

export type PostPayload = {
    postId: string,
    user: IUser,
    title: string,
    content: string,
    status: string,
    images: string[],
    attachments: string[],
    dateCreated: string,
    dateModified?: string,
    archived: boolean,
    postReplies: IPostReply[]
};

export type LoginPayload = {
    email: string,
    password: string
}

export type IRequest = {
    success: boolean, 
    message: string, 
}


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
    name?: string,
    email: string,
    firstName: string,
    lastName: string,
    active: boolean,
    dateJoined: string,
    role: string,
    profileImageURL?: string
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
    postId: string;
    viewDate: string;
}

export type ContactModel = {
    Subject: string,
    email: string,
    message: string
}
