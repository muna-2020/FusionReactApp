(function (cjs, an) {

    var p; // shortcut to reference prototypes
    var lib = {}; var ss = {}; var img = {};
    lib.ssMetadata = [];


    // symbols:
    // helper functions:



    // stage content:
    (lib.DragHtmlElements_AnimateCC_2 = function (mode, startPosition, loop) {
        this.initialize(mode, startPosition, loop, {});

        // timeline functions:
        this.frame_0 = function () {
            if (!container) {
                var container = new createjs.Container(); // globla container

            }
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

            ////////////////////////////test purpose========================
            ////var s = new XMLSerializer();
            ////var newXmlStr = s.serializeToString(stage.children[0].Arcadix.ResultArcadix_Data_Xml);
            ////console.log(newXmlStr);
            ////////////////////////////test purpose========================

            //this.Arcadix = {};
            //this.Arcadix["InitialArcadix_Data"] =
            //    {
            //        'BckgElements': [
            //            {
            //                'BckgElementId': 'Id1',
            //                'Type': 'Img',
            //                'XPosition': 488,
            //                'YPosition': 251,
            //                'Img': 'http://192.168.129.120:8082/editor/main/dragdrophtml/Elephant.png'
            //            },
            //            {   
            //                'BckgElementId': 'Id2',
            //                'Type': 'Img',
            //                'XPosition': 488,
            //                'YPosition': 251,
            //                'Img': 'http://192.168.129.120:8082/editor/main/dragdrophtml/butterfly.png'
            //            }
            //        ],
            //        'ChildElements': [
            //            {
            //                'ChildElementId': 'CId2',
            //                'Type': 'TextBox',
            //                'XPosition': 30,
            //                'YPosition': 30,
            //                'BcgElementId': 'Id1',
            //                'Status' : 'Control',
            //'Status' : 'Placeholder'
            //                'ElmXml': '<Element iElementTypeId="5" iElementType="Input" iElementId="510776" iElementAccessId="510776" cHasMeasurementPrefix=" " vMeasurementUnit="" cIsCaseSensitive="N" iWidthInPixel="15" iNumberOfInputDisplay="0" cIsNumber="Y" cIsFormula="N" cIsSimpleCalculator="N" cHasLeftFixedFormula="N" cIsEditableInput="N" iTextFieldType="4" dWrongPoint="" dNotAnsweredPoint="" dCorrectPoint=""><Value iDisplayOrder="2" vTolerance="0.00" iElementInputValueId="95116">4</Value></Element>'
            //            },
            //            {
            //                'ChildElementId': 'CId3',
            //                'Type': 'TextBox',
            //                'XPosition': 40,
            //                'YPosition': 40,
            //                'BcgElementId': 'Id1',
            //                'ElmXml': '<Element iElementTypeId="5" iElementType="Input" iElementId="510777" iElementAccessId="510776" cHasMeasurementPrefix=" " vMeasurementUnit="" cIsCaseSensitive="N" iWidthInPixel="15" iNumberOfInputDisplay="0" cIsNumber="Y" cIsFormula="N" cIsSimpleCalculator="N" cHasLeftFixedFormula="N" cIsEditableInput="N" iTextFieldType="4" dWrongPoint="" dNotAnsweredPoint="" dCorrectPoint=""><Value iDisplayOrder="2" vTolerance="0.00" iElementInputValueId="95116">4</Value></Element>'

            //            },
            //            {
            //                'ChildElementId': 'CId4',
            //                'Type': 'DropDown',
            // 'ObjType' : 'placeholder',

            //                'XPosition': 60,
            //                'YPosition': 60,
            //                'Options': ['Eye', 'Teeth', 'Tail', 'Ear', 'Leg'],
            //                'BcgElementId': 'Id1',
            //                'ElmXml': '<Element iElementTypeId="6" iElementType="Dropdown" iElementId="508255" iElementAccessId="508255" cIsRandomizedDisplay="N" cIsFixedWidth="N" iWidth="0" vDefaultText="" dCorrectPoint="" dNotAnsweredPoint="" cIsDefaultTextEmpty="Y" cHidePleaseSelect="N"><Value iDisplayOrder="1" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92426">stolz</Value><Value iDisplayOrder="2" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92427">dumm</Value><Value iDisplayOrder="3" cIsCorrectValue="Y" dWrongPoint="" iElementDropDownValueId="92428">bös</Value><Value iDisplayOrder="4" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92429">nett</Value><Value iDisplayOrder="5" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92430">frech</Value></Element>'
            //            },
            //            {
            //                'ChildElementId': 'CId5',
            //                'Type': 'DropDown',
            //                'XPosition': 60,
            //                'YPosition': 60,
            //                'Options': ['Eye', 'Teeth', 'Tail', 'Ear', 'Leg'],
            //                'BcgElementId': 'Id1',
            //                'ElmXml': '<Element iElementTypeId="6" iElementType="Dropdown" iElementId="508256" iElementAccessId="508255" cIsRandomizedDisplay="N" cIsFixedWidth="N" iWidth="0" vDefaultText="" dCorrectPoint="" dNotAnsweredPoint="" cIsDefaultTextEmpty="Y" cHidePleaseSelect="N"><Value iDisplayOrder="1" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92426">stolz</Value><Value iDisplayOrder="2" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92427">dumm</Value><Value iDisplayOrder="3" cIsCorrectValue="Y" dWrongPoint="" iElementDropDownValueId="92428">bös</Value><Value iDisplayOrder="4" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92429">nett</Value><Value iDisplayOrder="5" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92430">frech</Value></Element>'

            //            },
            //            {
            //                'ChildElementId': 'CId6',
            //                'Type': 'DropDown',
            //                'XPosition': 60,
            //                'YPosition': 60,
            //                'Options': ['Eye', 'Teeth', 'Tail', 'Ear', 'Leg'],
            //                'BcgElementId': 'Id1',
            //                'ElmXml': '<Element iElementTypeId="6" iElementType="Dropdown" iElementId="508257" iElementAccessId="508255" cIsRandomizedDisplay="N" cIsFixedWidth="N" iWidth="0" vDefaultText="" dCorrectPoint="" dNotAnsweredPoint="" cIsDefaultTextEmpty="Y" cHidePleaseSelect="N"><Value iDisplayOrder="1" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92426">stolz</Value><Value iDisplayOrder="2" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92427">dumm</Value><Value iDisplayOrder="3" cIsCorrectValue="Y" dWrongPoint="" iElementDropDownValueId="92428">bös</Value><Value iDisplayOrder="4" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92429">nett</Value><Value iDisplayOrder="5" cIsCorrectValue="N" dWrongPoint="" iElementDropDownValueId="92430">frech</Value></Element>'

            //            }
            //        ]
            //    };


            this.Arcadix = {};
            this.Arcadix['InitialArcadix_HasSidebar'] = 'Y';

            this.Arcadix['ResultArcadix_Data'] = {};
            this.Arcadix['InitialArcadix_Data'] = {
                "BckgElements": [],
                "ChildElements": []
            };

            this.Arcadix['InitialArcadix_Mode'] = 'edit';




            this.Arcadix['ResultArcadix_Data_Xml'] = '';

            this.clearStage = function () {
                container.removeAllChildren();
                stage.update();
            }

            this.clearAllElements = function () {
                debugger
                let contIndex = [];
                for (i = 0; i < stage.children.length; i++) {
                    if (i != 0) {
                        stage.children[i].removeAllChildren();
                    }
                }

            }
            this.clearBckgElements = function () {
                debugger
                if (stage.children[1]) {
                    for (let i = 0; i < stage.children[1].children.length; i++) {
                        let bckElement = stage.children[0].Arcadix['InitialArcadix_Data']['BckgElements'].find(a => a['BckgElementId'] === stage.children[1].children[i]['BckgElementId']);
                        if (!bckElement) {
                            stage.children[1].removeChildAt(i);
                        }
                    }
                }

            }
            this.clearChildElements = function () {
                debugger
                if (stage.children && stage.children.length > 2) {
                    for (let i = 2; i < stage.children.length; i++) {
                        //  try {
                        let childElement = stage.children[0].Arcadix['InitialArcadix_Data']['ChildElements'].find(a => a['ChildElementId'] === stage.children[i]['ChildElementId']);
                        //} catch (e){
                        //    console.log('index', i);
                        //}

                        if (!childElement) {
                            stage.removeChildAt(i);
                        }
                    }
                }
            }

            this.updateStage = function () {
                debugger
                this.clearBckgElements();
                this.clearChildElements();
            }

            this.generateElements = function () {
                debugger

                this.updateStage();
                //////================================================
                if (stage.children[0].Arcadix['InitialArcadix_Data'] && stage.children[0].Arcadix['InitialArcadix_Data'].BckgElements) {
                    for (let i = 0; i < stage.children[0].Arcadix['InitialArcadix_Data'].BckgElements.length; i++) {

                        let BckgElement = new Image();
                        BckgElement.src = stage.children[0].Arcadix['InitialArcadix_Data'].BckgElements[i].Img;
                        BckgElement.onload = function (event) {
                            jsonBckElementCreator(stage.children[0].Arcadix['InitialArcadix_Data'].BckgElements[i], event, stage.children[0].Arcadix['InitialArcadix_Data'].BckgElements[i].BckgElementId);
                        }
                    }

                }
                if (stage.children[0].Arcadix['InitialArcadix_Data'] && stage.children[0].Arcadix['InitialArcadix_Data'].ChildElements) {
                    debugger
                    for (let i = 0; i < stage.children[0].Arcadix['InitialArcadix_Data'].ChildElements.length; i++) {                      
                        objectCreator(stage.children[0].Arcadix['InitialArcadix_Data'].ChildElements[i]);
                    }

                }
                ////////==============test purpose==================
                var active = ''
                
                var evntSwitchImg = new Image();
                evntSwitchImg.src = 'http://localhost/Intranet/Data/Repo/Image/97/626385_Image_1.png';
                evntSwitchImg.onload = function (evnt) {
                    var evntSwitchBitmap = new createjs.Bitmap(evnt.target);
                    evntSwitchBitmap.x = 200;
                    evntSwitchBitmap.y = 50;
                    container.addChild(evntSwitchBitmap);
                    evntSwitchBitmap.on('click', function (evnt) {
                        if (active === '') {
                            active = 'pressmove';
                            for (var i = 0; i < stage.children.length; i++) {
                                if (stage.children[i].hasOwnProperty('ChildElementId')) {
                                    if (stage.children[i].children) {
                                        stage.children[i].children[0].addEventListener('pressmove', pressmoveEvt);
                                        // stage.children[i].children[0].off('dblclick', dblclickEvt);
                                    }


                                }
                            }
                        } else if (active === 'pressmove') {
                            for (var i = 0; i < stage.children.length; i++) {
                                if (stage.children[i].hasOwnProperty('ChildElementId')) {
                                    if (stage.children[i].children) {
                                        stage.children[i].children[0].addEventListener('dblclick', dblclickEvt);
                                        stage.children[i].children[0].removeEventListener('pressmove', pressmoveEvt);
                                        active = 'dblclick';
                                    }


                                }
                            }
                        } else if (active === 'dblclick') {
                            for (var i = 0; i < stage.children.length; i++) {
                                if (stage.children[i].hasOwnProperty('ChildElementId')) {
                                    if (stage.children[i].children) {
                                        stage.children[i].children[0].addEventListener('pressmove', pressmoveEvt);
                                        stage.children[i].children[0].removeEventListener('dblclick', dblclickEvt);
                                        active = 'pressmove';
                                    }


                                }
                            }
                        }

                    })
                }

                function pressmoveEvt(evt) {
                   // HtmlPlaceholder.on('pressmove', function (evt) {
                        //if (!dblClicked) {
                        var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
                        evt.currentTarget.x = p.x;
                        evt.currentTarget.y = p.y;
                        //text.x = p.x;
                        //text.y = p.y;
                        var objElement = stage.children[0].Arcadix.InitialArcadix_Data.ChildElements.find(a => a['ChildElementId'] === evt.target.ChildElementId);
                        container.setChildIndex(this, container.getNumChildren() - 1);
                        updatePosition(objElement, 'ChildElements', { x: p.x, y: p.y });
                        stage.update();
                        //}
                        //dblClicked = false;
                 //   });
                }
                function dblclickEvt(evt) {
                  //  HtmlPlaceholder.on('dblclick', function (evt) {
                      //  OpenInputPopup(this);
                  //  });
                }
                ///////============test purpose=====================


            }
            ////==============test purpose====================//
            this.LoadResult = function (data) {
                stage.children[0].Arcadix['ResultArcadix_Data_Xml'] = data;
            }

            ////==============test purpose=========end===========//

            this.LoadSolution = function () {
                console.log('running loadsolution');
                stage.children[0].Arcadix['InitialArcadix_HasSidebar'] = 'Y';
                if (stage.children[0].Arcadix['InitialArcadix_Mode'] && stage.children[0].Arcadix['InitialArcadix_Mode'] != '') {
                    if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit' || stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'solution') {
                        this.generateElements();
                    }
                }
            }


            this.LoadInitialize = function (data, mode) {
                // var data, mode;
                // this.Arcadix['InitialArcadix_Data'] = data;
                debugger
                if (mode == undefined || mode == '') {
                    if (!this.Arcadix['InitialArcadix_Mode'] && this.Arcadix['InitialArcadix_Mode'] != '') {
                        this.Arcadix['InitialArcadix_Mode'] = 'edit';
                    }
                    let sidebarJSON = data || {
                        'BckgElements': [],
                        'ChildElements': []
                    };

                    if (!this.Arcadix['ResultArcadix_Data'] || this.Arcadix['ResultArcadix_Data'] == '') {
                        this.Arcadix['ResultArcadix_Data'] = {};
                    }
                    //   this.frame_0(this.mergeJSON(data, AnimationJSON), 'edit');
                    if (data) {
                        stage.children[0].Arcadix['InitialArcadix_Data'] = this.mergeJSON(sidebarJSON, stage.children[0].Arcadix['InitialArcadix_Data']);
                        //  this.updateResult(); /// updating the InitialArcadix_Data after merging
                        stage.children[0].Arcadix['InitialArcadix_Mode'] = 'edit';
                    }

                    if (stage.children[0].Arcadix['InitialArcadix_Mode'] && stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'display') {
                        //  stage.clearAllElements();
                        this.generateElements();
                    }

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
                    let AnimationJSON = data || {
                        'BckgElements': [],
                        'ChildElements': []
                    };
                    if (!this.Arcadix['ResultArcadix_Data'] || this.Arcadix['ResultArcadix_Data'] == '') {
                        this.Arcadix['ResultArcadix_Data'] = {};
                    }
                    stage.children[0].Arcadix['InitialArcadix_Data'] = this.mergeJSON(data, AnimationJSON);
                    stage.children[0].Arcadix['InitialArcadix_Mode'] = mode.toLowerCase();

                    this.generateElements();
                    if (window.parent.OnConstructLoadComplete) {
                        window.parent.OnConstructLoadComplete();
                    }
                    if (window.parent.OnAnimationLoadComplete) {
                        window.parent.OnAnimationLoadComplete();
                    }

                }

            }
            window.setTimeout(this.LoadInitialize.bind(this), 100);
            this.mergeJSON = function (SideBarJSON, AnimationJSON) {

                if (AnimationJSON.Elements && AnimationJSON.BckgElements != null && AnimationJSON.BckgElements.length > 0) {
                    var resultObj = {
                        BckgElementId: SideBarJSON.BckgElements.map(item => {
                            return Object.assign(item, AnimationJSON.BckgElements.find(a => a['BckgElementId'] === item['BckgElementId']))
                        }), ChildElements: SideBarJSON.ChildElements.map(item => {
                            return Object.assign(item, AnimationJSON.ChildElements.find(a => a['ChildElementId'] === item['ChildElementId']))
                        })
                    }

                } else {
                    return SideBarJSON;
                }

                ////console.log('result object after merging', JSON.stringify(resultObj));
                return resultObj;
            }


            this.GetData = function () {
                //  return stage.children[0].Arcadix;
                // var returnObj = stage.children[0].Arcadix;
                var returnObj = Object.assign({}, stage.children[0].Arcadix);
                if (returnObj['InitialArcadix_Data']['ChildElements']) {
                    for (var i = 0; i < returnObj['InitialArcadix_Data']['ChildElements'].length; i++) {
                        returnObj['InitialArcadix_Data']['ChildElements'][i]['StrElmXml'] = returnObj['InitialArcadix_Data']['ChildElements'][i]['ElmXml'] ? stringifyXML(returnObj['InitialArcadix_Data']['ChildElements'][i]['ElmXml']) : '';
                    }
                    return returnObj;
                } else {
                    return stage.children[0].Arcadix;
                }


            }
            function jsonBckElementCreator(element, evt, BckgElementId) {
                if (!stage.children[1].children.find(a => a['BckgElementId'] === BckgElementId)) {
                    BckElementBitmap = new createjs.Bitmap(evt.target);
                    container.addChild(BckElementBitmap);
                    BckElementBitmap.regX = BckElementBitmap.image.width / 2 | 0;
                    BckElementBitmap.regY = BckElementBitmap.image.height / 2 | 0;
                    jsonElement = stage.children[0].Arcadix['InitialArcadix_Data']['BckgElements'].find(a => a['BckgElementId'] === BckgElementId);

                    if (jsonElement['XPosition'] && jsonElement['YPosition']) {
                        BckElementBitmap.x = jsonElement['XPosition'];
                        BckElementBitmap.y = jsonElement['YPosition'];
                    }

                    if (stage.children[0].Arcadix['InitialArcadix_Mode'] && stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit') {
                        BckElementBitmap.on('pressmove', function (evt) {
                            var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
                            evt.currentTarget.x = p.x;
                            evt.currentTarget.y = p.y;
                            updatePosition(element, 'BckgElements', evt.currentTarget);

                        });
                    }
                }

            }
            function OpenInputPopup(sourceElement,objParam) {
                window.parent.parent.LoadScripts({
                    ScriptsJSON: [window.parent.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/Objects/Element/Text/TextPopupPlugins/JInputProperty.js", window.parent.parent.JConfiguration.BaseUrl + "Applications/JIntranet/Tasks/Editor/EditorWorkArea/TextEditor/JTextEditorSidebarTemplate.js", window.parent.parent.JConfiguration.BaseUrl + "Framework/Controls/JValidator/JValidator.js"], LoadCompleteScripts: function () {
                        window.parent.parent.JLoadInputPopup(sourceElement, textPopupCallback, objParam);
                    }
                });
            }

            function updateAnswerXml(element) {
                debugger
                var parsedXml;
                if (!element['ElmXml'].URL || element['ElmXml'].URL == null) {
                    parsedXml = parseXmlStr(element['StrElmXml']);

                } else {
                    parsedXml = element['ElmXml'];
                }


                iElementId = parsedXml.getElementsByTagName("Element")[0].getAttribute('iElementId');

                iElementType = parsedXml.getElementsByTagName("Element")[0].getAttribute('iElementType');
                if (stage.children[0].Arcadix['ResultArcadix_Data_Xml'] === '' || stage.children[0].Arcadix['ResultArcadix_Data_Xml'] === undefined) {
                    stage.children[0].Arcadix['ResultArcadix_Data_Xml'] = document.implementation.createDocument("", "", null);
                    root = stage.children[0].Arcadix['ResultArcadix_Data_Xml'].createElement("AS");
                    stage.children[0].Arcadix['ResultArcadix_Data_Xml'].appendChild(root);
                }

                xmlDoc = document.implementation.createDocument("", "", null);
                let length = stage.children[0]['Arcadix']['ResultArcadix_Data_Xml'].getElementsByTagName('AS')[0].childNodes.length;
                let isExists = false;
                for (let i = 0; i < length; i++) {
                    if (stage.children[0]['Arcadix']['ResultArcadix_Data_Xml'].getElementsByTagName('AS')[0].childNodes[i].getElementsByTagName('VS')[0].innerHTML === iElementId) {
                        isExists = true;
                    }
                }
                if (!isExists) {
                    let AXml = xmlDoc.createElement("A");
                    let icXml = xmlDoc.createElement("iC");
                    icXml.setAttribute("ExclamatoryiC", '154134');
                    icXml.innerHTML = '154134';
                    let iEXml = xmlDoc.createElement("iE");
                    iEXml.innerHTML = iElementId;
                    let iETXml = xmlDoc.createElement("iET");
                    iETXml.innerHTML = iElementType;
                    let TXml = xmlDoc.createElement("T");
                    TXml.innerHTML = iElementType;
                    let CXml = xmlDoc.createElement("C");
                    CXml.innerHTML = '0';
                    let VSXml = xmlDoc.createElement("VS");
                    VSXml.setAttribute("ExclamatoryVID", '510776');
                    VSXml.setAttribute('iED', '1');
                    VSXml.setAttribute('iAC', '1');
                    AXml.appendChild(icXml);
                    AXml.appendChild(iEXml);
                    AXml.appendChild(TXml);
                    AXml.appendChild(CXml);
                    AXml.appendChild(VSXml);
                    xmlDoc.appendChild(AXml);
                    stage.children[0].Arcadix['ResultArcadix_Data_Xml'].getElementsByTagName('AS')[0].appendChild(AXml);
                }

            }
            function updateAnswerOnChange(evnt, iElementId) {
                console.log('evnt', evnt);
                //console.log(evnt);
                debugger
                for (i = 0; i < stage.children[0]['Arcadix']['ResultArcadix_Data_Xml'].getElementsByTagName('AS')[0].childNodes.length; i++) {
                    console.log("stage.children[0]['Arcadix']['ResultArcadix_Data_Xml'].getElementsByTagName('AS')[0].childNodes[i]", stage.children[0]['Arcadix']['ResultArcadix_Data_Xml'].getElementsByTagName('AS')[0].childNodes[i]);
                    if (stage.children[0]['Arcadix']['ResultArcadix_Data_Xml'].getElementsByTagName('AS')[0].childNodes[i].getElementsByTagName('iE')[0].innerHTML === evnt.currentTarget.id) {
                        stage.children[0]['Arcadix']['ResultArcadix_Data_Xml'].getElementsByTagName('AS')[0].childNodes[i].getElementsByTagName('VS')[0].innerHTML = '';
                        xmlDoc = document.implementation.createDocument("", "", null);
                        valueXml = xmlDoc.createElement('V');
                        if (evnt.target.tagName === 'SELECT') {
                            valueXml.innerHTML = evnt.currentTarget.options[evnt.currentTarget.selectedIndex].text;
                        } else {
                            valueXml.innerHTML = evnt.currentTarget.value;
                        }
                        stage.children[0]['Arcadix']['ResultArcadix_Data_Xml'].getElementsByTagName('AS')[0].childNodes[i].getElementsByTagName('VS')[0].appendChild(valueXml);
                        if (evnt.target.tagName === 'SELECT') {
                            vidXml = xmlDoc.createElement('VID');
                            vidXml.innerHTML = evnt.currentTarget.value;
                            stage.children[0]['Arcadix']['ResultArcadix_Data_Xml'].getElementsByTagName('AS')[0].childNodes[i].getElementsByTagName('VS')[0].appendChild(vidXml);
                        }
                    }
                }
            }

            function stringifyXML(xml) {
                var s = new XMLSerializer();
                var newXmlStr = s.serializeToString(xml);
                return newXmlStr;
            }


            function jsonChildElmtCreator(element) {
                updateAnswerXml(element);
                console.log('element', element);
                var parsedXml;
                if (!element['ElmXml'].URL || element['ElmXml'].URL == null) {
                    parsedXml = parseXmlStr(element['StrElmXml']);

                } else {
                    parsedXml = element['ElmXml'];
                }

                iElementId = parsedXml.getElementsByTagName("Element")[0].getAttribute('iElementId');
                iElementType = parsedXml.getElementsByTagName("Element")[0].getAttribute('iElementType');
                var inp;
                if (iElementType && iElementType === 'Input') {
                    inp = document.createElement('input');
                    inp.id = iElementId;
                    inp.setAttribute('type', 'text');
                    inp.style.position = "absolute";
                    inp.addEventListener('change', function (evt) {
                        updateAnswerOnChange(evt, iElementId);
                    });
                    inp.style.top = 0;
                    inp.style.left = 0;
                } else if (iElementType && iElementType === 'Dropdown') {
                    inp = document.createElement('select');

                    inp.id = iElementId;
                    inp.style.position = "absolute";
                    inp.style.width = '150px';
                    inp.addEventListener('change', function (evt) {
                        updateAnswerOnChange(evt, iElementId);
                    });
                    inp.style.top = 0;
                    inp.style.left = 0;
                    let options = parsedXml.getElementsByTagName("Element")[0].childNodes;
                    if (options) {
                        for (let i = 0; i < options.length; i++) {
                            var option = document.createElement("option");
                            option.setAttribute("value", options[i].getAttribute('AnswerValue'));
                            option.text = options[i].getAttribute('AnswerValue');
                            inp.appendChild(option);
                        }
                    }
                }
                console.log('inp', inp);
                document.body.appendChild(inp);
                var gg = new createjs.DOMElement(inp);
                gg.x = element['XPosition'];
                gg.y = element['YPosition'];
                container.addChild(gg);
                stage.update();
            }

            var dblClicked = false;
            function objectCreator(element) {
                if (stage.children[0].Arcadix['InitialArcadix_Mode'] && stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'display') {

                    jsonChildElmtCreator(element);

                } else {
                    if (element['ObjType'] === 'placeholder') {
                        //let ChildElement = new Image();
                        //ChildElement.src = element.Img;
                        //ChildElement.onload = function (event) {
                        jsonElementPlaceholderCreator(element);
                        // }
                    } else {
                        let ChildElement = new Image();
                        ChildElement.src = element.Img;
                        ChildElement.onload = function (event) {
                            jsonHtmlplaceholderCreator(element, event);
                        }
                    }


                }

            }
            function jsonHtmlplaceholderCreator(element, evt) {
                debugger
                //var rect = new createjs.Rectangle(0, 0, 180, 30);
                var plhldrContainer;
             

                var iElementId = element['ChildElementId'];
                if (!stage.children.find(a => a['ChildElementId'] === iElementId)) {
                    iElementType = element['Type'];
                    if (!document.getElementById(iElementId)) {
                        if (!stage.children.find(a => a['ChildElementId'] === iElementId)) {
                            plhldrContainer = new createjs.Container();
                            plhldrContainer['ChildElementId'] = iElementId;
                            if (element['XPosition'] && element['YPosition']) {
                                plhldrContainer.x = element['XPosition'];
                                plhldrContainer.y = element['YPosition'];
                            } else {
                                plhldrContainer.x = 200;
                                plhldrContainer.y = 50;
                            }

                            stage.addChild(plhldrContainer);
                        }

                        containerIndex = stage.children.findIndex(a => a['ChildElementId'] === iElementId);

                        HtmlPlaceholder = new createjs.Bitmap(evt.target);
                        HtmlPlaceholder['ChildElementId'] = element['ChildElementId'];
                        //HtmlPlaceholder.regX = HtmlPlaceholder.image.width / 2;
                        //HtmlPlaceholder.regY = HtmlPlaceholder.image.height / 2;
                       
                        stage.children[containerIndex].addChild(HtmlPlaceholder);
                
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
                            updatePosition(element, 'ChildElements', { x: p.x, y: p.y });
                            stage.update();
                            //}
                            //dblClicked = false;
                        });
                        //HtmlPlaceholder.on('pressmove', function (evt) {
                        //    //if (!dblClicked) {
                        //        var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
                        //        evt.currentTarget.x = p.x;
                        //        evt.currentTarget.y = p.y;
                        //        //text.x = p.x;
                        //        //text.y = p.y;
                        //        container.setChildIndex(this, container.getNumChildren() - 1);
                        //        updatePosition(element, 'ChildElements', { x: p.x, y: p.y });
                        //        stage.update();
                        //    //}
                        //    //dblClicked = false;
                        //});
                        stage.update();
                    }
                }

            }
            function textPopupCallback(objJson, objParam) {
                debugger
              //  var EmlXml = parseXml(JSONToXml(objJson, 'input'));
                var ElmntIndex = stage.children[0].Arcadix.InitialArcadix_Data.ChildElements.findIndex(a => a['ChildElementId'] === objParam['ChildElementId']);
                // stage.children[0].Arcadix.InitialArcadix_Data.ChildElements[ElmntIndex]['ElmXml'] = EmlXml;
                var StagedElmIndex = stage.children.findIndex(a => a['ChildElementId'] == objParam['ChildElementId']);
                stage.removeChildAt(StagedElmIndex);
                var inpHtml = getHtmlElement('textbox', objJson);
                getImgPathFromHtml(inpHtml.outerHTML, { type: 'textbox', ChildElementId: objParam['ChildElementId']} , ImagepathCallback);
            }
            function ImagepathCallback(objJson, objParams) {
                var ImgPath = objJson.ConvertHtmlToImage.ImagePath;
                var elmIndex = stage.children[0].Arcadix.InitialArcadix_Data.ChildElements.findIndex(a => a['ChildElementId'] === objParams['ChildElementId']);
                stage.children[0].Arcadix.InitialArcadix_Data.ChildElements[elmIndex]['Img'] = ImgPath;
                var newHtmlImg = new Image();
                newHtmlImg.src = ImgPath;
                newHtmlImg.onload = function (event) {
                    jsonHtmlplaceholderCreator(stage.children[0].Arcadix.InitialArcadix_Data.ChildElements[elmIndex], event);
                }

               
            }

            function getHtmlElement(iElementType,objJson) {
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

            function jsonplaceholderCreator(element) {
                var rect = new createjs.Rectangle(0, 0, 180, 30);
                var plhldrContainer;
                var parsedXml;
                if (!element['ElmXml'].URL || element['ElmXml'].URL == null) {
                    parsedXml = parseXmlStr(element['StrElmXml']);

                } else {
                    parsedXml = element['ElmXml'];
                }
                iElementId = parsedXml.getElementsByTagName("Element")[0].getAttribute('iElementId');
                if (!stage.children.find(a => a['ChildElementId'] === iElementId)) {
                    iElementType = parsedXml.getElementsByTagName("Element")[0].getAttribute('iElementType');
                    if (!document.getElementById(iElementId)) {
                        if (!stage.children.find(a => a['ChildElementId'] === iElementId)) {
                            plhldrContainer = new createjs.Container();

                            plhldrContainer['ChildElementId'] = iElementId;
                            if (element['XPosition'] && element['YPosition']) {
                                plhldrContainer.x = element['XPosition'];
                                plhldrContainer.y = element['YPosition'];
                            } else {
                                plhldrContainer.x = 100;
                                plhldrContainer.y = 50;  
                            }
                            stage.addChild(plhldrContainer);
                        }

                        containerIndex = stage.children.findIndex(a => a['ChildElementId'] === iElementId);

                        var bckgnd = new createjs.Shape();
                        bckgnd['ChildElementId'] = iElementId;

                        bckgnd.graphics.beginFill('#f2f2f2').drawRect(0, 0, rect.width, rect.height);
                        var text = new createjs.Text();
                        text.set({
                            text: iElementType,
                            textAlign: "center",
                            textBaseline: "middle",
                            x: 0,
                            y: 0  
                        });

                        bckgnd.regX = rect.width / 2;
                        bckgnd.regY = rect.height / 2;
                        stage.children[containerIndex].addChild(bckgnd, text);
                        bckgnd.on('click', function () {
                            dblClicked = true;
                            console.log(' clicked..............');
                        })
                        if (stage.children[0].Arcadix['InitialArcadix_Mode'] && stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'display') {
                            bckgnd.on('dblclick', function (evt) {
                                debugger
                                var item = stage.children.find(a => a['ChildElementId'] === evt.target.ChildElementId);
                                var stagedBckgnd = item.children[0];
                                stage.removeChild(item);
                                element['XPosition'] = stagedBckgnd.x;
                                element['YPosition'] = stagedBckgnd.y;
                                var childElementIndex = stage.children[0].Arcadix['InitialArcadix_Data']['ChildElements'].findIndex(a => a['ChildElementId'] === evt.target.ChildElementId);
                                stage.children[0].Arcadix['InitialArcadix_Data']['ChildElements'][childElementIndex]['ObjType'] = 'control';
                                jsonChildElmtCreator(element);

                            });
                        }

                        bckgnd.on('pressmove', function (evt) {
                            if (!dblClicked) {
                                var p = evt.currentTarget.parent.globalToLocal(evt.stageX, evt.stageY);
                                evt.currentTarget.x = p.x;
                                evt.currentTarget.y = p.y;
                                text.x = p.x;
                                text.y = p.y;
                                container.setChildIndex(this, container.getNumChildren() - 1);
                                updatePosition(element, 'ChildElements', { x: p.x, y: p.y });
                                stage.update();

                            }
                            dblClicked = false;
                        });
                        stage.update();
                    }
                }


            }



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
                    }

                    ElmXml.setAttribute('iElementId', parent.GetUniqueId());

                }
                // console.log(serializeXML(ElmXml));
                return parseXml(serializeXML(ElmXml));
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


            function jsonElementPlaceholderCreator(element) {
                var rect = new createjs.Rectangle(0, 0, 180, 30);
                var plhldrContainer;
                var parsedXml;
               // if (element['ElmXml'])     
                if (!element['ElmXml'].URL || element['ElmXml'].URL == null) {
                    parsedXml = parseXmlStr(element['StrElmXml']);

                } else {
                    parsedXml = element['ElmXml'];
                }
                iElementId = element['ChildElementId'];
                if (!stage.children.find(a => a['ChildElementId'] === iElementId)) {
                    iElementType = "Input";
                    if (!document.getElementById(iElementId)) {
                        if (!stage.children.find(a => a['ChildElementId'] === iElementId)) {
                            plhldrContainer = new createjs.Container();

                            plhldrContainer['ChildElementId'] = iElementId;
                            if (element['XPosition'] && element['YPosition']) {
                                plhldrContainer.x = element['XPosition'];
                                plhldrContainer.y = element['YPosition'];
                            } else {
                                plhldrContainer.x = 100;
                                plhldrContainer.y = 50;
                            }

                            stage.addChild(plhldrContainer);
                        }

                        containerIndex = stage.children.findIndex(a => a['ChildElementId'] === iElementId);

                        var bckgnd = new createjs.Shape();
                        bckgnd['ChildElementId'] = iElementId;

                        bckgnd.graphics.beginFill('#f2f2f2').drawRect(0, 0, rect.width, rect.height);
                        var text = new createjs.Text();
                        text.set({
                            text: iElementType,
                            textAlign: "center",
                            textBaseline: "middle",
                            x: 0,
                            y: 0
                        });

                        bckgnd.regX = rect.width / 2;
                        bckgnd.regY = rect.height / 2;
                        stage.children[containerIndex].addChild(bckgnd, text);
                        bckgnd.on('click', function () {
                            dblClicked = true;
                            console.log(' clicked..............');
                        })
                        //  if (stage.children[0].Arcadix['InitialArcadix_Mode'] && stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'display') {
                        bckgnd.on('dblclick', function (evt) {

                            //var item = stage.children.find(a => a['ChildElementId'] === evt.target.ChildElementId);
                            //var stagedBckgnd = item.children[0];
                            //stage.removeChild(item);
                            //element['XPosition'] = stagedBckgnd.x;
                            //element['YPosition'] = stagedBckgnd.y;
                            //var childElementIndex = stage.children[0].Arcadix['InitialArcadix_Data']['ChildElements'].findIndex(a => a['ChildElementId'] === evt.target.ChildElementId);
                            //stage.children[0].Arcadix['InitialArcadix_Data']['ChildElements'][childElementIndex]['ObjType'] = 'control';
                            //jsonChildElmtCreator(element);
                            OpenInputPopup(this, { ChildElementId: evt.target.ChildElementId });

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
                                updatePosition(element, 'ChildElements', { x: p.x, y: p.y });
                                stage.update();

                            }
                            dblClicked = false;
                        });
                        stage.update();
                    }
                } 


            }

            function updatePosition(objJsonElm, type, objevt) {
                console.log('updating position of element', objJsonElm);
                if (type === 'BckgElements') {
                    intelmIndex = stage.children[0].Arcadix['InitialArcadix_Data'][type].findIndex(a => a['BckgElementId'] === objJsonElm['BckgElementId']);
                    stage.children[0].Arcadix['InitialArcadix_Data'][type][intelmIndex]['XPosition'] = objevt.x;
                    stage.children[0].Arcadix['InitialArcadix_Data'][type][intelmIndex]['YPosition'] = objevt.y;
                }
                else if (type === 'ChildElements') {
                    intelmIndex = stage.children[0].Arcadix['InitialArcadix_Data'][type].findIndex(a => a['ChildElementId'] === objJsonElm['ChildElementId']);
                    stage.children[0].Arcadix['InitialArcadix_Data'][type][intelmIndex]['XPosition'] = objevt.x;
                    stage.children[0].Arcadix['InitialArcadix_Data'][type][intelmIndex]['YPosition'] = objevt.y;
                }
                console.log("after updating  stage.children[0].Arcadix['InitialArcadix_Data']", stage.children[0].Arcadix['InitialArcadix_Data']);
            }
            window.setTimeout(this.LoadInitialize.bind(this), 100);
            stage.addChild(container); // adding container to the stage

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