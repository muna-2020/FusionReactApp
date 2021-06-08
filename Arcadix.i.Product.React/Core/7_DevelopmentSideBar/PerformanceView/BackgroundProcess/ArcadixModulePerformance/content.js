//start connection in content script
let contentPort = chrome.runtime.connect({
    name: 'background-contents'
});

//Append your pageScript.js to "real" webpage. So will it can full access to webpage.
var s = document.createElement('script');
s.src = chrome.extension.getURL('pagescript.js');
(document.body).appendChild(s);

//Our pageScript.js only add listener to window object, 
//so we don't need it after it finish its job. But depend your case, 
//you may want to keep it.
s.parentNode.removeChild(s);

//Listen for runtime message
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'GET_FILEDETAILS') {
        //fire an event to get duck
        let event = new CustomEvent('GET_FILEDETAILS', { 'detail': message.payload });
        window.dispatchEvent(event);
    }

    console.log("message====", message.action);
    console.log("message====", message.payload);
});

//send data
window.addEventListener('message', function receiveDuck(event) {
    if (event.data.action === 'GOT_FILEDETAILS') {
        //Remove this listener, but you can keep it depend on your case
        window.removeEventListener('message', receiveDuck, false);
        contentPort.postMessage({ type: 'GOT_FILEDETAILS', payload: event.data.payload });
    }
    if (event.data.action === 'RESET_ONUNLOAD') {
        contentPort.postMessage({ type: 'RESET_ONUNLOAD', payload: {} });
    }
}, false);

//event Listener to Reset the data.
window.addEventListener('RESET_DETAILS_FROMWEBSITE', function getDuckInPage(event) {
    //You can also use dispatchEvent
    contentPort.postMessage({ type: 'RESET_DETAILS', payload: {} });
}, false);

//event Listener to Reset the data.
window.addEventListener('RESET_FILELOG', function getDuckInPage(event) {
    event.preventDefault();
    //You can also use dispatchEvent
    contentPort.postMessage({ type: 'RESET_FILERECORDING', payload: {} });
}, false);
