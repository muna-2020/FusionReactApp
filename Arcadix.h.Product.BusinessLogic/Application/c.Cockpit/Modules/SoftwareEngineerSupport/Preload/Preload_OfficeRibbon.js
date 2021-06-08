/**
 * @name GetPreloadOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetPreloadOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/SoftwareEngineerSupport/Preload", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "Preload"),
                ToolBarData: [
                    {//Group1
                        "vGroupName": Localization.TextFormatter(objTextResource, "Preload"),
                        "t_GroupData": [
                            {
                                "type": "single",
                                "OnClick": () => objData.ConfirmationPopup(objData.objContext),
                                "ImageName": "NewImage"
                            }
                        ]
                    }
                ]
            }
        ]
    );
}