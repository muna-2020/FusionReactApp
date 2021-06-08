import { useEffect, useRef } from "react";

/**
* @name GetInitialState
* @param {object} props Passes the props
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        objOfficeRibbonContentData: null,
        refSlider: useRef(null)
    };
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize method call to load hooks
*/
export function Initialize(objContext) {
    useResetSlider(objContext);
}

/**
 * @name useResetSlider
 * @param {object} objContext takes objContext
 * @summary To Reset the Slider on change of OfficeRibbon data.
 */
export function useResetSlider(objContext) {
    useEffect(() => {
        if (objContext.state.refSlider && objContext.state.refSlider.current) {
            objContext.state.refSlider.current.ResetSlider();
        }
    }, [objContext.props.Data.OfficeRibbonData])
}
