
/**
 * @name GetOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {object} Excel export office ribbon data
 */
export function GetOfficeRibbonData(objData) {

    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/LogsAndException/Exceptions/HistoryExceptions", objData.objContext.props);
    let arrRibbonData = [
        {
            Text: Localization.TextFormatter(objTextResource, "DbDataExceptions"),
            ToolBarData: [
                {//Group1
                    //"vGroupName": Localization.TextFormatter(objTextResource, "Export"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Export") + "(-NI-)",
                            "type": "single",
                            "OnClick": () => {
                                objData.ExportToExcel(objData.objContext);
                            },
                            "ImageName": "ExportImage"
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