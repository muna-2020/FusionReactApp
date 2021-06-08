//React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as SchoolRegistration_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolRegistration/SchoolRegistration_Hook';
import SchoolRegistration_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/SchoolRegistration/SchoolRegistration_ModuleProcessor';

//Components used in module.
import Form from '@root/Framework/Blocks/Form/Form';

/**
* @name SchoolRegistration
* @param {object} props props
* @summary This component displays the SchoolRegistration data in form and let us manipulate those data.
* @returns {object} div that encapsulated the form with SchoolRegistration details.
*/
const SchoolRegistration = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, SchoolRegistration_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "SchoolRegistration", ["SchoolRegistration_ModuleProcessor"]: new SchoolRegistration_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.SchoolRegistration_ModuleProcessor.Initialize(objContext, objContext.SchoolRegistration_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in SchoolRegistration_Hook, that contains all the custom hooks.
    * @returns null
    */
    SchoolRegistration_Hook.Initialize(objContext);

    /**
    * @name FormRef
    * @summary Creates a Reference constant with value null.
    * @returns {object} Reference
    */
    const FormRef = useRef(null);

    /**
    * @name GetForm
    * @param {object} props Passes props
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    const GetForm = () => {
        var objTextResource = objContext.state.objSchoolRegistration.Object_Framework_Services_TextResource[0].SchoolRegistration;//objContext.Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/SchoolRegistration", props);

        return (
            <div id="SchoolRegistrationPopup" >
                <div className="school-registration">
                    {!state.blnShowLoginLink ? <React.Fragment>
                        <div className="schoolregistration-close-button" id="RegistrationHeader" onClick={() => { Popup.ClosePopup(props.Id) }}>
                            <img src={props.Resource.SkinPath + "/Images/Common/Icons/close_text_white.png"} />
                        </div>

                        <div>
                            {state.blnEmailAlreadyRegistered && <span className="alert-text">
                                Ihre Schule ist bereits registriert – bitte nutzen Sie die Passwort vergessen Funktion. <br />
                                Bei weiteren Fragen kontaktieren Sie bitte den Lernpass plus Support: 058 228 76 90. Besten Dank.
                            </span>
                            }
                        </div>

                        <div className="school-registration-wrapper">
                            <div className="schoolregistration-title">
                                Anmeldung für Schulen
                        </div>
                            <PerformanceProfiler ComponentName={"SchoolRegistration_Form"} JConfiguration={props.JConfiguration} >
                                <Form
                                    Id="SchoolRegistration_Form"
                                    ref={FormRef}
                                    Meta={objContext.SchoolRegistration_ModuleProcessor.GetFormMetaData(objContext)}
                                    Data={objContext.SchoolRegistration_ModuleProcessor.GetFormData(objContext)}
                                    Resource={objContext.SchoolRegistration_ModuleProcessor.GetFormResourceData(objTextResource)}
                                    ParentProps={{ ...props }}
                                />
                            </PerformanceProfiler>
                            <div className="required-field-text"><span>* bitte ausfullen</span></div>
                            <div className="submit-button">
                                <button onClick={() => objContext.SchoolRegistration_ModuleProcessor.SaveData(objContext, FormRef.current)}>
                                    {Localization.TextFormatter(objTextResource, 'SaveButton')}
                                </button>
                            </div>
                        </div>
                    </React.Fragment> :
                        <React.Fragment>
                            <div className="tologin">
                                <div className="schoolregistration-close-button" id="RegistrationHeader" onClick={() => { Popup.ClosePopup(props.Id) }}>
                                    <img src={props.Resource.SkinPath + "/Images/Common/Icons/close_text_white.png"} />
                                </div>
                                <div className="tologin-title">
                                    Anmeldung für Schulen
                            </div>
                                <p>{Localization.TextFormatter(objTextResource, 'SuccessMessage')}</p>
                                <div className="tologin-button">
                                    <button onClick={() => { Popup.ClosePopup(objContext.props.Id) }}>
                                        <span>Zum Login -></span>
                                        {/* <img src={props.Resource.SkinPath + "/Images/Common/Icons/angle_down_white.png"} /> */}
                                    </button>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
        );
    };

    return (
        <div>
            {props.isLoadComplete || state.isLoadComplete ? GetForm() : <React.Fragment />}
            {/*<FillHeight Id="FillHeightSchoolRegistration" Meta={objContext.SchoolRegistration_ModuleProcessor.GetMetaDataFillheightSchoolRegistration()} ParentProps={{ ...props }}>
                <div className="light-brown-bg school-profile">
                    
                </div>
            </FillHeight>*/}
        </div>
    );
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(SchoolRegistration_ModuleProcessor.StoreMapList()))(SchoolRegistration);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = SchoolRegistration_ModuleProcessor; 


//const [state, dispatch] = useReducer(SchoolRegistrationBussinessLogic.Reducer, SchoolRegistrationBussinessLogic.GetInitialState(props));

//let objContext = { state, props, dispatch };

//var strDropdownImage = "/Images/Common/Icons/angle_down_white.svg";

////using custom hook
//SchoolRegistrationBussinessLogic.useDataLoader(objContext);

//SchoolRegistrationBussinessLogic.useDataLoaded(objContext);

//SchoolRegistrationBussinessLogic.useFormStatusMessage(objContext);

//const FormRef = useRef(null);

//useEffect(() => {
//    if (state.strFormStatus === 0) {
//        var arrInvalidFields = ["vEmail"];
//        FormRef.current.SetInvalidFields(arrInvalidFields);
//    }
//    else if (state.strFormStatus === 1) {
//        var arrInvalidFields = ["iZIPCode"];
//        FormRef.current.SetInvalidFields(arrInvalidFields);
//    }
//}, [state.strFormStatus]);

//const GetForm = (props) => {

//    if (((state.arrObjectGenerator).length > 0) && ((state.arrSchoolType).length > 0) && ((state.arrStateId).length > 0) && ((state.arrTextresource).length > 0) && ((state.arrTitleId).length > 0)) {
//        let objDefaultData = {
//            "iSchoolTypeId": "",
//            "iStateId": "",
//            "iTitleId": "",
//            "iZIPCode": "",
//            "vEmail": "",
//            "vFirstName": "",
//            "vName": "",
//            "vPhone": "",
//            "vSchoolName": "",
//            "vStreet": "",
//            "vTown": "",
//            "vAnnotation": ""
//        };

//        const objResourceData = state.arrTextresource["0"]["SchoolRegistration"];
//        const arrStateData = state.arrStateId;
//        const arrSchoolTypeData = state.arrSchoolType;
//        const arrTitleData = state.arrTitleId;
//        let strTextImportantFieldMessage = "* bitte ausfüllen.";
//        var objDropDownData = {
//            iSchoolTypeId: {
//                "ValueColumn": "iSchoolTypeId",
//                "DisplayColumn": "vSchoolTypeName",
//                "cISLanguageDependent": "Y",
//                "DependingTableName": "t_TestDrive_Member_School_SchoolType_Data",
//                // "CheckDeletedDropDownData":"N",
//                "Data": arrSchoolTypeData
//            },
//            iTitleId: {
//                "ValueColumn": "iTitleId",
//                "DisplayColumn": "vTitleName",
//                "cISLanguageDependent": "Y",
//                "DependingTableName": "t_TestDrive_Member_Title_Data",
//                // "CheckDeletedDropDownData":"N",
//                "Data": arrTitleData
//            },
//            iStateId: {
//                "ValueColumn": "iStateId",
//                "DisplayColumn": "vStateName",
//                "cISLanguageDependent": "Y",
//                "DependingTableName": "t_TestDrive_Member_State_Data",
//                // "CheckDeletedDropDownData":"Y",
//                "Data": arrStateData
//            }
//        };

//        const objConfigurationData = state.arrObjectGenerator;
//        const arrMetaData = JSON.parse(JSON.stringify(objConfigurationData["0"]["t_Framework_ObjectConfiguration_Column"]));
//        let objTextResource = state.arrTextresource["0"]["SchoolRegistration"];
//        return (
//            <React.Fragment>
//                <div className="title">{objResourceData.RegistrationTitle}</div>
//                {
//                    state.strFormStatus !== 2 ?
//                        (
//                            <React.Fragment>
//                                <Form
//                                    ref={FormRef}
//                                    MetaData={arrMetaData}
//                                    Data={objDefaultData}
//                                    ResourceData={objResourceData}
//                                    DropDownData={objDropDownData}
//                                    JConfiguration={props.JConfiguration}
//                                    ImportantTextMessage={strTextImportantFieldMessage}
//                                    ImgPath={strDropdownImage}
//                                    GetValidationMessage={(strValidationType) => { SchoolRegistrationBussinessLogic.GetValidationMessage(objContext, strValidationType) }}
//                                    // ActionMethod={data => SchoolRegistrationBussinessLogic.SaveData(objContext,data)} 
//                                    AddForm={true} />
//                                <div className="wrap">
//                                    <span className="text-color">
//                                        {state.strFormStatusMessage === "" ? state.strValidationMessage : state.strFormStatusMessage}
//                                    </span>
//                                    <button className="button yellow-button" onClick={() => { SchoolRegistrationBussinessLogic.SaveData(objContext, FormRef.current) }}>
//                                        {Localization.TextFormatter(objTextResource, 'SaveButton')}
//                                    </button>
//                                </div>
//                            </React.Fragment>
//                        ) :
//                        <div className="success-message">
//                            <p>{Localization.TextFormatter(objTextResource, 'SuccessMessage')}</p>
//                            <div className="back-button">
//                                <span className="login-back" onClick={() => { SchoolRegistrationBussinessLogic.LoadPrevComponent(objContext) }}>{Localization.TextFormatter(objTextResource, 'LoginForm')}</span>
//                            </div>
//                        </div>
//                }
//            </React.Fragment>
//        );
//    }
//    else {
//        return <React.Fragment />
//    }
//}
//return (
//    <React.Fragment>
//        <div className="schoolregistration-close-button" id="SchoolRegistrationHeader" onClick={e => props.closePopUp(props.objModal)}>
//            <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/close_text_white.png"} alt="" />
//        </div>
//        <div className="school-registration">
//            {props.isLoadComplete || state.isLoadComplete ? GetForm(props) : <React.Fragment />}
//        </div>
//    </React.Fragment>
//);