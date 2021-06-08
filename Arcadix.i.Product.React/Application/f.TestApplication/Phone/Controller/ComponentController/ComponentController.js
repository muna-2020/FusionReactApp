//ComponentController imports.
import ComponentControllerPC from "@root/Application/f.TestApplication/PC/Controller/ComponentController/ComponentController";

//LayoutController
import LayoutController from '@root/Application/f.TestApplication/Phone/Layout/LayoutController';

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
            return ComponentControllerPC.GetComponent(strComponentName);
        }
    },

    /**
     * @name GetLayoutComponent
     * @summary Fetch the layout
     * @param {any} strLayout
     * @param {any} strPage
     */
    GetLayoutComponent: function (strLayout, strPage) {
        if (strLayout) {
            return LayoutController.GetLayout(strLayout, strPage);
        }
    },

    
    GetFrameworkComponent: function (strFrameworkComponentName) {
        if (strFrameworkComponentName) {
            return ComponentControllerPC.GetFrameworkComponent(strFrameworkComponentName);
        }
    }
};
export default ComponentController;