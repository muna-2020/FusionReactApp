import {  useImperativeHandle } from 'react';

export function GetInitialState(props) { // returning initial State to useReducer function in _Editor File. 
    return {
        "ElementJson": props.ElementJson
    };
}

export function Initialize(objContext) {

    useImperativeHandle(objContext.props.ElementRef, () => ({
        "GetElementJson": () => {
            return objContext.state.ElementJson;
        }
    }), [objContext.state, objContext.props]);
}
