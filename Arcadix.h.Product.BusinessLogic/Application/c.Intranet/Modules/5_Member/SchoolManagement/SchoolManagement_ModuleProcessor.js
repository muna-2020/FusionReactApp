//Objects required for module.
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State';
import Object_Extranet_School_SchoolType from '@shared/Object/d.Extranet/2_School/SchoolType/SchoolType';
import Object_Extranet_School_Title from '@shared/Object/d.Extranet/2_School/Title/Title'
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';

//Module Objects
import * as AddEditSchoolManagement_MetaData from '@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/AddEditSchoolManagement/AddEditSchoolManagement_MetaData';
import * as SchoolManagement_Metadata from '@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/SchoolManagement_Metadata';
import * as SchoolManagement_OfficeRibbon from '@shared/Application/c.Intranet/Modules/5_Member/SchoolManagement/SchoolManagement_OfficeRibbon';

/**
 * @name SchoolManagement_ModuleProcessor
 * @param NA
 * @summary Class for SchoolManagement module display.
 * @return NA
 */
class SchoolManagement_ModuleProcessor extends IntranetBase_ModuleProcessor {

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
            "Object_Extranet_School_SchoolType",
            "Object_Extranet_School_Title",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/5_Member/SchoolManagment",
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
        this.OnPaginationClick(objContext, 1, objContext.state);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        let objSchoolTypeParam = {
            "SortKeys": [
                {
                    "iSchoolTypeId": {
                        "order": "asc"
                    }
                }],
            "OutputColumns": ["iSchoolTypeId", "cIsDeleted", "t_TestDrive_Member_School_SchoolType_Data"]
        }

        //SchoolType
        Object_Extranet_School_SchoolType.Initialize(objSchoolTypeParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_SchoolType]

        let objSchoolTitleParam = {
            "SortKeys": [
                {
                    "iTitleId": {
                        "order": "asc"
                    }
                }],
            "OutputColumns": ["iTitleId", "cIsDeleted", "t_TestDrive_Member_Title_Data"]
        }
        //Title
        Object_Extranet_School_Title.Initialize(objSchoolTitleParam);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_Title]

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

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/5_Member/SchoolManagment"];
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
            RowData: objContext.state.arrSchoolAdministratorData,
            DropDownData: objContext.SchoolManagement_ModuleProcessor.GetDependingColumnData(objContext),
            LanguageData: objContext.SchoolManagement_ModuleProcessor.GetMultiLanguageData(DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"], DataRef(objContext.props.Object_Cockpit_Language)["Data"], intApplicationTypeForLanguageData),
            RowsPerPage: 10,
            TotalRowCount: objContext.state.iTotalRowCount,
            PageNumber: objContext.state.intPageNumber,
            AdditionalPaddingIds: ["SchoolManagementSearch"]
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
            ...SchoolManagement_Metadata.GetMetaData()
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
     * @name GetGridEvent
     * @param {object} objContext
     * @summary it returns the object for Grid Event
     * @returns {object}  resource object
     */
    GetGridEvent(objContext) {
        return {
            PageNumberClick: (iPageNumber) => { objContext.SchoolManagement_ModuleProcessor.OnPaginationClick(objContext, iPageNumber) }
        };
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
        arrFilters = [...arrFilters, ...arrSearchFilters, {
            "match": {
                "cIsDeleted": "N"
            }
        }];
        let intFrom = objContext.state.iRowsPerPage * (intPageNumber - 1);
        let intSize = intPageNumber == 1 ? objContext.state.iRowsPerPage : (objContext.state.iTotalRowCount > (intFrom + objContext.state.iRowsPerPage)) ? objContext.state.iRowsPerPage : (objContext.state.iTotalRowCount - intFrom);
        let objSchoolParams = {
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

        Object_Extranet_School_School.GetData(objSchoolParams, (objReturnData) => {
            let arrSchoolData = objReturnData[Object.keys(objReturnData)[0]]["Data"] ? objReturnData[Object.keys(objReturnData)[0]]["Data"] : [];
            let intCount = objReturnData[Object.keys(objReturnData)[0]]["Count"] ? objReturnData[Object.keys(objReturnData)[0]]["Count"] : 0;
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSchoolAdministratorData": arrSchoolData, "intPageNumber": intPageNumber, "iTotalRowCount": intCount } });
            let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "SchoolManagementGrid": arrSchoolData[0] ? [arrSchoolData[0]] : [] });
            //let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") ? ApplicationState.GetProperty("ResetGridSelection")["SchoolManagementGrid"] : null;
            //if (fnResetGridSelection) {
            //    fnResetGridSelection();
            //}
        }, true);
    }

    /**
     * @name GetSearchFilters
     * @param {any} objContext
     * @summary Return Grid data
     * @returns {object} Grid data
     */
    GetSearchFilters(objSearchFilters) {

        var arrFilters = [];

        if (objSearchFilters["iStateId"] && objSearchFilters["iStateId"] !== -1) {
            arrFilters = [...arrFilters, {
                match: {
                    iStateId: objSearchFilters["iStateId"]
                }
            }];
        }
        if (objSearchFilters["uSchoolId"] && objSearchFilters["uSchoolId"] != -1) {
            arrFilters = [...arrFilters, {
                match: {
                    uSchoolId: objSearchFilters["uSchoolId"]
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
        if (objSearchFilters["vTown"] && objSearchFilters["vTown"] != "") {
            arrFilters = [...arrFilters, {
                wildcard: {
                    vTown: "*" + objSearchFilters["vTown"].toLowerCase() + "*"
                }
            }];
        }
        if (objSearchFilters["iZIPCode"] && objSearchFilters["iZIPCode"] != "") {
            arrFilters = [...arrFilters, {
                match: {
                    iZIPCode: objSearchFilters["iZIPCode"]
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
        if (objSearchFilters["iSchoolTypeId"] && objSearchFilters["iSchoolTypeId"] != -1) {
            arrFilters = [...arrFilters, {
                match: {
                    iSchoolTypeId: objSearchFilters["iSchoolTypeId"]
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
        else {
            arrFilters = [...arrFilters, {
                match: {
                    cIsTestSchool: "N"
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
        else {
            arrFilters = [...arrFilters, {
                match: {
                    cIsStellwerk: "N"
                }
            }];
        }
        if (objSearchFilters["vStreet"] && objSearchFilters["vStreet"] != "") {
            arrFilters = [...arrFilters, {
                wildcard: {
                    vStreet: "*" + objSearchFilters["vStreet"].toLowerCase() + "*"
                }
            }];
        }
        if (objSearchFilters["dtWhenLoginlEmailSent"] && objSearchFilters["dtWhenLoginlEmailSent"] != "") {
            arrFilters = [...arrFilters, {
                match: {
                    dtWhenLoginlEmailSent: objSearchFilters["dtWhenLoginlEmailSent"]
                }
            }];
        }
        if (objSearchFilters["vPhone"] && objSearchFilters["vPhone"] != "") {
            arrFilters = [...arrFilters, {
                wildcard: {
                    vPhone: "*" + objSearchFilters["vPhone"].toLowerCase() + "*"
                }
            }];
        }

        return arrFilters;
    }

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext passes Context object
     * @param {boolean} blnIsEdit is either edit or Add
     * @summary Call Confirmation pop-up for Deleting Competency level
     * @return null
     */
    OpenAddEditPopup(objContext, blnIsEdit) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/SchoolManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["SchoolManagementGrid"] : [];
        let intApplicationTypeForClassTypeData = 2;
        let blnShowErrorPopup = false;
        if (blnIsEdit) {
            blnShowErrorPopup = (!arrSelectedRows || arrSelectedRows.length <= 0) ? true : false;
        }
        if (!blnShowErrorPopup) {
            Popup.ShowTabbedPopup({
                Data: {
                    DropdownData: {
                        State: DataRef(objContext.props.Object_Extranet_State_State)["Data"],
                        StateDropdownSelectedValue: objContext.state.objSearchFilters["iStateId"],
                        Title: DataRef(objContext.props.Object_Extranet_School_Title)["Data"],
                        SchoolStatus: DataRef(objContext.props.Object_Extranet_School_SchoolType)["Data"]
                    },
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForClassTypeData),
                    IsEdit: blnIsEdit,
                },
                Meta: {
                    PopupName: "AddEditSchoolManagement",
                    HeaderData: AddEditSchoolManagement_MetaData.GetAddEditSchoolManagmentMetaData(),
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
                        objContext.SchoolManagement_ModuleProcessor.OnAddEditcomplete(objContext, objReturn, AddorEdit)
                    }
                }
                ,
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
            let arrnewData = [...objContext.state.arrSchoolAdministratorData, objAddEditData]
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSchoolAdministratorData": arrnewData, "iTotalRowCount": objContext.state.iTotalRowCount + 1 } });
        }
        else if (AddorEdit == "Edit") {
            let objSchool = objContext.state.arrSchoolAdministratorData.map((objSchoolAdministratorData) => {
                if (objSchoolAdministratorData["uSchoolId"] == objAddEditData["uSchoolId"]) {
                    return objAddEditData;
                }
                else {
                    return objSchoolAdministratorData;
                }
            })
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSchoolAdministratorData": objSchool } });
        }
        else {
            var count = 0;
            objAddEditData.map((objDeleteData) => {
                count = 0;
                objContext.state.arrSchoolAdministratorData.map((objSchoolAdministratorData) => {
                    if (objSchoolAdministratorData["uSchoolId"] == objDeleteData["uSchoolId"]) {
                        delete objContext.state.arrSchoolAdministratorData[count];
                    }
                    count++;
                })
            });
            objContext.dispatch({ type: "SET_STATE", payload: { "arrSchoolAdministratorData": objContext.state.arrSchoolAdministratorData } });
        }
    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting Competency level
     * @return null
     */
    OpenDeletePopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/SchoolManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows")["SchoolManagementGrid"];

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
                    ConfirmEvent: (strPopupId) => this.DeleteSchoolManagment(arrSelectedRows, strPopupId, objContext)
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
     * @name DeleteSchoolManagment
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Subject and close pop-up on success
     */
    DeleteSchoolManagment(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        //Since we are not loading SchoolData initial we are passing blnCache as true
        Object_Extranet_School_School.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            objContext.SchoolManagement_ModuleProcessor.OnAddEditcomplete(objContext, objReturn, "Delete");
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "SchoolManagementGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        }, true);

        //let arrParams = [];
        //arrParams = [...arrParams,
        //{
        //    "URL": "API/Object/Extranet/School/School",
        //    "Params": { "vDeleteData": arrDeleteRow, "uUserId": objContext.props.ClientUserDetails.UserId },
        //    "MethodType": "Delete"
        //}
        //];

        //ArcadixFetchData.Execute(arrParams, function (objReturn, blnDeleted) {
        //    objContext.SchoolManagement_ModuleProcessor.OnAddEditcomplete(objContext, objReturn, "Delete")
        //    if (blnDeleted) {
        //        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        //        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "SchoolManagementGrid": null });
        //        Popup.ClosePopup(strPopupId);
        //    }
        //});
    }

    /**
     * @name OnSearchButtonClick
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting CompetencyRange
     * @return null
     */
    OnSearchButtonClick(objContext, objDetails) {
        //new approach
        objContext.dispatch({ type: "SET_STATE", payload: { "intPageNumber": 1, "objSearchFilters": objDetails.objSearchFilters } });
        this.OnPaginationClick(objContext, 1, objDetails);
    }

    /**
     * @name OpenSendLoginProgressBarPopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting CompetencyRange
     * @return null
     */
    OpenSendLoginProgressBarPopup(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/SchoolManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["SchoolManagementGrid"] : 0;
        if (arrSelectedRows && arrSelectedRows.length > 0) {
            let arrMainClientUserIds = arrSelectedRows.map(t => t.uSchoolId)
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
            ["SchoolAdmins"]: arrSelectedRows,
            ["ProgressBarId"]: strProgressBarID,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        Object_Extranet_School_School.SendLogins(objSendMailParams, ()=>{});
    }

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

        let objSchoolTypeData = {
            "IsLanguageDependent": "Y",
            "ValueColumn": "iSchoolTypeId",
            "DisplayColumn": "vSchoolTypeName",
            "DependingTableName": "t_TestDrive_Member_School_SchoolType_Data",
            "Data": []
        };


        //DataRef(objContext.props.Object_Extranet_School_Title)["Data"]?.map((objTitle) => {
        //    objTitleData["Data"] = [...objTitleData["Data"], objTitle];
        //});

        //DataRef(objContext.props.Object_Extranet_State_State)["Data"]?.map((objState) => {
        //    objStateDropDownData["Data"] = [...objStateDropDownData["Data"], objState];
        //});

        //DataRef(objContext.props.Object_Extranet_School_SchoolType)["Data"]?.map((objSchoolType) => {
        //    objSchoolTypeData["Data"] = [...objSchoolTypeData["Data"], objSchoolType];
        //});

        objContext.props.Object_Extranet_School_Title?.["Data"]?.map((objTitle) => {
            objTitleData["Data"] = [...objTitleData["Data"], objTitle];
        });

        objContext.props.Object_Extranet_State_State?.["Data"]?.map((objState) => {
            objStateDropDownData["Data"] = [...objStateDropDownData["Data"], objState];
        });

        objContext.props.Object_Extranet_School_SchoolType?.["Data"]?.map((objSchoolType) => {
            objSchoolTypeData["Data"] = [...objSchoolTypeData["Data"], objSchoolType];
        });


        return { "iStateId": objStateDropDownData, "iTitleId": objTitleData, "iSchoolTypeId": objSchoolTypeData };
    };

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
     * @name OpenExtranetSchool
     * @param {any} objContext
     * @summary Opens Extranet School link.
     */
    OpenExtranetSchool(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["SchoolManagementGrid"] : 0;
        let vHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication?AutoLogin=' + arrSelectedRows[0]["uSchoolId"] + '&vTargetType=FusionSchool' + '&ApplicationOpenerId=' + objContext.props.ClientUserDetails.UserId + '&sessionkey=' + objContext.props.JConfiguration.SessionKey;
        window.open(vHostUrl, '_blank');
    }

    /**
     * @name OpenExtranetSchool
     * @param {any} objContext
     * @summary Opens all Teacher of selected School.
     */
    OpenAllTeachers(objContext) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/SchoolManagment", objContext.props);
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["SchoolManagementGrid"] : [];
        if(arrSelectedRows && arrSelectedRows.length > 0) {
            Popup.ShowTabbedPopup({
                Data: {
                    SchoolId: arrSelectedRows[0]["uSchoolId"],
                    StateId: arrSelectedRows[0]["iStateId"]
                },
                Meta: {
                    PopupName: "TeacherManagement",
                    IsOpenSchoolTeachers: true,
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },               
                CallBacks: {},
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
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "AddPopup": () => objContext.SchoolManagement_ModuleProcessor.OpenAddEditPopup(objContext, false),
            "EditPopup": () => objContext.SchoolManagement_ModuleProcessor.OpenAddEditPopup(objContext, true),
            "DeletePopup": () => objContext.SchoolManagement_ModuleProcessor.OpenDeletePopup(objContext),
            "OpenSendLoginProgressBarPopup": () => objContext.SchoolManagement_ModuleProcessor.OpenSendLoginProgressBarPopup(objContext),
            "OpenExtranetSchool": () => objContext.SchoolManagement_ModuleProcessor.OpenExtranetSchool(objContext),
            "OpenAllTeachers": () => objContext.SchoolManagement_ModuleProcessor.OpenAllTeachers(objContext)
        };
        ApplicationState.SetProperty("OfficeRibbonData", SchoolManagement_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
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
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/5_Member/SchoolManagement/SchoolManagement.css"
        ];
    }
}

export default SchoolManagement_ModuleProcessor;