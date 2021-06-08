
/**
* @name GetRolesOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetRolesOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/Roles", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "Roles"),
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
                        "vGroupName": Localization.TextFormatter(objTextResource, "RoleManagement"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "AssignPrivilege"),
                                "type": "single",
                                "OnClick": () => objData.AssignPrivilege(),
                                "ImageName": "NewImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Copy"),
                                "type": "single",
                                "OnClick": () => objData.CopySystemRole(),
                                "ImageName": "CopyImage"
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