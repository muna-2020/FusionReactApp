import { useImperativeHandle } from "react";
/**
 * @name GetInitialState   
 * @param {any} props component props
 * @summary Reducer
 * @returns {any} initial state object
 */
export const GetInitialState = (props) => {
    return {
        "strActiveTab": "START",
        "blnCollapseTabDetails": false,
        "arrSelectedElementTabs": []
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
    * @name useImperativeHandle
    */
    useImperativeHandle(objContext.props.OfficeRibbonRef, () => ({
        "AddElementTab": (strElementName, strActionType) => {
            var arrNewSelectedElementTabs = [...objContext.state.arrSelectedElementTabs];
            var index = objContext.state.arrSelectedElementTabs.findIndex(t => t.name.toUpperCase() === strElementName.toUpperCase())
            if (index > -1) {
                if (strActionType.toUpperCase() === "ADD") {
                    arrNewSelectedElementTabs[index] = { ...arrNewSelectedElementTabs[index], ["count"]: arrNewSelectedElementTabs[index]["count"] + 1 };
                }
                else {
                    if (arrNewSelectedElementTabs[index]["count"] > 1) {
                        arrNewSelectedElementTabs[index] = { ...arrNewSelectedElementTabs[index], ["count"]: arrNewSelectedElementTabs[index]["count"] - 1 };
                    }
                    else {
                        arrNewSelectedElementTabs = arrNewSelectedElementTabs.filter(t => t.name.toUpperCase() !== strElementName.toUpperCase());
                        objContext.dispatch({ "type": "SET_STATE", "payload": { "strActiveTab": "START" } });
                    }
                }
            }
            else {
                if (strActionType.toUpperCase() === "ADD") {
                    arrNewSelectedElementTabs = [...arrNewSelectedElementTabs, { "name": strElementName, "count": 1 }];
                }
            }
            objContext.dispatch({ "type": "SET_STATE", "payload": { "arrSelectedElementTabs": [...arrNewSelectedElementTabs] } })
        },
        "Reset": () => {
            objContext.dispatch({
                "type": "SET_STATE",
                "payload": {
                    "strActiveTab": "START",
                    "blnCollapseTabDetails": false,
                    "arrSelectedElementTabs": []
                }
            });
        },
    }), [objContext.state, objContext.props]);
}