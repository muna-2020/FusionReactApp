//React imports.
import React from 'react';

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

    /**
     * @name EditDocument
     * @summary calls the parent edit method to update file has been viewed.(only in teacher mode)
     * @param {any} objDocument
     */
    function EditDocument(objDocument) {
        if (props.JConfiguration.ApplicationTypeId == "1" && !objDocument.blnViewed) {
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
                <td className="school-table-image">
                    <a href={props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?sessionkey=" + JConfiguration.SessionKey + "&FileName="
                        + document.vFileId + "&Type=Document&DisplayFileName=" + document.vFileName}>
                        <img
                            src={
                                props.JConfiguration.ExtranetSkinPath +
                                "/Images/Common/Icons/download_brown.png"
                            }
                            alt=""
                        />
                    </a>
                </td>
                <td className="school-table-image">
                    <a target="_blank" onClick={() => { OpenInNewTab(document) }}>
                        <img
                            src={
                                props.JConfiguration.ExtranetSkinPath +
                                "/Images/Common/Icons/doc_eye.svg"
                            }
                            alt=""
                        />
                    </a>
                </td>
                <td className="school-table-image">
                    <img
                        src={
                            props.JConfiguration.ExtranetSkinPath +
                            "/Images/Common/Icons/cross_brown.png"
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
            {props.arrDocument.length > 0 ?
                <>
                    <tr>
                        <th colspan="1">{Localization.TextFormatter(props.objTextResource, 'DocumentNameHeader')}</th>
                        <th colspan="4">{Localization.TextFormatter(props.objTextResource, 'DocumentDateText')}</th>
                    </tr>


                </>

                : <React.Fragment />
            }
            <tbody>
                {GetElements()}
            </tbody>

        </React.Fragment>
    )
}

export default DocumentDisplay