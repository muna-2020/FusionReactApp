//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditClassType_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/ClassType/AddEditClassType/AddEditClassType_Hook';
import AddEditClassType_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/ClassType/AddEditClassType/AddEditClassType_ModuleProcessor';

/**
* @name AddEditClassType.
* @param {object} props props.
* @summary This component is used to Add/Edit the Language data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditClassType = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditClassType_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditClassType_ModuleProcessor": new AddEditClassType_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditClassType_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="SchoolYear" className="tabcontent subject-management class-type-parent">
                    <div className="title">
                        {Localization.TextFormatter(objTextResource, 'Klassentypen')}
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'OrganizationalUnit')}</span>
                            </div>
                            <div className="row-right">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iStateId"
                                    Data={{
                                        DropdownData: props.Data.DropdownData.State,
                                        SelectedValue: state.objData["iStateId"] != undefined && state.objData ? state.objData["iStateId"] : -1
                                    }}
                                    Meta={{
                                        DependingTableName: "t_TestDrive_Member_State_Data",
                                        IsLanguageDependent: "Y",
                                        ValueColumn: "iStateId",
                                        DisplayColumn: "vStateName",
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
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditClassType_ModuleProcessor.HandleDropDownChange("iStateId", objChangeData, props, objContext),
                                        CheckDeletedDropDownData: objContext.AddEditClassType_ModuleProcessor.CreateItemEventHandler
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "ClassTypeName")}</span></div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vClassTypeName",
                                        DependingTableName: "t_TestDrive_Member_ClassType_Data",
                                        DisplayColumn: "vClassTypeName"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditClassType_ModuleProcessor.HandleChange("t_TestDrive_Member_ClassType_Data.vClassTypeName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditClassType_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClassType_ModuleProcessor, objContext)
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "LongClassTypeName")}</span></div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vLongClassTypeName",
                                        DependingTableName: "t_TestDrive_Member_ClassType_Data",
                                        DisplayColumn: "vLongClassTypeName"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditClassType_ModuleProcessor.HandleChange("t_TestDrive_Member_ClassType_Data.vLongClassTypeName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditClassType_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClassType_ModuleProcessor, objContext)
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Sequence")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="iDisplayOrder"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditClassType_ModuleProcessor.HandleChange("iDisplayOrder", e.target.value, objContext)
                                    }}
                                    value={state.objData["iDisplayOrder"]}
                                    onKeyDown={(e) => objContext.AddEditClassType_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditClassType_ModuleProcessor, objContext)}
                                    onFocus={() => objContext.AddEditClassType_ModuleProcessor.ValidateFocus(objContext, "iDisplayOrder")}
                                />
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

export default AddEditClassType;