/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Reducer
 * @returns {object} UndoRedo initialized intial state
 */
export function GetInitialState(props) {
    return {
        "ElementJson": {
            ...props.ElementJson
        },
        "PageId": props.PageId,
    }
};