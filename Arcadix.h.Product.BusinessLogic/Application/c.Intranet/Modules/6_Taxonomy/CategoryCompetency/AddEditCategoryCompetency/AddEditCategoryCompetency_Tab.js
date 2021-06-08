/**
 * @name GetAddEditCategoryCompetencyTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditCategoryCompetencyTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;  
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "CategoryCompetency"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "CategoryCompetency"),
                    "Id": "CategoryCompetency",
                    "Event": () => {
                        objData.ShowDiv("CategoryCompetency");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}