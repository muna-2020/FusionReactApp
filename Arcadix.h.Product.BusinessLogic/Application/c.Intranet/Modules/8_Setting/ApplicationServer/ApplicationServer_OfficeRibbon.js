
/**
* @name GetOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/ApplicationServer", objData.objContext.props) ?? {};
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "ApplicationServer"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "New"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "New"),
                                "type": "single",
                                "OnClick": () => objData.AddPopup(),
                                "ImageName": "NewImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Edit"),
                                "type": "single",
                                "OnClick": () => objData.EditPopup(),
                                "ImageName": "EditImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Delete"),
                                "type": "single",
                                "OnClick": () => objData.DeletePopup(),
                                "ImageName": "DeleteImage"
                            }
                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "Zähler") + "(-NI -)",
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Zähler rücksetzen") + "(-NI-)",
                                "type": "single",
                                //"OnClick": () => objData.OpenSendLoginProgressBarPopup(),
                                "ImageName": "ResetCounterImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Diagramm anzeigen") + "(-NI-)",
                                "type": "single",
                                //"OnClick": () => objData.EditPopup(),
                                "ImageName": "ShowDiagramImage"
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
