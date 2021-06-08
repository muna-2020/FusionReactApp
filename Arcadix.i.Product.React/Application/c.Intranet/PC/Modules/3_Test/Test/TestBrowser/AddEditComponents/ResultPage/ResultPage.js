// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';
import * as ResultPage_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/AddEditComponents/ResultPage/ResultPage_MetaData';


/**
 * @name ResultPage
 * @param {object} props props
 * @summary This component is used for ResultPage in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const ResultPage = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} objData Initial state 
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                cUseResultTextByRange: props.Data.IsEdit ? props.Data.DisplayData.cUseResultTextByRange : "N",
                "t_TestDrive_Test_TestProperty": [
                    {
                        "cShowAdditionalResultStatus": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cShowAdditionalResultStatus"] : "N") : "N",
                        "dPassValue": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["dPassValue"] : null) : null,
                        "vTestCompleteNotificationEmailId": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["vTestCompleteNotificationEmailId"] : "") : "",
                        "uResultAttributeId": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["uResultAttributeId"] : "00000000-0000-0000-0000-000000000000") : "00000000-0000-0000-0000-000000000000"
                    }
                ]
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
    let arrResultPageMetaData = ResultPage_MetaData.GetResultPageMetaData()

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return <React.Fragment>

            <div className="title">{Localization.TextFormatter(objTextResource, "ResultStatus")}</div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "ResultStatus")}</span>
                    </div>

                    <div className="row-right">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={state.objData.t_TestDrive_Test_TestProperty[0].cShowAdditionalResultStatus ? (state.objData.t_TestDrive_Test_TestProperty[0].cShowAdditionalResultStatus == "Y" ? true : false) : false}
                                name="" id=""
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("cShowAdditionalResultStatus", e.target.checked ? "Y" : "N", objContext)} />
                            <span className="checkmark"></span>
                        </label>
                    </div>

                </div>

                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "PassValue")}</span>
                    </div>

                    <div className="row-right">
                        <input className="text-input"
                            value={state.objData.t_TestDrive_Test_TestProperty[0] ? state.objData.t_TestDrive_Test_TestProperty[0].dPassValue : ""}
                            id="dPassValue"
                            disabled={state.objData.t_TestDrive_Test_TestProperty[0].cShowAdditionalResultStatus == "Y" ? false : true}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                            onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("dPassValue", e.target.value, objContext)} />
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "ResultAttribute")}</span>
                    </div>
                    <div className="row-right">
                        {
                            <div className="intranet-dropdown">
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="uResultAttributeId"
                                    Data={{
                                        DropdownData: props.Data.DropDownData.TestResultAttributeData,
                                        SelectedValue: state.objData.t_TestDrive_Test_TestProperty[0]["uResultAttributeId"] ? state.objData.t_TestDrive_Test_TestProperty[0]["uResultAttributeId"] : "00000000-0000-0000-0000-000000000000"
                                    }}
                                    Meta={{
                                        DependingTableName: "t_TestDrive_Test_ResultAttribute_Data",
                                        IsLanguageDependent: "Y",
                                        ValueColumn: "uResultAttributeId",
                                        DisplayColumn: "vAttributeName",
                                        DefaultOptionValue: "00000000-0000-0000-0000-000000000000",
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
                                        OnChangeEventHandler: (objChangeData) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("uResultAttributeId", objChangeData.uResultAttributeId, objContext),
                                    }}
                                    Callbacks={{
                                        CheckDeletedDropDownData: (objNode) => {
                                            return objNode["cIsDeleted"] == "N" ? true : false
                                        }
                                    }}
                                    ParentProps={props.ParentProps}
                                />
                            </div>
                        }
                        {
                            //<div style={{ color: "red" }}> Object needs to be created </div>
                        }
                    </div>
                </div>
            </div>

            {props.Data.TestType != "Survey" && props.Data.TestType != "Wrapper" ?
                <div>
                    <div className="title">{Localization.TextFormatter(objTextResource, "Notify")}</div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span className="nowrap">{Localization.TextFormatter(objTextResource, "NotificationEmail")}</span>
                            </div>

                            <div className="row-right">
                                <input className="text-input"
                                    value={state.objData.t_TestDrive_Test_TestProperty[0].vTestCompleteNotificationEmailId ? (state.objData.t_TestDrive_Test_TestProperty[0].vTestCompleteNotificationEmailId) : ""}
                                    id="vTestCompleteNotificationEmailId"
                                    onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                                    onBlur={(e) => props.Data.IsSaveClicked ? FieldValidator.ValidateClientSide(arrResultPageMetaData, objContext.props.Resource.Text, { ["vTestCompleteNotificationEmailId"]: e.target.value }, "vTestCompleteNotificationEmailId", false, "", "", true) : {}}
                                    onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("vTestCompleteNotificationEmailId", e.target.value, objContext)} />
                            </div>
                        </div>
                    </div>
                </div> : <div />}
        </React.Fragment>
    }

    return (
        GetContent()
    );
};

export default forwardRef(ResultPage);