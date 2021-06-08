/**
 * @name GetOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/ClassManagment", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "ClassManagment"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "New"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "New"),
                                "type": "single",
                                "OnClick": () => objData.AddPopup(),
                                "ImageName": "NewImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Edit"),
                                "type": "single",
                                "OnClick": () => objData.EditPopup(),
                                "ImageName": "EditImage"
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
                        "vGroupName": Localization.TextFormatter(objTextResource, "Extranet"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "SendLogin") + "(-NI-)",
                                "type": "single",
                                //"OnClick": () => objData.OpenSendLoginProgressBarPopup(),
                                "ImageName": "SendLoginImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Certificate") + "(-NI-)",
                                "type": "single",
                                //"OnClick": () => objData.EditPopup(),
                                "ImageName": "CertificateImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Result") + "(-NI-)",
                                "type": "single",
                                //"OnClick": () => objData.EditPopup(),
                                "ImageName": "ResultImage"
                            }

                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ExtranetSchool") + "(-NI-)",
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "OpenExtranetTestCenter"),
                                "type": "single",
                                "OnClick": () => objData.OpenExtranetSchool(),
                                "ImageName": "OpenSchoolExtranetImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "ExtranetTestLead"),
                                "type": "single",
                                "OnClick": () => objData.OpenExtranetTeacher(),
                                //"OnClick": () => objData.EditPopup(),
                                "ImageName": "OpenExtranetTeacherImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "ShowAllTeachers") + "(-NI-)",
                                "type": "single",
                               // "OnClick": () => objData.OpenExtranetTeacher(),
                                "ImageName": "ShowAllPupilsImage"
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
                                "vTextName": Localization.TextFormatter(objTextResource, "ExtranetTestLead") + "(-NI-)",
                                "type": "single",
                                //"OnClick": () => objData.EditPopup(),
                                "ImageName": "OpenExtranetTeacherImage"
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
