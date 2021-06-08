//React Imports
import React, { forwardRef, useEffect, useRef} from 'react';

//Application state classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name UndoRedo
 * @param {any} Component Component to be wrapped
 * @summary This is an HOC which is responsible for handling all Undo-Redo related actions such as  maintaining a list of previous states as well as  performing the undo-redo actions.
 * @returns {component} The Component with added props.
 */
export const UndoRedo = (Component) => {
    let WrappedComp = forwardRef((props, ref) => {
        return <Component {...props} UndoRedoRef={ref} />;
    });
    return forwardRef((sprops, ref) => {
        const Comp = props => {
            let strComponentKey = "element_" + (props.ElementJson && props.ElementJson.iElementId ? props.ElementJson.iElementId : "");
            if (props.TextJson) {
                strComponentKey = "texteditor_" + props.TextJson.iElementId;
            }
            if (props.IsSubElement && props.IsSubElement == "Y") {
                strComponentKey = "subelement_" + props.ElementJson.iElementId;
            }
            let objComponentRef = useRef(null);
            useEffect(() => {
                EditorState.SetReference(strComponentKey, objComponentRef);
            }, [props]);
            return <WrappedComp {...props} ComponentKey={strComponentKey} ref={objComponentRef} />;
        };
        return <Comp ElementRef={ref} {...sprops} />;
    });
};

/**
 * @name UndoRedoUpdate
 * @param {object} objState Modified objState
 * @summary In the reducer all code manipulating the state must be wrapped in this method. It basically is responsible for maintain the undo-redo queue.
 * @returns {object} Updated objState object.
 */
export const UndoRedoUpdate = objState => {
    //let objEditorRef = EditorState.GetReference("EditorRef");
    //if (objEditorRef && objEditorRef.current && objEditorRef.current.SetActiveTaskeditStatus) {
    //    objEditorRef.current.SetActiveTaskeditStatus();
    //}
    let objNewState = { ...objState };
    let arrStateHistory = [];
    if (objState.StateHistory && objState.StateHistory.length > 0) {
        arrStateHistory = [...objState.StateHistory.slice(0, objState.CurrentImageIndex + 1), objNewState];
    }
    setTimeout(() => {
        UpdateAppState(objState.PageId, objState.ComponentKey);
    }, 100);
    return { ...objNewState, StateHistory: arrStateHistory, CurrentImageIndex: arrStateHistory.length - 1, rerender: !objState.renderer };
};

/**
 * @name UndoRedoInitialize
 * @param {object} State Initial State.
 * @param {object} props props to the component.
 * @summary This is to be wrapped on to the initial state BEFORE it is passed to the useReducer function.
 * @returns {object} UndoRedo initialized state.
 */
export const UndoRedoInitialize = (State, props) => {
    if (!props.PreservedState || props.PreservedState === null) {
        return {
            ...State,
            PageId: props.PageId,
            ComponentKey: props.ComponentKey,
            StateHistory: [{ ...State, StateHistory: [], ActivityQueuePosition: -1, rerender: true }],
            rerender: true, // remove.
            CurrentImageIndex: 0
        };
    }
    else {
        return {
            ...props.PreservedState
        };
    }
};

/**
 * @name UndoRedoReInitialize
 * @summary this reinitialize the state of a component.
 * */
export const UndoRedoGetReInitializedState = (objState, objProps) => {
    let { StateHistory, ...objNewState } = objState;
    return {
        ...objNewState,
        PageId: objProps.PageId,
        ComponentKey: objProps.ComponentKey,
        StateHistory: [{ ...objNewState, StateHistory: [], ActivityQueuePosition: -1, rerender: true }],
        rerender: true, // remove.
        CurrentImageIndex: 0
    }
};

/**
 * @name InitAppState
 * @param {number} intTaskId PageId
 * @summary This initializes the global undo-redo queue for a certain task.
 */
export const InitAppState = (intTaskId) => {
    let objGlobalState = EditorState.GetProperty("UndoRedoQueue");
    if (!objGlobalState || !objGlobalState[intTaskId]) {
        EditorState.SetProperty("UndoRedoQueue", {
            ...objGlobalState,
            [intTaskId]: {
                ActivityQueue: [],
                LastActivity: "",
                ActivityQueuePosition: 0,
                Action: "",
                RedoQueue: []
            }
        });
    }
};

/**
 * @name ReInitAppState
 * @param {number} intTaskId PageId
 * @summary This initializes the global undo-redo queue for a certain task.
 */
export const ReInitAppState = (intTaskId) => {
    let objGlobalState = EditorState.GetProperty("UndoRedoQueue");
    EditorState.SetProperty("UndoRedoQueue", {
        ...objGlobalState,
        [intTaskId]: {
            ActivityQueue: [],
            LastActivity: "",
            ActivityQueuePosition: 0,
            Action: "",
            RedoQueue: []
        }
    });
};

/**
 * @name UpdateAppState
 * @param {number} intTaskId PageId
 * @param {string} strComponentKey Unique key generated for each instance of the Component.
 * @summary Internal function used to update the global undo-redo queue after each action.
 */
export const UpdateAppState = (intTaskId, strComponentKey) => {
    let objGlobalState = EditorState.GetProperty("UndoRedoQueue");
    if (intTaskId) {
        if (objGlobalState[intTaskId].ActivityQueue.length > 0) {
            EditorState.SetProperty("UndoRedoQueue", {
                ...objGlobalState,
                [intTaskId]: {
                    ...objGlobalState[intTaskId],
                    ActivityQueue: objGlobalState[intTaskId].ActivityQueue ? [...objGlobalState[intTaskId].ActivityQueue, strComponentKey] : [strComponentKey],
                    LastActivity: strComponentKey,
                    ActivityQueuePosition: objGlobalState[intTaskId].ActivityQueue ? objGlobalState[intTaskId].ActivityQueue.length > 0 ? objGlobalState[intTaskId].ActivityQueue.length : 0 : 0,
                    Action: "",
                    RedoQueue: []
                }
            });
        }
        else {
            EditorState.SetProperty("UndoRedoQueue", {
                ...objGlobalState,
                [intTaskId]: {
                    ...objGlobalState[intTaskId],
                    ActivityQueue: [strComponentKey, strComponentKey],
                    LastActivity: strComponentKey,
                    ActivityQueuePosition: objGlobalState[intTaskId].ActivityQueue ? objGlobalState[intTaskId].ActivityQueue.length > 0 ? objGlobalState[intTaskId].ActivityQueue.length : 0 : 0,
                    Action: "",
                    RedoQueue: []
                }
            });
        }
    }
};

/**
 * @name UndoRedoAction
 * @param {object} LastActivity the component key of last instance of a component that was modified in any way
 * @param {string} strAction weather to undo or redo or do nothing
 * @param {object} objState objState that needs to be modified for undo-redo
 * @param {any} dispatch dispatch method from useReducer to dispatched the modified objState
 * @summary Performs the undo-redo actions in objState.
 */
export const UndoRedoAction = (LastActivity, strAction, objState, dispatch, fnUndoRedoActionCallback) => {
    if (strAction === "Undo") {
        let objNewState;
        if (fnUndoRedoActionCallback) {
            objNewState = fnUndoRedoActionCallback(strAction, objState, objState.StateHistory[objState.CurrentImageIndex - 1 > 0 ? objState.CurrentImageIndex - 1 : 0])
        } else {
            objNewState = objState.StateHistory[objState.CurrentImageIndex - 1 > 0 ? objState.CurrentImageIndex - 1 : 0];
        }
        dispatch({
            type: "REPLACE",
            payload: {
                ...objNewState,
                StateHistory: [...objState.StateHistory],
                CurrentImageIndex: objState.CurrentImageIndex - 1 > 0 ? objState.CurrentImageIndex - 1 : 0,
                rerender: !objState.rerender
            }
        });
    } else if (strAction === "Redo") {
        let objNewState;
        if (fnUndoRedoActionCallback) {
            objNewState = fnUndoRedoActionCallback(strAction, objState, objState.StateHistory[objState.CurrentImageIndex + 1 > objState.StateHistory.length - 1 ? objState.StateHistory.length - 1 : objState.CurrentImageIndex + 1]);
        } else {
            objNewState = objState.StateHistory[objState.CurrentImageIndex + 1 > objState.StateHistory.length - 1 ? objState.StateHistory.length - 1 : objState.CurrentImageIndex + 1];
        }
        dispatch({
            type: "REPLACE",
            payload: {
                ...objNewState,
                StateHistory: [...objState.StateHistory],
                CurrentImageIndex: objState.CurrentImageIndex + 1 > objState.StateHistory.length - 1 ? objState.StateHistory.length - 1 : objState.CurrentImageIndex + 1,
                rerender: !objState.rerender
            }
        });
    }
};
