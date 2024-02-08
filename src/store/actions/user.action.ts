import API, { STATUS, apiRequest } from "../../apiConfig";
import { ERROR, SUCCESS, UPDATE_USER } from "../../constants";
import { AppDispatch, LoginPayload } from "../../types";
import { createAction } from "../store";

export const loginUser = (formData: LoginPayload) => (dispatch: AppDispatch) => {
    return fetch(API.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
    })
    .then( res => res.json())
    .then( data => {
        if (data.code === STATUS.SUCCESS) {
            localStorage.setItem("token", data.data);
            return apiRequest("http://localhost:8888/api/user", {});
        } else {
            dispatch(createAction(ERROR, data.info));
        }
    })
    .then(res => res?.json())
    .then(data => {
        if (data.code === STATUS.SUCCESS) {
            dispatch(createAction(UPDATE_USER, data.data));
        }
    })
    .then(() => dispatch(createAction(SUCCESS, 'Successfully login users.')));
    
}

export const getUser = () => (dispatch: AppDispatch) => {
    return apiRequest("http://localhost:8888/api/user", {
        method: "GET",
    })!
    .then( res => res.json())
    .then( data => {
        if (data.code === STATUS.SUCCESS) {
            return apiRequest("http://localhost:8888/api/user", {});
        } else {
            dispatch(createAction(ERROR, data.info));
        }
    })
    .then(res => res?.json())
    .then(data => {
        if (data.code === STATUS.SUCCESS) {
            dispatch(createAction(UPDATE_USER, data.data));
        }
    })
    .then(() => dispatch(createAction(SUCCESS, 'Successfully login users.')));
    
}