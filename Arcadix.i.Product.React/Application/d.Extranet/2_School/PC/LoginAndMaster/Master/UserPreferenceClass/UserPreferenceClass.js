//Raect imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as ExtranetBase_Hook from '@shared/Framework/BaseClass/ExtranetBaseClass/ExtranetBase_Hook';

//module specific imports
import * as UserPreferenceClass_Hook from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/UserPreferenceClass/UserPreferenceClass_Hook';
import UserPreferenceClass_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/LoginAndMaster/Master/UserPreferenceClass/UserPreferenceClass_ModuleProcessor';


/**
 * @name UserPreferenceClass
 * @summary UserPreferenceClass page for teacher
 * @param {any} props
 */
const UserPreferenceClass = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, UserPreferenceClass_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["UserPreferenceClass_ModuleProcessor"]: new UserPreferenceClass_ModuleProcessor(), Object_Framework_Services_TextResource };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in UserPreferenceClass_Hook, that contains all the custom hooks.
    * @returns null
    */
    UserPreferenceClass_Hook.Initialize(objContext);

    /**
     * @summary Gts the jsx to be returned by the component
     * @param {any} props
     */
    const GetContent = (props) => {
        objContext.UserPreferenceClass_ModuleProcessor.SetUserPreference(objContext)
        return (
            <React.Fragment />
        )

    }
    return state.isLoadComplete || props.isLoadComplete ? GetContent() :'';
}

/**
* @name DynamicStyles
* @param {object} props props
* @summary Required for css
* @returns {object} arrStyles
*/
UserPreferenceClass.DynamicStyles = props => {
    return [];
};

/**
* @name InitialDataParams
* @param {object} props props
* @summary Required for SSR
* @returns {object} InitialDataParams
*/
UserPreferenceClass.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new UserPreferenceClass_ModuleProcessor()).InitialDataParams(props));
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(UserPreferenceClass_ModuleProcessor.StoreMapList()))(UserPreferenceClass);