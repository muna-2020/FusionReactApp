/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "uSchoolId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Book",
            "vTextResourceKey": "BookId",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        }
        //,
        //{
        //    "vColumnName": "vSchoolName",
        //    "vDataType": "string",
        //    "iDisplayOrder": 2,
        //    "vTextResourcePage": "Book",
        //    "vTextResourceKey": "GenreId",
        //    "vControlType": "textbox",
        //    "IsMandatory": "N",
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //},
        //{
        //    "vColumnName": "vFirstName",
        //    "vDataType": "string",
        //    "iDisplayOrder": 3,
        //    "vTextResourcePage": "Book",
        //    "vTextResourceKey": "Edition",
        //    "vControlType": "textbox",
        //    "IsMandatory": "N",
        //    "vValidationType": null,
        //    "iWidth": null,
        //    "cShowMultiLanguage": null
        //}
       ];
    let objMeta = {
        HeaderData: arrHeaderData,
        Filter: null
    };
    return objMeta;
};