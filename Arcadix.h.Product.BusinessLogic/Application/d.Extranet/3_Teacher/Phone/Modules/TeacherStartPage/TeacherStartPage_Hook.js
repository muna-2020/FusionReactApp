export * from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/TeacherStartPage_Hook';

// //React specific
// import { useEffect } from 'react';

// //Module related files.
// import TeacherStartPage_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/TeacherStartPage_ModuleProcessor';
// import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

// /**
// * @name GetInitialState
// * @summary State of the teacher component
// * @returns {object} initial state object
// */
// export function GetInitialState(props) {
//     let blnIsLoadComplete = false;
//     let strClassId = ApplicationState.GetProperty("SelectedClassId");
//     let strOrientationCycleTypeId = "1";
//     let strHighStakeCycleTypeId = "6";
//     let strLearningCycleTypeId = "3";
//     let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
//     let uSchoolId = props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
//     let strTeacherId = props.ClientUserDetails.UserId;
//     let iMainClientId = props.ClientUserDetails.MainClientId;
//     let iApplicationTypeId = props.ClientUserDetails.ApplicationTypeId;

//     let objTeacherStartPage_ModuleProcessor = new TeacherStartPage_ModuleProcessor()

//     let arrOrientationTestPupil = [];
//     let arrOrientationTestResult = [];
//     let arrHighStakeTestPupil = [];
//     let arrHighStakeTestResult = [];
//     let arrLearningTestPupil = [];
//     let arrDocumentData = [];
//     let arrNewsData = [];

//     let objContext = { props, "TeacherStartPage_ModuleProcessor": objTeacherStartPage_ModuleProcessor}
//     if (
//         DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId)["Data"] &&
//         Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherStartPage", props) &&
//         DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
//         DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
//         DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
//         DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iMainClientId;" + iMainClientId + ";cIsDeleted;N")["Data"] &&
//         DataRef(props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;vParentKey;ExtranetTeacher;vSubParentKey;TestLoginPaperless;vKey;InvalidateTokenTime")["Data"] &&
//         DataRef(props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId + ";uTeacherId;" + strTeacherId)["Data"] &&
//         DataRef(props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId)["Data"] &&
//         DataRef(props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId;uClassId;" + strClassId)["Data"] &&
//         DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + uSchoolId)["Data"] &&
//         DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + uSchoolId)["Data"] &&
//         DataRef(props.Extranet_Teacher_TeacherDocument_Module, "Extranet_Teacher_TeacherDocument_Module;uClassId;" + strClassId)["Data"] &&
//         DataRef(props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
//         DataRef(props.Object_Extranet_Shared_Survey, "Object_Extranet_Shared_Survey;uUserId;" + strTeacherId)["Data"] &&
//         DataRef(props.Object_Extranet_Shared_SurveyQuestion, "Object_Extranet_Shared_SurveyQuestion;uUserId;" + uSchoolId + ";cIsCurrentSurveyQuestion;Y")["Data"] &&
//         DataRef(props.Object_Cockpit_MainClient_ClientUrls_GetClientUrl, "Object_Cockpit_MainClient_ClientUrls_GetClientUrl;iApplicationTypeId;16") &&
//         DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strOrientationCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
//         DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strHighStakeCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
//         DataRef(props.Extranet_Teacher_Tip_Module, "Extranet_Teacher_Tip_Module;cIsActive;Y;cIsDeleted;N;iApplicationTypeId;" + iApplicationTypeId + ";iMainClientId;" + iMainClientId)["Data"]
//     ) {
//         let arrPupilData = objTeacherStartPage_ModuleProcessor.GetPupilData(objContext);
//         let arrOrientationTestLoginResult = DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId)["Data"];
//         let arrHighStakeTestLoginResult = DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId)["Data"];
//         let arrSubject = DataRef(props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iMainClientId;" + iMainClientId + ";cIsDeleted;N")["Data"];
//         let arrOrientationTestData = DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strOrientationCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
//         let arrHighStakeTestData = DataRef(props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strHighStakeCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
//         arrOrientationTestPupil = objTeacherStartPage_ModuleProcessor.GetTestData(objContext, arrPupilData, arrOrientationTestLoginResult, arrOrientationTestData, arrSubject);
//         arrOrientationTestResult = objTeacherStartPage_ModuleProcessor.GetTestResult(objContext, arrPupilData, arrOrientationTestLoginResult, arrOrientationTestData, arrSubject);
//         arrHighStakeTestPupil = objTeacherStartPage_ModuleProcessor.GetTestData(objContext, arrPupilData, arrHighStakeTestLoginResult, arrHighStakeTestData, arrSubject);
//         arrHighStakeTestResult = objTeacherStartPage_ModuleProcessor.GetTestResult(objContext, arrPupilData, arrHighStakeTestLoginResult, arrHighStakeTestData, arrSubject);
//         let arrLearningTestData = DataRef(props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId + ";uTeacherId;" + strTeacherId)["Data"];
//         let arrLearningTestLoginResult = DataRef(props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId)["Data"];
//         arrLearningTestPupil = objTeacherStartPage_ModuleProcessor.GetLearningTestData(objContext, arrPupilData, arrLearningTestLoginResult, arrLearningTestData, arrSubject);
//         let arrDocument = DataRef(props.Extranet_Teacher_TeacherDocument_Module, "Extranet_Teacher_TeacherDocument_Module;uClassId;" + strClassId)["Data"];
//         let arrTeacherData = DataRef(props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + uSchoolId)["Data"];
//         let objSchool = DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + uSchoolId)["Data"][0];
//         arrDocumentData = objTeacherStartPage_ModuleProcessor.GetDocumentDisplayData(objContext, arrDocument, objSchool, arrTeacherData, arrPupilData);
//         let arrNews = DataRef(props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
//         arrNewsData = objTeacherStartPage_ModuleProcessor.GetNewsDisplayData(objContext, arrNews, objSchool, arrTeacherData, arrPupilData);
//         blnIsLoadComplete = true;
//     }
//     return {
//         isLoadComplete: blnIsLoadComplete,
//         strSelectedClassId: "",
//         isPreSelectValueSet: false,
//         arrPupilData: [],
//         blnClassChangedInDropdown: false,
//         arrOrientationTestPupil: arrOrientationTestPupil,
//         arrOrientationTestResult: arrOrientationTestResult,
//         arrHighStakeTestPupil: arrHighStakeTestPupil,
//         arrHighStakeTestResult: arrHighStakeTestResult,
//         arrLearningTestPupil: arrLearningTestPupil,
//         arrDocumentData: arrDocumentData,
//         arrNewsData: arrNewsData,
//         blnShowInitialPopup: true,
//         blnIsChecked: false,
//         strFeedbackTab: ""
//     };
// }

// /**
// * @name Initialize
// * @param {object} objContext Passes Context Object
// * @summary Initialize the custom hooks
// */
// export function Initialize(objContext) {
//     useDataLoader(objContext);
//     useDataLoaderForClassChange(objContext);
//     useDataLoaded(objContext);
//     useDataLoadedAfterClassChange(objContext);
//     useShowInitialPopup(objContext);
// }

// /** 
// * @name useDataLoader
// * @param {object} objContext objContext
// * @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
// */
// export function useDataLoader(objContext) {
//     useEffect(() => {
//         objContext.TeacherStartPage_ModuleProcessor.LoadInitialData(objContext);
//     }, []);
// }

// /**
//  * @name useDataLoaderForClassChange
//  * @param {object} objContext objContext
//  * @summary Gets the InitialDataParams and passes them as a parameter to the DataCall method.
//  */
// export function useDataLoaderForClassChange(objContext) {
//     useEffect(() => {
//         if (objContext.state.isLoadComplete) {
//             objContext.TeacherStartPage_ModuleProcessor.LoadClassChangeData(objContext);
//         }
//     }, [objContext.state.blnClassChangedInDropdown]);
// }

// /**
// * @name useDataLoaded
// * @param {object} objContext objContext
// * @summary Checks if the data is loaded to props and then set the component state accordingly.
// */
// export function useDataLoaded(objContext) {
//     let strClassId = ApplicationState.GetProperty("SelectedClassId");
//     let strOrientationCycleTypeId = "1";
//     let strHighStakeCycleTypeId = "6";
//     let strLearningCycleTypeId = "3";
//     let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
//     let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
//     let strTeacherId = objContext.props.ClientUserDetails.UserId;
//     let iMainClientId = objContext.props.ClientUserDetails.MainClientId;
//     let iApplicationTypeId = objContext.props.ClientUserDetails.ApplicationTypeId;
//     useEffect(() => {
//         if (objContext.state.isLoadComplete)
//             ApplicationState.SetProperty("blnShowAnimation", false);
//         if (DataRef(objContext.props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"] &&
//             Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherStartPage", objContext.props) &&
//             DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
//             DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
//             DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId)["Data"] &&
//             DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iMainClientId;" + iMainClientId + ";cIsDeleted;N")["Data"] &&
//             DataRef(objContext.props.Object_Cockpit_MainClient_ClientSettings, "Object_Cockpit_MainClient_ClientSettings;vParentKey;ExtranetTeacher;vSubParentKey;TestLoginPaperless;vKey;InvalidateTokenTime")["Data"] &&
//             DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId + ";uTeacherId;" + strTeacherId)["Data"] &&
//             DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId)["Data"] &&
//             DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage_GetDataByClassId;uClassId;" + strClassId)["Data"] &&
//             DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + uSchoolId)["Data"] &&
//             DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + uSchoolId)["Data"] &&
//             DataRef(objContext.props.Extranet_Teacher_TeacherDocument_Module, "Extranet_Teacher_TeacherDocument_Module;uClassId;" + strClassId)["Data"] &&
//             DataRef(objContext.props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
//             DataRef(objContext.props.Object_Extranet_Shared_Survey, "Object_Extranet_Shared_Survey;uUserId;" + strTeacherId)["Data"] &&
//             DataRef(objContext.props.Object_Extranet_Shared_SurveyQuestion, "Object_Extranet_Shared_SurveyQuestion;uUserId;" + uSchoolId + ";cIsCurrentSurveyQuestion;Y")["Data"] &&
//             DataRef(objContext.props.Object_Extranet_Shared_OpenApplicationCredential, "FusionPupil") &&
//             DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strOrientationCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
//             DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strHighStakeCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"] &&
//             DataRef(objContext.props.Extranet_Teacher_Tip_Module, "Extranet_Teacher_Tip_Module;cIsActive;Y;cIsDeleted;N;iApplicationTypeId;" + iApplicationTypeId + ";iMainClientId;" + iMainClientId)["Data"]
//         ) {
//             let arrPupilData = objContext.TeacherStartPage_ModuleProcessor.GetPupilData(objContext);
//             let arrOrientationTestLoginResult = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId)["Data"];
//             let arrHighStakeTestLoginResult = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId)["Data"];
//             let arrSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iMainClientId;" + iMainClientId + ";cIsDeleted;N")["Data"];
//             let arrOrientationTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strOrientationCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
//             let arrHighStakeTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strHighStakeCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
//             let arrOrientationTestPupil = objContext.TeacherStartPage_ModuleProcessor.GetTestData(objContext, arrPupilData, arrOrientationTestLoginResult, arrOrientationTestData, arrSubject);
//             let arrOrientationTestResult = objContext.TeacherStartPage_ModuleProcessor.GetTestResult(objContext, arrPupilData, arrOrientationTestLoginResult, arrOrientationTestData, arrSubject);
//             let arrHighStakeTestPupil = objContext.TeacherStartPage_ModuleProcessor.GetTestData(objContext, arrPupilData, arrHighStakeTestLoginResult, arrHighStakeTestData, arrSubject);
//             let arrHighStakeTestResult = objContext.TeacherStartPage_ModuleProcessor.GetTestResult(objContext, arrPupilData, arrHighStakeTestLoginResult, arrHighStakeTestData, arrSubject);
//             let arrLearningTestData = DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId + ";uTeacherId;" + strTeacherId)["Data"];
//             let arrLearningTestLoginResult = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId)["Data"];
//             let arrLearningTestPupil = objContext.TeacherStartPage_ModuleProcessor.GetLearningTestData(objContext, arrPupilData, arrLearningTestLoginResult, arrLearningTestData, arrSubject);
//             let arrDocument = DataRef(objContext.props.Extranet_Teacher_TeacherDocument_Module, "Extranet_Teacher_TeacherDocument_Module;uClassId;" + strClassId)["Data"];
//             let arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + uSchoolId)["Data"];
//             let objSchool = DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + uSchoolId)["Data"][0];
//             let arrDocumentData = objContext.TeacherStartPage_ModuleProcessor.GetDocumentDisplayData(objContext, arrDocument, objSchool, arrTeacherData, arrPupilData);
//             let arrNews = DataRef(objContext.props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
//             let arrNewsData = objContext.TeacherStartPage_ModuleProcessor.GetNewsDisplayData(objContext, arrNews, objSchool, arrTeacherData, arrPupilData);

//             if (!objContext.state.isLoadComplete) {
//                 objContext.dispatch({ type: "SET_STATE", payload: { "isLoadComplete": true } });
//             }
//             ApplicationState.SetProperty("blnShowAnimation", false);

//             objContext.dispatch({
//                 type: "SET_STATE", payload: {
//                     "arrPupilData": arrPupilData,
//                     "arrOrientationTestPupil": arrOrientationTestPupil,
//                     "arrOrientationTestResult": arrOrientationTestResult,
//                     "arrHighStakeTestPupil": arrHighStakeTestPupil,
//                     "arrHighStakeTestResult": arrHighStakeTestResult,
//                     "arrLearningTestPupil": arrLearningTestPupil,
//                     "arrDocumentData": arrDocumentData,
//                     "arrNewsData": arrNewsData
//                 }
//             });
//         }
//     }, [
//         objContext.props.Object_Extranet_Teacher_Class,
//         objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/d.Extranet/3_Teacher/Modules/TeacherStartPage"],
//         objContext.props.Object_Extranet_Pupil_Pupil,
//         objContext.props.Object_TestApplication_TestLoginAndResult, objContext.props.Object_Intranet_Test_IntranetTest, objContext.props.Object_Intranet_Taxonomy_Subject,
//         objContext.props.Object_Cockpit_MainClient_ClientSettings, objContext.props.Object_Intranet_Test_ExtranetTest,
//         objContext.props.Object_Extranet_Teacher_Teacher, objContext.props.Object_Extranet_School_School,
//         objContext.props.Object_Cockpit_UserPreferenceProfileImage,
//         objContext.props.Extranet_Teacher_TeacherDocument_Module,
//         objContext.props.Extranet_Teacher_TeacherNews_Module,
//         objContext.props.Object_Extranet_Shared_Survey,
//         objContext.props.Object_Extranet_Shared_SurveyQuestion,
//         objContext.props.Extranet_Teacher_Tip_Module,
//         objContext.props.Object_Extranet_Shared_OpenApplicationCredential

//     ]);
// }

// /**
// * @name useDataLoadedAfterClassChange
// * @param {object} objContext objContext
// * @summary Checks if the data related to class dropdown changes is loaded to props and then set the component state accordingly.
// */
// export function useDataLoadedAfterClassChange(objContext) {
//     useEffect(() => {
//         if (objContext.state.isLoadComplete) {
//             let strClassId = ApplicationState.GetProperty("SelectedClassId");
//             let strOrientationCycleTypeId = "1";
//             let strHighStakeCycleTypeId = "6";
//             let strLearningCycleTypeId = "3";
//             let iStateId = GetStateIdBasedOnSchool(objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"]);
//             let uSchoolId = objContext.props.ClientUserDetails.TeacherDetails["t_TestDrive_Member_Teacher_School"][0]["uSchoolId"];
//             let strTeacherId = objContext.props.ClientUserDetails.UserId;
//             if (DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId) &&
//                 DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId) &&
//                 DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId + ";uTeacherId;" + strTeacherId) &&
//                 DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strOrientationCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N") &&
//                 DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strHighStakeCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N") &&
//                 DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + strClassId) &&
//                 DataRef(objContext.props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;" + strClassId) &&
//                 DataRef(objContext.props.Extranet_Teacher_TeacherDocument_Module, "Extranet_Teacher_TeacherDocument_Module;uClassId;" + strClassId)["Data"] &&
//                 DataRef(objContext.props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + strClassId + ";cIsDeleted;N")["Data"]
//             ) {
//                 let arrPupilData = objContext.TeacherStartPage_ModuleProcessor.GetPupilData(objContext);
//                 let arrOrientationTestLoginResult = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strOrientationCycleTypeId + ";uClassId;" + strClassId)["Data"];
//                 let arrHighStakeTestLoginResult = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strHighStakeCycleTypeId + ";uClassId;" + strClassId)["Data"];
//                 let arrSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject, "Object_Intranet_Taxonomy_Subject;iMainClientId;" + objContext.props.ClientUserDetails.MainClientId + ";cIsDeleted;N")["Data"];
//                 let arrOrientationTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strOrientationCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
//                 let arrHighStakeTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iStateId;" + iStateId + ";iCycleTypeId;" + strHighStakeCycleTypeId + ";uSchoolId;" + uSchoolId + ";uTeacherId;" + objContext.props.ClientUserDetails.UserId + ";uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
//                 let arrOrientationTestPupil = objContext.TeacherStartPage_ModuleProcessor.GetTestData(objContext, arrPupilData, arrOrientationTestLoginResult, arrOrientationTestData, arrSubject);
//                 let arrOrientationTestResult = objContext.TeacherStartPage_ModuleProcessor.GetTestResult(objContext, arrPupilData, arrOrientationTestLoginResult, arrOrientationTestData, arrSubject);
//                 let arrHighStakeTestPupil = objContext.TeacherStartPage_ModuleProcessor.GetTestData(objContext, arrPupilData, arrHighStakeTestLoginResult, arrHighStakeTestData, arrSubject);
//                 let arrHighStakeTestResult = objContext.TeacherStartPage_ModuleProcessor.GetTestResult(objContext, arrPupilData, arrHighStakeTestLoginResult, arrHighStakeTestData, arrSubject);
//                 let arrLearningTestData = DataRef(objContext.props.Object_Intranet_Test_ExtranetTest, "Object_Intranet_Test_ExtranetTest;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId + ";uTeacherId;" + strTeacherId)["Data"];
//                 let arrLearningTestLoginResult = DataRef(objContext.props.Object_TestApplication_TestLoginAndResult, "Object_TestApplication_TestLoginAndResult;iCycleTypeId;" + strLearningCycleTypeId + ";uClassId;" + strClassId)["Data"];
//                 let arrLearningTestPupil = objContext.TeacherStartPage_ModuleProcessor.GetLearningTestData(objContext, arrPupilData, arrLearningTestLoginResult, arrLearningTestData, arrSubject);
//                 let arrDocument = DataRef(objContext.props.Extranet_Teacher_TeacherDocument_Module, "Extranet_Teacher_TeacherDocument_Module;uClassId;" + strClassId)["Data"];
//                 let arrTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uSchoolId;" + uSchoolId)["Data"];
//                 let objSchool = DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + uSchoolId)["Data"][0];
//                 let arrDocumentData = objContext.TeacherStartPage_ModuleProcessor.GetDocumentDisplayData(objContext, arrDocument, objSchool, arrTeacherData, arrPupilData);
//                 let arrNews = DataRef(objContext.props.Extranet_Teacher_TeacherNews_Module, "Extranet_Teacher_TeacherNews_Module;uClassId;" + strClassId + ";cIsDeleted;N")["Data"];
//                 let arrNewsData = objContext.TeacherStartPage_ModuleProcessor.GetNewsDisplayData(objContext, arrNews, objSchool, arrTeacherData, arrPupilData);

//                 objContext.dispatch({
//                     type: "SET_STATE", payload: {
//                         "arrPupilData": arrPupilData,
//                         "arrOrientationTestPupil": arrOrientationTestPupil,
//                         "arrOrientationTestResult": arrOrientationTestResult,
//                         "arrHighStakeTestPupil": arrHighStakeTestPupil,
//                         "arrHighStakeTestResult": arrHighStakeTestResult,
//                         "arrLearningTestPupil": arrLearningTestPupil,
//                         "arrDocumentData": arrDocumentData,
//                         "arrNewsData": arrNewsData
//                     }
//                 });
//             }
//         }
//     }, [
//         objContext.props.Object_Extranet_Pupil_Pupil, objContext.props.Object_TestApplication_TestLoginAndResult,
//         objContext.props.Object_Intranet_Test_IntranetTest, objContext.props.Object_Intranet_Test_ExtranetTest,
//         objContext.props.Object_Cockpit_UserPreferenceProfileImage,
//         objContext.props.Extranet_Teacher_TeacherDocument_Module,
//         objContext.props.Extranet_Teacher_TeacherNews_Module
//     ]);
// }

// /**
// * @name useShowInitialPopup
// * @param {object} objContext objContext
// * @summary Checks if the module needs to show the initial popup or not and updates the state accordingly.
// */
// export function useShowInitialPopup(objContext) {
//     useEffect(() => {
//         if (!objContext.state.isLoadComplete) {
//             let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
//             let blnShowInitialPopup = true;
//             if (objUserPreference) {
//                 objUserPreference["t_Framework_UserPreference_PreferenceValue"].map(objPreferenceValue => { //code to show/not show the information popup 
//                     if (objPreferenceValue["vKey"] === "StartPageInformationPopup") {
//                         blnShowInitialPopup = false;
//                     }
//                 });
//                 objContext.dispatch({ type: "SET_STATE", payload: { "blnShowInitialPopup": blnShowInitialPopup } });
//             }
//         }
//     }, []);
// }