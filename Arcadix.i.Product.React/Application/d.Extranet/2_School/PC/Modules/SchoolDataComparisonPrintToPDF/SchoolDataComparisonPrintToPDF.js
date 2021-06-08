//React imports
import React from "react";

//Module specific imports
import SchoolDataComparisonPrintToPDF_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolDataComparisonPrintToPDF/SchoolDataComparisonPrintToPDF_ModuleProcessor';

/**
* @name SchoolDataComparisonPrintToPDF
* @param {object} props props
* @summary This component displays the SchoolDataComparisonPrintToPDF data in grid.
* @returns {object} React.Fragement that encapsulated the display SchoolDataComparisonPrintToPDF details in table.
*/
const SchoolDataComparisonPrintToPDF = props => {

    let objContext = { props, SchoolDataComparisonPrintToPDF_ModuleProcessor: new SchoolDataComparisonPrintToPDF_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.SchoolDataComparisonPrintToPDF_ModuleProcessor.Initialize(objContext, objContext.SchoolDataComparisonPrintToPDF_ModuleProcessor);

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
        let arrTableData = [];
        if (DataRef(props.Extranet_School_SchoolDataComparison_Module)) {
            let arrSchoolDataComparison = DataRef(props.Extranet_School_SchoolDataComparison_Module)["Data"][0];
            arrTableData = arrSchoolDataComparison.Data.map(objRow => {
                return (
                    <tr>
                        {
                            GetTableRowData(objRow, arrSchoolDataComparison.Header)
                        }
                    </tr>
                );
            });
        }
        return arrTableData;
    }

    /**
     * @name GetContent
     * @summary Returns the required jsx for component.
     * @returns {Element} 
     * */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/DataComparison", props);
        return (
            <React.Fragment>
                <div className="light-brown-bg data-comparison">
                    <WrapperComponent
                        ComponentName={"FillHeight"}
                        Id="Billing" Meta={objContext.SchoolDataComparisonPrintToPDF_ModuleProcessor.GetMetaDataFillheightSchoolDataComparisonPrintToPDF()} ParentProps={{ ...props }}>
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
            </React.Fragment>
        );
    }

    return props.isLoadComplete ? GetContent() : <React.Fragment />;
};

export default SchoolDataComparisonPrintToPDF;