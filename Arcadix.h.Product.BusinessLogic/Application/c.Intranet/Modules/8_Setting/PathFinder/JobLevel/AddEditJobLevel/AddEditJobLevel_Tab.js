/**
* @name GetAddEditJobLevelTab
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetAddEditJobLevelTab(objContext, objData) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Resource.Text["JobLevel"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Resource.Text["JobLevel"],
                    "Id": "JobLevel",
                    "Event": () => { objData.ShowDiv("JobLevel") }
                }
            ]
        }
    ];
    return arrContentData;
}