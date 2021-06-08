

var Arcadix = {};
Arcadix['InitialArcadix_Data'] = {
    ['BckgElements']: [],
    ['ChildElements']: []
}


$('#clear-bckelemnts').on('click', function () {

});

$('#edit-mode').on('click', function () {
    Mode = 'edit';
    parent.updateAnimation(Arcadix['InitialArcadix_Data'], Mode);
    preLoadData = JSON.stringify(Arcadix['InitialArcadix_Data']);
    console.log("preLoadData", JSON.stringify(Arcadix['InitialArcadix_Data']));
});

$('#display-mode').on('click', function () {
    Mode = 'display';
    parent.updateAnimation(Arcadix['InitialArcadix_Data'], Mode);
    preLoadData = JSON.stringify(Arcadix['InitialArcadix_Data']);
    console.log("preLoadData", JSON.stringify(Arcadix['InitialArcadix_Data']));
})


window.serializeXML =  function(xml) {
     var s = new XMLSerializer();
     var newXmlStr = s.serializeToString(xml);
     return newXmlStr;
}


function JSONToXml(json,type) {
    let xmlDoc = document.implementation.createDocument("", "", null);
    let ElmXml = xmlDoc.createElement('Element');
    for (let item in json) {
        console.log('typeof txtJSON[item]', typeof json[item]);
        if (typeof json[item] != 'object') {
            ElmXml.setAttribute(item, json[item]);
        }
        else if (typeof json[item] == 'object') {
            for (i = 0; i < json[item].length; i++) {
                let valueXML = xmlDoc.createElement('Value');
                for (valItem in json[item][i]) {
                    valueXML.setAttribute(valItem, json[item][i][valItem]);
                }
                ElmXml.appendChild(valueXML);
            }

        }
        if (type.toLowerCase() === 'input') {
            ElmXml.setAttribute('iElementTypeId', '5');
            ElmXml.setAttribute('iElementType', 'Input');
        }
        else if (type.toLowerCase() === 'dropdown') {
            ElmXml.setAttribute('iElementTypeId', '6');
            ElmXml.setAttribute('iElementType', 'Dropdown');
        }
       
        ElmXml.setAttribute('iElementId', parent.GetUniqueId());

    }
   // console.log(serializeXML(ElmXml));
    return parseXml(serializeXML(ElmXml));
}

$('#add-textbox').on('click', function () {
    // OpenInputPopup(this);
   // uploadFile(type = 'textbox');
    //  ControlToPngCreator('textbox', uploadControlPng = uploadControlPng);
    updateJSON([{}], displayItems, 'textbox');

});


function ControlToPngCreator(iElementType, uploadControlPng) {
    var inp;
    if (iElementType && iElementType === 'textbox') {
        inp = document.createElement('input');
       // inp.id = iElementId;
        inp.setAttribute('type', 'text');
       // inp.style.position = "absolute";
        //inp.addEventListener('change', function (evt) {
        //    updateAnswerOnChange(evt, iElementId);
        //});
        //inp.style.top = 0;
        //inp.style.left = 0;
    } else if (iElementType && iElementType === 'dropdown') {
        inp = document.createElement('select');

     //   inp.id = iElementId;
        //inp.style.position = "absolute";
        inp.style.width = '150px';
        //inp.addEventListener('change', function (evt) {
        //    updateAnswerOnChange(evt, iElementId);
        //});
        //inp.style.top = 0;
        //inp.style.left = 0;
        //let options = parsedXml.getElementsByTagName("Element")[0].childNodes;
        //if (options) {
        //    for (let i = 0; i < options.length; i++) {
                //var option = document.createElement("option");
                //option.setAttribute("value", 'test');
                //option.text = '          >'
                //inp.appendChild(option);
        //    }
        //}
    }
    //  return html2Png(inp);
   // html2Png(inp = inp, uploadControlPng = uploadControlPng, type = iElementType);
    $('#html-content-inner').html('');
    $('#html-content-inner').html(inp);
    getImgPathFromHtml($('#html-content-inner').html(),   iElementType);
   // domToImage(document.getElementById('html-content-inner'), uploadControlPng = uploadControlPng, type = iElementType);
}

function getImgPathFromHtml(strHtml, type) {
    var strNewHtml = window.parent.ReplaceStringForXML(strHtml);
    //var strNewHtml = strHtml.replace(/\"/g, '\\"');
    window.parent.JEditorWorkArea_ConvertHtmlToImage(strNewHtml, uploadedJsonHandler, { type : type});
}

function uploadedJsonHandler(objJson, objParams) {
    updateJSON(objJson, displayItems, objParams.type );
}
function html2Png(inp, uploadControlPng,type) {

    $('#html-content-inner').html('');
    $('#html-content-inner').html(inp);
    domToImage(document.getElementById('html-content-inner'));
    var element = $("#html-content-inner"); // global variable
    var getCanvas; // global variable

    html2canvas(element, {
        onrendered: function (canvas) {
            //  $("#previewImage").append(canvas);
            getCanvas = canvas;
            debugger
            var imgageData = getCanvas.toDataURL("image/png");
            var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
            var base64Img = newData;
            fetch(base64Img)
                .then(res => res.blob())
                .then(blob => {
                    var file = new File([blob], 'file.png', blob);
                    console.log('png file', file);
                    uploadControlPng(file = file, type = type);
                })
        }
    });
}
function DisplayInputDetails(txtJSON) {
    debugger
    console.log('adding text box......');
    //let txtJSON = {
    //    "iElementAccessId": "38201816514678",
    //    "cHasMeasurementPrefix": "",
    //    "vMeasurementUnit": "",
    //    "cIsCaseSensitive": "N",
    //    "cIsNumber": "Y",
    //    "iWidthInPixel": "50",
    //    "cIsFormula": "N",
    //    "dWrongPoint": "",
    //    "dNotAnsweredPoint": "",
    //    "dCorrectPoint": "",
    //    "iNumberOfInputDisplay": "0",
    //    "iTextFieldType": "",
    //    "Values": [
    //        {
    //            "iDisplayOrder": 2,
    //            "vTolerance": "0.0",
    //            "AnswerValue": "5"
    //        }
    //    ]
    //}


    //let ElmXml = parseXml('<Element></Element>');
    //for (let item in txtJSON) {
    //    console.log('typeof txtJSON[item]', typeof txtJSON[item]);
    //    ElmXml.getElementsByName('Element')[0].setAttribute(item, txtJSON[item]);
    //}
    //  let ElmXml = '<Element iElementTypeId="5" iElementType="Input" iElementId="510776" iElementAccessId="510776" cHasMeasurementPrefix=" " vMeasurementUnit="" cIsCaseSensitive="N" iWidthInPixel="15"  iNumberOfInputDisplay = "0" cIsNumber= "Y" cIsFormula= "N" cIsSimpleCalculator= "N" cHasLeftFixedFormula= "N" cIsEditableInput= "N" iTextFieldType= "4" dWrongPoint= "" dNotAnsweredPoint= "" dCorrectPoint = "" ><Value iDisplayOrder="2" vTolerance="0.00" iElementInputValueId="95116">4</Value></Element >';

    updateJSON(
        uploadedJSON = [{
            answers: ['color', 'colour'],
            "ElmXml": parseXml(JSONToXml(txtJSON, 'input'))
            //    ElmXml : parseXml(ElmXml)
        }],
        displayItems = displayItems,
        type = 'textbox',
    )
}

 function OpenInputPopup(sourceElement){
        window.parent.LoadScripts({
                ScriptsJSON: [window.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/Objects/Element/Text/TextPopupPlugins/JInputProperty.js", window.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/TextEditor/JTextEditorSidebarTemplate.js", window.parent.JConfiguration.BaseUrl + "Framework/Controls/JValidator/JValidator.js"], LoadCompleteScripts: function () {
                    window.parent.JLoadInputPopup(sourceElement,DisplayInputDetails);
                }
            });
}


 function OpenDropdownPopup(sourceElement) {
     window.parent.LoadScripts({
         ScriptsJSON: [window.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/Objects/Element/Text/TextPopupPlugins/JDropdownProperty.js", window.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/TextEditor/JTextEditorSidebarTemplate.js", window.parent.JConfiguration.BaseUrl + "Framework/Controls/JValidator/JValidator.js"], LoadCompleteScripts: function () {
             window.parent.JLoadDropdownPopup(sourceElement, DisplayDropDownDetails);
         }
     });
 }

function DisplayDropDownDetails(dropdownJSON) {
    console.log('adding drop down......');
    //alert('adding textbox');
    //let dropdownJSON = {
    //    "cIsRandomizedDisplay": "Y",
    //    "Values": [
    //        {
    //            "iDisplayOrder": 1,
    //            "iElementDropDownValueId": "",
    //            "cIsCorrectValue": "Y",
    //            "AnswerValue": "56",
    //            "dWrongPoint": ""
    //        },
    //        {
    //            "iDisplayOrder": 2,
    //            "iElementDropDownValueId": "",
    //            "cIsCorrectValue": "N",
    //            "AnswerValue": "66",
    //            "dWrongPoint": ""
    //        },
    //        {
    //            "iDisplayOrder": 3,
    //            "iElementDropDownValueId": "",
    //            "cIsCorrectValue": "N",
    //            "AnswerValue": "67",
    //            "dWrongPoint": ""
    //        }
    //    ],
    //    "IsFixedWidth": "N",
    //    "iWidth": "0",
    //    "DefaultText": "test",
    //    "IsDefaultTextEmpty": "N",
    //    "cHidePleaseSelect": "N",
    //    "dCorrectPoint": "",
    //    "dNotAnsweredPoint": ""
    //};
    // let ElmXml = '<Element iElementTypeId="6" iElementType="Dropdown" iElementId="508256" iElementAccessId="508255" cIsRandomizedDisplay="N" cIsFixedWidth="N" iWidth="0" vDefaultText="" dCorrectPoint="" dNotAnsweredPoint="" cIsDefaultTextEmpty="Y" cHidePleaseSelect="N"><Value iDisplayOrder="1" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92426">stolz</Value><Value iDisplayOrder="2" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92427">dumm</Value><Value iDisplayOrder="3" cIsCorrectValue="Y" dWrongPoint="" iElementDropDownValueId="92428">bös</Value><Value iDisplayOrder="4" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92429">nett</Value><Value iDisplayOrder="5" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92430">frech</Value></Element>';



    updateJSON(
        uploadedJSON = [{
            //iElementId: parent.GetUniqueId(),
            answers: ['color', 'colour'],
            'ElmXml': JSONToXml(dropdownJSON, 'dropdown')
        }],
        displayItems = displayItems,
        type = 'dropdown',
        // prevElementId = parent.GetUniqueId()
    )
}


$('#add-dropdown').on('click', function () {
    //  OpenDropdownPopup(this);
    // uploadFile(type = 'dropdown');
    ControlToPngCreator(iElementType = 'dropdown', uploadControlPng = uploadControlPng);
});
//var active = '';
//$('#eventChange').on('click', function (evt) {
//    if (active === '') {
//        active = 'pressmove';
//    } else if (active === 'pressmove') {
//        active = 'dblclick';
//        activate('dblclick');
//    } else if (active === 'dblclick') {
//        active = 'pressmove';
//        activate('pressmove');
//    }
//});
//function activate(strEvent) {

//}
function domToImage(node, uploadControlPng,type) {
    debugger
    domtoimage.toPng(node)
        .then(function (dataUrl) {
            console.log(dataUrl);
            //window.open(dataUrl);
            //var img = new Image();
            //img.src = dataUrl;
            //document.getElementById("previewImage").appendChild(img);
            var base64Img = dataUrl;
            fetch(base64Img)
                .then(res => res.blob())
                .then(blob => {
                    var file = new File([blob], 'file.png', blob);
                    console.log('domtopng', file);
                    //return file;
                   // uploadControlPng(file = file, type = type);
                    uploadControlPng(file, type);
                })
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
}



//function generateXML() {
//    ElmXml = '<Element iElementTypeId="5" iElementType="Input" iElementId="510776" iElementAccessId="510776" cHasMeasurementPrefix=" " vMeasurementUnit="" cIsCaseSensitive="N" iWidthInPixel="15" iNumberOfInputDisplay="0" cIsNumber="Y" cIsFormula="N" cIsSimpleCalculator="N" cHasLeftFixedFormula="N" cIsEditableInput="N" iTextFieldType="4" dWrongPoint="" dNotAnsweredPoint="" dCorrectPoint=""><Value iDisplayOrder="2" vTolerance="0.00" iElementInputValueId="95116">4</Value></Element>';
//   let parsedXMl = parseXml(ElmXml);   
//}


function parseXml(text) {
 
    if (text instanceof XMLDocument) {
        return text;
    } else {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(text, "text/xml");
        return xmlDoc;
    }  
}


function GetSideBarData() {

    console.log("getting sidebar data Arcadix['InitialArcadix_Data']", Arcadix['InitialArcadix_Data']);
    return Arcadix['InitialArcadix_Data'];
}



$(document).ready(function () {
 
    $('#bck-img').on('click', function (event) {
        uploadFile(type = 'bckgElement');
       // uploadFile(event.target.files[0]);
    });
});

//function uploadFile(file) {
//    let data = new FormData();
//    data.append("files1", file);
//    let baseURL = 'http://192.168.129.120:8082';
//    fetch(baseURL + '/editor/upload', { method: 'POST', body: data })
//        .then(response => response.json())
//        .then(json => {
//            updateJSON(uploadedJSON = json, displayItems = displayItems, type = 'bckgElement');

//        });
//}


function uploadControlPng(file, type) {
    debugger
    if (file && type) {
        let data = new FormData();
        data.append("files1", file);
        let baseURL = 'http://192.168.129.120:80';
        fetch(baseURL + '/Intranet/Framework/Controls/JEmbeddedFileUpload/JEmbeddedFileUpload_New.aspx', { method: 'POST', body: data })
            .then(response => response.json())
            .then(json => {
                updateJSON(uploadedJSON = json, displayItems = displayItems, type = type);
            });
    }

}

function uploadFile(type) {
    debugger
    window.parent.LoadScripts({
        ScriptsJSON: [window.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/Objects/Element/Image/ImagePopupPlugins/JImageAddEditAndInsert.js"], LoadCompleteScripts: function () {
            var objShowPopup = window.parent.JEditorWorkArea_GetImagePopupObject();
            objShowPopup.SetProperties({
                Height: 550,
                Width: 670,
                fnCallBack: function (uploadedJSON) {
                    var arrKeys = Object.keys(uploadedJSON);
                    var objResponseJson = uploadedJSON[arrKeys[0]];
                    if (type == 'bckgElement') {
                        updateJSON(uploadedJSON = uploadedJSON, displayItems = displayItems, type = 'bckgElement');
                    } else  {
                        updateJSON(uploadedJSON = uploadedJSON, displayItems = displayItems, type = type);
                    }
                }
            });
            objShowPopup.ShowPlugin("JImageAddEditAndInsert_Initialize");
        }
    });
}

function handleJSON(data) {
    debugger
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
}


function updateJSON(uploadedJSON, displayItems, type, prevElementId, animationObj) {
    debugger
    var fileJSON;
    if (type === 'bckgElement') {
        fileJSON = handleJSON(uploadedJSON).SaveImageElementGeneric;
      
    } else {
        fileJSON = handleJSON(uploadedJSON)[0];
    }
  
    let ElementId = (prevElementId && prevElementId != '') ? prevElementId : parent.GetUniqueId();
    if (type === 'bckgElement') {
        if (!Arcadix['InitialArcadix_Data']['BckgElements'].find(a => a['BckgElementId'] === ElementId)) {
            Arcadix['InitialArcadix_Data']['BckgElements'].push(
                Object.assign({
                    "uploadedJSON": fileJSON,
                    "BckgElementId": ElementId,
                    "Img": fileJSON["ImagePath"],
                    'Type': 'Img',
                    'XPosition': 488,
                    'YPosition': 251,                  
                }, animationObj)
            )
        }
        displayItems(handleJSON(uploadedJSON), ElementId, 'bckgElement');
    }
    else if (type === 'textbox') {
        let ElmXml;
        if (fileJSON['ElmXml']) {
             ElmXml = fileJSON['ElmXml'];
            ElmXml.getElementsByTagName("Element")[0].setAttribute('iElementId', ElementId);
            ElmXml.getElementsByTagName("Element")[0].setAttribute('iElementType', 'Input');
        }
      
        if (!Arcadix['InitialArcadix_Data']['ChildElements'].find(a => a['ChildElementId'] === ElementId)) {
            if (fileJSON['ElmXml']) {
                Arcadix['InitialArcadix_Data']['ChildElements'].push(
                    Object.assign({
                        "uploadedJSON": fileJSON,
                        "ChildElementId": ElementId,
                        "Img": fileJSON["ImagePath"] ? fileJSON["ImagePath"] : "",
                        "Type": 'TextBox',
                        "ElmXml": ElmXml,
                        'XPosition': 200,
                        'YPosition': 50,
                        'ObjType': 'placeholder'
                    }, animationObj)
                )
            } else {
                Arcadix['InitialArcadix_Data']['ChildElements'].push(
                    Object.assign({
                        "uploadedJSON": fileJSON,
                        "ChildElementId": ElementId,
                        "Img": fileJSON["ImagePath"] ? fileJSON["ImagePath"] : "",
                        "Type": 'TextBox',
                        "ElmXml": '',
                        'XPosition': 200,
                        'YPosition': 50,
                        'ObjType': 'placeholder'
                    }, animationObj)
                )
            }

        }
        displayItems(handleJSON(uploadedJSON), ElementId, 'textbox');
    }
    else if (type === 'dropdown') {
        let ElmXml;
        if (fileJSON['ElmXml']) {
             ElmXml = fileJSON['ElmXml'];
            ElmXml.getElementsByTagName("Element")[0].setAttribute('iElementId', ElementId);
            ElmXml.getElementsByTagName("Element")[0].setAttribute('iElementType', 'Dropdown');
        }
   
        if (!Arcadix['InitialArcadix_Data']['ChildElements'].find(a => a['ChildElementId'] === ElementId)) {
            if (fileJSON['ElmXml']) {
                Arcadix['InitialArcadix_Data']['ChildElements'].push(
                    Object.assign({
                        "uploadedJSON": fileJSON,
                        "ChildElementId": ElementId,
                        "Img": fileJSON["ImagePath"] ? fileJSON["ImagePath"] : "",
                        "Type": 'DropDown',
                        "ElmXml": ElmXml,
                        'XPosition': 200,
                        'YPosition': 50,
                        'ObjType': 'placeholder'
                    }, animationObj)
                )
            } else {
                Arcadix['InitialArcadix_Data']['ChildElements'].push(
                    Object.assign({
                        "uploadedJSON": fileJSON,
                        "ChildElementId": ElementId,
                        "Img": fileJSON["ImagePath"] ? fileJSON["ImagePath"] : "",
                        "Type": 'DropDown',
                        "ElmXml": '',
                        'XPosition': 200,
                        'YPosition': 50,
                        'ObjType': 'placeholder'
                    }, animationObj)
                )
            }
         
        }
        displayItems(handleJSON(uploadedJSON), ElementId, 'dropdown');
    }
   
}


//function uuidv4() {
//    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
//        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//    )
//}                                                                                     


function displayItems(item, uid, type) {

    let $button = $('<button class="' + uid + '">X</button>');
    $button.on('click', function () {
        removeItem(uid, type);
    })
    if (type === 'bckgElement') {
        if ($('.' + uid).length === 0) {
            $('#bckgimg-list').append('<span class="' + uid + '"><br /><span>Background Image:</span>' + '' + '<span>:</span>' + uid + '</span>');
            $('#bckgimg-list').append('<br />');
            $('#bckgimg-list').append($button);
        }
    }
    else if (type === 'textbox') {
        if ($('.' + uid).length === 0) {
            $('#textbox-list').append('<span class="' + uid + '"><br /><span>Textbox:</span>' + '' + '<span>:</span>' + uid + '</span>');
            $('#textbox-list').append('<br />');
            $('#textbox-list').append($button);
        }
    } else if (type === 'dropdown') {
        if ($('.' + uid).length === 0) {
            $('#dropdown-list').append('<span class="' + uid + '"><br /><span>Dropdown:</span>' + '' + '<span>:</span>' + uid + '</span>');
            $('#dropdown-list').append('<br />');
            $('#dropdown-list').append($button);
        }
    }

}


function removeItem(uid, type) {
    
    if (type === 'bckgElement') {
        Arcadix['InitialArcadix_Data']["BckgElements"] = Arcadix['InitialArcadix_Data']["BckgElements"].filter(a => a["BckgElementId"] !== uid); // removing from the array
        $('.' + uid).remove();  // removing from the DOM
    } 
    else {
        Arcadix['InitialArcadix_Data']["ChildElements"] = Arcadix['InitialArcadix_Data']["ChildElements"].filter(a => a["ChildElementId"] !== uid);
        $('.' + uid).remove();
    }
    ////console.log('json after removing', Arcadix['InitialArcadix_Data']);
}


function LoadInitialize(animationObj) {
    let preLoadedObj = animationObj['InitialArcadix_Data'];
    if (preLoadedObj['BckgElements']) {
        for (let i = 0; i < preLoadedObj['BckgElements'].length; i++) {
            updateElementJSON([preLoadedObj['BckgElements'][i]['uploadedJSON']], displayItems, preLoadedObj['BckgElements'][i]['BckgElementId'], preLoadedObj['BckgElements'][i]);
            //  displayItems([preLoadedObj['Elements'][i]['uploadedJSON']], preLoadedObj['Elements'][i]['ElementId'], 'element');
        }
    }
    if (preLoadedObj['ChildElements']) {
        for (let j = 0; j < preLoadedObj['ChildElements'].length; j++) {
            updateDropZoneJSON([preLoadedObj['ChildElements'][j]['uploadedJSON']], displayItems, preLoadedObj['ChildElements'][j]['ChildElementId'], preLoadedObj['ChildElements'][j]);
            //  displayItems([preLoadedObj['DropZones'][j]['uploadedJSON']], preLoadedObj['DropZones'][j]['DropZoneId'], 'dropzone');
        }
    }
    console.log('running preload');
    //  return Arcadix;
}

function GetSideBarData() {

    console.log("getting sidebar data Arcadix['InitialArcadix_Data']", Arcadix['InitialArcadix_Data']);
    return Arcadix['InitialArcadix_Data'];
}