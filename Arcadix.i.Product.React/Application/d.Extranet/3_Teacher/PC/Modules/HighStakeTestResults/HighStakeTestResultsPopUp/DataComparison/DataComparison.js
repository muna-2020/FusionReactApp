//React imports
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module specific imports
import * as DataComparison_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResultsPopUp/DataComparison/DataComparison_Hook';
import DataComparison_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResultsPopUp/DataComparison/DataComparison_ModuleProcessor';

//Inline Images import
import BigCloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close_big.svg?inline';


/**
* @name DataComparison
* @param {object} props props
* @summary This component displays the DataComparison data in grid.
* @returns {object} React.Fragement that encapsulated the display  DataComparison details in table.
*/
const DataComparison = props => {

    /**
    * @name StateInitializer
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, DataComparison_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, props, dispatch and module-object to one object, and sent as a parameter to funtions.
    */
    let objContext = { state, props, dispatch, ["DataComparison_ModuleProcessor"]: new DataComparison_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
     * @name HookInitializer
     * @summary Initialize the hooks.
     */
    DataComparison_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and Data For SSR
    * @returns Setting ApplicationState
    */
    objContext.DataComparison_ModuleProcessor.Initialize(objContext, objContext.DataComparison_ModuleProcessor);

    /**
     * @name GetTableRowData
     * @summary Function that returns html for all the columns of the table
     * @param {any} objRow
     * @param {any} Header
     * @returns {Array}
     **/
    function GetTableRowData(objRow, Header) {
        let arrTableRowData = Header.map(objColumn => {
            return (
                <td>
                    <span>
                        {objRow[objColumn['ClassTypeName']]}
                    </span>
                </td>
            );
        });
        return arrTableRowData;
    }

    /**
    * @name GetTableData
    * @summary Function that returns html for Initial table data
    * @returns {Array}
    */
    function GetTableData() {
        var arrTableData = state.objData.Data.map(objRow => {
            return (
                <tr>
                    {
                        GetTableRowData(objRow, state.objData.Header)
                    }
                </tr>
            );
        });
        return arrTableData;
    }

    /**
     * @name GetContent
     * @summary returns the required jsx for component.
     * @returns {Element} 
     * */
    function GetContent() {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/DataComparison", props)
        return (
            <React.Fragment>
                <div className="light-brown-bg data-comparison">

                    <WrapperComponent
                        ComponentName={"FillHeight"}
                        Id="DataComparison" Meta={objContext.DataComparison_ModuleProcessor.GetMetaDataFillheightDataComparison()} ParentProps={{ ...props }}>
                        <div className="teacher-dc-header">
                            <img
                                src={BigCloseImage}
                                alt=""
                                className="close-icon"
                                onClick={() => { Popup.ClosePopup(props.Id) }}
                                style={{ float: "right" }}
                            />
                        </div>
                        <div className="top-right-menu">
                            <p className="top-right-label-color">
                                {Localization.TextFormatter(objTextResource, 'TopRightCornerTitle')}
                            </p>
                            <br />
                            <p>
                                <label className="top-right-label-color">
                                    {Localization.TextFormatter(objTextResource, 'TopRightCornerTitle')}:
                                </label>
                                <span>{Localization.TextFormatter(objTextResource, 'TopRightCornerTitle')}</span>
                            </p>
                            <br />
                            <p>
                                <label className="top-right-label-color">
                                    {Localization.TextFormatter(objTextResource, 'TopRightCornerTitle')}:
                                </label>
                                <span>{Localization.TextFormatter(objTextResource, 'TopRightCornerTitle')}</span>
                            </p>
                            <br />
                        </div>

                        <div className="data-comparison-table-wrapper">
                            <table className="data-comparison-table">{GetTableData()}</table>
                        </div>
                    </WrapperComponent>
                </div>
                <div className="data-comparison-footer" id="FooterDataComparison">
                    <div />
                    <button className="button brown-button footerBtn" onClick={() => { objContext.DataComparison_ModuleProcessor.OpenProgressBarPopup(objContext, objTextResource); }}>
                        {Localization.TextFormatter(objTextResource, 'LoadDataButton')}
                    </button>
                    <button className="button brown-button footerBtn" onClick={() => { objContext.DataComparison_ModuleProcessor.OpenPrintToPdfProgressBarPopup(objContext, objTextResource); }}>
                        {Localization.TextFormatter(objTextResource, 'PrintToPdf')}
                    </button>
                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {props.isLoadComplete || state.isLoadComplete ? (GetContent()) : (<React.Fragment />)}
        </React.Fragment>
    );
};

/**
 * @name ComponentConnector
 * @summary Connecting Module component to store
 * */
export default connect(ExtranetBase_Hook.MapStoreToProps(DataComparison_ModuleProcessor.StoreMapList()))(DataComparison);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = DataComparison_ModuleProcessor; 