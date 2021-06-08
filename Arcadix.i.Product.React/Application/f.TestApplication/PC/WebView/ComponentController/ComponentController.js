import loadable from '@loadable/component';

//Element Component Controller.
import ElementComponentController from "@root/Application/e.Editor/PC/Controller/ElementController/TestApplication/ElementController_TestApplication";

export const objComponents = {
    CMSPageContent_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSPageContent_TestApplication" */ '@root/Application/e.Editor/PC/Modules/4_CMSPageContent/CMSPageContent_TestApplication/CMSPageContent_TestApplication'));
    },
    CMSContainer_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSContainer_TestApplication" */ '@root/Application/e.Editor/PC/Modules/5_CMSContainer/CMSContainer_TestApplication/CMSContainer_TestApplication'));
    },
};

const ComponentController = {
    GetComponent: function (strComponentName) {
        return objComponents[strComponentName]();
    },
    GetElement: function (strComponentName) {
        return ElementComponentController.GetComponent(strComponentName);
    },
    CheckComponent: function (strComponentName) {
        return objComponents[strComponentName];
    }
};

export default ComponentController;






