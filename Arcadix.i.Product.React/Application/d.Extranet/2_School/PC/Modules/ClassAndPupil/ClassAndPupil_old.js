import React, { useReducer } from "react";
import { connect } from "react-redux";
import * as ClassAndPupilBusinessLogic from '@shared/Application/d.Extranet/2_School/Modules/ClassAndPupil/ClassAndPupilBusinessLogic';
import Class from '@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/Class';
import Pupil from '@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/Pupil';

const ClassAndPupil = (props) => {

    /**
     * @summary Provides satate and dispatch.
     */
    const [state, dispatch] = useReducer(ClassAndPupilBusinessLogic.Reducer, ClassAndPupilBusinessLogic.GetInitialState());

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch };

    /**
     * @summary Custom hook that makes the request for the data.
     */
    ClassAndPupilBusinessLogic.useDataLoader(objContext);

    /**
     * @summary Custom hook that Checks if the data is loaded to props.
     */
    ClassAndPupilBusinessLogic.useDataLoaded(objContext);

    /**
     * @summary returns the required jsx for component
     */
    function GetContent() {
        let objTextResource = ClassAndPupilBusinessLogic.GetTextResource(objContext);
        let objGridConfiguration = ClassAndPupilBusinessLogic.GetGridConfiguration(objContext);
        let objClassTextResource = objTextResource["Class"];
        let yellowBarText = objClassTextResource["NotExternalYellowBar"];
        if (props.JConfiguration.ApplicationTypeId === "1") {
            if (props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].cIsAdmin == "Y") {
                yellowBarText = objClassTextResource["ExternalYellowBar"];
            }
        }

        return (
            <div className="light-brown-bg  class-and-pupil">
                <div className="padding-20">
                    <div className="class-and-pupil-header-text" id="ClassPupilHeaderText">
                        {yellowBarText}
                    </div>
                </div>
                <div className="panel-flex">
                    <Class JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} TextResource={objTextResource["Class"]} GridConfiguration={objGridConfiguration["Class"]} isLoadComplete={true} {...props} />
                    <Pupil JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} TextResource={objTextResource["Pupil"]} GridConfiguration={objGridConfiguration["Pupil"]} isLoadComplete={true} />
                </div>
            </div>
        );
    }

    /**
     * @summary renders the jsx.
     */
    return (<React.Fragment>{props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment></React.Fragment>}</React.Fragment>);
};

ClassAndPupil.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/ClassAndPupil/ClassAndPupil.css",
        props.JConfiguration.ExtranetSkinPath + "/Css/Common/ReactJs/PC/Framework/Blocks/Grid/Grid.css"
    ];
    return arrStyles;
};

/**
 * @summary used by SSR.
 */
ClassAndPupil.InitialDataParams = (JConfiguration, props) => {
    return ClassAndPupilBusinessLogic.InitialDataParams(JConfiguration, props);
};

/**
 * calls mapStateToProps of business logic and exports the component.
 */
export default connect(ClassAndPupilBusinessLogic.mapStateToProps)(ClassAndPupil);