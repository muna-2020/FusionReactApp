//React related imports
import React, { useEffect, useReducer } from "react";

//Base classes/hooks.
import * as TablesTab_Hook from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/3_TablesTab/TablesTab_Hook";

//Module related fies.
import * as TablesTab_MetaData from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/3_TablesTab/TablesTab_MetaData";
import TablesTab_ModuleProcessor from "@shared/Application/e.Editor/Modules/2_OfficeRibbon/3_TablesTab/TablesTab_ModuleProcessor";

// Component used. 
import InsertTableDropDown from '@root/Application/e.Editor/PC/Modules/2_OfficeRibbon/3_TablesTab/InsertTableDropDown/InsertTableDropDown';

//Text Action import.
import * as TextActions from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/TextActions/TextActions";

//Base classes/methods.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Selection related imports.
import {SetActiveTableCursor} from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

/**
 * @name StartTab
 * @param {object} props component props.
 * @summary this tab is Responsible for Tables tab in office ribbon.
 * @returns Component.
 */
const TablesTab = props => {

    /**
     * @summary Gets the state and dispatch for the component.
     * */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, TablesTab_Hook.GetInitialState(props));

    /**
     * @summary Combines the props, state, dispatch and other objects that are required throughout the component.
     * */
    let objContext = { state, dispatch, props, ["TablesTab_ModuleProcessor"]: new TablesTab_ModuleProcessor() }; // objContext.

    /**
     * @name useEffect
     * @summry add click event to the document to close any opened popup.
     * */
    useEffect(() => {
        let objInsertDropDown = {
            boolShowInsertTablePopup: false,
            boolShowPositioningTablePopup: false
        };
        const CloseDropDown = (objEvent) => {
            if(objContext.state.boolShowInsertTablePopup || objContext.state.boolShowPositioningTablePopup ){
                SetActiveTableCursor();
            }
            objContext.TablesTab_ModuleProcessor.SetState(objInsertDropDown, objContext);
        };
        document.addEventListener('click', CloseDropDown, true);
        return () => {
            document.removeEventListener('click', CloseDropDown, true);
        }
    }, [objContext.state]);

    /**
     * @name RenderInsertTableDropDrown
     * @param {string} strType table type.
     * @summary display insert table popup.
     * @returns returns InsertTablePopup component.
     */
    const RenderInsertTableDropDrown = strType => {
        return state.boolShowInsertTablePopup ? (
            <InsertTableDropDown TableType={strType} onTableDropdown={objDimention => objContext.TablesTab_ModuleProcessor.CloseInsertTablePopup(objContext)} />
        ) : ("");
    };

    /**
     * @name RenderPositioningTableDropDown
     * @param {string} strType table type.
     * @summary display positioning table popup.
     * @returns returns InsertTablePopup component.
     */
    const RenderPositioningTableDropDown = strType => {
        return state.boolShowPositioningTablePopup ? (
            <InsertTableDropDown TableType={strType} onTableDropdown={objDimention => objContext.TablesTab_ModuleProcessor.CloseInsertTablePopup(objContext)} />
        ) : ("");
    };

    /**
     * @name useEffect
     * @summary this remove the active wrap detail from the store when InserTableDropDown closes.
     * */
    useEffect(() => {
        if (!state.boolShowInsertTablePopup && TextActions.Common.GetActiveWrapDetailFromStore()) {
            let objWrapDetail = TextActions.Common.GetActiveWrapDetailFromStore();
            if (objWrapDetail.Type && objWrapDetail.Type.toLowerCase() === "texttable") {
                TextActions.Common.RemoveActiveWrapDetailFromStore();
            }
        }
    }, [state.boolShowInsertTablePopup]);

    /**
     * @name useEffect
     * @summary this remove the active wrap detail from the store when InserTableDropDown closes.
     * */
    useEffect(() => {
        if (!state.boolShowPositioningTablePopup && TextActions.Common.GetActiveWrapDetailFromStore()) {
            let objWrapDetail = TextActions.Common.GetActiveWrapDetailFromStore();
            if (objWrapDetail.Type && objWrapDetail.Type.toLowerCase() === "texttable") {
                TextActions.Common.RemoveActiveWrapDetailFromStore();
            }
        }
    }, [state.boolShowPositioningTablePopup]);

    /**
     * @name GetContent
     * @summary Calls the render body function of the common.
     * @returns {JSX} JSX of the Component.
     */
    const GetContent = () => {
        let objImageMeta = TablesTab_MetaData.GetImageMeta();
        return (
            <div className="office-ribbon table-tab editor-office-ribbon" id="EditorOfficeRibbon">
                <div className="ribbon-slider" id="EditorSliderDiv">
                    <div className="tables">
                        <div className="tables-flex">
                            <div className="items" id="AddTable" onClick={objEvent => objContext.TablesTab_ModuleProcessor.ShowInsertTablePopup(objContext)} >
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.TablesImage
                                    }}                                    
                                    ParentProps={props}
                                />
                                <span>  Tables{" "}
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.PullDownArrowImage
                                        }}
                                        ParentProps={props}
                                    />
                                </span>
                                {/* InsertTable Popup */}
                                {RenderInsertTableDropDrown("VISIBLE")}
                            </div>
                            {/* ===========positioning table=========start====== */}
                            <div className="items" onClick={objEvent => objContext.TablesTab_ModuleProcessor.ShowPositioningTablePopup(objContext)}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Position_TablesImage
                                    }}
                                    ParentProps={props}
                                />
                                <span> Positioning table
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.PullDownArrowImage
                                        }}
                                        ParentProps={props}
                                    />
                                </span>
                                {/* InsertTable Popup */}
                                {RenderPositioningTableDropDown("INVISIBLE")}
                            </div>
                            <div className="items" onClick={objEvent => objContext.TablesTab_ModuleProcessor.ShowTablePropertySidebar()}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Table_PropertiesImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Table properties </span>
                            </div>
                            <div className="tables-block">
                                <div className="items" onClick={objEvent => TextActions.TextTable.ChangeAlignment("flex-start")}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.FlushLeftImage
                                        }}
                                        ParentProps={props}
                                    />
                                    <span>Left-align </span>
                                </div>
                                <div className="items" onClick={ojbEvt => TextActions.TextTable.ChangeAlignment("center")}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.FlushCenterImage
                                        }}
                                        ParentProps={props}
                                    />
                                    <span>Centered </span>
                                </div>
                                <div className="items" onClick={objEvent => TextActions.TextTable.ChangeAlignment("flex-end")}>
                                    <WrapperComponent
                                        ComponentName={"Image"}
                                        Data={{
                                            Image: objImageMeta.FlushRightImage
                                        }}
                                        ParentProps={props}
                                    />
                                    <span>Right aligned </span>
                                </div>
                            </div>
                        </div>
                        <div className="bottom-text">Tables</div>
                    </div>
                    <div className="rows-and-columns">
                        <div className="rows-and-columns-flex">
                            <div className="items" onClick={objEvent => TextActions.TextTable.InsertRowAt(0)}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Above_LineImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Line above</span>
                            </div>
                            <div className="items" onClick={objEvent => TextActions.TextTable.InsertRowAt(1)}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Below_LineImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Line below</span>
                            </div>
                            <div className="items" onClick={objEvent => TextActions.TextTable.InsertColumnAt(0)}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Column_LeftImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Left column </span>
                            </div>
                            <div className="items" onClick={objEvent => TextActions.TextTable.InsertColumnAt(1)}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Column_RightImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Right column </span>
                            </div>
                        </div>
                        <div className="bottom-text">Rows and columns</div>
                    </div>
                    <div className="rows-and-columns cell">
                        <div className="rows-and-columns-flex">
                            <div className="items" onClick={objEvent => TextActions.TextTable.ConnectCellToRight()}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Cell_MergeImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Connect cell to the right</span>
                            </div>
                            <div className="items" onClick={objEvent => TextActions.TextTable.SplitCell()}>
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: objImageMeta.Cell_SplitImage
                                    }}
                                    ParentProps={props}
                                />
                                <span>Split cell</span>
                            </div>
                        </div>
                        <div className="bottom-text">Cell</div>
                    </div>
                </div>
            </div>
        );
    };

    /**
     * @summary Calls the GetContent method.
     * */
    return GetContent();
};

export default TablesTab