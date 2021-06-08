/**
 * @name GetImplementationOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetImplementationOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.2_ImplementationStep/ImplementationStep", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "ImplementationStep"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "New"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "New"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/New_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.AddImplementationStepPopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Edit"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/Edit_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.EditImplementationStepPopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Delete"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/Delete_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.OpenDeleteImplementationPopup()
                            }
                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, ""),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Editor"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/OpenEditor.svg",
                                "type": "single",
                                "OnClick": () => objData.OpenImplementationStepContent()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Documents"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/Document.svg",
                                "type": "single",
                                "OnClick": () => objData.OpenImplementationDocuments()
                            }
                        ]
                    },                    
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "MoveImplementationStepUpandDown"),
                        "t_GroupData": [{
                            "vTextName": Localization.TextFormatter(objTextResource, "Up"),
                            "uImageUrl": "/Images/Common/Toolbar/MoveUp_Large.gif",
                            "type": "single",
                            "OnClick": () => {
                                objData.MoveImplementationStepUp();
                            }
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Downward"),
                            "uImageUrl": "/Images/Common/Toolbar/MoveDown_Large.gif",
                            "type": "single",
                            "OnClick": () => {
                                objData.MoveImplementationStepDown();
                            }
                        }
                        ]
                    },                    
                    {
                        "vGroupName": "ViewCode",//Localization.TextFormatter(objTextResource, "Editor"),
                        "t_GroupData": [
                            {
                                "vTextName": "ViewImplementationCode",
                                "uImageUrl": "/Images/Common/OfficeRibbon/Show_Code.svg",
                                "type": "single",
                                "OnClick": () => objData.OpenCodeCrawler()
                            }
                        ]
                    },
                    {
                        "vGroupName": "Usecase",//Localization.TextFormatter(objTextResource, "Editor"),
                        "t_GroupData": [
                            {
                                "vTextName": "OpenUseCase",
                                "uImageUrl": "/Images/Common/OfficeRibbon/Back_Grid.svg",
                                "type": "single",
                                "OnClick": () => objData.OpenUseCase()
                            }
                        ]
                    },
                ]
            }
        ]
    );
}
