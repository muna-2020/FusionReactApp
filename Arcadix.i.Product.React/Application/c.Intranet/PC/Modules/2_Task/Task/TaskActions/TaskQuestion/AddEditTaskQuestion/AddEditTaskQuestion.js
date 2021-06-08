//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditTaskQuestion_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion/AddEditTaskQuestion/AddEditTaskQuestion_Hook';
import AddEditTaskQuestion_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion/AddEditTaskQuestion/AddEditTaskQuestion_ModuleProcessor';

/**
* @name AddEditTaskQuestion.
* @param {object} props props.
* @summary This component is used to Add/Edit the TaskQuestion data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditTaskQuestion = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditTaskQuestion_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditTaskQuestion_ModuleProcessor": new AddEditTaskQuestion_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditTaskQuestion_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditTaskQuestion_Hook.Initialize(objContext);



    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="Stammdaten" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "Stammdaten" ? "block" : "none") }}>
                   
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "QuestionName")}</span></div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vQuestion",
                                        DependingTableName: "t_Testdrive_Task_Question_Data",
                                        DisplayColumn: "vQuestion"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditTaskQuestion_ModuleProcessor.HandleChange("t_Testdrive_Task_Question_Data.vQuestion", e.target.value, objContext, "objData",objLanguage["iLanguageId"]);
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "Order")}</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input" type="text" id="iDisplayOrder"
                                    onChange={(e) => {
                                        objContext.AddEditTaskQuestion_ModuleProcessor.HandleChange("iDisplayOrder", e.target.value, objContext,"objData")
                                    }}
                                    onFocus={() => objContext.AddEditTaskQuestion_ModuleProcessor.ValidateFocus(objContext, "iDisplayOrder")}
                                    value={state.objData["iDisplayOrder"]} />
                            </div>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "Polarity")}</span>
                            </div>
                            <div className="row-right">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iPolarityId"
                                    Data={{
                                        DropdownData: props.Data.arrTaskQuestionPolarity,
                                        SelectedValue: state.objData["cPolarity"] ? state.objData["cPolarity"] : -1
                                    }}
                                    Meta={{
                                        DependingTableName: "t_testdrive_Task_Question_Polarity_Data",
                                        IsLanguageDependent: "Y",
                                        ValueColumn: "cPolarity",
                                        DisplayColumn: "vPolarityName",
                                        DefaultOptionValue: - 1,
                                        ShowDefaultOption: "true"
                                    }}
                                    Resource={{
                                        Text: {
                                            DefaultOptionText: Localization.TextFormatter(objTextResource, "DefaultOptionText")
                                        },
                                        JConfiguration: props.JConfiguration,
                                        SkinPath: props.JConfiguration.IntranetSkinPath
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (objChangeData) => objContext.AddEditTaskQuestion_ModuleProcessor.HandleChange("cPolarity", objChangeData["cPolarity"], objContext,"objData")
                                    }}
                                    ParentProps={{ ...props }}
                                />

                            </div>
                        </div>
                        
                    </div>
                </div>

               <div id="Extra" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "Extra" ? "block" : "none") }}>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "NumberOfQuestionsPerPage")}</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input" type="text" id="iNumberOfQuestionsPerPage"
                                    onChange={(e) => {
                                        objContext.AddEditTaskQuestion_ModuleProcessor.HandleChange("iNumberOfQuestionsPerPage", e.target.value, objContext,"objTaskData")
                                    }}
                                    onFocus={() => objContext.AddEditTaskQuestion_ModuleProcessor.ValidateFocus(objContext, "iNumberOfQuestionsPerPage")}
                                    value={state.objTaskData["iNumberOfQuestionsPerPage"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "iStartIndexForSurvey")}</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input" type="text" id="iStartIndexForSurvey"
                                    onChange={(e) => {
                                        objContext.AddEditTaskQuestion_ModuleProcessor.HandleChange("iStartIndexForSurvey", e.target.value, objContext,"objTaskData")
                                    }}
                                    onFocus={() => objContext.AddEditTaskQuestion_ModuleProcessor.ValidateFocus(objContext, "iStartIndexForSurvey")}
                                    value={ state.objTaskData["iStartIndexForSurvey"]} />
                            </div>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "cShowRandomQuestions")}:</span></div>
                            <div className="row-right">
                                <label className="checkbox mt-10">
                                    <input
                                        onFocus={(e => { objContext.AddEditTaskQuestion_ModuleProcessor.ValidateFocus(objContext, 'cShowRandomQuestions'); })}
                                        className="text-input"
                                        id="cShowRandomQuestions"
                                        type="checkbox"
                                        vFilterType="match"
                                        onChange={(e) => {
                                            objContext.AddEditTaskQuestion_ModuleProcessor.HandleChange("cShowRandomQuestions", e.target.checked == true ? "Y" : "N", objContext,"objTaskData");
                                        }}
                                        checked={state.objTaskData["cShowRandomQuestions"] == "Y"}
                                    />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "cSurveyListHasDoubleColumn")}:</span></div>
                            <div className="row-right">
                                <label className="checkbox mt-10">
                                    <input
                                        onFocus={(e => { objContext.AddEditTaskQuestion_ModuleProcessor.ValidateFocus(objContext, 'cSurveyListHasDoubleColumn'); })}
                                        className="text-input"
                                        id="cSurveyListHasDoubleColumn"
                                        type="checkbox"
                                        vFilterType="match"
                                        onChange={(e) => {
                                            objContext.AddEditTaskQuestion_ModuleProcessor.HandleChange("cSurveyListHasDoubleColumn", e.target.checked == true ? "Y" : "N", objContext,"objTaskData");
                                        }}
                                        checked={state.objTaskData["cSurveyListHasDoubleColumn"] == "Y"}
                                    />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "cSurveyListHasNumbering")}:</span></div>
                            <div className="row-right">
                                <label className="checkbox mt-10">
                                    <input
                                        onFocus={(e => { objContext.AddEditTaskQuestion_ModuleProcessor.ValidateFocus(objContext, 'cSurveyListHasNumbering'); })}
                                        className="text-input"
                                        id="cSurveyListHasNumbering"
                                        type="checkbox"
                                        vFilterType="match"
                                        onChange={(e) => {
                                            objContext.AddEditTaskQuestion_ModuleProcessor.HandleChange("cSurveyListHasNumbering", e.target.checked == true ? "Y" : "N", objContext,"objTaskData");
                                        }}
                                        checked={state.objTaskData["cSurveyListHasNumbering"] == "Y"}
                                    />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "vSurveyListNumeringSymbol ")}</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input" type="text" id="vSurveyListNumeringSymbol"
                                    onChange={(e) => {
                                        objContext.AddEditTaskQuestion_ModuleProcessor.HandleChange("vSurveyListNumeringSymbol", e.target.value, objContext,"objTaskData")
                                    }}
                                    onFocus={() => objContext.AddEditTaskQuestion_ModuleProcessor.ValidateFocus(objContext, "vSurveyListNumeringSymbol")}
                                    value={state.objTaskData["vSurveyListNumeringSymbol"]} />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="ValidationError"></div>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;

})

export default AddEditTaskQuestion;