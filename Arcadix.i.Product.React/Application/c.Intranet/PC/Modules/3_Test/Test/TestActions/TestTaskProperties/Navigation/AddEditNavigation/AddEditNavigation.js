//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditNavigation_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Navigation/AddEditNavigation/AddEditNavigation_Hook';
import AddEditNavigation_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Navigation/AddEditNavigation/AddEditNavigation_ModuleProcessor';

/**
* @name AddEditNavigation.
* @param {object} props props.
* @summary This component is used to Add/Edit the Language data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditNavigation = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditNavigation_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditNavigation_ModuleProcessor": new AddEditNavigation_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditNavigation_Hook.Initialize(objContext);

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
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, 'TaskTopLeftTitle')}</span>
                            </div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vTaskTopLeftTitle",
                                        DependingTableName: "t_TestDrive_Test_Tasks_Data",
                                        DisplayColumn: "vTaskTopLeftTitle"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData,
                                    }}
                                    Events={{
                                        OnChange: (e, objTestTaskData) => {
                                            objContext.AddEditNavigation_ModuleProcessor.HandleChange("t_TestDrive_Test_Tasks_Data.vTaskTopLeftTitle", e.target.value, objContext, objTestTaskData["iLanguageId"]);
                                        }
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, 'BackButtonText')}</span>
                            </div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vBackButtonText",
                                        DependingTableName: "t_TestDrive_Test_Tasks_Data",
                                        DisplayColumn: "vBackButtonText"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData,
                                    }}
                                    Events={{
                                        OnChange: (e, objTestTaskData) => {
                                            objContext.AddEditNavigation_ModuleProcessor.HandleChange("t_TestDrive_Test_Tasks_Data.vBackButtonText", e.target.value, objContext, objTestTaskData["iLanguageId"]);
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
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, 'NextButtonText')}</span>
                            </div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vNextButtonText",
                                        DependingTableName: "t_TestDrive_Test_Tasks_Data",
                                        DisplayColumn: "vNextButtonText"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData,
                                    }}
                                    Events={{
                                        OnChange: (e, objTestTaskData) => {
                                            objContext.AddEditNavigation_ModuleProcessor.HandleChange("t_TestDrive_Test_Tasks_Data.vNextButtonText", e.target.value, objContext, objTestTaskData["iLanguageId"]);
                                        }
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

export default AddEditNavigation;