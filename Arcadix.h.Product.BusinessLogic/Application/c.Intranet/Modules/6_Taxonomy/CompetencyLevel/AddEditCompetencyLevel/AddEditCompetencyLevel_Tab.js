/**
 * @name GetAddEditCategoryTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditCompetencyTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "CompetencyLevel"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "CompetencyLevel"),
                    "Id": "CompetencyLevel",
                    "Event": () => {
                        objData.ShowDiv("CompetencyLevel");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}