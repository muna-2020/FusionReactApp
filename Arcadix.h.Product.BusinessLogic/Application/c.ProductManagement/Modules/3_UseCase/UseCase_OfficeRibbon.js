/**
* @name GetUseCaseOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetUseCaseOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objData.objContext.props);
   
        var arrBaseToolBar =[
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
                    {
                        "type": "Multiple",
                        "MultipleData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Copy") +"-NI-",
                                "type": "single",
                                "OnClick": () => objData.Copy(),
                                "ImageName": "CopyImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Cut"),
                                "type": "single",
                                "OnClick": () => objData.Cut(),
                                "ImageName": "CutImage",
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Paste"),
                                "type": "single",
                                "OnClick": () => objData.Paste(),
                                "ImageName": "PasteImage",
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
            },
            {
                "vGroupName": Localization.TextFormatter(objTextResource, "Actions"),
                "t_GroupData": [
                    {
                        "vTextName": Localization.TextFormatter(objTextResource, "Editor"),
                        "type": "single",
                        "OnClick": () => objData.OpenContent(),
                        "ImageName": "OpenEditorImage"
                    },
                    {
                        "vTextName": Localization.TextFormatter(objTextResource, "Documents"),
                        "type": "single",
                        "OnClick": () => objData.OpenDocuments(),
                        "ImageName": "DocumentImage"
                    }
                ]
            },
            {
                "vGroupName": Localization.TextFormatter(objTextResource, "MoveUseCaseUpandDown"),
                "t_GroupData": [{
                    "vTextName": Localization.TextFormatter(objTextResource, "Up"),
                    "uImageUrl": "/Images/Common/Toolbar/MoveUp_Large.gif",
                    "type": "single",
                    "OnClick": () => {
                        objData.MoveUp();
                    }
                },
                {
                    "vTextName": Localization.TextFormatter(objTextResource, "Downward"),
                    "uImageUrl": "/Images/Common/Toolbar/MoveDown_Large.gif",
                    "type": "single",
                    "OnClick": () => {
                        objData.MoveDown();
                    }
                }
                ]
            },
            {
                "vGroupName": "Open",//Localization.TextFormatter(objTextResource, "Editor"),
                "t_GroupData": [
                    {
                        "vTextName": "TestCase",
                        "uImageUrl": "/Images/Common/OfficeRibbon/Show_Code.svg",
                        "type": "single",
                        "OnClick": () => objData.OpenTestCase()
                    },
                    {
                        "vTextName": "ImplementationStep",
                        "uImageUrl": "/Images/Common/OfficeRibbon/Show_Code.svg",
                        "type": "single",
                        "OnClick": () => objData.OpenImplementationStep()
                    },
                    {
                        "vTextName": "ImplementationCode",
                        "uImageUrl": "/Images/Common/OfficeRibbon/Show_Code.svg",
                        "type": "single",
                        "OnClick": () => objData.OpenCodeCrawler()
                    }
                ]
            }

        ]
    return ([
        {
            Text: Localization.TextFormatter(objTextResource, "UseCase"),
            ToolBarData: arrBaseToolBar,
            ImageMeta: {
                ...objData.objContext.ImageMeta
            }
        }
    ] );
}

/**
* @name GetImplementationOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetImplementationOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objData.objContext.props);
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
                                "uImageUrl": "/Images/Common/OfficeRibbon/New_SubGrid.svg",
                                "type": "single",
                                "OnClick": () => objData.AddImplementationStepPopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Edit"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/Edit_SubGrid.svg",
                                "type": "single",
                                "OnClick": () => objData.EditImplementationStepPopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Delete"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/Delete_SubGrid.svg",
                                "type": "single",
                                "OnClick": () => objData.OpenDeleteImplementationPopup()
                            }
                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ImplementationStep"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Editor"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/OpenEditor.svg",
                                "type": "single",
                                "OnClick": () => objData.OpenImplementationStepContent()
                            }
                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "Documents"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "ImplementationStepDocuments"),
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
                ]
            }
        ]
    );
}


/**
* @name GetTestCaseStepOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetTestCaseStepOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3_UseCase/UseCase", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "TestCaseStep"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "New"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "New"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/New_SubGrid.svg",
                                "type": "single",
                                "OnClick": () => objData.OpenAddTestCaseStepPopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Edit"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/Edit_SubGrid.svg",
                                "type": "single",
                                "OnClick": () => objData.OpenEditTestCaseStepPopup()
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Delete"),
                                "uImageUrl": "/Images/Common/OfficeRibbon/Delete_SubGrid.svg",
                                "type": "single",
                                "OnClick": () => objData.OpenDeleteTestCaseStepPopup()
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
                    }
                ]
            }
        ]
    );
}
