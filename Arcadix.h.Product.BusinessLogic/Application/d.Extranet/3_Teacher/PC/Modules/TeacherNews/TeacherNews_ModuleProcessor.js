//Module object imports.
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Extranet_Teacher_TeacherNews_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherNews_Module';
import Object_Extranet_School_NewsGroup from '@shared/Object/d.Extranet/2_School/News/NewsGroup/NewsGroup';

import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name TeacherNews_ModuleProcessor
 * @summary module processor for Teacher Document.
 * */
class TeacherNews_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TeacherNews", "Object_Extranet_School_School", "Object_Extranet_Teacher_Teacher", "Object_Extranet_Teacher_SchoolYearPeriod", "Object_Extranet_Teacher_Class", "Object_Extranet_Pupil_Pupil", "Extranet_Teacher_TeacherNews_Module", "Object_Extranet_School_NewsGroup",
        { "StoreKey": "ApplicationState", "DataKey": "RefreshNewsData" }
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        //objQueue.InitializeCustomRequests(arrCustomRequest);
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
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherNews/TeacherNews.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherNews/TeacherAddContactPopup/AddContactPopup.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherNews/TeacherShareNewsPopup/TeacherShareNewsPopup.css"
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
        let arrResourcePath = ["/d.Extranet/3_Teacher/Modules/TeacherNews"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //school
        let objSchoolParams = {
            "ForeignKeyFilter": {},
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "uSchoolId": props.ClientUserDetails.TeacherDetails.uSchoolId
                        }
                    }]
            }
        };
        Object_Extranet_School_School.Initialize(objSchoolParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_School];

        //teacher
        let objTeacherParams = {

            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": props.ClientUserDetails.TeacherDetails.uSchoolId,
                "Type": "nested"
            }
        };
        Object_Extranet_Teacher_Teacher.Initialize(objTeacherParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Teacher];


        //Class
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
                "Type": "nested"
            }
        };
        Object_Extranet_Teacher_Class.Initialize(objClassParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_Class];


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

        //News
        let objNewsParams = {
            "ForeignKeyFilter": {
                ["uClassId"]: strClassId
            },
            ["uClassId"]: strClassId,
            ["uSchoolId"]: props.ClientUserDetails.TeacherDetails.uSchoolId,
            ["SearchText"]: "",
            ["uTeacherId"]: props.ClientUserDetails.UserId,
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
            }
        };
        Extranet_Teacher_TeacherNews_Module.Initialize(objNewsParams);
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_TeacherNews_Module];

        //News Group
        let objGroupParams = {
            "ForeignKeyFilter": {
                "uClassId": strClassId
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

        return arrDataRequest;
    }

    /**
    * @name GetFillHeightChatListMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightChatListMetaData() {
        return {
            HeaderIds: ["Header", "outletBand", "newsHeader", "topHead"],
            FooterIds: ["bottomSpacing"]
        };
    }

    /**
    * @name GetFillHeightChatBoxMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightChatBoxMetaData() {
        return {
            HeaderIds: ["Header", "outletBand", "chatBoxHeader", "topHead"],
            FooterIds: ["chatBoxFooter", "bottomSpacing"]
        };
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
        var strFormatDate = objDate.toLocaleDateString(objContext.props.JConfiguration.LanguageCultureInfo) + " " + objDate.getHours() + ":" + objDate.getMinutes();
        return strFormatDate;
    }

    /**
     * @name GetMainTeacher
     * @summary returns the main teacher of selected class.
     * @param {any} objContext
     * @returns {Object}
     */
    GetMainTeacher(objContext) {
        if (objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher) {
            return objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher.find(objClassTeacher => {
                return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N"
            })
        } else return {};

    }

    /**
     * @name GetCoTeachers
     * @summary returns the co teachers of selected class.
     * @param {any} objContext
     * @returns {Array}
     */
    GetCoTeachers(objContext) {
        if (objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher) {
            return objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => {
                return objClassTeacher.cIsCoTeacher === "Y" && objClassTeacher.cIsSubjectExpert === "N"
            })
        } else return [];

    }

    /**
     * @name GetCoTeachers
     * @summary returns the subject experts of selected class.
     * @param {any} objContext
     * @returns {Array}
     */
    GetSubjectExperts(objContext) {
        if (objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher) {
            return objContext.state.objSelectedClass.t_TestDrive_Member_Class_Teacher.filter(objClassTeacher => {
                return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "Y"
            })
        } else return [];

    }

    /**
     * @name GetTeachersLastMessage
     * @summary returns the last message of teacher by teacher id.
     * @param {any} objContext
     * @param {any} strTeacherId
     */
    GetTeachersLastMessage(objContext, strTeacherId) {
        let arrNewsData = DataRef(objContext.props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + objContext.state.objSelectedClass.uClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
        if (arrNewsData) {
            return arrNewsData.filter(item => {
                return item.uUserId === strTeacherId || item.t_LearnCoacher_News_ToUser[0].uUserId === strTeacherId;
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
        let arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.props.ClientUserDetails.TeacherDetails.uSchoolId)["Data"]
        let objTeacher = arrTeacherData.find(item => { return item.uTeacherId === strTeacherId });
        console.log("get teacher name =>>>>>>>>>>>>>>>>>>>>>>", objTeacher);
        return objTeacher.vFirstName + " " + objTeacher.vName;
    };

    /**
     * @name GetGroup
     * @summary Returns the group by GroupId
     * @param {any} objContext
     */
    GetGroup(objContext) {
        let arrNewsGroupData = DataRef(objContext.props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + objContext.state.objSelectedClass.uClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
        if (!arrNewsGroupData)
            arrNewsGroupData = DataRef(objContext.props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + objContext.state.objSelectedClass.uClassId + ";uSchoolYearPeriodId;")["Data"];
        let objGroup = arrNewsGroupData.find(item => { return item.uNewsGroupId === objContext.state.strSelectedId });
        return objGroup;
    };

    /**
     * @name GetPupilObject
     * @summary Gets the pupil object by PupilId
     * @param {any} objContext
     * @param {any} strSelectedId
     */
    GetPupilObject(objContext, strSelectedId) {
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
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
        objContext.dispatch({ type: 'SET_STATE', payload: { strMessagetext: strMessageText } });
    }

    /**
     * 
     * @param {any} objContext
     * @param {any} strTeacherOrPupil
     */
    SelectTeacherOrPupil(objContext, strTeacherOrPupil) {
        objContext.dispatch({ type: 'SelectTeacherOrPupil', payload: strTeacherOrPupil, strMessagetext: "", blnFileReload: true });
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
            ["cIsTeacher"]: "Y",
            ["cIsSchool"]: "N",
            ["cIsPupil"]: "N",
            ["uClassId"]: objContext.state.objSelectedClass.uClassId,//"37FE13C3-D0F0-4759-BC8F-40AC49D21B1D",
            ["uUserId"]: objContext.props.ClientUserDetails.UserId,//"5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B",//Rashmi
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
        ApplicationState.SetProperty("blnShowAnimation", true)
        Extranet_Teacher_TeacherNews_Module.AddData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });

        objContext.dispatch({ type: 'SET_STATE', payload: { strMessagetext: "", blnFileReload: true, strReloadToggle: objContext.state.strReloadToggle === "toggle1" ? "toggle2" : "toggle1", blnShowEmptyTextValidationMessage: false } });

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
        ApplicationState.SetProperty("blnShowAnimation", true)
        Extranet_Teacher_TeacherNews_Module.DeleteData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
    }

    /**
     * @name HandleDropDownForClass
     * @summary updates the selected class to state.
     * @param {any} objContext objContext
     * @param {any} objSelectedClass objSelectedClass
     */
    HandleDropDownForClass(objContext, objSelectedClass) {
        let strClassActiveStatus = 'Y';
        if (objSelectedClass != undefined && objSelectedClass.cIsNewsEnabled == 'N') {
            strClassActiveStatus = 'N';
        }
        objContext.dispatch({ type: "SET_STATE", payload: { objSelectedClass: objSelectedClass, strType: "school", blnClassChanged: true, strClassNewsStatus: strClassActiveStatus } });
    }

    /**
     * @name HandleActiveInactiveChange
     * @param {any} objContext objContext
     * @param {any} event event
     * @summary handles inactive and active state of class
     */
    HandleActiveInactiveChange(objContext, event) {
        let objClassActiveStatus = {
            "uClassId": objContext.state.objSelectedClass.uClassId,
            "cIsNewsEnabled": event.target.value
        };
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.props.ClientUserDetails.UserId,
                "Type": "nested"
            },
            ["vEditData"]: [objClassActiveStatus],
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        Object_Extranet_Teacher_Class.EditData(objClassParams, () => { });
        objContext.dispatch({ type: "SET_STATE", payload: { strClassNewsStatus: event.target.value } });
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
        let strSelectedId = arrSchoolYearPeriodData && arrSchoolYearPeriodData.length > 0 ? arrSchoolYearPeriodData[0]["uSchoolYearPeriodId"] : "";
        return {
            DropdownData: arrSchoolYearPeriodData ? arrSchoolYearPeriodData : [],
            SelectedValue: strSelectedId
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
            OnChangeEventHandler: (objItem) => objContext.TeacherNews_ModuleProcessor.OnChangeSchoolYearPeriodDropdown(objContext, objItem)
        };
    }

    /**
     * @name OnChangeSchoolYearPeriodDropdown
     * @summary Sets selected school year period to state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
        let blnCurrentSchoolYearPeriod = false;
        if (new Date() > new Date(objItem["dtFromDate"]) && new Date() < new Date(objItem["dtToDate"])) {
            blnCurrentSchoolYearPeriod = true;
        }
        objContext.dispatch({ type: "SET_STATE", payload: { objSchoolYearPeriod: objItem, strSelectedId: "", strType: "school", blnCurrentSchoolYearPeriod: blnCurrentSchoolYearPeriod } })
    }

    /**
     * @name GetFileUploadResourceData
     * @param {*} objTextResource objTextResource
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetFileUploadResourceData(objTextResource) {
        let Text = {
            "UploadButtonText": objTextResource.attach // Button text
        };

        let ImagePath = {
            UploadIcon: JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/attachment.png" //by default plus will show.
        };

        let SkinPath = JConfiguration.ExtranetSkinPath; // mandatory

        return {
            Text,
            SkinPath,
            ImagePath
        };
    }

    /**
     * @name GetFillHeightMetaData
     * @summary it returns the object of metadata
     * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            ShowUploadedFiles: true, // To show details of uploaded files.
            UploadSingle: 'N', //restrict to select only one file.
            AllowDropFiles: false
        };
    }

    /**
     * @name GetNewsData
     * @summary gets the data after school year period change.
     * @param {any} objContext
     */
    GetNewsData(objContext) {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        //News
        let objNewsParams = {
            "ForeignKeyFilter": {
                ["uClassId"]: strClassId
            },
            ["uClassId"]: strClassId,
            ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.uSchoolId,
            ["SearchText"]: "",
            ["uTeacherId"]: objContext.props.ClientUserDetails.UserId,
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
        Extranet_Teacher_TeacherNews_Module.GetData(objNewsParams, () => { });

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
        Object_Extranet_School_NewsGroup.GetData(objGroupParams, () => { });
    }

    /**
     * @name GetDataAfterClassChange
     * @summary loads the news data after class change.
     * @param {any} objContext
     */
    GetDataAfterClassChange(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let strClassId = objContext.state.objSelectedClass.uClassId;
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
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

        //News
        let objNewsParams = {
            "ForeignKeyFilter": {
                ["uClassId"]: strClassId
            },
            ["uClassId"]: strClassId,
            ["uSchoolId"]: objContext.props.ClientUserDetails.TeacherDetails.uSchoolId,
            ["SearchText"]: "",
            ["uTeacherId"]: objContext.props.ClientUserDetails.UserId,
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
            }
        };
        Extranet_Teacher_TeacherNews_Module.Initialize(objNewsParams);
        arrDataRequest = [...arrDataRequest, Extranet_Teacher_TeacherNews_Module];

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
        ApplicationState.SetProperty("blnShowAnimation", false)
    }

    /**
     * @name GetDataForGroupPopup
     * @summary returns the required data in object for group popup
     * @param {any} objContext
     */
    GetDataForGroupPopup(objContext) {
        let strClassId = objContext.state.objSelectedClass.uClassId;
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        var objGroupPopupData = {
            arrPupilData: DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"],
            objGroupData: DataRef(objContext.props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"].find(item => { return item.uNewsGroupId === objContext.state.strSelectedId }),
            arrGroupData: DataRef(objContext.props.Object_Extranet_School_NewsGroup, "Object_Extranet_School_NewsGroup;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"],
            objTextResource: Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherNews", objContext.props),
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
     * @summary Opens the Create group popup
     * @param {any} objContext
     * @param {any} strMode
     */
    OpenAddGroupPopup(objContext, strMode) {
        Popup.ShowPopup({
            Data: {
                GetDataForGroupPopup: () => { return objContext.TeacherNews_ModuleProcessor.GetDataForGroupPopup(objContext); },
                SaveGroup: (strGroupName, arrGroupData) => {
                    strMode == "Add" ?
                        objContext.TeacherNews_ModuleProcessor.AddGroup(objContext, strGroupName, arrGroupData) :
                        objContext.TeacherNews_ModuleProcessor.EditGroup(objContext, strGroupName, arrGroupData);
                },
                GetTeacherName: (strTeacherId) => { return objContext.TeacherNews_ModuleProcessor.GetTeacherName(objContext, strTeacherId); },
                Mode: strMode
            },
            Meta: {
                PopupName: 'AddContactPopup',
                ShowHeader: false,
                ShowCloseIcon: false,
                "Width": "380px",
                "Height": "auto"
            },
            Resource: {
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
            },
            CallBacks: {
            }
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
            ["cIsTeacher"]: "Y",
            ["cIsPupil"]: "N",
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
        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Extranet_School_NewsGroup.AddData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
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
            ["cIsTeacher"]: "Y",
            ["cIsPupil"]: "N",
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
        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Extranet_School_NewsGroup.EditData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
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

        let objPopupResoure = {
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
                Text: objPopupResoure,
                SkinPath: JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "Delete"
            },
            Events: {
                ConfirmEvent: (strPopupUniqueId) => {
                    Popup.ClosePopup(strPopupUniqueId);
                    strType == "Group" ? objContext.TeacherNews_ModuleProcessor.DeleteGroup(objContext, objGroup) : objContext.TeacherNews_ModuleProcessor.DeleteMessage(objContext, objNews);
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
        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Extranet_School_NewsGroup.DeleteData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
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
                GetDataForGroupPopup: () => { return objContext.TeacherNews_ModuleProcessor.GetDataForGroupPopup(objContext); },
                ForwardMessage: (arrGroupData) => { objContext.TeacherNews_ModuleProcessor.ForwardMessage(objContext, arrGroupData); },
                GetTeacherName: (strTeacherId) => { return objContext.TeacherNews_ModuleProcessor.GetTeacherName(objContext, strTeacherId); }
            },
            Meta: {
                PopupName: 'TeacherShareNewsPopup',
                ShowHeader: false,
                ShowCloseIcon: false,
                "Width": "380px",
                "Height": "auto"
            },
            Resource: {
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {
            },
            CallBacks: {
            }
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
        let arrAllNewsData = DataRef(objContext.props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N")["Data"];
        arrForwardMessagesId.map(strForwardId => {
            var objOriginalNews = arrAllNewsData.find(item => { return item.uNewsId === strForwardId });
            var objNewsToForward = {
                "uUserId": objContext.props.ClientUserDetails.UserId,
                "uClassId": strClassId,
                "cIsPupil": "N",
                "cIsSchool": "N",
                "cIsTeacher": "Y",
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
        ApplicationState.SetProperty("blnShowAnimation", true)
        Extranet_Teacher_TeacherNews_Module.EditData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
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
     * @name GetNews
     * @summary Gets the news and news group
     */
    GetNews() {
        let strClassId = ApplicationState.GetProperty("SelectedClassId");

        //News
        let objNewsParams = {
            "ForeignKeyFilter": {
                ["uClassId"]: strClassId
            },
            ["uClassId"]: strClassId,
            ["uSchoolId"]: ClientUserDetails.TeacherDetails.uSchoolId,
            ["SearchText"]: "",
            ["uTeacherId"]: ClientUserDetails.UserId,
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
                "uClassId": strClassId
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
                "URL": "API/Extranet/Teacher/TeacherNews_Module",
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
            let strNewsFilter = "Extranet_Teacher_TeacherNews_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";cIsDeleted;N";
            let objNewsReturn = {
                Filter: strNewsFilter,
                Value: {
                    Data: objReturnData["Extranet_Teacher_TeacherNews_Module"][strNewsFilter]["Data"],
                    TimeStamp: "",
                    PrimaryKeyName: "uNewsId",
                    Count: objReturnData["Extranet_Teacher_TeacherNews_Module"][strNewsFilter]["Data"].length
                }
            };
            //ArcadixCacheData.AddData("Extranet_Teacher_TeacherNews_Module", objNewsReturn, () => { });
            ArcadixCacheData.EditData("Extranet_Teacher_TeacherNews_Module", objNewsReturn, () => { });

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
            //ArcadixCacheData.AddData("Object_Extranet_School_NewsGroup", objNewsGroupReturn, () => { });
            ArcadixCacheData.EditData("Object_Extranet_School_NewsGroup", objNewsGroupReturn, () => { });
        });

    }

    /**
       * @name GetPupilData
       * @param {any} objContext
       * @param {string} strClassId
       * @summary Gets active Pupil Data for the class
       */
    GetPupilData(objContext, strClassId) {
        let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
        let arrPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        let arrFilteredPupilData = [];
        if (arrPupilData != undefined && arrPupilData.length > 0) {
            arrFilteredPupilData = arrPupilData.filter(x => x["t_TestDrive_Member_Class_Pupil"].filter(y => y["uClassId"] == strClassId && y["cIsDeleted"] == "N").length > 0);
        }
        return arrFilteredPupilData;
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": ["Dropdown"],
            "Files": []
        }
    }

    /**
    * @name IsExternalUser
    * @returns {object} returns if the user is a keycloak user or normal user
    */
    IsExternalUser() {
        return global.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_ExternalSourceMapping.length > 0;
    }
}

export default TeacherNews_ModuleProcessor