//React imports
import React, { useReducer } from "react";

//Module specific imports
import LearningTestPreview_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestPreview/LearningTestPreview_ModuleProcessor";
import * as LearningTestPreview_Hook from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestPreview/LearningTestPreview_Hook";

//Controls
import TestPreview from "@root/Application/f.TestApplication/PC/InlineStart/Preview/TestPreview/TestPreview"

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

const LearningTestPreview = props => {

    /**
    * @name Reduce Initializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, LearningTestPreview_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["LearningTestPreview_ModuleProcessor"]: new LearningTestPreview_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    LearningTestPreview_Hook.Initialize(objContext);
    /**
     * @summary returns the required jsx for component
     */
    function GetContent() {
        let objTextResource = props.Data.TextResource;
        return (
            <div className="teacher-learning-test-preview">

                <div className="header">
                    <span className="close" onClick={e => Popup.ClosePopup(props.Id)}>
                        {Localization.TextFormatter(objTextResource, 'LearningTestPreviewPopUpCloseButtonText')}
                        <img src={CloseImage} alt="" />
                    </span>
                </div>

                <TestPreview TestTaskDetails={{ 'iTestId': props.Data.TestId, 'iLanguageId': JConfiguration.InterfaceLanguageId, 'IsDirectLogin': 'Y' }} JConfiguration={{ ...JConfiguration }} SkinName={props.Data.SkinName} LearningTestSkinId={props.Data.LearningTestSkinId} />

            </div>
        );
    }

    /**
     * @summary renders the jsx.
     */
    return GetContent()
};

export default LearningTestPreview;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = LearningTestPreview_ModuleProcessor; 
