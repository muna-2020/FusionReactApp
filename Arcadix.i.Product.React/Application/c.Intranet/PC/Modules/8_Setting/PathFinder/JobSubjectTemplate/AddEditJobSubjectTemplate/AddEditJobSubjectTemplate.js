//React related imports.
import React, { useReducer } from 'react';

//Components used/Helper Class.
import HierarchicalDropDown from "@root/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown";

//Module related files.
import * as AddEditJobSubjectTemplate_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate/AddEditJobSubjectTemplate/AddEditJobSubjectTemplate_Hook';
import AddEditJobSubjectTemplate_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobSubjectTemplate/AddEditJobSubjectTemplate/AddEditJobSubjectTemplate_ModuleProcessor';

/**
* @name AddEditJobSubjectTemplate.
* @param {object} props props.
* @summary This component is used to Add/Edit the Job data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditJobSubjectTemplate = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditJobSubjectTemplate_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditJobSubjectTemplate_ModuleProcessor": new AddEditJobSubjectTemplate_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditJobSubjectTemplate_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditJobSubjectTemplate_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {

        return (
            <React.Fragment>
                <div className="task-tabcontent add-edit-job-subject">
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "Subject")}</span>
                            </div>
                            <div className="row-right" Id="iSubjectId">
                                <HierarchicalDropDown
                                    Id="AddEditJobSubjectTemplate_HierarchicalDropDown"
                                    Data={{
                                        HierarchicalDropdownData: props.Data.DropdownData.SubjectData,
                                        SelectedValue: state.objData.iSubjectId ? state.objData.iSubjectId : -1
                                    }}
                                    Meta={{
                                        ValueColumn: "iSubjectId",
                                        ParentId: 'iParentSubjectId',
                                        DisplayColumn: "vSubjectName",
                                        DependingTableName: "t_TestDrive_Subject_Data",
                                        IsLanguageDependent: "Y",
                                        Root: 0,
                                        DefaultOptionValue: -1, //Pass the id of the default option text      
                                        ShowDefaultOption: true,
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, objDropDownProps) => objContext.AddEditJobSubjectTemplate_ModuleProcessor.HandleChange("iSubjectId", objChangeData["iSubjectId"], objContext)
                                    }}
                                    CallBacks={{
                                        OnBeforeShowNode: (objNode) => objNode["cIsDeleted"] == "N" ? objNode : null
                                    }}
                                    Resource={{
                                        SkinPath: JConfiguration.IntranetSkinPath,
                                        Text: objTextResource["PleaseChoose"]
                                    }}
                                    ParentProps={props.ParentProps}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="checkbox-row-flex">
                        <div className="checkbox-row">
                            <span>{Localization.TextFormatter(objTextResource, "HasMinimumValue")}</span>
                            <label className="checkbox">
                                <input id="cHasMinimumValue"
                                    name="cHasMinimumValue"
                                    type="checkbox"
                                    checked={state.objData["cHasMinimumValue"] == "Y"}
                                    onChange={(e) => {
                                        objContext.AddEditJobSubjectTemplate_ModuleProcessor.HandleChange("cHasMinimumValue", e.target.checked ? "Y" : "N", objContext)
                                    }} />
                                <span className="checkmark" />
                            </label>
                        </div>
                        <div className="checkbox-row">
                            <span>{Localization.TextFormatter(objTextResource, "HasFromToValue")}</span>
                            <label className="checkbox">
                                <input id="cHasFromToValue"
                                    name="cHasFromToValue"
                                    type="checkbox"
                                    checked={state.objData["cHasFromToValue"] == "Y"}
                                    onChange={(e) => {
                                        objContext.AddEditJobSubjectTemplate_ModuleProcessor.HandleChange("cHasFromToValue", e.target.checked ? "Y" : "N", objContext)
                                    }} />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "Order")}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    id="iOrderId"
                                    className="text-input"
                                    value={state.objData["iOrderId"]}
                                    onChange={(e) => objContext.AddEditJobSubjectTemplate_ModuleProcessor.HandleChange("iOrderId", e.target.value, objContext)}
                                    onKeyDown={(e) => objContext.AddEditJobSubjectTemplate_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditJobSubjectTemplate_ModuleProcessor, objContext)}
                                    onBlur={() => objContext.AddEditJobSubjectTemplate_ModuleProcessor.ValidateOnBlur("iOrderId", objContext)}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;

})

export default AddEditJobSubjectTemplate;