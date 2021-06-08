// React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';
import FileUpload_Sample_Single_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Controls/FileUpload_Sample/FileUpload_Sample_Single/FileUpload_Sample_Single_ModuleProcessor';
import * as FileUpload_Sample_Single_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Controls/FileUpload_Sample/FileUpload_Sample_Single/FileUpload_Sample_Single_Hook';

/**
* @name FileUpload_Sample
* @param {object} props props
* @summary This component displays the FileUpload_Sample for single file
* @returns {object} React.Fragement that encapsulated the file upload with FileUpload_Sample.
*/
const FileUpload_Sample = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, FileUpload_Sample_Single_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
    */
    let objContext = { state, props, dispatch};

    /**
     * @name useDataLoaded
     * @param {object} objContext context object
     * @summary Makes showAnimation false in store.
     * @returns null
    */
    FileUpload_Sample_Single_Hook.useDataLoaded(objContext);

    const domFileUploadRef = useRef(null);

    /**
     * @name GetContent
     * @summary required jsx for component.
     * @returns {*} file upload
     * */
    function GetContent() {
        return (
            <React.Fragment>
                FileUpload component will upload file this sample is only restricted to one file upload
                <FileUpload
                    ref={domFileUploadRef}
                    Id="FileUpload_Sample_SingleFile"
                    Data={props.Data}
                    Resource={props.Resource}
                    Meta={props.Meta}
                    ParentProps={{ JConfiguration: { ...props.JConfiguration } }}
                    // CallBacks={() => {}} this is optional props in case of any callbacks 
                />                
            </React.Fragment>
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
FileUpload_Sample.DynamicStyles = () => {
    return [
        JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/FileUpload/FileUpload.css"
    ];
};

export default connect(FileUpload_Sample_Single_ModuleProcessor.GetStoreData())(FileUpload_Sample);