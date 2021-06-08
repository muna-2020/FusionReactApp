// React related imports.
import React from 'react';

/**
 * @name CMSText_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSText
 * @returns {any} returns the cms Text's JSX
 */
const CMSText_Common = (props) => {

    let { Context, Events, Callbacks, TextElement, AppType } = props;

    const OnDoubleClick = () => {
        if (Context.props.ShowEditOptions_FromParent) {
            Context.props.ShowEditOptions_FromParent();
        }
    };

    const OnClick = () => {
        if (Context.props.RemoveEditOptions_FromParent) {
            Context.props.RemoveEditOptions_FromParent();
        }
    }

    /**
     * @name GetContent
     * @summary Render the text body
     * @returns {any} Component.
     */
    const GetContent = () => {
        let strClassNames = "cms-text tooltip-overlay cms-wiki-description";
        let blnShowBoarder = Context.state.ElementJson.vElementJson.cIsWithBorder &&
            Context.state.ElementJson.vElementJson.cIsWithBorder === "Y";
        if (Context.props.ClassNames) {
            strClassNames += " " + Context.props.ClassNames;
        } else if (Context.state.ElementJson.vElementJson.vClassNames) {
            strClassNames += " " + Context.state.ElementJson.vElementJson.vClassNames;
        }
        let strAlignItem = "flex-start";
        if (Context.state.ElementJson.vContainerElementProperties &&
            Context.state.ElementJson.vContainerElementProperties.vElementVerticalAlignment &&
            Context.state.ElementJson.vContainerElementProperties.vElementVerticalAlignment === "top") {
            strAlignItem = "flex-start";
        } else if (Context.state.ElementJson.vContainerElementProperties &&
            Context.state.ElementJson.vContainerElementProperties.vElementVerticalAlignment &&
            Context.state.ElementJson.vContainerElementProperties.vElementVerticalAlignment === "bottom") {
            strAlignItem = "flex-end";
        } else {
            strAlignItem = "center";
        }
        let objStyle = {
            "height": "100%",
            "display": "flex",
            "alignItems": strAlignItem,
            "flexWrap": "wrap"
        };
        return (
            <div className="cms-text"
                ielementid={Context.state.ElementJson["iElementId"]}
                style={objStyle} // flex-start, flex-end, center
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                onDoubleClick={OnDoubleClick}
                onClick={OnClick}
            >
                <div className="cms-text-border" style={{ border: blnShowBoarder ? "1px solid" : "", padding: blnShowBoarder ? "3px" : "" }}>
                    {
                        !Context.state.ElementJson.vElementJson.isQuestionOrAnswerType &&
                            Context.state.HideText &&
                            AppType === "TestApplication" ?
                            <div style={{ padding: "2px", background: "gray", color: "#ffff", textAlign: "center" }}>
                                Now solve the task
                                <div style={{ display: "none" }}>
                                    <TextElement
                                        {...(Context.props.IsForServerRenderHtml ? { ...Context.props, IsForServerRenderAPI: Context.props.JConfiguration["SSR_Editor"]["PageContent"] == "Y" ? true : false } : {})}
                                        TextJson={Context.state.ElementJson} // mandatory prop.
                                        isSubElementsNotAllowed={Context.state.ElementJson.vElementJson.isSubElementsNotAllowed}
                                        PageId={Context.props.PageId}
                                        TextRef={Context.state.ElementJson.TextRef}
                                        Type={Context.props.Type}  // optional.
                                        classNames={strClassNames} // optional.
                                        JConfiguration={Context.props.JConfiguration}
                                        ParentRef={Context.props.ElementRef} // optional
                                        PreservedState={AppType === "Editor" ? Context.Element_UndoRedoDataRef.current[Context.state.ElementJson["iElementId"]] : undefined} // optional
                                        ComponentController={Context.props.ComponentController} // optional
                                        UserAnswerJson={Context.props.UserAnswerJson}
                                        ElementJsonWithAnswer={Context.props.ElementJsonWithAnswer}
                                        OnBlur={Context.props.OnBlur}
                                        cIsNotContentEditable={Context.props.cIsNotContentEditable}
                                        TextElementEvaluationResult={Context.props.TextElementEvaluationResult} />
                                </div>
                            </div> :
                            <TextElement
                                {...(Context.props.IsForServerRenderHtml ? { ...Context.props, IsForServerRenderAPI: Context.props.JConfiguration["SSR_Editor"]["PageContent"] == "Y" ? true : false } : {})}
                                TextJson={Context.state.ElementJson} // mandatory prop.
                                isSubElementsNotAllowed={Context.state.ElementJson.vElementJson.isSubElementsNotAllowed}
                                PageId={Context.props.PageId}
                                TextRef={Context.state.ElementJson.TextRef}
                                Type={Context.props.Type}  // optional.
                                classNames={strClassNames} // optional.
                                JConfiguration={Context.props.JConfiguration}
                                ParentRef={Context.props.ElementRef} // optional
                                PreservedState={AppType === "Editor" ? Context.Element_UndoRedoDataRef.current[Context.state.ElementJson["iElementId"]] : undefined} // optional
                                ComponentController={Context.props.ComponentController} // optional
                                UserAnswerJson={Context.props.UserAnswerJson}
                                ElementJsonWithAnswer={Context.props.ElementJsonWithAnswer}
                                OnBlur={Context.props.OnBlur}
                                cIsNotContentEditable={Context.props.cIsNotContentEditable}
                                TextElementEvaluationResult={Context.props.TextElementEvaluationResult} />
                    }
                </div>
                {
                    !Context.state.ElementJson.vElementJson.isQuestionOrAnswerType &&
                    Context.state.ElementJson.vElementJson.cIsToggleText &&
                    Context.state.ElementJson.vElementJson.cIsToggleText === "Y" &&
                    <div className={"text-toggle-wrapper"} onClick={Events.OnStartClick}>
                        <button>START</button>
                    </div>
                }
            </div >
        );
    };

    return GetContent();
};

export default CMSText_Common;
