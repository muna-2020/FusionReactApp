/**
 * @name GetOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/AdditionalProperty", objData.objContext.props) ?? {};
    return (
        [
            {
                Text: objTextResource["AdditionalProperty"],
                ToolBarData: [
                    {
                        "vGroupName": objTextResource["New"],
                        "t_GroupData": [
                            {
                                "vTextName": objTextResource["New"],
                                "type": "single",
                                "OnClick": () => objData.AddPopup(),
                                "ImageName": "NewImage"
                            },
                            {
                                "vTextName": objTextResource["Edit"],
                                "type": "single",
                                "OnClick": () => objData.EditPopup(),
                                "ImageName": "EditImage"
                            },
                            {
                                "vTextName": objTextResource["Delete"],
                                "type": "single",
                                "OnClick": () => objData.DeletePopup(),
                                "ImageName": "DeleteImage"
                            }
                        ]
                    }
                ]
            }
        ]
    );
}
