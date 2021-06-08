
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



var Arcadix = {};
Arcadix['InitialArcadix_Data'] = {
    LeftShapes: [],
    RightShapes : []
};
$(document).ready(function () {
    polifills();

    $('#leftimg-upload').on('click', function () {
        uploadFile('img');
    });
    $('#righttext-upload').on('click', function () {
        // updateJSON('rightshape','text', { Text: $('#input-text').val() },displayItems);
        OpenInputPopup_Text(this,{});
    });
});



//===============for input popup================
function OpenInputPopup_Text(sourceElement, objParam) {
//     window.parent.parent.LoadScripts({
//         ScriptsJSON: [window.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/Objects/Element/Text/TextPopupPlugins/JInputProperty.js", window.parent.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/TextEditor/JTextEditorSidebarTemplate.js", window.parent.parent.JConfiguration.BaseUrl + "Framework/Controls/JValidator/JValidator.js"], LoadCompleteScripts: function () {
//             window.parent.JLoadInputPopup(sourceElement, textPopupCallback_text, objParam);
//        }
//    });
    window.parent.JEditorWorkArea_CallPopupFromSidebar('Input', {}, textPopupCallback_text);
}
function textPopupCallback_text(objJSON,objParam){
    console.log('objJSON',objJSON);
    updateJSON('rightshape','text', { Text: objJSON['Values'][0]['AnswerValue'] },displayItems);
}
//===============for input popup=========end=======


function LoadInitialize(animationObj) {
    debugger
    let preLoadedObj = animationObj['InitialArcadix_Data'];
    if (preLoadedObj) {
        if (preLoadedObj && preLoadedObj['LeftShapes']) {
            for (var i = 0; i < preLoadedObj['LeftShapes'].length; i++) {
                //updateElementJSON([preLoadedObj['Elements'][i]['uploadedJSON']], displayItems, preLoadedObj['Elements'][i]['ElementId'], preLoadedObj['Elements'][i]);
                //  displayItems([preLoadedObj['Elements'][i]['uploadedJSON']], preLoadedObj['Elements'][i]['ElementId'], 'element');
                // updateJSON('element', [preLoadedObj['Elements'][i]['uploadedJSON']], displayItems, preLoadedObj['Elements'][i]['ElementId'], preLoadedObj['Elements'][i]);
                var type = preLoadedObj['LeftShapes'][i]['ObjType'] === 'Img' ? 'img' : 'text';
                updateJSON('leftshape', type, preLoadedObj['LeftShapes'][i], displayItems, preLoadedObj['LeftShapes'][i]['LeftShapeId'], preLoadedObj['LeftShapes'][i]);
            }
        }
        if (preLoadedObj && preLoadedObj['RightShapes']) {
            for (var j = 0; j < preLoadedObj['Images'].length; j++) {
                //updateElementJSON([preLoadedObj['Elements'][i]['uploadedJSON']], displayItems, preLoadedObj['Elements'][i]['ElementId'], preLoadedObj['Elements'][i]);
                //  displayItems([preLoadedObj['Elements'][i]['uploadedJSON']], preLoadedObj['Elements'][i]['ElementId'], 'element');
                var type = preLoadedObj['RightShape'][j]['ObjType'] === 'Img' ? 'img' : 'text';
                updateJSON('rightshape', type, preLoadedObj['RightShapes'][j]['uploadedJSON'], displayItems, preLoadedObj['RightShapes'][j]['RightShapeId'], preLoadedObj['RightShapes'][j]);
            }
        }
    }

    // if (preLoadedObj['BgImage']) {
    //     updateJSON('bgimage', [preLoadedObj['Elements'][i]['uploadedJSON']], displayItems, preLoadedObj['BgImage'])
    // }
    console.log('running preload');

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
                    updateJSON('leftshape',type, objResponseJson, displayItems);
                }
            });
            objShowPopup.ShowPlugin("JImageAddEditAndInsert_Initialize");
        }
    });
}



function updateJSON(sideType, type, objResponseJson, displayItems, prevElementId, animationObj) {  // type and objResponseJson are mandatory
    debugger
    // {
    //     type = 'img' // for images
    //     type = 'text' // for text
    // }
    if (sideType.toLowerCase() === 'leftshape') {
        if (type.toLowerCase() === 'img') {
            // updateImageJSON(objResponseJson, displayItems, prevElementId, animationObj);
            updateLeftShape(type, objResponseJson, displayItems, prevElementId, animationObj);
        } else if (type.toLowerCase() === 'text') {
            updateLeftShape(type, objResponseJson, displayItems, prevElementId, animationObj);
        }
    } else if (sideType.toLowerCase() === 'rightshape') {
        if (type.toLowerCase() === 'text') {
            // updateTextJSON(objResponseJson, displayItems, prevElementId, animationObj);
            updateRightShape(type, objResponseJson, displayItems, prevElementId, animationObj);
        } else if (type.toLowerCase() === 'img') {
            updateRightShape(type, objResponseJson, displayItems, prevElementId, animationObj);
        }
    }


}

function updateImageJSON(uploadedJSON, displayItems, prevElementId, animationObj) {
    debugger
    var fileJSON;
    fileJSON = handleJSON(uploadedJSON);
    let ImageId = (prevElementId && prevElementId != '') ? prevElementId : parent.GetUniqueId();
    if (!Arcadix['InitialArcadix_Data']['LeftShapes'].find(function (a) { return a['ImageId'] === ImageId })) {
        Arcadix.InitialArcadix_Data.LeftShapes.push(
            Object.assign({
                'uploadedJSON': fileJSON,
                'ImageId': ImageId,
                'ObjType' : 'Img',
                'XPosition': 488,
                'YPosition': 251,
                "Img": fileJSON["ImagePath"],
            }, animationObj)
        )
    }
    displayItems(handleJSON(uploadedJSON), ImageId, 'img');
}

function updateLeftShape(objType, uploadedJSON, displayItems, prevElementId, animationObj) {
    debugger
    if (objType === 'img') {
        var fileJSON;
        fileJSON = handleJSON(uploadedJSON);
        let LeftShapeId = (prevElementId && prevElementId != '') ? prevElementId : parent.GetUniqueId();
        if (!Arcadix['InitialArcadix_Data']['LeftShapes'].find(function (a) { return a['LeftShapeId'] === LeftShapeId })) {
            Arcadix.InitialArcadix_Data.LeftShapes.push(
                Object.assign({
                    'uploadedJSON': fileJSON,
                    'LeftShapeId': LeftShapeId,
                    'ObjType': 'Img',
                    // 'XPosition': 488,
                    // 'YPosition': 251,
                    // 'DispActive' : false,
                    // 'LineTo' : [],
                    "Img": fileJSON["ImagePath"],
                }, animationObj)
            )
        }
        displayItems(handleJSON(uploadedJSON), LeftShapeId, 'img','leftshapes');
    } else if (objType === 'text') {
        var fileJSON;
        fileJSON = handleJSON(uploadedJSON);
        let LeftShapeId = (prevElementId && prevElementId != '') ? prevElementId : parent.GetUniqueId();
        if (!Arcadix['InitialArcadix_Data']['LeftShapes'].find(function (a) { return a['LeftShapeId'] === LeftShapeId })) {
            Arcadix.InitialArcadix_Data.LeftShapes.push(
                Object.assign({
                    // 'uploadedJSON': fileJSON,
                    'LeftShapeId': LeftShapeId,
                    'ObjType': 'Text',
                    // 'DispActive' : false,
                    // 'LineTo' : [],
                    // 'XPosition': 488,
                    // 'YPosition': 251,
                    'Text': uploadedJSON.Text
                    // "Img": fileJSON["ImagePath"],
                }, animationObj)
            )
        }
        displayItems(handleJSON(uploadedJSON), LeftShapeId, 'text','leftshapes');
    }

}

function updateRightShape(objType, uploadedJSON, displayItems, prevElementId, animationObj) {
    debugger
    if (objType === 'img') {
        var fileJSON;
        fileJSON = handleJSON(uploadedJSON);
        var RightShapeId = (prevElementId && prevElementId != '') ? prevElementId : parent.GetUniqueId();
        if (!Arcadix['InitialArcadix_Data']['RightShapes'].find(function (a) { return a['RightShapeId'] === RightShapeId })) {
            Arcadix.InitialArcadix_Data.RightShapes.push(
                Object.assign({
                    'uploadedJSON': fileJSON,
                    'RightShapeId': RightShapeId,
                    'ObjType': 'Img',
                    // 'XPosition': 488,
                    // 'YPosition': 251,
                    "Img": fileJSON["ImagePath"],
                }, animationObj)
            )
        }
        displayItems(handleJSON(uploadedJSON), RightShapeId, 'img','rightshapes');
    } else if (objType === 'text') {
        var fileJSON;
        fileJSON = handleJSON(uploadedJSON);
        var RightShapeId = (prevElementId && prevElementId != '') ? prevElementId : parent.GetUniqueId();
        if (!Arcadix['InitialArcadix_Data']['RightShapes'].find(function (a) { return a['RightShapeId'] === RightShapeId })) {
            Arcadix.InitialArcadix_Data.RightShapes.push(
                Object.assign({
                    // 'uploadedJSON': fileJSON,
                    'RightShapeId': RightShapeId,
                    'ObjType': 'Text',
                    // 'XPosition': 488,
                    // 'YPosition': 251,
                    'Text': uploadedJSON.Text
                    // "Img": fileJSON["ImagePath"],
                }, animationObj)
            )
        }
        displayItems(handleJSON(uploadedJSON), RightShapeId, 'text','rightshapes');
    }

}



// function updateTextJSON(textObj, displayItems, prevElementId, animationObj) {
//     debugger

//     let TextId = (prevElementId && prevElementId != '') ? prevElementId : parent.GetUniqueId();
//     if (!Arcadix['InitialArcadix_Data']['RightShapes'].find(function (a) { return a['TextId'] === TextId })) {
//         Arcadix.InitialArcadix_Data.RightShapes.push(
//             Object.assign({
//                 'TextId' : TextId,
//                 'ObjType' : 'Text',
//                 'Text' : textObj.Text,
//                 'XPosition': 488,
//                 'YPosition': 251,

//             }, animationObj)
//         )
//     }
//     displayItems(handleJSON(textObj), TextId, 'text');
// }





function GetSideBarData() {
    debugger
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

function getUID(){
    return parent.GetUniqueId();
}

function displayItems(item, uid, type, sideType) {
    debugger
    //console.log(item);
    //  console.log("item[0]['ClientFileName']",item[0]['ClientFileName'])
    if (sideType === 'leftshapes') {
        if (type === 'img') {
            var $button = $('<button class="' + uid + '">X</button>');
            $button.on('click', function () {
                removeItem(uid, type, sideType);
            });
            if ($('.' + uid).length === 0) {
                $('#leftshape-list').append('<span class="' + uid + '"><br /><span>Image:</span>' + item['ImageName'] + '</span>');
                $('#leftshape-list').append('<br />');
                $('#leftshape-list').append($button);
            }
        } else if (type === 'text') {
            var $button = $('<button class="' + uid + '">X</button>');
            $button.on('click', function () {
                removeItem(uid, type, sideType);
            });
            if ($('.' + uid).length === 0) {
                $('#leftshape-list').append('<span class="' + uid + '"><br /><span>Image:</span>' + uid + '</span>');
                $('#leftshape-list').append('<br />');
                $('#leftshape-list').append($button);
            }
        }
    } else if (sideType === 'rightshapes') {
        if (type === 'img') {
            var $button = $('<button class="' + uid + '">X</button>');
            $button.on('click', function () {
                removeItem(uid, type, sideType);
            });
            if ($('.' + uid).length === 0) {
                $('#rightshape-list').append('<span class="' + uid + '"><br /><span>Image:</span>' + item['ImageName'] + '</span>');
                $('#rightshape-list').append('<br />');
                $('#rightshape-list').append($button);
            }
        } else if (type === 'text') {
            var $button = $('<button class="' + uid + '">X</button>');
            $button.on('click', function () {
                removeItem(uid, type, sideType);
            });
            if ($('.' + uid).length === 0) {
                $('#rightshape-list').append('<span class="' + uid + '"><br /><span>Image:</span>' + uid + '</span>');
                $('#rightshape-list').append('<br />');
                $('#rightshape-list').append($button);
            }
        }
    }

}

function removeItem(uid, type,sideType) {
    debugger
    if(sideType == 'leftshape'){
        if (type === 'img') {
            Arcadix['InitialArcadix_Data']['LeftShapes'] = Arcadix['InitialArcadix_Data']['LeftShapes'].filter(function (a) { return a['LeftShapeId'] !== uid });
            $('.' + uid).remove();
        } else if (type === 'text') {
            Arcadix['InitialArcadix_Data']['LeftShapes'] = Arcadix['InitialArcadix_Data']['LeftShapes'].filter(function (a) { return a['LeftShapeId'] !== uid });
            $('.' + uid).remove();
        }
    }else if(sideType === 'rightshape'){
        if (type === 'img') {
            Arcadix['InitialArcadix_Data']['RightShapes'] = Arcadix['InitialArcadix_Data']['RightShapes'].filter(function (a) { return a['RightShapeId'] !== uid });
            $('.' + uid).remove();
        } else if (type === 'text') {
            Arcadix['InitialArcadix_Data']['RightShapes'] = Arcadix['InitialArcadix_Data']['RightShapes'].filter(function (a) { return a['RightShapeId'] !== uid });
            $('.' + uid).remove();
        }
    }

}


function clearPreviousImage() {
    $('.' + 'bgimage').remove();
}

