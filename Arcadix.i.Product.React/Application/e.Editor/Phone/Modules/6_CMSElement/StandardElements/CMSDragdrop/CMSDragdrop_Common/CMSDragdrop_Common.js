//React imports
import React from 'react';

//Common Drag - Drop controls.
import DragZone from '@root/Framework/Controls/Dragdrop/DragZone/DragZone';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name CMSDragdrop_Common
 * @param {object} props props from parent
 * @summary Common component for Dragdrop
 * @returns {any} CMSDragdrop_Common
 */
const CMSDragdrop_Common = (props) => {

    let { Context, Events, Callbacks, TextElement, AppType } = props;
    let PointOverrideTooltip;

    /**
     * @name RenderEditorVersion
     * @summary Renders editor version
     * @returns {JSX} JSX
     */
    const RenderEditorVersion = () => {
        let strQuestionCoulumnId = "Dragdrop_QuestionColumn" + Context.state.ElementJson["iElementId"];
        let strAnswerCoulumnId = "Dragdrop_AnswerColumn" + Context.state.ElementJson["iElementId"];
        let strOptionCoulumnId = "Dragdrop_OptionColumn" + Context.state.ElementJson["iElementId"];
        PointOverrideTooltip = Context.props.ComponentController.GetComponent("PointOverrideTooltip");
        let objTextElementProps = {};
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = Callbacks.GetTextElementProps(objElementHeader["iElementTextId"]);
        }
        return (
            <div className="cms-dragdrop" ielementtypeid={Context.state.ElementJson["iElementTypeId"]} ielementid={Context.state.ElementJson["iElementId"]}>
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <TextElement {...objTextElementProps} /> : ""
                }
                <table cellSpacing="5" className="dragdrop-table" id={Context.state.ElementJson["iElementId"]}>
                    <thead>
                        <tr onContextMenu={(event) => { event.stopPropagation(); event.preventDefault(); }}>
                            <th
                                id={strQuestionCoulumnId}
                                ref={Context.QuestionHeaderRef}
                                align="right"
                                className="cmsdragdrop-editor-table-header"
                                style={{ "width": Context.state.ElementJson["vElementJson"]["iElementQuestionWidth"] ? Context.state.ElementJson["vElementJson"]["iElementQuestionWidth"] : "100px" }}>
                                <img
                                    src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/DragDropResizer.png"}
                                    draggable
                                    onDragStart={(event) => { Events.ActivateResize(event); }}
                                    onDragEnd={(event) => { Events.DeActivateResize(event); }}
                                    onDrag={(event) => { Events.Resize(event, strQuestionCoulumnId); }}
                                    alt="" />
                            </th>
                            <th
                                id={strAnswerCoulumnId}
                                align="right"
                                style={{ "width": Context.state.ElementJson["vElementJson"]["iElementAnswerWidth"] ? Context.state.ElementJson["vElementJson"]["iElementAnswerWidth"] : "100px" }}
                                className="cmsdragdrop-editor-table-header" />
                            <th style={{ "width": "auto" }} />
                            <th
                                id={strOptionCoulumnId}
                                ref={Context.OptionHeaderRef}
                                align="right"
                                className="cmsdragdrop-editor-table-header"
                                style={{ "width": Context.state.ElementJson["vElementJson"]["iElementAnswerWidth"] ? Context.state.ElementJson["vElementJson"]["iElementAnswerWidth"] : "100px" }}>
                                <img
                                    src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/DragDropResizer.png"}
                                    draggable
                                    onDragStart={(event) => { Events.ActivateResize(event); }}
                                    onDragEnd={(event) => { Events.DeActivateResize(event); }}
                                    onDrag={(event) => { Events.Resize(event, strOptionCoulumnId); }}
                                    alt="" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Context.state.ElementJson["vElementJson"]["Values"].map(objValue => {
                                let objQuestion = Context.state.ElementJson["vElementJson"]["Questions"].find(objTempData => objTempData["iElementDragDropQuestionId"] === objValue["iElementDragDropQuestionId"]);
                                let objTextElementProps_Question = Callbacks.GetTextElementProps(objQuestion["iElementTextId"]);
                                let objAnswer = Context.state.ElementJson["vElementJson"]["Answers"].find(objTempData => objTempData["iElementDragDropAnswerId"] === objValue["iElementDragDropAnswerId"]);
                                let objTextElementProps_Answer = Callbacks.GetTextElementProps(objAnswer["iElementTextId"]);
                                return (
                                    <tr
                                        key={objValue["iElementDragDropValueId"]}
                                        className={"dragdrop-row"}
                                        valign="top"
                                        onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event, { "Value": objValue, "Type": "Value" }); } : Events.OpenContextMenu}>
                                        <td className="dragdrop-question-holder">
                                            {
                                                objQuestion["cIsHidden"] === "N" ?
                                                    <React.Fragment>
                                                        <PointOverrideTooltip iDisplayOrder={objValue.iDisplayOrder} showTooltip={Context.state.showTooltip} />
                                                        <div className="dragdrop-question">
                                                            <TextElement {...objTextElementProps_Question} />
                                                        </div>
                                                    </React.Fragment> : ""
                                            }
                                        </td>
                                        <td className="dragdrop-answer-area-holder">
                                            {
                                                objQuestion["cIsHidden"] === "N" ? <div className={"dragdrop-answer-area"} /> : ""
                                            }
                                        </td>
                                        <td className="dragdrop-solution-area-holder" />
                                        <td className="dragdrop-option-area-holder">
                                            {
                                                objAnswer["cIsHidden"] === "N" ?
                                                    <div className="dragdrop-option-area">
                                                        {
                                                            <div className="dragdrop-option">
                                                                <TextElement {...objTextElementProps_Answer} />
                                                            </div>
                                                        }
                                                    </div> : ""
                                            }
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    };

    /**
     * @name RenderTestApplicationVersion
     * @summary Renders test application version
     * @returns {JSX} JSX
     */
    const RenderTestApplicationVersion = () => {
        let objTextElementProps = {};
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = Callbacks.GetTextElementProps(objElementHeader["iElementTextId"]);
        }
        let objDragZoneProps = {
            "Meta": {
                "GroupId": Context.state.ElementJson["iElementId"],
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
        return (
            <div ielementtypeid={Context.state.ElementJson["iElementTypeId"]} ielementid={Context.state.ElementJson["iElementId"]}>
                {
                    Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                        <TextElement {...objTextElementProps} /> : ""
                }
                <DragZone {...objDragZoneProps}>
                    <div className="cmsdragdrop-testapplication-container">
                        <div className="cmsdragdrop-testapplication-left-column">
                            {
                                Context.state.ElementJson["vElementJson"]["Questions"].map(objQuestion => {
                                    let objAnswerTextElementProps, objSolutionTextElementProps, strComparisonClassName = "", strSolutionClassName = "";
                                    let objUserAnswer = Context.state.ElementJson["vElementJson"]["Values"].find(objTempData => objTempData["iElementDragDropQuestionId"] === objQuestion["iElementDragDropQuestionId"]);
                                    let objQuestionTextElementProps = Callbacks.GetTextElementProps(objQuestion["iElementTextId"]);
                                    if (objUserAnswer) {
                                        let objAnswer = Context.state.ElementJson["vElementJson"]["Answers"].find(objTempData => objTempData["iElementDragDropAnswerId"] === objUserAnswer["iElementDragDropAnswerId"])
                                        objAnswerTextElementProps = Callbacks.GetTextElementProps(objAnswer["iElementTextId"]);
                                        if (Context.state.ViewSolution || Context.state.ViewComparison) {
                                            let objValue = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].find(objTempData => objTempData["iElementDragDropQuestionId"] === objQuestion["iElementDragDropQuestionId"]);
                                            if (Context.state.arrDragdropAnswered.filter(x => x["iElementDragDropQuestionId"] === objValue["iElementDragDropQuestionId"] && x["iElementDragDropAnswerId"] === objAnswer["iElementDragDropAnswerId"]).length > 0) {
                                                if (objValue["iElementDragDropAnswerId"] === objUserAnswer["iElementDragDropAnswerId"]) {
                                                    strComparisonClassName = " correct-dragdrop-solution";
                                                }
                                                else {
                                                    strComparisonClassName = " wrong-dragdrop-solution";
                                                }
                                            }
                                        }
                                    }
                                    if (Context.state.ViewSolution || Context.state.ViewComparison) {
                                        let objValue = Context.state.ElementJsonWithAnswer["vElementJson"]["Values"].find(objTempData => objTempData["iElementDragDropQuestionId"] === objQuestion["iElementDragDropQuestionId"]);
                                        let objActualAnswer = Context.state.ElementJsonWithAnswer["vElementJson"]["Answers"].find(objTempData => objTempData["iElementDragDropAnswerId"] === objValue["iElementDragDropAnswerId"])
                                        if (objActualAnswer["cIsHidden"] === "N") {
                                            objSolutionTextElementProps = Callbacks.GetTextElementProps(objActualAnswer["iElementTextId"]);
                                            strSolutionClassName = " correct-dragdrop-solution";
                                        }
                                    }
                                    let objQuestionStyle = {
                                        "width": "100px"
                                    };
                                    let objAnswerStyle = {
                                        "width": "100%"
                                    };
                                    let objSolutionStyle = {
                                        "width": "100%"
                                    };
                                    if (Context.state.ElementJson["vElementJson"]["iElementQuestionWidth"] && Context.state.ElementJson["vElementJson"]["iElementQuestionWidth"] !== null) {
                                        objQuestionStyle = {
                                            "width": Context.state.ElementJson["vElementJson"]["iElementQuestionWidth"]
                                        };
                                    }
                                    if (Context.state.ElementJson["vElementJson"]["iElementAnswerWidth"] && Context.state.ElementJson["vElementJson"]["iElementAnswerWidth"] !== null) {
                                        objAnswerStyle = {
                                            "width": Context.state.ElementJson["vElementJson"]["iElementAnswerWidth"]
                                        };
                                        objSolutionStyle = {
                                            "width": Context.state.ElementJson["vElementJson"]["iElementAnswerWidth"]
                                        };
                                    }
                                    return (
                                        objQuestion["cIsHidden"] === "N" ?
                                            <div
                                                key={UniqueId.GetUniqueId()}
                                                className="cmsdragdrop-testapplication-question-row"
                                            >
                                                <div className="cmsdragdrop-testapplication-question-holder" style={objQuestionStyle}>
                                                    <div className="cmsdragdrop-testapplication-content">
                                                        <TextElement {...objQuestionTextElementProps} />
                                                    </div>
                                                </div>
                                                <div className={"cmsdragdrop-testapplication-answer-holder"} style={objAnswerStyle}>
                                                    <div
                                                        id={objQuestion["iElementDragDropQuestionId"]}
                                                        className={"cmsdragdrop-testapplication-answer" + strComparisonClassName}
                                                        DragDrop_DragAreaType="OptionArea"
                                                        DragDrop_DropAreaType="AnswerArea"
                                                        type="AnswerArea"
                                                    >
                                                        {
                                                            objUserAnswer ?
                                                                <div
                                                                    id={objUserAnswer["iElementDragDropAnswerId"]}
                                                                    className="cmsdragdrop-testapplication-content"
                                                                    DragDrop_DragElementType="AnswerOption">
                                                                    <TextElement {...objAnswerTextElementProps} />
                                                                </div> : ""
                                                        }
                                                    </div>
                                                </div>

                                                {
                                                    objSolutionTextElementProps && (Context.state.ViewSolution || Context.state.ViewComparison) ?
                                                        <div className={"cmsdragdrop-testapplication-solution-holder" + strSolutionClassName} style={objSolutionStyle}>
                                                            <div className="cmsdragdrop-testapplication-content">
                                                                <TextElement {...objSolutionTextElementProps} />
                                                            </div>
                                                        </div> : ""
                                                }

                                            </div> : <div/>
                                    );
                                })
                            }
                        </div>
                        <div className="cmsdragdrop-testapplication-right-column">
                            {
                                Context.state.ElementJson["vElementJson"]["Answers"].map(objAnswer => {
                                    let objTextElementProps = Callbacks.GetTextElementProps(objAnswer["iElementTextId"]);
                                    let objValue = Context.state.ElementJson["vElementJson"]["Values"].find(objTempData => objTempData["iElementDragDropAnswerId"] === objAnswer["iElementDragDropAnswerId"])
                                    let objStyle = {
                                        "width": "100%"
                                    };
                                    if (Context.state.ElementJson["vElementJson"]["iElementAnswerWidth"] && Context.state.ElementJson["vElementJson"]["iElementAnswerWidth"] !== null) {
                                        objStyle = {
                                            "width": Context.state.ElementJson["vElementJson"]["iElementAnswerWidth"]
                                        };
                                    }
                                    return (
                                        objAnswer["cIsHidden"] === "N" ?
                                            <div
                                                className="cmsdragdrop-testapplication-option-holder"
                                                style={objStyle}
                                            >
                                                {
                                                    !objValue ?
                                                        <div
                                                            className="cmsdragdrop-testapplication-option"
                                                            DragDrop_DragAreaType="OptionArea"
                                                            DragDrop_DropAreaType="AnswerArea"
                                                            type="OptionArea"
                                                        >
                                                            {
                                                                <div
                                                                    id={objAnswer["iElementDragDropAnswerId"]}
                                                                    className="cmsdragdrop-testapplication-content"
                                                                    DragDrop_DragElementType="AnswerOption">
                                                                    <TextElement {...objTextElementProps} />
                                                                </div>
                                                            }
                                                        </div> :
                                                        <div className="cmsdragdrop-testapplication-option" type="OptionArea"></div>
                                                }
                                            </div> : <div className="cmsdragdrop-testapplication-option-holder" />
                                    );
                                })
                            }
                        </div>
                    </div>
                </DragZone>
            </div>
        );
    }

    /**
     * @name RenderBody
     * @summary Renders the body of the component.
     * @returns {any} JSX
     */
    const GetContent = () => {
        if (AppType === "Editor") {
            return RenderEditorVersion();
        }
        else {
            return RenderTestApplicationVersion();
        }
    };

    return GetContent();
};

export default CMSDragdrop_Common;
