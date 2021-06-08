//React Imports
import React, { useEffect, useReducer } from 'react';

//Module related fies.
import * as TopLeft_Hook from '@shared/Application/e.Editor/Modules/1_EditorFrame/TopLeft/TopLeft_Hook';
import * as TopLeft_MetaData from '@shared/Application/e.Editor/Modules/1_EditorFrame/TopLeft/TopLeft_MetaData';

//Module Related files 
import EditorFrame_UndoRedo from '@shared/Application/e.Editor/Modules/1_EditorFrame/EditorFrame_UndoRedo';

//Base classes/hooks.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name TopLeft
 * @param {object} props component props
 * @summary Returns the TopLeft Component
 * @returns {component} TopLeft
 */
const TopLeft = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, TopLeft_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Combines the props, state, dispatch and other objects that are required throughout the component.
     * */
    let objContext = { state, dispatch, props, TopLeftRef : React.createRef(), EditorFrame_UndoRedo : new EditorFrame_UndoRedo()}; // objContext.

    /**
    * @name TopLeft_Hook.Initialize
    * @summary Initialize method call in TopLeft_Hook, that contains all the custom hooks.
    */
   TopLeft_Hook.Initialize(objContext);

   /**
    * @name UndoAction
    * @summary perform undo action.
    */
   const UndoAction = () => {
     if (objContext.state.UndoState === "active") {
       objContext.EditorFrame_UndoRedo.Undo();
     }
   };

   /**
    * @name RedoAction
    * @summary perform redo action.
    */
   const RedoAction = () => {
     if (objContext.state.RedoState === "active") {
       objContext.EditorFrame_UndoRedo.Redo();
     }
   };

   /**
    * @name useEffect
    * @summary this add the TopLeftRef to the EditorState for state manipulation.
    */
   useEffect(() => {
     EditorState.SetReference("TopLeftRef", objContext.TopLeftRef);
   },[objContext.props, objContext.state]);
   
    let objTextResource = props.TextResource;
    let objImageMeta = TopLeft_MetaData.GetImageMeta();

    return (
        <div className="top-left">
            <ul>
                {
                    <React.Fragment>
                        <React.Fragment>
                            <li onClick={() => { props.OpenPreview(props.ContentUsageGroupId); }}>
                                <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.PreviewImage,
                                            ToolTipText: Localization.TextFormatter(objTextResource, "Preview_Title")
                                        }}
                                        ParentProps={props}
                                    />
                            </li>
                        </React.Fragment>
                        {
                            (!props.ContentUsageGroupId || props.ContentUsageGroupId === null || props.ContentUsageGroupId === "PageContentGroup") &&
                            <React.Fragment>
                                <li onClick={() => { props.OpenPreviewInNewTab(); }}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.PreviewNewWindowImage,
                                            ToolTipText: Localization.TextFormatter(objTextResource, "Task_Preview_Title")
                                        }}
                                        ParentProps={props}
                                    />
                                </li>
                                <li onClick={() => { props.OpenMobilePreview(); }}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.MobilePreviewImage,
                                            ToolTipText: Localization.TextFormatter(objTextResource, "Mobile_Preview_Title")
                                        }}
                                        ParentProps={props}
                                    />
                                </li>
                            </React.Fragment>
                        }
                    </React.Fragment>
                }
                <li onClick={(objEvt) => { props.SaveTask(); }}>
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: objImageMeta.SaveImage,
                            ToolTipText: Localization.TextFormatter(objTextResource, "Save_Task_Title")
                        }}
                        ParentProps={props}
                    />
                </li>
                {
                    (!props.ContentUsageGroupId || props.ContentUsageGroupId === null || props.ContentUsageGroupId === "PageContentGroup") &&
                    <React.Fragment>
                        <li onClick={() => { UndoAction(); }}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objContext.state.UndoState === "active" ? objImageMeta.UndoImage : objImageMeta.Undo_InActiveImage,
                                    ToolTipText: Localization.TextFormatter(objTextResource, "Undo_Title")
                                }}
                                ParentProps={props}
                            />
                        </li>
                        <li onClick={() => { RedoAction(); }}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objContext.state.RedoState === "active" ? objImageMeta.RedoImage : objImageMeta.Redo_InActiveImage,
                                    ToolTipText: Localization.TextFormatter(objTextResource, "Redo_Title")
                                }}
                                ParentProps={props}
                            />
                        </li>
                    </React.Fragment>
                }
                <li onClick={(event) => { event.preventDefault(); props.SpellCheck(); }}>
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: objImageMeta.SpellCheckImage,
                            ToolTipText: Localization.TextFormatter(objTextResource, "Spell_Check_Title")
                        }}
                        ParentProps={props}
                    />
                </li>
                {
                    (!props.ContentUsageGroupId || props.ContentUsageGroupId === null || props.ContentUsageGroupId === "PageContentGroup") &&
                    <React.Fragment>
                        <li onClick={(event) => { event.preventDefault(); props.GenerateTaskPdf(); }}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.PrintToPdfImage,
                                    ToolTipText: Localization.TextFormatter(objTextResource, "PrintTo_Pdf_Title")
                                }}
                                ParentProps={props}
                            />
                        </li>
                        <li onClick={(event) => { event.preventDefault(); props.OpenTaskAddEditPopup(); }}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.OpenEditorImage,
                                    ToolTipText: Localization.TextFormatter(objTextResource, "Task_Properties_Title")
                                }}
                                ParentProps={props}
                            />
                        </li>
                        <li onClick={(event) => { event.preventDefault(); props.OpenAdditionalInformationSidebar("AdditionalInformation"); }}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.AdditionalInfoAddImage,
                                    ToolTipText: Localization.TextFormatter(objTextResource, "Addtional_Information_Title")
                                }}
                                ParentProps={props}
                            />
                        </li>
                        <li onClick={(event) => { event.preventDefault(); props.OpenAdditionalInformationSidebar("TaskHint"); }}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.TaskHintAddImage,
                                    ToolTipText: Localization.TextFormatter(objTextResource, "Task_Hint_Title")
                                }}
                                ParentProps={props}
                            />
                        </li>
                        <li onClick={objEvent => props.OpenSourceViewPopup()} >
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.ShowHtmlImage,
                                    ToolTipText: Localization.TextFormatter(objTextResource, "Show_Html")
                                }}
                                ParentProps={props}
                            />
                        </li>
                        <li onClick={(event) => { event.preventDefault(); props.OpenAuditPopup(); }}>
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: objImageMeta.AuditImage,
                                    ToolTipText: Localization.TextFormatter(objTextResource, "Audit_Title")
                                }}
                                ParentProps={props}
                            />
                        </li>
                    </React.Fragment>
                }
            </ul>
        </div>
    );
};

export default TopLeft;