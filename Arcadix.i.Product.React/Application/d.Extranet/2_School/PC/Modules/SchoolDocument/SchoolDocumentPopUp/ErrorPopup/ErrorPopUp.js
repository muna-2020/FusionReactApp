import React, { useState } from 'react';
//Module specific imports
import * as CopyFolderPopUp_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp_Hook';
import CopyFolderPopUp_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp_ModuleProcessor';

const ErrorPopUp_DesignTemplate = (props) => {
    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = {  props, ["CopyFolderPopUp_ModuleProcessor"]: new CopyFolderPopUp_ModuleProcessor() };

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    CopyFolderPopUp_Hook.Initialize(objContext);

    return (
        <div>
            
        </div>
    );
};

ErrorPopUp_DesignTemplate.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolDocument/SchoolDocumentPopUp/ErrorPopUp.css"

    ];
    return arrStyles;
};
export default ErrorPopUp_DesignTemplate;