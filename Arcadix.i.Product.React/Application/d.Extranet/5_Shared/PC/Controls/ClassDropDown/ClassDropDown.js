import React, { useState, useEffect } from "react";
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import ArcadixFetchData from '@shared/Framework/DataService/ArcadixFetchData/ArcadixFetchData';

//Inline Images import
import AngleDownImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/angle_down.svg?inline';

const ClassDropDown = (props) => {
    //Hooks to set the initial classname

    const [classTrigger, SetTrigger] = useState("dropdown-list"); //css classes for the list
    const [classActive, SetActive] = useState("dropdown-trigger"); //css classes for button
    const [classToggler, SetToggler] = useState(false); //set the toggle to hide or show the list
    const [strOptionName, SetOption] = useState(""); //Initial DropDown Value
    // let objPreSelectedItem = {};
    var strImagePath = props.ImgPath !== undefined ? props.JConfiguration.ExtranetSkinPath + props.ImgPath : " ";
    Logger.Log("strImagePath", strImagePath);
    var strDisplayData = "";

    useEffect(() => {
        if (props.Data) {
            props.Data.map(objItemizedData => {
                objItemizedData["Data"].map(objDropDownData => {
                    if (objDropDownData[props.ValueColumn] === props.SelectedValue) {
                        strDisplayData = objDropDownData[props.DisplayColumn];
                    }
                })
            });
            // Logger.Log("........................disp", strDisplayData);
            SetOption(strDisplayData); //Initial DropDown Value
        }
    }, [props.SelectedValue]);

    useEffect(() => {
        if (props.DefaultOptionValue && props.DefaultOptionValue != "") {
            SetOption(props.DefaultOptionValue);
        }
    }, [])

    function DataCall(arrParams, objClassItem) {
        ArcadixFetchData.Execute(arrParams, function (objReturn) {
            let strUserPreferenceFilterKey = "Object_Cockpit_UserPreference;uUserId;" + props.ClientUserDetails.UserId;
            let arrUserPreference = objReturn["Object_Cockpit_UserPreference"][strUserPreferenceFilterKey].Data;
            let strClassId = "";
            let objUserPreference = {};
            if (arrUserPreference.length > 0) {
                objUserPreference = arrUserPreference[0];
                let arrUserPreferenceValue = objUserPreference["t_Framework_UserPreference_PreferenceValue"].filter(objTempUserPreferenceValue => objTempUserPreferenceValue["vKey"] === "CurrentSelectedClassId");
                if (arrUserPreferenceValue.length > 0) {
                    strClassId = arrUserPreferenceValue[0]["vValue"];
                    ApplicationState.SetProperty("SelectedClassId", strClassId);
                    ApplicationState.SetProperty("UserPreferenceObject", objUserPreference);
                }
            }
            SetOption(objClassItem[props.DisplayColumn]);
            //after the action close the dropdown list
            SetToggler(!classToggler);
            SetTrigger("dropdown-list");
            SetActive("dropdown-trigger");
            if (props.OnChangeEventHandler) {
                props.OnChangeEventHandler(objClassItem, props);
            }
        });
    };

    function EditUserPreference(objClassItem) {
        let objUserPreference = ApplicationState.GetProperty("UserPreferenceObject");
        let objNewUserPreference = {
            ...objUserPreference, ["t_Framework_UserPreference_PreferenceValue"]: objUserPreference["t_Framework_UserPreference_PreferenceValue"].map(objTempPreference => {
                return objTempPreference["vKey"] === "CurrentSelectedClassId" ? { ...objTempPreference, "vValue": objClassItem[props.ValueColumn] } : objTempPreference
            })
        };
        let objUserPreferenceParams = {
            "ForeignKeyFilter": {
                "uUserId": props.ClientUserDetails.UserId
            },
            "vEditData": objNewUserPreference
        };
        let arrParams = [
            {
                "URL": "API/Object/Framework/UserPreference/UserPreference",
                "Params": objUserPreferenceParams,
                "MethodType": "Put",
            }
        ];
        DataCall(arrParams, objClassItem);
    };

    //Show the dropdownMenu
    function ShowMenu() {
        if (classToggler === false) {
            SetToggler(!classToggler);
            SetTrigger("dropdown-list show");
            SetActive("dropdown-trigger active");
        }
        else {
            //on clicking second time on the button set the toggle value to false and hide the dropdown list
            SetToggler(!classToggler);
            SetTrigger("dropdown-list");
            SetActive("dropdown-trigger");
        }
        document.addEventListener("click", CloseMenu);
    };

    //On clicking anywhere the dropdown closes
    function CloseMenu(event) {
        var dropdownMenu = document.getElementById("dropdownMenu");
        if (dropdownMenu) {
            if (!dropdownMenu.contains(event.target)) {
                SetToggler(false);
                SetTrigger("dropdown-list");
                SetActive("dropdown-trigger");
            }
        }
        document.removeEventListener("click", CloseMenu);
    };

    //Display the column value on clicking the option and executes callbackfunction to
    function ClickHandler(objSelectedItem, strDispalyData) {
        if (props.IsSaveToUserPreference && props.IsSaveToUserPreference === "N") {
            SetOption(objSelectedItem[props.DisplayColumn]);
            //after the action close the dropdown list
            SetToggler(!classToggler);
            SetTrigger("dropdown-list");
            SetActive("dropdown-trigger");
            if (props.OnChangeEventHandler) {
                props.OnChangeEventHandler(objSelectedItem, props);
            }
        }
        else {
            EditUserPreference(objSelectedItem);
        }
    };

    return props.Data !== undefined ? (
        <div className="dropdown-wrapper" id="dropdownMenu">
            <button className={classActive} onClick={() => ShowMenu()}>
                <span>{strOptionName}</span>
                <img src={AngleDownImage} alt="" />
            </button>
            <div className={classTrigger + " class-dropdown"}>
                {
                    props.Data.map(objDataItem => {
                        return (
                            <React.Fragment>
                                <div className="dropdown-title">{objDataItem["Title"]}</div>
                                <ul>
                                    {
                                        objDataItem["Data"].map(objItem => {
                                            var strDispalyData = objItem[props.DisplayColumn];
                                            return (
                                                <li className={strDispalyData === strOptionName ? "active" : ""} onClick={() => ClickHandler(objItem, strDispalyData)}>
                                                    {strDispalyData}{" "}
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </React.Fragment>
                        );
                    })
                }
            </div>
        </div>
    ) : (<div />);
};

ClassDropDown.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath +
        "/Css/Common/ReactJs/PC/Framework/Controls/DropDown/DropDown.css"
    ];
    return arrStyles;
};

export default ClassDropDown;
