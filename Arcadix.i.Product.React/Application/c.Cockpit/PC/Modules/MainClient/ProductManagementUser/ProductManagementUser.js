// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as ProductManagementUser_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/ProductManagementUser/ProductManagementUser_Hook';
import ProductManagementUser_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/MainClient/ProductManagementUser/ProductManagementUser_ModuleProcessor";

/**
 * @name ProductManagementUser
 * @param {object} props props
 * @summary This component displays the ProductManagementUser data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with ProductManagementUser details.
 */
const ProductManagementUser = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, ProductManagementUser_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ProductManagementUser", ["ProductManagementUser_ModuleProcessor"]: new ProductManagementUser_ModuleProcessor() };

    /**
      * @name  Initialize
      * @param {object} objContext context object
      * @summary Initializing API and DynamicStyles
      * @returns null
      */
    objContext.ProductManagementUser_ModuleProcessor.Initialize(objContext, objContext.ProductManagementUser_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in ProductManagementUser_Hook, that contains all the custom hooks.
     * @returns null
     */
    ProductManagementUser_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        return (
            <div className="subject-container">
                <Grid
                    Id='ProductManagementUserGrid'
                    Meta={objContext.ProductManagementUser_ModuleProcessor.GetMetaData(objContext)}
                    Resource={objContext.ProductManagementUser_ModuleProcessor.GetResourceData(objContext)}
                    Data={objContext.ProductManagementUser_ModuleProcessor.GetGridData(objContext)}
                    ParentProps={props}
                />
            </div>
        )
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

export default connect(CockpitBase_Hook.MapStoreToProps(ProductManagementUser_ModuleProcessor.StoreMapList()))(ProductManagementUser);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ProductManagementUser_ModuleProcessor;