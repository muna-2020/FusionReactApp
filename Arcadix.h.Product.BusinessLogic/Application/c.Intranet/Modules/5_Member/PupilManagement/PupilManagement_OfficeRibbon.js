/**
 * @name GetOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/PupilManagment", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "Pupil"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "New") + "(-NI-)",
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "New") + "(-NI-)",
                                "type": "single",
                                //"OnClick": () => objData.AddPopup(),
                                "ImageName": "NewImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Edit") + "(-NI-)",
                                "type": "single",
                                //"OnClick": () => objData.EditPopup(),
                                "ImageName": "EditImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Delete") + "(-NI-)",
                                "type": "single",
                                //"OnClick": () => objData.DeletePopup(),
                                "ImageName": "DeleteImage"
                            }
                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "Send"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "SendLogins"),
                                "type": "single",
                                "OnClick": () => objData.OpenSendLoginProgressBarPopup(),
                                "ImageName": "SendLoginImage"
                            },
                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ExtranetSchool") + "(-NI-)",
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Result") + "(-NI-)",
                                "type": "single",
                                //"OnClick": () => objData.OpenSendLoginProgressBarPopup(),
                                "ImageName": "PupilResultsImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "AssignPupilToClass") + "(-NI-)",
                                "type": "single",
                                //  "OnClick": () => objData.EditPopup(),
                                "ImageName": "IconAssignImage"
                            }
                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ExtranetSchool") ,
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "OpenExtranetTestCenter") ,
                                "type": "single",
                                "OnClick": () => objData.OpenExtranetSchool(),
                                "ImageName": "OpenSchoolExtranetImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "ShowAllTeachers") ,
                                "type": "single",
                                "OnClick": () => objData.OpenExtranetTeacher(),
                                "ImageName": "OpenExtranetTeacherImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "ShowExtranet") ,
                                "type": "single",
                                "OnClick": () => objData.OpenExtranetPupil(),
                                "ImageName": "OpenExtranetPupilImage"
                            }
                            
                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "PupilDelete") + "(-NI-)",
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "PermanentelyDeleteCandidate") + "(-NI-)",
                                "type": "single",
                                // "OnClick": () => objData.EditPopup(),
                                "ImageName": "ExportExcelTemplateImage"
                            }

                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ExtranetSchoolAdmin") + "(-NI-)",
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "OpenExtranetTestCenter") + "(-NI-)",
                                "type": "single",
                                //"OnClick": () => objData.OpenSendLoginProgressBarPopup(),
                                "ImageName": "OpenSchoolExtranetImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "ShowAllTeachers") + "(-NI-)",
                                "type": "single",
                                //  "OnClick": () => objData.EditPopup(),
                                "ImageName": "OpenExtranetTeacherImage"
                            }
                        ]
                    },
                ],
                ImageMeta: {
                    ...objData.objContext.ImageMeta
                }
            }
        ]
    );
}