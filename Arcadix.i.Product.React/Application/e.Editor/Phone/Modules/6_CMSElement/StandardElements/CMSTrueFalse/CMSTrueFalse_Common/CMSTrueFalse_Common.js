//React imports
import React from 'react';

/**
 * @name CMSTrueFalse_Common
 * @param {object} props props form parent
 * @summary Contains the JSX of CMSTrueFalse
 * @returns {any} returns the cms checkbox's JSX
 */
const CMSTrueFalse_Common = (props) => {

    const { Context, Events, Callbacks, TextElement  } = props;

    const RenderTruFalse = () => {
        return Context.state.ElementJson["vElementJson"]["Values"] && Context.state.ElementJson["vElementJson"]["Values"].map((objTrueFalse) => {
            let blnIsChecked = objTrueFalse["cIsCorrectValue"] === "Y" ? true : false;
            let objTextElementProps = Callbacks.GetTextElementProps(objTrueFalse["iElementTextId"]);
            return (                
                <div onContextMenu={(event) => {
                    Events.OpenContextMenu ? Events.OpenContextMenu(event, { "Value": objTrueFalse, "Type": null })
                        : event.preventDefault(); event.stopPropagation();
                }}>
                    <span style={blnIsChecked ? { border: "solid 1px" } : {}} className="truefalse-span" onClick={(event) => { Events.OnCheckChange(objTrueFalse); }}>
                        {
                            objTrueFalse["iDisplayOrder"] == 1 ?
                                <span style={{ color: "green" }}>&#x2714;</span> : <span style={{ color: "red" }}>&#x2716;</span>
                        }
                    </span>
                    <TextElement {...objTextElementProps} />
                </div>
            );
        });
    }

    /**
     * @name GetContent
     * @summary Render the checkbox body
     * @returns {any} Returns the JSX for the checkbox.
     */
    const GetContent = () => {            
        return (
            <div
                ielementid={Context.state.ElementJson["iElementId"]}
                ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
            >                
                {RenderTruFalse()}
            </div>
        );
    };

    return GetContent();
};

export default CMSTrueFalse_Common;
