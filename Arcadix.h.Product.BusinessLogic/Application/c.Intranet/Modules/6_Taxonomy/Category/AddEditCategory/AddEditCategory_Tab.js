/**
 * @name GetAddEditCategoryTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditCategoryTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;  
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "CategoryManagement"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "CategoryManagement"),
                    "Id": "CategoryManagement",
                    "Event": () => {
                        objData.ShowDiv("CategoryManagement");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}