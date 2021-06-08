
/**
 * @name GetOnlineHelpOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetTipOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/Tip", objData.objContext.props);

    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "Tip"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "New"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "New"),
                                "ImageName": "NewImage",
                                "type": "single",
                                "OnClick": () => objData.AddPopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Edit"),
                                "ImageName": "EditImage",
                                "type": "single",
                                "OnClick": () => objData.EditPopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Delete"),
                                "ImageName": "DeleteImage",
                                "type": "single",
                                "OnClick": () => objData.DeletePopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Editor"),
                                "ImageName": "OpenEditorImage",
                                "type": "single",
                                "OnClick": () => objData.OpenContent()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Preview"),
                                "ImageName": "PreviewNewWindowImage",
                                "type": "single",
                                "OnClick": () => objData.OpenPreviewInNewTab()
                            }
                        ]
                    }
                ],
                ImageMeta: {
                    ...objData.objContext.ImageMeta
                }
            }
        ]
    );
}