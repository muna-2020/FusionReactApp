//React related imports.
import React from 'react';

//EditorState State classes.
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//module related imports.
import SourceViewPopup_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/1_StartTab/SourceViewPopup/SourceViewPopup_ModuleProcessor";

//Html view component.
import Inspector from 'react-inspector';

//In-line Images import
import Icon_MaximizeImage from '@inlineimage/Common/ReactJs/PC/Icons/Icon_Maximize.svg?in-line';

/**
 * @name SourceViewPopup
 * @param {object} props props from parent.
 * @summary display the html source of the task.
 */
const SourceViewPopup = (props) => {

    /**
     * @name objContext
     * @summary Combines the props, state, dispatch and other objects that are required throughout the component.
     * */
    let objContext = { props, ["SourceViewPopup_ModuleProcessor"]: new SourceViewPopup_ModuleProcessor() }; // objContext.

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.SourceViewPopup_ModuleProcessor.Initialize(objContext, objContext.SourceViewPopup_ModuleProcessor);

    /**
     * @name GetTaskRootDiv
     * @summary returns the active task root dom div.
     * */
    const GetTaskRootDiv = () => {
        let EditorRef = EditorState.GetReference("EditorRef");
        if (EditorRef && EditorRef.current && EditorRef.current.GetActiveTaskId) {
            let strActiveTaskId = EditorRef.current.GetActiveTaskId();
            return document.getElementById(`activeworkareaTab_edit_${strActiveTaskId}`);
        }
    }

    /**
     * @name GetContent
     * @summary returns the common jsx of the table properties sidebar.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        let taskRootDiv = GetTaskRootDiv();
        return (
            <div className="source-view-popup">
                <div className="source-view-popup-header">
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: Icon_MaximizeImage
                        }}
                        ParentProps={props}
                    />
                </div>
                <div class="source-view">
                    {taskRootDiv != null ? <Inspector data={taskRootDiv} /> : <React.Fragment />}
                </div>
            </div>
        );
    };

    /**
     * @summary calls GetContent method to get the JSX.
     * */
    return GetContent();
}

export default SourceViewPopup;