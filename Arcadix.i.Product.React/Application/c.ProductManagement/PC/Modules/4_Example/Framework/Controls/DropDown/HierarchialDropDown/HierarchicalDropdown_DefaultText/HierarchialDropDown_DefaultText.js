// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import HierarchicalDropdown from '@root/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown';
import HierarchicalDropdown_DefaultText_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown_DefaultText/HierarchicalDropdown_DefaultText_ModuleProcessor';
import * as HierarchicalDropdown_DefaultText_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown_DefaultText/HierarchicalDropdown_DefaultText_Hook';
import * as HierarchicalDropdown_DefaultText_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown_DefaultText/HierarchicalDropdown_DefaultText_MetaData';

/**
* @name HierarchicalDropdown_DefaultText
* @param {object} props props
* @summary This component displays the HierarchicalDropdown_DefaultText.
* @returns {object} React.Fragement that encapsulated the HierarchicalDropdown_DefaultText.
*/
const HierarchicalDropdown_DefaultText = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, HierarchicalDropdown_DefaultText_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["HierarchicalDropdown_DefaultText_ModuleProcessor"]: new HierarchicalDropdown_DefaultText_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Makes showAnimation false in store.
     */
    HierarchicalDropdown_DefaultText_Hook.Initalize(objContext);

    return (
        <React.Fragment>
            <div>This component displays the sample for Hierarchical dropdown showing default texts.</div>
            <HierarchicalDropdown
                Id = "HierarchicalDropdown_DefaultText"
                Meta={HierarchicalDropdown_DefaultText_MetaData.GetMetaData()}
                Data={props.Data}
                Resource={props.Resource}
                Events={objContext.HierarchicalDropdown_DefaultText_ModuleProcessor.GetEvents(objContext)}
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
HierarchicalDropdown_DefaultText.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/HierarchicalDropdown/HierarchicalDropdown.css"];
};

export default connect(HierarchicalDropdown_DefaultText_ModuleProcessor.GetStoreData())(HierarchicalDropdown_DefaultText);