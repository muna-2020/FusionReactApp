//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditJobField_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobField/AddEditJobField/AddEditJobField_Hook';
import AddEditJobField_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/JobField/AddEditJobField/AddEditJobField_ModuleProcessor';

/**
* @name AddEditJobField.
* @param {object} props props.
* @summary This component is used to Add/Edit the JobField data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditJobField = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditJobField_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditJobField_ModuleProcessor": new AddEditJobField_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditJobField_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditJobField_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        return (
            <React.Fragment>
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'FieldName')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vJobFieldName",
                                    DependingTableName: "t_PathFinder_JobField_Data",
                                    DisplayColumn: "vJobFieldName",
                                    AutoFocus: true
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditJobField_ModuleProcessor.HandleChange("t_PathFinder_JobField_Data.vJobFieldName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditJobField_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditJobField_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>

                    <div className="col-item">
                        <div className="row-left">
                            <span >{Localization.TextFormatter(objTextResource, 'Organisationseinheit')}</span>
                        </div>
                        <div className="row-right">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="StateDropDown"
                                Data={{
                                    DropdownData: props.Data.arrStateData,
                                    SelectedValue: state.objData["iStateId"] ? state.objData["iStateId"] : 0
                                }}
                                Meta={{
                                    ValueColumn: "iStateId",
                                    DisplayColumn: "vStateName",
                                    DependingTableName: "t_TestDrive_Member_State_Data",
                                    IsLanguageDependent: "Y",
                                    DefaultOptionValue: 0,
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
                                        return objNode["cIsDeleted"] == "N" ? true : false
                                    }
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditJobField_ModuleProcessor.HandleDropDownChange("iStateId", objChangeData, props, objContext),
                                    CheckDeletedDropDownData: objContext.AddEditJobField_ModuleProcessor.CreateItemEventHandler
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

export default AddEditJobField;