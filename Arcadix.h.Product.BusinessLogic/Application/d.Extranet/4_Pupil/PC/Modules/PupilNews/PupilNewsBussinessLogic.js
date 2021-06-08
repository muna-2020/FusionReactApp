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
    var blnIsTeacher = (objContext.state.strType === "teacher" || objContext.state.strType === "coteacher" || objContext.state.strType === "subjectexpert")?true:false;
    var objNewsAddToAdd = {
                ["vText"] : strMessagetext,
                ["cIsTeacher"] : "N",
                ["cIsSchool"] : "N",
                ["cIsPupil"] : "Y",
                ["uClassId"] : objContext.state.strClassId,//"37FE13C3-D0F0-4759-BC8F-40AC49D21B1D",
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
                    ["uClassId"] : objContext.state.strClassId,
                    ["uUserId"] : objContext.props.ClientUserDetails.UserId,
                    ["t_LearnCoacher_News_Group_User"] :arrGroupData
    }
    console.log('objAddData',objAddData);

    let objMethodParams = { 
        "ForeignKeyFilter":{
            "uClassId":objContext.state.strClassId
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
    var objAddData = {
        ["vGroupName"]: strGroupName,
        ["cIsTeacher"]: "Y",
        ["cIsPupil"]: "N",
        ["uClassId"]: objContext.state.strClassId,
        ["uUserId"]: objContext.props.ClientUserDetails.UserId,
        ["uNewsGroupId"]: objContext.state.strSelectedId,
        ["t_LearnCoacher_News_Group_User"]: arrGroupData
    };
    let objMethodParams = {       
        "ForeignKeyFilter":{
            "uClassId":objContext.state.strClassId
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
    let arrGroupData = DataRef(objContext.props.newsgroup,"newsgroup;uClassId;" + objContext.state.strClassId)["Data"];
    var objGroup = arrGroupData.find(item=> {return item.uNewsGroupId === objContext.state.strSelectedId});   
    let objMethodParams = { 
        "ForeignKeyFilter":{
            "uClassId":objContext.state.strClassId
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

export function GetCoTeachers(objSelectedClass){
    var arrCoTeachersForSelectedClass = [];  
    var arrSubtable  = [...objSelectedClass.t_TestDrive_Member_Class_Teacher];
    arrCoTeachersForSelectedClass = arrSubtable.filter(objClassTeacher => {
        return objClassTeacher.cIsCoTeacher === "Y" && objClassTeacher.cIsSubjectExpert === "N"
    });
    return arrCoTeachersForSelectedClass;
}

export function GetSubjectExperts(objSelectedClass){
    var arrSubjectExpertsForSelectedClass = [];  
    var arrSubtable  = [...objSelectedClass.t_TestDrive_Member_Class_Teacher];
    arrSubjectExpertsForSelectedClass = arrSubtable.filter(objClassTeacher => {
        return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "Y"
    });
    return arrSubjectExpertsForSelectedClass;
}

export function LoadGroupData(objSelectedClass){
    var objGroupParams = {
        "ForeignKeyFilter": {
            "uClassId" : strClassId
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
    objContext.dispatch({ type: "SetCoTeachersAndCoTeachers", payload:
        {
            arrCoTeachers : GetCoTeachers(objSelectedClass),
            arrSubjectExperts : GetSubjectExperts(objSelectedClass)
        } 
    });  
    LoadPupilData(objSelectedClass);
    LoadGroupData(objSelectedClass);
}

export function LoadMessages(objContext) {
    let objPupilClass = GetPupilClass(objContext.props);
    let jCallParams = {
        "ForeignKeyFilter": {
            ["uClassId"] : objContext.state.strClassId
        },
        ["uClassId"] : objContext.state.strClassId,
        ["uSchoolId"]: objPupilClass.uSchoolId,//5193BD0F-7DB2-4CBF-919D-0D398F8C7D1B
        ["SearchText"] : "",
        ["uPupilId"] : objContext.props.ClientUserDetails.UserId
    };

    let arrDataRequest = [
        {
            "URL": "API/Extranet/Pupil/PupilNews/GetPupilNews",
            "Params": jCallParams
        }
    ];

    ArcadixFetchData.Execute(arrDataRequest, (response) => {
        if (response["PupilNews"] && response["PupilNews"]["Data"]) {
            var arrNewsData = response["PupilNews"]["Data"];
            arrNewsData = arrNewsData.filter(item => { return item.cIsDeleted === "N" });
            objContext.dispatch({ type: "Set_News_Data", payload: arrNewsData });
        }
    });
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
            "t_TestDrive_Member_Class_Pupil.uClassId": strClassId,
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
            ClientUserDetails : objContext.props.ClientUserDetails
        },
        headerTitle: '',
        Data: {}
       })
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
/**
 * common method to send request for crud operations
 * @param {any} objParams
 */
export function SendRequest(arrDataRequestParams) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrDataRequestParams, function (objReturn) {
    });
}

export function GetClassTeachersDetails(objContext, arrClassTeachersData){
    var objMainTeacher = {};
    objMainTeacher = arrClassTeachersData.find(objClassTeacher=>{
        return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "N"
    })
    var arrCoTeachers = [];  
    arrCoTeachers= arrClassTeachersData.filter(objClassTeacher=>{
        return objClassTeacher.cIsCoTeacher === "Y" && objClassTeacher.cIsSubjectExpert === "N"
    })
    var arrSubjectExperts = [];  
    arrSubjectExperts= arrClassTeachersData.filter(objClassTeacher=>{
        return objClassTeacher.cIsCoTeacher === "N" && objClassTeacher.cIsSubjectExpert === "Y"
    })
    objContext.dispatch({ type: "SetCoTeachersAndCoTeachers", payload:
    {
        objMainTeacher: objMainTeacher,
        arrCoTeachers : arrCoTeachers,
        arrSubjectExperts : arrSubjectExperts
    } 
}); 
}

export function ForwardMessage(objContext,arrGroupData){
    var arrForwardMessagesId = objContext.state.arrForwardMessagesId
    var arrNews = [];
    arrForwardMessagesId.map(strForwardId => {
        var objOriginalNews = objContext.state.arrNewsData.find(item => { return item.uNewsId === strForwardId });
        arrGroupData.map(objToUserDAta => {
            var objNewsToForward = {
                "uUserId": objContext.props.ClientUserDetails.UserId,
                "uClassId": objContext.state.strClassId,
                "cIsPupil": "Y",
                "cIsSchool": "N",
                "cIsTeacher": "N",
                "uOriginalNewsItemId": objOriginalNews.uOriginalNewsItemId === "00000000-0000-0000-0000-000000000000" ? objOriginalNews.uNewsId : objOriginalNews.uOriginalNewsItemId,
                "uParentNewsItemId": objOriginalNews.uNewsId,
                "vText": objOriginalNews.vText,
                "t_LearnCoacher_News_ToUser": [objToUserDAta],
                "t_LearnCoacher_News_Attachment": objOriginalNews.t_LearnCoacher_News_Attachment
            };
            arrNews = [...arrNews, objNewsToForward];
        });
    });
    arrNews.map(item => {
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
    });
    LoadMessages(objContext);
}

/**
 * loading initial data
 * @param {any} JConfiguration
 * @param {any} props
 */
export function InitialDataParams(JConfiguration, props) {
    let objPupilClass = GetPupilClass(props);
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
                        "Id": JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilNews"
                        
                    }
                }
            ]
        },
        "OutputColumns": []
    };
    let objClassParams = {
        "SearchQuery": {
            "must": [
                {
                  "match": {
                      "uClassId": GetClassId(props)
                  }
                }
              ]            
        }
    };
    let objPupilParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Class_Pupil.uClassId": GetClassId(props),
            "Type": "nested"
        },
    };
    var objParamsSchoolData = {
        "ForeignKeyFilter": {},
        "SearchQuery": {
            "must": [
                {
                    "match": {
                        "uSchoolId": objPupilClass.uSchoolId
                    }
                } ]  
        },
        "SortKeys": {},
        "OutputColumns": {}
    };
    var objGroupParams = {
        "ForeignKeyFilter": {
            "uClassId": GetClassId(props)
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
    var objTeacherParams = {
        "ForeignKeyFilter": {
            "t_TestDrive_Member_Teacher_School.uSchoolId": objPupilClass.uSchoolId,
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
            "URL": "API/Object/Extranet/Pupil/Pupil",
            "Params": objPupilParams,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/School",
            "Params": objParamsSchoolData,
            "MethodType": "Get"
        },
        {
            "URL": "API/Object/Extranet/School/News/NewsGroup",
            "Params": objGroupParams,
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

/**
 *  update the state by selected schoolyearperiod
 * @param {any} objContext
 * @param {any} objItem
 */
export function OnChangeSchoolYearPeriodDropdown(objContext, objItem) {
    objContext.dispatch({ type: 'SET_STATE_VALUES', payload: { objSchoolYearDropdown: objItem } })
}

export function GetPupilClass(props) {
    var objClass = {};
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.map(item => {
        if (item.uClassId == strClassId) {
            objClass = item;
        }
    });
    return objClass;
}

export function DataCall(objContext) {
    var objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(InitialDataParams(objContext.props.JConfiguration, objContext.props).DataCalls, function (objReturn) {
    });
}

export function useDataLoader(objContext) {
    const getRequiredData = () => {
        DataCall(objContext);
    };
    useLayoutEffect(getRequiredData, []);
}

export function useDataLoaded(objContext) {
    useEffect(() => {
        let objPupilClass = GetPupilClass(objContext.props);
        if (
            DataRef(objContext.props.textresource,"textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilNews") &&
            DataRef(objContext.props.pupil,"pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + objContext.state.strClassId)&&
            DataRef(objContext.props.school, "school;uschoolid;" + objPupilClass.uSchoolId)&&
            DataRef(objContext.props.newsgroup,"newsgroup;uClassId;" + objContext.state.strClassId) &&
            DataRef(objContext.props.class, "class;uClassId;" + objContext.state.strClassId) &&
            DataRef(objContext.props.schoolyearperiod) &&
            DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;t_testdrive_member_teacher_school.uschoolid;" + objPupilClass.uSchoolId)            
        ) {
            let objSchoolData = DataRef(objContext.props.school, "school;uschoolid;" + objPupilClass.uSchoolId)["Data"][0];
            let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilNews")["Data"][0]["PupilNews"];
            let arrGroupData = DataRef(objContext.props.newsgroup,"newsgroup;uClassId;" + objContext.state.strClassId)["Data"];
            let arrPupilData = DataRef(objContext.props.pupil,"pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + objContext.state.strClassId)["Data"];
            let arrClassTeachersData = DataRef(objContext.props.class,"class;uClassId;" + objContext.state.strClassId)["Data"][0].t_TestDrive_Member_Class_Teacher;
            GetClassTeachersDetails(objContext, arrClassTeachersData);
            let arrTeacherData = DataRef(objContext.props.object_extranet_teacher, "object_extranet_teacher;t_testdrive_member_teacher_school.uschoolid;" + objPupilClass.uSchoolId)["Data"];
            objContext.dispatch({ type: "Load_School_Data", payload: objSchoolData});      
            objContext.dispatch({ type: "Set_Text_Resource", payload: objTextResource});
            objContext.dispatch({ type: "Set_Group_Data", payload: arrGroupData});
            objContext.dispatch({ type: "Set_Pupil_Data", payload: arrPupilData});
            objContext.dispatch({ type: "Load_Teacher_Data", payload: arrTeacherData});
            LoadMessages(objContext);            
            if(!objContext.state.isLoadComplete )
                {
                objContext.dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
                ApplicationState.SetProperty("blnShowAnimation", false);
                }       
        }
        else {
            Logger.Log("data is loading");
        }
    },
        [objContext.props.class, objContext.props.school, objContext.props.textresource, objContext.props.newsgroup, objContext.props.pupil, objContext.props.object_extranet_teacher, objContext.props.class, objContext.props.schoolyearperiod]);
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
        case 'SetCoTeachersAndCoTeachers':{
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
        case 'Set_Group_Data':{
            return { ...state, ["arrGroupData"]: action.payload };
        } 
        case 'Set_Pupil_Data':{
            return { ...state, ["arrPupilData"]: action.payload };
        } 
        case 'Set_ForwardMessages_Id':{
            return { ...state, ["arrForwardMessagesId"]: action.payload };
        }
        case 'SET_STATE_VALUES': {
            return {
                ...state,
                ...action.payload
            }
        }
    }
}

export function GetClassId(props){
    //var strClassId = "";
    //props.ClientUserDetails.PupilDetails.t_TestDrive_Member_Class_Pupil.map(item => {
    //    if (item.cIsDeleted === "N") {
    //        strClassId = item.uClassId;
    //    }
    //});
    //return strClassId;
    return ApplicationState.GetProperty("SelectedClassId");
}

/**
 * state of the PupilNews component
 * */
export function GetInitialState(props) {
    return {
        strMessagetext: "",
        isLoadComplete: false,
        arrClassData: [],
        objSelectedClass: {},
        objSchoolData: {},
        arrNewsData: [],
        arrSchoolNews: [],
        arrPupilNews: [],
        arrTeacherData: [],
        strSelectedId: "",
        strType: "school",
        objTextResource: {},
        objMainTeacher: {},
        arrCoTeachers: [],
        arrSubjectExperts: [],
        arrGroupData: [],
        strClassId: GetClassId(props),
        arrPupilData: [],
        arrForwardMessagesId: [],
        objSchoolYearDropdown:undefined
    };
}