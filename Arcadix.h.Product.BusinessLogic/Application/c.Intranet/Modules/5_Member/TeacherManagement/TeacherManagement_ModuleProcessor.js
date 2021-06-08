//Objects required for module.
import Object_Intranet_Member_TeacherManagement_Module from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/TeacherManagement_Module';
//import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Extranet_School_Title from '@shared/Object/d.Extranet/2_School/Title/Title'
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as TeacherManagement_MetaData from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/TeacherManagement_MetaData';
import * as AddEditTeacherManagement_MetaData from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/AddEditTeacherManagement/AddEditTeacherManagement_MetaData';
import * as TeacherManagement_OfficeRibbon from '@shared/Application/c.Intranet/Modules/5_Member/TeacherManagement/TeacherManagement_OfficeRibbon';

/**
 * @name TeacherManagement_ModuleProcessor
 * @param NA
 * @summary Class for TeacherManagement module display.
 * @return NA
 */
class TeacherManagement_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_School_School",
            "Object_Extranet_State_State",
            "Object_Extranet_School_Title",
            "Object_Extranet_Teacher_Teacher",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/5_Member/TeacherManagment",
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

        let objSchoolTitleParam = {
            "SortKeys": [
                {
                    "iTitleId": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": ["iTitleId", "cIsDeleted", "t_TestDrive_Member_Title_Data"]
        }
        //School Title
        Object_Extranet_School_Title.Initialize(objSchoolTitleParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_Title]

        let objSchoolParam = {
            "SortKeys": [
                {
                    "vSchoolName": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": ["uSchoolId", "vSchoolName", "iStateId", "cIsTestSchool", "cIsDeleted","cIsStellwerk"]
        }
        //School
        Object_Extranet_School_School.Initialize(objSchoolParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_School]

        let objStateParam = {
            "SortKeys": [
                {
                    "t_TestDrive_Member_State_Data.vStateName": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": ["iStateId", "cIsDeleted", "t_TestDrive_Member_State_Data"]
        }
        // State
        Object_Extranet_State_State.Initialize(objStateParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/5_Member/TeacherManagment"];
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
            RowData: objContext.state.arrTeacherManagmentData,
            DropDownData: objContext.TeacherManagement_ModuleProcessor.GetDependingColumnData(objContext),
            LanguageData: objContext.TeacherManagement_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
            RowsPerPage: objContext.state.iRowsPerPage,
            TotalRowCount: objContext.state.iTotalRowCount,
            PageNumber: objContext.state.intPageNumber,
            AdditionalPaddingIds: ["OfflineExecution", "TeacherManagementSearch"]
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
            ...TeacherManagement_MetaData.GetMetaData()
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
            OnBeforeGridRowRender: (objRow) => objContext.TeacherManagement_ModuleProcessor.GetCallBackforGrid(objRow, objContext)
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
            PageNumberClick: (iPageNumber) => { objContext.TeacherManagement_ModuleProcessor.OnPaginationClick(objContext, iPageNumber) }
        };
    }

    /**
     * @name GetCallBackforGrid
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetCallBackforGrid(objRow, objContext) {
        let arrTeacherSchool = objRow["t_TestDrive_Member_Teacher_School"]?.filter(objTeacherSchool => objTeacherSchool["cIsDeleted"] == "N") ?? [];
        if (arrTeacherSchool.length > 0) {
            return objRow;
        }       
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation pop-up for Deleting Competency level
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/TeacherManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TeacherManagementGrid"] : [];
        let intApplicationTypeForClassTypeData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        else {
            blnShowErrorPopup = objContext.state.strStateId == -1
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    DropdownData: {
                        State: DataRef(objContext.props.Object_Extranet_State_State)["Data"],
                        School: DataRef(objContext.props.Object_Extranet_School_School)["Data"],
                        StateDropdownSelectedValue: objContext.state.strStateId,
                        Title: DataRef(objContext.props.Object_Extranet_School_Title)["Data"]
                    },
                    Object_Intranet_Member_TeacherManagement_Module: objContext.props.Object_Intranet_Member_TeacherManagement_Module,
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForClassTypeData),
                    IsEdit: blnIsEdit,
                },
                Meta: {
                    PopupName: "AddEditTeacherManagement",
                    HeaderData: AddEditTeacherManagement_MetaData.GetMetaData(),
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
                        objContext.TeacherManagement_ModuleProcessor.OnAddEditcomplete(objContext, objReturn, AddorEdit)
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
            let arrnewData = [objAddEditData, ...objContext.state.arrTeacherManagmentData]
            objContext.dispatch({ type: "SET_STATE", payload: { "arrTeacherManagmentData": arrnewData, "iTotalRowCount": parseInt(objContext.state.iTotalRowCount) + 1 } });
        }
        else if (AddorEdit == "Edit") {
            let objSchool = objContext.state.arrTeacherManagmentData.map((objSchoolAdministratorData) => {
                if (objSchoolAdministratorData["uTeacherId"] == objAddEditData["uTeacherId"]) {
                    return objAddEditData;
                }
                else {
                    return objSchoolAdministratorData;
                }
            })
            objContext.dispatch({ type: "SET_STATE", payload: { "arrTeacherManagmentData": objSchool } });
        }
        else {
            let arrNewTeacherManagmentData = objContext.state.arrTeacherManagmentData;
            objContext.dispatch({ type: "SET_STATE", payload: { "iTotalRowCount": (objContext.state.iTotalRowCount - objAddEditData.length) } });
            objAddEditData.map((objDeleteData) => {
                arrNewTeacherManagmentData = [...arrNewTeacherManagmentData.filter(objTemp => objTemp["uTeacherId"] != objDeleteData["uTeacherId"])];
            });
            objContext.dispatch({ type: "SET_STATE", payload: { "arrTeacherManagmentData": arrNewTeacherManagmentData } });
        }
    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting Competency level
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/TeacherManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["TeacherManagementGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            //let blnMultipleTeacherSchool = false;
            arrSelectedRows = arrSelectedRows.map(objSelectedRows => {
                //strDeleteVariables = strDeleteVariables + objSelectedRows["iDisplayOrder"] + ", ";
                let arrStateSchools = objSelectedRows["State-School"].split(",");
                let arrt_TestDrive_Member_Teacher_School = objSelectedRows["t_TestDrive_Member_Teacher_School"].filter(objTemp => objTemp["cIsDeleted"] == "N").map((objTemp, intIndex) => ({ ...objTemp, "StateSchool": arrStateSchools[intIndex] }));
                return {
                    ...objSelectedRows,
                    t_TestDrive_Member_Teacher_School: arrt_TestDrive_Member_Teacher_School
                }
                //blnMultipleTeacherSchool = objSelectedRows["t_TestDrive_Member_Teacher_School"].filter(objTemp => objTemp["cIsDeleted"] == "N").length > 1 ? true : false;
            });
            //let objVaribales = {
            //    Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            //};
            //if (!blnMultipleTeacherSchool) {
            //    Popup.ShowConfirmationPopup({
            //        Data: {},
            //        Meta: {
            //            "ShowHeader": true,
            //            "ShowCloseIcon": true,
            //        },
            //        Resource: {
            //            Text: objTextResource,
            //            TextResourcesKey: "ConfirmationPopup",
            //            SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
            //            Variables: objVaribales
            //        },
            //        Events: {
            //            ConfirmEvent: (strPopupId) => this.DeleteTeacherManagment(arrSelectedRows, strPopupId, objContext, blnMultipleTeacherSchool)
            //        },
            //        CallBacks: {}
            //    });
            //}
            //else {
                //let arrStateSchools = arrSelectedRows[0]["State-School"].split(",");
                //let arrTeacherSchools = arrSelectedRows[0]["t_TestDrive_Member_Teacher_School"].filter(objTemp => objTemp["cIsDeleted"] == "N").map((objTemp, intIndex) => ({ ...objTemp, "StateSchool": arrStateSchools[intIndex] }));
                Popup.ShowPopup({
                    Data: {
                        SelectedTeacher: arrSelectedRows
                    },
                    Meta: {
                        PopupName: 'SelectTeacherSchool',
                        ShowHeader: true,
                        ShowCloseIcon: true,
                        Height: "auto",
                        Width: "400px",
                        InputType: "CheckBox"
                    },
                    Resource: {
                        Text: { "OkButtonText": "Ok", "CancleButtonText": "Cancel", "MessageText": "Please Select the Teacher School to Delete" },
                        SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                    },
                    Events: {
                        GetSelectedTeacherSchools: (arrSelectedSchools, strPopupId) => this.DeleteTeacherManagment(arrSelectedRows, strPopupId, objContext, arrSelectedSchools)
                    },
                    CallBacks: {
                    },
                    ParentProps: { ...objContext.props }
                });
            //}
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
     * @name DeleteTeacherManagment
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Subject and close pop-up on success
     */
    DeleteTeacherManagment(arrSelectedRows, strPopupId, objContext, arrSelectedSchools = []) {
        //if (!blnMultipleTeacherSchool) {
        //    let arrDeleteData = [];
        //    arrSelectedRows.map(objSelectedRow => {
        //        let arrt_TestDrive_Member_Teacher_School = objSelectedRow.["t_TestDrive_Member_Teacher_School"]?.map(objTemp => ({ ...objTemp, "cIsDeleted": "Y" }));
        //        arrDeleteData = [
        //            ...arrDeleteData,
        //            {
        //                ...objSelectedRow,
        //                "t_TestDrive_Member_Teacher_School": arrt_TestDrive_Member_Teacher_School
        //            }
        //        ];
        //    });
        //    //Calling EditData method, as we need to set cIsDeleted in t_TestDrive_Member_Teacher_School SubTable
        //    Object_Intranet_Member_TeacherManagement_Module.EditTeacherManagmentData({ "Params": { "vEditData": arrDeleteData, "uUserId": objContext.props.ClientUserDetails.UserId } }, (objReturn) => {
        //        objContext.TeacherManagement_ModuleProcessor.OnAddEditcomplete(objContext, arrDeleteData, "Delete")
        //        this.SelectAdjacentGridRow("TeacherManagementGrid", arrSelectedRows);
        //        Popup.ClosePopup(strPopupId);
        //    }, true);
        //}
        //else {
        if (arrSelectedSchools.length > 0) {
            let arrDeleteData = [];
            arrSelectedRows.forEach(objSelectedRow => {
                let arrt_TestDrive_Member_Teacher_School = [];
                objSelectedRow.["t_TestDrive_Member_Teacher_School"]?.forEach(objTemp => {
                    arrSelectedSchools.forEach(objSelectedSchool => {
                        if (objTemp["uSchoolId"] == objSelectedSchool["uSchoolId"])
                            arrt_TestDrive_Member_Teacher_School = [...arrt_TestDrive_Member_Teacher_School, { ...objTemp, "cIsDeleted": "Y" }]
                    });
                });
                arrDeleteData = [
                    ...arrDeleteData,
                    {
                        ...objSelectedRow,
                        "t_TestDrive_Member_Teacher_School": arrt_TestDrive_Member_Teacher_School
                    }
                ];
            });
            Object_Intranet_Member_TeacherManagement_Module.EditTeacherManagmentData({ "Params": { "vEditData": arrDeleteData, "uUserId": objContext.props.ClientUserDetails.UserId } }, (objReturn) => {
                objContext.TeacherManagement_ModuleProcessor.OnAddEditcomplete(objContext, objReturn["Object_Intranet_Member_TeacherManagement_Module"][0], "Edit")
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TeacherManagementGrid": [objReturn["Object_Intranet_Member_TeacherManagement_Module"][0]] });
                Popup.ClosePopup(strPopupId);
            }, true);
        }
        //}
    }

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
     * @name OnSearchButtonClick
     * @param {object} objContext takes objContext
     * @param {strColumnName} strColumnName strColumnName
     * @summary hits the get API and return data
     */
    OnSearchButtonClick(objContext, objDetails) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intPageNumber": 1, "objSearchFilters": objDetails.objSearchFilters } });
        this.OnPaginationClick(objContext, 1, objDetails);
    }

    /**
     * @name OnPaginationClick
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    OnPaginationClick(objContext, intPageNumber, objDetails) {
        var arrFilters = [];
        var arrSearchFilters = this.GetSearchFilters(objDetails ? objDetails.objSearchFilters : objContext.state.objSearchFilters);
        arrFilters = [...arrFilters, ...arrSearchFilters,
            //{
            //"match": {
            //    "cIsDeleted": "N"
            //  }
            // }
        ];
        let intFrom = objContext.state.iRowsPerPage * (intPageNumber - 1);
        let intSize = intPageNumber == 1 ? objContext.state.iRowsPerPage : (objContext.state.iTotalRowCount > (intFrom + objContext.state.iRowsPerPage)) ? objContext.state.iRowsPerPage : (objContext.state.iTotalRowCount - intFrom);
        let objTeacherParams = {
            "From": intFrom,//objContext.state.iRowsPerPage * (intPageNumber - 1),
            "Size": intSize,//objContext.state.iRowsPerPage,
            "SearchQuery": {
                ... {
                    "must": arrFilters
                }
            },
            "SortKeys": [
                {
                    "vFirstName": {
                        "order": "asc"
                    }
                }
            ]
        };

        Object_Intranet_Member_TeacherManagement_Module.GetTeacherManagmentData(objTeacherParams, (objReturn) => {
            let arrTeacherData = objReturn["Object_Intranet_Member_TeacherManagement_Module"]["Data"] ? objReturn["Object_Intranet_Member_TeacherManagement_Module"]["Data"] : [];
            let intCount = objReturn["Object_Intranet_Member_TeacherManagement_Module"]["Count"];
            objContext.dispatch({ type: "SET_STATE", payload: { "arrTeacherManagmentData": arrTeacherData, "intPageNumber": intPageNumber, "iTotalRowCount": intCount } });
            //let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            //ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TeacherManagementGrid": arrTeacherData[0] ? [arrTeacherData[0]] : [] });
            this.ResetGridSelection("TeacherManagementGrid");
            window.dispatchEvent(new Event('resize'));
        });
    }

    /**
     * @name GetSearchFilters
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting CompetencyRange
     * @return null
     */
    GetSearchFilters(objSearchFilters) {

        var arrFilters = [];
        var arrNestedFilters = [];
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

        if (objSearchFilters["vName"] && objSearchFilters["vName"] != "") {
            arrFilters = [...arrFilters, {
                wildcard: {
                    vName: "*" + objSearchFilters["vName"].toLowerCase() + "*"
                }
            }];
        }

        if (objSearchFilters["vFirstName"] && objSearchFilters["vFirstName"] != "") {
            arrFilters = [...arrFilters, {
                wildcard: {
                    vFirstName: "*" + objSearchFilters["vFirstName"].toLowerCase() + "*"
                }
            }];
        }

        if (objSearchFilters["vEmail"] && objSearchFilters["vEmail"] != "") {
            arrFilters = [...arrFilters, {
                wildcard: {
                    vEmail: "*" + objSearchFilters["vEmail"].toLowerCase() + "*"
                }
            }];
        }
        if (objSearchFilters["cIsTestSchool"]) {
            arrFilters = [...arrFilters, {
                match: {
                    "cIsTestSchool": objSearchFilters["cIsTestSchool"]
                }
            }];
        }
        if (objSearchFilters["cIsStellwerk"]) {
            arrFilters = [...arrFilters, {
                match: {
                    "cIsStellwerk": objSearchFilters["cIsStellwerk"]
                }
            }];
        }
        return arrFilters;
    }

    /**
     * @name OpenSendLoginProgressBarPopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting CompetencyRange
     * @return null
     */
    OpenSendLoginProgressBarPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/TeacherManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TeacherManagementGrid"] : 0;
        if (arrSelectedRows && arrSelectedRows.length > 0) {
            let arrMainClientUserIds = arrSelectedRows.map(t => t.uTeacherId)
            Popup.ShowProgressBarPopup({
                "Data": {
                    "ProgressText": Localization.TextFormatter(objTextResource, 'PopupText')
                },
                "Meta": {
                    "ShowProgressStatus": "Y",
                    "HasCloseButton": "Y",
                    "StartProgressOnLoad": false,
                    "CloseProgessBarOnComplete": true,
                    "ClassName":"send-login"
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
            ["TeacherAdmins"]: arrSelectedRows,
            ["ProgressBarId"]: strProgressBarID,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        Object_Intranet_Member_TeacherManagement_Module.SendLogins(objSendMailParams, () => {});
    }

    /**
     * @name GetDependingColumnData
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext) {

        let objStateDropDownData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "iStateId",
            "DisplayColumn": "vStateName",
            "DependingTableName": "t_TestDrive_Member_State_Data",
            "Data": []
        };

        let objTitleData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "iTitleId",
            "DisplayColumn": "vTitleName",
            "DependingTableName": "t_TestDrive_Member_Title_Data",
            "Data": []
        };

        objContext.props.Object_Extranet_School_Title?.["Data"]?.map((objTitle) => {
            objTitleData["Data"] = [...objTitleData["Data"], objTitle];
        });

        objContext.props.Object_Extranet_State_State?.["Data"]?.map((objState) => {
            objStateDropDownData["Data"] = [...objStateDropDownData["Data"], objState];
        });

        return { "iStateId": objStateDropDownData, "iTitleId": objTitleData };
    };

    /**
     * @name OpenExtranetSchool
     * @param {any} objContext
     */
    OpenExtranetSchool(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TeacherManagementGrid"] : [];
        //let blnMultipleTeacherSchool = false;
        if (arrSelectedRows && arrSelectedRows.length > 0) {
            //Only considering First selected row to open Extranet School (Multiple Row selection will be ignored)
            let objSelectedRow = arrSelectedRows[0];
            let arrStateSchools = objSelectedRow["State-School"].split(",");
            let arrTeacherSchools = objSelectedRow["t_TestDrive_Member_Teacher_School"].filter(objTemp => objTemp["cIsDeleted"] == "N").map((objTemp, intIndex) => ({ ...objTemp, "StateSchool": arrStateSchools[intIndex] }));
            objSelectedRow = {
                ...objSelectedRow,
                ["t_TestDrive_Member_Teacher_School"]: arrTeacherSchools
            };
            //if (!blnMultipleTeacherSchool) {
            //    let strHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication?AutoLogin=' + arrSelectedRows[0]["uSchoolId"] + '&vTargetType=FusionSchool' + '&ApplicationOpenerId=' + objContext.props.ClientUserDetails.UserId + '&sessionkey=' + objContext.props.JConfiguration.SessionKey;
            //    window.open(strHostUrl, '_blank');
            //}
            //else {

            Popup.ShowPopup({
                Data: {
                    SelectedTeacher: [objSelectedRow]
                },
                Meta: {
                    PopupName: 'SelectTeacherSchool',
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    Height: "auto",
                    Width: "400px",
                    InputType: "Radio"
                },
                Resource: {
                    Text: { "OkButtonText": "Ok", "CancleButtonText": "Cancel", "MessageText": "Please Select the Teacher School to Open" },
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    GetSelectedTeacherSchools: (arrSelectedSchools, strPopupId) => {
                        if (arrSelectedSchools.length > 0) {
                            let strHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication?AutoLogin=' + arrSelectedSchools[0]["uSchoolId"] + '&vTargetType=FusionSchool' + '&ApplicationOpenerId=' + objContext.props.ClientUserDetails.UserId + '&sessionkey=' + objContext.props.JConfiguration.SessionKey;
                            window.open(strHostUrl, '_blank');
                            Popup.ClosePopup(strPopupId);
                        }
                    }
                },
                CallBacks: {
                },
                ParentProps: { ...objContext.props }
            });
            //}
        }

    }

    /**
     * @name OpenExtranetTeacher
     * @param {any} objContext
     */
    OpenExtranetTeacher(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TeacherManagementGrid"] : [];
        let strHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication?AutoLogin=' + arrSelectedRows[0]["uTeacherId"] + '&vTargetType=FusionTeacher' + '&ApplicationOpenerId=' + objContext.props.ClientUserDetails.UserId + '&sessionkey=' + objContext.props.JConfiguration.SessionKey;
        window.open(strHostUrl, '_blank');
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.TeacherManagement_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.TeacherManagement_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.TeacherManagement_ModuleProcessor.OpenDeletePopup(objContext),
            "OpenSendLoginProgressBarPopup": () => objContext.TeacherManagement_ModuleProcessor.OpenSendLoginProgressBarPopup(objContext),
            "OpenExtranetSchool": () => objContext.TeacherManagement_ModuleProcessor.OpenExtranetSchool(objContext),
            "OpenExtranetTeacher": () => objContext.TeacherManagement_ModuleProcessor.OpenExtranetTeacher(objContext)
        };
        if (objContext.props.Meta?.IsOpenSchoolTeachers && objContext.props.SetOfficeRibbonData)
            objContext.props.SetOfficeRibbonData(TeacherManagement_OfficeRibbon.GetOfficeRibbonData(objRibbonData))
        else if (!objContext.props.Meta?.IsOpenSchoolTeachers)
            ApplicationState.SetProperty("OfficeRibbonData", TeacherManagement_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStlyes
     * @param {object} props props
     * @returns {object} DynamicStlyes
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/5_Member/TeacherManagement/AddEditTeacherManagement/AddEditTeacherManagement.css"
        ];
    }
}

export default TeacherManagement_ModuleProcessor;