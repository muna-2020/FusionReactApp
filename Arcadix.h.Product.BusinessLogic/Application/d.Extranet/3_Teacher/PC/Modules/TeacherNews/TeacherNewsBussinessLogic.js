import { useState, useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            textresource: DataRef(state.Entity, "textresource", true),
            class: DataRef(state.Entity, "class", true),
            pupil: DataRef(state.Entity,"pupil",true),
            newsgroup: DataRef(state.Entity,"newsgroup",true),
            school: DataRef(state.Entity, "school", true),
            object_extranet_teacher: DataRef(state.Entity, "object_extranet_teacher", true),
            showPopup: state.ApplicationState.showPopUp,
            closePopup: state.ApplicationState.closePopUp,
            schoolyearperiod: DataRef(state.Entity, "schoolyearperiod", true)
        };
    }
    else {
        return {};
    }
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
    arrAttachMents.map(objAttachment=>{
        intDispalyOrder++;
        var objAttachmentParams = {
            ["uUserId"] : objContext.props.ClientUserDetails.UserId,
            ["vAttachmentFileName"]: objAttachment.OriginalFileName,
            ["iFileSizeInBytes"]: objAttachment.ContentLength,
            ["vFileType"]: objAttachment.OriginalFileName.split('.')[1],
            ["iDisplayOrder"]: intDispalyOrder,
            ["vFileId"]: objAttachment.FileName
        };
        arrAttachMentDataParams = [...arrAttachMentDataParams,objAttachmentParams];
    })
    var blnIsTeacher = (objContext.state.strType === "teacher" || objContext.state.strType === "coteacher" || objContext.state.strType === "subjectexpert")?true:false;
    var objNewsAddToAdd = {
                ["vText"] : strMessagetext,
                ["cIsTeacher"] : "Y",
                ["cIsSchool"] : "N",
                ["cIsPupil"] : "N",
                ["uClassId"] : objContext.state.objSelectedClass.uClassId,//"37FE13C3-D0F0-4759-BC8F-40AC49D21B1D",
                ["uUserId"] : objContext.props.ClientUserDetails.UserId,//"5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B",//Rashmi
                ["uOriginalNewsItemId"]: "00000000-0000-0000-0000-000000000000",
                ["uParentNewsItemId"]: "00000000-0000-0000-0000-000000000000",
                ["t_LearnCoacher_News_ToUser"] : [
                    {
                        ["uGroupId"] :objContext.state.strType === "group" ? objContext.state.strSelectedId : "00000000-0000-0000-0000-000000000000",
                        ["uUserId"] : objContext.state.strSelectedId,
                        ["cIsSchool"] : "N",
                        ["cIsPupil"] :  objContext.state.strType === "pupil" ? "Y": "N",
                        ["cIsTeacher"] : blnIsTeacher ? "Y": "N",
                        ["cIsForGroup"] : objContext.state.strType === "group" ? "Y": "N",
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
   
    SendRequest(arrAddDataRequest);
    objContext.dispatch({ type: 'WriteMessageText', payload: "" });
    objContext.dispatch({ type: 'ToggleReload', payload: objContext.state.strReloadToggle === "toggle1"?"toggle2":"toggle1" });
    LoadMessages(objContext);
}

export function DeleteMessage(objContext, strNewsIdToDelete){
    var arrNewsData = objContext.state.arrNewsData;
    var objNewsToDelete ;
    arrNewsData.map(objNews=>{
       if(objNews.uNewsId === strNewsIdToDelete){
        objNewsToDelete = objNews;
       }
    })

    let objMethodParams = { 
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "cIsSchool" : "Y"
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
    ArcadixFetchData.Execute(arrAddDataRequest, (res)=>{
        LoadMessages(objContext);
    });
}

/**
 * edit teacher
 * @param {any} objContext
 * @param {any} data
 */
export function EditData(objContext, data) {
    let jCallParams = {
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
            "URL": "API/Object/Extranet/Teacher",
            "Params": jCallParams,
            "MethodType": "Put",
            "UseFullName":true
        }
    ];
    SendRequest(arrDataRequest);     
}

export function GetFormatDate(objContext,strDate){
    var objDate = new Date(strDate); 
    var strFormatDate = objDate.toLocaleDateString(objContext.props.JConfiguration.LanguageCultureInfo) +" " + objDate.getHours() + ":" + objDate.getMinutes();
    return strFormatDate;
}

/**
 *  update the state by selected schoolyearperiod
 * @param {any} objContext
 * @param {any} objItem
 */
export function OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSchoolYearDropdown: objItem } })    
}

export function AddGroup(objContext, strClassName, arrGroupData){
    console.log('arrGroupData',arrGroupData)
    var arrGroupUser = [];
    arrGroupData.map(objGroupData=>{
        arrGroupUser = [...arrGroupUser,{
            ["uUserId"] : objGroupData.uTeacherId ? objGroupData.uTeacherId : objGroupData.uPupilId,
            ["cIsTeacher"] : objGroupData.uTeacherId ? "Y" : "N",
            ["cIsPupil"] : objGroupData.uPupilId ? "Y" : "N"
        }]
    })
 
    var objAddData = {
                    ["vGroupName"] : strClassName,
                    ["cIsTeacher"] : "Y",
                    ["cIsPupil"] : "N",
                    ["uClassId"] : objContext.state.objSelectedClass.uClassId,
                    ["uUserId"] : objContext.props.ClientUserDetails.UserId,
                    ["t_LearnCoacher_News_Group_User"] :arrGroupData
    }

    let objMethodParams = { 
        "ForeignKeyFilter":{
            "uClassId":objContext.state.objSelectedClass.uClassId
        },
        "vAddData": objAddData
    };
    let arrAddDataRequest = [
        {
            "URL": "API/Object/Extranet/School/News/NewsGroup",
            "Params": objMethodParams,
            "MethodType": "Post"
        }
    ];   
    SendRequest(arrAddDataRequest);
}

export function EditGroup(objContext, strGroupName, arrGroupData){
    var arrGroupUser = [];
    var objAddData = {
                    ["vGroupName"] : strGroupName,
                    ["cIsTeacher"] : "Y",
                    ["cIsPupil"] : "N",
                    ["uClassId"] : objContext.state.objSelectedClass.uClassId,
                    ["uUserId"] : objContext.props.ClientUserDetails.UserId,
                    ["uNewsGroupId"]:objContext.state.strSelectedId,
                    ["t_LearnCoacher_News_Group_User"] :arrGroupData
    }
    let objMethodParams = { 
        "ForeignKeyFilter":{
            "uClassId":objContext.state.objSelectedClass.uClassId
        },
        "vEditData": objAddData
    };
    let arrAddDataRequest = [
        {
            "URL": "API/Object/Extranet/School/News/NewsGroup",
            "Params": objMethodParams,
            "MethodType": "Put"
        }
    ];   
    SendRequest(arrAddDataRequest);
}
export function DeleteGroup(objContext){
    console.log('arrGroupData',arrGroupData);
    let arrGroupData = DataRef(objContext.props.newsgroup,"newsgroup;uClassId;" + objContext.state.objSelectedClass.uClassId)["Data"];
    var objGroup = arrGroupData.find(item=> {return item.uNewsGroupId === objContext.state.strSelectedId});    
    let objMethodParams = { 
        "ForeignKeyFilter":{
            "uClassId":objContext.state.objSelectedClass.uClassId
        },
        "vDeleteData": objGroup
    };
    let arrAddDataRequest = [
        {
            "URL": "API/Object/Extranet/School/News/NewsGroup",
            "Params": objMethodParams,
            "MethodType": "Delete"
        }
    ];   
    SendRequest(arrAddDataRequest);
}

export function GetSelectedMessages(objContext,strType, strSelectedId){
    objContext.dispatch({ type: "Select_Type", payload: strType}); 
    objContext.dispatch({ type: "Select_Id", payload: strSelectedId});       
    objContext.dispatch({type:"Set_ForwardMessages_Id",payload:[]});
}

export function GetMainTeacher(objSelectedClass){
    var objMainTeacher = {};  
    var arrSubtable  = [...objSelectedClass.t_TestDrive_Member_Class_Teacher];
    objMainTeacher = arrSubtable.find(objClassTeacher=>{
        return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N" 
    })
    return objMainTeacher;
}

export function GetCoTeachers(objSelectedClass){
    var arrCoTeachersForSelectedClass = [];  
    var arrSubtable  = [...objSelectedClass.t_TestDrive_Member_Class_Teacher];
    arrCoTeachersForSelectedClass = arrSubtable.filter(objClassTeacher=>{
        return objClassTeacher.cIsCoTeacher === "Y" && objClassTeacher.cIsSubjectExpert === "N"
    })
    return arrCoTeachersForSelectedClass;
}

export function GetSubjectExperts(objSelectedClass){
    var arrSubjectExpertsForSelectedClass = [];  
    var arrSubtable  = [...objSelectedClass.t_TestDrive_Member_Class_Teacher];
    arrSubjectExpertsForSelectedClass = arrSubtable.filter(objClassTeacher=>{
        return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "Y"
    })
    return arrSubjectExpertsForSelectedClass;
}

export function LoadGroupData(objSelectedClass){
    var objGroupParams = {
         "ForeignKeyFilter": {
         "uClassId" : objSelectedClass.uClassId
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
    let arrParams = [
        {
            "URL": "API/Object/Extranet/School/News/NewsGroup",
            "Params": objGroupParams,
            "MethodType": "Get"
        }
    ];   
    SendRequest(arrParams);
}

export function HandleDropDownForClass(objContext, objSelectedClass){
    objContext.dispatch({ type: "Select_Class", payload: objSelectedClass });
    objContext.dispatch({ type: "Select_Type", payload: "school" });
    objContext.dispatch({ type: "SetTeachersAndSubjectExperts", payload:
        {
            arrCoTeachers : GetCoTeachers(objSelectedClass),
            arrSubjectExperts : GetSubjectExperts(objSelectedClass),
            objMainTeacher : GetMainTeacher(objSelectedClass)
        } 
    });     
    LoadPupilData(objSelectedClass);
    LoadGroupData(objSelectedClass);
}

export function LoadMessages(objContext){
    let jCallParams = {
        "ForeignKeyFilter": {
            ["uClassId"] : objContext.state.objSelectedClass.uClassId
        },
        ["uClassId"] : objContext.state.objSelectedClass.uClassId,
        ["uSchoolId"] : objContext.props.ClientUserDetails.TeacherDetails.uSchoolId,//5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B
        ["SearchText"] : "",
        ["uTeacherId"] : objContext.props.ClientUserDetails.UserId
    };

    let arrDataRequest = [
        {
            "URL": "API/Extranet/Teacher/TeacherNews/GetTeacherNews",
            "Params": jCallParams,
        }
    ];

    ArcadixFetchData.Execute(arrDataRequest, (response) => {
        if(response["TeacherNews"] && response["TeacherNews"]["Data"]){
            var arrNewsData = response["TeacherNews"]["Data"];
            arrNewsData = arrNewsData.filter(item=>{return item.cIsDeleted === "N"});
            objContext.dispatch({ type: "Set_News_Data", payload: arrNewsData});
        }   
    })
}

export function LoadSchoolNews(arrNewsData){ 
    var arrNews = arrNewsData.filter(objNews => objNews.cIsSchool === "Y");
    var arrNewsSorted = arrNews.sort((a, b) => new Date(a.dtCreatedOn) - new Date(b.dtCreatedOn));
    return arrNewsSorted
}
export function LoadPupilNews(arrNewsData){
    var arrNews = arrNewsData.filter(objNews => objNews.cIsPupil === "Y");
    var arrNewsSorted = arrNews.sort((a, b) => new Date(a.dtCreatedOn) - new Date(b.dtCreatedOn));
    return arrNewsSorted
}
export function LoadPupilData(objSelectedClass){
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": objSelectedClass.uClassId,
            "Type": "nested"
        },
    };

    let arrParams = [
        {
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        }
    ];
    SendRequest(arrParams);
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
 * loading initial data
 * @param {any} JConfiguration
 * @param {any} props
 */
export function InitialDataParams(JConfiguration, props) {
    var objResourceParams = {       
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TeacherNews"
                        
                    }
                }
            ]
        }
    };
    let objClassParams = {
        "ForeignKeyFilter":{
            "t_TestDrive_Member_Class_Teacher.uTeacherId": props.ClientUserDetails.UserId,
            "Type": "nested"
        }
    };
    var objParamsSchoolData = {
        "ForeignKeyFilter": {},
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "uSchoolId": props.ClientUserDetails.TeacherDetails.uSchoolId
                    }
                } ]  
        },
        "SortKeys": {},
        "OutputColumns": {}
    };
    var objTeacherParams = {

        "ForeignKeyFilter": {
            "t_TestDrive_Member_Teacher_School.uSchoolId": props.ClientUserDetails.TeacherDetails.uSchoolId,
            "Type": "nested"
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

    var objGetSchoolYearPeriodParams = {
        "ForeignKeyFilter": {},

        "SortKeys": [],

        "OutputColumns": []
    };

    var arrDataRequest = [
        {
            "URL": "API/Object/Blocks/TextResource/TextResource",
            "Params": objResourceParams,
            "MethodType": "Get",
            "ReturnDataOnServerRender": true
        },
        {
            "URL": "API/Object/Extranet/Teacher/Class",
            "Params": objClassParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/School",
            "Params": objParamsSchoolData,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/Teacher",
            "Params": objTeacherParams,
            "MethodType": "Get",
            "UseFullName":true
        },
        {
            "URL": "API/Object/Extranet/Teacher/SchoolYearPeriod",
            "Params": objGetSchoolYearPeriodParams,
            "MethodType": "Get"
        }
    ];
    return { DataCalls: arrDataRequest };
};

export function DataCall(objContext) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls, function (objReturn) {
    });
}

export function useDataLoader(objContext) {
    const getRequiredData = () => {
        Logger.Log("getting required data");
        DataCall(objContext);
    }
    useLayoutEffect(getRequiredData, []);
}

export function useDataLoaded(objContext) {
    useEffect(() => {
        if (
            DataRef(objContext.props.textresource,"textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TeacherNews") &&
            DataRef(objContext.props.class,"class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId)&&
            DataRef(objContext.props.school, "school;uschoolid;" + objContext.props.ClientUserDetails.TeacherDetails.uSchoolId) &&
            DataRef(objContext.props.schoolyearperiod) &&
            DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;t_testdrive_member_teacher_school.uschoolid;" + objContext.props.ClientUserDetails.TeacherDetails.uSchoolId)&&
            !objContext.state.isLoadComplete 
        ) {
            let arrClassData = DataRef(objContext.props.class, "class;t_testdrive_member_class_teacher.uteacherid;" + objContext.props.ClientUserDetails.UserId)["Data"];
            let objSchoolData = DataRef(objContext.props.school, "school;uschoolid;" + objContext.props.ClientUserDetails.TeacherDetails.uSchoolId)["Data"][0];
            let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TeacherNews")["Data"][0]["TeacherNews"];
            let arrTeacher = DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;t_testdrive_member_teacher_school.uschoolid;" + objContext.props.ClientUserDetails.TeacherDetails.uSchoolId)["Data"];
            objContext.dispatch({ type: "Load_DropDown_Data", payload: arrClassData });
            objContext.dispatch({ type: "Select_Class", payload: arrClassData[0] });
            objContext.dispatch({ type: "Load_School_Data", payload: objSchoolData});      
            objContext.dispatch({ type: "Set_Text_Resource", payload: objTextResource});
            objContext.dispatch({ type: "Load_Teacher_Data", payload: arrTeacher});      

            if (objContext.state.arrNewsData.length === 0 && objContext.state.objSelectedClass.uClassId !== undefined) {              
                LoadPupilData(arrClassData[0]);   
                LoadGroupData(arrClassData[0]);
                LoadMessages(objContext);
            }        
            else if(objContext.state.arrNewsData.length > 0){
                var arrSchoolNews = LoadSchoolNews(objContext.state.arrNewsData);
                objContext.dispatch({type: "Load_News_Data",payload: {arrSchoolNews:arrSchoolNews}});               
            }   
            if(objContext.state.arrSchoolNews)
                {
                    objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                }       
        }
        else {
            Logger.Log("data is loading");
        }
    },
        [objContext.props.class, objContext.props.school, objContext.props.textresource, objContext.props.object_extranet_teacher, objContext.state.objSelectedClass, objContext.state.arrNewsData, objContext.state.arrSchoolNews, objContext.props.schoolyearperiod]);
}

export function GetForwardMessagesId(objContext, strNewsId){

    var arrForwardMessagesId = objContext.state.arrForwardMessagesId;
    var blnIsNewsIdPresent = arrForwardMessagesId.indexOf(strNewsId) === -1 ? false : true;
    var arrNewForwardMessagesId = [];
    if(blnIsNewsIdPresent){
        arrNewForwardMessagesId = arrForwardMessagesId.filter(item => {return item !== strNewsId});
    }
    else{
        arrNewForwardMessagesId = [...arrForwardMessagesId, strNewsId]
    }
    objContext.dispatch({type: "Set_ForwardMessages_Id", payload:arrNewForwardMessagesId});
}

export function AbortForward(objContext){
    objContext.dispatch({type: "Set_ForwardMessages_Id", payload:[]});
}

export function ForwardMessage(objContext,arrGroupData){
    var arrForwardMessagesId = objContext.state.arrForwardMessagesId;
    var arrNews = [];

    arrForwardMessagesId.map(strForwardId =>{
        var objOriginalNews = objContext.state.arrNewsData.find(item=>{return item.uNewsId === strForwardId});
        arrGroupData.map(objToUserDAta =>{
            var objNewsToForward = {
                "uUserId" : objContext.props.ClientUserDetails.UserId,
                "uClassId" : objContext.state.strClassId,
                "cIsPupil" : "N",
                "cIsSchool" : "N",
                "cIsTeacher" : "Y",
                "uOriginalNewsItemId" : objOriginalNews.uOriginalNewsItemId === "00000000-0000-0000-0000-000000000000" ? objOriginalNews.uNewsId:objOriginalNews.uOriginalNewsItemId,
                "uParentNewsItemId" : objOriginalNews.uNewsId,
                "vText" : objOriginalNews.vText,
                "t_LearnCoacher_News_ToUser" :[objToUserDAta],
                "t_LearnCoacher_News_Attachment" : objOriginalNews.t_LearnCoacher_News_Attachment
            }
            arrNews = [...arrNews,objNewsToForward];
        })
    })
       
    arrNews.map(item=>{
        let objMethodParams = { 
            "vAddData": item
        };
        let arrAddDataRequest = [
            {
                "URL": "API/Object/Extranet/School/News",
                "Params": objMethodParams,
                "MethodType": "Post"
            }
        ];      
        SendRequest(arrAddDataRequest);
    })
    LoadMessages(objContext);
}

/**
 * reducer 
 * @param {any} state
 * @param {any} action
 */
export function Reducer(state, action) {
    switch (action.type) {
        case "WriteMessageText": {
            return {...state,strMessagetext: action.payload};
        }
        case 'ToggleReload':{
            return { ...state, ["strReloadToggle"]: action.payload };
        }
        case 'DATA_LOAD_COMPLETE': {
            return { ...state, ["isLoadComplete"]: action.payload };
        }
        case 'Load_DropDown_Data':{
            return { ...state, ["arrClassData"]: action.payload };
        }
        case 'Load_Teacher_Data':{
            return { ...state, ["arrTeacherData"]: action.payload };
        }
        case 'Set_Text_Resource':{
            return { ...state, ["objTextResource"]: action.objTextResource };
        }
        case 'Select_Class':{
            return { ...state, ["objSelectedClass"]: action.payload };
        }
        case 'SetTeachersAndSubjectExperts':{
            return { ...state, ...action.payload };
        }
        case 'Select_Id':{
            return { ...state, ["strSelectedId"]: action.payload };
        }
        case 'Select_Type':{
            return { ...state, ["strType"]: action.payload };
        }
        case 'Load_School_Data':{
            return { ...state, ["objSchoolData"]: action.payload };
        }
        case 'Set_News_Data':{
            return { ...state, ["arrNewsData"]: action.payload };
        }
        case 'Load_News_Data':{
            return { ...state,
                 ["arrSchoolNews"]: action.payload.arrSchoolNews,
                 ["arrPupilNews"]:action.payload.arrPupilNews
                 };
        }
        case 'Set_ForwardMessages_Id':{
            return { ...state, ["arrForwardMessagesId"]: action.payload };
        }
        case 'SET_STATE_VALUES':
            return {
                ...state,
                ...action.payload
            }
        
    }
}

/**
 * state of the teacherNews component
 * */
export function GetInitialState() {
    return {
        strMessagetext: "",
        isLoadComplete: false,
        arrClassData:[],
        objSelectedClass:{},
        objSchoolData:{},
        arrNewsData:[],
        arrSchoolNews:[],
        arrPupilNews:[],
        arrTeacherData:[],
        strSelectedId:"",
        strType:"school",
        objTextResource:{},
        objMainTeacher:{},
        arrCoTeachers:[],
        arrSubjectExperts:[],
        arrGroupData:[],
        arrForwardMessagesId: [],
        objSchoolYearDropdown:undefined
    }
}