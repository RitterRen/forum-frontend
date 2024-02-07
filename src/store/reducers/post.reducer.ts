import { Reducer } from 'redux';
import { SORT_POST_BY_DATE, SORT_POST_BY_REPLY } from '../../constants';
import { PostPayload, ProductAction } from '../../types';

interface IPostState {
    [id: string]: PostPayload;
}

function replyCompare( a: PostPayload, b: PostPayload) {
    return a.postReplies.length - b.postReplies.length;
}

const initialState: IPostState = {
    1: {
        postId: 1,
        user: {
            userId: 1, 
            name: 'John',
            profileImageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
        },
        title: "First Post",
        content: 'This is a new Post',
        dateCreated: "2024-02-04T13:00:00Z",
        postReplies: [
            {
                user: {
                    userId: 1, 
                    name: 'John',
                    profileImageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
                },
                "comment": "Great post!",
                "isActive": true,
                "dateCreated": "2024-02-04T13:45:00Z",
                "subReplies": [
                  {
                    user: {
                        userId: 1, 
                        name: 'John',
                        profileImageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
                    },
                    "comment": "Agreed!",
                    "isActive": true,
                    "dateCreated": "2024-02-04T14:00:00Z"
                  },
                  {
                    user: {
                        userId: 2, 
                        name: 'Jack',
                        profileImageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
                    },
                    "comment": "Interesting point!",
                    "isActive": false,
                    "dateCreated": "2024-02-04T14:30:00Z"
                  }
                ]
              },
              {
                user: {
                    userId: 3, 
                    name: 'Nick',
                    profileImageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
                },
                "comment": "Well written!",
                "isActive": true,
                "dateCreated": "2024-02-05T10:15:00Z",
                "subReplies": [
                  {
                    user: {
                        userId: 1, 
                        name: 'John',
                        profileImageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
                    },
                    "comment": "I appreciate that!",
                    "isActive": true,
                    "dateCreated": "2024-02-05T10:30:00Z"
                  }
                ]
              },
              {
                user: {
                    userId: 4, 
                    name: 'Will',
                    profileImageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
                },
                "comment": "Nice insights!",
                "isActive": false,
                "dateCreated": "2024-02-06T11:30:00Z",
                "subReplies": []
              }
        ]
    },
    2: {
        postId: 2,
        user: {
            userId: 1, 
            name: 'John',
            profileImageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
        },
        title: "Hello World",
        content: 'This is a new Post',
        dateCreated: "2024-02-04T14:15:00Z",
        dateModified: "2024-02-04T14:15:00Z",
        postReplies: []
      },
    3: {
        postId: 3,
        user: {
            userId: 1, 
            name: 'John',
            profileImageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'
        },
        title: "Coding Adventures",
        content: 'This is a new Post',
        dateCreated: "2024-02-04T15:30:00Z",
        postReplies: []
      }
};

const postReducer: Reducer<IPostState, ProductAction> = function (
    prevState = initialState,
    action,
) {
    const { type, payload } = action;
    Object.freeze(prevState); // prevents us from accidentally mutating state

    switch (type) {
        case SORT_POST_BY_REPLY: {
            let newState = { ...prevState };
            // newState.sort(replyCompare);
            return newState;
        }
        
        case SORT_POST_BY_DATE: {
            let newState = { ...prevState };
            // newState.sort(replyCompare);
            return newState;
        }

        default:
            return prevState;
    }
};

export default postReducer;
