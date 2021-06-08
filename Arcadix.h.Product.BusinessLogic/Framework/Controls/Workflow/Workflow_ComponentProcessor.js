//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

import IntranetBase_ModuleProcessor from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor";

/**
 * @name Workflow_ComponentProcessor
 * @summary Class for Add/Edit Task module.
 */
class Workflow_ComponentProcessor extends IntranetBase_ModuleProcessor {
    
    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @summary Handle change method to handle changes in the JSX elements
     */
    HandleChange(strAttributeName, strValue, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { [strAttributeName]: strValue } });
    }

    
    /**
     * @name GetRecentWorkflowData
     * @param {object} objContext takes objContext
     * @summary Returns the Recent work-flow data (also for Initial work-flow data)
     */
    GetRecentWorkflowData(props) {
        let objRecentWorkflowStatus = props.Data.AssignedWorkflowData ? props.Data.AssignedWorkflowData.find(obj => obj["cIsLatest"] == "Y") : {};
        return objRecentWorkflowStatus ? objRecentWorkflowStatus : {};
    }

    

    /**
     * @name GetRecentWorkflowStatus
     * @param {string} strLanguageId takes LanguageId
     * @param {string} strId takes strId
     * @param {object} objContext takes objContext
     * @summary Gets the RecentWorkflow status from t_CMS_Page_AssignedWorkflowStatus
     */
    GetRecentWorkflowStatus(strLanguageId, strId, objContext) {
        let strRecentWorkflowStausId = strId == "uWorkflowStatusId" ? -1 : "";
        var objRecentWorkflowStatus;
        if (objContext.state.objData["t_CMS_Page_AssignedWorkflowStatus"])
            objRecentWorkflowStatus = objContext.state.objData["t_CMS_Page_AssignedWorkflowStatus"].find(objAssignedWorkflowStatus => {
                return objAssignedWorkflowStatus["cIsLatest"] == "Y" && objAssignedWorkflowStatus["iLanguageId"] == strLanguageId
            });
        if (objRecentWorkflowStatus) {
            strRecentWorkflowStausId = objRecentWorkflowStatus[strId];
        };
        return strRecentWorkflowStausId;
    }

    /**
     * @name HandleChangeWorkflowStatus
     * @param {string} strId takes strId
     * @param {string} strValue takes strValue
     * @param {string} strLanguageId takes LanguageId
     * @param {object} objContext takes objContext
     * @summary Handel the change of drop down in WorkFlowStatus component
     */
    HandleChangeWorkflowStatus(strId, strValue, strLanguageId, objContext) {

        //updating the arrNewWorkflowStatuses to be sent in vEditData
        let objNewWorkflowStatus = {}
        if (strId == "uWorkflowStatusId") {
            objNewWorkflowStatus = { ...objContext.state.arrRecentWorkflowStatuses.find(objRecentWorkflowStatus => objRecentWorkflowStatus["iLanguageId"] == strLanguageId), "uWorkflowStatusId": strValue, "vComment": "" }
        }
        else {
            objNewWorkflowStatus = { ...objContext.state.arrRecentWorkflowStatuses.find(objRecentWorkflowStatus => objRecentWorkflowStatus["iLanguageId"] == strLanguageId), "vComment": strValue }
        }
        let arrNewEditWorkflowStauses = objContext.state.arrNewWorkflowStatuses.filter(objNewWorkflowStatuses => objNewWorkflowStatuses["iLanguageId"] != strLanguageId);

        //updating arrRecentWorkflowStatuses for two way binding
        let arrNewRecentWorkflowStauses = objContext.state.arrRecentWorkflowStatuses.map(objRecentWorkflowStatus => {
            if (objRecentWorkflowStatus["iLanguageId"] == strLanguageId) {
                if (strId == "uWorkflowStatusId")
                    return { ...objRecentWorkflowStatus, "uWorkflowStatusId": strValue, "vComment": "" }
                else
                    return { ...objRecentWorkflowStatus, "vComment": strValue }
            }
            else return objRecentWorkflowStatus
        });
        objContext.dispatch({ type: "SET_STATE", payload: { arrNewWorkflowStatuses: [...arrNewEditWorkflowStauses, objNewWorkflowStatus], arrRecentWorkflowStatuses: arrNewRecentWorkflowStauses } });
    }

    /**
     * @name GetWorkflowStatusDetail
     * @param {string} strLanguageId takes LanguageId
     * @param {string} strType takes the field id of work flow
     * @param {object} objContext takes objContext
     * @summary Returns recent work flow status Id or Comment based on strType passed
     */
    GetWorkflowStatusDetail(strLanguageId, strType, objContext) {
        let strRecentWorkflowStausDetail = strType == "uWorkflowStatusId" ? -1 : "";
        var objRecentWorkflowStatus = objContext.state.arrRecentWorkflowStatuses.find(objAssignedWorkflowStatus => {
            return objAssignedWorkflowStatus["cIsLatest"] == "Y" && objAssignedWorkflowStatus["iLanguageId"] == strLanguageId
        });
        if (objRecentWorkflowStatus) {
            strRecentWorkflowStausDetail = objRecentWorkflowStatus[strType];
        };
        return strRecentWorkflowStausDetail;
    }

    /**
     * @name GetCurrentWorkflowStatusName
     * @param {string} strLanguageId takes Language id
     * @param {object} objContext takes objContext 
     * @summary Returns name of WorkflowStatus
     */
    GetCurrentWorkflowStatusName(strLanguageId, objContext) {
        let strCurrentWorkFlowStatusName = "  -  ";
        let strCurrentWorkFlowStatusId = this.GetRecentWorkflowStatus(strLanguageId, "uWorkflowStatusId", objContext);
        if (strCurrentWorkFlowStatusId != -1)
            strCurrentWorkFlowStatusName = this.GetWorkflowStatusNameFromId(strCurrentWorkFlowStatusId, objContext);
        return strCurrentWorkFlowStatusName;
    }

    /**
     * @name GetWorkflowStatusNameFromId
     * @param {string} strWorkflowStatusId takes work flow status id
     * @param {object} objContext takes objContext
     * @summary Returns name of WorkflowStatus
     */
    GetWorkflowStatusNameFromId(strWorkflowStatusId, objContext) {
        let arrActiveWorkFlowStatuses = objContext.props.Data.DropdownData.ActiveWorkFlowStatuses;
        var strWorkflowStatusName = "-";
        var objActiveWorkFlowStatus = arrActiveWorkFlowStatuses.find(objActiveWorkFlowStatus => {
            return objActiveWorkFlowStatus["uWorkflowStatusId"] == strWorkflowStatusId
        });
        var arrt_TestDrive_WorkflowStatus_Data = objActiveWorkFlowStatus ? (objActiveWorkFlowStatus["t_TestDrive_WorkflowStatus_Data"] ? objActiveWorkFlowStatus["t_TestDrive_WorkflowStatus_Data"] : []) : [];
        arrt_TestDrive_WorkflowStatus_Data.map(objActiveWorkFlowStatusData => {
            if (objActiveWorkFlowStatusData["iLanguageId"] == JConfiguration.InterfaceLanguageId)
                strWorkflowStatusName = objActiveWorkFlowStatusData["vWorkflowStatus"];
        })
        return strWorkflowStatusName;
    }

    /**
     * @name HandleDropDownChange
     * @param {string} strDropDownType takes the type of drop down
     * @param {object} objSelectedValue takes objSelectedValue
     * @param {object} objContext takes objContext
     * @param {object} objDropDownProps takes objDropDownProps
     * @summary Handles the change in drop down selection
     */
    HandleDropDownChange(strDropDownType, objSelectedValue, objContext, objDropDownProps) {
        
    }

}
export default Workflow_ComponentProcessor;