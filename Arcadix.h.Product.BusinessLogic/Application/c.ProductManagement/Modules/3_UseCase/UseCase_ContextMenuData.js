/**
* @name GetContextMenuData
* @param {object} objData takes objData
* @summary Get data to initialize ContextMenu for UseCase
* @returns {array} array
*/
export function GetContextMenuData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objData.objContext.props);
    let blnCopyOptionDisable = ApplicationState.GetProperty("CutCopySource")?.["UseCase"]?.["Type"] == "Copy";
    let blnCutOptionDisable = ApplicationState.GetProperty("CutCopySource")?.["UseCase"]?.["Type"] == "Cut";

    var arrTreeContextMenuData = [
        {
            ParentId: 0,
            Id: 1,
            Text: Localization.TextFormatter(objTextResource, "New"),
            ClickEvent: () => objData.AddEditUseCase(false),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/AddModule.png",
        },
        {
            ParentId: 0,
            Id: 2,
            Text: Localization.TextFormatter(objTextResource, "Edit"),
            ClickEvent: () => objData.AddEditUseCase(true),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Icon_Edit.svg",
        },
        {
            ParentId: 0,
            Id: 3,
            Text: Localization.TextFormatter(objTextResource,"Delete"),
            ClickEvent: () => objData.DeleteUseCase(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Icon_Delete_small.svg",
        },
        //{
        //    ParentId: 0,
        //    Id: 4,
        //    Text: Localization.TextFormatter(objTextResource,"Copy"),
        //    ClickEvent: () => objData.Copy(),
        //    Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Copy.png",
        //},
        {
            ParentId: 0,
            Id: 5,
            Text: Localization.TextFormatter(objTextResource, "Cut"),
            ClickEvent: () => objData.Cut(),
            Image: "/Images/Common/JContextMenu/CMS/ContextMenu/Cut.png",
        },
        {
            ParentId: 0,
            Id: 6,
            Text: Localization.TextFormatter(objTextResource, "Paste"),
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
    var arrAdditionalContextMenuData = [
            {
                ParentId: 0,
                Id: 8,
            Text: Localization.TextFormatter(objTextResource, "Editor"),
                ClickEvent: () => objData.OpenContent(),
                Image: "/Images/Common/OfficeRibbon/OpenEditor.svg",
            },
            {
                ParentId: 0,
                Id: 9,
                Text: Localization.TextFormatter(objTextResource, "Documents"),
                ClickEvent: () => objData.OpenDocuments(),
                Image: "/Images/Common/OfficeRibbon/Document.svg",
            }
        ]
    return [...arrTreeContextMenuData, ...arrAdditionalContextMenuData];
}
