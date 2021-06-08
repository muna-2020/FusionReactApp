//React Import
import React from 'react';

//Common Drag - Drop controls.
import DragZone from '@root/Framework/Controls/Dragdrop/DragZone/DragZone';
import DropZone from '@root/Framework/Controls/Dragdrop/DropZone/DropZone';

/**
 * @name CMSDragdropAssign_Common
 * @param {object} props props from parent
 * @summary Common component for Dragdrop
 * @returns {any} CMSDragdropAssign_Common
 */
const CMSDragdropAssign_Common = (props) => {

    let { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetEditModeValues
     * @param {object} objValue Dragdrop assign value
     * @summary Renders the values of the component for the Edit mode.
     * @returns {JSX} JSX
     */
    const GetEditModeValues = (objValue) => {
        if (objValue["iBlockId"] !== -1) {
            let objTextElementProps = Callbacks.GetTextElementProps(objValue["iElementTextId"]);
            switch (objValue["iBlockId"]) {
                case 1:
                    return (
                        <tr
                            key={objValue["iElementDragDropAssignValueId"]}
                            className="dragdropassign-row"
                            onContextMenu={(event) => { Events.OpenContextMenu(event, { "Value": objValue, "Type": "" }); }}>
                            <td className="dragdropassign-cell-editor" valign="top">
                                <TextElement  {...objTextElementProps} />
                            </td>
                            <td className="dragdropassign-cell-editor" />
                            <td className="dragdropassign-cell-editor" />
                        </tr>
                    );
                case 2:
                    return (
                        <tr
                            key={objValue["iElementDragDropAssignValueId"]}
                            className="dragdropassign-row"
                            onContextMenu={(event) => { Events.OpenContextMenu(event, { "Value": objValue, "Type": "" }); }}>
                            <td className="dragdropassign-cell-editor" />
                            <td className="dragdropassign-cell-editor" valign="top">
                                <TextElement  {...objTextElementProps} />
                            </td>
                            <td className="dragdropassign-cell-editor" />
                        </tr>
                    );
                case 3:
                    return (
                        <tr
                            key={objValue["iElementDragDropAssignValueId"]}
                            className="dragdropassign-row"
                            onContextMenu={(event) => { Events.OpenContextMenu(event, { "Value": objValue, "Type": "" }); }}>
                            <td className="dragdropassign-cell-editor" />
                            <td className="dragdropassign-cell-editor" />
                            <td className="dragdropassign-cell-editor" valign="top">
                                <TextElement  {...objTextElementProps} />
                            </td>
                        </tr>
                    );
            }
        }
        else {
            return (
                <tr
                    key={objValue["iElementDragDropAssignValueId"]}
                    className="dragdropassign-row"
                    onFocusCapture={() => { Events.ActivateOnlyPassedBlockId(objValue); }}
                    onContextMenu={(event) => { Events.OpenContextMenu(event, { "Value": objValue, "Type": "" }); }}
                >
                    {
                        objValue["iElementTextId"].map((intTempElementTextId, intIndex) => {
                            let objTextElementProps = Callbacks.GetTextElementProps(intTempElementTextId);
                            intIndex += 1;
                            return (
                                <td
                                    className="dragdropassign-cell-editor"
                                    valign="top"
                                >
                                    <TextElement {...objTextElementProps} />
                                </td>
                            );
                        })
                    }
                </tr>
            );
        }
    };

    /**
     * @name GetLeftBlock_Preview
     * @param {boolean} blnIsDragDropEnabled Toggles between the Normal/Comparison/Solution View.
     * @summary Retuns the JSX of the left Block.
     * @returns {JSX} JSX
     */
    const GetLeftBlock_Preview = (blnIsDragDropEnabled = true) => {
        let arrValues;
        if (blnIsDragDropEnabled) {
            arrValues = Context.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iBlockId"] === 1);
        }
        else {
            arrValues = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(objTempValue => objTempValue["iBlockId"] === 1);
        }
        return (
            <td
                id={"DragDropAssignBlock_1"}
                iblockid="1"
                className="dragdropassign-cell-preview"
                DragDrop_DragAreaType={blnIsDragDropEnabled ? "OptionArea" : undefined}
                valign="top">
                {
                    arrValues.map(objTempValue => {
                        let strClassName = "";
                        if (Context.state.ViewComparison) {
                            if (blnIsDragDropEnabled) {
                                if (Context.state.arrDragdropAssignAnswered.filter(x => x["iElementDragDropAssignValueId"] === objTempValue["iElementDragDropAssignValueId"]).length > 0) {
                                    if (Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(x => x["iElementDragDropAssignValueId"] === objTempValue["iElementDragDropAssignValueId"] && x["iBlockId"] === 1).length > 0) {
                                        strClassName += " dragdropassign-correct-response";
                                    }
                                    else {
                                        strClassName += " dragdropassign-wrong-response";
                                    }
                                }
                            }
                            else {
                                strClassName += " dragdropassign-correct-response";
                            }
                        }
                        let objTextElementProps = Callbacks.GetTextElementProps(objTempValue["iElementTextId"]);
                        return (
                            <div
                                key={objTempValue["iElementDragDropAssignValueId"]}
                                className={"dragdropassign-answer" + strClassName}
                                id={"DragDropAssign_" + objTempValue["iElementDragDropAssignValueId"]}
                                ielementdragdropassignvalueid={objTempValue["iElementDragDropAssignValueId"]}
                                DragDrop_DragElementType={blnIsDragDropEnabled ? "AnswerOption" : undefined}>
                                <TextElement {...objTextElementProps} />
                            </div>
                        );
                    })
                }
            </td>
        );
    };

    /**
     * @name GetCenterBlock_Preview
     * @param {boolean} blnIsDragDropEnabled Toggles between the Normal/Comparison/Solution View.
     * @summary Retuns the JSX of the center Block.
     * @returns {JSX} JSX
     */
    const GetCenterBlock_Preview = (blnIsDragDropEnabled = true) => {
        let arrValues;
        if (blnIsDragDropEnabled) {
            arrValues = Context.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iBlockId"] === 2);
        }
        else {
            arrValues = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(objTempValue => objTempValue["iBlockId"] === 2);
        }
        return (
            <td id={"DragDropAssignBlock_2"} iblockid="2" className="dragdropassign-cell-preview" DragDrop_DragAreaType={blnIsDragDropEnabled ? "OptionArea" : undefined} valign="top">
                {
                    arrValues.map(objTempValue => {
                        let strClassName = "";
                        if (Context.state.ViewComparison) {
                            if (blnIsDragDropEnabled) {
                                if (Context.state.arrDragdropAssignAnswered.filter(x => x["iElementDragDropAssignValueId"] === objTempValue["iElementDragDropAssignValueId"]).length > 0) {
                                    if (Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(x => x["iElementDragDropAssignValueId"] === objTempValue["iElementDragDropAssignValueId"] && x["iBlockId"] === 2).length > 0) {
                                        strClassName += " dragdropassign-correct-response";
                                    }
                                    else {
                                        strClassName += " dragdropassign-wrong-response";
                                    }
                                }
                            }
                            else {
                                strClassName += " dragdropassign-correct-response";
                            }
                        }
                        let objTextElementProps = Callbacks.GetTextElementProps(objTempValue["iElementTextId"]);
                        return (
                            <div
                                key={objTempValue["iElementDragDropAssignValueId"]}
                                className={"dragdropassign-answer" + strClassName}
                                id={"DragDropAssign_" + objTempValue["iElementDragDropAssignValueId"]}
                                ielementdragdropassignvalueid={objTempValue["iElementDragDropAssignValueId"]}
                                DragDrop_DragElementType={blnIsDragDropEnabled ? "AnswerOption" : undefined}>
                                <TextElement {...objTextElementProps} />
                            </div>
                        );
                    })
                }
            </td>
        );
    };

    /**
     * @name GetRightBlock_Preview
     * @param {boolean} blnIsDragDropEnabled Toggles between the Normal/Comparison/Solution View.
     * @summary Retuns the JSX of the right Block.
     * @returns {JSX} JSX
     */
    const GetRightBlock_Preview = (blnIsDragDropEnabled = true) => {
        let arrValues;
        if (blnIsDragDropEnabled) {
            arrValues = Context.state.ElementJson["vElementJson"]["Values"].filter(objTempValue => objTempValue["iBlockId"] === 3);
        }
        else {
            arrValues = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(objTempValue => objTempValue["iBlockId"] === 3);
        }
        return (
            <td id={"DragDropAssignBlock_3"} iblockid="3" className="dragdropassign-cell-preview" DragDrop_DragAreaType={blnIsDragDropEnabled ? "OptionArea" : undefined} valign="top">
                {
                    arrValues.map(objTempValue => {
                        let strClassName = "";
                        if (Context.state.ViewComparison) {
                            if (blnIsDragDropEnabled) {
                                if (Context.state.arrDragdropAssignAnswered.filter(x => x["iElementDragDropAssignValueId"] === objTempValue["iElementDragDropAssignValueId"]).length > 0) {
                                    if (Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(x => x["iElementDragDropAssignValueId"] === objTempValue["iElementDragDropAssignValueId"] && x["iBlockId"] === 3).length > 0) {
                                        strClassName += " dragdropassign-correct-response";
                                    }
                                    else {
                                        strClassName += " dragdropassign-wrong-response";
                                    }
                                }
                            }
                            else {
                                strClassName += " dragdropassign-correct-response";
                            }
                        }
                        let objTextElementProps = Callbacks.GetTextElementProps(objTempValue["iElementTextId"]);
                        return (
                            <div
                                key={objTempValue["iElementDragDropAssignValueId"]}
                                className={"dragdropassign-answer" + strClassName}
                                id={"DragDropAssign_" + objTempValue["iElementDragDropAssignValueId"]}
                                ielementdragdropassignvalueid={objTempValue["iElementDragDropAssignValueId"]}
                                DragDrop_DragElementType={blnIsDragDropEnabled ? "AnswerOption" : undefined}>
                                <TextElement {...objTextElementProps} />
                            </div>
                        );
                    })
                }
            </td>
        );
    };

    /**
     * @name GetPreviewModeValues
     * @summary Renders the values of the component for the Preview mode.
     * @returns {JSX} JSX
     */
    const GetPreviewModeValues = () => {
        return (
            <tr id={"DragDropAssignRow_preview"} className="dragdropassign-row">
                {
                    GetLeftBlock_Preview(true)
                }
                {
                    GetCenterBlock_Preview(true)
                }
                {
                    GetRightBlock_Preview(true)
                }
            </tr>
        );
    };

    /**
     * @name GetComparisonOrSolutionJSX
     * @summary Returns JSX for Comparison/Solution view.
     * @returns {JSX} JSX
     */
    const GetComparisonOrSolutionJSX = () => {
        return (
            <tr id={"DragDropAssignRow_Solution"} className="dragdropassign-row" >
                {
                    GetLeftBlock_Preview(false)
                }
                {
                    GetCenterBlock_Preview(false)
                }
                {
                    GetRightBlock_Preview(false)
                }
            </tr>
        );
    }

    /**
     * @name GetContent
     * @summary Renders the body of the component.
     * @returns {JSX} JSX
     */
    const GetContent = () => {
        let objHeaderText, arrHeaderValues = [];
        Context.state.ElementJson["vElementJson"]["HeaderValues"].map(objTempHeaderValue => {
            if (objTempHeaderValue["vHeaderType"] === "ElementHeader") {
                objHeaderText = objTempHeaderValue;
            }
            else {
                arrHeaderValues = [
                    ...arrHeaderValues,
                    objTempHeaderValue
                ];
            }
        });
        let objDragZoneProps = {
            "Meta": {
                "GroupId": Context.state.ElementJson["iElementId"],
                "Disable": AppType.toLowerCase() === "editor" ? true : false,
                "DraggableElementType": "AnswerOption",
                "DragAreaType": "OptionArea",
                "DropAreaType": "AnswerArea"
            },
            "Events": {
                "OnDrop": Events.OnDrop
            },
            "CallBacks": {},
            "Data": {
                "iElementId": Context.state.ElementJson["iElementId"],
                "iElementTypeId": Context.state.ElementJson["iElementTypeId"]
            }
        };
        let objDropZoneProps = {
            "Meta": {
                "GroupId": Context.state.ElementJson["iElementId"],
                "Disable": AppType.toLowerCase() === "editor" ? true : false,
                "IsDraggable": true
            },
            "Events": {
                "OnDrop": Events.OnDrop
            },
            "CallBacks": {},
            "Data": {
                "iElementId": Context.state.ElementJson["iElementId"],
                "iElementTypeId": Context.state.ElementJson["iElementTypeId"]
            }
        };
        let objTextElementProps = {};
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            objTextElementProps = Callbacks.GetTextElementProps(objHeaderText["iElementTextId"]);
        }
        let strClassName = "dragdropassign ";
        if (AppType === "Editor") {
            strClassName += "dragdropassign-editor";
        }
        else {
            strClassName += "dragdropassign-preview";
        }
        let blnShowSolution = false;
        if ((Context.state.ViewSolution) || (Context.state.ViewComparison && Context.state.ElementStatus !== null && Context.state.ElementStatus !== 1)) {
            blnShowSolution = true;
        }
        return (
            <div ielementid={Context.state.ElementJson["iElementId"]} ielementtypeid={Context.state.ElementJson["iElementTypeId"]} ref={Context.ComponentRef}>
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <TextElement {...objTextElementProps} /> : ""
                }
                <DragZone {...objDragZoneProps}>
                    <DropZone {...objDropZoneProps}>
                        <table className={strClassName} type={"DragDropAssign_" + Context.state.ElementJson["iElementId"] + "_Table"}>
                            <thead>
                                <tr>
                                    {
                                        arrHeaderValues.map(objTempHeaderValue => {
                                            let strColumnId = "";
                                            switch (objTempHeaderValue["iBlockId"]) {
                                                case 1: strColumnId = "DragdropAssign_ColumnOne_" + Context.state.ElementJson["iElementId"];
                                                    break;
                                                case 2: strColumnId = "DragdropAssign_ColumnTwo_" + Context.state.ElementJson["iElementId"];
                                                    break;
                                                case 3: strColumnId = "DragdropAssign_ColumnThree_" + Context.state.ElementJson["iElementId"];
                                                    break;
                                            }
                                            if (AppType === "Editor") {
                                                return (
                                                    <th key={strColumnId} id={strColumnId} align="right" style={{ minWidth: "142px", "width": objTempHeaderValue["iWidth"] + "px" }}>
                                                        <img
                                                            src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/DragDropResizer.png"}
                                                            draggable={true}
                                                            onDragStart={Events.ActivateResize}
                                                            onDragEnd={Events.DeActivateResize}
                                                            onDrag={(event) => { Events.Resize(event, strColumnId); }}
                                                            alt="" />
                                                    </th>
                                                );
                                            }
                                            else {
                                                return (
                                                    <th key={strColumnId} align="right" style={{ minWidth: "142px", "width": objTempHeaderValue["iWidth"] + "px" }} />
                                                );
                                            }
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {
                                        arrHeaderValues.map(objTempHeaderValue => {
                                            let objTextElementProps = Callbacks.GetTextElementProps(objTempHeaderValue["iElementTextId"]);
                                            return (
                                                <td key={objTempHeaderValue["iElementDragDropAssignHeaderValueId"]} className="dragdropassign-column-title">
                                                    <TextElement {...objTextElementProps} />
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                                {
                                    AppType === "Editor" ?
                                        Context.state.ElementJson["vElementJson"]["Values"].map((objTempValue) => {
                                            return GetEditModeValues(objTempValue);
                                        })
                                        :
                                        GetPreviewModeValues()
                                }
                            </tbody>
                        </table>
                    </DropZone>
                </DragZone>
                {
                    blnShowSolution ?
                        <table className="dragdropassign-preview dragdropassign-solution">
                            <thead>
                                <tr>
                                    {
                                        arrHeaderValues.map(objTempHeaderValue => {
                                            let strColumnId = "";
                                            switch (objTempHeaderValue["iBlockId"]) {
                                                case 1: strColumnId = "DragdropAssign_ColumnOne_" + Context.state.ElementJson["iElementId"];
                                                    break;
                                                case 2: strColumnId = "DragdropAssign_ColumnTwo_" + Context.state.ElementJson["iElementId"];
                                                    break;
                                                case 3: strColumnId = "DragdropAssign_ColumnThree_" + Context.state.ElementJson["iElementId"];
                                                    break;
                                            }
                                            return (
                                                <th key={strColumnId} align="right" style={{ minWidth: "142px", "width": objTempHeaderValue["iWidth"] + "px" }} />
                                            );
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {
                                        arrHeaderValues.map(objTempHeaderValue => {
                                            let objTextElementProps = Callbacks.GetTextElementProps(objTempHeaderValue["iElementTextId"]);
                                            return (
                                                <td key={objTempHeaderValue["iElementDragDropAssignHeaderValueId"]} className="dragdropassign-column-title" style={{ "width": objTempHeaderValue["iWidth"] + "px" }}>
                                                    <TextElement {...objTextElementProps} />
                                                </td>
                                            );
                                        })
                                    }
                                </tr>
                                {
                                    GetComparisonOrSolutionJSX()
                                }
                            </tbody>
                        </table>
                        : ""
                }
            </div>
        );
    };

    return GetContent();
};

export default CMSDragdropAssign_Common;
