
/**
* @name GetOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/DatabaseServer", objData.objContext.props) ?? {};
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "DatabaseServer"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "Diagramm anzeigen") + "(-NI -)",
                        "t_GroupData": [
                            {
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
