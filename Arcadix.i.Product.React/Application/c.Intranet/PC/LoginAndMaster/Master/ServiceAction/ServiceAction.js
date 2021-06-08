import * as React from "react";
import { connect } from "react-redux";
import * as QueryString from '@root/Framework/Services/QueryString/QueryString';
import * as IntranetBase_Hook from "@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook";
//Module related imports
import ServiceAction_ModuleProcessor from "@shared/Application/c.Intranet/LoginAndMaster/Master/ServiceAction/ServiceAction_ModuleProcessor";

const ServiceAction = props => {


    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { props, ["ModuleName"]: props.Id, ["ServiceAction_ModuleProcessor"]: new ServiceAction_ModuleProcessor() };

    /**
     * @name GetLanguageDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetLanguageDropDown = () => {
        let DropDown = props.ParentProps.ComponentController.GetFrameworkComponent("Dropdown");
        return (
            <DropDown
                Id="iLanguageId"
                Data={{
                    DropdownData: props.Data.DropdownData.LanguageData,
                    SelectedValue: QueryString.GetQueryStringValue("LanguageId") ? QueryString.GetQueryStringValue("LanguageId") : props.JConfiguration.InterfaceLanguageId
                }}
                Meta={{
                    DependingTableName: "t_Framework_Language_Data",
                    IsLanguageDependent: "Y",
                    ValueColumn: "iFrameworkLanguageId",
                    DisplayColumn: "vLanguageName",
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(props.Resource.Text, "PleaseChoose")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" && props.Data.DropdownData.MainClientLanguageData.find(obj => obj["iLanguageId"] == objNode["iFrameworkLanguageId"]) ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData) => props.Events.OnChangeEventHandler(objChangeData),
                }}
                ParentProps={{ ...props.ParentProps }}
            />
        );
    }

    /**
     * @name GetCountryDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetCountryDropDown = () => {
        let DropDown = props.ParentProps.ComponentController.GetFrameworkComponent("Dropdown");
        let objCountryConfigured = props.Data.DropdownData.CountryData.find(obj => obj["vCountryCultureInfo"] == props.JConfiguration.CountryCultureInfo);
        return (
            <DropDown
                Id="iLanguageId"
                Data={{
                    DropdownData: props.Data.DropdownData.CountryData,
                    SelectedValue: QueryString.GetQueryStringValue("CountryId") ? QueryString.GetQueryStringValue("CountryId") : objCountryConfigured.iCountryId
                }}
                Meta={{
                    //DependingTableName: "t_Framework_Country_Data",
                    //IsLanguageDependent: "Y",
                    ValueColumn: "iCountryId",
                    DisplayColumn: "vCountryCultureInfo",
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(props.Resource.Text, "PleaseChoose")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" && props.Data.DropdownData.MainClientCountryData.find(obj => obj["iCountryId"] == objNode["iCountryId"]) ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData) => props.Events.OnChangeEventHandler(objChangeData),
                }}
                ParentProps={{ ...props.ParentProps }}
            />
        );
    }

    return (
        <div className="top-right">
            <ul>

                <li>
                    <img
                        src={
                            props.JConfiguration.IntranetSkinPath +
                            "/Images/Common/Icons/UserTop.svg"
                        }

                    />
                    <span>{Localization.TextFormatter(props.Resource.Text, "User") + ": " + props.ParentProps.ClientUserDetails.UserName}</span>                   
                </li>
                <li>
                    <img src={props.ParentProps.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/FileStatus.svg"} title={props.RunningOfflineProcesses + " processes running of " + props.TotalOfflineProcesses} />
                    <span onClick={() => objContext.ServiceAction_ModuleProcessor.ShowOfflinePopup(objContext)}>{props.RunningOfflineProcesses + "/" + props.TotalOfflineProcesses}</span>
                </li>
                {
                    //<li>
                    //    <div className="language-dropdown">
                    //        <span>Language</span>
                    //        <div id="iLanguageId119226210" className="dropdown-wrapper"> <button id="iLanguageId_button"
                    //            className="dropdown-trigger"><span>Please Choose</span><img
                    //                src="http://localhost:9004/Themes/Default/c.Intranet/Skin2018/Images/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/angle_down.png" /></button>
                    //            <ul id="iLanguageId_ul" className="dropdown-list">
                    //                <li id="iLanguageId_li_0" index="0" className="active">Please Choose</li>
                    //                <li id="iLanguageId_li_1" index="1" className="">Englisch</li>
                    //                <li id="iLanguageId_li_2" index="2" className="">Französisch</li>
                    //                <li id="iLanguageId_li_3" index="3" className="">Deutsch</li>
                    //                <li id="iLanguageId_li_4" index="4" className="">Italienisch</li>
                    //            </ul>
                    //        </div>
                    //    </div>
                    //</li>
                    //<li>
                    //    <div className="language-dropdown">
                    //        <span>Country</span>
                    //        <div id="iLanguageId707747624" className="dropdown-wrapper"> <button id="iLanguageId_button"
                    //            className="dropdown-trigger"><span>Please Choose</span><img
                    //                src="http://localhost:9004/Themes/Default/c.Intranet/Skin2018/Images/Framework/ReactJs/PC/Controls/Dropdowns/Dropdown/angle_down.png" /></button>
                    //            <ul id="iLanguageId_ul" className="dropdown-list">
                    //                <li id="iLanguageId_li_0" index="0" className="active">Please Choose</li>
                    //                <li id="iLanguageId_li_1" index="1" className="">Schweiz</li>
                    //                <li id="iLanguageId_li_2" index="2" className="">SS</li>
                    //            </ul>
                    //        </div>
                    //    </div>
                    //</li>
                }
                <li>
                    {
                        props.ParentProps.ClientUserDetails.MainClientId != 0
                            ?
                            <div className="top-right language-dropdown" style={{ display: "flex" }}>
                                {
                                    props.Data.DropdownData.MainClientLanguageData && props.Data.DropdownData.MainClientLanguageData.length > 1
                                        ?
                                        <div>
                                            <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(props.Resource.Text, "Language")}</span>
                                            {GetLanguageDropDown()}
                                        </div>
                                        :
                                        <React.Fragment />
                                }
                                {
                                    props.Data.DropdownData.MainClientCountryData && props.Data.DropdownData.MainClientCountryData.length > 1
                                        ?
                                        <div>
                                            <span className="ml-10" style={{ marginRight: "10px" }}>{Localization.TextFormatter(props.Resource.Text, "Country")}</span>
                                            {GetCountryDropDown()}
                                        </div>
                                        :
                                        <React.Fragment />
                                }
                                
                            </div>
                            :
                            <React.Fragment />
                    }
                </li>


                <li>
                    <img
                        src={
                            props.JConfiguration.IntranetSkinPath +
                            "/Images/Common/Icons/Help.svg"
                        }
                        onClick={
                            props.Events.OnHelpClick
                        }
                    />
                </li>
                <li>
                    <img
                        src={
                            props.JConfiguration.IntranetSkinPath +
                            "/Images/Common/Icons/SignoutTop.svg"
                        }                        
                    />
                    <span onClick={props.Events.OnLogoutClick}>{Localization.TextFormatter(props.Resource.Text, "LogOut")}</span>
                </li>
            </ul>
        </div>
    );
};

export default connect(IntranetBase_Hook.MapStoreToProps(ServiceAction_ModuleProcessor.StoreMapList()))(ServiceAction);
