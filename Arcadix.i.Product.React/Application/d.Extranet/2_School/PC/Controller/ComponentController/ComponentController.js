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
    ViewWaterFallChatPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ViewWaterFallChatPopup" */ '@root/Core/7_DevelopmentSideBar/PerformanceView/Popup/ViewWaterFallChatPopup/ViewWaterFallChatPopup'));
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
    Teacher: function () {
            return loadable(() => import(/* webpackChunkName: "Teacher" */ '@root/Application/d.Extranet/2_School/PC/Modules/Teacher/Teacher'));
    },
    MovePupilPopUp: function () {
            return loadable(() => import(/* webpackChunkName: "MovePupilPopUp" */ '@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/MovePupilPopUp/MovePupilPopUp'));
    },
    ImportData: function () {
            return loadable(() => import(/* webpackChunkName: "ImportData" */ '@root/Application/d.Extranet/2_School/PC/Modules/Teacher/ImportData/ImportData'));
    },
    TeacherLogin: function () {
            return loadable(() => import(/* webpackChunkName: "TeacherLogin" */ '@root/Application/d.Extranet/2_School/PC/Modules/TeacherLogin/TeacherLogin'));
    },
    ClassAndPupil: function () {
            return loadable(() => import(/* webpackChunkName: "ClassAndPupil" */ '@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/ClassAndPupil'));
    },
    ImportPupilPopUp: function () {
            return loadable(() => import(/* webpackChunkName: "ImportPupilPopUp" */ '@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/ImportPupilPopUp'));
    },
    TimeTableSettings: function () {
            return loadable(() => import(/* webpackChunkName: "TimeTableSettings" */ '@root/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableSettings'));
    },
    Contact: function () {
            return loadable(() => import(/* webpackChunkName: "Contact" */ '@root/Application/d.Extranet/5_Shared/PC/Modules/Contact/Contact'));
    },
    Notes: function () {
            return loadable(() => import(/* webpackChunkName: "Notes" */ '@root/Application/d.Extranet/2_School/PC/Modules/Notes/Notes'));
    },
    SchoolDataComparisonPrintToPdf: function () {
            return loadable(() => import(/* webpackChunkName: "SchoolDataComparisonPrintToPdf" */ '@root/Application/d.Extranet/2_School/PC/Modules/SchoolDataComparisonPrintToPdf/SchoolDataComparisonPrintToPdf'));
    },
    SchoolDataComparison: function () {
            return loadable(() => import(/* webpackChunkName: "SchoolDataComparison" */ '@root/Application/d.Extranet/2_School/PC/Modules/SchoolDataComparison/SchoolDataComparison'));
    },
    SchoolProfile: function () {
            return loadable(() => import(/* webpackChunkName: "SchoolProfile" */ '@root/Application/d.Extranet/2_School/PC/Modules/SchoolProfile/SchoolProfile'));
    },
    SchoolNews: function () {
            return loadable(() => import(/* webpackChunkName: "SchoolNews" */ '@root/Application/d.Extranet/2_School/PC/Modules/SchoolNews/SchoolNews'));
    },
    SchoolDocument: function () {
            return loadable(() => import(/* webpackChunkName: "SchoolDocument" */ '@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocument'));
    },
    CreateFolderPopUp: function () {
            return loadable(() => import(/* webpackChunkName: "CreateFolderPopUp" */ '@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp'));
    },
    ProgressBar: function () {
            return loadable(() => import(/* webpackChunkName: "ProgressBar" */ '@root/Framework/Controls/ProgressBar/ProgressBar'));
    },
    UploadFilePopup: function () {
            return loadable(() => import(/* webpackChunkName: "UploadFilePopup" */ '@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/UploadFilePopup/UploadFilePopup'));
    },
    CopyFolderPopUp: function () {
            return loadable(() => import(/* webpackChunkName: "CopyFolderPopUp" */ '@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp'))
    },
    SchoolRegistration: function () {
            return loadable(() => import(/* webpackChunkName: "SchoolRegistration" */ '@root/Application/d.Extranet/2_School/PC/Modules/SchoolRegistration/SchoolRegistration'));
    },
    Billing: function () {
            return loadable(() => import(/* webpackChunkName: "Billing" */ '@root/Application/d.Extranet/2_School/PC/Modules/Billing/Billing'));
    },
    BillingPrintToPDF: function () {
        return loadable(() => import(/* webpackChunkName: "Billing" */ '@root/Application/d.Extranet/2_School/PC/Modules/BillingPrintToPDF/BillingPrintToPDF'));
    },
    Licenses: function () {
            return loadable(() => import(/* webpackChunkName: "Licenses" */ '@root/Application/d.Extranet/2_School/PC/Modules/Licenses/Licenses'));
    },
    SchoolDataComparisonArchive: function () {
            return loadable(() => import(/* webpackChunkName: "SchoolDataComparisonArchive" */ '@root/Application/d.Extranet/2_School/PC/Modules/SchoolDataComparisonArchive/SchoolDataComparisonArchive'));
    }
};

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