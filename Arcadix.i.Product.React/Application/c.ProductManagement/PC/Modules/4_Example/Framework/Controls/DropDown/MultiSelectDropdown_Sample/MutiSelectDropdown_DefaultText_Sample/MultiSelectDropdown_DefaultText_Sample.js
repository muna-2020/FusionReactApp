// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import MultiSelectDropDown from '@root/Framework/Controls/Dropdowns/MultiSelectDropDown/MultiSelectDropDown';
import MultiSelectDropDown_DefaultText_Sample_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/MultiSelectDropdown_Sample/MultiSelectDropDown_DefaultText/MutliSelectDropdown_DefaultText_ModuleProcessor';
import * as MultiSelectDropDown_DefaultText_Sample_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/MultiSelectDropdown_Sample/MultiSelectDropDown_DefaultText/MultiSelectDropDown_DefaultText_Hook';
import * as MultiSelectDropdown_DefaultText_Sample_MetaData from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/MultiSelectDropdown_Sample/MultiSelectDropDown_DefaultText/MultiSelectDropDown_DefaultText_MetaData';

/**
* @name MultiSelectDropDown_Sample
* @param {object} props props
* @summary This component displays the MultiSelectDropDown_Sample.
* @returns {object} React.Fragement that encapsulated the MultiSelectDropDown_Sample.
*/
const MultiSelectDropDown_DefaultText_Sample = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, MultiSelectDropDown_DefaultText_Sample_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["MultiSelectDropDown_DefaultText_Sample_ModuleProcessor"]: new MultiSelectDropDown_DefaultText_Sample_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Makes showAnimation false in store.
     * @returns null
     */
    MultiSelectDropDown_DefaultText_Sample_Hook.Initalize(objContext);

    /**
     * @name GetContent
     * @param {object} props Passes props
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return (
            <React.Fragment>
                <div>This component displays the sample for Hierarchical dropdown showing default texts.</div>
                <MultiSelectDropDown
                    Id="MultiSelectDropDown_DefaultText_Sample"
                    Meta={MultiSelectDropdown_DefaultText_Sample_MetaData.GetMetaData()}
                    Data={props.Data}
                    Resource={props.Resource}
                    Events={objContext.MultiSelectDropDown_DefaultText_Sample_ModuleProcessor.GetEvents()}
                    CallBacks={objContext.MultiSelectDropDown_DefaultText_Sample_ModuleProcessor.GetCallbacks()}
                    ParentProps={{ ...props }}
                />
            </React.Fragment>
        );
    };

    return state.IsLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name DynamicStyles
* @param {object} props props
* @summary Required for css
* @returns {Array} arrStyles
*/
MultiSelectDropDown_DefaultText_Sample.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/MultiSelectDropdown/MultiSelectDropdown.css"];
};

export default connect(MultiSelectDropDown_DefaultText_Sample_ModuleProcessor.GetStoreData())(MultiSelectDropDown_DefaultText_Sample);