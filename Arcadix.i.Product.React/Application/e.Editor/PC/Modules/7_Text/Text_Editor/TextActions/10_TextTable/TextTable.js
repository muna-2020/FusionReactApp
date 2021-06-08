// react related imports.
import React from 'react';
import ReactDOM from "react-dom";

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//Selection related imports.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

//Text Tables related Actions.
import * as Common from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/11_Common/Common";

// Editor State.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

// Editor State.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name TableClasses
 * @summary this object has different classes for styling the tables based on formatting and coloring
 */
const TableClasses = {
    "00": "texttab-withoutborder-nocoloring",
    "01": "texttab-withoutborder-alternatelyvertical",
    "02": "texttab-withoutborder-alternatelyhorizontal",
    "10": "texttab-withborder-nocoloring",
    "11": "texttab-withborder-alternatelyvertical",
    "12": "texttab-withborder-alternatelyhorizontal",
    "20": "texttab-withmarginntableheader-nocoloring",
    "21": "texttab-withmarginntableheader-alternatelyvertical",
    "22": "texttab-withmarginntableheader-alternatelyhorizontal"
};

/**
 * @name InsertRowAt
 * @param {number} intStatus 0 = insert above , 1 = insert below.
 * @summary insert a row at selected table.
 */
export const InsertRowAt = (intStatus) => {
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.InsertRowAt: Entered");
    /* develblock:end */
    let objActiveClickedElement = Common.GetClickElement();
    if (objActiveClickedElement && objActiveClickedElement.Type && objActiveClickedElement.Type.toLowerCase() === "texttable") {
        let intRowIndex = objActiveClickedElement.Data.RowIndex + intStatus;
        let objTable = objActiveClickedElement.Data.Table;
        let NewRow = objTable.insertRow(intRowIndex);
        // Loop through all the rows and check for the maximum cell count row and get the Cell count.
        let intMaxCellCount = 0;
        let MaxCellRow = objTable.rows[0];
        for (let i = 0; i < objTable.rows.length; i++) {
            if (objTable.rows[i].cells.length > intMaxCellCount) {
                intMaxCellCount = objTable.rows[i].cells.length;
                MaxCellRow = objTable.rows[i];
            }
        }
        for (let i = 0; i < intMaxCellCount; i++) {
            let NewCell = NewRow.insertCell(NewRow.cells.length);
            NewCell.innerHTML = "&nbsp";
            NewCell.width = MaxCellRow.cells[i].width;
            NewCell.height = "21";
            NewCell.setAttribute('vAlign', 'top');
        }
        if (intStatus === 0) {
            Common.UpdateClickElementToStore({ ...objActiveClickedElement, Data: { ...objActiveClickedElement.Data, RowIndex: objActiveClickedElement.Data.RowIndex + 1 } });
        }
    }
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.InsertRowAt: Exited");
    /* develblock:end */
};

/** 
 * @name InsertColumnAt
 * @param {number} intStatus 0 = insert left , 1 = insert right.
 * @summary Insert a new column based on status to the active table.
 */
export const InsertColumnAt = (intStatus) => {
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.InsertColumnAt: Entered");
    /* develblock:end */
    let objActiveClickedElement = Common.GetClickElement();
    if (objActiveClickedElement && objActiveClickedElement.Type && objActiveClickedElement.Type.toLowerCase() === "texttable") {
        let objTable = objActiveClickedElement.Data.Table;
        let cell = objTable.rows[objActiveClickedElement.Data.RowIndex].cells[objActiveClickedElement.Data.CellIndex];
        let intCellIndex = objActiveClickedElement.Data.CellIndex + intStatus;
        let intAveragewidth = 100 / (parseInt(objTable.rows[0].cells.length) + 1); 

        //add a new column to the table.
        for (let i = 0; i < objTable.rows.length; i++) {
            let NewCell = objTable.rows[i].insertCell(intCellIndex);
            NewCell.innerHTML = "&nbsp";
            NewCell.height = "21";
            NewCell.width = intAveragewidth + "%";
            NewCell.className = cell.className;
            NewCell.setAttribute('vAlign', 'top');
            NewCell.setAttribute('version', 'new');
        }
 
        //this update the each column height and width by average width.
        for (let r = 0; r < objTable.rows.length; r++) {
            for (let c = 0; c < objTable.rows[r].cells.length; c++) {
                //if (objTable.rows[r].cells[c].getAttribute("version") !== null && objTable.rows[r].cells[c].getAttribute("version") === "new") {
                    objTable.rows[r].cells[c].width = intAveragewidth + "%";
                    objTable.rows[r].cells[c].removeAttribute("version");
               // }
            }
        }
 
        if (intStatus === 0) {
            Common.UpdateClickElementToStore({ ...objActiveClickedElement, Data: { ...objActiveClickedElement.Data, CellIndex: objActiveClickedElement.Data.CellIndex + 1 } });
        }

    }
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.InsertColumnAt: Exited");
    /* develblock:end */
};

const JTextTable_InsertColumn = (strInsertDirection) => {
    ///<Summary>This Method is used Insert the Column</summary>
    ///<param name="objSrcElement" type="string" optional="false" mayBeNull="false">Source Element</param>
    ///<param name="strDirection" type="string" optional="false" mayBeNull="false">DIrection to Insert(Left,right)</param>
    let objSelection = Selection.GetSelection();
    let objSrcElement = objSelection.GetParent();
    var objElement = objSrcElement;
    var intLeftRightIndex = (strInsertDirection.toUpperCase() == "LEFT") ? -1 : 1;
    var intColSpan = 1;
    if (objElement.length > 0) {
        var objReference = objSrcElement.closest("tr,table,td,tbody");
        switch (objReference.tagName) {
            case 'TABLE': // IF a table is selected, it adds a new column on the right hand side of the table.                                                
                JTextTable_InsertColumnAtGivenIndex(objReference, 0,objReference.rows[0].cells.length, intColSpan, strInsertDirection);
                break;
            case 'TBODY':
                JTextTable_InsertColumnAtGivenIndex(objReference.closest("table"), 0, objReference.rows[0].cells.length, intColSpan, strInsertDirection);
                break;
            case 'TR': // IF a table is selected, it adds a new column on the right hand side of the table.                        
                JTextTable_InsertColumnAtGivenIndex(objReference.closest("table"), 0, objReference.cells.length, intColSpan, strInsertDirection);
                break;
            case 'TD': // IF the cursor is in a cell, or a cell is selected, it adds a new column to the right of that cell.                        
                var intCellIndex = objReference.cellIndex;//Get cellIndex                        
                var intRowIndex = objReference.closest("tr").rowIndex;
                var intIndexToInsert = parseInt(intCellIndex) + parseInt(intLeftRightIndex);
                if (objReference.getAttribute("colSpan") !== null)
                    if (parseInt(objReference.getAttribute("colSpan")) > 1)
                        intColSpan = objReference.getAttribute("colSpan");
                if (intLeftRightIndex == -1)
                    intIndexToInsert = parseInt(intCellIndex);
                JTextTable_InsertColumnAtGivenIndex(objReference.closest("table").get(0), intRowIndex, intIndexToInsert, intColSpan, strInsertDirection);
                break;
            default: // IF the cursor is not in a table, it acts as if they clicked Insert Table.                        
                JTextTable_InsertTable(objSrcElement, { NoOfRows: 3, NoOfColumns: 1, Formatting: 0, Coloring: 0, CellSpace: 1, CellPadding: 1 });
                return;
        }
    }
}

function JTextTable_GetRowWiseStyle(RowWise, intColumnIndex, styleType, intRowIndex, blnLastRow) {
    var strClassName = "";
    if (RowWise == "0") strClassName = "PageOutputContentTableWithoutStyles";
    if (RowWise == "1") {
        if (intColumnIndex % 2 == 0) strClassName = "PageOutputContentTableDataStyle";
        else strClassName = "PageOutputContentTableDataStyleAlternating";
    }
    if (RowWise == "2") {
        if (intRowIndex % 2 == 0) strClassName = "PageOutputContentTableDataStyleAlternating";
        else strClassName = "PageOutputContentTableDataStyle";
    }
    return strClassName;
}

function JTextTable_GetStyleByStyleType(RowWise, intColumnIndex, styleType, intRowIndex, blnLastRow) {
    var strClassName = "";
    if (parseInt(styleType) > 0) {
        if (parseInt(styleType) == 2) {
            if (intRowIndex == 0) strClassName = "PageOutputContentTableTitleStyle";
            else strClassName = JTextTable_GetRowWiseStyle(RowWise, intColumnIndex, styleType, intRowIndex);
        }
    }
    else { if (!blnLastRow) { strClassName = "PageOutputContentCSSTableText"; } else { strClassName = "PageOutputContentCSSTableText"; } }
    return strClassName;
}


const JTextTable_AddClassToTheTable = (objTable) => {
    ///<Summary>This Method is used to Add the css to table cells accordingly</summary>
    ///<param name="objTable" type="string" optional="false" mayBeNull="false">Table</param>

    var intWidth = 50;
    var intadjust = 0;
    var styleType = objTable.getAttribute("ClassType");
    var RowWise = objTable.getAttribute("Rolcolwise");
    if (objTable.find("tr").length > 0) {
        intWidth = parseInt(100 / objTable.rows[0].cells.length);
        intadjust = 100 - (intWidth * objTable.rows[0].cells.length);
    }
    //  $.each($(objTable.rows), function (intRowIndex, objRow) {
    for (let r = 0; r < objTable.rows.length; r++) {
        let objRow = objTable.rows[r];
        let intRowIndex = r;
        var strClassName = "";
        // $.each($($(objRow).get(0).cells), function (intColumnIndex, objCell) {
        for (let c = 0; c < objRow.cells.length; c++) {
            let intColumnIndex = c, objCell = objRow.cells[c];
            if (intColumnIndex < objRow.find("td").length - 1) {
                strClassName = JTextTable_GetStyleByStyleType(RowWise, intColumnIndex, styleType, intRowIndex, false);
                if (strClassName == "")
                    strClassName = JTextTable_GetRowWiseStyle(RowWise, intColumnIndex, styleType, intRowIndex, false);

                objCell.removeClass().addClass(strClassName);
                if (objCell.getAttribute("width") == "")
                    objCell.setAttribute("width", intWidth + "%");
            }
            else {
                strClassName = JTextTable_GetStyleByStyleType(RowWise, intColumnIndex, styleType, intRowIndex, true);
                if (strClassName == "") strClassName = JTextTable_GetRowWiseStyle(RowWise, intColumnIndex, styleType, intRowIndex, true);
                objCell.removeClass().addClass(strClassName);
                if ($(objCell).attr("width") == "")
                    $(objCell).attr("width", intWidth + "%");
            }
        }
      // });
    }
   // });
    return objTable;
};


export const JTextTable_InsertColumnAtGivenIndex = (objParentTable, intRowIndex, intCellIndex, intColSpan, strInsertDirection) => {
    ///<Summary>This Method is used to Insert the Row At the Specified Index</summary>
    ///<param name="objParentTable" type="string" optional="false" mayBeNull="false">Table</param>
    ///<param name="intRowIndex" type="string" optional="false" mayBeNull="false">Row Index</param>
    ///<param name="intCellIndex" type="string" optional="false" mayBeNull="false">Cell Index</param>
    ///<param name="intColSpan" type="string" optional="false" mayBeNull="false">Colspan</param>
    ///<param name="strInsertDirection" type="string" optional="false" mayBeNull="false">Direction to insert column</param>

    var intNewWidth = 20;
    if (objParentTable.getAttribute("Type").toUpperCase() == "TEXTTABLE") {
        var blnPercentage = false;
        if (objParentTable.getAttribute("IsPercentage").toUpperCase() == 'Y') {
            intNewWidth = JTextTable_ResizeColsWidth(objParentTable, 0);
            blnPercentage = true;
        }

        var objElementToFocus = null;
        var strTableId = objParentTable.getAttribute("id");
        objParentTable.rows.forEach(function (objRow, intIndex) {
            let intTempCellIndex = intCellIndex;
            intTempCellIndex = JTextTable_GetCellIndexToInsertColumn(objParentTable, intIndex, intCellIndex, intColSpan, intRowIndex);
            let objNewCell = objParentTable.rows[intIndex].insertCell(intTempCellIndex);
            objNewCell.innerHTML = "&nbsp";
            objNewCell.height = '21';
            if (blnPercentage) objNewCell.width = intNewWidth + "%";
            else objNewCell.width = intNewWidth + "px";
            objNewCell.setAttribute('vAlign', 'top');
        });

        JTextTable_AddClassToTheTable(objParentTable);
       // var intPageId = objParentTable.closest("td[Type='Editor']").getAttribute("PageAccessId");
       // if ($("#divSidebar_" + intPageId).css('display').toUpperCase() == 'BLOCK') EditTableProperties();
    }
}

function JTextTable_ResizeColsWidth(objNewTable, intCellIndex) {
    ///<Summary>This Method is used to Get the Cell index atwhich the cell needs to be inserted</summary>
    ///<param name="objNewTable" type="string" optional="false" mayBeNull="false">Table</param> 
    ///<param name="intCellIndex" type="string" optional="false" mayBeNull="false">Cell Index</param>

    var intWidthOfFirstCol = parseInt($(objNewTable).get(0).rows[0].cells[0].width);
    var intNoOfCols = parseInt($(objNewTable).get(0).rows[0].cells.length);
    var intNoOfRows = parseInt($(objNewTable).get(0).rows.length);
    var intNewWidthOfFirstCol = 0;
    var intNewColWidth = 0; //holds the width for the col 2 b inserted
    var arrColWidths = new Array(intNoOfCols); //holds the width of all the coloumns proportional to the 1st col
    //if table or tbody or tr is selected then insert the new col in the end
    if (intCellIndex == null) intCellIndex = intNoOfCols - 1;

    for (var intIndex = 0; intIndex < intNoOfCols; intIndex++) {
        if (intIndex != intCellIndex) arrColWidths[intIndex] = parseInt($(objNewTable).get(0).rows[0].cells[intIndex].width) / intWidthOfFirstCol;
        //col beside whome the new col has 2 b inserted
        else arrColWidths[intIndex] = 2 * ((parseInt($(objNewTable).get(0).rows[0].cells[intIndex].width)) / intWidthOfFirstCol);
        intNewWidthOfFirstCol += arrColWidths[intIndex];
    }
    intNewWidthOfFirstCol = 100 / intNewWidthOfFirstCol;
    for (var intRowIndex = 0; intRowIndex < intNoOfRows; intRowIndex++) {
        for (intColIndex = 0; intColIndex < intNoOfCols; intColIndex++) {
            if (intColIndex != intCellIndex) {
                if (intNewWidthOfFirstCol) {
                    if ($(objNewTable).find("tr:eq(" + intRowIndex + ")").length > 0) {
                        if ($(objNewTable).get(0).rows[intRowIndex].cells[intColIndex] != null) {
                            $($(objNewTable).get(0).rows[intRowIndex].cells[intColIndex]).attr("width", intNewWidthOfFirstCol * arrColWidths[intColIndex] + "%");
                        }
                    }
                }
            }
            else {
                if (intNewWidthOfFirstCol) {
                    //half coz the width of the new col & col on left of new will have the same width
                    $($(objNewTable).get(0).rows[intRowIndex].cells[intColIndex]).attr("width", intNewWidthOfFirstCol * arrColWidths[intColIndex] / 2 + "%");
                    intNewColWidth = intWidthOfFirstCol * arrColWidths[intColIndex] / 2;
                }
            }
        }
    }
    return intNewColWidth;
};

/**
 * @name ConnectCellToRight
 * @summary update the span of selected cell to the right.
 */
export const ConnectCellToRight = () => {
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.ConnectCellToRight: Entered");
    /* develblock:end */
    let objActiveClickedElement = Common.GetClickElement(); // get active click element from the store
    let objTable = objActiveClickedElement.Data.Table; // dom table element
    let cell = objTable.rows[objActiveClickedElement.Data.RowIndex].cells[objActiveClickedElement.Data.CellIndex]; // active cell of table
    let intNextCellColSpan = 0, intNewColSpan = 0;
    let blnNextCellExist = false;
    if (objTable.rows[objActiveClickedElement.Data.RowIndex].cells[objActiveClickedElement.Data.CellIndex + 1]) { // if next cell exists
        blnNextCellExist = true; // set flag to true
        intNextCellColSpan = Number(objTable.rows[objActiveClickedElement.Data.RowIndex].cells[objActiveClickedElement.Data.CellIndex + 1].getAttribute('colspan')); // get next cell column span
        objTable.rows[objActiveClickedElement.Data.RowIndex].cells[objActiveClickedElement.Data.CellIndex + 1].remove(); // remove the next cell from the dom
    }
    let intActiveCellColSpan = cell.getAttribute('colspan'); // active cell column span
    intNewColSpan = intNextCellColSpan + Number(intActiveCellColSpan); // new column span is sum of next col span and active cell column span
    if (blnNextCellExist) { // update col span only when next cell exist
        if (intNewColSpan === 0) {
            cell.setAttribute('colspan', intNewColSpan + 2); // if new col span is 0 then increase col span by 2
        } else {
            cell.setAttribute('colspan', intNewColSpan + 1); // increase col span by 1
        }
    }
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.ConnectCellToRight: Exited");
    /* develblock:end */
};

/**
  * @name SplitCell
  * @summary this split the selected table cell into two.
  */
export const SplitCell = () => {
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.SplitCell: Entered");
    /* develblock:end */
    let objActiveClickedElement = Common.GetClickElement(); // get active click element from the store
    let objTable = objActiveClickedElement.Data.Table; // dom table element
    let cell = objTable.rows[objActiveClickedElement.Data.RowIndex].cells[objActiveClickedElement.Data.CellIndex]; // active cell of table
    let NewCell = objTable.rows[objActiveClickedElement.Data.RowIndex].insertCell(objActiveClickedElement.Data.CellIndex + 1);
    let NewWidth = cell.width.includes('%') ? ((Number(cell.width.replace('%', "")) / 2) + "%") : ((Number(cell.width.replace('px', "")) / 2) + "px");
    cell.width = NewWidth;
    NewCell.innerHTML = "&nbsp";
    NewCell.height = "21";
    NewCell.width = NewWidth;
    NewCell.setAttribute('vAlign', 'top');
    for (let i = 0; i < objTable.rows.length; i++) { // loop table rows
        if (objActiveClickedElement.Data.RowIndex != i) { // other than active row
            if (objTable.rows[i].cells.length - 1 >= objActiveClickedElement.Data.CellIndex) { // if cell index exceeds active cell index
                for (let j = 0; j < objTable.rows[i].cells.length; j++) {
                    if (j === objActiveClickedElement.Data.CellIndex) {
                        let oldColSpan = Number(objTable.rows[i].cells[j].getAttribute('colspan')) === 0 ? 1 : Number(table.rows[i].cells[j].getAttribute('colspan'));
                        objTable.rows[i].cells[j].setAttribute('colspan', oldColSpan + 1);
                    }
                }
            } else {
                let oldColSpan = Number(objTable.rows[i].cells[objTable.rows[i].cells.length - 1].getAttribute('colspan')) === 0 ? 1 : Number(objTable.rows[i].cells[objTable.rows[i].cells.length - 1].getAttribute('colspan'));
                objTable.rows[i].cells[objTable.rows[i].cells.length - 1].setAttribute('colspan', oldColSpan + 1);
            }
        }
    }
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.SplitCell: Exited");
    /* develblock:end */
};

/**
 * @name ChangeAlignment
 * @param {string} strSide left/right/center.
 * @summary Change alignment of the selected table.
 */
export const ChangeAlignment = (strSide) => {
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.ChangeAlignment: Entered");
    /* develblock:end */
    let objActiveTableData = Common.GetClickElement();
    if (objActiveTableData.Type.toLowerCase() === "texttable") {
        let objTable = objActiveTableData.Data.Table;
        objTable.parentElement.style.justifyContent = strSide;
    }
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.ChangeAlignment: Exited");
    /* develblock:end */
}

/**
 * @name RenderTd
 * @param {number} objCol
 * @param {number} intColumnIndex
 * @param {number} intRowIndex
 * @param {number} tableState
 */
const RenderTd = (objCol, intColumnIndex, intRowIndex, tableState) => {
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.RenderTd: Entered");
    /* develblock:end */
    if (intColumnIndex < tableState.NoOfColumns - 1) {
        if (parseInt(tableState.Formatting) > 0) {
            if (parseInt(tableState.Formatting) == 2) {
                if (intRowIndex === 0) {
                    return (
                        <td width={tableState.Width + "%"} height="21" className="PageOutputContentTableTitleStyle" valign="top" > &nbsp; </td>
                    );
                }
            }
            //Now create the rows & colms of the table
            //If Coloumn wise color pattern is chosed
            if (tableState.Coloring == 1 || tableState.Coloring == 2) {
                if (tableState.intColoring == 1) {
                    //light color row
                    if (intColumnIndex % 2 == 0) {
                        return (
                            <td width={tableState.Width + "%"} height="21" className="PageOutputContentTableDataStyle" valign="top" > &nbsp; </td>
                        );
                        //dark  colore row
                    } else {
                        return (
                            <td width={tableState.Width + "%"} height="21" className="PageOutputContentTableDataStyle" valign="top"> &nbsp; </td>
                        );
                    }
                } else if (tableState.Coloring == 2) {
                    //light color row
                    if (intRowIndex % 2 == 0) {
                        return (
                            <td width={tableState.Width + "%"} height="21" className="PageOutputContentTableDataStyleAlternating" valign="top"> &nbsp; </td>
                        );
                    }
                    //dark  colore row
                    else {
                        return (
                            <td width={tableState.Width + "%"} height="21" className="PageOutputContentTableDataStyle" valign="top"> &nbsp; </td>
                        );
                    }
                }
            }
        } else {
            if (tableState.Coloring == 1) {
                if (intColumnIndex % 2 == 0)
                    return (
                        <td width={tableState.Width + "%"} height="21" className="PageOutputContentTableDataStyleWithoutBorder" valign="top" > &nbsp; </td>
                    );
                else
                    return (
                        <td width={tableState.Width + "%"} height="21" className="PageOutputContentTableDataStyleAlternatingWithoutBorder" valign="top" > &nbsp; </td>
                    );
            } else if (tableState.Coloring == 2) {
                if (intRowIndex % 2 == 0)
                    return (
                        <td width={tableState.Width + "%"} height="21" className="PageOutputContentTableDataStyleAlternatingWithoutBorder" valign="top" > &nbsp; </td>
                    );
                else
                    return (
                        <td width={tableState.Width + "%"} height="21" className="PageOutputContentTableDataStyleWithoutBorder" valign="top">&nbsp; </td>
                    );
            } else {
                return (
                    <td className="PageOutputContentTableDataDefaultStyle" width={tableState.Width + "%"} height="21" valign="top"> &nbsp;</td>
                );
            }
        }
    } else {
        if (parseInt(tableState.Formatting) > 0) {
            if (parseInt(tableState.Formatting) == 2) {
                if (intRowIndex == 0) {
                    return (
                        <td width={tableState.Width + "%"} height="21" className="PageOutputContentTableTitleStyle" valign="top" > &nbsp; </td>
                    );
                }
            }
            if (tableState.Coloring == 0)
                return (
                    <td className="PageOutputContentTableDataDefaultStyle" width={tableState.Width + tableState.Adjust + "%"} height="21" valign="top"> &nbsp; </td>
                );
            else if (tableState.Coloring == 1) {
                if (intColumnIndex % 2 == 0)
                    return (
                        <td width={tableState.Width + tableState.Adjust + "%"} height="21" className="PageOutputContentTableDataStyle" valign="top" >&nbsp; </td>
                    );
                else
                    return (
                        <td width={tableState.Width + tableState.Adjust + "%"} height="21" className="PageOutputContentTableDataStyleAlternating" valign="top" > &nbsp; </td>
                    );
            } else if (tableState.Coloring == 2) {
                if (intRowIndex % 2 == 0) {
                    return (
                        <td width={tableState.Width + tableState.Adjust + "%"} height="21" className="PageOutputContentTableDataStyleAlternating" valign="top" > &nbsp; </td>
                    );
                } else {
                    return (
                        <td width={tableState.Width + tableState.Adjust + "%"} height="21" className="PageOutputContentTableDataStyle" valign="top" > &nbsp; </td>
                    );
                }
            }
        } else {
            if (tableState.Coloring == 1) {
                if (intColumnIndex % 2 == 0)
                    return (
                        <td width={tableState.Width + tableState.Adjust + "%"} height="21" className="PageOutputContentTableDataStyle" valign="top" >  &nbsp; </td>
                    );
                else
                    return (
                        <td width={tableState.Width + tableState.Adjust + "%"} height="21" className="PageOutputContentTableDataStyleAlternating" valign="top"> &nbsp; </td>
                    );
            } else if (tableState.Coloring == 2) {
                if (intRowIndex % 2 == 0)
                    return (
                        <td width={tableState.Width + tableState.Adjust + "%"} height="21" className="PageOutputContentTableDataStyleAlternating" valign="top" >  &nbsp; </td>
                    );
                else
                    return (
                        <td width={tableState.Width + tableState.Adjust + "%"} height="21" className="PageOutputContentTableDataStyle" valign="top" >  &nbsp;   </td>
                    );
            } else
                return (
                    <td className="PageOutputContentTableDataDefaultStyle" height="21" width={tableState.Width + tableState.Adjust + "%"} valign="top" > &nbsp;  </td>
                );
        }
    }
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.RenderTd: Exited");
    /* develblock:end */
};

/**
 * @name RenderTable
 * @param {object} props sent from parent. 
 * @summary this return the text table jsx.
 */
const RenderTable = (props) => {
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.RenderTable: Entered");
    /* develblock:end */
    const { objTableProperties } = props;
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.RenderTable: Exited");
    /* develblock:end */
    const strClassNames = objTableProperties.Formatting === 0
        ? "PageOutputContentTableWithoutStyles"
        : objTableProperties.Formatting === 1 || objTableProperties.Formatting === 2
            ? "PageOutputContentTableWithStyles"
            : "";
   
    return (
        <table
            width="100%"
            ispercentage={objTableProperties.IsPercentage}
            classtype={objTableProperties.Formatting}
            rowcolwise={objTableProperties.Coloring}
            cellPadding={objTableProperties.CellPadding}
            cellSpacing={objTableProperties.CellSpacing}
            formatting={objTableProperties.Formatting}
            coloring={objTableProperties.Coloring}
            type="texttable"
            className={
                !objTableProperties.IsInvisibleTable ? strClassNames + " texttab-withborder-alternatelyhorizontal" : strClassNames
            }
            border={objTableProperties.IsInvisibleTable && objTableProperties.IsInvisibleTable === "Y" ? "0" : "1"}
            style={{ border: !objTableProperties.IsInvisibleTable ? "0px" : "" }}
            isinvisibletable={objTableProperties.IsInvisibleTable ? "Y" : ""}>
            <tbody>
                {// generating rows
                    [...Array(objTableProperties.NoOfRows)].map((objRow, intRowIndex) => {
                        return (
                            <tr valign="top" className={objTableProperties.Formatting === 2 && intRowIndex === 0 ? "PageOutputContentTableWithStylesAndTitle" : ""}>
                                {// generating columns
                                    [...Array(objTableProperties.NoOfColumns)].map(
                                        (objCol, intColumnIndex) => {
                                            return RenderTd(objCol, intColumnIndex, intRowIndex, objTableProperties);
                                        }
                                    )}
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );

};

/**
 * @name GenerateTableProperties
 * @param {object} objDimention
 * @summary this generate the props required for the table.
 */
const GenerateTableProperties = (objDimention) => {
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.GenerateTableProperties: Entered");
    /* develblock:end */
    let objTable = {
        CellPadding: 0,
        CellSpacing: 0,
        Coloring: 2,
        Formatting: 1,
        Id: "",
        IsInvisibleTable: objDimention.TableType === "INVISIBLE" ? "Y" : undefined,
        IsPercentage: "Y",
        TableType: objDimention.TableType,
        MouseOver: true,
        NoOfColumns: objDimention.Cols,
        NoOfRows: objDimention.Rows
    };

    let objTableProperties = {
        ...objTable,
        Coloring: objTable.IsInvisibleTable && objTable.IsInvisibleTable === "Y" ? 0 : objTable.Coloring,
        Formatting: objTable.IsInvisibleTable && objTable.IsInvisibleTable === "Y" ? 0 : objTable.Formatting,
        Width: parseInt(100 / objTable.NoOfColumns),
        Adjust: 100 - parseInt(100 / objTable.NoOfColumns) * objTable.NoOfColumns,
        TextTableId: "table_" + UniqueId.GetUniqueId()
    }
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.GenerateTableProperties: Exited");
    /* develblock:end */
    return objTableProperties;
}

/**
 * @param {object} objDimention  /// dimentions of the  noofcols and noofrows.
 * @summary this creates text table based on dimention.
 */
export const CreateTextTable = (objDimention) => {
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.CreateTextTable: Entered");
    /* develblock:end */
    objDimention = { ...objDimention, Cols: objDimention.intCols, Rows: objDimention.intRows };
    let objSelection = Selection.GetSelection();
    if (objSelection && objSelection != null) {
        let objWrapSpan;
        let objActiveTable = Common.GetActiveWrapDetailFromStore(); // active div tag within element to be rendered
        let strWrapId = "";
        if (objActiveTable && objActiveTable != null && objActiveTable.WrapId) { // wrap detail exist in store.
            strWrapId = objActiveTable.WrapId;
            let objTextEditor = objSelection.GetTextEditor();
            objWrapSpan = objTextEditor.querySelector("span[id='" + strWrapId + "']");
        } else {
            objWrapSpan = document.createElement("span");
            strWrapId = "texttable_" + UniqueId.GetUniqueId();
            Common.UpdateActiveWrapToStore({ "WrapId": strWrapId, "Type": "TextTable" });
            objWrapSpan.id = strWrapId;
            objWrapSpan.style.display = "flex"
            objWrapSpan.setAttribute("type", "texttable");
        }
        objSelection.Range.deleteContents();
        objSelection.Range.insertNode(objWrapSpan);
        if (objWrapSpan && objWrapSpan != null) {
            let objTableProperties = GenerateTableProperties(objDimention);
            ReactDOM.hydrate(RenderTable({ objTableProperties }), objWrapSpan);
        }
    }
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.CreateTextTable: Exited");
    /* develblock:end */
};

/**
 * @name GetTableProperties
 * @summary return table properties.
 * */
export const GetTableProperties = () => {
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.GetTableProperties: Entered");
    /* develblock:end */
    let objActiveTableData = Common.GetClickElement();
    let objActiveTable = objActiveTableData.Data.Table
    let Formatting = objActiveTable.getAttribute('formatting');
    let Coloring = objActiveTable.getAttribute('coloring');
    let CellPadding = objActiveTable.getAttribute('cellpadding');
    let CellSpacing = objActiveTable.getAttribute("cellspacing");
    let IsPercentage = objActiveTable.getAttribute("ispercentage");
    let IsInvisibleTable = objActiveTable.getAttribute("isinvisibletable");
    let arrColumnWidth = [];
    for (let index = 0; index < objActiveTable.rows[0].cells.length; index++) {
        let intWidth = objActiveTable.rows[0].cells[index].width.includes("%") ? objActiveTable.rows[0].cells[index].width.replace("%", "") : objActiveTable.rows[0].cells[index].width.replace("px", "");
        arrColumnWidth = [...arrColumnWidth, intWidth];
    }
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.GetTableProperties: Exited");
    /* develblock:end */
    return {
        Formatting,
        Coloring,
        CellPadding,
        CellSpacing,
        IsPercentage,
        IsInvisibleTable,
        ColumnWidth: [...arrColumnWidth]
    }
};

/**
 * @name SetTableProperties
 * @param {any} objTableProps
 */
export const SetTableProperties = (objTableProps) => {
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.SetTableProperties: Entered");
    /* develblock:end */
    let objActiveTableData = Common.GetClickElement();
    let objActiveTable = objActiveTableData.Data.Table;
    let strClassKey = objTableProps.Formatting + objTableProps.Coloring;
    RemoveClasses(objActiveTable);
    if (!objActiveTable.classList.contains(TableClasses[strClassKey])) {
        // set 100% width if it is percentage else add width = 100%
        if (objTableProps.IsPercentage === "N") {
            objActiveTable.removeAttribute("width");
        } else {
            objActiveTable.setAttribute("width", "100%")
        }
        let strClassFormatClassName =  parseInt(objTableProps.Formatting) === 0 ? "" : "PageOutputContentTableDataStyle";
        for (let k = 0; k < objActiveTable.rows.length; k++) {
            for (let l = 0; l < objActiveTable.rows[k].cells.length; l++) {                  
                    objActiveTable.rows[k].cells[l].className = strClassFormatClassName;             
            }
        }
        if (!(objActiveTable.getAttribute("isinvisibletable") === "Y")) {
            objActiveTable.classList.add(TableClasses[strClassKey]);
            objActiveTable.setAttribute('formatting', objTableProps.Formatting);
            objActiveTable.setAttribute('coloring', objTableProps.Coloring);
        }
        objActiveTable.setAttribute("cellpadding", objTableProps.CellPadding);
        // update the padding for each td of table
        for (let i = 0; i < objActiveTable.rows.length; i++) {
            for (let j = 0; j < objActiveTable.rows[i].cells.length; j++) {
               // objActiveTable.rows[i].cells[j].style.padding = objTableProps.CellPadding + (objTableProps.IsPercentage === "Y" ? "%" : "px");
                objActiveTable.rows[i].cells[j].style.padding = objTableProps.CellPadding + "px";
            }
        }
        objActiveTable.setAttribute("cellspacing", objTableProps.CellSpacing);
        objActiveTable.style.borderSpacing = objTableProps.CellSpacing + "px";
        objActiveTable.setAttribute("ispercentage", objTableProps.IsPercentage);
        // updating the table column width
        for (let k = 0; k < objActiveTable.rows.length; k++) {
            for (let l = 0; l < objActiveTable.rows[k].cells.length; l++) {
                if (objTableProps.IsPercentage === "Y") {
                    objActiveTable.rows[k].cells[l].width = objTableProps.ColumnWidth[l] + "%";
                } else {
                    objActiveTable.rows[k].cells[l].width = objTableProps.ColumnWidth[l] + "px";
                }
            }
        }
    };
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.SetTableProperties: Exited");
    /* develblock:end */
};

/**
 * removes classes from the table if any one of TableClasses present on the table
 * @param {object} objActiveTable 
 */
const RemoveClasses = (objActiveTable) => {
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.RemoveClasses: Entered");
    /* develblock:end */
    for (const key in TableClasses) {
        if (TableClasses.hasOwnProperty(key)) {
            objActiveTable.classList.remove(TableClasses[key]);
        }
    }
    /* develblock:start */
    global.ApplicationLog.Log("TextTable.RemoveClasses: Exited");
    /* develblock:end */
};

/**
 * @name ShowTablePropertySidebar
 * @summary display the table properties sidebar.
 * */
export const ShowTablePropertySidebar = () => {
    let objActiveClickedElement = EditorState.GetProperty("ActiveClickElement");
    if (objActiveClickedElement && objActiveClickedElement.Type && objActiveClickedElement.Type.toLowerCase() === "texttable") {
        const showSidebar = ApplicationState.GetProperty("showSidebar");
        showSidebar({
            SidebarProps: {
                Position: "right",
                SidebarName: "TablePropertiesSidebar",
                Status: 1,
                Header: "Eigenschaften Tabelle",
                Title: "Eigenschaften Tabelle",
                AutoHide: false
            }
        });
    }
}
