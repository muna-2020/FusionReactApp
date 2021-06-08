/**
* @name GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = () => {

    function FormRowData() {
        var arrRows = [];
        for (var i = 1; i <= 5; i++) {
                let objRow = {
                    "TextBoxColumn": "TextBox_Value" + i,
                    "TextBoxMultiLanguageTable": [
                        {
                            "iLanguageId": "3",
                            "TextBoxMultiLanguageColumn": "Language_de_" + i
                        },
                        {
                            "iLanguageId": "2",
                            "TextBoxMultiLanguageColumn": "Language_fr_" + i
                        },
                        {
                            "iLanguageId": "4",
                            "TextBoxMultiLanguageColumn": "Language_it_" + i
                        },
                        {
                            "iLanguageId": "1",
                            "TextBoxMultiLanguageColumn": "Language_en_" + i
                        }
                    ],
                    "LabelColumn": "LabelColumn_Value" + i,
                    "DateColumn": "11.11.1994",
                    "DateTimeColumn": "12.11.1994",
                    "ImageColumn": "test.svg",
                    "ImageColumn_CheckBox": "Y",
                    "DropDownValueColumnName": i,
                    "LanguageDependentDropDownValueColumnName": 1,
                    "SubGridData": {}
                };
                arrRows = [...arrRows, objRow];
        }
        return arrRows;
    }
    //let arrRowData = FormRowData();

    let arrRowData = [
        {
            "TextBoxColumn": "TextBox_Value" ,
            "TextBoxMultiLanguageTable": [
                {
                    "iLanguageId": "3",
                    "TextBoxMultiLanguageColumn": "Language_de" 
                },
                {
                    "iLanguageId": "2",
                    "TextBoxMultiLanguageColumn": "Language_fr" 
                },
                {
                    "iLanguageId": "4",
                    "TextBoxMultiLanguageColumn": "Language_it" 
                },
                {
                    "iLanguageId": "1",
                    "TextBoxMultiLanguageColumn": "Language_en" 
                }
            ],
            "LabelColumn": "LabelColumn_Value" ,
            "DateColumn": "11.11.1994",
            "DateTimeColumn": "12.11.1994",
            "ImageColumn": "test.svg",
            "ImageColumn_CheckBox": "Y",
            "DropDownValueColumnName": 1,
            "LanguageDependentDropDownValueColumnName": 1
        }
    ];

    arrRowData = FormRowData();
    //The data has all the fields corresponding to the Header (meta data) keys. It is a mandatory props
    
    //Will hold the information of the different language that the client uses. It is a mandatory props.
    let LanguageData = [
        {
            "iFrameworkLanguageId": 3,
            "vLanguageCultureInfo": "de",
            "vLanguageIdentifier": "German",
            "iDisplayOrder": 1,
            "cIsActive": "Y",
            "vDefaultLanguageCountryInfo": "ch",
            "vDefaultCurrency": "EUR",
            "dtModifiedOn": "2018-07-24T12:17:39.563",
            "cIsDeleted": "N",
            "t_Framework_Language_Data": [
                {
                    "iFrameworkLanguageId": 3,
                    "iLanguageId": 1,
                    "vLanguageName": "Deutsch",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 3,
                    "iLanguageId": 3,
                    "vLanguageName": "Deutsch",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 3,
                    "iLanguageId": 2,
                    "vLanguageName": "Allemande",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 3,
                    "iLanguageId": 4,
                    "vLanguageName": "Deutsch",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 3,
                    "iLanguageId": 6,
                    "vLanguageName": "Deutsch",
                    "cIsTranslatedBySystem": null
                }
            ]
        },
        {
            "iFrameworkLanguageId": 1,
            "vLanguageCultureInfo": "en",
            "vLanguageIdentifier": "English",
            "iDisplayOrder": 2,
            "cIsActive": "Y",
            "vDefaultLanguageCountryInfo": "us",
            "vDefaultCurrency": "EUR",
            "dtModifiedOn": "2018-07-24T12:17:39.563",
            "cIsDeleted": "N",
            "t_Framework_Language_Data": [
                {
                    "iFrameworkLanguageId": 1,
                    "iLanguageId": 1,
                    "vLanguageName": "English",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 1,
                    "iLanguageId": 3,
                    "vLanguageName": "Englisch",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 1,
                    "iLanguageId": 2,
                    "vLanguageName": "English",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 1,
                    "iLanguageId": 4,
                    "vLanguageName": "English",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 1,
                    "iLanguageId": 6,
                    "vLanguageName": "English",
                    "cIsTranslatedBySystem": null
                }
            ]
        },
        {
            "iFrameworkLanguageId": 2,
            "vLanguageCultureInfo": "fr",
            "vLanguageIdentifier": "French",
            "iDisplayOrder": 3,
            "cIsActive": "Y",
            "vDefaultLanguageCountryInfo": "ch",
            "vDefaultCurrency": "EUR",
            "dtModifiedOn": "2018-07-24T12:17:39.563",
            "cIsDeleted": "N",
            "t_Framework_Language_Data": [
                {
                    "iFrameworkLanguageId": 2,
                    "iLanguageId": 1,
                    "vLanguageName": "Français",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 2,
                    "iLanguageId": 3,
                    "vLanguageName": "Französisch",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 2,
                    "iLanguageId": 2,
                    "vLanguageName": "Française",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 2,
                    "iLanguageId": 4,
                    "vLanguageName": "Français",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 2,
                    "iLanguageId": 6,
                    "vLanguageName": "French",
                    "cIsTranslatedBySystem": null
                }
            ]
        },
        {
            "iFrameworkLanguageId": 4,
            "vLanguageCultureInfo": "it",
            "vLanguageIdentifier": "Italian",
            "iDisplayOrder": 4,
            "cIsActive": "Y",
            "vDefaultLanguageCountryInfo": "ch",
            "vDefaultCurrency": "EUR",
            "dtModifiedOn": "2018-07-24T12:17:39.563",
            "cIsDeleted": "N",
            "t_Framework_Language_Data": [
                {
                    "iFrameworkLanguageId": 4,
                    "iLanguageId": 1,
                    "vLanguageName": "Italien",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 4,
                    "iLanguageId": 3,
                    "vLanguageName": "Italienisch",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 4,
                    "iLanguageId": 2,
                    "vLanguageName": "italienne",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 4,
                    "iLanguageId": 4,
                    "vLanguageName": "Italien",
                    "cIsTranslatedBySystem": null
                },
                {
                    "iFrameworkLanguageId": 4,
                    "iLanguageId": 6,
                    "vLanguageName": "Italian",
                    "cIsTranslatedBySystem": null
                }
            ]
        }
    ];

    //Is an object that has the fields corresponding to the metadata fields with vControlType as dropdown. It is not a mandatory props.
    var DropDownData = {
        "DropDownTableName.DropDownValueColumnName": {
            "IsLanguageDependent": "N",
            "ValueColumn": "DropDownValueColumnName",
            "DisplayColumn": "DropDownDisplayColumnName",
            "Data": [
                {
                    "DropDownValueColumnName": 1,
                    "DropDownDisplayColumnName": "value_DD_1",
                },
                {
                    "DropDownValueColumnName": 2,
                    "DropDownDisplayColumnName": "value_DD_2",
                },
                {
                    "DropDownValueColumnName": 3,
                    "DropDownDisplayColumnName": "value_DD_3",
                },
                {
                    "DropDownValueColumnName": 4,
                    "DropDownDisplayColumnName": "value_DD_4",
                },
                {
                    "DropDownValueColumnName": 5,
                    "DropDownDisplayColumnName": "value_DD_5",
                },
                {
                    "DropDownValueColumnName": 6,
                    "DropDownDisplayColumnName": "value_DD_6",
                },
                {
                    "DropDownValueColumnName": 7,
                    "DropDownDisplayColumnName": "value_DD_8",
                },
                {
                    "DropDownValueColumnName": 8,
                    "DropDownDisplayColumnName": "value_DD_8",
                },
            ]

        },
        "LanguageDependentDropDownTableName.LanguageDependentDropDownValueColumnName": {
            "IsLanguageDependent": "Y",
            "DependingTableName": "LanguageDependentDropDownTableName_Data",
            "ValueColumn": "LanguageDependentDropDownValueColumnName",
            "DisplayColumn": "LanguageDependentDropDownDisplayColumnName",
            "Data": [
                {
                    "LanguageDependentDropDownValueColumnName": 1,
                    "LanguageDependentDropDownTableName_Data": [
                        {
                            "iLanguageId": 3,
                            "LanguageDependentDropDownDisplayColumnName": "A",
                        }
                    ]
                },
                {
                    "LanguageDependentDropDownValueColumnName": 2,
                    "LanguageDependentDropDownTableName_Data": [
                        {
                            "iLanguageId": 3,
                            "LanguageDependentDropDownDisplayColumnName": "B",
                        }
                    ]
                }
            ]
        }
    };

    return {
        RowData: arrRowData,
        LanguageData,
        DropDownData,
    };
};