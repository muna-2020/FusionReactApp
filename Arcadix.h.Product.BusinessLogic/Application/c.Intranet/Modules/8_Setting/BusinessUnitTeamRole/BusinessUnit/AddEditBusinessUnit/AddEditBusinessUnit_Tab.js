/**
 * @name GetAddEditCompetencyRangeTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditBusinessUnitTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "BusinessUnit"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "BusinessUnit"),
                    "Id": "BusinessUnit",
                    "Event": () => {
                        objData.ShowDiv("BusinessUnit");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}