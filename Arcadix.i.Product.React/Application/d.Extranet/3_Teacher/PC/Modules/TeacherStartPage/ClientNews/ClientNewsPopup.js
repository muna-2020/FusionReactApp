//React related imports.
import React, { useRef, useLayoutEffect } from 'react';

/**
* @name ClientNewsPopup
* @param {object} props props
* @summary This component displays the ClientNewsPopup data.
* @returns {object} div that encapsulated the ClientNewsPopup div with its details.
*/
const ClientNewsPopup = props => {
    const iFrameRef = useRef(null);

    useLayoutEffect(() => {
        let objDocument = iFrameRef.current.contentDocument || iFrameRef.current.contentWindow.document;
        if (objDocument.readyState === "complete") {
            setTimeout(SetParentPropOnDocument, 200);
        }
    }, []);

    function SetParentPropOnDocument() {
        let objDocument = iFrameRef.current.contentDocument || iFrameRef.current.contentWindow.document;
        objDocument.parentProps = props;
    }

    function GetContent() {
        
        return (
                <iframe
                    src={JConfiguration.BaseUrl + "ClientNewsHTML/ClientNews.html"}
                    style={{ position: "absolute", width: "100%", height: "100%", left: 0, right: 0, top: 0, bottom: 0, border: 0 }}
                    ref={iFrameRef}
                />
        );
    }

    return GetContent();
};

/**
* @name DynamicStyles
* @param {object} props props
* @summary Required for css
* @returns {object} arrStyles
*/
ClientNewsPopup.DynamicStyles = () => {
    return [
        JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherStartPage/ClientNewsPopup/ClientNewsPopup.css"
    ];
};

/**
* @name connect
* @summary Calls mapStateToProps of ExtranetBase_Hook and exports the component, connects store to Module
*/
export default ClientNewsPopup;