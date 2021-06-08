//Module object imports.
import Extranet_Pupil_PupilDocumentFolder_Module from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentFolder_Module';
import Extranet_Pupil_PupilDocument_Module from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocument_Module';
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Object_Cockpit_UserPreferenceProfileImage from '@shared/Object/c.Cockpit/UserPreference/UserPreferenceProfileImage/UserPreferenceProfileImage'
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name PupilDocument_ModuleProcessor
 * @summary module processor for pupil Document.
 * */
class PupilDocument_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilDocument",
            "Object_Extranet_Pupil_Pupil",
            "Extranet_Pupil_PupilDocumentFolder_Module",
            "Extranet_Pupil_PupilDocument_Module",
            "Object_Extranet_Teacher_SchoolYearPeriod",
            "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId",
            { "StoreKey": "ApplicationState", "DataKey": "RefreshDocumentData" },
            "Object_Extranet_Teacher_Class",
            "Object_Extranet_Teacher_Teacher",
            "Object_Extranet_School_School"
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
     * @name InitialDataParams
     * @summary returns initial load requests.
     * @param {any} props
     * @return {Array}
     */
    InitialDataParams(props) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");// props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");//props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
        let iStateId = this.GetStateId(props);
        let arrDataRequest = [];

        let arrTeacherId = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.map(objClassPupil => objClassPupil.uTeacherId);
        let arrSchoolId = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_School_Pupil.map(objClassPupil => objClassPupil.uSchoolId);

        //Text Resource
        let arrResourcePath = ["/d.Extranet/4_Pupil/Modules/PupilDocument"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //Document Folder
        let objGetFoldersParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            "uUserId": props.ClientUserDetails.UserId,
            "uSchoolId": strSchoolId,
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
        Extranet_Pupil_PupilDocumentFolder_Module.Initialize(objGetFoldersParams);
        arrDataRequest = [...arrDataRequest, Extranet_Pupil_PupilDocumentFolder_Module];

        //Document
        let objGetDocumentsParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            ["uSchoolId"]: strSchoolId,
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
        Extranet_Pupil_PupilDocument_Module.Initialize(objGetDocumentsParams);
        arrDataRequest = [...arrDataRequest, Extranet_Pupil_PupilDocument_Module];

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
                "must": [
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
            }
        };

        Object_Cockpit_UserPreferenceProfileImage.InitializeGetDataByClassId(objPupilProfileImages);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_UserPreferenceProfileImage];

        //Class
        let objClassParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uClassId": strClassId
                        }
                    }
                ]
            }
        };
        Object_Extranet_Teacher_Class.Initialize(objClassParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];

        //Teacher
        let objTeacherParams = {
            "SearchQuery": {
                "should": arrTeacherId.map(strTeacherId => {
                    return {
                        "match": {
                            "uTeacherId": strTeacherId
                        }
                    };
                })
            }
        };
        Object_Extranet_Teacher_Teacher.Initialize(objTeacherParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];

        //School
        let objSchoolParams = {
            "SearchQuery": {
                "should": arrSchoolId.map(strTeacherId => {
                    return {
                        "match": {
                            "uSchoolId": strTeacherId
                        }
                    };
                })
            }
        };
        Object_Extranet_School_School.Initialize(objSchoolParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_School];

        return arrDataRequest;
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilDocument/PupilDocument.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ErrorPopup/ErrorPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilDocument/PupilDocumentPopUp/UploadFilePopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilDocument/PupilDocumentPopUp/ShareFolderPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilDocument/PupilDocumentPopUp/CreateFolderPopUp.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilDocument/PupilDocumentPopUp/ErrorPoup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilDocument/PupilDocumentPopUp/DeleteFolderPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilDocument/PupilDocumentPopUp/CopyingFolderPopUp.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css"
        ];
    }

    /**
     * @name GetTeacherData
     * @summary gets teacher data.
     * @param {any} objContext
     */
    GetTeacherData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");// objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let objClass = this.GetPupilClass(objContext, strClassId);
        let arrShouldTeachers = objClass.t_TestDrive_Member_Class_Teacher.map(objTchr => {
            return {
                match: {
                    "uTeacherId": objTchr["uTeacherId"]
                }
            }
        })

        let objSearchParams = {

            ["SearchQuery"]: {
                "should": arrShouldTeachers
            }
        }
        Object_Extranet_Teacher_Teacher.GetData(objSearchParams);
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
                Error_Title: Localization.TextFormatter(objTextResource, 'CreateFolderErrorPopUpHeader')
            };
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "Width": 380,
                    "Height": "auto",
                    "HasCloseImage": "N",
                    "ShowHeader": true,
                },
                Resource: {
                    Text: objPopupTextResource,
                    SkinPath: JConfiguration.ExtranetSkinPath,
                    TextResourcesKey: "Error"
                },
                Events: {},
                CallBacks: {}
            });

        } else {
            Popup.ShowPopup({
                Data: {
                    strFolderName: blsEditMode ? objContext.state.objSelectedFolder["vFolderName"] : ''
                },
                Meta: {
                    PopupName: 'PupilCreateFolderPopUp',
                    ShowHeader: false,
                    ShowCloseIcon: false,
                    "Width": 480,
                    "Height": "auto"
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: JConfiguration.ExtranetSkinPath
                },
                Events: {
                    OnClickSave: (folderName) => { objContext.PupilDocument_ModuleProcessor.OnClickSaveFolder(objContext, folderName, blsEditMode) },
                },
                CallBacks: {}
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
                Height: "auto",
                Width: "auto",
            },
            Resource: {
                Text: objPopupTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "Delete"
            },
            Events: {
                ConfirmEvent: (objModal) => {
                    Popup.ClosePopup(objModal);
                    this.DeleteData(objContext, strType, objDocument)
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
            Data: {},
            Meta: {
                PopupName: 'UploadFilePopup',
                "Width": "auto",
                "Height": "auto",
            },
            Resource: {
                Text: objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
                OnClickSave: (arrUploadedFiles) => { this.AddDocuments(objContext, arrUploadedFiles); },
            },
            CallBacks: {}
        });
    }

    /**
     * @name OpenMoveCopyFolderPopup
     * @summary opens the copy folder popup.
     * @param {any} objContext
     * @param {any} objTextResource
     * @param {any} blnMove
     */
    OpenMoveCopyFolderPopup(objContext, objTextResource, blnMove) {
        let strClassId = objContext.state.strClassId;
        var arrFolderData = DataRef(objContext.props.Extranet_Pupil_PupilDocumentFolder_Module, "Extranet_Pupil_PupilDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
        let arrModifiedData = this.ManipulateFolderData(objContext, arrFolderData, objTextResource);
        let arrFilteredData = arrModifiedData.filter(f => !(f["uDocumentFolderId"] == objContext.state.objSelectedFolder["uDocumentFolderId"]))//&& !(f["uDocumentFolderId"] == state.objSelectedFolder["uParentDocumentFolderId"])

        Popup.ShowPopup({
            Data: {
                arrFolderData: arrFilteredData
            },
            Meta: {
                PopupName: 'CopyFolderPopUp',
                "Width": 480,
                "Height": "auto",
            },
            Resource: {
                Text: objTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
                GetTreeMetaData: this.GetTreeMetaData(),
                GetTreeResourceData: this.GetTreeResourceData(),
                OnClickSave: (objSelectedFolder) => { this.CopyOrMove(objContext, objSelectedFolder, blnMove, objTextResource) },
            },
            CallBacks: {}
        });
    }

    /**
   * @name GetPupilClass
   * @summary returns the class of pupil
   * @param {any} props
   * @returns {object}
   */
    GetPupilClass(objContext, strClassId) {
        return DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;uClassId;" + strClassId)["Data"][0];
    }

    /**
     * @name GetTeachersForShareFolderPopup
     * @summary returns the teachers of pupil by class.
     * @param {any} objContext
     */
    GetTeachersForShareFolderPopup(objContext, arrAllTeacherData) {
        let strClassId = objContext.state.strClassId;// objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let objClass = this.GetPupilClass(objContext, strClassId);
        // let arrAllTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"];
        let GetImagePath = (objTeacher) => {
            let strImagePath = objContext.props.JConfiguration.ExtranetSkinPath;
            if (objTeacher["cIsCoTeacher"] == "Y")
                return strImagePath += objTeacher.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/MainTeacher.svg"
            else if (objTeacher["cIsSubjectExpert"] == "Y")
                return strImagePath += objTeacher.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/SubjectExpert.svg"
            else return strImagePath += objTeacher.iGenderId === 0 ? "/Images/Background/profile1.png" : "/Images/Background/ClassTeacher.svg"
        }
        let arrTeacherByClass = objClass.t_TestDrive_Member_Class_Teacher.map(objTchr => {
            let objTeacherData = arrAllTeacherData.find(x => x["uTeacherId"] == objTchr["uTeacherId"])
            return {
                ...objTeacherData,
                vImagePath: GetImagePath(objTchr)
            }
        })

        return arrTeacherByClass;
    }

    /**
     * @name OpenAssignUserPopup
     * @summary opens the assign user popup.
     * @param {any} objContext objContext
     * @param {any} objTextResource objTextResource
     */
    OpenAssignUserPopup(objContext, objTextResource) {
        let strClassId = objContext.state.strClassId;
        let iStateId = this.GetStateId(objContext.props);
        let arrPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"];
        let arrUserPreferenceImages = DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId, "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId;uClassId;" + strClassId)["Data"]
        let arrPupilWithImage = arrPupilData.map(objUserData => {
            return {
                ...objUserData,
                vImagePath: JConfiguration.WebDataPath + arrUserPreferenceImages.find(objImg => objImg["uPupilId"] == objUserData["uPupilId"])["vImagePath"]
            }
        })
        let arrAllTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher")["Data"];
        if (arrAllTeacherData) {
            let arrTeacherData = this.GetTeachersForShareFolderPopup(objContext, arrAllTeacherData);
            let arrUserData = [...arrPupilWithImage, ...arrTeacherData]
            Popup.ShowPopup({
                Data: {
                    arrUserData: arrUserData,
                    arrSelectedList: objContext.state.objSelectedFolder ? objContext.state.objSelectedFolder["t_LearnCoacher_Document_Folder_User"] : [],
                    arrUserPreferenceImages: arrUserPreferenceImages,
                    strUserId: objContext.props.ClientUserDetails.UserId
                },
                Meta: {
                    PopupName: 'ShareFolderPopup',
                    Height: "auto",
                    Width: "480px"
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: JConfiguration.ExtranetSkinPath
                },
                Events: {
                    OnClickAssign: (usersData) => { this.AssignUsers(objContext, usersData) }
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name OnClickOutSideTree
     * @summary on click of outside the tree need to 
     * @param {any} objContext
     */
    OnClickOutSideTree(objContext, domTreeRef) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objSelectedFolder: undefined } })
        ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["PupilDocumentTree"]: {} });
        domTreeRef.current.UpdateState();
    }

    /**
     * @name OnSelectFolder
     * @summary updates the state by selected folder and validations for folder
     * @param {any} objContext objContext
     * @param {any} objFolder objFolder
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
            let strClassId = objContext.state.strClassId;
            let arrDocumentAllData = DataRef(objContext.props.Extranet_Pupil_PupilDocument_Module, "Extranet_Pupil_PupilDocument_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
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

        if (objFolder["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000016" || objFolder["cIsSchoolFolderForPupil"] == "Y") {
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
            uClassId: objContext.state.strClassId,
            uUserId: objContext.props.ClientUserDetails.UserId,
            cIsTeacher: 'N',
            cIsPupil: "Y",
            cIsDeleted: "N",
            uParentDocumentFolderId: objContext.state.objSelectedFolder ? objContext.state.objSelectedFolder["uDocumentFolderId"] : "00000000-0000-0000-0000-000000000000",
            vFolderName: folderName,
            cIsSchool: "N",
            cIsSchoolFolderForPupil: "N",
            cIsSchoolFolderForTeacher: "N"
        };

        let objFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.strClassId,
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
            "uClassId": objContext.state.strClassId,
            "UserId": objContext.props.ClientUserDetails.UserId
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
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Pupil_PupilDocumentFolder_Module.AddData(objFolderParams, (objResponse) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            var arrFolderData = DataRef(objContext.props.Extranet_Pupil_PupilDocumentFolder_Module, "Extranet_Pupil_PupilDocumentFolder_Module;uClassId;" + objContext.state.strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
            let objLatestFolder = objResponse[0];
            let objParentFolder = arrFolderData.find(objFol => objFol["uDocumentId"] == objLatestFolder["uParentDocumentFolderId"])
            let arrExistsExpandedFolders = [];
            if (objParentFolder)
                arrExistsExpandedFolders = ApplicationState.GetProperty("ExpandedNodes") ? ApplicationState.GetProperty("ExpandedNodes")["PupilDocumentTree"] : [];
            //ApplicationState.SetProperty("ExpandedNodes", { "ExpandedNodes": { ["PupilDocumentTree"]: [...arrExistsExpandedFolders, objParentFolder] } });
            let fnExpandTreeNodes = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["PupilDocumentTree"] ? ApplicationState.GetProperty("ExpandTreeNodes")["PupilDocumentTree"] : null;
            if (fnExpandTreeNodes && objParentFolder) {
                fnExpandTreeNodes([...arrExistsExpandedFolders, objParentFolder]);
            }
            ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["PupilDocumentTree"]: objLatestFolder });
            let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["PupilDocumentTree"] ? ApplicationState.GetProperty("SelectTreeNode")["PupilDocumentTree"] : null;
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
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Pupil_PupilDocumentFolder_Module.EditData(objFolderParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
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
                "uClassId": objContext.state.strClassId,
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
        let strClassId = objContext.state.strClassId;
        let objFolderDetails = {
            uParentDocumentFolderId: objToFolder["uDocumentFolderId"],
            uSourceFolderId: objContext.state.objSelectedFolder["uDocumentFolderId"],
            uTargetFolderId: objToFolder["uDocumentFolderId"],
            vResourceText: "Copy",//Localization.TextFormatter(objTextResource, 'Copy'),
            uClassId: strClassId,
            uUserId: objContext.props.ClientUserDetails.UserId,
            cIsTeacher: 'N',
            cIsPupil: 'Y',
            cIsSchool: 'N',
            cIsSchoolForPupil: 'N',
            cIsSchoolForTeacher: 'N'
        };

        let objFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.strClassId,
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
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Pupil_PupilDocumentFolder_Module.CopyPasteFolders(objFolderParams, (response) => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            let strFolderEnityKey = "Extranet_Pupil_PupilDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId;
            let strDocumentEnityKey = "Extranet_Pupil_PupilDocument_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId;
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

            ArcadixCacheData.AddData("Extranet_Pupil_PupilDocumentFolder_Module", objFolderData, () => {

            });
            ArcadixCacheData.AddData("Extranet_Pupil_PupilDocument_Module", objDocumentData, () => {

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
                    "uClassId": objContext.state.strClassId
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
                "vDeleteData": objDelFol
            };

            objContext.dispatch({ type: 'SET_STATE', payload: { objSelFolder: undefined } });
            ApplicationState.SetProperty("blnShowAnimation", true);
            Extranet_Pupil_PupilDocumentFolder_Module.DeleteData(objFolderParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false);
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
    AssignUsers(objContext, usersData) {
        let arrAssignedUsers = usersData.map(u => {
            return {
                uUserId: u["uPupilId"] || u["uTeacherId"],
                cIsPupil: "Y",
                cIsTeacher: "N",
                cIsSchool: "N"
            }
        })
        let objFolder = {
            "uDocumentFolderId": objContext.state.objSelectedFolder["uDocumentFolderId"],
            "t_LearnCoacher_Document_Folder_User": arrAssignedUsers
        };

        let objFolderParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.strClassId,
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
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Pupil_PupilDocumentFolder_Module.EditData(objFolderParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
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
                cIsPupil: 'Y',
                cIsTeacher: 'N',
                vFileName: d.OriginalFileName,
                vFileType: d.ContentType,
                vFileId: d.FileName,
                iFileSizeInBytes: d.ContentLength,
                cIsSchool: 'N',
                uClassId: objContext.state.strClassId,
            }
        })

        let objDocumentParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.strClassId,
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
                            ["uSchoolId"]: ApplicationState.GetProperty("SelectedSchoolId")//objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId
                        }
                    }
                ]
            },
            "vAddData": arrAddDocs,
            "uClassId": objContext.state.strClassId,
            "UserId": objContext.props.ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Pupil_PupilDocument_Module.AddData(objDocumentParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
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
        let strClassId = objContext.state.strClassId;
        if (uUserId != objDocument["uUserId"] && (objViewed == undefined)) {
            let objEditData = {
                t_Learncoacher_Document_User: [{
                    uDocumentId: objDocument["uDocumentId"],
                    uUserId: uUserId,
                    cIsPupil: 'Y',
                    cIsTeacher: 'N',
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
                "UserId": objContext.props.ClientUserDetails.UserId
            };
            ApplicationState.SetProperty("blnShowAnimation", true);
            Extranet_Pupil_PupilDocument_Module.EditData(objDocumentParams, () => {
                ApplicationState.SetProperty("blnShowAnimation", false);
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
                "uClassId": objContext.state.strClassId,
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
            "vDeleteData": arrDocuments
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Pupil_PupilDocument_Module.DeleteData(objDocumentParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
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
     * @summary returns the DefaultPupil folder and root folder.
     * @param {any} objTextResource
     */
    GetDefaultFolders(objContext, objTextResource) {
        let objSchoolFolder = {
            uDocumentFolderId: "00000000-0000-0000-0000-000000000016",
            iMainClientId: 0,
            uClassId: "00000000-0000-0000-0000-000000000000",
            uUserId: "00000000-0000-0000-0000-000000000000",
            cIsTeacher: "N",
            cIsPupil: "N",
            cIsDeleted: "N",
            uParentDocumentFolderId: "00000000-0000-0000-0000-000000000000",
            vFolderName: Localization.TextFormatter(objTextResource, 'PupilFolderName'),
            cIsSchool: "Y",
            cIsSchoolFolderForPupil: "Y",
            cIsSchoolFolderForTeacher: "N",
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
            cIsTeacher: "N",
            cIsPupil: "Y",
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

        if (this.IsExternalUser(objContext))
            return { objRootFolder };
        else {

            return { objSchoolFolder, objRootFolder };
        }
    }

    /**
     * @name ManipulateFolderData
     * @summary adds icon property to every folder object pushes the pupil folder to array.
     * @param {any} arrFolderData
     * @param {any} objTextResource
     */
    ManipulateFolderData(objContext, arrFolderData, objTextResource) {
        if (arrFolderData) {
            //let arrFoldersWithIconName = arrFolderData.map(f => {
            //    return { ...f, Icon: "folder_brown.png" }
            //});
            let arrAllFolderData = [this.GetDefaultFolders(objContext, objTextResource).objSchoolFolder, ...arrFolderData.filter(f => f["cIsDeleted"] == "N")];
            return arrAllFolderData;
        } else {
            return [this.GetDefaultFolders(objContext, objTextResource).objSchoolFolder];
        }
    }

    /**
     * @name GetDataAfterSchoolYearChange
     * @summary loads the folder and document data after school year period change.
     * @param {any} objContext objContext
     */
    GetDataAfterSchoolYearChange(objContext) {
        let strClassId = objContext.state.strClassId;
        let strSchoolId = objContext.state.strSchoolId;//objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
        let arrDataRequest = [];
        let objGetFoldersParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            "uUserId": objContext.props.ClientUserDetails.UserId,
            "uSchoolId": strSchoolId,
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

        Extranet_Pupil_PupilDocumentFolder_Module.Initialize(objGetFoldersParams);
        arrDataRequest = [...arrDataRequest, Extranet_Pupil_PupilDocumentFolder_Module];
        let objGetDocumentParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            ["uSchoolId"]: strSchoolId,
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
        Extranet_Pupil_PupilDocument_Module.Initialize(objGetDocumentParams)
        arrDataRequest = [...arrDataRequest, Extranet_Pupil_PupilDocument_Module];
        ApplicationState.SetProperty("blnShowAnimation", true);
        (new ObjectQueue()).QueueAndExecute(arrDataRequest, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
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
     * @name GetTreeEvents
     * @param {object} objContext objContext
     * @summary Returns object that contains all the Event methods.
     * @return {object} object
     */
    GetTreeEvents(objContext) {
        return {
            OnSelectNode: (objFolder) => { objContext.PupilDocument_ModuleProcessor.OnSelectFolder(objContext, objFolder) },
            OnDragAndDrop: () => { },
            OnExpandOrCollapse: () => { }
        };
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
    * @name GetMetaDataSchoolYearPeriodDropdown
    * @summary It returns the object metadata
    * @returns {object} MetaData
    */
    GetMetaDataSchoolYearPeriodDropdown() {
        return {
            DisplayColumn: "vSchoolYearName",
            ValueColumn: "uSchoolYearPeriodId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Member_Class_SchoolYearPeriod_Data"
        };
    }

    /**
     * @name GetResourceDataSchoolYearPeriodDropdown
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceDataSchoolYearPeriodDropdown() {
        let SkinPath = JConfiguration.ExtranetSkinPath;
        return {
            SkinPath,
            ImagePath: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/angle_down_white.svg"
        };
    }

    /**
     * @name GetEventsDataSchoolYearPeriodDropdown
     * @param {object} objContext Context object
     * @summary Returns object that contains all the Event methods.
     * @return {object} objEventBasics
    */
    GetEventsDataSchoolYearPeriodDropdown(objContext) {
        return {
            OnChangeEventHandler: (objItem) => objContext.PupilDocument_ModuleProcessor.OnChangeSchoolYearPeriodDropdown(objContext, objItem)
        };
    }

    /**
    * @name GetDocument
    * @summary Gets the document and document folder
    */
    GetDocument() {
        let strClassId = objContext.state.strClassId;//ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let strSchoolId = objContext.state.strSchoolId;//ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;

        //Document
        let objDocumentsParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
            },
            "uSchoolId": strSchoolId,
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
            "uSchoolId": strSchoolId,
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        };


        var arrDataRequest = [
            {
                "URL": "API/Extranet/Pupil/PupilDocument_Module",
                "Params": objDocumentsParams,
                "MethodType": "Get",
                "UseFullName": true
            },
            {
                "URL": "API/Extranet/Pupil/PupilDocumentFolder_Module",
                "Params": objDocumentFoldersParams,
                "MethodType": "Get",
                "UseFullName": true
            }
        ];

        ArcadixFetchData.Execute(arrDataRequest, function (objReturnData) {
            console.log("objReturnData ", objReturnData);
            let strDocumentFilter = "Extranet_Pupil_PupilDocument_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId;
            let objDocumentReturn = {
                Filter: strDocumentFilter,
                Value: {
                    Data: objReturnData["Extranet_Pupil_PupilDocument_Module"][strDocumentFilter]["Data"],
                    TimeStamp: "",
                    PrimaryKeyName: "uDocumentId",
                    Count: objReturnData["Extranet_Pupil_PupilDocument_Module"][strDocumentFilter]["Data"].length
                }
            };
            ArcadixCacheData.EditData("Extranet_Pupil_PupilDocument_Module", objDocumentReturn, () => { });

            let strDocumentFolderFilter = "Extranet_Pupil_PupilDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId;
            let objDocumentFolderReturn = {
                Filter: strDocumentFolderFilter,
                Value: {
                    Data: objReturnData["Extranet_Pupil_PupilDocumentFolder_Module"][strDocumentFolderFilter]["Data"],
                    TimeStamp: "",
                    PrimaryKeyName: "uDocumentFolderId",
                    Count: objReturnData["Extranet_Pupil_PupilDocumentFolder_Module"][strDocumentFolderFilter]["Data"].length
                }
            };
            ArcadixCacheData.EditData("Extranet_Pupil_PupilDocumentFolder_Module", objDocumentFolderReturn, () => { });
        });

    }

    /**
     * @name OnBeforeShowNode
     * @summary sets the folder icon
     * @param {any} objNode
     */
    OnBeforeShowNode(objNode) {
        if (objNode["uDocumentFolderId"] == "00000000-0000-0000-0000-000000000016") {
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
     * @name GetAuthorName
     * @summary Gets the author name of folder.
     * @param {any} objContext
     */
    GetAuthorName(objContext) {
        let strAuthorName = "";
        let strClassId = objContext.state.strClassId;// objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let arrTeacher = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher").Data;
        let arrSchool = DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School").Data;
        let iStateId = this.GetStateId(objContext.props);
        let arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        if (objContext.state.objSelectedFolder) {
            let strFolderCreatorId = objContext.state.objSelectedFolder.uUserId;
            let blnIsSchool = objContext.state.objSelectedFolder.cIsSchool == "Y";
            let blnIsTeacher = objContext.state.objSelectedFolder.cIsTeacher == "Y";
            if (blnIsSchool) {
                arrSchool.map(objSchool => {
                    if (objSchool["uSchoolId"] == strFolderCreatorId)
                        strAuthorName = objSchool["vSchoolName"];
                });
            } else if (blnIsTeacher) {
                arrTeacher.map(objTeacher => {
                    if (objTeacher["uTeacherId"] == strFolderCreatorId)
                        strAuthorName = objTeacher["vName"];
                });
            } else { //cIsPupil == "Y"
                arrPupil.map(objPupil => {
                    if (objPupil["uPupilId"] == strFolderCreatorId)
                        strAuthorName = objPupil["vName"];
                });
            }
        }

        return strAuthorName;
    }

    /**
    * @name IsExternalUser
    * @returns {object} returns if the user is a keycloak user or normal user
    */
    IsExternalUser(objContext) {
        return objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Pupil_ExternalSourceMapping.length > 0;
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown", "Tree"],
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
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_brown.png",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_school.svg",
                props.JConfiguration.ExtranetSkinPath + "/Images/Framework/ReactJs/PC/Controls/Tree/folder_brown_shared.svg",
            ]
        }
    }

    /**
     * @name GetStateId
     * @summary returns the iStateId
     * @param {any} props
     */
    GetStateId(props) {
        return props["ClientUserDetails"]["PupilDetails"]["t_TestDrive_Member_School_Pupil"][0]["iStateId"]
    }
}

export default PupilDocument_ModuleProcessor;