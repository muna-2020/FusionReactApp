//React specific
import { useEffect } from 'react';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

//Common functionality imports
import LearningTestSystem_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystem_ModuleProcessor';

/**
* @name GetInitialState
* @summary State of the Licenses component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let objLearningTestSystem_ModuleProcessor = new LearningTestSystem_ModuleProcessor();
    let strCycleTypeId = objLearningTestSystem_ModuleProcessor.strCycleTypeId;
    let arrPupilData = [];
    let arrFilterPupilData = undefined;
    let arrSubjectData = undefined;
    let SystemNumberOfTasks = undefined;
    let SysytemNumberOfRepetition = undefined;
    let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    let iSubjectId = objLearningTestSystem_ModuleProcessor.GetUserpreferenceSubjectId();
    if (
        DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId) &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsActive;Y;cIsReadyForSystemLearningTest;Y") &&
        DataRef(props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N") &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestSystem", props) &&
        DataRef(props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + strCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;;uTeacherId;" + props.ClientUserDetails.UserId) &&
        DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"] &&
        DataRef(props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings")["Data"]
    ) {

        let arrPupilData = [];
        let intUserPreferenceForTask = -1;
        let intUserPreferenceForRepetition = -1;
        let arrTempPupilData = DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
        let arrTempSubjectData = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsActive;Y;cIsReadyForSystemLearningTest;Y").Data;
        if (arrTempPupilData.length > 0) {
            arrPupilData = arrTempPupilData.filter(objPupil => objPupil["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
        }
        let objAllPupil = {
            "uPupilId": -1,
            "vFirstName": "Alle"
        };
        arrPupilData = [objAllPupil, ...arrPupilData];
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"];
        let arrUserPreferenceValueForTasks = arrUserPreferenceValue.filter(objTempUserPrefernceValue => {
            return objTempUserPrefernceValue["vKey"] === "NumberOfTasksForSystemGeneratedTest";
        });
        let arrUserPreferenceValueForRepetition = arrUserPreferenceValue.filter(objTempUserPrefernceValue => {
            return objTempUserPrefernceValue["vKey"] === "NumberOfRepetitionForSystemGeneratedTest";
        });

        if (arrUserPreferenceValueForTasks.length > 0 && arrUserPreferenceValueForRepetition.length > 0) {
            intUserPreferenceForTask = parseInt(arrUserPreferenceValueForTasks[0]["vValue"]);
            intUserPreferenceForRepetition = parseInt(arrUserPreferenceValueForRepetition[0]["vValue"]);
        } else {//Initialy teacher was created user prefernce values will not be there so we need to take it from default values.
            let arrClientSettings = DataRef(props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings")["Data"];
            let arrFilteredClientSettings = arrClientSettings.filter(x => x["vParentKey"] == "ExtranetTeacher" && x["vSubParentKey"] == "LearningTest")
            let objTaskCount = arrFilteredClientSettings.find(x => x["vKey"] == "NumberOfTasksForSystemGeneratedTest");
            let objRepetitionCount = arrFilteredClientSettings.find(x => x["vKey"] == "NumberOfRepetitionForSystemGeneratedTest");
            intUserPreferenceForTask = parseInt(objTaskCount["vValue"]);
            intUserPreferenceForRepetition = parseInt(objRepetitionCount["vValue"]);
        }
        blnIsLoadComplete = true;
        ApplicationState.SetProperty("blnShowAnimation", false);
        //ApplicationState.SetProperty("DisplayFor", 4);//for week display component
        arrPupilData = arrPupilData;
        arrFilterPupilData = arrPupilData;
        arrSubjectData = arrTempSubjectData;
        SystemNumberOfTasks = intUserPreferenceForTask;
        SysytemNumberOfRepetition = intUserPreferenceForRepetition;
    }

    let ShowInformationBar = true;
    let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
    if (objUserPreference && objUserPreference["t_Framework_UserPreference_PreferenceValue"]) {
        let objShowInformationValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].find(x => x["vKey"] == "ShowInformationBar_TeacherLearningTestSystem")
        ShowInformationBar = objShowInformationValue && objShowInformationValue["vValue"] == "N" ? false : true;
    }

    return {
        isLoadComplete: blnIsLoadComplete,
        intSelectedSubjectId: iSubjectId ? iSubjectId : -1,
        intSelectedSubSubjectId: -1,
        strSelectedClassId: -1,
        strSelectedPupilId: -1,
        blnIsClassSelectionChanged: false,
        arrPupilData: arrPupilData,
        intWeekDisplayChangeCount: 0,
        objWeekDisplaySelection: {
            uSchoolYearPeriodId: ""
        },
        blnSearchBtnClicked: false,
        arrFilterPupilData: undefined,
        arrSubjectData: undefined,
        SystemNumberOfTasks: undefined,
        SysytemNumberOfRepetition: undefined,
        blnShowInformationBar: ShowInformationBar
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks for loading the data
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaderForPupil(objContext);
    useDataLoaded(objContext);
    useDataLoaderForWeekDisplaySelection(objContext);
    useDataLoaderForSkinName(objContext);
}

/**
 * @name useDataLoader
 * @param {object} objContext objContext
 * @summary Calls the DataCall method and the InitialDataParams.
 */
function useDataLoader(objContext) {
    useEffect(() => {
        objContext.LearningTestSystem_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
 * @name useDataLoaderForPupil
 * @param {*} objContext objContext
 * @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
 */
export function useDataLoaderForPupil(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.LearningTestSystem_ModuleProcessor.GetDataAfterClassChange(objContext);
        }
    }, [objContext.state.strSelectedClassId]);
}

/**
 * 
 * @param {*} objContext objContext
 * @summary Checks if the data is loaded to props and then set the component state accordingly.
 */
export function useDataLoaded(objContext) {
    let strClassId = ApplicationState.GetProperty("SelectedClassId");
    let strCycleTypeId = objContext.LearningTestSystem_ModuleProcessor.strCycleTypeId;
    let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsActive;Y;cIsReadyForSystemLearningTest;Y") &&
            DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N") &&
            DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + strCycleTypeId + ";uClassId;" + strClassId + ";uSchoolYearPeriodId;;uTeacherId;" + objContext.props.ClientUserDetails.UserId) &&
            DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId)["Data"] &&
            DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings")["Data"] &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/LearningTestSystem", objContext.props)) {
            let arrPupilData = [];
            let intUserPreferenceForTask = -1;
            let intUserPreferenceForRepetition = -1;
            let arrTempPupilData = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId + ";iStateId;" + iStateId).Data;
            let arrTempSubjectData = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N;cIsActive;Y;cIsReadyForSystemLearningTest;Y").Data;
            if (arrTempPupilData.length > 0) {
                arrPupilData = arrTempPupilData.filter(objPupil => objPupil["t_TestDrive_Member_Class_Pupil"].filter(objTempClassPupil => objTempClassPupil["uClassId"] === strClassId)[0].cIsDeleted === "N");
            }
            let objAllPupil = {
                "uPupilId": -1,
                "vFirstName": "Alle"
            };
            arrPupilData = [objAllPupil, ...arrPupilData];
            let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
            let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"];
            let arrUserPreferenceValueForTasks = arrUserPreferenceValue.filter(objTempUserPrefernceValue => {
                return objTempUserPrefernceValue["vKey"] === "NumberOfTasksForSystemGeneratedTest";
            });
            let arrUserPreferenceValueForRepetition = arrUserPreferenceValue.filter(objTempUserPrefernceValue => {
                return objTempUserPrefernceValue["vKey"] === "NumberOfRepetitionForSystemGeneratedTest";
            });

            if (arrUserPreferenceValueForTasks.length > 0 && arrUserPreferenceValueForRepetition.length > 0) {
                intUserPreferenceForTask = parseInt(arrUserPreferenceValueForTasks[0]["vValue"]);
                intUserPreferenceForRepetition = parseInt(arrUserPreferenceValueForRepetition[0]["vValue"]);
            } else {//Initialy teacher was created user prefernce values will not be there so we need to take it from default values.
                let arrClientSettings = DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings")["Data"];
                let arrFilteredClientSettings = arrClientSettings.filter(x => x["vParentKey"] == "ExtranetTeacher" && x["vSubParentKey"] == "LearningTest")
                let objTaskCount = arrFilteredClientSettings.find(x => x["vKey"] == "NumberOfTasksForSystemGeneratedTest");
                let objRepetitionCount = arrFilteredClientSettings.find(x => x["vKey"] == "NumberOfRepetitionForSystemGeneratedTest");
                intUserPreferenceForTask = parseInt(objTaskCount["vValue"]);
                intUserPreferenceForRepetition = parseInt(objRepetitionCount["vValue"]);
            }
            if (!objContext.state.isLoadComplete) {
                objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
                ApplicationState.SetProperty("blnShowAnimation", false);
                ApplicationState.SetProperty("DisplayFor", 4);//for week display component
            }
            objContext.dispatch({ type: "SET_STATE", payload: { "arrPupilData": arrPupilData, "arrFilterPupilData": arrPupilData, "arrSubjectData": arrTempSubjectData, "SystemNumberOfTasks": intUserPreferenceForTask, "SysytemNumberOfRepetition": intUserPreferenceForRepetition } });
        }
    }, [
        objContext.props.Object_Extranet_Teacher_Class,
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/LearningTestSystem"],
        objContext.props.Object_Extranet_Pupil_Pupil,
        objContext.props.Object_Intranet_Test_ExtranetTest,
        objContext.props.Object_Intranet_Cycle_Cycle,
        objContext.props.Object_Cockpit_MainClient_ClientSettings
    ]);
}

/**
 * @name useDataLoaderForWeekDisplaySelection
 * @param {any} objContext objContext
 * @summary On every state change of week display intWeekDisplayChangeCount state will be updated
 */
export function useDataLoaderForWeekDisplaySelection(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            if (objContext.state.intWeekDisplayChangeCount > 0) {
                objContext.LearningTestSystem_ModuleProcessor.GetExtranetTestData(objContext);
            }
            else {
                objContext.dispatch({ type: "SET_STATE", payload: { "intWeekDisplayChangeCount": objContext.state.intWeekDisplayChangeCount + 1 } });
            }
        }
    }, [objContext.state.objWeekDisplaySelection]);
}

/**
 * @name useDataLoaderForSkinName
 * @summary data loader for skinName
 * @param {any} objContext
 */
export function useDataLoaderForSkinName(objContext) {
    useEffect(() => {
        objContext.LearningTestSystem_ModuleProcessor.GetSkinData(objContext)
    }, [objContext.props.Object_Cockpit_MainClient_ClientSettings])
}
