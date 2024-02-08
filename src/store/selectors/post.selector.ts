import {  POST_BANNED, POST_DELETED, POST_HIDDEN, POST_PUBLISHED } from '../../constants';
import { RootState } from '../../types';



export const selectPostIds = (state: RootState) => {
    return Object.keys(state.post);
};

export const selectPublishedPostIds = (state: RootState) => {
    let postIds = [];
    for (let k of Object.keys(state.post)) {
        if (state.post[k].status === POST_PUBLISHED) {
            postIds.push(k);
        }
    }
    return postIds;
};

export const selectBannedPostIds = (state: RootState) => {
    let postIds = [];
    for (let k of Object.keys(state.post)) {
        if (state.post[k].status === POST_BANNED) {
            postIds.push(k);
        }
    }
    return postIds;
};

export const selectDeletedPostIds = (state: RootState) => {
    let postIds = [];
    for (let k of Object.keys(state.post)) {
        if (state.post[k].status === POST_DELETED) {
            postIds.push(k);
        }
    }
    return postIds;
};

export const selectHiddenPostIds = (state: RootState) => {
    let postIds = [];
    for (let k of Object.keys(state.post)) {
        if (state.post[k].status === POST_HIDDEN) {
            postIds.push(k);
        }
    }
    return postIds;
};

export const selectPostById = (id: string) => (state: RootState) => {
    return state.post[id];
};

export const selectPost = (state: RootState) => {
    return state.post;
}