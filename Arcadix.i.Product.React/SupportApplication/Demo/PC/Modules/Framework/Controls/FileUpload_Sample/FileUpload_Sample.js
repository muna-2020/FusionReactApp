// React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';
import FileUpload_Sample_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Controls/FileUpload_Sample/FileUpload_Sample_ModuleProcessor';
import * as FileUpload_Sample_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Controls/FileUpload_Sample/FileUpload_Sample_Hook';

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
    const [state, dispatch] = useReducer(Base_Hook.Reducer, FileUpload_Sample_Hook.GetInitialState());

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
    FileUpload_Sample_Hook.useDataLoaded(objContext);

    const domFileUploadRef = useRef(null);

    /**
     * @name OnClickSave
     * @summary Returns the array of selected files.
     * */
    let OnClickSave = () => {
        let arrFileList = JSON.parse(domFileUploadRef.current.GetUploadedFileDetails());
        console.log("selected files==============================>", arrFileList);
    }

    /**
     * @name GetContent
     * @summary required jsx for component.
     * */
    function GetContent() {
        return (
            <div>
                <FileUpload
                    ref={domFileUploadRef}
                    Id="FileUpload_Sample"
                    Data={props.Data}
                    Resource={props.Resource}
                    Meta={props.Meta}
                    ParentProps={{ JConfiguration: { ...props.JConfiguration } }} />

                <button onClick={OnClickSave}>Get Selected Files</button>
            </div>
        );
    }

    return (<React.Fragment> {GetContent()} </React.Fragment >);
}

/**
* @name DynamicStyles
* @param {object} props props
* @summary Required for css
* @returns {Array} arrStyles
*/
FileUpload_Sample.DynamicStyles = props => {
    return [
        props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/FileUpload/FileUpload.css"
    ];
};

export default connect(FileUpload_Sample_ModuleProcessor.GetStoreData())(FileUpload_Sample);