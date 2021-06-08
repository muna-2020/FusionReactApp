// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Component related fies.
import * as Pagination_Hook from '@shared/Framework/Blocks/Grid/3.Footer/Pagination/Pagination_Hook';
import Pagination_ComponentProcessor from '@shared/Framework/Blocks/Grid/3.Footer/Pagination/Pagination_ComponentProcessor';

const GridPagination = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Pagination_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["Pagination_ComponentProcessor"]: new Pagination_ComponentProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Pagination_ComponentProcessor.Initialize(objContext, objContext.Pagination_ComponentProcessor);

    /**
    * @name useInitialDataCallBack
    * @param {object} objContext context object
    * @summary Make the callback for the first page.
    */
    Pagination_Hook.useInitialDataCallBack(objContext);
    Pagination_Hook.useOnPageNumberChange(objContext);    

    /**
    * @name GetContent
    * @sumarry Forms JSX for the GridPagination
    * @returns {jsx} JSX of the GridPagination
    */
    const GetContent = () => {
        return (
            <div id={props.Id} className="div-paging">
                <span className={state.intPageNumber == 1 ? "disaled-icons" : ""}>
                    <a className="ui-paginator-first">
                        <span onClick={() => objContext.Pagination_ComponentProcessor.HandlePagingClick(objContext, "FirstPageClick")} className="fa fa-step-backward"></span>
                    </a>
                    <a className="ui-paginator-prev">
                        <span onClick={() => objContext.Pagination_ComponentProcessor.HandlePagingClick(objContext, "PreviousPageClick")} className="fa fa-backward"></span>
                    </a>
                </span>
                <div className="div-pagenumber-textbox">
                    <span className="pagenumber-textbox" >{state.intPageNumber}</span>
                </div>
                <span className={state.intPageNumber == Math.ceil(props.Data.TotalRowCount / props.Data.RowsPerPage) ? "disaled-icons" : ""}>
                    <a className="ui-paginator-next">
                        <span onClick={() => objContext.Pagination_ComponentProcessor.HandlePagingClick(objContext, "NextPageClick")} className="fa fa-forward"></span>
                    </a>
                    <a className="ui-paginator-last">
                        <span onClick={() => objContext.Pagination_ComponentProcessor.HandlePagingClick(objContext, "LastPageClick")} className="fa fa-step-forward"></span>
                    </a>
                </span>
                <span className="pagenumber-limit-label">{state.intPageNumber + " of  " + Math.ceil(props.Data.TotalRowCount / props.Data.RowsPerPage)}</span>
            </div>
        );
    }

    return props.Data.TotalRowCount && props.Data.TotalRowCount > 0 ? GetContent() : <React.Fragment />;
}

export default GridPagination;
