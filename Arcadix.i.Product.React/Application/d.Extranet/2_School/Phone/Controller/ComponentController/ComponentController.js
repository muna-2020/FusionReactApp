import loadable from '@loadable/component';

//Framework related imports
import * as FrameworkController from '@root/Framework/Controller/FrameworkController/FrameworkController';

export const objComponents = {
    Main: function () {
        return loadable(() => import(/* webpackChunkName: "Main" */ '@root/Core/2_Main/Main'));
    },
    Login: function () {
        return loadable(() => import(/* webpackChunkName: "Login" */ '@root/Application/d.Extranet/2_School/Phone/LoginAndMaster/Login/Login'));
    },
    Master: function () {
        return loadable(() => import(/* webpackChunkName: "Master" */ '@root/Application/d.Extranet/2_School/Phone/LoginAndMaster/Master/Master'));
    },
    SchoolStartPage: function () {
        return loadable(() => import(/* webpackChunkName: "SchoolStartPage" */ '@root/Application/d.Extranet/2_School/Phone/Modules/SchoolStartPage/SchoolStartPage'));
    },
    Teacher: function () {
        return loadable(() => import(/* webpackChunkName: "Teacher" */ '@root/Application/d.Extranet/2_School/Phone/Modules/Teacher/Teacher'));
    },
    ImportData: function () {
        return loadable(() => import(/* webpackChunkName: "ImportData" */ '@root/Application/d.Extranet/2_School/Phone/Modules/Teacher/ImportData/ImportData'));
    },
    TeacherAddEditPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ImportData" */ '@root/Application/d.Extranet/2_School/Phone/Modules/Teacher/TeacherAddEditPopup/TeacherAddEditPopup'));
    },
    TeacherLogin: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherLogin" */ '@root/Application/d.Extranet/2_School/Phone/Modules/TeacherLogin/TeacherLogin'));
    },
    SchoolNews: function () {
        return loadable(() => import(/* webpackChunkName: "SchoolNews" */ '@root/Application/d.Extranet/2_School/Phone/Modules/SchoolNews/SchoolNews'));
    },
    Notes: function () {
        return loadable(() => import(/* webpackChunkName: "Notes" */ '@root/Application/d.Extranet/2_School/Phone/Modules/Notes/Notes'));
    },
    Contact: function () {
        return loadable(() => import(/* webpackChunkName: "Contact" */ '@root/Application/d.Extranet/5_Shared/Phone/Modules/Contact/Contact'));
    },
    TimeTableSettings: function () {
        return loadable(() => import(/* webpackChunkName: "TimeTableSettings" */ '@root/Application/d.Extranet/2_School/Phone/Modules/TimeTableSettings/TimeTableSettings'));
    },
    Licenses: function () {
        return loadable(() => import(/* webpackChunkName: "Licenses" */ '@root/Application/d.Extranet/2_School/Phone/Modules/Licenses/Licenses'));
    },
    SchoolProfile: function () {
        return loadable(() => import(/* webpackChunkName: "SchoolProfile" */ '@root/Application/d.Extranet/2_School/Phone/Modules/SchoolProfile/SchoolProfile'));
    },
    SchoolDocument: function () {
        return loadable(() => import(/* webpackChunkName: "SchoolDocument" */ '@root/Application/d.Extranet/2_School/Phone/Modules/SchoolDocument/SchoolDocument'));
    },
    CreateFolderPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "CreateFolderPopUp" */ '@root/Application/d.Extranet/2_School/Phone/Modules/SchoolDocument/SchoolDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp'));
    },
    UploadFilePopup: function () {
        return loadable(() => import(/* webpackChunkName: "UploadFilePopup" */ '@root/Application/d.Extranet/2_School/Phone/Modules/SchoolDocument/SchoolDocumentPopUp/UploadFilePopup/UploadFilePopup'));
    },
    CopyFolderPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "CopyFolderPopUp" */ '@root/Application/d.Extranet/2_School/Phone/Modules/SchoolDocument/SchoolDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp'))
    },
    Billing: function () {
        return loadable(() => import(/* webpackChunkName: "Billing" */ '@root/Application/d.Extranet/2_School/Phone/Modules/Billing/Billing'));
    },
    SchoolDataComparison: function () {
        return loadable(() => import(/* webpackChunkName: "SchoolDataComparison" */ '@root/Application/d.Extranet/2_School/Phone/Modules/SchoolDataComparison/SchoolDataComparison'));
    },
    SchoolDataComparisonArchive: function () {
        return loadable(() => import(/* webpackChunkName: "SchoolDataComparisonArchive" */ '@root/Application/d.Extranet/2_School/Phone/Modules/SchoolDataComparisonArchive/SchoolDataComparisonArchive'));
    },
    ClassAndPupil: function () {
        return loadable(() => import(/* webpackChunkName: "ClassAndPupil" */ '@root/Application/d.Extranet/2_School/Phone/Modules/ClassAndPupil/ClassAndPupil'));
    },
    ImportPupilPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "ImportPupilPopUp" */ '@root/Application/d.Extranet/2_School/Phone/Modules/ClassAndPupil/Class/ImportPupilPopUp/ImportPupilPopUp'));
    },
    MovePupilPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "MovePupilPopUp" */ '@root/Application/d.Extranet/2_School/Phone/Modules/ClassAndPupil/Pupil/MovePupilPopUp/MovePupilPopUp'));
    }
}


const ComponentController = {
    GetComponent: function (strUrlParam) {
        console.log("strUrlParam", strUrlParam);
        var strPageName = strUrlParam.split('?')[0];
        if (objComponents[strPageName] != null) {
            try {
                let objComponent = objComponents[strPageName.split('?')[0]]();
                return objComponent;
            }
            catch (error) {
                Logger.LogError("Module Import Error", error);
            }
        }
        else {
            Logger.LogError("notfound:", strUrlParam);
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