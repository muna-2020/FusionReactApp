
/**
* @name GetContextMenuData
* @param {object} objData takes objData
* @summary Get data to initialize ContextMenu for Task
* @returns {array} array
*/
export function GetContextMenuData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/LoginAndMaster/Navigation/SubNavigation", objData.objContext.props);
    //Conditionally forming the Context Menu options and Actions based on Module or Document
    let blnIsDocument = objData.objContext.props.location.pathname.split('/')[1] === "Documents";
    let blnCopyOptionDisable = blnIsDocument ? ApplicationState.GetProperty("CutCopySource")?.["Document"]?.["Type"] == "Copy" : ApplicationState.GetProperty("CutCopySource")?.["Module"]?.["Type"] == "Copy";
    let blnCutOptionDisable = blnIsDocument ? ApplicationState.GetProperty("CutCopySource")?.["Document"]?.["Type"] == "Cut" : (ApplicationState.GetProperty("CutCopySource")?.["Module"]?.["Type"] == "Cut" || ApplicationState.GetProperty("CutCopySource")?.["UseCase"]?.["Type"] == "Cut");

    var arrTreeContextMenuData = [
        {
            ParentId: 0,
            Id: 1,
            Text: objTextResource.AddFolder,
            ClickEvent:objData.AddFolder,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddFolder.png",
            Disabled: (objData.objSelectedNode && objData.objSelectedNode.vModuleName) ? true : false
        },
        blnIsDocument ?
            {
                ParentId: 0,
                Id: 2,
                Text: objTextResource.AddDocument,
                ClickEvent: objData.AddDocument,
                Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddModule.png",
                Disabled: !objData.objSelectedNode || !(objData.objSelectedNode && objData.objSelectedNode.vFolderName) ? true : false
            } :
            {
                ParentId: 0,
                Id: 2,
                Text: objTextResource.AddModule,
                ClickEvent: objData.AddModule,
                Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddModule.png",
                Disabled: !objData.objSelectedNode || !(objData.objSelectedNode && objData.objSelectedNode.vFolderName) ? true : false
            },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.Edit,
            ClickEvent: objData.Edit,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Icon_Edit.svg",
            Disabled: !objData.objSelectedNode ? true : false
        },
        {
            ParentId: 0,
            Id: 4,
            Text: objTextResource.Delete,
            ClickEvent: objData.Delete,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Icon_Delete_small.svg",
            Disabled: !objData.objSelectedNode ? true : false
        },
        {
            ParentId: 0,
            Id: 5,
            Text: objTextResource.Copy + (blnIsDocument ? "(-NI-)" : ""),
            ClickEvent: blnIsDocument ? objData.CopyDocument : objData.CopyModule,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Copy.png",
            Disable: blnIsDocument ? true : false
        },
        {
            ParentId: 0,
            Id: 6,
            Text: objTextResource.Cut,
            ClickEvent: blnIsDocument ? objData.CutDocument : objData.CutModule,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Cut.png",
            //Disable: blnIsDocument ? true : false
        },
        {
            ParentId: 0,
            Id: 7,
            Text: objTextResource.Paste,
            ClickEvent: blnIsDocument ? objData.PasteDocument : objData.PasteModule,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Paste.svg",
            Disable: !blnCopyOptionDisable && !blnCutOptionDisable
        }
    ];
    return arrTreeContextMenuData;
}
