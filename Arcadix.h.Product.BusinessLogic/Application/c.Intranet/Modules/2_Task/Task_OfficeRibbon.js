
/**
* @name GetTaskOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetTaskOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "Task"),
                ToolBarData: [
                {//Group1
                    "vGroupName": Localization.TextFormatter(objTextResource, "Course"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Course"),
                            "type": "single",
                            "OnClick": () => objData.AddPopup("Presentation"),
                            "ImageName": "PresentationImage"
                        }
                    ]
                },
                {//Group2
                    "vGroupName": Localization.TextFormatter(objTextResource, "Demo"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Demo"),
                            "type": "single",
                            "OnClick": () => objData.AddPopup("Demo"),
                            "ImageName": "DemoImage"
                        }
                    ]
                },
                {//Group3
                    "vGroupName": Localization.TextFormatter(objTextResource, "Exercise_Exam"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Learn"),
                            "type": "single",
                            "OnClick": () => objData.AddPopup("Learning"),
                            "ImageName": "LearningImage"
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Check"),
                            "type": "single",
                            "OnClick": () => objData.AddPopup("LowStake"),
                            "ImageName": "LowStakeImage"
                        }
                    ]
                },
                {//Group4
                    "vGroupName": Localization.TextFormatter(objTextResource, "Test"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Test"),
                            "type": "single",
                            "OnClick": () => objData.AddPopup("HighStake"),
                            "ImageName": "HighStakeImage"
                        },
                        {
                            "type": "Multiple",
                            "MultipleData": [
                                {
                                    "vTextName": Localization.TextFormatter(objTextResource, "Example"),
                                    "type": "single",
                                    "OnClick": () => objData.AddPopup("HighStakeExample"),
                                    "ImageName": "HighStakeExampleImage"
                                },
                                {
                                    "vTextName": Localization.TextFormatter(objTextResource, "Manual"),
                                    "type": "single",
                                    "OnClick": () => objData.AddPopup("HighStakeIntro"),
                                    "ImageName": "HighStakeIntroImage"
                                },
                                {
                                    "vTextName": Localization.TextFormatter(objTextResource, "Pause"),
                                    "type": "single",
                                    "OnClick": () => objData.AddPopup("HighStakeBreak"),
                                    "ImageName": "HighStakeBreakImage"
                                },

                            ]
                        },
                        {
                            "type": "Multiple",
                            "MultipleData": [
                                {
                                    "vTextName": Localization.TextFormatter(objTextResource, "Survey"),
                                    "type": "single",
                                    "OnClick": () => objData.AddPopup("HighStakeSurvey"),
                                    "ImageName": "HighStakeSurveyImage"
                                },
                                {
                                    "vTextName": Localization.TextFormatter(objTextResource, "List"),
                                    "type": "single",
                                    "OnClick": () => objData.AddPopup("HighStakeSurveyList"),
                                    "ImageName": "HighStakeSurveyListImage"
                                },
                            ]
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Test"),
                            "type": "single",
                            "OnClick": () => objData.AddPopup("HighStakeAdaptive"),
                            "ImageName": "HighStakeAdaptiveImage"
                        },
                    ]
                },
                {//Group5
                    "vGroupName": Localization.TextFormatter(objTextResource, "Survey"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Survey"),
                            "type": "single",
                            "OnClick": () => objData.AddPopup("Survey"),
                            "ImageName": "SurveyImage"
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "List"),
                            "type": "inverted",
                            "OnClick": () => objData.AddPopup("SurveyList"),
                            "ImageName": "SurveyListImage"
                        },
                    ]
                },
                {//Group6
                    "vGroupName": Localization.TextFormatter(objTextResource, "To_Edit"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "To_Edit"),
                            "type": "single",
                            "OnClick": () => objData.EditPopup(),
                            "ImageName": "EditImage"
                        },
                        {
                            "type": "Multiple",
                            "MultipleData": [
                                {
                                    "vTextName": Localization.TextFormatter(objTextResource, "Copy"),
                                    "type": "single",
                                    "OnClick": () => objData.CopyTask(),
                                    "ImageName": "CopyImage"
                                },
                                {
                                    "vTextName": Localization.TextFormatter(objTextResource, "Cut_Out"),
                                    "type": "single",
                                    "OnClick": () => objData.CutTask(),
                                    "ImageName": "CutImage"
                                },
                                {
                                    "vTextName": Localization.TextFormatter(objTextResource, "Insert"),
                                    "type": "single",
                                    "OnClick": () => objData.PasteFolder(),
                                    "ImageName": "PasteImage"
                                },
                            ]
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Clear"),
                            "type": "single",
                            "OnClick": () => objData.DeletePopup(),
                            "ImageName": "DeleteImage"
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Abort"),
                            "type": "single",
                            "OnClick": () => objData.CancelCutCopy(),
                            "ImageName": "CancelImage"
                        },
                    ]
                },
                {//Group7
                    "vGroupName": Localization.TextFormatter(objTextResource, "Dates"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Back_to_the_search_result"),
                            "type": "single",
                            "Disabled": true,
                            "ImageName": "BackToSearchViewImage"
                        },

                    ]
                },
                {//Group8
                    "vGroupName": Localization.TextFormatter(objTextResource, "Open_Editor"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Open_Editor"),
                            "type": "single",
                            "OnClick": () => objData.OpenTaskInEditor(JConfiguration.InterfaceLanguageId),
                            "ImageName": "OpenEditorImage"
                        },
                        {
                            "type": "Multiple",
                            "MultipleData": GetMultiLanguageOptionsForEditor(objData, objData.OpenTaskInEditor)
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

/**
* @name GetMultiLanguageOptionsForEditor
* @param {object} objData takes  objData
* @param {any} fnOpenTaskInEditor
* @summary Gets multi language ribbon options for Editor
* @returns {array} array
*/
function GetMultiLanguageOptionsForEditor(objData, fnOpenTaskInEditor) {
    let arrContextOptions = objData.MultiLanguageData.map(objLanguage => {
        let objDefaultLanguage = objLanguage.t_Framework_Language_Data.find(objLang => objLang.iLanguageId == JConfiguration.InterfaceLanguageId);
        return {
            "vTextName": objDefaultLanguage?.vLanguageName,
            "OnClick": () => {
                fnOpenTaskInEditor(objLanguage.iFrameworkLanguageId);
            },
            "ImageName": "OpenEditorImage"
        }
    })
    return objData.MultiLanguageData.length > 1 ? arrContextOptions : [];
}