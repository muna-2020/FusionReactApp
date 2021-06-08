/**
* @name GetData
* @summary it returns the object for Data 
* @returns {*} object
*/
export const GetData = () => {
    //The data is array of objects required for the Multiselect Dropdown with multilanguage data
    var arrList = [
        {
            "iSubjectId": 2417,
            "cIsDeleted": "N",
            "t_TestDrive_Subject_Data": [
                {
                    "iLanguageId": 3,
                    "vSubjectName": "test2",
                    "vSubjectDisplayName": null,
                    "vSubjectShortName": "tst",
                    "tSubjectDescription": null,
                    "iDataMainClientId": null
                }
            ]
        },
        {
            "iSubjectId": 2421,            
            "cIsDeleted": "N",
            "t_TestDrive_Subject_Data": [
                {
                    "iLanguageId": 3,
                    "vSubjectName": "Lesen",
                    "vSubjectDisplayName": "Lesen und Verstehen",
                    "vSubjectShortName": "DE",
                    "tSubjectDescription": "",
                    "iDataMainClientId": null
                }
            ]
        },
        {
            "iSubjectId": 2422,
            "cIsDeleted": "N",
            "t_TestDrive_Subject_Data": [
                {
                    "iLanguageId": 3,
                    "vSubjectName": "Schreiben",
                    "vSubjectDisplayName": "Schreiben",
                    "vSubjectShortName": "DE",
                    "tSubjectDescription": "&nbsp;",
                    "iDataMainClientId": null
                }
            ]
        },
        {
            "iSubjectId": 8030,
            "cIsDeleted": "N",
            "t_TestDrive_Subject_Data": [
                {
                    "iLanguageId": 3,
                    "vSubjectName": "Social Science",
                    "vSubjectDisplayName": null,
                    "vSubjectShortName": "SST",
                    "tSubjectDescription": null,
                    "iDataMainClientId": 97
                }
            ]
        }
    ];

    var arrSelectedList = [
        {
            "iSubjectId": 2417,            
            "cIsDeleted": "N",
            "t_TestDrive_Subject_Data": [
                {
                    "iLanguageId": 3,
                    "vSubjectDisplayName": null,
                    "vSubjectShortName": "tst",
                    "tSubjectDescription": null,
                    "iDataMainClientId": null
                }
            ]
        },
        {
            "iSubjectId": 8030,
            "cIsDeleted": "N",
            "t_TestDrive_Subject_Data": [
                {
                    "iLanguageId": 3,
                    "vSubjectName": "Social Science",
                    "vSubjectDisplayName": null,
                    "vSubjectShortName": "SST",
                    "tSubjectDescription": null,
                    "iDataMainClientId": 97
                }
            ]
        }
    ];
   
    return {
        MultiSelectDropdownData: arrList, //It is an array of objects. It is a mandatory props.
        SelectedItems: arrSelectedList   //MultiSelectDropdownData will display that value as the one which is selected on load. Here you pass the primary key of the selected items. 
    };
};