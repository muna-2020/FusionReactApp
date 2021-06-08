
/**
* @name GetOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle", objData.objContext.props) ?? {};
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "Cycle"),
                ToolBarData: [
                    {
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
