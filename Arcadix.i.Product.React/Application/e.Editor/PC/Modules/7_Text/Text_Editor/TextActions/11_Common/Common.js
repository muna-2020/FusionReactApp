//store related imports.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name RemoveActiveWrapFromStore
 * @summary remove Active wrapper detail from the store if exist.
 * */
export const RemoveActiveWrapFromStore = () => {
    if (EditorState.GetProperty("ActiveWrapDetail")) {
        EditorState.RemoveProperty("ActiveWrapDetail")
    }
};

/**
 * @name UpdateActiveWrapToStore
 * @param {object} objWrapDetail wrap object detail.
 * @summary update the active wrap detail to store.
 */
export const UpdateActiveWrapToStore = (objWrapDetail) => {
    EditorState.SetProperty("ActiveWrapDetail", {
        ...EditorState.GetProperty("ActiveWrapDetail"),
        ...objWrapDetail
    });
};

/**
 * @name GetActiveWrapDetailFromStore
 * @summary this returns the active wrap detail from the store.
 * */
export const GetActiveWrapDetailFromStore = () => {
    return EditorState.GetProperty("ActiveWrapDetail");
}

/**
 * @name RemoveActiveWrapDetailFromStore 
 * @summary remove the ActiveWrapDetail from the store.
 * */
export const RemoveActiveWrapDetailFromStore = () => {
    if(EditorState.GetProperty("ActiveWrapDetail")) {
      EditorState.RemoveProperty("ActiveWrapDetail");
    }
};

/**
 * @name UpdateClickElementToStore 
 * @summary update click element to store.
 **/
export const UpdateClickElementToStore = (objClickElement) => {
    EditorState.SetProperty("ActiveClickElement", objClickElement);
};

/**
 * @name GetClickElement 
 * @summary return click element.
 **/
export const GetClickElement = () => {
    return EditorState.GetProperty("ActiveClickElement");
};
