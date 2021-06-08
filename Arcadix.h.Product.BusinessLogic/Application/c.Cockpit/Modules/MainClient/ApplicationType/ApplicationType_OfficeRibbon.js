
/**
 * @name GetApplicationTypeOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetApplicationTypeOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/ApplicationType", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "ApplicationType"),
                ToolBarData: [
                    {//Group1
                        "vGroupName": Localization.TextFormatter(objTextResource, "New"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "New"),
                                "ImageName": "NewImage",
                                "type": "single",
                                "OnClick": () => objData.AddPopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Edit"),
                                "ImageName": "EditImage",
                                "type": "single",
                                "OnClick": () => objData.EditPopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Delete"),
                                "ImageName": "DeleteImage",
                                "type": "single",
                                "OnClick": () => objData.DeletePopup()
                            }
                        ]
                    }
                ]
            }
        ]
    );
}