const addAppStateProperty = (state, value, Key) => {
    var newState = { ...state, [Key]: value };    
    return newState;
};
const initialState = {
    PerformanceLog: []
};

const PerformanceLogReducer = function (state = initialState, action) {
    switch (action.type) {
        case "ADD":
            return addAppStateProperty(state, action.payload.data, action.payload.Key);
        default:
            return state;
    }
};

export default PerformanceLogReducer;