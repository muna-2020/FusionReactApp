//import Action from "../Actions/ActionInterface";
import { ADD_VALUE, EDIT_VALUE, DELETE_VALUE, AddValue, DELETE_KEY, DELETE_PROPERTY, ADD_PROPERTY } from "@shared/Framework/DataService/ArcadixCacheData/Redux/Actions/ActionCreators";
//import { handleActions } from "redux-actions";
//const objectAssign = require('object-assign');


const addValue = (state = {}, objParams, strEntity, fnCallBack) => {

    var newState = {};
    if (objParams.Filter !== undefined) {
        if (state[strEntity] !== undefined) {
            if (state[strEntity][objParams.Filter] !== undefined) {
                newState = {
                    ...state,
                    [strEntity]: {
                        ...state[strEntity],
                        [objParams.Filter]: {
                            ...state[strEntity][objParams.Filter],
                            Data: [...objParams["Value"].Data, ...state[strEntity][objParams.Filter].Data],
                            TimeStamp: objParams["Value"].TimeStamp
                        }
                    }
                };
            }
            else {
                newState = {
                    ...state,
                    [strEntity]: {
                        ...state[strEntity],
                        [objParams.Filter]: {
                            Data: [...objParams["Value"].Data],
                            TimeStamp: objParams["Value"].TimeStamp
                        }
                    }
                };
            }
        }
        else {
            newState = {
                ...state,
                [strEntity]: {
                    [objParams.Filter]: {
                        Data: [...objParams["Value"].Data],
                        TimeStamp: objParams["Value"].TimeStamp
                    }
                }
            };
        }
    }
    else {
        if (state[strEntity] !== undefined) {
            newState = {
                ...state,
                [strEntity]: {
                    ...state[strEntity],
                    Data: [...objParams["Value"].Data, ...state[strEntity].Data],
                    TimeStamp: objParams["Value"].TimeStamp
                }
            };
        }
        else {
            newState = {
                ...state,
                [strEntity]: {
                    Data: [...objParams["Value"].Data],
                    TimeStamp: objParams["Value"].TimeStamp
                }
            };
        }
    }



    return newState;
};



const editValue = (state = {}, strEntity, objParams, fnCallBack) => {

    let newState = {};
    let changedEntity = [];
    if (objParams.Filter) {
        changedEntity = [...state[strEntity][objParams.Filter].Data];

        objParams["Value"].Data.forEach(Data => {
            let blnIsDataPresent = false;
            changedEntity = changedEntity.map(item => {
                if (item[objParams["Value"].PrimaryKeyName] !== Data[objParams["Value"].PrimaryKeyName] || !Data[objParams["Value"].PrimaryKeyName]) {
                    return item;
                }
                else {
                    blnIsDataPresent = true;
                    return Data;
                }
            });
            if (!blnIsDataPresent && Data) {
                changedEntity = [...changedEntity, Data];
            }
        });

        newState = {
            ...state,
            [strEntity]: {
                ...state[strEntity],
                [objParams.Filter]: {
                    ...state[strEntity][objParams.Filter],
                    Data: changedEntity,
                    TimeStamp: objParams["Value"].TimeStamp
                }
            }

        };
    }
    else {

        changedEntity = [...state[strEntity].Data];
        objParams["Value"].Data.forEach(Data => {
            let blnIsDataPresent = false;
            changedEntity = changedEntity.map(item => {
                if (item[objParams["Value"].PrimaryKeyName] !== Data[objParams["Value"].PrimaryKeyName] || !Data[objParams["Value"].PrimaryKeyName]) {
                    return item;
                }
                else {
                    blnIsDataPresent = true;
                    return Data;
                }
            });
            if (!blnIsDataPresent && Data) {
                changedEntity = [...changedEntity, Data];
            }
        });
        newState = {
            ...state,
            [strEntity]: {
                ...state[strEntity],
                Data: changedEntity,
                TimeStamp: objParams["Value"].TimeStamp
            }
        };
    }

    return newState;
};

const deleteValue = (state = {}, strEntity, objParams, fnCallBack) => {

    let newState = {};
    let changedEntity = [];
    if (objParams.Filter) {
        changedEntity = [...state[strEntity][objParams.Filter].Data];
        objParams["Value"].Data.forEach(Data => {
            changedEntity = changedEntity.map(item => {
                if (item[objParams["Value"].PrimaryKeyName] !== Data[objParams["Value"].PrimaryKeyName]) {
                    return item;
                }
                else {
                    return Data;
                }
            });
        });
        newState = {
            ...state,
            [strEntity]: {
                ...state[strEntity],
                [objParams.Filter]: {
                    ...state[strEntity][objParams.Filter],
                    Data: changedEntity,
                    TimeStamp: objParams["Value"].TimeStamp
                }
            }

        };
    }
    else {

        changedEntity = [...state[strEntity].Data];
        objParams["Value"].Data.forEach(Data => {
            changedEntity = changedEntity.map(item => {
                if (item[objParams["Value"].PrimaryKeyName] !== Data[objParams["Value"].PrimaryKeyName]) {
                    return item;
                }
                else {
                    return Data;
                }
            });
        });
        newState = {
            ...state,
            [strEntity]: {
                ...state[strEntity],
                Data: changedEntity,
                TimeStamp: objParams["Value"].TimeStamp
            }
        };
    }

    return newState;
};


const AddProperty = (state = {}, strEntity, objParams) => {
    if (state[strEntity]) {
        return {
            ...state,
            [strEntity]: {
                ...objParams,
                ...state[strEntity],
            }
        };
    }
    else {
        return {
            ...state,
            [strEntity]: {
                ...objParams
            }
        };
    }
};



const deleteKey = (state = {}, strEntity, objParams, fnCallBack) => {
    let newState = {};
    if (objParams.Filter) {
        newState = {
            ...state,
            [strEntity]: {
                ...state[strEntity],
                [objParams.Filter]: {
                    Data: objParams["Value"].Data,
                    TimeStamp: objParams["Value"].TimeStamp
                }
            }
        };
    }
    else {
        newState = {
            ...state,
            [strEntity]: {
                ...state[strEntity],
                Data: objParams["Value"].Data,
                TimeStamp: objParams["Value"].TimeStamp
            }
        };
    }

    return newState;
};

const findValue = (state = [], Key, editKeyName, editKeyValue, callBack) => {
    const stateCopy = objectAssign([], state);
    const valueToBeEdited = stateCopy.filter(obj => obj.Key === Key);
    if (valueToBeEdited !== null && valueToBeEdited.length > 0) {
        let objFound = valueToBeEdited[0].objList.filter(obj => obj[editKeyName] === editKeyValue);
        return objFound;
    }
    return [];
};

const DeleteProperty = (state, Entity) => {
    if (state[Entity]) {
        let { [Entity]: { }, ...objEverythingElse } = state;
        return objEverythingElse;
    }
    else {
        return state;
    }
};

const EntityReducer = function (state = {}, action) {
    switch (action.type) {
        case ADD_VALUE:
            return addValue(state, action.payload.objValue, action.payload.strEntity, action.payload.fnCallBack);
        case EDIT_VALUE:
            {
                const randomList = editValue(state, action.payload.strEntity, action.payload.objFilters, action.payload.fnCallBack);
                return randomList;
            }
        case DELETE_VALUE:
            {
                const randomList = deleteValue(state, action.payload.strEntity, action.payload.objFilters, action.payload.fnCallBack);
                return randomList;
            }
        case DELETE_KEY:
            {
                const randomList = deleteKey(state, action.payload.strEntity, action.payload.objFilters, action.payload.fnCallBack);
                return randomList;
            }
        case DELETE_PROPERTY:
            {
                return DeleteProperty(state, action.payload.strEntity);
            }
        case ADD_PROPERTY: return AddProperty(state, action.payload.strEntity, action.payload.objParams);
        default:
            return state;
    }
};

export default EntityReducer;


