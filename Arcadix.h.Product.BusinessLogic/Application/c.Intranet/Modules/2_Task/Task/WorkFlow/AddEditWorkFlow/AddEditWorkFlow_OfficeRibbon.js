
/**
* @name GetAddEditWorkFlowOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {object} add edit office ribbon data
*/
export function GetAddEditWorkFlowOfficeRibbonData(objData) {

    let objTextResource = objData.objContext.props.Resource.Text;
    let arrRibbonData = [
        {
            Text: Localization.TextFormatter(objTextResource, "Workflow"),
            ToolBarData: [
                {//Group1
                    "vGroupName": Localization.TextFormatter(objTextResource, "ToSave"),
                    "t_GroupData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "ToSave"),
                            "type": "single",
                            "OnClick": () => {
                                objData.SaveMethod(objData.objContext);
                            },
                            "ImageName": "SaveImage"
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "SaveAndClose"),
                            "type": "single",
                            "OnClick": () => {
                                objData.SaveAndCloseMethod(objData.objContext, true);
                            },
                            "ImageName": "SaveAndCloseImage"
                        }
                    ]
                }
            ]
        }
    ];
    return arrRibbonData;
}

