/**
 * @name GetAddEditSubjectTab
 *@param {object} objContext takes objContext
 * @param {object} objData takes objData
 * @summary Setting up Content Data
 * @returns {array} arrContentData
 */
export function GetAddEditSubjectTab(objContext, objData) {
    let arrContentData = [
        {//Group1
            "Text": objContext.props.Resource.Text["Competences"],
            "Id": "NavId1",
            "Children": [
                {
                    "Text": objContext.props.Resource.Text["SubjectManagementMain"],
                    "Id": "SubjectManagementMain",
                    "Event": () => { objData.ShowDiv("SubjectManagementMain") }
                },
                {
                    "Text": objContext.props.Resource.Text["SubjectManagementDetails"],
                    "Id": "SubjectManagementDetails",
                    "Event": () => { objData.ShowDiv("SubjectManagementDetails") }
                },
                {
                    "Text": objContext.props.Resource.Text["AdaptiveDetails"],
                    "Id": "AdaptiveDetails",
                    "Event": () => { objData.ShowDiv("AdaptiveDetails") }
                }
            ]
        }
        //include it later
        //{//Group1
        //    "Text": objContext.props.Resource.Text["Audit"],
        //    "Id": "NavId2",
        //    "Children": [
        //        {
        //            "Text": objContext.props.Resource.Text["Audit"],
        //            "Id": "Audit",
        //            "Event": () => { ShowDiv("Audit", objContext) }
        //        }
        //    ]
        //}
    ];
    return arrContentData;
}