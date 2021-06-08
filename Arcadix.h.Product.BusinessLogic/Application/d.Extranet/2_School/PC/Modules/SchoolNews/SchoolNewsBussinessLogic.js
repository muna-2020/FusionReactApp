import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            news: DataRef(state.Entity, "news", true),
            textresource: DataRef(state.Entity, "textresource", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp,
            schoolyearperiod: DataRef(state.Entity, "schoolyearperiod", true)
        };
    }
    else {
        return {};
    }
}

/**
 * loading initial data
 * @param {any} JConfiguration
 * @param {any} props
 */
export function InitialDataParams(JConfiguration, props) {
    var objResourceParams = {
        "ForeignKeyFilter": {
        },
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ],
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/SchoolNews"
                    }
                }
            ]
        },
        "OutputColumns": []
    };

    var objParams = {
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsSchool" : "Y"
                    }                    
                },
                {
                    "match": {
                        "uUserId" : props.ClientUserDetails.SchoolDetails.uSchoolId
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
    };

    var objGetSchoolYearPeriodParams = {
        "ForeignKeyFilter": {},
        "SortKeys": [],
        "OutputColumns": []
    };

    var arrDataRequest = [
        {
            "URL": "API/Object/Framework/Blocks/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get",
            "ReturnDataOnServerRender": true
        },
        {
            "URL": "API/Object/Extranet/School/News/News",
            "Params": objParams,
            "MethodType": "Get",
            "ReturnDataOnServerRender": true
        },
        {
            "URL": "API/Object/Extranet/Teacher/SchoolYearPeriod",
            "Params": objGetSchoolYearPeriodParams,
            "MethodType": "Get"
        }
    ];

    return { DataCalls: arrDataRequest };
}

export function DataCall(objContext) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls, function (objReturn) {
    });
}

export function useDataLoader(objContext) {
    const [isLoading, setIsLoading] = useState(true);

    const GetRequiredData = () => {
        //Logger.Log("getting required data");
        DataCall(objContext);
    };
    useLayoutEffect(GetRequiredData, []);
    return isLoading;
}

export function MessageTextChangeHandler(objContext, strMessagetext){
    objContext.dispatch({ type: 'WriteMessageText', payload: strMessagetext });
}

export function SelectTeacherOrPupil(objContext, strTeacherOrPupil){
    objContext.dispatch({ type: 'SelectTeacherOrPupil', payload: strTeacherOrPupil });
}

export function SendMessage(objContext, strAttachmentArray){
    var strMessagetext = objContext.state.strMessagetext;
    var arrAttachMents = JSON.parse(strAttachmentArray);
    var intDispalyOrder = 0;
    var arrAttachMentDataParams = [];
    arrAttachMents.map(objAttachment => {
        intDispalyOrder++;
        var objAttachmentParams = {
            //["uNewsId"]: "2D10016E-5BFD-4525-9C28-21080578369E",
            ["uUserId"]: objContext.props.ClientUserDetails.UserId,
            //["cIsTeacher"] : "Y",
            ["vAttachmentFileName"]: objAttachment.OriginalFileName,
            ["iFileSizeInBytes"]: objAttachment.ContentLength,
            ["vFileType"]: objAttachment.OriginalFileName.split('.')[1],
            ["iDisplayOrder"]: intDispalyOrder,
            ["vFileId"]: objAttachment.FileName
        };
        arrAttachMentDataParams = [...arrAttachMentDataParams, objAttachmentParams];
    });

    var objNewsAddToAdd = {
                //["iMainClientId"] : 97,
                ["vText"] : strMessagetext,
                ["cIsTeacher"] : "N",
                ["cIsSchool"] : "Y",
                ["cIsPupil"] : "N",
                ["uClassId"] : "00000000-0000-0000-0000-000000000000",
                ["uUserId"] : objContext.props.ClientUserDetails.UserId,
                //["uNewsId"]: "2D10016E-5BFD-4525-9C28-21080578369E",
                ["uOriginalNewsItemId"]: "00000000-0000-0000-0000-000000000000",
                ["uParentNewsItemId"]: "00000000-0000-0000-0000-000000000000",
                ["t_LearnCoacher_News_ToUser"] : [
                    {
                        ["uNewsToUserId"] : "18885621-14C6-404B-8D59-C8A9538DD004",
                        //["uNewsId"] : "62D5F003-752A-400A-A184-F65114BD7337",
                        ["uGroupId"] : "00000000-0000-0000-0000-000000000000",
                        ["uUserId"] : "00000000-0000-0000-0000-000000000000",
                        ["cIsSchool"] : "N",
                        ["cIsPupil"] :  objContext.state.strTeacherOrPupil === "pupil" ? "Y": "N",
                        ["cIsTeacher"] : objContext.state.strTeacherOrPupil === "teacher" ? "Y": "N",
                        ["cIsForGroup"] : "N",
                        ["cHasBeenViewed"] : "N",
                        ["cIsDeleted"] : "N"
                    }
                
                ],
                ["t_LearnCoacher_News_Attachment"] : arrAttachMentDataParams
            };
    let objMethodParams = { 
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsSchool" : "Y"
                    }
                },
                {
                    "match": {
                        "uUserId" : objContext.props.ClientUserDetails.SchoolDetails.uSchoolId
                    }
                }
            ]
        },    
        "vAddData": objNewsAddToAdd
    };
    let arrAddDataRequest = [
        {
            "URL": "API/Object/Extranet/School/News",
            "Params": objMethodParams,
            "MethodType": "Post"
        }
    ];
    
    ApplicationState.SetProperty("blnShowAnimation", true);
    SendRequest(arrAddDataRequest);
    
    objContext.dispatch({ type: 'WriteMessageText', payload: "" });
    objContext.dispatch({ type: 'ToggleReload', payload: objContext.state.strReloadToggle === "toggle1"?"toggle2":"toggle1" });
}

export function DeleteMessage(objContext, strNewsIdToDelete){
    var arrNewsData = objContext.state.arrNewsData;
    var objNewsToDelete = {};
    arrNewsData.map(objNews => {
        if (objNews.uNewsId === strNewsIdToDelete) {
            objNewsToDelete = objNews;
        }
    });

    let objMethodParams = { 
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsSchool" : "Y"
                    }
                },
                {
                    "match": {
                        "uUserId" : objContext.props.ClientUserDetails.SchoolDetails.uSchoolId
                    }
                }
            ]
        },    
        "vDeleteData": objNewsToDelete
    };
    let arrAddDataRequest = [
        {
            "URL": "API/Object/Extranet/School/News",
            "Params": objMethodParams,
            "MethodType": "Delete"
        }
    ];
    
    ApplicationState.SetProperty("blnShowAnimation", true);
    SendRequest(arrAddDataRequest);
}

/**
 *  update the state by selected schoolyearperiod
 * @param {any} objContext
 * @param {any} objItem
 */
export function OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSchoolYearDropdown: objItem } })    
}

/**
 * common method to send request for crud operations
 * @param {any} objParams
 */
export function SendRequest(arrDataRequestParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrDataRequestParams, function (objReturn) {
        //do anything
    });
}

/**
 * edit teacher
 * @param {any} objContext
 * @param {any} data
 */
export function EditData(objContext, data) {
    let objCallParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Teacher_School.uSchoolId": objContext.props.ClientUserDetails.UserId
        },
        "SortKeys": [
            {
                "dtCreatedOn": {
                    "order": "asc"
                }
            }
        ],
        "vEditData": data,
        "uUserId": objContext.props.ClientUserDetails.UserId
    };

    let arrDataRequest = [
        {
            "URL": "API/Object/Teacher/Teacher",
            "Params": objCallParams,
            "MethodType": "Put"
        }
    ];


    SendRequest(arrDataRequest)
        .then(objResponse => {
            if (objResponse.success) {
                CallAfterDataSaved(objContext);
            }
        });
}

export function GetFormatDate(objContext,strDate){
    var objDate = new Date(strDate); 
    var strFormatDate = objDate.toLocaleDateString(objContext.props.JConfiguration.LanguageCultureInfo) +" " + objDate.getHours() + ":" + objDate.getMinutes();
    return strFormatDate;
}

export function useDataLoaded(objContext) {
    useEffect(() => {

        if (
            DataRef(objContext.props.news, "news;cisschool;y;uUserId;" + objContext.props.ClientUserDetails.SchoolDetails.uSchoolId)["Data"] &&
            DataRef(objContext.props.schoolyearperiod) &&
            DataRef(objContext.props.textresource, "textresource;id;de/d.extranet/2_school/modules/schoolnews")["Data"][0]["SchoolNews"]

        ) {
            Logger.Log(DataRef(objContext.props.news, "news;cisschool;y;uUserId;" + objContext.props.ClientUserDetails.SchoolDetails.uSchoolId)["Data"]);
            let arrNews = DataRef(objContext.props.news, "news;cisschool;y;uUserId;" + objContext.props.ClientUserDetails.SchoolDetails.uSchoolId)["Data"];
            var objTextResource = DataRef(objContext.props.textresource, "textresource;id;de/d.extranet/2_school/modules/schoolnews")["Data"][0]["SchoolNews"];
            var arrNewsSorted = arrNews.sort((a, b) => new Date(a.dtCreatedOn) - new Date(b.dtCreatedOn));
            var arrNewsDataTeacher = [];
            var arrNewsDataPupil = [];
            arrNews.map(objNews=>{        
                if(objNews.t_LearnCoacher_News_ToUser[0].cIsTeacher == "Y" && objNews.cIsDeleted == "N")
                arrNewsDataTeacher = [...arrNewsDataTeacher,objNews];                     
                if(objNews.t_LearnCoacher_News_ToUser[0].cIsPupil == "Y" &&  objNews.cIsDeleted == "N")
                arrNewsDataPupil = [...arrNewsDataPupil,objNews];
            });
            objContext.dispatch({ type: "Load_News_Data", payload: arrNewsSorted });
            objContext.dispatch({ type: "Load_News_Data_Teacher", payload: arrNewsDataTeacher });
            objContext.dispatch({ type: "Load_News_Data_Pupil", payload: arrNewsDataPupil });
            objContext.dispatch({ type: "Load_TextResource_Data", payload: objTextResource });
            ApplicationState.SetProperty("blnShowAnimation", false);
            if(!objContext.state.isLoadComplete)
            {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });                
            }
            
        }
        else {
            Logger.Log("data is loading");
        }
    },
        [objContext.props.news, objContext.props.textresource, objContext.props.schoolyearperiod]);
}

export function OpenImportPopup(objContext, objTextResource) {
    objContext.props.showPopup({
        MaxHeight: '70%',
        MaxWidth: '84%',
        popUpMinHeight: '70%',
        popUpMinWidth: '84%',
        showHeader: false,
        popUpName: 'import_data', //name of the component to be displayed inside the popup. must be present in ComponentController
        passedEvents: {
            objTextResource: objTextResource,
            ClientUserDetails : objContext.props.ClientUserDetails,
        },
        headerTitle: '',
        Data: {}

    })
}

/**
 * state of the teacher component
 * */
export function GetInitialState() {
    return {
        strMessagetext: "",
        isLoadComplete: false,
        arrNewsData:[],
        strTeacherOrPupil: "teacher",
        objSchoolYearDropdown:undefined
    }
}

/**
 * reducer 
 * @param {any} state
 * @param {any} action
 */
export function Reducer(state, action) {
    switch (action.type) {
        case "WriteMessageText": {
            return {
                ...state,
                strMessagetext: action.payload
            };

        }        
        case 'DATA_LOAD_COMPLETE': {
            return { ...state, ["isLoadComplete"]: action.payload };
        }
        case 'Load_News_Data':{
            return { ...state, ["arrNewsData"]: action.payload };
        }
        case 'Load_TextResource_Data':{
            return { ...state, ["objTextResource"]: action.payload };
        }
        case 'Load_News_Data_Teacher':{
            return { ...state, ["arrNewsDataTeacher"]: action.payload };
        }
        case 'Load_News_Data_Pupil':{
            return { ...state, ["arrNewsDataPupil"]: action.payload };
        }
        case 'SelectTeacherOrPupil':{
            return { ...state, ["strTeacherOrPupil"]: action.payload };
        }
        case 'ToggleReload':{
            return { ...state, ["strReloadToggle"]: action.payload };
        }
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            }
        
    }
}