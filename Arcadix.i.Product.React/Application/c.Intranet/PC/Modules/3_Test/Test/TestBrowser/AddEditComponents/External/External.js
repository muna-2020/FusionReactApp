// React related imports.
import React, { useImperativeHandle, forwardRef, useReducer } from 'react';

//Module Related Files.
import Base_AddEditTestMaster_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestBrowser/TestMaster/Base_AddEditTestMaster/Base_AddEditTestMaster_ModuleProcessor';

/**
 * @name External
 * @param {object} props props
 * @summary This component is used for External in Add/EditTask.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const External = (props, ref) => {

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
                        "vExternalCertificateUrl": props.Data.IsEdit ? (props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0] ? props.Data.DisplayData["t_TestDrive_Test_TestProperty"][0]["vExternalCertificateUrl"] : "") : ""
                    }
                ],
                "t_TestDrive_Test_Data": props.Data.MultiLanguageData.map(objMultiLang => {
                    let objEditTestData = props.Data.IsEdit ? props.Data.DisplayData["t_TestDrive_Test_Data"].find(obj => obj["iLanguageId"] == objMultiLang["iLanguageId"]) : {};
                    return {
                        "uTestDataId": props.Data.IsEdit && objEditTestData ? objEditTestData["uTestDataId"] : null,
                        "vExternalTestUrl": props.Data.IsEdit && objEditTestData ? objEditTestData["vExternalTestUrl"] : "",                       
                        "iLanguageId": objMultiLang["iLanguageId"]
                    }
                })
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
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <React.Fragment>
            <div className="title">{Localization.TextFormatter(objTextResource, "ExternalTest")}</div>

            <div className="col col-1">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "ExternalTestUrl")}</span>
                    </div>
                    <div className="row-right">
                        <MultiLanguageInputs
                            Meta={{
                                ValueColumn: "vExternalTestUrl",
                                DependingTableName: "t_TestDrive_Test_Data",
                                DisplayColumn: "vExternalTestUrl"
                            }}
                            Data={{
                                DisplayData: state.objData,
                                MultiLanguageData: props.Data.MultiLanguageData
                            }}
                            Events={{
                                OnChange: (e, objLanguage) => {
                                    objContext.Base_AddEditTestMaster_ModuleProcessor.HandleChange("t_TestDrive_Test_Data.vExternalTestUrl", e.target.value, objContext, objLanguage["iLanguageId"]);
                                },
                                OnKeyDown: (e) => {
                                    objContext.props.Events.OnKeyDown(e)
                                }
                            }}
                            ParentProps={props.ParentProps}
                        /> 
                    </div>
                </div>
            </div>

            <div className="title">{Localization.TextFormatter(objTextResource, "ExternalCertificate")}</div>

            <div className="col col-1">
                <div className="col-item">
                    <div className="row-left">
                        <span>{Localization.TextFormatter(objTextResource, "ExternalCertificateUrl")}</span>
                    </div>
                    <div className="row-right">
                        <input
                            id="vTestName"
                            className="text-input"
                            value={state.objData.t_TestDrive_Test_TestProperty[0] ? state.objData.t_TestDrive_Test_TestProperty[0].vExternalCertificateUrl : ""}
                            onChange={(e) => objContext.Base_AddEditTestMaster_ModuleProcessor.HandleTestPropertySubTableChange("vExternalCertificateUrl", e.target.value, objContext)}
                            onKeyDown={(e) => objContext.props.Events.OnKeyDown(e)}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    }
    return (
        GetContent()
    );
};

export default forwardRef(External);    