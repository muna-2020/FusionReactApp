// Editor State
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

// Base Module Object
import Base_ModuleObject from '@shared/Framework/BaseClass/Base_ModuleObject';

/**
 * @name Table_ModuleObject
 * @summary module object for Table tab
 * @param {*} props 
 */
class Table_ModuleObject extends Base_ModuleObject {

    constructor() {
        super();
    }

    /**
     * @name closePositioningTablePopup
     * @summary closes the positioning table popup
     * @param {*} objContext 
     */
    closePositioningTablePopup(objContext) {
        let ActiveChangeEvent = EditorState.GetProperty("ActiveChangeEvent");
        ActiveChangeEvent();  // update the changed texteditor html to parent
        EditorState.SetProperty("objActiveTable", undefined); // remove the ActiveDiv
        EditorState.SetProperty("objActiveRibbonElement", undefined); // remove the ActiveRibbonElement
        objContext.dispatch({
            type: "SHOW_POSITIONINGTABLE_POPUP",
            payload: { boolShowPositioningTablePopup: false }
        });
    };

    /**
     * @name TextTable_InsertRowAbove
     * @summary insert a row above active row (Text Table)
    */
    TextTable_InsertRowAbove() {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.InsertRowAt(0);
    };

    /**
     * @name TextTable_InsertRowBelow
     * @summary insert a row below active row (Text Table)
     */
    TextTable_InsertRowBelow() {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.InsertRowAt(1);
    };

    /**
     * @name TextTable_InsertColumnLeft
     * @summary insert a column to the left of active column (Text Table) 
     */
    TextTable_InsertColumnLeft() {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.InsertColumnAt(0);
    };

    /**
     * @name TextTable_InsertColumnRight
     * @summary insert a column to the right of active column (Text Table) 
     */
    TextTable_InsertColumnRight() {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.InsertColumnAt(1);
    };

    /**
     * @name TextTable_ConnectCellToRight
     * @summary connect cell to the right (Text Table) 
     */
    TextTable_ConnectCellToRight() {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.ConnectCellToRight();
    };

    /**
     * @name TextTable_SplitCell
     * @summary split a cell into two (Text Table) 
     */
    TextTable_SplitCell() {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.SplitCell();
    };

    /**
     * @name TextTable_ChangeAlignment
     * @summary Changes table Alignment (Text Table) 
     */
    TextTable_ChangeAlignment(strSide) {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.ChangeAlignment(strSide);
    };
    //============TextTable end


    /**
     * @name ShowOverlaySidebar
     * @summary display overlay sidebar
     */
    ShowOverlaySidebar() {
        const showSidebar = EditorState.GetProperty("showSidebar");
        showSidebar({
            Position: "right",
            SidebarName: "",
            Status: 1,
            Header: "Overlay",
            Title: "Overlay eingeben"
        });
    };

    /**
    * @name ShowInsertTablePopup
    * @summary display insert table popup
    * @param {*} objContext 
    */
    ShowInsertTablePopup(objContext) {
        let boolStatus = objContext.state.Tables.boolShowInsertTablePopup ? false : true;
        objContext.dispatch({
            type: "SHOW_INSERTTABLE_POPUP",
            payload: { boolShowInsertTablePopup: boolStatus }
        });
    };

    /**
    * @name ShowPositioningTablePopup
    * @summary display positioning table popup
    * @param {*} objContext 
    */
    ShowPositioningTablePopup(objContext) {
        let boolStatus = objContext.state.Tables.boolShowPositioningTablePopup ? false : true;
        objContext.dispatch({
            type: "SHOW_POSITIONINGTABLE_POPUP",
            payload: { boolShowPositioningTablePopup: boolStatus }
        });
    };

    /**
     * @name ShowPositioningTablePopup
     * @summary display Table properties sidebar
     * */
    ShowTablePropertySidebar() {
        let objActiveClickedElement = EditorState.GetProperty("ActiveClickedElement");
        if (objActiveClickedElement && objActiveClickedElement.Type && objActiveClickedElement.Type.toLowerCase() === "texttable") {
            const showSidebar = EditorState.GetProperty("showSidebar");
            showSidebar({
                SidebarProps: {
                    Position: "right",
                    SidebarName: "tablepropertiessidebar",
                    Status: 1,
                    Header: "Eigenschaften Tabelle",
                    Title: "Eigenschaften Tabelle",
                    AutoHide: false
                }
            });
        };
    };
}
export default Table_ModuleObject;