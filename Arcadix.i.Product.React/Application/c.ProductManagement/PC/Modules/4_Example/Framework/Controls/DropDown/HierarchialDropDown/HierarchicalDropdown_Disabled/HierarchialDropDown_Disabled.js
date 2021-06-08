// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import HierarchicalDropdown from '@root/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown';
import HierarchicalDropdown_Disabled_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown_DefaultText/HierarchicalDropdown_DefaultText_ModuleProcessor';
import * as HierarchicalDropdown_Disabled_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown_Disabled/HierarchicalDropdown_Disabled_Hook';
import * as HierarchicalDropdown_Disabled_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown_Disabled/HierarchicalDropdown_Disabled_MetaData';

/**
* @name HierarchicalDropdown_Disabled
* @param {object} props props
* @summary This component displays the HierarchicalDropdown_Disabled.
* @returns {object} React.Fragement that encapsulated the HierarchicalDropdown_Disabled.
*/
const HierarchicalDropdown_Disabled = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, HierarchicalDropdown_Disabled_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["HierarchicalDropdown_Disabled_ModuleProcessor"]: new HierarchicalDropdown_Disabled_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Makes showAnimation false in store.
     * @returns null
     */
    HierarchicalDropdown_Disabled_Hook.Initalize(objContext);

    return (
        <React.Fragment>
            <div>This component displays the sample for HierarchicalDropdown which is disabled (i.e upon clicking, list will not get displayed)</div>
            <HierarchicalDropdown
                Id="HierarchicalDropdown_Disabled"
                Meta={HierarchicalDropdown_Disabled_MetaData.GetMetaData()}
                Data={props.Data}
                Resource={props.Resource}
                Events={objContext.HierarchicalDropdown_Disabled_ModuleProcessor.GetEvents(objContext)}
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
HierarchicalDropdown_Disabled.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/HierarchicalDropdown/HierarchicalDropdown.css"];
};

export default connect(HierarchicalDropdown_Disabled_ModuleProcessor.GetStoreData())(HierarchicalDropdown_Disabled);