//react imports
import React, { useReducer } from "react";

//Module specific imports.
import LearningTestCreateGroup_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestCreateGroup/LearningTestCreateGroup_ModuleProcessor";
import * as LearningTestCreateGroup_Hook from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestCreateGroup/LearningTestCreateGroup_Hook";

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

/**
 * @name LearningTestCreateGroup
 * @summary component for create pupil group for learning test.
 * @param {any} props
 */
const LearningTestCreateGroup = props => {

    /**
    * @name Reduce Initializer.
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, LearningTestCreateGroup_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["LearningTestCreateGroup_ModuleProcessor"]: new LearningTestCreateGroup_ModuleProcessor() };


    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    LearningTestCreateGroup_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.LearningTestCreateGroup_ModuleProcessor.Initialize(objContext, objContext.LearningTestCreateGroup_ModuleProcessor);

    /**
     * @name GetContent
     * @summary returns the reuired jsx for component.
     * */
    function GetContent() {
        let objTextResource = props.Data.TextResource;
        return (
            <div className="learning-test-creategroup-popup">
                <div className="learningtestcreategroup-header" id="LearningTestGroupCreationHeader">
                    <div className="learningtestcreategroup-header-left"></div>
                    <span className="close" onClick={e => props.closePopUp(props.objModal)}>
                        {Localization.TextFormatter(objTextResource, 'LearningTestCreateGroupPopupCloseButtonText')}
                        <img src={CloseImage} alt="" />
                    </span>
                </div>

                <WrapperComponent
                    ComponentName={"FillHeight"}
                    id="CreateGroupFillHeight" Meta={objContext.LearningTestCreateGroup_ModuleProcessor.GetFillHeightMeta()} className="bgStyle" scrollStyle={{ overflow: "auto" }} ParentProps={{ ...props }} >
                    <div className="learningtestcreategroup-blockwrapper">
                        <div className="learningtestcreategroup-block">
                            <div className="popupContainer">
                                <div className="tableBigHeading">
                                    {Localization.TextFormatter(objTextResource, 'LearningTestCreateGroupPopupTestNameText')}
                                </div>
                                <input className="iptPupilGroupName" value={state.strGroupName} type="text" onChange={(event) => { objContext.LearningTestCreateGroup_ModuleProcessor.OnChangeGroupNameInput(objContext, event.target.value) }} />
                                <div className="tableBigHeading paddingTop">
                                    {Localization.TextFormatter(objTextResource, 'LearningTestCreateGroupPopupGroupCreatedForText')}
                                </div>
                                <div className="tablelists">
                                    <ul>
                                        <li>{Localization.TextFormatter(objTextResource, 'LearningTestCreateGroupPopupClassText')} {props.Data.SelectedClass["vClassName"]}</li>
                                        <li>{Localization.TextFormatter(objTextResource, 'LearningTestCreateGroupPopupPupilText')} ({props.Data.SelectedPupilIds.length})</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </WrapperComponent>

                <div className="wrap learningtestcreategroup-footer" id="LearningTestCreategroupFooter">
                    <button onClick={e => Popup.ClosePopup(props.Id)} className="button green-button">
                        {Localization.TextFormatter(objTextResource, 'LearningTestCreateGroupPopupAbortButtonText')}
                    </button>
                    <div className="button yellow-button" onClick={() => { objContext.LearningTestCreateGroup_ModuleProcessor.SavePupilGroup(objContext) }} >
                        {Localization.TextFormatter(objTextResource, 'LearningTestCreateGroupPopupProceedButtonText')}
                    </div>
                </div>
            </div>
        );
    }

    return GetContent();
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default LearningTestCreateGroup;

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = LearningTestCreateGroup_ModuleProcessor; 
