import React from 'react';

const CMSLineAssign_Common = (props) => {

    const { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetContent
     * @summary Render the Radio body
     * @returns {any} Returns the JSX for the Radio.
     */
    const GetContent = () => {
        let objTextElementProps = {};
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = Callbacks.GetTextElementProps(objElementHeader["iElementTextId"]);
        }
        return (
            <React.Fragment>
                <div>
                    {
                        Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                            <TextElement {...objTextElementProps} /> : ""
                    }
                </div>
                <div ref={Context.outerDivRef} className='lineAssign-mainWrapper' onContextMenu={Events.OpenContextMenu ? (e) => { Events.OpenContextMenu(e, { "Value": null, "Type": null }) } : (e) => { e.preventDefault(); }}>
                    <div ref={Context.QuestionWrapperRef} className="lineAssign-Question-Wrapper" id={`LineAssign_Question_Wrapper_${Context.state.ElementJson.iElementId}`} >
                        {
                            Context.state.ElementJson.vElementJson.Questions.map((question, i) => {
                                var objQuestionTextElementProps = Callbacks.GetTextElementProps(question["iElementTextId"]);
                                var borderStyle = Context.state.arrBlnShowQuestionBorder[i] ? '3px solid #000' : '3px solid #ccc';
                                if (Context.state.ViewComparison) {
                                    if (Context.state.blnShowCorrect[i] !== null) {
                                        borderStyle = Context.state.blnShowCorrect[i] ? '3px solid #90ee90' : '3px solid red';
                                    }
                                }
                                return (
                                    <div key={`lineAssignleftdivs${question["iElementTextId"]}_${Context.state.ElementJson.iElementId}`}
                                        type="LineAssignQuestion"
                                        className='lineAssign-mainLeftDivs'
                                        ref={Context.QuestionRefs[i]}
                                        id={`LineAssign${Context.state.ElementJson.iElementId}_Question_${i}`}
                                        questionnumber={i}
                                        style={{ "minWidth": "100px", "minHeight": "100px", "border": borderStyle, "position": "relative" }}
                                        onClick={(e) => { Callbacks.HandleQuestionClick({ ...question, ["iSelectedQuestionNumber"]: i }, Context.QuestionRefs[i]) }}
                                        onContextMenu={Events.OpenContextMenu ? (e) => { Events.OpenContextMenu(e, { "Value": { ...question, ["iSelectedRow"]: i }, "Type": "Question" }) } : (e => { e.prevantDefault(); })}>
                                        <div style={{ width: 'auto', height: 'auto' }} >
                                            <TextElement {...objQuestionTextElementProps} />
                                        </div>
                                        {
                                            Context.state.ViewComparison &&
                                            <span style={{ "position": "absolute", "left": "-16px" }}>
                                                {Context.state.blnShowCorrect[i] && <img style={{ "height": "10px", "width": "10px" }} src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.png"} />}
                                                {Context.state.blnShowCorrect[i] !== null && !Context.state.blnShowCorrect[i] && <img style={{ "height": "10px", "width": "10px" }} src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Cross.png"} />}
                                            </span>
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div ref={Context.svgRef } style={{ width: "200px", height: "100%" }}>
                        <svg style={{ width: "100%", height: "100%" }}>
                            <defs>
                                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
                                    markerWidth="4" markerHeight="4"
                                    orient="auto">
                                    <path d="M 0 0 L 10 5 L 0 10 z" />
                                </marker>
                            </defs>
                            {
                                Context.state.ElementJson.vElementJson.Values.map((objValue, i) => {
                                    return (
                                        <line x1={0}
                                            y1={objValue["points"]["y1"]}
                                            x2={190}
                                            y2={objValue["points"]["y2"]}
                                            strokeWidth="3"
                                            marker-end={`url(#arrow)`}
                                            stroke={objValue["cIsCorrectValue"] ? objValue["cIsCorrectValue"] === "Y" ? "rgb(144, 238, 144)" : "red" : "#000"} />

                                    )
                                })
                            }
                        </svg>
                    </div>
                    <div ref={Context.AnswerWrapperRef} className="lineAssign-Answer-Wrapper" id={`LineAssign_Answer_Wrapper_${Context.state.ElementJson.iElementId}`}>
                        {
                            Context.state.ElementJson.vElementJson.Answers.map((answer, i) => {
                                var objAnswerTextElementProps = Callbacks.GetTextElementProps(answer["iElementTextId"]);
                                return (
                                    <div ref={Context.AnswerRefs[i]}
                                        key={`lineAssignrightdivs${answer["iElementTextId"]}_${Context.state.ElementJson.iElementId}`}
                                        type="LineAssignAnswer"
                                        className='lineAssign-mainRightDivs'
                                        id={`LineAssign${Context.state.ElementJson.iElementId}_Answer_${i}`}
                                        style={{ "position": "relative", "border": '3px solid #ccc', "minWidth": "100px", "minHeight": "100px" }}
                                        answernumber={i}
                                        onClick={(e) => { Callbacks.HandleAnswerClick({ ...answer, ["iSelectedAnswerNumber"]: i }, Context.AnswerRefs[i]) }}
                                        onContextMenu={Events.OpenContextMenu ? (e) => { Events.OpenContextMenu(e, { "Value": { ...answer, ["iSelectedRow"]: i }, "Type": "Answer" }) } : (e) => { e.preventDefault() }}>
                                        <div style={{ width: 'auto', height: 'auto' }} >
                                            <TextElement {...objAnswerTextElementProps} />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    };

    return GetContent();
};

export default CMSLineAssign_Common;
