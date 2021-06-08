/**
* @name GetAddEditJobOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {object} add edit office ribbon data
*/
export function GetAddEditJobOfficeRibbonData(objData) {
    let arrRibbonData = [
        {
            Text: objData.objContext.props.Resource.Text.Job,
            ToolBarData: [
                {//Group1
                    "vGroupName": objData.objContext.props.Resource.Text["ToSave"],
                    "t_GroupData": [
                        {
                            "vTextName": objData.objContext.props.Resource.Text["ToSave"],
                            "ImageName": "SaveImage",
                            "type": "single",
                            "OnClick": objData.SaveMethod
                        },
                        {
                            "vTextName": objData.objContext.props.Resource.Text["SaveAndClose"],
                            "ImageName": "SaveAndCloseImage",
                            "type": "single",
                            "OnClick": objData.SaveAndCloseMethod
                        }
                    ]
                }
            ]
        }
    ];
    return arrRibbonData;
}
