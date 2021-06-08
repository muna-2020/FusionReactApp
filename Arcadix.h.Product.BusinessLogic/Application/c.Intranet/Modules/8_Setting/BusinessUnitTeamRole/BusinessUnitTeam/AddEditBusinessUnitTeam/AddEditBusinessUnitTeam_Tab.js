/**
 * @name GetAddEditTeamTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditTeamTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "Team"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "Team"),
                    "Id": "Team",
                    "Event": () => {
                        objData.ShowDiv("Team");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}