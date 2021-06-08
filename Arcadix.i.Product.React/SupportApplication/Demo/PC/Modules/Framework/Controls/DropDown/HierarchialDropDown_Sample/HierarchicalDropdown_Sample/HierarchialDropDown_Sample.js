// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import HierarchicalDropdown from '@root/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown';
import HierarchicalDropdown_Sample_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/HierarchicalDropdown_Sample/HierarchicalDropdown_Sample/HierarchicalDropdown_Sample_ModuleProcessor';
import * as HierarchicalDropdown_Sample_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/HierarchicalDropdown_Sample/HierarchicalDropdown_Sample/HierarchicalDropdown_Sample_Hook';
import * as HierarchicalDropdown_Sample_MetaData from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/HierarchicalDropdown_Sample/HierarchicalDropdown_Sample/HierarchicalDropdown_Sample_MetaData';

/**
* @name HierarchicalDropdown_Sample
* @param {object} props props
* @summary This component displays the HierarchicalDropdown_Sample.
* @returns {object} React.Fragement that encapsulated the HierarchicalDropdown_Sample.
*/
const HierarchicalDropdown_Sample = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, HierarchicalDropdown_Sample_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["HierarchicalDropdown_Sample_ModuleProcessor"]: new HierarchicalDropdown_Sample_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Makes showAnimation false in store.
     * @returns null
     */
    HierarchicalDropdown_Sample_Hook.Initalize(objContext);

    return (
        <React.Fragment>
            <div>This component displays the sample for simple HierarchicalDropdown.In this sample, simple data is passed.</div>
            <HierarchicalDropdown
                    Id="HierarchicalDropdown_Sample"
                    Meta={HierarchicalDropdown_Sample_MetaData.GetMetaData()}
                    Data={props.Data}
                    Resource={props.Resource}
                    Events={objContext.HierarchicalDropdown_Sample_ModuleProcessor.GetEvents(objContext)}
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
HierarchicalDropdown_Sample.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/HierarchicalDropdown/HierarchicalDropdown.css"];
};

export default connect(HierarchicalDropdown_Sample_ModuleProcessor.GetStoreData())(HierarchicalDropdown_Sample);