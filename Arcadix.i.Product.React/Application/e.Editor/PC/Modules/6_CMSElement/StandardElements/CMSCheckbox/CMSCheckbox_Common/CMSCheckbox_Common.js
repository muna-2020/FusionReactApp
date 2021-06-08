//React imports
import React from 'react';

/**
 * @name CMSCheckbox_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSCheckbox
 * @returns {any} returns the cms checkbox's JSX
 */
const CMSCheckbox_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name RenderCheckboxValue
     * @param {object} objCheckBoxValue Check box value object
     * @param {string} strClassName css classes
     * @summary Render the checkbox Value.
     * @returns {any} JSX for passed checkbox value.
     */
    const RenderCheckboxValue = (objCheckBoxValue, strClassName) => {
        let blnIsChecked = objCheckBoxValue["cIsCorrectValue"] === "Y" ? true : false;
        let objTextElementProps = Callbacks.GetTextElementProps(objCheckBoxValue["iElementTextId"]);
        let PointOverrideTooltip = Context.props.ComponentController.GetComponent("PointOverrideTooltip");
        let blnIsCorrect = false, blnShowComparisonResult = false;
        if (Context.state.ViewComparison) {
            let objActualValue = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(objTempData => objTempData["iElementCheckBoxValueId"] === objCheckBoxValue["iElementCheckBoxValueId"])[0];
            if (objActualValue["cIsCorrectValue"] === "Y") {
                blnIsCorrect = true;
                blnShowComparisonResult = true;
                objTextElementProps = {
                    ...objTextElementProps,
                    ["ClassNames"]: "correct-text-solution"
                };
            }
            else if (Context.state.arrCheckboxAnswered.filter(x => x["iElementCheckBoxValueId"] === objCheckBoxValue["iElementCheckBoxValueId"] && x["isChecked"]).length > 0) {
                blnIsCorrect = false;
                blnShowComparisonResult = true;
                objTextElementProps = {
                    ...objTextElementProps,
                    ["ClassNames"]: "wrong-text-solution"
                };
            }
        }
        if (Context.state.ViewSolution) {
            let objActualValue = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(objTempData => objTempData["iElementCheckBoxValueId"] === objCheckBoxValue["iElementCheckBoxValueId"])[0];
            if (objActualValue["cIsCorrectValue"] === "Y") {
                blnIsCorrect = true;
                objTextElementProps = {
                    ...objTextElementProps,
                    ["ClassNames"]: "correct-text-solution"
                };
            }
        }
        switch (objCheckBoxValue["vVerticalAlign"].toLowerCase()) {
            case "top":
                strClassName += " checkbox-align-top";
                break;
            case "middle":
                strClassName += " checkbox-align-center";
                break;
            case "bottom":
                strClassName += " checkbox-align-bottom";
                break;
        }
        return (
            <div key={objCheckBoxValue["iElementCheckBoxValueId"]} className={strClassName} onContextMenu={(event) => {
                Events.OpenContextMenu ? Events.OpenContextMenu(event, { "Value": objCheckBoxValue, "Type": null })
                    : event.preventDefault(); event.stopPropagation();
            }}>
                <PointOverrideTooltip iDisplayOrder={objCheckBoxValue.iDisplayOrder} showTooltip={Context.state.showTooltip}>
                    <label className="checkbox-button">
                        <input type="checkbox" onChange={Events.OnCheckChange ? (event) => { Events.OnCheckChange(objCheckBoxValue); } : Events.OnCheckChange} checked={blnIsChecked} />
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

    /**
     * @name RenderMatrixDisplay
     * @summary Render the checkbox in matrix view
     * @returns {any} JSX
     */
    const RenderMatrixDisplay = () => {
        let strClassName = "checkbox-block-flex";
        let intTotalColumnCount = Context.state.ElementJson["vElementJson"]["MatrixInformation"]["iNumberOfColumns"];
        let intRowCount = Context.state.ElementJson["vElementJson"]["Values"].length / intTotalColumnCount;
        if (Context.state.ElementJson["vElementJson"]["Values"].length % intTotalColumnCount !== 0) {
            intRowCount += 1;
        }
        let arrJsx = [];
        if (intTotalColumnCount > 1) {
            strClassName = "checkbox-block-flex horizontal";
        }
        for (let intCount = 0; intCount < intRowCount; intCount++) {
            let arrValues = Context.state.ElementJson["vElementJson"]["Values"].slice(intCount * intTotalColumnCount, (intCount * intTotalColumnCount) + intTotalColumnCount);
            arrJsx[intCount] = arrValues.map((objTempCheckboxValue, intIndex) => {
                return (
                    <td>
                        {
                            RenderCheckboxValue(objTempCheckboxValue, strClassName)
                        }
                    </td>
                );
            });
        }
        return (
            <table>
                {
                    arrJsx.map(arrTempData => {
                        return (
                            <tr valign="top">
                                {
                                    arrTempData.map(tempJsx => {
                                        return tempJsx;
                                    })
                                }
                            </tr>
                        );
                    })
                }
            </table>
        );
    };

    /**
     * @name RenderNormalDisplay
     * @summary Render the checkbox in normal view
     * @returns {any} JSX
     */
    const RenderNormalDisplay = () => {
        let strClassName = Context.state.ElementJson["vElementJson"]["cIsHorizontal"] && Context.state.ElementJson["vElementJson"]["cIsHorizontal"] === "Y" ? "checkbox-block-flex horizontal" : "checkbox-block-flex";
        return Context.state.ElementJson["vElementJson"]["Values"] && Context.state.ElementJson["vElementJson"]["Values"].map((objTempCheckboxValue) => {
            return RenderCheckboxValue(objTempCheckboxValue, strClassName);
        });
    };

    const GetLikertColumnText = (objCheckboxValue) => {
        let objTextElementProps = Callbacks.GetTextElementProps(objCheckboxValue["iElementTextId"]);
        return (
            <td key={objCheckboxValue["iElementCheckboxValueId"] + "_Text"}>
                <TextElement {...objTextElementProps} />
            </td>
        );
    };

    const GetLikertColumnCheckbox = (objCheckboxValue) => {
        let blnIsChecked = objCheckboxValue["cIsCorrectValue"] === "Y" ? true : false;
        return (
            <td
                key={objCheckboxValue["iElementCheckboxValueId"] + "_Checkbox"}
                onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event, { "Value": objCheckboxValue, "Type": null }); } : Events.OpenContextMenu}
            >
                <label class="checkbox-button">
                    <input type="checkbox" onChange={Events.OnCheckChange ? (event) => { Events.OnCheckChange(objCheckboxValue); } : Events.OnCheckChange} checked={blnIsChecked} />
                    <span class="checkmark"></span>
                </label>
            </td>
        );
    };

    /**
     * @name GetContent
     * @summary Render the checkbox body
     * @returns {any} Returns the JSX for the checkbox.
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
                    strClassName += "checkbox-look-n-feel-style-1";
                    break;
                case "tableborderonly":
                    strClassName += "checkbox-look-n-feel-style-2";
                    break;
                case "tablealternate":
                    strClassName += "checkbox-look-n-feel-style-3";
                    break;
                case "tableorangealternate":
                    strClassName += "checkbox-look-n-feel-style-4";
                    break;
            }
        }
        else {
            strClassName += "checkbox-look-n-feel-style-1";
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
                    <table class="checkbox-element-likert">
                        <tbody>
                            <tr>
                                {
                                    Context.state.ElementJson["vElementJson"]["cShowHeaderFooter"] === "Y" ?
                                        <td></td> : ""
                                }
                                {
                                    Context.state.ElementJson["vElementJson"]["Values"] && Context.state.ElementJson["vElementJson"]["Values"].map(objTempCheckboxValue => {
                                        return GetLikertColumnText(objTempCheckboxValue);
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
                                    Context.state.ElementJson["vElementJson"]["Values"] && Context.state.ElementJson["vElementJson"]["Values"].map(objTempCheckboxValue => {
                                        return GetLikertColumnCheckbox(objTempCheckboxValue);
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
                    ielementid={Context.state.ElementJson["iElementId"]}
                    ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                    className={strClassName}>
                    {
                        Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                            <TextElement {...objTextElementProps} /> : ""
                    }
                        {
                            Context.state.ElementJson["vElementJson"]["cIsMatrixDisplay"] === "Y" ?
                                RenderMatrixDisplay() :
                                RenderNormalDisplay()
                        }
                </div>
            );
        }
    };

    return GetContent();
};

export default CMSCheckbox_Common;
