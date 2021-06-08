import { UndoRedoInitialize, UndoRedoAction } from '@root/Application/e.Editor/PC/Modules/1_EditorFrame/UndoRedo/UndoRedo';
import React, { useEffect, useImperativeHandle } from 'react';

//string formatter.
import * as StringFormatter from '@shared/Framework/Services/DataFormatter/StringFormatter/StringFormatter';

//Base classes/methods
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

/**  
 * @name GetInitialState  
 * @param {object} props component props  
 * @summary Reducer 
 * @returns {object} initial state object  
 */
export function GetInitialState(props) {
    return UndoRedoInitialize({
        "ElementJson": {
            ...props.ElementJson,
            "vElementJson": {
                ...props.ElementJson.vElementJson,
                "html": StringFormatter.RestoreStringForXML(props.ElementJson.vElementJson.html),
                "Values": props.ElementJson.vElementJson.Values.map(objValue => {
                    return {
                        ...objValue,
                        "mathMl": StringFormatter.RestoreStringForXML(objValue.mathMl)
                    }
                })
            }
        },
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        'FormulaRef': React.createRef()
    }, props);
};

/**
 * @name Initialize
 * @param {object} objContext {state, props, dispatch, CMSCheckbox_Editor_ModuleProcessor}
 * @summary Initialize the custom hooks
 */
export function Initialize(objContext) {

    /**
     * @name useEffect
     * @summary Perserves the ElementState.
     */
    useEffect(() => {
        if (objContext.props.PreserveSubElementState) {
            objContext.props.PreserveSubElementState(objContext.state.ElementJson["iElementId"], objContext.state);
        }
    }, [objContext.state.StateHistory]);
     
    /** 
     * @name useImperativeHandle
     * @summary Used for UndoRedo. 
     */ 
    useImperativeHandle(objContext.props.UndoRedoRef, () => ({
        UndoRedo: (LastActivity, Action) => {
            UndoRedoAction(LastActivity, Action, objContext.state, objContext.dispatch, objContext.CMSFormula_Editor_ModuleProcessor.UndoRedoActionCallback);
        }
    }), [objContext.state]);
    
    EditorBase_Hook.useRenderComplete(objContext);
}