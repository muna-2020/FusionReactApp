//React related imports
import { useEffect } from 'react';

//Internal Services
import * as QueryString from '@root/Framework/Services/QueryString/QueryString';

/**
 * @name OnSelectNode
 * @param {any} objSelectedNode
 * @param {any} arrNewNodes
 * @param {any} arrFileComments
 * @param {any} objContext
 * @summary updates the file content array based on seleted nodes.
 */
export function OnSelectNode(objSelectedNode, arrNewNodes, arrFileComments, objContext) {
    let blnCommentsFound = false;
    if (objSelectedNode != undefined) {
        arrFileComments.map(objFileComments => {
            let arrContent = [];
            objFileComments["Content"].map(objContent => {
                arrContent = [...arrContent, { ...objContent, expand: false }];
            });
            if (objFileComments["Id"] === objSelectedNode["Id"]) {
                objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrFileCommentsContent": arrContent } });
                blnCommentsFound = true;
            }
        });
    }
    if (!blnCommentsFound)
        objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrFileCommentsContent": [] } });
    window.history.pushState({}, "", window.location.href.split("?")[0] + "?FileName=" + objSelectedNode.Id);
}

/**
 * @name GetFileName
 * @param {any} strFileName
 * @summary Get the file path of the file name passed through query string.
 */
export function GetFilePath(strFileName) {    
    let objFilePath;
    FileStructure.map(objFiles => {
        let arrFiles = objFiles.Id.split("/");
        if (strFileName.split("/").length <= 1) {
            if (arrFiles[arrFiles.length - 1] == strFileName)
                objFilePath = objFiles;
        }
        else {
            if (objFiles.Id == strFileName)
                objFilePath = objFiles;
        }

    });
    return objFilePath;
}

/**
 * @name useOnInitialLoad
 * @param {any} objContext
 * @summary get the file content of the selected file on initial load.
 */
export function useOnInitialLoad(objContext) {
    useEffect(() => {
        let strFileName = QueryString.GetQueryStringValue("FileName");
        if (strFileName != null && strFileName != "") {
            OnSelectNode(GetFilePath(strFileName), [], FileComments, objContext);
        }
    }, [])
}

/**
 * @name ToggleShowMethod
 * @param {any} objContext
 * @param {any} intMethodIndex
 * @param {any} blnToggleShow
 */
export function ToggleShowMethod(objContext, intMethodIndex, blnToggleShow) {
    console.log(objContext.state.arrFileCommentsContent[intMethodIndex]);
    let arrContent = [];
    objContext.state.arrFileCommentsContent.map((objFileCommentsContent, index) => {    
        arrContent = [...arrContent, { ...objFileCommentsContent, expand: index === intMethodIndex ? !blnToggleShow : objFileCommentsContent["expand"]}];        
    });
    objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrFileCommentsContent": arrContent } });
}

/**
* @summary Reducer
* @returns {*} initial state object
*/
export function GetInitialState() {
    return {
        arrFileCommentsContent: []
    };
}

/**
* @param {*} state  takes state
* @param {*} action  takes action
* @summary Reducer
* @returns {*} actions to perform
*/
export const Reducer = (state, action) => {
    switch (action.type) {
        case "DATA_LOAD_COMPLETE":
            return {
                ...state,
                ["isLoadComplete"]: action.payload
            };
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            };
    }
};