import { RootState } from '../../types';

export const selectPostIds = (state: RootState) => {
    return Object.keys(state.post);
};

export const selectPostById = (id: string) => (state: RootState) => {
    return state.post[id];
};