// React related imports.
import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as PaymentSample_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/PaymentSample/PaymentSample_Hook';
import PaymentSample_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/PaymentSample/PaymentSample_ModuleProcessor';

//Internal services
import { LoadDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';

/**
* @name PaymentSample
* @param {object} props props
* @summary This component displays the PaymentSample data
* @returns {object} React.Fragement that contains PaymentSample details.
*/
const PaymentSample = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, PaymentSample_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { props, state, dispatch, ["ModuleName"]: "PaymentSample", ["PaymentSample_ModuleProcessor"]: new PaymentSample_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.PaymentSample_ModuleProcessor.Initialize(objContext, objContext.PaymentSample_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    PaymentSample_Hook.Initialize(objContext);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        return <div className="add-edit-test-table">
            <table>
                <tbody>       
                    {
                        state.arrData.map(objItem => {
                            return <tr className="mb-10">
                                <td>{objItem["item"]}</td>
                                <td>
                                    <button className="btn"
                                        onClick={() => objContext.PaymentSample_ModuleProcessor.OnActivateClick(objContext, objItem)}
                                    >{"Activate"}
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                    {
                        //<tr className="mb-10">
                        //    <td>{"Fusion Intranet"}</td>
                        //    <td>
                        //        <button className="btn"
                        //            onClick={() => objContext.PaymentSample_ModuleProcessor.OnActivateClick(objContext, "Fusion Intranet")}
                        //        >{"Activate"}
                        //        </button>
                        //    </td>
                        //</tr>
                        //<tr className="mb-10">
                        //    <td>{"Fusion Extranet School"}</td>
                        //    <td>
                        //        <button className="btn"
                        //            onClick={() => objContext.PaymentSample_ModuleProcessor.OnActivateClick(objContext, "Fusion Extranet School")}
                        //        >{"Activate"}
                        //        </button>
                        //    </td>
                        //</tr>
                        //<tr className="mb-10">
                        //    <td>{"Fusion Extranet Teacher"}</td>
                        //    <td>
                        //        <button className="btn"
                        //            onClick={() => objContext.PaymentSample_ModuleProcessor.OnActivateClick(objContext, "Fusion Extranet Teacher")}
                        //        >{"Activate"}
                        //        </button>
                        //    </td>
                        //</tr>
                    }
                </tbody>
            </table>
        </div>;
    }

    return (
        GetContent()
    );

    //return (
    //    <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
    //        <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
    //    </React.Fragment>
    //);
}

LoadDynamicStyles(JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/LoginAndMaster/MasterAddEdit.css");

export default PaymentSample;