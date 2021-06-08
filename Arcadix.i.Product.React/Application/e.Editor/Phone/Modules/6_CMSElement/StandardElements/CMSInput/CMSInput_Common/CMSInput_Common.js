//React imports
import React from 'react';

/**
 * @name CMSInput_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSInput
 * @returns {any} returns the cms Input's JSX
 */
const CMSInput_Common = (props) => {

    let { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetContent
     * @summary Returns the body of the input element.
     * @returns {any} JSX
     */
    const GetContent = () => {
        let blnIsReadOnly = AppType === "Editor" ? true : false;
        let strBackgroundColor;
        let strValue = "";
        if (AppType === "TestApplication") {
            strValue = Context.state.InputValue;
            if (Context.state.ViewComparison && Context.state.ElementStatus !== null) {
                if (Context.state.ElementStatus === 1) {
                    strBackgroundColor = "lightgreen";
                }
                else if (Context.state.ElementStatus === 2) {
                    strBackgroundColor = "#F7AAAA";
                }
            }
        }
        else {
            if (Context.state.ElementJson["vElementJson"]["iTextFieldType"] !== 1) {
                Context.state.ElementJson["vElementJson"]["Values"].map((x, intIndex) => {
                    strValue += x["vText"];
                    if (intIndex < Context.state.ElementJson["vElementJson"]["Values"].length - 1) {
                        strValue += ","
                    }
                });
            }
        }
        let objStyle = {
            width: Context.state.ElementJson["vElementJson"]["iWidthInPixel"] + "px",
            outline: "none",
            border: "1px solid #7f7b7b",
            height: "19px",
            backgroundColor: strBackgroundColor
        };
        return (
            <React.Fragment>
                    <input
                        ielementid={Context.state.ElementJson["iElementId"]} ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                        type="text"
                        value={strValue}
                        readOnly={blnIsReadOnly}
                        style={objStyle}
                        onChange={Events.OnInputChange ? (event) => { Events.OnInputChange(event.target.value); } : Events.OnInputChange}
                        onDoubleClick={Events.ShowInputSidebar ? (event) => { Events.ShowInputSidebar(event); } : Events.ShowInputSidebar}
                    />
                    {
                    Context.state.ViewSolution ?
                        <span style={{ backgroundColor: "#DCE6F2", border: "1px solid black", marginLeft: "5px", paddingLeft: "3px", paddingRight: "3px", display: 'inline-flex', height: "19px", alignItems: 'center', whiteSpace: 'nowrap' }}>
                                {
                                    Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].map((objTempValue, intIndex) => {
                                        let strReturn = objTempValue["vText"];
                                        if (intIndex + 1 < Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].length) {
                                            strReturn += ",";
                                        }
                                        return strReturn;
                                    })
                                }
                            </span> : ""
                    }
                    {
                        Context.state.ViewComparison ?
                            Context.state.ElementStatus === 1 ?
                            <span>
                                <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.gif"} />
                            </span> :
                            <span>
                                <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Cross.gif"} />
                                <span style={{ backgroundColor: "#DCE6F2", border: "1px solid black", marginLeft: "5px", paddingLeft: "3px", paddingRight: "3px", display: 'inline-flex', height: "22px", alignItems: 'center', whiteSpace: 'nowrap' }}>
                                    {
                                        Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].map((objTempValue, intIndex) => {
                                            let strReturn = objTempValue["vText"];
                                            if (intIndex + 1 < Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].length) {
                                                strReturn += ", ";
                                            }
                                            return strReturn;
                                        })
                                    }
                                </span>
                            </span>
                            : ""
                    }
            </React.Fragment>
        );
    };

    return GetContent();
};

export default CMSInput_Common;

