
/**
 * @name GetMainClientLanguageOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetMainClientApplicationTypeOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientApplicationType", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "MainClientApplicationType"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ToSave"),
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
