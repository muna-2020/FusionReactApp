import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Undo Redo imports
import { UpdateUndoRedoIconState } from '@shared/Application/e.Editor/Modules/1_EditorFrame/UndoRedo/UndoRedo';

/**
 * @name EditorFrame_UndoRedo
 * @summary This class is holds the methods which are called for performing Undo-Redo operations. 
 * */
class EditorFrame_UndoRedo {

    /**
     * @name GetPreviousActivity
     * @param {object} objState  GLOBAL STATE
     * @summary Used the undo method, it gets the component key of the last component that did a change, so that  it can initiate an undo command to that component.
     * @returns {object} Previous State 
     */
    GetPreviousActivity(objState) {
        if (objState.ActivityQueue.length > 1) {
            return {
                LastActivity: objState.ActivityQueue[objState.ActivityQueue.length - 1],
                ActivityQueue: objState.ActivityQueue.slice(0, objState.ActivityQueue.length - 1),
                RedoQueue: [objState.ActivityQueue[objState.ActivityQueue.length - 1], ...objState.RedoQueue]
            };
        }
        else {
            return {
                LastActivity: objState.LastActivity,
                ActivityQueue: objState.ActivityQueue,
                RedoQueue: objState.RedoQueue
            };
        }
    }

    /**
     * @name GetNextActivity
     * @param {object} objState  GLOBAL STATE
     * @summary  Used the Redo method, it gets the component key of the next component in the global list of changes that did a change, so that  it can initiate an redo command to that component.
     * @returns {object} Next State
     */
    GetNextActivity(objState) {
        if (objState.RedoQueue.length > 0) {
            return {
                LastActivity: objState.RedoQueue[0],
                ActivityQueue: [...objState.ActivityQueue, objState.RedoQueue[0]],
                RedoQueue: objState.RedoQueue.slice(1, objState.RedoQueue.length)
            };
        }
        else {
            return {
                LastActivity: objState.LastActivity,
                ActivityQueue: objState.ActivityQueue,
                RedoQueue: objState.RedoQueue
            };
        }
    }

    /**
     * @name Undo
     * @summary  This method initiates the undo command in each of the components the actual undo is carried out by the components itself using the UndoRedo HOC.
     */
    Undo() {
        let objGlobalState = EditorState.GetProperty("UndoRedoQueue");
        let objEditorRef = EditorState.GetReference("EditorRef");
        if (objEditorRef && objEditorRef.current && objEditorRef.current.GetActiveTaskId) {
            let intActiveTaskId = objEditorRef.current.GetActiveTaskId();
            let PreviousActivity = this.GetPreviousActivity(objGlobalState[intActiveTaskId]);
            if (intActiveTaskId && objGlobalState && objGlobalState[intActiveTaskId]) {
                EditorState.SetProperty("UndoRedoQueue", {
                    ...objGlobalState,
                    [intActiveTaskId]: {
                        ...objGlobalState[intActiveTaskId],
                        ...PreviousActivity,
                        ActivityQueuePosition: objGlobalState[intActiveTaskId].ActivityQueuePosition > 0 ? objGlobalState[intActiveTaskId].ActivityQueue - 1 : 0,
                        Action: "Undo"
                    }
                });
            }
            objGlobalState = EditorState.GetProperty("UndoRedoQueue");
            let objComponentRef = EditorState.GetReference(objGlobalState[intActiveTaskId].LastActivity);
            if (objComponentRef) {
                objComponentRef.current.UndoRedo("", "Undo");
            }
        }
        UpdateUndoRedoIconState();
    };

    /**
     * @name Redo
     * @summary  This method initiates the Redo command in each of the components the actual redo is carried out by the components itself using the UndoRedo HOC.
     */
    Redo() {
        let objGlobalState = EditorState.GetProperty("UndoRedoQueue");
        let objEditorRef = EditorState.GetReference("EditorRef");
        if (objEditorRef && objEditorRef.current && objEditorRef.current.GetActiveTaskId) {
            let intActiveTaskId = objEditorRef.current.GetActiveTaskId();
            let NextActivity = this.GetNextActivity(objGlobalState[intActiveTaskId]);
            if (intActiveTaskId && objGlobalState && objGlobalState[intActiveTaskId]) {
                EditorState.SetProperty("UndoRedoQueue", {
                    ...objGlobalState,
                    [intActiveTaskId]: {
                        ...objGlobalState[intActiveTaskId],
                        ...NextActivity,
                        ActivityQueuePosition: objGlobalState[intActiveTaskId].ActivityQueuePosition > 0 ? objGlobalState[intActiveTaskId].ActivityQueue - 1 : 0,
                        Action: "Redo"
                    }
                });
            }
            objGlobalState = EditorState.GetProperty("UndoRedoQueue");
            let objComponentRef = EditorState.GetReference(objGlobalState[intActiveTaskId].LastActivity);
            if (objComponentRef) {
                objComponentRef.current.UndoRedo("", "Redo");
            }
        }
        UpdateUndoRedoIconState();
    }
}

export default EditorFrame_UndoRedo;
