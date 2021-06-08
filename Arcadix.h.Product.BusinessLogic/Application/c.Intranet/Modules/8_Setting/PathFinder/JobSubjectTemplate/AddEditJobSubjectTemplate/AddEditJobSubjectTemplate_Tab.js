/**
 * @name GetAddEditJobSubjectTemplateTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditJobSubjectTemplateTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "JobSubjectTemplate"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "BaseData"),
                    "Id": "BaseData",
                    "Event": () => {
                        objData.ShowDiv("BaseData");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}