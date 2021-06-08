//React related imports 
import React, { useReducer, useEffect } from 'react';

//Base module imports
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook.js';

/**
 * @name ExternalAPITest
 * @param {object} props props
 * @summary shows the example of connecting the external APIs .
 * @returns {jsx} React.Fragement that encapsulated the sample View to send data to server and listen to the event.
 */
const DocumentViewDemo = (props) => {

    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    });

    ITHit.WebDAV.Client.LicenseId = '23cbc7b6-df95-44bd-b53b-a27f4eb4ac34';
    let strPath = JConfiguration.WebDAVServer;

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dspatch
      */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, {
        strLockToken: ""
    });

    /**
     * @name Edit
     * @sumary for editing documents.
     */
    const Edit = () => {
        //ITHit.WebDAV.Client.DocManager.EditDocument(strPath, "/");

        var strDocumentUrl = strPath + "Sample.docx"; // this must be full path
        var objDocManager = ITHit.WebDAV.Client.DocManager;
        if (objDocManager.IsMicrosoftOfficeDocument(strDocumentUrl)) {
            objDocManager.MicrosoftOfficeEditDocument(strDocumentUrl)
            LockItem(strDocumentUrl);
        } else {
            objDocManager.DavProtocolEditDocument([strDocumentUrl], "/");
            LockItem(strDocumentUrl);
        }
    }

    /**
     * @name LockingItem
     * @param {any} strDocumentUrl
     * @summary to lock the document that is opened.
     */
    const LockItem = (strDocumentUrl) => {
        var webDavSession = new ITHit.WebDAV.Client.WebDavSession();
        var fCallback = function () {
            UnlockItem(strDocumentUrl);
        };

        webDavSession.OpenFileAsync(strDocumentUrl, null, function (oFileAsyncResult) {

            /** @typedef {ITHit.WebDAV.Client.File} oFile */
            var oFile = oFileAsyncResult.Result;

            oFileAsyncResult.AddListner

            if (oFile.SupportedLocks.length === 0) {
                console.log('Locks are not supported.');
                return;
            }

            if (oFile.ActiveLocks == 0) {
                oFile.LockAsync(ITHit.WebDAV.Client.LockScope.Shared, false, 'User 1', 100, function (oAsyncResult) {

                    /** @typedef {ITHit.WebDAV.Client.LockInfo} oLockInfo */
                    var oLockInfo = oAsyncResult.Result;

                    if (oAsyncResult.IsSuccess) {
                        console.log('Locks token is: ' + oLockInfo.LockToken.LockToken);
                        dispatch({ type: "SET_STATE", payload: { strLockToken: oLockInfo.LockToken.LockToken } });
                    }

                    fCallback(oAsyncResult);
                });
            }
        });
    }

    /**
     * 
     * @param {any} strDocumentUrl
     */
    const UnlockItem = (strDocumentUrl) => {

        var webDavSession = new ITHit.WebDAV.Client.WebDavSession();
        var fCallback = function () { };

        webDavSession.OpenFileAsync(strDocumentUrl, null, function (oFileAsyncResult) {

            /** @typedef {ITHit.WebDAV.Client.File} oFile */
            var oFile = oFileAsyncResult.Result;

            oFile.UnlockAsync(state.strLockToken, function (oAsyncResult) {

                if (oAsyncResult.IsSuccess) {
                    console.log('File is unlocked');
                }

                fCallback(oAsyncResult);
            });
        });
    };

    /**
      * @name GetContent
      * @summary Forms the whole jsx required for the module.
      * @returns {object} jsx, React.Fragment
      */
    const GetContent = () => {
        return (
            <React.Fragment>
                <div>
                    <table>
                        <tr>
                            <td>
                                Preload Doc.
                            </td>
                            <td>
                                <input type="button" value="Edit Document" onClick={() => { Edit() }} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="button" value="Browse Folder" onClick={() => {
                                    InitAjaxFileBrowser()
                                    //ListFolder(strPath+"/Documents")
                                }} />
                            </td>
                            <td>
                            </td>
                        </tr>
                    </table>
                </div>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {GetContent()}
        </React.Fragment>);
}

export default DocumentViewDemo;