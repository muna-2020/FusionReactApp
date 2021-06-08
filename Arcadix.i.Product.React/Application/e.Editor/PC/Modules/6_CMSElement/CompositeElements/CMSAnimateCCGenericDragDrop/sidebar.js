
function polifills() {

    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { // .length of function is 2
                'use strict';
                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) { // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }





    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function (predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return -1.
                return -1;
            },
            configurable: true,
            writable: true
        });
    }




    if (!Array.prototype.filter) {
        Array.prototype.filter = function (func, thisArg) {
            'use strict';
            if (!((typeof func === 'Function' || typeof func === 'function') && this))
                throw new TypeError();

            var len = this.length >>> 0,
                res = new Array(len), // preallocate array
                t = this, c = 0, i = -1;
            if (thisArg === undefined) {
                while (++i !== len) {
                    // checks to see if the key was set
                    if (i in this) {
                        if (func(t[i], i, t)) {
                            res[c++] = t[i];
                        }
                    }
                }
            }
            else {
                while (++i !== len) {
                    // checks to see if the key was set
                    if (i in this) {
                        if (func.call(thisArg, t[i], i, t)) {
                            res[c++] = t[i];
                        }
                    }
                }
            }

            res.length = c; // shrink down array to proper size
            return res;
        };
    }




    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function (predicate) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
                var o = Object(this);
                var len = o.length >>> 0;
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var thisArg = arguments[1];
                var k = 0;
                while (k < len) {
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    k++;
                }
                return undefined;
            },
            configurable: true,
            writable: true
        });
    }




}



//console.log('parent window json obj',window.ParentJsonObj);
//console.log('parent hidden field data', $(parent.document).find('#hiddenField').val());
let Mode = 1;
console.log('parent json data', parent.containerJSON);
$(parent.document).on('change', '#hiddenField', function (event) {
    console.log('hidden field value', $(this).val());
})
var Arcadix = {};
Arcadix['InitialArcadix_Data'] = {
    "Elements": [],
    "DropZones": [],
    "Placeholder": [],
    "TextContent" : [] 
};
$(document).ready(function () {
    polifills();

    $('#element-upload').on('click', function (event) {
        uploadFile('element');
    });
    $('#text-upload').on('click', function (event) {
        updateJSON('elementplaceholder', {}, displayItems);
    })
    $('#dropzone-upload').on('click', function (event) {
        uploadFile('dropzone');
    });

    $('#placeholder-add').on('click', function (event) {
        updateJSON('placeholder', {}, displayItems);
    });
    $('#textcontent-add').on('click', function (event) {
        updateJSON('textcontent', {}, displayItems);
    });
    $('#htmlimg-add').on('click', function (event) {
        //updateJSON('htmlimg', {}, displayItems);
        window.parent.ShowHTMLImageSidebar();
    })
    $('#element-image').on('click', function (event) {

    });
    $('#element-text').on('click', function (event) {

    })
});


 




//=============================xml parsing and stuff====================
function parseXmlStr(xmlStr) {
    var parseXml;
    if (typeof window.DOMParser != "undefined") {
        parseXml = function (xmlStr) {
            return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
        };
    } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
        parseXml = function (xmlStr) {
            var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlStr);
            return xmlDoc;
        };
    } else {
        return false;
    }

    try {
        return parseXml(xmlStr);
    } catch (e) {
        return xmlStr;
    }

}
function parseXml(text) {
    if (text instanceof XMLDocument) {
        return text;
    } else {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(text, "text/xml");
        return xmlDoc;
    }
}
//=============================xml parsing and stuff=========end===========
function LoadInitialize(animationObj) {
    debugger
    let preLoadedObj = animationObj['InitialArcadix_Data'];
    if (preLoadedObj['Elements']) {
        for (var i = 0; i < preLoadedObj['Elements'].length; i++) {
            //updateElementJSON([preLoadedObj['Elements'][i]['uploadedJSON']], displayItems, preLoadedObj['Elements'][i]['ElementId'], preLoadedObj['Elements'][i]);
            //  displayItems([preLoadedObj['Elements'][i]['uploadedJSON']], preLoadedObj['Elements'][i]['ElementId'], 'element');
            if (preLoadedObj['Elements'][i]['ElementPlaceholderId']) {
                updateJSON('elementplaceholder', [preLoadedObj['Elements'][i]], displayItems, preLoadedObj['Elements'][i]['ElementId'], preLoadedObj['Elements'][i]);
            } else {
                updateJSON('element', [preLoadedObj['Elements'][i]['uploadedJSON']], displayItems, preLoadedObj['Elements'][i]['ElementId'], preLoadedObj['Elements'][i]);
            }
          
        }
    }
    if (preLoadedObj['DropZones']) {
        for (var j = 0; j < preLoadedObj['DropZones'].length; j++) {
            //updateDropZoneJSON([preLoadedObj['DropZones'][j]['uploadedJSON']], displayItems, preLoadedObj['DropZones'][j]['DropZoneId'], preLoadedObj['DropZones'][j]);
            //  displayItems([preLoadedObj['DropZones'][j]['uploadedJSON']], preLoadedObj['DropZones'][j]['DropZoneId'], 'dropzone');
            updateJSON('dropzone', [preLoadedObj['DropZones'][j]['uploadedJSON']], displayItems, preLoadedObj['DropZones'][j]['DropZoneId'], preLoadedObj['DropZones'][j]);

        }
    }
    if (preLoadedObj['Placeholder']) {
        for (var k = 0; k < preLoadedObj['Placeholder'].length; k++) {
           
            updateJSON('placeholder', [preLoadedObj['Placeholder'][k]['uploadedJSON']], displayItems, preLoadedObj['Placeholder'][k]['PlaceholderId'], preLoadedObj['Placeholder'][k]);

        }
    }
    if (preLoadedObj['TextContent']) {
        for (var l = 0; l < preLoadedObj['TextContent'].length; l++) {
            //updateDropZoneJSON([preLoadedObj['DropZones'][j]['uploadedJSON']], displayItems, preLoadedObj['DropZones'][j]['DropZoneId'], preLoadedObj['DropZones'][j]);
            //  displayItems([preLoadedObj['DropZones'][j]['uploadedJSON']], preLoadedObj['DropZones'][j]['DropZoneId'], 'dropzone');
            updateJSON('textcontent', [preLoadedObj['TextContent'][l]['uploadedJSON']], displayItems, preLoadedObj['TextContent'][l]['TextContentId'], preLoadedObj['TextContent'][l]);

        }
    }
    //console.log('running preload');
    ////return Arcadix;
}
function clearElementList() {
    $('#element-list').html('');
}
function clearDropZoneList() {
    $('#dropzone-list').html('');
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
                    updateJSON(type, objResponseJson, displayItems);
                }
            });
            objShowPopup.ShowPlugin("JImageAddEditAndInsert_Initialize");
        }
    });
}



function updateJSON(type, objResponseJson, displayItems, prevElementId, animationObj) {  // type and objResponseJson are mandatory
    if (type === 'element') {
        console.log('objResponseJson', objResponseJson);
        updateElementJSON(objResponseJson, displayItems, prevElementId, animationObj);
    }
    else if (type === 'placeholder') {
        updatePlaceholderJSON(objResponseJson, displayItems, prevElementId, animationObj);
    }
    else if (type === 'textcontent') {
        updateTextContentJSON(objResponseJson, displayItems, prevElementId, animationObj);
    }
    else if (type === 'elementplaceholder') {
        updateTextContentJSON_Test(objResponseJson, displayItems, prevElementId, animationObj)
    }
    else if (type === 'htmlimg') {
        updateTextContentJSON_htmlimg(objResponseJson, displayItems, prevElementId, animationObj)
    }
    else {
        console.log('objResponseJson', objResponseJson);
        updateDropZoneJSON(objResponseJson, displayItems, prevElementId, animationObj);
    }
}

function updatePlaceholderJSON(uploadedJSON, displayItems, prevElementId, animationObj) {
    let ElementId = (prevElementId && prevElementId != '') ? prevElementId : uuidv4();
    if (!Arcadix['InitialArcadix_Data']['Placeholder'].find(function (a) { if (a['PlaceholderId'] === ElementId) return a })) {
        Arcadix['InitialArcadix_Data']['Placeholder'].push(
            Object.assign({
                "PlaceholderId": ElementId,
                'XPosition': 200,
                'YPosition': 50,
                'ObjType': 'Input',
                'ElmXml' : ''
            }, animationObj)
        )
    }

    displayItems(handleJSON(uploadedJSON), ElementId, 'placeholder');
}

function updateTextContentJSON(uploadedJSON, displayItems, prevElementId, animationObj) {
    let ElementId = (prevElementId && prevElementId != '') ? prevElementId : uuidv4();
    if (!Arcadix['InitialArcadix_Data']['TextContent'].find(function (a) { if (a['TextContentId'] === ElementId) return a })) {
        Arcadix['InitialArcadix_Data']['TextContent'].push(
            Object.assign({
                "TextContentId": ElementId,
                'XPosition': 200,
                'YPosition': 50,
                'ObjType': 'Text',
                'Status': 'Placeholder',
                'ElmXml': ''
            }, animationObj)
        )
    }

    displayItems(handleJSON(uploadedJSON), ElementId, 'textcontent');
}

function updateTextContentJSON_htmlimg(uploadedJSON, displayItems, prevElementId, animationObj) {
    let ElementId = (prevElementId && prevElementId != '') ? prevElementId : uuidv4();
    if (!Arcadix['InitialArcadix_Data']['TextContent'].find(function (a) { if (a['TextContentId'] === ElementId) return a })) {
        Arcadix['InitialArcadix_Data']['TextContent'].push(
            Object.assign({
                "uploadedJSON": JSON.stringify(uploadedJSON),
                "TextContentId": ElementId,
                'XPosition': 200,
                'YPosition': 50,
                //'ObjType': 'HtmlImg',
                'Img': uploadedJSON.vImagePath,
                'Status': 'HtmlImg',
                'ElmXml': ''
            }, animationObj)
        )
    }

    displayItems(handleJSON(uploadedJSON), ElementId, 'htmlimg');
}


function updateTextContentJSON_Test(uploadedJSON, displayItems, prevElementId, animationObj) {
    let ElementId = (prevElementId && prevElementId != '') ? prevElementId : uuidv4();
    if (!Arcadix['InitialArcadix_Data']['Elements'].find(function (a) { if (a['ElementId'] === ElementId) return a })) {
        Arcadix['InitialArcadix_Data']['Elements'].push(
            Object.assign({
                "ElementId": ElementId,
                'Img' : '',
                'ElementPlaceholderId': ElementId,
                'XPosition': 200,
                'YPosition': 50,
                'ObjType': 'Text',
                'Status' :'Placeholder',
                'ElementType' : 'Text',
                'ElmXml': ''
            }, animationObj)
        )
    }

    displayItems(handleJSON(uploadedJSON), ElementId, 'elementplaceholder');
}

function updateElementJSON(uploadedJSON, displayItems, prevElementId, animationObj) {
    debugger
    console.log('uploadedJSON', uploadedJSON);
     // let fileJSON = handleJSON(uploadedJSON);
    //  console.log('fileJSON',fileJSON)
    let ElementId = (prevElementId && prevElementId != '') ? prevElementId : uuidv4();
    //if (!Arcadix['InitialArcadix_Data']["Elements"].find(a => a['ElementId'] === ElementId)) {
    if (!Arcadix['InitialArcadix_Data']["Elements"].find(function (a) {
        if (a['ElementId'] === ElementId) {
            return a;
        } else {
            return undefined;
        }
    })) {
        var XmlStr = '<Element iElementTypeId = "2" iElementAccessId = "337642" iElementId = "337642" vImageType="png" cHasTextOnTop ="N" iImageFileVersion="1" vElementVerticalAlignment="top" vElementImageName="160076_Image_1" vElementHorizontalAlignment="left" iElementImageWidth = "505" iElementImageHeight = "705" cShowTitle ="N" cShowDescription ="N" cDisplayedInElementTree ="Y" iElementType = "Image"></Element>';
        var ElmXml;
        ElmXml = parseXmlStr(XmlStr);
        ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementId', ElementId);
        // ElmXml.setAttribute('iElementId', objParam['PlaceholderId']);
        ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementAccessId', ElementId);
        ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementTypeId', 2);
        ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementType', 'Image');
        Arcadix['InitialArcadix_Data']["Elements"].push(
            Object.assign(
                { 
                    "uploadedJSON": JSON.stringify(uploadedJSON),
                    "ElementId": ElementId,
                    //"Img": fileJSON["FileName"],
                    "Img": uploadedJSON["ImagePath"],
                    "StartX": 30,
                    "StartY": 30,
                    'ElmXml': XmlStr
                    //"ObjType": "DropZone" 
                    //'XPosition': 30,
                    //'YPosition': 30
                }, animationObj
            )

        );
    }

    ////console.log('after pushing into JSON', JSON.stringify( Arcadix['InitialArcadix_Data']));
    console.log('after updating...........');
    console.log("Arcadix['InitialArcadix_Data']", Arcadix['InitialArcadix_Data']);
    displayItems(handleJSON(uploadedJSON), ElementId, 'element');
}


function GetResultFromEditor(htmlStr) {
    getImgPathFromHtml(htmlStr, {}, ImagepathCallback);
}

/////////==========================html to image methods=============================
function getImgPathFromHtml(strHtml, objParam, ImagepathCallback) {
    debugger
    var wrapperDiv = '<div display="inline-block" class="PageOutputContentText" textAlign="center">' + strHtml + '</div>';
    var strNewHtml = window.parent.ReplaceStringForXML(wrapperDiv);
    //var strNewHtml = strHtml.replace(/\"/g, '\\"');
    window.parent.JEditorWorkArea_ConvertHtmlToImage(strNewHtml, ImagepathCallback, objParam);
}


function ImagepathCallback(objJson, objParam) {


    updateJSON('htmlimg', objJson.GetNewHttmlImage, displayItems);



}



/////////==========================html to image methods=============end=============


function GetSideBarData() {

    console.log("getting sidebar data Arcadix['InitialArcadix_Data']", Arcadix['InitialArcadix_Data']);
    return Arcadix['InitialArcadix_Data'];
}
function handleJSON(data) {
    debugger
    try {
        return JSON.parse(data);
    } catch (e) {
        return data;
    }
}
function updateDropZoneJSON(uploadedJSON, displayItems, prevDropZoneId, animationObj) {
    debugger
    //   console.log('uploadedJSON',uploadedJSON);
   //  let fileJSON = handleJSON(uploadedJSON);
    // console.log('fileJSON',fileJSON);
    let ElementId = (prevDropZoneId && prevDropZoneId != '') ? prevDropZoneId : uuidv4();
    //if (!Arcadix['InitialArcadix_Data']["DropZones"].find(a => a['DropZoneId'] === ElementId)) {
    if (!Arcadix['InitialArcadix_Data']["DropZones"].find(function (a) {
        if (a['DropZoneId'] === ElementId) {
            return a;
        } else {
            return undefined;
        }
    })) {
        var XmlStr = '<Element iElementTypeId = "2" iElementAccessId = "337642" iElementId = "337642" vImageType="png" cHasTextOnTop ="N" iImageFileVersion="1" vElementVerticalAlignment="top" vElementImageName="160076_Image_1" vElementHorizontalAlignment="left" iElementImageWidth = "505" iElementImageHeight = "705" cShowTitle ="N" cShowDescription ="N" cDisplayedInElementTree ="Y" iElementType = "Image"></Element>';
        var ElmXml;
        ElmXml = parseXmlStr(XmlStr);
        ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementId', ElementId);
        // ElmXml.setAttribute('iElementId', objParam['PlaceholderId']);
        ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementAccessId', ElementId);
        ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementTypeId', 2);
        ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementType', 'Image');
        Arcadix['InitialArcadix_Data']["DropZones"].push(
            Object.assign(
                {
                    "uploadedJSON": JSON.stringify(uploadedJSON),
                    "DropZoneId": ElementId,
                    "Img": uploadedJSON["ImagePath"],
                    "ObjType": "DropZone",
                    //'XPosition': 100,
                    //'YPosition': 250,
                    'ElmXml' : ElmXml

                },
                animationObj
            )

        )
    }
    ////console.log('after pushing into JSON', JSON.stringify(Arcadix['InitialArcadix_Data']));
    displayItems(handleJSON(uploadedJSON), ElementId, 'dropzone');
}
function displayItems(item, uid, type) {
    debugger
    //console.log(item);
    //  console.log("item[0]['ClientFileName']",item[0]['ClientFileName'])
    let $button = $('<button class="' + uid + '">X</button>');
    $button.on('click', function () {
        removeItem(uid, type);
    })
    if (type === 'element') {
        if ($('.' + uid).length === 0) {
            $('#element-list').append('<span class="' + uid + '"><br /><span>Element:</span>' + item['ImageName'] + '<span>Path:</span>' + item['ImagePath'] + '</span>');
            $('#element-list').append('<br />');
            $('#element-list').append($button);
        }
    } else if (type === 'placeholder') {
        if ($('.' + uid).length === 0) {
            $('#placeholder-list').append('<span class="' + uid + '"><br /><span>Placeholder:</span>' + '' + '<span>Path:</span>' + uid + '</span>');
            $('#placeholder-list').append('<br />');
            $('#placeholder-list').append($button);
        }
    } else if (type === 'textcontent') {
        if ($('.' + uid).length === 0) {
            $('#textcontent-list').append('<span class="' + uid + '"><br /><span>TextContent:</span>' + '' + '<span>Path:</span>' + uid + '</span>');
            $('#textcontent-list').append('<br />');
            $('#textcontent-list').append($button);
        }
    } else if (type === 'elementplaceholder') {
        if ($('.' + uid).length === 0) {
            $('#element-list').append('<span class="' + uid + '"><br /><span>Text:</span>' + '' + '<span>Path:</span>' + uid + '</span>');
            $('#element-list').append('<br />');
            $('#element-list').append($button);
        }
    } else if (type === 'htmlimg') {
        if ($('.' + uid).length === 0) {
            $('#htmlimg-list').append('<span class="' + uid + '"><br /><span>TextContent:</span>' + '' + '<span>Path:</span>' + uid + '</span>');
            $('#htmlimg-list').append('<br />');
            $('#htmlimg-list').append($button);
        }
    } 
    else {
        if ($('.' + uid).length === 0) {
            $('#dropzone-list').append('<span class="' + uid + '"><br /><span>Element:</span>' + item['ImageName'] + '<span>Path:</span>' + item['ImagePath'] + '</span>');
            $('#dropzone-list').append('<br />');
            $('#dropzone-list').append($button);
        }
    }
}
function uuidv4() {

    return parent.GetUniqueId();
}
function removeItem(uid, type) {
    if (type === 'element') {
        //Arcadix['InitialArcadix_Data']["Elements"] = Arcadix['InitialArcadix_Data']["Elements"].filter(a => a["ElementId"] !== uid);// removing from the array
        Arcadix['InitialArcadix_Data']["Elements"] = Arcadix['InitialArcadix_Data']["Elements"].filter(function (a) {
            if (a["ElementId"] !== uid) {
                return a;
            } else {
                return undefined;
            }
        });// removing from the array
        $('.' + uid).remove();  // removing from the DOM
    } else if (type === 'placeholder') {
        Arcadix['InitialArcadix_Data']['Placeholder'].splice(Arcadix['InitialArcadix_Data']['Placeholder'].findIndex(function (a) { if (a['PlaceholderId'] === uid) { return a } }), 1);
        $('.' + uid).remove();  // removing from the DOM
    } else if (type === 'textcontent') {
        Arcadix['InitialArcadix_Data']['TextContent'].splice(Arcadix['InitialArcadix_Data']['TextContent'].findIndex(function (a) { if (a['TextContentId'] === uid) { return a } }), 1);
    } else if (type === 'htmlimg') {
        Arcadix['InitialArcadix_Data']["TextContent"] = Arcadix['InitialArcadix_Data']['TextContent'].filter(function (a) { a['TextContentId'] !== uid });
        $('.' + uid).remove();  // removing from the DOM
    }
    else {
        //Arcadix['InitialArcadix_Data']["DropZones"] = Arcadix['InitialArcadix_Data']["DropZones"].filter(a => a["DropZoneId"] !== uid);
        Arcadix['InitialArcadix_Data']["DropZones"] = Arcadix['InitialArcadix_Data']["DropZones"].filter(function (a) {
            if (a["DropZoneId"] !== uid) {
                return a;
            } else {
                return undefined;
            }
        });
        $('.' + uid).remove();
    }
    console.log('json after removing', Arcadix['InitialArcadix_Data']);
}
function redisplayAllItems(type) {  // redisplaying elements from the json after deleting

    if (type === 'element') {
        $('#element-list').html('');
        // $('#element-list').html('');
        Arcadix['InitialArcadix_Data']["Elements"].forEach(function (item) {
            // Arcadix['InitialArcadix_Data']["Elements"].forEach(item => {
            let $button = $('<button>X</button>');
            $button.on('click', function () {
                //alert(uid);
                removeItem(uid, type);
            })
            $('#element-list').append('<br /><span>Element:</span>' + item['uploadedJSON']['ClientFileName'] + '<span>Path:</span>' + item['uploadedJSON']['FileWebPath']);
            $('#element-list').append($button);
        });

    } else {

        Arcadix['InitialArcadix_Data']["DropZones"].forEach(function (item) {

            let $button = $('<button>X</button>');
            $button.on('click', function () {

                removeItem(uid, type);
            })
            $('#dropzone-list').append('<br /><span>Element:</span>' + item['uploadedJSON']['ClientFileName'] + '<span>Path:</span>' + item['uploadedJSON']['FileWebPath']);
            $('#dropzone-list').append($button);
        });
    }

}
