/**
* @name GetOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/7_Report/Essay/EssayBilling", objData.objContext.props) ?? {};
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "Export"),
                ToolBarData: [
                    {
                        //"vGroupName": Localization.TextFormatter(objTextResource, "Export"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Export"),
                                "type": "single",
                                "OnClick": () => objData.ConfirmationPopup(objData.objContext),
                                "ImageName": "ExportOnlineImage" 
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
