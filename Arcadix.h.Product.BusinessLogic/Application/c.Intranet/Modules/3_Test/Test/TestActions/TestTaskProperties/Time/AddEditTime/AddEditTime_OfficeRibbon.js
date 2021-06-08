/**
* @name GetEditTimeOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {object} add edit office ribbon data
*/
export function GetEditTimeOfficeRibbonData(objData) {
    let arrRibbonData = [
        {
            Text: objData.objContext.props.Resource.Text.Time,
            ToolBarData: [
                {//Group1
                    "vGroupName": objData.objContext.props.Resource.Text["ToSave"],
                    "t_GroupData": [
                        {
                            "vTextName": objData.objContext.props.Resource.Text["ToSave"],
                            "type": "single",
                            "OnClick": objData.SaveMethod,
                            "ImageName": "SaveImage"
                        },
                        {
                            "vTextName": objData.objContext.props.Resource.Text["SaveAndClose"],
                            "type": "single",
                            "OnClick": objData.SaveAndCloseMethod,
                            "ImageName": "SaveAndCloseImage"
                        }
                    ]
                }
            ]
        }
    ];
    return arrRibbonData;
}
