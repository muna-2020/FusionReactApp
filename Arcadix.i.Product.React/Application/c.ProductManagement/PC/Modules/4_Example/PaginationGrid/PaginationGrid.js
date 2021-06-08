// React related impoprts.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Grid Import
import Grid from '@root/Framework/Blocks/Grid/Grid';

//Base classes.
import * as IntranetBase_Hook from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook';

//Component related import
import * as PaginationGrid_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/PaginationGrid/PaginationGrid_MetaData';
import * as PaginationGrid_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/PaginationGrid/PaginationGrid_Hook';
import PaginationGrid_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/PaginationGrid/PaginationGrid_ModuleProcessor';
import   Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';
 

/**
* @name PaginationGrid.
* @param {object} props props.
* @summary This component is used to displays PaginationGrid data.
* @returns {object}  React.Fragement that encapsulated the display grid with PaginationGrid details.
*/
const PaginationGrid = props => {

    ///**
    // * @name objTextResource
    // * @summary Text Resource
    // * @returns {[]} state and dspatch
    // */
    //let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/5_Member/Teacher", props);

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, PaginationGrid_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.   
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["PaginationGrid_ModuleProcessor"]: new PaginationGrid_ModuleProcessor(), ["Base_ModuleProcessor"]: new Base_ModuleProcessor()};

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in PaginationGrid_Hook, that contains all the custom hooks.
     * @returns null
     */
    PaginationGrid_Hook.Initialize(objContext);

    return (state.isLoadComplete ?
        <Grid
            Meta={{
                ...PaginationGrid_MetaData.GetMetaData(),
                AllowPaging: "Y"
            }}
            Data={{
                "RowData": objContext.state.Data.FormData, "RowsPerPage": objContext.state.RowsPerPage, "From": objContext.state.From,
                "TotalRowCount": objContext.state.TotalRowCount, "AllowPaging": "Y",
                "LanguageData": objContext.Base_ModuleProcessor.GetMultiLanguageData(objContext.props.Object_Cockpit_MainClient_MainClientLanguage["Data"], objContext.props.Object_Cockpit_Language["Data"], 2)
          }}
            Resource={{
                Text: {}
            }}
            Events={{
                PageNumberClick: (i) => { objContext.PaginationGrid_ModuleProcessor.GetData(objContext,i);}
            }}
            CallBacks={{
                PageNumberClick: () => {                  
                }
            }}
            ParentProps={{ ...props }}  
        />:""
    );
}

/**
 * @name InitialDataParams
 * @param {object} props props
 * @summary required for SSR
 * @returns {object} InitialDataParams 
 */
PaginationGrid.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new PaginationGrid_ModuleProcessor()).InitialDataParams(props));
};

export default connect(IntranetBase_Hook.MapStoreToProps(PaginationGrid_ModuleProcessor.StoreMapList()))(PaginationGrid);