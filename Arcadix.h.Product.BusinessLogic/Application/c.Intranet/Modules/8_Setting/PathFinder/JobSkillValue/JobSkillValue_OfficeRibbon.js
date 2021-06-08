/**
* @name GetOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/PathFinder/JobSkillValue", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "JobSkillValue"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ToSave"),
                        "t_GroupData": [
                            {
                                //"vTextName": Localization.TextFormatter(objTextResource, "ToSave"),
                                "ImageName": "SaveImage",
                                "type": "single",
                                "OnClick": () => objData.SaveData()
                            }                            
                        ]
                    }
                ]
            }
        ]
    );
}
