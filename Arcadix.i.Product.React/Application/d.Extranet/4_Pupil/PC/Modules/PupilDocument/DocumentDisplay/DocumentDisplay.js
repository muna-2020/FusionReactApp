//React imports.
import React from 'react';

//Inline Images import
import imgDownloadBrown from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/DocumentDisplay/download_brown.png?inline';
import imgDocEye from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/DocumentDisplay/doc_eye.svg?inline';
import imgCrossBrown from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/DocumentDisplay/cross_brown.png?inline';

/**
 * @name DocumentDisplay
 * @summary component for displaying documents.
 * @param {any} props
 * @returns {Element}
 */
const DocumentDisplay = (props) => {

    /**
     * @name OpenInNewTab
     * @summary calls the api and opens in new tab.
     * @param {any} document
     */
    function OpenInNewTab(document) {
        window.open(props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile/View?sessionkey=" + JConfiguration.SessionKey + "&FileName=" + document.vFileId + "&Type=Document&DisplayFileName=" + document.vFileName);
    }

    function EditDocument(objDocument) {
        if (!objDocument.blnViewed) {
            props.EditDocument(objDocument);
        }
    }

    /**
     * @name GetElements
     * @summary forms the array of table rows from recieved documents from props.
     * @returns {Array}
     * */
    function GetElements() {

        let dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

        let arrElements = props.arrDocument.map(document =>
            <tr>
                <td onClick={() => { EditDocument(document) }}><a className={(props.JConfiguration.ApplicationTypeId == "1" && !document.blnViewed) ? 'unread' : ''} href={props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?sessionkey=" + JConfiguration.SessionKey + "&FileName="
                    + document.vFileId + "&Type=Document&DisplayFileName=" + document.vFileName}>{document.vFileName}</a></td>

                <td>{(new Date(document.dtCreatedOn)).toLocaleDateString('de-DE', dateOptions)}</td>
                <td>
                    <a href={props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?sessionkey=" + JConfiguration.SessionKey + "&FileName="
                        + document.vFileId + "&Type=Document&DisplayFileName=" + document.vFileName}>
                        <img
                            src={
                                imgDownloadBrown
                            }
                            alt=""
                        />
                    </a>
                </td>
                <td>
                    <a target="_blank" onClick={() => { OpenInNewTab(document) }}>
                        <img
                            src={
                                imgDocEye
                            }
                            alt=""
                        />
                    </a>
                </td>
                <td>
                    <img
                        src={
                            imgCrossBrown
                        }
                        alt="" onClick={() => { props.Delete(document) }}
                    />
                </td>
            </tr>
        )

        return arrElements;
    }


    return (
        <React.Fragment>
            <tr>
                <td>{Localization.TextFormatter(props.objTextResource, 'DocumentNameHeader')}</td>
                <td>{Localization.TextFormatter(props.objTextResource, 'DocumentDateText')}</td>
                <td />
                <td />
                <td />
            </tr>
            {GetElements()}
        </React.Fragment>
    )
}

export default DocumentDisplay