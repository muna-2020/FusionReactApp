import React, { useReducer, useEffect } from "react";
import { connect } from "react-redux";
import DropDown from "@root/Framework/Controls/DropDown/DropDown/DropDown.js";
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import WeekDisplay from "@root/Application/d.Extranet/5_SharedModule/PC/WeekDisplay/WeekDisplay";

export function GetInitialState() {
  return {
    isLoadComplete: false
  };
}

export function Reducer(state, action) {
  switch (action.type) {
    case "SET_STATE_VALUES":
      return {
        ...state,
        ...action.payload
      };
    case "DATA_LOAD_COMPLETE":
      return {
        ...state,
        ["isLoadComplete"]: action.payload
      };
  }
}

const WeekDisplayContainer = props => {
  const [state, dispatch] = useReducer(Reducer, GetInitialState());

  const arrDropdownData = [
    {
      Key: "Week",
      Value: 2
    },
    {
      Key: "Semester",
      Value: 3
    },
    {
      Key: "School Year",
      Value: 4
    }
  ];

  useEffect(() => {
    if (!state.isLoadComplete) {
      dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
      ApplicationState.SetProperty("DisplayFor", 4);
    }
  }, [state.isLoadComplete]);

  function OnChangeDisplayDropdown(objItem) {
    ApplicationState.SetProperty("DisplayFor", objItem["Value"]);
  }

  function OnChangeWeekDisplay(objItem) {
    Logger.Log("Item", objItem);
  }

  function GetContent() {
    return (
      <div className="weekdisplay-flex">
        <WeekDisplay JConfiguration={props.JConfiguration} OnChangeDisplay={OnChangeWeekDisplay} backgroundColor="#dde0c9" />

        <div className="content-dropdown">
          <DropDown
            id="DisplayDropDown"
            Data={arrDropdownData}
            IsLanguageDependent="N"
            DisplayColumn="Key"
            ValueColumn="Value"
            SelectedValue={arrDropdownData[2]["Value"]}
            JConfiguration={props.JConfiguration}
            OnChangeEventHandler={(objItem, dropdownProps) => { OnChangeDisplayDropdown(objItem);}}/>
        </div>
      </div>
    );
  }

  /**
   * @summary renders the jsx.
   */
  return (
    <React.Fragment>
      {state.isLoadComplete ? GetContent() : <React.Fragment />}
    </React.Fragment>
  );
};

WeekDisplayContainer.DynamicStyles = props => {
  var arrStyles = [
    props.JConfiguration.ExtranetSkinPath + "/Css/Application/5_SharedModule/ReactJs/PC/WeekDisplay/WeekDisplay.css"
  ];
  return arrStyles;
};

export default WeekDisplayContainer;
