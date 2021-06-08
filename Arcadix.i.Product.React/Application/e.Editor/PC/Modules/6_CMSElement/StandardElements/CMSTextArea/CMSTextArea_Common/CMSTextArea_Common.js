// React related imports
import React from 'react';

/**
 * @name CMSTextArea_Common
 * @param {object} props props from parent
 * @summary CMSRadio's common version.
 * @returns {Component} CMSRadio_Common
 */
const CMSTextArea_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetContent
     * @summary Render the Radio body
     * @returns {any} Returns the JSX for the Radio.
     */
    const GetContent = () => {
        let strBackgroundColor, blnIsCorrectResponse = false;
        if (Context.state.ViewComparison) {
            if (Context.state.ElementStatus && Context.state.ElementStatus === 1) {
                strBackgroundColor = "lightgreen";
                blnIsCorrectResponse = true;
            }
            else {
                strBackgroundColor = "lightpink";
            }
        }
        let objStye = {
            "outline": "none",
            "resize": "none",
            "width": `${Context.state.ElementJson.vElementJson.iWidthInPixel}px`,
            "backgroundColor": strBackgroundColor
        };
        let blnIsReadOnly = AppType.toLowerCase() === "editor" ? Context.state.ElementJson["vElementJson"]["cIsDictation"] === "N" ? true : false : false;
        return (
            <React.Fragment>
                <textarea
                    type="Textarea"
                    // onContextMenu={Events.OpenContextMenu ? (event) => { 
                    //     event.nativeEvent.preventDefault();
                    //     event.nativeEvent.stopImmediatePropagation();
                    //     Events.OpenContextMenu(event);                     
                    //      } : Events.OpenContextMenu}
                    id={"textarea_" + Context.state.ElementJson.iElementId}
                    ref={Context.Ref}
                    onKeyPress={Events.OnKeyPress ? (event) => { Events.OnKeyPress(event); } : Events.OnKeyPress}
                    style={objStye}
                    rows={Context.state.ElementJson.vElementJson["iNumberOfRows"]}
                    readOnly={blnIsReadOnly}
                    onChange={(event) => { Events.HandleTextAreaOnChange(event); }}
                    value={Context.state.ElementJson["vElementJson"]["tDictationValue"]}
                    ielementtypeid={Context.state.ElementJson.iElementTypeId}
                    ielementid={Context.state.ElementJson["iElementId"]}
                    // Active attributes
                    iwidthinpixel={Context.state.ElementJson.vElementJson["iWidthInPixel"]}
                    dictationvalue={Context.state.ElementJson.vElementJson["tDictationValue"]}
                    cisdictation={Context.state.ElementJson.vElementJson["cIsDictation"]}
                    inumberofrows={Context.state.ElementJson.vElementJson["iNumberOfRows"]}
                    ielementaccessid={Context.state.ElementJson["iElementId"]}

                />
                {
                    Context.state.ViewComparison ?
                        blnIsCorrectResponse ?
                            <span>
                                <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.gif"} />
                            </span> :
                            <span>
                                <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Cross.gif"} />
                                <span style={{ backgroundColor: "lightblue", marginLeft: "5px", border: "1px solid black" }}>
                                    {Context.state.ElementJsonWithAnswer["vElementJson"]["tDictationValue"]}
                                </span>
                            </span> : ""
                }
                {
                    Context.state.ViewSolution ?
                        <span style={{ backgroundColor: "lightblue", marginLeft: "5px", border: "1px solid black" }}>
                            {Context.state.ElementJsonWithAnswer["vElementJson"]["tDictationValue"]}
                        </span> : ""
                }
            </React.Fragment>
        );
    };

    return GetContent();
};

export default CMSTextArea_Common;
