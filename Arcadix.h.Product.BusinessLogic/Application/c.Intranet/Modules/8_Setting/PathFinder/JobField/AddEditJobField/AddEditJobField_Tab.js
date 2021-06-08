/**
 * @name GetAddEditJobFieldTab
 *@param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditJobFieldTab(objContext, objData) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Resource.Text["JobField"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Resource.Text["JobField"],
                    "Id": "JobField",
                    "Event": () => { objData.ShowDiv("JobField") }
                }
            ]
        }
    ];
    return arrContentData;
}