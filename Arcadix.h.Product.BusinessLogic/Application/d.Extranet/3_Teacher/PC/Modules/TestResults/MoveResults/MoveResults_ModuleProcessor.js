//Module object imports.
import Object_Intranet_Cycle_Cycle from '@shared/Object/c.Intranet/4_Cycle/Cycle/Cycle';
import Object_Extranet_State_State from '@shared/Object/d.Extranet/1_State/State/State'
import Object_Extranet_School_School from '@shared/Object/d.Extranet/2_School/School/School';
import Object_Extranet_Teacher_Teacher from '@shared/Object/d.Extranet/3_Teacher/Teacher/Teacher';
import Object_Extranet_Teacher_Class from '@shared/Object/d.Extranet/3_Teacher/Class/Class';
import Object_Extranet_Pupil_Pupil from '@shared/Object/d.Extranet/4_Pupil/Pupil/Pupil';
import Extranet_Teacher_TestResults_Module from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResults_Module';

import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

/**
 * @name MoveResults_ModuleProcessor
 * @summary module processor for Move Results
 * */
class MoveResults_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    constructor() {
        super();
        this.strOrientaionCycleTypeId = '1';
        this.strHighStakeCycleTypeId = '6';
    }

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Extranet_State_State", "Object_Extranet_School_School", "Object_Extranet_Teacher_Teacher", "Object_Extranet_Pupil_Pupil", "Object_Extranet_Teacher_Class", "Object_Intranet_Cycle_Cycle", "Object_Intranet_Test_IntranetTest"];
    }

    /**
   * @name GetDynamicStyles
   * @summary Css files specific to this module
   * @param {any} props
   * @returns {Array}
   */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TestResults/TestResultsPopup/MoveResults/MoveResults.css"
        ]
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
        let arrDataRequest = [];

        let objStateParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iMainClientId": props.Data.ClientUserDetails.MainClientId
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

        Object_Extranet_State_State.Initialize(objStateParams)
        arrDataRequest = [...arrDataRequest, Object_Extranet_State_State];
        let objCycleParams = {};
        if (props.Data.IsOrientationTest) {
            objCycleParams = {
                "SearchQuery":
                {
                    "must":
                        [
                            {
                                "match": {
                                    "cIsActive": "Y"
                                }
                            },
                            {
                                "match": {
                                    "cIsDeleted": "N"
                                }
                            },
                            {
                                "match": {
                                    "iCycleTypeId": this.strOrientaionCycleTypeId
                                }
                            }
                        ]
                }
            };
        } else {
            objCycleParams = {
                "SearchQuery":
                {
                    "must":
                        [
                            {
                                "match": {
                                    "cIsActive": "Y"
                                }
                            },
                            {
                                "match": {
                                    "cIsDeleted": "N"
                                }
                            },
                            {
                                "match": {
                                    "iCycleTypeId": this.strHighStakeCycleTypeId
                                }
                            }
                        ],
                    "must_not": [
                        {
                            "match": {
                                "cIsArchiveTeacher": 'Y'
                            }
                        }
                    ]
                }
            };

        }
        Object_Intranet_Cycle_Cycle.Initialize(objCycleParams)
        arrDataRequest = [...arrDataRequest, Object_Intranet_Cycle_Cycle];

        return arrDataRequest;
    }

    /**
     * @name GetAutoCompleteResource
     * @summary returns the Resource required for AutoComplete.
     * @param {any} objContext
     */
    GetAutoCompleteResource(objContext) {
        let Text = {
            WaterMarkText: "search here" // place holder for control.
        }
        return {
            Text
        }
    }

    /**
     * @name GetCycleAutoCompleteMeta
     * @summary returns the configuration object for Cycle AutoComplete
     * @param {any} objContext
     */
    GetCycleAutoCompleteMeta(objContext) {
        return {
            DisplayColumn: "vCycleName",
            ValueColumn: "uCycleId",
            IsLanguageDependent: 'N'
        }
    }

    /**
     * @name GetCycleAutoCompleteData
     * @summary returns the data for Cycle AutoComplete
     * @param {any} objContext
     */
    GetCycleAutoCompleteData(objContext) {
        let arrCycleData = [];
        if (objContext.props.Data.IsOrientationTest) {
            arrCycleData = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N;iCycleTypeId;" + this.strOrientaionCycleTypeId)["Data"];
        } else {
            arrCycleData = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;cIsActive;Y;cIsDeleted;N;iCycleTypeId;" + this.strHighStakeCycleTypeId)["Data"];
        }
        return {
            SuggestionData: arrCycleData,
            SelectedValue: objContext.state.objCycle ? objContext.state.objCycle.uCycleId : ""
        }
    }

    /**
     * @name GetStateAutoCompleteMeta
     * @summary returns the configuration object for state AutoComplete
     * @param {any} objContext
     */
    GetStateAutoCompleteMeta(objContext) {
        return {
            DisplayColumn: "vStateName",
            ValueColumn: "iStateId",
            IsLanguageDependent: 'Y',
            DependingTableName: "t_TestDrive_Member_State_Data"
        }
    }

    /**
     * @name GetStateAutoCompleteData
     * @summary returns the data for State AutoComplete
     * @param {any} objContext
     */
    GetStateAutoCompleteData(objContext) {
        let iMainClientId = objContext.props.Data.ClientUserDetails.MainClientId;
        let arrStateData = DataRef(objContext.props.Object_Extranet_State_State, "Object_Extranet_State_State;iMainClientId;" + iMainClientId + ";cIsDeleted;N").Data

        return {
            SuggestionData: arrStateData,
            SelectedValue: objContext.state.objState ? objContext.state.objState.iStateId : ""
        }
    }

    /**
     * @name GetSchoolAutoCompleteMeta
     * @summary returns the configuration object for school AutoComplete
     * @param {any} objContext
     */
    GetSchoolAutoCompleteMeta(objContext) {
        return {
            DisplayColumn: "DisplayColumn",
            ValueColumn: "uSchoolId",
            IsLanguageDependent: 'N'
        }
    }

    /**
     * @name GetSchoolAutoCompleteData
     * @summary returns the data for School AutoComplete
     * @param {any} objContext
     */
    GetSchoolAutoCompleteData(objContext) {
        let arrTempData = objContext.state.objState ? DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;iStateId;" + objContext.state.objState.iStateId + ";cIsDeleted;N")["Data"] : [];
        let arrSchoolData = [];
        for (let item of arrTempData) {
            if (item["vName"] && item["vFirstName"]) {
                let objSchool = {
                    ...item,
                    DisplayColumn: item["vName"] + " " + item["vFirstName"] + " ( " + item["vTown"] + " )"
                }
                arrSchoolData = [...arrSchoolData, objSchool];
            }
        }
        return {
            SuggestionData: arrSchoolData,
            SelectedValue: objContext.state.objSchool ? objContext.state.objSchool.uSchoolId : ""
        }
    }

    /**
     * @name GetTeacherAutoCompleteMeta
     * @summary returns the configuration object for teacher AutoComplete
     * @param {any} objContext
     */
    GetTeacherAutoCompleteMeta(objContext) {
        return {
            DisplayColumn: "vFirstName",
            ValueColumn: "uTeacherId",
            IsLanguageDependent: 'N'
        }
    }

    /**
     * @name GetTeacherAutoCompleteData
     * @summary returns the data for Taecher AutoComplete
     * @param {any} objContext
     */
    GetTeacherAutoCompleteData(objContext) {
        let arrTeacherData = objContext.state.objSchool ? DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + objContext.state.objSchool.uSchoolId + ";t_TestDrive_Member_Teacher_School.cIsDeleted;N")["Data"] : [];
        return {
            SuggestionData: arrTeacherData,
            SelectedValue: objContext.state.objTeacher ? objContext.state.objTeacher.uTeacherId : ""
        }
    }

    /**
     * @name GetClassAutoCompleteMeta
     * @summary returns the configuration object for class AutoComplete
     * @param {any} objContext
     */
    GetClassAutoCompleteMeta(objContext) {
        return {
            DisplayColumn: "vClassName",
            ValueColumn: "uClassId",
            IsLanguageDependent: 'N'
        }
    }

    /**
     * @name GetClassAutoCompleteData
     * @summary returns the data for class AutoComplete
     * @param {any} objContext
     */
    GetClassAutoCompleteData(objContext) {
        let arrClassData = objContext.state.objTeacher ? DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.state.objTeacher.uTeacherId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"] : [];
        return {
            SuggestionData: arrClassData,
            SelectedValue: objContext.state.objClass ? objContext.state.objClass.uClassId : ""
        }
    }

    /**
     * @name GetPupilAutoCompleteMeta
     * @summary returns the configuration object for Pupil AutoComplete
     * @param {any} objContext
     */
    GetPupilAutoCompleteMeta(objContext) {
        return {
            DisplayColumn: "vFirstName",
            ValueColumn: "uPupilId",
            IsLanguageDependent: 'N'
        }
    }

    /**
     * @name GetPupilAutoCompleteData
     * @summary returns the data for pupil AutoComplete
     * @param {any} objContext
     */
    GetPupilAutoCompleteData(objContext) {
        let iStateId = GetStateIdBasedOnSchool(objContext.props.Data.uSchoolId);
        let arrPupilData = objContext.state.objClass ? DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + objContext.state.objClass.uClassId + ";t_TestDrive_Member_Class_Pupil.cIsDeleted;N" + ";iStateId;" + iStateId)["Data"] : [];
        return {
            SuggestionData: arrPupilData,
            SelectedValue: objContext.state.objPupil ? objContext.state.objPupil.uPupilId : ""
        }
    }

    /**
     * @name OnChangeCycleAutoSuggest
     * @summary updates the selected cycle object to component state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeCycleAutoSuggest(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objCycle: objItem, } })
    }

    /**
     * @name OnChangeStateAutoSuggest
     * @summary updates the selected state object to component state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeStateAutoSuggest(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objState: objItem, objSchool: undefined, objTeacher: undefined, objClass: undefined, objPupil: undefined } })
    }

    /**
     * @name OnChangeSchoolAutoSuggest
     * @summary updates the selected school object to component state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeSchoolAutoSuggest(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objSchool: objItem, objTeacher: undefined, objClass: undefined, objPupil: undefined } })
    }

    /**
     * @name OnChangeTeacherAutoSuggest
     * @summary updates the selected teacher object to component state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeTeacherAutoSuggest(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objTeacher: objItem, objClass: undefined, objPupil: undefined } })
    }

    /**
     * @name OnChangeClassAutoSuggest
     * @summary updates the selected class object to component state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangeClassAutoSuggest(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objClass: objItem, objPupil: undefined } });
    }

    /**
     * @name OnChangePupilAutoSuggest
     * @summary updates the selected pupil object to component state.
     * @param {any} objContext
     * @param {any} objItem
     */
    OnChangePupilAutoSuggest(objContext, objItem) {
        objContext.dispatch({ type: 'SET_STATE', payload: { objPupil: objItem } })
    }

    /**
     * @name GetSchoolData
     * @summary loads the state data.
     * @param {any} objContext
     */
    GetSchoolData(objContext) {
        let objSchoolParams = {
            "ForeignKeyFilter": {
                "iStateId": objContext.state.objState.iStateId
            },
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
        Object_Extranet_School_School.GetData(objSchoolParams);
    }

    /**
     * @name GetSchoolData
     * @summary loads the teacher data.
     * @param {any} objContext
     */
    GetTeacherData(objContext) {
        let objTeacherParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Teacher_School.uSchoolId": objContext.state.objSchool.uSchoolId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "nested": {
                            "path": "t_TestDrive_Member_Teacher_School",
                            "query": {
                                "bool": {
                                    "must": [
                                        {
                                            "match": {
                                                "t_TestDrive_Member_Teacher_School.cIsDeleted": "N"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
            }
        };
        Object_Extranet_Teacher_Teacher.GetData(objTeacherParams);
    }

    /**
     * @name GetClassData
     * @summary loads the class data.
     * @param {any} objContext
     */
    GetClassData(objContext) {
        let objClassParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Teacher.uTeacherId": objContext.state.objTeacher.uTeacherId,
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
            }
        };
        Object_Extranet_Teacher_Class.GetData(objClassParams);
    }

    /**
     * @name GetPupilData
     * @param {any} objContext
     */
    GetPupilData(objContext) {
        let objPupilParams = {
            "ForeignKeyFilter": {
                "t_TestDrive_Member_Class_Pupil.uClassId": objContext.state.objClass.uClassId,
                "Type": "nested"
            },
            "SearchQuery": {
                "must": [
                    {
                        "nested": {
                            "path": "t_TestDrive_Member_Class_Pupil",
                            "query": {
                                "bool": {
                                    "must": [
                                        {
                                            "match": {
                                                "t_TestDrive_Member_Class_Pupil.cIsDeleted": "N"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
            }
        };
        Object_Extranet_Pupil_Pupil.GetData(objPupilParams);
    }

    /**
     * @name MoveResults
     * @summary moves the source pupil results to target pupil.
     * @param {any} objContext
     * @param {any} objTestResult
     * @param {any} objCycle
     */
    MoveResults(objContext, objTestResult) {
        let { state } = objContext
        let strCycleTypeId = objContext.props.Data.IsOrientationTest ? this.strOrientaionCycleTypeId : this.strHighStakeCycleTypeId;
        let strSchoolYearPeriod = objContext.props.Data.strSchoolYearPeriodId ? objContext.props.Data.strSchoolYearPeriodId : '';
        let objParams = {
            "ExecutionId": objTestResult["TestExecution"][0]["uExecutionId"],
            "SourceCycleId": objTestResult["uCycleId"],
            "DestinationCycleId": objContext.state.objCycle["uCycleId"],
            "SourceStateId": objContext.props.Data.iStateId,
            "DestinationStateId": state.objState["iStateId"],
            "SourceTestId": objTestResult["uTestId"],
            "SourceClassId": objTestResult["uClassId"],
            "DestinationClassId": state.objClass["uClassId"],
            "DestinationSchoolId": state.objSchool["uSchoolId"],
            "SourceRepitionId": objTestResult["iCycleRepetition"],
            "DestinationRepitionId": objTestResult["iCycleRepetition"],
            "SourcePupilId": objTestResult["uPupilId"],
            "DestinationPupilId": state.objPupil["uPupilId"],
            "SourceSchoolId": objContext.props.Data.uSchoolId,
            "CycleTypeId": strCycleTypeId,
            "SchoolYearPeriodId": strSchoolYearPeriod
        }
        ApplicationState.SetProperty("blnShowAnimation", true);
        Extranet_Teacher_TestResults_Module.MoveResults(objParams, (objResponse) => {
            console.log("Move pupil Response ======================================>", objResponse)
            let strClassId = ApplicationState.GetProperty("SelectedClassId");

            let strMainTestLoginAndResulEnityKey = "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + strSchoolYearPeriod + ";uClassId;" + strClassId;
            let objMainTestLoginAndResultData = {
                Filter: strMainTestLoginAndResulEnityKey,
                Value: {
                    Data: [objTestResult],
                    TimeStamp: "0",
                    PrimaryKeyName: "uTestTokenId",
                    Count: 1
                }
            };
            ApplicationState.SetProperty("blnShowAnimation", false);
            ArcadixCacheData.DeleteData("Object_TestApplication_TestLoginAndResult", objMainTestLoginAndResultData, () => {

            });
            Popup.ClosePopup(objContext.props.Id);
        });
    }

    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": []
        }
    }
}

export default MoveResults_ModuleProcessor