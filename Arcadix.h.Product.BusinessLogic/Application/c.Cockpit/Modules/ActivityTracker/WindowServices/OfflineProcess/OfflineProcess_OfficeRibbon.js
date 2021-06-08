
/**
* @name GetOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/OfflineProcess", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "OfflineProcess"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ActivityDeatils"),
                        "t_GroupData": [
                            {
                                "type": "single",
                                "OnClick": () => objData.ShowActivityDetailsPopup(),
                                "ImageName": "NewImage"
                            }
                        ]
                    }
                ]
            }
        ]
    );
}
