//Raect imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//module specific imports
import * as SchoolDropdown_Hook from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/SchoolDropdown/SchoolDropdown_Hook';
import SchoolDropdown_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/SchoolDropdown/SchoolDropdown_ModuleProcessor';


//Controls
import DropDown from "@root/Framework/Controls/Dropdowns/Dropdown/Dropdown";

/**
 * @name SchoolDropdown
 * @summary SchoolDropdown page for school and teacher
 * @param {any} props
 */
const SchoolDropdown = (props) => {
    
    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, SchoolDropdown_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["SchoolDropdown_ModuleProcessor"]: new SchoolDropdown_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in SchoolDropdown_Hook, that contains all the custom hooks.
    * @returns null
    */
    SchoolDropdown_Hook.Initialize(objContext);

    /**
     * @summary Gts the jsx to be returned by the component
     * @param {any} props
     */
    const GetContent = () => {
        let strSelectedSchoolId = objContext.SchoolDropdown_ModuleProcessor.GetSelectedSchoolId(objContext);
        let arrSchoolData = DataRef(objContext.props.Object_Extranet_School_School, "Object_Extranet_School_School;cIsDeleted;N")["Data"];
        let objSchoolDropdownData = {
            DropdownData: arrSchoolData,
            SelectedValue: strSelectedSchoolId
        };

        let objSchoolDropdownMetaData = {
            DisplayColumn: "vSchoolName",
            ValueColumn: "uSchoolId"
        };

        return (
            <DropDown
                Id="SchoolDropdown"
                Meta={objSchoolDropdownMetaData}
                Data={objSchoolDropdownData}
                Resource={objContext.SchoolDropdown_ModuleProcessor.GetResourceSchoolDropdown()}
                Events={objContext.SchoolDropdown_ModuleProcessor.GetEventsSchoolDropdown(objContext)}
                ParentProps={{ ...props }}
            />
        );
    };
    return state.isLoadComplete || props.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name DynamicStyles
* @param {object} props props
* @summary Required for css
* @returns {object} arrStyles
*/
SchoolDropdown.DynamicStyles = props => {
    return [];
};

/**
* @name InitialDataParams
* @param {object} props props
* @summary Required for SSR
* @returns {object} InitialDataParams
*/
SchoolDropdown.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new SchoolDropdown_ModuleProcessor()).InitialDataParams(props));
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(SchoolDropdown_ModuleProcessor.StoreMapList()))(SchoolDropdown);