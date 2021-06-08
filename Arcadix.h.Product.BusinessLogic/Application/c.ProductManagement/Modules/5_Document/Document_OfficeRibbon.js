
/**
* @name GetDocumentOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetDocumentOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/5_Document/Document", objData.objContext.props);
    let blnShowAdditionalActions = !objData.objContext.props?.Data?.IsForModule && !objData.objContext.props?.Data?.IsForUseCase && !objData.objContext.props?.Data?.IsForTestCase && !objData.objContext.props?.Data?.IsForImplementationStep;
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "Document"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "New"),
                        "t_GroupData": [
                            {
                                "type": "single",
                                "OnClick": () => objData.AddPopup(),
                                "ImageName": "NewImage"
                            }
                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "Edit"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Edit"),
                                "type": "single",
                                "OnClick": () => objData.EditPopup(),
                                "ImageName": "EditImage"
                            }, 
                            ...blnShowAdditionalActions ?
                                [
                                    {
                                        "type": "Multiple",
                                        "MultipleData": [
                                            {
                                                "vTextName": objTextResource.Copy + "(-NI-)",
                                                "type": "single",
                                                "OnClick": () => objData.Copy(),
                                                "ImageName": "CopyImage"
                                            },
                                            {
                                                "vTextName": objTextResource.Cut,
                                                "type": "single",
                                                "OnClick": () => objData.Cut(),
                                                "ImageName": "CutImage"
                                            },
                                            {
                                                "vTextName": objTextResource.Paste,
                                                "type": "single",
                                                "OnClick": () => objData.Paste(),
                                                "ImageName": "PasteImage"
                                            },
                                        ]
                                    },
                                    {
                                        "vTextName": Localization.TextFormatter(objTextResource, "Delete"),
                                        "type": "single",
                                        "OnClick": () => objData.DeletePopup(),
                                        "ImageName": "DeleteImage"
                                    }
                                ]
                                :
                                [
                                    {
                                        "vTextName": Localization.TextFormatter(objTextResource, "Delete"),
                                        "type": "single",
                                        "OnClick": () => objData.DeletePopup(),
                                        "ImageName": "DeleteImage"
                                    } 
                                ]
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
