//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as Billing_Hook from '@shared/Application/d.Extranet/2_School/Phone/Modules/Billing/Billing_Hook';
import Billing_ModuleProcessor from '@shared/Application/d.Extranet/2_School/Phone/Modules/Billing/Billing_ModuleProcessor';

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
    * @name GetTableData
    * @summary Returns the jsx of Table
    * @returns {object} jsx, React.Fragment
    */
    function GetTableData(arrHeaderData, arrData) {
        return arrData.map(objData => {
            return (
                <>
                    <tr className="heading-area">
                        <td colspan="2">{objData[arrHeaderData[0]]}</td>
                        <td colspan="2">{objData[arrHeaderData[1]]}</td>
                    </tr>
                    <tr>
                        <td>
                            {arrHeaderData[2]}

                        </td>
                        <td>
                            {arrHeaderData[3]}

                        </td>
                        <td>
                            {arrHeaderData[4]}

                        </td>
                        <td>
                            {arrHeaderData[5]}
                        </td>
                    </tr>
                </>
            )
        })
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
                <div className="billing">
                    <div className="billing-title">
                        <span>Konto</span>
                        <img
                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/exclamation_mark.svg")}

                        />
                    </div>

                    <div className="top-head">
                        <div className="dropdwn-title">
                            <span>{Localization.TextFormatter(objTextResource, 'SchoolYear')}</span>
                        </div>
                        <div className="content-dropdown">
                            <WrapperComponent
                                ComponentName={"Dropdown"}
                                Id="BillingSchoolYearPeriod"
                                Data={objSchoolYearPeriodData}
                                Meta={objContext.Billing_ModuleProcessor.GetMetaDataBillingDropdown()}
                                Resource={objContext.Billing_ModuleProcessor.GetResourceDataBillingDropdown()}
                                Events={objContext.Billing_ModuleProcessor.GetEventsDataBillingDropdown(objContext)}
                                ParentProps={{ ...props }}
                            />

                        </div>
                    </div>

                    <div className="table-wrapper">

                        <table className="billing-table-main">
                            <tr>
                                <th colspan="2">{arrPacketData.Header[0]}</th>
                                <th colspan="2">{arrPacketData.Header[1]}</th>
                            </tr>

                            <tbody>
                                {GetTableData(arrPacketData.Header, arrPacketData.Data)}

                            </tbody>
                        </table>

                    </div>
                    <div className="billing-footer-wrapper">
                        <button className="button-brown" onClick={() => { objContext.Billing_ModuleProcessor.LoadData(objContext); }}>{Localization.TextFormatter(objTextResource, 'LoadDataButtonText')}</button>
                        <button className="button-brown" onClick={() => { objContext.Billing_ModuleProcessor.OpenPrintToPdfProgressBarPopup(objContext, objTextResource); }}>{Localization.TextFormatter(objTextResource, 'GeneratePdfText')}</button>
                    </div>

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