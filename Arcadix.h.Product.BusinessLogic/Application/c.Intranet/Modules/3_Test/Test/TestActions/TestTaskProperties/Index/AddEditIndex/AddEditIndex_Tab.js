/**
* @name GetAddEditSubjectTab
 *@param {object} objContext takes objContext
* @param {object} objData takes objData
* @summary Setting up Content Data
* @returns {array} arrContentData
*/
export function GetAddEditIndexTab(objContext, objData) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Resource.Text["Index"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Resource.Text["Index"],
                    "Id": "Index",
                    "Event": () => { objData.ShowDiv("Index") }
                }   
            ]
        }
    ];
    return arrContentData;
}