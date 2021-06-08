
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


let Mode = 1;
console.log('parent json data', parent.containerJSON);
$(parent.document).on('change', '#hiddenField', function (event) {
    console.log('hidden field value', $(this).val());
})
var Arcadix = {};
Arcadix['InitialArcadix_Data'] = {
    "BgImage": {},
    'ResultArcadix' : [], 
    'ShapeCount' : 0
};

$(document).ready(function () {
    polifills();
    $('#bgimg-upload').on('click', function (event) {
        uploadFile('bgimage');
    });
});


function LoadInitialize(animationObj) {
    debugger
    let preLoadedObj = animationObj['InitialArcadix_Data'];
    if (preLoadedObj['Elements']) {
        for (var i = 0; i < preLoadedObj['Elements'].length; i++) {
            //updateElementJSON([preLoadedObj['Elements'][i]['uploadedJSON']], displayItems, preLoadedObj['Elements'][i]['ElementId'], preLoadedObj['Elements'][i]);
            //  displayItems([preLoadedObj['Elements'][i]['uploadedJSON']], preLoadedObj['Elements'][i]['ElementId'], 'element');                                                                       
            updateJSON('element', [preLoadedObj['Elements'][i]['uploadedJSON']], displayItems, preLoadedObj['Elements'][i]['ElementId'], preLoadedObj['Elements'][i]);
        }
    }
    if (preLoadedObj['BgImage']) {
        updateJSON('bgimage', [preLoadedObj['BgImage']['uploadedJSON']], displayItems, preLoadedObj['BgImage'])
    }
    if(preLoadedObj['ShapeCount']){
        $('#shape-count').val(Number(preLoadedObj['ShapeCount']));
    }
    console.log('running preload');
    //return Arcadix;
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



function updateJSON(type, objResponseJson, displayItems, animationObj) {  // type and objResponseJson are mandatory
    //if (type === 'element') {
    //    console.log('objResponseJson', objResponseJson);
    //    updateElementJSON(objResponseJson, displayItems);
    //}
    //else if (type === 'placeholder') {
    //    updatePlaceholderJSON(objResponseJson, displayItems, prevElementId, animationObj);
    //}
    //else if (type === 'textcontent') {
    //    updateTextContentJSON(objResponseJson, displayItems, prevElementId, animationObj);
    //}
    //else {
    //    console.log('objResponseJson', objResponseJson);
    //    updateDropZoneJSON(objResponseJson, displayItems, prevElementId, animationObj);
    //}
    if (type.toLowerCase() === 'bgimage') {
        updateBgImageJSON(objResponseJson, displayItems, animationObj);
    }
}

function updateBgImageJSON(uploadedJSON, displayItems, animationObj) {
    clearPreviousImage();
    Arcadix['InitialArcadix_Data']['BgImage'] =
        Object.assign({
        'uploadedJSON': JSON.stringify(uploadedJSON),
        'Img': uploadedJSON["ImagePath"],
        'BgImageId': parent.GetUniqueId()
        }, animationObj);
    displayItems(handleJSON(uploadedJSON), 'bgimage');
}

function GetSideBarData() {
    var ShapeCount = Number($('#shape-count').val());
    Arcadix['InitialArcadix_Data']['ShapeCount'] = ShapeCount;
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

function displayItems(item,  type) {
    debugger
    let $button = $('<button class="' + 'bgimage' + '">X</button>');
    $button.on('click', function () { 
        removeItem('bgimage', type);
    });
    if (type === 'bgimage') {
        if ($('.' + 'bgimage').length === 0) {
            $('#bgimg').append('<span class="' + 'bgimage' + '"><br /><span>Element:</span>' + item['ImageName'] + '<span>Path:</span>' + item['ImagePath'] + '</span>');
            $('#bgimg').append('<br />');
            $('#bgimg').append($button);
        } 
    } 
} 

function removeItem(uid, type) {
  
    //if (type === 'bgimage') {
        Arcadix['InitialArcadix_Data']['BgImage'] = {}
        $('.' + 'bgimage').remove();
  //  }
}


function clearPreviousImage() {
    $('.' + 'bgimage').remove();                                                                                   
}

