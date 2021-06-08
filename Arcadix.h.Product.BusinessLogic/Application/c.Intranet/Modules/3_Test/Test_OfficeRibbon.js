/**
* @name GetLanguageOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test", objData.objContext.props) ?? {};
    return [
        {
            Text: Localization.TextFormatter(objTextResource, "Test"),
            ToolBarData: [
                {//Group1
                    "vGroupName": Localization.TextFormatter(objTextResource, "Course"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Course"),
                            "ImageName": "PresentationImage",
                            "type": "single",
                            "OnClick": () => objData.AddTest("Presentation")
                        }
                    ]
                },
                {//Group2
                    "vGroupName": Localization.TextFormatter(objTextResource, "Demo"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Demo"),
                            "ImageName": "DemoImage",
                            "type": "single",
                            "OnClick": () => objData.AddTest("Demo")
                        }
                    ]
                },
                {//Group3
                    "vGroupName": Localization.TextFormatter(objTextResource, "Exercise_Exam"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Learn"),
                            "ImageName": "LearningImage",
                            "type": "single",
                            "OnClick": () => objData.AddTest("Learning")
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Check"),
                            "ImageName": "LowStakeImage",
                            "type": "single",
                            "OnClick": () => objData.AddTest("LowStake")
                        }
                    ]
                },

                {//Group4
                    "vGroupName": Localization.TextFormatter(objTextResource, "Test"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Test"),
                            "ImageName": "HighStakeImage",
                            "type": "single",
                            "OnClick": () => objData.AddTest("HighStake")
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Shell"),
                            "ImageName": "WrapperImage",
                            "type": "inverted",
                            "OnClick": () => objData.AddTest("Wrapper")
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Adaptive"),
                            "ImageName": "HighStakeAdaptiveImage",
                            "type": "single",
                            "OnClick": () => objData.AddTest("HighStakeAdaptive")
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Paper"),
                            "ImageName": "EssayImage",
                            "type": "single",
                            "OnClick": () => objData.AddTest("Essay")
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "External"),
                            "ImageName": "ExternalImage",
                            "type": "single",
                            "OnClick": () => objData.AddTest("External")
                        }
                    ]
                },
                {//Group5
                    "vGroupName": Localization.TextFormatter(objTextResource, "Survey"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Survey"),
                            "ImageName": "SurveyImage",
                            "type": "single",
                            "OnClick": () => objData.AddTest("Survey")
                        }
                    ]
                },
                {//Group6
                    "vGroupName": Localization.TextFormatter(objTextResource, "To_Edit"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "To_Edit"),
                            "ImageName": "EditImage",
                            "type": "single",
                            "OnClick": () => objData.EditTest()
                        },
                        {
                            "type": "Multiple",
                            "MultipleData": [
                                {
                                    "vTextName": Localization.TextFormatter(objTextResource, "Copy"),
                                    "ImageName": "CopyImage",
                                    "type": "single",
                                    "OnClick": () => objData.CopyTest()
                                },
                                {
                                    "vTextName": Localization.TextFormatter(objTextResource, "Cut_Out"),
                                    "ImageName": "CutImage",
                                    "type": "single",
                                    "OnClick": () => objData.CutTest()
                                },
                                {
                                    "vTextName": Localization.TextFormatter(objTextResource, "Insert"),
                                    "ImageName": "PasteImage",
                                    "OnClick": () => objData.PasteFolder(),
                                    "type": "single"
                                },
                            ]
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Clear"),
                            "ImageName": "DeleteImage",
                            "type": "single",
                            "OnClick": () => objData.DeletePopup()
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Abort"),
                            "ImageName": "CancelImage",
                            "type": "single"
                        },
                    ]
                },
                {//Group7
                    "vGroupName": Localization.TextFormatter(objTextResource, "Dates"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Back_to_the_search_result"),
                            "ImageName": "BackToSearchViewImage",
                            "type": "single",
                            "Disabled": true
                        },

                    ]
                }
            ],
            ImageMeta: {
                ...objData.objContext.ImageMeta
            }
        }
    ]
}
