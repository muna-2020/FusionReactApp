/**
* @name GetContextMenuData
* @param {object} objData takes objData
* @summary Get data to initialize ContextMenu for Module
* @returns {array} array
*/
export function GetContextMenuData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/Module", objData.objContext.props);
    let blnCopyOptionDisable = ApplicationState.GetProperty("CutCopySource")?.["Module"]?.["Type"] == "Copy" || ApplicationState.GetProperty("CutCopySource")?.["UseCase"]?.["Type"] == "Copy";
    let blnCutOptionDisable = ApplicationState.GetProperty("CutCopySource")?.["Module"]?.["Type"] == "Cut" || ApplicationState.GetProperty("CutCopySource")?.["UseCase"]?.["Type"] == "Cut";
    let blnIsExample = objData.objContext.props.location.pathname.split('/')[1] === "Examples";

    var arrTreeContextMenuData = [             
        {
            ParentId: 0,
            Id: 1,
            Text: blnIsExample ? objTextResource.AddExample : objTextResource.AddModule,
            ClickEvent: () => objData.AddEditModule(false),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddModule.png",
        },
        {
            ParentId: 0,
            Id: 2,
            Text: objTextResource.Edit,
            ClickEvent: () => objData.AddEditModule(true),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Icon_Edit.svg",
        },
        {
            ParentId: 0,
            Id: 3,
            Text: objTextResource.Delete,
            ClickEvent: () => objData.DeleteModule(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Icon_Delete_small.svg",
        },
        {
            ParentId: 0,
            Id: 4,
            Text: objTextResource.Copy,
            ClickEvent: () => objData.Copy(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Copy.png",
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
            Disable: !blnCopyOptionDisable && !blnCutOptionDisable
        },
        {
            ParentId: 0,
            Id: 7,
            Type: "separator",
        },
    ];
    var arrAdditionalContextMenuData = blnIsExample ?
        [
            {
                ParentId: 0,
                Id: 8,
                Text: objTextResource.Preview,
                ClickEvent: () => objData.PreviewModule(),
                Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddModule.png",
            },
            {
                ParentId: 0,
                Id: 9,
                Text: objTextResource.CopyLink,
                ClickEvent: () => objData.CopyLinkToClipBoard(),
                Image: "/Images/Common/JContextMenu/CMS/ContextMenu/CopyLink.svg",
            }
        ]
        :
        [
            {
                ParentId: 0,
                Id: 8,
                Text: objTextResource.Editor,
                ClickEvent: () => objData.OpenContent(),
                Image: "/Images/Common/OfficeRibbon/OpenEditor.svg",
            },
            {
                ParentId: 0,
                Id: 9,
                Text: objTextResource.Documents,
                ClickEvent: () => objData.OpenDocuments(),
                Image: "/Images/Common/OfficeRibbon/Document.svg",
            }
        ]
    return [...arrTreeContextMenuData, ...arrAdditionalContextMenuData];
}
