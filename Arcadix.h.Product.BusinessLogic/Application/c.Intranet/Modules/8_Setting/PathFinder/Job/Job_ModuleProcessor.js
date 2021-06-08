
//Objects required for module.
import Object_Intranet_Setting_PathFinder_Job from '@shared/Object/c.Intranet/8_Setting/PathFinder/Job/Job';
import Object_Intranet_Setting_PathFinder_JobField from '@shared/Object/c.Intranet/8_Setting/PathFinder/JobField/JobField';
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module related imports.
import * as AddEditJob_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/Job/AddEditJob/AddEditJob_MetaData';
import * as Job_OfficeRibbon from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/Job/Job_OfficeRibbon';
import * as Job_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/PathFinder/Job/Job_MetaData';

/**
* @name Job_ModuleProcessor
* @param NA
* @summary Class for Job module display.
* @return NA
*/
class Job_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Setting_PathFinder_JobField",
            //"Object_Intranet_Setting_PathFinder_Job",
            "Object_Extranet_State_State",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/8_Setting/PathFinder/Job",
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
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
        //this.OnPaginationClick(objContext, 1, { "iStateId":0});
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request Params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {
        let arrDataRequest = [];

        let objStateParam = {
            "SortKeys": [
                {
                    "t_TestDrive_Member_State_Data.vStateName": {
                        "order": "asc"
                    }
                }],
            "OutputColumns": ["iStateId", "cIsDeleted", "t_TestDrive_Member_State_Data"]
        }

        //State
        Object_Extranet_State_State.Initialize(objStateParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];

        //PathFinder
        Object_Intranet_Setting_PathFinder_JobField.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_PathFinder_JobField];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/8_Setting/PathFinder/Job"];
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
        let intApplicationTypeForJobData = 2;
        let objData = {
            RowData: objContext.state.arrJobData ?? [],
            LanguageData: objContext.Job_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForJobData),
            RowsPerPage: 10,
            TotalRowCount: objContext.state.iTotalRowCount,
            PageNumber: objContext.state.iPageNumber
        };
        return objData;
    }

    /**
     * @name GetMetaData
     * @param {object} objContext
     * @summary it returns the object for Grid Meta Data
     * @returns {object}  MetaData object
     */
    GetMetaData(objContext) {
        return {
            ...Job_MetaData.GetMetaData()
        };
    }

    /**
     * @name GetGridCallBacks
     * @param {object} objContext
     * @summary Returns object that contains all the CallBack methods.
     * @return {object} Object with callback methods
     */
    GetGridCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => objContext.Job_ModuleProcessor.OnBeforeGridRowRender(objRow, objContext)
        };
        return objCallBacks;
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetResourceData(objContext) {
        let Text = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/Job", objContext.props) ?? {};
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
    * @name GetGridEvents
    * @param {object} objContext
    * @summary Returns object that contains all the Events methods.
    * @return {object}
    */
    GetGridEvents(objContext) {
        let objCallBacks = {
            PageNumberClick: (iPageNumber) => { objContext.Job_ModuleProcessor.OnPaginationClick(objContext, iPageNumber, {}) }
        };
        return objCallBacks;
    };

    /**
     * @name OnStateDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the State Drop down Data on change of the State drop down value
     */
    OnStateDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "iStateId": objChangeData["iStateId"] } });
        objContext.Job_ModuleProcessor.OnPaginationClick(objContext, 1, { "iStateId": objChangeData["iStateId"] });
    }

    /**
     * @name OnJobTypeDropDownChange
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To change the State Drop down Data on change of the JobType drop down value
     */
    OnJobTypeDropDownChange(objContext, objChangeData) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobGrid": null });
        objContext.dispatch({ type: "SET_STATE", payload: { "iJobTypeId": objChangeData["iJobTypeId"] } });
        objContext.Job_ModuleProcessor.OnPaginationClick(objContext, 1, { "iJobTypeId": objChangeData["iJobTypeId"] });
    }

    /**
     * @name OnBeforeGridRowRender
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    OnBeforeGridRowRender(objRow, objContext) {
        let vJobFieldName = "";
        if (objRow["t_PathFinder_Job_JobField"]?.length > 0) {
            objRow["t_PathFinder_Job_JobField"]?.map((objJobJobField) => {
                if (objJobJobField["uJobFieldId"] == "00000000-0000-0000-0000-000000000000") {
                    vJobFieldName = vJobFieldName + "All,";
                }
                else {
                    let objJobField = DataRef(objContext.props.Object_Intranet_Setting_PathFinder_JobField)["Data"]?.filter(objJobField => objJobField["uJobFieldId"] === objJobJobField["uJobFieldId"]);
                    if (objJobField.length > 0) {
                        objJobField[0]["t_PathFinder_JobField_Data"].map((objJobFieldData) => {
                            if (objContext.props.JConfiguration.InterfaceLanguageId == objJobFieldData["iLanguageId"]) {
                                vJobFieldName = vJobFieldName + objJobFieldData["vJobFieldName"] + ",";
                            }
                        })
                    }
                }

            })
        }
        vJobFieldName = vJobFieldName.substring(0, vJobFieldName.length - 1);
        return { ...objRow, "vJobFieldName": vJobFieldName };
    }

    /**
     * @name OnPaginationClick
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    OnPaginationClick(objContext, iPageNumber, objFilter) {
        var arrFilters = [];
        arrFilters = [...arrFilters, {
            "match": {
                "cIsDeleted": "N"
            }
        }
        ];
        let arrFilter = [];
        if (objFilter["iStateId"]) {
            arrFilter = objFilter["iStateId"] != -1 ? [{
                "match": {
                    "iStateId": objFilter["iStateId"]
                }
            }, objContext.state.iJobTypeId != -1 ? {
                "match": {
                    "cIsAnchorJob": objContext.state.iJobTypeId == 1 ? "Y" : "N"
                }
            } : null] : [
                    objContext.state.iJobTypeId != -1 ? {
                        "match": {
                            "cIsAnchorJob": objContext.state.iJobTypeId == 1 ? "Y" : "N"
                        }
                    } : null]
        }

        if (objFilter["iJobTypeId"]) {
            arrFilter = objFilter["iJobTypeId"] != -1 ? [{
                "match": {
                    "cIsAnchorJob": objFilter["iJobTypeId"] == 1 ? "Y" : "N"
                }
            }, objContext.state.iStateId != -1 ? {
                "match": {
                    "iStateId": objContext.state.iStateId
                }
            } : null] : [
                    objContext.state.iStateId != -1 ? {
                        "match": {
                            "iStateId": objContext.state.iStateId
                        }
                    } : null]
        }

        //if (!objFilter["iJobTypeId"] && !objFilter["iStateId"]) {
        //    arrFilter = [{
        //        "match": {
        //            "iStateId": objContext.state.iStateId
        //        }
        //    }, {
        //        "match": {
        //            "cIsAnchorJob": objContext.state.iJobTypeId == 1 ? "Y" : "N"
        //        }
        //    }]

        //}
        arrFilter.map((objFilter) => {
            if (objFilter != null) {
                arrFilters = [...arrFilters, objFilter];
            }
        })

        let objJobParams = {
            "From": objContext.state.iRowsPerPage * (iPageNumber - 1),
            "Size": objContext.state.iRowsPerPage,
            "SearchQuery": {
                ... {
                    "must": arrFilters
                }
            },
            "SortKeys": [
                {
                    "t_PathFinder_Jobs_Data.vJobName": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Intranet_Setting_PathFinder_Job.GetData(objJobParams, (objReturn) => {
            var iRowCount = objReturn[Object.keys(objReturn)]["Count"];
            let arrJobData = objReturn[Object.keys(objReturn)]["Data"]
            objContext.dispatch({ type: "SET_STATE", payload: { "arrJobData": arrJobData, "iTotalRowCount": iRowCount, "intPageNumber": iPageNumber } });
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobGrid": arrJobData[0] ? [arrJobData[0]] : [] });
            ApplicationState.SetProperty("blnShowAnimation", false);
            window.dispatchEvent(new Event('resize'));
        }, true);
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Tabbed pop-up for Job
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/Job", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["JobGrid"] : [];
        let intApplicationTypeForJobData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = !arrSelectedRows || arrSelectedRows.length <= 0;
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    MultiLanguageData: this.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForJobData),
                    IsEdit: blnIsEdit,
                    iStateId: objContext.state.iStateId,
                    MultiselectDropdownData: {
                        JobField: objContext.props.Object_Intranet_Setting_PathFinder_JobField["Data"],
                    }
                },
                Meta: {
                    PopupName: "AddEditJob",
                    HeaderData: AddEditJob_MetaData.GetAddEditMetaData(),
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    OnAddEditcomplete: (objReturn, AddorEdit) => {
                        objContext.Job_ModuleProcessor.OnAddEditcomplete(objContext, objReturn, AddorEdit)
                    }
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
                    TextResourcesKey: blnIsEdit ? "EditErrorPopup" : "AddErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name OnAddEditcomplete
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    OnAddEditcomplete(objContext, objAddEditData, AddorEdit) {
        if (AddorEdit == "Add") {
            let arrnewData = [...objContext.state.arrJobData, objAddEditData]
            objContext.dispatch({ type: "SET_STATE", payload: { "arrJobData": arrnewData, "iTotalRowCount": objContext.state.iTotalRowCount + 1 } });
        }
        else if (AddorEdit == "Edit") {
            let objSchool = objContext.state.arrJobData.map((objJobData) => {
                if (objJobData["uJobId"] == objAddEditData["uJobId"]) {
                    return objAddEditData;
                }
                else {
                    return objJobData;
                }
            })
            objContext.dispatch({ type: "SET_STATE", payload: { "arrJobData": objSchool } });
        }
        else {
            var count = 0;
            objAddEditData.map((objDeleteData) => {
                count = 0;
                objContext.state.arrJobData.map((objJobData) => {
                    if (objJobData["uJobId"] == objDeleteData["uJobId"]) {
                        delete objContext.state.arrJobData[count];
                    }
                    count++;
                })
            });
            objContext.dispatch({ type: "SET_STATE", payload: { "arrJobData": objContext.state.arrJobData } });
        }
    }

    /**
    * @name OpenDeletePopup
    * @param {object} objContext passes Context object
    * @summary Call Confirmation pop-up for Deleting subject
    * @return null
    */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/Job", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["JobGrid"] : [];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "DeleteConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteJob(arrSelectedRows, strPopupId, objContext)
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
                    TextResourcesKey: "DeleteErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
    * @name DeleteJob
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes Job and close pop-up on success
    */
    DeleteJob(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Setting_PathFinder_Job.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            objContext.Job_ModuleProcessor.OnAddEditcomplete(objContext, objReturn, "Delete")
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "JobGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        }, true);
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.Job_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.Job_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.Job_ModuleProcessor.OpenDeletePopup(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", Job_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/MultiSelectDropdown/MultiSelectDropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css"
        ];
    }
}

export default Job_ModuleProcessor;