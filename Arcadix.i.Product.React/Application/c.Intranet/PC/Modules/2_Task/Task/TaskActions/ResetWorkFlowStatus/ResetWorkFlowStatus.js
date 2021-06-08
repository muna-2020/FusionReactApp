// React related imports.
import React, { useReducer } from "react";

/**
* @name ResetWorkFlowStatus
* @param {object} props props
* @summary This component displays the ResetWorkFlowStatus.
* @returns {object} returns a jsx .
*/
const ResetWorkFlowStatus = props => {


    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, { strWorkFlowStatusId: props.Data.ActiveWorkFlowStatuses[0]["uWorkflowStatusId"] });
    let DropDown = props.ComponentController.GetFrameworkComponent("Dropdown");
    return (
        <div className="delete-popup-parent reset-work-flow">
            <div className="reset-workflow-padd">
                <div className="row-left">
                    <span>{Localization.TextFormatter(props.Resource.Text, "WorkFlowResetText")}</span>
                </div>
                <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(props.Resource.Text, "WorkflowStatus")}</span>
                        </div>
                        <div className="row-right">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="iCategoryCompetencyId"
                                Data={{
                                    DropdownData: props.Data.ActiveWorkFlowStatuses,
                                    SelectedValue: props.Data.ActiveWorkFlowStatuses[0]["uWorkflowStatusId"]
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
                                    OnChangeEventHandler: (objChangeData) => {
                                        dispatch({ type: "SET_STATE", payload: { "strWorkFlowStatusId": objChangeData["uWorkflowStatusId"] } });
                                        //props.Events.HandleChangeWorkflowStatus("uWorkflowStatusId", objChangeData["uWorkflowStatusId"], objMultiLanguageTable.iFrameworkLanguageId)
                                    },
                                    CheckDeletedDropDownData: props.Events.CheckDeletedDropDownData
                                }}
                                Callbacks={{
                                    CheckDeletedDropDownData: (objNode) => {
                                        return true;
                                        //return objNode["cIsDeleted"] == "N" && objNode["iCategoryId"] == props.Data.DropdownData.CategoryId ? true : false
                                    }
                                }}
                                ParentProps={props.ParentProps}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className="delete-popup-footer">
                <button
                    className="delete-btn"
                    onClick={() => props.Events.ResetWorkflowStatus(state.strWorkFlowStatusId, props.Id)}
                >
                    {Localization.TextFormatter(props.Resource.Text, "OK")}
                </button>
                <button className="delete-btn" onClick={() => { Popup.ClosePopup(props.Id) }} >{Localization.TextFormatter(props.Resource.Text, "Abort")}</button>
            </div>
        </div>
    );
};

/**
 * @name GetDimensions
 * @param {object} objPopupData popup data
 * @summary Gets the Height and Width from the meta.
 * @returns {object} Dimension
 */
ResetWorkFlowStatus.GetDimensions = (objPopupData) => {
    return {
        Height: objPopupData && objPopupData.Meta.Height ? objPopupData.Meta.Height : "auto",
        Width: objPopupData && objPopupData.Meta.Width ? objPopupData.Meta.Width : 390
    };
};


export default ResetWorkFlowStatus;
