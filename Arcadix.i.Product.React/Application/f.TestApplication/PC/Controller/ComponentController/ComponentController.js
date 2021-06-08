//Loadable component
import loadable from '@loadable/component';

//LayoutController
import LayoutController from '@root/Application/f.TestApplication/PC/Layout/LayoutController';

//Framework related imports
import * as FrameworkController from '@root/Framework/Controller/FrameworkController/FrameworkController';

/**
 * @name components
 * @summary Contains the loadable for Component.
 */
export const objComponents = {
    TestApplicationMaster: function () {
        return loadable(() => import(/* webpackChunkName: "TestApplicationMaster" */ '@root/Application/f.TestApplication/PC/Modules/1_Master/TestApplicationMaster'));
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
    CMSPageContent_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSPageContent_TestApplication" */ '@root/Application/e.Editor/PC/Modules/4_CMSPageContent/CMSPageContent_TestApplication/CMSPageContent_TestApplication'));
    },
    WikiInfoPopup: function () {
        return loadable(() => import(/* webpackChunkName: "WikiInfoPopup" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_TestApplication/WikiInfoPopup/WikiInfoPopup'));
    },
    TestApplicationLogin: function () {
        return loadable(() => import(/* webpackChunkName: "TestApplicationLogin" */ '@root/Application/f.TestApplication/PC/Modules/3_Login/TestApplicationLogin'));
    },
    TestApplicationPreLogin: function () {
        return loadable(() => import(/* webpackChunkName: "TestApplicationPreLogin" */ '@root/Application/f.TestApplication/PC/Modules/2_PreLogin/TestApplicationPreLogin'));
    },
    TestApplicationIntroduction: function () {
        return loadable(() => import(/* webpackChunkName: "TestApplicationIntroduction" */ '@root/Application/f.TestApplication/PC/Modules/4_Introduction/TestApplicationIntroduction'));
    },
    TestApplicationTask: function () {
        return loadable(() => import(/* webpackChunkName: "TestApplicationTask" */ '@root/Application/f.TestApplication/PC/Modules/5_Task/TestApplicationTask'));
    },
    TaskContentPreview: function () {
        return loadable(() => import(/* webpackChunkName: "TaskContentPreview" */ '@root/Application/f.TestApplication/PC/Modules/8_Preview/TaskContentPreviewController'));
    },
    TestApplicationCourse: function () {
        return loadable(() => import(/* webpackChunkName: "TestApplicationCourse" */ '@root/Application/f.TestApplication/PC/Modules/7_Course/TestApplicationCourse'));
    },
    TestApplicationResult: function () {
        return loadable(() => import(/* webpackChunkName: "TestApplicationResult" */ '@root/Application/f.TestApplication/PC/Modules/6_Result/TestApplicationResult'));
    },
    GroupEndConfirmationPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "GroupEndConfirmationPopUp" */ '@root/Application/f.TestApplication/PC/Modules/5_Task/PopUp/GroupEndConfirmationPopUp/GroupEndConfirmationPopUp'));
    },
    GroupTimeCountDownDisplay: function () {
        return loadable(() => import(/* webpackChunkName: "GroupTimeCountDownDisplay" */ '@root/Application/f.TestApplication/PC/Modules/5_Task/ProgressBar/GroupTimeCountDownDisplay/GroupTimeCountDownDisplay'));
    },
    MandatoryTaskPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "MandatoryTaskPopUp" */ '@root/Application/f.TestApplication/PC/Modules/5_Task/PopUp/MandatoryTaskPopUp/MandatoryTaskPopUp'));
    },
    TestEndConfirmationPopUp: function () {
        return loadable(() => import(/* webpackChunkName: "TestEndConfirmationPopUp" */ '@root/Application/f.TestApplication/PC/Modules/5_Task/PopUp/TestEndConfirmationPopUp/TestEndConfirmationPopUp'));
    },
    TestApplicationContent: function () {
        return loadable(() => import(/* webpackChunkName: "TestApplicationContent" */ '@root/Application/f.TestApplication/PC/Modules/5_Task/Content/Content'));
    },
    ResultPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ResultPopup" */ '@root/Application/f.TestApplication/PC/Modules/5_Task/PopUp/ResultPopup/ResultPopup'));
    },
    ProgressBarWithTaskCount: function () {
        return loadable(() => import(/* webpackChunkName: "ProgressBarWithTaskCount" */ '@root/Application/f.TestApplication/PC/Modules/5_Task/ProgressBar/ProgressBarWithTaskCount/ProgressBarWithTaskCount'));
    },
    ProgressBarWithTaskPercentage: function () {
        return loadable(() => import(/* webpackChunkName: "ProgressBarWithTaskPercentage" */ '@root/Application/f.TestApplication/PC/Modules/5_Task/ProgressBar/ProgressBarWithTaskPercentage/ProgressBarWithTaskPercentage'));
    },
    LinkInfoPopup: function () {
        return loadable(() => import(/* webpackChunkName: "LinkInfoPopup" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSLink/CMSLink_TestApplication/LinkInfoPopup/LinkInfoPopup'));
    },
    CMSImage_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSImage_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_TestApplication/CMSImage_TestApplication'));
    },
    CMSVideo_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSVideo_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_TestApplication/CMSVideo_TestApplication'));
    },
    CMSAudio_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSAudio_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_TestApplication/CMSAudio_TestApplication'));
    },
    Calculator: function () {
        return loadable(() => import(/* webpackChunkName: "Calculator" */ '@root/Framework/Controls/Calculator/Calculator'));
    },
    Scientific: function () {
        return loadable(() => import(/* webpackChunkName: "Scientific" */ '@root/Framework/Controls/Calculator/Layout/Scientific/Scientific'));
    },
    Standard: function () {
        return loadable(() => import(/* webpackChunkName: "Standard" */ '@root/Framework/Controls/Calculator/Layout/Standard/Standard'));
    }
};

/**
 * @name ComponentController
 * @summary Contains the 'GetComponent' method for getting the losable component.
 */
const ComponentController = {
    /**
     * @name GetComponent
     * @param {string} strComponentName ComponentName
     * @summary Fetches the loadable component.
     * @returns {component} loadable component
     */
    GetComponent: function (strComponentName) {
        if (strComponentName) {
            let blnIsComponentFound = false;
            if (objComponents[strComponentName] && objComponents[strComponentName] !== null) {
                blnIsComponentFound = true;
            }
            else {
                strComponentName = "TestApplication" + strComponentName.split('?')[0];
                if (objComponents[strComponentName] && objComponents[strComponentName] !== null) {
                    blnIsComponentFound = true;
                }
            }
            if (blnIsComponentFound) {
                return objComponents[strComponentName]();
            }
            else {
                Logger.LogError("notfound:", strComponentName);
                return undefined;
            }
        }
        else {
            return undefined;
        }
    },

    /**
     * @name GetLayoutComponent
     * @summary Fetch the layout
     * @param {any} strLayout
     * @param {any} strPage
     */
    GetLayoutComponent: function (strLayout,strPage) {
        if (strLayout) {
            return LayoutController.GetLayout(strLayout, strPage);
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
