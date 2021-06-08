/**
* @name GetAddEditTestCaseOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {object} add edit office ribbon data
*/
export function GetAddEditTestCaseOfficeRibbonData(objData, objContext) {
    //let objTextResource = objData.Resource.Text;
    let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1.1.TestCaseStep/TestCaseStep", objContext.props);
    let arrRibbonData = [
        {
            Text: Localization.TextFormatter(objTextResource, "TestCaseStep"),
            ToolBarData: [
                {//Group1
                    "vGroupName": Localization.TextFormatter(objTextResource, "ToSave"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "ToSave"),
                            "uImageUrl": "/Images/Common/OfficeRibbon/Save.svg",
                            "type": "single",
                            "OnClick": () => {
                                objData.SaveMethod(objData.objContext);
                            }
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "SaveAndClose"),
                            "uImageUrl": "/Images/Common/OfficeRibbon/SaveAndClose_Large.svg",
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
