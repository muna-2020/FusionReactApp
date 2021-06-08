
/**
 * @name GetTaskContextMenuData
 * @param {object} objData takes objData
 * @summary Get data to initialize ContextMenu for Task
 * @returns {array} array
 */
export function GetTaskContextMenuData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objData.objContext.props);
    let blnCutOptionDisable = ApplicationState.GetProperty("CutCopySource")["Task"] && ApplicationState.GetProperty("CutCopySource")["Task"]["Type"] == "Cut";
    let blnCopyOptionDisable = ApplicationState.GetProperty("CutCopySource")["Task"] && ApplicationState.GetProperty("CutCopySource")["Task"]["Type"] == "Copy";
    return [

        {
            ParentId: 0,
            Id: '0.1',
            Text: objTextResource.ContextMenu0 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif"
        },
        {
            ParentId: 0,
            Id: 1,
            Text: objTextResource.ContextMenu1,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: 1,
            Id: '1.1',
            Text: objTextResource.ContextMenu1_1,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: '1.1',
            Id: '1.1.1',
            Text: objTextResource.ContextMenu1_1_1,
            ClickEvent: () => objData.OpenAddEditTaskPopup("Demo"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: '1.1',
            Id: '1.1.2',
            Text: objTextResource.ContextMenu1_1_2,
            ClickEvent: () => objData.OpenAddEditTaskPopup("HighStakeIntro"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: '1.1',
            Id: '1.1.3',
            Text: objTextResource.ContextMenu1_1_3,
            ClickEvent: () => objData.OpenAddEditTaskPopup("HighStakeBreak"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: '1.1',
            Id: '1.1.4',
            Text: objTextResource.ContextMenu1_1_4,
            ClickEvent: () => objData.OpenAddEditTaskPopup("HighStakeSurvey"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: '1.1',
            Id: '1.1.5',
            Text: objTextResource.ContextMenu1_1_5,
            ClickEvent: () => objData.OpenAddEditTaskPopup("HighStakeSurveyList"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: 1,
            Id: '1.2',
            Text: objTextResource.ContextMenu1_2,
            ClickEvent: () => objData.OpenAddEditTaskPopup("Learning"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: 1,
            Id: '1.3',
            Text: objTextResource.ContextMenu1_3 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: 1,
            Id: '1.4',
            Text: objTextResource.ContextMenu1_4,
            ClickEvent: () => objData.OpenAddEditTaskPopup("LowStake"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: 0,
            Id: 2,
            Text: objTextResource.ContextMenu2,
            ClickEvent: () => objData.AddTaskFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddFolder.png",

        },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.ContextMenu3,
            ClickEvent: () => objData.OpenAddEditTaskPopup("", true),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Properties.png"

        },
        objData.IsSearch ? {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.GoToFolder,
            ClickEvent: () => objData.GoToFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/GoToFolder.png",
        } : {},
        {
            ParentId: 0,
            Id: 4,
            Text: objTextResource.ContextMenu4,
            ClickEvent: objData.CutTask,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Cut.png",
        },
        {
            ParentId: 0,
            Id: 5,
            Text: objTextResource.ContextMenu5,
            ClickEvent: objData.CopyTask,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Copy.png",
        },
        {
            ParentId: 0,
            Id: 6,
            Text: objTextResource.ContextMenu6,
            ClickEvent: () => objData.DeleteTask(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Erase.png",
        },
        {
            ParentId: 0,
            Id: 7,
            Text: objTextResource.ContextMenu14,
            HideMenu: objData.TaskUsage == objTextResource.Survey || objData.TaskUsage == objTextResource.SurveyList || objData.TaskUsage == objTextResource.HighStakeSurvey || objData.TaskUsage == objTextResource.HighStakeSurveyList ? false : true,
            ClickEvent: () => objData.OnTaskQuestionClick(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PreviewNewWindow.png",
        },
        {
            ParentId: 0,
            Id: 8,
            Text: objTextResource.ContextMenu7,
            ClickEvent: () => objData.OpenTaskInEditor(JConfiguration.InterfaceLanguageId),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Load.png",
        },
        ...GetMultiLanguageOptions(objData, 8, objData.OpenTaskInEditor, ""),
        {
            ParentId: 0,
            Id: 9,
            Text: objTextResource.ContextMenu8,
            ClickEvent: () => objData.OnTaskPreviewClick(JConfiguration.InterfaceLanguageId, "SameWindow"),
            //Disable: !objData.IsShowTaskPreview,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/TaskPreview.png",
        },
        ...GetMultiLanguageOptions(objData, 9, objData.OnTaskPreviewClick, "SameWindow"),
        {
            ParentId: 0,
            Id: 10,
            Text: objTextResource.ContextMenu9,
            ClickEvent: () => objData.OnTaskPreviewClick(JConfiguration.InterfaceLanguageId, "NewWindow"),
            //Disable: !objData.IsShowTaskPreview,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PreviewNewWindow.png",
        },
        ...GetMultiLanguageOptions(objData, 10, objData.OnTaskPreviewClick, "NewWindow"),
        {
            ParentId: 0,
            Id: 11,
            Text: objTextResource.ContextMenu10,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.png",
        },
        {
            ParentId: 11,
            Id: '11.1',
            Text: objTextResource.ContextMenu10_1,
            ClickEvent: () => objData.OnGenerateTaskPdfClick(JConfiguration.InterfaceLanguageId),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.png",
        },
        ...GetMultiLanguageOptions(objData, '11.1', objData.OnGenerateTaskPdfClick, ""),
        {
            ParentId: 11,
            Id: '11.2',
            Text: objTextResource.ContextMenu10_2 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.png",
        },
        {
            ParentId: 0,
            Id: 12,
            Text: objTextResource.ContextMenu11,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 12,
            Id: '12.1',
            Text: objTextResource.ContextMenu11_12,
            HideMenu: objData.TaskUsage == objTextResource.Presentation ? true : false,
            ClickEvent: () => objData.ConvertTaskType("Presentation"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 12,
            Id: '12.2',
            Text: objTextResource.ContextMenu11_1,
            HideMenu: objData.TaskUsage == objTextResource.Demo ? true : false,
            ClickEvent: () => objData.ConvertTaskType("Demo"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 12,
            Id: '12.3',
            Text: objTextResource.ContextMenu11_10,
            HideMenu: objData.TaskUsage == objTextResource.Learning ? true : false,
            ClickEvent: () => objData.ConvertTaskType("Learning"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 12,
            Id: '12.4',
            Text: objTextResource.ContextMenu11_11,
            HideMenu: objData.TaskUsage == objTextResource.LowStake ? true : false,
            ClickEvent: () => objData.ConvertTaskType("LowStake"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 12,
            Id: '12.5',
            Text: objTextResource.ContextMenu11_2,
            HideMenu: objData.TaskUsage == objTextResource.HighStake ? true : false,
            ClickEvent: () => objData.ConvertTaskType("HighStake"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },       
        {
            ParentId: 12,
            Id: '12.6',
            Text: objTextResource.ContextMenu11_3,
            HideMenu: objData.TaskUsage == objTextResource.HighStakeExample ? true : false,
            ClickEvent: () => objData.ConvertTaskType("HighStakeExample"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 12,
            Id: '12.7',
            Text: objTextResource.ContextMenu11_4,
            HideMenu: objData.TaskUsage == objTextResource.HighStakeIntro ? true : false,
            ClickEvent: () => objData.ConvertTaskType("HighStakeIntro"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 12,
            Id: '12.8',
            Text: objTextResource.ContextMenu11_5,
            ClickEvent: () => objData.ConvertTaskType("HighStakeBreak"),
            HideMenu: objData.TaskUsage == objTextResource.HighStakeBreak ? true : false,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 12,
            Id: '12.9',
            Text: objTextResource.ContextMenu11_6,
            HideMenu: objData.TaskUsage == objTextResource.HighStakeSurvey ? true : false,
            ClickEvent: () => objData.ConvertTaskType("HighStakeSurvey"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 12,
            Id: '12.10',
            Text: objTextResource.ContextMenu11_7,
            HideMenu: objData.TaskUsage == objTextResource.HighStakeSurveyList ? true : false,
            ClickEvent: () => objData.ConvertTaskType("HighStakeSurveyList"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 12,
            Id: '12.11',
            Text: objTextResource.ContextMenu11_13,
            HideMenu: objData.TaskUsage == objTextResource.HighStakeAdaptive ? true : false,
            ClickEvent: () => objData.ConvertTaskType("HighStakeAdaptive"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 12,
            Id: '12.12',
            Text: objTextResource.ContextMenu11_8,
            HideMenu: objData.TaskUsage == objTextResource.Survey ? true : false,
            ClickEvent: () => objData.ConvertTaskType("Survey"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 12,
            Id: '12.13',
            Text: objTextResource.ContextMenu11_9,
            HideMenu: objData.TaskUsage == objTextResource.SurveyList ? true : false,
            ClickEvent: () => objData.ConvertTaskType("SurveyList"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",
        },
        {
            ParentId: 0,
            Id: 13,
            Text: objTextResource.ContextMenu12 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PreviewNewWindow.png",
        },
        {
            ParentId: 0,
            Id: 14,
            Text: objTextResource.ContextMenu13 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/document-export.gif",
        }
    ];
}

/**
 * @name GetTreeTaskFolderContextMenuData
 * @param {object} objData takes objData
 * @summary Get data to initialize ContextMenu for TaskFolder in Tree
 * @returns {array} array
 */
export function GetTreeTaskFolderContextMenuData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objData.objContext.props);
    let blnCutOptionDisable = ApplicationState.GetProperty("CutCopySource")["Task"] && ApplicationState.GetProperty("CutCopySource")["Task"]["Type"] == "Cut";
    let blnCopyOptionDisable = ApplicationState.GetProperty("CutCopySource")["Task"] && ApplicationState.GetProperty("CutCopySource")["Task"]["Type"] == "Copy";
    let arrMainClientLanguageData = objData.objContext.Task_ModuleProcessor.GetMultiLanguageData(objData.objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objData.objContext.props.Object_Cockpit_Language["Data"], objData.objContext.props.ClientUserDetails.ApplicationTypeId);
    var arrTreeContextMenuData = [
        {
            ParentId: 0,
            Id: 1,
            Text: objTextResource.TreeContextMenu1,
            ClickEvent: () => objData.AddTaskFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddFolder.png",
        },
        {
            ParentId: 0,
            Id: 2,
            Text: objTextResource.TreeContextMenu2,
            ClickEvent: () => objData.EditTaskFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Properties.png",
        },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.TreeContextMenu3,
            ClickEvent: objData.CutFolder,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Cut.png",
        },
        {
            ParentId: 0,
            Id: 4,
            Text: objTextResource.TreeContextMenu4,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Copy.png",
            ClickEvent: objData.CopyFolder,
        },
        {
            ParentId: 0,
            Id: 5,
            Text: objTextResource.TreeContextMenu5 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/ExportToExcel.gif",
        },
        {
            ParentId: 0,
            Id: 6,
            Text: objTextResource.TreeContextMenu6,
            ClickEvent: (strFolderId) => objData.PasteFolder(strFolderId),
            Disable: !blnCopyOptionDisable && !blnCutOptionDisable,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Paste.gif",
        },
        {
            ParentId: 0,
            Id: 7,
            Text: objTextResource.TreeContextMenu7,
            ClickEvent: () => objData.DeleteTaskFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Erase.png",
        },
        {
            ParentId: 0,
            Id: 8,
            Text: objTextResource.TreeContextMenu8,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/ExportToExcel.gif",
            ClickEvent: () => objData.TaskExportAsExcel()
        },
        {
            ParentId: 0,
            Id: 9,
            Text: objTextResource.TreeContextMenu9 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.png",
        },
        {
            ParentId: 9,
            Id: 9.1,
            Text: objTextResource.TreeContextMenu9_1 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.png",
        },
        {
            ParentId: 9,
            Id: 9.2,
            Text: objTextResource.TreeContextMenu9_2 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.png",
        },
        {
            ParentId: 0,
            Id: 10,
            Text: objTextResource.TreeContextMenu10,
            ClickEvent: arrMainClientLanguageData.length > 1? "": objData.ResetWorkflowStatus,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/ExportToExcel.gif",
        }
    ];
    if (arrMainClientLanguageData.length > 1) {
        arrTreeContextMenuData = [...arrTreeContextMenuData,...objData.objContext.Task_ModuleProcessor.GetResetWorkFlowChildData(objData, arrMainClientLanguageData)];
    }
    return arrTreeContextMenuData;
}

/**
 * @name GetGridTaskFolderContextMenuData
 * @param {object} objData takes objData
 * @summary Get data to initialize ContextMenu for TaskFolder in Grid
 * @returns {array} array
 */
export function GetGridTaskFolderContextMenuData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objData.objContext.props);
    let blnCutOptionDisable = ApplicationState.GetProperty("CutCopySource")["Task"] && ApplicationState.GetProperty("CutCopySource")["Task"]["Type"] == "Cut";
    let blnCopyOptionDisable = ApplicationState.GetProperty("CutCopySource")["Task"] && ApplicationState.GetProperty("CutCopySource")["Task"]["Type"] == "Copy";
    var arrTreeContextMenuData = [
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
            ClickEvent: (strFolderId) => objData.AddTaskFolder(strFolderId),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddFolder.png",
        },
        {
            ParentId: 0,
            Id: 2,
            Text: objTextResource.GridContextMenu2,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: 2,
            Id: '2.1',
            Text: objTextResource.GridContextMenu2_1,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: '2.1',
            Id: '2.1.1',
            Text: objTextResource.GridContextMenu2_1_1,
            ClickEvent: () => objData.OpenAddEditTaskPopup("Demo"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: '2.1',
            Id: '2.1.2',
            Text: objTextResource.GridContextMenu2_1_2,
            ClickEvent: () => objData.OpenAddEditTaskPopup("HighStakeIntro"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: '2.1',
            Id: '2.1.3',
            Text: objTextResource.GridContextMenu2_1_3,
            ClickEvent: () => objData.OpenAddEditTaskPopup("HighStakeBreak"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: '2.1',
            Id: '2.1.4',
            Text: objTextResource.GridContextMenu2_1_4,
            ClickEvent: () => objData.OpenAddEditTaskPopup("HighStakeSurvey"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: '2.1',
            Id: '2.1.5',
            Text: objTextResource.GridContextMenu2_1_5,
            ClickEvent: () => objData.OpenAddEditTaskPopup("HighStakeSurveyList"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: 2,
            Id: '2.2',
            Text: objTextResource.GridContextMenu2_2,
            ClickEvent: () => objData.OpenAddEditTaskPopup("Learning"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: 2,
            Id: '2.3',
            Text: objTextResource.GridContextMenu2_3,
            ClickEvent: () => objData.OpenAddEditTaskPopup("LowStake"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: 2,
            Id: '2.4',
            Text: objTextResource.GridContextMenu2_4 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png",

        },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.GridContextMenu3,
            ClickEvent: (strFolderId) => objData.EditTaskFolder(strFolderId),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Properties.png",
        },
        {
            ParentId: 0,
            Id: 4,
            Text: objTextResource.GridContextMenu4,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.png",
        },
        {
            ParentId: 4,
            Id: '4.1',
            Text: objTextResource.GridContextMenu4_1,
            ClickEvent: () => objData.OnGenerateTaskPdfClick(JConfiguration.InterfaceLanguageId),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.png",
        },
        ...GetMultiLanguageOptions(objData, '4.1', objData.OnGenerateTaskPdfClick, ""),
        {
            ParentId: 4,
            Id: 4.2,
            Text: objTextResource.GridContextMenu4_2 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.png",
        },
        {
            ParentId: 0,
            Id: 5,
            Text: objTextResource.GridContextMenu5,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/ExportToExcel.gif",
            ClickEvent: () => objData.TaskExportAsExcel()
        },
        {
            ParentId: 0,
            Id: 6,
            Text: objTextResource.GridContextMenu6 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/ExportToExcel.gif",
        },
        {
            ParentId: 0,
            Id: 7,
            Text: objTextResource.GridContextMenu7,
            ClickEvent: objData.CutFolder,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Cut.png",
        },
        {
            ParentId: 0,
            Id: 8,
            Text: objTextResource.GridContextMenu8 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/document-export.gif",
        },
        {
            ParentId: 8,
            Id: '8.1',
            Text: objTextResource.GridContextMenu8_1 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PreviewNewWindow.png",
        },
        {
            ParentId: 8,
            Id: '8.2',
            Text: objTextResource.GridContextMenu8_2 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/document-export.gif",
        },
        {
            ParentId: 0,
            Id: 9,
            Text: objTextResource.GridContextMenu9,
            ClickEvent: objData.CopyFolder,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Copy.png",
        },
        {
            ParentId: 0,
            Id: 10,
            Text: objTextResource.GridContextMenu10,
            Disable: !blnCopyOptionDisable && !blnCutOptionDisable,
            ClickEvent: objData.PasteFolder,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Paste.gif",
        },
        {
            ParentId: 0,
            Id: 11,
            Text: objTextResource.GridContextMenu11,
            Disable: !blnCopyOptionDisable && !blnCutOptionDisable,
            ClickEvent: objData.PasteAsShortcut,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Paste.gif",
        },
        {
            ParentId: 0,
            Id: 12,
            Text: objTextResource.GridContextMenu12,
            ClickEvent: () => objData.DeleteTaskFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Erase.png",
        },
        {
            ParentId: 0,
            Id: 13,
            Text: objTextResource.GridContextMenu13,
            ClickEvent: objData.ResetWorkflowStatus,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Erase.png",
        }
    ];
    return arrTreeContextMenuData;
}

/**
 * @name GetGridTaskFolderSearchContextMenuData
 * @param {object} objData takes objData
 * @summary Get data to initialize ContextMenu for TaskFolder in Grid
 * @returns {array} array
 */
export function GetGridTaskFolderSearchContextMenuData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objData.objContext.props);
    let objCutCopySource = ApplicationState.GetProperty("CutCopySource");
    let blnCutOptionDisable = !objCutCopySource;
    var arrTreeContextMenuData = [
        {
            ParentId: 0,
            Text: objTextResource.ContextMenu0 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddObject.gif"
        },
        {
            ParentId: 0,
            Id: 1,
            Text: objTextResource.GridContextMenu2,
            ClickEvent: () => objData.OpenAddEditTaskPopup("HighStake"),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png"
        },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.GridContextMenu3,
            ClickEvent: (strFolderId) => objData.EditTaskFolder(strFolderId),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Properties.png",
        },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.GridContextMenu3,
            ClickEvent: (strFolderId) => objData.EditTaskFolder(strFolderId),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/GoToFolder.png",
        },
        {
            ParentId: 0,
            Id: 4,
            Text: objTextResource.GridContextMenu4 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.png",
        },
        {
            ParentId: 4,
            Id: 4.1,
            Text: objTextResource.GridContextMenu4_1 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.png",
        },
        {
            ParentId: 4,
            Id: 4.2,
            Text: objTextResource.GridContextMenu4_2 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PrintToPdf.png",
        },
        {
            ParentId: 0,
            Id: 5,
            Text: objTextResource.GridContextMenu5 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/ExportToExcel.gif",
        },
        {
            ParentId: 0,
            Id: 6,
            Text: objTextResource.GridContextMenu6 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/ExportToExcel.gif",
        },
        {
            ParentId: 0,
            Id: 7,
            Text: objTextResource.GridContextMenu7 + "(-NI-)",
            ClickEvent: objData.CutFolder,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Cut.png",
        },
        {
            ParentId: 0,
            Id: 8,
            Text: objTextResource.GridContextMenu8 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/document-export.gif",
        },
        {
            ParentId: 8,
            Id: '8.1',
            Text: objTextResource.GridContextMenu8_1 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/PreviewNewWindow.png",
        },
        {
            ParentId: 8,
            Id: '8.2',
            Text: objTextResource.GridContextMenu8_2 + "(-NI-)",
            ClickEvent: () => console.log('menu clicked'),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/document-export.gif",
        },
        {
            ParentId: 0,
            Id: 9,
            Text: objTextResource.GridContextMenu9 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Copy.png",
        },
        {
            ParentId: 0,
            Id: 10,
            Text: objTextResource.GridContextMenu10 + "(-NI-)",
            //ClickEvent: (strFolderId) => PasteAction(objContext, strFolderId),
            Disable: !blnCopyOptionDisable && !blnCutOptionDisable,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Paste.gif",
        },
        {
            ParentId: 0,
            Id: 11,
            Text: objTextResource.GridContextMenu11 + "(-NI-)",
            //ClickEvent: (strFolderId) => PasteAction(objContext, strFolderId),
            Disable: !blnCopyOptionDisable && !blnCutOptionDisable,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Paste.gif",
        },
        {
            ParentId: 0,
            Id: 12,
            Text: objTextResource.GridContextMenu12,
            ClickEvent: () => objData.DeleteTaskFolder(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Erase.png",
        },
        {
            ParentId: 0,
            Id: 13,
            Text: objTextResource.GridContextMenu13 + "(-NI-)",
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Erase.png",
        }
    ];
    return arrTreeContextMenuData;
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

