// React related impoprts.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted files.
import * as Dropdown_Sample_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/Dropdown_Sample/Dropdown_Sample/Dropdown_Sample_Hook';
import Dropdown_Sample_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/Dropdown_Sample/Dropdown_Sample/Dropdown_Sample_ModuleProcessor';
import * as Dropdown_Sample_MetaData from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/Dropdown_Sample/Dropdown_Sample/Dropdown_Sample_MetaData';
import * as Dropdown_Sample_ResourceData from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/Dropdown_Sample/Dropdown_Sample/Dropdown_Sample_ResourceData';
import Dropdown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown";

/**
* @name Dropdown_Sample
* @param {object} props props
* @summary This component displays the sample for simple dropdown. 
            * In this sample, simple data is passed.
* @returns {object} div that displays a dropdown.
*/
const Dropdown_Sample = props => {
    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Dropdown_Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["Dropdown_Sample_ModuleProcessor"]: new Dropdown_Sample_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    Dropdown_Sample_Hook.useDataLoaded(objContext);

    /**
    * @name GetContent
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        return (
            <React.Fragment>
                <div>This component displays the sample for simple dropdown.In this sample, simple data is passed.</div>
                <Dropdown
                    Id= {"Dropdown_Sample"}
                    Meta={Dropdown_Sample_MetaData.GetMetaData()}
                    Data={props.Data}
                    Resource={Dropdown_Sample_ResourceData.GetResourceData()}
                    Events={objContext.Dropdown_Sample_ModuleProcessor.GetEvents()}
                    Callbacks={objContext.Dropdown_Sample_ModuleProcessor.GetCallbacks()}
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
Dropdown_Sample.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/Dropdown/DropDown.css"];
};

export default connect(Dropdown_Sample_ModuleProcessor.GetStoreData())(Dropdown_Sample);