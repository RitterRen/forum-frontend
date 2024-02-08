import API, { STATUS, apiRequest } from "../../apiConfig";
import { EditPostContent } from "../../components/EditPost";
import { PostContent } from "../../components/NewPost";
import { ALL, BANNED, BAN_POST, DELETED, DELETE_POST, ERROR, HIDE_POST, LOAD_POST, RECOVER_POST, SUCCESS, UPDATE_POST, UPDATE_REPLY, UPDATE_SUBREPLY } from "../../constants";
import { AppDispatch, IUser } from "../../types";
import { selectUser } from "../selectors/user.selector";
import { createAction } from "../store";

export const loadPosts = () => (dispatch: AppDispatch) => {
    // const apis = {
    //     [ALL]: "http://localhost:8888/api/composite/post/published",
    //     [BANNED]: "http://localhost:8888/api/composite/post/banned",
    //     [DELETED]: "http://localhost:8888/api/composite/post/deleted"
    // }
    return apiRequest("http://localhost:8888/api/composite/post/all", {
        method: "GET"
    })!
    .then(res => res.json())
    .then(data => {
        if (data.code === STATUS.SUCCESS) {
            dispatch(createAction(LOAD_POST, data.data));
        } else {
            dispatch(createAction(ERROR, data.info));
        }
    })
}

export const replyPost = (payload: any) => (dispatch: AppDispatch) => {
    
    const apis: {[id: number]: string} = {
        0: "http://localhost:8888/api/post/replyToPost/",
        1: "http://localhost:8888/api/post/replyToReply/",
    }
    if (payload.type == 0) {
        apiRequest(apis[payload.type as keyof {[id: number]: string}] + payload.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comment: payload.comment }),
        })!
        .then(res => res.json())
        .then(data => {
            if (data.code === STATUS.SUCCESS) {
                let reply = data.data;
                delete reply.userId;
                dispatch(createAction(UPDATE_REPLY, {...reply, id: payload.id, user: payload.user}));
            } else {
                dispatch(createAction(ERROR, data.info));
            }
        })
    } else {
        apiRequest(apis[payload.type as keyof {[id: number]: string}] +`?postId=${payload.id}&userId=${payload.userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comment: payload.comment }),
        })!
        .then(res => res.json())
        .then(data => {
            if (data.code === STATUS.SUCCESS) {
                let reply = data.data;
                delete reply.userId;
                dispatch(createAction(UPDATE_SUBREPLY, {...reply, id: payload.id, user: payload.user, replyUserId: payload.userId }));
            } else {
                dispatch(createAction(ERROR, data.info));
            }
        })
    }
    
}

export const createPost = (postContent: PostContent) => (dispatch: AppDispatch) => {
    
    return apiRequest("http://localhost:8888/api/post/createNewPost", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postContent)
    })!
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.code === STATUS.SUCCESS) {
            dispatch(createAction(LOAD_POST, data.data));
        } else {
            dispatch(createAction(ERROR, data.info));
        }
    });
}

export const editPost = (payload: {payload:EditPostContent, id: string, user: IUser}) => (dispatch: AppDispatch) => {
    
    return apiRequest(`http://localhost:8888/api/post/updatePostById/${payload.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload.payload)
    })!
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.code === STATUS.SUCCESS) {
            dispatch(createAction(UPDATE_POST, {data:{...data.data, user: payload.user}, payload: payload}));
        } else {
            dispatch(createAction(ERROR, data.info));
        }
    });
}

export const banPost = (id: string) => (dispatch: AppDispatch) => {
    
    return apiRequest(`http://localhost:8888/api/post/togglePostStatus?postId=${id}&status=Banned`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    })!
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.code === STATUS.SUCCESS) {
            dispatch(createAction(BAN_POST, id));
        } else {
            dispatch(createAction(ERROR, data.info));
        }
    });
}

export const deletePost = (id: string) => (dispatch: AppDispatch) => {
    
    return apiRequest(`http://localhost:8888/api/post/togglePostStatus?postId=${id}&status=Deleted`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    })!
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.code === STATUS.SUCCESS) {
            dispatch(createAction(DELETE_POST, id));
        } else {
            dispatch(createAction(ERROR, data.info));
        }
    });
}

export const recoverPost = (id: string) => (dispatch: AppDispatch) => {
    
    return apiRequest(`http://localhost:8888/api/post/togglePostStatus?postId=${id}&status=Published`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    })!
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.code === STATUS.SUCCESS) {
            dispatch(createAction(RECOVER_POST, id));
        } else {
            dispatch(createAction(ERROR, data.info));
        }
    });
}

export const hidePost = (id: string) => (dispatch: AppDispatch) => {
    
    return apiRequest(`http://localhost:8888/api/post/togglePostStatus?postId=${id}&status=Hidden`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    })!
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.code === STATUS.SUCCESS) {
            dispatch(createAction(HIDE_POST, id));
        } else {
            dispatch(createAction(ERROR, data.info));
        }
    });
}

export const createHistory = (userId: number, postId: string) => (dispatch: AppDispatch) => {
    
    return apiRequest("http://localhost:8888/api/history", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userId: userId, postId: postId})
    })!
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
    });
}