//React related imports
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as ClassAndPupil_Hook from '@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/ClassAndPupil_Hook';
import ClassAndPupil_ModuleProcessor from "@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/ClassAndPupil_ModuleProcessor";
import Class from '@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/Class';
import Pupil from '@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/Pupil';

/**
 * @name ClassAndPupil
 * @param {any} props props
 * @summary This component consists of Class and Pupil component.
 * @returns {*} jsx
 */
const ClassAndPupil = (props) => {

    /**
     * @name Initializing Reducer
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, ClassAndPupil_Hook.GetInitialState(props));

    /**
     * @name Assigning objContext
     * @summary Groups state, props and dispatch and module object in to object, which can be passed across method in the module and used 
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ClassAndPupil", ["ClassAndPupil_ModuleProcessor"]: new ClassAndPupil_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.ClassAndPupil_ModuleProcessor.Initialize(objContext, objContext.ClassAndPupil_ModuleProcessor);

    /**
     * @name Initialize
     * @summary Initialize Custom hooks
     */
    ClassAndPupil_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Returns the required jsx for component
     * @returns {*} jsx
     */
    function GetContent() {
        let objTextResource = objContext.ClassAndPupil_ModuleProcessor.GetTextResource(objContext);
        let objGridConfiguration = objContext.ClassAndPupil_ModuleProcessor.GetGridConfiguration(objContext);
        let objClassTextResource = Localization.TextFormatter(objTextResource, 'Class');
        let yellowBarText = objClassTextResource["NotExternalYellowBar"];

        if (props.JConfiguration.ApplicationTypeId === "1") {
            if (props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y") {
                yellowBarText = objClassTextResource["ExternalYellowBar"];
            }
        }

        return (
            <div className="light-brown-bg  class-and-pupil">
                <div className="padding-top-20 pl-10 pr-10">
                    <div className="class-and-pupil-header-text" id="ClassPupilHeaderText">
                        {yellowBarText}
                    </div>
                </div>
                <div className="panel-flex">
                    <PerformanceProfiler ComponentName={"ClassAndPupilClassComponent"} JConfiguration={props.JConfiguration} >
                        <Class JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} TextResource={Localization.TextFormatter(objTextResource, 'Class')} GridConfiguration={objGridConfiguration["Class"]} isLoadComplete={true} {...props} PropsCommonFunctions={objContext.ClassAndPupil_ModuleProcessor} />
                    </PerformanceProfiler>
                    <PerformanceProfiler ComponentName={"ClassAndPupilPupilComponent"} JConfiguration={props.JConfiguration} >
                        <Pupil JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} TextResource={Localization.TextFormatter(objTextResource, 'Pupil')} GridConfiguration={objGridConfiguration["Pupil"]} isLoadComplete={true} PropsCommonFunctions={objContext.ClassAndPupil_ModuleProcessor} />
                    </PerformanceProfiler>
                </div>
            </div>
        );
    }

    return (<React.Fragment>{props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />}</React.Fragment>);
}

/**
 * @name DynamicStyles
 * @summary Gets dynamic styles for the component.
 * returns {array} arrStyles array
 */
ClassAndPupil.DynamicStyles = (props) => {
    return [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/ClassAndPupil/ClassAndPupil.css",
        props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Blocks/Grid/Grid.css"
    ];
};

/**
 * @name InitialDataParams
 * @param {object} JConfiguration JConfiguration
 * @param {object} props props
 * @returns {object} InitialDataParams
 */
ClassAndPupil.InitialDataParams = (JConfiguration, props) => {
    return (new ObjectQueue()).Queue(objContext.ClassAndPupil_ModuleProcessor.InitialDataParams(JConfiguration, props));
};

export default connect(ExtranetBase_Hook.MapStoreToProps(ClassAndPupil_ModuleProcessor.StoreMapList()))(ClassAndPupil);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ClassAndPupil_ModuleProcessor; 