//React related imports
import React, { useEffect, useReducer } from 'react';
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
    let objContext = {
        state, props, dispatch, ["ModuleName"]: "ClassAndPupil", ["ClassAndPupil_ModuleProcessor"]: new ClassAndPupil_ModuleProcessor()
    };

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

    useEffect(() => {
        if (state.isLoadComplete) {
            window.dispatchEvent(new Event('resize'));
        }
    }, [state.blnShowInformationBar]);

    let UpdateInformationPopupStatus = () => {
        objContext.ClassAndPupil_ModuleProcessor.UpdateInformationPopupStatus(objContext);
    }

    /**
     * @name GetContent
     * @summary Returns the required jsx for component
     * @returns {*} jsx
     */
    function GetContent() {
        let objTextResource = objContext.ClassAndPupil_ModuleProcessor.GetTextResource(objContext);
        let objGridConfiguration = objContext.ClassAndPupil_ModuleProcessor.GetGridConfiguration(objContext);
        let objClassTextResource = Localization.TextFormatter(objTextResource, 'Class');
        let yellowBarText = objContext.ClassAndPupil_ModuleProcessor.GetYellowBarTextForClass(objContext, objClassTextResource);//objClassTextResource["YellowBarText"];
        let blnIsGridEditable = objContext.ClassAndPupil_ModuleProcessor.IsGridEditable(objContext)


        return (
            <div className="light-brown-bg  class-and-pupil">
                <div className="top-spacing" id="TopSpacing" />
                <div className="padding-top-20 pl-10 pr-10" id="ClassPupilHeaderText">
                    {state.blnShowInformationBar ?
                        <div className="class-and-pupil-header-text" dangerouslySetInnerHTML={{ __html: yellowBarText }}>

                        </div>
                        : <React.Fragment />
                    }
                </div>
                <div className="panel-flex">
                    <PerformanceProfiler ComponentName={"ClassAndPupilClassComponent"} JConfiguration={props.JConfiguration} >
                        <Class OnClassDataUpdate={(blnShowPupilGrid) => dispatch({ type: "SET_STATE", payload: { "blnShowPupilGrid": blnShowPupilGrid } })}
                            JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} TextResource={objTextResource["Class"]}
                            PupilTextResource={objTextResource["Pupil"]} GridConfiguration={objGridConfiguration["Class"]} isLoadComplete={true} {...props}
                            PropsCommonFunctions={objContext.ClassAndPupil_ModuleProcessor} blnIsGridEditable={blnIsGridEditable} />
                    </PerformanceProfiler>
                    <PerformanceProfiler ComponentName={"ClassAndPupilPupilComponent"} JConfiguration={props.JConfiguration} >
                        <Pupil ShowPuilGrid={state.blnShowPupilGrid} JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails}
                            TextResource={objTextResource["Pupil"]} GridConfiguration={objGridConfiguration["Pupil"]} isLoadComplete={true} {...props}
                            PropsCommonFunctions={objContext.ClassAndPupil_ModuleProcessor} ShowInformationBar={state.blnShowInformationBar}
                            UpdateInformationPopupStatus={UpdateInformationPopupStatus} blnIsGridEditable={blnIsGridEditable} />
                    </PerformanceProfiler>
                </div>
            </div>
        );
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;
};

export default connect(ExtranetBase_Hook.MapStoreToProps(ClassAndPupil_ModuleProcessor.StoreMapList()))(ClassAndPupil);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ClassAndPupil_ModuleProcessor;

//  <Class OnClassDataUpdate={(blnShowPupilGrid) => dispatch({ type: "SET_STATE", payload: { "blnShowPupilGrid": blnShowPupilGrid } })} JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} TextResource={objTextResource["Class"]} PupilTextResource={objTextResource["Pupil"]} GridConfiguration={objGridConfiguration["Class"]} isLoadComplete={true} {...props} PropsCommonFunctions={objContext.ClassAndPupil_ModuleProcessor} />
//<Pupil ShowPuilGrid={state.blnShowPupilGrid} JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} TextResource={objTextResource["Pupil"]} GridConfiguration={objGridConfiguration["Pupil"]} isLoadComplete={true} PropsCommonFunctions={objContext.ClassAndPupil_ModuleProcessor} />