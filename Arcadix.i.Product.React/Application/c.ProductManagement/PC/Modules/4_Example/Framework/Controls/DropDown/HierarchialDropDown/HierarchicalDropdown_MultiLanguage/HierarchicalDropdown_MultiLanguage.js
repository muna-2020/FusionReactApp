// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import HierarchicalDropdown from '@root/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown';
import HierarchicalDropdown_MultiLanguage_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown_MultiLanguage/HierarchicalDropdown_MultiLanguage_ModuleProcessor';
import * as HierarchicalDropdown_MultiLanguage_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown_MultiLanguage/HierarchicalDropdown_MultiLanguage_Hook';
import * as HierarchicalDropdown_MultiLanguage_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/HierarchicalDropdown/HierarchicalDropdown_MultiLanguage/HierarchicalDropdown_MultiLanguage_MetaData';

/**
* @name HierarchicalDropdown_MultiLanguage
* @param {object} props props
* @summary This component displays the HierarchicalDropdown_MultiLanguage.
* @returns {object} React.Fragement that encapsulated the HierarchicalDropdown_MultiLanguage.
*/
const HierarchicalDropdown_MultiLanguage = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, HierarchicalDropdown_MultiLanguage_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["HierarchicalDropdown_MultiLanguage_ModuleProcessor"]: new HierarchicalDropdown_MultiLanguage_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Makes showAnimation false in store.
     * @returns null
     */
    HierarchicalDropdown_MultiLanguage_Hook.Initalize(objContext);

    return (
        <React.Fragment>
            <div>This component displays the sample for a HierarchicalDropdown showing multilanguage options.In this sample, multilanguage data is passed.</div>
            <HierarchicalDropdown
                Id="HierarchicalDropdown_MultiLanguage"
                Meta={HierarchicalDropdown_MultiLanguage_MetaData.GetMetaData()}
                Data={props.Data}
                Resource={props.Resource}
                Events={objContext.HierarchicalDropdown_MultiLanguage_ModuleProcessor.GetEvents(objContext)}
                CallBacks={objContext.HierarchicalDropdown_MultiLanguage_ModuleProcessor.GetCallBacks(objContext)}
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
HierarchicalDropdown_MultiLanguage.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/HierarchicalDropdown/HierarchicalDropdown.css"];
};

export default connect(HierarchicalDropdown_MultiLanguage_ModuleProcessor.GetStoreData())(HierarchicalDropdown_MultiLanguage);