
//import Action from "./ActionInterface";
export const ADD_VALUE = "ADD_VALUE";
export const EDIT_VALUE = "EDIT_VALUE";
export const DELETE_VALUE = "DELETE_VALUE";
export const DELETE_KEY = "DELETE_KEY";
export const DELETE_PROPERTY = "DELETE_PROPERTY";
export const ADD_PROPERTY = "ADD_PROPERTY";
//export type ADD_VALUE = { id: number, strEntity: string, objValue: any, fnCallBack?: any }
//export type DELETE_VALUE = { strEntity: string, objFilters: any, fnCallBack?: any }
//export type EDIT_VALUE = { strEntity: string, objFilters: any, fnCallBack?: any }
//export type DELETE_KEY = { strEntity: string, objFilters: any, fnCallBack?: any }


export function AddValue(strEntity, objValue, fnCallBack) {
    return {
        type: ADD_VALUE,
        payload: {
            id: 123,
            strEntity,
            objValue,
            fnCallBack
        }
    }
}

export function DeleteValue(strEntity, objFilters, fnCallBack) {
    return {
        type: DELETE_VALUE,
        payload: {
            strEntity,
            objFilters,
            fnCallBack

        }
    };
}

 export function EditValue(strEntity, objFilters, fnCallBack) {
    return {
        type: EDIT_VALUE,
        payload: {
            strEntity,
            objFilters,
            fnCallBack
        }
    }
}

 export function DeleteKey(strEntity, objFilters, fnCallBack) {
    return {
        type: DELETE_KEY,
        payload: {
            strEntity,
            objFilters,
            fnCallBack
        }
    }
}

export function DeleteProperty(strEntity) {
    return {
        type: DELETE_PROPERTY,
        payload: {
            strEntity
        }
    };
};

export function AddProperty(strEntity, objParams) {
    return {
        type: ADD_PROPERTY,
        payload: {
            objParams,
            strEntity
        }
    }
};












