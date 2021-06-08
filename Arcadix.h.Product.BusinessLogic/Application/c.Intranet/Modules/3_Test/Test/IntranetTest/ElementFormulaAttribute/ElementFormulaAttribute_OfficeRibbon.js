/**
* @name GetElementFormulaAttributeOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetElementFormulaAttributeOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute", objData.objContext.props) ?? {};
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "ElementFormulaAttribute"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ToSave"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "ToSave"),
                                "type": "single",
                                "OnClick": () => objData.SaveMethod(),
                                "ImageName": "SaveImage" 
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "ToSaveAs"),
                                "type": "single",
                                "OnClick": () => objData.SaveAsMethod(),
                                "ImageName": "SaveImage" 
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Audit") + "-NI-",
                                "type": "single",
                                //"OnClick": () => objData.SaveMethod(),
                                "ImageName": "EditImage"
                            }
                        ]
                    }
                ]
            }
        ]
    );
}
