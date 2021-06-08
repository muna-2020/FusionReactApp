//Objects required for module.
import Object_Intranet_Test_IntranetTest from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/IntranetTest';
import Object_Intranet_Test_TestFolder from '@shared/Object/c.Intranet/3_Test/TestFolder/TestFolder';
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Intranet_Taxonomy_Subject from '@shared/Object/c.Intranet/6_Taxonomy/Subject/Subject';
import Object_Intranet_Taxonomy_Category from '@shared/Object/c.Intranet/6_Taxonomy/Category/Category';
import Object_Intranet_Taxonomy_CategoryCompetency from '@shared/Object/c.Intranet/6_Taxonomy/CategoryCompetency/CategoryCompetency';
import Object_Intranet_Test_TestProgressDisplay from '@shared/Object/c.Intranet/3_Test/Test/IntranetTest/TestProgressDisplay/TestProgressDisplay';
import Object_Intranet_Test_TestAlgorithm from '@shared/Object/c.Intranet/3_Test/Test/TestAlgorithm/TestAlgorithm';
import Object_Intranet_Member_IntranetAdministrator from '@shared/Object/c.Intranet/5_Member/IntranetAdministrator/IntranetAdministrator';
import Object_Extranet_Teacher_SchoolYear from '@shared/Object/d.Extranet/3_Teacher/SchoolYear/SchoolYear';
import Object_Cockpit_Skin from '@shared/Object/c.Cockpit/Skin/Skin';
import Object_TestApplication_TestResultAttributes from '@shared/Object/f.TestApplication/ResultCalculation/ResultAttributes/TestResultAttributes';
import Object_Intranet_Setting_Certificate from '@shared/Object/c.Intranet/8_Setting/Certificate/Certificate';
import Object_Intranet_Test_SeparationAndCalibrationGroup from '@shared/Object/c.Intranet/3_Test/Test/SeparationAndCalibration/SeparationAndCalibrationGroup/SeparationAndCalibrationGroup'

//Core Imports.
import { GetObjectListForModule } from '@shared/Core/9_ServiceWorker/Prefetch/Prefetch';

//Module related fies.
import * as Test_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test_MetaData';
import * as Test_ContextMenu from '@shared/Application/c.Intranet/Modules/3_Test/Test_ContextMenu';
import * as AddEditTestFolder_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/TestFolder/AddEditTestFolder/AddEditTestFolder_MetaData';
import * as Test_OfficeRibbon from "@shared/Application/c.Intranet/Modules/3_Test/Test_OfficeRibbon";

//HelperClasses
import SignalRClass from '@shared/Framework/Services/SignalRClass/SignalRClass';

/**
* @name Test_ModuleProcessor
* @param NA
* @summary Class for Test module display.
* @return NA
*/
class Test_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList   
     * @param NA
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Test_IntranetTest",
            "Object_Intranet_Test_TestFolder",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/3_Test/Test",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_Language",
            "Object_Intranet_Taxonomy_Subject",
            "Object_Intranet_Taxonomy_Category",
            "Object_Intranet_Taxonomy_CategoryCompetency",
            "Object_Intranet_Test_TestProgressDisplay",
            "Object_Intranet_Test_TestAlgorithm",
            "Object_Intranet_Member_IntranetAdministrator",
            "Object_Extranet_Teacher_SchoolYear",
            "Object_Cockpit_Skin",
            "Object_TestApplication_TestResultAttributes",
            "Object_Intranet_Setting_Certificate",
            "Object_Intranet_Test_SeparationAndCalibrationGroup",
            { "StoreKey": "ApplicationState", "DataKey": "FolderId" },
            { "StoreKey": "ApplicationState", "DataKey": "SelectedRows" }
        ];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @param {Array} arrPrefetchFilterData contains PrefetchFilterData if any
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props, arrPrefetchFilterData) {
        let arrDataRequest = [];
        if (arrPrefetchFilterData) {
            //Task object
            Object_Intranet_Test_IntranetTest.Initialize({});
            arrPrefetchFilterData?.forEach(objFolder => {
                arrDataRequest = [
                    ...arrDataRequest,
                    {
                        "URL": Object_Intranet_Test_IntranetTest.URL,
                        "InitialDataCallParam": [this.GetTestParams(objFolder["iTestFolderId"])]
                    }
                ]
            });
        }
        else {
            let objTestParams = this.GetTestParams(0);//to get Root Folder Tasks
            Object_Intranet_Test_IntranetTest.Initialize([objTestParams]);
            arrDataRequest = [...arrDataRequest, Object_Intranet_Test_IntranetTest];
        }

        let objTestFolderParams = {            
            "SortKeys": [
                {
                    "vTestFolderName": {
                        "order": "asc"
                    }
                }
            ]
        };

        let objSchoolYearParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        let objTestAlgorithmParams = {
            "SortKeys": [
                {
                    "iDisplayOrder": {
                        "order": "asc"
                    }
                }
            ]
        };

        let objTestProgressDisplayParams = {
            "SortKeys": [
                {
                    "iTestProgressDisplayId": {
                        "order": "asc"
                    }
                }
            ]
        };

        Object_Intranet_Test_TestFolder.Initialize(objTestFolderParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_TestFolder];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/3_Test/Test"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        // Mainclient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Subject
        Object_Intranet_Taxonomy_Subject.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Subject];

        //Category
        Object_Intranet_Taxonomy_Category.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_Category];

        //CategoryCompetency
        Object_Intranet_Taxonomy_CategoryCompetency.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Taxonomy_CategoryCompetency];

        //TestProgressDisplay
        Object_Intranet_Test_TestProgressDisplay.Initialize(objTestProgressDisplayParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_TestProgressDisplay];

        //TestAlgorithm
        Object_Intranet_Test_TestAlgorithm.Initialize(objTestAlgorithmParams);
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_TestAlgorithm];

        //Intranet Administrator
        Object_Intranet_Member_IntranetAdministrator.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Member_IntranetAdministrator];

        //SchoolYear
        Object_Extranet_Teacher_SchoolYear.Initialize(objSchoolYearParams);
        arrDataRequest = [...arrDataRequest, Object_Extranet_Teacher_SchoolYear];

        //Skin Data
        Object_Cockpit_Skin.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Skin];

        //Test Result Attribute
        Object_TestApplication_TestResultAttributes.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_TestApplication_TestResultAttributes];

        //Test ResultCertificate
        Object_Intranet_Setting_Certificate.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_Certificate];

        //SeparationAndCalibrationGroup
        Object_Intranet_Test_SeparationAndCalibrationGroup.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Test_SeparationAndCalibrationGroup];

        return arrDataRequest;
    }

    /**
     * @name GetTestParams
     * @param {string} strFolderId FolderId
     * @summary Forms the Params for Test object.
     */
    GetTestParams(strFolderId) {
        return {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iFolderId": strFolderId
                        }
                    }
                ]
            }
        };
    }

    /**
    * @name GetTestMetaData
    * @param {object} objContext
    * @summary it returns the object for TestGrid Meta Data
    * @returns {object} Data
    */
    GetTestGridMetaData(objContext) {
        return {
            HeaderData: Test_MetaData.GetMetaData(),
            Filter: { "cIsDeleted": "N" },
            PrimaryKey: "Id"
        };
    }

    /**
    * @name GetTestGridData
    * @param {object} objContext
    * @summary it returns the object for TestGrid Data
    * @returns {object} Data
    */
    GetTestGridData(objContext) {
        let arrRowData = [];
        if (objContext.state.blnSearchMode) {
            arrRowData = objContext.state.arrFilterdTestData ?? [];
        }
        else {
            let strFolderId = objContext.props.IsForServerRenderHtml ? 0 : objContext.props.FolderId; //as only root folder content will be loaded during SSR
            let arrTestData = DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iFolderId;" + strFolderId).Data ?? [];
            let arrFolderData = DataRef(objContext.props.Object_Intranet_Test_TestFolder)["Data"]?.filter(obj => obj["iTestParentFolderId"] == strFolderId) ?? [];//.filter(obj => obj["iTestParentFolderId"] == objContext.props.FolderId && obj["cIsDeleted"] == "N");
            arrRowData = [...arrFolderData, ...arrTestData];
        }
        if (objContext.props.IsForServerRenderHtml) {
            let objSelectedRows = ApplicationState.GetProperty('SelectedRows') ? ApplicationState.GetProperty('SelectedRows') : {};
            ApplicationState.SetProperty('SelectedRows', { ...objSelectedRows, ["TestGrid"]: [arrRowData[0]] });
        }

        return {
            RowData: arrRowData,
            AdditionalPaddingIds: ["FilterBlock"]
            //LanguageData,
            //DropDownData,
        };
    }

    /**
    * @name GetResourceData
    * @param {object} objContext
    * @summary it returns the object for TextResource
    * @returns {object} TextResource
    */
    GetTestGridResourceData(objContext) {
        //Has all the fields corresponding to the Header (Metadata). These values are going to get displayed in the HTML. It is a mandatory props.
        let Text = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props) ?? {};
        let SkinPath = JConfiguration.IntranetSkinPath;
        return {
            Text,
            SkinPath
        };
    };

    /**
    * @name GetTestGridEvents
    * @param {object} objContext
    * @summary Returns object that contains all the Events methods.
    * @return {object}
    */
    GetTestGridEvents(objContext) {
        let objCallBacks = {
            OnClickRow: (Data, event) => this.OnClickRow(Data.SelectedRow, objContext),
            OnContextMenuClick: (objRowData, event, arrCheckedRows) => this.OnContextMenuClick(objRowData, event, objContext, arrCheckedRows),
            OnDoubleClick: (objRowData, event) => this.OnDoubleClick(objRowData, objContext)
        };
        return objCallBacks;
    }

    /**
    * @name OnClickRow
    * @param {object} objSelectedRow
    * @param {object} objContext
    * @summary Handles the click event of the grid.
    */
    OnClickRow(objSelectedRow, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedRow": objSelectedRow } });
    }

    /**
     * @name OnContextMenuClick
     * @param {object} objRowData
     * @param {object} event
     * @param {object} objContext
     * @summary Handles the click event of the grid.
     */
    OnContextMenuClick(objRowData, objEvent, objContext, arrCheckedRows) {
        let objContextMenu = {
            Data: this.GetContextMenuData(objRowData, objContext, arrCheckedRows),
            objEvent: { clientX: objEvent.clientX, clientY: objEvent.clientY }
        };
        objEvent.preventDefault();
        objEvent.stopPropagation();
        let fnShowContextMenu = ApplicationState.GetProperty("ShowContextMenu");
        fnShowContextMenu(objContextMenu);
        //ApplicationState.SetProperty("ContextMenuDetails", objContextMenu);
    }

    /**
     * @name GetContextMenuData
     * @param {any} objRowData
     * @param {any} objContext
     * @summary Forms the data for Context menu.
     * @return {object}
     */
    GetContextMenuData(objRowData, objContext, arrCheckedRows) {
        let arrContextListSample = [];
        if (objRowData.uTestId) {
            let objData = {
                objContext,
                MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], 2),
                AssignTasksToTest: () => this.OpenAssignTaskToTestPopup(objRowData, objContext),
                AssignTestNavigation: () => this.OpenAssignTestNavigationPopup(objRowData, objContext),
                OnTestTaskPropertiesClick: () => this.OpenTestTaskPropertiesPopup(objRowData, objContext),
                AddTest: (strType) => { this.OpenAddEditPopup(objContext, strType, false) },
                EditTest: () => { this.OpenAddEditPopup(objContext, "", true, objRowData) },
                DeleteTest: () => { this.OpenDeletePopup(objContext, objRowData) },
                OnTestPreviewClick: () => {
                    let objParams = {
                        TestId: objRowData["uTestId"],
                        ControllerName: "TestPreview",
                        LanguageId: JConfiguration.InterfaceLanguageId
                    }
                    //let vHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication/TestApplicationPreview?Params=' + JSON.stringify(objParams);
                    let vHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'TestPreview?TestId=' + objRowData["uTestId"] + "&LanguageId=" + JConfiguration.InterfaceLanguageId;
                    window.open(vHostUrl, '_blank');
                },
                OnTestControlPreviewClick: () => {
                    let objParams = {
                        TestId: objRowData["uTestId"],
                        ControllerName: "TestControl",
                        LanguageId: JConfiguration.InterfaceLanguageId
                    }
                    //let vHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'OpenApplication/TestApplicationPreview?Params=' + JSON.stringify(objParams);
                    let vHostUrl = objContext.props.JConfiguration.OnlineBaseUrl + 'TestControl?TestId=' + objRowData["uTestId"] + "&LanguageId=" + JConfiguration.InterfaceLanguageId;
                    window.open(vHostUrl, '_blank');
                },
                AddTestFolder: () => this.OpenAddEditTestFolderPopup(objContext, objRowData, false),
                CutTest: () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Test": { "Type": "Cut", "Data": arrCheckedRows ? arrCheckedRows : [objRowData] } }) },
                CopyTest: () => {
                    ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Test": { "Type": "Copy", "Data": arrCheckedRows ? arrCheckedRows : [objRowData] } })
                },
                PrintToPdf: (strLanguageId) => this.PrintToPdf(objContext, objRowData, strLanguageId),
                ConvertTestType: (strToTestType) => { this.ConvertTestType(objRowData, strToTestType, objContext) },
            };
            arrContextListSample = Test_ContextMenu.GetTestContextMenuData(objData);
        }
        else {
            let objData = {
                objContext,
                MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], 2),
                AddTestFolder: () => this.OpenAddEditTestFolderPopup(objContext, objRowData, false),
                EditTestFolder: () => this.OpenAddEditTestFolderPopup(objContext, objRowData, true),
                DeleteTestFolder: () => this.OpenDeletePopup(objContext, objRowData),
                AddTest: (strType) => { this.OpenAddEditPopup(objContext, strType, false) },
                CutFolder: () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Test": { "Type": "Cut", "Data": arrCheckedRows ? arrCheckedRows : [objRowData] } }) },
                CopyFolder: () => {
                    ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Test": { "Type": "Copy", "Data": arrCheckedRows ? arrCheckedRows : [objRowData] } })
                },
                PasteFolder: () => this.PasteFolder(objContext, objRowData.iTestFolderId),
            };
            if (objRowData.Id) {
                arrContextListSample = Test_ContextMenu.GetGridTestFolderContextMenuData(objData);
            }
            else {
                arrContextListSample = Test_ContextMenu.GetTreeTestFolderContextMenuData(objData);
            }
        }
        return arrContextListSample;
    }

    /**
     * @name LoadSelectedFolderTests
     * @param {object} objContext Context 
     * @param {string} strFolderId strFolderId
     * @summary To set state data after the load is complete.
     */
    LoadSelectedFolderTests(objContext) {
        let objTestParams = {
            "SearchQuery": {
                "must": [
                    {
                        "match": {
                            "iFolderId": objContext.props.FolderId
                        }
                    },
                ]
            },
        };
        if (!DataRef(objContext.props.Object_Intranet_Test_IntranetTest, "Object_Intranet_Test_IntranetTest;iFolderId;" + objContext.props.FolderId))
            ApplicationState.SetProperty("blnShowAnimation", true);
        Object_Intranet_Test_IntranetTest.GetData(objTestParams, (arrData, blnLoadComplete) => {
            if (blnLoadComplete) {
                ApplicationState.SetProperty("blnShowAnimation", false);
                let fnResetGridSelection = ApplicationState.GetProperty("ResetGridSelection") ? ApplicationState.GetProperty("ResetGridSelection")["TestGrid"] : null;
                if (fnResetGridSelection) {
                    fnResetGridSelection();
                }
            }            
        });
    }

    /**
    * @name ConvertTaskType
    * @param {object} objRowData objRowData
    * @param {string} strToTestType strToTestType
    * @param {object} objContext objContext
    * @summary Forms the data for Context menu.
    * @return {object} Handles convert task type event
    */
    ConvertTestType(objRowData, strToTestType, objContext) {
        let objEditedTest = {};
        let arrTestProperty = [];
        switch (strToTestType) {
            case "Demo":
                objRowData.t_TestDrive_Test_TestProperty.map(objTestProperty => {
                    arrTestProperty = [...arrTestProperty, { ...objTestProperty, ["iTestUsageId"]: 7}]
                })
                objEditedTest = { ...objRowData, ["t_TestDrive_Test_TestProperty"]: arrTestProperty};
                break;
            case "Test":
                objRowData.t_TestDrive_Test_TestProperty.map(objTestProperty => {
                    arrTestProperty = [...arrTestProperty,{ ...objTestProperty, ["iTestUsageId"]: 1, ["cIsAdaptiveTest"]:"N" }]
                })
                objEditedTest = { ...objRowData, ["t_TestDrive_Test_TestProperty"]: arrTestProperty, ["iProviderId"]: 1};
                break;
            case "Adaptive":
                objRowData.t_TestDrive_Test_TestProperty.map(objTestProperty => {
                    arrTestProperty = [...arrTestProperty, { ...objTestProperty, ["iTestUsageId"]: 1, ["cIsAdaptiveTest"]: "Y" }]
                })
                objEditedTest = { ...objRowData, ["t_TestDrive_Test_TestProperty"]: arrTestProperty, ["iProviderId"]: 1 };
                break;
            case "Shell":
                objRowData.t_TestDrive_Test_TestProperty.map(objTestProperty => {
                    arrTestProperty = [...arrTestProperty, { ...objTestProperty, ["iTestUsageId"]: 1, ["cIsAdaptiveTest"]: "N" }]
                })
                objEditedTest = { ...objRowData, ["t_TestDrive_Test_TestProperty"]: arrTestProperty, ["iProviderId"]: 3 };
                break;
            case "Presentation":
                objRowData.t_TestDrive_Test_TestProperty.map(objTestProperty => {
                    arrTestProperty = [...arrTestProperty, { ...objTestProperty, ["iTestUsageId"]: 6}]
                })
                objEditedTest = { ...objRowData, ["t_TestDrive_Test_TestProperty"]: arrTestProperty };
                break;
            case "Learn":
                objRowData.t_TestDrive_Test_TestProperty.map(objTestProperty => {
                    arrTestProperty = [...arrTestProperty, { ...objTestProperty, ["iTestUsageId"]: 3 }]
                })
                objEditedTest = { ...objRowData, ["t_TestDrive_Test_TestProperty"]: arrTestProperty };
                break;
            case "External":
                objRowData.t_TestDrive_Test_TestProperty.map(objTestProperty => {
                    arrTestProperty = [...arrTestProperty, { ...objTestProperty, ["iTestUsageId"]: 8 }]
                })
                objEditedTest = { ...objRowData, ["t_TestDrive_Test_TestProperty"]: arrTestProperty };
                break;
            case "Survey":
                objRowData.t_TestDrive_Test_TestProperty.map(objTestProperty => {
                    arrTestProperty = [...arrTestProperty, { ...objTestProperty, ["iTestUsageId"]: 4}]
                })
                objEditedTest = { ...objRowData, ["t_TestDrive_Test_TestProperty"]: arrTestProperty };
                break;
            case "LowStake":
                objRowData.t_TestDrive_Test_TestProperty.map(objTestProperty => {
                    arrTestProperty = [...arrTestProperty, { ...objTestProperty, ["iTestUsageId"]: 2 }]
                })
                objEditedTest = { ...objRowData, ["t_TestDrive_Test_TestProperty"]: arrTestProperty };
                break;
        }
        let objSearchQuery = {
            "must": [
                {
                    "match": {
                        "iFolderId": ApplicationState.GetProperty("FolderId")
                    }
                }
            ]
        }
        let objParams = {
            "SearchQuery": objSearchQuery,
            "vEditData": [objEditedTest],
            "uUserId": objContext.props.ClientUserDetails.UserId

        };
        Object_Intranet_Test_IntranetTest.EditData(objParams, (objReturn, cIsNewData) => {
            console.log(objReturn)
        })
    }


    /**
     * @name OpenAddEditTestFolderPopup
     * @param {any} objRowData
     * @param {any} objContext
     * @param {boolean} blnIsEdit
     * @summary Forms the data for Context menu.
     * @return {object}
     */
    OpenAddEditTestFolderPopup(objContext, objRowData, blnIsEdit) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props);
        let intApplicationTypeForTaskData = 2;
        if (objRowData["iTestFolderId"] == undefined && objRowData["uTestId"]) {
            if (objRowData["iFolderId"] == 0) {
                objRowData = {
                    "iTestFolderId": 0,
                    "iTestParentFolderId" : -1
                }
            }
            else {
                objRowData = DataRef(objContext.props.Object_Intranet_Test_TestFolder)["Data"].find(objTestFolder => objTestFolder["iTestFolderId"] == objRowData["iFolderId"]);
            }
        }
        if (objRowData["iTestFolderId"]) {
            Popup.ShowTabbedPopup({
                Data: {
                    FolderId: objContext.props.FolderId,
                    objRowData: objRowData,
                    IsEdit: blnIsEdit,
                    ClientUserDetails: objContext.props.ClientUserDetails,
                    LanguageData: DataRef(objContext.props.Object_Cockpit_Language)["Data"],
                    MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForTaskData),
                },
                Meta: {
                    PopupName: "AddEditTestFolder",
                    HeaderData: AddEditTestFolder_MetaData.GetAddEditMetaData(),
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                    JConfiguration: objContext.props.JConfiguration
                },
                Events: {
                },
                CallBacks: {
                },
                ParentProps: objContext.props
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
    * @name DeletePopup  
    * @param {object} objContext passes Context object
    * @summary Call Confirmation popup for Deleting subject
    */
    OpenDeletePopup(objContext, objSelectedRow = null) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props);
        let arrSelectedRows = [];
        if (!objSelectedRow) {
            arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TestGrid"] : [];
        }
        else {
            arrSelectedRows = [objSelectedRow]
        }
        let blnIsTest;

        var strDeleteVariables = "";
        arrSelectedRows.map(objSelectedRows => {
            strDeleteVariables = strDeleteVariables + (objSelectedRows["vTestName"] ? objSelectedRows["vTestName"] : objSelectedRows["vTestFolderName"]) + ", ";
            blnIsTest = objSelectedRows["vTestName"] ? true : false;
        });

        if (arrSelectedRows && arrSelectedRows.length > 0) {
            let objVaribales = {
                Variable_1: strDeleteVariables.substring(0, strDeleteVariables.length - 2)
            };
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath,
                    Variables: objVaribales
                },
                Events: {
                    ConfirmEvent: (strPopupId) => {
                        blnIsTest ? this.DeleteTest(arrSelectedRows, strPopupId, objContext) : this.DeleteTestFolder(objContext, arrSelectedRows, strPopupId)
                    }
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "ErrorPopup",
                    SkinPath: objContext.props.JConfiguration.CockpitSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name DeleteTest
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Test and close popup on success
     */
    DeleteTest(arrSelectedRows, strPopupId, objContext) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        let objParams = {}
        var objSearchQuery = {
            "must": [
                {
                    "match": {
                        "iFolderId": ApplicationState.GetProperty("FolderId")
                    }
                }
            ]
        }
        objParams = {

            "SearchQuery": objSearchQuery,
            "vDeleteData": arrDeleteRow,
            "uUserId": objContext.props.ClientUserDetails.uUserId

        };

        Object_Intranet_Test_IntranetTest.DeleteData(objParams, (objReturn, cIsNewData) => {
            if (cIsNewData) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestGrid": null });
                objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedRow": null } })
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
    * @name DeleteTestFolder
    * @param {array} arrSelectedRows selected row from the display grid
    * @param {object} objModal objModal
    * @summary Deletes TestFolder and close popup on success
    */
    DeleteTestFolder(objContext, arrSelectedRows, strPopupId) {
        let arrDeleteRow = [];
        arrSelectedRows.map(objSelectedRows => {
            arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
        });
        Object_Intranet_Test_TestFolder.DeleteData({ vDeleteData: arrDeleteRow }, (objReturn, blnDeleted) => {
            if (blnDeleted) {
                let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, "TestGrid": null });
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
     * @name AssignTasksToTest
     * @param {any} objContext
     * @param {any} objSelectedRow
     * @summary Opens the Assign TasktoTest Popup
     */
    OpenAssignTaskToTestPopup(objRowData, objContext) {
        Popup.ShowTabbedPopup({
            Data: {
                TestData: objRowData,
            },
            Meta: {
                PopupName: "AssignTaskToTest",
                Height: "auto",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
            },
            Resource: {
                Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props),
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
            },
            ParentProps: objContext.Props,
            Events: {},
            CallBacks: {}
        })
    }
    
    /**
     * @name AssignTasksToTest
     * @param {any} objContext
     * @param {any} objSelectedRow
     * @summary Opens the Assign TasktoTest Popup
     */
    OpenAssignTestNavigationPopup(objRowData, objContext) {
        Popup.ShowTabbedPopup({
            Data: {
                TestData: objRowData,
                MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], 2),
            },
            Meta: {
                PopupName: "TestNavigation",
                Height: "auto",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
            },
            Resource: {
                Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props),
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
            },
            ParentProps: objContext.Props,
            Events: {},
            CallBacks: {}
        })
    }

    /**
     * @name OpenTestTaskPropertiesPopup
     * @param {any} objContext
     * @param {any} objSelectedRow
     * @summary Opens the Assign TasktoTest Popup
     */
    OpenTestTaskPropertiesPopup(objRowData, objContext) {
        Popup.ShowTabbedPopup({
            Data: {
                TestData: objRowData,
            },
            Meta: {
                PopupName: "TestTaskProperties",
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
            },
            Resource: {
                Text: Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props),
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
            },
            ParentProps: objContext.Props,
            Events: {},
            CallBacks: {}
        })
    }

    /**
   * @name GetTestGridCallBacks
   * @param {object} objContext
   * @summary Returns object that contains all the CallBack methods.
   * @return {object}
   */
    GetTestGridCallBacks(objContext) {
        let objCallBacks = {
            OnBeforeGridRowRender: (objRow) => this.OnBeforeGridRowRender(objRow, objContext),
            OnBeforeRowSelect: (objRow) => this.OnBeforeGridRowRender(objRow, objContext)
        };
        return objCallBacks;
    }

    /**
     * @name OnBeforeGridRowRender
     * @param {object} objRow
     * @param {object} objContext
     * @summary returns the modified row data
     * @return {object}
     */
    OnBeforeGridRowRender(objRow, objContext) {
        let objReturnRow = null;
        if (objRow.iTestFolderId) {
            if (objContext.state.blnSearchMode) {
                if (objRow["cIsDeleted"] == "N") {
                    objReturnRow = {
                        ...objRow,
                        Id: objRow.iTestFolderId,
                        Name: objRow.vTestFolderName,
                        Type: "FolderImage",
                        TestUsage: "Demo"
                    }
                }
            }
            else {
                if (objRow["cIsDeleted"] == "N") {
                    objReturnRow = {
                        ...objRow,
                        Id: objRow.iTestFolderId,
                        Name: objRow.vTestFolderName,
                        Type: "FolderImage",
                        TestUsage: "Demo"
                    }
                }
            }            
        }
        else if (objRow["cIsDeleted"] == "N") {
            objReturnRow = {
                ...objRow,
                Id: objRow.uTestId,
                Name: objRow.vTestName,
                Type: objRow.t_TestDrive_Test_TestProperty && objRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == "Y" ? "AdaptiveTestImage" : "TestImage",
                TestUsage: this.GetTestUsage(objRow, objContext)
            }
        }
        return objReturnRow;
    }

    /**
     * @name GetTestUsage
     * @param {object} objRow
     * @param {object} objContext
     * @summary returns the TestType based on iTestUsageId
     * @return {object}
     */
    GetTestUsage(objRow, objContext) {
        let strTestUsage = "";
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props);

        if (objRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'N' && objRow.iProviderId == 1)
            strTestUsage = "Test";
        else if (objRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'Y' && objRow.iProviderId == 1)
            strTestUsage = "Adaptive";
        else if (objRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'N' && objRow.iProviderId == 3)
            strTestUsage = "Shell";
        else if (objRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 6)
            strTestUsage = "Presentation";
        else if (objRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 3)
            strTestUsage = "Learn";
        else if (objRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 8)
            strTestUsage = "External";
        else if (objRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 4)
            strTestUsage = "Survey";
        else if (objRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 7)
            strTestUsage = "Demo";
        else if (objRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 2)
            strTestUsage = "LowStake";

        return Localization.TextFormatter(objTextResource, strTestUsage);
    }

    /**
   * @name GetSubjectDropDownData
   * @param {*} objContext objContext
   * @param {*} objTextResource objTextResource
   * @param {*} arrSubjectData arrSubjectData
   * @summary Return subject dropdown data
   * @returns {object} SubjectDropDownData
   */
    GetSubjectDropDownData(objContext) {
        let arrSubjectData = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"];
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props);
        let objMainSubjectData = {
            "iSubjectId": 0,
            "iParentSubjectId": -2,
            "cIsDeleted": "N",
            "t_TestDrive_Subject_Data": [
                {
                    "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId,
                    "vSubjectName": objTextResource["All"],
                    "vSubjectDisplayName": null,
                    "vSubjectShortName": null,
                    "tSubjectDescription": null,
                    "iDataMainClientId": objContext.props.JConfiguration.MainClientId
                }
            ]
        };
        return [objMainSubjectData, ...arrSubjectData];
    };

    /**
     * @name OpenAddEditPopup
     * @param {object} objContext objContext
     * @param {string} strType TestType
     * @param {boolean} blnIsEdit is Edit popup
     * @param {object} objSelectedRow objSelectedRow
     * @summary Opens tabbed Add/Edit Test popup
     * @returns {object} SubjectDropDownData
     */
    OpenAddEditPopup(objContext, strType = "", blnIsEdit, objSelectedRow = null) {
        let intApplicationTypeForLanguageData = 2;
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props);
        if (!objSelectedRow) {
            objSelectedRow = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["TestGrid"] ? ApplicationState.GetProperty("SelectedRows")["TestGrid"][0] : {};
        }
        if (blnIsEdit && objSelectedRow.vTestName == undefined) {
            this.OpenAddEditTestFolderPopup(objContext, objSelectedRow, true)
        }
        else {
            if (blnIsEdit) {
                if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objSelectedRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'N' && objSelectedRow.iProviderId == 1)
                    strType = "HighStake";
                else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objSelectedRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'Y' && objSelectedRow.iProviderId == 1)
                    strType = "HighStakeAdaptive";
                else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objSelectedRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'N' && objSelectedRow.iProviderId == 3)
                    strType = "Wrapper";
                else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 6)
                    strType = "Presentation";
                else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 3)
                    strType = "Learning";
                else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 8)
                    strType = "External";
                else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 4)
                    strType = "Survey";
                else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 7)
                    strType = "Demo";
                else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 2)
                    strType = "LowStake";
            }

            let objData = {
                Title: Localization.TextFormatter(objTextResource, strType),
                IsEdit: blnIsEdit,
                Type: strType,
                objSelectedRow: objSelectedRow,
                DropDownData: {
                    arrSubjectData: this.GetSubjectDropDownData(objContext),
                    arrCategoryData: DataRef(objContext.props.Object_Intranet_Taxonomy_Category)["Data"],
                    arrCategoryCompetencyData: DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"],
                    arrSkinData: DataRef(objContext.props.Object_Cockpit_Skin)["Data"],
                    arrTestResultAttributeData: DataRef(objContext.props.Object_TestApplication_TestResultAttributes)["Data"],
                    arrResultCertificateData: DataRef(objContext.props.Object_Intranet_Setting_Certificate)["Data"], 
                    arrSeparationAndCalibrationGroupData: DataRef(objContext.props.Object_Intranet_Test_SeparationAndCalibrationGroup)["Data"]
                },
                MainClientLanguageData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage)["Data"],
                LanguageData: DataRef(objContext.props.Object_Cockpit_Language)["Data"],
                AlgorithmData: DataRef(objContext.props.Object_Intranet_Test_TestAlgorithm)["Data"],
                TestProgressDisplayData: DataRef(objContext.props.Object_Intranet_Test_TestProgressDisplay)["Data"],
                SchoolYearData: DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"],
                MultiLanguageData: this.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], intApplicationTypeForLanguageData),
                arrIntranetadministrator: DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"],
                Object_Intranet_Test_IntranetTest: objContext.props.Object_Intranet_Test_IntranetTest
            }
            Popup.ShowTabbedPopup({
                Data: objData,
                Meta: {
                    PopupName: "AddEdit" + strType + "Test",
                    ShowHeader: true,
                    ShowCloseIcon: true,
                    ShowToggleMaximizeIcon: true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "AddEdit" + strType + "Test",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                    JConfiguration: objContext.props.JConfiguration
                },
                Events: {},
                CallBacks: {
                    OnAddEditComplete: (objReturnData) => objContext.dispatch({ type: "SET_STATE", payload: { "objSelectedRow": objReturnData } })
                },
                ParentProps: objContext.props
            });
        }        
    }

    /**
     * @name GetTestDetails
     * @param {object} objContext objContext
     * @param {object} objSelectedRow objSelectedRow
     * @summary generates Data for TestPropertyDisplay
     * @returns {object} Data for TestPropertyDisplay
     */
    GetTestDetails(objContext, objSelectedRow) {
        var strSubject = "", strSkinName = "", strCategoryName = "", strCategoryCompetencyName = "", strTesttype = "", strTestUsage = "",
            strOwner = "", strEditedBy = "", strAlgorithm = "", strProgressDisplay = "";
        //var objSelectedRow = ApplicationState.GetProperty("SelectedRows") && ApplicationState.GetProperty("SelectedRows")["TestGrid"] ? ApplicationState.GetProperty("SelectedRows")["TestGrid"][0] : {};

        //Getting subject Names
        let objSubject = DataRef(objContext.props.Object_Intranet_Taxonomy_Subject)["Data"].find(objSub => {
            return objSub["iSubjectId"] == objSelectedRow["iSubjectId"]
        });
        if (objSubject) {
            let objSubjectData = objSubject.t_TestDrive_Subject_Data.find(objSubjectData => { return objSubjectData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
            strSubject = objSubjectData ? objSubjectData["vSubjectName"] : "";
        }

        //Getting Category Name
        if (objSelectedRow["t_TestDrive_Test_Category"].length > 0) {
            let objCategory = DataRef(objContext.props.Object_Intranet_Taxonomy_Category)["Data"].find(objCat => {
                return objCat["iCategoryId"] == objSelectedRow["t_TestDrive_Test_Category"][0]["iCategoryId"]
            });
            if (objCategory) {
                let objCategoryData = objCategory.t_TestDrive_Category_Data.find(objCatData => { return objCatData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
                strCategoryName = objCategoryData ? objCategoryData["vCategoryName"] : "";
            }
        }

        //Getting CategoryCompetency Name
        if (objSelectedRow["t_TestDrive_Test_Competency"].length > 0) {
            let objCategoryCompetency = DataRef(objContext.props.Object_Intranet_Taxonomy_CategoryCompetency)["Data"].find(objComp => {
                return objComp["iCategoryCompetencyId"] == objSelectedRow["t_TestDrive_Test_Competency"][0]["iCategoryCompetencyId"]
            });
            if (objCategoryCompetency) {
                let objCategoryCompetencyData = objCategoryCompetency.t_TestDrive_Category_Competency_Data.find(objCompData => { return objCompData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
                strCategoryCompetencyName = objCategoryCompetencyData ? objCategoryCompetencyData["tCompetencyText"] : "";
            }
        }

        //Getting Skin Name
        let objSkin = DataRef(objContext.props.Object_Cockpit_Skin)["Data"].find(objSkin => {
            return objSkin["uSkinId"] == objSelectedRow["uSkinId"]
        });
        if (objSkin) {
            let objSkinData = objCategory.t_TestDrive_Skin_Data.find(objSkinData => { return objSkinData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId });
            strSkinName = objSkinData ? objSkinData["vSkinTitle"] : "";
        }

        //Getting Owner and last EditedBy Names
        strOwner = this.GetAdministratorName(objSelectedRow.uUserId, objContext);
        strEditedBy = this.GetAdministratorName(objSelectedRow.uModifiedById, objContext);

        //Language details
        let objLanguages = {};
        DataRef(objContext.props.Object_Cockpit_Language)["Data"].map(objLanguageData => {
            objLanguages = { ...objLanguages, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageIdentifier }
        });
        let arrSelectedLanguages = objSelectedRow.t_TestDrive_Test_Language.sort((obj1, obj2) => obj1["iLanguageId"] - obj2["iLanguageId"]);
        let objMainClientLanguage = arrSelectedLanguages.find(objLang => objLang["iLanguageId"] == JConfiguration.InterfaceLanguageId);
        if (objMainClientLanguage) {
            arrSelectedLanguages = [objMainClientLanguage, ...arrSelectedLanguages.filter(objLang => objLang["iLanguageId"] != JConfiguration.InterfaceLanguageId)];
        }

        let arrLanguageDetails = arrSelectedLanguages.map(objLanguage => { return { "Language": objLanguages[objLanguage["iLanguageId"]], "ActiveForTest": objLanguage.cIsActivatedForTest } });

        //Algorithm details
        let objAlgorithm = DataRef(objContext.props.Object_Intranet_Test_TestAlgorithm)["Data"].find(objAlgo => {
            return objAlgo["iAlgorithmId"] == objSelectedRow["iAlgorithmId"]
        });
        if (objAlgorithm) {
            let objAlgorithmData = objAlgorithm.t_TestDrive_Test_Algorithm_Data.find(objAlgo => {
                return objAlgo["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId
            })
            strAlgorithm = objAlgorithmData ? objAlgorithmData["vAlgorithmName"] : "";
        }

        //ProgressDisplay Options
        let objProgressDisplay = DataRef(objContext.props.Object_Intranet_Test_TestProgressDisplay)["Data"].find(objProgress => {
            return objProgress["iTestProgressDisplayId"] == objSelectedRow["t_TestDrive_Test_TestProperty"][0]["iTestProgressDisplayId"]
        });
        if (objProgressDisplay) {
            let objProgressDisplayData = objProgressDisplay.t_TestDrive_Test_TestProgressDisplay_Data.find(objProgress => {
                return objProgress["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId
            })
            strProgressDisplay = objProgressDisplayData ? objProgressDisplayData["vTestProgressDisplay"] : "";
        }
        if (objSelectedRow["t_TestDrive_Test_TestProperty"][0]["iTestProgressDisplayId"] == -1) {
            strProgressDisplay = "Do Not Show";
        }

        //Page data
        let objTestData = objSelectedRow.t_TestDrive_Test_Data ? objSelectedRow.t_TestDrive_Test_Data.find(objData => {
            return objData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId
        }) : {}

        //SchoolYear details
        let arrSchoolYearDetails = [];
        if (objSelectedRow.t_TestDrive_Test_AssignedSchoolYear.length > 0) {
            let objSchoolYears = {};
            DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"].map(objSchoolYear => {

                objSchoolYear.t_TestDrive_Member_Class_SchoolYear_Data.map(objSchoolYearData => {
                    if (objSchoolYearData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId)
                        objSchoolYears = { ...objSchoolYears, [objSchoolYear.iSchoolYearId]: objSchoolYearData.vSchoolYearName }
                })
            })

            arrSchoolYearDetails = objSelectedRow.t_TestDrive_Test_AssignedSchoolYear.map(objAssignedSchoolYear => {
                return { "SchoolYear": objSchoolYears[objAssignedSchoolYear["iSchoolYearId"]] }
            })

        }

        if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objSelectedRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'N' && objSelectedRow.iProviderId == 1)
            strTestUsage = "HighStake";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objSelectedRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'Y' && objSelectedRow.iProviderId == 1)
            strTestUsage = "HighStakeAdaptive";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 1 && objSelectedRow.t_TestDrive_Test_TestProperty[0].cIsAdaptiveTest == 'N' && objSelectedRow.iProviderId == 3)
            strTestUsage = "Wrapper";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 6)
            strTestUsage = "Presentation";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 3)
            strTestUsage = "Learning";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 8)
            strTestUsage = "External";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 4)
            strTestUsage = "Survey";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 7)
            strTestUsage = "Demo";
        else if (objSelectedRow.t_TestDrive_Test_TestProperty[0].iTestUsageId == 2)
            strTestUsage = "LowStake";

        let objTestDetails = {
            ...objSelectedRow,
            strTesttype: strTesttype,
            strTestUsage: strTestUsage,
            strSubject: strSubject,
            strSkinName: strSkinName,
            strCategoryName: strCategoryName,
            strCategoryCompetencyName: strCategoryCompetencyName,
            strOwner: strOwner,
            strEditedBy: strEditedBy,
            arrLanguageDetails: arrLanguageDetails,
            strAlgorithm: strAlgorithm,
            strProgressDisplay: strProgressDisplay,
            objTestData: { ...objTestData },
            arrSchoolYearDetails: arrSchoolYearDetails
        };

        return objTestDetails;
    }

    /**
     * @name GetTestFolderDetails
     * @param {object} objContext objContext
     * @param {object} objSelectedRow objSelectedRow
     * @summary generates Data for TestFolderDetails
     * @returns {object} Data for TestFolderDetails
     */
    GetTestFolderDetails(objContext, objSelectedRow) {
        let strOwner = "", strEditedBy = "";
        //Getting Owner and last EditedBy Names
        strOwner = this.GetAdministratorName(objSelectedRow.uUserId, objContext);
        strEditedBy = this.GetAdministratorName(objSelectedRow.uModifiedById, objContext);

        //Language details
        let arrLanguageIds = objSelectedRow.t_TestDrive_FileSystem_TestFolder_Language ? objSelectedRow.t_TestDrive_FileSystem_TestFolder_Language.map(objLanguage => { return objLanguage["iLanguageId"] }).sort() : [];
        let strMainClientLanguage = arrLanguageIds.find(strLangId => strLangId == JConfiguration.InterfaceLanguageId);
        if (strMainClientLanguage) {
            arrLanguageIds = [strMainClientLanguage, ...arrLanguageIds.filter(strLangId => strLangId != JConfiguration.InterfaceLanguageId)];
        }

        let objLanguages = {};
        DataRef(objContext.props.Object_Cockpit_Language)["Data"].map(objLanguageData => {
            objLanguages = { ...objLanguages, [objLanguageData.iFrameworkLanguageId]: objLanguageData.vLanguageIdentifier }
        });

        let arrLanguageDetails = arrLanguageIds.map(iLanguageId => { return objLanguages[iLanguageId] });

        let objTestFolderDetails = {
            ...objSelectedRow,
            strOwner: strOwner,
            strEditedBy: strEditedBy,
            arrLanguageDetails: arrLanguageDetails,
        };

        return objTestFolderDetails;
    }

    /**
     * @name GetAdministratorName
     * @param {object} objContext objContext
     * @summary generates Administrator name for TestPropertyDisplay
     * @returns {string} Name of User TestPropertyDisplay
     */
    GetAdministratorName(strUserId, objContext) {
        var arrIntranetadministrators = DataRef(objContext.props.Object_Intranet_Member_IntranetAdministrator)["Data"];
        var objIntranetadministrator = arrIntranetadministrators.find(objIntranetadministrator => {
            return objIntranetadministrator["uMainClientUserId"] == strUserId
        })
        let strAdministratorName = objIntranetadministrator ? objIntranetadministrator["vFirstName"] + " " + objIntranetadministrator["vName"] : "";
        return strAdministratorName;
    }

    /**
   * @name OnDoubleClick
   * @param {any} objRow
   * @param {any} objContext
   * @return {bool} Handles the double event
   */
    OnDoubleClick(objRow, objContext) {
        if (objRow.iTestFolderId) { //When folder is selected
            let fnSelectTreeNode = ApplicationState.GetProperty("SelectTreeNode") && ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] ? ApplicationState.GetProperty("SelectTreeNode")["Tree_Master"] : null;
            if (fnSelectTreeNode) {
                fnSelectTreeNode(objRow);
            }
            let arrExpandedNodes = ApplicationState.GetProperty("ExpandedNodes") && ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"] ? ApplicationState.GetProperty("ExpandedNodes")["Tree_Master"] : [];
            let fnExpandTreeNode = ApplicationState.GetProperty("ExpandTreeNodes") && ApplicationState.GetProperty("ExpandTreeNodes")["Tree_Master"] ? ApplicationState.GetProperty("ExpandTreeNodes")["Tree_Master"] : null;
            if (fnExpandTreeNode) {
                fnExpandTreeNode([...arrExpandedNodes, objRow]);
            }
            ApplicationState.SetProperty("FolderId", objRow.iTestFolderId);
        }
        else {//When task is selected
            this.OpenAddEditPopup(objContext, "", true, objRow);
        }
    }

    /**
     * @name Search
     * @param {object} objContext objContext
     * @param {object} objDetails object with Search input details
     * @summary Handles Test Search
     * @return {null} 
     */
    Search(objContext, objDetails) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": true } });
        var objWildcard = {
            "wildcard": {
                "vTestName": "*" + objDetails.strSearchText.toLowerCase() + "*"
            }
        };
        var objFolderMatch = {
            "match": {
                "iFolderId": objContext.props.FolderId
            }
        };
        let objTestTypeMatch = {
            "nested": {
                "path": "t_TestDrive_Test_TestProperty",
                "query": {
                    "bool": {
                        "must": [
                            {
                                "match": {
                                    "t_TestDrive_Test_TestProperty.iTestUsageId": objDetails.strTestUsageId
                                }
                            }
                        ]
                    }
                }
            }
        };
        let objIsInternalTestingMatch = {
            "nested": {
                "path": "t_TestDrive_Test_TestProperty",
                "query": {
                    "bool": {
                        "must": [
                            {
                                "match": {
                                    "t_TestDrive_Test_TestProperty.cIsForInternalTesting": objDetails.blnInternalTesting ? "Y" : "N"
                                }
                            }
                        ]
                    }
                }
            }
        }

        let objParams = {};
        if (objDetails.blnSearchFromSameFolder) {
            if (objDetails.strTestUsageId != -1) {
                objParams = {
                    "SearchQuery": {
                        "must": [objWildcard, objFolderMatch, objTestTypeMatch, objIsInternalTestingMatch]
                    }
                };
            }
            else {
                objParams = {
                    "SearchQuery": {
                        "must": [objWildcard, objFolderMatch, objIsInternalTestingMatch]
                    }
                };
            }
        }
        else {
            if (objDetails.strTestUsageId != -1) {
                objParams = {
                    "SearchQuery": {
                        "must": [objWildcard, objTestTypeMatch, objIsInternalTestingMatch]
                    }
                };
            }
            else {
                objParams = {
                    "SearchQuery": {
                        "must": [objWildcard, objIsInternalTestingMatch]
                    }
                };
            }
        }
                
        let arrDataRequest = [
            {
                "URL": "API/Object/Intranet/Test/IntranetTest",
                "Params": objParams,
                "MethodType": "Get",
            }
        ];

        let arrFolderData = objDetails.blnSearchFromSameFolder ? DataRef(objContext.props.Object_Intranet_Test_TestFolder)["Data"].filter(obj => obj["iTestParentFolderId"] == objContext.props.FolderId && obj["cIsDeleted"] == "N") : DataRef(objContext.props.Object_Intranet_Test_TestFolder)["Data"];
        arrFolderData = arrFolderData ? arrFolderData : [];
        if (objDetails.strSearchText != "") {
            arrFolderData = arrFolderData.filter(objFolderData => objFolderData["vTestFolderName"].toLowerCase().includes(objDetails.strSearchText.toLowerCase()))
        }
        if (arrFolderData?.length > 0)
            GetObjectListForModule("Test", objContext, true, arrFolderData);

        ArcadixFetchData.Execute(arrDataRequest, function (objReturn, blnIsDataPresent) {
            if (blnIsDataPresent) {
                let arrFilterdTestData = Object.values(objReturn.Object_Intranet_Test_IntranetTest)[0].Data ? Object.values(objReturn.Object_Intranet_Test_IntranetTest)[0].Data : objReturn.Object_Intranet_Test_IntranetTest["Data"];                                
                objContext.dispatch({ type: "SET_STATE", payload: { "arrFilterdTestData": [...arrFolderData, ...arrFilterdTestData] } });
                setTimeout(() => {
                    ApplicationState.SetProperty("blnShowAnimation", false);
                }, 500)
            }
        });
    }

    SearchCancel(objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchMode": false } });
    }

    HandleChange(objContext, objValue, strType) {
        switch (strType) {
            case "SearchInput":
                objContext.dispatch({ type: "SET_STATE", payload: { "strSearchText": objValue, "blnSearchMode": false } });
                break;
            case "SearchOption":
                objContext.dispatch({ type: "SET_STATE", payload: { "blnSearchFromSameFolder": Boolean(Number(objValue["OptionId"])), "blnSearchMode": false } });
                break;
            case "TestType":
                objContext.dispatch({ type: "SET_STATE", payload: { "strTestUsageId": objValue["OptionId"], "blnSearchMode": false } });
                break;
            case "InternalTesting":
                objContext.dispatch({ type: "SET_STATE", payload: { "blnInternalTesting": objValue, "blnSearchMode": false } });
                break;
        }
    }

    GetSearchDropDownData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props);
        var arrDropDownData = [
            {
                "OptionId": 1,
                "OptionText": objTextResource["This_Folder"]
            },
            {
                "OptionId": 0,
                "OptionText": objTextResource["All_Folder"]
            }
        ]
        return arrDropDownData;
    }

    GetTestTypeDropDownData(objContext) {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props);

        var arrDropDownData = [
            {
                "OptionId": 1,
                "OptionText": Localization.TextFormatter(objTextResource, "HighStake")
            },
            {
                "OptionId": 3,
                "OptionText": Localization.TextFormatter(objTextResource, "Learn")

            },
            {
                "OptionId": 2,
                "OptionText": Localization.TextFormatter(objTextResource, "LowStake")
            },
            {
                "OptionId": 4,
                "OptionText": Localization.TextFormatter(objTextResource, "Survey")
            },
            {
                "OptionId": 7,
                "OptionText": Localization.TextFormatter(objTextResource, "Demo")
            },
            {
                "OptionId": 6,
                "OptionText": Localization.TextFormatter(objTextResource, "Presentation")
            },
            {
                "OptionId": 0,
                "OptionText": Localization.TextFormatter(objTextResource, "ShowCase") + " (-NI-)"
            },
            {
                "OptionId": 0,
                "OptionText": Localization.TextFormatter(objTextResource, "PaperPencil") + " (-NI-)"
            },
            {
                "OptionId": 0,
                "OptionText": Localization.TextFormatter(objTextResource, "WrapperTest") + " (-NI-)"
            }
        ]
        return arrDropDownData;
    }

    PasteFolder(objContext, strFolderId) {
        let objCutCopySource = ApplicationState.GetProperty("CutCopySource")["Test"];
        let arrFetchParams =
        {
            ["SourceData"]: objCutCopySource["Data"],
            ["DestinationId"]: strFolderId,
            ["uUserId"]: objContext.props.ClientUserDetails.UserId
        };
        if (objCutCopySource.Type == "Cut") {
            ArcadixFetchData.ExecuteCustom("API/Object/Intranet/Test/CutCopyPaste/CutPaste", "Post", arrFetchParams).then(response => response.json()).then(objResopnse => {
                ApplicationState.SetProperty("blnShowAnimation", false);
                ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Test": null });
                //ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), "Tree_Master": objReturn[0] });
                ArcadixCacheData.EditData("Object_Intranet_Test_TestFolder", {
                    "Value": {
                        "Data": objResopnse.CutPaste.Data,
                        "PrimaryKeyName": "iTestFolderId"
                    }
                });
                ArcadixCacheData.DeleteEntity("Object_Intranet_Test_IntranetTest");
                ApplicationState.SetProperty("FolderId", strFolderId);
                let objDestinationFolder = DataRef(objContext.props.Object_Intranet_Test_TestFolder)["Data"].find(obj => obj["iTestFolderId"] == strFolderId);
                ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["Tree_Master"]: objDestinationFolder });
            })
        }
        else {

            ArcadixFetchData.ExecuteCustom("API/Object/Intranet/Test/CutCopyPaste/CopyPaste", "Post", arrFetchParams).then(response => response.json()).then(objResopnse => {
                ApplicationState.SetProperty("blnShowAnimation", false);
                ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Test": null });
                ApplicationState.SetProperty("FolderId", strFolderId);
                ArcadixCacheData.AddData("Object_Intranet_Test_TestFolder", { "Value": { "Data": objResopnse.CopyPaste.Data } });
                ArcadixCacheData.DeleteEntity("Object_Intranet_Test_IntranetTest");
                let objDestinationFolder = DataRef(objContext.props.Object_Intranet_Test_TestFolder)["Data"].find(obj => obj["iTestFolderId"] == strFolderId);
                ApplicationState.SetProperty("SelectedNode", { ...ApplicationState.GetProperty("SelectedNode"), ["Tree_Master"]: objDestinationFolder });
            });
        }
    }

    PrintToPdf(objContext, objRowData, strLanguageId) {
        let strEventName = objRowData.vTestName + "_" + Date.now() + "_" + objContext.props.ClientUserDetails.UserId;
        //ApplicationState.SetProperty("vTestPdfName", strEventName);
        Popup.ShowPopup({
            Data: {
                HeaderTitle: "Title",
                RowData: objRowData,
                SelectedLanguageId: strLanguageId,
                ExecutionName: strEventName// "GenerateTestPdf"
            },
            Meta: {
                PopupName: 'GenerateTestPdf',
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                Height: 'auto',
                Width: 450,
                CssClassName: 'generate-test-pdf',
            },
            Resource: {
                Text: {
                    GenerateTestPdf_Title: "Print output",
                    GenerateTestPdf_Subtitle: "Generate print output"
                },// Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objContext.props),
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                TextResourcesKey: "GenerateTestPdf",

            },
            Events: {},
            CallBacks: {},
            ParentProps: objContext.props,
        });
    }

    RegisterOfflineEvent(objContext, objRowData, strEventName) {
        let objSignalR = new SignalRClass();
        objSignalR.ConnectToHub(objContext);
        objSignalR.EventListener(strEventName, (objResponse) => {
            let objData = JSON.parse(objResponse).Data;
            if (objData) {
                let arrOfflineData = ApplicationState.GetProperty("OfflineExecutionData") ? ApplicationState.GetProperty("OfflineExecutionData") : [];
                let arrModfiedOfflineExecution;
                if (arrOfflineData.find(obj => obj.uOfflineProcessExecutionId == objData.uOfflineProcessExecutionId)) {
                    arrModfiedOfflineExecution = arrOfflineData.map(obj => obj.uOfflineProcessExecutionId == objData.uOfflineProcessExecutionId ? objData : obj);
                }
                else{
                    arrModfiedOfflineExecution = [...arrOfflineData, objData];
                }
                //objContext.dispatch({ type: "SET_STATE", payload: { "OfflineExecutionData": arrModfiedOfflineExecution } });
                ApplicationState.SetProperty("OfflineExecutionData", arrModfiedOfflineExecution);
            }
        });
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        let arrSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TestGrid"] : [];
        var objRibbonData = {
            objContext,
            "AddTest": (strTestType) => objContext.Test_ModuleProcessor.OpenAddEditPopup(objContext, strTestType, false),
            "EditTest": () => objContext.Test_ModuleProcessor.OpenAddEditPopup(objContext, "", true),
            "DeletePopup": () => objContext.Test_ModuleProcessor.OpenDeletePopup(objContext),
            "CutTest": () => { ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Test": { "Type": "Cut", "Data": [arrSelectedRows[0] ?? {} ] } }) },
            "CopyTest": () => {
                ApplicationState.SetProperty("CutCopySource", { ...ApplicationState.GetProperty("CutCopySource"), "Test": { "Type": "Copy", "Data": [arrSelectedRows[0] ?? {} ] } })
            },
            "PasteFolder": () => objContext.Test_ModuleProcessor.PasteFolder(objContext, arrSelectedRows[0]?.iTestFolderId),
        };
        ApplicationState.SetProperty("OfficeRibbonData", Test_OfficeRibbon.GetOfficeRibbonData(objRibbonData));
    } 

    ///**
    // * @name GetOfflineData
    // * @param {any} strProcessKeyWord
    // */
    //GetOfflineData(objContext, strProcessKeyWord) {
    //    let objSearchQuery =
    //    {
    //        ["SearchQuery"]: {
    //            ["must"]: [
    //                {
    //                    ["match"]: {
    //                        ["t_TestDrive_OfflineProcess_Definition.vOfflineProcessKeyword"]: strProcessKeyWord
    //                    }
    //                },
    //                {
    //                    ["match"]: {
    //                        ["uUserId"]: objContext.props.ClientUserDetails.UserId
    //                    }
    //                }
    //            ]
    //        }
    //    };

    //    let objEntityLogDataParams = [
    //        {
    //            ["URL"]: "API/Object/Cockpit/OfflineProcess/OfflineProcessExecution",
    //            ["Params"]: objSearchQuery,
    //            ["UseFullName"]: true
    //        }];
    //    let arrExecutionData;
    //    ArcadixFetchData.Execute(objEntityLogDataParams, (response) => {
    //        arrExecutionData = response["Object_Cockpit_OfflineProcessExecution"]['Object_Cockpit_OfflineProcessExecution;t_TestDrive_OfflineProcess_Definition.vOfflineProcessKeyword;' + strProcessKeyWord + ";uUserId;" + objContext.props.ClientUserDetails.UserId]["Data"]
    //        //ApplicationState.SetProperty("OfflineExecutionData", arrExecutionData.filter(objData => objData.iProgressValue != null && objData.iProgressValue != 100 || objData.cIsViewed != null && objData.cIsViewed != "Y"));
    //        ApplicationState.SetProperty("OfflineExecutionData", arrExecutionData);
    //        arrExecutionData.map(objExecutionData => {
    //            if (objExecutionData.iProgressValue != 100) {
    //                let objParams = JSON.parse(objExecutionData["vParameters"]);
    //                this.RegisterOfflineEvent(objContext, {}, objParams.Event);
    //            }                
    //        });
    //    });
        
    //}

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
      */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Grid/Grid.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/Dropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/HierarchicalDropdown/HierarchicalDropdown.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/3_Test/Test/IntranetTest/AddEditTest/AddEditTest.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/3_Test/Test/TestActions/AssignTaskToTest/AssignTaskToTest.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/3_Test/Test/IntranetTest/TestPropertyDetails/TestPropertyDetails.css",
        ];
    }
}

export default Test_ModuleProcessor;