//Objects required for module.
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Extranet_Pupil_Gender from '@shared/Object/d.Extranet/4_Pupil/Gender/Gender';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Intranet_Member_PupilManagement_Module from '@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/PupilManagement_Module';

//Module Objects
import * as PupilManagement_OfficeRibbon from '@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/PupilManagement_OfficeRibbon';
import * as PupilManagement_Metadata from '@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/PupilManagement_Metadata';
import * as AddEditPupilManagement_MetaData from '@shared/Application/c.Intranet/Modules/5_Member/PupilManagement/AddEditPupilManagement/AddEditPupilManagement_MetaData';

/**
 * @name PupilManagement_ModuleProcessor
 * @param NA
 * @summary Class for PupilManagement module display.
 * @return NA
 */
class PupilManagement_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Extranet_State_State",
            "Object_Extranet_School_School",
            "Object_Extranet_Teacher_Teacher",
            "Object_Extranet_Teacher_Class",
            "Object_Extranet_Pupil_Gender",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/5_Member/PupilManagment",
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

        // State
        let objStateParam = {
            "SortKeys": [
                {
                    "t_TestDrive_Member_State_Data.vStateName": {
                        "order": "asc"
                    }
                }],
            "OutputColumns": ["vStateName", "iStateId", "cIsDeleted", "t_TestDrive_Member_State_Data"]
        }
        Object_Extranet_State_State.Initialize(objStateParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];

        //Gender
        Object_Extranet_Pupil_Gender.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Gender];

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/5_Member/PupilManagment"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name GetPupilInitialDataParams
     * @param {any} objContext
     * @summary Return initial data
     * @returns {object} Initial data
     */
    GetPupilInitialDataParams(objContext) {
        let objPupilParams = {
            "Size": 1,
            "SearchQuery": {}
        };

        return objPupilParams;
    }

    /**
     * @name GetPupilData
     * @param {any} objContext
     * @summary Return Pupil data
     * @returns {object} pupil data
     */
    GetPupilData(objReturn) {
        var arrPupilData;
        if (objReturn["pupil"].Data) {
            arrPupilData = objReturn["pupil"].Data;
        }
        else {
            arrPupilData = objReturn["pupil"][Object.keys(objReturn["pupil"])[0]].Data;
        }
        return arrPupilData;
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
            RowData: objContext.state.arrPupilData,//DataRef(objContext.props.Object_Extranet_Pupil_Pupil)["Data"],
            DropDownData: objContext.PupilManagement_ModuleProcessor.GetDependingColumnData(objContext),
            LanguageData: objContext.PupilManagement_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
            AllowPaging: "Y",
            RowsPerPage: 10,
            TotalRowCount: objContext.state.intTotalRowCount,
            PageNumber: objContext.state.intPageNumber,
            AdditionalPaddingIds: ["OfflineExecution", "PupilManagementSearch"]
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
            ...objContext.state.intPageNumber !== -1 ? { ...PupilManagement_Metadata.GetMetaData(), AllowPaging: "Y" } : { ...PupilManagement_Metadata.GetMetaData() }
        }
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
     * @name GetGridEvent
     * @param {object} objContext
     * @summary it returns the object for Grid Event
     * @returns {object}  resource object
     */
    GetGridEvent(objContext) {
        return {
            PageNumberClick: (iPageNumber) => { objContext.PupilManagement_ModuleProcessor.OnPaginationClick(objContext, iPageNumber) }
        };
    }


    /**
     * @name OnPaginationClick
     * @param {object} objContext
     * @param {int} intPageNumber
     * @summary Event for handling Pagination click
     */
    OnPaginationClick(objContext, intPageNumber, objDetails) {
        let arrFilters = [];
        var arrSearchFilters = this.GetSearchFilters(objDetails ? objDetails.objSearchFilters : objContext.state.objSearchFilters);
        arrFilters = [...arrFilters, ...arrSearchFilters];
        let intFrom = objContext.state.iRowsPerPage * (intPageNumber - 1);
        let intSize = intPageNumber == 1 ? objContext.state.iRowsPerPage : (objContext.state.intTotalRowCount > (intFrom + objContext.state.iRowsPerPage)) ? objContext.state.iRowsPerPage : (objContext.state.intTotalRowCount - intFrom);
        let objPupilParams = {
            "From": intFrom,
            "Size": intSize,
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

        ApplicationState.SetProperty("blnShowAnimation", true);
        Intranet_Member_PupilManagement_Module.GetPupilManagementData(objPupilParams, (objReturn, intTotalRowCount) => {
            var arrPupilData = this.GetPupilData(objReturn);
            var iRowCount = parseInt(intTotalRowCount[Object.keys(intTotalRowCount)[0]]);
            objContext.dispatch({ type: "SET_STATE", payload: { "arrPupilData": arrPupilData, "intTotalRowCount": iRowCount, "intPageNumber": intPageNumber } });
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "PupilManagementGrid": arrPupilData[0] ? [arrPupilData[0]] : [] });
            ApplicationState.SetProperty("blnShowAnimation", false);
            window.dispatchEvent(new Event('resize'));
            this.ResetGridSelection("PupilManagementGrid");
        })
    }

    /**
     * @name GetSearchFilters
     * @param {object} objSearchFilters
     * @summary Return search filters
     * @returns {array} arrFilters
     */
    GetSearchFilters(objSearchFilters) {

        var arrFilters = [];
        //Added
            arrFilters = [...arrFilters, {
                match: {
                    ["cIsViewed"]: objSearchFilters["cIsViewed"] == 1 ? "N" : "Y"
                }
            }];
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
            arrFilters = [...arrFilters,
            {
                "match": {
                    "uTeacherId": objSearchFilters["uTeacherId"]
                }
            }];
        }
        if (objSearchFilters["uClassId"] && objSearchFilters["uClassId"] !== -1) {
            arrFilters = [...arrFilters,
            {
                "match": {
                    "uClassId": objSearchFilters["uClassId"]
                }
            }];
        }
        //End
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
        if (objSearchFilters["cIsExternal"]) {
            arrFilters = [...arrFilters, {
                match: {
                    cIsExternal: objSearchFilters["cIsExternal"]
                }
            }];
        }
        return arrFilters;
    }

    /**
     * @name OnSearchButtonClick
     * @param {object} objContext
     * @summary Event for search button click
     */
    OnSearchButtonClick(objContext, objDetails) {
        objContext.dispatch({ type: "SET_STATE", payload: { "intPageNumber": 1, "objSearchFilters": objDetails.objSearchFilters } });
        this.OnPaginationClick(objContext, 1, objDetails);
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation popup for Deleting Competency level
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/PupilManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["PupilManagementGrid"] : 0;
        let intApplicationTypeForClassTypeData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        //else {
        //    blnShowErrorPopup = objContext.state.objSearchFilters["iStateId"] == -1
        //}
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    DropdownData: {
                        StateData: DataRef(objContext.props.Object_Extranet_State_State)["Data"],
                        SchoolData: DataRef(objContext.props.Object_Extranet_School_School)["Data"],
                        TeacherData: DataRef(objContext.props.Object_Extranet_Teacher_Teacher)["Data"],
                        ClassData: DataRef(objContext.props.Object_Extranet_Teacher_Class)["Data"],
                        GenderData: DataRef(objContext.props.Object_Extranet_Pupil_Gender)["Data"],
                        StateDropdownSelectedValue: objContext.state.objSearchFilters["iStateId"],
                        SchoolDropdownSelectedValue: objContext.state.objSearchFilters["uSchoolId"],
                        TeacherDropdownSelectedValue: objContext.state.objSearchFilters["uTeacherId"],
                        ClassDropdownSelectedValue: objContext.state.objSearchFilters["uClassId"],
                        Title: DataRef(objContext.props.Object_Extranet_School_Title)["Data"],
                    },
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForClassTypeData),
                    IsEdit: blnIsEdit,
                },
                Meta: {
                    PopupName: "AddEditPupilManagement",
                    HeaderData: AddEditPupilManagement_MetaData.GetAddEditPupilManagementMetaData(),
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
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting Competency level
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/PupilManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["PupilManagementGrid"];

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            var strDeleteVariables = "";
            arrSelectedRows.map(objSelectedRows => {
                strDeleteVariables = strDeleteVariables + objSelectedRows["iDisplayOrder"] + ", ";
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
                    ConfirmEvent: (strPopupId) => this.DeletePupilManagement(arrSelectedRows, strPopupId, objContext)
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
     * @name DeletePupilManagement
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Subject and close popup on success
     */
    DeletePupilManagement(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Extranet_School_School.DeleteData({ vDeleteData: arrDeleteRow, "uUserId": objContext.props.ClientUserDetails.UserId }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "PupilManagementGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
     * @name AddSearchFilters
     * @param {*} objContext objChangeData
     * @param {*} objChangeData objChangeData
     * @summary   To set the Search filter in the state
     */
    AddSearchFilters(event, objContext) {
        delete objContext.state.objSearchFilters[event.target.id];
        var cIsYorN;
        if (!objContext.state.blnIsCachingFilterEnabled) {
            Logger.Log("caching disabled");
            if (event.target.type === "text") {

                objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [event.target.id]: event.target.value } } });
            }
            else {
                if (event.target.id === "cIsTestSchool") {
                    cIsYorN = event.target.checked ? 'Y' : 'N';
                    objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [event.target.id]: cIsYorN, "uSchoolId": -1, "uTeacherId": -1, "uClassId": -1 } } });
                }
                else {
                    cIsYorN = event.target.checked ? 'Y' : 'N';
                    objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [event.target.id]: cIsYorN } } });
                }
            }
        }
    }

    /**
     * @name OnDropDownSelectionChange
     * @param {object} objContext passes Context object
     * @summary Handel dropdown change
     * @return null
     */
    OnDropDownSelectionChange(strDropDownType, objContext, objItem, objDropDownProps) {
        if (strDropDownType == "State") {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [objDropDownProps.Id]: objItem[objDropDownProps.Id], "uSchoolId": -1, "uTeacherId": -1, "uClassId": -1 } } });
        }
        else if (strDropDownType == "School") {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [objDropDownProps.Id]: objItem[objDropDownProps.Id], "uTeacherId": -1, "uClassId": -1 } } });
        }
        else if (strDropDownType == "Teacher") {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [objDropDownProps.Id]: objItem[objDropDownProps.Id], "uClassId": -1 } } });
        }
        else if (strDropDownType == "Class") {
            objContext.dispatch({ type: "SET_STATE", payload: { "objSearchFilters": { ...objContext.state.objSearchFilters, [objDropDownProps.Id]: objItem[objDropDownProps.Id] } } });
        }
    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation popup for Deleting CompetencyRange
     * @return null
     */
    OpenSendLoginProgressBarPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/PupilManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["PupilManagementGrid"] : 0;
        if (arrSelectedRows && arrSelectedRows.length > 0) {
            let arrMainClientUserIds = arrSelectedRows.map(t => t.uPupilId)
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
     * @summary Call Confirmation popup for Deleting CompetencyRange
     * @return null
     */
    sendLogin(objContext, strProgressBarID, arrSelectedRows) {
        let objSendMailParams =
        {
            ["PupilAdmins"]: arrSelectedRows,
            ["ProgressBarId"]: strProgressBarID,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        Intranet_Member_PupilManagement_Module.SendLogins(objSendMailParams);
    }

    /**
     * @name GetDependingColumnData
     * @param {*} objContext objContext
     * @summary Return depending column Dropdown data
     * @returns {obj} depending column object
     */
    GetDependingColumnData(objContext) {


        let objGenderDropdownData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "iGenderId",
            "DisplayColumn": "vGenderName",
            "DependingTableName": "t_TestDrive_Member_Gender_Data",
            "Data": []
        };
        objContext.props.Object_Extranet_Pupil_Gender?.["Data"]?.map((objGender) => {
            objGenderDropdownData["Data"] = [...objGenderDropdownData["Data"], objGender];
        });

        return { "iGenderId": objGenderDropdownData };
    };

    /**
     * @name GetGridCallBacks
     * @param {object} objContext
     * @summary Returns object that contains all the CallBack methods.
     * @return {object}
     */
    GetGridCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => this.OnBeforeGridRowRender(objRow, objContext)
        };
        return objCallBacks;
    }

    /**
     * @name OnBeforeGridRowRender
     * @param {object} objRow
     * @param {object} objContext
     * @summary returns the modified row data
     * @return {object}
     */
    OnBeforeGridRowRender(objRow, objContext) {
        let arrPupilMappings = objRow.PupilMappingName.split('/');
        let objReturnRow = {
            ...objRow,
            StateName: arrPupilMappings[0],
            SchoolName: arrPupilMappings[1],
            TeacherName: arrPupilMappings[2],
            ClassName: arrPupilMappings[3],
            cIsStellwerk: arrPupilMappings[4]
        }
        return objReturnRow;
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
     * @name OpenExtranetPupil
     * @param {any} objContext
     */
    OpenExtranetPupil(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["PupilManagementGrid"] : 0;
        let vHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication?AutoLogin=' + arrSelectedRows[0]["uPupilId"] + '&vTargetType=FusionPupil' + '&ApplicationOpenerId=' + objContext.props.ClientUserDetails.UserId + '&sessionkey=' + objContext.props.JConfiguration.SessionKey;
        window.open(vHostUrl, '_blank');
    }

    /**
     * @name OpenExtranetSchool
     * @param {any} objContext
     */
    OpenExtranetSchool(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["PupilManagementGrid"] : 0;
        let vHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication?AutoLogin=' + arrSelectedRows[0]["t_TestDrive_Member_School_Pupil"][0]["uSchoolId"] + '&vTargetType=FusionSchool' + '&ApplicationOpenerId=' + objContext.props.ClientUserDetails.UserId;//+ '&SessionKey=' + objContext.props.JConfiguration.SessionKey;
        window.open(vHostUrl, '_blank');
    }

    /**
     * @name OpenExtranetTeacher
     * @param {any} objContext
     */
    OpenExtranetTeacher(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["PupilManagementGrid"] : 0;
        let vHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication?AutoLogin=' + arrSelectedRows[0]["t_TestDrive_Member_Class_Pupil"][0]["uTeacherId"] + '&vTargetType=FusionTeacher' + '&ApplicationOpenerId=' + objContext.props.ClientUserDetails.UserId;//+ '&SessionKey=' + objContext.props.JConfiguration.SessionKey;
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
            "AddPopup": () => objContext.PupilManagement_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.PupilManagement_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.PupilManagement_ModuleProcessor.OpenDeletePopup(objContext),
            "OpenSendLoginProgressBarPopup": () => objContext.PupilManagement_ModuleProcessor.OpenSendLoginProgressBarPopup(objContext),
            "OpenExtranetPupil": () => objContext.PupilManagement_ModuleProcessor.OpenExtranetPupil(objContext),
            "OpenExtranetSchool": () => objContext.PupilManagement_ModuleProcessor.OpenExtranetSchool(objContext),
            "OpenExtranetTeacher": () => objContext.PupilManagement_ModuleProcessor.OpenExtranetTeacher(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", PupilManagement_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} GetDynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/6_Members/Members.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css"
        ];
    }
}

export default PupilManagement_ModuleProcessor;