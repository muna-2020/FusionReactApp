// React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as Grid_Hook from '@shared/Framework/Blocks/Grid/Grid_Hook';
import Grid_ComponentProcessor from '@shared/Framework/Blocks/Grid/Grid_ComponentProcessor';

//Components used in module.
import HeaderRow from '@root/Framework/Blocks/Grid/1.HeaderRow/HeaderRow';
import Footer from '@root/Framework/Blocks/Grid/3.Footer/Footer';
import DataRow from '@root/Framework/Blocks/Grid/2.DataRow/DataRow';
import EditableRow from '@root/Framework/Blocks/Grid/2.DataRow/EditableRow/EditableRow';
//import FillHeight from "@root/Framework/Controls/FillHeight/FillHeight";

//Helper File.
import * as Localization from "@root/Framework/Blocks/Localization/Localization";
//Drag drop Related files
import DragZone from '@root/Framework/Controls/DragDrop/DragZone/DragZone';


/**
* @name Grid
* @param {object} props props
* @summary This component displays the Data sent by the component in the Grid format.
* @returns {object} returns a jsx with provied data that will be displayed in it.
*/
const Grid = props => {

    /**
    * @name refRows
    * @summary ref object to hold the reference of the Rows created
    */
    const refRows = useRef({});

    const refIsEditMode = useRef(false);

    /**
    * @name UpdateRef
    * @summary ref object to hold the reference of the Rows created
    */
    const UpdateRef = (refRows) => {
        refRows = refRows;
    }

    /**
    * @name UpdateRef
    * @summary ref object to hold the reference of the Rows created
    */
    const UpdateIsEditRef = (refIsEditMode) => {
        refIsEditMode = refIsEditMode;
    }

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Grid_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["Grid_ComponentProcessor"]: new Grid_ComponentProcessor(), refRows, UpdateRef, UpdateIsEditRef,refIsEditMode };

    objContext.Grid_ComponentProcessor.Initialize(objContext, objContext.Grid_ComponentProcessor);

    /**
    * @name Initialize
    * @param {*} objContext
    * @summary Initializes hook
    */
    Grid_Hook.Initialize(objContext);

    /**
    * @name GetNewRow
    * @summary Returns newly added row on Add Click
    * @returns {object} React.Fragement that encapsulated the New Row.
    * */
    const GetNewRow = (refRows, refIsEditMode) => {
        const refRow = React.createRef();
        refRows.current[-2] = refRow;
        var domNewRow = <EditableRow
            Meta={{
                ...props.Meta,
            }}
            Data={{
                RowData: objContext.Grid_ComponentProcessor.GetDateFormattedRowData(state.objNewRow, objContext),
                RowActionButtons: props.Data.RowActionButtons,
                DropDownData: props.Data.DropDownData,
                IsNewRow: true
            }}
            Resource={props.Resource}
            Events={{
                OnClickRow: (strType, objRowData) => objContext.Grid_ComponentProcessor.OnClickRow(strType, objRowData, -2, objContext, refRows, refIsEditMode),
            }}
            CallBacks={{
                OnClickRow: (strType, objRowData) => objContext.Grid_ComponentProcessor.OnClickRow(strType, objRowData, -2, objContext, refRows, refIsEditMode),
                CheckEditMode: () => objContext.Grid_ComponentProcessor.CheckEditMode(objContext),
                OnBeforeEditRow: props.CallBacks ? props.CallBacks.OnBeforeEditRow : null
            }}
            ParentProps={{ ...props, ...props.ParentProps }}
            ImageMeta={props.ImageMeta != undefined ? { ...props.ImageMeta } : undefined} 
            ref={refRow}
        />
        return domNewRow;
    }

    /**
    * @name GetRows
    * @summary Loops through the RowData to call the Row
    * Returns the jsx for Rows
    * @returns {object} React.Fragement that encapsulated the Rows.
    * */
    const GetRows = (refRows, refIsEditMode) => {
        let arrLanguageIds = props.Data.LanguageData ? props.Data.LanguageData.map(obj => obj["iFrameworkLanguageId"]) : [];
        let arrRowData = [];
        if (props.Meta.Filter) {
            arrRowData = props.Data.RowData.filter(objRowData => objContext.Grid_ComponentProcessor.ShowRow(objRowData, props.Meta.Filter));
        }
        refRows.current.PreviuosSelectedRowIndex = refRows.current.SelectedRowIndex ? refRows.current.SelectedRowIndex : -1;
        let blnFirstValidIndex = false;
        return (
            <React.Fragment>
                {
                    (props.Data.RowData !== undefined && props.Data.RowData.length > 0) ?
                        props.Data.RowData.map((objRowData, intIndex) => {
                            let GridRowData = objContext.props.CallBacks && objContext.props.CallBacks.OnBeforeRowSelect ? objContext.props.CallBacks.OnBeforeRowSelect(objRowData) : objRowData;
                            const refRow = React.createRef();
                            refRows.current[intIndex] = refRow;
                            let blnShowRow = props.Meta.Filter ? objContext.Grid_ComponentProcessor.ShowRow(objRowData, props.Meta.Filter) : true;
                            //Callback to modify row data in module.
                            objRowData = blnShowRow ? props.CallBacks ? (props.CallBacks.OnBeforeGridRowRender ? props.CallBacks.OnBeforeGridRowRender(objRowData) : objRowData) : objRowData : null;
                            if (objRowData) {
                                if (!blnFirstValidIndex) {
                                    if (!refRows.current.SelectedRowIndex || refRows.current.SelectedRowIndex == -1) { //To check if we have a selection already, 
                                        refRows.current.SelectedRowIndex = intIndex;
                                    }   
                                    blnFirstValidIndex = true;
                                }
                                let blnIsSelected = objContext.Grid_ComponentProcessor.CheckRowSeleceted(objContext, objRowData);
                                let blnIsChecked = state.arrCheckedIndices.includes(intIndex);
                                if (blnIsSelected)
                                    refRows.current.SelectedRowIndex = intIndex;
                                return <DataRow
                                    Meta={{
                                        ...props.Meta,
                                        IsRowSelected: blnIsSelected,//Only For Display Grid
                                        IsRowChecked: blnIsChecked, //Only For Display Grid
                                    }}
                                    Data={{
                                        RowData: props.Meta.EditableGrid ? objContext.Grid_ComponentProcessor.GetDateFormattedRowData(objRowData, objContext) : objRowData,
                                        GridRowData,
                                        DropDownData: props.Data.DropDownData,
                                        LanguageIds: arrLanguageIds, //Only For Display Grid
                                        IsHierarchicalGrid: props.Data.IsHierarchicalGrid,
                                    }}
                                    Resource={props.Resource}
                                    Events={{
                                        OnContextMenuClick: props.Events && props.Events.OnContextMenuClick ? props.Events.OnContextMenuClick : () => { },
                                        OnClickEditableRow: (strType, objRowData) => objContext.Grid_ComponentProcessor.OnClickRow(strType, objRowData, intIndex, objContext, refRows, refIsEditMode),
                                        OnClickDisplayRow: (event) => objContext.Grid_ComponentProcessor.OnClickDisplayRow(intIndex, GridRowData, objContext, event),//Only For Display Grid
                                        OnDoubleClick: props.Events && props.Events.OnDoubleClick ? props.Events.OnDoubleClick : () => { },
                                        OnContextMenuClick: (event) => objContext.Grid_ComponentProcessor.OnContextMenuClick(intIndex, GridRowData, objContext, event),
                                        OnCheckBoxChange: (event) => objContext.Grid_ComponentProcessor.HandleCheck(intIndex, blnIsChecked, objContext, GridRowData),//Only For Display Grid
                                        OnCollapseClick: props.Events && props.Events.OnCollapseClick ? props.Events.OnCollapseClick : () => { },

                                    }}
                                    CallBacks={{
                                        CheckEditMode: () => objContext.Grid_ComponentProcessor.CheckEditMode(objContext),
                                    }}
                                    ParentProps={{ ...props, ...props.ParentProps }}
                                    ImageMeta={props.ImageMeta != undefined ? { ...props.ImageMeta } : undefined} 
                                    ref={refRow}
                                />
                            }
                            else {
                                return <React.Fragment />
                            }
                        })
                        :
                        <React.Fragment />
                }
            </React.Fragment>
        );
    }

    /**
    * @name GetGrid
    * @summary Forms The Headrer Block,SubHeader, Rows and Footer.
    * Empty Message is shown in case of no row Data.
    * @returns {object} JSX for Grid
    */
    const GetContent = () => {

        let GridWithoutDragDrop = <div className={props.Meta.EditableGrid ? "editable-grid" : "display-grid"}>
            <FillHeight id={"FillHeight_" + props.Id}
                Meta={{
                    HeaderIds: props.Data.AdditionalPaddingIds ? [...props.Data.AdditionalPaddingIds, "MasterHeader", "BreadCrumb", "filterHeader"] : ["MasterHeader", "BreadCrumb", "filterHeader"],
                    FooterIds: ["GridFooter", "OfflineExecution"]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
                ParentProps={{ ...props }}
            >
                <table className="grid-table" >
                    <thead>
                        <HeaderRow
                            Meta={{
                                ...props.Meta,
                                Checked: state.blnAllCheckBox,
                                ShowLanguageHeader: objContext.Grid_ComponentProcessor.ShowLanguageHeader(objContext),
                                EditMode: refIsEditMode.current
                            }}
                            Data={{
                                LanguageData: props.Data.LanguageData,
                                IsHierarchicalGrid: props.Data.IsHierarchicalGrid,
                                HierarchicalGridHeaderText: props.Data.HierarchicalGridHeaderText
                                //IsHierarchicalJsx: props.Data.IsHierarchicalJsx
                            }}
                            Resource={props.Resource}
                            Events={{
                                HandleAllCheck: (event) => { objContext.Grid_ComponentProcessor.HandleAllCheck(objContext) },
                                OnHeaderButtonClick: (objButtonData, event) => { objContext.Grid_ComponentProcessor.OnHeaderButtonClick(objButtonData, objContext, refIsEditMode) }
                            }}
                            ParentProps={{ ...props, ...props.ParentProps }}
                            ImageMeta={props.ImageMeta != undefined ? { ...props.ImageMeta } : undefined} 
                        />
                    </thead>
                    <tbody>

                        {state.objNewRow ? GetNewRow(refRows, refIsEditMode) : <React.Fragment />}
                        {GetRows(refRows, refIsEditMode)}
                    </tbody>
                </table>
                {/*Empty Message */}
                {props.Data.RowData !== undefined && props.Data.RowData.length == 0 && !refIsEditMode.current || (objContext.Grid_ComponentProcessor.GetActiveRowCount(objContext) == 0) && (state.objNewRow == undefined || !state.objNewRow.IsNewRow) ? <div className="no-data-overlay">{Localization.TextFormatter(props.Resource.Text, "EmptyMessage")}</div> : <React.Fragment />}
            </FillHeight>
            {!props.Meta.EditableGrid ?
                <div id="GridFooter">
                    <Footer {...props}
                        //Id="GridFooter"
                        Data={{
                            ...props.Data,
                            Count: objContext.Grid_ComponentProcessor.GetActiveRowCount(objContext)
                        }}
                    />
                </div>
                : <React.Fragment />}
        </div>
        return (
            props.Meta.AllowDragDrop
                ?
                <DragZone {...objContext.Grid_ComponentProcessor.GetDragDropProps(objContext)}>
                    {GridWithoutDragDrop}
                </DragZone>
                :
                GridWithoutDragDrop
        );
    }

    /**
    * JSX of display grid
    */
    return GetContent();
};

export default connect(Grid_ComponentProcessor.StoreMapList)(Grid);