// React related impoprts.
import React, { useEffect, useState } from 'react';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

const ContextMenu_Sample = props => {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, []);

    var arrContextListSample = [
        {
            ParentId: 0,
            Id: 1,
            Text: "1",
            ClickEvent: () => alert("1") 
        },
        {
            ParentId: 0,
            Id: 2,
            Text: "2",
            ClickEvent: () => alert("2") 
        },
        {
            ParentId: 0,
            Id: 3,
            Disable : true,
            Text: "3",
            ClickEvent: () => alert("3") 
        },
        {
            ParentId: 0,
            Id: 11,
            Text: "4",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 0,
            Id: 12,
            Text: "5",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 0,
            Id: 13,
            Text: "6",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 0,
            Id: 14,
            Text: "7",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 0,
            Id: 15,
            Text: "8",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 0,
            Id: 16,
            Text: "9",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 0,
            Id: 17,
            Text: "10",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 0,
            Id: 18,
            Text: "11",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 0,
            Id: 19,
            Text: "12",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 0,
            Id: 20,
            Text: "13",
            ClickEvent: () => alert("1")
        },

        {
            ParentId: 2,
            Id: 4,
            Text: "2-1",
            ClickEvent: () => alert("2-1") 
        },
        {
            ParentId: 2,
            Id: 5,
            Text: "2-2",
            ClickEvent: () => alert("2-2") 
        },
        {
            ParentId: 2,
            Id: 6,
            Text: "2-3",
            ClickEvent: () => alert("2-3") 
        },
        //////
        {
            ParentId: 2,
            Id: 31,
            Text: "2-4",
            ClickEvent: () => alert("2-3")
        },
        {
            ParentId: 2,
            Id: 31,
            Text: "2-5",
            ClickEvent: () => alert("2-3")
        },
        {
            ParentId: 2,
            Id: 33,
            Text: "2-6",
            ClickEvent: () => alert("2-3")
        },
        {
            ParentId: 2,
            Id: 34,
            Text: "2-7",
            ClickEvent: () => alert("2-3")
        },
        {
            ParentId: 2,
            Id: 35,
            Text: "2-8",
            ClickEvent: () => alert("2-3")
        },
        {
            ParentId: 2,
            Id: 36,
            Text: "2-9",
            ClickEvent: () => alert("2-3")
        },
        {
            ParentId: 2,
            Id: 37,
            Text: "2-10",
            ClickEvent: () => alert("2-3")
        },
        {
            ParentId: 2,
            Id: 38,
            Text: "2-11",
            ClickEvent: () => alert("2-3")
        },
        /////


        {
            ParentId: 11,
            Id: 40,
            Text: "4-1",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 11,
            Id: 41,
            Text: "4-2",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 11,
            Id: 42,
            Text: "4-3",
            ClickEvent: () => alert("1")
        },

        {
            ParentId: 11,
            Id: 43,
            Text: "4-4",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 11,
            Id: 44,
            Text: "4-5",
            ClickEvent: () => alert("1")
        },

        {
            ParentId: 11,
            Id: 45,
            Text: "4-6",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 11,
            Id: 46,
            Text: "4-6",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 11,
            Id: 47,
            Text: "4-7",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 11,
            Id: 48,
            Text: "4-8",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 11,
            Id: 49,
            Text: "4-9",
            ClickEvent: () => alert("1")
        },

        {
            ParentId: 11,
            Id: 50,
            Text: "4-10",
            ClickEvent: () => alert("1")
        },


        {
            ParentId: 11,
            Id: 51,
            Text: "4-11",
            ClickEvent: () => alert("1")
        },

        {
            ParentId: 11,
            Id: 52,
            Text: "4-12",
            ClickEvent: () => alert("1")
        },

        {
            ParentId: 11,
            Id: 53,
            Text: "4-13",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 11,
            Id: 54,
            Text: "4-14",
            ClickEvent: () => alert("1")
        },
        {
            ParentId: 11,
            Id: 55,
            Text: "4-15",
            ClickEvent: () => alert("1")
        },




        {
            ParentId: 3,
            Id: 7,
            Text: "3-1",
            ClickEvent: () => alert("3-1") 
        },
        {
            ParentId: 3,
            Id: 8,
            Text: "3-2",
            ClickEvent: () => alert("3-2") 
        },
        {
            ParentId: 5,
            Id: 9,
            Text: "2-2-1",
            ClickEvent: () => alert("2-2-1") 
        },
        {
            ParentId: 5,
            Id: 10,
            Text: "2-2-2",
            ClickEvent: () => alert("2-2-2") 
        }

    ];   

    function GetContextMenuData(strSelectedRow) {
        if (strSelectedRow === "Test1") {
            return [
                {
                    ParentId: 0,
                    Id: 1,
                    Text: "Test1_Properties"
                },
                {
                    ParentId: 0,
                    Id: 1,
                    Text: "Test1_AddExecution",
                    ClickEvent: () => console.log('menu clicked')
                },
                {
                    ParentId: 0,
                    Id: 2,
                    Text: "Test1_AssignTests",
                    ClickEvent: () => OnAssignTestClick(objContext)
                },
                {
                    ParentId: 0,
                    Id: 3,
                    Text: "Test1_Clear",
                    ClickEvent: () => console.log('menu clicked')
                }
            ];
        }
        else if (strSelectedRow === "Test2") {
            return [
                {
                    ParentId: 0,
                    Id: 1,
                    Text: "Test2_Properties"
                },
                {
                    ParentId: 0,
                    Id: 1,
                    Text: "Test2_AddExecution",
                    ClickEvent: () => console.log('menu clicked')
                },
                {
                    ParentId: 0,
                    Id: 2,
                    Text: "Test2_AssignTests",
                    ClickEvent: () => OnAssignTestClick(objContext)
                },
                {
                    ParentId: 0,
                    Id: 3,
                    Text: "Test2_Clear",
                    ClickEvent: () => console.log('menu clicked')
                }
            ];
        }
        else {
            return [
                {
                    ParentId: 0,
                    Id: 1,
                    Text: "Test3_Properties"
                },
                {
                    ParentId: 0,
                    Id: 1,
                    Text: "Test3_AddExecution",
                    ClickEvent: () => console.log('menu clicked')
                },
                {
                    ParentId: 0,
                    Id: 2,
                    Text: "Test3_AssignTests",
                    ClickEvent: () => OnAssignTestClick(objContext)
                },
                {
                    ParentId: 0,
                    Id: 3,
                    Text: "Test3_Clear",
                    ClickEvent: () => console.log('menu clicked')
                }
            ];
        }
    }

    function OnRowRightClick(objEvt, strSelectedRow ) {
        let objContextMenu = {
            Data: arrContextListSample,//GetContextMenuData(strSelectedRow),
            objClickEvent: { clientX: objEvt.clientX, clientY: objEvt.clientY }
        };
        //ApplicationState.SetProperty("objContext", objContextMenu);

        let fnShowContextMenu = ApplicationState.GetProperty("ShowContextMenu");
        fnShowContextMenu(objContextMenu);

    }
    
    let jsx = (<ul>
                <li onContextMenu={(e) => {
                    e.prClickEventDefault();
                    OnRowRightClick(e, "Test1");}}
                >
                Test1
                </li>      
                <li onContextMenu={(e) => {
                    e.prClickEventDefault();
                    OnRowRightClick(e, "Test2");}}
                >
                    Test2
                </li>
                <li onContextMenu={(e) => {
                    e.prClickEventDefault();
                    OnRowRightClick(e, "Test3");}}
                >
                    Test3
                </li>
            </ul>);
    return jsx;
};

ContextMenu_Sample.DynamicStyles = props => {
    return [
        props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ContextMenu/ContextMenu.css"
    ];
};

export default ContextMenu_Sample;