//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditJob_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/Job/AddEditJob/AddEditJob_Hook';
import AddEditJob_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/Job/AddEditJob/AddEditJob_ModuleProcessor';

/**
* @name AddEditJob.
* @param {object} props props.
* @summary This component is used to Add/Edit the Job data.
* @returns {object} React.Fragement that contains the content to be added in pop-up required for add/edit.
*/
const AddEditJob = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditJob_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditJob_ModuleProcessor": new AddEditJob_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditJob_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditJob_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        let objSelectedValuesforDropDown = objContext.AddEditJob_ModuleProcessor.GetSelectedValuesforDropDown(objContext);
        return (
            <React.Fragment>
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'Bezeichnung')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vJobName",
                                    DependingTableName: "t_PathFinder_Jobs_Data",
                                    DisplayColumn: "vJobName",
                                    AutoFocus: true
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditJob_ModuleProcessor.HandleChange("t_PathFinder_Jobs_Data.vJobName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditJob_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditJob_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'Berufsfelder')}</span>
                        </div>
                        <div className="row-right">
                            <WrapperComponent
                                ComponentName={"MultiSelectDropdown"}
                                Id="MultiSelectDropDown"
                                Meta={{
                                    DisplayColumn: 'vJobFieldName',
                                    ValueColumn: 'uJobFieldId',
                                    IsLanguageDependent: "Y",
                                    DependingTableName: "t_PathFinder_JobField_Data",
                                    ShortNameColumn: "vJobFieldName",
                                    DefaultOptionValue: "00000000-0000-0000-0000-000000000000",
                                    ShowDefaultOption: true,
                                    DefaultOptionTextKey: 'All'
                                }}
                                Data={{
                                    MultiSelectDropdownData: props.Data.MultiselectDropdownData.JobField,
                                    SelectedItems: objSelectedValuesforDropDown["arrMultiselectDropDownValue"]
                                }}
                                Resource={{
                                    SkinPath: JConfiguration.IntranetSkinPath,
                                    Text: objTextResource
                                }}
                                CallBacks={{
                                    CheckDeletedDropDownData: (objItem) => {
                                        return objItem["iStateId"] == objContext.state.objData["iStateId"] && objItem["cIsDeleted"] == "N" ? true : false
                                    }
                                }}
                                Events={{
                                    OnChangeEventHandler: (arrItem) => objContext.AddEditJob_ModuleProcessor.HandleMultiSelectDropDownChange("uJobFieldId", arrItem, props, objContext)
                                }}
                                ParentProps={{ ...props }}
                            />

                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, "Ankerberuf")}</span>
                        </div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input id="cIsAnchorJob"
                                    name="check"
                                    type="checkbox"
                                    checked={state.objData["cIsAnchorJob"] == "Y"}//{blnIsActive}
                                    onChange={(e) => {
                                        objContext.AddEditJob_ModuleProcessor.HandleChange("cIsAnchorJob", e.target.checked ? "Y" : "N", objContext)
                                    }} />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                </div>
                <div id="ValidationError"></div>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;

})

export default AddEditJob;