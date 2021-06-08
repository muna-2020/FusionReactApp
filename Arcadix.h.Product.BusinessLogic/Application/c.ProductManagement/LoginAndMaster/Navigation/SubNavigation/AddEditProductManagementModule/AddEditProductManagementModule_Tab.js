
/**
 * @name GetAddEditProductManagementModuleTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditProductManagementModuleTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Module"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "BaseData"),
                    "Id": "ProductManagementModule",
                    "Event": () => {
                        objData.ShowDiv("ProductManagementModule");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}