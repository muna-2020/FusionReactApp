/**
* @name GetAddEditJobTab
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetAddEditJobTab(objContext, objData) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Resource.Text["Job"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Resource.Text["Job"],
                    "Id": "Job",
                    "Event": () => { objData.ShowDiv("Job") }
                }
            ]
        }
    ];
    return arrContentData;
}