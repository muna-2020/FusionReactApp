//React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as InterpretationAdmin_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/InterpretationAdmin_Hook';
import InterpretationAdmin_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/InterpretationAdmin_ModuleProcessor";

//Inline Images import
import ArrowDownImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/Arrowdown_Active.svg?inline';
import ArrowUpImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/ArrowUp_Active?inline';
import PlusImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/plus.svg?inline';
import DeleteImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/delete.svg?inline';
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.png?inline';
import BoldIconImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/bold_icon.svg?inline';
import ItalicBoldImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/italic_bold.svg?inline';
import UnderLineImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/underline_icon.svg?inline';
import OrderedListImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/orderedList.svg?inline';
import UnOrderedListImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/unOrderedList.svg?inline';
import TextIndedntLeftImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/textIndentLeft.svg?inline';
import TextIndedntRightImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/textIndentRight.svg?inline';
import CaretUpDownImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/caret-up-down.svg?inline';
import TextColorImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/textColor.svg?inline';
import TextBackGroundImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/textBackground.svg?inline';
import EditGrayImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/edit_gray.png?inline';


/**
 * @name InterpretationAdmin
 * @param {object} props props
 * @summary InterpretationAdmin
 * @returns {object} React.Fragement that encapsulated .
 */
const InterpretationAdmin = (props) => {

    const fontFamily = [
        { a: "san Serif", b: "2", c: "3" },
        { a: "KarminaSans", b: "22", c: "33" }
    ];

    /**
    * @name Initializing Reducer
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, InterpretationAdmin_Hook.GetInitialState());

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used
     **/
    let objContext = { state, props, dispatch, InterpretationAdmin_ModuleProcessor: new InterpretationAdmin_ModuleProcessor(), Object_Framework_Services_TextResource };

   /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.InterpretationAdmin_ModuleProcessor.Initialize(objContext, objContext.InterpretationAdmin_ModuleProcessor);

    /**
     * @name Initialize
     * @summary Initialize Custom hooks
     **/
    InterpretationAdmin_Hook.Initialize(objContext);

    /**
     * @summary CurrentDescRef is initialized
     * */
    const currentDescRef = useRef(null);

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = (props) => {
        let arrAllSubjects = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N").Data;
        let arrSubjects = arrAllSubjects.filter(objSubject => { return objSubject.iParentSubjectId === 0 && objSubject.cIsLearnCoacherSubject === "Y"; });
        let strSubjectId = state.intSelectedSubjectId != -1 ? state.intSelectedSubjectId : arrSubjects[0].iSubjectId;
        let arrSubSubject = arrAllSubjects.filter(objSubject => objSubject.iParentSubjectId == strSubjectId);
        let strSubSubjectId = state.intSelectedSubSubjectId != -1 ? state.intSelectedSubSubjectId : arrSubSubject[0].iSubjectId;
        let arrFeedbackThreshold = DataRef(objContext.props.Object_Intranet_Taxonomy_FeedbackThreshold, "Object_Intranet_Taxonomy_FeedbackThreshold;iSubjectId;" + strSubSubjectId).Data;
        let arrFilteredFeedbackThreshold = [];
        if (arrFeedbackThreshold && arrFeedbackThreshold.length > 0) {
            arrFilteredFeedbackThreshold = arrFeedbackThreshold.filter((t, index) => index != 0);
        }
        let objThreshold = {};
        if (arrFilteredFeedbackThreshold && arrFilteredFeedbackThreshold.length > 0)
            objThreshold = state.objThreshold ? state.objThreshold : arrFilteredFeedbackThreshold[0];

        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/InterpretationAdmin", props);
        if (!state.blnFormatedLoadComplete) {
            let arrTopicDescriptionTaskData = objContext.InterpretationAdmin_ModuleProcessor.GetMergedData(objContext, objThreshold);
            dispatch({ type: 'SET_STATE', payload: { arrTopicDescriptionTaskData: arrTopicDescriptionTaskData, blnFormatedLoadComplete: true } })
        }

        return (
            <div className="Interpretation InterpretationAdmin">
                <div className="top-head-padd" id="InterpretationAdminHeader">
                    <div className="top-head">
                        <div className="top-head-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Subject')}</span>
                            <div className="content-dropdown">                                
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="subjectDropDown"
                                    Meta={objContext.InterpretationAdmin_ModuleProcessor.GetMetaDataSubjectDropdown()}
                                    Data={objContext.InterpretationAdmin_ModuleProcessor.GetDataSubjectDropdown(objContext)}
                                    Resource={objContext.InterpretationAdmin_ModuleProcessor.GetResourceDataSubjectDropdown()}
                                    Events={objContext.InterpretationAdmin_ModuleProcessor.GetEventsDataSubjectDropdown(objContext)}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                            <span>{Localization.TextFormatter(objTextResource, 'SubSubject')}:</span>
                            <div className="content-dropdown">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="subSubjectDropDown"
                                    Meta={objContext.InterpretationAdmin_ModuleProcessor.GetMetaDataSubSubjectDropdown()}
                                    Data={objContext.InterpretationAdmin_ModuleProcessor.GetDataSubSubjectDropdown(objContext)}
                                    Resource={objContext.InterpretationAdmin_ModuleProcessor.GetResourceDataSubSubjectDropdown()}
                                    Events={objContext.InterpretationAdmin_ModuleProcessor.GetEventsDataSubSubjectDropdown(objContext)}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                            <span>{Localization.TextFormatter(objTextResource, 'Competency')}</span>
                            <div className="content-dropdown">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="thresholdDropDown"
                                    Meta={objContext.InterpretationAdmin_ModuleProcessor.GetMetaDataThresholdDropdown()}
                                    Data={objContext.InterpretationAdmin_ModuleProcessor.GetDataThresholdDropdown(objContext, arrFilteredFeedbackThreshold)}
                                    Resource={objContext.InterpretationAdmin_ModuleProcessor.GetResourceDataThresholdDropdown()}
                                    Events={objContext.InterpretationAdmin_ModuleProcessor.GetEventsDataThresholdDropdown(objContext)}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <WrapperComponent
                    ComponentName={"FillHeight"}
                    Id="FillHeightInterpretationAdminContent" Meta={objContext.InterpretationAdmin_ModuleProcessor.GetMetaDataForFillHeight()} ParentProps={{ ...props }}>
                    {/*<FillHeight HeaderIds={["Header", "InterpretationAdminHeader", "ContentHead"]} className="bgStyle" scrollStyle={{ overflow: "auto" }}> */}
                    <div className="interpretation-admin-content">
                        {state.arrTopicDescriptionTaskData.length > 0 ? GetElements(state.arrTopicDescriptionTaskData) : ''}
                        {
                            state.blnTopicEdit == true ?
                                <React.Fragment>
                                    <input type="text" onChange={(e) => { dispatch({ type: 'SET_STATE', payload: { "strTopic": e.target.value } }); }} />
                                    <img src={CloseImage}
                                        onClick={() => {
                                            dispatch({ type: 'SET_STATE', payload: { "blnTopicEdit": !state.blnTopicEdit } });
                                        }}
                                    />
                                    <button className="button blue-button" onClick={() => { objContext.InterpretationAdmin_ModuleProcessor.AddTopic(objContext, objThreshold); }}>{Localization.TextFormatter(objTextResource, 'Save')}</button>
                                </React.Fragment>
                                : ''
                        }

                        {
                            state.blnTopicEdit == false ?
                                <button className="button blue-button" onClick={() => { dispatch({ type: 'SET_STATE', payload: { "blnTopicEdit": !state.blnTopicEdit } }); }}>
                                    {Localization.TextFormatter(objTextResource, 'AddCompetenceDescription')}
                                </button> : ''
                        }
                    </div>

                    <div className="editor">
                        <div className="editor-header">
                            <div className="tool-bar">
                                <div className="tools">
                                    <img src={BoldIconImage} />
                                </div>
                                <div className="tools">
                                    <img src={ItalicBoldImage} />
                                </div>
                                <div className="tools">
                                    <img src={UnderLineImage} />
                                </div>
                                <div className="tools otherCtrl">
                                    <img src={OrderedListImage} />
                                </div>
                                <div className="tools otherCtrl">
                                    <img src={UnOrderedListImage} />
                                </div>
                                <div className="tools otherCtrl">
                                    <img src={TextIndedntLeftImage} />
                                </div>
                                <div className="tools otherCtrl">
                                    <img src={TextIndedntRightImage} />
                                </div>

                                <div className="font-family-dropdown">                                    
                                    <WrapperComponent
                                        ComponentName={"Dropdown"}
                                        Id="FontFamilyDropDown"
                                        Meta={{
                                            DisplayColumn: "a",
                                            ValueColumn: "c"
                                        }}
                                        Data={{
                                            DropdownData: fontFamily,
                                            SelectedValue: "33"
                                        }}
                                        Resource={{ SkinPath: JConfiguration.ExtranetSkinPath }}
                                        Events={{
                                            OnChangeEventHandler: (objItem) => console.log("objItem")
                                        }}
                                        ParentProps={{ ...props }}
                                    />
                                    <img src={CaretUpDownImage} />
                                </div>
                                <div className="tools otherCtrl">
                                    <img src={TextColorImage} />
                                </div>
                                <div className="tools otherCtrl">
                                    <img src={TextBackGroundImage} />
                                </div>
                            </div>
                            <div className="content-editable-div"
                                onInput={(e) => {
                                    objContext.InterpretationAdmin_ModuleProcessor.UpdateThresholdFeedbackValue(objContext, e.target.innerHTML);
                                }}
                                contentEditable={true}
                                dangerouslySetInnerHTML={{ __html: state.strThresholdFeedback }}
                            />
                            <button className="button blue-button" onClick={() => { objContext.InterpretationAdmin_ModuleProcessor.EditThreshold(objContext, objThreshold) }}>{Localization.TextFormatter(objTextResource, 'Save')}</button>
                        </div>
                    </div>
                </WrapperComponent>
            </div>
        );

        function GetElements(arrData) {
            let newArrData = [...arrData];
            let arrElements = newArrData.sort((a, b) => { return a.iOrder - b.iOrder }).map((topic, index) => {
                return (
                    <React.Fragment>
                        <div className="content-row">
                            {topic.isEditMode == false ?
                                <div className="row-left">
                                    <div className="row-head">
                                        <span>{topic["t_testDrive_Subject_FeedbackThreshold_Topic_Data"][0].vFeedbackThresholdTopic}</span>
                                        <div className="control-wrap">
                                            <div className="control-buttons">
                                                <img src={EditGrayImage}
                                                    onClick={() => {
                                                        objContext.InterpretationAdmin_ModuleProcessor.EnableDisableTopicEdit(objContext, topic, true);
                                                    }}
                                                />
                                                <img src={PlusImage}
                                                    onClick={() => {
                                                        objContext.InterpretationAdmin_ModuleProcessor.AddNewEmptyDescriptionObject(objContext, topic);
                                                    }}
                                                />
                                                <img src={DeleteImage}
                                                    onClick={() => {
                                                        objContext.InterpretationAdmin_ModuleProcessor.DeleteTopic(objContext, topic);
                                                    }}
                                                />
                                            </div>
                                            <div className="arrowUpDown">
                                                {index > 0 ? <img src={ArrowUpImage} onClick={() => { objContext.InterpretationAdmin_ModuleProcessor.ChangeTopicOrder(objContext, newArrData, index, index - 1); }} /> : ''}
                                                {index < newArrData.length - 1 ? <img src={ArrowDownImage} onClick={() => { objContext.InterpretationAdmin_ModuleProcessor.ChangeTopicOrder(objContext, newArrData, index, index + 1); }} /> : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div> : ''
                            }
                            {
                                topic.isEditMode == true ? <div className="row-right">
                                    <input
                                        type="text"
                                        value={state.strTopicEditText}
                                        onChange={(e) => {
                                            objContext.InterpretationAdmin_ModuleProcessor.UpdateTopicEditedValue(objContext, e.target.value);
                                        }}
                                    />
                                    <img src={CloseImage}
                                        onClick={() => {
                                            objContext.InterpretationAdmin_ModuleProcessor.EnableDisableTopicEdit(objContext, topic, false);
                                        }}
                                    />
                                    <button className="button blue-button" onClick={() => { objContext.InterpretationAdmin_ModuleProcessor.UpdateTopic(objContext, topic, objThreshold) }}>{Localization.TextFormatter(objTextResource, 'Save')}</button>
                                    <span className="title">{Localization.TextFormatter(objTextResource, 'WithOutTitle')}</span>
                                </div> : ''
                            }
                        </div>
                        <div className="content-row">
                            <div className="row-left">
                                <div className="row-head">
                                    <span>{Localization.TextFormatter(objTextResource, 'Text')}</span>
                                </div>
                            </div>
                            <div className="row-right">
                                <ul>
                                    <li>
                                        <span>{Localization.TextFormatter(objTextResource, 'TaskOne')}</span>
                                    </li>
                                    <li>
                                        <span>{Localization.TextFormatter(objTextResource, 'TaskTwo')}</span>
                                    </li>
                                    <li>
                                        <span>{Localization.TextFormatter(objTextResource, 'TaskThree')}</span>
                                    </li>
                                    <li>
                                        <span>{Localization.TextFormatter(objTextResource, 'TaskFour')}</span>
                                    </li>
                                    <li>
                                        <span>{Localization.TextFormatter(objTextResource, 'TaskFive')}</span>
                                    </li>
                                    <li>
                                        <span>{Localization.TextFormatter(objTextResource, 'Symbol')}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {
                            topic.arrDescTasks.sort((a, b) => { return a.iOrder - b.iOrder }).map((desc, descIndex) => {
                                return (
                                    <React.Fragment>
                                        {desc.isEditMode == true ?
                                            <div className="content-row add-new-row show" id={topic.uFeedbackThresholdTopicId + "editableRow" + descIndex.toString()}>
                                                <div className="row-left">
                                                    <div className="row-head">
                                                        <div className="tools">
                                                            <img src={BoldIconImage} />
                                                        </div>
                                                        <div className="tools">
                                                            <img src={ItalicBoldImage} />
                                                        </div>
                                                        <div className="tools">
                                                            <img src={UnderLineImage} />
                                                        </div>
                                                        <div className="tools otherCtrl">
                                                            <img src={OrderedListImage} />
                                                        </div>
                                                        <div className="tools otherCtrl">
                                                            <img src={UnOrderedListImage} />
                                                        </div>
                                                    </div>
                                                    <div className="contenteditable-div"
                                                        contentEditable={true}
                                                        ref={currentDescRef}
                                                        dangerouslySetInnerHTML={{ __html: desc.t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data[0].vFeedbackThresholdTopicDescription }}                                                >
                                                    </div>
                                                </div>

                                                <div className="row-right">
                                                    <ul>
                                                        {
                                                            state.arrDefaultTasks.map((dfltTsk, index) =>
                                                                <React.Fragment>
                                                                    <li>
                                                                        <input
                                                                            type="text"
                                                                            key={index}
                                                                            value={dfltTsk.vTaskName}
                                                                            onChange={(e) => {
                                                                                //dispatch({ type: 'Update_Tasks', payload: { index: index, value: e.target.value } })
                                                                                objContext.InterpretationAdmin_ModuleProcessor.UpdateTask(objContext, index, e.target.value);
                                                                            }}
                                                                        />
                                                                    </li>
                                                                </React.Fragment>
                                                            )
                                                        }
                                                        <li>
                                                            <div className="controls">
                                                                <img src={CloseImage}
                                                                    onClick={() => {
                                                                        objContext.InterpretationAdmin_ModuleProcessor.RemoveEmptyDescriptionObject(objContext, topic, desc);
                                                                    }}
                                                                />
                                                                <button className="button blue-button" onClick={() => { SaveDescriptionWithTasks(desc, topic.uFeedbackThresholdTopicId) }}>
                                                                    {Localization.TextFormatter(objTextResource, 'Save')}
                                                                </button>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            : ''}
                                        {desc.isEditMode == false ?
                                            <div className="content-row show">
                                                <div className="row-left">
                                                    <div className="row-head">
                                                        <p dangerouslySetInnerHTML={{
                                                            __html: desc['t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data'].length > 0 ? desc['t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data'][0].vFeedbackThresholdTopicDescription : ""
                                                        }} />
                                                    </div>
                                                </div>
                                                <div className="row-right">
                                                    <ul>
                                                        {
                                                            desc.t_TestDrive_Subject_FeedbackThreshold_Description_Tasks.map((tsk, tskIndex) => {
                                                                return (
                                                                    <React.Fragment>
                                                                        <li>
                                                                            {tsk.vTaskName}
                                                                        </li>
                                                                    </React.Fragment>
                                                                )
                                                            }
                                                            )
                                                        }
                                                        <li>
                                                            <div className="controls">
                                                                <div className="control-buttons">
                                                                    <img src={EditGrayImage} 
                                                                        onClick={() => {
                                                                            objContext.InterpretationAdmin_ModuleProcessor.EditDescriptionObject(objContext, topic, desc);
                                                                        }}
                                                                    />
                                                                    <img src={DeleteImage}
                                                                        onClick={() => {
                                                                            objContext.InterpretationAdmin_ModuleProcessor.DeleteDescriptionWithTasks(objContext, desc);
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="arrowUpDown">
                                                                    {descIndex > 0 ? <img src={ArrowUpImage} onClick={() => { objContext.InterpretationAdmin_ModuleProcessor.ChangeDescriptionOrder(objContext, topic.arrDescTasks, descIndex, descIndex - 1) }} /> : ''}
                                                                    {descIndex < topic.arrDescTasks.length - 1 ? <img src={ArrowDownImage} onClick={() => { objContext.InterpretationAdmin_ModuleProcessor.ChangeDescriptionOrder(objContext, topic.arrDescTasks, descIndex, descIndex + 1) }} /> : ''}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            : ''}
                                    </React.Fragment>
                                )
                            }
                            )
                        }
                    </React.Fragment>
                )
            }
            )
            return arrElements;
        }

        function SaveDescriptionWithTasks(desc, topicId) {
            let strDescText = currentDescRef.current.innerHTML;
            let newDesc = { ...desc };
            newDesc.t_testDrive_Subject_FeedbackThreshold_Topic_Description_Data[0].vFeedbackThresholdTopicDescription = strDescText;
            objContext.InterpretationAdmin_ModuleProcessor.SaveDescriptionWithTasks(newDesc, objContext, topicId)
        }
    }
    return props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <React.Fragment />;

};

export default connect(ExtranetBase_Hook.MapStoreToProps(InterpretationAdmin_ModuleProcessor.StoreMapList()))(InterpretationAdmin);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = InterpretationAdmin_ModuleProcessor; 