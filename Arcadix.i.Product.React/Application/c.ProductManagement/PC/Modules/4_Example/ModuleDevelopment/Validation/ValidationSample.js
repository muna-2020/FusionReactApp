// React related impoprts.
import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module related fies.
import * as Sample_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/ModuleDevelopment/ValidationSample/Sample_Hook';
import Sample_ModuleProcessor from "@shared/Application/c.ProductManagement/Modules/4_Example/ModuleDevelopment/ValidationSample/Sample_ModuleProcessor";

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';


const Sample = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["Sample_ModuleProcessor"]: new Sample_ModuleProcessor() };

    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    });

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Sample_Hook, that contains all the custom hooks.
    * @returns null
    */
    Sample_Hook.Initialize(objContext);
    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetContent = () => {
        return (
            <div className="demo-table">
                Step 8 - Validation
                <table>
                    <tr> Enter the details and click on Validate to perform the Validation</tr>
                    <tr>
                        <td>Name</td>
                        <td><input
                            onFocus={(e => { objContext.Sample_ModuleProcessor.ValidateFocus(objContext, 'Name'); })}
                            id="Name"
                            className="text-input"
                            type="text"
                            onChange={(e) => {
                                objContext.Sample_ModuleProcessor.HandleChange("Name", e.target.value, objContext);
                            }}
                            value={state.objData ? state.objData["Name"] : ""}
                        /></td>
                        <label>(This field is mandatory)</label>

                    </tr>
                    <tr>
                        <td>Age</td>
                        <td><input
                            onFocus={(e => { objContext.Sample_ModuleProcessor.ValidateFocus(objContext, 'Age'); })}
                            id="Age"
                            className="text-input"
                            type="text"
                            onChange={(e) => {
                                objContext.Sample_ModuleProcessor.HandleChange("Age", e.target.value, objContext);
                            }}
                            value={state.objData ? state.objData["Age"] : ""}
                        /></td>
                        <label>(This field accepts only a number)</label>

                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input
                            onFocus={(e => { objContext.Sample_ModuleProcessor.ValidateFocus(objContext, 'Email'); })}
                            id="Email"
                            className="text-input"
                            type="text"
                            onChange={(e) => {
                                objContext.Sample_ModuleProcessor.HandleChange("Email", e.target.value, objContext);
                            }}
                            value={state.objData ? state.objData["Email"] : ""}
                        /></td>
                        <label>(This field accepts a valid email only)</label>

                    </tr>
                    <tr>
                        <button onClick={() => { objContext.Sample_ModuleProcessor.OnClickValidate(objContext); }}>Validate</button>
                        </tr>
                </table>
                <div id="ValidationError" />
            </div>
        )
    }

    return (
        <React.Fragment>{
            props.isLoadComplete || state.isLoadComplete ?
                <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />
        }
        </React.Fragment>
    );

}

Sample.DynamicStyles = props => {
    var arrStyles = [
        props.JConfiguration.DemoSkinPath + "/Css/Application/ReactJs/PC/Modules/Sample/Sample.css"
    ];
    return arrStyles;
};


/**
* @name InitialDataParams
* @param {object} props props
* @summary required for SSR
* @returns {object} InitialDataParams 
*/
Sample.InitialDataParams = (props) => {
    return (new ObjectQueue()).Queue((new Sample_ModuleProcessor()).InitialDataParams(props));
};

export default connect(Base_Hook.MapStoreToProps(Sample_ModuleProcessor.StoreMapList()))(Sample);

