//store related import.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Selection related import.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";

/**
 * @name GetPermission
 * @summary this get the read, write clipboard permission.
 * @returns {Promise}.
 */
const GetClipboardPermission = () => {
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.GetClipboardPermission: Entered");
        /* develblock:end */
    /** The 4 available permissions for Async Clipboard API: */
    const arrPermissions = [{ name: "clipboard-read" }, { name: "clipboard-write" }];
    /** Query for each permission's state, then watch for changes and update buttons accordingly: */
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.GetClipboardPermission: Exiting");
    /* develblock:end */
  return Promise.all(arrPermissions.map(objDescriptorTemp => navigator.permissions.query(objDescriptorTemp))).then(arrPermissions => {
        let blnGranted = false;
        arrPermissions.forEach(objPermission => {
            blnGranted = objPermission.state == "granted" ? true : false;
        });
        return blnGranted;
  });  
}

/**
 * @name SystemClipboardUpdater
 * @param {string} strContent text content to be updated.
 * @summary this method update the clipboard content using clipboard API.
 */
const ClipboardUpdater = (strContent) => {
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.ClipboardUpdater: Entered");
    /* develblock:end */
    GetClipboardPermission().then(status => {
        if (status && strContent && navigator && navigator.clipboard) {
            navigator.clipboard.writeText(strContent)
                .then(() => {
                    UpdateClipboardDataToStore();
                })
                .catch((objError) => {
                    throw objError;
                });
        }
    });
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.ClipboardUpdater: Exiting");
    /* develblock:end */
};

/**
 * @name StoreUpdater
 * @summary this update the copied clipboard data to the store.
 */
const UpdateClipboardDataToStore = () => {
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.UpdateClipboardDataToStore: Entered");
    /* develblock:end */
    GetClipboardPermission().then(status => {
        if (status && navigator && navigator.clipboard) {
            navigator.clipboard.readText()
                .then(strText => {
                    EditorState.SetProperty('ClipboardData', strText)
                })
                .catch((objError) => {
                    throw objError;
                });
        }
    });
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.UpdateClipboardDataToStore: Exiting");
    /* develblock:end */
};

/**
 * @name PasteContent
 * @param strContent text to be pasted.
 * @summary this paste the content at the caret position inside the text-editor. 
 */
const PasteContent = (strContent, objTextRef) => {
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.PasteContent: Entered");
    /* develblock:end */
    let refCurrentTextRef = objTextRef ? objTextRef : EditorState.GetReference("CurrentTextRef");
    let objContextText = refCurrentTextRef.current.GetLatestContext();
    let objRange = Selection.GetSelection().Range;
    if (objRange && objRange !== null) {
        let strClipboardText = strContent;
        let textNode = document.createTextNode(strClipboardText);
        if (!objRange.collapsed) {
            objRange.deleteContents();
            objRange.insertNode(textNode);
        } else {
            Selection.AddTextAtCaret(strContent, refCurrentTextRef);
        }
        let objActiveSelection = objContextText.SelectionRef.current;
        objActiveSelection = {
            ...objActiveSelection,
            ["intStart"]: objActiveSelection.intStart + strContent.length,
            ["intEnd"]: objActiveSelection.intStart + strContent.length
        };
        objContextText.SelectionRef.current = objActiveSelection;
    }
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.PasteContent: Exiting");
    /* develblock:end */
};

/**
 * @name showInsertPopup
 * @summary display Clipboard insert Popup.
 * */
export const ShowClipboardPopup = (objContext) => {
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.ShowClipboardPopup: Entered");
    /* develblock:end */
    UpdateClipboardDataToStore(); // update the clipboard data
    editorPopup.ShowPopup({
        "Data": {},
        "Meta": {
            "PopupName": "ClipboardPopup",
            "Height": '537px',
            "Width": '533px',
            "ShowCloseIcon": true,
            "ShowToggleMaximizeIcon": false
        },
        "Resource": {
            "Text": {},
            "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
        },
        "Events": {},
        "CallBacks": {
        }
    });
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.ShowClipboardPopup: Exiting");
    /* develblock:end */
};

/**
 * @name copyContent
 * @summary copy selected content to the clipboard.
 */
export const Copy = () => {
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.Copy: Entered");
    /* develblock:end */
    let objRange = Selection.GetSelection().Range;
        if (objRange && objRange !== null) {
            ClipboardUpdater(objRange.toString());
    }
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.Copy: Exiting");
    /* develblock:end */
};

/**
 * @name CutContent
 * @summary cut selected content from the texteditor.
 */
export const Cut = () => {
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.Cut: Entered");
    /* develblock:end */
    let objRange = Selection.GetSelection().Range;
    let strCutContent = "";
    if (objRange && objRange !== null) {
        strCutContent = objRange.toString();
        objRange.deleteContents();
    }
    ClipboardUpdater(strCutContent);
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.Cut: Exiting");
    /* develblock:end */
};

/**
 * @name PasteContent
 * @summary paste content to the active texteditor.
 */
export const Paste = (strText, callback) => {
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.Paste: Entered");
    /* develblock:end */
    if (strText) {
        PasteContent(strText);
        if (callback)
            callback();
    } else {
        GetClipboardPermission().then(status => {
            Selection.GetSelection();
            if (status) {
                navigator.clipboard.readText()
                    .then(strText => {
                        PasteContent(strText);
                        if (callback)
                            callback();
                    })
                    .catch((objError) => {
                        throw objError;
                    });
            }
        });
    }
    /* develblock:start */
    global.ApplicationLog.Log("Clipboard.Paste: Exiting");
    /* develblock:end */
};