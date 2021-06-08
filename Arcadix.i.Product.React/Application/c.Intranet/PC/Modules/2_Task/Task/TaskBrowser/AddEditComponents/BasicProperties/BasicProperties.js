// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer, useEffect } from 'react';

//Module Related Files.
import Base_AddEditTaskMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/Base_AddEditTaskMaster/Base_AddEditTaskMaster_ModuleProcessor';
import * as BasicProperties_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/AddEditComponents/BasicProperties/BasicProperties_MetaData';

/**
 * @name BasicProperties
 * @param {object} props props
 * @summary This component is used for BasicProperties in Add/EditTask.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const BasicProperties = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                "vPageName": props.Data.IsEdit ? props.Data.DisplayData["vPageName"] : "",
                "vCustomerTaskId": props.Data.IsEdit ? props.Data.DisplayData["vCustomerTaskId"] : "",
                //"t_CMS_Page_Data": props.Data.IsEdit ? props.Data.DisplayData["t_CMS_Page_Data"] : [],
                "iEstimatedTimeToSolveSolveInSeconds": props.Data.IsEdit ? props.Data.DisplayData["iEstimatedTimeToSolveSolveInSeconds"] : null,
                "uSkinId": props.Data.IsEdit ? props.Data.DisplayData["uSkinId"] : "00000000-0000-0000-0000-000000000000",
                "vPageDescription": props.Data.IsEdit ? props.Data.DisplayData["vPageDescription"] : ""
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
    let objContext = { state, props, dispatch, "Base_AddEditTaskMaster_ModuleProcessor": new Base_AddEditTaskMaster_ModuleProcessor() };

    //for setting Language data in state initially
    useEffect(() => {
        let arrLanguageData = objContext.Base_AddEditTaskMaster_ModuleProcessor.AddLanguageData(objContext, objContext.props.Data.DisplayData);
        objContext.dispatch({ type: "SET_STATE", payload: { 'objData': { ...objContext.state.objData, 't_CMS_Page_Data': arrLanguageData } } });
    }, []);

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
    let arrBasicPropertiesMetaData = BasicProperties_MetaData.GetBasicPropertiesMetaData()
    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return <div>

            <div className="title">{Localization.TextFormatter(objTextResource, "General")}</div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "Name")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            autoFocus
                            id="vPageName"
                            onBlur={() => objContext.Base_AddEditTaskMaster_ModuleProcessor.ValidateOnBlur("vPageName", arrBasicPropertiesMetaData, objContext)}
                            className="text-input"
                            value={state.objData.vPageName}
                            onChange={e => {
                                objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleChange("vPageName", e.target.value, objContext)
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "CustomerID")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            id="vCustomerTaskId"
                            className="text-input"
                            value={state.objData.vCustomerTaskId}
                            disabled="disabled"
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "Text")}</span>
                    </div>
                    <div className="row-right">
                        <MultiLanguageInputs
                            Meta={{
                                ValueColumn: "vPageTitle",
                                DependingTableName: "t_CMS_Page_Data",
                                DisplayColumn: "vPageTitle"
                            }}
                            Data={{
                                DisplayData: state.objData,
                                MultiLanguageData: props.Data.MultiLanguageData
                            }}
                            Events={{
                                OnChange: (e, objLanguage) => {
                                    objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleChange("t_CMS_Page_Data.vPageTitle", e.target.value, objContext, objLanguage["iLanguageId"])
                                },
                                OnKeyDown: (e) => {
                                    objContext.props.Events.OnKeyDown(e)
                                }
                            }}

                            ParentProps={props.ParentProps}
                        />
                    </div>
                </div>
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "Time_Estimate") + " (" + Localization.TextFormatter(objTextResource, "Seconds") + ")"}</span>
                    </div>
                    <div className="row-right">
                        <input
                            id="iEstimatedTimeToSolveSolveInSeconds"
                            //onBlur={() => FieldValidator.ValidateClientSide(BasicProperties_MetaData.GetBasicPropertiesMetaData(), objContext.props.Resource.Text, state.objData, "iEstimatedTimeToSolveSolveInSeconds", false, "ValidationError", "", true)}
                            onBlur={() => objContext.Base_AddEditTaskMaster_ModuleProcessor.ValidateOnBlur("iEstimatedTimeToSolveSolveInSeconds", arrBasicPropertiesMetaData, objContext)}
                            className="text-input"
                            value={state.objData.iEstimatedTimeToSolveSolveInSeconds}
                            onChange={e => {
                                objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleChange("iEstimatedTimeToSolveSolveInSeconds", e.target.value, objContext)
                            }}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
            </div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "LookAndFeel")}</span>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="uSkinId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.SkinData,
                                    SelectedValue: state.objData["uSkinId"] ? state.objData["uSkinId"] : "00000000-0000-0000-0000-000000000000"
                                }}
                                Meta={{
                                    DependingTableName: "t_TestDrive_Skin_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "uSkinId",
                                    DisplayColumn: "vSkinTitle",
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
                                    OnChangeEventHandler: (objChangeData) => objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleDropDownChange("skin", objChangeData, objContext),
                                    CheckDeletedDropDownData: (objNode) => objNode["cIsDeleted"] == 'N' ? true : false
                                }}
                                ParentProps={props.ParentProps}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col col-1">
                <div className="title">{Localization.TextFormatter(objTextResource, "Description")}</div>
            </div>

            <div className="col col-1">
                <textarea
                    id="vPageDescription"
                    className="textarea"
                    rows="4"
                    style={{ width: "100%" }}
                    value={state.objData.vPageDescription}
                    onBlur={() => objContext.Base_AddEditTaskMaster_ModuleProcessor.ValidateOnBlur("vPageDescription", arrBasicPropertiesMetaData, objContext)}
                    onChange={e => {
                        objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleChange("vPageDescription", e.target.value, objContext)
                    }}
                />
            </div>
        </div>
    }

    return (
        GetContent()
    );
};

export default forwardRef(BasicProperties);

