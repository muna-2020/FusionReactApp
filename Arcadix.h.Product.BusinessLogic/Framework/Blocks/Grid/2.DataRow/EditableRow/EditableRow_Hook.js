// React related impoprts.
import { useEffect, useImperativeHandle } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state.
* @returns {object} initial state. object
*/
export function GetInitialState(props) {
    return {
        blnEditMode: false, //set to true when the row needs to be edited.
        objEditRowData: {}, //Locak objContext.state. for the edit row data
        objValidationMessages: {},
        blnSaveActionInvoked:false, //To decide when to make the validation.
        //These two local states are needed only in Edit Mode. Set after callback  to the Module (OnBeforeEditRow)
        blnAllowEdit: false, //to make the row to input or span.
        arrRowActionButtonsKeys: [] //array of button keys to select the RowAction Action Buttons from  objContext.props.RowActionButtons
    }
}

/**
* @name useOnPropChange
* @summary To be called when new Row is to created, So we need the Row in Edit Mode in the first load only.
* Sets blnEditMode to true, and puts the objContext.props.RowData from the Grid into objEditRowData to be used for editing.
*/
export function useOnNewRowAdd(objContext) {
    useEffect(() => {
        if (objContext.props.Data.RowData.IsNewRow) {
            let refRow = objContext.refRow;
            objContext.dispatch({ type: 'SET_STATE', payload: { blnEditMode: true, blnAllowEdit: true, arrRowActionButtonsKeys: ["Save"], objEditRowData: objContext.props.Data.RowData } });
            refRow.current.className = "selected-row";
            objContext.UpdateRef(refRow);
        }
    }, []);
}

/**
* @name useImperativeHandle
* @summary Methods to be called from the Grid to perform select actions and cancel edit mode
*/
export function useImperativeHandleMethods(objContext, ref) {   
    useImperativeHandle(ref, () => ({
        SelectRow: (strClassName) => {
            let refRow = objContext.refRow;
            refRow.current.className = strClassName ? strClassName : "selected-row";
            objContext.UpdateRef(refRow);
        },
        UnSelectRow: () => {
            let refRow = objContext.refRow;
            refRow.current.className = "";
            objContext.UpdateRef(refRow);
        },
        CancelEditMode: () => {
            objContext.dispatch({ type: 'SET_STATE', payload: { blnEditMode: false } });
        }
    }), [objContext.state]);
}