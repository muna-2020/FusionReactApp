/**
* @name GetBookToolData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetBookOfficeRibbonData(objData) {
    var objTextResource = objData.objContext.props["Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/l.Demo/Modules/Book"].Data[0]["Book"] 
    return (
        [
            {
                Text: objTextResource["Book"],
                ToolBarData: [
                    {//Group3
                        "vGroupName": objTextResource["New"],
                        "t_GroupData": [
                            {
                                "vTextName": objTextResource["New"],
                                "uImageUrl": "/Images/Common/OfficeRibbon/New_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.AddPopup()
                            },
                            {
                                "vTextName": objTextResource["Edit"],
                                "uImageUrl": "/Images/Common/OfficeRibbon/Edit_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.EditPopup()
                            },
                            {
                                "vTextName": objTextResource["Delete"],
                                "uImageUrl": "/Images/Common/OfficeRibbon/Delete_Large.svg",
                                "type": "single",
                                "OnClick": () => objData.DeletePopup()
                            }
                        ]
                    }

                ]
            }
        ]
    );
}