var Arcadix = new Array();

function LoadInitialize(Arcadix) {
    window.angularComponentRef.zone.run(
    function () {
        window.angularComponentRef.LoadInitialize(Arcadix);
    });
}



function GetSideBarData() {
    return window.angularComponentRef.zone.run(
    function () {
        return window.angularComponentRef.GetSideBarData();
    });
}

