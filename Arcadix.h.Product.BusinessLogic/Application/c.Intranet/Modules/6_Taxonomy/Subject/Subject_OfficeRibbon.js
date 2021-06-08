/**
 * @name GetLanguageOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/6_Taxonomy/Subject", objData.objContext.props) ?? {};
    return (
        [
            {
                Text: objTextResource["Subject"],
                ToolBarData: [
                    {
                        "vGroupName": objTextResource["New"],
                        "t_GroupData": [
                            {
                                "vTextName": objTextResource["New"],
                                "uImageUrl": "/Images/Common/OfficeRibbon/New_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.AddPopup(),
                                "ImageName": "NewImage"
                            },
                            {
                                "vTextName": objTextResource["Edit"],
                                "uImageUrl": "/Images/Common/OfficeRibbon/Edit_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.EditPopup(),
                                "ImageName": "EditImage"
                            },
                            {
                                "vTextName": objTextResource["Delete"],
                                "uImageUrl": "/Images/Common/OfficeRibbon/Delete_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.DeletePopup(),
                                "ImageName": "DeleteImage"
                            }
                        ]
                    }
                ],
                ImageMeta: {
                    //To pass the module specific images
                }
            }
        ]
    );
}
