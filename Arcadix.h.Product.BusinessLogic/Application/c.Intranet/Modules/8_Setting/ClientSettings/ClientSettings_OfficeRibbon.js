/**
 * @name GetClientSettingsOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {object} add edit office ribbon data
 */
export function GetClientSettingsOfficeRibbonData(objData) {

    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/ClientSettings", objData.objContext.props) ?? {};
    let arrRibbonData = [
        {
            Text: Localization.TextFormatter(objTextResource, "ClientSettings"),
            ToolBarData: [
                {//Group1
                    "vGroupName": Localization.TextFormatter(objTextResource, "ToSave"),
                    "t_GroupData": [
                        {
                            "ImageName": "SaveImage",
                            "type": "single",
                            "OnClick": () => {
                                objData.SaveData(objData.objContext);
                            }
                        }
                    ]
                }
            ]
        }
    ];
    return arrRibbonData;
}
