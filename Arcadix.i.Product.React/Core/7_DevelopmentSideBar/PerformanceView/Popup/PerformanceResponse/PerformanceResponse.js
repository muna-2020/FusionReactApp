// React related imports.
import React, { useReducer } from 'react';

//Components used...
import JSONFormatter from '@root/Framework/Controls/JSONFormatter/JSONFormatter';

/**
  * @name ShowProcedureDefinition
  * @param {object} props props
  * @summary This component displays the DatabaseComparision.
  * @returns {object} React.Fragement that encapsulated the display grid with DatabaseCompare details.
  */
const PerformanceResponse = props => {

     /**  
      * @name GetContent
      * @summary Get the content to display
      * @return {Jxs} jsx to view
      */
    function GetContent() {
        let objData = {};
        if (props.Data.ResponseData.Response) {
            objData = props.Data.ResponseData.Response.Data && Object.keys(props.Data.ResponseData.Response.Data).length > 0 ?
                props.Data.ResponseData.Response.Html ? { "Data": props.Data.ResponseData.Response.Data, "Html_Content": { "Html": props.Data.ResponseData.Response.Html }, "Header": props.Data.ResponseData.Response.Header } :
                { "Data": props.Data.ResponseData.Response.Data, "Header": props.Data.ResponseData.Response.Header }:
                { "Html_Content": props.Data.ResponseData.Response.Html ? { "Html": props.Data.ResponseData.Response.Html } : "No Data", "Header": props.Data.ResponseData.Response.Header };
        }
        return (
            <React.Fragment>
                <div style={{ "width": "950px", "height": "630px", "overflow": "auto" }}>
                    <span>
                        {
                            < JSONFormatter Data={{ JSONData: objData }} />
                        }
                    </span>
                </div>
            </React.Fragment>
        )
    }
    /**
      * @summary returns JSX
      */
    return (
        <React.Fragment>
            {GetContent()}
        </React.Fragment>
    );
}

export default PerformanceResponse;