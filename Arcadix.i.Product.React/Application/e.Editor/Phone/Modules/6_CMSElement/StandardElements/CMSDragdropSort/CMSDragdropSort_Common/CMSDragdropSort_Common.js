//React Imports
import React from 'react';

//Common Drag - Drop controls.
import DragZone from '@root/Framework/Controls/Dragdrop/DragZone/DragZone';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name CMSDragdropSort_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSDragdropSort
 * @returns {any} returns the cms CMSDragdropSort's JSX
 */
const CMSDragdropSort_Common = (props) => {

    let { Context, Events, Callbacks, TextElement, AppType } = props;

    const GetQuestion = (objTempValue, intIndex) => {
        if (AppType === "TestApplication") {
            let objValue = Context.state.ElementJson["vElementJson"]["Values"].find(objTempValue => objTempValue["iDisplayOrder"] === (intIndex + 1));
            if (objValue) {
                let objTextElementProps = Callbacks.GetTextElementProps(objValue["iElementTextId"]);
                let strClassName = "";
                if (Context.state.ViewComparison && Context.state.arrDragdropSortAnswered.filter(x => x["iElementDragDropSortValueId"] === objValue["iElementDragDropSortValueId"]).length > 0) {
                    let objActualValue = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].filter(objTempData => objTempData["iElementDragDropSortValueId"] === objValue["iElementDragDropSortValueId"])[0];
                    strClassName = objActualValue["iDisplayOrder"] === objValue["iDisplayOrder"] ? " correct-dragdrop-sort-solution" : " wrong-dragdrop-sort-solution";
                }
                return (
                    <td key={UniqueId.GetUniqueId()}>
                        <div className="drop-holder"
                            DragDrop_DragAreaType="OptionArea"
                            DragDrop_DropAreaType="AnswerArea"
                            type="AnswerArea"
                            idisplayorder={intIndex + 1}
                        >
                            <div
                                id={objValue["iElementDragDropSortValueId"]}
                                className={"draggable-block" + strClassName}
                                DragDrop_DragElementType="AnswerOption"
                                type="AnswerOption">
                                <TextElement {...objTextElementProps} />
                            </div>
                        </div>
                    </td>
                );
            }
            else {
                return (
                    <td key={UniqueId.GetUniqueId()}>
                        <div className="drop-holder"
                            DragDrop_DragAreaType="OptionArea"
                            DragDrop_DropAreaType="AnswerArea"
                            type="AnswerArea"
                            idisplayorder={intIndex + 1}
                        >
                            <div className="question-mark">
                                ?
                            </div>
                        </div>
                    </td>
                );
            }
        }
        else {
            return (
                <td key={objTempValue["iElementDragDropSortValueId"]}
                    onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event, { "Value": objTempValue, "Type": "" }); } : Events.OpenContextMenu}
                >
                    <div className="drop-holder"
                        DragDrop_DragAreaType="OptionArea"
                        DragDrop_DropAreaType="AnswerArea"
                        type="AnswerArea"
                        idisplayorder={intIndex + 1}
                    >
                        <div className="question-mark">
                            ?
                        </div>
                    </div>
                </td>
            );
        }
    };

    const GetAnswer = (objValue, intIndex) => {
        if (AppType === "TestApplication") {
            objValue = Context.state.ElementJson["vElementJson"]["Values"].find(objTempValue => objTempValue["iTempDisplayOrder"] === (intIndex + 1));
            if (objValue["iDisplayOrder"] !== -1) {
                return (
                    <td key={UniqueId.GetUniqueId()}>
                        <div
                            className="drop-holder"
                            DragDrop_DragAreaType="OptionArea"
                            type="OptionArea"
                        />
                    </td>
                );
            }
            else {
                let objTextElementProps = Callbacks.GetTextElementProps(objValue["iElementTextId"]);
                return (
                    <td key={UniqueId.GetUniqueId()}>
                        <div className="drop-holder"
                            DragDrop_DragAreaType="OptionArea"
                            type="OptionArea"
                        >
                            <div
                                id={objValue["iElementDragDropSortValueId"]}
                                className={"draggable-block"}
                                DragDrop_DragElementType="AnswerOption"
                                type="AnswerOption">
                                <TextElement {...objTextElementProps} />
                            </div>
                        </div>
                    </td>
                );
            }
        }
        else {
            let objTextElementProps = Callbacks.GetTextElementProps(objValue["iElementTextId"]);
            return (
                <td key={objValue["iElementDragDropSortValueId"]}
                    onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event, { "Value": objValue, "Type": "" }); } : Events.OpenContextMenu}
                >
                    <div className="drop-holder"
                        DragDrop_DragAreaType="OptionArea"
                        DragDrop_DropAreaType="AnswerArea"
                        type="OptionArea"
                    >
                        <div
                            id={objValue["iElementDragDropSortValueId"]}
                            className={"draggable-block"}
                            DragDrop_DragElementType="AnswerOption"
                            type="AnswerOption">
                            <TextElement {...objTextElementProps} />
                        </div>
                    </div>
                </td>
            );
        }
    };

    const GetLoadSolution = (objValue, intIndex) => {
        let strSolutionClassName = Context.state.ElementJsonWithAnswer["vElementJson"]["cIsHorizontal"] === "Y" ? " drag-drop-sort-solution-order" : "";
        objValue = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].find(objTempValue => objTempValue["iDisplayOrder"] === intIndex + 1);
        let objTextElementProps = Callbacks.GetTextElementProps(objValue["iElementTextId"]);
        return (
            <td>
                <div
                    id={"DragdropSortSolutionArea_" + objValue["iElementDragDropSortValueId"]}
                    className={"drop-holder" + strSolutionClassName}>
                    <div
                        id={objValue["iElementDragDropSortValueId"]}
                        className={"draggable-block correct-dragdrop-sort-solution"}
                    >
                        <TextElement {...objTextElementProps} />
                    </div>
                </div>
            </td>
        );
    };

    const Vertical = () => {
        return (
            <tbody>
                {
                    Context.state.ElementJson["vElementJson"]["Values"].map((objValue, intIndex) => {
                        return (
                            <tr
                                key={AppType === "Editor" ? objValue["iElementDragDropSortValueId"] : UniqueId.GetUniqueId()}
                            >
                                {
                                    GetQuestion(objValue, intIndex)
                                }
                                {
                                    Context.state.ViewComparison || Context.state.ViewSolution ? GetLoadSolution(objValue, intIndex) : <td style={{ width: '30px' }}></td>
                                }
                                {
                                    GetAnswer(objValue, intIndex)
                                }
                            </tr>
                        );
                    })
                }
            </tbody>
        );
    };

    const Horizontal = () => {
        return (
            <tbody>
                {
                    <tr>
                        {
                            Context.state.ElementJson["vElementJson"]["Values"].map((objValue, intIndex) => {
                                return GetAnswer(objValue, intIndex)
                            })
                        }
                    </tr>
                }
                <tr>
                    {
                        Context.state.ElementJson["vElementJson"]["Values"].map((objValue, intIndex) => {
                            return GetQuestion(objValue, intIndex)
                        })
                    }
                </tr>
                {
                    Context.state.ViewComparison || Context.state.ViewSolution ?
                        <tr>
                            {
                                Context.state.ElementJson["vElementJson"]["Values"].map((objValue, intIndex) => {
                                    return GetLoadSolution(objValue, intIndex)
                                })
                            }
                        </tr> : ""
                }
            </tbody>
        );
    };

    /**
     * @name GetContent
     * @summary Renders the component.
     * @returns {JSX} JSX
     */
    const GetContent = () => {
        let objTextElementProps = {};
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objHeaderValue = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeader => objTempHeader["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = Callbacks.GetTextElementProps(objHeaderValue["iElementTextId"]);
        }
        let objDragZoneProps = {
            "Meta": {
                "GroupId": Context.state.ElementJson["iElementId"],
                "Disable": AppType.toLowerCase() === "editor" ? true : false,
                "DraggableElementType": "AnswerOption",
                "DragAreaType": "OptionArea",
                "DropAreaType": "AnswerArea",
                "RemoveBorderOnHover": true
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
        return (
            <div id={Context.state.ElementJson["iElementId"]} ielementtypeid={Context.state.ElementJson["iElementTypeId"]} ielementid={Context.state.ElementJson["iElementId"]}>
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <TextElement {...objTextElementProps} /> : ""
                }
                <DragZone {...objDragZoneProps}>
                    <table class="drag-drop-sort">
                        {
                            Context.state.ElementJson["vElementJson"]["cIsHorizontal"] === "N" ? Vertical() : Horizontal()
                        }
                    </table>
                </DragZone>
            </div >
        );
    };

    return GetContent();
};

export default CMSDragdropSort_Common;
