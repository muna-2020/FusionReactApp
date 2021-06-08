import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';

/**
 * @name GetInitialState
 * @param {object} props component props.
 * @summary Reducer.
 * @returns {object} initial state object
 */
export function GetInitialState(props) {
    return {
        position: "absolute",
        top: "0px",
        left: "0px",
        display: "none",
        zIndex: 10000000,
    }
};

