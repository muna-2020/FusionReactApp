var Arcadix = new Array();

var strActionMethod = '';
var objTargetElement = new Object();


function LoadInitialize(Arcadix) {
    window.angularComponentRef.zone.run(
    function () {
        window.angularComponentRef.LoadInitialize(Arcadix);
    });
}

function LoadSolution(Arcadix) {
    window.angularComponentRef.zone.run(
    function () {
        window.angularComponentRef.LoadSolution(Arcadix);
    });
}

function GetData() {
    return window.angularComponentRef.zone.run(
    function () {
        return window.angularComponentRef.GetData();
    });
}
function GetContextMenuData(objTargetElement) {
    return window.angularComponentRef.zone.run(
  function () {
      return window.angularComponentRef.GetContextMenuData(objTargetElement);
  });
}

function HidePopover() {
    return window.angularComponentRef.zone.run(
  function () {
      return window.angularComponentRef.HidePopover();
  });
}

function InvokeMethod(strActionMethod, objTargetElement) {
    window.angularComponentRef.zone.run(
    function () {
        window.angularComponentRef.InvokeMethod(strActionMethod, objTargetElement);
    });
}