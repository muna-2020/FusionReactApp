//React related imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as Pupil_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/Pupil_Hook';
import Pupil_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/Pupil_ModuleProcessor";


/**
 * @name Pupil
 * @param {any} props props
 * @summary This component consists Pupil component.
 * @returns {*} jsx
 */
const Pupil = (props) => {

    /**
     * @name Initializing Reducer
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, Pupil_Hook.GetInitialState(props));

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Pupil", ["Pupil_ModuleProcessor"]: new Pupil_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Pupil_ModuleProcessor.Initialize(objContext, objContext.Pupil_ModuleProcessor);

    /**
     * @name Initialize
     * @summary Initialize Custom hooks
     */
    Pupil_Hook.Initialize(objContext);

    let objClassData = objContext.Pupil_ModuleProcessor.GetClassDataFromApplicationState(objContext);

    /**
     * @name GetContent
     * @summary Returns the required jsx for component
     * @returns {*} jsx
     */
    function GetContent() {
        //let objTextResource = DataRef(props.Object_Framework_Services_TextResource, "Object_Framework_Services_TextResource;Id;" + props.JConfiguration.LanguageCultureInfo + "/d.Extranet/2_School/Modules/ClassAndPupil/Pupil")["Data"][0]["Pupil"];
        let objTextResource = props.TextResource;
        let arrActivationStatusDropdownData = objContext.Pupil_ModuleProcessor.GetActivationStatusToggleData(objContext);
        let objValidationMessagesForGrid = {
            "EmptyDataMessage": Localization.TextFormatter(objTextResource, 'EmptyDataMessage'),
            "Date": Localization.TextFormatter(objTextResource, 'Date'),
            "Email": Localization.TextFormatter(objTextResource, 'Email'),
            "Required": Localization.TextFormatter(objTextResource, 'Required')
        };
        return (
            <div className="panel-right">
                <div className="padding-top-10" id="TopHeadClassPupilRightpanel">
                    <div className="top-head">
                        <span>{Localization.TextFormatter(objTextResource, 'PupilLabel')} {objClassData && JSON.stringify(objClassData) !== "{}" ? objClassData["vClassName"] : ""}</span>
                        <div className="content-dropdown">
                            <PerformanceProfiler ComponentName={"statusToggleDropDown"} JConfiguration={props.JConfiguration} >
                                <WrapperComponent
                                    ComponentName={"Dropdown"}
                                    id="statusToggleDropDown"
                                    Data={arrActivationStatusDropdownData}
                                    JConfiguration={props.JConfiguration}
                                    IsLanguageDependent="N"
                                    DisplayColumn="key"
                                    ValueColumn="value"
                                    DefaultOptionValue=""
                                    SelectedValue={arrActivationStatusDropdownData[0].value}
                                    OnChangeEventHandler={(objItem, dropDownProps) => { objContext.Pupil_ModuleProcessor.HandleStatusToggle(objContext, objItem) }}
                                    ParentProps={{ ...props }}
                                />
                            </PerformanceProfiler>
                        </div>
                    </div>
                </div>
                <WrapperComponent
                    ComponentName={"FillHeight"}
                    id="PupilGridFillHeight" HeaderIds={["Header", "SubNavigation", "outletBand", "TopHeadClassPupilRightpanel"]} className="bgStyle" scrollStyle={{ overflow: "auto" }}>
                    <PerformanceProfiler ComponentName={"PupilGrid"} JConfiguration={props.JConfiguration} >
                        <Grid
                            RowData={state.arrPupilGridData}
                            Header={objContext.Pupil_ModuleProcessor.GetColumns(objContext)}
                            TextResource={objTextResource}
                            DropDownData={objContext.Pupil_ModuleProcessor.GetDropdownData(objContext)}
                            GridActionButtons={objContext.Pupil_ModuleProcessor.GetHeaderButtons(objContext)}
                            RowActionButtons={objContext.Pupil_ModuleProcessor.GetActionButtons(objContext)}
                            OnClickRow={(objPupil) => { objContext.Pupil_ModuleProcessor.HandleOnClickRow(objPupil) }}
                            SaveMethod={(objSaveData) => objContext.Pupil_ModuleProcessor.SaveMethod(objContext, objSaveData)}
                            SkinPath={props.JConfiguration.ExtranetSkinPath}
                            JConfiguration={props.JConfiguration}
                            OnBeforeGridRowRender={(objRowData) => objContext.Pupil_ModuleProcessor.GetActiveStatus(objRowData, props.JConfiguration)}
                            Filter={objContext.Pupil_ModuleProcessor.GetFilteredPupilRowData(objContext)}
                            ParentProps={{ ...props }}
                        //PreselectValue={objClassData ? objClassData["uClassId"] ? objClassData["uClassId"] : "000000000000-0000-0000-0000-00000000" : "000000000000-0000-0000-0000-00000000"}
                        />
                    </PerformanceProfiler>
                </WrapperComponent>
            </div>
        );
    }

    return (
        <React.Fragment>
            {
                objClassData && JSON.stringify(objClassData) !== "{}" && props.isLoadComplete ? state.isLoadComplete ? GetContent() : <React.Fragment /> : <React.Fragment />
            }
        </React.Fragment>
    );
};

///**
//   * @name InitialDataParams
//   * @param {object} JConfiguration JConfiguration
//   * @param {object} props props
//   * @returns {object} InitialDataParams
//   */
//Pupil.InitialDataParams = (JConfiguration, props) => {
//    return (new ObjectQueue()).Queue(objContext.Pupil_ModuleProcessor.InitialDataParams(JConfiguration, props));
//};

export default connect(ExtranetBase_Hook.MapStoreToProps(Pupil_ModuleProcessor.StoreMapList()))(Pupil);
/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Pupil_ModuleProcessor; 