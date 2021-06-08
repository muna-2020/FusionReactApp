
//Base classes.
import * as Base_Form from '@shared/Framework/BaseClass/Base_Form';

//Objects required for module.
import Object_Cockpit_Skin from '@shared/Object/c.Cockpit/Skin/Skin';
import Object_Intranet_Task_TaskFolder from '@shared/Object/c.Intranet/2_Task/TaskFolder/TaskFolder';

/**
 * @name AddEditTaskFolder_ModuleProcessor
 * @summary Class for Add/Edit TaskFolder module.
 */
class AddEditTaskFolder_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [            
            "Object_Cockpit_Skin"            
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        new ObjectQueue().QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];        

        //Skin
        Object_Cockpit_Skin.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Skin];     

        return arrDataRequest;
    }

    /**
    * @name GetInitilaData 
    * @param {object} props takes props
    * @summary Creates Initial data - objAddData for the module
    */
    static GetInitilaData(props) {
        let objAddData = {
            "uUserId": props.Data.ClientUserDetails.UserId,
            "iPageParentFolderId": props.Data.objRowData["iPageFolderId"],
            "cIsForInternalTesting": props.Data.objRowData.iPageFolderId != 0 ? props.Data.objRowData.cIsForInternalTesting : "N",
            "t_CMS_FileSystem_PageFolder_Langauge": props.Data.objRowData.iPageFolderId != 0 ? props.Data.objRowData.t_CMS_FileSystem_PageFolder_Langauge : []
        }
        return objAddData;
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
            if (objContext.state.objData["iPageFolderId"] && objContext.state.objData["iPageFolderId"] != "") {
                ApplicationState.SetProperty("blnShowAnimation", true);
                Object_Intranet_Task_TaskFolder.EditData({ "vEditData": objContext.state.objData }, (objReturn, cIsNewData) => {
                    if (objContext.state.objData.iPageParentFolderId == 0) {
                        ArcadixCacheData.DeleteEntity("Object_Intranet_Task_Task");
                    }
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    if (blnClose) {
                        ApplicationState.SetProperty("FolderId", objReturn[0].iPageFolderId);
                        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TaskGrid": null });
                        let objSelectedNode = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
                        ApplicationState.SetProperty("SelectedNode", { ...objSelectedNode, "Tree_Master": objReturn[0] });
                        Popup.ClosePopup(objContext.props.Id);
                    }
                });
            } else {
                Object_Intranet_Task_TaskFolder.AddData({ "vAddData": objContext.state.objData }, (objReturn, cIsNewData) => {
                    ApplicationState.SetProperty("FolderId", objReturn[0].iPageFolderId);
                    ApplicationState.SetProperty("blnShowAnimation", false);
                    objContext.dispatch({ type: "SET_STATE", payload: { "objData": objReturn[0] } });
                    //let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                    //ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TaskGrid": null });
                    //let objSelectedNode = ApplicationState.GetProperty("SelectedNode") ? ApplicationState.GetProperty("SelectedNode") : {};
                    //ApplicationState.SetProperty("SelectedNode", { ...objSelectedNode, "Tree_Master": objReturn[0] });
                    let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
                    if (fnSelectTreeNode) {
                        fnSelectTreeNode(objReturn[0]);
                    }
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
     * @name Validate
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary Validate
     * @returns {object} objNewValidationObject
     */
    Validate(objContext, strColumnName) {
        var objNewValidationObject = FieldValidator.ValidateClientSide(objContext.props.Meta.HeaderData, objContext.props.Resource.Text, objContext.state.objData, strColumnName, true, "ValidationError");
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
    * @param {*} objContext
    * @summary GetMultiLanguageData to form the two arrays arrMultiLanguageData and arrMultiLanguageDetails
    */
    GetMultiLanguageData(objContext) {
        let arrClientLanguageId = [];
        let arrMultiLanguageData = [];
        let arrMultiLanguageDetails = [];
        if (objContext.props.Data.MainClientLanguageData && objContext.props.Data.LanguageData) {
            objContext.props.Data.MainClientLanguageData.map((objMainClientLanguage) => {
                arrClientLanguageId = [...arrClientLanguageId, objMainClientLanguage["iLanguageId"]]
            })

            objContext.props.Data.LanguageData.map((objLanguage) => {
                if (arrClientLanguageId.includes(objLanguage["iFrameworkLanguageId"])) {
                    let obj = {
                        //"iPageId":null, //for edit id is required
                        "iLanguageId": objLanguage["iFrameworkLanguageId"],
                        "vPageTitle": null,
                        "tCorrectAnswerExplanation": null,
                        "cPointOverride": null,
                        "dPoints": null
                    };
                    arrMultiLanguageData = [...arrMultiLanguageData, obj];
                    arrMultiLanguageDetails = [...arrMultiLanguageDetails, objLanguage];
                }
            })
        }
        return { arrMultiLanguageData, arrMultiLanguageDetails };
    }

    /**
    * @name IsLanguageAdded
    * @param {string} strLanguageId consists of value of the LangaugeId
    * @param {object} objContext takes objContext
    * @summary Checks if Langauge is present for checkbox.
    */
    IsLanguageAdded(strLanguageId, objContext) {
        let arrt_CMS_FileSystem_PageFolder_Langauge = objContext.state.objData.t_CMS_FileSystem_PageFolder_Langauge ? objContext.state.objData.t_CMS_FileSystem_PageFolder_Langauge : [];
        let blnLanguageAdded = arrt_CMS_FileSystem_PageFolder_Langauge.filter(objt_CMS_FileSystem_PageFolder_Langauge => { return objt_CMS_FileSystem_PageFolder_Langauge.iLanguageId == strLanguageId }).length > 0;
        return blnLanguageAdded;
    }

    /**
    * @name HandleCheckBoxClick
    * @param {string} strLanguageId consists of value of the LangaugeId
    * @param {object} objContext takes objContext
    * @summary Handels checkbox click of Langauge component.
    */
    HandleCheckBoxClick(strLanguageId, objContext) {
        let arrt_CMS_FileSystem_PageFolder_Langauge = objContext.state.objData.t_CMS_FileSystem_PageFolder_Langauge ? objContext.state.objData.t_CMS_FileSystem_PageFolder_Langauge : [];
        let blnLanguageAdded = arrt_CMS_FileSystem_PageFolder_Langauge.filter(objt_CMS_FileSystem_PageFolder_Langauge => { return objt_CMS_FileSystem_PageFolder_Langauge.iLanguageId == strLanguageId }).length > 0;
        var arr_New_t_CMS_FileSystem_PageFolder_Langauge;
        if (blnLanguageAdded && objContext.state.objData.t_CMS_FileSystem_PageFolder_Langauge.length > 1) {
            arr_New_t_CMS_FileSystem_PageFolder_Langauge = arrt_CMS_FileSystem_PageFolder_Langauge.filter(objt_CMS_FileSystem_PageFolder_Langauge => { return objt_CMS_FileSystem_PageFolder_Langauge.iLanguageId != strLanguageId })
        }
        else if (!blnLanguageAdded) {
            arr_New_t_CMS_FileSystem_PageFolder_Langauge = [...arrt_CMS_FileSystem_PageFolder_Langauge, { ["iLanguageId"]: strLanguageId }]
        }
        if (arr_New_t_CMS_FileSystem_PageFolder_Langauge) {
            let objNewData = { ...objContext.state.objData, ["t_CMS_FileSystem_PageFolder_Langauge"]: arr_New_t_CMS_FileSystem_PageFolder_Langauge };
            objContext.dispatch({ type: "SET_STATE", payload: { objData: objNewData } });
        }
    }
}

export default AddEditTaskFolder_ModuleProcessor;