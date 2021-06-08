//React imports 
import { useEffect } from 'react';

//Common functionality imports.
import PupilLearningTest_ModuleProcessor from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTest_ModuleProcessor';

/**
* @name GetInitialState
* @summary State of the teacher profile component
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let blnIsLoadComplete = false;
    let objPupilLearningTest_ModuleProcessor = new PupilLearningTest_ModuleProcessor();
    let strClassId = objPupilLearningTest_ModuleProcessor.GetClassId(props);
    let strCycleTypeId = objPupilLearningTest_ModuleProcessor.GetCycleTypeId();
    let strPupilId = props.ClientUserDetails.UserId;
    let strCycleId = undefined;
    let iStateId = objPupilLearningTest_ModuleProcessor.GetStateId(props);
    if (
        DataRef(props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;uClassId;" + strClassId + ";uPupilId;" + strPupilId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + "")["Data"] &&
        DataRef(props.Object_TestApplication_LearningTestLoginAndResult, "Object_TestApplication_LearningTestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uPupilId;" + strPupilId + ";iStateId;" + iStateId)["Data"] &&
        DataRef(props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N")["Data"] &&
        DataRef(props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;iConfigurationFileId;1;vParentKey;ExtranetTeacher;vSubParentKey;LearningTest;vKey;NumberOfRepetitionForSystemGeneratedTest")["Data"] &&
        DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")["Data"] &&
        Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilLearningTest", props)
    ) {
        let objCycle = DataRef(props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N")["Data"][0];
        strCycleId = objCycle["uCycleId"];
        ApplicationState.SetProperty("DisplayFor", 4);
        blnIsLoadComplete = false;
    }
    return {
        strClassId: strClassId,
        strCycleId: strCycleId,
        isLoadComplete: blnIsLoadComplete,
        intSelectedSubjectId: -1,
        blnIsClassSelectionChanged: false,
        objSubject: undefined,
        objSubSubject: undefined,
        objMode: undefined,
        blnInitialDataLoaded: false,
        arrDisplayData: [],
        strIsOpenTestInPopup: 'Y',
        arrExtranetTest: undefined,
        objSchoolYear: undefined,
        blnMakeCall: false,
        strSchoolYearPeriodId: "",
        arrExtranetTestForSchoolYearPeriod: undefined,
        strCurrentSchoolYearPeriodId: ""
    };
}

/**
* @name Initialize
* @param {object} objContext Passes Context Object
* @summary Initialize the custom hooks
*/
export function Initialize(objContext) {
    useDataLoader(objContext);
    useDataLoaded(objContext);
    useDataLoadedForExtranetTest(objContext);
}

/**
* @name useDataLoader
* @param {object} objContext objContext
* @summary   Gets the InitialDataParams and passes them as a parameter to the DataCall method.
*/
export function useDataLoader(objContext) {
    useEffect(() => {
        objContext.PupilLearningTest_ModuleProcessor.LoadInitialData(objContext);
    }, []);
}

/**
* @name useDataLoaded
* @param {object} objContext objContext
* @summary Checks if the data is loaded to props and then set the component state accordingly.
*/
export function useDataLoaded(objContext) {
    let strClassId = objContext.PupilLearningTest_ModuleProcessor.GetClassId(objContext.props);
    let strCycleTypeId = objContext.PupilLearningTest_ModuleProcessor.GetCycleTypeId();
    let strPupilId = objContext.props.ClientUserDetails.UserId;
    useEffect(() => {
        if (objContext.state.isLoadComplete)
            ApplicationState.SetProperty("blnShowAnimation", false);
        if (!objContext.state.isLoadComplete &&
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "")["Data"] &&
            DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;uClassId;" + strClassId + ";uPupilId;" + strPupilId + ";iCycleTypeId;" + strCycleTypeId + ";uSchoolYearPeriodId;" + objContext.state.strSchoolYearPeriodId)["Data"] &&
            //DataRef(objContext.props.Object_TestApplication_LearningTestLoginAndResult, "Object_TestApplication_LearningTestLoginAndResult;iCycleTypeId;" + strCycleTypeId + ";uPupilId;" + strPupilId)["Data"] &&
            DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N")["Data"] &&
            DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;iConfigurationFileId;1;vParentKey;ExtranetTeacher;vSubParentKey;LearningTest;vKey;NumberOfRepetitionForSystemGeneratedTest")["Data"] &&
            DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;cIsDeleted;N")["Data"] &&
            Object_Framework_Services_TextResource.GetData("/d.Extranet/4_Pupil/Modules/PupilLearningTest", objContext.props)
        ) {
            let objCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + strCycleTypeId + ";cIsActive;Y;cIsDeleted;N")["Data"][0];

            let arrSchoolYearPeriods = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYearPeriod, "")["Data"];
            arrSchoolYearPeriods = arrSchoolYearPeriods.sort((a, b) => new Date(b["dtFromDate"]) - new Date(a["dtFromDate"]));
            let strCurrentSchoolYearPeriodId = arrSchoolYearPeriods[0]["uSchoolYearPeriodId"];
            objContext.dispatch({ type: "SET_STATE", payload: { strClassId: strClassId, isLoadComplete: true, strCycleId: objCycle["uCycleId"], strCurrentSchoolYearPeriodId: strCurrentSchoolYearPeriodId } });
            ApplicationState.SetProperty("blnShowAnimation", false);
            ApplicationState.SetProperty("DisplayFor", 4);
        }
    }, [
        objContext.props.Object_Intranet_Taxonomy_Subject,
        objContext.props.Object_Extranet_Teacher_SchoolYearPeriod,
        objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/4_Pupil/Modules/PupilLearningTest"],
        objContext.props.Object_Intranet_Test_ExtranetTest,
        objContext.props.Object_TestApplication_LearningTestLoginAndResult,
        objContext.props.Object_Cockpit_MainClient_ClientSettings,
        objContext.props.Object_Intranet_Cycle_Cycle
    ]);
}

/**
* @name useDataLoadedForExtranetTest
* @param {object} objContext objContext
* @summary Checks if the data is loaded to props and then set the component state accordingly. Executes each time class dropdown selects an option
*/
export function useDataLoadedForExtranetTest(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            objContext.dispatch({ type: 'SET_STATE', payload: { blnInitialDataLoaded: false } });
        }
    }, [objContext.props.Object_Intranet_Test_ExtranetTest]);
}