
/**
 * @name GetDashboardOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {object} add edit office ribbon data
 */
export function GetDashboardOfficeRibbonData(objData) {

    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/1_Start/StartDashboard", objData.objContext.props);
    let arrRibbonData = [
        {
            Text: Localization.TextFormatter(objTextResource, "StartDashboard"),
            ToolBarData: [
                {//Group1
                    // "vGroupName": Localization.TextFormatter(objTextResource, "Reload"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Reload") + "-NI-",
                            "type": "single",
                            "OnClick": () => {
                                //objData.SaveData(objData.objContext);
                            },
                            "ImageName": "RefreshLargeImage"
                        }
                    ]
                }
            ],
        ImageMeta: {
            ...objData.objContext.ImageMeta
        }
        }
    ];
    return arrRibbonData;
}
