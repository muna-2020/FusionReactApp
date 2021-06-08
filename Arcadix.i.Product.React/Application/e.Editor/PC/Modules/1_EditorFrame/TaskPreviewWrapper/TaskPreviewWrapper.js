//React Imports
import React, { useReducer } from 'react';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module Related Imports
import TaskPreview from '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskPreview';
import TaskContentPreview from '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview';

//module related imports.
import * as TaskPreviewWrapper_Hooks from '@shared/Application/e.Editor/Modules/1_EditorFrame/TaskPreviewWrapper/TaskPreviewWrapper_Hooks';
import TaskPreviewWrapper_ModuleProcessor from '@shared/Application/e.Editor/Modules/1_EditorFrame/TaskPreviewWrapper/TaskPreviewWrapper_ModuleProcessor';

/**
 * @name TaskPreview
 * @param {object} props props from the parent
 * @summary This is the preview for the editor elements.
 * @returns {Component} TaskPreview.
 */
const TaskPreviewWrapper = (props) => {

    // /**
    //  * @name [state,dispatch]
    //  * @summary Define state and dispatch for the reducer to set state.
    //  */
    // const [state, dispatch] = useReducer(Base_Hook.Reducer, TaskPreviewWrapper_Hooks.GetInitialState(props));

    // /**
    //  * @name objContext
    //  * @summary Groups state.dispatch and module object(s) in objContext.
    //  */
    // let objContext = { state, dispatch, props, ["ModuleName"]: "TaskPreviewWrapper", ["TaskPreviewWrapper_ModuleProcessor"]: new TaskPreviewWrapper_ModuleProcessor() };

    const ClosePreview = () => {
        console.log("close");
        editorPopup.ClosePopup(props.Id);
    };

    /**
     * @name GetContent
     * @sumamry Contains the JSX for the component.
     * @returns {any} JSX
     * */
    const GetContent = () => {
        let Preview = props.Data.PreviewType === "TaskPreview" ? TaskPreview : TaskContentPreview;

        return (
            <div id="task_preview_div" className="preview-area">
                <span className="close-icon" onClick={ClosePreview}>
                    &#10005;
                </span>
                <Preview
                    JConfiguration={props.JConfiguration}
                    PageJson={props.Data.PageJson}
                    PageProperties={props.Data.Object_Intranet_Task_Task}
                    Subjects={props.Data.Object_Intranet_Taxonomy_Subject} />
            </div>
        );
    };

    /**
     * @summary Calls the GetContent.
     * @returns {any} JSX
     */
    return GetContent();
};

export default TaskPreviewWrapper;
