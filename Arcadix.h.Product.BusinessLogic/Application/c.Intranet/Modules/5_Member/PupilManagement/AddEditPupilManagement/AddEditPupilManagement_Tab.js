/**
 * @name GetAddEditPupilManagementTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditPupilManagementTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "PupilManagement"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "PupilManagement"),
                    "Id": "PupilManagement",
                    "Event": () => {
                        objData.ShowDiv("PupilManagement");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}