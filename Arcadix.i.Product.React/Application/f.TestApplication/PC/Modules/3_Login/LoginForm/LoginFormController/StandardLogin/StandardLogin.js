//React Related imports
import React, { useReducer, useImperativeHandle } from 'react';

//For API Calls
import LoginForm_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/3_Login/LoginForm/LoginForm_ModuleProcessor';

//For API Calls
import TestApplicationLogin_ModuleProcessor from '@shared/Application/f.TestApplication/PC/Modules/3_Login/TestApplicationLogin_ModuleProcessor';

//Localization for Implement Text Resource
import * as Localization from '@root/Framework/Blocks/Localization/Localization';

//TestApplicationBase_Hook  Having common methods for TestAplication
import * as TestApplicationBase_Hook from '@shared/Framework/BaseClass/TestApplicationBaseClass/TestApplicationBase_Hook';
import { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';

//UseEffect implementation
import * as TestApplicationLogin_Hook from '@shared/Application/f.TestApplication/PC/Modules/3_Login/TestApplicationLogin_Hook';

/**
 * @name StandardLogin
 * @param {object} props props object
 * @summary StandardLogin method contains jsx for user interface.
 * @returns null
 */
const StandardLogin = (props) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(TestApplicationBase_Hook.Reducer, TestApplicationLogin_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and TestApplicationLogin_ModuleProcessor object, which can be passed across method in the module and used
     */
    var objContext = { state, props, dispatch, TestApplicationLogin_ModuleProcessor: new TestApplicationLogin_ModuleProcessor(), LoginForm_ModuleProcessor: new LoginForm_ModuleProcessor() };

    let ErrorMessage = ApplicationState.GetProperty("ErrorMessage");
    let arrLanguageData = DataRef(objContext.props.Object_Cockpit_Language)["Data"];
    let arrCountryData = DataRef(objContext.props.Object_Cockpit_Country)["Data"];
    let strMainClientId = JConfiguration.MainClientId;
    let strApplicationTypeId = JConfiguration.ApplicationTypeId
    let arrMainClientLanguageData = DataRef(objContext.props.Object_Cockpit_MainClient_MainClientLanguage, "Object_Cockpit_MainClient_MainClientLanguage;iMainClientId;" + strMainClientId + ";iApplicationTypeId;" + strApplicationTypeId + ";cIsDeleted;N")["Data"];
    //let arrFilteredLanguageData = objContext.TestApplicationLogin_ModuleProcessor.GetFilteredLanguageData(arrLanguageData, arrMainClientLanguageData);
    let arrMainClientCountryData = DataRef(objContext.props.Object_Cockpit_MainClient_MainClientCountry, "Object_Cockpit_MainClient_MainClientCountry;iMainClientId;" + strMainClientId + ";iApplicationTypeId;" + strApplicationTypeId + ";cIsDeleted;N")["Data"]
    //let objCountryConfigured = arrCountryData.find(obj => obj["vCountryCultureInfo"] == JConfiguration.CountryCultureInfo);

    /**
     * @name useImperativeHandle
     * @summary Used to get data from one component to other
     */
    useImperativeHandle(props.LoginRef, () => ({
        "GetLoginDetails": () => {
            return state.LoginDetails;
        }
    }), [props, state]);

    const GetInput = (strInputId, MaxLength, value) => {
        return (
            <input type="text" id={strInputId} maxLength={MaxLength} value={value}
                onChange={(e) => {
                    objContext.LoginForm_ModuleProcessor.HandleChange(strInputId, e.target.value, objContext)
                }}
                onBlur={(e) => {
                    objContext.LoginForm_ModuleProcessor.OnBlurHandleChange(strInputId, objContext);
                }}
                onFocus={(e) => {
                    objContext.LoginForm_ModuleProcessor.OnFocusHandleChange(strInputId, objContext);
                }} />
        );
    }

    return (
        <React.Fragment>
            {/*login title*/}
            <h4>{Localization.TextFormatter(props.TextResources, "TestApplicationLoginPage_LoginSubTitle")}</h4>
            {/*user Id*/}
            <div className="form-flex">
                <span> {Localization.TextFormatter(props.TextResources, 'TestApplicationLoginControl_Name')}</span>
                {GetInput("Username", 100, state.LoginDetails.Username)}
            </div>
            {
                props.LoginPageProperties && (props.LoginPageProperties.HighStateLoginControlWithoutPassword != "Y") ? <div className="form-flex">

                    <span>{(e) => { Localization.TextFormatter(props.TextResources, 'TestApplicationLoginControl_Password') }}</span>
                    <input type="text" id="Password" onChange={(e) => {
                        objContext.LoginForm_ModuleProcessor.HandleChange("Password", e.target.value, objContext)
                    }} /></div> : <React.Fragment />
            }
            {/*test number*/}
            <div className="form-flex">
                <span>{Localization.TextFormatter(props.TextResources, 'TestApplicationLoginControl_TestTokenNumber')}</span>
                <div className="inner-flex">
                    {GetInput("Token1", 3, state.LoginDetails.Token1)}

                    {GetInput("Token2", 3, state.LoginDetails.Token2)}

                    {GetInput("Token3", 3, state.LoginDetails.Token3)}

                    {GetInput("Token4", 4, state.LoginDetails.Token4)}
                </div>

            </div>
            {
                //arrFilteredLanguageData.length > 1 && <div className="form-flex">
                //    <span></span>
                //    <div className="dropdown-block">
                //        <WrapperComponent
                //            ComponentName={"Dropdown"}
                //            Id="iLanguageId"
                //            Data={{
                //                DropdownData: arrFilteredLanguageData,
                //                SelectedValue: QueryString.GetQueryStringValue("LanguageId") ? QueryString.GetQueryStringValue("LanguageId") : props.JConfiguration.InterfaceLanguageId
                //            }}
                //            Meta={{
                //                DependingTableName: "t_Framework_Language_Data",
                //                IsLanguageDependent: "Y",
                //                ValueColumn: "iFrameworkLanguageId",
                //                DisplayColumn: "vLanguageName",
                //            }}
                //            Resource={{
                //                Text: {
                //                    DefaultOptionText: Localization.TextFormatter(props.TextResources, "PleaseChoose")
                //                },
                //                JConfiguration: props.JConfiguration,
                //                SkinPath: props.JConfiguration.ExtranetSkinPath
                //            }}
                //            Events={{
                //                OnChangeEventHandler: (objChangeData) => objContext.TestApplicationLogin_ModuleProcessor.HandleDropDownChange(objChangeData),
                //            }}
                //            ParentProps={{ ...props }}
                //        />
                //        <WrapperComponent
                //            ComponentName={"Dropdown"}
                //            Id="iCountryId"
                //            Data={{
                //                DropdownData: arrCountryData,
                //                SelectedValue: QueryString.GetQueryStringValue("CountryId") ? QueryString.GetQueryStringValue("CountryId") : objCountryConfigured.iCountryId
                //            }}
                //            Meta={{
                //                ValueColumn: "iCountryId",
                //                DisplayColumn: "vCountryCultureInfo",
                //            }}
                //            Resource={{
                //                Text: {
                //                    DefaultOptionText: Localization.TextFormatter(props.TextResources, "PleaseChoose")
                //                },
                //                JConfiguration: props.JConfiguration,
                //                SkinPath: props.JConfiguration.ExtranetSkinPath
                //            }}
                //            Callbacks={{
                //                CheckDeletedDropDownData: (objNode) => {
                //                    return objNode["cIsDeleted"] == "N" && arrMainClientCountryData.find(obj => obj["iCountryId"] == objNode["iCountryId"]) ? true : false
                //                }
                //            }}
                //            Events={{
                //                OnChangeEventHandler: (objChangeData) => objContext.TestApplicationLogin_ModuleProcessor.HandleDropDownChange(objChangeData),
                //            }}
                //            ParentProps={{ ...props }}
                //        />
                //    </div>
                //</div>
            }

            {/*validation error message*/}
            <div className="errorBlock" id="ErrorMessageBlock">
                {Localization.TextFormatter(props.TextResources, ErrorMessage)}
            </div>

            {/*note on languages*/}
            <p className="note-text">{Localization.TextFormatter(props.TextResources, 'PageOutput_LoginAudiotitle')}</p>

            {/*audio block placeholder*/}


        </React.Fragment >
    );
}

export default StandardLogin;