/**
 * @name GetAddEditCompetencyRangeTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditCompetencyRangeTab(objContext, objData) {
    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "CompetencyRange"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "CompetencyRange"),
                    "Id": "CompetencyRange",
                    "Event": () => {
                        objData.ShowDiv("CompetencyRange");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}