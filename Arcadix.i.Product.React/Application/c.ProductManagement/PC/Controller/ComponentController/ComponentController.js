//React related imports
import React from 'react';
import loadable from '@loadable/component'
import Logger from '@shared/Framework/Services/Logger/Logger'

//Editor Related componentController.
import * as EditorComponentController from "@root/Application/e.Editor/PC/Controller/ComponentController/ComponentController";

//Framework related imports
import * as FrameworkController from '@root/Framework/Controller/FrameworkController/FrameworkController';

export const objComponents = {
    Main: function () {
        return loadable(() => import(/* webpackChunkName: "Main" */ '@root/Core/2_Main/Main'))
    },
    PerformanceResponse: function () {
        return loadable(() => import(/* webpackChunkName: "PerformanceView" */ '@root/Core/7_DevelopmentSideBar/PerformanceView/Popup/PerformanceResponse/PerformanceResponse'));
    },
    ViewCSRStateProps: function () {
        return loadable(() => import(/* webpackChunkName: "ViewCSRStateProps" */ '@root/Core/7_DevelopmentSideBar/PerformanceView/Popup/ViewCSRStateProps/ViewCSRStateProps'));
    },
    ShowProcedureDefinition: function () {
        return loadable(() => import(/* webpackChunkName: "ShowProcedureDefinition" */ '@root/Application/c.ProductManagement/PC/Modules/SoftwareEngineerSupport/DatabaseCompare/ShowProcedureDefinition/ShowProcedureDefinition'));
    },
    Login: function () {
        return loadable(() => import(/* webpackChunkName: "Login" */ '@root/Application/c.ProductManagement/PC/LoginAndMaster/Login/Login'))
    },
    ModulePreviewMaster: function () {
        return loadable(() => import(/* webpackChunkName: "ModulePreviewMaster" */ '@root/SupportApplication/ModulePreview/ModulePreviewMaster/ModulePreviewMaster'))
    },
    Master: function () {
        return loadable(() => import(/* webpackChunkName: "Master" */ '@root/Application/c.ProductManagement/PC/LoginAndMaster/Master/Master'))
    },
    AddEditFolder: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditFolder" */ '@root/Application/c.ProductManagement/PC/Modules/1_Folder/AddEditFolder/AddEditFolder'))
    },
    AddEditModule: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditModule" */ '@root/Application/c.ProductManagement/PC/Modules/2_Module/AddEditModule/AddEditModule'))
    }, 
    AddEditUseCase: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditUseCase" */ '@root/Application/c.ProductManagement/PC/Modules/3_UseCase/AddEditUseCase/AddEditUseCase'))
    },
    AddEditDocument: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditDocument" */ '@root/Application/c.ProductManagement/PC/Modules/5_Document/AddEditDocument/AddEditDocument'))
    },
    //AddEditExample: function () {
    //    return loadable(() => import(/* webpackChunkName: "AddEditExample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/AddEditExample/AddEditExample'))
    //},
    //AssignComponent: function () {
    //    return loadable(() => import(/* webpackChunkName: "AssignComponent" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/AssignComponent/AssignComponent'))
    //},

    Editor: function () {
        return loadable(() => import(/* webpackChunkName: "Editor" */ '@root/Application/e.Editor/PC/Editor'));
    },
    Module: function () {
        return loadable(() => import(/* webpackChunkName: "Module" */ '@root/Application/c.ProductManagement/PC/Modules/2_Module/Module'))
    },
    UseCase: function () {
        return loadable(() => import(/* webpackChunkName: "UseCase" */ '@root/Application/c.ProductManagement/PC/Modules/3_UseCase/UseCase'))
    },
    Document: function () {
        return loadable(() => import(/* webpackChunkName: "Document" */ '@root/Application/c.ProductManagement/PC/Modules/5_Document/Document'))
    },
     Example: function () {
        return loadable(() => import(/* webpackChunkName: "Example" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Example'))
    },
    AddEditTestCase: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditTestCase" */ '@root/Application/c.ProductManagement/PC/Modules/3.1_TestCase/AddEditTestCase/AddEditTestCase'))
    },
    AddEditImplementationStep: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditImplementationStep" */ '@root/Application/c.ProductManagement/PC/Modules/3.2_ImplementationStep/AddEditImplementationStep/AddEditImplementationStep'))
    },
    

    //Example - Demo
    AudioAndVideoRecording: function () {
        return loadable(() => import(/* webpackChunkName: "AudioAndVideoRecording" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/AudioAndVideoRecording/AudioAndVideoRecording'));
    },
    ZoomIntegrationSample: function () {
        return loadable(() => import(/* webpackChunkName: "ZoomIntegrationSample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ZoomIntegrationSample/ZoomIntegrationSample'));
    },
    PeerToPeerChatSample: function () {
        return loadable(() => import(/* webpackChunkName: "PeerToPeerChatSample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/PeerToPeerChatSample/PeerToPeerChatSample'));
    },
    Grid_DisplayGrid_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Grid_DisplayGrid_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Blocks/Grid_Sample/Grid_DisplayGrid_Sample/Grid_DisplayGrid_Sample'));
    },    
    NavigationCommonPage: function () {
        return loadable(() => import(/* webpackChunkName: "NavigationCommonPage" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Navigation/NavigationCommonPage/NavigationCommonPage'));
    },
    SignalRDemo: function () {
        return loadable(() => import(/* webpackChunkName: "SignalRDemo" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/SignalRDemo/SignalRDemo'));
    },
    ExternalAPITest: function () {
        return loadable(() => import(/* webpackChunkName: "ExternalAPITest" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ExternalAPITest/ExternalAPITest'));
    },
    DocumentViewDemo: function () {
        return loadable(() => import(/* webpackChunkName: "DocumentViewDemo" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/DocumentViewDemo/DocumentViewDemo'));
    },
    UseCaseDiagramDemo: function () {
        return loadable(() => import(/* webpackChunkName: "UseCaseDiagramDemo" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/UseCaseDiagramDemo/UseCaseDiagramDemo'));
    },
    ServerSideCall: function () {
        return loadable(() => import(/* webpackChunkName: "ExternalAPITest" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ExternalAPITest/ServerSideCall/ServerSideCall'));
    },
    SourceCode: function () {
        return loadable(() => import(/* webpackChunkName: "ExternalAPITest" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ExternalAPITest/SourceCode/SourceCode'));
    },
    Steps: function () {
        return loadable(() => import(/* webpackChunkName: "ExternalAPITest" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ExternalAPITest/Steps/Steps'));
    },
   
    //Framework/Blocks
    Grid_EditableGrid_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Grid_EditableGrid_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Blocks/Grid_Sample/Grid_EditableGrid_Sample/Grid_EditableGrid_Sample'));
    },
    Form_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "FormGenerator_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Blocks/Form_Sample/Form_Sample'));
    },
    Popup_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Popup_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Blocks/Popup_Sample/Popup_Sample'));
    },
    //TabbedPopup_Sample: function () {
    //    return loadable(() => import(/* webpackChunkName: "TabbedPopup_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/6_Example/Framework/Blocks/Popup_Sample/TabbedPopup_Sample/TabbedPopup_Sample'));
    //},
    //Framework/Controls
    Animation_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Animation_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/Animation_Sample/Animation_Sample/Animation_Sample'));
    },
    Animation_Sample_WithoutImage: function () {
        return loadable(() => import(/* webpackChunkName: "Animation_Sample_WithoutImage" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/Animation_Sample/Animation_Sample_WithoutImage/Animation_Sample_WithoutImage'));
    },
    Button_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Button_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/Button_Sample/Button_Sample'));
    },
    ContextMenu_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "ContextMenu_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/ContextMenu_Sample/ContextMenu_Sample'));
    },
    AutoCompleteDropdown: function () {
        return loadable(() => import(/* webpackChunkName: "AutoCompleteDropdown" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/AutoCompleteDropdown/AutoCompleteDropdown/AutoCompleteDropdown'));
    },
    AutoCompleteDropdown_MultiLanguage: function () {
        return loadable(() => import(/* webpackChunkName: "AutoCompleteDropdown" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/AutoCompleteDropdown/AutoCompleteDropdown_MultiLanguage/AutoCompleteDropdown_MultiLanguage'));
    },
    Dropdown_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Dropdown_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/DropDown_Sample/DropDown_Sample/DropDown_Sample'));
    },
    Dropdown_MultiLanguage_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Dropdown_MultiLanguage_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/DropDown_Sample/DropDown_MultiLanguage_Sample/DropDown_MultiLanguage_Sample'));
    },
    Dropdown_Disabled_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Dropdown_Disabled_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/DropDown_Sample/DropDown_Disabled_Sample/DropDown_Disabled_Sample'));
    },
    Dropdown_DefaultText_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Dropdown_DefaultText_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/DropDown_Sample/DropDown_DefaultText_Sample/DropDown_DefaultText_Sample'));
    },
    HierarchicalDropdown: function () {
        return loadable(() => import(/* webpackChunkName: "HierarchialDropdown" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/HierarchialDropDown/HierarchicalDropdown/HierarchialDropDown'));
    },
    HierarchicalDropdown_MultiLanguage: function () {
        return loadable(() => import(/* webpackChunkName: "HierarchialDropdown_MultiLanguage" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/HierarchialDropDown/HierarchicalDropdown_MultiLanguage/HierarchicalDropdown_MultiLanguage'));
    },
    HierarchicalDropdown_Disabled: function () {
        return loadable(() => import(/* webpackChunkName: "HierarchialDropdown_Disabled" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/HierarchialDropDown/HierarchicalDropdown_Disabled/HierarchialDropDown_Disabled'));
    },
    HierarchicalDropdown_DefaultText: function () {
        return loadable(() => import(/* webpackChunkName: "HierarchialDropdownn_DefaultText" */ '@root/Application/c.ProductManagement/Pc/Modules/4_Example/Framework/Controls/DropDown/HierarchialDropDown/HierarchicalDropdown_DefaultText/HierarchialDropDown_DefaultText'));
    },
    FileUpload_Sample_Single: function () {
        return loadable(() => import(/* webpackChunkName: "FileUpload_Sample_Single" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/FileUpload_Sample/FileUpload_Sample_SingleFile/FileUpload_Sample_SingleFile'));
    },
    FileUpload_Sample_Multiple: function () {
        return loadable(() => import(/* webpackChunkName: "FileUpload_Sample_Multiple" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/FileUpload_Sample/FileUploadSample_MultipleFile/FileUpload_Sample_MultipleFile'));
    },
    FileUpload_Sample_OneDrive: function () {
        return loadable(() => import(/* webpackChunkName: "FileUpload_Sample_OneDrive" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/FileUpload_Sample/FileUpload_Sample_OneDrive/FileUpload_Sample_OneDrive'));
    },
    FillHeight_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "FillHeight_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/FillHeight_Sample/FillHeight_Sample'));
    },
    MultiSelectDropDown_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "MultiSelectDropDown_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/MultiSelectDropdown_Sample/MultiSelectDropdown_Sample/MultiSelectDropdown_Sample'));
    },
    MultiSelectDropDown_MultiLanguage_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "MultiSelectDropDown_MultiLanguage_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/MultiSelectDropdown_Sample/MultiSelectDropdown_MultiLangauage_Sample/MultiSelectDropdown_MultiLanguage_Sample'));
    },
    MultiSelectDropDown_UnselectedOption_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "MultiSelectDropDown_UnselectedOption_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/MultiSelectDropdown_Sample/MultiSelectDropdown_UnselectedOption_Sample/MultiSelectDropdown_UnselectedOption_Sample'));
    },
    MultiSelectDropDown_Disabled_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "MultiSelectDropDown_Disabled_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/MultiSelectDropdown_Sample/MultiSelectDropdown_Disabled_Sample/MultiSelectDropdown_Disabled_Sample'));
    },
    MultiSelectDropDown_DefaultText_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "MultiSelectDropDown_DefaultText_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/DropDown/MultiSelectDropdown_Sample/MutiSelectDropdown_DefaultText_Sample/MultiSelectDropdown_DefaultText_Sample'));
    },
    OfficeRibbon_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "OfficeRibbon_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/OfficeRibbon_Sample/OfficeRibbon_Sample'));
    },
    Tab_Sample: function () {ductManagement/PC/Mo
        return loadable(() => import(/* webpackChunkName: "Tab_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/Tab_Sample/Tab_Sample'));
    },
    ToolBar_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "ToolBar_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/ToolBar_Sample/ToolBar_Sample'));
    },
    Tree_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "Tree_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/Tree_Sample/Tree_Sample'));
    }, 
    MultiLanguageInputs_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "MultiLanguageInputs_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/MultiLanguageControls/MultiLanguageInputs_Sample/MultiLanguageInputs_Sample'));
    },

    ProgressBar_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "ProgressBar_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Controls/ProgressBar_Sample/ProgressBar_Sample'));
    },

    //ModuleDevelopment
    Step1: function () {
        return loadable(() => import(/* webpackChunkName: "Step1" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ModuleDevelopment/Step1/Step1'));
    },
    Step2: function () {
        return loadable(() => import(/* webpackChunkName: "Step2" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ModuleDevelopment/Step2/Step2'));
    },
    Step3: function () {
        return loadable(() => import(/* webpackChunkName: "Step3" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ModuleDevelopment/Step3/Step3'));
    },
    Step4: function () {
        return loadable(() => import(/* webpackChunkName: "Step4" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ModuleDevelopment/Step4/Step4'));
    },
    Step5: function () {
        return loadable(() => import(/* webpackChunkName: "Step5" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ModuleDevelopment/Step5/Step5'));
    },
    Step6: function () {
        return loadable(() => import(/* webpackChunkName: "Step6" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ModuleDevelopment/Step6/Step6'));
    },
    Step7: function () {
        return loadable(() => import(/* webpackChunkName: "Step7" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ModuleDevelopment/Step7/Step7'));
    },
    ValidationSample: function () {
        return loadable(() => import(/* webpackChunkName: "ValidationSample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/ModuleDevelopment/Validation/ValidationSample'));
    },
    PaymentSample: function () {
        return loadable(() => import(/* webpackChunkName: "PaymentSample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/PaymentSample/PaymentSample'));
    },
    WebWorkerSample: function () {
        return loadable(() => import(/* webpackChunkName: "WebWorkerSample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/WebWorkerSample/WebWorkerSample'));
    },

    //Practice
    Book: function() {
        return loadable(() => import(/* webpackChunkName: "Book" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Practice/Book/Book'));
    },
    Student: function () {
        return loadable(() => import(/* webpackChunkName: "Book" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Practice/Student/Student'));
    },
     
     PaginationGrid: function () {
         return loadable(() => import(/* webpackChunkName: "PaginationGrid" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/PaginationGrid/PaginationGrid'));
    },

    OnlineHelp: function () {
        return loadable(() => import(/* webpackChunkName: "OnlineHelp" */ '@root/Application/c.Cockpit/PC/Modules/OnlineHelp/OnlineHelp/OnlineHelp'));
    },
    AddEditOnlineHelp: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditOnlineHelp" */ '@root/Application/c.Cockpit/PC/Modules/OnlineHelp/OnlineHelp/AddEditOnlineHelp/AddEditOnlineHelp'));
    },
    DevLinkRefresh: function () {
        return loadable(() => import(/* webpackChunkName: "DevLinkRefresh" */ '@root/Application/c.ProductManagement/PC/Modules/SoftwareEngineerSupport/DevLinkRefresh/DevLinkRefresh'));
    },   
    DatabaseCompare: function () {
        return loadable(() => import(/* webpackChunkName: "DatabaseCompare" */ '@root/Application/c.ProductManagement/PC/Modules/SoftwareEngineerSupport/DatabaseCompare/DatabaseCompare'));
    },
    ShowProcedure: function () {
        return loadable(() => import(/* webpackChunkName: "ShowProcedure" */ '@root/Application/c.ProductManagement/PC/Modules/SoftwareEngineerSupport/DatabaseCompare/ShowProcedure/ShowProcedure'));
    },
    ShowProcedureDefinition: function () {
        return loadable(() => import(/* webpackChunkName: "ShowProcedureDefinition" */ '@root/Application/c.ProductManagement/PC/Modules/SoftwareEngineerSupport/DatabaseCompare/ShowProcedureDefinition/ShowProcedureDefinition'));
    },
    ShowScript: function () {
        return loadable(() => import(/* webpackChunkName: "ShowScript" */ '@root/Application/c.ProductManagement/PC/Modules/SoftwareEngineerSupport/DatabaseCompare/ShowScript/ShowScript'));
    },    
    Preload: function () {
        return loadable(() => import(/* webpackChunkName: "Preload" */ '@root/Application/c.Cockpit/PC/Modules/SoftwareEngineerSupport/Preload/Preload'));
    },
    CurrentExecutionName: function () {
        return loadable(() => import(/* webpackChunkName: "CurrentExecutionName" */ '@root/Application/c.Cockpit/PC/Modules/SoftwareEngineerSupport/Preload/CurrentExecutionName/CurrentExecutionName'));
    },
    ViewOfflineExecution: function () {
        return loadable(() => import(/* webpackChunkName: "ViewOfflineExecution" */ '@root/Framework/Controls/Offline/ViewOffineExecution/ViewOffineExecution'));
    },        
    ProductManagementUser: function () {
        return loadable(() => import(/* webpackChunkName: "ProductManagementUser" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/ProductManagementUser/ProductManagementUser'));
    },
    AddEditProductManagementUser: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditProductManagementUser" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/ProductManagementUser/AddEditProductManagementUser/AddEditProductManagementUser'));
    },
    OfflineExecutionDisplay: function () {
        return loadable(() => import(/* webpackChunkName: "OffineExecutionDisplay" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Master/OffineExecutionDisplay/OffineExecutionDisplay'));
    },
    ImplementationStep: function () {
        return loadable(() => import(/* webpackChunkName: "ImplementationStep" */ '@root/Application/c.ProductManagement/PC/Modules/3.2_ImplementationStep/ImplementationStep'));
    },
    TestCase: function () {
        return loadable(() => import(/* webpackChunkName: "TestCase" */ '@root/Application/c.ProductManagement/PC/Modules/3.1_TestCase/TestCase'));
    },
    TestCaseStep: function () {
        return loadable(() => import(/* webpackChunkName: "TestCaseStep" */ '@root/Application/c.ProductManagement/PC/Modules/3.1.1_TestCaseStep/TestCaseStep/TestCaseStep'));
    },
    AddEditTestCaseStep: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditTestCaseStep" */ '@root/Application/c.ProductManagement/PC/Modules/3.1.1_TestCaseStep/AddEditTestCaseStep/AddEditTestCaseStep'));
    },
    IntranetAdministrator: function () {
        return loadable(() => import(/* webpackChunkName: "IntranetAdministrator" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/IntranetAdministrator/IntranetAdministrator'));
    },
    AddEditIntranetAdministrator: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditIntranetAdministrator" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/IntranetAdministrator/AddEditIntranetAdministrator/AddEditIntranetAdministrator'));
    },
    SendLogin: function () {
        return loadable(() => import(/* webpackChunkName: "SendLogin" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/IntranetAdministrator/SendLogin/SendLogin'));
    },
    BusinessUnit: function () {
        return loadable(() => import(/* webpackChunkName: "BusinessUnit" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit/BusinessUnit'));
    },
    AddEditBusinessUnit: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditBusinessUnit" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnit/AddEditBusinessUnit/AddEditBusinessUnit'));
    },
    BusinessUnitTeam: function () {
        return loadable(() => import(/* webpackChunkName: "BusinessUnitTeam" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam/BusinessUnitTeam'));
    },
    AddEditBusinessUnitTeam: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditBusinessUnitTeam" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam/AddEditBusinessUnitTeam/AddEditBusinessUnitTeam'));
    },
    Roles: function () {
        return loadable(() => import(/* webpackChunkName: "Roles" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/BusinessUnitTeamRole/Roles/Roles'));
    },
    AddEditRoles: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditRoles" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/BusinessUnitTeamRole/Roles/AddEditRoles/AddEditRoles'));
    },
    AssignPrivilegeToRoles: function () {
        return loadable(() => import(/* webpackChunkName: "AssignPrivilegeToRoles" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/BusinessUnitTeamRole/Roles/AssignPrivilegeToRoles/AssignPrivilegeToRoles'));
    },
    CodeCrawler: function () {
        return loadable(() => import(/* webpackChunkName: "CodeCrawler" */ '@root/Application/c.ProductManagement/PC/Modules/3.3_CodeCrawler/CodeCrawler'));
    },
    WorkFlow: function () {
        return loadable(() => import(/* webpackChunkName: "WorkFlow" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/WorkFlow/WorkFlow'));
    },
    AddEditWorkFlow: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditWorkFlow" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/WorkFlow/AddEditWorkFlow/AddEditWorkFlow'));
    },
    WorkFlowStatus: function () {
        return loadable(() => import(/* webpackChunkName: "WorkFlowStatus" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/WorkFlowStatus/WorkFlowStatus'));
    },
    AddEditWorkFlowStatus: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditWorkFlowStatus" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/WorkFlowStatus/AddEditWorkFlowStatus/AddEditWorkFlowStatus'));
    },
    ResetWorkFlowStatus: function () {
        return loadable(() => import(/* webpackChunkName: "ResetWorkFlowStatus" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskActions/ResetWorkFlowStatus/ResetWorkFlowStatus'));
    },
    ServiceAction: function () {
        return loadable(() => import(/* webpackChunkName: "ServiceAction" */ '@root/Application/c.ProductManagement/PC/LoginAndMaster/Master/ServiceAction/ServiceAction'))
    },
    TaskContentPreview: function () {
        return loadable(() => import(/* webpackChunkName: "TaskContentPreview" */ '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview'));
    },
    GenerateOnlineHelpContentPdf: function () {
        return loadable(() => import(/* webpackChunkName: "GenerateOnlineHelpContentPdf" */ '@root/Core/8_OnlineHelpView/OnlineHelpView/GenerateOnlineHelpContentPdf/GenerateOnlineHelpContentPdf'));
    },
};

const ComponentController = {
    GetComponent: function (strUrlParam) {
        console.log("strUrlParam", strUrlParam);
        var strComponentName = strUrlParam.split('?')[0];
        if (objComponents[strComponentName] != null) {
            try {
                let objComponent = objComponents[strComponentName.split('?')[0]]();
                return objComponent;
            }
            catch (error) {
                Logger.LogError("Module Import Error", error);
            }
        }
        else if (EditorComponentController.objComponents[strComponentName.split('?')[0]]) {
            return EditorComponentController.objComponents[strComponentName.split('?')[0]]();
        }
        else {
            //Logger.LogError("notfound:", strUrlParam);
           // return <div>Not found</div>;
            return undefined;
        }
    },
    CheckComponent: function (strPageName) {
        if (objComponents[strPageName.split('?')[0]] !== null) {
            return true;
        }
        else {
            console.log("notfound");
            return false;
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






