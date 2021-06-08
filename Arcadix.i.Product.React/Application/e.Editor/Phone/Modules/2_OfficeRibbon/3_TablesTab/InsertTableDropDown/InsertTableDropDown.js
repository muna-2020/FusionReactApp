//React related imports.
import React, { useState, useRef, useEffect } from 'react';

//Text Action import.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

//In-line Images import
import InsertTableImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/3_TablesTab/InsertTable.gif?in-line';

/**
 * @name InsertTableDropDown
 * @param {object} props props sent by parent.
 * @summary this contins the input table dropdown to insert a new table.
 */
const InsertTableDropDown = (props) => {

    /** 
     * @name [state,changeState]
     * @summary define state and changeState for the component.
     */
    const [state, changeState] = useState({
        boolMouseOver: false,
        objHighlightDimentions: { intHeight: 0, intWidth: 0 },
        objInsertRowNCols: { intRows: 0, intCols: 0 },
        boolPopupClose: false
    });

    const intMaxRow = 8, intMaxCols = 10; // max row and max width of table.
    const cellEvtRef = useRef(null); //  cell ref.

    /**
     * @name InsertTable
     * @param {object} objTable contains table properties.
     * @summary generate a table with given dimention in active TextEditor.
     */
    const InsertTable = (objTable) => {
        let CreateTextTable = TextActions.TextTable.CreateTextTable;
        if (CreateTextTable) {
            CreateTextTable(objTable);
        }
    };

    /**
     * @name useEffect
     * @summary this effect is responsible for generating the table when rows or colums changes in the popup.
     */
    useEffect(() => {
        if (state.objInsertRowNCols.intRows != 0 && state.objInsertRowNCols != 0) {
            if (state.objInsertRowNCols.intRows <= intMaxRow && state.objInsertRowNCols.intCols <= intMaxCols) {
                InsertTable({ ...state.objInsertRowNCols, TableType: props.TableType });  // {intRows : 0, intCols : 0, TableType : "VISIBLE" / "INVISIBLE"}
            }
        }
    }, [state.objInsertRowNCols]);

    /**
     * creation of table inside the TextEditor starts after setting boolMouseOver : true
     * @param {HTML_Event} objEvent 
     */
    const InsertTableMouseOver = (objEvent) => {
        changeState({
            ...state, boolMouseOver: true
        });
    };

    /**
     * table creation at the active TextEditor stops when boolMouseOver: false
     * @param {HTML_Event} objEvent 
     */
    const InsertTableCellEventMouseOut = () => {
        changeState({
            ...state, boolMouseOver: false
        });
    };

    /**
     * update the no of colms and rows to the state 
     * @param {HTML_Event} objEvent 
     */
    const InsertTableCellEventMouseMove = (objEvent) => {
        if (state.boolMouseOver) {
            let intHeight = 0, intWidth = 0, intRows = 0, intColumns = 0;
            let _3c = (document.all) ? event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - 2 : objEvent.pageX;
            let _3d = (document.all) ? event.clientY + document.body.scrollTop + document.documentElement.scrollTop - 2 : objEvent.pageY;
            let _3f = Gettable_position(cellEvtRef.current)[0];
            let _40 = Gettable_position(cellEvtRef.current)[1];
            let _41 = (Math.floor((_3c - _3f) / 19) + 1) * 19;
            let _42 = (Math.floor((_3d - _40) / 19) + 1) * 19;
            intColumns = (Math.floor((_3c - _3f) / 19) + 1);
            intRows = (Math.floor((_3d - _40) / 19) + 1);
            if (intRows <= intMaxRow && intColumns <= intMaxCols) {
                changeState({
                    ...state,
                    objHighlightDimentions: { ...state.objHighlightDimentions, intHeight: _42, intWidth: _41 },
                    objInsertRowNCols: { ...state.objInsertRowNCols, intCols: intColumns, intRows: intRows }
                });
            }
        }
    };

    /**
     * @param {HTML_Event} objEvent 
     * @summary close the inserttable popup.
     */
    const InsertTableCellEventClick = (objEvent) => {
        if (props.onTableDropdown) {
            props.onTableDropdown(state.objInsertRowNCols);
        }
    };

    /**
     * @name UpdateTableTitle
     * @summary display the insert table title with row and cols.
     */
    const UpdateTableTitle = () => {
        let strDefault = " Tabelle einfügen";
        if (state.objInsertRowNCols.intRows === 0 && state.objInsertRowNCols.intCols === 0) {
            return strDefault;
        } else {
            return state.objInsertRowNCols.intCols + "x" + state.objInsertRowNCols.intRows + strDefault;
        }
    };

    /**
     * return the table position
     * @param {HTML_Element} el html element.
     * @returns element position.
     */
    const Gettable_position = (el) => {
        let el_left = 0;
        let el_top = 0;
        if (el.offsetParent) {
            el_left = el.offsetLeft;
            el_top = el.offsetTop;
            while (el = el.offsetParent) { el_left += el.offsetLeft; el_top += el.offsetTop; }
        }
        return [el_left, el_top];
    };

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {any} JSX of the Component.
     */
    const GetContent = () => {
        return (
            <div className="tables-popup show" id="AddTablePopup" style={{ zIndex: 500, left: 0 }}>
                <div className="table-header">
                    {UpdateTableTitle()}
                </div>
                <div className="table-body"
                    onMouseOver={objEvent => InsertTableMouseOver(objEvent)}>
                    <div className="tuple"
                        style={{
                            // background: "transparent url(" + JConfiguration.EditorSkinPath + "/Images/Common/insert-table.png" + ") repeat -406px 0"
                        }}
                        ref={cellEvtRef}
                        onMouseMove={objEvent => InsertTableCellEventMouseMove(objEvent)}
                        onMouseOut={objEvent => InsertTableCellEventMouseOut(objEvent)}
                        onClick={objEvent => InsertTableCellEventClick(objEvent)}>
                        <div className="selected"
                            style={{
                                // background: "transparent url(" + JConfiguration.EditorSkinPath + "/Images/Common/insert-table.png" + ") no-repeat -596px 0",
                                width: state.objHighlightDimentions.intWidth + "px",
                                height: state.objHighlightDimentions.intHeight + "px",
                                visibility: state.boolMouseOver ? "visible" : "hidden"
                            }} >
                        </div>
                    </div>
                </div>
                <div className="table-footer">
                    <WrapperComponent
                        ComponentName={"Image"}
                        Data={{
                            Image: InsertTableImage
                        }}
                        ParentProps={props}
                    />
                    <span>Tabelle</span>
                </div>
            </div>
        );
    };

    return GetContent();
}

export default InsertTableDropDown;