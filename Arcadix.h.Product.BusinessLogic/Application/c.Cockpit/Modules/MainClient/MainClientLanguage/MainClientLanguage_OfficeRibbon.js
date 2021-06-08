/**
 * @name GetMainClientLanguageOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetMainClientLanguageOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientLanguage", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "MainClientLanguage"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "SaveButton"),
                        "t_GroupData": [
                            {
                                "ImageName": "SaveImage",
                                "type": "single",
                                "OnClick": () => objData.SaveMethod()
                            }   
                        ]
                    }
                ]
            }
        ]
    );
}
