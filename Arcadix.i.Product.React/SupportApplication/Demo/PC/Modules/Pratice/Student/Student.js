// React related impoprts.
import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import * as Sample_Hook from '@shared/SupportApplication/Demo/Modules/ModuleDevelopment/Step6/Sample_Hook';
import Sample_ModuleProcessor from "@shared/SupportApplication/Demo/Modules/ModuleDevelopment/Step6/Sample_ModuleProcessor";

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';


const Sample = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
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
            <div >
                <h1>Student information are displayed here</h1>
                <table>
                    <tr>					
                        <th>uStudentId</th>
                        <th>cIsDeleted</th>
                        <th>dtModifiedOn</th>
                        <th>dtCreatedOn</th>
                        <th>uUserID</th>
                        <th>iMainClientID</th>
                        <th>classId</th>
                    </tr>
                    <tr>		 				
                        <td>C0700571-FFF1-473D-9092-067F8EDF00EA</td>
                        <td>Y</td>
                        <td>2019-12-12 15:32:52.320</td>
                        <td>2019-12-12 12:16:32.337</td>
                        <td>C0700571-FFF1-473D-9092-067F8EDF00EA</td>
                        <td>97</td>
                        <td>1</td>
                    </tr>
                   
                </table>
                
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

