//React imports
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module specific imports
import * as SchoolDataComparison_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDataComparison/SchoolDataComparison_Hook';
import SchoolDataComparison_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDataComparison/SchoolDataComparison_ModuleProcessor';


/**
* @name SchoolDataComparisonArchive
* @param {object} props props
* @summary This component displays the SchoolDataComparisonArchive data in grid.
* @returns {Element} React.Fragement that encapsulated the display  SchoolDataComparisonArchive details in table.
*/
const SchoolDataComparisonArchive = props => {

    /**
    * @name StateInitializer
    * @summary Provides state and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, SchoolDataComparison_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, props, dispatch and module-object to one object, and sent as a parameter to funtions.
    */
    let objContext = { state, props, dispatch, ["SchoolDataComparison_ModuleProcessor"]: new SchoolDataComparison_ModuleProcessor(), Object_Framework_Services_TextResource };

   /**
     * @name HookInitializer
     * @summary Initialize the hooks.
     */
    SchoolDataComparison_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.SchoolDataComparison_ModuleProcessor.Initialize(objContext, objContext.SchoolDataComparison_ModuleProcessor);

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
    function GetTableData(objData) {
        var arrTableData = objData.Data ? objData.Data.map(objRow => {
            return (
                <tr className={objRow.IsMainSubject == "Y" ? "main-subject" : ""}>
                    {
                        GetTableRowData(objRow, objData.Header)
                    }
                </tr>
            );
        }) : [];
        return arrTableData;
    }

    /**
     * @name GetContent
     * @summary returns the required jsx for component.
     * @returns {Element}
     * */
    function GetContent() {
        let objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/DataComparison", props)
        let arrCycle = DataRef(objContext.props.Object_Intranet_Cycle_Cycle, "Object_Intranet_Cycle_Cycle;iCycleTypeId;" + objContext.SchoolDataComparison_ModuleProcessor.strCycleTypeId + ";cIsArchiveTeacher;Y;cIsActive;Y;cIsDeleted;N")["Data"];
        let objData = {};
        if (Object.keys(state.objData).length == 0) {
            if (DataRef(objContext.props.Extranet_School_SchoolDataComparison_Module) && DataRef(objContext.props.Extranet_School_SchoolDataComparison_Module)["Data"].length > 0)
                objData = DataRef(objContext.props.Extranet_School_SchoolDataComparison_Module)["Data"][0];
        }
        else
            objData = state.objData;

        return (
            <React.Fragment>
                <div className="light-brown-bg data-comparison data-comparison-archive">
                    <div class="top-spacing" id="TopSpacing"></div>
                    <WrapperComponent
                        ComponentName={"FillHeight"}
                        id="SchoolDataComparisonArchive" Meta={objContext.SchoolDataComparison_ModuleProcessor.GetMetaDataFillheightSchoolDataComparison()} ParentProps={{ ...props }}>
                        <div className="top-flex">
                            <div className="fL">
                                <div className="data-archive-top-head" id="BillingTopHead">
                                    <div className="content-dropdown">
                                        <span>{Localization.TextFormatter(objTextResource, 'Cycle')}:</span>
                                        {arrCycle && arrCycle.length > 0 ?
                                            <WrapperComponent
                                                ComponentName={"Dropdown"}
                                                Id="SchoolDataComparisonDropdown"
                                                Meta={objContext.SchoolDataComparison_ModuleProcessor.GetMetaDataSchoolDataComparisonDropdown()}
                                                Data={{
                                                    DropdownData: arrCycle,
                                                    SelectedValue: arrCycle[0]["uCycleId"]
                                                }}
                                                Resource={objContext.SchoolDataComparison_ModuleProcessor.GetResourceDataSchoolDataComparisonDropdown()}
                                                Events={objContext.SchoolDataComparison_ModuleProcessor.GetEventsDataSchoolDataComparisonDropdown(objContext, objTextResource)}
                                                ParentProps={{ ...props }}
                                            /> :
                                            null}
                                    </div>
                                </div>
                            </div>
                            <div className="fR data-archive-top-head-right">
                                <span className="top-right-label-color"> {Localization.TextFormatter(objTextResource, 'TopRightCornerTitle')}</span><br />
                                <span><label className="top-right-label-color"> {Localization.TextFormatter(objTextResource, 'FirstSubTtile')} :</label><span>  {Localization.TextFormatter(objTextResource, 'FirstSubTtileDecription')}</span></span><br />
                                <span><label className="top-right-label-color">  {Localization.TextFormatter(objTextResource, 'SecondSubTtile')}  :</label><span>  {Localization.TextFormatter(objTextResource, 'SecondSubTtileDecription')}</span></span><br />
                            </div>
                        </div>

                        <div className="data-comparison-table-wrapper">
                            <table className="data-comparison-table">{GetTableData(objData)}</table>
                        </div>
                        {
                            state.showMessage ?
                                <div>
                                    {Localization.TextFormatter(objTextResource, 'Message')}
                                </div> : null
                        }

                    </WrapperComponent>
                </div>
                <div className="data-comparison-footer" id="FooterDataComparison">
                    <div />
                    <button className="button brown-button footerBtn" onClick={() => { objContext.SchoolDataComparison_ModuleProcessor.OpenProgressBarPopup(objContext, objTextResource) }}>
                        {Localization.TextFormatter(objTextResource, 'LoadDataButton')}
                    </button>
                    <button className="button brown-button footerBtn" onClick={() => { objContext.SchoolDataComparison_ModuleProcessor.OpenPrintToPdfProgressBarPopup(objContext, objTextResource); }}>
                        {Localization.TextFormatter(objTextResource, 'PrintToPdf')}
                    </button>
                </div>
            </React.Fragment>
        );
    }

    return (
        <div>
            {props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <div></div>}
        </div>
    );
};

///**
// * @name DynamicStyles
// * @summary Css files specific to this module1
// * @param {any} props
// * @returns {Array}
// */
//SchoolDataComparisonArchive.DynamicStyles = props => {
//    return [
//        props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/DataComparison/DataComparison.css",
//        props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Controls/ProgressBar/ProgressBar.css",
//        props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/DataComparisonArchive/DataComparisonArchive.css"
//    ];
//};

///**
// * @name InitialDataParams
// * @summary The method used by SSR to get the initial data params
// * @param {any} props
// * @returns {Array} array of requests.
// */
//SchoolDataComparisonArchive.InitialDataParams = (props) => {
//    return (new ObjectQueue()).Queue((new SchoolDataComparison_ModuleProcessor()).InitialDataParams(props));
//};

/**
 * @name ComponentConnector
 * @summary Connecting Module component to store
 * */
export default connect(ExtranetBase_Hook.MapStoreToProps(SchoolDataComparison_ModuleProcessor.StoreMapList()))(SchoolDataComparisonArchive);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = SchoolDataComparison_ModuleProcessor; 