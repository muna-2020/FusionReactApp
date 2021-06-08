import IntranetBase_ModuleProcessor from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_ModuleProcessor';
//Base classes.
import Object_Cockpit_OfflineProcess_OfflineProcessExecution from '@shared/Object/c.Cockpit/OfflineProcess/OfflineProcessExecution/OfflineProcessExecution';




/**
* @name OffineExecutionDisplay_ModuleProcessor
* @param NA
* @summary Class for  OffineExecutionDisplay.
* @return NA
*/
class OffineExecutionDisplay_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [{ "StoreKey": "ApplicationState", "DataKey": "OfflineExecutionData" },
            { "StoreKey": "ApplicationState", "DataKey": "cIsOfflineClosed" }];
    }

    /**
     * @name GetOfflineData
     * @param {object} props passes props
     * @summary Get initial request Params for the component.
     * @returns {object} return objDataCalls
     */
    GetOfflineData(objContext) {
        let objSearchQuery =
        {
            ["SearchQuery"]: {
                ["must"]: [
                    {
                        ["match"]: {
                            ["uUserId"]: objContext.props.ParentProps.ClientUserDetails.UserId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtModifiedOn": {
                        "order": "desc"
                    }
                }
            ]
        };
        Object_Cockpit_OfflineProcess_OfflineProcessExecution.GetData(objSearchQuery, (objReturn, blnDataReturned) => {
            if (blnDataReturned) {
                let arrOfflineExecution = objReturn[Object.keys(objReturn)]["Data"];
                ApplicationState.SetProperty("OfflineExecutionData", arrOfflineExecution);
                arrOfflineExecution.map(objExecutionData => {
                    if (objExecutionData.iProgressValue != 100) {
                        let objParams = JSON.parse(objExecutionData["vParameters"]);
                        Object_Cockpit_OfflineProcess_OfflineProcessExecution.RegisterOfflineEvent(objContext, objParams.Event);
                    }
                });
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
            }
            
        }, true)

    }


}

export default OffineExecutionDisplay_ModuleProcessor;