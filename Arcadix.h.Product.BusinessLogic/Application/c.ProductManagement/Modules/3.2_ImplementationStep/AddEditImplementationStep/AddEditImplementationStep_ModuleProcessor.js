
//Module related Files
import * as AddEditImplementationStep_MetaData from '@shared/Application/c.ProductManagement/Modules/3.2_ImplementationStep/AddEditImplementationStep/AddEditImplementationStep_MetaData';

//Objects required for module.
import Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep from '@shared/Object/c.ProductManagement/ImplementationStep/ImplementationStep';
import Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType  from '@shared/Object/c.ProductManagement/ImplementationStep/ImplementationStepLayerTaskType/ImplementationStepLayerTaskType';
import Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer from '@shared/Object/c.ProductManagement/ImplementationStep/ImplementationStepLayer/ImplementationStepLayer';
import Object_Cockpit_Workflow_AssignedWorkflow from '@shared/Object/c.Cockpit/Workflow/AssignedWorkflow/AssignedWorkflow';
import Object_Cockpit_Workflow_WorkflowStatus from '@shared/Object/c.Cockpit/Workflow/WorkFlowStatus/WorkflowStatus';

/**
 * @name AddEditImplementationStep_ModuleProcessor
 * @summary Class for Add/Edit ImplementationStep module.
 */
class AddEditImplementationStep_ModuleProcessor extends IntranetBase_ModuleProcessor {
    
    /**
   * @name StoreMapList     
   * @summary Returns list of objects used in the module
   * @return {Array} Array of object list
   */
    static StoreMapList() {
        return [
            "Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType",
            "Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer",
            "Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep",
            "Object_DevServer_ProductManagement_Module",
            "Object_Cockpit_Workflow_AssignedWorkflow",
            "Object_Cockpit_Workflow_WorkflowStatus",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.ProductManagement/Modules/3_UseCase/UseCase",
        ];
    }

    /**
        * @name LoadInitialData
        * @param {object} objContext passes Context object
        * @summary Calls the Queue and Execute method
        */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        ////ImplementaionStep
        //Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.Initialize({});
        //arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep];

        ////ImplementaionSteplayerTaskType object
        Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType];

        ////ImplementaionSteplayer object
        Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayer];

        if (props.Data.IsEdit) {
            let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ImplementationStepGrid"] : [];
            let objEditData = arrSelectedRows && arrSelectedRows.length > 0 ? arrSelectedRows[0] : {};

            let objParams = {
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "vObjectId": objEditData.uUseCaseImplementationStepId ? objEditData.uUseCaseImplementationStepId : ""
                            }
                        },
                        {
                            "match": {
                                "uWorkflowTypeId": props.Data.WorkflowTypeId
                            }
                        }
                    ]
                }
            };
            Object_Cockpit_Workflow_AssignedWorkflow.Initialize(objParams);
            arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_AssignedWorkflow];
        }        

        let objWfsParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uWorkflowTypeId": props.Data.WorkflowTypeId
                        }
                    }
                ]
            }
        };
        Object_Cockpit_Workflow_WorkflowStatus.Initialize(objWfsParams);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Workflow_WorkflowStatus];

        // Text Resource
        let arrResourceParams = ["/c.ProductManagement/Modules/3_UseCase/UseCase"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for multilanguage input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData", strLanguageId);
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    }

    /**
     * @name SaveData
     * @param {object} objContext takes objContext
     * @param {boolean} blnClose sends true when SaveAndClosed is pressed
     * @summary hits the add/edit api after validation succeeds
     */
    SaveData(objContext, blnClose = false) {
        let objValidationObject = this.Validate(objContext);
        if (!objValidationObject) {
            ApplicationState.SetProperty("blnShowAnimation", true);
            var objSearchQuery = {
                "must": [
                    {
                        "match": {
                            "uUseCaseId": objContext.props.Data.UseCaseId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
            let objWorkflowData = {
                ...objContext.refWorkflow.current.GetSaveData(), //will include uWorkflowStatusId and vComment
                //["vObjectId"]: objContext.state.objData["uUseCaseId"],
                ["uWorkflowTypeId"]: objContext.props.Data.WorkflowTypeId
            };
            if (objContext.state.objData["uUseCaseImplementationStepId"] && objContext.state.objData["uUseCaseImplementationStepId"] != "") {
                let objParams = objParams = {
                    "SearchQuery": objSearchQuery,
                    "vEditData": [{ ...objContext.state.objData, "WorkflowData": objWorkflowData }],
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId
                };
                Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.EditData(objParams, (objReturn, cIsNewData) => {
                    //objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    //ApplicationState.SetProperty("blnShowAnimation", false);
                    //let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    //ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ImplementationStepGrid": [objReturn[0]] });
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                var vModuleName = DataRef(objContext.props.Object_DevServer_ProductManagement_Module, "Object_DevServer_ProductManagement_Module;cIsDeleted;N;uApplicationTypeId;" + ApplicationState.GetProperty("ActiveMainNavigationId"))["Data"].filter((objData) => objData["uModuleId"] == ApplicationState.GetProperty("ActiveSubNavigationId"))[0]["vModuleName"];
                //objContext.state.objData["vUniqueCode"] = objContext.state.objData["vImplementationStepName"] + "_" + ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0]["vUseCaseName"] + "_" + vModuleName;
                objContext.state.objData["vUniqueCode"] = vModuleName+"_" + ApplicationState.GetProperty("SelectedRows")["UseCaseGrid"][0]["vUseCaseName"]  ;
                let objParams = objParams = {
                    "SearchQuery": objSearchQuery,
                    "vAddData": { ...objContext.state.objData, "WorkflowData": objWorkflowData },
                    "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId
                };
                Object_DevServer_ProductManagement_ImplementationStep_ImplementationStep.AddData(objParams, (objReturn, cIsNewData) => {
                    //objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    //ApplicationState.SetProperty("blnShowAnimation", false);
                    //let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    //ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ImplementationStepGrid": null });
                    if (blnClose) {
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            }
        }
        else {
            objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objValidationObject } });
        }
    }

    /**
     * @name HandleDropDownChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {*} objChangeData selected object of the dropdown
     * @param {*} props takes props
     * @param {*} objContext takes objContext
     * @summary   To change the row Data on change of the dropdown value
     */
    HandleDropDownChange(strAttributeName, objChangeData, props, objContext) {
        let strCellName = props.Meta["ValueColumn"];
        let strValue = objChangeData[strCellName];
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData");
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
        if (strAttributeName=="uImplementationStepLayerId") {
            let arrImplementationStepLayerTaskType = [];
            DataRef(objContext.props.Object_DevServer_ProductManagement_ImplementationStep_ImplementationStepLayerTaskType)["Data"].map((objImplementationStepLayerTaskType) => {
                if (objImplementationStepLayerTaskType["uImplementationStepLayerId"] == objChangeData["uImplementationStepLayerId"]) {
                    arrImplementationStepLayerTaskType = [...arrImplementationStepLayerTaskType, objImplementationStepLayerTaskType];
                }
            })
            objContext.dispatch({ type: "SET_STATE", payload: { "arrImplementationStepLayerTaskType": arrImplementationStepLayerTaskType } });
        }
    }

    /**
     * @name Validate
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary Validate
     * @returns {object} objNewValidationObject
     */
    Validate(objContext, strColumnName) {
        var objNewValidationObject = FieldValidator.ValidateClientSide(AddEditImplementationStep_MetaData.GetAddEditMetaData(), objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError");
        objContext.dispatch({ type: "SET_STATE", payload: { "objValidationMessages": objNewValidationObject } });
        return objNewValidationObject;
    }

    /**
     * @name ValidateFocus
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary hits the add/edit api after validation succeeds
     */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }

    /**
   * @param {*} objItem objItem
   * @summary  To filter the dropdown data based on the condition
   * @returns {bool} boolean
   */
    CreateItemEventHandler(objItem) {
        if (objItem["cIsDeleted"] === "N") {
            return true;
        }
        else {
            return false;
        }
    }
}
export default AddEditImplementationStep_ModuleProcessor;