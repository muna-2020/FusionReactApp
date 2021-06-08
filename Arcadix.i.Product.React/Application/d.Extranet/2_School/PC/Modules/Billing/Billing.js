//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as Billing_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/Billing/Billing_Hook';
import Billing_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/Billing/Billing_ModuleProcessor';

/**
* @name Billing
* @param {object} props props
* @summary This component displays the Billing data in grid and let us manipulate those data.
* @returns {object} div that encapsulated the grid with Teacher details.
*/
const Billing = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Billing_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Billing", ["Billing_ModuleProcessor"]: new Billing_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Billing_ModuleProcessor.Initialize(objContext, objContext.Billing_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Billing_Hook, that contains all the custom hooks.
    * @returns null
    */
    Billing_Hook.Initialize(objContext);

    /**
    * @name GetTableRowData
    * @param {object} objRow Row object
    * @param {object} Header Header
    * @summary Returns the jsx of row
    * @returns {object} jsx, React.Fragment
    */
    function GetTableRowData(objRow, Header, objTextResource) {
        let strExcelGenerationLink = objContext.Billing_ModuleProcessor.GetExcelGenerationLink(objContext, objRow, objTextResource);
        let arrTableRowData = Header.map((objColumn, index) => {
            return (
                <td>
                    <span>
                        {objRow[objColumn]}
                        {
                            index == 2 && objRow[objColumn] != undefined ?
                                <a href={strExcelGenerationLink}>
                                    <img
                                        src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/Excel_icon.gif"}
                                        alt=""
                                    />
                                </a>
                                : <React.Fragment />
                        }
                    </span>
                </td>
            );
        });
        return arrTableRowData;
    }

    /**
    * @name GetTableData
    * @summary Returns the jsx of Table
    * @returns {object} jsx, React.Fragment
    */
    function GetTableData(arrPacketData, objTextResource) {

        if (props.Extranet_School_Billing_Module === undefined || state.objData === undefined)
            return <tr />;
        else {

            var arrTableData = arrPacketData.Data ? arrPacketData.Data.map(objRow => {
                return (
                    <tr>
                        {
                            GetTableRowData(objRow, arrPacketData.Header, objTextResource)
                        }
                    </tr>
                );
            }) : [];
            return arrTableData;
        }

    }

    /**
    * @name GetHeaderRow
    * @summary Returns the jsx of Header
    * @returns {object} jsx, React.Fragment
    */
    function GetHeaderRow() {
        if (state.objData === undefined || props.Extranet_School_Billing_Module === undefined)
            return <thead />;
        else {
            var arrTemp = props.Extranet_School_Billing_Module && props.Extranet_School_Billing_Module.Data ? props.Extranet_School_Billing_Module.Data[0] : [];
            if (state !== undefined && state.objData && Object.keys(state.objData).length > 0)
                arrTemp = state.objData[0];
            return (
                <thead>
                    <tr>
                        {
                            arrTemp.Header && arrTemp.Header.map(objColumn => {
                                return (
                                    <td>
                                        {objColumn}
                                    </td>
                                );
                            })
                        }
                    </tr>
                </thead>
            );
        }
    }

    /**
    * @name GetContent
    * @param {objContext} objContext Passes Context object
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Billing", props);
        let arrSchoolYearPeriodData = DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        let strSchoolYearPeriodId = "";
        if (arrSchoolYearPeriodData === undefined)
            arrSchoolYearPeriodData = [];
        else
            strSchoolYearPeriodId = state.objSchoolYearDropdown ? state.objSchoolYearDropdown["uSchoolYearPeriodId"] : arrSchoolYearPeriodData[0]["uSchoolYearPeriodId"];

        let objSchoolYearPeriodData = {
            DropdownData: arrSchoolYearPeriodData,
            SelectedValue: strSchoolYearPeriodId
        };

        let strUseQuerystring = QueryString.GetQueryStringValue('UseQueryString');
        let arrPacketData = props.Extranet_School_Billing_Module && props.Extranet_School_Billing_Module.Data ? props.Extranet_School_Billing_Module.Data[0] : [];
        if (state !== undefined && state.objData && Object.keys(state.objData).length > 0)
            arrPacketData = state.objData[0];
        return (
            <React.Fragment >
                <div className="light-brown-bg billing-main-wrapper">
                    <div className="top-spacing" id="TopSpacing" />
                    <div className="billing-header" id="BillingHeader">
                        <p className="top-right-label-color">
                            {Localization.TextFormatter(objTextResource, 'FirstLineText')}
                        </p>
                        {
                            objContext.props.JConfiguration.MainClientId == "115"
                                ?
                                <div>
                                    <p>
                                        {Localization.TextFormatter(objTextResource, 'SecondLineText')}
                                    </p>
                                    <br />
                                </div>
                                : <div></div>
                        }
                    </div>
                    {/*strUseQuerystring == "Y" ? <React.Fragment />*/} < div className="billing-top-head" id="BillingTopHead">
                        <span>{Localization.TextFormatter(objTextResource, 'SchoolYear')}</span>
                        <div className="content-dropdown">
                            <PerformanceProfiler ComponentName={'BillingSchoolYearPeriod'} JConfiguration={props.JConfiguration} >
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    Id="BillingSchoolYearPeriod"
                                    Data={objSchoolYearPeriodData}
                                    Meta={objContext.Billing_ModuleProcessor.GetMetaDataBillingDropdown()}
                                    Resource={objContext.Billing_ModuleProcessor.GetResourceDataBillingDropdown()}
                                    Events={objContext.Billing_ModuleProcessor.GetEventsDataBillingDropdown(objContext)}
                                    ParentProps={{ ...props }}
                                />
                            </PerformanceProfiler>
                        </div>
                    </div>

                    <div className="billing-data">
                        <WrapperComponent
                            ComponentName={"FillHeight"} Id="Billing" Meta={objContext.Billing_ModuleProcessor.GetMetaDataFillheightBilling()} ParentProps={{ ...props }}>
                            <table className="">
                                {GetHeaderRow()}
                                {GetTableData(arrPacketData, objTextResource)}
                            </table>
                            {arrPacketData.Data == undefined || arrPacketData.Data.length == 0 ? <div className="no-data-overlay">{Localization.TextFormatter(objTextResource, 'NoDataMessage')}</div> : <React.Fragment />}
                        </WrapperComponent>
                    </div>

                </div>

                <div className="billing-footer" id="FooterBilling">
                    <div />
                    {
                        //arrPacketData.Data && arrPacketData.Data.length > 0 ?
                        <React.Fragment>
                            <button
                                className="button brown-button footerBtn"
                                onClick={() => { objContext.Billing_ModuleProcessor.LoadData(objContext); }}>
                                {Localization.TextFormatter(objTextResource, 'LoadDataButtonText')}
                            </button>

                            <button className="button brown-button footerBtn" onClick={() => { objContext.Billing_ModuleProcessor.OpenPrintToPdfProgressBarPopup(objContext, objTextResource); }}>
                                {Localization.TextFormatter(objTextResource, 'GeneratePdfText')}
                            </button></React.Fragment>
                        //: <React.Fragment />
                    }
                </div>
            </React.Fragment>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(Billing_ModuleProcessor.StoreMapList()))(Billing);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Billing_ModuleProcessor; 