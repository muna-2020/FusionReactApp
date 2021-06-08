/**
* @name GetMetaData
* @summary it returns the array of metadatas
* @returns {array} MetaData
*/
export const GetMetaData = () => {
    let arrHeaderData = [
        {
            "vColumnName": "uBookId",
            "vDataType": "string",
            "iDisplayOrder": 1,
            "vTextResourcePage": "Book",
            "vTextResourceKey": "BookId",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iGenreId",
            "vDataType": "string",
            "iDisplayOrder": 2,
            "vTextResourcePage": "Book",
            "vTextResourceKey": "GenreId",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "iEdition",
            "vDataType": "string",
            "iDisplayOrder": 3,
            "vTextResourcePage": "Book",
            "vTextResourceKey": "Edition",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": null
        },
        {
            "vColumnName": "t_Fusion_Demo_Book_Data.vBookName",
            "vDataType": "string",
            "iDisplayOrder": 4,
            "vTextResourcePage": "Book",
            "vTextResourceKey": "BookName",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_Fusion_Demo_Book_Data.vAuthor",
            "vDataType": "string",
            "iDisplayOrder": 5,
            "vTextResourcePage": "Book",
            "vTextResourceKey": "Author",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        },
        {
            "vColumnName": "t_Fusion_Demo_Book_Data.vPublisher",
            "vDataType": "string",
            "iDisplayOrder": 6,
            "vTextResourcePage": "Book",
            "vTextResourceKey": "Publisher",
            "vControlType": "textbox",
            "IsMandatory": "N",
            "vValidationType": null,
            "iWidth": null,
            "cShowMultiLanguage": "Y"
        }
       ];
    let objMeta = {
        HeaderData: arrHeaderData,
        Filter: null
    };
    return objMeta;
};