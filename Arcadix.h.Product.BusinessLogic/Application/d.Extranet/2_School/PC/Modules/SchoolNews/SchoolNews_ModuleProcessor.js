//Module object imports.
import Object_Extranet_Teacher_SchoolYearPeriod from '@shared/Object/d.Extranet/3_Teacher/SchoolYearPeriod/SchoolYearPeriod';
import Object_Extranet_School_News from '@shared/Object/d.Extranet/2_School/News/News/News';


/**
 * @name SchoolNews_ModuleProcessor.
 * @summary business layer for schoolnews.
 * */
class SchoolNews_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/SchoolNews", "Object_Extranet_School_News", "Object_Extranet_Teacher_SchoolYearPeriod"];
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
     * @summary returns list of data requests.
     * @param {any} props
     * @returns {Array}
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        //Text Resource
        let arrResourcePath = ["/d.Extranet/2_School/Modules/SchoolNews"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //News
        let objSchoolNews = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsSchool": "Y"
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": ""
                        }
                    },
                    {
                        "match": {
                            "uUserId": props.ClientUserDetails.SchoolDetails.uSchoolId
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
        Object_Extranet_School_News.Initialize(objSchoolNews, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_School_News];

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

        Object_Extranet_Teacher_SchoolYearPeriod.Initialize(objSchoolYearPeriodParams, 'Y');
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYearPeriod];
        return arrDataRequest;
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/SchoolNews/SchoolNews.css",
            props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/ConfirmationPopup/ConfirmationPopup.css"
        ];
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
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/attachment.png",
                props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/cross_small.png"
            ]
        }
    }

    /**
     * @name GetNewsByType
     * @summary retuns the news of teacher or pupil by based selected chat name and latest news object teacher and pupil.
     * @param {any} objContext
     * @returns {Object}
     */
    GetNewsByType(objContext) {

        let arrNews = DataRef(objContext.props.Object_Extranet_School_News, "Object_Extranet_School_News;cIsSchool;Y;uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId + ";uUserId;" + objContext.props.ClientUserDetails.SchoolDetails.uSchoolId)["Data"];
        let objTeacherLastMsg = [];
        let objPupilLastMsg = [];
        let arrPupilNews = [];
        let arrTeacherNews = [];
        if (arrNews !== undefined) {
            arrNews = arrNews.sort((a, b) => new Date(a.dtCreatedOn) - new Date(b.dtCreatedOn));
            arrTeacherNews = arrNews.filter(objNews => objNews.t_LearnCoacher_News_ToUser[0].cIsTeacher == "Y" && objNews.cIsDeleted == "N");
            arrPupilNews = arrNews.filter(objNews => objNews.t_LearnCoacher_News_ToUser[0].cIsPupil == "Y" && objNews.cIsDeleted == "N");
            objTeacherLastMsg = arrTeacherNews[arrTeacherNews.length - 1];
            objPupilLastMsg = arrPupilNews[arrPupilNews.length - 1];
        }
        else {
            arrNews = [];
        }

        return {
            arrNews: objContext.state.strTeacherOrPupil === "teacher" ? arrTeacherNews : arrPupilNews,
            objTeacherLastMsg: objTeacherLastMsg,
            objPupilLastMsg: objPupilLastMsg
        }
    }

    /**
     * @name MessageTextChangeHandler
     * @summary updates the msg text to state.
     * @param {any} objContext
     * @param {any} strMessagetext
     */
    MessageTextChangeHandler(objContext, strMessagetext) {
        objContext.dispatch({ type: 'SET_STATE', payload: { strMessagetext: strMessagetext, blnShowValidation: false, blnShowEmptyTextValidationMessage: false } });
    }

    /**
     * @name SelectTeacherOrPupil
     * @summary updates selected chat name.
     * @param {any} objContext
     * @param {any} strTeacherOrPupil
     */
    SelectTeacherOrPupil(objContext, strTeacherOrPupil) {
        objContext.dispatch({ type: 'SET_STATE', payload: { strTeacherOrPupil: strTeacherOrPupil, strMessagetext: "", Reload: true } });
    }

    /**
     * @name SendMessage
     * @summary sends the message.
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
        });

        var objNewsAddToAdd = {
            ["vText"]: strMessagetext,
            ["cIsTeacher"]: "N",
            ["cIsSchool"]: "Y",
            ["cIsPupil"]: "N",
            ["uClassId"]: "00000000-0000-0000-0000-000000000000",
            ["uUserId"]: objContext.props.ClientUserDetails.UserId,
            ["uOriginalNewsItemId"]: "00000000-0000-0000-0000-000000000000",
            ["uParentNewsItemId"]: "00000000-0000-0000-0000-000000000000",
            ["t_LearnCoacher_News_ToUser"]: [
                {
                    ["uGroupId"]: "00000000-0000-0000-0000-000000000000",
                    ["uUserId"]: "00000000-0000-0000-0000-000000000000",
                    ["cIsSchool"]: "N",
                    ["cIsPupil"]: objContext.state.strTeacherOrPupil === "pupil" ? "Y" : "N",
                    ["cIsTeacher"]: objContext.state.strTeacherOrPupil === "teacher" ? "Y" : "N",
                    ["cIsForGroup"]: "N",
                    ["cHasBeenViewed"]: "N",
                    ["cIsDeleted"]: "N"
                }
            ],
            ["t_LearnCoacher_News_Attachment"]: arrAttachMentDataParams
        };
        let objMethodParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsSchool": "Y"
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "uUserId": objContext.props.ClientUserDetails.SchoolDetails.uSchoolId
                        }
                    }
                ]
            },
            "uSchoolId": ClientUserDetails.SchoolDetails.uSchoolId,
            "vAddData": objNewsAddToAdd
        };
        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Extranet_School_News.AddData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
        objContext.dispatch({ type: 'SET_STATE', payload: { strMessagetext: "", strReloadToggle: objContext.state.strReloadToggle === "toggle1" ? "toggle2" : "toggle1", Reload: true } });

    }

    /**
     * @name OpenDeleteConfirmationPopup
     * @summary opens the generic confirmation popup.
     * @param {any} objContext
     * @param {any} objNews
     */
    OpenDeleteConfirmationPopup(objContext, objNews) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolNews", objContext.props);
        let objPopupResoure = {
            Delete_ConfirmText: Localization.TextFormatter(objTextResource, 'ConfirmationMessage'),
            Delete_ConfirmButtonText: Localization.TextFormatter(objTextResource, 'ConfirmationBtnText'),
            Delete_CloseButtonText: Localization.TextFormatter(objTextResource, 'Close'),
            Delete_Title: Localization.TextFormatter(objTextResource, 'DeleteHeader')
        };

        Popup.ShowConfirmationPopup({
            Data: {},
            Meta: {
                "ShowHeader": true,
                Height: "auto"
            },
            Resource: {
                Text: objPopupResoure,
                SkinPath: JConfiguration.ExtranetSkinPath,
                TextResourcesKey: "Delete"
            },
            Events: {
                ConfirmEvent: (strPopupUniqueId) => {
                    this.DeleteMessage(objContext, objNews);
                    Popup.ClosePopup(strPopupUniqueId);
                }
            },
            CallBacks: {}
        });
    }

    /**
     * @name DeleteMessage
     * @summary Deletes the message
     * @param {any} objContext
     * @param {any} objNews
     */
    DeleteMessage(objContext, objNews) {
        let objMethodParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsSchool": "Y"
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "uUserId": objContext.props.ClientUserDetails.SchoolDetails.uSchoolId
                        }
                    }
                ]
            },
            "vDeleteData": objNews
        };
        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Extranet_School_News.DeleteData(objMethodParams, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
    }

    /**
     * @name OnChangeSchoolYearPeriodDropdown
     * @summary update the state by selected schoolyearperiod
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objSchoolYearPeriod: objItem } })
    }

    ///**
    // * @name EditData
    // * @summary edit teacher
    // * @param {any} objContext
    // * @param {any} data
    // */
    //EditData(objContext, data) {
    //    let objCallParams = {
    //        "ForeignKeyFilter": {
    //            "t_TestDrive_Member_Teacher_School.uSchoolId": objContext.props.ClientUserDetails.UserId
    //        },
    //        "SortKeys": [
    //            {
    //                "dtCreatedOn": {
    //                    "order": "asc"
    //                }
    //            }
    //        ],
    //        "vEditData": data,
    //        "uUserId": objContext.props.ClientUserDetails.UserId
    //    };

    //    Object_Extranet_School_News.DeleteData(objCallParams, () => {
    //    });
    //}

    /**
     * @name GetFormatDate
     * @summary returns the date in specific format.
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
     * @name GetNewsData
     * @summary makes api call for get news.
     * @param {any} objContext
     */
    GetNewsData(objContext) {
        let objSchoolNews = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "cIsSchool": "Y"
                        }
                    },
                    {
                        "match": {
                            "uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId
                        }
                    },
                    {
                        "match": {
                            "uUserId": objContext.props.ClientUserDetails.SchoolDetails.uSchoolId
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
            //"uSchoolYearPeriodId": objContext.state.objSchoolYearPeriod["uSchoolYearPeriodId"]
        };
        ApplicationState.SetProperty("blnShowAnimation", true)
        Object_Extranet_School_News.GetData(objSchoolNews, () => {
            ApplicationState.SetProperty("blnShowAnimation", false)
        });
    }

    /**
     * @name GetResourceData
     * @param {*} objTextResource objTextResource
     * @summary it returns the object for TextResource
     * @returns {object} TextResource
     */
    GetResourceData(objTextResource) {
        let Text = {
            "UploadButtonText": Localization.TextFormatter(objTextResource, 'attach'), // Button text
            "ValidationMessage": Localization.TextFormatter(objTextResource, 'FileRestrictionMessage')
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
     * @name GetMetaData
     * @summary it returns the object of metadata
     * @returns {array} MetaData
    */
    GetMetaData() {
        return {
            ShowUploadedFiles: true, // To show details of uploaded files.
            UploadSingle: 'N', //restrict to select only one file.
            AllowDropFiles: false
        };
    }

    /**
     * @name GetMetaDataSchoolGetNewsRight
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
     */
    GetMetaDataSchoolGetNewsRight() {
        return {
            HeaderIds: ["Header", "outletBand", "chatBoxHeader"],
            FooterIds: ["chatBoxFooter", "bottomSpacing"]
        };
    }

    /**
     * @name GetMetaDataSchoolNews
     * @summary it returns the object of metadatas
     * @returns {array} MetaData
     */
    GetMetaDataSchoolNews() {
        return {
            HeaderIds: ["Header", "outletBand", "newsHeader"],
            FooterIds: ["bottomSpacing"]
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
            SkinPath
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
            OnChangeEventHandler: (objItem) => objContext.SchoolNews_ModuleProcessor.OnChangeSchoolYearPeriodDropdown(objContext, objItem)
        };
    }
}

export default SchoolNews_ModuleProcessor;