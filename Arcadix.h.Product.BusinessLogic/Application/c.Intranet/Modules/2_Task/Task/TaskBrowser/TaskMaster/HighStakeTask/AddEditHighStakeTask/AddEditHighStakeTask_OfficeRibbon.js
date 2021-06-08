
/**
* @name GetAddEditHighStakeTaskOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {object} add edit office ribbon data
*/
export function GetAddEditHighStakeTaskOfficeRibbonData(objData) {

    let objTextResource = objData.objContext.props.Resource.Text;
    let arrRibbonData = [
        {
            Text: Localization.TextFormatter(objTextResource, "Actions"),
            ToolBarData: [
                {//Group1
                    "vGroupName": Localization.TextFormatter(objTextResource, "ToSave"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "ToSave"),
                            "ImageName": "SaveImage",
                            "type": "single",
                            "OnClick": () => {
                                objData.SaveMethod(objData.objContext);
                            }
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "SaveAndClose"),
                            "ImageName": "SaveAndCloseImage",
                            "type": "single",
                            "OnClick": () => {
                                objData.SaveAndCloseMethod(objData.objContext, true);
                            }
                        }
                    ]
                }
            ]                 
        }
    ];
    return arrRibbonData;
}
