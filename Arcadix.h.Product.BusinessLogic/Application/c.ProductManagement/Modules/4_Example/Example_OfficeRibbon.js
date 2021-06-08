
/**
* @name GetExampleOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetExampleOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/4_Example/Example", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "Example"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "Actions"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Preview"),
                                //"uImageUrl": "/Images/Common/OfficeRibbon/New_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.PreviewModule(),
                                "ImageName": "NewImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "CopyLink"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/Copy.svg",
                                "type": "single",
                                "OnClick": () => objData.CopyLinkToClipBoard(),
                                "ImageName": "CopyLinkImage"

                            }
                        ]
                    }
                ],
                ImageMeta: {
                    ...objData.objContext.ImageMeta
                }
            }
        ]        
    );
}
