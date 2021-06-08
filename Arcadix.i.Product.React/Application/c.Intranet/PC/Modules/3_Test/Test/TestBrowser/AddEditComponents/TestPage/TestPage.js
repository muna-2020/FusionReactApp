// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';


/**
 * @name TestPage
 * @param {object} props props
 * @summary This component is used for TestPage in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const TestPage = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                cDisplayTaskNameAsTaskTitle: props.Data.IsEdit ? props.Data.DisplayData.cDisplayTaskNameAsTaskTitle : "N",
                "t_TestDrive_Test_TestProperty": [
                    {
                        "cHideEndTestButtonEvenIfEnabledByalgorithm": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cHideEndTestButtonEvenIfEnabledByalgorithm"] : "N") :"N",
                            "cShowTaskNotAnswered": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cShowTaskNotAnswered"] : "N") : "N",
                    }
                ],
                "t_TestDrive_Test_Data": props.Data.MultiLanguageData.map(objMultiLang => {
                    let objEditTestData = props.Data.IsEdit ? props.Data.DisplayData["t_TestDrive_Test_Data"].find(obj => obj["iLanguageId"] == objMultiLang["iLanguageId"]) : {};
                    return {
                        "vTaskPageTopLeftTitle": props.Data.IsEdit && objEditTestData ? objEditTestData["vTaskPageTopLeftTitle"] : "",
                        "iLanguageId": objMultiLang["iLanguageId"]
                    }
                })
                //"t_TestDrive_Test_Data": props.Data.IsEdit ? props.Data.DisplayData["t_TestDrive_Test_Data"] : []
            }
        };
    }

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state, dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "Base_AddEditTestMaster_ModuleProcessor": new Base_AddEditTestMaster_ModuleProcessor() };

    /**
     * @name useImperativeHandle
     * @param {object} objContext  objContext
     * @summary Setting up imperative handle
     */
    useImperativeHandle(ref, () => ({
        GetSaveData: () => {
            return state.objData
        }
    }), [state, props]);

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return <React.Fragment>            
           <div className="title">{Localization.TextFormatter(objTextResource, "TaskName")}</div>
        
            <div className="col col-1 checkbox-block">
                <div className="col-item">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "ShowTaskNameAsTaskTitle")}</span>
                    </div>
                    <div className="row-right testpage">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={state.objData.cDisplayTaskNameAsTaskTitle == "Y" ? true : false}
                                name="" id=""
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("cDisplayTaskNameAsTaskTitle", e.target.checked ? "Y" : "N", objContext )} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="col col-1">
                <div className="col-item">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "TaskPageTopLeftTitle")}</span>
                    </div>
                    <div className="row-right testpage">
                        <MultiLanguageInputs
                            Meta={{
                                ValueColumn: "vTaskPageTopLeftTitle",
                                DependingTableName: "t_TestDrive_Test_Data",
                                DisplayColumn: "vTaskPageTopLeftTitle"
                            }}
                            Data={{
                                DisplayData: state.objData,
                                MultiLanguageData: props.Data.MultiLanguageData
                            }}
                            Events={{
                                OnChange: (e, objLanguage) => {
                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("t_TestDrive_Test_Data.vTaskPageTopLeftTitle", e.target.value, objContext, objLanguage["iLanguageId"])
                                },
                                OnKeyDown: (e) => {
                                    objContext.props.Events.OnKeyDown(e)
                                }
                            }}
                            ParentProps={props.ParentProps}
                        />
                    </div>
                </div>
            </div>

        <div className="title">{Localization.TextFormatter(objTextResource, "Footer")}</div>

            <div className="col col-1 checkbox-block">
                <div className="col-item">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "HideEndTestButton")}</span>
                    </div>
                    <div className="row-right testpage">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={state.objData.t_TestDrive_Test_TestProperty[0] ? (state.objData.t_TestDrive_Test_TestProperty[0].cHideEndTestButtonEvenIfEnabledByalgorithm == "Y" ? true : false) : false}
                                name="" id=""
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("cHideEndTestButtonEvenIfEnabledByalgorithm", e.target.checked ? "Y" : "N", objContext)} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>

           <div className="title">{Localization.TextFormatter(objTextResource, "Evaluation")}</div>           

            <div className="col col-1 checkbox-block">
                <div className="col-item">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "ShowTaskNotAnswered")}</span>
                    </div>
                    <div className="row-right testpage">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={state.objData.t_TestDrive_Test_TestProperty[0] ? (state.objData.t_TestDrive_Test_TestProperty[0].cShowTaskNotAnswered == "Y" ? true : false) : false}
                                name="" id=""
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("cShowTaskNotAnswered", e.target.checked ? "Y" : "N", objContext)} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>

        </React.Fragment>
    }

    return (
        GetContent()
    );
};

export default forwardRef(TestPage); 