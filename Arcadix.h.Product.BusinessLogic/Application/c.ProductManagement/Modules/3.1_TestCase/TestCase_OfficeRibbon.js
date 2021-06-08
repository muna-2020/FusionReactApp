/**
 * @name GetTestCaseOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetTestCaseOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.1_TestCase/TestCase", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "TestCase"),
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
                                "OnClick": () => objData.OpenContent()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Documents"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/Document.svg",
                                "type": "single",
                                "OnClick": () => objData.OpenDocuments()
                            }
                        ]
                    },                    
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "MoveImplementationStepUpandDown"),
                        "t_GroupData": [{
                            "vTextName": Localization.TextFormatter(objTextResource, "Up"),
                            "uImageUrl": "/Images/Common/Toolbar/MoveUp_Large.gif",
                            "type": "single",
                            "OnClick": () => objData.MoveUp()
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Downward"),
                            "uImageUrl": "/Images/Common/Toolbar/MoveDown_Large.gif",
                            "type": "single",
                            "OnClick": () => objData.MoveDown()
                        }
                        ]
                    },                    
                    //{
                    //    "vGroupName": "ViewCode",//Localization.TextFormatter(objTextResource, "Editor"),
                    //    "t_GroupData": [
                    //        {
                    //            "vTextName": "ViewImplementationCode",
                    //            "uImageUrl": "/Images/Common/OfficeRibbon/Show_Code.svg",
                    //            "type": "single",
                    //            "OnClick": () => objData.OpenCodeCrawler()
                    //        }
                    //    ]
                    //},
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
