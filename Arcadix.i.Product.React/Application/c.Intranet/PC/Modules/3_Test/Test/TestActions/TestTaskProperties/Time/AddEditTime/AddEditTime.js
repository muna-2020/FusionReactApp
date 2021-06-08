//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditTime_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Time/AddEditTime/AddEditTime_Hook';
import AddEditTime_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Time/AddEditTime/AddEditTime_ModuleProcessor';

/**
* @name AddEditTime.
* @param {object} props props.
* @summary This component is used to Add/Edit the Language data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditTime = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditTime_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditTime_ModuleProcessor": new AddEditTime_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditTime_Hook.Initialize(objContext);

    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        return (
            <React.Fragment>
                <div className="testtaskproperty">
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, "AufgabenName")}</span>
                            </div>
                            <div className="row-right">
                                <span className="hypen-text">
                                    {state.objData["PageName"] ? state.objData["PageName"] : "-"}
                                </span>
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, "PageTyp")}</span>
                            </div>
                            <div className="row-right">
                                <span className="hypen-text">
                                    {state.objData["PageType"] ? state.objData["PageType"] : "Test"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, 'TaskTimeLimit')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    id="iTaskTimeLimit"
                                    type="text"
                                    disabled={objContext.state.cIsDisable}
                                    onChange={(e) => {
                                        objContext.AddEditTime_ModuleProcessor.HandleChange("iTaskTimeLimit", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditTime_ModuleProcessor.ValidateFocus(objContext, "iTaskTimeLimit")}
                                    value={state.objData["iTaskTimeLimit"] == -1 ? "" : state.objData["iTaskTimeLimit"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, 'MinimumTaskTime')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    id="iMinimumTaskTime"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditTime_ModuleProcessor.HandleChange("iMinimumTaskTime", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditTime_ModuleProcessor.ValidateFocus(objContext, "iMinimumTaskTime")}
                                    value={state.objData["iMinimumTaskTime"]} />
                            </div>
                        </div>

                    </div>


                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, "Ohne Zeitbegrenzung")}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input id="cIsUnlimitedTime"
                                        name="check"
                                        type="checkbox"
                                        checked={state.cIsUnlimitedTime == "Y"}//{blnIsActive}
                                        onChange={(e) => {
                                            objContext.AddEditTime_ModuleProcessor.HandleUnlimitedTimeChange("cIsUnlimitedTime", e.target.checked ? "Y" : "N", objContext)
                                        }} />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, 'TestProgressDisplayId')}</span>
                            </div>
                            <div className="row-right TestTaskpropertyDD">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iTaskIndexDisplayId"
                                    Data={{
                                        DropdownData: props.Data.TaskProgressDisplayDropDowndata,
                                        SelectedValue: state.objData["iTestProgressDisplayId"] != undefined && state.objData ? state.objData["iTestProgressDisplayId"] : -1
                                    }}
                                    Meta={{
                                        DependingTableName: "t_TestDrive_Test_TestProgressDisplay_Data",
                                        IsLanguageDependent: "Y",
                                        ValueColumn: "iTestProgressDisplayId",
                                        DisplayColumn: "vTestProgressDisplay",
                                        DefaultOptionValue: - 1,
                                        ShowDefaultOption: "true"
                                    }}
                                    Resource={{
                                        Text: {
                                            DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                        },
                                        JConfiguration: props.JConfiguration,
                                        SkinPath: props.JConfiguration.IntranetSkinPath
                                    }}
                                    Callbacks={{
                                        CheckDeletedDropDownData: (objNode) => {
                                            return objNode["cIsForFusion"] == "Y" ? true : false
                                        }
                                    }}
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditTime_ModuleProcessor.HandleDropDownChange("iTestProgressDisplayId", objChangeData, props, objContext),
                                    }}
                                    ParentProps={{ ...props }}
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

export default AddEditTime;