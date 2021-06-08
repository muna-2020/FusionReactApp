//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as AddEditIndex_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Index/AddEditIndex/AddEditIndex_Hook';
import AddEditIndex_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Index/AddEditIndex/AddEditIndex_ModuleProcessor';


/**
* @name AddEditIndex.
* @param {object} props props.
* @summary This component is used to Add/Edit the Language data.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const AddEditIndex = ((props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditIndex_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditIndex_ModuleProcessor": new AddEditIndex_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditIndex_Hook.Initialize(objContext);

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
                                    {state.objData["PageName"] ? state.objData["PageName"] : "_"}
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
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, 'TaskIndexDisplayId')}</span>
                            </div>
                            <div className="row-right">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="iTaskIndexDisplayId"
                                    Data={{
                                        DropdownData: objTextResource["TaskIndexDisplay"],
                                        SelectedValue: state.objData["iTaskIndexDisplayId"] != undefined && state.objData ? state.objData["iTaskIndexDisplayId"] : -1
                                    }}
                                    Meta={{
                                        ValueColumn: "iTaskIndexDisplayId",
                                        DisplayColumn: "vTaskIndexDisplayText",
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
                                    Events={{
                                        OnChangeEventHandler: (objChangeData, props) => objContext.AddEditIndex_ModuleProcessor.HandleDropDownChange("iTaskIndexDisplayId", objChangeData, props, objContext),
                                    }}
                                    ParentProps={{ ...props }}
                                />

                            </div>
                        </div>

                        <div className="col-item">
                            <div className="row-left">
                                <span style={{ fontWeight: 'bold' }}>{Localization.TextFormatter(objTextResource, 'IndexToDoExplanation')}</span>
                            </div>
                            <div className="row-right">
                                <MultiLanguageInputs
                                    Meta={{
                                        ValueColumn: "vIndexToDoExplanation",
                                        DependingTableName: "t_TestDrive_Test_Tasks_Data",
                                        DisplayColumn: "vIndexToDoExplanation"
                                    }}
                                    Data={{
                                        DisplayData: state.objData,
                                        MultiLanguageData: props.Data.MultiLanguageData,
                                    }}
                                    Events={{
                                        OnChange: (e, objTestTaskData) => {
                                            objContext.AddEditIndex_ModuleProcessor.HandleChange("t_TestDrive_Test_Tasks_Data.vIndexToDoExplanation", e.target.value, objContext, objTestTaskData["iLanguageId"]);
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

export default AddEditIndex;