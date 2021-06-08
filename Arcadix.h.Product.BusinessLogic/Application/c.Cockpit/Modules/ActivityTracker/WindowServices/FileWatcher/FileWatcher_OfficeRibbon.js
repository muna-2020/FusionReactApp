/**
 * @name GetOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/ActivityTracker/WindowServices/FileWatcher", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "FileWatcher"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ActivityDeatils"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "ActivityDeatils") ,
                                "uImageUrl": "/Images/Common/OfficeRibbon/New_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.ShowActivityDetailsPopup()
                            }
                        ]
                    }
                ]
            }
        ]
    );
}
