    
const EditorStateReducer = (state = {}, action) => {
    switch (action.type.toLowerCase()) {
        case "add_to_array": return {
            ...state,
            [action.payload.Entity]: [...state[action.payload.Entity], action.payload.Value]
        };
        case "remove_from_array": return {
            ...state,
            [action.payload.Entity]: state[action.payload.Entity].map(Item => Item[action.payload.Key] !== action.payload.Value)
        };
        case "set_property": return {
            ...state,
            [action.payload.Entity]: action.payload.Value
        };
        case "remove_property": return RemoveProperty(state, action.payload.Entity);

        default: return state;
    }
};

const RemoveProperty = (state, strEntity) => {
    let { [strEntity]: { }, ...objEverythingElse } = state;
    return objEverythingElse;
};

export default EditorStateReducer;