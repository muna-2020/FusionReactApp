/**
* @name GetData
* @summary it returns the object for Data 
* @returns {*} object
*/
export const GetData = () => {

    //The data is array of objects required for the Hierarchical Dropdown without multilanguage data
    const arrMultiLanguageData = [
        {
            "id": 1,
            "cIsDeleted": "N",
            "parentId": "0",
            "MultiLanguageTable": [
                {
                    "iLanguageId": 3,
                    "MultiLanguageName": "test1"
                },
                {
                    "iLanguageId": 4,
                    "MultiLanguageName": "test11"
                }
            ]
        },
        {
            "id": 2,
            "cIsDeleted": "N",
            "parentId": "0",
            "MultiLanguageTable": [
                {
                    "iLanguageId": 3,
                    "MultiLanguageName": "Mathematik2"
                },
                {
                    "iLanguageId": 4,
                    "MultiLanguageName": "Mathematik22"
                }
            ]
        },
        {
            "id": 3,
            "cIsDeleted": "N",
            "parentId": "1",
            "MultiLanguageTable": [
                {
                    "iLanguageId": 3,
                    "MultiLanguageName": "English3"
                },
                {
                    "iLanguageId": 4,
                    "MultiLanguageName": "English33"
                }
            ]
        },
        {
            "id": 4,
            "cIsDeleted": "N",
            "parentId": "2",
            "MultiLanguageTable": [
                {
                    "iLanguageId": 3,
                    "MultiLanguageName": "Dutch4"
                },
                {
                    "iLanguageId": 4,
                    "MultiLanguageName": "Dutch44"
                }
            ]
        }
    ];
    return {
        HierarchicalDropdownData: arrMultiLanguageData, //this is a mandatory prop
        SelectedValue: -1 //Hierarchical Dropdown will display that value as the one which is selected on load. Here you pass the primary key of the selected items. This is an optional props
    };
};