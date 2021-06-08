//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditState_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/State/AddEditState/AddEditState_Hook';
import AddEditState_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/State/AddEditState/AddEditState_ModuleProcessor';

/**
* @name AddEditState.
* @param {object} props props.
* @summary This component is used to Add/Edit the Job data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditState = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditState_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditState_ModuleProcessor": new AddEditState_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditState_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditState_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="StateManagement" className="state-tabcontent" style={{ display: (state.strDivToShow == "StateManagement" ? "block" : "none") }}>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "StateNumberForTestToken") + ":"}</span>
                            </div>
                            <div className="row-right">
                                <span className="hypen-text">
                                    {props.Data.blnIsEdit ? state.objData["iStateNumberForTestToken"] : state.objData.iStateNumberForTestToken ? state.objData.iStateNumberForTestToken : "-"}
                                </span>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "StateName") + ":"}</span>
                            </div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vStateName",
                                        DependingTableName: "t_TestDrive_Member_State_Data",
                                        DisplayColumn: "vStateName",
                                        AutoFocus: true
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditState_ModuleProcessor.HandleChange("t_TestDrive_Member_State_Data.vStateName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditState_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditState_ModuleProcessor, objContext)
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "ShortStateName") + ":"}</span>
                            </div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vShortStateName",
                                        DependingTableName: "t_TestDrive_Member_State_Data",
                                        DisplayColumn: "vShortStateName"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData
                                    }}
                                    Events={{
                                        OnChange: (e, objLanguage) => {
                                            objContext.AddEditState_ModuleProcessor.HandleChange("t_TestDrive_Member_State_Data.vShortStateName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                        },
                                        OnKeyDown: (e) => {
                                            objContext.AddEditState_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditState_ModuleProcessor, objContext)
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "TitleId") + ":"}</span>
                            </div>
                            <div className="row-right intranet-dropdown">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="TitleDropdown"
                                    Data={{
                                        DropdownData: objContext.props.Data.DropdownData.TitleData,
                                        SelectedValue: state.objData["iTitleId"] != undefined ? objContext.state.objData["iTitleId"] : -1
                                    }}
                                    Meta={{
                                        IsLanguageDependent: "Y",
                                        DependingTableName: "t_TestDrive_Member_Title_Data",
                                        ValueColumn: "iTitleId",
                                        DisplayColumn: "vTitleName",
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
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditState_ModuleProcessor.HandleChange("iTitleId", objChangeData["iTitleId"], objContext)
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "FirstName") + ":"}</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vFirstName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditState_ModuleProcessor.HandleChange("vFirstName", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditState_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditState_ModuleProcessor, objContext)}
                                    value={state.objData["vFirstName"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "Name") + ":"}</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditState_ModuleProcessor.HandleChange("vName", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditState_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditState_ModuleProcessor, objContext)}
                                    value={state.objData["vName"]} />
                            </div>
                        </div>
                    </div>


                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "DisplayOrder") + ":"}</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="iDisplayOrder"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditState_ModuleProcessor.HandleChange("iDisplayOrder", e.target.value, objContext)
                                    }}
                                    onBlur={() => objContext.AddEditState_ModuleProcessor.ValidateOnBlur("iDisplayOrder", objContext)}
                                    onKeyDown={(e) => objContext.AddEditState_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditState_ModuleProcessor, objContext)}
                                    value={state.objData["iDisplayOrder"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "LongName") + ":"}</span>
                            </div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vLongName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditState_ModuleProcessor.HandleChange("vLongName", e.target.value, objContext)
                                    }}
                                    onKeyDown={(e) => objContext.AddEditState_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditState_ModuleProcessor, objContext)}
                                    value={state.objData["vLongName"]} />
                            </div>
                        </div>
                    </div>
                </div>

                <div id="LogoUpload" className="state-tabcontent" style={{ display: (state.strDivToShow == "LogoUpload" ? "block" : "none") }}>
                    Yet to be discussed
                </div>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;
})

export default AddEditState;