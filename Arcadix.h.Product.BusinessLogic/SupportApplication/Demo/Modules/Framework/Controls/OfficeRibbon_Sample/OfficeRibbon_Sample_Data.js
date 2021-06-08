/**
* @name GetData
* @summary it returns the object for Data
* @returns {object} Data
*/
export const GetData = () => {

    //The data is an array of objects required for ToolBar(if any) in OfficeRibbon.
    let arrToolBarData = [
        {//Group1
            "vGroupName": "Group_Name_1",
            "t_GroupData": [
                {
                    "vTextName": "Text_Name_1",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "single",
                    "OnClick": () => { console.log("Text_Name_1 selected"); }
                }
            ]
        },
        {//Group2
            "vGroupName": "Group_Name_2",
            "t_GroupData": [
                {
                    "vTextName": "Text_Name_2",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "single"
                }

            ]
        },
        {//Group3
            "vGroupName": "Group_Name_3",
            "t_GroupData": [
                {
                    "vTextName": "Text_Name_3_A",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "single"
                },
                {
                    "vTextName": "Text_Name_3_B",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "single",
                    "OnClick": () => { console.log("Text_Name_3_B selected"); }
                }
            ]
        },
        {//Group4
            "vGroupName": "Group_Name_4",
            "t_GroupData": [
                {
                    "vTextName": "Text_Name_4_A",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "single"
                },
                {
                    "type": "multiple",
                    "t_MultipleData": [
                        {
                            "vTextName": "Text_Name_4_Multiple_1_A",
                            "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                            "type": "single",
                            "OnClick": () => { console.log("Text_Name_4_Multiple_1_A selected"); }
                        },
                        {
                            "vTextName": "Text_Name_4_Multiple_1_B",
                            "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                            "type": "single"
                        },
                        {
                            "vTextName": "Text_Name_4_Multiple_1_C",
                            "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                            "type": "single"
                        }

                    ]
                },
                {
                    "type": "multiple",
                    "t_MultipleData": [
                        {
                            "vTextName": "Text_Name_4_Multiple_2_A",
                            "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                            "type": "single"
                        },
                        {
                            "vTextName": "Text_Name_4_Multiple_2_B",
                            "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                            "type": "single"
                        }
                    ]
                },
                {
                    "vTextName": "Text_Name_4_B",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "single"
                }
            ]
        },
        {//Group5
            "vGroupName": "Group_Name_5",
            "t_GroupData": [
                {
                    "vTextName": "Text_Name_5",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "single"
                },
                {
                    "vTextName": "Text_Name_5_Inverted",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "inverted",
                    "OnClick": () => { console.log("Text_Name_5_Inverted selected"); }
                }
            ]
        },
        {//Group6
            "vGroupName": "Group_Name_6",
            "t_GroupData": [
                {
                    "vTextName": "Text_Name_6_A",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "single"
                },
                {
                    "type": "multiple",
                    "t_MultipleData": [
                        {
                            "vTextName": "Text_Name_6_Multiple_A",
                            "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                            "type": "single"
                        },
                        {
                            "vTextName": "Text_Name_6_Multiple_B",
                            "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                            "type": "single"
                        },
                        {
                            "vTextName": "Text_Name_6_Multiple_C",
                            "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                            "type": "single"
                        }
                    ]
                },
                {
                    "vTextName": "Text_Name_6_B",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "single"
                },
                {
                    "vTextName": "Text_Name_6_C",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "single"
                }
            ]
        },
        {//Group7
            "vGroupName": "Group_Name_7",
            "t_GroupData": [
                {
                    "vTextName": "Text_Name_7",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "single"
                }

            ]
        },
        {//Group8
            "vGroupName": "Group_Name_8",
            "t_GroupData": [
                {
                    "vTextName": "Text_Name_8",
                    "uImageUrl": "/Images/Common/Icons/GridUpload.svg",
                    "type": "single"
                }

            ]
        }
    ];

    //The data is an array of objects required for OfficeRibbon.
    let arrOfficeRibbonData = [
        {
            Text: "Tab1",
            ToolBarData: arrToolBarData
        },
        {
            Text: "Tab2",
            ComponentName: "DropDown_Sample"
        },        
        {
            Text: "Tab3",
            OnTabClick: () => {
                alert("Call Back in OfficeRibbon_Sample module");
            }
        }
    ];
    return {
        OfficeRibbonData: arrOfficeRibbonData //this is a mandatory prop.
    };
};