/**
* @name GetMainClientCountryOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetCycleSchoolYearOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/CycleSchoolYear", objData.objContext.props) ?? {};
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "CycleSchoolYearSaveText"),
                ToolBarData: [
                    {
                        "vGroupName": Localization.TextFormatter(objTextResource, "ToSave"),
                        "t_GroupData": [
                            {
                                "ImageName": "SaveImage",
                                "type": "single",
                                "OnClick": () => objData.SaveMethod()
                            }
                        ]
                    }
                ]
            }
        ]
    );
}
