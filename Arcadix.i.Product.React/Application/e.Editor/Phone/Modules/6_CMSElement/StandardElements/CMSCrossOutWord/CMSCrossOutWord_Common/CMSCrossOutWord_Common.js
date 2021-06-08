//React Imports
import React, { useEffect } from 'react';

/**
 * @name CMSCrossOutWord_Common
 * @param {object} props props from parent
 * @summary Contains the JSX for CrossOutWord element.
 * @returns {any} CMSCrossOutWord_Common
 */
const CMSCrossOutWord_Common = (props) => {

    let { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetContent
     * @summary This method renders the main body of the text mark
     * @returns {any} JSX
     */
    const GetContent = () => {
        return (
            <div ref={Context.ElementSelectedRef} id={`cms-text-highlight_wrapper_${Context.state.ElementJson["iElementId"]}`} ielementid={Context.state.ElementJson["iElementId"]} ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event); } : Events.OpenContextMenu}>
                <div id={`cms-text-${Context.state.ElementJson["iElementId"]}`} className="text-editor-highlight-wrapper">
                    <TextElement
                        TextEditorId={Context.state.ElementJson.iElementId}
                        TextJson={Context.state.ElementJson} // mandatory prop.
                        PageId={Context.props.PageId}
                        Type="CrossOutWord"
                        TextRef={Context.state.ElementJson.TextRef}
                        classNames="CrossOutWord"
                        JConfiguration={Context.props.JConfiguration}
                        ParentRef={Context.props.ElementRef} // optional
                        PreservedState={AppType === "Editor" ? Context.Element_UndoRedoDataRef.current[Context.state.ElementJson["iElementId"]] : undefined} // optional
                        ComponentController={Context.props.ComponentController} // optional
                        UserAnswerJson={Context.props.UserAnswerJson}
                        ElementJsonWithAnswer={Context.props.ElementJsonWithAnswer}
                    />
                </div>
            </div >
        );
    };

    return GetContent();
};

export default CMSCrossOutWord_Common;
