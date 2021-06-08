/**
 * @name GetAddEditSubjectOfficeRibbonData
 * @param {object} objData takes  objData
 * @summary Get data to initialize RibbonData
 * @returns {object} add edit office ribbon data
 */
export function GetAddEditSubjectOfficeRibbonData(objData) {
    let arrRibbonData = [
        {
            Text: objData.objContext.props.Resource.Text.Subject,
            ToolBarData: [
                {//Group1
                    "vGroupName": objData.objContext.props.Resource.Text["ToSave"],
                    "t_GroupData": [
                        {
                            "vTextName": objData.objContext.props.Resource.Text["ToSave"],
                            "uImageUrl": "/Images/Common/OfficeRibbon/Save.svg",
                            "type": "single",
                            "OnClick": objData.SaveMethod,
                            "ImageName":"SaveImage" 
                        },
                        {
                            "vTextName": objData.objContext.props.Resource.Text["SaveAndClose"],
                            "uImageUrl": "/Images/Common/OfficeRibbon/SaveAndClose_Large.svg",
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
