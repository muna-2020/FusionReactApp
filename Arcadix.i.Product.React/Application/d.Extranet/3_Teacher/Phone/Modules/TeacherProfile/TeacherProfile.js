//React related imports.
import React, { useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as TeacherProfile_Hook from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherProfile/TeacherProfile_Hook';
import TeacherProfile_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherProfile/TeacherProfile_ModuleProcessor';

//Components used in module.
//import Form from '@root/Framework/Blocks/FormGenerator/Form';
import Form from '@root/Framework/Blocks/Form/Form';

//Inline Images import
import ExclamationMarkImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/exclamation_mark.svg?inline';

/**
* @name TeacherProfile
* @param {object} props props
* @summary This component displays the TeacherProfile data in form and let us manipulate those data.
* @returns {object} div that encapsulated the form with TeacherProfile details.
*/
const TeacherProfile = props => {

    const errMessagePassRef = useRef(null)

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TeacherProfile_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TeacherProfile", ["TeacherProfile_ModuleProcessor"]: new TeacherProfile_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TeacherProfile_ModuleProcessor.Initialize(objContext, objContext.TeacherProfile_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in TeacherProfile_Hook, that contains all the custom hooks.
    * @returns null
    */
    TeacherProfile_Hook.Initialize(objContext);

    /**
    * @name FormRef
    * @summary Creates a Reference constant with value null.
    * @returns {object} Reference
    */
    const FormRef = useRef(null);

    let AddValidationHtml = () => {
        return (
            <React.Fragment>
                <img src={ExclamationMarkImage} />
                <span className='validationmessage'>{state.strPasswordMessage}</span>
            </React.Fragment>
        )
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objTextResourceData = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherProfile", props);
        let arrMetaData = objContext.TeacherProfile_ModuleProcessor.GetMetaData(objContext);

        let objFormMeta = {
            HeaderData: arrMetaData,
            ValidationDivName: "divTeacherProfileErrorMessage",
            AddForm: false
        };
        let objTeacherData = {};
        if (DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uTeacherId;" + objContext.props.ClientUserDetails.UserId)) {
            objTeacherData = DataRef(objContext.props.Object_Extranet_Teacher_Teacher, "Object_Extranet_Teacher_Teacher;t_TestDrive_Member_Teacher_School.uTeacherId;" + objContext.props.ClientUserDetails.UserId)["Data"][0];
        }
        let objFormData = {
            FormData: objTeacherData,
            LabelData: objContext.TeacherProfile_ModuleProcessor.GetLabelData(objContext),
            DropDownData: objContext.TeacherProfile_ModuleProcessor.GetDropDownData(objContext)
        };
        var objFormResource = {
            Text: objTextResourceData,
            SkinPath: JConfiguration.ExtranetSkinPath
        };

        return (
            <div className="profile">
                <div className="profile-title">
                    <span>Profil</span>
                    <div className="outlet-block">
                        <div className="trigger-icon">
                            <img
                                src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/exclamation_mark.svg")}

                            />
                        </div>
                        <span className="text-close">
                            Schliessen
                            <img
                                src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/closeSmall.svg")}

                            />
                            </span>
                    </div>
                </div>

                <div className="profile-main-wrapper">
                    <div className="profile-main">
                        <PerformanceProfiler ComponentName={"TeacherProfileForm"} JConfiguration={props.JConfiguration} >
                            <Form
                                Id="TeacherProfileForm"
                                ref={FormRef}
                                Meta={objFormMeta}
                                Data={objFormData}
                                Resource={objFormResource}
                                ParentProps={{ ...props }}
                            />
                        </PerformanceProfiler>
                        <span className="validation-message">
                            <div className="error-message" id="divTeacherProfileErrorMessage" />
                            <div className="error-message" id="divTeacherProfileErrorMessage_Password" ref={errMessagePassRef}>
                                {
                                    state.strPasswordMessage ?
                                        <React.Fragment>
                                            {AddValidationHtml()}
                                        </React.Fragment>
                                        :
                                        <React.Fragment />
                                }
                            </div>
                        </span>
                        <div className="mein-profile-submit-btn">
                            <button onClick={() => objContext.TeacherProfile_ModuleProcessor.EditData(objContext, FormRef.current, objTextResourceData)}>{Localization.TextFormatter(objTextResourceData, 'SaveButtonText')}</button>
                        </div>
                    </div>

                    {/* <div className="profile-main">
                        <div className="flex-form-input">
                            <span><b>Schulhausname</b></span>
                            <span class="required-field">: *</span>
                            <input id="vSchoolName" type="text" class="" value="School_Name" />
                        </div>

                        <div className="flex-form-input flex-password-input">
                            <span>Kanton</span>
                            <span class="required-field">: *</span>
                            <span id="iStateId" class="uneditable-span">Bern</span>
                        </div>

                        <div class="flex-form-input">
                            <span>Ort</span>
                            <span class="required-field">:</span>
                            <input id="vStreet" type="text" class="" value="strasse" />
                        </div>

                        <div class="flex-form-input">
                            <span>Telefon</span>
                            <span class="required-field">:</span>
                            <input id="vPhone" type="text" class="" value="4545" />
                        </div>

                        <div class="flex-form-input flex-password-input">
                            <span> <b>Schulstatus</b></span>
                            <span class="required-field">: *</span>
                            <div id="iSchoolTypeId">
                                <div id="DropDowniSchoolTypeId575164049" class="dropdown-wrapper">
                                    <button id="DropDowniSchoolTypeId_button" class="dropdown-trigger">
                                        <span></span>
                                        <img
                                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.svg")}

                                        />
                                            </button>
                                        <ul id="DropDowniSchoolTypeId_ul" class="dropdown-list"></ul>
                                        </div>
                                </div>
                        </div>

                        <div class="flex-form-input">
                            <span> <b>PLZ</b></span>
                            <span class="required-field">: *</span>
                            <input id="iZIPCode" type="text" class="" value="7878" />
                        </div>

                        <div class="flex-form-input flex-password-input">
                            <span> <b>Anrede</b></span>
                            <span class="required-field">: *</span>
                            <div id="iTitleId">
                                <div id="DropDowniTitleId924402273" class="dropdown-wrapper">
                                    <button id="DropDowniTitleId_button" class="dropdown-trigger">
                                        <span>Herr</span>
                                        <img
                                            src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_down.svg")}

                                        />
                                            </button>
                                        <ul id="DropDowniTitleId_ul" class="dropdown-list">
                                            <li id="DropDowniTitleId_li_0" index="0" class="active">Herr</li>
                                            <li id="DropDowniTitleId_li_1" index="1" class="">Frau</li>
                                        </ul>
                                        </div>
                                </div>
                        </div>

                        <div class="flex-form-input">
                            <span> <b>Vorname</b></span>
                            <span class="required-field">: *</span>
                            <input id="vFirstName" type="text" class="" value="Vorname" />
                        </div>

                        <div class="flex-form-input">
                            <span> <b>Name</b></span>
                            <span class="required-field">: *</span>
                            <input id="vName" type="text" class="" value="Name" />
                        </div>

                        <div class="flex-form-input">
                            <span> <b>E-Mail</b></span>
                            <span class="required-field">: *</span>
                            <input id="vEmail" type="text" class="" value="praveen@arcadix.com" />
                        </div>

                        <div class="flex-form-input">
                            <span>Strasse</span>
                            <span class="required-field">:</span>
                            <input id="vTown" type="text" class="" value="787" />
                        </div>

                        <div class="flex-form-input flex-password-input flex-password">
                            <span>Passwort ändern</span>
                            <span class="required-field">:</span>
                            <div class="password-flex">
                                <input type="password" class="" id="vPassword" placeholder="Neues Passwort" autocomplete="new-password" value="" />
                                <input type="password" class="" id="ConfirmPassword" placeholder="Wiederholen" />
                            </div>
                        </div>

                        <div className="mein-profile-submit-btn">
                            <button>Speichern</button>
                        </div>
                    </div>
                 */}
                </div>


            </div>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(TeacherProfile_ModuleProcessor.StoreMapList()))(TeacherProfile);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TeacherProfile_ModuleProcessor; 