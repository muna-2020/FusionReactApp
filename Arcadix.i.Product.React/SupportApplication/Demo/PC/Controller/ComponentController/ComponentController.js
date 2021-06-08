import loadable from '@loadable/component';
import * as ComponentController_Client from '@root/../Arcadix.i.Product.React.Client/SupportApplication/Demo/PC/Controller/ComponentController/ComponentController.js';

export const objComponents = {
    Main: function () {
        return loadable(() => import(/* webpackChunkName: "Main" */ '@root/Core/2_Main/Main'));
    },
    Login: function () {
        return loadable(() => import(/* webpackChunkName: "Login" */ '@root/Application/c.ProductManagement/PC/LoginAndMaster/Login/Login'));
    },
    Master: function () {
        return loadable(() => import(/* webpackChunkName: "Master" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Master/Master'));
    },
    NavigationCommonPage: function () {
        return loadable(() => import(/* webpackChunkName: "NavigationCommonPage" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Navigation/NavigationCommonPage/NavigationCommonPage'));
    },
    SignalRDemo: function () {
        return loadable(() => import(/* webpackChunkName: "SignalRDemo" */ '@root/SupportApplication/Demo/PC/Modules/SignalRDemo/SignalRDemo'));
    },
    ExternalAPITest: function () {
        return loadable(() => import(/* webpackChunkName: "ExternalAPITest" */ '@root/SupportApplication/Demo/PC/Modules/ExternalAPITest/ExternalAPITest'));
    },
    DocumentViewDemo: function () {
        return loadable(() => import(/* webpackChunkName: "DocumentViewDemo" */ '@root/SupportApplication/Demo/PC/Modules/DocumentViewDemo/DocumentViewDemo'));
    },
    UseCaseDiagramDemo: function () {
        return loadable(() => import(/* webpackChunkName: "UseCaseDiagramDemo" */ '@root/SupportApplication/Demo/PC/Modules/UseCaseDiagramDemo/UseCaseDiagramDemo'));
    },
    ServerSideCall: function () {
        return loadable(() => import(/* webpackChunkName: "ExternalAPITest" */ '@root/SupportApplication/Demo/PC/Modules/ExternalAPITest/ServerSideCall/ServerSideCall'));
    },
    SourceCode: function () {
        return loadable(() => import(/* webpackChunkName: "ExternalAPITest" */ '@root/SupportApplication/Demo/PC/Modules/ExternalAPITest/SourceCode/SourceCode'));
    },
    Steps: function () {
        return loadable(() => import(/* webpackChunkName: "ExternalAPITest" */ '@root/SupportApplication/Demo/PC/Modules/ExternalAPITest/Steps/Steps'));
    },
    //Framework/Blocks
    Grid_DisplayGrid_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Grid_DisplayGrid_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Blocks/Grid_Sample/Grid_DisplayGrid_Sample/Grid_DisplayGrid_Sample'));
    },
    Grid_EditableGrid_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Grid_EditableGrid_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Blocks/Grid_Sample/Grid_EditableGrid_Sample/Grid_EditableGrid_Sample'));
    },
    Form_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "FormGenerator_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Blocks/Form_Sample/Form_Sample'));
    },
    Popup_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Popup_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Blocks/Popup_Sample/Popup_Sample'));
    },
    //Framework/Controls
    Animation_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Animation_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/Animation_Sample/Animation_Sample/Animation_Sample'));
    },
    Animation_Sample_WithoutImage: function () {
        return loadable(() => import(/* webpackChunkName: "Animation_Sample_WithoutImage" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/Animation_Sample/Animation_Sample_WithoutImage/Animation_Sample_WithoutImage'));
    },
    Button_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Button_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/Button_Sample/Button_Sample'));
    },
    ContextMenu_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "ContextMenu_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/ContextMenu_Sample/ContextMenu_Sample'));
    },
    AutoCompleteDropdown_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "AutoCompleteDropdown_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/AutoCompleteDropdown_Sample/AutoCompleteDropdown_Sample/AutoCompleteDropdown_Sample'));
    },
    AutoCompleteDropdown_MultiLanguage_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "AutoCompleteDropdown_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/AutoCompleteDropdown_Sample/AutoCompleteDropdown_MultiLanguage_Sample/AutoCompleteDropdown_MultiLanguage_Sample'));
    },
    DropDown_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "DropDown_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/DropDown_Sample/DropDown_Sample/DropDown_Sample'));
    },
    DropDown_MultiLanguage_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "DropDown_MultiLanguage_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/DropDown_Sample/DropDown_MultiLanguage_Sample/DropDown_MultiLanguage_Sample'));
    },
    DropDown_Disabled_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "DropDown_Disabled_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/DropDown_Sample/DropDown_Disabled_Sample/DropDown_Disabled_Sample'));
    },
    DropDown_DefaultText_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "DropDown_DefaultText_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/DropDown_Sample/DropDown_DefaultText_Sample/DropDown_DefaultText_Sample'));
    },
    DragDrop_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "DragDrop_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/Dragdrop_Sample/DragDrop_Sample'));
    },
    HierarchialDropDown_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "HierarchialDropDown_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/HierarchialDropDown_Sample/HierarchicalDropdown_Sample/HierarchialDropDown_Sample'));
    },
    HierarchialDropDown_MultiLanguage_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "HierarchialDropDown_MultiLanguage_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/HierarchialDropDown_Sample/HierarchicalDropdown_MultiLanguage_Sample/HierarchicalDropdown_MultiLanguage_Sample'));
    },
     HierarchialDropDown_Disabled_Sample: function () {
         return loadable(() => import(/* webpackChunkName: "HierarchialDropDown_Disabled_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/HierarchialDropDown_Sample/HierarchicalDropdown_Disabled_Sample/HierarchialDropDown_Disabled_Sample'));
    },
     HierarchialDropDown_DefaultText_Sample: function () {
         return loadable(() => import(/* webpackChunkName: "HierarchialDropDownn_DefaultText_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/HierarchialDropDown_Sample/HierarchicalDropdown_DefaultText_Sample/HierarchialDropDown_DefaultText_Sample'));
    },
    FileUpload_Sample_Single: function () {
        return loadable(() => import(/* webpackChunkName: "FileUpload_Sample_Single" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/FileUpload_Sample/FileUpload_Sample_SingleFile/FileUpload_Sample_SingleFile'));
    },
    FileUpload_Sample_Multiple: function () {
        return loadable(() => import(/* webpackChunkName: "FileUpload_Sample_Multiple" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/FileUpload_Sample/FileUploadSample_MultipleFile/FileUpload_Sample_MultipleFile'));
    },
    FillHeight_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "FillHeight_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/FillHeight_Sample/FillHeight_Sample'));
    },
    MultiSelectDropDown_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "MultiSelectDropDown_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/MultiSelectDropdown_Sample/MultiSelectDropdown_Sample/MultiSelectDropdown_Sample'));
    },
    MultiSelectDropDown_MultiLanguage_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "MultiSelectDropDown_MultiLanguage_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/MultiSelectDropdown_Sample/MultiSelectDropdown_MultiLangauage_Sample/MultiSelectDropdown_MultiLanguage_Sample'));
    },
    MultiSelectDropDown_UnselectedOption_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "MultiSelectDropDown_UnselectedOption_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/MultiSelectDropdown_Sample/MultiSelectDropdown_UnselectedOption_Sample/MultiSelectDropdown_UnselectedOption_Sample'));
    },
    MultiSelectDropDown_Disabled_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "MultiSelectDropDown_Disabled_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/MultiSelectDropdown_Sample/MultiSelectDropdown_Disabled_Sample/MultiSelectDropdown_Disabled_Sample'));
    },
    MultiSelectDropDown_DefaultText_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "MultiSelectDropDown_DefaultText_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/DropDown/MultiSelectDropdown_Sample/MutiSelectDropdown_DefaultText_Sample/MultiSelectDropdown_DefaultText_Sample'));
    },
    OfficeRibbon_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "OfficeRibbon_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/OfficeRibbon_Sample/OfficeRibbon_Sample'));
    },
    Tab_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Tab_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/Tab_Sample/Tab_Sample'));
    },
    ToolBar_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "ToolBar_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/ToolBar_Sample/ToolBar_Sample'));
    },
    Tree_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Tree_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/Tree_Sample/Tree_Sample'));
    },

    MultiLanguageInputs_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "MultiLanguageInputs_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/MultiLanguageControls/MultiLanguageInputs_Sample/MultiLanguageInputs_Sample'));
    },

    ProgressBar_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "ProgressBar_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Controls/ProgressBar_Sample/ProgressBar_Sample'));
    },
    //RichTextEditor_Sample: function () {
    //    return loadable(() => import(/* webpackChunkName: "ProgressBar_Sample" */ '@root/SupportApplication/Demo/PC/Modules/Framework/Blocks/RichTextEditor_Sample/RichTextEditor_Sample'));
    //},
    //ModuleDevelopment
    Step1: function () {
        return loadable(() => import(/* webpackChunkName: "FillHeight_Sample" */ '@root/SupportApplication/Demo/PC/Modules/ModuleDevelopment/Step1/Step1'));
    },
    Step2: function () {
        return loadable(() => import(/* webpackChunkName: "FillHeight_Sample" */ '@root/SupportApplication/Demo/PC/Modules/ModuleDevelopment/Step2/Step2'));
    },
    Step3: function () {
        return loadable(() => import(/* webpackChunkName: "FillHeight_Sample" */ '@root/SupportApplication/Demo/PC/Modules/ModuleDevelopment/Step3/Step3'));
    },
    Step4: function () {
        return loadable(() => import(/* webpackChunkName: "FillHeight_Sample" */ '@root/SupportApplication/Demo/PC/Modules/ModuleDevelopment/Step4/Step4'));
    },
    Step5: function () {
        return loadable(() => import(/* webpackChunkName: "FillHeight_Sample" */ '@root/SupportApplication/Demo/PC/Modules/ModuleDevelopment/Step5/Step5'));
    },
    Step6: function () {
        return loadable(() => import(/* webpackChunkName: "FillHeight_Sample" */ '@root/SupportApplication/Demo/PC/Modules/ModuleDevelopment/Step6/Step6'));
    },
    Step7: function () {
        return loadable(() => import(/* webpackChunkName: "FillHeight_Sample" */ '@root/SupportApplication/Demo/PC/Modules/ModuleDevelopment/Step7/Step7'));
    },
    ValidationSample: function () {
        return loadable(() => import(/* webpackChunkName: "FillHeight_Sample" */ '@root/SupportApplication/Demo/PC/Modules/ModuleDevelopment/Validation/ValidationSample'));
    }  
};

const ComponentController = {
    GetComponent: function (strUrlParam) {
        console.log("strUrlParam", strUrlParam);
        var strPageName = strUrlParam.split('?')[0];

        let objJComponent = objComponents; 

        //if (JConfiguration.MainClientIdentifier == "Cockpit") {
        //    objJComponent = ComponentController_Client.objComponents;
        //    strPageName += "_Lernlupe";
        //}

        if (objJComponent[strPageName] !== null) {
            try {
                let objComponent = objJComponent[strPageName.split('?')[0]]();
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
    CheckComponent: function (strPageName) {
        if (objJComponent[strPageName.split('?')[0]] !== null) {
            return true;
        }
        else {
            console.log("notfound");
            return false;
        }
    }
};

export default ComponentController;