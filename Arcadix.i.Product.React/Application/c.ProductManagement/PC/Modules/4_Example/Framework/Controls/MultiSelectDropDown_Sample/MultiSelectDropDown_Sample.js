// React related impoprts.
import React, { useEffect } from 'react';
import MultiSelectDropDown from '@root/Framework/Controls/Dropdowns/MultiSelectDropdown/MultiSelectDropdown';

const arrData = [
    { id: "1", name: "AAA", cIsDeleted: "N", shortName: "A" },
    { id: "2", name: "BBB", cIsDeleted: "N", shortName: "B" },
    { id: "3", name: "CCC", cIsDeleted: "N", shortName: "C" },
    { id: "4", name: "DDD", cIsDeleted: "Y", shortName: "D" }
];

const arrMultiLanguageData = [
    {
        "iSubjectId": 2417,
        "cIsDeleted": "N",
        "t_TestDrive_Subject_Data": [
            {
                "iLanguageId": 3,
                "vSubjectName": "test2",
                "vSubjectDisplayName": null,
                "vSubjectShortName": "T",
                "tSubjectDescription": null,
                "iDataMainClientId": null
            },
            {
                "iLanguageId": 4,
                "vSubjectName": "test24",
                "vSubjectDisplayName": null,
                "vSubjectShortName": "T4",
                "tSubjectDescription": null,
                "iDataMainClientId": null
            }
        ]
    },
    {
        "iSubjectId": 2418,
        "cIsDeleted": "N",
        "t_TestDrive_Subject_Data": [
            {
                "iLanguageId": 3,
                "vSubjectName": "Mathematik",
                "vSubjectDisplayName": "Mathematik",
                "vSubjectShortName": "MA",
                "tSubjectDescription": null,
                "iDataMainClientId": null
            },
            {
                "iLanguageId": 4,
                "vSubjectName": "Mathematik4",
                "vSubjectDisplayName": null,
                "vSubjectShortName": "MA4",
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
                "vSubjectDisplayName": "Lesen",
                "vSubjectShortName": "DE",
                "tSubjectDescription": null,
                "iDataMainClientId": null
            },
            {
                "iLanguageId": 4,
                "vSubjectName": "Lesen4",
                "vSubjectDisplayName": "Lesen",
                "vSubjectShortName": "DE4",
                "tSubjectDescription": null,
                "iDataMainClientId": null
            }
        ]
    },
    {
        "iSubjectId": 11457,
        "cIsDeleted": "N",
        "t_TestDrive_Subject_Data": [
            {
                "iLanguageId": 7,
                "vSubjectName": "d17",
                "vSubjectDisplayName": null,
                "vSubjectShortName": "d17",
                "tSubjectDescription": null,
                "iDataMainClientId": 97
            },
            {
                "iLanguageId": 3,
                "vSubjectName": "d1",
                "vSubjectDisplayName": null,
                "vSubjectShortName": "D1",
                "tSubjectDescription": null,
                "iDataMainClientId": 97
            }
        ]
    }
];

const CheckDeletedDropDownData = (objItem) => { //this function returns true or false
    if (objItem["cIsDeleted"] === "N") {
        return true;
    }
    else {
        return false;
    }
};

const GetSelectedItems = (arrIds) => {
    let arrFilteredItems = [];
    arrIds.forEach(strId => {
        let arrTempItems = arrMultiLanguageData.filter(objData => objData["iSubjectId"].toString() === strId);
        if (arrTempItems.length > 0) {
            arrFilteredItems = [...arrFilteredItems, ...arrTempItems];
        }
    });
    return arrFilteredItems;
};


const MultiSelectDropDown_Sample = props => {

    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, []);

    return (
        <React.Fragment >
            <MultiSelectDropDown
                id="SubjectDropDown"
                Data={arrData}
                DisplayColumn="name"
                ValueColumn="id"
                ShortNameColumn={"shortName"}
                SelectedItems={[
                    { id: "1", name: "AAA", cIsDeleted: "N", shortName: "A" },
                    { id: "3", name: "CCC", cIsDeleted: "N", shortName: "C" }
                ]}
                OnChangeEventHandler={(arrItems, dropdownProps) => {
                    console.log("arrItems", arrItems);
                    console.log("dropdownProps", dropdownProps);
                }}
                JConfiguration={props.JConfiguration}
                ClientUserDetails={props.ClientUserDetails}
                PreSelectValue={"Please Select"}
                CheckDeletedDropDownData={CheckDeletedDropDownData}
            /> 
            &nbsp;
            <MultiSelectDropDown
                id="SubjectDropDown"
                Data={arrMultiLanguageData}
                DisplayColumn="vSubjectName"
                ValueColumn="iSubjectId"
                ShortNameColumn={"vSubjectShortName"}
                SelectedItems={GetSelectedItems(["2418", "2417"])}
                IsLanguageDependent="Y"
                DependingTableName="t_TestDrive_Subject_Data"
                OnChangeEventHandler={(arrItems, dropdownProps) => {
                    console.log("arrItems", arrItems);
                    console.log("dropdownProps", dropdownProps);
                }}
                JConfiguration={props.JConfiguration}
                ClientUserDetails={props.ClientUserDetails}
                PreSelectValue={"Please Select"}
            />
        </React.Fragment>
    );
};

export default MultiSelectDropDown_Sample;