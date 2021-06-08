

/** 
 * Implement Required Action Handlers 
 * state reducer used for maintaining local state
 * @param {*} state 
 * @param {*} action 
 */
export const Reducer = (state, action) => {
    switch (action.type.toUpperCase()) {
        case "ACTION_KEY": {
            return UndoRedoUpdate({
                ...state, objCheckBox: {
                    ...state.objCheckBox,
                    Values: action.payload
                }
            });
        }
        default: {
            return state;
        }
    }
};

/**
 * Implement other required methods to mke the component work after this.
 */