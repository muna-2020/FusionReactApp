//React related imports...
import React, { useReducer } from 'react';

//Components used...
import JSONFormatter from '@root/Framework/Controls/JSONFormatter/JSONFormatter';

/**
 * @name FileContentPopup
 * @param {object} props props
 * @summary This component displays the FTP FileContent data.
 * @returns {object} React.Fragement that encapsulated with FileContent details.
 */
const FileContentPopup = props => {

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        return <div className="filecontent-popup">
                    <div style={{ overflow: "auto" }} >
                    <div className="col col-1">
                        <div className="col-item">
                            <div className="mt-10 mr-10 nowrap">
                                <b>{Localization.TextFormatter(props.Resource.Text, "FileName")}</b>
                            </div>
                            <div className="row-right mt-10">
                                {props.Data.FileContentData.vFileName}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <b>{Localization.TextFormatter(props.Resource.Text, "FileContent")}</b>
                    </div>
                    < JSONFormatter 
                        Data={{
                        JSONData: JSON.parse(props.Data.FileContentData.vFileContent)
                        }}
                     />
                    <div className="popup-footer">
                        <button className="btn" onClick={() => { Popup.ClosePopup(props.Id); }}>
                            {Localization.TextFormatter(props.Resource.Text, "OK")}
                        </button>                
                    </div>
                </div>
            </div>
    }

    return (
        <React.Fragment>{props.Data.FileContentData ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment/>}
        </React.Fragment>
    );
}

export default FileContentPopup;