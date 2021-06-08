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
    Login: function () {
        return loadable(() => import(/* webpackChunkName: "Login" */ '@root/Application/d.Extranet/2_School/Phone/LoginAndMaster/Login/Login'));
    },
    Master: function () {
        return loadable(() => import(/* webpackChunkName: "Master" */ '@root/Application/d.Extranet/2_School/Phone/LoginAndMaster/Master/Master'));
    },
    TeacherStartPage: function () {
        // return loadable(() => import(/* webpackChunkName: "TeacherStartPage" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherStartPage/TeacherStartPage'));
        return loadable(() => import(/* webpackChunkName: "ProgressReport" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/ProgressReport/ProgressReport'));

    },    
    ClassAndPupil: function () {
        return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TeacherNews: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherNews" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherNews/TeacherNews'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    AddContactPopup: function () {
        return loadable(() => import(/* webpackChunkName: "AddContactPopup" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherNews/TeacherNewsPopup/TeacherAddContactPopup/AddContactPopup'));
    },
    TeacherShareNewsPopup: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherShareNewsPopup" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherNews/TeacherNewsPopup/TeacherShareNewsPopup/TeacherShareNewsPopup'));
        // return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    TeacherDocument: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherDocument" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherDocument/TeacherDocument'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    CreateFolderPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "CreateFolderPopUp" */ "@root/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherDocument/TeacherDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp"));
    },
    ShareFolderPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ShareFolderPopup" */ "@root/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherDocument/TeacherDocumentPopUp/ShareFolderPopup/ShareFolderPopup"));
    },
    CopyFolderPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "CopyFolderPopUp" */ "@root/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherDocument/TeacherDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp"));
    },
    TeacherFileUploadPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherFileUploadPopUp" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherDocument/TeacherDocumentPopUp/UploadFilePopup/TeacherFileUploadPopUp'));
        //return loadable(() => import('@root/Framework/Controls/EmptyComponent/EmptyComponent'));
    },
    Contact: function () {
        return loadable(() => import(/* webpackChunkName: "Contact" */ '@root/Application/d.Extranet/5_Shared/Phone/Modules/Contact/Contact'));
    },
    Notes: function () {
        return loadable(() => import(/* webpackChunkName: "Notes" */ '@root/Application/d.Extranet/2_School/Phone/Modules/Notes/Notes'));
    },
    PupilLogin: function () {
        return loadable(() => import(/* webpackChunkName: "PupilLogin" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/PupilLogin/PupilLogin'));
    },
    TestLogins: function () {
        return loadable(() => import(/* webpackChunkName: "TestLogins" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/TestLogins/TestLogins'));
    },
    TestResults: function () {
        return loadable(() => import(/* webpackChunkName: "TestResults" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/TestResults/TestResults'));
    },
    Interpretation: function () {
        return loadable(() => import(/* webpackChunkName: "Interpretation" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/Interpretation/Interpretation'));
    },
    LearningTestSystem: function () {
        return loadable(() => import(/* webpackChunkName: "LearningTestSystem" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/LearningTestSystem/LearningTestSystem'));
    },
    LearningTestTeacher: function () {
        return loadable(() => import(/* webpackChunkName: "LearningTestTeacher" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/LearningTestTeacher/LearningTestTeacher'));
    },
    LearningJournal: function () {
        return loadable(() => import(/* webpackChunkName: "LearningJournal" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/LearningJournal/LearningJournal'));
    },
    LearningJournalArchive: function () {
        return loadable(() => import(/* webpackChunkName: "LearningJournalArchive" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/LearningJournalArchive/LearningJournalArchive'));   
    },
    ClassAndPupil: function () {
        return loadable(() => import(/* webpackChunkName: "ClassAndPupil" */ '@root/Application/d.Extranet/2_School/Phone/Modules/ClassAndPupil/ClassAndPupil'));
    },
    TeacherProfile: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherProfile" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherProfile/TeacherProfile'));
    },
    CoTeacherAndSubjectExpert: function () {
        return loadable(() => import(/* webpackChunkName: "CoTeacherAndSubjectExpert" */ "@root/Application/d.Extranet/3_Teacher/Phone/Modules/CoTeacherAndSubjectExpert/CoTeacherAndSubjectExpert"));
    },
    AssignClassType: function () {
        return loadable(() => import(/* webpackChunkName: "AssignClassType" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/AssignClassType/AssignClassType'));
    },
    ProgressReport: function () {
        return loadable(() => import(/* webpackChunkName: "ProgressReport" */ '@root/Application/d.Extranet/3_Teacher/Phone/Modules/ProgressReport/ProgressReport'));
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






