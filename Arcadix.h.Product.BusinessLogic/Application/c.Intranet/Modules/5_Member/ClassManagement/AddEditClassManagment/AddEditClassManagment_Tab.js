//Module realted fies.
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

/**
 * @name GetAddEditClassManagmentTab
 * @param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditClassManagmentTab(objContext, objData) {

    let objTextResource = objContext.props.Resource.Text;
    let arrContentData = [
        {
            "Text": Localization.TextFormatter(objTextResource, "ClassManagment"),
            "Id": "NavId1",
            "Children": [
                {
                    "Text": Localization.TextFormatter(objTextResource, "ClassManagment"),
                    "Id": "ClassManagment",
                    "Event": () => {
                        objData.ShowDiv("ClassManagment");
                    }
                }
            ]
        }
    ];
    return arrContentData;
}