
/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        findCount: 0,
        activeContentEditable: "",
        ActiveTextCount: 0,
        activeIndex: 0,
        wholeWord: false,
        caseSensitive: false,
        replace: props.ElementJson.Operation == "replace" ? true : false
    };
}