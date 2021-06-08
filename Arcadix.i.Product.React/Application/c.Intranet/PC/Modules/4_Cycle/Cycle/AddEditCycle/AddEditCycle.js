//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditCycle_Hook from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/AddEditCycle/AddEditCycle_Hook';
import AddEditCycle_ModuleProcessor from '@shared/Application/c.Intranet/Modules/4_Cycle/Cycle/AddEditCycle/AddEditCycle_ModuleProcessor';

/**
* @name AddEditCycle.
* @param {object} props props.
* @summary This component is used to Add/Edit the Cycle data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditCycle = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditCycle_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditCycle_ModuleProcessor": new AddEditCycle_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditCycle_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    //function GetSchoolYearCheckboxes() {
    //    console.log("GetSchoolYearCheckboxes", props.Data.arrSchoolYearData);
    //    let domSchoolYearCheckbox = [];
    //    props.Data.arrSchoolYearData.map(objSchoolYear => {
    //        domSchoolYearCheckbox = [...domSchoolYearCheckbox, <input id={objSchoolYear["iSchoolYearId"].toString()}
    //            name="check"
    //            type="checkbox"
    //            style={{ "marginRight": "10px" }}
    //            checked={false}
    //            onChange={(e) => {
    //                //AddEditCycleBusinessLogic.HandleChange("cIsArchiveSchool", e.target.value, objContext, "", e.target.checked)
    //            }} />]
    //    });

    //    return domSchoolYearCheckbox;
    //}


    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="BaseData" className="tabcontent subject-management" style={{ display: (state.strDivToShow == "BaseData" ? "block" : "none") }}>

                    <div className="title">{Localization.TextFormatter(objTextResource, "General")}</div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "CycleName")}</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vCycleName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditCycle_ModuleProcessor.HandleChange("vCycleName", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditCycle_ModuleProcessor.ValidateFocus(objContext, "vCycleName")}
                                    value={state.objData["vCycleName"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "Reps")}</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="iCycleNumberOfRepetitions"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditCycle_ModuleProcessor.HandleChange("iCycleNumberOfRepetitions", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditCycle_ModuleProcessor.ValidateFocus(objContext, "iCycleNumberOfRepetitions")}
                                    value={state.objData["iCycleNumberOfRepetitions"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "ArchiveSchool")}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input id="cIsArchiveSchool"
                                        name="check"
                                        type="checkbox"
                                        checked={state.objData["cIsArchiveSchool"] && state.objData["cIsArchiveSchool"].toUpperCase() === "Y" ? true : false}//{blnIsActive}
                                        onChange={(e) => {
                                            objContext.AddEditCycle_ModuleProcessor.HandleChange("cIsArchiveSchool", e.target.checked ? "Y" : "N", objContext)
                                        }} />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "ArchiveTeacher")}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input id="cIsArchiveTeacher"
                                        name="check"
                                        type="checkbox"
                                        checked={state.objData["cIsArchiveTeacher"] && state.objData["cIsArchiveTeacher"].toUpperCase() === "Y" ? true : false}//{blnIsActive}
                                        onChange={(e) => {
                                            objContext.AddEditCycle_ModuleProcessor.HandleChange("cIsArchiveTeacher", e.target.checked ? "Y" : "N", objContext)
                                        }} />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "Reps")}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input id="cIsActive"
                                        name="check"
                                        type="checkbox"
                                        checked={state.objData["cIsActive"] && state.objData["cIsActive"].toUpperCase() === "Y" ? true : false}//{blnIsActive}
                                        onChange={(e) => {
                                            objContext.AddEditCycle_ModuleProcessor.HandleChange("cIsActive", e.target.checked ? "Y" : "N", objContext)
                                        }} />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "ExternalAccessAllowed")}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input id="cIsExternalAccessAllowed"
                                        name="check"
                                        type="checkbox"
                                        checked={state.objData["cIsExternalAccessAllowed"] && state.objData["cIsExternalAccessAllowed"].toUpperCase() === "Y" ? true : false}//{blnIsActive}
                                        onChange={(e) => {
                                            objContext.AddEditCycle_ModuleProcessor.HandleChange("cIsExternalAccessAllowed", e.target.checked ? "Y" : "N", objContext)
                                        }} />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "Keyword")}</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vKeyword"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditCycle_ModuleProcessor.HandleChange("vKeyword", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditCycle_ModuleProcessor.ValidateFocus(objContext, "vKeyword")}
                                    value={state.objData["vKeyword"]} />
                            </div>
                        </div>
                    </div>

                    <div className="title">{Localization.TextFormatter(objTextResource, "Description")}</div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-right">
                                <textarea
                                    className="TextArea"
                                    id="tCycleDescription"
                                    rows="4"
                                    style={{ width: "100%" }}
                                    resize="none"
                                    onChange={(e) => {
                                        objContext.AddEditCycle_ModuleProcessor.HandleChange("tCycleDescription", e.target.value, objContext)
                                    }}
                                    value={state.objData["tCycleDescription"]} />
                            </div>
                        </div>
                    </div>

                    <div className="title">{Localization.TextFormatter(objTextResource, "SchoolYear")}</div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "PrimarySchoolYear")}</span>
                            </div>
                            <div className="row-right">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iCurrentSchoolYear"
                                    Data={{
                                        DropdownData: objContext.props.Data.SchoolYearData,
                                        SelectedValue: objContext.state.objData["iCurrentSchoolYear"]
                                    }}
                                    Meta={{
                                        IsLanguageDependent: "Y",
                                        DependingTableName: "t_TestDrive_Member_Class_SchoolYear_Data",
                                        ValueColumn: "iSchoolYear",
                                        DisplayColumn: "vSchoolYearName",
                                        DefaultOptionValue: - 1,
                                        ShowDefaultOption: "true"
                                    }}
                                    Resource={{
                                        Text: {
                                            DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                        },
                                        JConfiguration: props.Resource.JConfiguration,
                                        SkinPath: props.Resource.SkinPath
                                    }}
                                    Callbacks={{
                                        CheckDeletedDropDownData: (objNode) => {
                                            return objNode["cIsDeleted"] == "N" ? true : false
                                        }
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditCycle_ModuleProcessor.HandleChange("iCurrentSchoolYear", objChangeData["iSchoolYear"], objContext)
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>
                    {
                        //<div className="col col-1">
                        //    <div className="col-item">
                        //        <div className="row-left">
                        //            <span>{props.Data.objTextResource["SchoolYear"]}</span>
                        //        </div>
                        //        <div className="row-right">
                        //            {GetSchoolYearCheckboxes()}
                        //        </div>
                        //    </div>
                        //</div>
                    }
                </div>
                <div id="ValidationError" />
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;
})

export default AddEditCycle;