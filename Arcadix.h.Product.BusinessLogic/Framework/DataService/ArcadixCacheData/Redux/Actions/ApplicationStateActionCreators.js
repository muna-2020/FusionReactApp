
//import Action from "./ActionInterface";

 export const ADD_APP_STATE_PROPERTY = 'ADD_APP_STATE_PROPERTY'
 //type ADD_APP_STATE_PROPERTY = { Key, data, callback?};

 export const SET_INITIAL_APPLICATION_STATE = "SET_INITIAL_APPLICATION_STATE";
 //type SET_INITIAL_APPLICATION_STATE = { data };

export const REMOVE_APP_STATE_PROPERTY = "REMOVE_APP_STATE_PROPERTY";


export function AddAppStateProperty(Key, data,callback) {
    return {
        type: ADD_APP_STATE_PROPERTY,
        payload: {
            Key,
            data,
            callback
        }
    }
}

export function RemoveAppStateProperty(Key,callback) {
    return {
        type: REMOVE_APP_STATE_PROPERTY,
        payload: {
            Key,
            callback
        }
    }
}

export function InitializeApplicationState(data) {
    return {
        type: SET_INITIAL_APPLICATION_STATE,
        payload: {
            data
        }
    }
}
