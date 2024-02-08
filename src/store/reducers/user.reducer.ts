import { Reducer } from "react";
import { ERROR, ROLE_VISITOR, SUCCESS, UPDATE_USER } from "../../constants";
import { IRequest, IUser, UserAction } from "../../types";

interface IUserState {
    request: IRequest;
    user: IUser;
}

const initialState: IUserState = {
    request: {
        success: false,
        message: ''
    },
    user: {
        userId: -1, 
        email: "",
        firstName: "Guest",
        lastName: "",
        active: false,
        dateJoined: "",
        role: ROLE_VISITOR
    }
};

const userReducer: Reducer<IUserState, UserAction> = function (
    prevState = initialState,
    action,
) {
    const { type, payload } = action;
    Object.freeze(prevState); // prevents us from accidentally mutating state

    switch (type) {
        case UPDATE_USER: {
            let newState = { ...prevState };
            newState.user = payload as IUser;
            return newState;
        }

        case SUCCESS: {
            let newState = { ...prevState };
            newState.request.success = true;
            newState.request.message = payload as string;
            return newState;
        }

        case ERROR: {
            let newState = { ...prevState };
            newState.request.success = false;
            newState.request.message = payload as string;
            return newState;
        }
        
        default:
            return prevState;
    }
};

export default userReducer;
