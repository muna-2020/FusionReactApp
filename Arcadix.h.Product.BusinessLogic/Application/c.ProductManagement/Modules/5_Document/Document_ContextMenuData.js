
/**
* @name GetContextMenuData
* @param {object} objData takes objData
* @summary Get data to initialize ContextMenu for Task
* @returns {array} array
*/
export function GetDocumentContextMenuData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", objData.objContext.props);
    let blnPasteOptionDisable = ApplicationState.GetProperty("CutCopySource")?.["Document"]?.["Type"] == "Cut";

    var arrTreeContextMenuData = [        
        {
            ParentId: 0,
            Id: 1,
            Text: objTextResource.AddDocument,
            ClickEvent: () => objData.AddDocument(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddModule.png",
        },
        {
            ParentId: 0,
            Id: 2,
            Text: objTextResource.Edit,
            ClickEvent: () => objData.AddDocument(true),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Icon_Edit.svg",
        },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.Delete,
            ClickEvent: () => objData.DeleteDocument(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Icon_Delete_small.svg",
        },
        {
            ParentId: 0,
            Id: 4,
            Text: objTextResource.Copy + "(-NI-)",
            //ClickEvent: objData.Delete,
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Copy.png",
            Disable: true
        },
        {
            ParentId: 0,
            Id: 5,
            Text: objTextResource.Cut,
            ClickEvent: () => objData.Cut(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Cut.png",
        },
        {
            ParentId: 0,
            Id: 6,
            Text: objTextResource.Paste,
            ClickEvent: () => objData.Paste(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Paste.svg",
            Disable: !blnPasteOptionDisable ? true : false
        }
    ];
    return arrTreeContextMenuData;
}
