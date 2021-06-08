/**
* @name GetInitialState
* @summary Reducer
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        relX: 0,
        relY: 0,
        left: props.left,
        top: props.top,
        Height: 110,
        Width: 110,
        OriginalHeight: "",
        OriginalWidth:"",
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth,
        IsLoadComplete : false
    };
}