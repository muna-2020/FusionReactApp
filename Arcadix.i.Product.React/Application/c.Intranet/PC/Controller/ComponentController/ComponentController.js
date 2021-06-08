// React related imports.
import React from 'react';

//Losable import
import loadable from '@loadable/component';

//Controller related imports
import * as ComponentController_Client from '@root/../Arcadix.i.Product.React.Client/Application/c.Intranet/PC/Controller/ComponentController/ComponentController';

//Editor Related componentController.
import * as EditorComponentController from "@root/Application/e.Editor/PC/Controller/ComponentController/ComponentController";

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
        return loadable(() => import(/* webpackChunkName: "Login" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Login/Login'));
    },
    Master: function () {
        return loadable(() => import(/* webpackChunkName: "Master" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Master/Master'));
    },
    Editor: function () {
        return loadable(() => import(/* webpackChunkName: "Editor" */ '@root/Application/e.Editor/PC/Editor'));
    },
    EditorWrapper: function () {
        return loadable(() => import(/* webpackChunkName: "EditorWrapper" */ "@root/Application/e.Editor/PC/EditorWrapper"));
    },
    NavigationCommonPage: function () {
        return loadable(() => import(/* webpackChunkName: "NavigationCommonPage" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Navigation/NavigationCommonPage/NavigationCommonPage'));
    },
    MasterAddEdit: function () {
        return loadable(() => import(/* webpackChunkName: "MasterAddEdit" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Master/MasterAddEdit'));
    },
    StartDashboard: function () {
        return loadable(() => import(/* webpackChunkName: "StartDashboard" */ '@root/Application/c.Intranet/PC/Modules/1_Start/StartDashboard/StartDashboard'));
    },
    EmptyComponent: function () {
        return loadable(() => import(/* webpackChunkName: "EmptyComponent" */ '@root/Application/c.Intranet/PC/Modules/EmptyComponent/EmptyComponent'));
    },
    Task: function () {
        return loadable(() => import(/* webpackChunkName: "Task" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task'));
    },
    AddEditTaskFolder: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditTaskFolder" */ '@root/Application/c.Intranet/PC/Modules/2_Task/TaskFolder/AddEditTaskFolder/AddEditTaskFolder'));
    },
    ResetWorkFlowStatus: function () {
        return loadable(() => import(/* webpackChunkName: "ResetWorkFlowStatus" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskActions/ResetWorkFlowStatus/ResetWorkFlowStatus'));
    },
    TaskExport: function () {
        return loadable(() => import(/* webpackChunkName: "TaskExport" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskActions/TaskExport/TaskExport'));
    },
    Test: function () {
        return loadable(() => import(/* webpackChunkName: "Test" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test'));
    },
    AddEditTestFolder: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditTestFolder" */ '@root/Application/c.Intranet/PC/Modules/3_Test/TestFolder/AddEditTestFolder/AddEditTestFolder'));
    },
    GenerateTestPdf: function () {
        return loadable(() => import(/* webpackChunkName: "GenerateTestPdf" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/TestPdf/TestPdf'));
    },
    CategoryCompetency: function () {
        return loadable(() => import(/* webpackChunkName: "CategoryCompetency" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/CategoryCompetency/CategoryCompetency'));
    },
    AddEditCategoryCompetency: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditCategoryCompetency" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/CategoryCompetency/AddEditCategoryCompetency/AddEditCategoryCompetency'));
    },
    //MainClientUserProfile: function () {
    //        return loadable(() => import(/* webpackChunkName: "MainClientUserProfile" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/MainClientUserProfile/MainClientUserProfile'));
    //},
    Category: function () {
        return loadable(() => import(/* webpackChunkName: "Category" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/Category/Category'));
    },
    AddEditCategory: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditCategory" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/Category/AddEditCategory/AddEditCategory'));
    },
    CompetencyLevel: function () {
        return loadable(() => import(/* webpackChunkName: "CompetencyLevel" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/CompetencyLevel/CompetencyLevel'));
    },
    AddEditCompetencyLevel: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditCompetencyLevel" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/CompetencyLevel/AddEditCompetencyLevel/AddEditCompetencyLevel'));
    },
    CompetencyRange: function () {
        return loadable(() => import(/* webpackChunkName: "CompetencyRange" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/CompetencyRange/CompetencyRange'));
    },
    AddEditCompetencyRange: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditCompetencyRange" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/CompetencyRange/AddEditCompetencyRange/AddEditCompetencyRange'));
    },
    Subject: function () {
        return loadable(() => import(/* webpackChunkName: "Subject" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/Subject/Subject'));
    },
    //Subject: function () {
    //    return loadable(() => import(/* webpackChunkName: "Subject" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetails/TaskPropertyDetails'));
    //}, 
    AddEditSubject: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditSubject" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/Subject/AddEditSubject/AddEditSubject'));
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
    ProgressBar: function () {
        return loadable(() => import(/* webpackChunkName: "ProgressBar" */ '@root/Framework/Controls/ProgressBar/ProgressBar'));
    },
    State: function () {
        return loadable(() => import(/* webpackChunkName: "State" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/State/State'));
    },
    AddEditState: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditState" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/State/AddEditState/AddEditState'));
    },
    ClassType: function () {
        return loadable(() => import(/* webpackChunkName: "ClassType" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/ClassType/ClassType'));
    },
    AddEditClassType: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditClassType" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/ClassType/AddEditClassType/AddEditClassType'));
    },
    SchoolYear: function () {
        return loadable(() => import(/* webpackChunkName: "SchoolYear" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/SchoolYear/SchoolYear'));
    },
    AddEditSchoolYear: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditSchoolYear" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/SchoolYear/AddEditSchoolYear/AddEditSchoolYear'));
    },
    MainClientLanguage: function () {
        return loadable(() => import(/* webpackChunkName: "MainClientLanguage" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/MainClientLanguage/MainClientLanguage'));
    },
    MainClientCountry: function () {
        return loadable(() => import(/* webpackChunkName: "MainClientCountry" */ '@root/Application/c.Cockpit/PC/Modules/MainClient/MainClientCountry/MainClientCountry'));
    },
    SchoolManagement: function () {
        return loadable(() => import(/* webpackChunkName: "SchoolManagement" */ '@root/Application/c.Intranet/PC/Modules/5_Member/SchoolManagement/SchoolManagement'));
    },
    TeacherManagement: function () {
        return loadable(() => import(/* webpackChunkName: "TeacherManagement" */ '@root/Application/c.Intranet/PC/Modules/5_Member/TeacherManagement/TeacherManagement'));
    },
    ClassManagement: function () {
        return loadable(() => import(/* webpackChunkName: "ClassManagement" */ '@root/Application/c.Intranet/PC/Modules/5_Member/ClassManagement/ClassManagement'));
    },
    PupilManagement: function () {
        return loadable(() => import(/* webpackChunkName: "PupilManagement" */ '@root/Application/c.Intranet/PC/Modules/5_Member/PupilManagement/PupilManagement'));
    },
    AddEditTeacherManagement: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditTeacherManagement" */ '@root/Application/c.Intranet/PC/Modules/5_Member/TeacherManagement/AddEditTeacherManagement/AddEditTeacherManagement'));
    },
    SelectTeacherSchool: function () {
        return loadable(() => import(/* webpackChunkName: "SelectTeacherSchool" */ '@root/Application/c.Intranet/PC/Modules/5_Member/TeacherManagement/SelectTeacherSchool/SelectTeacherSchool'));
    },
    FTPMemberImport: function () {
        return loadable(() => import(/* webpackChunkName: "FTPMemberImport" */ '@root/Application/c.Intranet/PC/Modules/5_Member/MemberFtpSync/FTPMemberImport/FTPMemberImport'));
    },
    FTPMemberImportDemo: function () {
        return loadable(() => import(/* webpackChunkName: "FTPMemberImportDemo" */ '@root/Application/c.Intranet/PC/Modules/5_Member/MemberFtpSync/FTPMemberImportDemo/FTPMemberImportDemo'));
    },
    FileContentPopup: function () {
        return loadable(() => import(/* webpackChunkName: "FileContentPopup" */ '@root/Application/c.Intranet/PC/Modules/5_Member/MemberFtpSync/FileContentPopup/FileContentPopup'));
    },
    FTPAuditPopup: function () {
        return loadable(() => import(/* webpackChunkName: "FTPAuditPopup" */ '@root/Application/c.Intranet/PC/Modules/5_Member/MemberFtpSync/FTPAuditPopup/FTPAuditPopup'));
    },
    FTPServiceStatus: function () {
        return loadable(() => import(/* webpackChunkName: "FTPServiceStatus" */ '@root/Application/c.Intranet/PC/Modules/5_Member/MemberFtpSync/FTPServiceStatus/FTPServiceStatus'));
    },
    FTPFilesDisplay: function () {
        return loadable(() => import(/* webpackChunkName: "FTPFilesDisplay" */ '@root/Application/c.Intranet/PC/Modules/5_Member/MemberFtpSync/FTPFilesDisplay/FTPFilesDisplay'));
    },
    DemoFTPFilesDisplay: function () {
        return loadable(() => import(/* webpackChunkName: "DemoFTPFilesDisplay" */ '@root/Application/c.Intranet/PC/Modules/5_Member/MemberFtpSync/DemoFTPFilesDisplay/DemoFTPFilesDisplay'));
    },
    Cycle: function () {
        return loadable(() => import(/* webpackChunkName: "Cycle" */ '@root/Application/c.Intranet/PC/Modules/4_Cycle/Cycle/Cycle'));
    },
    AddEditCycle: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditCycle" */ '@root/Application/c.Intranet/PC/Modules/4_Cycle/Cycle/AddEditCycle/AddEditCycle'));
    },
    AssignTestToCycle: function () {
        return loadable(() => import(/* webpackChunkName: "AssignTestToCycle" */ '@root/Application/c.Intranet/PC/Modules/4_Cycle/Cycle/AssignTestToCycle/AssignTestToCycle'));
    },
    StateAdministrator: function () {
        return loadable(() => import(/* webpackChunkName: "StateAdministrator" */ '@root/Application/c.Intranet/PC/Modules/5_Member/StateAdministrator/StateAdministrator'));
    },
    AddEditStateAdministrator: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditStateAdministrator" */ '@root/Application/c.Intranet/PC/Modules/5_Member/StateAdministrator/AddEditStateAdministrator/AddEditStateAdministrator'));
    },
    CycleSchoolYear: function () {
        return loadable(() => import(/* webpackChunkName: "CycleSchoolYear" */ '@root/Application/c.Intranet/PC/Modules/4_Cycle/CycleSchoolYear/CycleSchoolYear'));
    },
    CycleState: function () {
        return loadable(() => import(/* webpackChunkName: "CycleState" */ '@root/Application/c.Intranet/PC/Modules/4_Cycle/CycleState/CycleState'));
    },
    CycleSchool: function () {
        return loadable(() => import(/* webpackChunkName: "CycleSchool" */ '@root/Application/c.Intranet/PC/Modules/4_Cycle/CycleSchool/CycleSchool'));
    },
    AddCycleSchool: function () {
        return loadable(() => import(/* webpackChunkName: "AddCycleSchool" */ '@root/Application/c.Intranet/PC/Modules/4_Cycle/CycleSchool/AddCycleSchool/AddCycleSchool'));
    },
    CycleClass: function () {
        return loadable(() => import(/* webpackChunkName: "CycleClass" */ '@root/Application/c.Intranet/PC/Modules/4_Cycle/CycleClass/CycleClass'));
    },
    AddCycleClass: function () {
        return loadable(() => import(/* webpackChunkName: "AddCycleClass" */ '@root/Application/c.Intranet/PC/Modules/4_Cycle/CycleClass/AddCycleClass/AddCycleClass'));
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
    AdditionalTaskProperty: function () {
        return loadable(() => import(/* webpackChunkName: "AdditionalTaskProperty" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/AdditionalTaskProperty/AdditionalTaskProperty'));
    },
    AddEditAdditionalTaskProperty: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditAdditionalTaskProperty" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/AdditionalTaskProperty/AddEditAdditionalTaskProperty/AddEditAdditionalTaskProperty'));
    },
    AdditionalTaskPropertyValue: function () {
        return loadable(() => import(/* webpackChunkName: "AdditionalTaskPropertyValue" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/AdditionalTaskPropertyValue/AdditionalTaskPropertyValue'));
    },
    AddEditAdditionalTaskPropertyValue: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditAdditionalTaskPropertyValue" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/AdditionalTaskPropertyValue/AddEditAdditionalTaskPropertyValue/AddEditAdditionalTaskPropertyValue'));
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
    //Settings: function () {
    //        return loadable(() => import(/* webpackChunkName: "Settings" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/Settings/Settings'));
    //},
    ClientSettings: function () {
        return loadable(() => import(/* webpackChunkName: "ClientSettings" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/ClientSettings/ClientSettings'));
    },
    AddEditDemoTest: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditDemoTest" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestMaster/DemoTest/AddEditDemoTest/AddEditDemoTest'));
    },
    AddEditLowStakeTest: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditLowStakeTest" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestMaster/LowStakeTest/AddEditLowStakeTest/AddEditLowStakeTest'));
    },
    AddEditHighStakeTest: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditHighStakeTest" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestMaster/HighStakeTest/AddEditHighStakeTest/AddEditHighStakeTest'));
    },
    AddEditHighStakeAdaptiveTest: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditHighStakeAdaptiveTest" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestMaster/HighStakeAdaptiveTest/AddEditHighStakeAdaptiveTest/AddEditHighStakeAdaptiveTest'));
    },
    AddEditPresentationTest: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditPresentationTest" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestMaster/PresentationTest/AddEditPresentationTest/AddEditPresentationTest'));
    },
    AddEditLearningTest: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditLearningTest" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestMaster/LearningTest/AddEditLearningTest/AddEditLearningTest'));
    },
    AddEditWrapperTest: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditWrapperTest" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestMaster/WrapperTest/AddEditWrapperTest/AddEditWrapperTest'));
    },
    AddEditEssayTest: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditEssayTest" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestMaster/EssayTest/AddEditEssayTest/AddEditEssayTest'));
    },
    AddEditExternalTest: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditExternalTest" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestMaster/ExternalTest/AddEditExternalTest/AddEditExternalTest'));
    },
    AddEditSurveyTest: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditSurveyTest" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestMaster/SurveyTest/AddEditSurveyTest/AddEditSurveyTest'));
    },
    AssignTaskToTest: function () {
        return loadable(() => import(/* webpackChunkName: "AssignTaskToTest" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/AssignTaskToTest/AssignTaskToTest'));
    },
    TestNavigation: function () {
        return loadable(() => import(/* webpackChunkName: "TestNavigation" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/TestNavigation/TestNavigation'));
    },
    AddEditTestNavigation: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditTestNavigation" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/TestNavigation/AddEditTestNavigation/AddEditTestNavigation'));
    },
    TestTaskProperties: function () {
        return loadable(() => import(/* webpackChunkName: "TestTaskProperties" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/TestTaskProperties/TestTaskProperties'));
    },
    AddEditHierarchy: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditHierarchy" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/TestTaskProperties/Hierarchy/AddEditHierarchy/AddEditHierarchy'));
    },
    AddEditIndex: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditIndex" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/TestTaskProperties/Index/AddEditIndex/AddEditIndex'));
    },
    AddEditNavigation: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditNavigation" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/TestTaskProperties/Navigation/AddEditNavigation/AddEditNavigation'));
    },
    AddEditTime: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditTime" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestActions/TestTaskProperties/Time/AddEditTime/AddEditTime'));
    },
    AdditionalProperty: function () {
        return loadable(() => import(/* webpackChunkName: "AdditionalProperty" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/AdditionalProperty/AdditionalProperty'));
    },
    AddEditAdditionalProperty: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditvAdditionalProperty" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/AdditionalProperty/AddEditAdditionalProperty/AddEditAdditionalProperty'));
    },
    AddEditLearningTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditLearningTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/LearningTask/AddEditLearningTask/AddEditLearningTask'));
    },
    AddEditHighStakeTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditLearningTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/HighStakeTask/AddEditHighStakeTask/AddEditHighStakeTask'));
    },
    AddEditDemoTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditDemoTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/DemoTask/AddEditDemoTask/AddEditDemoTask'));
    },
    AddEditPresentationTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditPresentationTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/PresentationTask/AddEditPresentationTask/AddEditPresentationTask'));
    },
    AddEditLowStakeTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditLowStakeTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/LowStakeTask/AddEditLowStakeTask/AddEditLowStakeTask'));
    },
    AddEditHighStakeBreakTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditHighStakeBreakTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/HighStakeBreakTask/AddEditHighStakeBreakTask/AddEditHighStakeBreakTask'));
    },
    AddEditHighStakeExampleTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditHighStakeExampleTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/HighStakeExampleTask/AddEditHighStakeExampleTask/AddEditHighStakeExampleTask'));
    },
    AddEditHighStakeIntroTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditHighStakeIntroTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/HighStakeIntroTask/AddEditHighStakeIntroTask/AddEditHighStakeIntroTask'));
    },
    AddEditHighStakeSurveyTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditHighStakeSurveyTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/HighStakeSurveyTask/AddEditHighStakeSurveyTask/AddEditHighStakeSurveyTask'));
    },
    AddEditHighStakeSurveyListTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditHighStakeSurveyListTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/HighStakeSurveyListTask/AddEditHighStakeSurveyListTask/AddEditHighStakeSurveyListTask'));
    },
    AddEditHighStakeAdaptiveTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditHighStakeAdaptiveTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/HighStakeAdaptiveTask/AddEditHighStakeAdaptiveTask/AddEditHighStakeAdaptiveTask'));
    },
    AddEditSurveyTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditHighStakeAdaptiveTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/SurveyTask/AddEditSurveyTask/AddEditSurveyTask'));
    },
    AddEditSurveyListTask: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditSurveyListTask" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskMaster/SurveyListTask/AddEditSurveyListTask/AddEditSurveyListTask'));
    },
    AdditionalPropertyValue: function () {
        return loadable(() => import(/* webpackChunkName: "AdditionalPropertyValue" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/AdditionalPropertyValue/AdditionalPropertyValue'));
    },
    AddEditAdditionalPropertyValue: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditAdditionalPropertyValue" */ '@root/Application/c.Intranet/PC/Modules/6_Taxonomy/AdditionalPropertyValue/AddEditAdditionalPropertyValue/AddEditAdditionalPropertyValue'));
    },
    AddEditSchoolManagement: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditSchoolManagement" */ '@root/Application/c.Intranet/PC/Modules/5_Member/SchoolManagement/AddEditSchoolManagement/AddEditSchoolManagement'));
    },
    AddEditClassManagement: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditClassManagement" */ '@root/Application/c.Intranet/PC/Modules/5_Member/ClassManagement/AddEditClassManagement/AddEditClassManagement'));
    },
    AddEditPupilManagement: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditPupilManagement" */ '@root/Application/c.Intranet/PC/Modules/5_Member/PupilManagement/AddEditPupilManagement/AddEditPupilManagement'));
    },
    ApplicationServer: function () {
        return loadable(() => import(/* webpackChunkName: "ApplicationServer" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/ApplicationServer/ApplicationServer'));
    },
    AuditPopup: function () {
        return loadable(() => import(/* webpackChunkName: "AuditPopup" */ '@root/Framework/Blocks/Audit/AuditPopup'));
    },
    AddEditApplicationServer: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditApplicationServer" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/ApplicationServer/AddEditApplicationServer/AddEditApplicationServer'));
    },
    DataBaseServer: function () {
        return loadable(() => import(/* webpackChunkName: "DataBaseServer" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/DataBaseServer/DataBaseServer'));
    },
    ViewOfflineExecution: function () {
        return loadable(() => import(/* webpackChunkName: "ViewOfflineExecution" */ '@root/Framework/Controls/Offline/ViewOffineExecution/ViewOffineExecution'));
    },
    ElementFormulaAttribute: function () {
        return loadable(() => import(/* webpackChunkName: "ElementFormulaAttribute" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute/ElementFormulaAttribute'));
    },
    ElementFormulaAttributePopUp: function () {
        return loadable(() => import(/* webpackChunkName: "ElementFormulaAttributePopUp" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute/ElementFormulaAttributePopUp/ElementFormulaAttributePopUp'));
    },
    DataExport: function () {
        return loadable(() => import(/* webpackChunkName: "DataExport" */ '@root/Application/c.Intranet/PC/Modules/7_Report/DataExport/DataExport'));
    },
    DataExportExecutionName: function () {
        return loadable(() => import(/* webpackChunkName: "CurrentExecutionName" */ '@root/Application/c.Intranet/PC/Modules/7_Report/DataExport/DataExportExecutionName/DataExportExecutionName'));
    },
    EssayBilling: function () {
        return loadable(() => import(/* webpackChunkName: "EssayBilling" */ '@root/Application/c.Intranet/PC/Modules/7_Report/Essay/EssayBilling/EssayBilling'));
    },
    EssayBillingExecutionName: function () {
        return loadable(() => import(/* webpackChunkName: "EssayBillingExecutionName" */ '@root/Application/c.Intranet/PC/Modules/7_Report/Essay/EssayBilling/EssayBillingExecutionName/EssayBillingExecutionName'));
    },
    DbDataLogs: function () {
        return loadable(() => import(/* webpackChunkName: "DbDataLogs" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/LogsAndException/Logs/HistoryLogs/HistoryLogs'));
    },
    DbDataExceptions: function () {
        return loadable(() => import(/* webpackChunkName: "DbDataExceptions" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/LogsAndException/Execptions/HistoryExceptions/HistoryExceptions'));
    },
    RedisDataLogs: function () {
        return loadable(() => import(/* webpackChunkName: "RedisDataLogs" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/LogsAndException/Logs/CurrentLogs/CurrentLogs'));
    },
    RedisDataExceptions: function () {
        return loadable(() => import(/* webpackChunkName: "RedisDataExceptions" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/LogsAndException/Execptions/CurrentExceptions/CurrentExceptions'));
    },
    AdminInterpretation: function () {
        return loadable(() => import(/* webpackChunkName: "AdminInterpretation" */ '@root/Application/c.Cockpit/PC/Modules/AdminInterpretation/AdminInterpretation'));
    },
    AddEditTopic: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditTopic" */ '@root/Application/c.Cockpit/PC/Modules/AdminInterpretation/AddEditTopic/AddEditTopic'));
    },
    AssignTaskToDescription: function () {
        return loadable(() => import(/* webpackChunkName: "AssignTaskToDescription" */ '@root/Application/c.Cockpit/PC/Modules/AdminInterpretation/AssignTaskToDescription/AssignTaskToDescription'));
    },
    JobField: function () {
        return loadable(() => import(/* webpackChunkName: "JobField" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/PathFinder/JobField/JobField'));
    },
    AddEditJobField: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditJobField" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/PathFinder/JobField/AddEditJobField/AddEditJobField'));
    },
    Job: function () {
        return loadable(() => import(/* webpackChunkName: "Job" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/PathFinder/Job/Job'));
    },
    AddEditJob: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditJob" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/PathFinder/Job/AddEditJob/AddEditJob'));
    },
    JobLevel: function () {
        return loadable(() => import(/* webpackChunkName: "JobLevel" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/PathFinder/JobLevel/JobLevel'));
    },
    AddEditJobLevel: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditJobLevel" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/PathFinder/JobLevel/AddEditJobLevel/AddEditJobLevel'));
    },
    JobSubjectTemplate: function () {
        return loadable(() => import(/* webpackChunkName: "JobSubjectTemplate" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/PathFinder/JobSubjectTemplate/JobSubjectTemplate'));
    },
    AddEditJobSubjectTemplate: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditJobSubjectTemplate" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/PathFinder/JobSubjectTemplate/AddEditJobSubjectTemplate/AddEditJobSubjectTemplate'));
    },
    JobSkillValue: function () {
        return loadable(() => import(/* webpackChunkName: "JobSkillValue" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/PathFinder/JobSkillValue/JobSkillValue'));
    },
    TaskPreview: function () {
        return loadable(() => import(/* webpackChunkName: "TaskPreview" */ '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskPreview'));
    },
    TaskContentPreview: function () {
        return loadable(() => import(/* webpackChunkName: "TaskContentPreview" */ '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview'));
    },
    TaskContentPrintVersion: function () {
        return loadable(() => import(/* webpackChunkName: "TaskContentPrintVersion" */ '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPrintVersion/TaskContentPrintVersion'));
    },
    TaskQuestion: function () {
        return loadable(() => import(/* webpackChunkName: "TaskQuestion" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskActions/TaskQuestion/TaskQuestion'));
    },
    AddEditTaskQuestion: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditTaskQuestion" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskActions/TaskQuestion/AddEditTaskQuestion/AddEditTaskQuestion'));
    },
    Tip: function () {
        return loadable(() => import(/* webpackChunkName: "Tip" */ '@root/Application/c.Cockpit/PC/Modules/Tip/Tip'));
    },
    AddEditTip: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditTip" */ '@root/Application/c.Cockpit/PC/Modules/Tip/AddEditTip/AddEditTip'));
    },
    TaskPropertyDetails: function () {
        return loadable(() => import(/* webpackChunkName: "TaskPropertyDetails" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetails/TaskPropertyDetails'));
    },
    TaskPropertyDetailsPrintVersion: function () {
        return loadable(() => import(/* webpackChunkName: "TaskPropertyDetailsPrintVersion" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetails/TaskPropertyDetailsPrintVersion/TaskPropertyDetailsPrintVersion'));
    },
    TaskFolderDetails: function() {
        return loadable(() => import(/* webpackChunkName: "TaskFolderDetails" */ '@root/Application/c.Intranet/PC/Modules/2_Task/TaskFolder/TaskFolderDetails/TaskFolderDetails'));
    },
    TaskFolderDetailsPrintVersion: function () {
        return loadable(() => import(/* webpackChunkName: "TaskFolderDetailsPrintVersion" */ '@root/Application/c.Intranet/PC/Modules/2_Task/TaskFolder/TaskFolderDetails/TaskFolderDetailsPrintVersion/TaskFolderDetailsPrintVersion'));
    },
    GenereateTaskPdf: function () {
        return loadable(() => import(/* webpackChunkName: "GenereateTaskPdf" */ '@root/Application/c.Intranet/PC/Modules/2_Task/Task/TaskActions/TaskPdf/TaskPdf'));
    },
    OnlineHelp: function () {
        return loadable(() => import(/* webpackChunkName: "OnlineHelp" */ '@root/Application/c.Cockpit/PC/Modules/OnlineHelp/OnlineHelp/OnlineHelp'));
    },
    AddEditOnlineHelp: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditOnlineHelp" */ '@root/Application/c.Cockpit/PC/Modules/OnlineHelp/OnlineHelp/AddEditOnlineHelp/AddEditOnlineHelp'));
    },
    OfflineExecutionDisplay: function () {
        return loadable(() => import(/* webpackChunkName: "OffineExecutionDisplay" */ '@root/Application/c.Intranet/PC/LoginAndMaster/Master/OffineExecutionDisplay/OffineExecutionDisplay'));
    },
    SchoolType: function () {
        return loadable(() => import(/* webpackChunkName: "SchoolType" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/SchoolType/SchoolType'));
    },
    AddEditSchoolType: function () {
        return loadable(() => import(/* webpackChunkName: "AddEditSchoolType" */ '@root/Application/c.Intranet/PC/Modules/8_Setting/SchoolType/AddEditSchoolType/AddEditSchoolType'));
    },
    TestPropertyDetails: function () {
        return loadable(() => import(/* webpackChunkName: "TestPropertyDetails" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetails/TestPropertyDetails'));
    },
    TestPropertyDetailsPrintVersion: function () {
        return loadable(() => import(/* webpackChunkName: "TestPropertyDetailsPrintVersion" */ '@root/Application/c.Intranet/PC/Modules/3_Test/Test/TestBrowser/TestPropertyDetails/TestPropertyDetailsPrintVersion/TestPropertyDetailsPrintVersion'));
    },
    Empty: function () {
        return loadable(() => {
            return <React.Fragment />;
        });
    }
};

const ComponentController = {
    GetComponent: function (strComponentName) {
        let objClientComponent = ComponentController_Client.objComponents;

        let objComponent = objClientComponent[strComponentName.split('?')[0] + "_" + JConfiguration.MainClientIdentifier] ?
            objClientComponent[strComponentName.split('?')[0] + "_" + JConfiguration.MainClientIdentifier] : objComponents[strComponentName.split('?')[0]];

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
        else if (EditorComponentController.objComponents[strComponentName.split('?')[0]]) {
            return EditorComponentController.objComponents[strComponentName.split('?')[0]]();
        }
        else {
            //console.log("notfound");
            //return objComponents["EmptyComponent"]();
            return undefined;
        }
    },
    CheckComponent: function (strComponentName) {
        if (objComponents[strComponentName.split('?')[0]] && objComponents[strComponentName.split('?')[0]] !== null) {
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






