// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import HierarchicalDropdown from '@root/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown';
import HierarchicalDropdown_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown/HierarchicalDropdown_ModuleProcessor';
import * as HierarchicalDropdown_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown/HierarchicalDropdown_Hook';
import * as HierarchicalDropdown_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown/HierarchicalDropdown_MetaData';

/**
* @name HierarchicalDropdown
* @param {object} props props
* @summary This component displays the HierarchicalDropdown.
* @returns {object} React.Fragement that encapsulated the HierarchicalDropdown.
*/
const HierarchicalDropDown = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, HierarchicalDropdown_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["HierarchicalDropdown_ModuleProcessor"]: new HierarchicalDropdown_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Makes showAnimation false in store.
     * @returns null
     */
    HierarchicalDropdown_Hook.Initalize(objContext);

    return (
        <React.Fragment>
            <div>This component displays the sample for simple HierarchicalDropdown.In this sample, simple data is passed.</div>
            <HierarchicalDropdown
                    Id="HierarchicalDropdown"
                    Meta={HierarchicalDropdown_MetaData.GetMetaData()}
                    Data={props.Data}
                    Resource={props.Resource}
                    Events={objContext.HierarchicalDropdown_ModuleProcessor.GetEvents(objContext)}
                    CallBacks={() => { }}
                    ParentProps={{ ...props }}
            />
        </React.Fragment>
    );
};

/**
* @name DynamicStyles
* @param {object} props props
* @summary Required for css
* @returns {Array} arrStyles
*/
HierarchicalDropDown.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/HierarchicalDropdown/HierarchicalDropdown.css"];
};

export default connect(HierarchicalDropdown_ModuleProcessor.GetStoreData())(HierarchicalDropDown);