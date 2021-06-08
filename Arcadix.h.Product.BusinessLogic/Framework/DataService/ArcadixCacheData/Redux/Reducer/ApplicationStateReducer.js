//import { handleActions } from "redux-actions";
//import Action from "../Actions/ActionInterface";
import { ADD_APP_STATE_PROPERTY, SET_INITIAL_APPLICATION_STATE, REMOVE_APP_STATE_PROPERTY } from '@shared/Framework/DataService/ArcadixCacheData/Redux/Actions/ApplicationStateActionCreators'





const addAppStateProperty = (state, value, Key, callback) => {
    var newState = { ...state, [Key]: value }
    if (callback !== null && typeof(callback) === "function")
        callback(newState[Key]);
    return newState;
};

const initializeReducer = (state, data) => {
    return { ...state, ...data };
}

const removeAppStateProperty = (state, Key, callback) => {
    const { [Key]:value , ...newState} = state;
    return newState;
}

const ApplicationStateReducer = function (state = {}, action) {
    switch (action.type) {
        case ADD_APP_STATE_PROPERTY:
            return addAppStateProperty(state, action.payload.data, action.payload.Key, action.payload.callback)
        case REMOVE_APP_STATE_PROPERTY:
            return removeAppStateProperty(state, action.payload.Key, action.payload.callback)
        case SET_INITIAL_APPLICATION_STATE:
            return initializeReducer(state, action.payload.data);
        default:
            return state;
    }
};
export default ApplicationStateReducer;