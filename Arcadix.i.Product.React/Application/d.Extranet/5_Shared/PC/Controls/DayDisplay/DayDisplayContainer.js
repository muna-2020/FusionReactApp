import React, { useReducer, useEffect } from "react";
import { connect } from "react-redux";
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";
import DayDisplay from "@root/Application/d.Extranet/5_SharedModule/PC/DayDisplay/DayDisplay";

export function GetInitialState() {
  return {
    isLoadComplete: false,
    intToggle: 1,
    intDisplayFor: -1
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

const DayDisplayContainer = props => {
  const [state, dispatch] = useReducer(Reducer, GetInitialState());

  const arrCategoryData = [
    {
      Key: "Day",
      Value: 1
    },
    {
      Key: "Week",
      Value: 2
    }
  ];

  useEffect(() => {
    if (!state.isLoadComplete) {
      dispatch({ type: "DATA_LOAD_COMPLETE", payload: true });
      ApplicationState.SetProperty("DisplayFor", 1);
    }
  }, [state.isLoadComplete]);

  function OnChangeCategory(objItem) {
    ApplicationState.SetProperty("DisplayFor", objItem["Value"]);
    dispatch({ type: "SET_STATE_VALUES", payload: { intToggle: objItem["Value"] } });
  }

  function OnChangeDayDisplay(objItem) {
    Logger.Log("Item", objItem);
  }

  function OnClickGetCurrentDate()
  {
    let intDisplayFor = ApplicationState.GetProperty("DisplayFor");
    if(intDisplayFor !== 5)
    {
      dispatch({ type: "SET_STATE_VALUES", payload: { intDisplayFor: intDisplayFor } });
      ApplicationState.SetProperty("DisplayFor", 5);
    }
    else
    {
      ApplicationState.SetProperty("DisplayFor", state.intDisplayFor);
    }
  }

  function GetContent() {
    return (
      <div className="daydisplay-flex">
        <div className="daydisplay-left-flex">
          <DayDisplay JConfiguration={props.JConfiguration} OnChangeDisplay={OnChangeDayDisplay} backgroundColor="rgba(62, 204, 80, 0.64)"/>
          <button className="heute-button" onClick={(event)=>{OnClickGetCurrentDate()}}>
            Get Current Date
          </button>
        </div>
        <div className="daydisplay-right-flex">
          {
            <React.Fragment>
              <button onClick={event => { OnChangeCategory(arrCategoryData[0]); }} className={ state.intToggle === arrCategoryData[0]["Value"] ? "active" : "" } >
                Day
              </button>
              <button onClick={event => { OnChangeCategory(arrCategoryData[1]); }} className={ state.intToggle === arrCategoryData[1]["Value"] ? "active" : "" } >
                Week
              </button>
            </React.Fragment>
          }
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

DayDisplayContainer.DynamicStyles = props => {
  var arrStyles = [
    props.JConfiguration.ExtranetSkinPath +
      "/Css/Application/5_SharedModule/ReactJs/PC/DayDisplay/DayDisplay.css"
  ];
  return arrStyles;
};

export default DayDisplayContainer;
