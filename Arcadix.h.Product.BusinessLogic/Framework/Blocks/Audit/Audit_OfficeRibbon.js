/**
* @name GetAuditOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetAuditOfficeRibbonData(objData) {
    return (
        [
            {
                Text: objData.objContext.props.Resource.Text.Audit,
                ToolBarData: [
                    {//Group2
                        "vGroupName": objData.objContext.props.Resource.Text.Compare,
                        "t_GroupData": [
                            {
                                "vTextName": objData.objContext.props.Resource.Text.Compare,
                                "uImageUrl": "/Images/Common/Icons/compare1.svg",
                                "type": "single",
                                "OnClick": () => objData.ComparePopup()
                            }
                        ]
                    }
                ]
            }
        ]
    )
}