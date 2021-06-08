// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import Viewer, { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as CodeCrawler_Hook from '@shared/Application/c.ProductManagement/Modules/3.3_CodeCrawler/CodeCrawler_Hook';
import CodeCrawler_Moduleprocessor from '@shared/Application/c.ProductManagement/Modules/3.3_CodeCrawler/CodeCrawler_Moduleprocessor';

/**
 * @name CodeCrawler
 * @param {object} props props
 * @summary This component displays the CodeCrawler data in popup.
 * @returns {object} React.Fragement that encapsulated the display grid with CodeCrawler details.
 */
const CodeCrawler = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, CodeCrawler_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "CodeCrawler", ["CodeCrawler_Moduleprocessor"]: new CodeCrawler_Moduleprocessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in CodeCrawler_Hook, that contains all the custom hooks.
     * @returns null
     */
    CodeCrawler_Hook.Initialize(objContext);

    /**
* @name  InitializeDataForSSR
* @param {object} objContext context object
* @summary Initializing API and DynamicStyles
* @returns Setting ApplicationState
*/
    objContext.CodeCrawler_Moduleprocessor.Initialize(objContext, objContext.CodeCrawler_Moduleprocessor);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/3.3_CodeCrawler/CodeCrawler", objContext.props);
        return (
            <div className="code-crawler-parent-div">
                {
                    objContext.state.arrCodeCrawlerData.map((objCodeCrawler) => {
                        return (
                            <div className="code-block">
                                <span>{Localization.TextFormatter(objTextResource, "UniqueCode") + objCodeCrawler["Id"]}</span>
                                <span>{Localization.TextFormatter(objTextResource, objCodeCrawler["FileType"] =="StoreProcedure"?"DataBaseName":"FilePath") + objCodeCrawler["FilePath"]}</span>
                                <span>{Localization.TextFormatter(objTextResource, objCodeCrawler["FileType"] == "StoreProcedure" ? "StoreProcedureName" : "FileName") + objCodeCrawler["FileName"]}</span>
                                <span>{Localization.TextFormatter(objTextResource, "StartLine") + objCodeCrawler["StartLineNumber"]}</span>
                                <span>{Localization.TextFormatter(objTextResource, "EndLine") + objCodeCrawler["EndlineNumber"]}</span>
                                <SyntaxHighlighter language="javascript" >{objCodeCrawler["FileContent"]}</SyntaxHighlighter>
                            </div>
                        )
                    })
                }
            </div>
        );
    };
    return (
        <React.Fragment>{
            props.isLoadComplete || state.isLoadComplete ?
                <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />
        }
        </React.Fragment>
    );
};

export default connect(CockpitBase_Hook.MapStoreToProps(CodeCrawler_Moduleprocessor.StoreMapList()))(CodeCrawler);