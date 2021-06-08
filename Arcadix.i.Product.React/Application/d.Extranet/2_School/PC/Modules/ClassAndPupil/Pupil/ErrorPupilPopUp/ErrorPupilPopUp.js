import React, { useReducer } from "react";
import { connect } from "react-redux";
import * as ErrorPupilPopUpBusinessLogic from '@shared/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/ErrorPupilPopUp/ErrorPupilPopUpBusinessLogic';


const ErrorPupilPopUp = (props) => {

    /**
     * @summary Provides state and dispatch.
     */
    const [state, dispatch] = useReducer(ErrorPupilPopUpBusinessLogic.Reducer, ErrorPupilPopUpBusinessLogic.GetInitialState());

    /**
     * @summary Combines state, props and dispatch in one object, which is sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch };

    /**
     * @summary Custom hook that Checks if the data is loaded to props.
     */
    ErrorPupilPopUpBusinessLogic.useDataLoaded(objContext);

    /**
     * returns the required jsx for component
     */
    function GetContent() {
        let objTextResource = DataRef(props.textresource, "textresource;id;" + props.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/classandpupil/pupil").Data[0]["Pupil"];
        return (
            <div className="error-wrapper">
                <div className="error-message">
                    <div className="error-header">
                        <span>{Localization.TextFormatter(objTextResource, 'Heading')}</span>
                    </div>
                    <p>{Localization.TextFormatter(objTextResource, 'ErrorDescription')}</p><br />
                </div>
                <div className="close-button">
                    <span className="button brown-button" onClick={(objEvt) => props.ClosePopup(props.ObjModal)}>{Localization.TextFormatter(objTextResource, 'OkButtonText')}</span>
                </div>
            </div>
        );
    }

    /**
     * @summary Renders the jsx.
     */
    return (
        <React.Fragment>{state.isLoadComplete ? GetContent() : <React.Fragment></React.Fragment>}</React.Fragment>
    );

};

/**
 * @summary   Loads dynamic CSS for the component
 */
ErrorPupilPopUp.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/ClassAndPupil/ErrorPopUp.css"
    ];
    return arrStyles;
};

/**
 * calls mapStateToProps of business logic and exports the component.
 */
export default connect(ErrorPupilPopUpBusinessLogic.mapStateToProps)(ErrorPupilPopUp);