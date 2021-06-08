/**
* @name GetData
* @summary it returns the object for Data 
* @returns {*} object
*/
export const GetData = () => {
    //The data is array of objects required for the Hierarcical Dropdown without multilanguage data
    let Data = [
        { id: 1, DisplayName: "Ankita", parentId:"0" ,cIsDeleted: "N" },
        { id: 2, DisplayName: "Aruneel", parentId: "0",cIsDeleted: "N" },
        { id: 3, DisplayName: "Arun", parentId: "1",cIsDeleted: "N" },
        { id: 4, DisplayName: "Sanjay", parentId: "2",cIsDeleted: "Y" }
    ];

    //const arrMultiLanguageData = [
    //    {
    //        "id": 1,
    //        "cIsDeleted": "N",
    //        "parentId": "0",
    //        "MultiLanguageTable": [
    //            {
    //                "iLanguageId": 3,
    //                "MultiLanguageName": "test1"
    //            },
    //            {
    //                "iLanguageId": 4,
    //                "MultiLanguageName": "test11"
    //            }
    //        ]
    //    },
    //    {
    //        "id": 2,
    //        "cIsDeleted": "N",
    //        "parentId": "0",
    //        "MultiLanguageTable": [
    //            {
    //                "iLanguageId": 3,
    //                "MultiLanguageName": "Mathematik2"
    //            },
    //            {
    //                "iLanguageId": 4,
    //                "MultiLanguageName": "Mathematik22"
    //            }
    //        ]
    //    },
    //    {
    //        "id": 3,
    //        "cIsDeleted": "N",
    //        "parentId": "1",
    //        "MultiLanguageTable": [
    //            {
    //                "iLanguageId": 3,
    //                "MultiLanguageName": "English3"
    //            },
    //            {
    //                "iLanguageId": 4,
    //                "MultiLanguageName": "English33"
    //            }
    //        ]
    //    },
    //    {
    //        "id": 4,
    //        "cIsDeleted": "N",
    //        "parentId": "2",
    //        "MultiLanguageTable": [
    //            {
    //                "iLanguageId": 3,
    //                "MultiLanguageName": "Dutch4"
    //            },
    //            {
    //                "iLanguageId": 4,
    //                "MultiLanguageName": "Dutch44"
    //            }
    //        ]
    //    }
    //];
    return {
        HierarchicalDropdownData: Data,
        SelectedValue: -1
    };
};