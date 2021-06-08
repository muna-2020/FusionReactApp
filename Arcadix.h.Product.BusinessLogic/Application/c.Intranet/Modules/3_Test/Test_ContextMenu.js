
/**
 * @name GetTreeTestFolderContextMenuData
 * @param {object} objData takes objData
 * @summary Get data to initialize ContextMenu for TestFolder in Tree
 * @returns {array} array
 */
export function GetTreeTestFolderContextMenuData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objData.objContext.props);
    let blnCutOptionDisabled = ApplicationState.GetProperty("CutCopySource")["Test"] && ApplicationState.GetProperty("CutCopySource")["Test"]["Type"] == "Cut";
    let blnCopyOptionDisabled = ApplicationState.GetProperty("CutCopySource")["Test"] && ApplicationState.GetProperty("CutCopySource")["Test"]["Type"] == "Copy";
    var arrTreeContextMenuData = [
        {
            ParentId: 0,
            Id: 1,
            Text: objTextResource.TreeContextMenu1,
            ClickEvent: () => objData.AddTestFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddFolder.png",
        },
        {
            ParentId: 0,
            Id: 2,
            Text: objTextResource.TreeContextMenu2,
            ClickEvent: () => objData.EditTestFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Properties.png",
        },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.TreeContextMenu3,
            Disabled: blnCopyOptionDisabled,
            ClickEvent: objData.CopyFolder,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Copy.png",
        },
        {
            ParentId: 0,
            Id: 4,
            Text: objTextResource.TreeContextMenu4,
            ClickEvent: objData.CutFolder,
            Disabled: blnCutOptionDisabled,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Cut.png",
        },
        {
            ParentId: 0,
            Id: 5,
            Text: objTextResource.TreeContextMenu5,
            ClickEvent: (strFolderId) => objData.PasteFolder(strFolderId),
            Disabled: !(blnCutOptionDisabled || blnCopyOptionDisabled),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Paste.gif",
        },
        {
            ParentId: 0,
            Id: 6,
            Text: objTextResource.TreeContextMenu6,
            ClickEvent: () => objData.DeleteTestFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Erase.png",
        },


    ];
    return arrTreeContextMenuData;
}

/**
 * @name GetGridTestFolderContextMenuData
 * @param {object} objData takes objData
 * @summary Get data to initialize ContextMenu for TestFolder in Grid
 * @returns {array} array
 */
export function GetGridTestFolderContextMenuData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objData.objContext.props);
    let blnCutOptionDisabled = ApplicationState.GetProperty("CutCopySource")["Test"] && ApplicationState.GetProperty("CutCopySource")["Test"]["Type"] == "Cut";
    let blnCopyOptionDisabled = ApplicationState.GetProperty("CutCopySource")["Test"] && ApplicationState.GetProperty("CutCopySource")["Test"]["Type"] == "Copy";
    var arrGridContextMenuData = [
        {
            ParentId: 0,            
            Text: objTextResource.ContextMenu0 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif"
        },
        {
            ParentId: 0,
            Id: 1,
            Text: objTextResource.GridContextMenu1,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 1,
            Id: '1.1',
            Text: objTextResource.GridContextMenu1_1,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: '1.1',
            Id: '1.1.1',
            Text: objTextResource.GridContextMenu1_1_1,
            ClickEvent: () => objData.AddTest("Wrapper"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: '1.1',
            Id: '1.1.2',
            Text: objTextResource.GridContextMenu1_1_2,
            ClickEvent: () => objData.AddTest("Survey"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 1,
            Id: '1.2',
            Text: objTextResource.GridContextMenu1_2,
            ClickEvent: () => objData.AddTest("Presentation"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 2,
            Id: '1.3',
            Text: objTextResource.GridContextMenu1_3,
            ClickEvent: () => objData.AddTest("Learning"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 1,
            Id: '1.4',
            Text: objTextResource.GridContextMenu1_4,
            ClickEvent: () => objData.AddTest("LowStake"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 1,
            Id: '1.5',
            Text: objTextResource.GridContextMenu1_5 + "(-NI-)",
            //Event: () => objData.AddTest("Demo"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.GridContextMenu2,
            ClickEvent: () => objData.AddTestFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddFolder.png",
        },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.GridContextMenu3,
            ClickEvent: () => objData.EditTestFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Properties.png",
        },
        {
            ParentId: 0,
            Id: 4,
            Text: objTextResource.GridContextMenu4,
            ClickEvent: objData.CutFolder,
            Disabled: blnCutOptionDisabled,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Cut.png",
        },
        {
            ParentId: 0,
            Id: 5,
            Text: objTextResource.GridContextMenu5,
            Disabled: blnCopyOptionDisabled,
            ClickEvent: objData.CopyFolder,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Copy.png",
        },      
        {
            ParentId: 0,
            Id: 6,
            Text: objTextResource.GridContextMenu6,
            ClickEvent: (strFolderId) => objData.PasteFolder(strFolderId),
            Disabled: !(blnCutOptionDisabled || blnCopyOptionDisabled),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Paste.gif",
        },
        {
            ParentId: 0,
            Id: 7,
            Text: objTextResource.GridContextMenu7,
            ClickEvent: () => objData.DeleteTestFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Erase.png",
        }
    ];
    return arrGridContextMenuData;
}

/**
 * @name GetTestContextMenuData
 * @param {object} objData takes objData
 * @summary Get data to initialize ContextMenu for TestFolder in Test
 * @returns {array} array
 */
export function GetTestContextMenuData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objData.objContext.props);
    let blnCutOptionDisabled = ApplicationState.GetProperty("CutCopySource")["Test"] && ApplicationState.GetProperty("CutCopySource")["Test"]["Type"] == "Cut";
    let blnCopyOptionDisabled = ApplicationState.GetProperty("CutCopySource")["Test"] && ApplicationState.GetProperty("CutCopySource")["Test"]["Type"] == "Copy";
    var objSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows")["TestGrid"][0] : [];
    var Testusage = objData.objContext.Test_ModuleProcessor.GetTestUsage(objSelectedRows, objData.objContext) ;
    var arrTestContextMenuData = [
        {
            ParentId: 0,            
            Text: objTextResource.ContextMenu0 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif"
        },
        {
            ParentId: 0,
            Id: 1,
            Text: objTextResource.TestContextMenu1,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 1,
            Id: '1.1',
            Text: objTextResource.TestContextMenu1_1,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: '1.1',
            Id: '1.1.1',
            Text: objTextResource.TestContextMenu1_1_1,
            ClickEvent: () => objData.AddTest("Wrapper"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: '1.1',
            Id: '1.1.3',
            Text: objTextResource.TestContextMenu1_1_2,
            ClickEvent: () => objData.AddTest("Survey"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 1,
            Id: '1.2',
            Text: objTextResource.TestContextMenu1_2,
            ClickEvent: () => objData.AddTest("Presentation"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 1,
            Id: '1.3',
            Text: objTextResource.TestContextMenu1_3,
            ClickEvent: () => objData.AddTest("Learning"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 1,
            Id: '1.4',
            Text: objTextResource.TestContextMenu1_4,
            ClickEvent: () => objData.AddTest("LowStake"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 1,
            Id: '1.5',
            Text: objTextResource.TestContextMenu1_5 + "(-NI-)",
            //Event: () => objData.AddTest("Demo"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 1,
            Id: '1.6',
            Text: objTextResource.TestContextMenu1_6,
            ClickEvent: () => objData.AddTest("External"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 0,
            Id: 2,
            Text: objTextResource.TestContextMenu2,
            ClickEvent: () => objData.EditTest(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Edit.gif",
        },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.TestContextMenu3,
            ClickEvent: () => objData.AddTestFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 0,
            Id: 4,
            Type: "separator",
        },
        {
            ParentId: 0,
            Id: 5,
            Text: objTextResource.TestContextMenu4,
            ClickEvent: objData.CutTest,
            Disabled: blnCutOptionDisabled,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Cut.png",
        },
        {
            ParentId: 0,
            Id: 6,
            Text: objTextResource.TestContextMenu5,
            Disabled: blnCopyOptionDisabled,
            ClickEvent: objData.CopyTest,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Copy.png",
        },        
        {
            ParentId: 0,
            Id: 7,
            Text: objTextResource.TestContextMenu6,
            ClickEvent : ()=> objData.DeleteTest(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Erase.png",
        },
        {
            ParentId: 0,
            Id: 8,
            Type: "separator",
        },
        {
            ParentId: 0,
            Id: 9,
            Text: objTextResource.TestContextMenu7 ,
            ClickEvent: () => objData.OnTestTaskPropertiesClick(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/EditTaskTimeLimit.gif",
        },
        {
            ParentId: 0,
            Id: 10,
            Text: objTextResource.TestContextMenu8 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/TestPreview.gif",
        },
        {
            ParentId: 10,
            Id: '10.1',
            Text: objTextResource.TestContextMenu8 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/TestPreview.gif",
        },
        {
            ParentId: 10,
            Id: '10.2',
            Text: objTextResource.TestContextMenu8_2 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/TestPreview.gif",
        },
        {
            ParentId: 0,
            Id: 11,
            Type: "separator",
        },
        {
            ParentId: 0,
            Id: 12,
            Text: objTextResource.TestContextMenu9,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.gif",
        },
        {
            ParentId: 12,
            Id: '12.1',
            Text: objTextResource.TestContextMenu9_1,
            ClickEvent: () => objData.PrintToPdf(JConfiguration.InterfaceLanguageId),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.gif",
        },
        ...GetMultiLanguageOptions(objData, '12.1', objData.PrintToPdf, ""),
        {
            ParentId: 12,
            Id: '12.2',
            Text: objTextResource.TestContextMenu9_2 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.gif",
        },
        {
            ParentId: 0,
            Id: 13,
            Text: objTextResource.TestContextMenu10 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/ExportToExcel.gif",
        }, 
        {
            ParentId: 0,
            Id: 14,
            Text: objTextResource.TestContextMenu11,
            ClickEvent: () => objData.AssignTasksToTest(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AssignTaskToTest.gif",
        }, 
        {
            ParentId: 0,
            Id: 20,
            Text: objTextResource.TestContextMenu20,
            HideMenu: (!(Testusage == objTextResource.Presentation) ? true : false),
            ClickEvent: () => objData.AssignTestNavigation(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AssignTaskToTest.gif",
        }, 
        {
            ParentId: 0,
            Id: 15,
            Text: objTextResource.TestContextMenu12 ,
            ClickEvent: () => objData.OnTestControlPreviewClick(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/TestPreview.gif",
        }, 
        {
            ParentId: 0,
            Id: 16,
            Text: objTextResource.TestContextMenu13,
            ClickEvent: () => objData.OnTestPreviewClick(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/TestPreview.gif",
        },
        {
            ParentId: 0,
            Id: 17,
            Text: objTextResource.TestContextMenu14 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/TestPreview.gif",
        },
        {
            ParentId: 0,
            Id: 18,
            Text: objTextResource.TestContextMenu15 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/ExportTestTaskForTranslation.gif",
        },
        {
            ParentId: 18,
            Id: '18.1',
            Text: objTextResource.TestContextMenu15_1 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/ReplicateTestTask.gif",
        },
        {
            ParentId: 18,
            Id: '18.2',
            Text: objTextResource.TestContextMenu15_2 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/ExportTestTaskForTranslation.gif",
        },
        {
            ParentId: 18,
            Id: '18.3',
            Text: objTextResource.TestContextMenu15_3 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Copy.gif",
        },
        {
            ParentId: 0,
            Id: 19,
            Text: objTextResource.TestContextMenu16 ,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
       
        {
            ParentId: 19,
            Id: '19.1',
            Text: objTextResource.Demo ,
            HideMenu: Testusage == objTextResource.Demo ? true : false,
            ClickEvent: () => objData.ConvertTestType("Demo"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 19,
            Id: '19.2',
            Text: objTextResource.Test ,
            HideMenu: Testusage == objTextResource.Test ? true : false,
            ClickEvent: () => objData.ConvertTestType("Test"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 19,
            Id: '19.3',
            Text: objTextResource.Adaptive ,
            HideMenu: Testusage == objTextResource.Adaptive ? true : false,
            ClickEvent: () => objData.ConvertTestType("Adaptive"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 19,
            Id: '19.4',
            Text: objTextResource.Shell ,
            HideMenu: Testusage == objTextResource.Shell ? true : false,
            ClickEvent: () => objData.ConvertTestType("Shell"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 19,
            Id: '19.5',
            Text: objTextResource.Presentation ,
            HideMenu: Testusage == objTextResource.Presentation ? true : false,
            ClickEvent: () => objData.ConvertTestType("Presentation"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 19,
            Id: '19.6',
            Text: objTextResource.Learn ,
            HideMenu: Testusage == objTextResource.Learn ? true : false,
            ClickEvent: () => objData.ConvertTestType("Learn"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 19,
            Id: '19.7',
            Text: objTextResource.External ,
            HideMenu: Testusage == objTextResource.External ? true : false,
            ClickEvent: () => objData.ConvertTestType("External"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 19,
            Id: '19.8',
            Text: objTextResource.Survey ,
            HideMenu: Testusage == objTextResource.Survey ? true : false,
            ClickEvent: () => objData.ConvertTestType("Survey"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        },
        {
            ParentId: 19,
            Id: '19.8',
            Text: objTextResource.LowStake ,
            HideMenu: Testusage == objTextResource.LowStake ? true : false,
            ClickEvent: () => objData.ConvertTestType("LowStake"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif",
        }
        
    ];
    return arrTestContextMenuData;
}

/**
 * @name GetMultiLanguageOptions
 * @param {any} objData
 * @param {any} intParentId
 * @param {any} fnOnClickEvent
 * @param {any} strPreviewType
 * @summary Gets multi language ribbon options for Editor
 * @returns {array} array
 */
function GetMultiLanguageOptions(objData, intParentId, fnOnClickEvent, strPreviewType) {
    let arrContextOptions = objData.MultiLanguageData.map((objLanguage, intIndex) => {
        let objDefaultLanguage = objLanguage.t_Framework_Language_Data.find(objLang => objLang.iLanguageId == JConfiguration.InterfaceLanguageId);
        return {
            ParentId: intParentId,
            Id: intParentId + "." + (intIndex + 1),
            Text: objDefaultLanguage.vLanguageName,
            ClickEvent: () => {
                fnOnClickEvent(objLanguage.iFrameworkLanguageId, strPreviewType);
            }
        }
    })
    return objData.MultiLanguageData.length > 1 ? arrContextOptions : [];
}