/**
 * @name GetOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/MemberFtpSync/FTPMemberImport", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "FTPMemberImport"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "Details"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "FileContent"),
                                "type": "single",
                                "OnClick": () => objData.FileContentPopup(),
                                "ImageName": "DetailsImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "AuditData"),
                                "type": "single",
                                "OnClick": () => objData.AuditPopup(),
                                "ImageName": "CompareImage"
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