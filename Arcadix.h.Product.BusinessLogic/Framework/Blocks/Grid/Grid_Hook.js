// React related impoprts.
import { useEffect } from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';
import Grid_ComponentProcessor from '@shared/Framework/Blocks/Grid/Grid_ComponentProcessor';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    let arrCheckedRowIndices = [];
    let arrSelectedRows = [];
    let objSelectedRow = ApplicationState.GetProperty("SelectedRows");
    let objSelectedIndices = ApplicationState.GetProperty("SelectedRowsIndices");
    if (objSelectedRow && objSelectedRow[props.Id]) {
        arrSelectedRows = objSelectedRow[props.Id];
        let objSelectedRowsIndices = objSelectedIndices ? objSelectedIndices : {};
        if (objSelectedIndices && objSelectedIndices[props.Id]) {
            arrCheckedRowIndices = objSelectedIndices[props.Id];
        }
        else {
            ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedRowsIndices, [props.Id]: [0] });
        }
    }
    else {
        if (props.Data.RowData != undefined) {
            for (var intIndex = 0; intIndex < props.Data.RowData.length; intIndex++) {
                let objRowData = { ...props.Data.RowData[intIndex] };
                let objGridRowData = props.CallBacks && props.CallBacks.OnBeforeRowSelect ? props.CallBacks.OnBeforeRowSelect(objRowData) : objRowData;
                let blnShowRow = props.Meta.Filter ? (new Grid_ComponentProcessor).ShowRow(objRowData, props.Meta.Filter) : true;

                //Callback to modify row data in module.
                objRowData = blnShowRow ? props.CallBacks ? (props.CallBacks.OnBeforeGridRowRender ? props.CallBacks.OnBeforeGridRowRender(objRowData) : objRowData) : objRowData : null;
                if (objRowData != null) {
                    arrSelectedRows = [...arrSelectedRows, objGridRowData];
                    arrCheckedRowIndices = [...arrCheckedRowIndices, intIndex];
                    let objSelectedRows = objSelectedRow ? objSelectedRow : {};
                    let objSelectedRowsIndices = objSelectedIndices ? objSelectedIndices : {};
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, [props.Id]: arrSelectedRows });
                    ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedRowsIndices, [props.Id]: arrCheckedRowIndices });

                    break;
                }
            }
        }
    }

    return {
        intSelectedRowIndex: arrCheckedRowIndices.length > 0 ? arrCheckedRowIndices[0] : -1, //Local state to hold selected Row index.
        arrCheckedIndices: arrCheckedRowIndices, //array of integers to hold the seleced row indices.
        blnAllCheckBox: false, //local state to hold true, when the CheckBox in the Header is checked, Used only in the Header and to re render it.
        objNewRow: null,
        arrSelectedRows
    };
}

/**
 * @name useCancelEditRow
 * @param {*} objContext objContext
 * @summary Checks if the pupil's data is loaded to props and then set the component state accordingly.  
 */
function useCancelEditRow(objContext) {
    useEffect(() => {
        let blnCancelRow = objContext.props[objContext.props.Id + "_Cancel_EditRow"];
        if (blnCancelRow && blnCancelRow == true) {
            objContext.Grid_ComponentProcessor.OnCancelEdit(-2, objContext, objContext.refRows, objContext.refIsEditMode);
            ApplicationState.SetProperty(objContext.props.Id + "_Cancel_EditRow", false);
        }
    }, [objContext.props[objContext.props.Id + "_Cancel_EditRow"]]);
}

/**
* @name Initialize
* @param {object} objContext Context Object
* @summary Initialize method call to load the initial data
*/
export function Initialize(objContext) {
    useOnPropChange(objContext);
    useOnRowDataChange(objContext);
    useSetResetSelectFunctionToStore(objContext);
    useSetSelectAdjacentRowToStore(objContext);
    //useCancelEditRow(objContext);
    useClearApplicationStateOfCurrentGrid(objContext); //To be reviewed and then will implement it properly
}

/**
* @name useOnPropChange
* @summary When the Filter or RenderGrid is changed from the module, the selection has to done for first row.
*/
export function useOnPropChange(objContext) {
    useEffect(() => {
        let refRows = objContext.refRows;
        let intIndex = refRows.current.SelectedRowIndex == -1 ? 0 : refRows.current.SelectedRowIndex;
        if (refRows.current[intIndex] && refRows.current[intIndex].current) {
            refRows.current[intIndex].current.SelectRow();
        }
        if (refRows.current[refRows.current.PreviuosSelectedRowIndex] && refRows.current[refRows.current.PreviuosSelectedRowIndex].current) {
            refRows.current[refRows.current.PreviuosSelectedRowIndex].current.UnSelectRow();
        }
        //Initializing the values.
        //refRows.current.SelectedRowIndex = -1;
        refRows.current.EditMode = false;
        objContext.UpdateRef(refRows);        
    }, [objContext.props.Data.Filter, objContext.props.Data.RenderGrid])
}

/**
* @name useOnRowDataChange
* @summary When the RowData is changed from the module, the selection has to done for first row.
*/
export function useOnRowDataChange(objContext) {
    useEffect(() => {
        let refRows = objContext.refRows;
        let intSelectedRowIndex = refRows.current.SelectedRowIndex < 0 ? 0 : refRows.current.SelectedRowIndex;

        let objSelectedIndices = ApplicationState.GetProperty("SelectedRowsIndices");
        if (objSelectedIndices && objSelectedIndices[objContext.props.Id] && objSelectedIndices[objContext.props.Id].length > 0) {
            intSelectedRowIndex = objSelectedIndices[objContext.props.Id][0];               
        }

        if (refRows.current[intSelectedRowIndex] && refRows.current[intSelectedRowIndex].current) {
            refRows.current[intSelectedRowIndex].current.SelectRow();
        }
        if (objContext.refRows.current && objContext.refRows.current.EditMode)
            objContext.refRows.current.EditMode = false;
        objContext.Grid_ComponentProcessor.OnCancelEdit(-2, objContext, objContext.refRows, objContext.refIsEditMode);
    }, [objContext.props.Data.RowData])
}

/**
* @name useSelectNodeOutSideTheTree
* @param {any} objContext
* @summary Initializes the objContext.state.
*/
export function useSetResetSelectFunctionToStore(objContext) {
    useEffect(() => {
        let objSelectGridRow = ApplicationState.GetProperty("ResetGridSelection") ? ApplicationState.GetProperty("ResetGridSelection") : {};
        ApplicationState.SetProperty("ResetGridSelection", { ...objSelectGridRow, [objContext.props.Id]: () => { objContext.Grid_ComponentProcessor.ResetGridSelection(objContext) } });
    }, [objContext]);
}

/**
* @name useSelectNodeOutSideTheTree
* @param {any} objContext
* @summary Initializes the objContext.state.
*/
export function useSetSelectAdjacentRowToStore(objContext) {
    useEffect(() => {
        let objSelectGridRow = ApplicationState.GetProperty("SelectAdjacentGridRow") ? ApplicationState.GetProperty("SelectAdjacentGridRow") : {};
        ApplicationState.SetProperty("SelectAdjacentGridRow", { ...objSelectGridRow, [objContext.props.Id]: (arrRowData) => { objContext.Grid_ComponentProcessor.SelectAdjacentGridRow(arrRowData, objContext) } });
    }, [objContext]);
}

/**
 * @name useClearApplicationStateForCurrentGrid
 * @summary sets the selected rows and selected indices to empty array when component unmounts.
 * @param {any} objContext
 */
export function useClearApplicationStateOfCurrentGrid(objContext) {
    useEffect(() => {
        return () => {

            if (objContext.props.Meta.blnClearApplicationStateOfGrid) {
                let objSelectedRow = ApplicationState.GetProperty("SelectedRows");
                let objSelectedIndices = ApplicationState.GetProperty("SelectedRowsIndices");
                ApplicationState.SetProperty("SelectedRows", { ...objSelectedRow, [objContext.props.Id]: [] });
                ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedIndices, [objContext.props.Id]: [] });
            }          
        }
    }, []);
}