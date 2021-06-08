// React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';
import FileUpload_Sample_Muliple_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Controls/FileUpload_Sample/FileUpload_Sample_Multiple/FileUpload_Sample_Multiple_ModuleProcessor';
import * as FileUpload_Sample_Muliple_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Controls/FileUpload_Sample/FileUpload_Sample_Multiple/FileUpload_Sample_Multiple_Hook';

/**
* @name FileUpload_Sample
* @param {object} props props
* @summary This component displays the FileUpload_Sample.
* @returns {object} React.Fragement that encapsulated the file upload with FileUpload_Sample.
*/
const FileUpload_Sample = props => {

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
    let objContext = { state, props, dispatch/* ["FileUpload_Sample_ModuleProcessor"]: new FileUpload_Sample_ModuleProcessor()*/ };

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
            <FileUpload
                ref={domFileUploadRef}
                Id="FileUpload_Sample_Multiple"
                Data={props.Data}
                Resource={props.Resource}
                Meta={props.Meta}
                ParentProps={{ JConfiguration: { ...props.JConfiguration } }}
               // CallBacks={() => {}} this is optional props in case of any callbacks 
            />
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

export default connect(FileUpload_Sample_Muliple_ModuleProcessor.GetStoreData())(FileUpload_Sample);