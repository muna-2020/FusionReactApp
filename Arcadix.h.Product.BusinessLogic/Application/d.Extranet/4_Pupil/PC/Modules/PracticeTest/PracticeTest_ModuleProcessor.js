//Module object imports.
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Extranet_Pupil_PracticeTest_Module from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/PracticeTest_Module';


/**
 * @name PracticeTest_ModuleProcessor
 * @summary module processor for pupil Document.
 * */
class PracticeTest_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    constructor() {
        super();
        this.strCycleTypeId = "4";
    }

    /**
    * @name StoreMapList     
    * @summary Returns list of objects used in the module
    * @return {Array} Array of object list
    */
    static StoreMapList() {
        return ["Object_Framework_Services_TextResource", "Object_Intranet_Taxonomy_Subject", "Object_Intranet_Cycle_Cycle", "Extranet_Pupil_PracticeTest_Module"];
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
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) {
        let arrDataRequest = [];

        //Text Resource
        let arrResourcePath = ["/d.Extranet/4_Pupil/Modules/PracticeTest"];
        Object_Framework_Services_TextResource.Initialize(arrResourcePath);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        //Subject
        let objSubjectParams = {
            "ForeignKeyFilter": {},
            "SearchQuery":
            {
                "must": [
                    {
                        "match": {
                            "cIsTestedAtThisTime": "Y"
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
        Object_Intranet_Taxonomy_Subject.Initialize(objSubjectParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        //Cycle
        let objCycleParams = {
            "SearchQuery":
            {
                "must":
                    [
                        {
                            "match": {
                                "iCycleTypeId": this.strCycleTypeId
                            }
                        },
                        {
                            "match": {
                                "cIsActive": "Y"
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
        Object_Intranet_Cycle_Cycle.Initialize(objCycleParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];

        return arrDataRequest;
    }

    /**
     * @name GetMainSubject
     * @param {object} objContext Context object
     * @summary returns the main subjects
     * @returns {Array} Subject
     */
    GetMainSubject(objContext) {
        let arrAllSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsTestedAtThisTime;Y;cIsDeleted;N")["Data"];
        let arrSubject = arrAllSubject.filter(objSubject => objSubject["iParentSubjectId"] == 0);
        return arrSubject;
    }

    /**
    * @name GetFillHeightMetaData
    * @summary it returns the object of metadatas
    * @returns {array} MetaData
    */
    GetFillHeightMetaData() {
        return {
            HeaderIds: ["Header", "ContentHead", "InterpretationHeader", "InterpretationImg"]
        };
    }

    /**
    * @name GetDynamicStlyes
    * @param {object} props props
    * @returns {object} DynamicStlyes
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PracticeTest/PracticeTest.css"
        ];
    }

    /**
     * @name GetSubSubject
     * @param {object} objContext Context object
     * @param {object} objTextResource Text resource
     * @summary returns the sub subjects.
     * @returns {Array} Sub Subject
     */
    GetSubSubject(objContext, objTextResource) {
        let arrAllSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsTestedAtThisTime;Y;cIsDeleted;N")["Data"];
        var arrSubSubject = arrAllSubject.filter(objSubject => objSubject["iParentSubjectId"] != 0);
        let objAllSubject = objContext.PracticeTest_ModuleProcessor.GetAllSubjectData(objContext, objTextResource);
        let objUnselectedSubject = objContext.PracticeTest_ModuleProcessor.GetUnSelectedSubjectData(objContext, objTextResource);
        if (objContext.state.objSubject && objContext.state.objSubject["iSubjectId"] != -1) {
            arrSubSubject = [objAllSubject, ...arrAllSubject.filter(objSubject => objSubject["iParentSubjectId"] == objContext.state.objSubject["iSubjectId"])];
        } else {
            arrSubSubject = [objUnselectedSubject];
        }

        return arrSubSubject;
    }

    /**
     * @name GetAllSubjectData
     * @param {object} objContext Context object
     * @param {object} objTextResource Text resource
     * @summary returns the "All" subject data
     * @returns {object} "All" subject object
     */
    GetAllSubjectData(objContext, objTextResource) {
        return {
            "iSubjectId": -1,
            "cIsDeleted": "N",
            "t_TestDrive_Subject_Data": [
                {
                    "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId,
                    "vSubjectName": Localization.TextFormatter(objTextResource, 'All')
                }
            ]
        };
    }

    /**
    * @name GetSubjectDropdownMetaData
    * @summary Gets the meta data for Subject dropdown
    * @returns {object} Meta data objects for Subject dropdown
    */
    GetSubjectDropdownMetaData() {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data"
        };
    }

    /**
    * @name GetSubjectDropdownData
    * @param {Array} arrSubjects Subject Data
    * @summary Gets the data for Subject dropdown
    * @returns {object} Meta objects for Subject dropdown
    */
    GetSubjectDropdownData(objContext, arrSubjects) {
        return {
            DropdownData: arrSubjects,
            SelectedValue: objContext.state.objSubject.iSubjectId != -1 ? objContext.state.objSubject.iSubjectId : arrSubjects[0].iSubjectId
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
    * @name GetSubjectDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for School Year Period dropdown.
    * @returns {object} objEventBasics
    */
    GetSubjectDropdownEvents(objContext, arrSubject) {
        return {
            OnChangeEventHandler: (objItem) => { this.OnChangeMainSubject(objContext, objItem, arrSubject); }
        };
    }

    /**
    * @name GetSubSubjectDropdownMetaData
    * @summary Gets the meta data for Subject dropdown
    * @returns {object} Meta data objects for Subject dropdown
    */
    GetSubSubjectDropdownMetaData() {
        return {
            DisplayColumn: "vSubjectName",
            ValueColumn: "iSubjectId",
            IsLanguageDependent: "Y",
            DependingTableName: "t_TestDrive_Subject_Data"
        };
    }

    /**
    * @name GetSubSubjectDropdownData
    * @param {Array} arrSubSubject SubSubject Data
    * @summary Gets the data for Subject dropdown
    * @returns {object} Meta objects for Subject dropdown
    */
    GetSubSubjectDropdownData(objContext, arrSubSubject) {
        return {
            DropdownData: arrSubSubject,
            SelectedValue: arrSubSubject[0].iSubjectId
        };
    }

    /**
    * @name GetSubSubjectDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for School Year Period dropdown.
    * @returns {object} objEventBasics
    */
    GetSubSubjectDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => { this.OnChangeSubSubject(objContext, objItem); }
        };
    }

    /**
    * @name GetSubSubjectDropdownMetaData
    * @summary Gets the meta data for Subject dropdown
    * @returns {object} Meta data objects for Subject dropdown
    */
    GetAllTaskDropdownMetaData() {
        return {
            DisplayColumn: "iValue",
            ValueColumn: "iId",
            IsLanguageDependent: "N"
        };
    }

    /**
    * @name GetAllTaskDropdownData
    * @param {Array} arrSubSubject SubSubject Data
    * @summary Gets the data for Subject dropdown
    * @returns {object} Meta objects for Subject dropdown
    */
    GetAllTaskDropdownData(objContext, arrTotalTask) {
        return {
            DropdownData: arrTotalTask,
            SelectedValue: arrTotalTask.length - 1
        };
    }

    /**
    * @name GetAllTaskDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for School Year Period dropdown.
    * @returns {object} objEventBasics
    */
    GetAllTaskDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => { this.OnChangeTaskCount(objContext, objItem, 'AllTaskCount'); }
        };
    }

    /**
    * @name GetWrongTaskDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for School Year Period dropdown.
    * @returns {object} objEventBasics
    */
    GetWrongTaskDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => { this.OnChangeTaskCount(objContext, objItem, 'WrongTaskCount'); }
        };
    }

    /**
    * @name GetSubSubjectDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for School Year Period dropdown.
    * @returns {object} objEventBasics
    */
    GetNotAnsweredTaskDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => { this.OnChangeTaskCount(objContext, objItem, 'NotTaskCount'); }
        };
    }

    /**
    * @name GetSubSubjectDropdownEvents
    * @param {object} objContext Context object
    * @summary Returns object that contains all the Event methods for School Year Period dropdown.
    * @returns {object} objEventBasics
    */
    GetCorrectAnsweredTaskDropdownEvents(objContext) {
        return {
            OnChangeEventHandler: (objItem) => { this.OnChangeTaskCount(objContext, objItem, 'CorrectTaskCount'); }
        };
    }

    /**
     * @name GetTasksData
     * @param {any} objContext
     */
    GetTasksData(objContext) {
        let iMainSubjectId = objContext.state.objSubject ? objContext.state.objSubject.iSubjectId : -1;
        let iSubSubjectId = objContext.state.objSubSubject ? objContext.state.objSubSubject.iSubjectId : -1;
        let arrTaskDetails = DataRef(objContext.props.Extranet_Pupil_PracticeTest_Module, "Extranet_Pupil_PracticeTest_Module;iMainSubjectId;" + iMainSubjectId + ";iSubSubjectId;" + iSubSubjectId)["Data"];
        let arrTotalTask = [];//[{ iValue: 0, iId: 0 }]; 
        let arrNotAnsweredTask = [];
        let arrWrongAnsweredTask = [];
        let arrCorrectAnsweredTask = [];
        let objTaskDetails = undefined;
        if (arrTaskDetails && arrTaskDetails[0]) {
            objTaskDetails = arrTaskDetails[0];
            arrTotalTask = objContext.PracticeTest_ModuleProcessor.GetTaskDropDownValues(objTaskDetails.TotalTaskCount);
            arrNotAnsweredTask = objContext.PracticeTest_ModuleProcessor.GetTaskDropDownValues(objTaskDetails.NotAnsweredCount);
            arrCorrectAnsweredTask = objContext.PracticeTest_ModuleProcessor.GetTaskDropDownValues(objTaskDetails.CorrectAnswerCount);
            arrWrongAnsweredTask = objContext.PracticeTest_ModuleProcessor.GetTaskDropDownValues(objTaskDetails.WrongAnswerCount);
        }
        return {
            objTaskDetails,
            arrTotalTask,
            arrNotAnsweredTask,
            arrCorrectAnsweredTask,
            arrWrongAnsweredTask
        };
    }

    /**
     * @name GetAllSubjectData
     * @param {object} objContext Context object
     * @param {object} objTextResource Text resource
     * @summary returns the "All" subject data
     * @returns {object} "All" subject object
     */
    GetUnSelectedSubjectData(objContext, objTextResource) {
        return {
            "iSubjectId": -2,
            "cIsDeleted": "N",
            "t_TestDrive_Subject_Data": [
                {
                    "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId,
                    "vSubjectName": Localization.TextFormatter(objTextResource, 'SelectSubjectFirst')
                }
            ]
        };
    }

    /**
     * @name GetClassObject
     * @param {object} props props
     * @summary returns the class object based on application(Teacher/Pupil).
     * @returns {object} Class
     */
    GetClassObject(props) {
        let objClassReturn = {};
        let strClassId = ApplicationState.GetProperty("SelectedClassId");
        let strSchoolId = ApplicationState.GetProperty("SelectedSchoolId");
        if (props.ClientUserDetails.ApplicationTypeId == "16") {
            objClassReturn["uClassId"] = strClassId;
            let objSchool = props.ClientUserDetails.PupilDetails.t_TestDrive_Member_School_Pupil.find(objSchoolPupil => objSchoolPupil["uSchoolId"] == strSchoolId);
            objClassReturn["iStateId"] = objSchool.iStateId;
        }
        else if (props.ClientUserDetails.ApplicationTypeId == "1") {
            let objSchool = props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School.filter(x => x["uSchoolId"] == strSchoolId);
            objClassReturn["uClassId"] = ApplicationState.GetProperty("SelectedClassId");
            objClassReturn["iStateId"] = objSchool.iStateId;
        }
        return objClassReturn;
    }

    /**
     * @name OnChangeMainSubject
     * @param {object} objContext Context object
     * @param {object} objItem Item
     * @param {Array} arrAllSubject AllSubject
     * @summary Updates selected main subject and subSubjects to state.
     */
    OnChangeMainSubject(objContext, objItem, arrAllSubject) {
        let arrSubSubject = [];
        if (objItem["iSubjectId"] == -1) {
            arrSubSubject = arrAllSubject.map(objSubject => { return { ...objSubject }; });
        } else {
            arrSubSubject = arrAllSubject.filter(objSubject => objSubject["iParentSubjectId"] !== objItem["iSubjectId"]);
        }
        objContext.dispatch({ type: 'SET_STATE', payload: { objSubject: objItem, arrSubSubject: arrSubSubject, objSubSubject: { "iSubjectId": -1 } } });
    }

    /**
     * @name OnChangeSubSubject
     * @param {object} objContext Context object
     * @param {object} objItem Item
     * @summary Updates selected main subject and subSubjects to state.
     */
    OnChangeSubSubject(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objSubSubject: objItem } });
    }

    /**
     * @name GetTaskParams
     * @summary returns the parameters for task params.
     * @param {object} objContext Context object
     * @returns {object} Task params
     */
    GetTaskParams(objContext) {
        let { state, props } = objContext;
        let arrSubjectId = [];
        let iMainSubjectId = -1;
        let iSubSubjectId = -1;
        if (state.objSubject && (state.objSubSubject == undefined || state.objSubSubject.iSubjectId == -1)) {
            arrSubjectId = state.arrSubSubject.map(sub => { return { iSubjectId: sub["iSubjectId"] }; });
            iMainSubjectId = state.objSubject.iSubjectId;
        } else {
            arrSubjectId = [{
                iSubjectId: state.objSubSubject.iSubjectId
            }];
            iMainSubjectId = state.objSubject.iSubjectId;
            iSubSubjectId = state.objSubSubject.iSubjectId;
        }

        let objClassOfPupil = objContext.PracticeTest_ModuleProcessor.GetClassObject(props);
        let strCycleTypeId = objContext.PracticeTest_ModuleProcessor.strCycleTypeId;
        let objCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N")["Data"][0];//DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n")["Data"][0];

        let objTaskParams = {
            SearchQuery: {
                must: [
                    {
                        match: {
                            "iMainSubjectId": iMainSubjectId
                        }
                    },
                    {
                        match: {
                            "iSubSubjectId": iSubSubjectId
                        }
                    }
                ]
            },
            "PupilId": props.ClientUserDetails.UserId,
            "ClassId": objClassOfPupil.uClassId,
            "CycleId": objCycle["uCycleId"],
            "iCycleTypeId": objContext.PracticeTest_ModuleProcessor.strCycleTypeId,
            "MainSubjectId": iMainSubjectId,
            "SubSubjectId": iSubSubjectId,
            "LanguageId": props.JConfiguration.InterfaceLanguageId,
            "ArraySubSubjectId": arrSubjectId
        };
        return objTaskParams;
    }

    /**
     * @name GetTaskDropDownValues
     * @param {Integer} iCount Count
     * @summary task count for dropdown.
     * @returns {Array} Return Data for task count dropdown
     */
    GetTaskDropDownValues(iCount) {
        let arrReturnData = [];
        for (let i = 1; i <= iCount; i++) {
            let objData = {
                iValue: i,
                iId: i
            };
            arrReturnData = [...arrReturnData, objData];
        }
        return arrReturnData;
    }

    /**
     * @name OnClickReset
     * @param {object} objContext Context object
     * @summary reset the test.
     */
    OnClickReset(objContext) {
        if (objContext.state.objSubject) {
            let objTaskParams = objContext.PracticeTest_ModuleProcessor.GetTaskParams(objContext);
            ApplicationState.SetProperty("blnShowAnimation", true);
            Extranet_Pupil_PracticeTest_Module.ResetResults(objTaskParams, (objReturn, cIsNewData) => {
                if (objReturn) {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                }
            });
        }
    }

    /**
     * @name OnChangeTaskCount
     * @param {object} objContext Context object
     * @param {object} objItem Item
     * @param {String} type Type
     * @summary updates task count to state.
     */
    OnChangeTaskCount(objContext, objItem, type) {
        objContext.dispatch({ type: 'SET_STATE', payload: { [type]: objItem.iValue } });
    }

    /**
     * @name StartTest
     * @param {object} objContext Context object
     * @param {String} strType Type
     * @summary Starts the Test
     */
    StartTest(objContext, strType) {
        let { state, props } = objContext;
        let iMainSubjectId = -1;
        let iSubSubjectId = -1;
        if (state.objSubject && (state.objSubSubject == undefined || state.objSubSubject.iSubjectId == -1)) {
            iMainSubjectId = state.objSubject.iSubjectId;
        } else {
            iMainSubjectId = state.objSubject.iSubjectId;
            iSubSubjectId = state.objSubSubject.iSubjectId;
        }
        let objClassOfPupil = objContext.PracticeTest_ModuleProcessor.GetClassObject(props);
        let strTaskStatusId = -1;
        let strTaskCount = 0;
        if (strType == "All") {
            strTaskStatusId = -1;
            strTaskCount = 0;//state.AllTaskCount;
        }
        if (strType == "Correct") {
            strTaskStatusId = 1;
            strTaskCount = state.CorrectTaskCount;
        }
        if (strType == "NotAnswer") {
            strTaskStatusId = 3;
            strTaskCount = state.NotTaskCount;
        }
        if (strType == "Wrong") {
            strTaskStatusId = 2;
            strTaskCount = state.WrongTaskCount;
        }
        let strCycleTypeId = objContext.PracticeTest_ModuleProcessor.strCycleTypeId;
        let objCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N")["Data"][0];//DataRef(objContext.props.cycle, "cycle;icycletypeid;" + strCycleTypeId + ";cisactive;y;cisdeleted;n")["Data"][0];
        let objSaveParams = {
            "PupilId": props.ClientUserDetails.UserId,
            "ClassId": objClassOfPupil.uClassId,
            "CycleId": objCycle["uCycleId"],
            "MainSubjectId": iMainSubjectId,
            "SubSubjectId": iSubSubjectId,
            "TaskStatusId": strTaskStatusId,
            "TaskCount": strTaskCount,
            "StateId": objClassOfPupil.iStateId,
            "CategoryId": -1,
            "CompetencyId": -1
        };

        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Pupil_PracticeTest_Module.StartTest(objSaveParams, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                let objTestUrl = DataRef(res.practicetest, "practicetest;starttest")["Data"][0];
                objContext.PracticeTest_ModuleProcessor.OpenTestPopup(objTestUrl);
            }
        });

    }

    /**
     * @name OpenTestPopup
     * @param {object} objTestUrl TestUrl object
     * @summary Opens the Test popup
     */
    OpenTestPopup(objTestUrl) {
        //Popup.ShowPopup({
        //    PopupName: "PracticeTestPopUp", //name of the component to be displayed inside the popup. must be present in ComponentController
        //    PopupProps: {
        //        Data: {
        //            TestUrl: objTestUrl.TestUrl
        //        }
        //    }
        //});
        Popup.ShowPopup({
            Data: {
                TestUrl: objTestUrl.TestUrl
            },
            Meta: {
                PopupName: 'PracticeTestPopUp',
                ShowHeader: false,
                ShowCloseIcon: false
            },
            Resource: {
                SkinPath: JConfiguration.ExtranetSkinPath
            },
            Events: {},
            CallBacks: {}
        });
    }

    /**
     * @name OpenResetPopUp
     * @param {object} objContext Context object
     * @param {object} objTextResource Text Resource object
     * @summary Opens the Reset popup
     */
    OpenResetPopUp(objContext, objTextResource) {
        if (objContext.state.objSubject["iSubjectId"] !== -1) {
            Popup.ShowPopup({
                Data: {},
                Meta: {
                    PopupName: 'ResetResultsPopUp',
                    ShowHeader: false,
                    ShowCloseIcon: false,
                    Height: "190px",
                    Width: "480px"
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: JConfiguration.ExtranetSkinPath
                },
                Events: {
                    ClickSave: () => { objContext.PracticeTest_ModuleProcessor.OnClickReset(objContext); }
                },
                CallBacks: {}
            });
        }
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
}


export default PracticeTest_ModuleProcessor;