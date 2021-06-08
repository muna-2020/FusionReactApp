//React imports
import React from 'react';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name CMSRadio_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSRadioMatrix
 * @returns {any} returns the cms RadioMatrix's JSX
 */
const CMSRadioMatrix_Common = (props) => {

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
     * @name RenderRadio
     * @param {object} objRowItem RadioMatrix Matrix row value
     * @param {object} objColumnItem RadioMatrix Matrix column value
     * @summary Render the Radio Matrix.
     * @returns {any} jSX
     */
    const RenderRadio = (objRowItem, objColumnItem) => {
        let blnIsChecked = false;
        if (Context.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => (objTempValue["iElementRadioMatrixColumnId"] === objColumnItem["iElementRadioMatrixColumnId"]) && (objTempValue["iElementRadioMatrixRowId"] === objRowItem["iElementRadioMatrixRowId"])).length > 0) {
            blnIsChecked = true;
        }
        let blnIsCorrect = false, blnShowComparisonResult = false, strClassName = "";
        if (Context.state.ViewComparison) {
            let arrActualValue = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(objTempValue => (objTempValue["iElementRadioMatrixColumnId"] === objColumnItem["iElementRadioMatrixColumnId"]) && (objTempValue["iElementRadioMatrixRowId"] === objRowItem["iElementRadioMatrixRowId"]));
            if (arrActualValue.length > 0) {
                blnIsCorrect = true;
                blnShowComparisonResult = true;
                strClassName = "correct-answer-radio-matrix";
            }
            else if (Context.state.arrRadioMatrixAnswered.filter(x => x["iElementRadioMatrixColumnId"] === objColumnItem["iElementRadioMatrixColumnId"] && x["iElementRadioMatrixRowId"] === objRowItem["iElementRadioMatrixRowId"]).length > 0) {
                blnIsCorrect = false;
                blnShowComparisonResult = true;
                strClassName = "wrong-answer-radio-matrix";
            }
        }
        if (Context.state.ViewSolution) {
            let arrActualValue = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(objTempValue => (objTempValue["iElementRadioMatrixColumnId"] === objColumnItem["iElementRadioMatrixColumnId"]) && (objTempValue["iElementRadioMatrixRowId"] === objRowItem["iElementRadioMatrixRowId"]));
            if (arrActualValue.length > 0) {
                blnIsCorrect = true;
                strClassName = "correct-answer-radio-matrix";
            }
        }
        return (
            <td
                className={strClassName}
                key={objRowItem["iElementRadioMatrixRowId"] + "_" + objColumnItem["iElementRadioMatrixColumnId"]}
                valign={objRowItem["vVerticalAlign"]}>
                <div className="radio-wrapper">
                    <label className="radio-button">
                        <input type="radio" onChange={(event) => Events.ChangeSelection(objRowItem, objColumnItem)} checked={blnIsChecked} />
                        <span className="checkmark"></span>
                    </label>
                    {
                        Context.state.ViewSolution ?
                            blnIsCorrect ?
                                <span>
                                    <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.gif"} />
                                </span>
                                : <span style={{ width: "12px" }}></span> : ""
                    }
                    {
                        Context.state.ViewComparison ?
                            blnShowComparisonResult ?
                                <span>
                                    {
                                        blnIsCorrect ?
                                            <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.gif"} />
                                            :
                                            <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Cross.gif"} />
                                    }
                                </span> : <span style={{ width: "12px" }} /> : ""
                    }
                </div>
            </td>
        );
    };

    /**
     * @name RenderRow
     * @param {object} objMatrixRow Radio Matrix row value
     * @summary Render rows header text.
     * @returns {any} jSX
     */
    const RenderRow = (objMatrixRow, intIndex, objHeaderTextElementProps, objFooterTextElementProps) => {
        let objTextElementProps = Callbacks.GetTextElementProps(objMatrixRow["iElementTextId"]);
        let strClassName, PointOverrideTooltip, intDisplayOrder;
        if (AppType === "Editor") {
            PointOverrideTooltip = Context.props.ComponentController.GetComponent("PointOverrideTooltip");
            let objValue = Context.state.ElementJson.vElementJson.MatrixRow.find(objTempValue => objTempValue.iElementRadioMatrixRowId === objMatrixRow.iElementRadioMatrixRowId);
            intDisplayOrder = objValue.iDisplayOrder;
        }
        if (Context.state.ElementJson["vElementJson"]["cIsTitleToLeft"] === "N") {
            strClassName = "right-cell";
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
            <tr key={objMatrixRow["iElementRadioMatrixRowId"]} onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event, { "Value": objMatrixRow, "Type": "ROW" }); } : Events.OpenContextMenu}>
                <td key={objTextElementProps.ElementJson["iElementId"]} className={strClassName}>
                    {
                        AppType === "Editor" ?
                            <PointOverrideTooltip iDisplayOrder={intDisplayOrder} showTooltip={Context.state.showTooltip} /> : ""
                    }
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
                        return RenderRadio(objMatrixRow, objColumnItem);
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
     * @param {object} objMatrixColumn Radio Matrix column value
     * @summary Render column header text.
     * @returns {any} jSX
     */
    const RenderColumn = (objMatrixColumn) => {
        let objTextElementProps = Callbacks.GetTextElementProps(objMatrixColumn["iElementTextId"]);
        return (
            <td key={objMatrixColumn["iElementRadioMatrixColumnId"]}>
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
        let strTableClassName = "cms-radio-matrix";
        if (Context.state.ElementJson["vElementJson"]["cIsLikert"] === "Y") {
            strTableClassName += " likert";
        }
        if (Context.state.ElementJson["vElementJson"]["cIsTitleToLeft"] === "N") {
            strTableClassName += " title-right";
        }
        if (Context.state.ElementJson["vContainerElementProperties"]) {
            switch (Context.state.ElementJson["vContainerElementProperties"]["vSkinName"].toLowerCase()) {
                case "tableborderonly":
                    strTableClassName += " rm-look-n-feel-style-2";
                    break;
                case "tablealternate":
                    strTableClassName += " rm-look-n-feel-style-3";
                    break;
                case "tableorangealternate":
                    strTableClassName += " rm-look-n-feel-style-4";
                    break;
            }
        }
        return (
            <div
                ielementid={Context.state.ElementJson["iElementId"]}
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                contextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event, {}); } : Events.OpenContextMenu}
            >
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <TextElement {...objTextElementProps} /> : ""
                }
                <table className={strTableClassName}>
                    <tbody>
                        <tr>
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
                                Context.state.ElementJson["vElementJson"]["MatrixColumn"].map((objMatrixColumn) => {
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

export default CMSRadioMatrix_Common;
