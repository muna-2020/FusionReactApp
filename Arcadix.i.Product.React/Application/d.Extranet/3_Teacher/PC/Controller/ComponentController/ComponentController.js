import loadable from '@loadable/component'

//Framework related imports
import * as FrameworkController from '@root/Framework/Controller/FrameworkController/FrameworkController';

export const objComponents = {
    // example: {
    //     LoadComponent: function () {

    //         return require('@root/Application/d.Extranet/2_School/PC/Modules/Example/Example').default;
    //     }
    // },

    Main: function () {
        return loadable(() => import(/* webpackChunkName: "Main" */ '@root/Core/2_Main/Main'))
    },
    PerformanceResponse: function () {
        return loadable(() => import(/* webpackChunkName: "PerformanceView" */ '@root/Core/7_DevelopmentSideBar/PerformanceView/Popup/PerformanceResponse/PerformanceResponse'));
    },
    ViewCSRStateProps: function () {
        return loadable(() => import(/* webpackChunkName: "ViewCSRStateProps" */ '@root/Core/7_DevelopmentSideBar/PerformanceView/Popup/ViewCSRStateProps/ViewCSRStateProps'));
    },
    ShowProcedureDefinition: function () {
        return loadable(() => import(/* webpackChunkName: "ShowProcedureDefinition" */ '@root/Application/c.Cockpit/PC/Modules/SoftwareEngineerSupport/DatabaseCompare/ShowProcedureDefinition/ShowProcedureDefinition'));
    },
    ViewFileContent: function () {
        return loadable(() => import(/* webpackChunkName: "ViewFileContent" */ '@root/Core/7_DevelopmentSideBar/ModulePerformance/ViewFileContent/ViewFileContent'));
    },
    Login: function () {
        return loadable(() => import(/* webpackChunkName: "Login" */ '@root/Application/d.Extranet/2_School/PC/LoginAndMaster/Login/Login'));
    },
    Master: function () {
        return loadable(() => import(/* webpackChunkName: "Master" */ '@root/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/Master'));
    },
    TeacherStartPage: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherStartPage" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/TeacherStartPage'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    SurveyPopup: function () {
        return loadable(() => import(/* webpackChunkName: "SurveyPopup" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/SurveyPopup/SurveyPopup'));
    },
    ClientNewsPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ClientNewsPopup" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/ClientNews/ClientNewsPopup'));
    },
    TeacherProfile: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherProfile" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherProfile/TeacherProfile'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    CreatePdfPopUp: function () {
        //return loadable(() => import(/* webpackChunkName: "CreatePdfPopUp" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/PupilLogin/PupilLoginPopup/CreatePdfPopUp/CreatePdfPopUp'));
        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TestLogins: function () {
        return loadable(() => import(/* webpackChunkName: "TestLogins" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLogins'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
        //return loadable(() => import(/* webpackChunkName: "TeacherNews" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherNews'));
    },
    TestResults: function () {
        return loadable(() => import(/* webpackChunkName: "TestResults" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResults'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    HighStakeTestLogins: function () {
        return loadable(() => import(/* webpackChunkName: "HighStakeTestLogins" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestLogins/HighStakeTestLogins'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    HighStakeTestResults: function () {
        return loadable(() => import(/* webpackChunkName: "HighStakeTestResults" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResults'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    ArchiveTestResultsHighStake: function () {
        return loadable(() => import(/* webpackChunkName: "ArchiveTestResultsHighStake" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResults'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    LearningJournal: function () {
        return loadable(() => import(/* webpackChunkName: "LearningJournal" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournal/LearningJournal'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    LearningJournalArchive: function () {
        return loadable(() => import(/* webpackChunkName: "LearningJournalArchive" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournalArchive/LearningJournalArchive'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },

    LearningTestTeacher: function () {
        return loadable(() => import(/* webpackChunkName: "LearningTestTeacher" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacher'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    ClassAndPupil: function () {
        return loadable(() => import(/* webpackChunkName: "ClassAndPupil" */ '@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/ClassAndPupil'));
    },
    MovePupilPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "MovePupilPopUp" */ '@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/MovePupilPopUp/MovePupilPopUp'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    AddPupilPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "AddPupilPopUp" */ '@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/AddPupilPopUp/AddPupilPopUp'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    ImportPupilPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "ImportPupilPopUp" */ '@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/ImportPupilPopUp'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    Contact: function () {
        return loadable(() => import(/* webpackChunkName: "Contact" */ '@root/Application/d.Extranet/5_Shared/PC/Modules/Contact/Contact'));
    },
    Notes: function () {
        return loadable(() => import(/* webpackChunkName: "Notes" */ '@root/Application/d.Extranet/2_School/PC/Modules/Notes/Notes'));
    },
    TeacherNews: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherNews" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherNews'));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TeacherDocument: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherDocument" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocument'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    Interpretation: function () {
        return loadable(() => import(/* webpackChunkName: "Interpretation" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/Interpretation/Interpretation'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TimeTableSchedule: function () {
        return loadable(() => import(/* webpackChunkName: "TimeTableSchedule" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TimeTableSchedule/TimeTableSchedule'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TeacherAddFolderPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherAddFolderPopUp" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherAddFolderPopUp'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    ProgressBar: function () {
        //return loadable(() => import(/* webpackChunkName: "ProgressBar" */ '@root/Framework/Controls/ProgressBar/ProgressBar'));
        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TeacherAssignUserPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherAssignUserPopUp" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherAssignUserPopUp'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TeacherFileUploadPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherFileUploadPopUp" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/UploadFilePopup/TeacherFileUploadPopUp'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    AddContactPopup: function () {
        return loadable(() => import(/* webpackChunkName: "AddContactPopup" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherNewsPopup/TeacherAddContactPopup/AddContactPopup'));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TeacherShareNewsPopup: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherShareNewsPopup" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherNewsPopup/TeacherShareNewsPopup/TeacherShareNewsPopup'));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    CreateFolderPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "CreateFolderPopUp" */ "@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp"));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    DeleteFolderPopup: function () {
        //return loadable(() => import(/* webpackChunkName: "DeleteFolderPopup" */ "@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/DeleteFolderPopup/DeleteFolderPopup"));
        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    ShareFolderPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ShareFolderPopup" */ "@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/ShareFolderPopup/ShareFolderPopup"));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    CopyFolderPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "CopyFolderPopUp" */ "@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp"));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    CoTeacherAndSubjectExpert: function () {
        return loadable(() => import(/* webpackChunkName: "CoTeacherAndSubjectExpert" */ "@root/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/CoTeacherAndSubjectExpert"));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },

    TestResultsErrorPopup: function () {
        //return loadable(() => import(/* webpackChunkName: "TestResultsErrorPopup" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResultsPopup/TestResultsErrorPopup/TestResultsErrorPopup'));
        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TestResultsCreatePdf: function () {
        //return loadable(() => import(/* webpackChunkName: "TestResultsCreatePdf" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResultsPopup/TestResultsCreatePdf/TestResultsCreatePdf'));
        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    MoveResultsPopup: function () {
        return loadable(() => import(/* webpackChunkName: "MoveResults" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResultsPopup/MoveResultsPopup/MoveResultsPopup'));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    LearningTestSettings: function () {
        return loadable(() => import(/* webpackChunkName: "LearningTestSettings" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystemPopups/LearningTestSettings/LearningTestSettings'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    LearningTestSettingsTeacher: function () {
        return loadable(() => import(/* webpackChunkName: "LearningTestSettings" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestSettings/LearningTestSettings'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    //teacherdocumenterrorpopup: function () {
    //        //return loadable(() => import(/* webpackChunkName: "teacherdocumenterrorpopup" */ "@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/ErrorPopup/ErrorPopup"));
    //        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    //},
    LearningTestStatistics: function () {
        return loadable(() => import(/* webpackChunkName: "LearningTestStatistics" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystemPopups/LearningTestStatistics/LearningTestStatistics'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TestPopUp: function () {
        //return loadable(() => import(/* webpackChunkName: "TestPopUp" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystemPopups/TestPopUp/TestPopUp'));
        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TaskPopup: function () {
        return loadable(() => import(/* webpackChunkName: "TaskPopup" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystemPopups/TaskPopup/TaskPopup'));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TestStatistics: function () {
        return loadable(() => import(/* webpackChunkName: "TestStatistics" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/TestStatistics/TestStatistics'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    HighStackActivateAllTests: function () {
        //return loadable(() => import(/* webpackChunkName: "HighStackActivateAllTests" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestLogins/HighStackTestLoginsPopups/HighStackActivateAllTests/HighStackActivateAllTests'));
        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    HighStackActivateIndividualTest: function () {
        //return loadable(() => import(/* webpackChunkName: "HighStackActivateIndividualTest" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestLogins/HighStackTestLoginsPopups/HighStackActivateIndividualTest/HighStackActivateIndividualTest'));
        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    Leistungsprofilpopup: function () {
        //return loadable(() => import(/* webpackChunkName: "Leistungsprofilpopup" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResultsPopUp/Leistungsprofilpopup/Leistungsprofilpopup'));
        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    DetailPDFPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "DetailPDFPopUp" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResultsPopUp/DetailPDFPopUp/DetailPDFPopUp'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    EditTasks: function () {
        return loadable(() => import(/* webpackChunkName: "EditTasks" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/EditTasks/EditTasks'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    LearningTestCreation: function () {
        return loadable(() => import(/* webpackChunkName: "LearningTestCreation" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestCreation/LearningTestCreation'));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TaskImage: function () {
        return loadable(() => import(/* webpackChunkName: "TaskImage" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/TaskImage/TaskImage'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TimeTableSchedulePopUp: function () {
        return loadable(() => import(/* webpackChunkName: "TimeTableSchedulePopUp" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TimeTableSchedule/TimeTableSchedulePopUp/TimeTableSchedulePopUp'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    LearningTestCreateGroup: function () {
        return loadable(() => import(/* webpackChunkName: "LearningTestCreateGroup" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestCreateGroup/LearningTestCreateGroup'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    LearningTestPreview: function () {
        return loadable(() => import(/* webpackChunkName: "LearningTestPreview" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacherPopups/LearningTestPreview/LearningTestPreview'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PupilTopicReviewCriteria: function () {
        return loadable(() => import(/* webpackChunkName: "PupilTopicReviewCriteria" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournal/LearningJournalPopups/PupilTopicReviewCriteria/PupilTopicReviewCriteria'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    ArchiveData: function () {
        return loadable(() => import(/* webpackChunkName: "ArchiveData" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournalArchive/LearningJournalArchivePopups/ArchiveData/ArchiveData'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TestLoginsAssignClassType: function () {
        return loadable(() => import(/* webpackChunkName: "TestLoginsAssignClassType" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLoginsPopups/TestLoginsAssignClassType/TestLoginsAssignClassType'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));           
    },
    EssayTestLogins: function () {
        return loadable(() => import(/* webpackChunkName: "EssayTestLogins" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/EssayTestLogins/EssayTestLogins'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));           
    },
    AssignClassType: function () {
        return loadable(() => import(/* webpackChunkName: "AssignClassType" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/AssignClassType/AssignClassType'));
    },
    ProgressReport: function () {
        return loadable(() => import(/* webpackChunkName: "ProgressReport" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/ProgressReport'));
    },
    PupilLearnProfilePopup: function () {
        return loadable(() => import(/* webpackChunkName: "PupilLearnProfilePopup" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/PupilLearnProfilePopup/PupilLearnProfilePopup'));
    },
    DataComparison: function () {
        return loadable(() => import(/* webpackChunkName: "DataComparison" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResultsPopUp/DataComparison/DataComparison'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    //PracticeTestDisplay: function () {
    //       return loadable(() => import(/* webpackChunkName: "PracticeTestDisplay" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/PracticeTestDisplay/PracticeTestDisplay'));
    //},
    ResetResultsPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "ResetResultsPopUp" */ '@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/ResetResultsPopUp/ResetResultsPopUp'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PracticeTestPopUp: function () {
        //return loadable(() => import(/* webpackChunkName: "PracticeTestPopUp" */ '@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/PracticeTestPopUp/PracticeTestPopUp'));
        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PracticeTest: function () {
        return loadable(() => import(/* webpackChunkName: "PracticeTest" */ '@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/PracticeTest'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TimeTableSettings: function () {
        return loadable(() => import(/* webpackChunkName: "TimeTableSettings" */ '@root/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableSettings'));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    LearningTestSystem: function () {
        return loadable(() => import(/* webpackChunkName: "LearningTestSystem" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystem'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PupilLogin: function () {
        return loadable(() => import(/* webpackChunkName: "PupilLogin" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/PupilLogin/PupilLogin'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    SchoolDataComparisonPrintToPdf: function () {
        return loadable(() => import(/* webpackChunkName: "SchoolDataComparisonPrintToPdf" */ '@root/Application/d.Extranet/2_School/PC/Modules/SchoolDataComparisonPrintToPdf/SchoolDataComparisonPrintToPdf'));
    },
    PracticeTestDisplay: function () {
        return loadable(() => import(/* webpackChunkName: "PracticeTestDisplay" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/PracticeTestDisplay/PracticeTestDisplay'))
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PlanenTopicDisplay: function () {
        return loadable(() => import(/* webpackChunkName: "PlanenTopicDisplay" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournal/LearningJournalPopups/PlanenTopicDisplay/PlanenTopicDisplay'));
    },
};

const ComponentController = {
    GetComponent: function (strComponentName) {
        if (objComponents[strComponentName.split('?')[0]] !== null) {
            return objComponents[strComponentName.split('?')[0]]();
        }
        else {
            return undefined;
        }
    },
    GetFrameworkComponent: function (strFrameworkComponentName) {
        let objFrameworkComponents = FrameworkController.objComponents;
        let objComponent = objFrameworkComponents[strFrameworkComponentName];
        if (objComponent !== undefined && objComponent !== null) {
            try {
                return objComponent();
            }
            catch (error) {
                Logger.LogError("Framework Component", strFrameworkComponentName);
                Logger.LogError("Framework Component Import Error", error);
                console.trace("Import Error");
            }
        }
        else {
            return undefined;
        }
    }
};

export default ComponentController;






