// Editor State.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

// Editor State.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

// Base Module Object.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
 * @name TablesTab_ModuleProcessor
 * @summary module processor for Table tab.
 * @param {any} props component props.
 */
class TablesTab_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @param {object} objProps
     * @param {object} objContext
     * @summary entry method to change the state of Insert tab.
     */
    SetState(objProps, objContext) {
        objContext.dispatch({
            type: "SET_STATE",
            payload: { ...objProps }
        })
    }

    /**
     * @name closePositioningTablePopup
     * @param {any} objContext component context object.
     * @summary closes the positioning table popup.
     */
    closePositioningTablePopup(objContext) {
        EditorState.SetProperty("ActiveWrapperSpan"); // remove the ActiveDiv.
        objContext.TablesTab_ModuleProcessor.SetState({ boolShowPositioningTablePopup: false }, objContext)
    }

    /**
     * @name ShowOverlaySidebar
     * @summary display overlay sidebar.
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
    }

    /**
    * @name ShowInsertTablePopup
    * @summary display insert table popup.
    * @param {any} objContext component context object.
    */
    ShowInsertTablePopup(objContext) {
        let boolStatus = objContext.state.boolShowInsertTablePopup ? false : true;
        objContext.TablesTab_ModuleProcessor.SetState({ boolShowInsertTablePopup: boolStatus }, objContext);
    }

    /**
    * @name ShowPositioningTablePopup
    * @summary display positioning table popup.
    * @param {any} objContext component context object.
    */
    ShowPositioningTablePopup(objContext) {
        let boolStatus = objContext.state.boolShowPositioningTablePopup ? false : true;
        objContext.TablesTab_ModuleProcessor.SetState({ boolShowPositioningTablePopup: boolStatus }, objContext);
    }

    /**
     * @name ShowTablePropertySidebar
     * @summary display the table properties sidebar.
     * */
    ShowTablePropertySidebar() {
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

    /**
     * 
     * @param {any} objActive
     */
    UpdateActiveRibbonElement(objActive) {
        EditorState.SetProperty('ActiveRibbonElement', objActive);
    }

    /**
     * @name CloseInsertTablePopup
     * @param {object} objContext { state, dispatch, props, ["TablesTab_ModuleProcessor"] }.
     * @summary closes insert table popup.
     */
    CloseInsertTablePopup(objContext) {
        objContext.TablesTab_ModuleProcessor.SetState({ boolShowInsertTablePopup: false }, objContext)
    }

    ChangeAlignment(position) {
        let CurrentTextRef = EditorState.GetReference("CurrentTextRef");
        CurrentTextRef.current.TextTable.ChangeAlignment(position);
    }

    /**
     * @name InsertRowAbove
     * @summary insert a row above active row (Text Table).
     */
    InsertRowAbove() {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.InsertRowAt(0);
    };

    /**
     * @name InsertRowBelow
     * @summary insert a row below active row (Text Table).
     */
    InsertRowBelow() {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.InsertRowAt(1);
    };

    /**
     * @name InsertColumnLeft
     * @summary insert a column to the left of active column (Text Table) .
     */
    InsertColumnLeft() {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.InsertColumnAt(0);
    };

    /**
     * @name InsertColumnRight
     * @summary insert a column to the right of active column (Text Table). 
     */
    InsertColumnRight() {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.InsertColumnAt(1);
    };

    /**
     * @name ConnectCellToRight
     * @summary connect two cells.
     * */
    ConnectCellToRight() {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.ConnectCellToRight();
    }

    /**
     * @name SplitCell
     * @summary split a cell into two.
     * */
    SplitCell() {
        let refCurrentText = EditorState.GetProperty("CurrentTextRef");
        refCurrentText.current.TextTable.SplitCell();
    }
}
export default TablesTab_ModuleProcessor;