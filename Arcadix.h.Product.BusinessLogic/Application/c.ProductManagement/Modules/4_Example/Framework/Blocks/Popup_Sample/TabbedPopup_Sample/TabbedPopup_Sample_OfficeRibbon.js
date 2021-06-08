
/**
* @name GetOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetOfficeRibbonData(objData) {
    return (
        [
            {
                Text: "TabbedPopup_Sample",
                ToolBarData: [
                    {
                        "vGroupName": "Save",
                        "t_GroupData": [
                            {
                                "vTextName": "Save",
                                "uImageUrl": "/Images/Common/OfficeRibbon/Save.svg",
                                "type": "single",
                                "OnClick": () => objData.SavePopup()
                            }
                        ]
                    }
                ]
            }
        ]
    );
}
