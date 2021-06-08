
/**
* @name GetCycleContextMenuData
* @param {object} objData takes objData
* @summary Get data to initialize ContextMenu for Task
* @returns {array} array
*/
export function GetCycleContextMenuData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle", objData.objContext.props);

    let arrContextList = [
        {
            ParentId: 0,
            Id: 1,
            Text: objTextResource.Properties +"(-NI-)",
            ClickEvent: () => objData.OpenAddEditTaskPopup(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Properties.png"
        },
        {
            ParentId: 0,
            Id: 1,
            Text: objTextResource.AddExecution + "(-NI-)",
            ClickEvent: () => objData.OpenAddImplementation(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddTask.png"
        },
        {
            ParentId: 0,
            Id: 2,
            Text: objTextResource.AssignTests,
            ClickEvent: () => objData.OpenAssignTestToCycle(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/TestToCycle.gif"

        },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.Clear+"(-NI-)",
            ClickEvent: () => objData.OpenDeleteCycle(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Erase.png"

        },
        {
            ParentId: 0,
            Id: 4,
            Text: objTextResource.Translate + "(-NI-)",
            ClickEvent: () => objData.OpenTranslateCycle(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Translate.png"

        }
    ];
    return arrContextList;
}