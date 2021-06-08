//Module object imports.
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Extranet_Pupil_PupilNews_Module from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNews_Module';
import Object_Extranet_School_NewsGroup from '@shared/Object/d.Extranet/2_School/News/NewsGroup/NewsGroup';
import Object_Cockpit_UserPreferenceProfileImage from '@shared/Object/c.Cockpit/UserPreference/UserPreferenceProfileImage/UserPreferenceProfileImage';


/**
 * @name PupilNews_ModuleProcessor
 * @summary module processor for Teacher Document.
 * */
class PupilNews_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilNews",
            "Object_Extranet_School_School",
            "Object_Extranet_Teacher_Teacher",
            "Object_Extranet_Teacher_SchoolYearPeriod",
            "Object_Extranet_Teacher_Class",
            "Object_Extranet_Pupil_Pupil",
            "Extranet_Pupil_PupilNews_Module",
            "Object_Extranet_School_NewsGroup",
            "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId",
            { "StoreKey": "ApplicationState", "DataKey": "RefreshNewsData" }
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

        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");// props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
        let iStateId = this.GetStateId(props);
        let arrDataRequest = [];
        let objClass = this.GetPupilClass(props);

        //Text Resource
        let arrResourcePath = ["/d.Extranet/4_Pupil/Modules/PupilNews"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //school
        let objSchoolParams = {
            "ForeignKeyFilter": {},
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolId": strSchoolId
                        }
                    }]
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


        //Class
        let objClassParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uClassId": objClass.uClassId
                        }
                    }
                ]
            }
        };
        Object_Extranet_Teacher_Class.Initialize(objClassParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];


        //pupil
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": objClass.uClassId,
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
            }
        };
        Object_Extranet_Pupil_Pupil.Initialize(objPupilParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Pupil];

        //News
        let objNewsParams = {
            "ForeignKeyFilter": {
                ["uClassId"]: objClass.uClassId
            },
            ["uClassId"]: objClass.uClassId,
            ["uSchoolId"]: strSchoolId,
            ["SearchText"]: "",
            ["uPupilId"]: props.ClientUserDetails.UserId,
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
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
        Extranet_Pupil_PupilNews_Module.Initialize(objNewsParams);
        arrDataRequest = [...arrDataRequest, Extranet_Pupil_PupilNews_Module];

        //News Group
        let objGroupParams = {
            "ForeignKeyFilter": {
                "uClassId": objClass.uClassId
            },
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
        Object_Extranet_School_NewsGroup.Initialize(objGroupParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_NewsGroup];

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
                "uClassId": objClass.uClassId
            },
            "SearchQuery": {
            }
        };

        Object_Cockpit_UserPreferenceProfileImage.InitializeGetDataByClassId(objPupilProfileImages);
        arrDataRequest = [...arrDataRequest, Object_Cockpit_UserPreferenceProfileImage];
        return arrDataRequest;
    }

    /**
   * @name GetDynamicStlyes
   * @param {object} props props
   * @returns {object} DynamicStlyes
   */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilNews/PupilNews.css",
            JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ErrorPopup/ErrorPopup.css",
            JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css",
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilNews/PupilAddContactPopup.css",
            JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilNews/PupilShareNewsPopup.css",
            JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css"
        ];
    }

    /**
     * @name GetPupilClass
     * @summary returns the class of pupil
     * @param {any} props
     * @returns {object}
     */
    GetPupilClass(props) {
        var objClass = {};
        let strSelectedClassId = ApplicationState.GetProperty("SelectedClassId");
        let arrFilteredClass = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil
            .filter(x => x["uClassId"] == strSelectedClassId);
        if (arrFilteredClass.length > 0) {
            objClass = arrFilteredClass[0];
        }
        return objClass;
    }

    /**
     * @name GetFormatDate
     * @summary date in specific format
     * @param {any} objContext
     * @param {any} strDate
     * @returns {string}
     */
    GetFormatDate(objContext, strDate) {
        var objDate = new Date(strDate);
        var strFormatDate = objDate.toLocaleDateString(objContext.props.JConfiguration.LanguageCultureInfo);// + " " + objDate.getHours() + ":" + objDate.getMinutes();
        return strFormatDate;
    }

    /**
     * @name GetMainTeacher
     * @summary returns the main teacher of selected class.
     * @param {any} objContext
     * @returns {Object}
     */
    GetMainTeacher(objContext) {
        return objContext.state.objSelectedClass ? objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher.find(objClassTeacher => {
            return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N"
        }) : undefined;
    }

    /**
     * @name GetCoTeachers
     * @summary returns the co teachers of selected class.
     * @param {any} objContext
     * @returns {Array}
     */
    GetCoTeachers(objContext) {
        return objContext.state.objSelectedClass ? objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => {
            return objClassTeacher.cIsCoTeacher === "Y" && objClassTeacher.cIsSubjectExpert === "N"
        }) : [];
    }

    /**
     * @name GetCoTeachers
     * @summary returns the subject experts of selected class.
     * @param {any} objContext
     * @returns {Array}
     */
    GetSubjectExperts(objContext) {
        return objContext.state.objSelectedClass ? objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => {
            return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "Y"
        }) : [];
    }

    /**
     * @name GetTeachersLastMessage
     * @summary returns the last message of teacher by teacher id.
     * @param {any} objContext
     * @param {any} strTeacherId
     */
    GetTeachersLastMessage(objContext, strTeacherId) {
        let arrNewsData = DataRef(objContext.props.Extranet_Pupil_PupilNews_Module, "Extranet_Pupil_PupilNews_Module;uClassId;" + objContext.state.objSelectedClass.uClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N")["Data"];
        if (arrNewsData) {
            return arrNewsData.filter(item => {
                return item.uUserId == strTeacherId || (item.t_LearnCoacher_News_ToUser.find(usr => usr.uUserId == strTeacherId));
            }).sort((a, b) => new Date(b.dtCreatedOn) - new Date(a.dtCreatedOn))[0];
        } else
            return undefined;
    };

    /**
     * @name GetTeacherName
     * @summary Teacher name by teacher id.
     * @param {any} objContext
     * @param {any} strTeacherId
     */
    GetTeacherName(objContext, strTeacherId) {
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");
        let arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId)["Data"]
        let objTeacher = arrTeacherData.find(item => { return item.uTeacherId === strTeacherId });
        return objTeacher.vFirstName + " " + objTeacher.vName;
    };

    /**
     * @name GetGroup
     * @summary Returns the group by GroupId
     * @param {any} objContext
     */
    GetGroup(objContext) {
        let arrNewsGroupData = DataRef(objContext.props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + objContext.state.objSelectedClass.uClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
        let objGroup = {};
        if (arrNewsGroupData && arrNewsGroupData.length > 0) {
            objGroup = arrNewsGroupData.find(item => { return item.uNewsGroupId === objContext.state.strSelectedId });
        }
        return objGroup;
    };

    /**
     * @name GetPupilObject
     * @summary Gets the pupil object by PupilId
     * @param {any} objContext
     * @param {any} strSelectedId
     */
    GetPupilObject(objContext, strSelectedId) {
        let iStateId = this.GetStateId(objContext.props);
        let arrPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + objContext.state.objSelectedClass.uClassId + ";iStateId;" + iStateId)["Data"];
        return arrPupilData.find(ppl => ppl["uPupilId"] == strSelectedId);
    }

    /**
     * @name MessageTextChangeHandler
     * @summary updates the message text to state
     * @param {any} objContext
     * @param {any} strMessageText
     */
    MessageTextChangeHandler(objContext, strMessageText) {
        objContext.dispatch({ type: 'SET_STATE', payload: { strMessagetext: strMessageText, blnShowEmptyTextValidationMessage: false } });
    }

    /**
     * 
     * @param {any} objContext
     * @param {any} strTeacherOrPupil
     */
    SelectTeacherOrPupil(objContext, strTeacherOrPupil) {
        objContext.dispatch({ type: 'SelectTeacherOrPupil', payload: strTeacherOrPupil });
    }

    /**
     * @name SendMessage
     * @summary save new News
     * @param {any} objContext
     * @param {any} strAttachmentArray
     */
    SendMessage(objContext, strAttachmentArray) {
        var strMessagetext = objContext.state.strMessagetext;
        var arrAttachMents = JSON.parse(strAttachmentArray);
        var intDispalyOrder = 0;
        var arrAttachMentDataParams = [];
        arrAttachMents.map(objAttachment => {
            intDispalyOrder++;
            var objAttachmentParams = {
                ["uUserId"]: objContext.props.ClientUserDetails.UserId,
                ["vAttachmentFileName"]: objAttachment.OriginalFileName,
                ["iFileSizeInBytes"]: objAttachment.ContentLength,
                ["vFileType"]: objAttachment.OriginalFileName.split('.')[1],
                ["iDisplayOrder"]: intDispalyOrder,
                ["vFileId"]: objAttachment.FileName
            };
            arrAttachMentDataParams = [...arrAttachMentDataParams, objAttachmentParams];
        })
        var blnIsTeacher = (objContext.state.strType === "teacher" || objContext.state.strType === "coteacher" || objContext.state.strType === "subjectexpert") ? true : false;
        var objNewsAddToAdd = {
            ["vText"]: strMessagetext,
            ["cIsTeacher"]: "N",
            ["cIsSchool"]: "N",
            ["cIsPupil"]: "Y",
            ["uClassId"]: objContext.state.objSelectedClass.uClassId,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId,
            ["uOriginalNewsItemId"]: "00000000-0000-0000-0000-000000000000",
            ["uParentNewsItemId"]: "00000000-0000-0000-0000-000000000000",
            ["t_LearnCoacher_News_ToUser"]: [
                {
                    ["uGroupId"]: objContext.state.strType === "group" ? objContext.state.strSelectedId : "00000000-0000-0000-0000-000000000000",
                    ["uUserId"]: objContext.state.strSelectedId,
                    ["cIsSchool"]: "N",
                    ["cIsPupil"]: objContext.state.strType === "pupil" ? "Y" : "N",
                    ["cIsTeacher"]: blnIsTeacher ? "Y" : "N",
                    ["cIsForGroup"]: objContext.state.strType === "group" ? "Y" : "N",
                    ["cHasBeenViewed"]: "N",
                    ["cIsDeleted"]: "N"
                }

            ],
            ["t_LearnCoacher_News_Attachment"]: arrAttachMentDataParams
        };
        let objMethodParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass.uClassId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "vAddData": objNewsAddToAdd,
            "uClassId": objContext.state.objSelectedClass.uClassId,
            "UserId": ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Pupil_PupilNews_Module.AddData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });

        objContext.dispatch({ type: 'SET_STATE', payload: { strMessagetext: "", blnFileReload: true, strReloadToggle: objContext.state.strReloadToggle === "toggle1" ? "toggle2" : "toggle1" } });

    }

    /**
     * @name DeleteMessage
     * @summary Deletes Message
     * @param {any} objContext
     * @param {any} objNews
     */
    DeleteMessage(objContext, objNews) {
        let objMethodParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass.uClassId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "vDeleteData": objNews
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Pupil_PupilNews_Module.DeleteData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name OnChangeSchoolYearPeriodDropdown
     * @summary Sets selected school year period to state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
        if (objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId != objItem.uSchoolYearPeriodId) {
            let blnCurrentSchoolYearPeriod = false;
            ApplicationState.SetProperty("blnShowAnimation", true);
            if (new Date() > new Date(objItem["dtFromDate"]) && new Date() < new Date(objItem["dtToDate"])) {
                blnCurrentSchoolYearPeriod = true;
            }
            objContext.dispatch({ type: "SET_STATE", payload: { objSchoolYearPeriod: objItem, blnCurrentSchoolYearPeriod: blnCurrentSchoolYearPeriod } })
        }
    }

    /**
     * @name GetNewsData
     * @summary gets the data after school year period change.
     * @param {any} objContext
     */
    GetNewsData(objContext) {
        let objClass = this.GetPupilClass(objContext.props);
        let arrDataRequest = [];
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");
        //News
        let objNewsParams = {
            "ForeignKeyFilter": {
                ["uClassId"]: objClass.uClassId
            },
            "uClassId": objClass.uClassId,
            "uSchoolId": strSchoolId,
            "uPupilId": objContext.props.ClientUserDetails.UserId,
            "SearchText": "",
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod["uSchoolYearPeriodId"]
        };
        Extranet_Pupil_PupilNews_Module.Initialize(objNewsParams);
        arrDataRequest = [...arrDataRequest, Extranet_Pupil_PupilNews_Module];

        //News Group
        let objGroupParams = {
            "ForeignKeyFilter": {
                "uClassId": objClass.uClassId
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
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_School_NewsGroup.Initialize(objGroupParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_NewsGroup];

        (new ObjectQueue()).QueueAndExecute(arrDataRequest);
    }

    /**
     * @name GetDataAfterClassChange
     * @summary loads the news data after class change.
     * @param {any} objContext
     */
    GetDataAfterClassChange(objContext) {

        let strClassId = objContext.state.objSelectedClass.uClassId;
        let iStateId = this.GetStateId(objContext.props);
        let arrDataRequest = [];
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
            }
        };
        Object_Extranet_Pupil_Pupil.Initialize(objPupilParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Pupil_Pupil];
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");
        //News
        let objNewsParams = {
            "ForeignKeyFilter": {
                ["uClassId"]: strClassId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            ["uClassId"]: strClassId,
            ["uSchoolId"]: strSchoolId,
            ["SearchText"]: "",
            ["uTeacherId"]: objContext.props.ClientUserDetails.UserId
        };
        Extranet_Pupil_PupilNews_Module.Initialize(objNewsParams);
        arrDataRequest = [...arrDataRequest, Extranet_Pupil_PupilNews_Module];

        //News Group
        let objGroupParams = {
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
            "SortKeys": [
                {
                    "dtCreatedOn": {
                        "order": "asc"
                    }
                }
            ]
        };
        Object_Extranet_School_NewsGroup.Initialize(objGroupParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_NewsGroup];
        let objQueue = new ObjectQueue();
        //objQueue.InitializeCustomRequests(arrCustomRequest);
        objQueue.QueueAndExecute(arrDataRequest);
    }

    /**
     * @name GetDataForGroupPopup
     * @summary returns the required data in object for group popup.
     * @param {any} objContext
     */
    GetDataForGroupPopup(objContext, blnForForward = false) {
        let strClassId = objContext.state.objSelectedClass.uClassId;
        let iStateId = this.GetStateId(objContext.props);
        let arrPupil = [];
        if (!blnForForward || !(objContext.state.objSelectedClass.cIsNewsEnabled && objContext.state.objSelectedClass.cIsNewsEnabled == 'N')) {
            arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"]
            arrPupil = arrPupil.filter(x => x["uPupilId"] != ClientUserDetails.UserId);
        }

        var objGroupPopupData = {
            arrPupilData: [...arrPupil],
            objGroupData: DataRef(objContext.props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"].find(item => { return item.uNewsGroupId === objContext.state.strSelectedId }),
            arrGroupData: DataRef(objContext.props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"],
            objTextResource: Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilNews", objContext.props),
            JConfiguration: objContext.props.JConfiguration,
            ClientUserDetails: objContext.props.ClientUserDetails,
            arrCoTeachers: this.GetCoTeachers(objContext),
            arrSubjectExperts: this.GetSubjectExperts(objContext),
            objMainTeacher: this.GetMainTeacher(objContext)
        }
        return objGroupPopupData;
    }

    /**
     * @name OpenAddGroupPopup
     * @summary Opens the Create group popup.
     * @param {any} objContext
     * @param {any} strMode
     */
    OpenAddGroupPopup(objContext, strMode) {
        Popup.ShowPopup({
            Data: {
                GetDataForGroupPopup: () => { return objContext.PupilNews_ModuleProcessor.GetDataForGroupPopup(objContext) },
                SaveGroup: (strGroupName, arrGroupData) => { strMode == "Add" ? objContext.PupilNews_ModuleProcessor.AddGroup(objContext, strGroupName, arrGroupData) : objContext.PupilNews_ModuleProcessor.EditGroup(objContext, strGroupName, arrGroupData) },
                GetTeacherName: (strTeacherId) => { return objContext.PupilNews_ModuleProcessor.GetTeacherName(objContext, strTeacherId) },
                Mode: strMode
            },
            Meta: {
                PopupName: 'PupilAddContactPopup',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: "auto",
                Width: "480px",
            },
            Resource: {
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {},
            CallBacks: {}
        });
    }

    /**
     * @name AddGroup
     * @summary Adds the group.
     * @param {any} objContext
     * @param {any} strGroupName
     * @param {any} arrGroupData
     */
    AddGroup(objContext, strGroupName, arrGroupData) {
        console.log('arrGroupData', arrGroupData)
        var arrGroupUser = [];
        arrGroupData.map(objGroupData => {
            arrGroupUser = [...arrGroupUser, {
                ["uUserId"]: objGroupData.uTeacherId ? objGroupData.uTeacherId : objGroupData.uPupilId,
                ["cIsTeacher"]: objGroupData.uTeacherId ? "Y" : "N",
                ["cIsPupil"]: objGroupData.uPupilId ? "Y" : "N"
            }]
        })

        var objAddData = {
            ["vGroupName"]: strGroupName,
            ["cIsTeacher"]: "N",
            ["cIsPupil"]: "Y",
            ["uClassId"]: objContext.state.objSelectedClass.uClassId,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId,
            ["t_LearnCoacher_News_Group_User"]: arrGroupData
        }

        let objMethodParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass.uClassId
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
            "vAddData": objAddData,
            "uClassId": objContext.state.objSelectedClass.uClassId,
            "UserId": ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_School_NewsGroup.AddData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name EditGroup
     * @summary Edits the Group
     * @param {any} objContext
     * @param {any} strGroupName
     * @param {any} arrGroupData
     */
    EditGroup(objContext, strGroupName, arrGroupData) {
        var objAddData = {
            ["vGroupName"]: strGroupName,
            ["cIsTeacher"]: "N",
            ["cIsPupil"]: "Y",
            ["uClassId"]: objContext.state.objSelectedClass.uClassId,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId,
            ["uNewsGroupId"]: objContext.state.strSelectedId,
            ["t_LearnCoacher_News_Group_User"]: arrGroupData
        }
        let objMethodParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass.uClassId
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
            "vEditData": objAddData,
            "uClassId": objContext.state.objSelectedClass.uClassId,
            "UserId": ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_School_NewsGroup.EditData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name OpenDeletePopUp 
     * @summary Opens the Delete confirmation popup.
     * @param {any} objContext
     * @param {any} objTextResource
     * @param {any} strType
     * @param {any} objNews
     */
    OpenDeletePopUp(objContext, objTextResource, strType, objNews = undefined) {
        let strConfirmText = '';
        let strHeaderText = '';
        let objGroup = {};
        if (strType == "Group") {
            objGroup = this.GetGroup(objContext);
            strConfirmText = Localization.TextFormatter(objTextResource, 'DeleteGroupBody').replace("{}", "<b>" + objGroup["vGroupName"] + "</b>");
            strHeaderText = Localization.TextFormatter(objTextResource, 'DeleteGroupHeader');
        } else {
            strConfirmText = Localization.TextFormatter(objTextResource, 'DeleteNewsBody');
            strHeaderText = Localization.TextFormatter(objTextResource, 'DeleteNewsHeader');
        }
        let objPopupTextResource = {
            Delete_ConfirmText: strConfirmText,
            Delete_ConfirmButtonText: Localization.TextFormatter(objTextResource, 'Delete'),
            Delete_CloseButtonText: Localization.TextFormatter(objTextResource, 'Close'),
            Delete_Title: strHeaderText
        }

        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
            },
            Resource: {
                Text: objPopupTextResource,
                SkinPath: JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "Delete"
            },
            Events: {
                ConfirmEvent: (objModal) => {
                    Popup.ClosePopup(objModal);
                    strType == "Group" ? this.DeleteGroup(objContext, objGroup) : objContext.PupilNews_ModuleProcessor.DeleteMessage(objContext, objNews)
                }
            },
            CallBacks: {}
        });
    }

    /**
     * @name DeleteGroup
     * @summary Calls the Delete group API.
     * @param {any} objContext
     * @param {any} objGroup
     */
    DeleteGroup(objContext, objGroup) {
        let objMethodParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass.uClassId
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
            "vDeleteData": objGroup
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Extranet_School_NewsGroup.DeleteData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
        });
    }

    /**
     * @name OpenForwardMessagePopup
     * @summary Opens the Users in popup for select.
     * @param {any} objContext
     */
    OpenForwardMessagePopup(objContext) {
        Popup.ShowPopup({
            Data: {
                GetDataForGroupPopup: () => { return objContext.PupilNews_ModuleProcessor.GetDataForGroupPopup(objContext, true) },
                ForwardMessage: (arrGroupData) => { objContext.PupilNews_ModuleProcessor.ForwardMessage(objContext, arrGroupData) },
                GetTeacherName: (strTeacherId) => { return objContext.PupilNews_ModuleProcessor.GetTeacherName(objContext, strTeacherId) }
            },
            Meta: {
                PopupName: 'PupilShareNewsPopup',
                ShowHeader: false,
                ShowCloseIcon: false,
                Height: "auto",
                Width: "480px",
            },
            Resource: {
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {},
            CallBacks: {}
        });
    }

    /**
     * @name GetSelectedMessages
     * @summary updates the chat type, selected chatType Id and forwardMesaageList as empty  to state
     * @param {any} objContext
     * @param {any} strType
     * @param {any} strSelectedId
     */
    GetSelectedMessages(objContext, strType, strSelectedId) {
        objContext.dispatch({ type: "SET_STATE", payload: { strType: strType, strSelectedId: strSelectedId, arrForwardMessagesId: [], strMessagetext: "", blnFileReload: true } });
    }

    /**
     * @name GetForwardMessagesId
     * @summary returns the selected NewsIds for forward.
     * @param {any} objContext
     * @param {any} strNewsId
     */
    GetForwardMessagesId(objContext, strNewsId) {

        var arrForwardMessagesId = objContext.state.arrForwardMessagesId;
        var blnIsNewsIdPresent = arrForwardMessagesId.indexOf(strNewsId) === -1 ? false : true;
        var arrNewForwardMessagesId = [];
        if (blnIsNewsIdPresent) {
            arrNewForwardMessagesId = arrForwardMessagesId.filter(item => { return item !== strNewsId });
        }
        else {
            arrNewForwardMessagesId = [...arrForwardMessagesId, strNewsId]
        }
        objContext.dispatch({ type: "SET_STATE", payload: { arrForwardMessagesId: arrNewForwardMessagesId } });
    }

    /**
     * @name AbortForward
     * @summary to de-select the forward messages action.
     * @param {any} objContext
     */
    AbortForward(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { arrForwardMessagesId: [] } });
    }

    /**
     * @name ForwardMessage
     * @summary sends the selected messages to selected user list.
     * @param {any} objContext
     * @param {any} arrForwardTo
     */
    ForwardMessage(objContext, arrForwardTo) {
        var arrForwardMessagesId = objContext.state.arrForwardMessagesId;
        var arrNews = [];
        let strClassId = objContext.state.objSelectedClass.uClassId;
        let arrAllNewsData = DataRef(objContext.props.Extranet_Pupil_PupilNews_Module, "Extranet_Pupil_PupilNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N")["Data"];
        arrForwardMessagesId.map(strForwardId => {
            var objOriginalNews = arrAllNewsData.find(item => { return item.uNewsId === strForwardId });
            var objNewsToForward = {
                "uUserId": objContext.props.ClientUserDetails.UserId,
                "uClassId": strClassId,
                "cIsPupil": "Y",
                "cIsSchool": "N",
                "cIsTeacher": "N",
                "uOriginalNewsItemId": objOriginalNews.uOriginalNewsItemId === "00000000-0000-0000-0000-000000000000" ? objOriginalNews.uNewsId : objOriginalNews.uOriginalNewsItemId,
                "uParentNewsItemId": objOriginalNews.uNewsId,
                "vText": objOriginalNews.vText,
                "t_LearnCoacher_News_ToUser": arrForwardTo,
                "t_LearnCoacher_News_Attachment": objOriginalNews.t_LearnCoacher_News_Attachment
            }
            arrNews = [...arrNews, objNewsToForward];
        })

        let objMethodParams = {
            "ForeignKeyFilter": {
                "uClassId": objContext.state.objSelectedClass.uClassId
            },
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            },
            "vAddData": arrNews,
            "uClassId": objContext.state.objSelectedClass.uClassId,
            "UserId": ClientUserDetails.UserId
        };
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Pupil_PupilNews_Module.EditData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false);
            objContext.dispatch({ type: 'SET_STATE', payload: { arrForwardMessagesId: [] } })
        });
    }

    /**
     * @name UpdateSearchText
     * @summary updates serch text
     * @param {any} objContext
     * @param {any} strValue
     */
    UpdateSearchText(objContext, strValue) {
        objContext.dispatch({ type: 'SET_STATE', payload: { searchFilter: strValue } })
    }

    /**
     * @name GetResourceFileUploadData
     * @param {*} objTextResource objTextResource
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceFileUploadData(objTextResource) {
        let Text = {
            "UploadButtonText": objTextResource.attach // Button text
        };
        let SkinPath = JConfiguration.ExtranetSkinPath; // mandatory
        let ImagePath = { UploadIcon: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/attachmentBrown.png" };
        return {
            Text,
            SkinPath,
            ImagePath
        };
    }

    /**
     * @name GetMetaFileUploadData
     * @summary it returns the object of metadata
     * @returns {array} MetaData
     */
    GetMetaFileUploadData() {
        return {
            ShowUploadedFiles: true, // To show details of uploaded files.
            UploadSingle: 'N',  //restrict to select only one file.
            AllowDropFiles: false
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
            OnChangeEventHandler: (objItem) => objContext.PupilNews_ModuleProcessor.OnChangeSchoolYearPeriodDropdown(objContext, objItem)
        };
    }

    /**
     * @name GetNews
     * @summary Gets the news and news group
     */
    GetNews(objContext) {
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");// ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
        let objClass = this.GetPupilClass(objContext.props);

        //News
        let objNewsParams = {
            "ForeignKeyFilter": {
                "uClassId": objClass.uClassId
            },
            "uClassId": objClass.uClassId,
            "uSchoolId": strSchoolId,
            "SearchText": "",
            "uPupilId": ClientUserDetails.UserId,
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsDeleted": "N"
                        }
                    }
                ]
            }
        };

        //News Group
        let objGroupParams = {
            "ForeignKeyFilter": {
                "uClassId": objClass.uClassId
            },
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
                "URL": "API/Extranet/Pupil/PupilNews_Module",
                "Params": objNewsParams,
                "MethodType": "Get",
                "UseFullName": true
            },
            {
                "URL": "API/Object/Extranet/School/NewsGroup",
                "Params": objGroupParams,
                "MethodType": "Get",
                "UseFullName": true
            }
        ];

        ArcadixFetchData.Execute(arrDataRequest, function (objReturnData) {
            console.log("objReturnData ", objReturnData);
            let strClassId = objClass.uClassId;
            let strNewsFilter = "Extranet_Pupil_PupilNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N";
            let objNewsReturn = {
                Filter: strNewsFilter,
                Value: {
                    Data: objReturnData["Extranet_Pupil_PupilNews_Module"][strNewsFilter]["Data"],
                    TimeStamp: "",
                    PrimaryKeyName: "uNewsId",
                    Count: objReturnData["Extranet_Pupil_PupilNews_Module"][strNewsFilter]["Data"].length
                }
            };
            ArcadixCacheData.AddData("Extranet_Pupil_PupilNews_Module", objNewsReturn, () => { });

            let strNewsGroupFilter = "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId;
            let objNewsGroupReturn = {
                Filter: strNewsGroupFilter,
                Value: {
                    Data: objReturnData["Object_Extranet_School_NewsGroup"][strNewsGroupFilter]["Data"],
                    TimeStamp: "",
                    PrimaryKeyName: "uNewsGroupId",
                    Count: objReturnData["Object_Extranet_School_NewsGroup"][strNewsGroupFilter]["Data"].length
                }
            };
            ArcadixCacheData.AddData("Object_Extranet_School_NewsGroup", objNewsGroupReturn, () => { });
        });
    }

    /**
     * @name GetAuthorName
     * @summary Gets the author name of Group.
     * @param {any} objContext
     */
    GetGroupAuthorName(objContext, objGroup) {
        let strAuthorName = "";
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");//ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uSchoolId;
        let strClassId = ApplicationState.GetProperty("SelectedClassId");// objContext.props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil[0].uClassId;
        let iStateId = this.GetStateId(objContext.props);
        let arrTeacher = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + strSchoolId).Data;
        let arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        if (objGroup) {
            let strGroupCreatorId = objGroup.uUserId;
            if (objGroup.cIsTeacher == "Y") {
                arrTeacher.map(objTeacher => {
                    if (objTeacher["uTeacherId"] == strGroupCreatorId)
                        strAuthorName = objTeacher["vName"];
                });
            } else {
                arrPupil.map(objPupil => {
                    if (objPupil["uPupilId"] == strGroupCreatorId)
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
    IsExternalUser() {
        return global.ClientUserDetails.PupilDetails.t_TestDrive_Member_Pupil_ExternalSourceMapping.length > 0;
    }
    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown", "FileUpload"],
            "Files": []
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

export default PupilNews_ModuleProcessor;