/**
 * @name GetCycleStateOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {object} add edit office ribbon data
 */
export function GetCycleStateOfficeRibbonData(objData) {

    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/CycleState", objData.objContext.props) ?? {};
    let arrRibbonData = [
        {
            Text: Localization.TextFormatter(objTextResource, "CycleState"),
            ToolBarData: [
                {//Group1
                    "vGroupName": Localization.TextFormatter(objTextResource, "SaveButton"),
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