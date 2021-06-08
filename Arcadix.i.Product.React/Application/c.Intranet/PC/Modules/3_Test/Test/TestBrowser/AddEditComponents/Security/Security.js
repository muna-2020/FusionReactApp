// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
 * @name Security
 * @param {object} props props
 * @summary This component is used for Security in Add/EditTest.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const Security = (props, ref) => {

    /**
     * @name GetInitialState
     * @param {object} props 
     * @summary Forms the Initial state for component.
     * @returns {object} jsx, React.Fragment
     */
    const GetInitialState = (props) => {
        return {
            objData: {                
                "t_TestDrive_Test_TestProperty": [
                    {
                        "cAllowTokenValidityDate": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cAllowTokenValidityDate"] : "N") : "N",
                         "cAllowTokenActivation": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cAllowTokenActivation"] : "N") : "N",
                         "cUseSecuredBrowser": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ?props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["cUseSecuredBrowser"] : "N") : "N"
                    }
                ]
            }
        };
    }

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state, dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "Base_AddEditTestMaster_ModuleProcessor": new Base_AddEditTestMaster_ModuleProcessor() };

    /**
     * @name useImperativeHandle
     * @param {object} objContext  objContext
     * @summary Setting up imperative handle
     */
    useImperativeHandle(ref, () => ({
        GetSaveData: () => {
            return state.objData
        }
    }), [state, props]);

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        return <React.Fragment>
            <div className="title">{Localization.TextFormatter(objTextResource, "SecurityTestNumber")}</div>

            <div className="col col-2">
                <div className="col-item">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "Validity")}</span>
                    </div>
                    <div className="row-right">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={state.objData.t_TestDrive_Test_TestProperty[0].cAllowTokenValidityDate ? (state.objData.t_TestDrive_Test_TestProperty[0].cAllowTokenValidityDate == "Y" ? true : false) : false}
                                name="" id=""
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("cAllowTokenValidityDate", e.target.checked ? "Y" : "N", objContext)} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>

                <div className="col-item">
                    <div className="row-left">
                        <span className="nowrap">{Localization.TextFormatter(objTextResource, "TokenActivation")}</span>
                    </div>
                    <div className="row-right">
                        <label className="checkbox">
                            <input type="checkbox"
                                checked={state.objData.t_TestDrive_Test_TestProperty[0].cAllowTokenActivation ? (state.objData.t_TestDrive_Test_TestProperty[0].cAllowTokenActivation == "Y" ? true : false) : false}
                                name="" id=""
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("cAllowTokenActivation", e.target.checked ? "Y" : "N", objContext)} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
            {props.Data.TestType != "Wrapper" && props.Data.TestType != "Survey" ? 
                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span className ="nowrap">{Localization.TextFormatter(objTextResource, "SecureBrowser")}</span>
                        </div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input type="checkbox"
                                    checked={state.objData.t_TestDrive_Test_TestProperty[0].cUseSecuredBrowser ? (state.objData.t_TestDrive_Test_TestProperty[0].cUseSecuredBrowser == "Y" ? true : false) : false}
                                    name="" id=""
                                onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("cUseSecuredBrowser", e.target.checked ? "Y" : "N", objContext)} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </div> : <React.Fragment />}            
        </React.Fragment>
    }

    return (
        GetContent()
    );
};

export default forwardRef(Security);