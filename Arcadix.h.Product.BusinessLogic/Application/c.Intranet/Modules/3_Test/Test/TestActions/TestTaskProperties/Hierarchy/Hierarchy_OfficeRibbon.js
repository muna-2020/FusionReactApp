/**
* @name GetOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetOfficeRibbonData(objData) {
    var objTextResource = objData.objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objData.objContext.props);
    return (
        [
            {
                Text: Localization.TextFormatter(objTextResource, "Actions"),
                ToolBarData: [
                    {//Group1
                        "vGroupName": Localization.TextFormatter(objTextResource, "New"),
                        "t_GroupData": [
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Edit"),
                                "type": "single",
                                "OnClick": () => objData.EditPopup(),
                                "ImageName": "EditImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Up") ,
                                "type": "single",
                                "OnClick": () => {
                                    objData.MoveUp();
                                },
                                "ImageName": "MoveUpImage"
                            },
                            {
                                "vTextName": Localization.TextFormatter(objTextResource, "Downward") ,
                                "type": "single",
                                "OnClick": () => {
                                    objData.MoveDown();
                                },
                                "ImageName": "MoveDownImage"
                            }
                        ]
                    }
                ],
                ImageMeta: {
                    ...objData.objContext.ImageMeta
                }
            }
        ]
    );
}
