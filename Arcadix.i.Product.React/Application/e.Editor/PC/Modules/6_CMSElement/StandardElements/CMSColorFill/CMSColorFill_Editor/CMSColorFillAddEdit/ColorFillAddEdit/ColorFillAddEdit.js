// React related import
import React, { useReducer, useRef, forwardRef } from 'react';

//Base classes.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

import FileUpload from "@root/Framework/Controls/FileUpload/FileUpload";

//Module realated imports
import * as ColorFillAddEdit_Hook from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFill/CMSColorFill_Editor/ColorFillAddEdit/ColorFillAddEdit_Hook";
import ColorFillAddEdit_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFill/CMSColorFill_Editor/ColorFillAddEdit/ColorFillAddEdit_ModuleProcessor";

const ColorFillAddEdit = forwardRef((props, ref) => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(EditorBase_Hook.Reducer, ColorFillAddEdit_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = {
        state,
        props,
        dispatch,
        "ColorFillAddEdit_ModuleProcessor": new ColorFillAddEdit_ModuleProcessor(),
        "Ref": ref,
        "FileUploadRef": useRef(null)
    };

    /**
     * @name ColorFillAddEdit_Hooks.Initialize
     * @summary Initialize method call in ColorFillAddEdit_Hook, that contains all the custom hooks.
     */
    ColorFillAddEdit_Hook.Initialize(objContext);

    const objTextResource = objContext.props.TextResource ? objContext.props.TextResource : {};

    return (
        <div className="ColorFill-addedit-upload">
            <div className="ai-title"> {objTextResource["Main_Title"]} </div>
            <div className="ai-flex">
                <div className="ai-block">
                    <span>{objTextResource["Name"]}</span>
                    <input id="vColorFillName" type="text" value={objContext.state.objUserFileData.vElementJson.vColorFillName} onChange={(e) => { objContext.ColorFillAddEdit_ModuleProcessor.HandleOnChange(objContext, { "id": e.target.id, "value": e.target.value }); }} />
                </div>
            </div>
            <div className="ai-title">{objTextResource["Description"]}</div>
            <div className="ta-padd">
                <textarea id="vElementColorFillDescription" cols="30" rows="6" value={objContext.state.objUserFileData.vElementJson.vElementColorFillDescription} onChange={(e) => { objContext.ColorFillAddEdit_ModuleProcessor.HandleOnChange(objContext, { "id": e.target.id, "value": e.target.value }) }}></textarea>
            </div>
            {
                objContext.state.blnShowUploadControl &&
                <div>
                    <div className="ai-title"> {objTextResource["Upload_ColorFill"]} </div>
                    <div className="fl-padd">
                        <FileUpload
                            {...props}
                            Id="ColorFillUploadFile"
                            ref={objContext.FileUploadRef}
                            Meta={{ "ShowUploadedFiles": true, "UploadSingle": "Y" }}
                            Resource={{ "Text": { "UploadButtonText": objTextResource["Choose_ColorFill"] }, "SkinPath": props.JConfiguration.ExtranetSkinPath }}
                            CallBacks={{ "OnUploadComplete": (objFileData) => { objContext.ColorFillAddEdit_ModuleProcessor.OnUploadComplete(objContext, objFileData) } }}
                        />
                    </div>
                </div>
            }
            <div>
                {objContext.state.blnShowError && <span style={{ "color": "red", "marginLeft": "8px" }}>{objTextResource["No_File_Selected_Status"]}</span>}
            </div>
        </div>
    );
});

export default React.memo(ColorFillAddEdit);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ColorFillAddEdit_ModuleProcessor; 