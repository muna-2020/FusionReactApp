/**
 * @name GetAddEditCompetencyRangeTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditProductManagementUserTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "ProductManagementUser"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "ProductManagementUser"),
                    "Id": "ProductManagementUser",
                    "Event": () => {
                        objData.ShowDiv("ProductManagementUser");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}