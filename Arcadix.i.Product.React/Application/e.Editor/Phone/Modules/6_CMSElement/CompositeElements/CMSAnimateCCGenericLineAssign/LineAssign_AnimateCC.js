(function (cjs, an) {

	var p; // shortcut to reference prototypes
	var lib = {}; var ss = {}; var img = {};
	lib.ssMetadata = [];


	// symbols:



	// stage content:
	(lib.LineAssign_AnimateCC = function (mode, startPosition, loop) {
		this.initialize(mode, startPosition, loop, {});

		// timeline functions:
		this.frame_0 = function () {
			this.Arcadix = new Array();
		//	this.Arcadix["InitialArcadix_Mode"] = "Edit";
			this.Arcadix["ConfigArcadix_Mode_IsHidden"] = "Y";
			this.Arcadix['InitialArcadix_HasSidebar'] = 'Y';
			this.Arcadix['InitialArcadix_Data'] = {};
			this.Arcadix['ResultArcadix_Data'] = {};
			// this.Arcadix["ResultArcadix_Left1"] = "";
			// this.Arcadix["ConfigArcadix_Left1_IsHidden"] = "Y";
			// this.Arcadix["ResultArcadix_Left2"] = "";
			// this.Arcadix["ConfigArcadix_Left2_IsHidden"] = "Y";
			// this.Arcadix["ResultArcadix_Left3"] = "";
			// this.Arcadix["ConfigArcadix_Left3_IsHidden"] = "Y";
			// this.Arcadix["ResultArcadix_Left4"] = "";
			// this.Arcadix["ConfigArcadix_Left4_IsHidden"] = "Y";

			// this.Arcadix["ConfigArcadix_fixedCavasWidth_IsHidden"] = "Y";
			// this.Arcadix["ConfigArcadix_fixedCanvasHeight_IsHidden"] = "Y";
			// this.Arcadix["ResourceArcadix_left1Image"] = "Apple.png";
			// this.Arcadix["ConfigArcadix_left1Image_IsType"] = "Image";
			// this.Arcadix["ResourceArcadix_left2Image"] = "grapes.png";
			// this.Arcadix["ConfigArcadix_left2Image_IsType"] = "Image";
			// this.Arcadix["ResourceArcadix_left3Image"] = "orange.png";
			// this.Arcadix["ConfigArcadix_left3Image_IsType"] = "Image";
			// this.Arcadix["ResourceArcadix_left4Image"] = "papaya.png";
			// this.Arcadix["ConfigArcadix_left4Image_IsType"] = "Image";
			// this.Arcadix["ResourceArcadix_left1Text"] = "";
			// this.Arcadix["ResourceArcadix_left2Text"] = "";
			// this.Arcadix["ResourceArcadix_left3Text"] = "";
			// this.Arcadix["ResourceArcadix_left4Text"] = "";
			// this.Arcadix["ResourceArcadix_right1Text"] = "Papaya";
			// this.Arcadix["ResourceArcadix_right2Text"] = "grapes";
			// this.Arcadix["ResourceArcadix_right3Text"] = "orange";
			// this.Arcadix["ResourceArcadix_right4Text"] = "apple";
		//	var InitialArcadixData;
			
			this.Arcadix['Active_Shape'] = "";
			var Mode;
			if (!Mode) {
                Mode = 'Edit';
            }

			this.Arcadix['InitialArcadix_Mode'] = Mode;
			this.mergeJSON = function (objSideBarJSON, objAnimationJSON) {
				debugger
				var objMergeResult = {
					LeftShapes: [],
					RightShapes: []
				};
				//==================merge for images=================================
				if (objAnimationJSON && objAnimationJSON.LeftShapes && objSideBarJSON && objSideBarJSON.LeftShapes) {
					objSideBarJSON.LeftShapes.map(function (objSidebar) {
						objMergeResult.LeftShapes.push(Object.assign(objSidebar, objAnimationJSON.LeftShapes.find(function (a) { return a['LeftShapeId'] === objSidebar['LeftShapeId'] })));
					});
				} else if (objSideBarJSON && objSideBarJSON.LeftShapes) {
					objMergeResult.LeftShapes = objSideBarJSON.LeftShapes;
				}
				//==================merge for images===============end==================
				//==================merge for texts=====================================
				if (objAnimationJSON && objAnimationJSON.RightShapes && objSideBarJSON && objSideBarJSON.RightShapes) {
					objSideBarJSON.RightShapes.map(function (objSidebar) {
						objMergeResult.RightShapes.push(Object.assign(objSidebar, objAnimationJSON.RightShapes.find(function (a) { return a['RightShapeId'] === objSidebar['RightShapeId'] })));
					});
				} else if (objSideBarJSON && objSideBarJSON.RightShapes) {
					objMergeResult.RightShapes = objSideBarJSON.RightShapes;
				}
				//==================merge for texts=================end==================
				return objMergeResult;
			}
			function clearStage(){
				stage.children[createMainContainer()].removeAllChildren();
			}
			function generateLines() {
				debugger
				//=========================old code===============================================
				// if (stage.children[0].Arcadix && stage.children[0].Arcadix.InitialArcadix_Data && stage.children[0].Arcadix.InitialArcadix_Data.LeftShapes) {
				// 	var arrLeftShapes = stage.children[0].Arcadix.InitialArcadix_Data.LeftShapes;
				// 	for (var i = 0; i < arrLeftShapes.length; i++) {
				// 		if (arrLeftShapes[i].LineTo) {
				// 			var Lines = arrLeftShapes[i].LineTo;
				// 			for (var j = 0; j < Lines.length; j++) {
				// 				stage.children[0].Arcadix['Active_Shape'] = arrLeftShapes[i]['LeftShapeId'] + '_lshape';
				// 				var aObjLine = new createjs.Shape();
				// 				aObjLine.graphics.setStrokeStyle(4).beginStroke("#4d4d4d");
				// 				aObjLine['LineId'] = stage.children[0].Arcadix['Active_Shape'];
				// 				aObjLine['LineBetween'] = {
				// 					'LeftShapeId': arrLeftShapes[i].LeftShapeId.split('_')[0],
				// 					'RightShapeId': Lines[j].split('_')[0]
				// 				};
				// 				aObjLeftShape = stage.children[createMainContainer()].children.find(function (a) { return a['LeftShapeId'] === stage.children[0].Arcadix['Active_Shape'] });
				// 				aObjRightShape = stage.children[createMainContainer()].children.find(function (a) { return a['RightShapeId'] === Lines[j] + '_rshape' });
				// 				aObjLine.graphics.clear();
				// 				aObjLine.graphics.setStrokeStyle(4).beginStroke("#4d4d4d");
				// 				aObjLine.graphics.moveTo(aObjLeftShape.regX + aObjLeftShape.x, aObjLeftShape.y);
				// 				aObjLine.graphics.lineTo(aObjRightShape.x - aObjRightShape.regX, aObjRightShape.y);
				// 				aObjLine.visible = true;
				// 				stage.children[createMainContainer()].addChild(aObjLine);
				// 				// //stage.update();
				// 			}
				// 		}
				// 	}
				// 	stage.update();
				// }
				//=========================old code==========================end=====================
				updateResult();
				for(var leftShapeId in  stage.children[0].Arcadix.ResultArcadix_Data){
					if(stage.children[0].Arcadix.ResultArcadix_Data.hasOwnProperty(leftShapeId)){
						// stage.children[0].ResultArcadix_Data[prop].Lines.length
						for(var i=0; i<stage.children[0].Arcadix.ResultArcadix_Data[leftShapeId].Lines.length; i++){
							stage.children[0].Arcadix['Active_Shape'] = leftShapeId + '_lshape';
							var aObjLine = new createjs.Shape();
							aObjLine.graphics.setStrokeStyle(4).beginStroke("#4d4d4d");
							aObjLine['LineId'] = stage.children[0].Arcadix['Active_Shape'];
							aObjLine['LineBetween'] = {
								'LeftShapeId': leftShapeId.split('_')[0],
								'RightShapeId': stage.children[0].Arcadix.ResultArcadix_Data[leftShapeId].Lines[i].split('_')[0]
							};
							aObjLeftShape = stage.children[createMainContainer()].children.find(function (a) { return a['LeftShapeId'] === stage.children[0].Arcadix['Active_Shape'] });
							aObjRightShape = stage.children[createMainContainer()].children.find(function (a) { return a['RightShapeId'] === stage.children[0].Arcadix.ResultArcadix_Data[leftShapeId].Lines[i] + '_rshape' });
							aObjLine.graphics.clear();
							aObjLine.graphics.setStrokeStyle(4).beginStroke("#4d4d4d");
							aObjLine.graphics.moveTo(aObjLeftShape.regX + aObjLeftShape.x, aObjLeftShape.y);
							aObjLine.graphics.lineTo(aObjRightShape.x - aObjRightShape.regX, aObjRightShape.y);
							aObjLine.visible = true;
							stage.children[createMainContainer()].addChild(aObjLine);
						}
					}
				}
				stage.update();
			}
			function updateResult() {
				for (var leftShapeId in stage.children[0].Arcadix.ResultArcadix_Data) {
					if (stage.children[0].Arcadix && stage.children[0].Arcadix.InitialArcadix_Data && stage.children[0].Arcadix.InitialArcadix_Data.LeftShapes) {
						var intShapeIndex = stage.children[0].Arcadix.InitialArcadix_Data.LeftShapes.findIndex(function (a) { return a['LeftShapeId'] === leftShapeId })
						if (intShapeIndex == -1) {
							delete stage.children[0].Arcadix.ResultArcadix_Data[leftShapeId];
						}
					}
				}
			}
			// // // // // // // function remove
			this.generateElements = function () {
				clearStage();
				debugger
				if (stage.children[0].Arcadix['InitialArcadix_Data'] && stage.children[0].Arcadix['InitialArcadix_Data'].LeftShapes) { /// creating left side images
					for (var k = 0; k < stage.children[0].Arcadix['InitialArcadix_Data'].LeftShapes.length; k++) {
						LeftShapeCreator(stage.children[0].Arcadix['InitialArcadix_Data']['LeftShapes'][k], k);
					}
				}
				if (stage.children[0].Arcadix['InitialArcadix_Data'] && stage.children[0].Arcadix['InitialArcadix_Data'].LeftShapes) { /// creating
					for (var l = 0; l < stage.children[0].Arcadix['InitialArcadix_Data'].LeftShapes.length; l++) {
						if (stage.children[0].Arcadix['InitialArcadix_Data'].LeftShapes[l]['ObjType'] === 'Img') {
							var aObjLeftImage = new Image();
							aObjLeftImage['LeftShapeId'] = stage.children[0].Arcadix['InitialArcadix_Data'].LeftShapes[l]['LeftShapeId'] + '_img';
							aObjLeftImage['Position'] = l;
							aObjLeftImage.src = stage.children[0].Arcadix['InitialArcadix_Data'].LeftShapes[l]['Img'];
							aObjLeftImage.onload = function (event) {
								handleLeftImageLoad(event);
							}
						} else if (stage.children[0].Arcadix['InitialArcadix_Data'].LeftShapes[l]['ObjType'] === 'Text') {

						}
					}
				}

				if (stage.children[0].Arcadix['InitialArcadix_Data'] && stage.children[0].Arcadix['InitialArcadix_Data'].RightShapes) { // creating texts
					for (var j = 0; j < stage.children[0].Arcadix['InitialArcadix_Data'].RightShapes.length; j++) {
						RightShapeCreator(stage.children[0].Arcadix['InitialArcadix_Data']['RightShapes'][j], j);
					}
				}

				if (stage.children[0].Arcadix['InitialArcadix_Data'] && stage.children[0].Arcadix['InitialArcadix_Data'].RightShapes) { // creating texts
					for (var m = 0; m < stage.children[0].Arcadix['InitialArcadix_Data'].RightShapes.length; m++) {
						// RightShapeCreator(stage.children[0].Arcadix['InitialArcadix_Data']['Texts'][m], m);
						if (stage.children[0].Arcadix['InitialArcadix_Data']['RightShapes'][m]['ObjType'] === 'Text') {
							HandleRightShapes(stage.children[0].Arcadix['InitialArcadix_Data']['RightShapes'][m], m);
						} else if (stage.children[0].Arcadix['InitialArcadix_Data']['RightShapes'][m]['ObjType'] === 'Img') {

						}
					}
				}
			//	generateLines();
			}

			function LeftShapeCreator(objShape, pos) {
				debugger

				///==========updating ResultArcadix_Data===========================////
				if (stage.children[0].Arcadix.ResultArcadix_Data[String(objShape.LeftShapeId)] == undefined) {
					var objResult = {
						DispActive: false,
						Lines: []
					};
					stage.children[0].Arcadix.ResultArcadix_Data[String(objShape.LeftShapeId)] = objResult;
				}
				///==========updating ResultArcadix_Data=====================end======////

				var shpeYdist = 120;
				var aObjShape = new createjs.Shape();
				aObjShape.graphics.beginStroke("#b3b3b3").setStrokeStyle(4).beginFill("rgba(255,0,0,0.01)").drawRoundRect(55, (shpeYdist * pos), 100, 100, 6);
				aObjShape['LeftShapeId'] = objShape['LeftShapeId'] + '_lshape'; // for shape
				aObjShape.cursor = "pointer";
				aObjShape.on('pressup', function (event) {   // shape press event
					debugger
					console.log('objShape pressup', event.target);
					stage.children[0].Arcadix['Active_Shape'] = event.target['LeftShapeId'];
					var aObjAcvShapeIndx = stage.children[createMainContainer()].children.findIndex(function (a) { return a['LeftShapeId'] === event.target['LeftShapeId'].split('_lshape')[0] + '_lsa' });
					stage.children[createMainContainer()].children[aObjAcvShapeIndx].visible = true;
					
					//=======================updating ResultArcadix for display active======================
					stage.children[0].Arcadix.ResultArcadix_Data[String(objShape.LeftShapeId)]['DispActive'] = true;
					//=======================updating ResultArcadix for display active===========end===========

				});

				var aObjShapeActive = new createjs.Shape();
				aObjShapeActive.graphics.beginStroke("#000000").setStrokeStyle(4).beginFill("rgba(255,0,0,0.01)").drawRoundRect(55, (shpeYdist * pos), 100, 100, 6);
				aObjShapeActive['LeftShapeId'] = objShape['LeftShapeId'] + '_lsa'; // for shape active
				aObjShapeActive.cursor = "pointer";

				aObjShapeActive.visible = stage.children[0].Arcadix.ResultArcadix_Data[String(objShape.LeftShapeId)]['DispActive'];

				aObjShapeActive.on('pressup', function (event) {  // shape active press event
					debugger
					console.log('aObjShapeActive pressup', event.target);
					var Lines = stage.children[createMainContainer()].children.filter(function (a) {
						if (a['LineBetween'] && (a['LineBetween']['LeftShapeId'] === event.target['LeftShapeId'].split('_')[0])) {
							return true;
						} else {
							return false;
						}
					});
					for (var i = 0; i < Lines.length; i++) {
						stage.children[createMainContainer()].removeChild(Lines[i]);  // removing the lines from the main container
					}
					//=====hiding the active shape
					this.visible = false;

					//=======================updating lib for displaying active===============================
					// intLeftShapeIndex = stage.children[0].Arcadix.InitialArcadix_Data.LeftShapes.findIndex(function (a) { return a['LeftShapeId'] === event.target['LeftShapeId'].split('_')[0] });
					// stage.children[0].Arcadix.InitialArcadix_Data.LeftShapes[intLeftShapeIndex].DispActive = false;

					//========================removing lines from result on click of active shape====================//
					stage.children[0].Arcadix.ResultArcadix_Data[String(objShape.LeftShapeId)]['Lines'] = [];
					stage.children[0].Arcadix.ResultArcadix_Data[String(objShape.LeftShapeId)]['DispActive'] = false;
					//========================removing lines from result on click of active shape============end========//

					//=======================updating lib for displaying active================end===============

					//=======================updating lib for lines ===========================================
					// var intLeftShpIndx = stage.children[0].Arcadix.InitialArcadix_Data.LeftShapes.findIndex(function (a) { return a['LeftShapeId'] === event.target['LeftShapeId'].split('_')[0] });
					// stage.children[0].Arcadix.InitialArcadix_Data.LeftShapes[intLeftShpIndx].LineTo = [];
					stage.children[0].Arcadix['Active_Shape'] = '';
					//=======================updating lib for lines ===========================end================

				});
				stage.children[createMainContainer()].addChild(aObjShape, aObjShapeActive);
				stage.update();
			}


			function handleLeftImageLoad(event) {
				debugger
				var pos = Number(event.target['Position']);
			    var imgXPos =  105;
				var imgYdist =  120;
				var shapex = 102;
				var shapey = 120;
				var intimagePadding = 6;
				var imgYPos = (imgYdist * (pos + 1));
				var LeftShapeId = event.target['LeftShapeId'].split('_')[0];
				var LShapeIndex = stage.children[createMainContainer()].children.findIndex(a => a['LeftShapeId'] == LeftShapeId + '_lshape');
                var LShapeActiveIndex = stage.children[createMainContainer()].children.findIndex(a => a['LeftShapeId'] == LeftShapeId + '_lsa');
                var anobjBitmap = new createjs.Bitmap(event.target);
				anobjBitmap.regX = event.target.width /2;
				anobjBitmap.regY = event.target.height /2;
				anobjBitmap.x =  imgXPos;
				anobjBitmap.y = imgYPos + 3;
				stage.children[createMainContainer()].addChild(anobjBitmap);
				stage.children[createMainContainer()].children[LShapeIndex].graphics.clear();
				stage.children[createMainContainer()].children[LShapeIndex].graphics.beginStroke("#b3b3b3").setStrokeStyle(4).beginFill("rgba(255,0,0,0.01)").drawRoundRect(0, 0, event.target.width + intimagePadding, event.target.height + intimagePadding, 6);
				stage.children[createMainContainer()].children[LShapeIndex].cursor = 'pointer';
				stage.children[createMainContainer()].children[LShapeIndex].x = shapex;
				stage.children[createMainContainer()].children[LShapeIndex].y = shapey * (pos + 1);
				stage.children[createMainContainer()].children[LShapeIndex].regX = event.target.width / 2;
				stage.children[createMainContainer()].children[LShapeIndex].regY = event.target.height / 2;
				stage.children[createMainContainer()].children[LShapeActiveIndex].graphics.clear();
				stage.children[createMainContainer()].children[LShapeActiveIndex].graphics.beginStroke("#000000").setStrokeStyle(4).beginFill("rgba(255,0,0,0.01)").drawRoundRect(0, 0, event.target.width + intimagePadding, event.target.height + intimagePadding, 6);
				stage.children[createMainContainer()].children[LShapeActiveIndex].cursor = "pointer";
				stage.children[createMainContainer()].children[LShapeActiveIndex].x = shapex;
				stage.children[createMainContainer()].children[LShapeActiveIndex].y = shapey * (pos + 1);
				stage.children[createMainContainer()].children[LShapeActiveIndex].regX = (event.target.width + intimagePadding) / 2;
				stage.children[createMainContainer()].children[LShapeActiveIndex].regY = (event.target.height + intimagePadding) / 2;
				stage.update();
				
				if (stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'edit' || stage.children[0].Arcadix['InitialArcadix_Mode'].toLowerCase() === 'solution') {
					if (pos >= stage.children[0].Arcadix.InitialArcadix_Data.LeftShapes.length - 1) {
						generateLines();
					}
				}	
				

			}

			function RightShapeCreator(objText, pos) {
				debugger
				var intYdist = pos * 120;
				var textYPos = 120;
				var textXPos = 380;
				var shapey = 120;
				var objRightShape = new createjs.Shape();
				objRightShape.graphics.beginStroke("#b3b3b3").setStrokeStyle(4).beginFill("rgba(255,0,0,0.01)").drawRoundRect(300, intYdist, (objText.Text.length * 10) + 10, 40, 6);
				objRightShape.cursor = "pointer";
				objRightShape['RightShapeId'] = objText['RightShapeId'] + '_rshape';
				var textRight = new createjs.Text("", "bold 12px Verdana", "#000000");
				textRight.x = textXPos;
				textRight['RightShapeId'] = objText['RightShapeId'] + '_rtxt';
				textRight.y = (textYPos * (pos + 1));
				textRight.text = objText.Text;
				textRight.textAlign = "center";
				stage.children[createMainContainer()].addChild(objRightShape, textRight);
				stage.update();
			}

			function HandleRightShapes(objRightShape, pos) {
				var shapey = 120;
				var shapex = 380;
				var stagedIndex = stage.children[createMainContainer()].children.findIndex(function (a) { return a['RightShapeId'] == objRightShape['RightShapeId'] + '_rshape' });
				stage.children[createMainContainer()].children[stagedIndex].graphics.clear();
				stage.children[createMainContainer()].children[stagedIndex].graphics.beginStroke("#b3b3b3").setStrokeStyle(4).beginFill("rgba(255,0,0,0.01)").drawRoundRect(0, 0, (objRightShape.Text.replace(/\s/g, "").length * 10), 40, 6);
				stage.children[createMainContainer()].children[stagedIndex].cursor = "pointer";
				stage.children[createMainContainer()].children[stagedIndex].x = shapex;
				stage.children[createMainContainer()].children[stagedIndex].y = (shapey * (pos + 1));
					stage.children[createMainContainer()].children[stagedIndex].on('pressup', function (event) {
						debugger
						if (stage.children[0].Arcadix['Active_Shape'] != '') {
							var aObjLine = stage.children[createMainContainer()].children.find(function (a) {
								return a['LineBetween'] && (['LeftShapeId'] == stage.children[0].Arcadix['Active_Shape'].split('_')[0])
									&& a['LineBetween']['RightShapeId'] == event.target['RightShapeId'].split('_')[0];
							});
							if (!aObjLine) { /// check line between shape already exist
								console.log('pressed right shape', event.target);
								var aObjLine = new createjs.Shape();
								aObjLine.graphics.setStrokeStyle(4).beginStroke("#4d4d4d");
								aObjLine['LineId'] = stage.children[0].Arcadix['Active_Shape'];
								aObjLine['LineBetween'] = {
									'LeftShapeId': stage.children[0].Arcadix['Active_Shape'].split('_')[0],
									'RightShapeId': event.target['RightShapeId'].split('_')[0]
								};
								aObjLeftShape = stage.children[createMainContainer()].children.find(function (a) { return a['LeftShapeId'] === stage.children[0].Arcadix['Active_Shape'] });
								console.log('aObjLeftShape', aObjLeftShape);
								aObjLine.graphics.clear();
								aObjLine.graphics.setStrokeStyle(4).beginStroke("#4d4d4d");
								aObjLine.graphics.moveTo(aObjLeftShape.regX + aObjLeftShape.x, aObjLeftShape.y);
								aObjLine.graphics.lineTo(event.target.x - event.target.regX, event.target.y);
								aObjLine.visible = true;
								// stage.addChild(aObjLine);
								stage.children[createMainContainer()].addChild(aObjLine);
								//=======updating lib for lines====================================//
								//var intLeftShpIndx = stage.children[0].Arcadix.InitialArcadix_Data.LeftShapes.findIndex(function (a) { return a['LeftShapeId'] === stage.children[0].Arcadix['Active_Shape'].split('_')[0] });
							//	var boolisLineExist = stage.children[0].Arcadix.InitialArcadix_Data.LeftShapes[intLeftShpIndx].LineTo.find(function (a) { return a === event.target['RightShapeId'].split('_')[0] }); // check line already exists
								var boolResultExist = stage.children[0].Arcadix.ResultArcadix_Data[String(stage.children[0].Arcadix['Active_Shape'].split('_')[0])].Lines.find(function (a) { return a === event.target['RightShapeId'].split('_')[0] })
								// if (!boolisLineExist) {
								// 	stage.children[0].Arcadix.InitialArcadix_Data.LeftShapes[intLeftShpIndx].LineTo.push(event.target['RightShapeId'].split('_')[0]);
								// }
								if (!boolResultExist) {
									stage.children[0].Arcadix.ResultArcadix_Data[String(stage.children[0].Arcadix['Active_Shape'].split('_')[0])].Lines.push(event.target['RightShapeId'].split('_')[0]);
								}
								// //=======updating lib for lines=======================end=============//
								stage.update();
							}
						}
					});
				stage.children[createMainContainer()].children[stagedIndex].regX = (objRightShape.Text.replace(/\s/g, "").length * 10) / 2;
				stage.children[createMainContainer()].children[stagedIndex].regY = 20;
				//stage.children[createMainContainer()].children[stagedIndex].setBounds(102, 82, (objRightShape.Text.replace(/\s/g, "").length * 10), 40);
				stage.update();
			}



			this.LoadInitialize = function (objData, strMode) {
				debugger
				stage.children[0].Arcadix['InitialArcadix_HasSidebar'] = 'Y';
				if (strMode == undefined || strMode == '') {
					if (!this.Arcadix['InitialArcadix_Mode'] && this.Arcadix['InitialArcadix_Mode'] != '') {
						this.Arcadix['InitialArcadix_Mode'] = 'edit';
					}
					var objsidebarJSON = objData || {
						'LeftShapes': [],
						'RightShapes': []
					};
					if (objData) {
						stage.children[0].Arcadix['InitialArcadix_Data'] = this.mergeJSON(objsidebarJSON, stage.children[0].Arcadix['']);
						stage.children[0].Arcadix['InitialArcadix_Mode'] = 'edit';
					}

					if (!this.Arcadix['ResultArcadix_Data'] || this.Arcadix['ResultArcadix_Data'] == '') {
						this.Arcadix['ResultArcadix_Data'] = {};
					}
					this.generateElements();
					if (window.parent.OnConstructLoadComplete) {
						window.parent.OnConstructLoadComplete();
					}
					if (window.parent.OnAnimationLoadComplete) {
						window.parent.OnAnimationLoadComplete();
					}
				} else {
					var AnimationJSON = this.Arcadix['InitialArcadix_Data'] || {
                        'LeftShapes': [],
                        'RightShapes': []
                    
					};
					var objsidebarJSON = objData || {
						'LeftShapes': [],
						'RightShapes': []
					};
					
					   //  this.frame_0(this.mergeJSON(data, AnimationJSON), mode.toLowerCase());
					   stage.children[0].Arcadix['InitialArcadix_Data'] = this.mergeJSON(objsidebarJSON, AnimationJSON);
					
					   stage.children[0].Arcadix['InitialArcadix_Mode'] = strMode.toLowerCase();
					   //stage.update();
					   this.generateElements();
				}
				stage.update();
			}


			window.setTimeout(this.LoadInitialize.bind(this), 100);

			this.LoadSolution = function () {
				stage.children[0].Arcadix['InitialArcadix_HasSidebar'] = 'Y';
				// window.setTimeout(this.LoadSolutionExecute.bind(this), 300);
			}

			this.GetData = function () {
				return stage.children[0].Arcadix;
			}

			function createMainContainer(){

				if(!stage.children.find(function(a){return a['ContainerId'] ===  'MainContainer'})){
					var MainContainer = new createjs.Container();
					MainContainer['ContainerId'] = 'MainContainer';
					stage.addChild(MainContainer);
				}
			  return stage.children.findIndex(function(a){return a['ContainerId'] ===  'MainContainer'});
			}

			// Actions starts ////

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
					for (var j = 0, k = arrObject.length; j < k; j++) {
						if (target != null && target.parent != undefined && target.parent == arrObject[j]) {
							stage.preventSelection = true;
							break;
						}
					}
				}
			}


			stage.mouseMoveOutside = false;
			stage.enableMouseOver();
			stage.preventSelection = false;
			createjs.Touch.enable(stage);
			stage.update();
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = null;
	// library properties:
	lib.properties = {
		id: '1724F35071D0584D8995D1F781A21B82',
		width: 500,
		height: 500,
		fps: 30,
		color: "#CCCCCC",
		opacity: 0.00,
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
	an.compositions['1724F35071D0584D8995D1F781A21B82'] = {
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