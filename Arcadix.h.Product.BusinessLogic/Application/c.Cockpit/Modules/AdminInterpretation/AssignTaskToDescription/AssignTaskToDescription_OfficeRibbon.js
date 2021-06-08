/**
* @name GetLanguageOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetOfficeRibbonData(objData) {
    var objTextResource = objData.objContext.props.Resource.Text;
    return [
        {
            Text: Localization.TextFormatter(objTextResource, "Actions"),
            ToolBarData: [
                {//Group1
                    "vGroupName": objTextResource["ToSave"],
                    "t_GroupData": [
                        {
                            "vTextName": objTextResource["ToSave"],
                            "type": "single",
                            "OnClick": objData.Save,
                            "ImageName": "SaveImage"
                        },
                        {
                            "vTextName": objTextResource["SaveAndClose"],
                            "type": "single",
                            "OnClick": objData.SaveAndClose,
                            "ImageName": "SaveAndCloseImage"
                        }
                    ]
                }
            ]
        }
    ];
}
