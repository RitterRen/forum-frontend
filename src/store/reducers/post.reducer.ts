import { Reducer } from 'redux';
import { UPDATE_PRODUCT } from '../../constants';
import { PostPayload, ProductAction } from '../../types';

interface IPostState {
    [id: string]: PostPayload;
}

const initialState: IPostState = {
    1: {
        postId: 1,
        username: "JohnDoe",
        title: "First Post",
        date: "2024-02-04T13:00:00Z"
    },
    2: {
        postId: 2,
        username: "AliceSmith",
        title: "Hello World",
        date: "2024-02-04T14:15:00Z"
      },
    3: {
        postId: 3,
        username: "BobJohnson",
        title: "Coding Adventures",
        date: "2024-02-04T15:30:00Z"
      }
};

const postReducer: Reducer<IPostState, ProductAction> = function (
    prevState = initialState,
    action,
) {
    const { type, payload } = action;
    Object.freeze(prevState); // prevents us from accidentally mutating state

    switch (type) {
            
        default:
            return prevState;
    }
};

export default postReducer;
