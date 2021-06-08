//React related imports.
import React, {useRef, useReducer } from "react";

//EditorState class imports.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Module related imports.
import * as SearchReplaceSidebar_Hooks from '@shared/Application/e.Editor/Modules/2_OfficeRibbon/1_StartTab/SearchReplaceSidebar/SearchReplaceSidebar_Hooks';
import SearchReplaceSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/1_StartTab/SearchReplaceSidebar/SearchReplaceSidebar_ModuleProcessor";

//Base classes/methods.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';  

/**
 * @name SearchReplace
 * @param {object} props props from parent
 * @summary Search replace sidebar component to display search and replace the text.
 */
const SearchReplaceSidebar = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, SearchReplaceSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, ["SearchReplaceSidebar_ModuleProcessor"]: new SearchReplaceSidebar_ModuleProcessor() };

    const searchRef = useRef(null); // search input dom ref.
    const replaceRef = useRef(null); // replace input dom ref.

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
     */
    EditorBase_Hook.InitializeCss(props, objContext.SearchReplaceSidebar_ModuleProcessor);

    /**
     * @name ResetSearch
     * @summary reset the search.
     * */
    const ResetSearch = () => {
        window.getSelection().removeAllRanges();
        objContext.dispatch({
            type: "SET_STATE",
            payload: { findCount: 0, activeContentEditable: "", ActiveTextCount: 0, activeIndex: 0 }
        })
    };

    /**
     * @name ReplaceText
     * @summary replace the searched text with replace text.
     * */
    const ReplaceText = () => {
        if (window.getSelection) {
            let range = document.getSelection().getRangeAt(0);
            range.deleteContents();
            let textNode = document.createTextNode(replaceRef.current.value);
            range.insertNode(textNode);
        }
    };

    /**
     * @name GetActiveTaskId
     * @summary returns the Active Task Unique id from the editor state.
     * */
    const GetActiveTaskId = () => {
        let EditorRef = EditorState.GetReference("EditorRef");
        if (EditorRef && EditorRef.current && EditorRef.current.GetActiveTaskId) {
            return EditorRef.current.GetActiveTaskId();
        }
    };

    /**
     * @name FindNext
     * @summary search next available text.
     */
    const FindNext = () => {
        let domActiveContainer = document.getElementById('activeworkarea_' + "edit" + '_' + GetActiveTaskId()); // get all contenteditable from the active work area.
        let arrDomNodes = domActiveContainer.querySelectorAll('div[contenteditable=true]');
        const findNext_Div = (intIndex) => { // method will be called everytime for the next index.
            let domNthDiv = arrDomNodes[intIndex];
            let strActiveDivId = domNthDiv.getAttribute('id') // id of the content eidtable 
            let intActiveTextCount = SubStrCount(domNthDiv.innerText, searchRef.current.value, state.caseSensitive); // count of searchkey string present.
            if (intActiveTextCount > 0) {  // search and select only if the count is more than 0.
                if (window.find) {
                    let boolFound = window.find(searchRef.current.value, state.caseSensitive, false, true, state.wholeWord);
                    if (boolFound) {
                        state.replace && ReplaceText();
                        objContext.dispatch({
                            type: "SET_STATE",
                            payload: { activeContentEditable: strActiveDivId, ActiveTextCount: intActiveTextCount, findCount: 1, activeIndex: intIndex }
                        });
                    }
                    else {
                        if (arrDomNodes.length > (intIndex + 1)) {
                            findNext_Div(intIndex + 1)
                        } else {
                            ShowSearchPopup();
                        }
                    }
                } else {
                    console.log('browser does not support find');
                }
            } else {
                if (arrDomNodes.length > (intIndex + 1)) {
                    findNext_Div(intIndex + 1)
                } else {
                    ShowSearchPopup();
                }
            }
        }
        if (state.activeContentEditable === "") {  // first time search
            if (arrDomNodes.length > 0) {
                findNext_Div(0);  //starting from first active div
            } else {
                ShowSearchPopup();
            }
        } else {
            if (state.findCount < state.ActiveTextCount) {
                if (window.find) {
                    let boolFound = window.find(searchRef.current.value, state.caseSensitive, false, true, state.wholeWord);
                    if (boolFound) {
                        state.replace && ReplaceText();
                        objContext.dispatch({
                            type: "SET_STATE",
                            payload: { findCount: state.findCount + 1 }
                        });
                    } else {
                        ShowSearchPopup();
                    }
                }
            } else if (state.findCount == state.ActiveTextCount) {
                if (arrDomNodes.length > state.activeIndex + 1) {  // search next div only if activeIndex is less than div count
                    findNext_Div(state.activeIndex + 1)
                } else {
                    // all search completed
                    ShowSearchPopup();
                }
            }
        }
    };

    /**
     * @name GetAllTextMatchCount
     * @summary this returns the text match count.
     * */
    const GetAllTextMatchCount = (arrDomNodes) => {
        let intTotalCount = 0;
        for (let i = 0; i < arrDomNodes.length; i++) {
            intTotalCount = intTotalCount + SubStrCount(arrDomNodes[i].innerText, searchRef.current.value, state.caseSensitive);
        }
        return intTotalCount;
    }

    /**
     * @name ReplaceAll
     * @summary replaces all available text with entered text.
     * */
    const ReplaceAll = () => {
        let domActiveContainer = document.getElementById('activeworkarea_' + "edit" + '_' + GetActiveTaskId());
        let arrDomNodes = domActiveContainer.querySelectorAll("[contenteditable=true].text-editor-main");
        let intTotalCount = GetAllTextMatchCount(arrDomNodes);
        let intActiveTextCount;
        const replace = (intIndex) => {
            let objDomNode = arrDomNodes[intIndex];
            intActiveTextCount = SubStrCount(objDomNode.innerText, searchRef.current.value, state.caseSensitive); // count of searchkey string present
            if (intActiveTextCount > 0) {
                if (window.find) {
                    let boolFound = window.find(searchRef.current.value, state.caseSensitive, false, true, state.wholeWord);
                    if (boolFound) {
                        intActiveTextCount--;
                        ReplaceText();
                        if (intActiveTextCount > 0) {
                            replace(intIndex);
                        } else if (arrDomNodes.length >= intIndex + 1) {
                            replace(intIndex + 1);
                        }
                    } else {
                        ShowSearchPopup();
                    }
                } else {
                    ShowSearchPopup();
                }
            } else if (intActiveTextCount == 0 && (arrDomNodes.length > intIndex + 1)) {
                replace(intIndex + 1);
            } else if (arrDomNodes.length === intIndex + 1) {
                ShowReplacePopup(intTotalCount);
            }
        }
        if (arrDomNodes.length > 0) {
            replace(0);
        } else {
            ShowSearchPopup();
        }
    };

    /**
     * @name ShowSearchPopup
     * @summary display the search popup.
     * */
    const ShowSearchPopup = () => {
        editorPopup.ShowPopup({
            "Data": {},
            "Meta": {
                "PopupName": 'SearchPopup',
                "Height": "222px",
                "Width": "390px",                
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true
            },
            "Events": {
                ResetSearch: ResetSearch
            },
            "CallBacks": {
            }
        });
    };

    /**
     * @name ShowSearchPopup
     * @summary display the search popup.
     * */
    const ShowReplacePopup = (intTotalTextCount) => {
        let objTextResource = {
            "ConfirmationPopup_ConfirmText": "The search process is complete. There were " + intTotalTextCount + " made replacements.",
            "ConfirmationPopup_ConfirmButtonText": "Ok",
            "ConfirmationPopup_CloseButtonText": "Abort"
        }
        editorPopup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                "ShowCloseIcon": true,
            },
            Resource: {
                Text: objTextResource,
                TextResourcesKey: "ConfirmationPopup",
                SkinPath: objContext.props.JConfiguration.EditorSkinPath,
            },
            Events: {
            },
            CallBacks: {}
        });
    };

    /**
     * @name SubStrCount
     * @param {string} main_str main text.
     * @param {string} sub_str sub string.
     * @param {boolean} i_case case sensitive.
     * @summary return the count of times the sub_str present in main_str.
     */
    const SubStrCount = (main_str, sub_str, i_case) => {
        main_str += '';
        sub_str += '';
        if (sub_str.length <= 0) {
            return main_str.length + 1;
        }
        let ICase = i_case ? 'g' : 'gi';
        let subStr = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return (main_str.match(new RegExp(subStr, ICase)) || []).length;
    };

    /**
     * @name OnWholeWordChange
     * @summary Whole Word Check on change handler.
     * */
    const OnWholeWordChange = () => {
        let boolStatus = state.wholeWord ? false : true;
        objContext.dispatch({
            type: "SET_STATE",
            payload: { wholeWord: boolStatus }
        });
    };

    /**
     * @name OnCaseSenstiveChange
     * @summary Case Sensitive Check on chage handler.
     * */
    const OnCaseSenstiveChange = () => {
        let boolStatus = state.caseSensitive ? false : true;
        objContext.dispatch({
            type: "SET_STATE",
            payload: { caseSensitive: boolStatus }
        });
    };

    /**
     * @name GetContent
     * @summary returns the common jsx of the table properties sidebar.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        return (
            <div class="overlay-textarea-flex">
                <div className="finder-block">
                    <div class="width-input">
                        <span>Search for:</span><input ref={searchRef} type="text" name="" id="" />
                    </div>
                    {
                        state.replace &&
                        <div class="width-input">
                            <span>Replace with:</span><input ref={replaceRef} type="text" name="" id="" />
                        </div>
                    }
                    <div class="width-input">
                        <span>Search whole word: </span>
                        <input type="checkbox" checked={state.wholeWord ? "checked" : undefined} onChange={OnWholeWordChange} name="" id="" />
                    </div>
                    <div class="width-input">
                        <span>Upper case and lower case:	</span>
                        <input type="checkbox" checked={state.caseSensitive ? "checked" : undefined} onChange={OnCaseSenstiveChange} name="" id="" />
                    </div>
                    <div class="bottom-bar finder-footer"
                     style={{display :"flex", justifyContent : "flex-end"}}
                    >
                        {
                            !state.replace && <button className="btn" onClick={objEvt => FindNext()} >Find Next</button>
                        }
                        {
                            state.replace &&
                            <React.Fragment>
                                <button className="btn" onClick={objEvt => FindNext()}>Replace</button>
                                <button className="btn" onClick={objEvt => ReplaceAll()}>Replace All</button>
                            </React.Fragment>
                        }
                        <button className="btn" onClick={objEvt => props.hideSidebar()}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * @summary calls GetContent method to get the JSX.
     * */
    return GetContent();
}

export default SearchReplaceSidebar;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = SearchReplaceSidebar_ModuleProcessor; 