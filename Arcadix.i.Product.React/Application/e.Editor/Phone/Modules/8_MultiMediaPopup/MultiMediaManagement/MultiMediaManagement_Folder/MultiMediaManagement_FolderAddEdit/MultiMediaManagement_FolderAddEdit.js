// React related import
import React, { useReducer, useRef } from 'react';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

/**
 * @name MultiMediaManagement_FolderAddEdit
 * @param {object} props props from parent
 * @returns {any} retuns JSX
 */
const MultiMediaManagement_FolderAddEdit = (props) => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, {
            status: null,
            objUserFileData: props.Data.NodeData ? props.Data.NodeData : {},
            strActionType: props.Data.ActionType ? props.Data.ActionType.toLowerCase() : "add",
            blnShowError: false,
            blnEdited: false
        }
    );

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch };

    let objTextResource = objContext.props.Data.TextResource;

    const HandleSaveFolder = async (objContext) => {
        if (objContext.props.Data) {
            if (!objContext.state.blnEdited && objContext.state.strActionType === "edit") {
                editorPopup.ClosePopup(objContext.props.Id);
                return;
            }
            let objResponse = await objContext.props.CallBacks.SaveFolderDetails(objContext.state.objUserFileData);
            if (objResponse) {
                editorPopup.ClosePopup(objContext.props.Id);
            }
        }
    };

    const HandleOnChange = (objContext, e) => {
        objContext.dispatch({ "type": "SET_STATE", "payload": { "objUserFileData": { ...objContext.state.objUserFileData, [e.target.id]: e.target.value }, "blnEdited": true } });
    };

    return (
        <React.Fragment>
            <section>
                <div className="image-add-edit-header">
                    <h3>{objTextResource["Element_Management"]}</h3>
                    <span>{objTextResource["Add_Edit_Folder"]}</span>
                </div>
                <div className="popupContent">
                    <div className="ai-title"> {objTextResource["Properties"]} </div>

                    <div className="ai-flex">
                        <div className="ai-block">
                            <span>{objTextResource["Name"]}</span>
                            <input id="vElementFolderName" type="text" value={objContext.state.objUserFileData.vElementFolderName} onChange={(e) => { HandleOnChange(objContext, e); }} />
                        </div>
                    </div>
                    <div className="ai-title">{objTextResource["Description"]}</div>
                    <div className="ta-padd">
                        <textarea id="vElementFolderDescription" cols="30" rows="6" value={objContext.state.objUserFileData.vElementFolderDescription} onChange={(e) => { HandleOnChange(objContext, e); }}/>
                    </div>
                    <footer>
                        <div className="fR">
                            <button className="btn btnOrnge" onClick={() => { HandleSaveFolder(objContext); }}> {objTextResource["Ok"]} </button>
                            <button className="btn btnOrnge" onClick={() => { editorPopup.ClosePopup(props.Id); }}> {objTextResource["Abort"]} </button>
                        </div>
                    </footer>
                </div>
            </section>
        </React.Fragment>
    );
};

export default MultiMediaManagement_FolderAddEdit;