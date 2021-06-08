import loadable from '@loadable/component';

//Framework related imports
import * as FrameworkController from '@root/Framework/Controller/FrameworkController/FrameworkController';

export const objComponents = {
    Main: function () {
        return loadable(() => import(/* webpackChunkName: "Main" */ '@root/Core/2_Main/Main'));
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
        return loadable(() => import(/* webpackChunkName: "Login" */ '@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Login/Login'));
    },
    Master: function () {
        return loadable(() => import(/* webpackChunkName: "Master" */ "@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Master/Master"));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    Home: function () {
        return loadable(() => import(/* webpackChunkName: "Home" */ "@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Home/Home"));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    Pupil: function () {
        return loadable(() => import(/* webpackChunkName: "Home" */ "@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Home/Home"));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PupilProfile: function () {
        return loadable(() => import(/* webpackChunkName: "PupilProfile" */ '@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/PupilProfile'))
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PupilLearningTest: function () {
        return loadable(() => import(/* webpackChunkName: "PupilLearningTest" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTest"));
    },
    ProgressReport_SummaryPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ProgressReport_SummaryPopup" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopup/PupilLearningTestStatisticsPopup/PupilLearningTestStatisticsPopup"));
    }, 
    ProgressReport_LowStakeSummaryPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ProgressReport_LowStakeSummaryPopup" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopup/LowStakeTestStatisticsPopup/LowStakeTestStatisticsPopup"));
    },
    PupilToPlan: function () {
        return loadable(() => import(/* webpackChunkName: "PupilToPlan" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan"));
    },
    PupilToPlan_PopUp: function () {
        return loadable(() => import(/* webpackChunkName: "PupilToPlan_PopUp" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan_PopUp/PupilToPlan_PopUp"));
    },
    PupilTaskPage: function () {
        return loadable(() => import(/* webpackChunkName: "PupilTaskPage" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/PupilTaskPage"));
    },
    PupilThink: function () {
        return loadable(() => import(/* webpackChunkName: "PupilThink" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilThink/PupilThink"));
    },
    LearnProfile: function() {
        return loadable(() => import(/* webpackChunkName: "LearnProfile" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/LearnProfile/LearnProfile"));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PupilNews: function () {
        return loadable(() => import(/* webpackChunkName: "PupilNews" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNews"));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PupilAddContactPopup: function () {
        return loadable(() => import(/* webpackChunkName: "PupilAddContactPopup" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/PupilAddContactPopup"));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PupilShareNewsPopup: function () {
        return loadable(() => import(/* webpackChunkName: "PupilShareNewsPopup" */ '@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/PupilShareNewsPopup'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PupilDocument: function () {
        return loadable(() => import(/* webpackChunkName: "PupilDocument" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocument"));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PupilCreateFolderPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "PupilCreateFolderPopUp" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/PupilCreateFolderPopUp/PupilCreateFolderPopUp"));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    UploadFilePopup: function () {
        return loadable(() => import(/* webpackChunkName: "UploadFilePopup" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/UploadFilePopup/UploadFilePopup"));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    DeleteFolderPopup: function () {
        //  return loadable(() => import(/* webpackChunkName: "DeleteFolderPopup" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/DeleteFolderPopup/DeleteFolderPopup"))
        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    ShareFolderPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ShareFolderPopup" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/ShareFolderPopup/ShareFolderPopup"));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    CopyFolderPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "CopyFolderPopUp" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp"));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    CreateNewExercisePopUp: function () {
        return loadable(() => import(/* webpackChunkName: "CreateNewExercisePopUp" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopUp/CreateNewExercisePopUp/CreateNewExercisePopUp"))
    },
    TestPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "TestPopUp" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopUp/TestPopUp/TestPopUp"))
    },
    TaskImagePopUp: function () {
        return loadable(() => import(/* webpackChunkName: "TaskImagePopUp" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilLearningTest/PupilLearningTestPopUp/TaskImagePopUp/TaskImagePopUp"))
    },
    PupilTest: function () {
        return loadable(() => import(/* webpackChunkName: "test" */ "@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilTest/PupilTest"))
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PracticeTestDisplay: function () {
        return loadable(() => import(/* webpackChunkName: "PracticeTestDisplay" */ '@root/Application/d.Extranet/3_Teacher/PC/Modules/PracticeTestDisplay/PracticeTestDisplay'))
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    ResetResultsPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "ResetResultsPopUp" */ '@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/ResetResultsPopUp/ResetResultsPopUp'))
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PracticeTestPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "PracticeTestPopUp" */ '@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/PracticeTestPopUp/PracticeTestPopUp'))
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    PracticeTest: function () {
        return loadable(() => import(/* webpackChunkName: "PracticeTest" */ '@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/PracticeTest'))
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    }
};

const ComponentController = {

    GetComponent: function (strComponentName) {
        if (objComponents[strComponentName.split('?')[0]] !== null) {
            return objComponents[strComponentName.split('?')[0]]();
        } else {
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
