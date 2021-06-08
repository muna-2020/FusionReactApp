//React Imports
import React from 'react';

/**
 * @name CMSRadio_Common
 * @param {object} props props from parent
 * @summary CMSRadio's common version.
 * @returns {any} CMSRadio_Common
 */
const CMSRadio_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name RenderRadioValue
     * @param {object} objRadioValue Radio value
     * @summary Render the Radio Value.
     * @returns {any} JSX for passed Radio value.
     */
    const RenderRadioValue = (objRadioValue) => {
        let blnIsChecked = objRadioValue["cIsCorrectValue"] === "Y" ? true : false;
        let objTextElementProps = Callbacks.GetTextElementProps(objRadioValue["iElementTextId"]);
        let PointOverrideTooltip = Context.props.ComponentController.GetComponent("PointOverrideTooltip");
        let strClassName = Context.state.ElementJson["vElementJson"]["cIsHorizontal"] && Context.state.ElementJson["vElementJson"]["cIsHorizontal"] === "Y" ? "radio-block-flex horizontal" : "radio-block-flex";
        let blnIsCorrect = false, blnShowComparisonResult = false;
        if (Context.state.ViewComparison) {
            let objActualValue = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(objTempData => objTempData["iElementRadioValueId"] === objRadioValue["iElementRadioValueId"])[0];
            if (objActualValue["cIsCorrectValue"] === "Y") {
                blnIsCorrect = true;
                blnShowComparisonResult = true;
                objTextElementProps = {
                    ...objTextElementProps,
                    ["ClassNames"]: "correct-text-solution"
                };
            }
            else if (Context.state.arrRadioAnswered.filter(x => x["iElementRadioValueId"] === objRadioValue["iElementRadioValueId"] && x["isChecked"]).length > 0) {
                blnIsCorrect = false;
                blnShowComparisonResult = true;
                objTextElementProps = {
                    ...objTextElementProps,
                    ["ClassNames"]: "wrong-text-solution"
                };
            }
        }
        else if (Context.state.ViewSolution) {
            let objActualValue = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(objTempData => objTempData["iElementRadioValueId"] === objRadioValue["iElementRadioValueId"])[0];
            if (objActualValue["cIsCorrectValue"] === "Y") {
                blnIsCorrect = true;
                objTextElementProps = {
                    ...objTextElementProps,
                    ["ClassNames"]: "correct-text-solution"
                };
            }
        }
        switch (objRadioValue["vVerticalAlign"].toLowerCase()) {
            case "top":
                strClassName += " radio-align-top";
                break;
            case "middle":
                strClassName += " radio-align-center";
                break;
            case "bottom":
                strClassName += " radio-align-bottom";
                break;
        }
        return (
            <div key={objRadioValue["iElementRadioValueId"]} className={strClassName} onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event, { "Value": objRadioValue, "Type": null }); } : Events.OpenContextMenu}>
                <PointOverrideTooltip iDisplayOrder={objRadioValue.iDisplayOrder} showTooltip={Context.state.showTooltip}>
                    <label className="radio-button">
                        <input type="radio" onChange={Events.ChangeSelection ? (event) => { Events.ChangeSelection(objRadioValue); } : Events.ChangeSelection} checked={blnIsChecked} />
                        <span className="checkmark" />
                    </label>
                </PointOverrideTooltip>
                <TextElement {...objTextElementProps} />
                {
                    Context.state.ViewSolution && blnIsCorrect ?
                        <span>
                            <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.gif"} />
                        </span>
                        : ""
                }
                {
                    Context.state.ViewComparison && blnShowComparisonResult ?
                        <span>
                            {
                                blnIsCorrect ?
                                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.gif"} />
                                    :
                                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Cross.gif"} />
                            }
                        </span> : ""
                }
            </div>
        );
    };

    const GetLikertColumnText = (objRadioValue) => {
        let objTextElementProps = Callbacks.GetTextElementProps(objRadioValue["iElementTextId"]);
        return (
            <td
                key={objRadioValue["iElementRadioValueId"] + "_Text"}
            // onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event, { "Value": objRadioValue, "Type": null }); } : Events.OpenContextMenu}
            >
                <TextElement {...objTextElementProps} />
            </td>
        );
    };

    const GetLikertColumnRadioButton = (objRadioValue) => {
        let blnIsChecked = objRadioValue["cIsCorrectValue"] === "Y" ? true : false;
        return (
            <td
                align="center"
                key={objRadioValue["iElementRadioValueId"] + "_Radio"}
                onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event, { "Value": objRadioValue, "Type": null }); } : Events.OpenContextMenu}
            >
                <label class="radio-button">
                    <input type="radio" onChange={Events.ChangeSelection ? (event) => { Events.ChangeSelection(objRadioValue); } : Events.ChangeSelection} checked={blnIsChecked} />
                    <span class="checkmark"></span>
                </label>
            </td>
        );
    };

    /**
     * @name GetContent
     * @summary Render the Radio body
     * @returns {any} Returns the JSX for the Radio.
     */
    const GetContent = () => {
        let objTextElementProps = {}, objHeaderTextElementProps = {}, objFooterTextElementProps = {};
        Context.state.ElementJson["vElementJson"]["HeaderValues"].map(objTempHeaderValue => {
            if (objTempHeaderValue["vHeaderType"] === "ElementHeader") {
                if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
                    objTextElementProps = Callbacks.GetTextElementProps(objTempHeaderValue["iElementTextId"]);
                }
            }
            else if (Context.state.ElementJson["vElementJson"]["cIsLikert"] === "Y" && Context.state.ElementJson["vElementJson"]["cShowHeaderFooter"] === "Y") {
                if (objTempHeaderValue["vHeaderType"] === "TextLeft") {
                    objHeaderTextElementProps = Callbacks.GetTextElementProps(objTempHeaderValue["iElementTextId"]);
                }
                else if (objTempHeaderValue["vHeaderType"] === "TextRight") {
                    objFooterTextElementProps = Callbacks.GetTextElementProps(objTempHeaderValue["iElementTextId"]);
                }
            }
        });
        let blnIsHorizontal = Context.state.ElementJson["vElementJson"]["cIsHorizontal"] && Context.state.ElementJson["vElementJson"]["cIsHorizontal"] === "Y" ? true : false;
        let strClassName = "";
        if (blnIsHorizontal) {
            strClassName = "flex ";
        }
        if (Context.state.ElementJson["vContainerElementProperties"]) {
            switch (Context.state.ElementJson["vContainerElementProperties"]["vSkinName"].toLowerCase()) {
                case "tabledefault":
                    strClassName += "radio-look-n-feel-style-1";
                    break;
                case "tableborderonly":
                    strClassName += "radio-look-n-feel-style-2";
                    break;
                case "tablealternate":
                    strClassName += "radio-look-n-feel-style-3";
                    break;
                case "tableorangealternate":
                    strClassName += "radio-look-n-feel-style-4";
                    break;
            }
        }
        else {
            strClassName += "radio-look-n-feel-style-1";
        }
        if (Context.state.ElementJson["vElementJson"]["cIsLikert"] === "Y") {
            return (
                <div
                    ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                    ielementid={Context.state.ElementJson["iElementId"]}
                >
                    {
                        Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                            <TextElement {...objTextElementProps} /> : ""
                    }
                    <table class="radio-element-likert">
                        <tbody>
                            <tr>
                                {
                                    Context.state.ElementJson["vElementJson"]["cShowHeaderFooter"] === "Y" ?
                                        <td></td> : ""
                                }
                                {
                                    Context.state.ElementJson["vElementJson"]["Values"] && Context.state.ElementJson["vElementJson"]["Values"].map(objTempRadioValue => {
                                        return GetLikertColumnText(objTempRadioValue);
                                    })
                                }
                                {
                                    Context.state.ElementJson["vElementJson"]["cShowHeaderFooter"] === "Y" ?
                                        <td></td> : ""
                                }
                            </tr>
                            <tr>
                                {
                                    Context.state.ElementJson["vElementJson"]["cShowHeaderFooter"] === "Y" ?
                                        <td>
                                            <TextElement {...objHeaderTextElementProps} />
                                        </td> : ""
                                }
                                {
                                    Context.state.ElementJson["vElementJson"]["Values"] && Context.state.ElementJson["vElementJson"]["Values"].map(objTempRadioValue => {
                                        return GetLikertColumnRadioButton(objTempRadioValue);
                                    })
                                }
                                {
                                    Context.state.ElementJson["vElementJson"]["cShowHeaderFooter"] === "Y" ?
                                        <td>
                                            <TextElement {...objFooterTextElementProps} />
                                        </td> : ""
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return (
                <div
                    ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                    ielementid={Context.state.ElementJson["iElementId"]}
                    className={strClassName}
                >
                    {
                        Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                            <TextElement {...objTextElementProps} /> : ""
                    }
                        {
                            Context.state.ElementJson["vElementJson"]["Values"] && Context.state.ElementJson["vElementJson"]["Values"].map(objTempRadioValue => {
                                return RenderRadioValue(objTempRadioValue);
                            })
                        }
                </div>
            );
        }
    };

    return GetContent();
};

export default CMSRadio_Common;
