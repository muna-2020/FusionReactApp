//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";
import * as Base_Hook from "@shared/Framework/BaseClass/Base_Hook.js";

/**
* @name Grid_ComponentProcessor
* @summary Class for DisplayGrid.
*/
class Grid_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList(state, ownProps) {
        return [];//Base_Hook.MapStoreToProps([{ "StoreKey": "ApplicationState", "DataKey": ownProps["Id"] + "_Cancel_EditRow" }]);
    }

    /**
    * @name OnClickRow
    * @param {*} intSelectedRowIndex
    * @summary Invokes the OnClickRow prop of the module and returns the selectedRow object
    */
    OnClickDisplayRow(intSelectedRowIndex, objRowData, objContext, event) {
        Performance.StartNewBatch(true);
        objContext.dispatch({ type: "SET_STATE", payload: { "arrCheckedIndices": [], "blnAllCheckBox": false, "intSelectedRowIndex": intSelectedRowIndex } });
        let objSelectedRowsIndices = ApplicationState.GetProperty("SelectedRowsIndices");
        ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedRowsIndices, [objContext.props.Id]: [] });
        let objSelectedRowsIndex = ApplicationState.GetProperty("SelectedRowIndex");
        ApplicationState.SetProperty("SelectedRowIndex", { ...objSelectedRowsIndex, [objContext.props.Id]: intSelectedRowIndex });
        let arrSelectedRows = [{ ...objRowData }];
        objRowData = objContext.props.CallBacks && objContext.props.CallBacks.OnBeforeRowSelect ? objContext.props.CallBacks.OnBeforeRowSelect(objRowData) : objRowData;
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, [objContext.props.Id]: arrSelectedRows });
        objContext.dispatch({ type: "SET_STATE", payload: { "arrSelectedRows": arrSelectedRows } });
        if (objContext.props.Events && objContext.props.Events.OnClickRow)
            objContext.props.Events.OnClickRow({ SelectedRow: objRowData }, event);
    }

    /**
     * @name OnClickRow
     * @param {any} strType
     * @param {any} objRowData
     * @param {any} intIndex
     * @summary Calls the methods based on the type
     */
    OnClickRow(strType, objRowData = null, intIndex, objContext, refRows, refIsEditMode) {
        //let refRows = objContext.refRows;
        switch (strType) {
            case "Edit":
                this.SelectRow(intIndex, objRowData, objContext, refRows, "editable-row", refIsEditMode);
                this.OnEditClickRow(objRowData, objContext, refRows, refIsEditMode);
                break;
            case "Cancel":
                this.OnCancelEdit(intIndex, objContext, refRows, refIsEditMode);
                break;
            case "Save":
                this.OnSaveClickRow(objRowData, objContext, refRows, refIsEditMode);
                break;
            case "Select":
                this.SelectRow(intIndex, objRowData, objContext, refRows, "", refIsEditMode);
                break;
        }
    }

    /**
     * @name OnEditClickRow
     * @param {*} objRowData
     * @summary To set the blnEditMode to true, when edit action is invoked
     */
    OnEditClickRow(objRowData, objContext, refRows, refIsEditMode) {
        //let refRows = objContext.refRows;
        refIsEditMode.current = true;
        //objContext.dispatch({ type: 'SET_STATE', payload: { blnEditMode: true } });
        refRows.current.EditMode = true;
        if (objContext.props.Events && objContext.props.Events.OnClickRow) {
            objContext.props.Events.OnClickRow(objRowData);
        }
        objContext.UpdateRef(refRows);
        objContext.UpdateIsEditRef(refIsEditMode);
    }

    OnContextMenuClick(intIndex, GridRowData, objContext, event) {
        if (objContext.props.Events && objContext.props.Events.OnContextMenuClick) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (objContext.state.arrCheckedIndices.includes(intIndex)) {
            let arrCheckedRows = objContext.state.arrSelectedRows;
            objContext.props.Events.OnContextMenuClick(GridRowData, event, arrCheckedRows);
        }
        else {
            objContext.props.Events.OnContextMenuClick(GridRowData, event);
            this.OnClickDisplayRow(intIndex, GridRowData, objContext, event);
        }

    }

    /**
   * @name OnCancelEdit
   * @param {*} intIndex
   * @summary to cancel the edit action....... make the blnEditMode to false
   */
    OnCancelEdit(intIndex, objContext, refRows, refIsEditMode) {
        refIsEditMode.current = false;
        refRows.current.EditMode = false;
        if (intIndex == -2) {//Checks if this is cancel of new row.
            objContext.dispatch({ type: 'SET_STATE', payload: { objNewRow: null } });
            if (refRows.current && Array.isArray(refRows.current) && refRows.current.length > 0 && refRows.current[0]["current"] != null) {
                refRows.current[0].current.SelectRow();
            }
            refRows.current.SelectedRowIndex = 0;
        }
        objContext.UpdateRef(refRows);
        objContext.UpdateIsEditRef(refIsEditMode);
    }

    /**
     * @name OnSaveClickRow
     * @param {object} objSaveData
     * @summary to do the validation and return the final edited row object data
     */
    OnSaveClickRow(objSaveData, objContext, refRows, refIsEditMode) {
        //let refRows = objContext.refRows;
        if (refRows.current.SelectedRowIndex == -2) {//Checks if this is Save of new row.            
            refRows.current.SelectedRowIndex = -1;
        }
        objContext.props.CallBacks.SaveMethod(objSaveData, () => this.OnGridCallBack(objContext, refRows, refIsEditMode));
        objContext.UpdateRef(refRows);
        refIsEditMode.current = false;
        objContext.UpdateIsEditRef(refIsEditMode);
    }

    /**
     * @name SelectRow
     * @param {intIndex}
     * @param {object} objSaveData
     * @summary to do the validation and return the final edited row object data
     */
    SelectRow(intIndex, objRowData, objContext, refRows, strClassName, refIsEditMode) {
        let intSelectedRowIndex = refRows.current.SelectedRowIndex < 0 ? 0 : refRows.current.SelectedRowIndex;
        if (refRows.current[intSelectedRowIndex] && refRows.current[intSelectedRowIndex].current) {
            refRows.current[intSelectedRowIndex].current.UnSelectRow();
        }
        if (refRows.current[intIndex] && refRows.current[intIndex].current) {
            refRows.current[intIndex].current.SelectRow(strClassName);
        }
        refRows.current.SelectedRowIndex = intIndex;
        //}

        if (objContext.props.Events && objContext.props.Events.OnClickRow) {
            objContext.props.Events.OnClickRow(objRowData);
        }
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        if (objRowData != null) {
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, [objContext.props.Id]: [objRowData] });
        }

        let objSelectedRowsIndices = ApplicationState.GetProperty("SelectedRowsIndices");

        let intPreviousSelectedRowIndex = objSelectedRowsIndices[objContext.props.Id].length != 0 ?
            objSelectedRowsIndices[objContext.props.Id][0] : null;

        if (intPreviousSelectedRowIndex !== null && intPreviousSelectedRowIndex !== intIndex)
            refRows.current[intPreviousSelectedRowIndex].current.UnSelectRow();


        ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedRowsIndices, [objContext.props.Id]: [intIndex] });
        objContext.UpdateRef(refRows);
        objContext.UpdateIsEditRef(refIsEditMode);
    }

    /**
     * @name HandleAllCheck
     * @sumarry this is called when ever all checkbox is clicked
     */
    HandleAllCheck(objContext) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        if (objContext.state.blnAllCheckBox) {
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, [objContext.props.Id]: [] });
            objContext.dispatch({ type: "SET_STATE", payload: { "blnAllCheckBox": false, "arrCheckedIndices": [], "arrSelectedRows": [] } });
            let objSelectedRowsIndices = ApplicationState.GetProperty("SelectedRowsIndices");
            ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedRowsIndices, [objContext.props.Id]: [] });
        } else {
            let arrCheckedIndices = objContext.props.Data.RowData.map((objRow, intIndex) => intIndex);
            let arrRowData = [];
            objContext.props.Data.RowData.map(objRowData => {
                let obj = objContext.props.CallBacks && objContext.props.CallBacks.OnBeforeRowSelect ? objContext.props.CallBacks.OnBeforeRowSelect(objRowData) : objRowData;
                if (obj) {
                    arrRowData = [...arrRowData, obj];
                }
            });
            ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, [objContext.props.Id]: arrRowData });
            let objSelectedRowsIndices = ApplicationState.GetProperty("SelectedRowsIndices");
            ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedRowsIndices, [objContext.props.Id]: arrCheckedIndices });
            objContext.dispatch({ type: "SET_STATE", payload: { "blnAllCheckBox": true, "arrCheckedIndices": arrCheckedIndices, intSelectedRowIndex: -2, "arrSelectedRows": arrRowData } });
        }
    }

    /**
     * @name HandleCheck
     * @param {*} intRowIndex intRowIndex
     * @param {*} blnCheckedValue blnCheckedValue
     * @sumarry Handles the checkbox clicks of the rows.Initially arrCheckBox will hold all index to be false
     */
    HandleCheck(intRowIndex, blnIsChecked, objContext) {
        let arrCheckedIndices = [];
        if (blnIsChecked) {
            objContext.dispatch({ type: "SET_STATE", payload: { "blnAllCheckBox": false } });
            arrCheckedIndices = objContext.state.arrCheckedIndices.filter(intIndex => intIndex != intRowIndex); arrCheckedIndices
        }
        else {
            arrCheckedIndices = [...objContext.state.arrCheckedIndices, intRowIndex];
            arrCheckedIndices = arrCheckedIndices.sort((a, b) => a - b); //Sort in ascending order
        }

        let arrSelectedRowData = [];
        arrCheckedIndices.map(intIndex => {
            let objRowData = objContext.props.CallBacks && objContext.props.CallBacks.OnBeforeRowSelect ? objContext.props.CallBacks.OnBeforeRowSelect(objContext.props.Data.RowData[intIndex]) : objContext.props.Data.RowData[intIndex];;
            if (objRowData) {
                arrSelectedRowData = [...arrSelectedRowData, objRowData];
            }
        });
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows");
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, [objContext.props.Id]: arrSelectedRowData });
        let objSelectedRowsIndices = ApplicationState.GetProperty("SelectedRowsIndices");
        ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedRowsIndices, [objContext.props.Id]: arrCheckedIndices });
        objContext.dispatch({ type: "SET_STATE", payload: { "arrCheckedIndices": arrCheckedIndices, intSelectedRowIndex: -2, "arrSelectedRows": arrSelectedRowData } });
    }

    /**
    * @name ShowRow
    * @param {*} objRowData 
    * @summary  Takes the RowData and checks it against the filter passed,check if all the column and data pair in the filter match with the corresponding row data
    * @returns {boolean} 
    */
    ShowRow(objRowData, objFilter) {
        var blnShowRow = true;
        Object.keys(objFilter).map((strFilterKey) => {
            if (objFilter[strFilterKey] != objRowData[strFilterKey]) {
                blnShowRow = false;
            }
        })
        return blnShowRow;
    }

    /**
     * @name GetActiveRowCount
     * @param {any} objContext
     * @summary calculates the count of the active rows
     * @returns {int} active Row count
     */
    GetActiveRowCount(objContext) {
        var intActiveRowCount = 0;
        if (objContext.props.Data.RowData != undefined) {
            let arrActiveRows = objContext.props.Data.RowData.filter(objRow => {
                let blnFilterCheck = true, blnRowCallBackCheck = true;
                if (objContext.props.Meta.Filter)
                    blnFilterCheck = objContext.Grid_ComponentProcessor.ShowRow(objRow, objContext.props.Meta.Filter);
                if (objContext.props.CallBacks && objContext.props.CallBacks.OnBeforeGridRowRender)
                    blnRowCallBackCheck = objContext.props.CallBacks.OnBeforeGridRowRender(objRow);
                return blnFilterCheck && blnRowCallBackCheck
            })
            intActiveRowCount = arrActiveRows.length;
        }
        return intActiveRowCount;
    }

    /**
    * @name ShowLanguageHeader
    * @summary check whether or not to show the Language header.
    * @returns {boolean} returns true if Multilanguage present and row data is there.
    */
    ShowLanguageHeader(objContext) {
        return objContext.props.Meta.HeaderData && objContext.props.Meta.HeaderData.find(obj => obj["cShowMultiLanguage"] == "Y") && objContext.props.Data.LanguageData.length > 1 && !objContext.props.Meta.EditableGrid;
    };

    /**
    * @name CheckRowSeleceted
    * @summary check whether or not the row is selected.
    * @returns {boolean} 
    */
    CheckRowSeleceted(objContext, objRowData) {
        let blnPresentInStore = false;
        let arrSelectedRows = objContext.state.arrSelectedRows ? objContext.state.arrSelectedRows : [];
        if (arrSelectedRows.length != 0 && objContext.props.Meta.PrimaryKey) {
            arrSelectedRows.map(objSelectedRow => {
                if (blnPresentInStore == false)
                    blnPresentInStore = objRowData[objContext.props.Meta.PrimaryKey] == objSelectedRow[objContext.props.Meta.PrimaryKey];
            });
        }
        return blnPresentInStore;
    }

    /**
     * @name CheckSelected
     * @param {object} objRowData
     * @param {int} intIndex
     * @summary Logic to add the Selection Css to the row
     * On first load(intSelectedRowIndex will be -1):
     * Case 1.If PreSelect is given -> we select the row according to PreSelect object
     * Case 2.If PreSelect is not given --> First row is selected
     * @returns {boolean} blnSelected if row
     */
    CheckSelected(objRowData, intIndex, objContext) {
        let refRows = objContext.refRows;
        let blnSelected = false;
        if (refRows.current.SelectedRowIndex == -1) {
            if (!objContext.props.Data.PreSelect) {
                blnSelected = intIndex == 0;
            }
            else {
                let strPrimarykey = Object.keys(objContext.props.Data.PreSelect)[0];
                blnSelected = objRowData[strPrimarykey] == objContext.props.Data.PreSelect[strPrimarykey];
            }
        }
        else {
            blnSelected = refRows.current.SelectedRowIndex == intIndex;
        }
        return blnSelected;
    }



    /**
     * @name OnGridCallBack
     * @summary to change the Edit mode of the row to false.
     * */
    OnGridCallBack(objContext, refRows, refIsEditMode) {
        if (objContext.state.objNewRow != null)
            objContext.dispatch({ type: 'SET_STATE', payload: { objNewRow: null } });
        refIsEditMode.current = false;
        refRows.current.EditMode = false;
        let intSelectedRowIndex = ApplicationState.GetProperty("SelectedRowsIndices")[objContext.props.Id].length != 0 ?
            ApplicationState.GetProperty("SelectedRowsIndices")[objContext.props.Id][0] : refRows.current.SelectedRowIndex;
        if (refRows.current[intSelectedRowIndex] && refRows.current[intSelectedRowIndex].current) {
            refRows.current[intSelectedRowIndex].current.CancelEditMode();
        }
        objContext.UpdateRef(refRows);
        objContext.UpdateIsEditRef(refIsEditMode);
    }

    /**
     * @name CheckEditMode
     * @summary To be called only from the Row
     * @returns {boolean} Returns the blnEditMode is true or false
     */
    CheckEditMode(objContext) {
        return objContext.refRows.current.EditMode;
    }

    /**
    * @name AddNewRow
    * @summary Forms the New Row Object based on the Meta Data
    */
    AddNewRow(objContext, refIsEditMode) {
        let refRows = objContext.refRows;
        let objNewRow = { "IsNewRow": true };
        objNewRow = objContext.props.CallBacks.OnBeforeGridRowRender(objNewRow);
        objContext.props.Meta.HeaderData.map(objHeader => {
            if (objHeader["vControlType"].toLowerCase() == "dropdown") {
                let strTableAndColumn = objHeader["vColumnName"];
                if (strTableAndColumn.split('.').length > 1) {
                    let strTableName = strTableAndColumn.split('.')[0];
                    let strColumnName = strTableAndColumn.split('.')[1];
                    if (objNewRow[strTableName] == undefined) {
                        let arrTableData = [{
                            [strColumnName]: objContext.props.Data.DropDownData[strTableAndColumn]["Data"][0][strColumnName]
                        }];
                        objNewRow = { ...objNewRow, [strTableName]: arrTableData };
                    }
                }
                else {
                    let strColumnName = objHeader["vColumnName"];
                    if (objNewRow[strColumnName] == undefined) {
                        objNewRow = { ...objNewRow, [strColumnName]: objContext.props.Data.DropDownData[strColumnName]["Data"][0][strColumnName] };
                    }
                }
            }
        });
        refIsEditMode.current = true;
        objContext.dispatch({ type: 'SET_STATE', payload: { objNewRow: objNewRow } });
        let intSelectedRowIndex = refRows.current.SelectedRowIndex < 0 ? 0 : refRows.current.SelectedRowIndex;
        refRows.current[intSelectedRowIndex].current.UnSelectRow();
        refRows.current.SelectedRowIndex = -2;
        refRows.current.EditMode = true;
        objContext.UpdateRef(refRows);
        objContext.UpdateIsEditRef(refIsEditMode);
    }

    /**
     * @name GetDateFormattedRowData
     * @param {*} objRow 
     * @summary To Form the Row Data with date fields changed to culture from JConfiguration...
     * @returns {object} DateFormattedRow 
     */
    GetDateFormattedRowData(objRow, objContext) {
        objContext.props.Meta.HeaderData && objContext.props.Meta.HeaderData.map(objColumn => {
            if (objColumn.vValidationType && objColumn.vValidationType.toLowerCase() == "date"
                && objRow[objColumn.vColumnName] != undefined && objRow[objColumn.vColumnName] != null && objRow[objColumn.vColumnName] != "") {
                var objDate = new Date(objRow[objColumn.vColumnName]);
                var strDataLocalFormat = objDate.toLocaleDateString(objContext.props.ParentProps.JConfiguration.LanguageCultureInfo);
                strDataLocalFormat = strDataLocalFormat == "Invalid Date" ? objRow[objColumn.vColumnName] : objContext.Grid_ComponentProcessor.GetFormattedDateText(strDataLocalFormat);
                objRow = { ...objRow, [objColumn.vColumnName]: strDataLocalFormat }
            }
        })

        return objRow;
    }

    /**
    * @name GetDateText
    * @param {String} strCellColumnData Passed date column data
    * @summary Formats the passed date in dd.mm.yyyy
    * @returns {String} formated date
    */
    GetFormattedDateText(strCellColumnData) {
        // let objDay = new Date(strCellColumnData);
        let arrDate = strCellColumnData.split(".");
        let strDay = arrDate[0];
        let strMonth = arrDate[1]; //January is 0!
        let strYear = arrDate[2];

        strDay = parseInt(strDay) < 10 ? '0' + strDay : strDay;
        strMonth = parseInt(strMonth) < 10 ? '0' + strMonth : strMonth;

        return strDay + '.' + strMonth + '.' + strYear;

    }

    /**
    * @name OnHeaderButtonClick
    * @param {*} objButtonData
    * @summary To Form the Row Data with date fields changed to culture from JConfiguration...
    * @returns {object} DateFormattedRow 
    */
    OnHeaderButtonClick(objButtonData, objContext, refIsEditMode) {
        if (!refIsEditMode.current) {
            if (objButtonData.Type && objButtonData.Type.toLowerCase() == "add")
                this.AddNewRow(objContext, refIsEditMode);
            else
                objButtonData.Action();
        }
    }

    GetDragDropProps(objContext) {
        let intUniqueId = UniqueId.GetUniqueId();
        //Each drag zone expects a drag zone props.
        let objDragZoneProps = {
            "Meta": {
                "GroupId": intUniqueId,//the same id should be passed to its respeective dropzone,
                "Disable": false,//if you want to dynamically disable the drag drop feature.
                "DraggableElementType": "DraggableElement",//Element type that is draggable.
                "DragAreaType": "DragArea",//Area from where element has to be dragged.
                "DropAreaType": "DragArea"//Area where element has to be dropped.
            },
            "Events": {
                "OnDrop": (objDraggedElement, objDropArea, objSourceArea, objDragdropData) => {
                    if (objContext.props.Events && objContext.props.Events.OnDragDrop) {
                        let objDrag = {
                            Type: objDraggedElement.getAttribute("Type"),
                            Id: objDraggedElement.id
                        }
                        let objDrop = {
                            Type: objDropArea.getAttribute("Type"),
                            Id: objDropArea.id
                        }
                        objContext.props.Events.OnDragDrop(objDrag, objDrop);
                    }
                }
            },
            "CallBacks": {},
            "Data": {}
        };
        return objDragZoneProps;
    }

    CheckRowsDisplayed(objContext) {
        let blnDisplayRowPresent = false;
        objContext.props.Data.RowData.map(objRowData => {
            if (objContext.props.CallBacks.OnBeforeGridRowRender && objContext.props.CallBacks.OnBeforeGridRowRender(objRowData)) {
                blnDisplayRowPresent = true;
            }
        })

        return blnDisplayRowPresent;
    }

    /**
    * @name ResetGridSelection
    * @param {*} objContext
    * @summary Te reset the seletion of the grid -> selects the first row. when the data is empty, clear the data from application state.
    */
    ResetGridSelection(objContext) {
        let objRowData = null;
        if (objContext.props.Data.RowData && objContext.props.Data.RowData.length > 0) {
            for (var intIndex = 0; intIndex < objContext.props.Data.RowData.length; intIndex++) {
                objRowData = { ...objContext.props.Data.RowData[intIndex] };
                objRowData = objContext.props.CallBacks && objContext.props.CallBacks.OnBeforeRowSelect ? objContext.props.CallBacks.OnBeforeRowSelect(objRowData) : objRowData;
                let blnShowRow = objRowData ? (objContext.props.Meta.Filter ? (new Grid_ComponentProcessor).ShowRow(objRowData, objContext.props.Meta.Filter) : true) : false;
                //Callback to modify row data in module.
                objRowData = blnShowRow ? objContext.props.CallBacks ? (objContext.props.CallBacks.OnBeforeGridRowRender ? objContext.props.CallBacks.OnBeforeGridRowRender(objRowData) : objRowData) : objRowData : null;
                if (objRowData != null) {
                    let objSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows") : {};
                    let objSelectedRowsIndices = ApplicationState.GetProperty("SelectedRowsIndices") ? ApplicationState.GetProperty("SelectedRowsIndices") : {};
                    ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, [objContext.props.Id]: [objRowData] });
                    ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedRowsIndices, [objContext.props.Id]: [intIndex] });
                    objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedRowIndex": intIndex, arrSelectedRows: [objRowData] } });
                    break;
                }
            }
            if (objRowData == null) {
                this.EmptyGridSelection(objContext);
            }
        }
        else {
            this.EmptyGridSelection(objContext);
        }
    }

    /**
    * @name EmptyGridSelection
    * @param {*} objContext
    * @summary clear the data for selection from application state.
    */
    EmptyGridSelection(objContext) {
        let objSelectedRows = ApplicationState.GetProperty("SelectedRows") ? ApplicationState.GetProperty("SelectedRows") : {};
        let objSelectedRowsIndices = ApplicationState.GetProperty("SelectedRowsIndices") ? ApplicationState.GetProperty("SelectedRowsIndices") : {};
        ApplicationState.SetProperty("SelectedRows", { ...objSelectedRows, [objContext.props.Id]: [] })
        ApplicationState.SetProperty("SelectedRowsIndices", { ...objSelectedRowsIndices, [objContext.props.Id]: [] });
        objContext.dispatch({ type: "SET_STATE", payload: { "intSelectedRowIndex": -1, arrSelectedRows: [] } });
    }

    /**
    * @name SelectAdjacentGridRow
    * @param {*} arrRowData
    * @param {*} objContext
    * @summary Te select the adjacent row (used while deleting the row).
    */
    SelectAdjacentGridRow(arrRowData, objContext) {
        if (arrRowData.length == 1) {
            let intSelectedIndex = ApplicationState.GetProperty("SelectedRowIndex") ? ApplicationState.GetProperty("SelectedRowIndex")[objContext.props.Id] : null;
            let intIndexToSelect = -1, objRowData;
            for (var intIndex = intSelectedIndex; intIndex >= 0; intIndex--) {
                objRowData = objContext.props.Data.RowData[intIndex];
                objRowData = objContext.props.CallBacks && objContext.props.CallBacks.OnBeforeRowSelect ? objContext.props.CallBacks.OnBeforeRowSelect(objRowData) : objRowData;
                let blnShowRow = objRowData ? (objContext.props.Meta.Filter ? (new Grid_ComponentProcessor).ShowRow(objRowData, objContext.props.Meta.Filter) : true) : false;
                //Callback to modify row data in module.
                objRowData = blnShowRow ? objContext.props.CallBacks ? (objContext.props.CallBacks.OnBeforeGridRowRender ? objContext.props.CallBacks.OnBeforeGridRowRender(objRowData) : objRowData) : objRowData : null;
                if (objRowData != null) {
                    intIndexToSelect = intIndex
                    break;
                }
            }
            if (intIndexToSelect == -1) {
                for (var intIndex = intSelectedIndex; intIndex < objContext.props.Data.RowData.length; intIndex++) {
                    objRowData = objContext.props.Data.RowData[intIndex];
                    objRowData = objContext.props.CallBacks && objContext.props.CallBacks.OnBeforeRowSelect ? objContext.props.CallBacks.OnBeforeRowSelect(objRowData) : objRowData;
                    let blnShowRow = objRowData ? (objContext.props.Meta.Filter ? (new Grid_ComponentProcessor).ShowRow(objRowData, objContext.props.Meta.Filter) : true) : false;
                    //Callback to modify row data in module.
                    objRowData = blnShowRow ? objContext.props.CallBacks ? (objContext.props.CallBacks.OnBeforeGridRowRender ? objContext.props.CallBacks.OnBeforeGridRowRender(objRowData) : objRowData) : objRowData : null;
                    if (objRowData != null) {
                        intIndexToSelect = intIndex
                        break;
                    }
                }
            }
            if (intIndexToSelect != -1) {
                this.OnClickDisplayRow(intIndexToSelect, objRowData, objContext);
            }
            else {
                this.ResetGridSelection(objContext);
            }
        }
        else {
            this.ResetGridSelection(objContext);
        }
    }

}

export default Grid_ComponentProcessor;