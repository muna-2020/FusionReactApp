//React Imports
import React, { useEffect } from 'react';

/**
 * @name CMSColorFillWrapper_Common
 * @param {object} props props from parent
 * @summary Contains the JSX for ColorFillWrapper element.
 * @returns {any} CMSColorFillWrapper_Common
 */
const CMSColorFillWrapper_Common = (props) => {

    let { Context, Events, Callbacks, TextElement, AppType } = props;

    useEffect(() => {
        var svg = document.getElementById(`alphasvg_${Context.state.ElementJson.iElementId}`);
        if (svg) {
            svg.addEventListener("load", Events.OnLoad);

            return () => {
                svg.addEventListener("load", Events.OnLoad);
            };
        }
    }, [Context.state.cIsFirstLoad])

    /**
     * @name GetContent
     * @summary This method renders the main body of the text mark
     * @returns {any} JSX
     */
    const GetContent = () => {
        let objTextElementProps = {};
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = Context.CMSColorFillWrapper_Common_ModuleProcessor.GetTextElementProps(Context, objElementHeader["iElementTextId"]);
        }
        var border = "none";
        if (Context.state.ViewSolution) {
            border = "2px solid red";
        }
        if (Context.state.ViewComparison) {
            border = Context.state.ElementStatus === 1 ? "2px solid green" : "2px solid red";
        }
        return (
            <React.Fragment>
                <div id={`cms-color-fill-wrapper-${Context.state.ElementJson["iElementId"]}`}
                    ielementid={Context.state.ElementJson["iElementId"]}
                    ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                    style={{ "border": border, "padding": "4px", "width": "max-content", "paddingRight": "50px" }}>
                    {
                        (Context.state.ViewSolution || (Context.state.ViewComparison && Context.state.ElementStatus !== 1)) &&
                        <img src={JConfiguration.IntranetSkinPath + "/Images/editor/FlashWrong.gif"} />
                    }
                    {
                        Context.state.ViewComparison && Context.state.ElementStatus === 1 &&
                        <img src={JConfiguration.IntranetSkinPath + "/Images/editor/FlashRight.gif"} />
                    }
                    {
                        Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ? <TextElement {...objTextElementProps} /> : ""
                    }
                    {
                        AppType.toLowerCase() === "testapplication" && Context.state.ElementJson.vElementJson.vCapturedColors &&
                        <div id={`color-fill-platte-${Context.state.ElementJson.iElementId}`} className="color-fill-color-palette-wrapper">
                            {
                                Context.state.ElementJson.vElementJson.vCapturedColors.map((color, i) => {
                                    return (
                                        <div key={`outer-circle-${Context.state.ElementJson["iElementId"]}-${i}`}
                                            className="color-fill-outer-circle" onClick={() => { Callbacks.ChangeTextSelectionColor(color); }}>
                                            <div className="color-fill-inner-circle" style={{ "backgroundColor": color, "transition": "0.3s", "border": "3px solid #fff", "boxShadow": "0 0 5px #959595" }}>
                                                {Context.state.strSelectedColor === color && <span style={{ "color": color === "#fff" ? "#000" : "#fff" }}> &#x2714; </span>}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    }
                    <div className="shape-fill-color-palette-wrapper">
                        {
                            AppType.toLowerCase() === "editor" && Context.state.cIsFirstLoad === "Y" &&
                            <object id={`alphasvg_${Context.state.ElementJson.iElementId}`}
                                data={`${Context.props.JConfiguration.WebDataPath}Repo/ColorFill/${Context.props.JConfiguration.MainClientId}/${Context.state.ElementJson.vColorFillElementJson.iElementId}_ColorFill_${Context.state.ElementJson.vColorFillElementJson.vElementJson.iColorFillFileVersion}.${Context.state.ElementJson.vColorFillElementJson.vElementJson.vColorFillType}`} type="image/svg+xml" >
                            </object>
                        }
                        {
                            AppType.toLowerCase() === "editor" && Context.state.cIsFirstLoad === "N" &&
                            <div id={`alphasvg_editor_${Context.state.ElementJson.iElementId}`}></div>
                        }
                        {
                            AppType.toLowerCase() === "testapplication" &&
                            <div id={`alphasvg_testapplication_${Context.state.ElementJson.iElementId}`}></div>
                        }
                    </div>

                </div>
                {
                    (Context.state.ViewSolution || (Context.state.ViewComparison && Context.state.ElementStatus !== 1)) &&
                    <div style={{ "border": "2px solid green", "padding": "4px", "marginTop": "4px", "width": "max-content", "paddingRight": "50px" }}>
                        <img src={JConfiguration.IntranetSkinPath + "/Images/editor/FlashRight.gif"} />
                        <div id={`alphasvg_load_solution_${Context.state.ElementJson.iElementId}`} className="solution-fill-color-palette-wrapper"></div>
                    </div>
                }
            </React.Fragment>
        );
    };

    return GetContent();
};

export default CMSColorFillWrapper_Common;
