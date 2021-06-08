//initialization.
var objUrlPattern = { urls: ["<all_urls>"] }
window.FileLoadedDetailsBeforeStart = [];
window.FileSizeDetails = [];
window.iTabId = 0;
window.cIsReset = false;
window.TotalDownlaodTime = 0;


//Message on Installation.
chrome.runtime.onInstalled.addListener(function () {
    console.log("helooooooooo");
})

//on Response Started.
chrome.webRequest.onBeforeRequest.addListener(function (obj) {
    if (window.FileRecording || window.FileRecording == undefined) {
        let arrFileDetails = window.FileLoadedDetailsBeforeStart;
        arrFileDetails = [...window.FileLoadedDetailsBeforeStart, obj];
        window.FileLoadedDetailsBeforeStart = arrFileDetails;
    }
}, objUrlPattern)

//on Request Completed.
chrome.webRequest.onCompleted.addListener(function (obj) {
    if (window.FileRecording || window.FileRecording == undefined) {
        console.log("===========Request==================", obj);
        console.log("===========", chrome.devtools);
        SendWebSiteDetails()
   }
}, objUrlPattern, ["responseHeaders"])


//getting Header info.
chrome.webRequest.onHeadersReceived.addListener(function (obj) {
    if (window.FileRecording || window.FileRecording == undefined) {
        if (obj.url.includes("arcadixdevelopment.com")) {
            console.log("===========Header=================", obj);
            console.log("===========", chrome.devtools);
        }

        let arrFileDetails = window.FileSizeDetails;

        let iContentLength = obj.responseHeaders.filter(x => x.name.toLowerCase() == "content-length");
        let objReceivedData = obj;

        let arrCurrentRequest = window.FileLoadedDetailsBeforeStart.filter(x => x.requestId == obj.requestId);

        if (arrCurrentRequest.length > 0) {
            let strTimeStamp = objReceivedData["timeStamp"];
            objReceivedData["timeStamp"] = parseInt(objReceivedData["timeStamp"]) - parseInt(arrCurrentRequest[0]["timeStamp"]);
            objReceivedData["servertime"] = "";
            let strFileType = "";

            //get file type
            if (objReceivedData.type == "xmlhttprequest") {
                strFileType = "fetch";
                objReceivedData["servertime"] = " (ServerTime: " + JSON.parse(obj.responseHeaders.filter(x => x.name.toLowerCase() == "performancelog")[0].value).TotalServerTime + ")";
            }
            else if (objReceivedData.type == "main_frame") {
                strFileType = "document";
            }
            else if (objReceivedData.type == "image") {
                let strFileName = objReceivedData.url.split("/")[objReceivedData.url.split("/").length - 1];
                strFileType = strFileName.split(".")[strFileName.split(".").length - 1];
            }
            else {
                strFileType = objReceivedData.type;
            }
            arrFileDetails = [...window.FileSizeDetails, {
                "FileName": objReceivedData.url,
                "requestId": objReceivedData.requestId,
                "Status": objReceivedData["statusCode"],
                "startTime": arrCurrentRequest[0]["timeStamp"],
                "time": objReceivedData["timeStamp"] + objReceivedData["servertime"],
                "timeStamp": strTimeStamp,
                "type": strFileType,
                "FileSize": (parseInt(iContentLength.length > 0 ? iContentLength[0].value : 0) / 1000).toFixed(1),
            }];
            window.FileSizeDetails = arrFileDetails;
        }
    }
}, objUrlPattern, ["responseHeaders","extraHeaders"])


//Wait for some one connect to it
let contentPort
chrome.runtime.onConnect.addListener(function (portFrom) {
    if (portFrom.name === 'background-contents') {
        //window.FileSizeDetails = [];
        //window.FileLoadedDetailsBeforeStart = [];

        //reset windows objects and arrays. 
        portFrom.onMessage.addListener(function (message) {
            if (message.type && message.type == 'RESET_DETAILS') {
                window.FileSizeDetails = [];
                window.FileLoadedDetailsBeforeStart = [];
                window.TotalDownlaodTime = 0;
                window.FileRecording = true;
                SendWebSiteDetailsAfterReset();
            }

            if (message.type && message.type == 'RESET_FILERECORDING') {
                window.FileRecording = false;
            }

            if (message.type && message.type == 'RESET_ONUNLOAD') {
                window.FileSizeDetails = [];
                window.FileLoadedDetailsBeforeStart = [];
                window.iTabId = 0;
                window.FileRecording = true;
                window.TotalDownlaodTime = 0
            }
        });
    }
});

//send file details to content.js
function SendWebSiteDetails() {

    let iTabId = 0;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currTab = tabs[0];

        if (currTab) { // Sanity check
            console.log(currTab);
            iTabId = currTab.id;

            //Initial Tab.
            if (window.iTabId == 0) {
                window.iTabId = iTabId;
                if (iTabId != 0 && window.FileSizeDetails.length != 0) {
                    console.log("iTabId=========>", iTabId)
                    GetTotalDownloadTime()
                    chrome.tabs.sendMessage(iTabId, {
                        action: 'GET_FILEDETAILS',
                        payload: { "FileDetails": window.FileSizeDetails, "TotalDownloadTime": window.TotalDownlaodTime }
                    });
                }
            }

            //checking if it same browser.
            else if (window.iTabId != 0 && window.FileSizeDetails.length != 0) {
                console.log("iTabId=========>", iTabId)
                GetTotalDownloadTime()
                chrome.tabs.sendMessage(iTabId, {
                    action: 'GET_FILEDETAILS',
                    payload: { "FileDetails": window.FileSizeDetails, "TotalDownloadTime": window.FileSizeDetails.length!=0?window.TotalDownlaodTime.toFixed(1):0.0 }
                });
            }
        }
    });
}

function GetTotalDownloadTime() {
    let iStartTime = 0;
    let iEndTime = 0;
    if (window.FileLoadedDetailsBeforeStart.length > 0) {
        iStartTime = parseInt(window.FileLoadedDetailsBeforeStart[0].timeStamp);
    }
    if (window.FileSizeDetails.length != 0 && iStartTime != 0) {
        window.FileSizeDetails.map((objData) => {
            if (iEndTime < parseFloat(objData.timeStamp)) {
                iEndTime = parseFloat(objData.timeStamp);
            }
        })
    }
    if (iStartTime != 0 && iEndTime != 0) {
        window.TotalDownlaodTime = iEndTime - iStartTime;
    }
}

//send details to content.js after reset
function SendWebSiteDetailsAfterReset() {
    if (window.iTabId != 0) { // Sanity check        
        if (window.iTabId != 0) {
            console.log("iTabId=========>", window.iTabId)
            chrome.tabs.sendMessage(window.iTabId, { action: 'GET_FILEDETAILS', payload: window.FileSizeDetails });
        }
    }
}
