//React related imports...
import React, { useReducer } from "react";
import { connect } from 'react-redux';

//Base classes...
//import * as IntranetBase_Hook from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook';

//Module related fies...
//import * as DocumentDetails_Hook from '@shared/Application/c.ProductManagement/Modules/7_Shared/DocumentDetails/DocumentDetails_Hook';
//import DocumentDetails_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/7_Shared/DocumentDetails/DocumentDetails_ModuleProcessor';
//import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import TaskContentPreview from '@root/Application/f.TestApplication/PC/InlineStart/Preview/TaskPreview/TaskContentPreview';


/**
* @name OnlineHelpContentDisplay
* @param {object} props props
* @summary This component displays the Task details.
* @returns {object} jsx.
*/
const OnlineHelpContentDisplay = props => {

    //  /**
    //* @name [state,dispatch]
    //* @summary Define state and dispatch for the reducer to set state.
    //* @returns {[]} state and dispatch
    //*/
    //  const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, DocumentDetails_Hook.GetInitialState(props));

    //  /**
    //  * @name objContext
    //  * @summary Groups state.dispatch and module object(s) in objContext.
    //  * @returns {object} objContext
    //  */
    //  let objContext = { state, props, dispatch, ["ModuleName"]: "DocumentDetails", ["DocumentDetails_ModuleProcessor"]: new DocumentDetails_ModuleProcessor() };

    //  /**
    //   * @name Initialize
    //   * @param {object} objContext context object
    //   * @summary Initialize method call to load the custom hooks.
    //   * @returns null
    //   */
    //  DocumentDetails_Hook.Initialize(objContext);

    //  /**
    //   * @name  Initialize
    //   * @param {object} objContext context object
    //   * @param {object} objModuleProcessor ModuleProcessor object
    //   * @summary Initializing API and DynamicStyles
    //   * @returns Setting ApplicationState
    //   */
    //  objContext.DocumentDetails_ModuleProcessor.Initialize(objContext, objContext.DocumentDetails_ModuleProcessor);


    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        let objTextResource = props.Resource.Text;
        return <div className="file-explorer-detail">
            <WrapperComponent
                ComponentName={"FillHeight"}
                id={"FillHeight_" + props.Id}
                Meta={{
                    HeaderIds: ["Header", "filterHeader"],
                    FooterIds: [""]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
                ParentProps={{ ...props }}
            >
                <h3>{objTextResource.Content}</h3>
                {props.Data.PageJson ? <TaskContentPreview  {...props} PageJson={props.Data.PageJson} /> : <table><td>{objTextResource.NoContent}</td></table>}

            </WrapperComponent>
        </div>;
    }

    return GetContent();

};
//props.Data.PageId &&
export default OnlineHelpContentDisplay;
//export default connect(IntranetBase_Hook.MapStoreToProps(DocumentDetails_ModuleProcessor.StoreMapList()))(DocumentDetails);
