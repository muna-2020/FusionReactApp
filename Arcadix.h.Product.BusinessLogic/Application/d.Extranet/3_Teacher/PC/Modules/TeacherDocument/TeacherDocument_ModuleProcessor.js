//Base class imports
import ExtranetBase_ModuleProcessor from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_ModuleProcessor';

//Module object imports.
import Extranet_Teacher_TeacherDocumentFolder_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentFolder_Module';
import Extranet_Teacher_TeacherDocument_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocument_Module';
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Cockpit_UserPreferenceProfileImage from '@shared/Object/c.Cockpit/UserPreference/UserPreferenceProfileImage/UserPreferenceProfileImage'
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';

import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name TeacherDocument_ModuleProcessor
 * @summary module processor for Teacher Document.
 * */
class TeacherDocument_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TeacherDocument",
            "Object_Extranet_Pupil_Pupil",
            "Extranet_Teacher_TeacherDocumentFolder_Module",
            "Extranet_Teacher_TeacherDocument_Module",
            "Object_Extranet_Teacher_SchoolYearPeriod",
            "Object_Extranet_Teacher_Class",
            "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId",
            "Object_Extranet_School_School",
            "Object_Extranet_Teacher_Teacher",
            { "StoreKey": "ApplicationState", "DataKey": "RefreshDocumentData" }
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        //(new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherDocument/TeacherDocument.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CopyingFolderPopUp.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherDocument/TeacherDocumentPopup/CreateFolderPopUp.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherDocument/TeacherDocumentPopup/ShareFolderPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherDocument/TeacherDocumentPopup/UploadFilePopup.css"
        ];
    }

    /**
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    InitialDataParams(props) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrDataRequest = [];

        //Text Resource
        let arrResourcePath = ["/d.Extranet/3_Teacher/Modules/TeacherDocument"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //Document Folder
        let objGetFoldersParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            "uUserId": props.ClientUserDetails.UserId,
            "uSchoolId": props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId,
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": []
        };
        Extranet_Teacher_TeacherDocumentFolder_Module.Initialize(objGetFoldersParams);
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_TeacherDocumentFolder_Module];

        //Document
        let objGetDocumentsParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            ["uSchoolId"]: props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId,
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        };
        Extranet_Teacher_TeacherDocument_Module.Initialize(objGetDocumentsParams);
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_TeacherDocument_Module];

        //class
        let objGetClassesParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "nested": {
                            "path": "t_TestDrive_Member_Class_Teacher",
                            "query": {
                                "bool": {
                                    "must": [
                                        {
                                            "match": {
                                                "t_TestDrive_Member_Class_Teacher.cIsDeleted": "N"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
            },
            "SortKeys": [],
            "OutputColumns": []
        };
        Object_Extranet_Teacher_Class.Initialize(objGetClassesParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //School
        let strSchoolId = this.GetSchoolId(props);
        let objSchoolParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolId": strSchoolId
                        }
                    }
                ]
            }
        };
        Object_Extranet_School_School.Initialize(objSchoolParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_School];

        //teacher
        let objTeacherParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": strSchoolId,
                "Type": "nested"
            }
        };
        Object_Extranet_Teacher_Teacher.Initialize(objTeacherParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];

        //pupil
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    }
                ]
            },
            "SortKeys": [],
            "OutputColumns": []
        };
        Object_Extranet_Pupil_Pupil.Initialize(objPupilParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Pupil];

        //School Year Period.
        let objSchoolYearPeriodParams = {
            "SearchQuery": {
                "must":
                    [
                        {
                            "match": {
                                "cIsDeleted": "N"
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
            ]
        };

        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];

        //UserProfileImageByClassId
        let objPupilProfileImages = {
            "ForeignKeyFilter": {
                "uClassId": strClassId,
            },
            "SearchQuery": {
            },
        };

        Object_Cockpit_UserPreferenceProfileImage.InitializeGetDataByClassId(objPupilProfileImages);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_UserPreferenceProfileImage];
        return arrDataRequest;
    }

    /**
     * @name GetSchoolId
     */
    GetSchoolId(props) {
        let strSchoolId = "";
        if (props.ClientUserDetails != undefined) {
            if (props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_ExternalSourceMapping.length > 0) {
                let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
                let arrFilteredUserPreference = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(x => x["vKey"] == "SelectedSchoolForTeacher");
                if (arrFilteredUserPreference.length > 0) {
                    strSchoolId = arrFilteredUserPreference[0]["vValue"];
                }
            } else {
                strSchoolId = props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School.find(x => x["cIsDeleted"] == "N")["uSchoolId"];
            }
        }
        return strSchoolId;
    }

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "outletBand", "document-mainheader", "documentRightHeader"],
            FooterIds: ["bottomSpacing", "BottomFooter"]
        };
    }

    /**
     * @name GetTeacherName
     * @summary Teacher name by teacher id.
     * @param {any} objContext
     * @param {any} strTeacherId
     * @param {any} strSchoolId
     */
    GetTeacherName(objContext, strTeacherId, strSchoolId) {
        let arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"]
        let objTeacher = arrTeacherData.find(item => { return item.uTeacherId == strTeacherId });
        return objTeacher.vName + " " + objTeacher.vFirstName;
    };

    /**
     * @name OnChangeClass
     * @summary updates the class to state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeClass(objContext, objItem) {
        objContext.dispatch({ type: "SET_STATE", payload: { objSelectedClass: objItem } });
    }

    /**
     * @name GetDataAfterClassChange
     * @summary make the api after class change.
     * @param {any} objContext
     */
    GetDataAfterClassChange(objContext) {
        let strClassId = objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher[0].uClassId;
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrDataRequest = [];
        let objGetFoldersParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            "uUserId": objContext.props.ClientUserDetails.UserId,
            "uSchoolId": objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId,
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod ? objContext.state.objSchoolYearPeriod["uSchoolYearPeriodId"] : null
        };

        Extranet_Teacher_TeacherDocumentFolder_Module.Initialize(objGetFoldersParams);
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_TeacherDocumentFolder_Module];

        let objGetDocumentsParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId,
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod ? objContext.state.objSchoolYearPeriod["uSchoolYearPeriodId"] : null
        };
        Extranet_Teacher_TeacherDocument_Module.Initialize(objGetDocumentsParams)
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_TeacherDocument_Module];

        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iStateId": iStateId
                        }
                    }
                ]
            },
            "SortKeys": [],
            "OutputColumns": []
        };
        Object_Extranet_Pupil_Pupil.Initialize(objPupilParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Pupil];

        (new ObjectQueue()).QueueAndExecute(arrDataRequest);
    }

    /**
    * @name GetSchoolYearPeriodDropdownMetaData
    * @summary Gets the meta data for SchoolYear dropdown
    * @returns {object} Meta data objects for SchoolYear dropdown
    */
    GetSchoolYearPeriodDropdownMetaData() {
        return {
            DisplayColumn: "vSchoolYearName",
            ValueColumn: "uSchoolYearPeriodId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Member_Class_SchoolYearPeriod_Data"
        };
    }

    /**
    * @name GetSchoolYearPeriodDropdownData
    * @param {Array} arrSchoolYearPeriodData SchoolYearPeriod data
    * @summary Gets the data for SchoolYear dropdown
    * @returns {object} Meta objects for SchoolYear dropdown
    */
    GetSchoolYearPeriodDropdownData(arrSchoolYearPeriodData) {
        let strSelectedValue = arrSchoolYearPeriodData && arrSchoolYearPeriodData.length > 0 ? arrSchoolYearPeriodData[0]["uSchoolYearPeriodId"] : "-1";
        return {
            DropdownData: arrSchoolYearPeriodData ? arrSchoolYearPeriodData : [],
            SelectedValue: strSelectedValue
        };
    }

    /**
    * @name GetResourceData
    * @summary Gets the resource data required for the dropdown
    * @returns {object} object carrying the skin path
    */
    GetResourceData() {
        return {
            SkinPath: JConfiguration.ExtranetSkinPath
        };
    }

    /**
    * @name GetSchoolYearPeriodDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for School Year dropdown.
    * @returns {object} objEventBasics
    */
    GetSchoolYearPeriodDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.TeacherDocument_ModuleProcessor.OnChangeSchoolYearPeriodDropdown(objContext, objItem)
        };
    }

    /**
     * @name OnChangeSchoolYearPeriodDropdown
     * @summary updates the SchoolYearPeriod  to state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
        let blnCurrentSchoolYearPeriod = false;
        if (new Date() > new Date(objItem["dtFromDate"]) && new Date() < new Date(objItem["dtToDate"])) {
            blnCurrentSchoolYearPeriod = true;
        }
        objContext.dispatch({ type: 'SET_STATE', payload: { objSchoolYearPeriod: objItem, blnCurrentSchoolYearPeriod: blnCurrentSchoolYearPeriod } })
    }

    /**
     * @name OpenFolderPopup
     * @summary opens the popup for edit folder name.
     * @param {any} objContext
     * @param {any} blsEditMode
     * @param {any} objTextResource
     */
    OpenFolderPopup(objContext, blsEditMode, objTextResource) {
        if (objContext.state.blnDefaultFolder == true) {
            let objPopupTextResource = {
                Error_ErrorText: Localization.TextFormatter(objTextResource, 'CreateFolderErrorPopUpMessage'),
                Error_OkButtonText: Localization.TextFormatter(objTextResource, 'Okay'),
                Error_Title: "Ordner erstellen"
            };

            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "Width": "380px",
                    "Height": "auto",
                    "ShowHeader": true,
                },
                Resource: {
                    Text: objPopupTextResource,
                    SkinPath: JConfiguration.ExternalSkinPath,
                    TextResourcesKey: "Error"
                },
                Events: {},
                CallBacks: {}
            });

        } else {
            Popup.ShowPopup({
                Data: {
                    strFolderName: blsEditMode ? objContext.state.objSelectedFolder["vFolderName"] : '',
                    ClickSave: (folderName) => { objContext.TeacherDocument_ModuleProcessor.OnClickSaveFolder(objContext, folderName, blsEditMode); }
                },
                Meta: {
                    PopupName: 'CreateFolderPopUp',
                    "Width": "380px",
                    "Height": "auto",
                    ShowHeader: false,
                    ShowCloseIcon: false,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: JConfiguration.ExtranetSkinPath
                },
                Events: {
                },
                CallBacks: {
                }
            });
        }
    }

    /**
     * @name OpenDeletePopUp
     * @summary OpenDeletePopUp
     * @param {any} objContext
     * @param {any} objTextResource
     * @param {any} strType
     * @param {any} objDocument
     */
    OpenDeletePopUp(objContext, objTextResource, strType, objDocument = undefined) {
        let strConfirmText = '';
        let strHeaderText = '';

        if (strType == "Folder") {
            strConfirmText = Localization.TextFormatter(objTextResource, 'DeleteFolderPopUpMessage').replace("{}", "<b>" + objContext.state.objSelectedFolder["vFolderName"] + "</b>");
            strHeaderText = Localization.TextFormatter(objTextResource, 'DeleteFolderPopUpHeader');
        } else {
            strConfirmText = Localization.TextFormatter(objTextResource, 'DeleteDocumentPopUpMessage').replace("{}", "<b>" + objDocument["vFileName"] + "</b>");
            strHeaderText = Localization.TextFormatter(objTextResource, 'DeleteDocumentPopUpHeader');
        }
        let objPopupTextResource = {
            Delete_ConfirmText: strConfirmText,
            Delete_ConfirmButtonText: Localization.TextFormatter(objTextResource, 'Delete'),
            Delete_CloseButtonText: Localization.TextFormatter(objTextResource, 'Close'),
            Delete_Title: strHeaderText
        };

        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                "ShowCloseIcon": false,
                Height: "auto"
            },
            Resource: {
                Text: objPopupTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "Delete"
            },
            Events: {
                ConfirmEvent: (strPopupUniqueId) => {
                    Popup.ClosePopup(strPopupUniqueId);
                    objContext.TeacherDocument_ModuleProcessor.DeleteData(objContext, strType, objDocument);
                }
            },
            CallBacks: {}
        });
    }

    /**
     * @name OpenFileUploadPopup
     * @summary opens the file upload popup.
     * @param {any} objContext
     * @param {any} objTextResource
     */
    OpenFileUploadPopup(objContext, objTextResource) {
        Popup.ShowPopup({
            Data: {
                OnClickSave: (arrUploadedFiles) => { objContext.TeacherDocument_ModuleProcessor.AddDocuments(objContext, arrUploadedFiles); },
            },
            Meta: {
                PopupName: 'TeacherFileUploadPopUp',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: 'auto',
                Width: 380
            },
            Resource: {
                Text: objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
            },
            CallBacks: {
            }
        });
    }

    /**
     * @name OpenCopyFolderPopup
     * @summary opens the copy folder popup.
     * @param {any} objContext
     * @param {any} objTextResource
     * @param {any} blnMove
     */
    OpenMoveCopyFolderPopup(objContext, objTextResource, blnMove) {
        let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
        var arrFolderData = DataRef(objContext.props.Extranet_Teacher_TeacherDocumentFolder_Module, "Extranet_Teacher_TeacherDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
        let arrModifiedData = this.ManipulateFolderData(arrFolderData, objTextResource);
        let arrFilteredData = arrModifiedData.filter(f => !(f["uDocumentFolderId"] == objContext.state.objSelectedFolder["uDocumentFolderId"]))//&& !(f["uDocumentFolderId"] == state.objSelectedFolder["uParentDocumentFolderId"])

        Popup.ShowPopup({
            Data: {
                arrFolderData: arrFilteredData,
                OnClickSave: (objSelectedFolder) => { this.CopyOrMove(objContext, objSelectedFolder, blnMove, objTextResource); }
            },
            Meta: {
                PopupName: 'CopyFolderPopUp',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: 'auto',
                Width: 380
            },
            Resource: {
                Text: objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
                GetTreeMetaData: this.GetTreeMetaData(),
                GetTreeResourceData: this.GetTreeResourceData(),
                OnClickSave: (objSelectedFolder) => { this.CopyOrMove(objContext, objSelectedFolder, blnMove, objTextResource) }
            },
            CallBacks: {
            }
        });
    }

    /**
     * @name OpenAssignUserPopup
     * @summary opens the assign user popup.
     * @param {any} objContext
     * @param {any} objTextResource
     */
    OpenAssignUserPopup(objContext, objTextResource) {
        let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
        let arrPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];
        let arrUserPreferenceImages = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId, "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId;uClassId;" + strClassId)["Data"]

        Popup.ShowPopup({
            Data: {
                arrPupilData: arrPupilData,
                arrSelectedList: objContext.state.objSelectedFolder ? objContext.state.objSelectedFolder["t_LearnCoacher_Document_Folder_User"] : [],
                OnClickAssign: (usersData, blnReadOnly) => { this.AssignUsers(objContext, usersData, blnReadOnly); },
                arrUserPreferenceImages: arrUserPreferenceImages,
                objSelectedFolder: objContext.state.objSelectedFolder
            },
            Meta: {
                PopupName: 'ShareFolderPopup',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: "auto",
                Width: "380px"
            },
            Resource: {
                Text: objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
            },
            CallBacks: {
            }
        });
    }

    /**
      * @name OnClickOutSideTree
      * @summary on click of outside the tree need to 
      * @param {any} objContext
      */
    OnClickOutSideTree(objContext, domTreeRef) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objSelectedFolder: undefined, blnDefaultFolder: false } })
        ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["TeacherDocumentTree"]: {} });
        domTreeRef.current ? domTreeRef.current.UpdateState() : null;
    }

    /**
     * @name OnSelectFolder
     * @summary updates the state by selected folder and validations for folder
     * @param {any} objContext
     * @param {any} objFolder
     */
    OnSelectFolder(objContext, objFolder) {
        let objValidatedIcons = this.ValidateIcons(objContext, objFolder)
        objContext.dispatch({
            type: 'SET_STATE', payload: {
                objSelectedFolder: objFolder,
                blnDefaultFolder: objValidatedIcons.blnDefaultFolder,
                blnSharedFolder: objValidatedIcons.blnSharedFolder,
                blnParentFolder: objValidatedIcons.blnParentFolder,
                blnOwnerOfFolder: objValidatedIcons.blnOwnerOfFolder,
            }
        })
    }

    /**
     * @name GetFolderDocuments
     * @summary returns the documents by selected folder with the read status of document.
     * @param {any} objContext
     * @returns {Array}
     */
    GetFolderDocuments(objContext) {
        if (objContext.state.objSelectedFolder) {
            let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
            let arrDocumentAllData = DataRef(objContext.props.Extranet_Teacher_TeacherDocument_Module, "Extranet_Teacher_TeacherDocument_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
            if (arrDocumentAllData != undefined) {
                let GetReadStatus = (objDocument) => {
                    let objViewedPresent = objDocument.t_Learncoacher_Document_User.find(du => du.uUserId == objContext.props.ClientUserDetails.UserId);
                    return (objViewedPresent || objDocument.uUserId == objContext.props.ClientUserDetails.UserId);
                }

                return arrDocumentAllData.filter(doc => doc["uDocumentFolderId"] == objContext.state.objSelectedFolder["uDocumentFolderId"] && doc.cIsDeleted == 'N')
                    .map(doc => {
                        return {
                            ...doc,
                            blnViewed: GetReadStatus(doc)
                        }
                    })
            }
        }
        return [];
    }

    /**
     * @name ValidateIcons
     * @summary validates the selected is default or shared or parent.
     * @param {any} objContext
     * @param {any} objFolder
     */
    ValidateIcons(objContext, objFolder) {
        let objValidated = {
            blnDefaultFolder: false,
            blnSharedFolder: false,
            blnParentFolder: false,
            blnOwnerOfFolder: false
        }

        if (objFolder["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000001" || objFolder["cIsSchoolFolderForTeacher"] == "Y") {
            objValidated.blnDefaultFolder = true;
        }
        if (objFolder["t_LearnCoacher_Document_Folder_User"] && objFolder["t_LearnCoacher_Document_Folder_User"].length > 0) {
            objValidated.blnSharedFolder = true;
        }
        if (objFolder["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000000") {
            objValidated.blnParentFolder = true;
        }
        if (objFolder["uUserId"] == objContext.props.ClientUserDetails.UserId) {
            objValidated.blnOwnerOfFolder = true;
        }
        return objValidated;
    }

    /**
     * @name OnClickSaveFolder
     * @summary forms sample folder object and calls the Add method selected folder is undefined else Edit
     * @param {any} objContext
     * @param {any} folderName
     * @param {any} blsEditMode
     */
    OnClickSaveFolder(objContext, folderName, blsEditMode) {
        let objFolder = {
            uClassId: objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
            uUserId: objContext.props.ClientUserDetails.UserId,
            cIsTeacher: 'Y',
            cIsPupil: "N",
            cIsDeleted: "N",
            uParentDocumentFolderId: objContext.state.objSelectedFolder ? objContext.state.objSelectedFolder["uDocumentFolderId"] : "00000000-0000-0000-0000-000000000000",
            vFolderName: folderName,
            cIsSchool: "N",
            cIsSchoolFolderForPupil: "N",
            cIsSchoolFolderForTeacher: "N"
        }

        let objFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    }
                ]
            },
            "uUserId": objContext.props.ClientUserDetails.UserId,
            "uSchoolId": objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId,
            "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
            "UserId": ClientUserDetails.UserId
        };

        if (blsEditMode) {
            objFolder.uDocumentFolderId = objContext.state.objSelectedFolder["uDocumentFolderId"];
            objFolder.uParentDocumentFolderId = objContext.state.objSelectedFolder["uParentDocumentFolderId"];
            objFolderParams.vEditData = objFolder;
            objFolderParams.cIsAssignUsers = "N";
            this.EditFolder(objFolderParams);
        }
        else {
            objFolderParams.vAddData = objFolder;
            this.AddFolder(objContext, objFolderParams);
        }
    }

    /**
     * @name AddFolder
     * @summary calls Add document folder api.
     * @param {any} objFolderParams
     */
    AddFolder(objContext, objFolderParams) {
        ApplicationState.SetProperty("blnShowAnimation", true)
        Extranet_Teacher_TeacherDocumentFolder_Module.AddData(objFolderParams, (objResponse) => {
            ApplicationState.SetProperty("blnShowAnimation", false)
            let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
            var arrFolderData = DataRef(objContext.props.Extranet_Teacher_TeacherDocumentFolder_Module, "Extranet_Teacher_TeacherDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
            let objLatestFolder = objResponse[0];
            let objParentFolder = arrFolderData.find(objFol => objFol["uDocumentId"] == objLatestFolder["uParentDocumentFolderId"])
            let arrExistsExpandedFolders = ApplicationState.GetProperty("ExpandedNodes") ? ApplicationState.GetProperty("ExpandedNodes")["TeacherDocumentTree"] : [];
            if (objParentFolder) {
                //ApplicationState.SetProperty("ExpandedNodes", { "ExpandedNodes": { ["TeacherDocumentTree"]: [...arrExistsExpandedFolders, objParentFolder] } });
                let fnExpandTreeNodes = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["TeacherDocumentTree"] ? ApplicationState.GetProperty("ExpandTreeNodes")["TeacherDocumentTree"] : null;
                if (fnExpandTreeNodes) {
                    fnExpandTreeNodes([...arrExistsExpandedFolders, objParentFolder]);
                }
            }
            //ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["TeacherDocumentTree"]: objLatestFolder });
            let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["TeacherDocumentTree"] ? ApplicationState.GetProperty("SelectTreeNode")["TeacherDocumentTree"] : null;
            if (fnSelectTreeNode) {
                fnSelectTreeNode(objLatestFolder);
            }
        });
    }

    /**
     * @name EditFolder
     * @summary calls the Edit document folder api.
     * @param {any} objFolderParams
     */
    EditFolder(objFolderParams) {
        ApplicationState.SetProperty("blnShowAnimation", true)
        Extranet_Teacher_TeacherDocumentFolder_Module.EditData(objFolderParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
    }

    /**
     * @name MoveFolder
     * @summary sets the selected folder's uParentDocumentFolderId to objToFolder's uDocumentFolderId and calls edit folder api.
     * @param {any} objContext
     * @param {any} objToFolder
     */
    MoveFolder(objContext, objToFolder) {
        let objFromFolder = {
            ...objContext.state.objSelectedFolder,
            uParentDocumentFolderId: objToFolder["uDocumentFolderId"]
        };

        let objFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
            },
            "SearchQuery": {
                "should": [
                    {
                        "match": {
                            ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
                        }
                    }
                ]
            },
            "uUserId": objContext.props.ClientUserDetails.UserId,
            "vEditData": { ...objFromFolder },
            "cIsAssignUsers": "N"
        };
        this.EditFolder(objFolderParams)
    }

    /**
     * @name CopyFolder
     * @summary it calls the Copy or Move folder based on blnMove.
     * @param {any} objContext
     * @param {any} objToFolder
     * @param {any} objTextResource
     */
    CopyFolder(objContext, objToFolder, objTextResource) {
        let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
        let objFolderDetails = {
            uParentDocumentFolderId: objToFolder["uDocumentFolderId"],
            uSourceFolderId: objContext.state.objSelectedFolder["uDocumentFolderId"],
            uTargetFolderId: objToFolder["uDocumentFolderId"],
            vResourceText: Localization.TextFormatter(objTextResource, 'Copy'),
            uClassId: strClassId,
            uUserId: objContext.props.ClientUserDetails.UserId,
            cIsTeacher: 'Y',
            cIsPupil: 'N',
            cIsSchool: 'N',
            cIsSchoolForPupil: 'N',
            cIsSchoolForTeacher: 'N'
        };

        let objFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    }
                ]
            },
            "vAddData": { ...objFolderDetails }

        };
        ApplicationState.SetProperty("blnShowAnimation", true)
        Extranet_Teacher_TeacherDocumentFolder_Module.CopyPasteFolders(objFolderParams, (response) => {
            ApplicationState.SetProperty("blnShowAnimation", false)
            let strFolderEnityKey = "Extranet_Teacher_TeacherDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId;
            let strDocumentEnityKey = "Extranet_Teacher_TeacherDocument_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId;
            let objData = response["Object_Extranet_School_DocumentFolder"]["Data"][0]; // response will come from school base object dont change the key;

            let objFolderData = {
                Filter: strFolderEnityKey,
                Value: {
                    Data: objData["DocumentFolder"],
                    TimeStamp: "",
                    PrimaryKeyName: "uDocumentFolderId",
                    Count: objData["DocumentFolder"].length
                }
            };

            let objDocumentData = {
                Filter: strDocumentEnityKey,
                Value: {
                    Data: objData["Document"],
                    TimeStamp: "",
                    PrimaryKeyName: "uDocumentId",
                    Count: objData["Document"].length
                }
            };

            ArcadixCacheData.AddData("Extranet_Teacher_TeacherDocumentFolder_Module", objFolderData, () => {

            });
            ArcadixCacheData.AddData("Extranet_Teacher_TeacherDocument_Module", objDocumentData, () => {

            });
        })
    }

    /**
     * @name DeleteFolder
     * @summary sends the folder to delete
     * @param {any} objContext
     */
    DeleteFolder(objContext) {
        if (objContext.state.objSelectedFolder != undefined) {
            let objDelFol = {
                "uDocumentFolderId": objContext.state.objSelectedFolder["uDocumentFolderId"]
            }
            let objFolderParams = {
                "ForeignKeyFilter": {
                    "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                            }
                        }
                    ]
                },
                "uUserId": objContext.props.ClientUserDetails.UserId,
                "uSchoolId": objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId,
                "vDeleteData": objDelFol
            };

            objContext.dispatch({ type: 'SET_STATE', payload: { objSelFolder: undefined } });
            ApplicationState.SetProperty("blnShowAnimation", true)
            Extranet_Teacher_TeacherDocumentFolder_Module.DeleteData(objFolderParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false)
            });
        }
    }

    /**
     * @name DeleteData
     * @summary if strType folder calls DeleteFolder else DeleteDocument
     * @param {any} objContext
     * @param {any} strType
     * @param {any} objDocument
     */
    DeleteData(objContext, strType, objDocument) {
        if (strType == "Folder") {
            this.DeleteFolder(objContext)
        } else {
            this.DeleteDocument(objContext, objDocument)
        }
    }

    /**
     * @name AssignUsers
     * @summary assign the selected users to selected folder by calling folder edit api.
     * @param {any} objContext
     * @param {any} usersData
     */
    AssignUsers(objContext, usersData, blnReadOnly = false) {
        let arrAssignedUsers = usersData.map(u => {
            return {
                uUserId: u["uPupilId"],
                cIsPupil: "N",
                cIsTeacher: "Y",
                cIsSchool: "N",
            }
        })
        let objFolder = {
            "uDocumentFolderId": objContext.state.objSelectedFolder["uDocumentFolderId"],
            "cIsReadOnly": blnReadOnly ? "Y" : "N",
            "t_LearnCoacher_Document_Folder_User": arrAssignedUsers
        };

        let objFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    }
                ]
            },
            "vEditData": objFolder,
            "cIsAssignUsers": "Y"
        };
        ApplicationState.SetProperty("blnShowAnimation", true)
        Extranet_Teacher_TeacherDocumentFolder_Module.EditData(objFolderParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
    }

    /**
     * @name AddDocuments
     * @summary adds the documents.
     * @param {any} objContext
     * @param {any} arrUploadedFiles
     */
    AddDocuments(objContext, arrUploadedFiles) {
        let arrAddDocs = arrUploadedFiles.map(d => {
            return {
                uDocumentFolderId: objContext.state.objSelectedFolder["uDocumentFolderId"],
                uUserId: objContext.props.ClientUserDetails.UserId,
                cIsPupil: 'N',
                cIsTeacher: 'Y',
                vFileName: d.OriginalFileName,
                vFileType: d.ContentType,
                vFileId: d.FileName,
                iFileSizeInBytes: d.ContentLength,
                cIsSchool: 'N',
                uClassId: objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
            }
        })

        let objDocumentParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    }
                ],
                "should": [
                    {
                        "match": {
                            ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
                        }
                    }
                ]
            },
            "vAddData": arrAddDocs,
            "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
            "UserId": ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true)
        Extranet_Teacher_TeacherDocument_Module.AddData(objDocumentParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
    }

    /**
     * @name EditDocument
     * @summary if shared documents are viewed updating that has viewed.
     * @param {any} objContext
     * @param {any} objDocument
     */
    EditDocument(objContext, objDocument) {
        let uUserId = objContext.props.ClientUserDetails.UserId;
        let objViewed = objDocument.t_Learncoacher_Document_User.find(du => du.uUserId == uUserId)
        let strClassId = objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId;
        if (uUserId != objDocument["uUserId"] && (objViewed == undefined)) {
            let objEditData = {
                t_Learncoacher_Document_User: [{
                    uDocumentId: objDocument["uDocumentId"],
                    uUserId: uUserId,
                    cIsPupil: 'N',
                    cIsTeacher: 'Y',
                    cIsSchool: 'N',
                    uClassId: strClassId
                }]
            }

            let objDocumentParams = {
                "ForeignKeyFilter": {
                    "uClassId": strClassId
                },
                "SearchQuery": {
                    "must": [
                        {
                            "match": {
                                "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                            }
                        }
                    ]
                },
                "vEditData": objEditData,
                "uClassId": strClassId,
                "UserId": ClientUserDetails.UserId
            };
            ApplicationState.SetProperty("blnShowAnimation", true)
            Extranet_Teacher_TeacherDocument_Module.EditData(objDocumentParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false)
            });
        }
    }

    /**
     * @name DeleteDocument
     * @summary deletes the document
     * @param {any} objContext
     * @param {any} objDocument
     */
    DeleteDocument(objContext, objDocument) {
        let arrDocuments = [
            {
                "uDocumentId": objDocument["uDocumentId"]
            }
        ];

        let objDocumentParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass ? objContext.state.objSelectedClass["uClassId"] : objContext.state.strUserPreferenceClassId,
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    }
                ],
                "should": [
                    {
                        "match": {
                            "uSchoolId": objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId
                        }
                    }
                ]
            },
            "vDeleteData": arrDocuments
        };
        ApplicationState.SetProperty("blnShowAnimation", true)
        Extranet_Teacher_TeacherDocument_Module.DeleteData(objDocumentParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
    }

    /**
     * @name CopyOrMove
     * @summary if blnMove is true calls the MoveFolder method else CopyFolder method
     * @param {any} objContext
     * @param {any} objToFolder
     * @param {any} blnMove
     * @param {any} objTextResource
     */
    CopyOrMove(objContext, objToFolder, blnMove, objTextResource) {
        if (blnMove)
            this.MoveFolder(objContext, objToFolder)
        else
            this.CopyFolder(objContext, objToFolder, objTextResource);
    }

    /**
     * @name GetDefaultFolders
     * @summary returns the DefaultTeacher folder and root folder.
     * @param {any} objTextResource
     */
    GetDefaultFolders(objTextResource) {
        let objSchoolFolder = {
            uDocumentFolderId: "00000000-0000-0000-0000-000000000001",
            iMainClientId: 0,
            uClassId: "00000000-0000-0000-0000-000000000000",
            uUserId: "00000000-0000-0000-0000-000000000000",
            cIsTeacher: "N",
            cIsPupil: "N",
            cIsDeleted: "N",
            uParentDocumentFolderId: "00000000-0000-0000-0000-000000000000",
            vFolderName: Localization.TextFormatter(objTextResource, 'TeacherFolderName'),
            cIsSchool: "Y",
            cIsSchoolFolderForPupil: "N",
            cIsSchoolFolderForTeacher: "Y",
            dtCreatedOn: "",
            dtModifiedOn: "",
            Icon: "folder_brown.png",
            t_LearnCoacher_Document_Folder_User: []
        }

        let objRootFolder = {
            uDocumentFolderId: "00000000-0000-0000-0000-000000000000",
            iMainClientId: 0,
            uClassId: "00000000-0000-0000-0000-000000000000",
            uUserId: "00000000-0000-0000-0000-000000000000",
            cIsTeacher: "Y",
            cIsPupil: "N",
            cIsDeleted: "N",
            uParentDocumentFolderId: "00000000-0000-0000-0000-000000000000",
            vFolderName: Localization.TextFormatter(objTextResource, 'RootFolderName'),
            cIsSchool: "N",
            cIsSchoolFolderForPupil: "N",
            cIsSchoolFolderForTeacher: "N",
            dtCreatedOn: "",
            dtModifiedOn: "",
            Icon: "folder_brown.png",
            t_LearnCoacher_Document_Folder_User: []
        }

        if (this.IsExternalUser())
            return { objRootFolder };
        else {
            return { objSchoolFolder, objRootFolder };
        }
    }

    /**
     * @name GetClassDropDownData
     * @summary manipulates the class data for class dropdown.
     * @param {any} arrClassData
     * @param {any} objTextResource
     */
    GetClassDropDownData(objContext, arrClassData, objTextResource) {
        let arrMainClassData = [], arrCoTeacherClassData = [], arrSubjectExpertClassData = [];
        arrClassData = arrClassData ? arrClassData : [];
        objTextResource = objTextResource ? objTextResource : {};
        let strTeacherId = objContext.props.ClientUserDetails.UserId;
        arrClassData.forEach((objClass) => {
            let objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass["t_TestDrive_Member_Class_Teacher"].filter(objClassTeacher => { return objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N" }) };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrMainClassData = [...arrMainClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsCoTeacher === "Y") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrCoTeacherClassData = [...arrCoTeacherClassData, objTempClassData];
            }
            objTempClassData = { ...objClass, ["t_TestDrive_Member_Class_Teacher"]: objClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => objClassTeacher.uTeacherId == strTeacherId && objClassTeacher.cIsSubjectExpert === "Y") };
            if (objTempClassData["t_TestDrive_Member_Class_Teacher"].length > 0) {
                arrSubjectExpertClassData = [...arrSubjectExpertClassData, objTempClassData];
            }
        }
        );
        let arrFinalClassData = [
            {
                "Title": objTextResource.ClassTeacherTextForDropDown,
                "Data": arrMainClassData
            },
            {
                "Title": objTextResource.CoTeacherTextForDropDown,
                "Data": arrCoTeacherClassData
            },
            {
                "Title": objTextResource.SubjectExpertTeacherTextForDropDown,
                "Data": arrSubjectExpertClassData
            },
        ];
        return arrFinalClassData;
    }

    /**
     * @name ManipulateFolderData
     * @summary adds icon property to every folder object pushes the teacher folder to array.
     * @param {any} arrFolderData arrFolderData
     * @param {any} objTextResource objTextResource
     */
    ManipulateFolderData(arrFolderData, objTextResource) {
        if (arrFolderData) {
            //let arrFoldersWithIconName = arrFolderData.map(f => {
            //    return { ...f, Icon: "folder_brown.png" }
            //});
            let arrAllFolderData = [this.GetDefaultFolders(objTextResource).objSchoolFolder, ...arrFolderData.filter(f => f["cIsDeleted"] == "N")];
            return arrAllFolderData;
        } else {
            return [this.GetDefaultFolders(objTextResource).objSchoolFolder];
        }
    }

    /**
     * @name GetDataAfterSchoolYearChange
     * @summary loads the folder and document data after school year period change.
     * @param {any} objContext objContext
     */
    GetDataAfterSchoolYearChange(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrDataRequest = [];
        let objGetFoldersParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            "uUserId": objContext.props.ClientUserDetails.UserId,
            "uSchoolId": objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId,
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod["uSchoolYearPeriodId"]
        };

        Extranet_Teacher_TeacherDocumentFolder_Module.Initialize(objGetFoldersParams);
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_TeacherDocumentFolder_Module];
        let objGetDocumentParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId,
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    }
                ]
            },
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod["uSchoolYearPeriodId"]
        };
        Extranet_Teacher_TeacherDocument_Module.Initialize(objGetDocumentParams)
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_TeacherDocument_Module];
        (new ObjectQueue()).QueueAndExecute(arrDataRequest);
    }

    /**
     * @name GetTreeMetaData
     * @summary it returns the array of metadatas
     * @returns {object} MetaData
     */
    GetTreeMetaData() {
        let objMeta = {
            IdField: 'uDocumentFolderId',
            ParentIdField: 'uParentDocumentFolderId',
            TextField: 'vFolderName',
            RootNodeId: '00000000-0000-0000-0000-000000000000',
            SkinPath: JConfiguration.ExtranetSkinPath
        };
        return objMeta;
    }

    /**
     * @name GetTreeResourceData
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetTreeResourceData() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath,
            ImagePathDetails: { Folder: "Images/Framework/ReactJs/PC/Controls/Tree/folder_brown.png" }
        };
    }

    /**
    * @name GetTreeEvents
    * @param {object} objContext objContext
    * @summary Returns object that contains all the Event methods.
    * @return {object} object
    */
    GetTreeEvents(objContext) {
        return {
            OnSelectNode: (objFolder) => { objContext.TeacherDocument_ModuleProcessor.OnSelectFolder(objContext, objFolder); },
            OnDragAndDrop: () => { },
            OnExpandOrCollapse: () => { }
        };
    }

    /**
    * @name GetDocument
    * @summary Gets the document and document folder
    */
    GetDocument() {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");

        //Document
        let objDocumentsParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            ["uSchoolId"]: ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId,
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        };

        //Document Folder
        let objDocumentFoldersParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            "uUserId": ClientUserDetails.UserId,
            "uSchoolId": ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId,
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ],
            "OutputColumns": []
        };


        var arrDataRequest = [
            {
                "URL": "API/Extranet/Teacher/TeacherDocument_Module",
                "Params": objDocumentsParams,
                "MethodType": "Get",
                "UseFullName": true
            },
            {
                "URL": "API/Extranet/Teacher/TeacherDocumentFolder_Module",
                "Params": objDocumentFoldersParams,
                "MethodType": "Get",
                "UseFullName": true
            }
        ];

        ArcadixFetchData.Execute(arrDataRequest, function (objReturnData) {
            console.log("objReturnData ", objReturnData);
            let strDocumentFilter = "Extranet_Teacher_TeacherDocument_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId;
            let objDocumentReturn = {
                Filter: strDocumentFilter,
                Value: {
                    Data: objReturnData["Extranet_Teacher_TeacherDocument_Module"][strDocumentFilter]["Data"],
                    TimeStamp: "",
                    PrimaryKeyName: "uDocumentId",
                    Count: objReturnData["Extranet_Teacher_TeacherDocument_Module"][strDocumentFilter]["Data"].length
                }
            };
            ArcadixCacheData.EditData("Extranet_Teacher_TeacherDocument_Module", objDocumentReturn, () => { });

            let strDocumentFolderFilter = "Extranet_Teacher_TeacherDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId;
            let objDocumentFolderReturn = {
                Filter: strDocumentFolderFilter,
                Value: {
                    Data: objReturnData["Extranet_Teacher_TeacherDocumentFolder_Module"][strDocumentFolderFilter]["Data"],
                    TimeStamp: "",
                    PrimaryKeyName: "uDocumentFolderId",
                    Count: objReturnData["Extranet_Teacher_TeacherDocumentFolder_Module"][strDocumentFolderFilter]["Data"].length
                }
            };
            ArcadixCacheData.EditData("Extranet_Teacher_TeacherDocumentFolder_Module", objDocumentFolderReturn, () => { });
        });

    }

    /**
     * @name OnBeforeShowNode
     * @summary sets the folder icon
     * @param {any} objNode
     */
    OnBeforeShowNode(objNode) {
        if (objNode["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000001") {
            return {
                ...objNode,
                ImageType: "Folder",
                CustomIcon: 'school',
                FileExtension: ".svg"
            }
        } else if (objNode["t_LearnCoacher_Document_Folder_User"] && objNode["t_LearnCoacher_Document_Folder_User"].length > 0) {
            return {
                ...objNode,
                ImageType: "Folder",
                CustomIcon: 'shared',
                FileExtension: ".svg"
            }
        }
        return {
            ...objNode,
            ImageType: "Folder"
        }
    };

    /**
    * @name IsExternalUser
    * @returns {object} returns if the user is a keycloak user or normal user
    */
    IsExternalUser() {
        return global.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_ExternalSourceMapping.length > 0;
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"],
            "Files": [
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/folder_brown_teacher.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_teacher.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_teacher_expanded.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/folder_brown_pupil.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_pupil.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_pupil_expanded.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_pupil_expanded.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown.png",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_expanded.png",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_plus.png",
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/download_brown.png",
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/doc_eye.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_brown.png"
            ]
        }
    }

}

export default TeacherDocument_ModuleProcessor;