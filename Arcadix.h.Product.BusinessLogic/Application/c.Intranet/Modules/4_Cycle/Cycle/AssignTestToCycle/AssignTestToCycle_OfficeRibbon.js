/**
* @name GetLanguageOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetOfficeRibbonData(objData) {
    var objTextResource = objData.objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/Cycle/AssignTestToCycle", objData.objContext.props);
    return [
        {
            Text: "AssignTestToCycle",
            ToolBarData: [
                {//Group1
                    "vGroupName": objTextResource["ToSave"],
                    "t_GroupData": [
                        {
                            "vTextName": objTextResource["ToSave"],
                            "ImageName": "SaveImage",
                            "type": "single",
                            "OnClick": objData.Save
                        },
                        {
                            "vTextName": objTextResource["SaveAndClose"],
                            "ImageName": "SaveAndCloseImage",
                            "type": "single",
                            "OnClick": objData.SaveAndClose
                        }
                    ]
                },
            ]
        }
    ]
}
