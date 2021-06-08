/**
* @name GetAddEditNavigationTab
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetAddEditTimeTab(objContext, objData) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Resource.Text["Time"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Resource.Text["Time"],
                    "Id": "Time",
                    "Event": () => { objData.ShowDiv("Time") }
                }   
            ]
        }
    ];
    return arrContentData;
}