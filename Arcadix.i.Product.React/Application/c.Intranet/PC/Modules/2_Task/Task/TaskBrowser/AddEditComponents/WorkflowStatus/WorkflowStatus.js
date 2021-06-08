// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer, useEffect } from 'react';

//Helper classes.
import DropDown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown";

//Base classes.
import * as IntranetBase_Hook from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook';
import Base_AddEditTaskMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskMaster/Base_AddEditTaskMaster/Base_AddEditTaskMaster_ModuleProcessor';

/**
 * @name WorkflowStatus
 * @param {object} props props
 * @summary This component is used for WorkflowStatus in Add/EditTask.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const WorkflowStatus = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {
                "t_CMS_Page_AssignedWorkflowStatus": props.Data.IsEdit ? ( props.Data.DisplayData["t_CMS_Page_AssignedWorkflowStatus"] ? props.Data.DisplayData["t_CMS_Page_AssignedWorkflowStatus"] : [] ) : []
            },
            //objData: props.Data.IsEdit ? props.Data.DisplayData : {},
            arrRecentWorkflowStatuses: [],
            arrNewWorkflowStatuses: []
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

    //for setting Recentworkflowstatus data in state initially
    useEffect(() => {
        let arrRecentWorkflowStatuses = objContext.Base_AddEditTaskMaster_ModuleProcessor.GetRecentWorkflowData(objContext);
        objContext.dispatch({ type: "SET_STATE", payload: { 'arrRecentWorkflowStatuses': arrRecentWorkflowStatuses } });
    }, []);    

    useImperativeHandle(ref, () => ({
        GetSaveData: () => {
            return state
        }
    }), [state, props]);

    /**
     * @name GetMultiWorkFlowStatusBlock
     * @summary Forms the whole jsx required for WorkFlowStatus.
     * @returns {object} jsx, React.Fragment
     */
    const GetMultiWorkFlowStatusBlock = () => {
        var arrMultiLanguageTable = props.Data.MultiLanguageData;
        return arrMultiLanguageTable.map(objMultiLanguage => {
            return GetSingleBlock(objMultiLanguage);
        });
    }

    /**
     * @name GetMultiWorkFlowStatusBlock
     * @summary Forms the whole jsx required for WorkFlowStatus.
     * @returns {object} jsx, React.Fragment
     */
    const GetSingleBlock = (objMultiLanguage) => {
        return <div className ="mb-15">
            <div>{objMultiLanguage["vLanguageCultureInfo"]}</div>
            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left currentstatus">
                        <div className="nowrap"><b>{Localization.TextFormatter(props.Resource.Text, "CurrentStatus")}</b></div>
                    </div>
                    <div className="row-right currentstatus">
                        <div className="nowrap">{objContext.Base_AddEditTaskMaster_ModuleProcessor.GetCurrentWorkflowStatusName(objMultiLanguage.iFrameworkLanguageId, objContext)}</div>
                    </div>
                </div>

                <div className="col-item">
                    <div className="row-left">
                        <div className="nowrap"><b>{Localization.TextFormatter(props.Resource.Text, "NewStatus")}</b></div>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown">
                            <DropDown
                                Id="iCategoryCompetencyId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.ActiveWorkFlowStatuses,
                                    SelectedValue: props.Data.IsEdit ? objContext.Base_AddEditTaskMaster_ModuleProcessor.GetWorkflowStatusDetail(objMultiLanguage.iFrameworkLanguageId, "uWorkflowStatusId", objContext) : -1 
                                }}
                                Meta={{
                                    DependingTableName: "t_TestDrive_WorkflowStatus_Data",
                                    IsLanguageDependent: "Y",
                                    ValueColumn: "uWorkflowStatusId",
                                    DisplayColumn: "vWorkflowStatus",
                                    DefaultOptionValue: - 1,
                                    ShowDefaultOption: "true"
                                }}
                                Resource={{
                                    Text: {
                                        DefaultOptionText: Localization.TextFormatter(props.Resource.Text, "PleaseChoose")
                                    },
                                    JConfiguration: props.Resource.JConfiguration,
                                    SkinPath: props.Resource.SkinPath
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData) => objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleChangeWorkflowStatus("uWorkflowStatusId", objChangeData["uWorkflowStatusId"], objMultiLanguage.iFrameworkLanguageId, objContext),
                                }}
                                Callbacks={{
                                    CheckDeletedDropDownData: (objNode) => {
                                        return objNode["cIsDeleted"] == "N" && objNode["iCategoryId"] == props.Data.DropdownData.CategoryId ? true : false
                                    }
                                }}
                                ParentProps={props.ParentProps}  
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col col-1">
                <textarea
                    id="tChangeRequest"
                    className="textarea"
                    rows="4"
                    style={{ width: "100%" }}
                    value={objContext.Base_AddEditTaskMaster_ModuleProcessor.GetWorkflowStatusDetail(objMultiLanguage.iFrameworkLanguageId, "vComment", objContext)}                        
                    onChange={e => {
                        objContext.Base_AddEditTaskMaster_ModuleProcessor.HandleChangeWorkflowStatus("vComment", e.target.value, objMultiLanguage.iFrameworkLanguageId, objContext )
                    }}
                />
            </div>

            <div className="col col-1"><b>{Localization.TextFormatter(props.Resource.Text, "Audit")}</b></div>

            <div>{GetAuditsForWorkflowStatus(objMultiLanguage.iFrameworkLanguageId)}</div>

        </div>
    }

    const GetAuditsForWorkflowStatus = (strLanguageId) => {
        let arrFullAssignedWorkflowStatuses = props.Data.IsEdit ? props.Data.DisplayData["t_CMS_Page_AssignedWorkflowStatus"] : []
        let arrFullLangWorkflowStatuses = arrFullAssignedWorkflowStatuses.filter(objWorkflowStatus => {
            return objWorkflowStatus["iLanguageId"] == strLanguageId
        });
        arrFullLangWorkflowStatuses.sort((a, b) => { return new Date(b["dtCreatedOn"]) - new Date(a["dtCreatedOn"]) })

        return <table className="workflow-audit-table">
            {arrFullLangWorkflowStatuses.map(objLangWorkflowStatus => {
                return <React.Fragment>
                    <tr>
                        <td><b className="mr-20">{Localization.DateTimeFormatter(objLangWorkflowStatus["dtCreatedOn"], props.Resource.JConfiguration["LanguageCultureInfo"])}</b></td>
                        <td><b className="mr-20">{objContext.Base_AddEditTaskMaster_ModuleProcessor.GetWorkflowStatusNameFromId(objLangWorkflowStatus.uWorkflowStatusId, objContext)}</b></td>
                        <td><b className="mr-20">{props.Events.GetAdministratorName(objLangWorkflowStatus["uUserId"])}</b></td>
                    </tr>
                    <tr>
                        <td>{objLangWorkflowStatus["vComment"] ? objLangWorkflowStatus["vComment"] : "-" }</td>
                    </tr>
                </React.Fragment>
            })}
        </table>
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return <div>
            <div className="col col-1">
                <div className="title">{Localization.TextFormatter(props.Resource.Text, "WorkFlowStatus")}</div>
            </div>
            {GetMultiWorkFlowStatusBlock()}
        </div>
    }

    return (
        GetContent()
    )
}

export default forwardRef(WorkflowStatus);
