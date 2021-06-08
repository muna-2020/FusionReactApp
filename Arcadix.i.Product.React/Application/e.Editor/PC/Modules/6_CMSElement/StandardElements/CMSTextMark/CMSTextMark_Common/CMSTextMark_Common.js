//React Imports
import React from 'react';

/**
 * @name CMSTextMark_Common
 * @param {object} props props from parent
 * @summary Contains the JSX for TextMark element.
 * @returns {any} CMSTextMark_Common
 */
const CMSTextMark_Common = (props) => {

    let { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetContent
     * @summary This method renders the main body of the text mark
     * @returns {any} JSX
     */
    const GetContent = () => {
        let strClassName = "textmark";
        if (Context.state.ElementJson["vElementJson"]["cIsShowFrame"] === "Y") {
            strClassName += " textmark-show-frame";
        }
        return (
            <div
                className={strClassName}
                ref={Context.TextMarkRef}
                ielementid={Context.state.ElementJson["iElementId"]}
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event); } : Events.OpenContextMenu}>
                <TextElement
                    TextJson={Context.state.ElementJson} // mandatory prop.
                    PageId={Context.props.PageId}
                    Type="TextMark"
                    TextRef={Context.state.ElementJson.TextRef}
                    classNames="textmark"
                    JConfiguration={Context.props.JConfiguration}
                    ParentRef={Context.props.ElementRef} // optional
                    PreservedState={AppType === "Editor" ? Context.Element_UndoRedoDataRef.current[Context.state.ElementJson["iElementId"]] : undefined} // optional
                    ComponentController={Context.props.ComponentController} // optional
                    UserAnswerJson={Context.props.UserAnswerJson}
                    ElementJsonWithAnswer={Context.props.ElementJsonWithAnswer}
                />
            </div>
        );
    };

    return GetContent();
};

export default CMSTextMark_Common;
