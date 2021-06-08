// React related imports.
import React, { useReducer, useRef } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import AddEditTopic_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/AdminInterpretation/AddEditTopic/AddEditTopic_ModuleProcessor';
import * as AddEditTopic_Hook from '@shared/Application/c.Cockpit/Modules/AdminInterpretation/AddEditTopic/AddEditTopic_Hook';

/**
 * @name AddEditTopic
 * @param {object} props props
 * @summary This component is used to Add/Edit the Topic data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditTopic = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditTopic_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditTopic_ModuleProcessor": new AddEditTopic_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditTopic_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditTopic_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="Topic" className="tabcontent subject-management">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'Topic')}
                </div>
                <div className="col col-2">

                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Topic')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vFeedbackThresholdTopic",
                                    DependingTableName: "t_testDrive_Subject_FeedbackThreshold_Topic_Data",
                                    DisplayColumn: "vFeedbackThresholdTopic",
                                    AutoFocus: true
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditTopic_ModuleProcessor.HandleChange("t_testDrive_Subject_FeedbackThreshold_Topic_Data.vFeedbackThresholdTopic", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditTopic_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditTopic_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>

                    {/*
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Threshold')}</span>
                        </div>
                        <div className="row-right">
                            <DropDown
                                Id="uSubjectFeedbackThresholdId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.arrThreshold, //uSubjectFeedbackThresholdId,
                                    SelectedValue: state.objData && state.objData["uSubjectFeedbackThresholdId"] ? state.objData["uSubjectFeedbackThresholdId"] : props.Data.DropdownData.uSubjectFeedbackThresholdId[0].uSubjectFeedbackThresholdId
                                }}
                                Meta={{
                                    DisplayColumn: "vThresholdText",
                                    ValueColumn: "uSubjectFeedbackThresholdId",
                                    DependingTableName: "t_testDrive_Subject_FeedbackThreshold_Data",
                                    IsLanguageDependent: "Y"
                                }}
                                Resource={{
                                    Text: {
                                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                    },
                                    JConfiguration: props.Resource.JConfiguration,
                                    SkinPath: props.Resource.SkinPath
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditTopic_ModuleProcessor.HandleDropDownChange("uSubjectFeedbackThresholdId", objChangeData, props, objContext),
                                    CheckDeletedDropDownData: objContext.AddEditTopic_ModuleProcessor.CreateItemEventHandler
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                    */}
                </div>
            </div>
            <div id="ValidationError" />
        </React.Fragment>

    );
};

export default AddEditTopic;