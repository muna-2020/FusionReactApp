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
                    <div className="lineAssign-Question-Wrapper" id={`LineAssign_Question_Wrapper_${Context.state.ElementJson.iElementId}`} >
                        {
                            Context.state.ElementJson.vElementJson.Questions.map((question, i) => {
                                var objQuestionTextElementProps = Callbacks.GetTextElementProps(question["iElementTextId"]);
                                return (
                                    <div key={`lineAssignleftdivs${question["iElementTextId"]}_${Context.state.ElementJson.iElementId}`}
                                        type="LineAssignQuestion"
                                        className='lineAssign-mainLeftDivs'
                                        ref={Context.QuestionRefs[i]}
                                        id={`LineAssign${Context.state.ElementJson.iElementId}_Question_${i}`}
                                        QuestionNumber={i}
                                        style={{ "minWidth": "100px", "minHeight": "100px", "border": Context.state.arrBlnShowQuestionBorder[i] ? '3px solid #000' : '3px solid #ccc' }}
                                        onClick={(e) => { Callbacks.HandleQuestionClick({ ...question, ["iSelectedQuestionNumber"]: i }) }}
                                        onContextMenu={Events.OpenContextMenu ? (e) => { Events.OpenContextMenu(e, { "Value": { ...question, ["iSelectedRow"]: i }, "Type": "Question" }) } : (e => { e.prevantDefault(); })}>
                                        <div style={{ width: 'auto', height: 'auto' }} >
                                            <TextElement {...objQuestionTextElementProps} />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div >
                        <canvas style={{ "float": "left" }} ref={Context.canvasRef} id={`LineAssignCanvas${Context.state.ElementJson.iElementId}`}></canvas>
                    </div>
                    <div className="lineAssign-Answer-Wrapper" id={`LineAssign_Answer_Wrapper_${Context.state.ElementJson.iElementId}`}>
                        {
                            Context.state.ElementJson.vElementJson.Answers.map((answer, i) => {
                                var objAnswerTextElementProps = Callbacks.GetTextElementProps(answer["iElementTextId"]);
                                var borderStyle = '3px solid #ccc';
                                if (Context.state.ViewComparison) {
                                    if (Context.state.blnShowCorrect[i] !== null) {
                                        borderStyle = Context.state.blnShowCorrect[i] ? '3px solid #90ee90' : '3px solid red';
                                    }
                                }
                                return (
                                    <div ref={Context.AnswerRefs[i]}
                                        key={`lineAssignrightdivs${answer["iElementTextId"]}_${Context.state.ElementJson.iElementId}`}
                                        type="LineAssignAnswer"
                                        className='lineAssign-mainRightDivs'
                                        id={`LineAssign${Context.state.ElementJson.iElementId}_Answer_${i}`}
                                        style={{ "position": "relative", "border": borderStyle, "minWidth": "100px", "minHeight": "100px" }}
                                        AnswerNumber={i}
                                        onClick={(e) => { Callbacks.HandleAnswerClick({ ...answer, ["iSelectedAnswerNumber"]: i }) }}
                                        onContextMenu={Events.OpenContextMenu ? (e) => { Events.OpenContextMenu(e, { "Value": { ...answer, ["iSelectedRow"]: i }, "Type": "Answer" }) } : (e) => { e.preventDefault() }}>
                                        <div style={{ width: 'auto', height: 'auto' }} >
                                            <TextElement {...objAnswerTextElementProps} />
                                        </div>
                                        {
                                            Context.state.ViewComparison &&
                                            <span style={{ "position": "absolute", "left": "100px", "top": "50%", "translate": "transform(0, -50%)" }}>
                                                {Context.state.blnShowCorrect[i] && <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Correct.gif"} />}
                                                {Context.state.blnShowCorrect[i] !== null && !Context.state.blnShowCorrect[i] && <img src={Context.props.JConfiguration.EditorSkinPath + "/Images/Common/Cross.gif"} />}
                                            </span>
                                        }
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
