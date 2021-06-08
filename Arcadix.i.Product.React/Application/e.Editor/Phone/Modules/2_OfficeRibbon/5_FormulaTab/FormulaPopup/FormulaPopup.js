//React related imports.
import React from "react";

//Module related fies.
import * as FormulaTab_MetaData from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/5_FormulaTab/FormulaTab_MetaData"

/**
 * name FormulaPopup
 * @param {any} props
 * @summary display the differnt formula Popup of offfice ribbbon Formula tab.
 */
const FormulaPopup = (props) => {
    return (
        <div className="items" style={{ position: "relative", zIndex: 9 }}>
            <div onClick={objEvt => props.ShowFormulaPopup(props.FormulaGroup)}>        
                <WrapperComponent
                    ComponentName={"Image"}
                    Data={{
                        Image: props.DisplayImage,
                        ToolTipText: props.DisplayName
                    }}
                    ParentProps={props}
                />
                <span>{props.DisplayName}</span>
            </div>
            <div className="formula-dropdown" style={{ display: props.ActivePopup === props.FormulaGroup ? "flex" : "none" }}>
                {
                    [...Array(props.FormulaCount)].map((objFormula, intIndex) => {
                        return (
                            <div key={intIndex} className="icon" onClick={objEvt => { props.AddFormula(props.FormulaGroup, "Template" + (intIndex + 1)) }}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: FormulaTab_MetaData.GetMathMl(props.FormulaGroup, "Template" + (intIndex + 1))["Image"]
                                    }}
                                    ParentProps={props}
                                />
                            </div>)
                    })
                }
            </div>
        </div>
    )
}

export default FormulaPopup;