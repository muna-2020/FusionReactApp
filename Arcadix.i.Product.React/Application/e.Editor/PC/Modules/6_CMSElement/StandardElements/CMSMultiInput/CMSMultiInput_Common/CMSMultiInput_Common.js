//React imports
import React from 'react';

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name CMSMultiInput_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSMultiInput
 * @returns {any} returns the cms MultiInput's JSX
 */
const CMSMultiInput_Common = (props) => {

    let { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetContent
     * @summary Contains JSX of the multi input element.
     * @returns {any} JSX
     */
    const GetContent = () => {
        let blnIsReadOnly = false;
        let arrValues = [];
        let objTextResource = EditorState.GetProperty("CommonTextResource");
        let objTextElementProps;
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            objTextElementProps = Callbacks.GetTextElementProps(Context.state.ElementJson["vElementJson"]["HeaderValues"][0]["iElementTextId"]);
        }
        if (AppType === "Editor") {
            arrValues = Context.state.ElementJson["vElementJson"]["Values"].slice(0, Context.state.ElementJson["vElementJson"]["iNumberOfInputDisplay"]);
            blnIsReadOnly = true;
        }
        else {
            arrValues = Context.state.ElementJson["vElementJson"]["Values"];
        }
        return (
            <div
                ielementid={Context.state.ElementJson["iElementId"]}
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                onContextMenu={Events.OnOpenContextMenu ? (event) => { Events.OnOpenContextMenu(event); } : Events.OnOpenContextMenu}>
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <TextElement {...objTextElementProps} /> : ""
                }
                {
                    arrValues.map((objValue, intIndex) => {
                        let strBackgroundColor, blnIsCorrectResponse, strCorrectValue;
                        if (AppType === "TestApplication") {
                            if (Context.state.ViewSolution && Context.state.ElementJson["vElementJson"]["iNumberOfInputDisplay"] === arrValues.length) {
                                strCorrectValue = Context.AvailableValuesDataRef.current[Context.PointerDataRef.current]["vText"];
                                Context.PointerDataRef.current++;
                            }
                            if (Context.state.ViewComparison) {
                                blnIsCorrectResponse = Callbacks.VerifyResponse(Context.state.arrMultiInputAnswered.filter(x => x["iElementMultiInputValueId"] === objValue["iElementMultiInputValueId"])[0]["vText"]);
                                if (blnIsCorrectResponse) {
                                    strBackgroundColor = "lightgreen";
                                }
                                else {
                                    strBackgroundColor = "pink";
                                }
                                if (!blnIsCorrectResponse && Context.state.ElementJson["vElementJson"]["iNumberOfInputDisplay"] === arrValues.length) {
                                    strCorrectValue = Context.AvailableValuesDataRef.current[Context.PointerDataRef.current]["vText"];
                                    Context.PointerDataRef.current++;
                                }
                            }
                        }
                        let objStyle = {
                            "width": Context.state.ElementJson["vElementJson"]["iWidthInPixel"] + "px",
                            "border": "2px solid #7f7b7b",
                            "outline": "none",
                            "marginBottom": "5px",
                            "marginRight": "5px",
                            "marginLeft": "5px",
                            "backgroundColor": strBackgroundColor
                        };
                        return (
                            <div key={objValue["iElementMultiInputValueId"]}>
                                {
                                    Context.state.ElementJson["vElementJson"]["cHasMeasurementPrefix"] === "Y" ?
                                        <span>
                                            {
                                                Context.state.ElementJson["vElementJson"]["vMeasurementUnit"]
                                            }
                                        </span> : ""
                                }
                                <nobr>
                                    <input
                                        type="text"
                                        value={!blnIsReadOnly ? objValue["vText"] : undefined}
                                        readOnly={blnIsReadOnly}
                                        style={objStyle}
                                        onChange={Events.OnInputChange ? (event) => { Events.OnInputChange(event.target.value, objValue); } : Events.OnInputChange}
                                        onDoubleClick={Events.ShowMultiInputSidebar ? (event) => { Events.ShowMultiInputSidebar(event); } : Events.ShowMultiInputSidebar} />
                                    {
                                        Context.state.ElementJson["vElementJson"]["cHasMeasurementPrefix"] === "N" ?
                                            <span>
                                                <b style={{ color: "#3c3c3c" }}>
                                                    {
                                                        Context.state.ElementJson["vElementJson"]["vMeasurementUnit"]
                                                    }
                                                </b>
                                            </span> : ""
                                    }
                                    {
                                        Context.state.ViewComparison ?
                                            blnIsCorrectResponse ?
                                                <span>
                                                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.gif"} />
                                                </span>
                                                :
                                                <span>
                                                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Cross.gif"} />
                                                    {
                                                        Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].length === arrValues.length ?
                                                            <span style={{ backgroundColor: "lightblue", marginLeft: "5px", border: "1px solid black", paddingLeft: "3px", paddingRight: "3px" }}>
                                                                {strCorrectValue}
                                                            </span> : ""
                                                    }
                                                </span>
                                            : ""
                                    }
                                    {
                                        Context.state.ViewSolution && Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].length === arrValues.length ?
                                            <span style={{ backgroundColor: "lightblue", marginLeft: "5px", border: "1px solid black", paddingLeft: "3px", paddingRight: "3px" }}>
                                                {strCorrectValue}
                                            </span> : ""
                                    }
                                </nobr>
                            </div>
                        );
                    })
                }
                {
                    (Context.state.ViewComparison || Context.state.ViewSolution) && Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].length > arrValues.length ?
                        <div style={{ "paddingLeft": "5px", "paddingTop": "13px" }}>
                            <span style={{ "color": "#ff4a9f", fontSize: '24px' }}>
                                {objTextResource["SolutionText"]}
                            </span>
                            <div style={{ border: "2px solid green", "paddingLeft": "3px", "marginTop": "3px", color: '#505050' }}>
                                {
                                    Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].map(objTempData => {
                                        return (
                                            <div style={{ "padding": "2px 0px" }}>
                                                {objTempData["vText"]}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        : ""
                }
            </div>
        );
    };

    return GetContent();
};

export default CMSMultiInput_Common;
