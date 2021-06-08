//React imports
import React from 'react';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name CMSCheckboxMatrix_Common
 * @param {object} props props from parent
 * @summary Common component for Checkbox matrix
 * @returns {any} CMSCheckboxMatrix_Common
 */
const CMSCheckboxMatrix_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name RenderHeader
     * @summary Render matrix header.
     * @returns {any} JSX
     */
    const RenderHeader = (objRowHeaderTextElementProps) => {
        let strClassName;
        if (Context.state.ElementJson["vElementJson"]["cIsTitleToLeft"] === "N") {
            strClassName = "right-cell"
        }
        return (
            <td className={strClassName}>
                <TextElement {...objRowHeaderTextElementProps} />
            </td>
        );
    };

    /**
     * @name RenderCheckbox
     * @param {object} objRowItem CheckboxMatrix Matrix row value
     * @param {object} objColumnItem CheckboxMatrix Matrix column value
     * @summary Render the checkboxes.
     * @returns {any} jSX
     */
    const RenderCheckbox = (objRowItem, objColumnItem) => {
        let PointOverrideTooltip = Context.props.ComponentController.GetComponent("PointOverrideTooltip");
        let arrValues = Context.state.ElementJson["vElementJson"]["Values"].slice();
        let objValue = arrValues.find(objTempValue => objTempValue["iElementCheckBoxMatrixColumnId"] === objColumnItem["iElementCheckBoxMatrixColumnId"] && objTempValue["iElementCheckBoxMatrixRowId"] === objRowItem["iElementCheckBoxMatrixRowId"]);
        let blnIsChecked = objValue["cIsCorrectValue"] === "Y" ? true : false;
        let blnIsCorrect = false, blnShowComparisonResult = false, strClassName;
        if (Context.state.ViewComparison) {
            let objActualValue = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].find(objTempValue => objTempValue["iElementCheckBoxMatrixColumnId"] === objColumnItem["iElementCheckBoxMatrixColumnId"] && objTempValue["iElementCheckBoxMatrixRowId"] === objRowItem["iElementCheckBoxMatrixRowId"]);
            if (objActualValue["cIsCorrectValue"] === "Y") {
                blnIsCorrect = true;
                blnShowComparisonResult = true;
                strClassName = "correct-answer-checkbox-matrix";
            }
            else if (Context.state.arrCheckboxMatrixAnswered.filter(x => x["iElementCheckBoxMatrixColumnId"] === objColumnItem["iElementCheckBoxMatrixColumnId"] && x["iElementCheckBoxMatrixRowId"] === objRowItem["iElementCheckBoxMatrixRowId"] && x["isChecked"]).length > 0) {
                blnIsCorrect = false;
                blnShowComparisonResult = true;
                strClassName = "wrong-answer-checkbox-matrix";
            }
        }
        if (Context.state.ViewSolution) {
            let objActualValue = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].find(objTempValue => objTempValue["iElementCheckBoxMatrixColumnId"] === objColumnItem["iElementCheckBoxMatrixColumnId"] && objTempValue["iElementCheckBoxMatrixRowId"] === objRowItem["iElementCheckBoxMatrixRowId"]);
            if (objActualValue["cIsCorrectValue"] === "Y") {
                blnIsCorrect = true;
                strClassName = "correct-answer-checkbox-matrix";
            }
        }
        return (
            <td
                className={strClassName}
                key={objRowItem["iElementCheckBoxMatrixRowId"] + "_" + objColumnItem["iElementCheckBoxMatrixColumnId"]}
                valign={objRowItem["vVerticalAlign"]}
            >
                <PointOverrideTooltip iDisplayOrder={objValue.iDisplayOrder} showTooltip={Context.state.showTooltip}>
                    <label class="checkbox-button">
                        <input type="checkbox" onChange={(event) => Events.OnCheckChange(objRowItem, objColumnItem)} checked={blnIsChecked} />
                        <span class="checkmark"></span>
                    </label>
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
                </PointOverrideTooltip>
            </td>
        );
    };

    /**
     * @name RenderRow
     * @param {object} objMatrixRow Checkbox Matrix row value
     * @summary Render rows header text.
     * @returns {any} jSX
     */
    const RenderRow = (objMatrixRow, intIndex, objHeaderTextElementProps, objFooterTextElementProps) => {
        let objTextElementProps = Callbacks.GetTextElementProps(objMatrixRow["iElementTextId"]);
        let strClassName;
        if (Context.state.ElementJson["vElementJson"]["cIsTitleToLeft"] === "N") {
            strClassName = "right-cell"
        }
        if (intIndex === 0) {
            objHeaderTextElementProps = {
                ...objHeaderTextElementProps,
                ["RevertData"]: objMatrixRow,
                ["OnBlur"]: Events.OnBlur ? () => {
                    Events.OnBlur(objHeaderTextElementProps.ElementJson);
                } : Events.OnBlur
            };
            objFooterTextElementProps = {
                ...objFooterTextElementProps,
                ["RevertData"]: objMatrixRow,
                ["OnBlur"]: Events.OnBlur ? () => {
                    Events.OnBlur(objFooterTextElementProps.ElementJson);
                } : Events.OnBlur
            };
        }
        if (AppType === "TestApplication" && intIndex > 0) {
            objHeaderTextElementProps = {
                ...objHeaderTextElementProps,
                ["ElementJson"]: {
                    ...objHeaderTextElementProps["ElementJson"],
                    ["iElementId"]: UniqueId.GetUniqueId(),
                    ["Ref"]: null
                },
                ["cIsNotContentEditable"]: "Y"
            };
            objFooterTextElementProps = {
                ...objFooterTextElementProps,
                ["ElementJson"]: {
                    ...objFooterTextElementProps["ElementJson"],
                    ["iElementId"]: UniqueId.GetUniqueId(),
                    ["Ref"]: null
                },
                ["cIsNotContentEditable"]: "Y"
            };
        }
        return (
            <tr
                key={objMatrixRow["iElementCheckBoxMatrixRowId"]}
                valign="top"
                onContextMenu={(event) => { Events.OpenContextMenu(event, { "Value": objMatrixRow, "Type": "ROW" }); }}>
                <td className={strClassName}>
                    <TextElement {...objTextElementProps} />
                </td>
                {
                    Context.state.ElementJson["vElementJson"]["cIsLikert"] === "Y" ?
                        <td>
                            {
                                Context.state.ElementJson["vElementJson"]["cSetHeaderFooterAsTitle"] === "N" ?
                                    AppType === "Editor" ?
                                        intIndex === 0 ?
                                            <TextElement {...objHeaderTextElementProps} /> : <div dangerouslySetInnerHTML={{ __html: objHeaderTextElementProps.ElementJson["vElementJson"]["vText"] }} />
                                        :
                                        <TextElement {...objHeaderTextElementProps} /> : ""
                            }
                        </td> : ""
                }
                {
                    Context.state.ElementJson["vElementJson"]["MatrixColumn"].map(objColumnItem => {
                        return RenderCheckbox(objMatrixRow, objColumnItem);
                    })
                }
                {
                    Context.state.ElementJson["vElementJson"]["cIsLikert"] === "Y" ?
                        <td>
                            {
                                Context.state.ElementJson["vElementJson"]["cSetHeaderFooterAsTitle"] === "N" ?
                                    AppType === "Editor" ?
                                        intIndex === 0 ?
                                            <TextElement {...objFooterTextElementProps} /> : <div dangerouslySetInnerHTML={{ __html: objFooterTextElementProps.ElementJson["vElementJson"]["vText"] }} />
                                        :
                                        <TextElement {...objFooterTextElementProps} /> : ""
                            }
                        </td> : ""
                }
            </tr>
        );
    };

    /**
     * @name RenderColumn
     * @param {object} objMatrixColumn Checkbox Matrix column value
     * @summary Render column header text.
     * @returns {any} jSX
     */
    const RenderColumn = (objMatrixColumn) => {
        let objTextElementProps = Callbacks.GetTextElementProps(objMatrixColumn["iElementTextId"]);
        return (
            <td key={objMatrixColumn["iElementCheckBoxMatrixColumnId"]} align={"center"} style={{ padding: "10px;" }}>
                <TextElement {...objTextElementProps} />
            </td>
        );
    };

    /**
     * @name GetContent
     * @summary Renders the component
     * @returns {any} jSX
     */
    const GetContent = () => {
        let objRowHeaderTextElementProps = {}, objTextElementProps = {}, objHeaderTextElementProps = {}, objFooterTextElementProps = {};
        Context.state.ElementJson["vElementJson"]["HeaderValues"].map(objTempHeaderValue => {
            if (objTempHeaderValue["vHeaderType"] === "RowHeader") {
                objRowHeaderTextElementProps = Callbacks.GetTextElementProps(objTempHeaderValue["iElementTextId"]);
            }
            else if (objTempHeaderValue["vHeaderType"] === "ElementHeader") {
                if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
                    objTextElementProps = Callbacks.GetTextElementProps(objTempHeaderValue["iElementTextId"]);
                }
            }
            else if (objTempHeaderValue["vHeaderType"] === "TextLeft" && Context.state.ElementJson["vElementJson"]["cIsLikert"] === "Y") {
                objHeaderTextElementProps = Callbacks.GetTextElementProps(objTempHeaderValue["iElementTextId"]);
            }
            else if (objTempHeaderValue["vHeaderType"] === "TextRight" && Context.state.ElementJson["vElementJson"]["cIsLikert"] === "Y") {
                objFooterTextElementProps = Callbacks.GetTextElementProps(objTempHeaderValue["iElementTextId"]);
            }
        });
        let strClassName = "checkbox-matrix-table";
        if (Context.state.ElementJson["vElementJson"]["cIsLikert"] === "Y") {
            strClassName += " likert";
        }
        if (Context.state.ElementJson["vElementJson"]["cIsTitleToLeft"] === "N") {
            strClassName += " title-right"
        }
        if (Context.state.ElementJson["vContainerElementProperties"]) {
            switch (Context.state.ElementJson["vContainerElementProperties"]["vSkinName"].toLowerCase()) {
                case "tableborderonly":
                    strClassName += " cbm-look-n-feel-style-2";
                    break;
                case "tablealternate":
                    strClassName += " cbm-look-n-feel-style-3";
                    break;
                case "tableorangealternate":
                    strClassName += " cbm-look-n-feel-style-4";
                    break;
            }
        }
        return (
            <div
                ielementid={Context.state.ElementJson["iElementId"]}
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                onContextMenu={(event) => { Events.OpenContextMenu(event, {}); }}
            >
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <TextElement {...objTextElementProps} /> : ""
                }
                <table className={strClassName} border="0" cellpadding="0" cellspacing="0" valign="top" align="left">
                    <tbody>
                        <tr valign="top">
                            {
                                RenderHeader(objRowHeaderTextElementProps)
                            }
                            {
                                Context.state.ElementJson["vElementJson"]["cIsLikert"] === "Y" ?
                                    <td>
                                        {
                                            Context.state.ElementJson["vElementJson"]["cSetHeaderFooterAsTitle"] === "Y" ?
                                                <TextElement {...objHeaderTextElementProps} />
                                                : ""
                                        }
                                    </td> : ""
                            }
                            {
                                Context.state.ElementJson["vElementJson"]["MatrixColumn"].map(objMatrixColumn => {
                                    return RenderColumn(objMatrixColumn);
                                })
                            }
                            {
                                Context.state.ElementJson["vElementJson"]["cIsLikert"] === "Y" ?
                                    <td>
                                        {
                                            Context.state.ElementJson["vElementJson"]["cSetHeaderFooterAsTitle"] === "Y" ?
                                                <TextElement {...objFooterTextElementProps} /> : ""
                                        }
                                    </td> : ""
                            }
                        </tr>
                        {
                            Context.state.ElementJson["vElementJson"]["MatrixRow"].map((objMatrixRow, intIndex) => {
                                return RenderRow(objMatrixRow, intIndex, objHeaderTextElementProps, objFooterTextElementProps);
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    };

    return GetContent();
};

export default CMSCheckboxMatrix_Common;

