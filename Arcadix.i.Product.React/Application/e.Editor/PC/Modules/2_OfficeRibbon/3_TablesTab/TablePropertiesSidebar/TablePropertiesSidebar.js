import React, { useReducer, useRef, useEffect } from "react";
import { connect } from 'react-redux';

//Editor State classes.
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

//Base classes/methods.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related imports.
import * as TablePropertiesSidebar_Hooks from '@shared/Application/e.Editor/Modules/2_OfficeRibbon/3_TablesTab/TablePropertiesSidebar/TablePropertiesSidebar_Hooks';
import TablePropertiesSidebar_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/3_TablesTab/TablePropertiesSidebar/TablePropertiesSidebar_ModuleProcessor";

//TextEditor text table actions.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

//Base classes/hooks.
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';  

/**
 * @name TablePropertiesSidebar
 * @param {object} props
 * @summary table property sidebar.
 */
const TablePropertiesSidebar = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     */
    let [state, dispatch] = useReducer(Base_Hook.Reducer, TablePropertiesSidebar_Hooks.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     */
    let objContext = { props, state, dispatch, ["TablePropertiesSidebar_ModuleProcessor"]: new TablePropertiesSidebar_ModuleProcessor() };

    /**
     * @name CheckboxSidebar_Hooks.Initialize
     * @summary Initialize method call in CheckboxSidebar_Hooks, that contains all the custom hooks.
     */
    TablePropertiesSidebar_Hooks.Initialize(objContext);

    let refFormat = useRef(null); // format dropdown ref
    let refColor = useRef(null); // color dropdown ref
    let refCellpadding = useRef(null);// cellpadding ref
    let refCellSpacing = useRef(null);// cellspacing ref

    /**
     * @name  InitializeCss
     * @param {object} props Props
     * @param {object} ModuleProcessor Props
     * @summary Initializing DynamicStyles
     * @returns Setting ApplicationState
     */
    EditorBase_Hook.InitializeCss(props, objContext.TablePropertiesSidebar_ModuleProcessor);

    /** 
     * @name GetActiveTable
     * @summary returns Active clicked element from store.
     */
    const GetActiveTable = () => {
        let objActiveTableData = EditorState.GetProperty("ActiveClickElement");
        return objActiveTableData.Data.Table
    };

    /**
     * @name useEffect.
     * @summary updated the state from the active table.
     */
    useEffect(() => {       
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                ...TextActions.TextTable.GetTableProperties()
            }
        })
    }, []);

    /**
     * @name useEffect.
     * @summary update the table styling when something changes in the properties table to the TextEditor active table.
     */
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            TextActions.TextTable.SetTableProperties(objContext.state);
        }
    }, [objContext.state]);

    /**
     * @name ChangeFormatting.
     * @summary update the format to state.
     * @param {HTML_Event} objEvent. 
     */
    const ChangeFormatting = (objEvent) => {
        objContext.dispatch({ type: "SET_STATE", payload: { Formatting: refFormat.current.value } });
    };

    /** 
     * @name ChangeColoring.
     * @summary change the coloring
     * @param {HTML_Event} objEvent.
     */
    const ChangeColoring = (objEvent) => {
        objContext.dispatch({ type: "SET_STATE", payload: { Coloring: refColor.current.value } });
    };

    /**
     * @name OnCellOutsideDistanceChange
     * @param {HTML_Event} objEvent event.
     * @summary update the new cell outside distance to state.
     */
    const OnCellOutsideDistanceChange = (objEvent) => {
        objContext.dispatch({ type: "SET_STATE", payload: { CellSpacing: refCellSpacing.current.value } });
    };

    /**
     * @name OnCellPadingChange
     * @param {HTML_Event} objEvent event.
     * @summary update the cell pading.
     */
    const OnCellPadingChange = (objEvent) => {
        objContext.dispatch({ type: "SET_STATE", payload: { CellPadding: refCellpadding.current.value } });
    };

    /**
     * @name OnPercentCheck
     * @param {HTML_Event} objEvent event.
     * @summary update percent check status to state.
     */
    const OnPercentCheck = (objEvent) => {
        objEvent.persist();
        objContext.dispatch({ type: "SET_STATE", payload: { IsPercentage: objEvent.target.checked ? "Y" : "N" } });
    };

    /**
    * @name OnPixelCheck
    * @param {HTML_Event} objEvent
    * @summary update the pixel check status to state.
    */
    const OnPixelCheck = (objEvent) => {
        objEvent.persist();
        objContext.dispatch({ type: "SET_STATE", payload: { IsPercentage: objEvent.target.checked ? "N" : "Y" } });
    };

    /**
     * @param {HTML_Event} objEvent event.
     * @param {number} intIndex
     * @summary update column width to state.
     */
    const OnColumnWidthChange = (objEvent, intIndex) => {
        objEvent.persist();
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                ColumnWidth: [...objContext.state.ColumnWidth.map((item, index) => {
                    if (intIndex === index) {
                        return objEvent.target.value;
                    } else {
                        return item;
                    }
                })]
            }
        });
    };

    /**
     * @name GenerateColumnList
     * @summary Generate the column list jsx.
     */
    const GenerateColumnList = () => {
        let objActiveTable = GetActiveTable();
        let objFirstTr = objActiveTable.rows[0];
        return (
            <React.Fragment>
                {
                    objContext.state.ColumnWidth.map((objItem, intIndex) => {
                        return (<div className="properties-block">
                            <span>Spalte {Number(intIndex + 1)}: </span>
                            <input type="text"  onChange={(objEvent) => OnColumnWidthChange(objEvent, intIndex)}  value={objItem} /></div>)
                          })
                }
            </React.Fragment>
        )
    };

    /**
    * @name GetContent
    * @summary returns the common jsx of the table properties sidebar.
    * @returns {any} JSX of the Component.
    */
    const GetContent = () => {
        let objTextResource = objContext.props["Object_Framework_Services_TextResource;Id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/e.Editor/Modules/2_OfficeRibbon/3_Tables/TablePropertiesSidebar"].Data[0]["TablePropertiesSidebar"];
        return (
            <div className="table-properties-wrapper">
                <div className="table-properties">
                    <h3>{objContext.TablePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "characteristics")}</h3>

                    {
                        objContext.state.IsInvisibleTable && objContext.state.IsInvisibleTable === "Y" ? ""
                            : <React.Fragment>
                                {/* formating */}
                                <div className="properties-flex"><span>{objContext.TablePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "Formatting")}:</span>
                                    <select ref={refFormat} onChange={objEvent => ChangeFormatting(objEvent)}>
                                        <option selected={objContext.state.Formatting === "0" ? true : false} value="0">Without border</option>
                                        <option selected={objContext.state.Formatting === "1" ? true : false} value="1">With edge</option>
                                        <option selected={objContext.state.Formatting === "2" ? true : false} value="2">With margin and table header</option>
                                    </select>
                                </div>
                                {/* formating */}
                                {/* coloring */}
                                <div className="properties-flex"><span>{objContext.TablePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "Coloring")}:</span>
                                    <select ref={refColor} onChange={objEvent => ChangeColoring(objEvent)}>
                                        <option selected={objContext.state.Coloring === "0" ? true : false} value="0">No coloring</option>
                                        <option selected={objContext.state.Coloring === "1" ? true : false} value="1">Alternately vertical</option>
                                        <option selected={objContext.state.Coloring === "2" ? true : false} value="2">Alternately horizontally</option>
                                    </select>
                                </div>
                                {/* coloring */}
                            </React.Fragment>
                    }                    
                    {/* cell spacing */}
                    <div className="properties-flex"><span>{objContext.TablePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "Cells_Outside_Distance")}:</span><input ref={refCellSpacing} onChange={objEvent => OnCellOutsideDistanceChange(objEvent)} value={objContext.state.CellSpacing} type="text" name="" id="" /></div>
                    {/* cell padding */}
                    <div className="properties-flex"><span>{objContext.TablePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "Cell_Padding")}:</span><input ref={refCellpadding} onChange={objEvent => OnCellPadingChange(objEvent)} value={objContext.state.CellPadding} type="text" name="" id="" /></div>
                </div>
                <div className="check-box-flex">
                    <div className="checkbox-inline"><input type="checkbox" checked={objContext.state.IsPercentage === "Y" ? "Checked" : ""} onChange={OnPercentCheck} name="" id="" /><span>{objContext.TablePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "Percent")}</span></div>
                    <div className="checkbox-inline"><input type="checkbox" checked={objContext.state.IsPercentage === "N" ? "Checked" : ""} onChange={OnPixelCheck} name="" id="" /><span>{objContext.TablePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "Pixel")}</span></div>
                </div>
                <h3>{objContext.TablePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "Columns")}</h3>
                <div className="spalten-block">
                    {
                        GenerateColumnList()
                    }
                </div>
                <div className="button-right">
                    <button className="btn"
                        onClick={evt => props.HideSidebar()}>
                        {objContext.TablePropertiesSidebar_ModuleProcessor.TextFormatter(objTextResource, "Apply")}
                </button>
                </div>
            </div>

        )
    }
    return state.isLoadComplete ? GetContent() : "";
};

export default connect(Base_Hook.MapStoreToProps(TablePropertiesSidebar_ModuleProcessor.StoreMapList()))(TablePropertiesSidebar);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TablePropertiesSidebar_ModuleProcessor; 