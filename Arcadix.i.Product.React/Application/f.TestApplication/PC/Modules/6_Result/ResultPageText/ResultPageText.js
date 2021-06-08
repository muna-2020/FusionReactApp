//React Related Imports
import * as React from 'react';

//Component related imports
import TestApplicationResult_Module from '@shared/Application/f.TestApplication/PC/Modules/6_Result/TestApplicationResult_Module';

/**
 * @name ResultPageText
 * @param {object} props props object
 * @summary Result Page Layout
 */
const ResultPageText = (props) => {

    /**
    * @name Assigning objContext
    * @summary Groups state, props and dispatch and TextResource object in to object, which can be passed across method in the module and used
    */
    let objContext = { props, "ModuleName": "TestApplicationResult" };

    const GetResultExcel = (objContext) => {
        TestApplicationResult_Module.GetData(objContext);
    }

    return (
        <div>
            {props.TestState.ResultPageProperties.ResultPageTextContent ?

                <div className="result-page-text-flex">
                    <span>{props.TestState.ResultPageProperties.ResultPageTextContent ? <div dangerouslySetInnerHTML={{ __html: props.TestState.ResultPageProperties.ResultPageTextContent}}></div> : Localization.TextFormatter(props.TestState.ResultPageProperties.TextResources, "ResultText")}</span>
                </div>

                : <span>{Localization.TextFormatter(props.TestState.ResultPageProperties.TextResources, "ResultText")}</span>
            }
            
            {/*!props.TestState.IsInline ?
                < React.Fragment > <a href="javascript:void()" onClick={() => GetResultExcel(objContext, () => { })}>Result Excel</a></React.Fragment>
                : ""*/
            }
            </div>
    );
}

export default ResultPageText;