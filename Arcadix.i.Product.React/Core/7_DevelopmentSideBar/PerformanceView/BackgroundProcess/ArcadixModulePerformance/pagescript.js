//event listener to get the File details
window.addEventListener('GET_FILEDETAILS', function getDuckInPage(event) {
    //You can also use dispatchEvent
    window.FileDetails = event.detail ? event.detail : [];

    window.postMessage({ action: 'GOT_FILEDETAILS', payload: "hello............................................." }, '*');
}, false);


// //Clear while unloading.
// window.addEventListener('beforeunload', function (e) {
//     // Cancel the event
//     e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown    
//     window.postMessage({ action: 'RESET_ONUNLOAD', payload: "hello............................................." }, '*');
// });

//Reset File details
window.ResetFileDetails = function Reset() {
    //window.postMessage({ action: 'RESET_DETAILS', payload: "hello............................................." }, '*');  
    let events = new CustomEvent('RESET_DETAILS_FROMWEBSITE');
    window.dispatchEvent(events);
}

//check if page is reloaded.
window.addEventListener("unload", function ResetWindow(event) {
    
});

//check if page reloaded 
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    window.postMessage({ action: 'RESET_ONUNLOAD', payload: "PageUnload" }, '*');
}

//Reset File Logging
window.ResetLogFile = function ResetLogFile() {
    //window.postMessage({ action: 'RESET_DETAILS', payload: "hello............................................." }, '*');
    let events = new CustomEvent('RESET_FILELOG');
    window.dispatchEvent(events);
}