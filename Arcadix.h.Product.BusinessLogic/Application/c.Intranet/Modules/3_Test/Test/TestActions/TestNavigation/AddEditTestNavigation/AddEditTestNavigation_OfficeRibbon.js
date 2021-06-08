/**
* @name GetAddEditTestCaseOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {object} add edit office ribbon data
*/
export function GetAddEditTestCaseOfficeRibbonData(objData, objContext) {
    //let objTextResource = objData.Resource.Text;
    let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation", objContext.props);
    let arrRibbonData = [
        {
            Text: Localization.TextFormatter(objTextResource, "TestNavigation"),
            ToolBarData: [
                {//Group1
                    "vGroupName": Localization.TextFormatter(objTextResource, "ToSave"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "ToSave"),
                            "type": "single",
                            "OnClick": () => {
                                objData.SaveMethod(objData.objContext);
                            },
                            "ImageName": "SaveImage"
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "SaveAndClose"),
                            "type": "single",
                            "OnClick": () => {
                                objData.SaveAndCloseMethod(objData.objContext, true);
                            },
                            "ImageName": "SaveAndCloseImage"
                        }
                    ]
                }
            ]
        }
    ];
    return arrRibbonData;
}
