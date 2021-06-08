//React related imports.
import React from 'react';

//Module 
import BillingPrintToPDF_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/BillingPrintToPDF/BillingPrintToPDF_ModuleProcessor';

/**
* @name BillingPrintToPDF
* @param {object} props props
* @summary This component displays the Billing data in grid and let us manipulate those data.
* @returns {object} div that encapsulated the grid with Teacher details.
*/
const BillingPrintToPDF = props => {

    let objContext = { props, BillingPrintToPDF_ModuleProcessor: new BillingPrintToPDF_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.BillingPrintToPDF_ModuleProcessor.Initialize(objContext, objContext.BillingPrintToPDF_ModuleProcessor);

    /**
    * @name GetTableRowData
    * @param {object} objRow Row object
    * @param {object} Header Header
    * @summary Returns the jsx of row
    * @returns {object} jsx, React.Fragment
    */
    function GetTableRowData(objRow, Header) {
        let arrTableRowData = Header.map(objColumn => {
            return (
                <td style={{ "padding": "8px 13px", "border": "1px solid gainsboro", "background": "#f7f7f7", "fontSize": "12px", "fontFamily": "Times", "color": "#222" }}>
                    <span>
                        {objRow[objColumn]}
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
    function GetTableData() {
        let arrSchoolBilling = { Data: [], Header: [] };
        if (DataRef(props.Extranet_School_Billing_Module)) {
            arrSchoolBilling = DataRef(props.Extranet_School_Billing_Module)["Data"][0];
        }
        var arrTableData = arrSchoolBilling.Data.map(objRow => {
            return (
                <tr>
                    {
                        GetTableRowData(objRow, arrSchoolBilling.Header)
                    }
                </tr>
            );
        });
        return arrTableData;
    }

    /**
    * @name GetHeaderRow
    * @summary Returns the jsx of Header
    * @returns {object} jsx, React.Fragment
    */
    function GetHeaderRow() {
        let arrSchoolBilling = { Header: [] };
        if (DataRef(props.Extranet_School_Billing_Module)) {
            arrSchoolBilling = DataRef(props.Extranet_School_Billing_Module)["Data"][0];
        }
        return (
            <thead>
                <tr>
                    {
                        arrSchoolBilling.Header.map(objColumn => {
                            return (
                                <td style={{ "padding": "8px 13px", "border": "1px solid gainsboro", "background": "#f7f7f7", "fontWeight": "bold", "fontSize": "13px", "fontFamily": "Times", "color": "#3b3b3b" }}>
                                    {objColumn}
                                </td>
                            );
                        })
                    }
                </tr>
            </thead>
        );
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Billing", props);
        let arrPacketData = props.Extranet_School_Billing_Module && props.Extranet_School_Billing_Module.Data ? props.Extranet_School_Billing_Module.Data[0] : [];
        return (
            <div className="light-brown-bg data-comparison" style={{ "width": "950px", "display": "flex", "paddingRight": "10px" }}>
                <WrapperComponent
                    ComponentName={"FillHeight"}
                    Id="BillingPrintToPDF" Meta={objContext.BillingPrintToPDF_ModuleProcessor.GetMetaDataFillheightBillingPrintToPDF()} ParentProps={{ ...props }}>
                    <div className="top-right-menu" style={{ "textAlign": "left", "fontSize": "12px", "fontFamily": "Times", "color": "#3b3b3b" }}>
                        <p className="top-right-label-color" style={{ "marginBottom": "10px" }}>
                            {Localization.TextFormatter(objTextResource, 'FirstLineText')}
                        </p>
                        {
                            props.JConfiguration.MainClientId == "115"
                                ?
                                <div style={{ "marginBottom": "10px" }}>
                                    <p>
                                        {Localization.TextFormatter(objTextResource, 'SecondLineText')}
                                    </p>
                                </div>
                                : ""
                        }
                    </div>

                    <div className="billing-data" style={{ "width": "100%" }}>
                        <table className="print-to-pdf-billing-data" style={{ "width": "100%", "background": "#fff", "tableLayout": "fixed", "borderCollapse": "collapse" }}>
                            {GetHeaderRow()}
                            {GetTableData()}
                        </table>
                        {arrPacketData.Data == undefined || arrPacketData.Data.length == 0 ? <div className="no-data-overlay">{Localization.TextFormatter(objTextResource, 'NoDataMessage')}</div> : <React.Fragment />}
                    </div>
                </WrapperComponent>
            </div>
        );
    }
    return (
        <React.Fragment>
            {
                props.isLoadComplete ? GetContent() :
                    <WrapperComponent
                        ComponentName={"Animation"}
                        ClientUserDetails={props.ClientUserDetails} JConfiguration={props.JConfiguration} ParentProps={{ ...props }} Resource={{ "ImagePath": props.JConfiguration.ExtranetSkinPath + '/Images/Common/Icons/clock.gif' }} />
            }
        </React.Fragment>
    );
};

export default BillingPrintToPDF;