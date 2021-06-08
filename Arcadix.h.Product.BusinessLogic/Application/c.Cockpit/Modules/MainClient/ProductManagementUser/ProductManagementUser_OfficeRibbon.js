/**
 * @name GetOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/ProductManagementUser", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "ProductManagementUser"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "New"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "New"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/New_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.AddPopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Edit"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/Edit_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.EditPopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Delete"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/Delete_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.DeletePopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "SendLogin"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/SendLogin_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.OpenSendLoginProgressBarPopup()
                            }
                        ]
                    }
                ]
            }
        ]
    );
}
