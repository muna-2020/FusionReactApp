
/**
 * @name GetDatabaseOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {array} array
 */
export function GetDatabaseCompareOfficeRibbonData(objData) {
    
    return (
        [
            {
                Text: "GenerateScript",   
                ToolBarData: [
                    {
                        "vGroupName": "GenerateScript",
                        "t_GroupData": [
                            {
                                "vTextName": "GenerateScript",
                                "type": "single",
                                "OnClick": () => objData.GetScripts(),
                                "ImageName": "NewImage"
                            }
                        ]
                    }
                ]
            },            
        ]
    );
}