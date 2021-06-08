//React related imports.
import React, { useReducer } from "react";
import { connect } from 'react-redux';

//Module related files.
import * as Licenses_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/Licenses/Licenses_Hook';
import Licenses_ModuleProcessor from '@shared/Application/d.Extranet/2_School/PC/Modules/Licenses/Licenses_ModuleProcessor';

/**
* @name Licenses
* @param {object} props props
* @summary This component displays the Licenses data in grid and let us manipulate those data.
* @returns {object} div that encapsulated the grid with Teacher details.
*/
const Licenses = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Licenses_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state, dispatch and module processor, TextResource object in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Licenses", ["Licenses_ModuleProcessor"]: new Licenses_ModuleProcessor() };

    /**
    * @name  InitializeDataForSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.Licenses_ModuleProcessor.Initialize(objContext, objContext.Licenses_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Licenses_Hook, that contains all the custom hooks.
    * @returns null
    */
    Licenses_Hook.Initialize(objContext);

    /**
    * @name GetHeaderElements
    * @param {array} arrData Data array
    * @summary Returns the jsx of Headers
    * @returns {object} jsx, React.Fragment
    */
    function GetHeaderElements(arrData) {
        let arrElements = arrData.map(hdr => {
            return (
                <td>{hdr.vHeaderName}</td>
            );
        });
        return arrElements;
    }

    /**
    * @name GetRowElements
    * @param {array} arrDisplay Display array
    * @summary Returns the jsx of Rows
    * @returns {object} jsx, React.Fragment
    */
    function GetRowElements(arrDisplay) {
        let arrElements = arrDisplay.map(itm => {
            return (
                <tr className="class-license-table-rows">
                    <td>{itm.vTeacherName}</td>
                    <td> {itm.vClassName} </td>
                    <td>
                        <label className="check-container">
                            <input type="checkbox" checked={itm.HasPackage} onChange={(e) => { objContext.Licenses_ModuleProcessor.UpdatePackageCheckBox(objContext, itm, e.target.checked); }} />
                            <span className="checkmark" />
                        </label>
                    </td>
                    {
                        itm.Test1 && itm.Test2 && itm.Test3 ?
                            <React.Fragment>
                                <td>
                                    <label className="check-container">
                                        <input type="checkbox" checked={itm.Test1.isSelected} onChange={(e) => { objContext.Licenses_ModuleProcessor.UpdateTestCheckBox(objContext, itm, 'Test1', e.target.checked); }} />
                                        <span className="checkmark" />
                                    </label>
                                </td>
                                <td>
                                    <label className="check-container">
                                        <input type="checkbox" checked={itm.Test2.isSelected} onChange={(e) => { objContext.Licenses_ModuleProcessor.UpdateTestCheckBox(objContext, itm, 'Test2', e.target.checked); }} />
                                        <span className="checkmark" />
                                    </label>
                                </td>
                                <td>
                                    <label className="check-container">
                                        <input type="checkbox" checked={itm.Test3.isSelected} onChange={(e) => { objContext.Licenses_ModuleProcessor.UpdateTestCheckBox(objContext, itm, 'Test3', e.target.checked); }} />
                                        <span className="checkmark" />
                                    </label>
                                </td>
                            </React.Fragment> : null
                    }
                </tr>
            );
        });
        return arrElements;
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let objLicense = objContext.Licenses_ModuleProcessor.GetLicense(objContext);
        let arrLicenseData = objContext.Licenses_ModuleProcessor.GetLicenseData(objContext);
        let arrHeaderData = objLicense["HeaderData"];

        let arrSchoolYearPeriod = DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];
        let strSchoolYearPeriodId = "00000000-0000-0000-0000-000000000000";
        let strCurrentSchoolYearText = "";
        if (arrSchoolYearPeriod !== undefined && arrSchoolYearPeriod.length > 0) {
            strSchoolYearPeriodId = state.strSchoolYearPeriodId ? state.strSchoolYearPeriodId : arrSchoolYearPeriod[0].uSchoolYearPeriodId;
            strCurrentSchoolYearText = arrSchoolYearPeriod[0]["t_TestDrive_Member_Class_SchoolYearPeriod_Data"][0]["vSchoolYearName"];
        }
        if (!state.blnManipulatedDataLoaded) {
            let arrTeacherAndClassDataBySchoolYearId = objLicense["TeacherAndClassData"].filter(x => x["uSchoolYearPeriodId"] === strSchoolYearPeriodId);
            objContext.Licenses_ModuleProcessor.GetDisplayElements(objContext, arrTeacherAndClassDataBySchoolYearId, arrLicenseData, arrHeaderData);
        }
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/2_School/Modules/Licenses", props);
        if (objTextResource == null || objTextResource == undefined)
            objTextResource = {};

        let strYellowBarText = props.ClientUserDetails.MainClientId == "115" && props.ClientUserDetails.SchoolDetails.iStateId == "533" ? objTextResource.YellowBarTextStGallenState : objTextResource.YellowBarText;

        strYellowBarText = strYellowBarText == undefined ? "" : strYellowBarText.replace("{}", strCurrentSchoolYearText);
        return (
            <React.Fragment>
                <div className="light-brown-bg class-license-wrapper">
                    <div className="top-spacing" id="TopSpacing" />
                    <div className="padding-20">
                        <div className="padding-top-20" id="ClassLicenseHeaderText">
                            {
                                state.blnShowInformationBar ?
                                    <div className="class-license-header-text">
                                        {strYellowBarText}
                                    </div>
                                    : <React.Fragment />
                            }
                        </div>
                        <div className={state.blnShowInformationBar ? "padding-top-10" :""} id="ClassLicenseHeaderDropdown">
                            <div className="class-license-top-head">
                                <span>{Localization.TextFormatter(objTextResource, 'SchoolYear')}:</span>
                                <div className="content-dropdown">
                                    <PerformanceProfiler ComponentName={'LicenseSchoolYearPeriodDropdown'} JConfiguration={props.JConfiguration} >
                                        <WrapperComponent
                                            ComponentName={"Dropdown"}
                                            Id="LicenseSchoolYearPeriodDropdown"
                                            Meta={objContext.Licenses_ModuleProcessor.GetMetaDataSchoolYearPeriodDropdown()}
                                            Data={objContext.Licenses_ModuleProcessor.GetDataSchoolYearPeriodDropdown(objContext, strSchoolYearPeriodId)}
                                            Resource={objContext.Licenses_ModuleProcessor.GetResourceDataSchoolYearPeriodDropdown()}
                                            Events={objContext.Licenses_ModuleProcessor.GetEventsDataSchoolYearPeriodDropdown(objContext)}
                                            ParentProps={{ ...props }}
                                        />
                                    </PerformanceProfiler>
                                </div>
                                <button class="button yellow-button information-button" onClick={() => { objContext.Licenses_ModuleProcessor.UpdateInformationPopupStatus(objContext) }}>{state.blnShowInformationBar ? Localization.TextFormatter(objTextResource, 'HideInformationBar') : Localization.TextFormatter(objTextResource, 'ShowInformationBar')}</button>
                            </div>
                        </div>
                        {
                            state.arrDisplayData.length > 0 ?
                                <WrapperComponent
                                    ComponentName={"FillHeight"}
                                    Id="FillHeightSchoolYearPeriod" Meta={objContext.Licenses_ModuleProcessor.GetMetaDataFillheightSchoolYearPeriod()} ParentProps={{ ...props }}>
                                    <table className="class-license-wrapper-table">
                                        <thead>
                                            <tr className="class-license-header-row">
                                                <td> {Localization.TextFormatter(objTextResource, 'Teacher')} </td>
                                                <td> {Localization.TextFormatter(objTextResource, 'Class')} </td>
                                                <td> {Localization.TextFormatter(objTextResource, 'Package')} </td>
                                                {arrHeaderData && arrHeaderData.length > 0 ? GetHeaderElements(arrHeaderData) : null}
                                            </tr>
                                        </thead>
                                        {state.blnManipulatedDataLoaded ? GetRowElements(state.arrDisplayData) : ''}
                                    </table>
                                </WrapperComponent>
                                :
                                <div className="noData-wrapper">
                                    <div className="noData-text">
                                        <span className="noData-text-header"><b>{Localization.TextFormatter(objTextResource, 'EmptyDataMessageHeader')}</b></span>
                                        <span>{Localization.TextFormatter(objTextResource, 'EmptyDataMessage')}</span>
                                    </div>
                                </div>
                        }
                    </div>

                    <div className="footer-class-license" id="FooterClassLicense">
                        {state.arrDisplayData.length > 0 &&
                            <button className="button brown-button" onClick={() => { objContext.Licenses_ModuleProcessor.OnClickSave(objContext, strSchoolYearPeriodId); }}>{Localization.TextFormatter(objTextResource, 'Save')}</button>
                        }
                    </div>
                </div>
            </React.Fragment >
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default connect(ExtranetBase_Hook.MapStoreToProps(Licenses_ModuleProcessor.StoreMapList()))(Licenses);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Licenses_ModuleProcessor; 