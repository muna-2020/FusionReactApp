//Objects required for module.
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Intranet_Member_ClassManagement_Module from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/ClassManagement_Module';

//Module Objects
import * as ClassManagement_Metadata from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/ClassManagement_Metadata';
import * as ClassManagement_OfficeRibbon from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/ClassManagement_OfficeRibbon';
import * as AddEditClassManagment_MetaData from '@shared/Application/c.Intranet/Modules/5_Member/ClassManagement/AddEditClassManagment/AddEditClassManagment_MetaData';

/**
 * @name ClassManagement_ModuleProcessor
 * @param NA
 * @summary Class for SchoolManagement module display.
 * @return NA
 */
class ClassManagement_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_State_State",
            "Object_Extranet_Teacher_SchoolYear",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/5_Member/ClassManagment",
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
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
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

        // State
        Object_Extranet_State_State.Initialize(objStateParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];

        let objSchoolYearParam = {
            "SortKeys": [
                {
                    "t_TestDrive_Member_Class_SchoolYear_Data.vSchoolYearName": {
                        "order": "asc"
                    }
                }],
            "OutputColumns": ["iSchoolYearId", "t_TestDrive_Member_Class_SchoolYear_Data", "cIsDeleted", "iSchoolYear"]
        }
        //SchoolYear
        Object_Extranet_Teacher_SchoolYear.Initialize(objSchoolYearParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYear]

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/5_Member/ClassManagment"];
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
        let objData =
        {
            RowData: objContext.state.arrClassManagmentData,
            DropDownData: objContext.ClassManagement_ModuleProcessor.GetDependingColumnData(objContext),
            LanguageData: objContext.ClassManagement_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
            RowsPerPage: objContext.state.iRowsPerPage,
            TotalRowCount: objContext.state.iTotalRowCount,
            PageNumber: objContext.state.intPageNumber,
            AdditionalPaddingIds: ["OfflineExecution", "ClassManagementSearch"]
        };
        return objData;
    }

    /**
     * @name GetMetaData
     * @param {object} objContext
     * @summary it returns the object for Grid Meta Data
     * @returns {object}  MetaData object
     */
    GetMetaData() {
        return {
            ...ClassManagement_Metadata.GetMetaData()
        };
    }

    /**
     * @name GetGridResource
     * @param {object} objContext
     * @summary it returns the object for Grid Resources
     * @returns {object}  resource object
     */
    GetGridResource(objContext, objTextResource) {
        return {
            Text: objTextResource,
            SkinPath: objContext.props.JConfiguration.IntranetSkinPath
        };
    }

    /**
     * @name GetGridResource
     * @param {object} objContext
     * @summary it returns the object for Grid Resources
     * @returns {object}  resource object
     */
    GetGridCallBack(objContext) {
        return {
            OnBeforeGridRowRender: (objRow) => objContext.ClassManagement_ModuleProcessor.GetCallBackforGrid(objRow, objContext)
        };
    }

    /**
     * @name GetGridEvent
     * @param {object} objContext
     * @summary it returns the object for Grid Event
     * @returns {object}  resource object
   */
    GetGridEvent(objContext) {
        return {
            PageNumberClick: (iPageNumber) => { objContext.ClassManagement_ModuleProcessor.OnPaginationClick(objContext, iPageNumber) }
        };
    }

    /**
     * @name GetCallBackforGrid
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetCallBackforGrid(objRow, objContext) {
        console.log(objRow);
        let arrClassTeacher = objRow["t_TestDrive_Member_Class_Teacher"]?.filter(objClassTeacher => objClassTeacher["cIsDeleted"] == "N") ?? [];
        if (arrClassTeacher.length > 0) {
            let vSchoolYearName = "";
            objContext.props.Object_Extranet_Teacher_SchoolYear?.["Data"]?.map((objSchoolYearData) => {
                if (objRow["iSchoolYear"] == objSchoolYearData["iSchoolYear"] && objSchoolYearData["cIsDeleted"] == "N") {
                    objSchoolYearData["t_TestDrive_Member_Class_SchoolYear_Data"].map((objSchoolYear) => {
                        if (objContext.props.JConfiguration.InterfaceLanguageId == objSchoolYear["iLanguageId"]) {
                            vSchoolYearName = objSchoolYear["vSchoolYearName"];
                        }
                    })
                }
            })
            return { ...objRow, ...{ "vSchoolYearName": vSchoolYearName } };
        } 
        
        //return { ...objRow, ...{ "vSchoolYearName": vSchoolYearName } };
    }

    /**
     * @name GetGridData
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    OnPaginationClick(objContext, iPageNumber, objDetails) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        var arrFilters = [];
        var arrSearchFilters = this.GetSearchFilters(objDetails ? objDetails.objSearchFilters : objContext.state.objSearchFilters ? objContext.state.objSearchFilters : {});
        arrFilters = [...arrFilters, ...arrSearchFilters];
        arrFilters = [...arrFilters, {
            "match": {
                "cIsDeleted": "N"
            }
        }];
        //let intFrom = objContext.state.iRowsPerPage * (iPageNumber - 1);
        //let intSize = iPageNumber == 1 ? objContext.state.iRowsPerPage : (objContext.state.iTotalRowCount > (intFrom + objContext.state.iRowsPerPage)) ? objContext.state.iRowsPerPage : (objContext.state.iTotalRowCount - intFrom);
        let objSchoolParams = {
            "From": objContext.state.iRowsPerPage * (iPageNumber - 1),
            "Size": objContext.state.iRowsPerPage,
            "SearchQuery": {
                ... {
                    "must": arrFilters
                }
            }
        };
        Object_Intranet_Member_ClassManagement_Module.GetClassManagment(objSchoolParams, (objData) => {
            //ApplicationState.SetProperty("blnShowAnimation", true);
            objContext.dispatch({ type: "SET_STATE", payload: { "intPageNumber": iPageNumber, "arrClassManagmentData": objData["Object_Intranet_Member_ClassManagement_Module"]["Data"], "iTotalRowCount": objData["Object_Intranet_Member_ClassManagement_Module"]["Count"] } });
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ClassManagementGrid": objData["Object_Intranet_Member_ClassManagement_Module"]?.["Data"]?.length > 0 ? [objData["Object_Intranet_Member_ClassManagement_Module"]?.["Data"][0]]:[] });
            ApplicationState.SetProperty("blnShowAnimation", false);
            window.dispatchEvent(new Event('resize'));
            this.ResetGridSelection("ClassManagementGrid");
        });
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation pop-up for Deleting Competency level
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/ClassManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ClassManagementGrid"] : [];
        let intApplicationTypeForClassTypeData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        else {
            blnShowErrorPopup = false
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    DropdownData: {
                        State: DataRef(objContext.props.Object_Extranet_State_State)["Data"],
                        StateDropdownSelectedValue: objContext.state.objSearchFilters?.["iStateId"] ? objContext.state.objSearchFilters["iStateId"] : -1,
                        SchoolDropdownSelectedValue: objContext.state.objSearchFilters?.["uSchoolId"] ? objContext.state.objSearchFilters["uSchoolId"] : -1,
                        TeacherDropdownSelectedValue: objContext.state.objSearchFilters?.["uTeacherId"] ? objContext.state.objSearchFilters["uTeacherId"] : -1,
                        SchoolYear: DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"],
                        SchoolYearDropdownSelectedValue: objContext.state.objSearchFilters?.["iSchoolYearId"] ? objContext.state.objSearchFilters["iSchoolYearId"] : -1,
                    },
                    cIsTestSchool: objContext.state.objSearchFilters?.cIsTestSchool == "Y" ? "Y" : "N",
                    cIsStellwerk: objContext.state.objSearchFilters?.cIsStellwerk=="Y"?"Y":"N",
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForClassTypeData),
                    IsEdit: blnIsEdit,
                },
                Meta: {
                    PopupName: "AddEditClassManagement",
                    HeaderData: AddEditClassManagment_MetaData.GetAddEditClassManagmentMetaData(),
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                events: {
                    OnAddEditcomplete: (objReturn, AddorEdit) => {
                        objContext.ClassManagement_ModuleProcessor.OnAddEditcomplete(objContext, objReturn, AddorEdit)
                    }
                },
                CallBacks: {
                },
                ParentProps: objContext.props
            });
        } else {
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
     * @name OnAddEditcomplete
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    OnAddEditcomplete(objContext, objAddEditData, AddorEdit) {
        if (AddorEdit == "Add") {
            let arrnewData = [...objContext.state.arrClassManagmentData, objAddEditData]
            objContext.dispatch({ type: "SET_STATE", payload: { "arrClassManagmentData": arrnewData, "iTotalRowCount": parseInt(objContext.state.iTotalRowCount) + parseInt(1) } });
            //objContext.ClassManagement_ModuleProcessor.ResetGridSelection("ClassManagementGrid");
        }
        else if (AddorEdit == "Edit") {
            let objSchool = objContext.state.arrClassManagmentData.map((objSchoolAdministratorData) => {
                if (objSchoolAdministratorData["uClassId"] == objAddEditData["uClassId"]) {
                    return objAddEditData;
                }
                else {
                    return objSchoolAdministratorData;
                }
            })
            objContext.dispatch({ type: "SET_STATE", payload: { "arrClassManagmentData": objSchool } });
        }
        else {
            var count = 0;
            objContext.dispatch({ type: "SET_STATE", payload: { "iTotalRowCount": (parseInt(objContext.state.iTotalRowCount) - parseInt(objAddEditData["Object_Extranet_Teacher_Class"]["Data"].length)) } });
            objAddEditData["Object_Extranet_Teacher_Class"]["Data"].map((objDeleteData) => {
                count = 0;
                objContext.state.arrClassManagmentData.map((objSchoolAdministratorData) => {
                    if (objSchoolAdministratorData["uClassId"] == objDeleteData["uClassId"]) {
                        delete objContext.state.arrClassManagmentData[count];
                    }
                    count++;
                })
            });
            objContext.dispatch({ type: "SET_STATE", payload: { "arrClassManagmentData": objContext.state.arrClassManagmentData } });
        }
    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting Competency level
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/ClassManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["ClassManagementGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["vClassName"] + ", ";
            });
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
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
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteClassType(arrSelectedRows, strPopupId, objContext)
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
     * @name DeleteClassType
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Subject and close pop-up on success
     */
    DeleteClassType(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.forEach(objSelectedRow => {
            let arrClassTeacher = [];
            objSelectedRow?.["t_TestDrive_Member_Class_Teacher"]?.forEach(objTemp => {
                arrClassTeacher = [...arrClassTeacher, { ...objTemp, "cIsDeleted": "Y" }];
            });
            arrDeleteRow = [
                ...arrDeleteRow,
                {
                    ...objSelectedRow,
                    "t_TestDrive_Member_Class_Teacher": arrClassTeacher
                }
            ];
        });

        //let arrDeleteRow = [];
        //arrSelectedRows.map(objSelectedRows => {
        //    arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        //});
        let arrParams = [];
        arrParams = [...arrParams,
        {
            "URL": "API/Object/Extranet/Class/Class",
            "Params": { "vDeleteData": arrDeleteRow, "uUserId": objContext.props.ClientUserDetails.UserId },
            "MethodType": "Delete"
        }
        ];

        ArcadixFetchData.Execute(arrParams, function (objReturn, blnDeleted) {
            objContext.ClassManagement_ModuleProcessor.OnAddEditcomplete(objContext, objReturn, "Delete")
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "ClassManagementGrid": null });
                objContext.ClassManagement_ModuleProcessor.ResetGridSelection("ClassManagementGrid");
                Popup.ClosePopup(strPopupId);
            }
        });

    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting CompetencyRange
     * @return null
     */
    GetSearchFilters(objSearchFilters) {

        var arrFilters = [];
        // var arrNestedFilters = [];
        //arrNestedFilters = [...arrNestedFilters, {
        //    match: {
        //        ["t_TestDrive_Member_Class_Teacher.cIsDeleted"]: "N"
        //    }
        //}];
        if (objSearchFilters != undefined) {
            if (objSearchFilters["iStateId"] && objSearchFilters["iStateId"] !== -1) {
                arrFilters = [...arrFilters, {
                    match: {
                        ["iStateId"]: objSearchFilters["iStateId"]
                    }
                }];
            }
            if (objSearchFilters["uSchoolId"] && objSearchFilters["uSchoolId"] !== -1) {
                arrFilters = [...arrFilters, {
                    match: {
                        ["uSchoolId"]: objSearchFilters["uSchoolId"]
                    }
                }];
            }
            if (objSearchFilters["uTeacherId"] && objSearchFilters["uTeacherId"] !== -1) {
                arrFilters = [...arrFilters, {
                    match: {
                        ["uTeacherId"]: objSearchFilters["uTeacherId"]
                    }
                }];
            }
            if (objSearchFilters["vClassName"]) {
                arrFilters = [...arrFilters, {
                    wildcard: {
                        vClassName: "*" + objSearchFilters["vClassName"].toLowerCase() + "*"
                    }
                }];
            }
            if (objSearchFilters["iSchoolYear"] && objSearchFilters["iSchoolYear"] !== -1) {
                arrFilters = [...arrFilters, {
                    match: {
                        iSchoolYear: objSearchFilters["iSchoolYear"]
                    }
                }];
            }
            if (objSearchFilters["cIsTestSchool"]) {
                arrFilters = [...arrFilters, {
                    match: {
                        cIsTestSchool: objSearchFilters["cIsTestSchool"]
                    }
                }];
            }
            if (objSearchFilters["cIsStellwerk"]) {
                arrFilters = [...arrFilters, {
                    match: {
                        cIsStellwerk: objSearchFilters["cIsStellwerk"]
                    }
                }];
            }
            
        }

        //if (arrNestedFilters.length > 0) {
        //    arrFilters = [...arrFilters, {
        //        "nested": {
        //            "path": "t_TestDrive_Member_Class_Teacher",
        //            "query": {
        //                "bool": {
        //                    "must": arrNestedFilters
        //                }
        //            }
        //        }
        //    }];
        //}
        return arrFilters;
    }


    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting CompetencyRange
     * @return null
     */
    OnSearchButtonClick(objContext, objDetails) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intPageNumber": 1, "objSearchFilters": objDetails.objSearchFilters } });
        this.OnPaginationClick(objContext, 1, objDetails);
        //var arrFilters = [];
        //if (objDetails.objSearchFilters) {
        //    var arrSearchFilters = this.GetSearchFilters(objDetails.objSearchFilters);
        //    arrFilters = [...arrFilters, ...arrSearchFilters];
        //}
        //arrFilters = [...arrFilters, {
        //    "match": {
        //        "cIsDeleted": "N"
        //    }
        //}];
        //let objSchoolParams = {
        //    "Size": 10,
        //    "From": 0,
        //    "SearchQuery": {
        //        ... {
        //            "must": arrFilters
        //        }
        //    }
        //};
        //ApplicationState.GetProperty("blnShowAnimation", true);
        //Object_Intranet_Member_ClassManagement_Module.GetClassManagment(objSchoolParams, (objData) => {
        //    ApplicationState.SetProperty("blnShowAnimation", true);
        //    objContext.dispatch({ type: "SET_STATE", payload: { "iTotalRowCount": objData["Object_Intranet_Member_ClassManagement_Module"]["Count"], "arrClassManagmentData": objData["Object_Intranet_Member_ClassManagement_Module"]["Data"], "intPageNumber": 1, "objSearchFilters": objDetails.objSearchFilters } });
        //    ApplicationState.SetProperty("blnShowAnimation", false);
        //    window.dispatchEvent(new Event('resize'));
        //});
    }


    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting CompetencyRange
     * @return null
     */
    OpenSendLoginProgressBarPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/ClassManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ClassManagementGrid"] : 0;
        if (arrSelectedRows && arrSelectedRows.length > 0) {
            let arrMainClientUserIds = arrSelectedRows.map(t => t.uStateAdministratorId)
            Popup.ShowProgressBarPopup({
                "Data": {
                    "ProgressText": Localization.TextFormatter(objTextResource, 'PopupText')
                },
                "Meta": {
                    "ShowProgressStatus": "Y",
                    "HasCloseButton": "Y",
                    "StartProgressOnLoad": false,
                    "CloseProgessBarOnComplete": true
                },
                "Resource": {
                    "Text": {
                        "ProgressBarPopup_TitleText": Localization.TextFormatter(objTextResource, 'Process'),
                        "ProgressBarPopup_Total": Localization.TextFormatter(objTextResource, 'Total'),
                        "ProgressBarPopup_Posted": Localization.TextFormatter(objTextResource, 'Posted'),
                        "ProgressBarPopup_Failed": Localization.TextFormatter(objTextResource, 'Failed'),
                        "ProgressBarPopup_CancelButtonText": Localization.TextFormatter(objTextResource, 'AbortStop'),
                        "ProgressBarPopup_CloseButtonText": Localization.TextFormatter(objTextResource, 'ShutDown'),
                        "ProgressBarPopup_StartButtonText": Localization.TextFormatter(objTextResource, 'Begin'),
                    },
                    "TextResourcesKey": Localization.TextFormatter(objTextResource, 'ProgressBarPopup'),

                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                "Events": {
                    "StartProgress": (strProgressBarId) => {
                        this.sendLogin(objContext, strProgressBarId, arrMainClientUserIds);
                    },
                },
                CallBacks: {
                    PopupCallBack: () => ({})
                }
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
     * @name sendLogin
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting CompetencyRange
     * @return null
     */
    sendLogin(objContext, strProgressBarID, arrSelectedRows) {
        let objSendMailParams =
        {
            ["ClassAdmins"]: arrSelectedRows,
            ["ProgressBarId"]: strProgressBarID,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        Object_Intranet_Member_ClassManagement_Module.SendLogins(objSendMailParams);
    }

    /**
     * * @name GetDependingColumnData
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext) {

        let objSchoolYearData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "iSchoolYear",
            "DisplayColumn": "vSchoolYearName",
            "DependingTableName": "t_TestDrive_Member_Class_SchoolYear_Data",
            "Data": []
        };

        objContext.props.Object_Extranet_Teacher_SchoolYear?.["Data"]?.map((objSchoolYear) => {
            objSchoolYearData["Data"] = [...objSchoolYearData["Data"], objSchoolYear];
        });

        return { "iSchoolYear": objSchoolYearData };
    };

    /**
     * @name ValidateFocus
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary hits the add/edit API after validation succeeds
     */
    ValidateFocus(objContext, strColumnName) {
        FieldValidator.ValidateFocus("ValidationError", objContext.state.objValidationMessages, strColumnName);
    }

    /**
     * @name OpenExtranetSchool
     * @param {any} objContext
     */
    OpenExtranetSchool(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ClassManagementGrid"] : 0;
        let vHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication?AutoLogin=' + arrSelectedRows[0]["t_TestDrive_Member_Class_Teacher"][0]["uSchoolId"] + '&vTargetType=FusionSchool' + '&ApplicationOpenerId=' + objContext.props.ClientUserDetails.UserId;//+ '&SessionKey=' + objContext.props.JConfiguration.SessionKey;
        window.open(vHostUrl, '_blank');
    }

    /**
     * @name OpenExtranetTeacher
     * @param {any} objContext
     */
    OpenExtranetTeacher(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["ClassManagementGrid"] : 0;
        let vHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication?AutoLogin=' + arrSelectedRows[0]["t_TestDrive_Member_Class_Teacher"][0]["uTeacherId"] + '&vTargetType=FusionTeacher' + '&ApplicationOpenerId=' + objContext.props.ClientUserDetails.UserId;//+ '&SessionKey=' + objContext.props.JConfiguration.SessionKey;
        window.open(vHostUrl, '_blank');
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.ClassManagement_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.ClassManagement_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.ClassManagement_ModuleProcessor.OpenDeletePopup(objContext),
            "OpenSendLoginProgressBarPopup": () => objContext.ClassManagement_ModuleProcessor.OpenSendLoginProgressBarPopup(objContext),
            "OpenExtranetSchool": () => objContext.ClassManagement_ModuleProcessor.OpenExtranetSchool(objContext),
            "OpenExtranetTeacher": () => objContext.ClassManagement_ModuleProcessor.OpenExtranetTeacher(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", ClassManagement_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css"
        ];
    }

}

export default ClassManagement_ModuleProcessor;