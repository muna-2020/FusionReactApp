//Loadable import
import loadable from '@loadable/component';

export const objComponents = { 
    Popup: function () {
        return loadable(() => import(/* webpackChunkName: "Popup" */ '@root/Framework/Blocks/Popup/Popup'));
    },
    Animation: function () {
        return loadable(() => import(/* webpackChunkName: "Animation" */ '@root/Framework/Controls/Animation/Animation'));
    },
    Form: function () {
        return loadable(() => import(/* webpackChunkName: "Form" */ '@root/Framework/Blocks/Form/Form'));
    },
    ContextMenu: function () {
        return loadable(() => import(/* webpackChunkName: "ContextMenu" */ '@root/Framework/Controls/ContextMenu_New/ContextMenu'));
    },
    DatePicker: function () {
        return loadable(() => import(/* webpackChunkName: "DatePicker" */ '@root/Framework/Controls/DatePicker/DatePicker'));
    },
    //Dragdrop
    //DragZone: function () {
    //    return loadable(() => import(/* webpackChunkName: "DragZone" */ '@root/Framework/Controls/DragDrop/DragZone/DragZone'));
    //},
    //Dragdrop: function () {
    //    return loadable(() => import(/* webpackChunkName: "Dragdrop" */ '@root/Framework/Controls/Dragdrop/Dragdrop'));
    //},
    //Dropdowns
    AutoCompleteDropdown: function () {
        return loadable(() => import(/* webpackChunkName: "AutoCompleteDropdown" */ '@root/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown'));
    },   
    Dropdown: function () {
        return loadable(() => import(/* webpackChunkName: "Dropdown" */ '@root/Framework/Controls/Dropdowns/Dropdown/Dropdown'));
    },
    HierarchicalDropdown: function () {
        return loadable(() => import(/* webpackChunkName: "HierarchicalDropdown" */ '@root/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown'));
    },
    AutoCompleteDropdown: function () {
        return loadable(() => import(/* webpackChunkName: "AutoCompleteDropdown" */ '@root/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown'));
    },
    MultiSelectDropdown: function () {
        return loadable(() => import(/* webpackChunkName: "MultiSelectDropdown" */ '@root/Framework/Controls/Dropdowns/MultiSelectDropdown/MultiSelectDropdown'));
    },
    FillHeight: function () {
        return loadable(() => import(/* webpackChunkName: "FillHeight" */ '@root/Framework/Controls/FillHeight/FillHeight'));
    },
    MultiLanguageInputs: function () {
        return loadable(() => import(/* webpackChunkName: "MultiLanguageInputs" */ '@root/Framework/Controls/MultiLanguageControls/MultiLanguageInputs/MultiLanguageInputs'));
    },
    OfficeRibbon: function () {
        return loadable(() => import(/* webpackChunkName: "OfficeRibbon" */ '@root/Framework/Controls/OfficeRibbon/OfficeRibbon'));
    },
    Tree: function () {
        return loadable(() => import(/* webpackChunkName: "Tree" */ '@root/Framework/Controls/Tree/Tree'));
    },   
    //Grid Component
    Grid: function () {
        return loadable(() => import(/* webpackChunkName: "Grid" */ '@root/Framework/Blocks/Grid/Grid'));
    },
    ProgressBar: function () {
        return loadable(() => import(/* webpackChunkName: "ProgressBar" */ '@root/Framework/Controls/ProgressBar/ProgressBar'));
    },
    Button: function () {
        return loadable(() => import(/* webpackChunkName: "Button" */ '@root/Framework/Controls/Button/Button'));
    },
    Charts: function () {
        return loadable(() => import(/* webpackChunkName: "Charts" */ '@root/Framework/Controls/Charts/Charts'));
    },
    Image: function () {
        return loadable(() => import(/* webpackChunkName: "Image" */ '@root/Framework/Controls/Image/Image'));
    }
};

const FrameworkController = {
    GetComponent: function (strComponentName) {
        let objComponent = objComponents[strComponentName];
        if (objComponent !== undefined && objComponent !== null) {
            try {
                return objComponent();
            }
            catch (error) {
                Logger.LogError("Module", strComponentName);
                Logger.LogError("Module Import Error", error);
                console.trace("Import Error");
            }
        }
        else {
            return undefined;
        }
    },
    CheckComponent: function (strComponentName) {
        if (objComponents[strComponentName] && objComponents[strComponentName] !== null) {
            return true;
        }
        else {
            return false;
        }
    }
};

export default FrameworkController;






