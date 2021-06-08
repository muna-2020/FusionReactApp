// React related import
import React from 'react';

const EditorLinkExampleDetails = (props) => {

    /**
     * @name PreviewModule
     * @param {any} objContext
     */
    const PreviewModule = () => {
        if (ApplicationState.GetProperty("SelectedNode")) {
            let strModule = ApplicationState.GetProperty("SelectedNode").MultiMediaManagement_Tree.ElementJson.vModuleName;
            window.open(JConfiguration.BaseUrl + "ModulePreview?PreviewComponent=" + strModule + "&sessionkey=" + JConfiguration.SessionKey);
        }
    }

    const GetContent = () => {
        return (
            <div className="object-multimedia-detail-properties">
                <button className="preview-link" onClick={() => { PreviewModule();}}>
                    {props.TextResource["Preview"]}
                </button>
            </div>
        );
    };

    return GetContent();
};

export default EditorLinkExampleDetails;