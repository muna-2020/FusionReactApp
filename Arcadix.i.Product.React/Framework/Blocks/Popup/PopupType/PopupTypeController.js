import loadable from '@loadable/component';

export const objComponents = {
    ConfirmationPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ConfirmationPopup" */ '@root/Framework/Blocks/Popup/PopupType/ConfirmationPopup/ConfirmationPopup'));
    }, 
    ErrorPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ErrorPopup" */ '@root/Framework/Blocks/Popup/PopupType/ErrorPopup/ErrorPopup'));
    },
    ProgressBarPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ProgressBarPopup" */ '@root/Framework/Blocks/Popup/PopupType/ProgressBarPopup/ProgressBarPopup'));
    },
    TabbedPopup: function () {
        return loadable(() => import(/* webpackChunkName: "TabbedPopup" */ '@root/Framework/Blocks/Popup/PopupType/TabbedPopup/TabbedPopup'));
    },
    ComponentPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ComponentPopup" */ '@root/Framework/Blocks/Popup/PopupType/ComponentPopup/ComponentPopup'));
    }
};

const PopupTypeController = {
    GetComponent: function (strComponentName) {
        if (objComponents[strComponentName] != null) {
            try {
                let objComponent = objComponents[strComponentName]();
                return objComponent;
            }
            catch (error) {
                Logger.LogError("Module Import Error", error);
            }
        }
        else {
            Logger.LogError("notfound:", strComponentName);
            return undefined;
        }
    }
};

export default PopupTypeController;