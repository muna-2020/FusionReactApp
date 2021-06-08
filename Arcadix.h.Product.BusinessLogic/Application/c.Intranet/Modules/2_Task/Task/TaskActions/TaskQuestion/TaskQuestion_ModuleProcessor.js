//Objects required for module.
import Object_Intranet_Task_TaskQuestion from '@shared/Object/c.Intranet/2_Task/Task/LikertData/TaskQuestion/TaskQuestion';
import Object_Intranet_Task_TaskQuestionPolarity from '@shared/Object/c.Intranet/2_Task/Task/LikertData/TaskQuestionPolarity/TaskQuestionPolarity';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as AddEditTaskQuestion_MetaData from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion/AddEditTaskQuestion/AddEditTaskQuestion_MetaData';

/**
* @name TaskQuestion_ModuleProcessor
* @param NA
* @summary Class for TaskQuestion module display.
* @return NA
*/
class TaskQuestion_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Task_TaskQuestion",
            "Object_Intranet_Task_TaskQuestionPolarity",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_Language"
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

        let objTaskQuestionParam = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iPageId": props.PageId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ],
        };

        // TaskQuestion
        Object_Intranet_Task_TaskQuestion.Initialize(objTaskQuestionParam);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskQuestion];

        //TaskPoloarity
        Object_Intranet_Task_TaskQuestionPolarity.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Task_TaskQuestionPolarity];

        let objSubjectParam = {
            "SortKeys": [
                {
                    "t_TestDrive_Subject_Data.vSubjectName": {
                        "order": "asc"
                    }
                }]
        }
        // Subject
        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectParam);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);

        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];
        return arrDataRequest;
    }

    /**
* @name GetGridData
* @param {any} objContext
* @summary Return Grid data
* @returns {object} Grid data
*/
    GetGridData(objContext) {
        let intApplicationTypeForLanguageData = 2;
        let objData = {
            RowData: DataRef(objContext.props.Object_Intranet_Task_TaskQuestion, "Object_Intranet_Task_TaskQuestion;iPageId;" + objContext.props.PageId).Data,
            LanguageData: objContext.TaskQuestion_ModuleProcessor.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForLanguageData),
        };
        return objData;
    }

    /**
  * @name OpenAddEditPopup
  * @param {object} objContext passes Context object
  * @param {boolean} blnIsEdit is either edit or Add
  * @summary Call tabbed popup for Add/Edit of TaskQuestion
  * @return null
  */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TaskQuestionGrid"] : [];
        let intApplicationType = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        else {
            blnShowErrorPopup = objContext.state.intSubSubjectDropdownSelectedValue == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationType),
                    IsEdit: blnIsEdit,
                    arrTaskQuestionPolarity: DataRef(objContext.props.Object_Intranet_Task_TaskQuestionPolarity)["Data"],
                    iPageId: objContext.props.PageId,
                    TaskData: objContext.props.TaskData,
                    SubSubjectDropdownSelectedValue: objContext.state.intSubSubjectDropdownSelectedValue,
                },
                Meta: {
                    PopupName: "AddEditTaskQuestion",
                    HeaderData: AddEditTaskQuestion_MetaData.GetAddEditMetaData(),
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                },
                CallBacks: {
                },
                ParentProps: objContext.props
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: blnIsEdit ? "ErrorPopup" : "AddErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
 * @name OpenDeletePopup
 * @param {object} objContext passes Context object
 * @summary Call Confirmation popup for Deleting Category
 * @return null
 */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task/TaskActions/TaskQuestion", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TaskQuestionGrid"] : 0;

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteTaskQustion(arrSelectedRows, strPopupId)
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
    * @name DeleteCategory
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes Category and close popup on success
    */
    DeleteTaskQustion(arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Task_TaskQuestion.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TaskQuestionGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
* @name OnSubjectDropDownChange
* @param {*} objContext objChangeData
* @param {*} objChangeData objChangeData
* @summary   To change the subject Dropdown Data on change of the subject dropdown value
*/
    OnSubjectDropDownChange(objContext, objChangeData) {
        let arrSubSubjectData = [];
        DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"].map((objSubject) => {
            if (objSubject["iParentSubjectId"] === objChangeData["iSubjectId"]) {
                arrSubSubjectData = [...arrSubSubjectData, objSubject];
            }
        });
        objContext.dispatch({
            type: "SET_STATE", payload: {
                "intSubjectDropdownSelectedValue": objChangeData["iSubjectId"],
                "intSubSubjectDropdownSelectedValue": -1,
                "arrSubSubjectData": arrSubSubjectData
            }
        });
    };

    /**
    * @name OnSubSubjectDropDownChange
    * @param {*} objContext
    * @param {*} objChangeData
    * @summary   To change the sub subject Dropdown value on change of the sub subject dropdown 
    */
    OnSubSubjectDropDownChange(objContext, objChangeData) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intSubSubjectDropdownSelectedValue": objChangeData["iSubjectId"] } });
};

/**
  * @name CreateItemEventHandler
  * @param {*} objItem objItem
  * @summary   To filter the dropdown data based on the condition
  * @return {bool} boolean
  */
CreateItemEventHandler(objItem) {
    if (objItem["cIsDeleted"] === "N") {
        return true;
    }
    else {
        return false;
    }
}

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
        ];
    }
}

export default TaskQuestion_ModuleProcessor;