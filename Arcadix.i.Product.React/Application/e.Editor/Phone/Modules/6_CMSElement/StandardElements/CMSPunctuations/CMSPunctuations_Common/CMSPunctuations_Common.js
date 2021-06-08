//React Imports
import React from 'react';

/**
 * @name CMSPunctuations_Common
 * @param {object} props props from parent
 * @summary Contains the JSX for Punctuations element.
 * @returns {any} CMSPunctuations_Common
 */
const CMSPunctuations_Common = (props) => {

    let { Context, Events, Callbacks, TextResource, AppType, TextElement } = props;

    /**
     * @name GetContent
     * @summary This method renders the main body of the text mark
     * @returns {any} JSX
     */
    const GetContent = () => {
        var border = "none";
        if (Context.state.ViewSolution) {
            border = "2px solid red";
        }
        if (Context.state.ViewComparison) {
            border = Context.state.ElementStatus === 1 ? "2px solid green" : "2px solid red";
        }
        let objTextElementProps = {};
        if (Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y") {
            let objElementHeader = Context.state.ElementJson["vElementJson"]["HeaderValues"].filter(objTempHeaderValue => objTempHeaderValue["vHeaderType"] === "ElementHeader")[0];
            objTextElementProps = Callbacks.GetTextElementProps(objElementHeader["iElementTextId"]);
        }
        return (
            <React.Fragment>
                <div id={`cms-punctuations_wrapper_${Context.state.ElementJson["iElementId"]}`}
                    ielementid={Context.state.ElementJson["iElementId"]}
                    ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                    style={{ "border": border }}
                    onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event); } : Events.OpenContextMenu}>
                    {
                        Context.state.ElementJson["vElementJson"]["cShowHeaderText"] === "Y" ?
                            <TextElement {...objTextElementProps} /> : ""
                    }
                    {
                        (Context.state.ViewSolution || (Context.state.ViewComparison && Context.state.ElementStatus !== 1)) &&
                        <img src={JConfiguration.IntranetSkinPath + "/Images/editor/FlashWrong.gif"} />
                    }
                    {
                        Context.state.ViewComparison && Context.state.ElementStatus === 1 &&
                        <img src={JConfiguration.IntranetSkinPath + "/Images/editor/FlashRight.gif"} />
                    }
                    <div className="punctuation-outer-wrapper">
                        <div>
                            {
                                AppType.toLowerCase() === "editor" &&
                                <textarea ref={Context.TextAreaRef}
                                    className="punctuations-textarea"
                                    rows="4"
                                    value={Context.state.ElementJson.vElementJson.vSentence}
                                    onChange={(event) => { Events.HandleSolutionOnChange(event); }}>
                                </textarea>
                            }
                            {
                                AppType.toLowerCase() === "testapplication" &&
                                <textarea ref={Context.TextAreaRef}
                                    className="punctuations-textarea"
                                    rows="4"
                                    value={Context.state.ElementJson.vElementJson.vSentence}
                                    onKeyDown={(event) => { Events.HandleKeyPress(event); }}>
                                </textarea>
                            }
                            {/* 3
                            <div className="punctuations-textarea"
                                ref={Context.ContentEditableRef}
                                contentEditable={AppType.toLowerCase() === "editor" ? true : false}
                                onInput={(event) => { Events.HandleSolutionOnChange(event); }}
                                dangerouslySetInnerHTML={{ __html: Context.state.ElementJson.vElementJson.vSentence }}>
                            </div>
                        */}
                        </div>
                        <div className="punctuation-text-buttons-outer-wrapper">
                            {
                                Callbacks.GetPunctuationTextButtons()
                            }
                        </div>
                        <div className="punctuation-buttons-outer-wrapper">
                            {
                                Context.PunctuationMarks.map((p, i) => {
                                    return (
                                        <div ref={Context.PunctuationSymbolRef} className="punctuations-button-wrapper">
                                            <div type="punctuations-symbols"
                                                name={p.type}
                                                className="punctuations-button"
                                                cpunctuationchar={p.symbol}
                                                onClick={() => { Callbacks.HandlePunctuationsClick(p.symbol) }}>
                                                {/* 4 <span dangerouslySetInnerHTML={{ __html: p.hexcode }}></span>*/}
                                                <span> {p.symbol} </span>
                                            </div>
                                            <span> {TextResource[p.type]}</span>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="punctuations-alternative-solutions-wrapper">
                            {
                                AppType.toLowerCase() === "editor" && Context.state.ElementJson.vElementJson.Values.map(a => {
                                    return (
                                        <div key={`alternative-solution-text-${a.iElementPunctuationAlternateSolutionId}`} className="alternative-solution-div">
                                            <textarea id={a.iElementPunctuationAlternateSolutionId}
                                                className="punctuations-textarea"
                                                rows="4"
                                                value={a.vElementPunctuationsAlternateSolution}
                                                onChange={(event) => { Events.HandleAlternativeSolutionOnChange(event); }}>
                                            </textarea>
                                            <img className="alternative-solution-cancel" src={JConfiguration.IntranetSkinPath + "/Images/editor/Delete.gif"} onClick={() => { Callbacks.RemoveAlternativeSolution(a.iElementPunctuationAlternateSolutionId) }} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="punctuations-action-button-wrapper">
                            {
                                <div className={AppType.toLowerCase() === "editor" ? "punctuations-button" : "punctuations-button border-none background-color-none"}
                                    onClick={() => { Callbacks.AddAlternativeSolution ? Callbacks.AddAlternativeSolution() : (e) => { e.preventDefault(); } }}>
                                    {AppType.toLowerCase() === "editor" ? TextResource["AlternativeSolution"] : ""}
                                </div>
                            }
                            <div className="punctuation-action-buttons-wrapper">
                                <div className="punctuations-button punctuation-action-buttons" onClick={Callbacks.HandlePunctuationBackButton ? () => { Callbacks.HandlePunctuationBackButton(); } : (e) => { e.preventDefault(); }}>
                                    {TextResource["Back"]}
                                </div>
                                <div className="punctuations-button punctuation-action-buttons" onClick={Callbacks.HandlePunctuationClear ? () => { Callbacks.HandlePunctuationClear(); } : (e) => { e.preventDefault(); }}>
                                    {TextResource["Clear"]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    (Context.state.ViewSolution || (Context.state.ViewComparison && Context.state.ElementStatus !== 1)) &&
                    <div style={{ "border": "2px solid green", "marginTop": "6px" }}>
                        <img src={JConfiguration.IntranetSkinPath + "/Images/editor/FlashRight.gif"} />
                        <span dangerouslySetInnerHTML={{ __html: Context.state.ElementJson.vElementJson.vText }}></span>
                    </div>
                }
            </React.Fragment>
        );
    };

    return GetContent();
};

export default CMSPunctuations_Common;
