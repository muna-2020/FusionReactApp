/**
* @name GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = () => {

    //The data is an array of objects required for dropdown.
    const arrMultiLanguageData = [
        {
            "id": 1,
            "cIsDeleted": "N",
            "MultiLanguageTable": [
                {
                    "iLanguageId": 3,
                    "MultiLanguageName": "option1"
                },
                {
                    "iLanguageId": 4,
                    "MultiLanguageName": "option11"
                }
            ]
        },
        {
            "id": 2,
            "cIsDeleted": "N",
            "MultiLanguageTable": [
                {
                    "iLanguageId": 3,
                    "MultiLanguageName": "option2"
                },
                {
                    "iLanguageId": 4,
                    "MultiLanguageName": "option22"
                }
            ]
        },
        {
            "id": 3,
            "cIsDeleted": "N",
            "MultiLanguageTable": [
                {
                    "iLanguageId": 3,
                    "MultiLanguageName": "option3"
                },
                {
                    "iLanguageId": 4,
                    "MultiLanguageName": "option33"
                }
            ]
        },
        {
            "id": 4,
            "cIsDeleted": "N",
            "MultiLanguageTable": [
                {
                    "iLanguageId": 3,
                    "MultiLanguageName": "option4"
                },
                {
                    "iLanguageId": 4,
                    "MultiLanguageName": "option44"
                }
            ]
        }
    ];
    return {
        DropdownData: arrMultiLanguageData, //this is a mandatory prop
        SelectedValue: "2" //Dropdown will display that value as the one which is selected on load. Here you pass the primary key of the selected items. This is an optional props
    };
};