import { connect } from 'react-redux';
import React, { useReducer, useRef } from 'react';
import * as ContactBussinessLogic from '@shared/Application/d.Extranet/5_Shared/Modules/Contact/ContactBussinessLogic';
import { DataRef } from '@shared/Framework/DataService/TestDriveFetchAndCacheData/TestDriveFetchAndCacheData';
import FillHeight from '@root/Framework/Controls/FillHeight/FillHeight';
import FileUpload from '@root/Framework/Controls/FileUpload/FileUpload';

const Contact = (props) => {
    const [state, dispatch] = useReducer(ContactBussinessLogic.Reducer, ContactBussinessLogic.GetInitialState(props));

    let objContext = { state, props, dispatch };

    /**
     * @param {*} objContext 
     * @summary   Calls the DataCall method and the InitialDataParams.
     */
    ContactBussinessLogic.useDataLoader(objContext);

    /**
    * 
    * @param {*} objContext 
    * @summary   Checks if the data is loaded to props and then set the component state accordingly.
    */
    ContactBussinessLogic.useDataLoaded(objContext);

    const domFileUploadRef = useRef(null);

    const EmailSend = () => {
        var strEmptyElement = ContactBussinessLogic.Validate(objContext)
        if (strEmptyElement == "")
            //ContactBussinessLogic.OnClickEmailSend(objContext, domFileUploadRef.current.childNodes[0].childNodes[2].attributes.uploadfiles.nodeValue)
            ContactBussinessLogic.OnClickEmailSend(objContext, domFileUploadRef.current.GetUploadedFileDetails());
        else
            document.getElementById(strEmptyElement).focus();
    }

    const GetContact = () => {
        let objResourceData = DataRef(props.textresource, "textresource;id;" + props.JConfiguration.LanguageCultureInfo + "/d.extranet/2_school/modules/contact").Data["0"].Contact;
        if (objResourceData.length !== 0) {
            var ResourceData = objResourceData;
            var clientdiv = { __html: ResourceData.ClientText };
            var ClientContactDetailsdiv = { __html: ResourceData.ClientContactDetailsText };
            return (

                <div id="ContactComponent">
                    <FillHeight HeaderIds={["Header", "outletBand"]} className="bgStyle" scrollStyle={{ overflow: "auto" }}> {/*addtional padding is used to exclude the final height */}
                        <div className="light-brown-bg contact-wrapper">
                            <div className="contact-flex">
                                <div className="contact-block" dangerouslySetInnerHTML={clientdiv} />
                                <div className="contact-block" dangerouslySetInnerHTML={ClientContactDetailsdiv}></div>
                                {!state.blnShowMailSentDiv
                                    ?
                                    <div className="contact-block">
                                        <p>{ResourceData.EmailSentText}</p>
                                        <div ref={domFileUploadRef} className="active contact-form">
                                            <FileUpload ref={domFileUploadRef} UploadText={ResourceData.AddAttachmentText} JConfiguration={props.JConfiguration} ClientUserDetails={props.ClientUserDetails} />
                                        </div>
                                        <div className="form-text padding-top-20">
                                            <input id="EmailSubject" className={state.blnShowValidation ? "emptyInput" : ""} placeholder={ResourceData.ToText} onFocus={(event) => { ContactBussinessLogic.ShowValidationMessageOnFocus(objContext, event.target.id, event.target.value) }} value={state.strEmailSubject} onChange={(event) => { ContactBussinessLogic.HandleChange(objContext, event.target.id, event.target.value) }} />
                                            <br />
                                            <textarea id="Emailtext" placeholder={ResourceData.MessageText} onFocus={(event) => { ContactBussinessLogic.ShowValidationMessageOnFocus(objContext, event.target.id, event.target.value) }} value={state.strEmailtext} onChange={(event) => { ContactBussinessLogic.HandleChange(objContext, event.target.id, event.target.value) }}></textarea>
                                            <br />
                                            {state.blnShowValidation ? <span className="emptyValidation">{state.strValidationMessage}</span> : <React.Fragment />}
                                            <button className="button brown-button" onClick={EmailSend} >SendIn</button>
                                        </div>

                                    </div>
                                    :
                                    <div className="contact-block">
                                        <div>{ResourceData.EmailSentTitle}</div>
                                        <div>{ResourceData.EmailSentText}</div>
                                    </div>}
                            </div>
                        </div>
                    </FillHeight>
                </div>

            )
        }
        else {
            return <div>Loading</div>
        }
    }

    return (
        <div>
            <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
                <React.Fragment>{GetContact()}</React.Fragment> : <React.Fragment />}
            </React.Fragment>
        </div>
    );
}

ContactBussinessLogic.InitialDataParams = (JConfiguration, props) => {
    return ContactBussinessLogic.InitialDataParams(JConfiguration, props);
};

Contact.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/2_School/ReactJs/PC/Modules/Contact/Contact.css"
    ];
    return arrStyles;
};

export default connect(ContactBussinessLogic.mapStateToProps)(Contact);