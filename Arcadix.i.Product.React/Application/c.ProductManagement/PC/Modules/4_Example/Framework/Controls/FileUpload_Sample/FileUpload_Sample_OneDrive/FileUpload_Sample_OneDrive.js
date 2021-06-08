// React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related fies.
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';
import FileUpload_Sample_OneDrive_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/FileUpload_Sample/FileUpload_Sample_OneDrive/FileUpload_Sample_OneDrive_ModuleProcessor';
import * as FileUpload_Sample_Muliple_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/FileUpload_Sample/FileUpload_Sample_OneDrive/FileUpload_Sample_OneDrive_Hook';

/**
* @name FileUpload_Sample_OneDrive
* @param {object} props props
* @summary This component displays the FileUpload_Sample_OneDrive.
* @returns {object} React.Fragement that encapsulated the file upload with FileUpload_Sample_OneDrive.
*/
const FileUpload_Sample_OneDrive = props => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, FileUpload_Sample_Muliple_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["FileUpload_Sample_OneDrive_ModuleProcessor"]: new FileUpload_Sample_OneDrive_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @param {object} objContext context object
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    FileUpload_Sample_Muliple_Hook.useDataLoaded(objContext);

    const domFileUploadRef = useRef(null);

    /**
     * @name GetContent
     * @summary required jsx for component.
     * @returns {*} file upload
     * */
    function GetContent() {
        return (
            <div className="container">
                <h3 className = "mb-20">Upload File to OneDrive</h3>
                <FileUpload
                    ref={domFileUploadRef}
                    Id="FileUpload_Sample_OneDrive"
                    Data={props.Data}
                    Resource={props.Resource}
                    Meta={props.Meta}
                    ParentProps={{ JConfiguration: { ...props.JConfiguration } }}
                    CallBacks={{
                        OnUploadComplete: (objFileData, arrFileData) => { objContext.dispatch({ type: "SET_STATE", payload: { ...objFileData } }); }
                    }} 
                />
                <button className="btn mt-20" onClick={() => objContext.FileUpload_Sample_OneDrive_ModuleProcessor.SaveToOneDrive(objContext)}>Confirm</button>
            </div>
        );
    }
    return GetContent();
};

/**
* @name DynamicStyles
* @param {object} props props
* @summary Required for css
* @returns {Array} arrStyles
*/
FileUpload_Sample_OneDrive.DynamicStyles = () => {
    return [
        JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/FileUpload/FileUpload.css"
    ];
};

export default connect(FileUpload_Sample_OneDrive_ModuleProcessor.GetStoreData())(FileUpload_Sample_OneDrive);