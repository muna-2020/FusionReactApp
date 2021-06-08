//React related imports.
import React, { useReducer } from 'react';


//Module related files.
import * as AddEditJobLevel_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobLevel/AddEditJobLevel/AddEditJobLevel_Hook';
import AddEditJobLevel_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobLevel/AddEditJobLevel/AddEditJobLevel_ModuleProcessor';

/**
* @name AddEditJobLevel.
* @param {object} props props.
* @summary This component is used to Add/Edit the JobField data.
* @returns {object} React.Fragement that contains the content to be added in pop-up required for add/edit.
*/
const AddEditJobLevel = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditJobLevel_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditJobLevel_ModuleProcessor": new AddEditJobLevel_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditJobLevel_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditJobLevel_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        return (
            <React.Fragment>
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'Niveau')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vJobLevelName",
                                    DependingTableName: "t_PathFinder_JobField_JobLevel_Data",
                                    DisplayColumn: "vJobLevelName",
                                    AutoFocus: true
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditJobLevel_ModuleProcessor.HandleChange("t_PathFinder_JobField_JobLevel_Data.vJobLevelName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditJobLevel_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditJobLevel_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'Berufsfeld')}</span>
                        </div>
                        <div className="row-right">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="JobFieldDropDown"
                                Data={{
                                    DropdownData: props.Data.MultiselectDropdownData.JobField,
                                    SelectedValue: state.objData["uJobFieldId"] ? state.objData["uJobFieldId"] : "00000000-0000-0000-0000-000000000000"
                                }}
                                Meta={{
                                    ValueColumn: "uJobFieldId",
                                    DisplayColumn: "vJobFieldName",
                                    DependingTableName: "t_PathFinder_JobField_Data",
                                    IsLanguageDependent: "Y",
                                    DefaultOptionValue: "00000000-0000-0000-0000-000000000000",
                                    ShowDefaultOption: "true"
                                }}
                                Resource={{
                                    Text: {
                                        DefaultOptionText: Localization.TextFormatter(objTextResource, "All")
                                    },
                                    JConfiguration: props.JConfiguration,
                                    SkinPath: props.JConfiguration.IntranetSkinPath
                                }}
                                Callbacks={{
                                    CheckDeletedDropDownData: (objNode) => {
                                        return objNode["iStateId"] == objContext.state.objData["iStateId"] && objNode["cIsDeleted"] == "N" ? true : false
                                    }
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditJobLevel_ModuleProcessor.HandleDropDownChange("uJobFieldId", objChangeData, props, objContext),
                                    CheckDeletedDropDownData: objContext.AddEditJobLevel_ModuleProcessor.CreateItemEventHandler
                                }}
                                ParentProps={{ ...props }}
                            />

                        </div>
                    </div>
                </div>
                <div id="ValidationError"></div>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;

})

export default AddEditJobLevel;