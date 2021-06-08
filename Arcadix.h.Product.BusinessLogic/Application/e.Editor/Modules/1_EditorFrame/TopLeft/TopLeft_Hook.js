import { useImperativeHandle } from "react";
/**
 * @name GetInitialState   
 * @param {any} props component props
 * @summary Reducer
 * @returns {any} initial state object
 */
export const GetInitialState = (props) => {
    return {
      "UndoState" : "inactive",
      "RedoState" : "inactive"
    };
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, OfficeRibbon_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {
    useImperativeMethods(objContext);
}

/**
 * @name useImperativeMethods
 * @param {object} objContext {state, props, dispatch, OfficeRibbon_ModuleProcessor}
 * @summary Imperative Methods
 */
function useImperativeMethods(objContext) {
    /**
    * @summary Gets the Element Json.
    */
    useImperativeHandle(objContext.TopLeftRef, () => ({
         "GetState" : () =>{
             return objContext.state;
         },
         "SetUndoRedoIconStatus" : (objIconState) =>{
              objContext.dispatch({
                  type : "SET_STATE",
                  payload : {
                      ...objContext.state,
                      ...objIconState
                  }
              })
         }
    }), [objContext.state, objContext.props]);
}