//React related imports.
import React, { useLayoutEffect, useEffect, useReducer } from "react";

import { connect } from "react-redux";

//Base classes/hooks.
import * as TextHighlightTab_Hook from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextHighlight/TextHighlightTab/TextHighlightTab_Hook";

//Module realted fies.
import TextHighlightTab_ModuleProcessor from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextHighlight/TextHighlightTab/TextHighlightTab_ModuleProcessor";

//Base classes/methods.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Application State classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
 * @name StartTab
 * @summary this tab is Responsible for Start tab in office ribbon.
 * @param {any} props 
 */
const TextHighlightTab = props => {

    /**
    * @name [state, dispatch]
    * @summary Gets the state and dispatch for the component. Initializes the UndoRedo for the component.
    * */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, TextHighlightTab_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Combines the props, state, dispatch and other objects that are required throughout the component.
    * */
    let objContext = { state, dispatch, props, ["TextHighlightTab_ModuleProcessor"]: new TextHighlightTab_ModuleProcessor() }; // objContext

    let CurrentTextHighlightId = EditorState.GetProperty('CurrentTextHighlightId');

    useEffect(() => {
        var textHighlightRef = EditorState.GetReference(`TextHighlightRef-${EditorState.GetProperty('CurrentTextHighlightId')}`);
        if (textHighlightRef && textHighlightRef.current && textHighlightRef.current.GetSelectedColors) {
            var arrSelectedColors = textHighlightRef.current.GetSelectedColors();
            var arrBlnShowBorderColor = objContext.state.arrColorPalette.map((color, index) => {
                if (arrSelectedColors.findIndex(e => e === color) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            });
            objContext.dispatch({ "type": "SET_STATE", "payload": { "arrBlnShowBorderColor": arrBlnShowBorderColor } });
        }
    }, [props.CurrentTextHighlightId])

    /**
    * @name GetContent
    * @summary Calls the render body function of the common.
    * @returns {JSX} JSX of the Component.
    */
    const GetContent = () => {
        return (
            <div className="office-ribbon table-tab editor-office-ribbon">
                {
                    <div id={`texthighlight-color-platte`} className="office-ribbon-text-highlight-color-palette-wrapper">
                        {
                            objContext.state.arrColorPalette.map((color, index) => {
                                return (
                                    <div key={`office-ribbon-text-highlight-color-outer-circle-${index}`}
                                        className="office-ribbon-text-highlight-outer-circle" onClick={() => { objContext.TextHighlightTab_ModuleProcessor.SaveSelectedColor(objContext, color, index); }}>
                                        <div className="office-ribbon-text-highlight-inner-circle" style={{ "backgroundColor": color, "transition": "0.3s", "border": "3px solid #fff", "boxShadow": "0 0 5px #959595" }}>
                                            {objContext.state.arrBlnShowBorderColor[index] && <span> &#x2714; </span>}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        );
    };

    /**
    * @summary Calls the GetContent method.
    * */
    return GetContent()
}


/**
 * @name mapStateToProps
 * @param {object} state
 */
function mapStateToProps(state) {
    return {
        [`CurrentTextHighlightId`]: state.EditorState.CurrentTextHighlightId  
    };
}

export default connect(mapStateToProps)(TextHighlightTab);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TextHighlightTab_ModuleProcessor; 