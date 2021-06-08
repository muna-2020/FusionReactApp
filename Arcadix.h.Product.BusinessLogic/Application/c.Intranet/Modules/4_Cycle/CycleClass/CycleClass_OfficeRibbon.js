/**
 * @name GetCycleClassOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {object} add edit office ribbon data
 */
export function GetCycleClassOfficeRibbonData(objData) {

    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/CycleClass", objData.objContext.props) ?? {};
    let arrRibbonData = [
        {
            Text: Localization.TextFormatter(objTextResource, "CycleClass"),
            ToolBarData: [
                {
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "New"),
                            "ImageName": "NewImage",
                            "type": "single",
                            "OnClick": () => objData.OpenAddClassPopup(objData.objContext)
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "ToSave"),
                            "ImageName": "SaveImage",
                            "type": "single",
                            "OnClick": () => objData.SaveData(objData.objContext)
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Cancel"),
                            "ImageName": "CancelImage",
                            "type": "single",
                            "OnClick": () => objData.ClearData(objData.objContext)
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Delete") + "(-NI-)",
                            "ImageName": "DeleteImage",
                            "type": "single",
                            "OnClick": () => objData.DeleteData(objData.objContext)
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
