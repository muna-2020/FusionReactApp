/**
 * @name GetOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/SchoolManagment", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "School"),
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
                        "vGroupName": Localization.TextFormatter(objTextResource, "Send"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "SendLogin"),
                                "type": "single",
                                "OnClick": () => objData.OpenSendLoginProgressBarPopup(),
                                "ImageName": "SendLoginImage"
                            }

                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ExtranetSchool"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "OpenExtranetTestCenter"),
                                "type": "single",
                                "OnClick": () => objData.OpenExtranetSchool(),
                                "ImageName": "OpenSchoolExtranetImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "ShowAllTeachers"),
                                "type": "single",
                                "OnClick": () => objData.OpenAllTeachers(),
                                "ImageName":"OpenExtranetTeacherImage"
                            }
                        ]
                    },
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ExtranetSchoolAdmin"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "OpenExtranetTestCenter"),
                                "type": "single",
                                "OnClick": () => objData.OpenExtranetSchool(),
                                "ImageName": "OpenSchoolExtranetImage"
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
