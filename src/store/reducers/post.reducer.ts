import { Reducer } from 'redux';
import { BAN_POST, DELETE_POST, HIDE_POST, LOAD_POST, POST_BANNED, POST_DELETED, POST_HIDDEN, POST_PUBLISHED, RECOVER_POST, SORT_POST_BY_DATE, SORT_POST_BY_REPLY, UPDATE_POST, UPDATE_REPLY, UPDATE_SUBREPLY } from '../../constants';
import { PostAction, PostPayload } from '../../types';

interface IPostState {
    [id: string]: PostPayload;
}

const initialState: IPostState = {
    
    
};

const postReducer: Reducer<IPostState, PostAction> = function (
    prevState = initialState,
    action,
) {
    const { type, payload } = action;
    Object.freeze(prevState); // prevents us from accidentally mutating state

    switch (type) {
        case LOAD_POST: {
            let newState = { ...prevState };
            let posts = payload as PostPayload[];
            console.log(posts);
            posts.forEach(post => {
                newState[post.postId] = post;
            });
            return newState;
        }

        case UPDATE_POST: {
            let newState = { ...prevState };
            newState[payload.payload.id] = {...payload.data, user: payload.payload.user};
            return newState;
        }
        
        case UPDATE_REPLY: {
            let newState = { ...prevState };
            let postReplies = newState[payload.id].postReplies
            newState[payload.id] = {...newState[payload.id], postReplies: [...postReplies, payload]}
            return newState;
        }

        case UPDATE_SUBREPLY: {
            let newState = { ...prevState };
            let replyUserId = payload.replyUserId;
            delete payload.replyUserId
            for (let i = 0; i < newState[payload.id].postReplies.length; i++) {
                if (newState[payload.id].postReplies[i].user.userId == replyUserId) {
                    newState[payload.id].postReplies[i].subReplies.push(payload);
                }
            }
            return newState;
        }

        case BAN_POST: {
            console.log(payload);
            let newState = { ...prevState };
            newState[payload] = {...newState[payload], status: POST_BANNED };
            return newState;
        }
        
        case RECOVER_POST: {
            console.log(payload);
            let newState = { ...prevState };
            newState[payload] = {...newState[payload], status: POST_PUBLISHED };
            return newState;
        }

        case HIDE_POST: {
            let newState = { ...prevState };
            newState[payload] = {...newState[payload], status: POST_HIDDEN };
            return newState;
        }

        case DELETE_POST: {
            let newState = { ...prevState };
            newState[payload] = {...newState[payload], status: POST_DELETED };
            return newState;
        }
        default:
            return prevState;
    }
};

export default postReducer;
