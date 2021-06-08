//React imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module specific imports.
import TestLoginsAssignClassType_ModuleProcessor from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLoginsPopups/TestLoginsAssignClassType/TestLoginsAssignClassType_ModuleProcessor";
import * as TestLoginsAssignClassType_Hook from "@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLoginsPopups/TestLoginsAssignClassType/TestLoginsAssignClassType_Hook";

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';


/**
 * @name TestLoginsAssignClassType
 * @param {any} props
 */
const TestLoginsAssignClassType = props => {

    /**
    * @name Reduce Initializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TestLoginsAssignClassType_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["TestLoginsAssignClassType_ModuleProcessor"]: new TestLoginsAssignClassType_ModuleProcessor() };

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    TestLoginsAssignClassType_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.TestLoginsAssignClassType_ModuleProcessor.Initialize(objContext, objContext.TestLoginsAssignClassType_ModuleProcessor);

    /**
     * @name GetTableHeaders
     * @summary returns the headers.
     * */
    function GetTableHeaders() {
        let arrClassTypeData = objContext.TestLoginsAssignClassType_ModuleProcessor.GetClassType(objContext);
        let arrData = [];
        let objTextResource = props.Resource.Text;
        for (let intCount = 0; intCount < 2; intCount++) {
            if (intCount === 0) {
                arrData = [...arrData,
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'AssignClassTypePopupPupilNameHeading')}</td>
                    <td>{Localization.TextFormatter(objTextResource, 'AssignClassTypePopupPupilFirstNameHeading')} </td>
                    <td>{Localization.TextFormatter(objTextResource, 'AssignClassTypePopupPupilDobHeading')}</td>
                    <td>{Localization.TextFormatter(objTextResource, 'AssignClassTypePopupTestNameHeading')}</td>
                    {
                        arrClassTypeData.map(objTempData => {
                            let objClassTypeDetails = objTempData["t_TestDrive_Member_ClassType_Data"].filter(objTempClassTypeDetails => objTempClassTypeDetails["iLanguageId"] === parseInt(JConfiguration["InterfaceLanguageId"]))[0];
                            return (<td>{objClassTypeDetails["vClassTypeName"]}</td>);
                        })
                    }
                </tr>
                ];
            }
            else {
                arrData = [...arrData,
                <tr>
                    <td />
                    <td />
                    <td />
                    <td />
                    {
                        arrClassTypeData.map(objTempData => {
                            if (state.blnIsSelectAll && state.intSelectAllClassTypeId === objTempData["iClassTypeId"]) {
                                return (
                                    <td>
                                        <label class="checkbox-container">
                                            <input type="checkbox" onClick={() => { objContext.TestLoginsAssignClassType_ModuleProcessor.OnChangeSelectionAll(objContext, false, objTempData["iClassTypeId"]) }} checked />
                                            <span class="checkmark" />
                                        </label>
                                    </td>
                                );
                            }
                            else {
                                return (
                                    <td>
                                        <label class="checkbox-container">
                                            <input type="checkbox" onClick={() => { objContext.TestLoginsAssignClassType_ModuleProcessor.OnChangeSelectionAll(objContext, true, objTempData["iClassTypeId"]) }} />
                                            <span class="checkmark" />
                                        </label>
                                    </td>
                                );
                            }
                        })
                    }
                </tr>
                ];
            }
        }
        return arrData;
    }

    /**
     * @name GetTableBody
     * @summary returns the assign class type elements.
     * */
    function GetTableBody() {
        let arrClassTypeData = objContext.TestLoginsAssignClassType_ModuleProcessor.GetClassType(objContext);
        let arrData = [];
        props.Data.PupilAndTestData.forEach(objTempData => {
            arrData = [...arrData,
            <tr>
                <td>
                    {objTempData["Pupil"]["vName"]}
                </td>
                <td>
                    {objTempData["Pupil"]["vFirstName"]}
                </td>
                <td>
                    {objTempData["Pupil"]["vBirthdate"]}
                </td>
                <td>
                    {objTempData["Test"]["vTestName"]}
                </td>
                {
                    arrClassTypeData.map(objTempClassTypeData => {
                        if (state.arrSelectedData.filter(objTempSelectedData => { return objTempSelectedData["iClassTypeId"] === objTempClassTypeData["iClassTypeId"] && objTempSelectedData["uPupilId"] === objTempData["Pupil"]["uPupilId"] }).length > 0) {
                            return (
                                <td>
                                    <label class="radio-container">
                                        <input type="checkbox" onClick={() => { objContext.TestLoginsAssignClassType_ModuleProcessor.OnChangeSelection(objContext, false, objTempClassTypeData["iClassTypeId"], objTempData["Pupil"]["uPupilId"]) }} checked />
                                        <span class="checkmark" />
                                    </label>
                                </td>
                            );
                        }
                        else {
                            return (
                                <td>
                                    <label class="radio-container">
                                        <input type="checkbox" onClick={() => { objContext.TestLoginsAssignClassType_ModuleProcessor.OnChangeSelection(objContext, true, objTempClassTypeData["iClassTypeId"], objTempData["Pupil"]["uPupilId"]) }} />
                                        <span class="checkmark" />
                                    </label>
                                </td>
                            );
                        }
                    })
                }
            </tr>
            ];
        });
        return arrData;
    }

    /**
     * @name GetContent
     * @summary returns the actual JSX for component.
     * */
    function GetContent() {
        let objTextResource = props.Resource.Text;
        return (
            <div className="test-login-assignclasstype">
                <div className="test-login-assignclasstype-header" id="TestLoginsAssignClassType-header">
                    <h2>{Localization.TextFormatter(objTextResource, 'AssignClassTypePopupHeading')}</h2>
                    <span className="close" onClick={() => { Popup.ClosePopup(props.Id) }}>
                        {Localization.TextFormatter(objTextResource, 'AssignClassTypePopupCloseButton')}
                        <img src={CloseImage} alt="" />
                    </span>
                </div>
                <div className="test-login-assignclasstype-table">
                    <WrapperComponent
                        ComponentName={"FillHeight"}
                        Id="TestLoginFillHeight"
                        Meta={{
                            HeaderIds: ["TestLoginsAssignClassType-header"],
                            FooterIds: ["tlac-footer"]
                        }}
                        ParentProps={{ ...props }}
                    >
                        <table>
                            {
                                GetTableHeaders()
                            }
                            {
                                GetTableBody()
                            }
                        </table>
                    </WrapperComponent>
                    <div className="tlac" id="tlac-footer">
                        {
                            state.blnShowValidationMessage ?
                                <div>
                                    {
                                        Localization.TextFormatter(objTextResource, 'AssignClassTypePopupValidationMessage')
                                    }
                                </div> :
                                <React.Fragment></React.Fragment>
                        }
                        <button className="button high-stake-button" onClick={() => objContext.TestLoginsAssignClassType_ModuleProcessor.SaveData(objContext)}>
                            {Localization.TextFormatter(objTextResource, 'AssignClassTypePopupSaveButton')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (<React.Fragment>{state.isLoadComplete ? <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}</React.Fragment>);
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(TestLoginsAssignClassType_ModuleProcessor.StoreMapList()))(TestLoginsAssignClassType);


/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TestLoginsAssignClassType_ModuleProcessor; 