//React Imports
import React, { useEffect } from 'react';

/**
 * @name CMSTextHighlight_Common
 * @param {object} props props from parent
 * @summary Contains the JSX for TextHighlight element.
 * @returns {any} CMSTextHighlight_Common
 */
const CMSTextHighlight_Common = (props) => {

    let { Context, Events, Callbacks, TextElement, AppType } = props;

    /**
     * @name GetContent
     * @summary This method renders the main body of the text mark
     * @returns {any} JSX
     */
    const GetContent = () => {
        return (
            <div ref={Context.ElementCurrentRef} id={`cms-text-highlight_wrapper_${Context.state.ElementJson["iElementId"]}`} ielementid={Context.state.ElementJson["iElementId"]} ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                onContextMenu={Events.OpenContextMenu ? (event) => { Events.OpenContextMenu(event); } : Events.OpenContextMenu}>
                <div id={`color_platte_${Context.state.ElementJson.iElementId}`} className="text-highlight-color-palette-wrapper">
                    {
                        Context.state.Colors.map((color, i) => {
                            return (
                                <div key={`outer-circle-${Context.state.ElementJson["iElementId"]}-${i}`}
                                    className="text-highlight-outer-circle" onClick={() => { Callbacks.ChangeTextSelectionColor(color); }}>
                                    <div className="text-highlight-inner-circle" style={{ "backgroundColor": color, "transition": "0.3s", "border": "3px solid #fff", "boxShadow": "0 0 5px #959595" }}>
                                        {
                                            Context.state.strSelectedColor === color && <span style={{ "color": color === "#fff" ? "#000" : "#fff" }}> &#x2714; </span>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div id={`cms-text-${AppType}-${Context.state.ElementJson["iElementId"]}`} className="text-editor-highlight-wrapper">
                    <TextElement
                        TextEditorId={Context.state.ElementJson.iElementId}
                        TextJson={Context.state.ElementJson} // mandatory prop.
                        PageId={Context.props.PageId}
                        Type="TextHighlight"
                        TextRef={Context.state.ElementJson.TextRef}
                        classNames="texthighlight"
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

export default CMSTextHighlight_Common;
