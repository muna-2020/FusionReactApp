// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer, useEffect } from 'react';

//Helper classes.
import DropDown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown";

//Base classes.
import * as IntranetBase_Hook from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook';
import Workflow_ComponentProcessor from '@shared/Framework/Controls/Workflow/Workflow_ComponentProcessor';
import * as Workflow_Hook from '@shared/Framework/Controls/Workflow/Workflow_Hook';

/**
 * @name WorkflowStatus
 * @param {object} props props
 * @summary This component is used for WorkflowStatus in Add/EditTask.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const WorkflowStatus = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Workflow_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state, dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "Workflow_ComponentProcessor": new Workflow_ComponentProcessor() };


    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Dropdown_Hook, that contains all the custom hooks.
    * @returns null
    */
    Workflow_Hook.Initialize(objContext);

    useImperativeHandle(ref, () => ({
        GetSaveData: () => {
            return { ...state, "uWorkflowStatusId": state.objWorkflowStatusToSet.uWorkflowStatusId }
        }
    }), [state, props]);

    /**
     * @name GetMultiWorkFlowStatusBlock
     * @summary Forms the whole jsx required for WorkFlowStatus.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = (objMultiLanguage) => {
        return <div className="mb-15">
            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left currentstatus">
                        <div className="nowrap"><b>{"CurrentStatus"}</b></div>
                    </div>
                    <div className="row-right currentstatus">
                        <div className="nowrap">{objContext.Workflow_ComponentProcessor.GetWorkflowStatusNameFromId(state.objRecentWorkflowStatus.uWorkflowStatusId, objContext)}</div>
                    </div>
                </div>

                <div className="col-item">
                    <div className="row-left">
                        <div className="nowrap"><b>{"NewStatus"}</b></div>
                    </div>
                    <div className="row-right">
                        <div className="intranet-dropdown">
                            <DropDown
                                Id="iCategoryCompetencyId"
                                Data={{
                                    DropdownData: props.Data.DropdownData.ActiveWorkFlowStatuses,
                                    SelectedValue: props.Data.IsEdit ? objContext.Workflow_ComponentProcessor.GetWorkflowStatusDetail(props.Data.LanguageId, "uWorkflowStatusId", objContext) : -1
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
                                    Text: props.Resource.Text,
                                    JConfiguration: JConfiguration,
                                    SkinPath: props.Resource.SkinPath
                                }}
                                Events={{
                                    OnChangeEventHandler: (objChangeData) => objContext.Workflow_ComponentProcessor.HandleChange("objWorkflowStatusToSet", objChangeData, objContext),
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
                    value={state.strComment}
                    onChange={e => {
                        objContext.Workflow_ComponentProcessor.HandleChange("vComment", e.target.value, objContext)
                    }}
                />
            </div>

            <div className="col col-1"><b>{Localization.TextFormatter(props.Resource.Text, "Audit")}</b></div>

            <div>{GetAuditsForWorkflowStatus(props.Data.LanguageId)}</div>

        </div>
    }

    const GetAuditsForWorkflowStatus = (strLanguageId) => {
        let arrFullLangWorkflowStatuses = props.Data.AssignedWorkflowData ? props.Data.AssignedWorkflowData : [];
        arrFullLangWorkflowStatuses.sort((a, b) => { return new Date(b["dtCreatedOn"]) - new Date(a["dtCreatedOn"]) })
        return <table className="workflow-audit-table">
            {arrFullLangWorkflowStatuses.map(objLangWorkflowStatus => {
                return <React.Fragment>
                    <tr>
                        <td><b className="mr-20">{Localization.DateTimeFormatter(objLangWorkflowStatus["dtCreatedOn"], JConfiguration["LanguageCultureInfo"])}</b></td>
                        <td><b className="mr-20">{objContext.Workflow_ComponentProcessor.GetWorkflowStatusNameFromId(objLangWorkflowStatus.uWorkflowStatusId, objContext)}</b></td>
                        {/*<td><b className="mr-20">{props.Events.GetAdministratorName(objLangWorkflowStatus["uUserId"])}</b></td>*/}
                    </tr>
                    <tr>
                        <td>{objLangWorkflowStatus["vComment"] ? objLangWorkflowStatus["vComment"] : "-"}</td>
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
    const GetContent_Old = () => {
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
