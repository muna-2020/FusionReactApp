function polifills(){

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
    value: function(predicate) {
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




if (!Array.prototype.filter){
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();
   
    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;
    if (thisArg === undefined){
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func(t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func.call(thisArg, t[i], i, t)){
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

(function (cjs, an) {
      polifills();
    var p; // shortcut to reference prototypes
    var lib = {}; var ss = {}; var img = {};
    lib.ssMetadata = [];


    // symbols:



    // stage content:
    (lib.DragDrop_v3_json_AnimateCC = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // timeline functions:
        this.frame_0 = function () {
            // timeline functions:

            var Elements, Mode;
            if (!container) {
                var container = new createjs.Container(); // global container

            }
            if (!Result) {
                var Result = {


                };  // result object after successfull drag and drop

            }

            if (!ResultJSON) {
                var ResultJSON = {


                };  // result object after successfull drag and drop

            }

            debugger
            if (!Mode) {
                Mode = 'Edit';
            }
            this.Arcadix = {};
            if (Elements) {
                if (!Elements.Elements || !Elements.DropZones) {

                    this.Arcadix['InitialArcadix_Data'] = {
                        "Elements": [],
                        "DropZones": [],
                        "Placeholder": [],
                        "TextContent": [] 
                    };
                    
                } else {
                    this.Arcadix['InitialArcadix_Data'] = Elements
                }
            }
            else {
                this.Arcadix['InitialArcadix_Data'] = {
                    "Elements": [],
                    "DropZones": [],
                    "Placeholder": [],
                    "TextContent": []  
                };
            }
            var xmlCreate = document.implementation.createDocument("", "", null);

            var Xdiff = -1;
            var Ydiff = -1;
            var objDiff = {};
            this.Arcadix['InitialArcadix_Mode'] = Mode;
            this.Arcadix['ResultArcadix_Data'] = {};
            this.Arcadix['InitialArcadix_HasSidebar'] = 'Y';
			this.Arcadix['InitialArcadix_HasSubElements'] = 'Y';
            this.Arcadix['ElmXmls'] = '';

            function dropZoneDecider(dropZone) {
                debugger
                var DropZoneImg = new Image();
                DropZoneImg.src = dropZone.Img;
                DropZoneImg.DropZoneId = dropZone.DropZoneId;
                //DropZoneImg.onload = jsonDropZonesCreator;
                //var DropZoneId = dropZone.DropZoneId;
                DropZoneImg.onload = function (event) {
                    jsonDropZoneCreator(event, event.target.DropZoneId);
                }
            }


            function jsonDropZoneCreator(event, dropZoneId) {
                var xmlDoc = document.implementation.createDocument("", "", null);
                if (stage.children[0].Arcadix.ElmXmls === '') {
                    stage.children[0].Arcadix.ElmXmls = document.implementation.createDocument("", "", null);
                    var root = stage.children[0].Arcadix.ElmXmls.createElement('Elements');
                    stage.children[0].Arcadix.ElmXmls.appendChild(root);

                }
                var ElmCount = stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].childNodes.length;
                var alreadyExist = false;
                for (var i = 0; i < ElmCount; i++) {
                    if (Number(stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].childNodes[i].getAttribute('iElementId')) === Number(dropZoneId)) {
                        alreadyExist = true;
                    }
                }
              //  let xmlDoc = document.implementation.createDocument("", "", null);
                if (true) {
                    var ElmXmlStr = '<Element iElementTypeId = "2" iElementAccessId = "337642" iElementId = "337642" vImageType="png" cHasTextOnTop ="N" iImageFileVersion="1" vElementVerticalAlignment="top" vElementImageName="160076_Image_1" vElementHorizontalAlignment="left" iElementImageWidth = "505" iElementImageHeight = "705" cShowTitle ="N" cShowDescription ="N" cDisplayedInElementTree ="Y" iElementType = "Image"></Element>';
                    var ElmXml = xmlDoc.createElement('Element');
                    ElmXml.setAttribute('iElementTypeId', 2);
                    ElmXml.setAttribute('iElementAccessId', dropZoneId);
                    //ElmXml.setAttribute('iElementId', dropZoneId);
                    //////static//////////////////////
                    ElmXml.setAttribute('vImageType', 'png');
                    ElmXml.setAttribute('cHasTextOnTop', 'N');
                    ElmXml.setAttribute('iImageFileVersion', '1');
                    ElmXml.setAttribute('vElementVerticalAlignment', 'top');
                    ElmXml.setAttribute('vElementImageName', '160076_Image_1');
                    ElmXml.setAttribute('vElementHorizontalAlignment', 'left');
                    ElmXml.setAttribute('iElementImageWidth', '505');
                    ElmXml.setAttribute('iElementImageHeight', '705');
                    ElmXml.setAttribute('cShowTitle', 'N');
                    ElmXml.setAttribute('cShowDescription', 'N');
                    ElmXml.setAttribute('cDisplayedInElementTree', 'Y');
                    //////static////////////////////end//////////////
                    ElmXml.setAttribute('iElementType', 'Image');
                    var elmIndex = stage.children[0].Arcadix.InitialArcadix_Data.DropZones.findIndex(function (a) { return a['DropZoneId'] == dropZoneId });
                  //  xmlDoc.getElementsByTagName("Element")[0].childNodes
                    //ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementId', dropZoneId);
                    //// ElmXml.setAttribute('iElementId', objParam['PlaceholderId']);
                    //ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementAccessId', dropZoneId);
                    //ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementTypeId', 2);
                    //ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementType', 'Image');
                    stage.children[0].Arcadix['InitialArcadix_Data']['DropZones'][elmIndex]['ElmXml'] = ElmXml;
                    stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].appendChild(ElmXml);
                }


                // if (!stage.children[1].children.find(a => a['DropZoneId'] === dropZoneId)) {
                if (!stage.children[1].children.find(function (a) {
                    if (a['DropZoneId'] === dropZoneId)
                        return true;
                    else
                        return false;
                }
                )) {
                    var DropZoneImg = event.target;
                    var dropZone = stage.children[0].Arcadix['InitialArcadix_Data'].DropZones.find(function (a) {
                        if (a['DropZoneId'] === dropZoneId)
                            return a;
                        else
                            return undefined;
                    });
                    ////console.log('dropzone', dropZone);
                    //for(var i=0 ; i < zones.length; i++){
                    DropZonebitmap = new createjs.Bitmap(DropZoneImg);
                    container.addChild(DropZonebitmap);
                    stage.update();
                    if (dropZone['XPosition'] && dropZone['YPosition'] != null) {
                        DropZonebitmap.x = dropZone['XPosition'];
                        DropZonebitmap.y = dropZone['YPosition'];
                    }
                    else {
                        DropZonebitmap.x = 100;
                        DropZonebitmap.y = 250;
                    }
                    DropZonebitmap.regX = DropZonebitmap.image.width / 2 | 0;
                    DropZonebitmap.regY = DropZonebitmap.image.height / 2 | 0;

                    DropZonebitmap.DropZoneId = dropZone['DropZoneId'];
                    DropZonebitmap.ObjType = dropZone['ObjType'];
                    //Result.push({DropZoneId : dropZoneId}) // adding a new Dropzone to the Result array
                    //Result[dropZoneId] = [];  // updating the Result object with dropZoneId's
                    if (stage.children[0].Arcadix['ResultArcadix_Data'] && !stage.children[0].Arcadix['ResultArcadix_Data'][dropZoneId]) {
                        stage.children[0].Arcadix['ResultArcadix_Data'][dropZoneId] = [];
                    }

                    if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit') {  // if the mode = edit then only make dropzones movable
                        DropZonebitmap.on("mousedown", function (evt) {
                            debugger
                            var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
                            //var zoneX = stage.children[1].children.find(a => a['DropZoneId'] === evt.target.DropZoneId).x;
                            var zoneX = stage.children[1].children.find(function (a) {
                                if (a['DropZoneId'] === evt.target.DropZoneId) {
                                    return a;
                                } else {
                                    return undefined;
                                }
                            }).x;

                            //  var zoneY = stage.children[1].children.find(a => a['DropZoneId'] === evt.target.DropZoneId).y;
                            var zoneY = stage.children[1].children.find(function (a) {
                                if (a['DropZoneId'] === evt.target.DropZoneId) {
                                    return a;
                                } else {
                                    return undefined;
                                }
                            }).y;
                            evt.currentTarget.x = p.x;
                            evt.currentTarget.y = p.y;
                            //  var elements = stage.children[1].children.filter(a => a['DropedTo'] === evt.target.DropZoneId);
                            var elements = stage.children[1].children.filter(function (a) {
                                if (a['DropedTo'] === evt.target.DropZoneId) {
                                    return a;
                                } else {
                                    return undefined;
                                }
                            });
                            for (var i = 0; i < elements.length; i++) {
                                //  var index = stage.children[1].children.findIndex(a => a['ElementId'] === elements[i]["ElementId"]);
                                var index = stage.children[1].children.findIndex(function (a) {
                                    if (a['ElementId'] === elements[i]["ElementId"]) {
                                        return a;
                                    } else {
                                        return undefined;
                                    }
                                });

                                var elm = stage.children[1].children[index];
                                var insideX = (stage.children[1].children[index].x) - (zoneX);
                                var insideY = (stage.children[1].children[index].y) - (zoneY);
                                if (!objDiff[stage.children[1].children[index]["ElementId"]]) {
                                    objDiff[stage.children[1].children[index]["ElementId"]] = {
                                        Xdiff: insideX,
                                        Ydiff: insideY
                                    }
                                }
                                var finalX = zoneX + objDiff[stage.children[1].children[index]["ElementId"]].Xdiff;
                                var finalY = zoneY + objDiff[stage.children[1].children[index]["ElementId"]].Ydiff;

                                stage.children[1].children[index].x = p.x + objDiff[stage.children[1].children[index]["ElementId"]].Xdiff;
                                stage.children[1].children[index].y = p.y + objDiff[stage.children[1].children[index]["ElementId"]].Ydiff;



                                ////console.log('element to be updated position', stage.children[1].children[index]);
                                updateEndXEndY(stage.children[1].children[index])// updating the position of elements after dropzone drag

                            }
                            for (var i = 0; i < elements.length; i++) {
                                //  var index = stage.children[1].children.findIndex(a => a['ElementId'] === elements[i]["ElementId"]);

                                var index = stage.children[1].children.findIndex(function (a) {
                                    if (a['ElementId'] === elements[i]["ElementId"]) {
                                        return a;
                                    } else {
                                        return undefined;
                                    }
                                });

                                addToDropZoneAfterMove(stage.children[1].children[index]);
                                pIndex = this.parent.getChildIndex(this);



                                delete objDiff[stage.children[1].children[index]["ElementId"]];
                                ////console.log('after removing', objDiff);
                                this.parent.setChildIndex(stage.children[1].children[index], pIndex);
                            }

                            stage.update();


                        });
                        DropZonebitmap.on("pressmove", function (evt) {
                            debugger
                            var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
                            //   var zoneX = stage.children[1].children.find(a => a['DropZoneId'] === evt.target.DropZoneId).x;
                            var zoneX = stage.children[1].children.find(function (a) {
                                if (a['DropZoneId'] === evt.target.DropZoneId) {
                                    return a;
                                } else {
                                    return undefined;
                                }
                            }).x;
                            var zoneY = stage.children[1].children.find(function (a) {
                                if (a['DropZoneId'] === evt.target.DropZoneId) {
                                    return a;
                                } else {
                                    return undefined;
                                }
                            }).y;
                            evt.currentTarget.x = p.x;
                            evt.currentTarget.y = p.y;



                            //var elements = stage.children[1].children.filter(a => a['DropedTo'] === evt.target.DropZoneId);
                            var elements = stage.children[1].children.filter(function (a) {
                                if (a['DropedTo'] === evt.target.DropZoneId) {
                                    return a;
                                } else {
                                    return undefined;
                                }

                            });

                            // ////console.log('elements', elements);
                            for (var i = 0; i < elements.length; i++) {
                                //var index = stage.children[1].children.findIndex(a => a['ElementId'] === elements[i]["ElementId"]);

                                var index = stage.children[1].children.findIndex(function (a) {
                                    if (a['ElementId'] === elements[i]["ElementId"]) {
                                        return a;
                                    } else {
                                        return undefined;
                                    }
                                });

                                //var xVal = evt.stageX - stage.children[1].children[index].x;
                                //var yVal = evt.stageY - stage.children[1].children[index].y;
                                // ////console.log('evt.getTransformedBounds()', evt.currentTarget.getTransformedBounds());
                                // ////console.log('element bounds', stage.children[1].children[index].getTransformedBounds());

                                var elm = stage.children[1].children[index];
                                var insideX = (stage.children[1].children[index].x) - (zoneX);
                                var insideY = (stage.children[1].children[index].y) - (zoneY);
                                if (!objDiff[stage.children[1].children[index]["ElementId"]]) {
                                    objDiff[stage.children[1].children[index]["ElementId"]] = {
                                        Xdiff: insideX,
                                        Ydiff: insideY
                                    }
                                }
                                var finalX = zoneX + objDiff[stage.children[1].children[index]["ElementId"]].Xdiff;
                                var finalY = zoneY + objDiff[stage.children[1].children[index]["ElementId"]].Ydiff;


                                stage.children[1].children[index].x = finalX;
                                stage.children[1].children[index].y = finalY;

                                updateEndXEndY(stage.children[1].children[index])// updating the position of elements after dropzone drag
                            }

                            stage.update();

                        });



                        DropZonebitmap.on("pressup", function (evt) {
                            ////console.log('objDiff', objDiff);
                            //var movedItem = stage.children[0].Arcadix['InitialArcadix_Data'].DropZones.find(a => a["DropZoneId"] === evt.target.DropZoneId);
                            var movedItem = stage.children[0].Arcadix['InitialArcadix_Data'].DropZones.find(function (a) {
                                if (a["DropZoneId"] === evt.target.DropZoneId) {
                                    return a;
                                } else {
                                    return undefined;
                                }
                            });
                            movedItem["XPosition"] = evt.target.x;
                            movedItem["YPosition"] = evt.target.y;
                            stage.children[0].Arcadix['InitialArcadix_Data'].DropZones = stage.children[0].Arcadix['InitialArcadix_Data'].DropZones.map(function (a) {
                                if (a["DropZoneId"] === evt.target.DropZoneId) {
                                    return movedItem;
                                } else {
                                    return a;
                                }
                            })
                            ////console.log('Arcadix['InitialArcadix_Data'] after moving', stage.children[0].Arcadix['InitialArcadix_Data']);
                            //  var elements = stage.children[1].children.filter(a => a['DropedTo'] === evt.target.DropZoneId);
                            var elements = stage.children[1].children.filter(function (a) {
                                if (a['DropedTo'] === evt.target.DropZoneId) {
                                    return a;
                                } else {
                                    return undefined;
                                }
                            });

                            for (var i = 0; i < elements.length; i++) {
                                //   var index = stage.children[1].children.findIndex(a => a['ElementId'] === elements[i]["ElementId"]);
                                var index = stage.children[1].children.findIndex(function (a) {
                                    if (a['ElementId'] === elements[i]["ElementId"]) {
                                        return a;
                                    } else {
                                        return undefined;
                                    }
                                });
                                addToDropZoneAfterMove(stage.children[1].children[index]);
                                pIndex = this.parent.getChildIndex(this);



                                delete objDiff[stage.children[1].children[index]["ElementId"]];
                                ////console.log('after removing', objDiff);
                                this.parent.setChildIndex(stage.children[1].children[index], pIndex);
                            }
                            handleTick();
                        });
                    }

                }
                updateElementsIndices(dropZoneId);
            }


            var dblClicked = false;
            function jsonElementPlaceholderCreator_old(element) {
                var rect = new createjs.Rectangle(element['XPosition'] || 0, element['YPosition'] || 0, 180, 30); 
                var plhldrContainer;
                iElementId = element['ObjType'].toLowerCase() === 'input' ? element['PlaceholderId'] : element['TextContentId'];
                iTypeId = element['ObjType'].toLowerCase() === 'input' ? 'PlaceholderId' : 'TextContentId';

                if (!stage.children.find(function (a) { return a[iTypeId] === iElementId} )) {
                    iElementType = element['ObjType'];
                  //if (!document.getElementById(iElementId)) {
                    if (!stage.children.find(function (a) { return a[iTypeId] === iElementId} )) {
                            plhldrContainer = new createjs.Container();
                            plhldrContainer[iTypeId] = iElementId;
                            //if (element['XPosition'] && element['YPosition']) {
                            //    plhldrContainer.x = element['XPosition'];
                            //    plhldrContainer.y = element['YPosition']; 
                            //} else {
                            //    plhldrContainer.x = 100;
                            //    plhldrContainer.y = 50;
                            //}
                            stage.addChild(plhldrContainer);
                            stage.update();

                        }

                    containerIndex = stage.children.findIndex(function (a) { return a[iTypeId] === iElementId});

                        var bckgnd = new createjs.Shape();
                        bckgnd[iTypeId] = iElementId;
                        bckgnd['ObjType'] = element['ObjType']

                        bckgnd.graphics.beginFill('#f2f2f2').drawRect(0, 0, rect.width, rect.height);
                        var text = new createjs.Text();
                        text.set({
                            text: 'Static Text',
                            textAlign: "center",
                            textBaseline: "middle",
                            x: element['XPosition'] || 0,
                            y: element['YPosition'] || 0
                        });
                        if (element['XPosition'] && element['YPosition']) {
                            bckgnd.x = element['XPosition'];
                            bckgnd.y = element['YPosition'];
                        } else {
                            bckgnd.x = 100;
                            bckgnd.y = 50;
                        }
                        bckgnd.regX = rect.width / 2;
                        bckgnd.regY = rect.height / 2;
                        stage.children[containerIndex].addChild(bckgnd, text);
                        stage.update();

                        bckgnd.on('click', function () {
                            dblClicked = true;
                            console.log(' clicked..............');
                        })
                        bckgnd.on('dblclick', function (evt) {
                          
                            //  OpenInputPopup(this, { [evt.iTypeId]: evt.target['PlaceholderId'] ? evt.target['PlaceholderId'] : evt.target['TextContentId'] });
                          //  window.parent.JAnimationPlayer_SetAnimationIFrameDimentions(600);
                            if (evt.target['PlaceholderId']) {
                                OpenInputPopup(this, { 'PlaceholderId': evt.target['PlaceholderId'], 'iTypeId': 'PlaceholderId' });
                            } else if (evt.target['TextContentId']) {
                                OpenInputPopup(this, { 'TextContentId': evt.target['TextContentId'], 'iTypeId': 'TextContentId' });
                            }
                        });
                        //  }

                        bckgnd.on('pressmove', function (evt) {
                            if (!dblClicked) {
                                var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
                                evt.currentTarget.x = p.x;
                                evt.currentTarget.y = p.y;
                                text.x = p.x;
                                text.y = p.y;
                                container.setChildIndex(this, container.getNumChildren() - 1);
                                //updatePlaceholderNTextContentPosition(evt.target);
                                if (evt.target['PlaceholderId']) {
                                    updatePlaceholderNTextContentPosition({ 'PlaceholderId': evt.target['PlaceholderId'], x: this.x, y: this.y, 'ObjType': evt.target['ObjType'] });
                                } else {
                                    updatePlaceholderNTextContentPosition({ 'TextContentId': evt.target['TextContentId'], x: this.x, y: this.y, 'ObjType': evt.target['ObjType'] });
                                }
                                stage.update();

                            }
                            dblClicked = false;
                        });
                        stage.update();
                   // }
                }
            }


            function updateElementsIndices(dropZoneId) {

                var elements = stage.children[1].children.filter(function (a) {
                    if (a['DropedTo'] === dropZoneId) {
                        return a;
                    } else {
                        return undefined;
                    }
                });
                for (var i = 0; i < elements.length; i++) {
                    //  var index = stage.children[1].children.findIndex(a => a['ElementId'] === elements[i]["ElementId"]);

                    var index = stage.children[1].children.findIndex(function (a) {
                        if (a['ElementId'] === elements[i]["ElementId"]) {
                            return a;
                        } else {
                            return undefined;
                        }
                    });
                    var dropzoneIndex = stage.children[1].children.findIndex(function (a) { return a['DropZoneId'] === dropZoneId });
                    // addToDropZoneAfterMove(stage.children[1].children[index]);
                    pIndex = stage.children[1].children[dropzoneIndex].parent.getChildIndex(stage.children[1].children[dropzoneIndex]);



                  ///  delete objDiff[stage.children[1].children[index]["ElementId"]];
                    ////console.log('after removing', objDiff);
                    stage.children[1].children[dropzoneIndex].parent.setChildIndex(stage.children[1].children[index], pIndex);
                }
            }


            function jsonElementPlaceholderCreator_elements(element) {
                var rect = new createjs.Rectangle(element['XPosition'] || 0, element['YPosition'] || 0, 180, 30); 
                var plhldrContainer;
                var iElementId = element['ElementId'];
                var iTypeId = element['ObjType'].toLowerCase() === 'input' ? 'PlaceholderId' : 'TextContentId';
                if (!stage.children.find(function (a) { return a['ElementPlaceholderId'] === iElementId })) {
                    iElementType = element['ObjType'];
                    //if (!document.getElementById(iElementId)) {
                    if (!stage.children.find(function (a) { return a['ElementPlaceholderId'] === iElementId })) {
                        plhldrContainer = new createjs.Container();
                        plhldrContainer['ElementPlaceholderId'] = iElementId;
                        plhldrContainer['ElementType'] = element['ElementType'];
                        //if (element['XPosition'] && element['YPosition']) {
                        //    plhldrContainer.x = element['XPosition'];
                        //    plhldrContainer.y = element['YPosition'];
                        //} else {
                        //    plhldrContainer.x = 100;
                        //    plhldrContainer.y = 50;
                        //}

                        stage.addChild(plhldrContainer);
                        stage.update();

                    }

                    containerIndex = stage.children.findIndex(function (a) { return a['ElementPlaceholderId'] === iElementId });
                    var bckgnd = new createjs.Shape();
                    bckgnd['ElementPlaceholderId'] = iElementId;
                    bckgnd['ElementType'] = element['ElementType']

                    bckgnd.graphics.beginFill('#f2f2f2').drawRect(0, 0, rect.width, rect.height);
                    var text = new createjs.Text();
                    text.set({
                        text: iElementType,
                        textAlign: "center",
                        textBaseline: "middle",
                        x: element['XPosition'] || 0,
                        y: element['YPosition'] || 0
                    });

                    if (element['XPosition'] && element['YPosition']) {
                        bckgnd.x = element['XPosition'];
                        bckgnd.y = element['YPosition'];
                    } else {
                        bckgnd.x = 100;
                        bckgnd.y = 50;
                    }
                    bckgnd.regX = rect.width / 2;
                    bckgnd.regY = rect.height / 2;
                    stage.children[containerIndex].addChild(bckgnd, text);
                    stage.update();

                    bckgnd.on('click', function () {
                        dblClicked = true;
                        console.log(' clicked..............');
                    })
                    bckgnd.on('dblclick', function (evt) {

                        //  OpenInputPopup(this, { [evt.iTypeId]: evt.target['PlaceholderId'] ? evt.target['PlaceholderId'] : evt.target['TextContentId'] });
                        //  window.parent.JAnimationPlayer_SetAnimationIFrameDimentions(600);
                        //if (evt.target['PlaceholderId']) {
                        //    OpenInputPopup(this, { 'PlaceholderId': evt.target['PlaceholderId'], 'iTypeId': 'PlaceholderId' });
                        //} else if (evt.target['TextContentId']) {
                        //    OpenInputPopup(this, { 'TextContentId': evt.target['TextContentId'], 'iTypeId': 'TextContentId' });
                        //}
                        OpenInputPopup_elements(this, { 'ElementPlaceholderId': evt.target['ElementPlaceholderId'], 'iTypeId': 'PlaceholderId', 'ElementType': 'Text' });
                    });
                    //  }

                    bckgnd.on('pressmove', function (evt) {
                        if (!dblClicked) {
                            var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
                            evt.currentTarget.x = p.x;
                            evt.currentTarget.y = p.y;
                            text.x = p.x;
                            text.y = p.y;
                            container.setChildIndex(this, container.getNumChildren() - 1);
                            //  updatePlaceholderNTextContentPosition(evt.target);
                            updateStartXStartY({ 'ElementId': evt.target['ElementPlaceholderId'], x: this.x, y: this.y });
                            stage.update();

                        }
                        dblClicked = false;
                    });
                    stage.update();
                    // }
                }
            }

            function OpenInputPopup(sourceElement, objParam) {
                window.parent.parent.LoadScripts({
                    ScriptsJSON: [window.parent.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/Objects/Element/Text/TextPopupPlugins/JInputProperty.js", window.parent.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/TextEditor/JTextEditorSidebarTemplate.js", window.parent.parent.JConfiguration.BaseUrl + "Framework/Controls/JValidator/JValidator.js"], LoadCompleteScripts: function () {
                        window.parent.parent.JLoadInputPopup(sourceElement, textPopupCallback, objParam);
                    }
                });
            }

            function OpenInputPopup_elements(sourceElement, objParam) {
                window.parent.parent.LoadScripts({
                    ScriptsJSON: [window.parent.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/Objects/Element/Text/TextPopupPlugins/JInputProperty.js", window.parent.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/TextEditor/JTextEditorSidebarTemplate.js", window.parent.parent.JConfiguration.BaseUrl + "Framework/Controls/JValidator/JValidator.js"], LoadCompleteScripts: function () {
                        window.parent.parent.JLoadInputPopup(sourceElement, textPopupCallback_elements, objParam);
                    }
                });
            }
            function textPopupCallback(objJson, objParam) {  // objParam = {'PlaceholderId': '', 'iTypeId' : 'PlaceholderId' / 'TextContentId'}
                debugger
                var ElmXml = parseXmlStr(JSONToXml(objJson, 'input'));
                var libIndex;
                if (objParam['PlaceholderId']) {
                    libIndex = stage.children[0].Arcadix['InitialArcadix_Data']['Placeholder'].findIndex(function (a) { return a['PlaceholderId'] === objParam['PlaceholderId'] });
                    stage.children[0].Arcadix['InitialArcadix_Data']['Placeholder'][libIndex]['ElmXml'] = ElmXml;
                } else if (objParam["TextContentId"]) {
                    libIndex = stage.children[0].Arcadix['InitialArcadix_Data']['TextContent'].findIndex(function (a) { return a['PlaceholderId'] === objParam['PlaceholderId'] });
                    stage.children[0].Arcadix['InitialArcadix_Data']['TextContent'][libIndex]['ElmXml'] = ElmXml;
                }
                var ElmntIndex = stage.children[0].Arcadix.InitialArcadix_Data.Placeholder.findIndex(function (a) { return a[objParam.iTypeId] === objParam[objParam.iTypeId] });
                // stage.children[0].Arcadix.InitialArcadix_Data.ChildElements[ElmntIndex]['ElmXml'] = EmlXml;
                var StagedElmIndex = stage.children.findIndex(function (a) { return a[objParam.iTypeId] == objParam[objParam.iTypeId] });
                stage.removeChildAt(StagedElmIndex);
                var inpHtml;
                if (objParam.iTypeId === 'PlaceholderId') {
                    inpHtml = getHtmlElement('textbox', objJson);
                } else if (objParam.iTypeId === 'TextContentId') {
                    inpHtml = getHtmlElement('text', objJson);
                }
                var pathparams = { 'type': objParam.iTypeId === 'PlaceholderId' ? 'textbox' : 'text', iTypeId: objParam.iTypeId };
                pathparams[objParam.iTypeId] = objParam[objParam.iTypeId];
               // getImgPathFromHtml(inpHtml.outerHTML, pathparams, ImagepathCallback);
                //var testhtml = '<div valign="top" align="left" type="Text" actualtype="AnswerElements" ishowcontenttime="" cistoggletext="N" cissetborder="N" class="PageOutputContentText" style="width:100%" contenteditable="true" ielementtypeid="1" icontaineraccessid="173496" ielementid="627224" ielementaccessid="627224" velementverticalalignment="top" velementhorizontalalignment="left"><span type="SELECTIONSPAN"><span contenteditable="false" style="position: relative;"><span id="129201814332351" ielementaccessid="129201814332351" style="display: inline-block; padding: 0px; margin: 0px; border: 1px solid transparent;" valign="middle" contenteditable="false" type="JFormulaEditorPlaceholder" class="FormulaFont"><span class="MathJax" id="MathJax-Element-10-Frame" role="textbox" aria-readonly="true" style=""><nobr><span class="math" id="MathJax-Span-30"><span style="display: inline-block; position: relative; width: 75px; height: 0px; font-size: 107%;"><span style="position: absolute; clip: rect(50.6px, 20330px, 93.2px, -9px); top: -77px; left: 0px;"><span class="mrow" id="MathJax-Span-31"><span class="mrow" id="MathJax-Span-32"><span class="mrow" id="129201814332349" style=""><span class="mi" id="MathJax-Span-34" style="font-family: inherit; font-style: inherit;"><span style="font-family: inherit; font-size: 93%; font-style: inherit; font-weight: normal;">sin</span></span><span class="mo" id="MathJax-Span-35" style="vertical-align: 0px;"><span style="font-family: MathJax_Size2;">(</span></span><span class="mn" id="129201814332753" style="font-family: inherit; font-style: inherit;"><span style="font-family: inherit; font-size: 93%; font-style: inherit; font-weight: normal;">2</span></span><span class="mn" id="129201814332954" style="font-family: inherit; font-style: inherit;"><span style="font-family: inherit; font-size: 93%; font-style: inherit; font-weight: normal;">0</span></span><span class="mn" id="129201814333155" style="font-family: inherit; font-style: inherit;"><span style="font-family: inherit; font-size: 93%; font-style: inherit; font-weight: normal;">0</span></span><span class="mo" id="MathJax-Span-39" style="vertical-align: 0px;"><span style="font-family: MathJax_Size2;">)</span></span></span></span></span><span style="display: inline-block; width: 0px; height: 77px;"></span></span></span><span style="border-left: 0px solid; display: inline-block; overflow: hidden; width: 0px; height: 38.6px; vertical-align: -14.2px;"></span></span></nobr></span><script type="math/mml" id="MathJax-Element-10"><math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mrow id="129201814332349"><mi style="font-family:inherit;font-style:inherit;" noid="true">sin</mi><mo style="font-family:inherit;font-style:inherit;" noid="true">(</mo><mn style="font-family:inherit;font-style:inherit;" id="129201814332753">2</mn><mn style="font-family:inherit;font-style:inherit;" id="129201814332954">0</mn><mn style="font-family:inherit;font-style:inherit;" id="129201814333155">0</mn><mo style="font-family:inherit;font-style:inherit;" noid="true">)</mo></mrow></mrow></math></script></span><img style="position: absolute; top: -3px; left: 63.9375px; z-index: 10000000; width: 1px; height: 24px; display: none;" src="http://localhost/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/JTaskEditor/BlinkingCurser.gif" id="imgJFormulaEditorCursor"></span>&nbsp;</span></div>';
                //test purpose =================
                getImgPathFromHtml(inpHtml, pathparams, ImagepathCallback);
            }
            //function textPopupCallback_elements(objJson, objParam) {  // objParam = {'PlaceholderId': '', 'iTypeId' : 'PlaceholderId' / 'TextContentId'}
            //    debugger
            //    var ElmXml = parseXmlStr(JSONToXml(objJson, 'input'));
            //    var libIndex;
            //    // if (objParam['ElementPlaceholderId']) {
            //        libIndex = stage.children[0].Arcadix['InitialArcadix_Data']['Elements'].findIndex(function (a) { return a['ElementId'] === objParam['ElementPlaceholderId'] });
            //        stage.children[0].Arcadix['InitialArcadix_Data']['Elements'][libIndex]['ElmXml'] = ElmXml;
            //    //} else if (objParam["TextContentId"]) {
            //    //    libIndex = stage.children[0].Arcadix['InitialArcadix_Data']['TextContent'].findIndex(function (a) { return a['PlaceholderId'] === objParam['PlaceholderId'] });
            //    //    stage.children[0].Arcadix['InitialArcadix_Data']['TextContent'][libIndex]['ElmXml'] = ElmXml;
            //    //}                                                                                                                                                                  
            //    // var ElmntIndex = stage.children[0].Arcadix.InitialArcadix_Data.Placeholder.findIndex(function (a) { return a[objParam.iTypeId] === objParam[objParam.iTypeId] });
            //    // stage.children[0].Arcadix.InitialArcadix_Data.ChildElements[ElmntIndex]['ElmXml'] = EmlXml;
            //   var StagedElmIndex = stage.children.findIndex(function (a) { return a['ElementPlaceholderId'] == objParam['ElementPlaceholderId'] });
            //    stage.removeChildAt(StagedElmIndex);
            //    var inpHtml;
            //    //if (objParam.iTypeId === 'PlaceholderId') {
            //    //    inpHtml = getHtmlElement('textbox', objJson);
            //    //} else if (objParam.iTypeId === 'TextContentId') {
            //        inpHtml = getHtmlElement('text', objJson);
            //   // }
            //    var pathparams = { 'type': objParam.iTypeId === 'PlaceholderId' ? 'textbox' : 'text', iTypeId: objParam.iTypeId };
            //    pathparams[objParam.iTypeId] = objParam[objParam.iTypeId];
            //    getImgPathFromHtml_elements(inpHtml.outerHTML, pathparams, ImagepathCallback_elements);
            //}
            function getImgPathFromHtml_elements(strHtml, objParam, ImagepathCallback_elements) {
                debugger
                var strNewHtml = window.parent.ReplaceStringForXML(strHtml);
                //var strNewHtml = strHtml.replace(/\"/g, '\\"');
                window.parent.parent.JEditorWorkArea_ConvertHtmlToImage(strNewHtml, ImagepathCallback_elements, objParam);
            }

            function ImagepathCallback_elements(objJson, objParam) {
                debugger
                var ImgPath = objJson.GetNewHttmlImage.vImagePath;
                var xmlDoc = document.implementation.createDocument("", "", null);
                if (stage.children[0].Arcadix.ElmXmls === '') {
                    stage.children[0].Arcadix.ElmXmls = document.implementation.createDocument("", "", null);
                    var root = stage.children[0].Arcadix.ElmXmls.createElement('Elements');
                    stage.children[0].Arcadix.ElmXmls.appendChild(root);
                }
                var ElmCount = stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].childNodes.length;
                var alreadyExist = false;
                for (var i = 0; i < ElmCount; i++) {
                    if (Number(stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].childNodes[i].getAttribute('iElementId')) === Number(objParam['ElementPlacehoderId'])) {
                        alreadyExist = true;
                    }
                }
                var elmIndex;
                var libIndex;
                var ElmXml;
                var XmlStr = '<Element iElementTypeId = "2" iElementAccessId = "337642" iElementId = "337642" vImageType="png" cHasTextOnTop ="N" iImageFileVersion="1" vElementVerticalAlignment="top" vElementImageName="160076_Image_1" vElementHorizontalAlignment="left" iElementImageWidth = "505" iElementImageHeight = "705" cShowTitle ="N" cShowDescription ="N" cDisplayedInElementTree ="Y" iElementType = "Image"></Element>';
            
                var elmIndex = stage.children[0].Arcadix.InitialArcadix_Data.Elements.findIndex(function (a) { return a['ElementPlaceholderId'] == objParam['ElementPlaceholderId'] });
                    if (true) {
                        var ElmXmlStr = '<Element iElementTypeId = "2" iElementAccessId = "337642" iElementId = "337642" vImageType="png" cHasTextOnTop ="N" iImageFileVersion="1" vElementVerticalAlignment="top" vElementImageName="160076_Image_1" vElementHorizontalAlignment="left" iElementImageWidth = "505" iElementImageHeight = "705" cShowTitle ="N" cShowDescription ="N" cDisplayedInElementTree ="Y" iElementType = "Image"></Element>';
                        var ElmXml = xmlDoc.createElement('Element');
                        ElmXml.setAttribute('iElementTypeId', 51);
                        ElmXml.setAttribute('iElementAccessId', objParam['ElementPlaceholderId']);
                        ElmXml.setAttribute('iElementId', objJson['GetNewHttmlImage']['iElementId']);
                        //////static//////////////////////
                        ElmXml.setAttribute('vImageType', 'png');
                        ElmXml.setAttribute('cHasTextOnTop', 'N');
                        ElmXml.setAttribute('iImageFileVersion', '1');
                        ElmXml.setAttribute('vElementVerticalAlignment', 'top');
                        ElmXml.setAttribute('vElementImageName', '160076_Image_1');
                        ElmXml.setAttribute('vElementHorizontalAlignment', 'left');
                        ElmXml.setAttribute('iElementImageWidth', '505');
                        ElmXml.setAttribute('iElementImageHeight', '705');
                        ElmXml.setAttribute('cShowTitle', 'N');
                        ElmXml.setAttribute('cShowDescription', 'N');
                        ElmXml.setAttribute('cDisplayedInElementTree', 'Y');
                        //////static////////////////////end//////////////
                        ElmXml.setAttribute('iElementType', 'HtmlImage');

                        stage.children[0].Arcadix['InitialArcadix_Data']['Elements'][elmIndex]['ElmXml'] = ElmXml;
                        stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].appendChild(ElmXml);
                    }
                
                    //==============updating the status==============
                    var elmIndex = stage.children[0].Arcadix.InitialArcadix_Data.Elements.findIndex(function (a) { return a['ElementId'] === objParam['ElementPlaceholderId'] })
                    stage.children[0].Arcadix.InitialArcadix_Data.Elements[elmIndex]['Status'] = 'HtmlImg';
                    stage.children[0].Arcadix.InitialArcadix_Data.Elements[elmIndex]['Img'] = ImgPath;
                    dropElementDecider(stage.children[0].Arcadix.InitialArcadix_Data.Elements[elmIndex]);
                 
            }



            function textPopupCallback_elements(objJson, objParam) {  // objParam = {'ElementPlaceholderId': '', 'iTypeId' : 'PlaceholderId' / 'TextContentId'}
                debugger
                var ElmXml = parseXmlStr(JSONToXml(objJson, 'input'));
                var libIndex;
               // if (objParam['ElementPlaceholderId']) {
                    libIndex = stage.children[0].Arcadix['InitialArcadix_Data']['Elements'].findIndex(function (a) { return a['ElementId'] === objParam['ElementPlaceholderId'] });
                    stage.children[0].Arcadix['InitialArcadix_Data']['Elements'][libIndex]['ElmXml'] = ElmXml;
              //  }
                //} else if (objParam["TextContentId"]) {
                //    libIndex = stage.children[0].Arcadix['InitialArcadix_Data']['TextContent'].findIndex(function (a) { return a['PlaceholderId'] === objParam['PlaceholderId'] });
                //    stage.children[0].Arcadix['InitialArcadix_Data']['TextContent'][libIndex]['ElmXml'] = ElmXml;
                //}
                var ElmntIndex = stage.children[0].Arcadix.InitialArcadix_Data.Elements.findIndex(function (a) { return a['ElementId'] === objParam['ElementPlaceholderId'] });
                // stage.children[0].Arcadix.InitialArcadix_Data.ChildElements[ElmntIndex]['ElmXml'] = EmlXml;
                var StagedElmIndex = stage.children.findIndex(function (a) { return a['ElementPlaceholderId'] == objParam['ElementPlaceholderId'] });
                stage.removeChildAt(StagedElmIndex);
                var inpHtml;
                //if (objParam.iTypeId === 'PlaceholderId') {
                //    inpHtml = getHtmlElement('textbox', objJson);
                //} else if (objParam.iTypeId === 'TextContentId') {
                inpHtml = getHtmlElement_elements('text', objJson);
               // }
                //var pathparams = { 'type': objParam.iTypeId === 'PlaceholderId' ? 'textbox' : 'text', iTypeId: objParam.iTypeId };
                //pathparams[objParam.iTypeId] = objParam[objParam.iTypeId];
               // getImgPathFromHtml(inpHtml.outerHTML, objParam, ImagepathCallback_elements);
               // getImgPathFromHtml(inpHtml.outerHTML, objParam, ImagepathCallback_elements);
                //var testhtml = '<div valign="top" align="left" type="Text" actualtype="AnswerElements" ishowcontenttime="" cistoggletext="N" cissetborder="N" class="PageOutputContentText" style="width:100%" contenteditable="true" ielementtypeid="1" icontaineraccessid="173496" ielementid="627224" ielementaccessid="627224" velementverticalalignment="top" velementhorizontalalignment="left"><span type="SELECTIONSPAN"><span contenteditable="false" style="position: relative;"><span id="129201814332351" ielementaccessid="129201814332351" style="display: inline-block; padding: 0px; margin: 0px; border: 1px solid transparent;" valign="middle" contenteditable="false" type="JFormulaEditorPlaceholder" class="FormulaFont"><span class="MathJax" id="MathJax-Element-10-Frame" role="textbox" aria-readonly="true" style=""><nobr><span class="math" id="MathJax-Span-30"><span style="display: inline-block; position: relative; width: 75px; height: 0px; font-size: 107%;"><span style="position: absolute; clip: rect(50.6px, 20330px, 93.2px, -9px); top: -77px; left: 0px;"><span class="mrow" id="MathJax-Span-31"><span class="mrow" id="MathJax-Span-32"><span class="mrow" id="129201814332349" style=""><span class="mi" id="MathJax-Span-34" style="font-family: inherit; font-style: inherit;"><span style="font-family: inherit; font-size: 93%; font-style: inherit; font-weight: normal;">sin</span></span><span class="mo" id="MathJax-Span-35" style="vertical-align: 0px;"><span style="font-family: MathJax_Size2;">(</span></span><span class="mn" id="129201814332753" style="font-family: inherit; font-style: inherit;"><span style="font-family: inherit; font-size: 93%; font-style: inherit; font-weight: normal;">2</span></span><span class="mn" id="129201814332954" style="font-family: inherit; font-style: inherit;"><span style="font-family: inherit; font-size: 93%; font-style: inherit; font-weight: normal;">0</span></span><span class="mn" id="129201814333155" style="font-family: inherit; font-style: inherit;"><span style="font-family: inherit; font-size: 93%; font-style: inherit; font-weight: normal;">0</span></span><span class="mo" id="MathJax-Span-39" style="vertical-align: 0px;"><span style="font-family: MathJax_Size2;">)</span></span></span></span></span><span style="display: inline-block; width: 0px; height: 77px;"></span></span></span><span style="border-left: 0px solid; display: inline-block; overflow: hidden; width: 0px; height: 38.6px; vertical-align: -14.2px;"></span></span></nobr></span><script type="math/mml" id="MathJax-Element-10"><math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mrow id="129201814332349"><mi style="font-family:inherit;font-style:inherit;" noid="true">sin</mi><mo style="font-family:inherit;font-style:inherit;" noid="true">(</mo><mn style="font-family:inherit;font-style:inherit;" id="129201814332753">2</mn><mn style="font-family:inherit;font-style:inherit;" id="129201814332954">0</mn><mn style="font-family:inherit;font-style:inherit;" id="129201814333155">0</mn><mo style="font-family:inherit;font-style:inherit;" noid="true">)</mo></mrow></mrow></math></script></span><img style="position: absolute; top: -3px; left: 63.9375px; z-index: 10000000; width: 1px; height: 24px; display: none;" src="http://localhost/Intranet/App_Themes/Default/IntranetExtranet/Skin/Intranet/Images/Common/JTaskEditor/BlinkingCurser.gif" id="imgJFormulaEditorCursor"></span>&nbsp;</span></div>';
                //test purpose =================
                getImgPathFromHtml_elements(inpHtml.outerHTML, objParam, ImagepathCallback_elements);
            }
            function getHtmlElement_elements(iElementType, objJson) {
                debugger
                //function ControlToPngCreator(iElementType, uploadControlPng) {
                var inp;
                if (iElementType && iElementType === 'textbox') {
                    inp = document.createElement('input');
                    // inp.id = iElementId;
                    inp.setAttribute('type', 'text');
                    inp.setAttribute('value', objJson.Values[0].AnswerValue);
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
                } else if (iElementType && iElementType === 'text') {
                    inp = document.createElement('div');
                    // inp.id = iElementId;                 
                    // inp.style.background = 'red';
                    //inp.style.height = '30px';
                    inp.style.display = 'inline-block';
                    inp.style.textAlign = 'center';
                   // if (objJson.Values[0].AnswerValue.length)
                    //inp.style.alignItems = 'center';
                    //inp.style.justifyContent = 'center';
                    inp.innerHTML = objJson.Values[0].AnswerValue;
                }
                return inp;
                //  return html2Png(inp);
                // html2Png(inp = inp, uploadControlPng = uploadControlPng, type = iElementType);
                //$('#html-content-inner').html('');
                //$('#html-content-inner').html(inp);
                // getImgPathFromHtml(inp, iElementType);
                // domToImage(document.getElementById('html-content-inner'), uploadControlPng = uploadControlPng, type = iElementType);
                //    }
            }
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

//=============================json to xml=================================
            function JSONToXml(json, type) {
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
                    } else if (type.toLowerCase() === 'text') {
                        ElmXml.setAttribute('iElementTypeId', '51');
                        ElmXml.setAttribute('iElementType', 'HtmlImage');  
                    }

                    ElmXml.setAttribute('iElementId', parent.GetUniqueId());

                }
                // console.log(serializeXML(ElmXml));
                return parseXml(serializeXML(ElmXml));
            }


            function serializeXML(xml) {
                var s = new XMLSerializer();
                var newXmlStr = s.serializeToString(xml);
                return newXmlStr;
            }


            window.serializeXML = function(xml) {
                var s = new XMLSerializer();
                var newXmlStr = s.serializeToString(xml);
                return newXmlStr;
            }
//====================json to xml================end==============

            function ImagepathCallback(objJson, objParam) {
                debugger
                var ImgPath = objJson.GetNewHttmlImage.vImagePath;
                var xmlDoc = document.implementation.createDocument("", "", null);
                if (stage.children[0].Arcadix.ElmXmls === '') {
                    stage.children[0].Arcadix.ElmXmls = document.implementation.createDocument("", "", null);
                    var root = stage.children[0].Arcadix.ElmXmls.createElement('Elements');
                    stage.children[0].Arcadix.ElmXmls.appendChild(root);
                }
                var ElmCount = stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].childNodes.length;
                var alreadyExist = false;
                for (var i = 0; i < ElmCount; i++) {
                    if (Number(stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].childNodes[i].getAttribute('iElementId')) === Number(objParam['PlaceholderId'])) {
                        alreadyExist = true;
                    }
                }
                var elmIndex;
                var libIndex;
                var ElmXml;
                var XmlStr = '<Element iElementTypeId = "2" iElementAccessId = "337642" iElementId = "337642" vImageType="png" cHasTextOnTop ="N" iImageFileVersion="1" vElementVerticalAlignment="top" vElementImageName="160076_Image_1" vElementHorizontalAlignment="left" iElementImageWidth = "505" iElementImageHeight = "705" cShowTitle ="N" cShowDescription ="N" cDisplayedInElementTree ="Y" iElementType = "Image"></Element>';
                if (objParam['PlaceholderId']) {
                    var elmIndex = stage.children[0].Arcadix.InitialArcadix_Data.Placeholder.findIndex(function (a) { return a['PlaceholderId'] == objParam['PlaceholderId'] });
                    if (true) {
                        var ElmXmlStr = '<Element iElementTypeId = "2" iElementAccessId = "337642" iElementId = "337642" vImageType="png" cHasTextOnTop ="N" iImageFileVersion="1" vElementVerticalAlignment="top" vElementImageName="160076_Image_1" vElementHorizontalAlignment="left" iElementImageWidth = "505" iElementImageHeight = "705" cShowTitle ="N" cShowDescription ="N" cDisplayedInElementTree ="Y" iElementType = "Image"></Element>';
                        var ElmXml = xmlDoc.createElement('Element');
                        ElmXml.setAttribute('iElementTypeId', 51);
                        ElmXml.setAttribute('iElementAccessId', objParam['PlaceholderId']);
                        ElmXml.setAttribute('iElementId', objJson['GetNewHttmlImage']['iElementId']);
                        //////static//////////////////////
                        ElmXml.setAttribute('vImageType', 'png');
                        ElmXml.setAttribute('cHasTextOnTop', 'N');
                        ElmXml.setAttribute('iImageFileVersion', '1');
                        ElmXml.setAttribute('vElementVerticalAlignment', 'top');
                        ElmXml.setAttribute('vElementImageName', '160076_Image_1');
                        ElmXml.setAttribute('vElementHorizontalAlignment', 'left');
                        ElmXml.setAttribute('iElementImageWidth', '505');
                        ElmXml.setAttribute('iElementImageHeight', '705');
                        ElmXml.setAttribute('cShowTitle', 'N');
                        ElmXml.setAttribute('cShowDescription', 'N');
                        ElmXml.setAttribute('cDisplayedInElementTree', 'Y');
                      //////static////////////////////end//////////////


                        ElmXml.setAttribute('iElementType', 'HtmlImage');
                        stage.children[0].Arcadix['InitialArcadix_Data']['Placeholder'][elmIndex]['ElmXml'] = ElmXml;
                        stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].appendChild(ElmXml);
                    }

                   // stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].appendChild(ElmXml);
                } else if (objParam['TextContentId']) { 
                   // elmIndex = stage.children[0].Arcadix.InitialArcadix_Data.TextContent.findIndex(function (a) { return a[objParam.iTypeId] === objParam[objParam.iTypeId]});
                   // stage.children[0].Arcadix.InitialArcadix_Data.TextContent[elmIndex]['Img'] = ImgPath;
                   //// libIndex = stage.children[0].Arcadix['InitialArcadix_Data']['TextContent'].findIndex(function (a) { return a['PlaceholderId'] === objParam['PlaceholderId'] });
                   // ElmXml = parseXmlStr(XmlStr);
                   // ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementId', objParam['PlaceholderId']);
                   // ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementAccessId', objParam['PlaceholderId']);
                   // ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementTypeId', 51);
                   // ElmXml.getElementsByTagName('Element')[0].setAttribute('iElementType', 'HtmlImage');
                   // stage.children[0].Arcadix['InitialArcadix_Data']['TextContent'][elmIndex]['ElmXml'] = ElmXml;
                   //   stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].appendChild(ElmXml);
                    var elmIndex = stage.children[0].Arcadix.InitialArcadix_Data.TextContent.findIndex(function (a) { return a['TextContentId'] == objParam['TextContentId'] });
                    if (true) {
                        var ElmXmlStr = '<Element iElementTypeId = "2" iElementAccessId = "337642" iElementId = "337642" vImageType="png" cHasTextOnTop ="N" iImageFileVersion="1" vElementVerticalAlignment="top" vElementImageName="160076_Image_1" vElementHorizontalAlignment="left" iElementImageWidth = "505" iElementImageHeight = "705" cShowTitle ="N" cShowDescription ="N" cDisplayedInElementTree ="Y" iElementType = "Image"></Element>';
                        var ElmXml = xmlDoc.createElement('Element');
                        ElmXml.setAttribute('iElementTypeId', 51);
                        ElmXml.setAttribute('iElementAccessId', objParam['TextContentId']);
                        ElmXml.setAttribute('iElementId', objJson['GetNewHttmlImage']['iElementId']);
                        //ElmXml.setAttribute('iElementId', objParam['TextContentId']);
                        //////static//////////////////////
                        ElmXml.setAttribute('vImageType', 'png');
                        ElmXml.setAttribute('cHasTextOnTop', 'N');
                        ElmXml.setAttribute('iImageFileVersion', '1');
                        ElmXml.setAttribute('vElementVerticalAlignment', 'top');
                        ElmXml.setAttribute('vElementImageName', '160076_Image_1');
                        ElmXml.setAttribute('vElementHorizontalAlignment', 'left');
                        ElmXml.setAttribute('iElementImageWidth', '505');
                        ElmXml.setAttribute('iElementImageHeight', '705');
                        ElmXml.setAttribute('cShowTitle', 'N');
                        ElmXml.setAttribute('cShowDescription', 'N');
                        ElmXml.setAttribute('cDisplayedInElementTree', 'Y');
                      //////static////////////////////end//////////////
                        ElmXml.setAttribute('iElementType', 'HtmlImage');

                        stage.children[0].Arcadix['InitialArcadix_Data']['TextContent'][elmIndex]['ElmXml'] = ElmXml;
                        stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].appendChild(ElmXml);
                    }
                }                
                var newHtmlImg = new Image();
                newHtmlImg.src = ImgPath;
                newHtmlImg[objParam.iTypeId] = objParam[objParam.iTypeId];
                newHtmlImg.onload = function (event) {
                    
                    if (event.target['PlaceholderId']) {
                        jsonHtmlplaceholderCreator(stage.children[0].Arcadix.InitialArcadix_Data.Placeholder[elmIndex], event);
                    } else if (event.target['TextContentId']) {
                        jsonHtmlplaceholderCreator(stage.children[0].Arcadix.InitialArcadix_Data.TextContent[elmIndex], event);
                    }
                   
                }


            }

            function getHtmlElement(iElementType, objJson) {
                debugger
                //function ControlToPngCreator(iElementType, uploadControlPng) {
                var inp;
                if (iElementType && iElementType === 'textbox') {
                    inp = document.createElement('input');
                    // inp.id = iElementId;
                    inp.setAttribute('type', 'text');
                    inp.setAttribute('value', objJson.Values[0].AnswerValue);
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
                } else if (iElementType && iElementType === 'text'){
                    inp = document.createElement('div');
                    //inp.style.background = 'red';
                    //inp.style.display = 'inline-flex';
                    //inp.style.alignItems = 'center';
                    //inp.style.justifyContent = 'center';
                    //display: inline - flex;
                    //align - items: center;
                    //justify - content: center;

                    //inp.style.padding = '4px';
                    // inp.id = iElementId;
                   // inp.style.width = '150px';
                    inp.innerHTML = objJson.Values[0].AnswerValue;
                }
                return inp;
                //  return html2Png(inp);
                // html2Png(inp = inp, uploadControlPng = uploadControlPng, type = iElementType);
                //$('#html-content-inner').html('');
                //$('#html-content-inner').html(inp);
                // getImgPathFromHtml(inp, iElementType);
                // domToImage(document.getElementById('html-content-inner'), uploadControlPng = uploadControlPng, type = iElementType);
                //    }
            }

            function getImgPathFromHtml(strHtml, objParam, ImagepathCallback) {
                debugger
                var strNewHtml = window.parent.ReplaceStringForXML(strHtml);
                //var strNewHtml = strHtml.replace(/\"/g, '\\"');
                window.parent.parent.JEditorWorkArea_ConvertHtmlToImage(strNewHtml, ImagepathCallback, objParam);
            }

            function jsonHtmlplaceholderCreator(objelement, evt) {
                debugger
                var plhldrContainer;
                var iElementId = objelement['PlaceholderId'] ? objelement['PlaceholderId'] : objelement['TextContentId'];
                var iTypeId = objelement['PlaceholderId'] ? 'PlaceholderId' : 'TextContentId';
                var element;
                if (objelement['PlaceholderId']) {
                    element = stage.children[0].Arcadix.InitialArcadix_Data["Placeholder"].find(function (a) { return a['PlaceholderId'] === objelement['PlaceholderId']});
                } else if (objelement['TextContentId']) {
                    element = stage.children[0].Arcadix.InitialArcadix_Data["TextContent"].find(function (a) { return a['TextContentId'] === objelement['TextContentId']} );
                }
               // var element = objelement['PlaceholderId'] ? stage.children[0].Arcadix.InitialArcadix_Data["Placeholder"].find(a => a['PlaceholderId'] === objelement['PlacehoderId']) : stage.children[0].Arcadix.InitialArcadix_Data["TextContent"].find(a => a['TextContentId'] === objParam['TextContentId']);
                if (!stage.children.find(function (a) { return a[iTypeId] === iElementId} )) {
                    iElementType = element['ObjType'];
                  //  if (!document.getElementById(iElementId)) {
                    if (!stage.children.find(function (a) { return a[iTypeId] === iElementId} )) {
                            plhldrContainer = new createjs.Container();
                            plhldrContainer[iTypeId] = iElementId;
                            if (element['XPosition'] && element['YPosition']) {
                                plhldrContainer.x = element['XPosition'];
                                plhldrContainer.y = element['YPosition'];
                            } else {
                                plhldrContainer.x = 200;
                                plhldrContainer.y = 50;
                            }

                            stage.addChild(plhldrContainer);
                            stage.update();

                        }

                    containerIndex = stage.children.findIndex(function (a) { return a[iTypeId] === iElementId});

                        HtmlPlaceholder = new createjs.Bitmap(evt.target);
                        HtmlPlaceholder[iTypeId] = element[iTypeId];
                        HtmlPlaceholder.cursor = 'pointer';
                        //HtmlPlaceholder.regX = HtmlPlaceholder.image.width / 2;
                        //HtmlPlaceholder.regY = HtmlPlaceholder.image.height / 2;

                        stage.children[containerIndex].addChild(HtmlPlaceholder);
                        stage.update();


                        if (stage.children[0].Arcadix['InitialArcadix_Mode'] && stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'display') {
                            //HtmlPlaceholder.on('dblclick', function (evt) {
                            //    OpenInputPopup(this);
                            //});
                        }
                        //HtmlPlaceholder.on('click', function (evt) {

                        //})
                        HtmlPlaceholder.on('pressmove', function (evt) {
                            //if (!dblClicked) {
                            var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
                            evt.currentTarget.x = p.x;
                            evt.currentTarget.y = p.y;
                            //text.x = p.x;
                            //text.y = p.y;
                            container.setChildIndex(this, container.getNumChildren() - 1);
                          //  updatePosition(element, 'ChildElements', { x: p.x, y: p.y });
                            stage.update();
                            //}
                            //dblClicked = false;
                        });
                       
                        stage.update();
                  //  }
                }

            }

            this.generateElements = function () {
                this.clearStage();
              
                if (stage.children[0].Arcadix['InitialArcadix_Data'] && stage.children[0].Arcadix['InitialArcadix_Data'].Elements) {
                    for (var j = 0; j < stage.children[0].Arcadix['InitialArcadix_Data'].Elements.length; j++) {  // looping elements 
                        dropElementDecider(stage.children[0].Arcadix['InitialArcadix_Data']['Elements'][j]);
                    }
                }

                if (stage.children[0].Arcadix['InitialArcadix_Data'] && stage.children[0].Arcadix['InitialArcadix_Data'].DropZones) {
                    for (var i = 0; i < stage.children[0].Arcadix['InitialArcadix_Data'].DropZones.length; i++) {
                        dropZoneDecider(stage.children[0].Arcadix['InitialArcadix_Data']['DropZones'][i]);
                    }

                }
                //if (stage.children[0].Arcadix['InitialArcadix_Data'] && stage.children[0].Arcadix['InitialArcadix_Data'].Placeholder) {  
                //    for (var k = 0; k < stage.children[0].Arcadix['InitialArcadix_Data'].Placeholder.length; k++) {  // looping elements  
                //        jsonElementPlaceholderCreator(stage.children[0].Arcadix['InitialArcadix_Data'].Placeholder[k]);                  
                //    }                                                                                                                     
                //}                                                                                                                         
                //if (stage.children[0].Arcadix['InitialArcadix_Data'] && stage.children[0].Arcadix['InitialArcadix_Data'].TextContent) {
                //    for (var l = 0; l < stage.children[0].Arcadix['InitialArcadix_Data'].TextContent.length; l++) {  // looping elements 
                //        jsonElementPlaceholderCreator_old(stage.children[0].Arcadix['InitialArcadix_Data'].TextContent[l]);
                //    }
                //}
                //  jsonHtmlplaceholderCreator

                if (stage.children[0].Arcadix['InitialArcadix_Data'] && stage.children[0].Arcadix['InitialArcadix_Data'].TextContent) {
                    for (var l = 0; l < stage.children[0].Arcadix['InitialArcadix_Data'].TextContent.length; l++) {  // looping elements 
                        //jsonElementPlaceholderCreator_old(stage.children[0].Arcadix['InitialArcadix_Data'].TextContent[l]);
                        //var HtmlImage = stage.children[0].Arcadix['InitialArcadix_Data'].TextContent;
                        var image = new Image();
                        image.src = stage.children[0].Arcadix['InitialArcadix_Data'].TextContent[l].Img;
                        //image.onload = jsonImageCreator;
                        image.TextContentId = stage.children[0].Arcadix['InitialArcadix_Data'].TextContent[l].TextContentId;
                        image.onload = function (event) {
                            //elementCreator(event, event.target['TextContentId']);
                            jsonHtmlplaceholderCreator(stage.children[0].Arcadix['InitialArcadix_Data'].TextContent.find(function (a) { return a['TextContentId'] === event.target['TextContentId'] }), event)
                        }
                    }
                }
               


                ////////==============test purpose==================
                //var active = ''

                //var evntSwitchImg = new Image();
                //evntSwitchImg.src = 'http://localhost/Intranet/Data/Repo/Image/97/626385_Image_1.png';
                //evntSwitchImg.onload = function (evnt) {
                //    var evntSwitchBitmap = new createjs.Bitmap(evnt.target);
                //    evntSwitchBitmap.x = 200;
                //    evntSwitchBitmap.y = 50;
                //    container.addChild(evntSwitchBitmap);
                //    evntSwitchBitmap.on('click', function (evnt) {
                //        if (active === '') {
                //            active = 'pressmove';
                //            for (var i = 0; i < stage.children.length; i++) {
                //                if (stage.children[i].hasOwnProperty('ChildElementId')) {
                //                    if (stage.children[i].children) {
                //                        stage.children[i].children[0].addEventListener('pressmove', pressmoveEvt);
                //                        // stage.children[i].children[0].off('dblclick', dblclickEvt);
                //                    }


                //                }
                //            }
                //        } else if (active === 'pressmove') {
                //            for (var i = 0; i < stage.children.length; i++) {
                //                if (stage.children[i].hasOwnProperty('ChildElementId')) {
                //                    if (stage.children[i].children) {
                //                        stage.children[i].children[0].addEventListener('dblclick', dblclickEvt);
                //                        stage.children[i].children[0].removeEventListener('pressmove', pressmoveEvt);
                //                        active = 'dblclick';
                //                    }


                //                }
                //            }
                //        } else if (active === 'dblclick') {
                //            for (var i = 0; i < stage.children.length; i++) {
                //                if (stage.children[i].hasOwnProperty('ChildElementId')) {
                //                    if (stage.children[i].children) {
                //                        stage.children[i].children[0].addEventListener('pressmove', pressmoveEvt);
                //                        stage.children[i].children[0].removeEventListener('dblclick', dblclickEvt);
                //                        active = 'pressmove';
                //                    }


                //                }
                //            }
                //        }

                //    })
                //}

                //function pressmoveEvt(evt) {
                //    // HtmlPlaceholder.on('pressmove', function (evt) {
                //    //if (!dblClicked) {
                //    var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
                //    evt.currentTarget.x = p.x;
                //    evt.currentTarget.y = p.y;
                //    //text.x = p.x;
                //    //text.y = p.y;
                //    var objElement = stage.children[0].Arcadix.InitialArcadix_Data.ChildElements.find(a => a['ChildElementId'] === evt.target.ChildElementId);
                //    container.setChildIndex(this, container.getNumChildren() - 1);
                //    updatePosition(objElement, 'ChildElements', { x: p.x, y: p.y });
                //    stage.update();
                //    //}
                //    //dblClicked = false;
                //    //   });
                //}
                //function dblclickEvt(evt) {
                //    //  HtmlPlaceholder.on('dblclick', function (evt) {
                //    //  OpenInputPopup(this);
                //    //  });
                //}
                ///////============test purpose=====================
                stage.update();
            }

            this.initializeEdit = function (elements) {
                this.updateJSON(JSON.parse(JSON.stringify(elements)), 1);
            }
            this.initializeDisplay = function (elements) {
                this.updateJSON(JSON.parse(JSON.stringify(elements)), 2);
            }
            this.initializeSolution = function (elements) {
                this.updateJSON(JSON.parse(JSON.stringify(elements)), 3);
            }
            //this.clearAllContainer = function () {
            //    for (var i = 0; i < stage.children.length; i++) {
            //        if (stage.children[i]['PlaceholderId']) {
            //            stage.removeChildAt(i)
            //        }
            //    }
            //}
            this.clearStage = function () {
                //this.Arcadix['InitialArcadix_Data'] = {
                //    "Elements": [],
                //    "DropZones": []
                //};
                container.removeAllChildren();
               // this.clearAllContainer();
                stage.update();
             
                ////console.log('stage cleared');
                ////console.log("current stage", stage);

            }
           

            this.mergeJSON = function (SideBarJSON, AnimationJSON) {
                if (AnimationJSON.Elements && AnimationJSON.Elements != null && AnimationJSON.Elements.length > 0) {

                    var resultObj = {
                        Elements: SideBarJSON.Elements.map(function (item) {
                            return Object.assign(item, AnimationJSON.Elements.find(function (a) {
                                if (a['ElementId'] === item['ElementId']) {
                                    return a;
                                } else {
                                    return undefined;
                                }
                            }))


                        }), DropZones: SideBarJSON.DropZones.map(function (item) {
                            return Object.assign(item, AnimationJSON.DropZones.find(function (a) {
                                if (a['DropZoneId'] === item['DropZoneId']) {
                                    return a;
                                } else {
                                    return undefined;
                                }
                            }))

                        }),
                        Placeholder: SideBarJSON.Placeholder.map(function (item) {
                            return Object.assign(item, AnimationJSON.Placeholder.find(function (a) {
                                if (a['PlaceholderId'] === item['PlaceholderId']) {
                                    return a;
                                } else {
                                    return undefined;
                                }
                            }))

                        }),
                        TextContent: SideBarJSON.TextContent.map(function (item) {
                            return Object.assign(item, AnimationJSON.TextContent.find(function (a) {
                                if (a['TextContentId'] === item['TextContentId']) {
                                    return a;
                                } else {
                                    return undefined;
                                }
                            }))

                        })
                    }

                } else {
                    return SideBarJSON;
                }
                return resultObj;
            }
            this.updateResult = function () {
                debugger
                console.log('before updateResult', stage.children[0].Arcadix);
                for (var dropzone in stage.children[0].Arcadix['ResultArcadix_Data']) {

                    for (var i = 0; i < stage.children[0].Arcadix['ResultArcadix_Data'][dropzone].length; i++) {
                        // var elmntIndex = stage.children[0].Arcadix['InitialArcadix_Data']['Elements'].findIndex(a => a['ElementId'] === stage.children[0].Arcadix['ResultArcadix_Data'][dropzone][i]['ElementId']);
                        var elmntIndex = stage.children[0].Arcadix['InitialArcadix_Data']['Elements'].findIndex(function (a) {
                            if (a['ElementId'] === stage.children[0].Arcadix['ResultArcadix_Data'][dropzone][i]['ElementId']) {
                                return a;
                            } else {
                                return undefined
                            }
                        });

                        if (elmntIndex === -1) {
                            stage.children[0].Arcadix['ResultArcadix_Data'][dropzone].splice(i, 1);
                        }
                    }

                    //var dropzoneIndex = stage.children[0].Arcadix['InitialArcadix_Data']['DropZones'].findIndex(a => a['DropZoneId'] === dropzone);
                    var dropzoneIndex = stage.children[0].Arcadix['InitialArcadix_Data']['DropZones'].findIndex(function (a) {
                        if (a['DropZoneId'] === dropzone) {
                            return a;
                        } else {
                            return undefined;
                        }
                    });

                    if (dropzoneIndex === -1) {
                        delete stage.children[0].Arcadix['ResultArcadix_Data'][dropzone];
                    }
                }
            }

            // load the source image:
            var currentType = "";  // setting the current looping element

            function dropElementDecider(dropElement) {
                if (dropElement['Status'] && dropElement['Status'] === 'Placeholder') {
                    jsonElementPlaceholderCreator_elements(dropElement);
                } else {
                    var image = new Image();
                    image.src = dropElement.Img;
                    //image.onload = jsonImageCreator;
                    image.ElementId = dropElement.ElementId;
                    image.onload = function (event) {
                        elementCreator(event, event.target['ElementId']);
                        if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit') {
                            jsonShadowElementCreator(event, event.target.ElementId);
                        }
                    }
                }
            }

            function jsonShadowElementCreator(event, elementId) {
                /*	////console.log('element event',event.);*/
                //if (!stage.children[1].children.find(a => a['ElementId'] === elementId + '_shadow')) {
                if (!stage.children[1].children.find(function (a) {
                    if (a['ElementId'] === elementId + '_shadow') {
                        return a;
                    } else {
                        return undefined;
                    }
                })) {

                    var image = event.target;
                    //var bitmap;
                    /*var container = new createjs.Container();*/
                    //var element = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.find(a => a['ElementId'] === elementId);
                    var element = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.find(function (a) {
                        if (a['ElementId'] === elementId) {
                            return a;
                        } else {
                            return undefined;
                        }
                    });

                    // create and populate the screen with random daisies:
                    //window.elements = elements;
                    //for (var i = 0; i < elements.length; i++) {
                    bitmap = new createjs.Bitmap(image);
                    bitmap.cursor = 'pointer';
                    //bitmap.poin
                    container.addChild(bitmap);
                    stage.update();
                    //bitmap.x = element['XPosition'];
                    //bitmap.y = element['YPosition'];
                    debugger
                    if (element.DispShadow && element.DispShadow == true) {
                        if (element.ShadowElement) {
                            bitmap.x = element['ShadowElement']['XPosition'];
                            bitmap.y = element['ShadowElement']['YPosition'];
                            bitmap.visible = true;
                        }

                    }
                    else {
                        bitmap.visible = false;
                    }
                    //bitmap.DropZoneId = element['DropZoneId'];
                    bitmap.ElementId = element['ElementId'] + '_shadow';

                    bitmap.regX = bitmap.image.width / 2 | 0;
                    bitmap.regY = bitmap.image.height / 2 | 0;

                    //  bitmap.alpha = 0.75;

                    bitmap.on("dblclick", function (evt) {
                        //   stage.children[0].Arcadix['InitialArcadix_Data']["InitialArcadix_ShadowVisible"] = true;
                        //if (stage.children[0].Arcadix["InitialArcadix_ShadowVisible"] && stage.children[0].Arcadix["Arcadix['InitialArcadix_Mode']"] == "Edit") {
                        //    ImageA1Shadow.visible = true;
                        //    ImageA1Shadow.x = this.x;
                        //    ImageA1Shadow.y = this.y;
                        //}
                        //evt.target.alpha = 0.75;

                        //var elemIndex = stage.children[1].children.findIndex(a => a["ElementId"] === evt.target['ElementId'].split('_')[0]);
                        var elemIndex = stage.children[1].children.findIndex(function (a) {
                            if (a["ElementId"] === evt.target['ElementId'].split('_')[0]) {
                                return a;
                            } else {
                                return undefined;
                            }
                        });

                        //alert(evt.target['ElementId'].split('_')[0]);
                        // if()

                        stage.children[1].children[elemIndex].x = this.x;
                        stage.children[1].children[elemIndex].y = this.y;
                        stage.children[1].children[elemIndex].alpha = 1;
                        this.visible = false;
                        updateShadowElementPosition({ x: evt.currentTarget.x, y: evt.currentTarget.y, ElementId: evt.currentTarget['ElementId'].split('_')[0] }, false);
                        updateStartXStartY({ ElementId: evt.target['ElementId'].split('_')[0], x: this.x, y: this.y });
                   //     removeFromDropZone({ 'ElementId': evt.target['ElementId'].split('_')[0], 'DropedTo': evt.target['DropedTo'] })
                        handleTick();
                    });
                }
            }


            function stringifyXML(xml) {
                try {
                    var s = new XMLSerializer();
                    var newXmlStr = s.serializeToString(xml);
                    return newXmlStr;
                } catch (ex) {
                    return '';
                }
             
            }
            var elmDblClicked = false;
            function elementCreator(event, elementId) {
                var xmlDoc = document.implementation.createDocument("", "", null);
                if (stage.children[0].Arcadix.ElmXmls === '') {
                    stage.children[0].Arcadix.ElmXmls = document.implementation.createDocument("", "", null);
                    var root = stage.children[0].Arcadix.ElmXmls.createElement('Elements');
                    stage.children[0].Arcadix.ElmXmls.appendChild(root);
                }
                var ElmCount = stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].childNodes.length;
                var alreadyExist = false;
                for (var i = 0; i < ElmCount; i++) {
                    if (Number(stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].childNodes[i].getAttribute('iElementId')) === Number(elementId)) {
                        alreadyExist = true;
                    }
                }
                if (true) {
                    var ElmXmlStr = '<Element iElementTypeId = "2" iElementAccessId = "337642" iElementId = "337642" vImageType="png" cHasTextOnTop ="N" iImageFileVersion="1" vElementVerticalAlignment="top" vElementImageName="160076_Image_1" vElementHorizontalAlignment="left" iElementImageWidth = "505" iElementImageHeight = "705" cShowTitle ="N" cShowDescription ="N" cDisplayedInElementTree ="Y" iElementType = "Image"></Element>';
                    var ElmXml = xmlDoc.createElement('Element');
                    ElmXml.setAttribute('iElementTypeId', 2);
                    ElmXml.setAttribute('iElementAccessId', elementId);
                  
                    ElmXml.setAttribute('vImageType', 'png');
                    ElmXml.setAttribute('cHasTextOnTop', 'N');
                    ElmXml.setAttribute('iImageFileVersion', '1');
                    ElmXml.setAttribute('vElementVerticalAlignment', 'top');
                    ElmXml.setAttribute('vElementImageName', '160076_Image_1');
                    ElmXml.setAttribute('vElementHorizontalAlignment', 'left');
                    ElmXml.setAttribute('iElementImageWidth', '505');
                    ElmXml.setAttribute('iElementImageHeight', '705');
                    ElmXml.setAttribute('cShowTitle', 'N');
                    ElmXml.setAttribute('cShowDescription', 'N');
                    ElmXml.setAttribute('cDisplayedInElementTree', 'Y');
                    //////static////////////////////end//////////////
                    ElmXml.setAttribute('iElementType', 'Image');
                    var elmIndex = stage.children[0].Arcadix.InitialArcadix_Data.Elements.findIndex(function (a) { return a['ElementId'] == elementId });
                   
                    stage.children[0].Arcadix['InitialArcadix_Data']['Elements'][elmIndex]['ElmXml'] = ElmXml;
                    stage.children[0].Arcadix.ElmXmls.getElementsByTagName('Elements')[0].appendChild(ElmXml);
                }

            
                if (!stage.children[1].children.find(function (a) {
                    if (a['ElementId'] === elementId) {
                        return a;
                    } else {
                        return undefined;
                    }
                })) {
                    var image = event.target;

                  
                    var element = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.find(function (a) {
                        if (a['ElementId'] === elementId) {
                            return a;
                        } else {
                            return undefined;
                        }
                    });
                   
                    bitmap = new createjs.Bitmap(image);
                    container.addChild(bitmap);
                 
                    if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'display') {
                     
                        if (element['StartX'] && element['StartY']) {
                            bitmap.x = element['StartX'];
                            bitmap.y = element['StartY'];
                        }


                    } else if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit' || stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'solution') {
                        if (element['EndX'] && element['EndY']) {
                            bitmap.x = element['EndX'];
                            bitmap.y = element['EndY'];
                        }
                        else if (element['StartX'] && element['StartY']) {
                            bitmap.x = element['StartX'];
                            bitmap.y = element['StartY'];
                        }
                        else {
                            bitmap.x = element['XPosition'];
                            bitmap.y = element['YPosition'];
                        }

                    }


                    else {
                        bitmap.x = element['XPosition'];
                        bitmap.y = element['YPosition'];
                    }

                  
                    if (element.DispShadow && element.DispShadow == true && stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit') {
                        bitmap.alpha = 0.75;
                    }
                 
                    bitmap.ElementId = element['ElementId'];
                    bitmap.DropedTo = getDropedZoneID(element);

                    bitmap.regX = bitmap.image.width / 2 | 0;
                    bitmap.regY = bitmap.image.height / 2 | 0;

                    bitmap.cursor = "pointer";


                    if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit' || stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'display') {
                        bitmap.on("mousedown", function (evt) {
                            this.parent.addChild(this);
                            stage.update();

                            this.offset = {
                                x: this.x - evt.stageX,
                                y: this.y - evt.stageY
                            };
                        });

                        bitmap.on("rollover", function (evt) {
                            this.scale = this.originalScale * 1.2;
                        });

                        bitmap.on("rollout", function (evt) {
                            this.scale = this.originalScale;
                        });



                      //  bitmap.on("click", function (evt) {
                      //      elmDblClicked = true;
                    ///    });

                        bitmap.on("dblclick", function (evt) {
                           
                            if (getIntersectingDropedZone(evt.currentTarget) == null) {
                                if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit') {
                                    evt.target.alpha = 0.75;
                                }
                             
                                var elemIndex = stage.children[1].children.findIndex(function (a) {
                                    if (a["ElementId"] === evt.target['ElementId'] + '_shadow') {
                                        return a;
                                    } else {
                                        return undefined;
                                    }
                                });

                                stage.children[1].children[elemIndex].visible = true;
                                stage.children[1].children[elemIndex].x = this.x;
                                stage.children[1].children[elemIndex].y = this.y;

                            
                                updateShadowElementPosition(evt.currentTarget, true);

                            }


                            handleTick();
                        });

                        bitmap.on("pressup", function (evt) {
                            debugger              
                           
                           // if (!elmDblClicked) {
                            //    var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
                            //    evt.currentTarget.x = p.x;
                            //    evt.currentTarget.y = p.y;
                               
                            //    stage.update();
                              
                            //}
                          
                            removeFromDropZone(evt.currentTarget); /// remove the element from previous dropzone before placing it	
                            var dropedZone = getIntersectingDropedZone(evt.currentTarget);
                            if (dropedZone != null) {
                           
                                var movedItem = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.find(function (a) {
                                    if (a["ElementId"] === evt.target.ElementId) {
                                        return a;
                                    } else {
                                        return undefined;
                                    }
                                });
                                movedItem["XPosition"] = evt.target.x;
                                movedItem["YPosition"] = evt.target.y;
                                stage.children[0].Arcadix['InitialArcadix_Data'].Elements = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.map(function (a) {
                                    if (a["ElementId"] === evt.target.ElementId) {
                                        return movedItem;
                                    } else {
                                        return a;
                                    }
                                });
                                updateEndXEndY(evt.currentTarget);                                                                             
                                addToDropZone(dropedZone, evt.currentTarget);
                            }
                            else { // if droped outside the dropzone
                                if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit') {
                                    var shadowElmIndex = stage.children[1].children.findIndex(function (a) {
                                        if (a["ElementId"] === evt.currentTarget['ElementId'] + '_shadow') {
                                            return a;
                                        } else {
                                            return undefined;
                                        }
                                    });

                                    if (stage.children[1].children[shadowElmIndex].visible) {  // go back to original position only if shadow is visible 
                                        //var draggedIndex = stage.children[1].children.findIndex(a => a['ElementId'] === evt.currentTarget['ElementId']);
                                        var draggedIndex = stage.children[1].children.findIndex(function (a) {
                                            if (a['ElementId'] === evt.currentTarget['ElementId']) {
                                                return a;
                                            } else {
                                                return undefined;
                                            }
                                        });
                                        stage.children[1].children[draggedIndex].x = stage.children[1].children[shadowElmIndex].x;
                                        stage.children[1].children[draggedIndex].y = stage.children[1].children[shadowElmIndex].y;
                                    } else {

                                    }
                                } else if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'display') {
                                    //var draggedIndex = stage.children[1].children.findIndex(a => a['ElementId'] === evt.currentTarget['ElementId']);
                                    var draggedIndex = stage.children[1].children.findIndex(function (a) {
                                        if (a['ElementId'] === evt.currentTarget['ElementId']) {
                                            return a;
                                        } else {
                                            return undefined;
                                        }
                                    });

                                    //var elmStartXStartY = stage.children[0].Arcadix['InitialArcadix_Data']['Elements'].find(a => a["ElementId"] === evt.target.ElementId);
                                    var elmStartXStartY = stage.children[0].Arcadix['InitialArcadix_Data']['Elements'].find(function (a) {
                                        if (a["ElementId"] === evt.target.ElementId) {
                                            return a;
                                        } else {
                                            return undefined;
                                        }
                                    });
                                    stage.children[1].children[draggedIndex].x = elmStartXStartY['StartX'];
                                    stage.children[1].children[draggedIndex].y = elmStartXStartY['StartY'];
                                }

                            }


                           // elmDblClicked = false;
                            handleTick();
                        });


                           bitmap.on("pressmove", function (evt) {
                            var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
                            evt.currentTarget.x = p.x;
                            evt.currentTarget.y = p.y;
                            //  stage.setChildIndex(this, stage.getNumChildren() - 1);
                            //////console.log('display object',this);
                            stage.update();
                            /*if (intersect(evt.currentTarget, stage.children.find(a => a['DropZoneId'] ===  evt.currentTarget.DropZoneId))) {
                                evt.currentTarget.alpha = 0.5;
                            } else {
                                evt.currentTarget.alpha = 1;
                            }*/
                        });
                        //bitmap.on("pressmove", function (evt) {

                         
                        //});




                        //	}
                    }

                }
           // }
            }


            this.GetData = function () {
                debugger
                var returnObj = Object.assign({}, stage.children[0].Arcadix);

                if (returnObj['InitialArcadix_Data']['Elements']) {
                    for (var i = 0; i < returnObj['InitialArcadix_Data']['Elements'].length; i++) {
                        returnObj['InitialArcadix_Data']['Elements'][i]['StrElmXml'] = returnObj['InitialArcadix_Data']['Elements'][i]['ElmXml'] ? stringifyXML(returnObj['InitialArcadix_Data']['Elements'][i]['ElmXml']) : '';
                    }
                }
                if (returnObj['InitialArcadix_Data']['DropZones']) {
                    for (var j = 0; j < returnObj['InitialArcadix_Data']['DropZones'].length; j++) {
                        returnObj['InitialArcadix_Data']['Elements'][j]['StrElmXml'] = returnObj['InitialArcadix_Data']['DropZones'][j]['ElmXml'] ? stringifyXML(returnObj['InitialArcadix_Data']['DropZones'][j]['ElmXml']) : '';
                    }
                }
                if (returnObj['InitialArcadix_Data']['Placeholder']) {
                    for (var k = 0; k < returnObj['InitialArcadix_Data']['Placeholder'].length; k++) {
                        returnObj['InitialArcadix_Data']['Elements'][k]['StrElmXml'] = returnObj['InitialArcadix_Data']['Placeholder'][k]['ElmXml'] ? stringifyXML(returnObj['InitialArcadix_Data']['Placeholder'][k]['ElmXml']) : '';
                    }
                }
                if (returnObj['InitialArcadix_Data']['TextContent']) {
                    for (var l = 0; l < returnObj['InitialArcadix_Data']['TextContent'].length; l++) {
                        returnObj['InitialArcadix_Data']['TextContent'][l]['StrElmXml'] = returnObj['InitialArcadix_Data']['TextContent'][l]['ElmXml'] ? stringifyXML(returnObj['InitialArcadix_Data']['TextContent'][l]['ElmXml']) : '';
                    }
                }
                return returnObj;
            }


            this.GetXml = function () {
                return serializeXML(this.stage.children[0].Arcadix.ElmXmls).replace(/<Elements>/g, "<SubElements>").replace(/<\/Elements>/g, "</SubElements>");
            }
            window.GetData_Test = function(){
                // return stage.children[0].Arcadix;


                var returnObj = Object.assign({}, stage.children[0].Arcadix);

                if (returnObj['InitialArcadix_Data']['Elements']) {
                    for (var i = 0; i < returnObj['InitialArcadix_Data']['Elements'].length; i++) {
                        returnObj['InitialArcadix_Data']['Elements'][i]['StrElmXml'] = returnObj['InitialArcadix_Data']['Elements'][i]['ElmXml'] ? stringifyXML(returnObj['InitialArcadix_Data']['Elements'][i]['ElmXml']) : '';
                    }
                }
                if (returnObj['InitialArcadix_Data']['DropZones']) {
                    for (var j = 0; j < returnObj['InitialArcadix_Data']['DropZones'].length; j++) {
                        returnObj['InitialArcadix_Data']['Elements'][j]['StrElmXml'] = returnObj['InitialArcadix_Data']['DropZones'][j]['ElmXml'] ? stringifyXML(returnObj['InitialArcadix_Data']['DropZones'][j]['ElmXml']) : '';
                    }
                }
                if (returnObj['InitialArcadix_Data']['Placeholder']) {
                    for (var k = 0; k < returnObj['InitialArcadix_Data']['Placeholder'].length; k++) {
                        returnObj['InitialArcadix_Data']['Elements'][k]['StrElmXml'] = returnObj['InitialArcadix_Data']['Placeholder'][k]['ElmXml'] ? stringifyXML(returnObj['InitialArcadix_Data']['Placeholder'][k]['ElmXml']) : '';
                    }
                }
                if (returnObj['InitialArcadix_Data']['TextContent']) {
                    for (var l = 0; l < returnObj['InitialArcadix_Data']['TextContent'].length; l++) {
                        returnObj['InitialArcadix_Data']['TextContent'][l]['StrElmXml'] = returnObj['InitialArcadix_Data']['TextContent'][l]['ElmXml'] ? stringifyXML(returnObj['InitialArcadix_Data']['TextContent'][l]['ElmXml']) : '';
                    }
                }
                return returnObj;
            }
            ///////===============test purpose============
            //window.testGetDat = this.GetData();
            ///////===============test purpose=====end====
            this.LoadSolution = function () { 
                console.log('running loadsolution'); 
                stage.children[0].Arcadix['InitialArcadix_HasSidebar'] = 'Y'; 
				 stage.children[0].Arcadix['InitialArcadix_HasSubElements'] = 'Y'; 
                if (stage.children[0].Arcadix['InitialArcadix_Mode'] && stage.children[0].Arcadix['InitialArcadix_Mode'] != '') { 
                    if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit' || stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'solution') { 
                        this.generateElements();                                                                                                                                      
                    }                                                                                                                                                                 
                }  
            }  
            window.setTimeout(this.LoadSolution.bind(this), 100);
            this.LoadInitialize = function (data, mode) {
               
                debugger
                if (mode == undefined || mode == '') {
                    if (!this.Arcadix['InitialArcadix_Mode'] && this.Arcadix['InitialArcadix_Mode'] != '') {
                        this.Arcadix['InitialArcadix_Mode'] = 'edit';
                    }
                    var sidebarJSON = data || {
                        'Elements': [],
                        'DropZones': [],
                        'Placeholder': [],
                        'TextContent' : []
                    };

                    if (!this.Arcadix['ResultArcadix_Data'] || this.Arcadix['ResultArcadix_Data'] == '') {
                        this.Arcadix['ResultArcadix_Data'] = {};
                    }
                
                    if (data) {
                        stage.children[0].Arcadix['InitialArcadix_Data'] = this.mergeJSON(sidebarJSON, stage.children[0].Arcadix['InitialArcadix_Data']);
                        this.updateResult(); /// updating the InitialArcadix_Data after merging
                        stage.children[0].Arcadix['InitialArcadix_Mode'] = 'edit';
                    }

                  //  if (stage.children[0].Arcadix['InitialArcadix_Mode'] && stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'display') {
                        this.generateElements();
                  //  }

                    // this.generateElements();
                    if (window.parent.OnConstructLoadComplete) {
                        window.parent.OnConstructLoadComplete();
                    }
                    if (window.parent.OnAnimationLoadComplete) {
                        window.parent.OnAnimationLoadComplete();
                    }
                    //stage.update();
                    //	this.frame_0();

                }
                else {
                    //this.Arcadix['InitialArcadix_Mode'] = mode.toLowerCase();
                    var AnimationJSON = this.Arcadix['InitialArcadix_Data'] || {
                        'Elements': [],
                        'DropZones': [],
                        'Placeholder': [],
                        'TextContent': []
                    };
                    if (!this.Arcadix['ResultArcadix_Data'] || this.Arcadix['ResultArcadix_Data'] == '') {
                        this.Arcadix['ResultArcadix_Data'] = {};
                    }
                    //  this.frame_0(this.mergeJSON(data, AnimationJSON), mode.toLowerCase());
                    stage.children[0].Arcadix['InitialArcadix_Data'] = this.mergeJSON(data, AnimationJSON);
                    this.updateResult(); /// updating the InitialArcadix_Data after merging
                    stage.children[0].Arcadix['InitialArcadix_Mode'] = mode.toLowerCase();
                    //stage.update();
                    this.generateElements();
                 
                    //this.frame_0();

                }


            }
            window.setTimeout(this.LoadInitialize.bind(this), 100);


            stage.addChild(container); // adding container to the stage
            stage.update();

            this.GetContextMenuData = function (objRelatedTarget) {
                var strContextMenuData = "{ NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'SetInitialValues', ContextMenuAction: 'JConstruct_SetInitialValues', ContextMenuKey: 'InitialKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 1, cIsCommitted: 'Y', Id: 00100, PId: 0 },";
                return strContextMenuData;
            }
            this.InvokeContextMenuAction = function (strAction) {
                if (strAction == 'SetInitialValues') {
                    SetInitialValues(objTargetEventElement);
                }

            };
            //function SetInitialValues(objTargetEventElement) {
            //    if (objTargetEventElement.id == "ImageA1") {
            //        stage.children[0].Arcadix["InitialArcadix_ImageTypeA1X"] = Math.round(objTargetEventElement.x);
            //        stage.children[0].Arcadix["InitialArcadix_ImageTypeA1Y"] = Math.round(objTargetEventElement.y);
            //    }

            //}

            //DRAG FUNCTIONALITY 
            stage.canvas.addEventListener("touchstart", function (e) {
                OverrideMoveableObject(e, [])
            }, false);

            function OverrideMoveableObject(objEvent, arrObject) {
                var touches = objEvent.changedTouches;
                var type = objEvent.type;
                stage.preventSelection = false;
                for (var i = 0, l = touches.length; i < l; i++) {
                    var touch = touches[i];
                    var id = touch.identifier;
                    if (touch.target != stage.canvas) {
                        continue;
                    }
                    if (touch.pageY != null) {
                        stage._updatePointerPosition(id, objEvent, touch.pageX, touch.pageY);
                    }
                    var target = null,
                        o = stage._getPointerData(id);
                    target = o.target = stage._getObjectsUnderPoint(o.x, o.y, null, true);
                    for (var j = 0; j < arrObject.length; j++) {
                        if (target != null && target.parent != undefined && (target.parent == arrObject[j])) {
                            stage.preventSelection = true;
                            break;
                        }
                    }
                }
            }

            function getDropedZoneID(element) {

                for (var key in stage.children[0].Arcadix['ResultArcadix_Data']) {
                    //var elementcheck = stage.children[0].Arcadix['ResultArcadix_Data'][key].find(a => a['ElementId'] === element['ElementId']);
                    var elementcheck = stage.children[0].Arcadix['ResultArcadix_Data'][key].find(function (a) {
                        if (a['ElementId'] === element['ElementId']) {
                            return a;
                        } else {
                            return undefined;
                        }
                    });
                    if (elementcheck) {
                        console.log('droped zone id is', key);
                        return key;
                        break;
                    }
                }
            }



            function getIntersectingDropedZone(dropElemnt) { // send drop element event.currentTarget
                ////console.log('finding intersecting drop zones', dropElemnt);
                debugger
                //  var dropZones = stage.children[1].children.filter(a => a.hasOwnProperty('ObjType'));
                var dropZones = stage.children[1].children.filter(function (a) {
                    if (a.hasOwnProperty('ObjType')) {
                        return a;
                    } else {
                        return undefined;
                    }
                });

                ////console.log('stage.children', stage.children);
                for (var i = 0; i < dropZones.length; i++) {
                    ////console.log('checking intesection', dropZones[i]);
                    if (dropElemnt.getTransformedBounds().intersects(dropZones[i].getTransformedBounds())) {
                        ////console.log('intersecting drop zone', dropZones[i]);
                        return dropZones[i];  // return dropzone if present

                    }
                    else {
                        continue;			// continue searching for intersection
                    }

                }
                updateStartXStartY(dropElemnt); //update the startX and startY if is put outside the drop zone
                return null;

            }
            function updateShadowElementPosition(element, showRhide) {
                if (showRhide) {
                    //var elmIndex = stage.children[0].Arcadix['InitialArcadix_Data']['Elements'].findIndex(a => a['ElementId'] === element['ElementId']);
                    var elmIndex = stage.children[0].Arcadix['InitialArcadix_Data']['Elements'].findIndex(function (a) {
                        if (a['ElementId'] === element['ElementId']) {
                            return a;
                        } else {
                            return undefined;
                        }
                    });

                    stage.children[0].Arcadix['InitialArcadix_Data']['Elements'][elmIndex]['DispShadow'] = true;
                    stage.children[0].Arcadix['InitialArcadix_Data']['Elements'][elmIndex]['ShadowElement'] = { 'XPosition': element.x, 'YPosition': element.y };
                } else {
                    //var elmIndex = stage.children[0].Arcadix['InitialArcadix_Data']['Elements'].findIndex(a => a['ElementId'] === element['ElementId']);
                    var elmIndex = stage.children[0].Arcadix['InitialArcadix_Data']['Elements'].findIndex(function (a) {
                        if (a['ElementId'] === element['ElementId']) {
                            return a;
                        } else {
                            return undefined;
                        }
                    });

                    stage.children[0].Arcadix['InitialArcadix_Data']['Elements'][elmIndex]['DispShadow'] = false;
                    stage.children[0].Arcadix['InitialArcadix_Data']['Elements'][elmIndex]['ShadowElement'] = { 'XPosition': element.x, 'YPosition': element.y };
                }

            }
            function addToDropZoneAfterMove(element) {
                var dropZone = getIntersectingDropedZone(element);
                if (dropZone != null && dropZone != undefined) {
                    addToDropZone(dropZone, element);
                }
            }

            function getIntersectingDropElements(dropZone) {
                var intersectedElemnts = [];
                // stage.children[0].
                //var elements = stage.children[1].children.filter(a => a.hasOwnProperty('ElementId'));
                var elements = stage.children[1].children.filter(function (a) {
                    if (a.hasOwnProperty('ElementId')) {
                        return a;
                    } else {
                        return undefined;
                    }
                });

                ////console.log('elements', elements);
                for (var i = 0; i < elements.length; i++) {
                    if (dropZone.getTransformedBounds().intersects(elements[i].getTransformedBounds())) {
                        intersectedElemnts.push(elements[i]);
                    }
                }
                ////console.log(intersectedElemnts);
                return intersectedElemnts;
            }


            function updatePlaceholderNTextContentPosition(element) {
                debugger
                if (element['ObjType'].toLowerCase() === 'input') {
                    elementIndex = stage.children[0].Arcadix['InitialArcadix_Data']['Placeholder'].findIndex(function (a) { return a['PlaceholderId'] = element['PlaceholderId'] });
                    stage.children[0].Arcadix['InitialArcadix_Data']['Placeholder'][elementIndex]['XPosition'] = element.x;
                    stage.children[0].Arcadix['InitialArcadix_Data']['Placeholder'][elementIndex]['YPosition'] = element.y;

                } else if (element['ObjType'].toLowerCase() === 'text') {
                    elementIndex = stage.children[0].Arcadix['InitialArcadix_Data']['TextContent'].findIndex(function (a) { return a['TextContentId'] = element['TextContentId'] });
                    stage.children[0].Arcadix['InitialArcadix_Data']['TextContent'][elementIndex]['XPosition'] = element.x;
                    stage.children[0].Arcadix['InitialArcadix_Data']['TextContent'][elementIndex]['YPosition'] = element.y;
                }
            }

            function updateStartXStartY(element) { //update the startX startY of element if not put inside the dropzone
                if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit') { // update StartX and StartY if put outside the dropzone
                    //var itemIndex = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.findIndex(a => a["ElementId"] == element["ElementId"]);
                    var itemIndex = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.findIndex(function (a) {
                        if (a["ElementId"] == element["ElementId"]) {
                            return a;
                        } else {
                            return undefined;
                        }
                    });

                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['StartX'] = element.x;
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['StartY'] = element.y;
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['EndX'] = undefined;
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['EndY'] = undefined;
                    //stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex].XPosition = element.x; /// updated for placeholders
                    //stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex].YPosition = element.y; /// updated for placeholders
                }
                else if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'display') {  // update the DStartX and DStartY if in dispay mode
                    //var itemIndex = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.findIndex(a => a["ElementId"] == element["ElementId"]);
                    var itemIndex = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.findIndex(function (a) {
                        if (a["ElementId"] == element["ElementId"]) {
                            return a;
                        } else {
                            return undefined;
                        }
                    });

                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['DStartX'] = element.x;
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['DStartY'] = element.y;
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['DEndX'] = undefined;
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['DEndY'] = undefined;
                }

            }
            function updateEndXEndY(element) { // update the endX and endY of element if put inside the dropzone
                if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit') { // update StartX and StartY if put outside the dropzone
                    //var itemIndex = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.findIndex(a => a["ElementId"] == element["ElementId"]);
                    var itemIndex = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.findIndex(function (a) {
                        if (a["ElementId"] == element["ElementId"]) {
                            return a;
                        } else {
                            return undefined;
                        }
                    });

                    //stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['StartX'] = element.x;
                    //stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['StartY'] = element.y;
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['EndX'] = element.x;
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['EndY'] = element.y;

                }
                else if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'display') {  // update the DStartX and DStartY if in dispay mode
                    //var itemIndex = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.findIndex(a => a["ElementId"] == element["ElementId"]);
                    var itemIndex = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.findIndex(function (a) {
                        if (a["ElementId"] == element["ElementId"]) {
                            return a;
                        } else {
                            return undefined;
                        }
                    });

                    //stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['DStartX'] = element.x;
                    //stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['DStartY'] = element.y;
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['DEndX'] = element.x;
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['DEndY'] = element.y;
                }
            }
            function addToDropZone(dropZone, element) { // adding element to the dropzone after successfully droping to a drop zone
                debugger
                var dropZoneId = dropZone['DropZoneId'];
                removeFromDropZone(element);
                element['DropedTo'] = dropZone['DropZoneId']; // updating the element object DropedTo after succesfull pushing
                //var zoneIndex = stage.children[0].Arcadix['InitialArcadix_Data'].DropZones.findIndex(a => a['DropZoneId'] === dropZone['DropZoneId']);
                var zoneIndex = stage.children[0].Arcadix['InitialArcadix_Data'].DropZones.findIndex(function (a) {
                    if (a['DropZoneId'] === dropZone['DropZoneId']) {
                        return a;
                    } else {
                        return undefined;
                    }
                });

                stage.children[0].Arcadix['ResultArcadix_Data'][dropZoneId].push({ 'ElementId': element['ElementId'] });
                console.log('after pushing result is', stage.children[0].Arcadix['ResultArcadix_Data']);
                stage.children[0].Arcadix['ResultArcadix_Data'] = quick_Sort_Object(stage.children[0].Arcadix['ResultArcadix_Data'], 'DropZoneId');
                console.log('after sorting result is', stage.children[0].Arcadix['ResultArcadix_Data']);
                //var itemIndex = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.findIndex(a => a["ElementId"] == element["ElementId"]);

                var itemIndex = stage.children[0].Arcadix['InitialArcadix_Data'].Elements.findIndex(function (a) {
                    if (a["ElementId"] == element["ElementId"]) {
                        return a;
                    } else {
                        return undefined;
                    }
                });

                if (stage.children[0].Arcadix['InitialArcadix_Mode'] === 'edit') {
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['EndX'] = element.x;
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['EndY'] = element.y;
                }
                if (stage.children[0].Arcadix['InitialArcadix_Mode'] === 'display') {
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['DEndX'] = element.x;
                    stage.children[0].Arcadix['InitialArcadix_Data'].Elements[itemIndex]['DEndY'] = element.y;
                }
                console.log("stage.children[0].Arcadix['ResultArcadix_Data']", stage.children[0].Arcadix['ResultArcadix_Data']);
            }


            function quick_Sort_Array(origArray, type) {
                if (origArray.length <= 1) {
                    debugger
                    return origArray;
                } else {

                    var left = [];
                    var right = [];
                    var newArray = [];
                    var pivot = origArray.pop();
                    var length = origArray.length;

                    for (var i = 0; i < length; i++) {
                        if (origArray[i][type] <= pivot[type]) {
                            left.push(origArray[i]);
                        } else {
                            right.push(origArray[i]);
                        }
                    }

                    return newArray.concat(quick_Sort_Array(left), pivot, quick_Sort_Array(right));
                }
            }

            function quick_Sort_Object(origObj, type) {
                debugger
                origArray = [];
                for (var prop in origObj) {
                    origArray.push({
                        'DropZoneId': prop,
                        'Elements': origObj[prop]
                    });
                }
                var sortedArray = quick_Sort_Array(origArray, type);
                var sortedObj = {};
                for (i = 0; i < sortedArray.length; i++) {
                    sortedObj[sortedArray[i]['DropZoneId']] = sortedArray[i]['Elements'];
                }
                for (var prop in sortedObj) {
                    sortedObj[prop] = quick_Sort_Array(sortedObj[prop], 'ElementId');
                }
                console.log('sorted obj from quick sort function', sortedObj);
                return sortedObj;
            }

            function removeFromDropZone(element) {   //removing the elment from the dropzone

                if (element.hasOwnProperty('DropedTo')) {
                    if (stage.children[0].Arcadix['ResultArcadix_Data'][element['DropedTo']]) {

                        var elmntIndex = stage.children[0].Arcadix['ResultArcadix_Data'][element['DropedTo']].findIndex(function (a) { return a['ElementId'] === element['ElementId']} );
                        stage.children[0].Arcadix['ResultArcadix_Data'][element['DropedTo']].splice(elmntIndex, 1);

                        element['DropedTo'] = ''; // updating staged object DropedTo
                    }
                    else {

                    }
                }
                else {
                    for (var dropZoneKey in stage.children[0].Arcadix['ResultArcadix_Data']) {
                        if (stage.children[0].Arcadix['ResultArcadix_Data'][dropZoneKey].find(function (a) { return a['ElementId'] === element['ElementId']}) !== undefined) {
                            //var elmntIndex = stage.children[0].Arcadix['ResultArcadix_Data'][element['DropedTo']].findIndex(a => a['ElementId'] === element['ElementId']);
                            var elmntIndex = stage.children[0].Arcadix['ResultArcadix_Data'][element['DropedTo']].findIndex(function (a) {
                                if (a['ElementId'] === element['ElementId']) {
                                    return a;
                                } else {
                                    return undefined;
                                }
                            });

                            stage.children[0].Arcadix['ResultArcadix_Data'][dropZoneKey].splice(elmntIndex, 1);
                            element['DropedTo'] = ''; // updating staged object DropedTo

                            break;
                        }
                        else {

                            continue;
                        }
                    }
                }





            }







            function handleTick() {
                //stage.children[0].Arcadix["ResultArcadix_DropZoneA1"] = ;	
            }

            // Add object to stage and update the stage
            //stage.addChild(DropZoneType1, ImageA1);
            stage.mouseMoveOutside = false;
            stage.enableMouseOver();
            stage.preventSelection = false;
            createjs.Touch.enable(stage /*, true, true*/);
            stage.update();
        }

        // actions tween:
        this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

    }).prototype = p = new cjs.MovieClip();
    p.nominalBounds = null;
    // library properties:
    lib.properties = {
        id: 'DAC903424E7A8A47BF57C8A648F8ADF8',
        width: 1120,
        height: 500,
        fps: 12,
        color: "#CCCCCC",
        opacity: 1.00,
        manifest: [],
        preloads: []
    };



    // bootstrap callback support:

    (lib.Stage = function (canvas) {
        createjs.Stage.call(this, canvas);
    }).prototype = p = new createjs.Stage();

    p.setAutoPlay = function (autoPlay) {
        this.tickEnabled = autoPlay;
    }
    p.play = function () { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
    p.stop = function (ms) { if (ms) this.seek(ms); this.tickEnabled = false; }
    p.seek = function (ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
    p.getDuration = function () { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

    p.getTimelinePosition = function () { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

    an.bootcompsLoaded = an.bootcompsLoaded || [];
    if (!an.bootstrapListeners) {
        an.bootstrapListeners = [];
    }

    an.bootstrapCallback = function (fnCallback) {
        an.bootstrapListeners.push(fnCallback);
        if (an.bootcompsLoaded.length > 0) {
            for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
                fnCallback(an.bootcompsLoaded[i]);
            }
        }
    };

    an.compositions = an.compositions || {};
    an.compositions['DAC903424E7A8A47BF57C8A648F8ADF8'] = {
        getStage: function () { return exportRoot.getStage(); },
        getLibrary: function () { return lib; },
        getSpriteSheet: function () { return ss; },
        getImages: function () { return img; }
    };

    an.compositionLoaded = function (id) {
        an.bootcompsLoaded.push(id);
        for (var j = 0; j < an.bootstrapListeners.length; j++) {
            an.bootstrapListeners[j](id);
        }
    }

    an.getComposition = function (id) {
        return an.compositions[id];
    }



})(createjs = createjs || {}, AdobeAn = AdobeAn || {});
var createjs, AdobeAn;