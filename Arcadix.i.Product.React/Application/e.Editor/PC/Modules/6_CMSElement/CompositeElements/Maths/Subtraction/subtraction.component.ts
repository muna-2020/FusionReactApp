import {Component, NgZone} from '@angular/core';

@Component({
    selector: 'Subtraction-App',
    templateUrl: 'Subtraction.html',
    styleUrls: ['Styles/style.css']
})
export class Subtraction {
    arrnumbers = []; arrlist = [];
    marginleft; marginleftsmall;
    rowcount: number; colcount: number;
    carryoverid; resultid;
    arrcarry = []; arrresults = [];
    arrfirstnumbers = []; arrsecondnumbers = [];
    carryover = [];
    Mode; framewidth;
    showcarrypopup: boolean; showrnumberpopup: boolean;

    constructor(public zone: NgZone) {
        //to access data from outside and to expose some methods to outside world we use NgZone
        (<any>window).angularComponentRef = {
            zone: this.zone,
            LoadInitialize: (arrval) => this.LoadInitialize(arrval),
            LoadSolution: (arrsol) => this.LoadSolution(arrsol),
            GetData: () => this.GetData(),
            HidePopover: () => this.HidePopover(),
            GetContextMenuData: (objRelatedTarget) => this.GetContextMenuData(objRelatedTarget),
            InvokeMethod: (strActionMethod, objTargetElement) => this.InvokeMethod(strActionMethod, objTargetElement),
            component: this
        };
        this.carryoverid = '';
        this.resultid = '';
        this.marginleft = 0;
        this.marginleftsmall = 0;

        this.arrnumbers = [];
        this.rowcount = 2;
        this.colcount = 5;
        this.framewidth = '510';

        this.showcarrypopup = false;
        this.showrnumberpopup = false;
        this.arrfirstnumbers = [{ value: '1', id: 1 }, { value: '2', id: 2 }, { value: '3', id: 3 }, { value: '4', id: 4 }, { value: '5', id: 5 },
            { value: '6', id: 6 }];
        this.arrsecondnumbers = [{ value: '7', id: 7 }, { value: '8', id: 8 }, { value: '9', id: 9 }, { value: '0', id: 10 }, { value: '', id: 11 }];

        this.carryover = [{ value: '1', id: 101 }, { value: '', id: 111 }];
    }
    HidePopover() {
        this.showcarrypopup = false;
        this.showrnumberpopup = false;
    }
    //method to frame arraylist for loading data dynamically by giving colcount and rowcount
    FrameArrayList() {
        var arrstr = []; var strstring;
        var objstring; var objemptystr = '';
        var arrval = [];

        for (let num of this.arrnumbers) {
            strstring = new String(num);
            objstring = strstring.split("");
            var objnewstr = [];
            for (let str of objstring) {
                objnewstr.push({ value: str, id: this.getuniqueid() });
            }
            arrstr.push(objnewstr);
        }

        for (let val of arrstr) {
            var arrlen = val.length;
            let arrnew = [];
            while (arrlen < this.colcount) {
                arrnew.push({ value: objemptystr, id: this.getuniqueid() });
                arrlen++;
            }
            if (arrlen > this.colcount) {
                val.splice(this.colcount, (arrlen - this.colcount));
                arrval.push(val);
            }
            else {
                //javascript with ecmascript 6 standard which is supported by chrome and ff and ie edge, can use the spread operator(...)
                arrnew.push(...val);
                arrval.push(arrnew);
            }
        }

        var arrlistlength = arrval.length;
        while (arrlistlength < this.rowcount) {
            var objarray = [];
            for (var iarray = 0; iarray < this.colcount; iarray++) {
                objarray.push({ value: objemptystr, id: this.getuniqueid() });
            }
            arrval.push(objarray);
            arrlistlength++;
        }
        this.arrlist = arrval;

        let carrylength = (this.colcount) - 1;
        this.arrcarry = []; this.arrresults = [];

        for (var j = 0; j < carrylength; j++) {
            this.arrcarry.push({
                carryval: '',
                carryid: this.getuniqueid()
            });
        }
        for (var k = 0; k < this.colcount; k++) {
            this.arrresults.push({
                value: '',
                resultid: this.getuniqueid()
            });
        }
        if (this.Mode == 'Edit') {
            this.validate(true);
        }
    }
    numchange(ev) {
        this.UpdateOfficeRibbonData();
    }
    LoadInitialize(arrayinitialise) {
        for (var strkey in arrayinitialise) {
            if (strkey == 'InitialArcadix_Numbers') {
                this.arrnumbers = arrayinitialise['InitialArcadix_Numbers'];
            }
            else if (strkey == 'InitialArcadix_RowCount') {
                this.rowcount = Number(arrayinitialise['InitialArcadix_RowCount']);
            }
            else if (strkey == 'InitialArcadix_ColumnCount') {
                this.colcount = Number(arrayinitialise['InitialArcadix_ColumnCount']);
            }
            else if (strkey == 'InitialArcadix_Mode') {
                this.Mode = arrayinitialise['InitialArcadix_Mode'];
            }
        }
        this.FrameArrayList();
    }
    LoadSolution(arraysolution) {
        var objcarry = ''; var objresults = '';
        for (var strkey in arraysolution) {
            if (strkey == 'InitialArcadix_Numbers') {
                this.arrnumbers = arraysolution['InitialArcadix_Numbers'];
            }
            else if (strkey == 'InitialArcadix_RowCount') {
                this.rowcount = Number(arraysolution['InitialArcadix_RowCount']);
            }
            else if (strkey == 'InitialArcadix_ColumnCount') {
                this.colcount = Number(arraysolution['InitialArcadix_ColumnCount']);
            }
            else if (strkey == 'InitialArcadix_Mode') {
                this.Mode = arraysolution['InitialArcadix_Mode'];
            }
            else if (strkey == 'ResultArcadix_CarryOver') {
                try {
                    objcarry = JSON.parse(arraysolution['ResultArcadix_CarryOver'].replace(/'/g, '"'));
                }
                catch (err) {
                    objcarry = arraysolution['ResultArcadix_CarryOver'];
                }
            }
            else if (strkey == 'ResultArcadix_ResultValue') {
                try {
                    objresults = JSON.parse(arraysolution['ResultArcadix_ResultValue'].replace(/'/g, '"'));
                }
                catch (err) {
                    objresults = arraysolution['ResultArcadix_ResultValue'];
                }
            }
        }
        if (this.colcount == 1) {
            objcarry = '';
        }
        this.FrameArrayList();
        this.framecarryoverdata(objcarry);
        this.frameresultsdata(objresults);
    }
    GetData() {
        var objarcadix = new Array();
        var objarraynumbers = this.getarraydata(this.arrlist);
        var objarrcarry = this.getcarrydata(this.arrcarry);
        var objarranswer = this.getresultdata(this.arrresults);

        objarcadix['InitialArcadix_Numbers'] = objarraynumbers;
        objarcadix['InitialArcadix_RowCount'] = this.rowcount;
        objarcadix['InitialArcadix_ColumnCount'] = this.colcount;
        objarcadix['InitialArcadix_Mode'] = this.Mode;
        objarcadix['InitialArcadix_FrameWidth'] = this.framewidth;
        objarcadix['ResultArcadix_CarryOver'] = objarrcarry;
        objarcadix['ResultArcadix_ResultValue'] = objarranswer;
        return objarcadix;
    }
    GetContextMenuData(objRelatedTarget) {
        var strContextMenuData = '';
        if (objRelatedTarget != null && objRelatedTarget != undefined) {
            if (objRelatedTarget.tagName.toUpperCase() == "INPUT") {
                if (this.colcount > 2) {
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddColumn', ContextMenuAction: 'JConstruct_AddColumn', ContextMenuKey: 'AddColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 3, cIsCommitted: 'Y', Id: 00102, PId: 0 },";
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'DeleteColumn', ContextMenuAction: 'JConstruct_DeleteColumn', ContextMenuKey: 'DeleteColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 4, cIsCommitted: 'Y', Id: 00103, PId: 0 }";
                }
                else if (this.colcount == 2) {
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddColumn', ContextMenuAction: 'JConstruct_AddColumn', ContextMenuKey: 'AddColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 3, cIsCommitted: 'Y', Id: 00102, PId: 0 }";
                }
            }
        }
        return strContextMenuData;
    }
    InvokeMethod(strActionMethod, objTargetElement) {
        if (strActionMethod == 'AddColumn') {
            this.AddColumn(objTargetElement);

        }
        else if (strActionMethod == 'DeleteColumn') {
            this.DeleteColumn(objTargetElement);
        }

    }
    //Context Menu Actions
    AddColumn(objTargetElement) {
        var strid = objTargetElement.id;
        var ypos = 0; var blnisinserted = false;
        var objval = { value: '0', id: this.getuniqueid() };

        for (let x = 0; x < this.arrlist.length; x++) {
            var objrow = this.arrlist[x];
            for (let y = 0; y < objrow.length; y++) {
                if ('txt_' + objrow[y].id == strid) {
                    objrow.splice((y + 1), 0, objval);
                    ypos = y + 1;
                    blnisinserted = true;
                    this.colcount = this.colcount + 1;
                    break;
                }
            }
            if (blnisinserted) {
                break;
            }
        }
        if (blnisinserted) {
            var objnewval = { value: '0', id: this.getuniqueid() }
            var reflength = this.arrlist[0].length;
            var secnumlength = this.arrlist[1].length;
            if (this.arrlist[0].length > this.arrlist[1].length) {
                while (secnumlength < reflength) {
                    this.arrlist[1].splice(ypos, 0, objnewval);
                    secnumlength++;
                }
            }
            else if (this.arrlist[1].length > this.arrlist[0].length) {
                while (reflength < secnumlength) {
                    this.arrlist[0].splice(ypos, 0, objnewval);
                    reflength++;
                }
            }
        }
        this.arrcarry = []; this.arrresults = [];
        for (var j = 0; j < (this.colcount - 1); j++) {
            this.arrcarry.push({
                carryval: '',
                carryid: this.getuniqueid()
            });
        }
        for (var k = 0; k < this.colcount; k++) {
            this.arrresults.push({
                value: '',
                resultid: this.getuniqueid()
            });
        }
        this.validate(true);
    }
    DeleteColumn(objTargetElement) {
        var strid = objTargetElement.id;
        var blnisdeleted = false; var ypos = 0;
        for (let x = 0; x < this.arrlist.length; x++) {
            var objrow = this.arrlist[x];
            for (let y = 0; y < objrow.length; y++) {
                if ('txt_' + objrow[y].id == strid) {
                    objrow.splice(y, 1); ypos = y;
                    blnisdeleted = true;
                    this.colcount = this.colcount - 1;
                    break;
                }
                if (blnisdeleted) {
                    break;
                }
            }
        }
        if (blnisdeleted) {
            var reflength = this.arrlist[0].length;
            var secnumlength = this.arrlist[1].length;
            if (reflength > secnumlength) {
                while (reflength > secnumlength) {
                    this.arrlist[0].splice(ypos, 1);
                    reflength--;
                }
            }
            else if (secnumlength > reflength) {
                while (secnumlength > reflength) {
                    this.arrlist[1].splice(ypos, 1);
                    secnumlength--;
                }
            }
        }
        this.arrcarry = []; this.arrresults = [];
        for (var j = 0; j < (this.colcount - 1); j++) {
            this.arrcarry.push({
                carryval: '',
                carryid: this.getuniqueid()
            });
        }
        for (var k = 0; k < this.colcount; k++) {
            this.arrresults.push({
                value: '',
                resultid: this.getuniqueid()
            });
        }
        this.validate(true);
    }

    getarraydata(arraylist) {
        var objarrlist = [];
        for (var i = 0; i < arraylist.length; i++) {
            var arrInnerArray = arraylist[i];
            var strValue = "";
            for (var j = 0; j < arrInnerArray.length; j++) {
                if (arrInnerArray[j].value != '' && arrInnerArray[j].value != null) {
                    strValue += arrInnerArray[j].value;
                }
            }
            objarrlist.push(strValue);
        }
        return objarrlist;
    }
    getresultdata(arrresults) {
        var arrresultsdata = [];
        var blnzeroesadded = true;
        for (var j = 0; j < arrresults.length; j++) {
            var objvalue = arrresults[j].value;
            if (objvalue == '0' && blnzeroesadded) {
                arrresultsdata.push('');
            }
            else if (objvalue == '0' && !blnzeroesadded) {
                arrresultsdata.push(arrresults[j].value);
            }
            else if (objvalue != '0' && objvalue != '') {
                blnzeroesadded = false;
                arrresultsdata.push(objvalue);
            }
            else if (objvalue == '' && blnzeroesadded) {
                blnzeroesadded = true;
                arrresultsdata.push(objvalue);
            }
            else if (objvalue == '' && !blnzeroesadded) {
                blnzeroesadded = false;
                arrresultsdata.push(objvalue);
            }
        }
        return arrresultsdata;
    }
    getcarrydata(arrcarry) {
        var arrcarrydata = [];
        for (var j = 0; j < arrcarry.length; j++) {
            arrcarrydata.push(arrcarry[j].carryval.toString());
        }
        return arrcarrydata;
    }
    framecarryoverdata(arrobjcarry) {
        this.arrcarry = [];
        for (let k = 0; k < arrobjcarry.length; k++) {
            this.arrcarry.push({
                carryval: arrobjcarry[k],
                carryid: this.getuniqueid()
            });
        }
    }
    frameresultsdata(arrobjresults) {
        this.arrresults = [];
        for (let x = 0; x < arrobjresults.length; x++) {
            this.arrresults.push({
                value: arrobjresults[x],
                resultid: this.getuniqueid()
            });
        }
    }
    UpdateOfficeRibbonData() {
        if ((<any>window).parent.parent.JEditorWorkArea_AddToCollection != undefined && (<any>window).parent.parent.JEditorWorkArea_AddToCollection != null) {
            (<any>window).parent.parent.JEditorWorkArea_AddToCollection();
        }
    }
    validate(blnisadd: boolean) {
        var objarray = []; var arrsubval = [];
        for (let num of this.arrlist) {
            var objnum = '';
            for (let subnum of num) {
                if (subnum.value != undefined && subnum.value != null && subnum.value != '') {
                    objnum += subnum.value;
                }
                else {
                    objnum += '0';
                    subnum.value = '0';
                }
            }
            objarray.push(objnum);
        }

        // calculate result
        arrsubval = this.getresultsforsubtraction(objarray);
        if (arrsubval['IsValid'] == true) {
            var strstring;
            var objstring = [];
            strstring = new String(arrsubval['ResultValue']);
            objstring = strstring.split("");
            while (objstring.length < this.arrresults.length) {
                objstring.unshift('');
            }
            for (var j = objstring.length; j > 0; j--) {
                this.arrresults[j - 1].value = objstring[j - 1];
            }
            //calculate carry
            var objarrcarry = this.getcarryoverdata(objarray);
            for (var x = 0; x < objarrcarry.length; x++) {
                if (objarrcarry[x] == '0') {
                    this.arrcarry[x].carryval = '';
                }
                else
                    this.arrcarry[x].carryval = objarrcarry[x];
            }

        }
        else {
            for (var k = 0; k < this.arrresults.length; k++) {
                this.arrresults[k].value = '';
            }
            for (var y = 0; y < this.arrcarry.length; y++) {
                this.arrcarry[y].carryval = '';
            }
        }
         //to calculate iframe width
        var collength = this.arrresults.length;
        this.framewidth = (320 + (35 * collength)).toString();

        if (blnisadd) {
            this.UpdateOfficeRibbonData();
        }
    }
    getresultsforsubtraction(objarray) {
        let blnischecked = true; var objresult = 0;
        var arrvalues = [];
        var subno = 0;
        for (var x = 0; x < objarray.length; x++) {
            if (objarray[x + 1] != undefined) {
                var objrefno = Number(objarray[x]);
                var objnextno = Number(objarray[x + 1]);

                if (x == 0) {
                    if (Number(objarray[x + 1]) > Number(objarray[x])) {
                        blnischecked = false;
                        break;
                    }
                    else
                        subno = objrefno - objnextno;
                }
                else {
                    if (objnextno > subno) {
                        blnischecked = false;
                        break;
                    }
                    else
                        subno = subno - objnextno;
                }

            }
        }
        if (blnischecked) {
            for (var i = 0; i < objarray.length; i++) {
                if (i == 0) {
                    objresult = parseInt(objarray[i]);
                }
                else
                    objresult = objresult - parseInt(objarray[i]);
            }
        }
        arrvalues['IsValid'] = blnischecked;
        arrvalues['ResultValue'] = objresult;
        return arrvalues;
    }
    getcarryoverdata(objarray) {
        var arrcarry = [];
        var arrNumerator = new Array();
        var arrDenominator = new Array();
        for (var intIndex = 0; intIndex < objarray[0].length; intIndex++) {
            arrNumerator.push(objarray[0][intIndex]);
        }
        for (var intIndex = 0; intIndex < objarray[1].length; intIndex++) {
            arrDenominator.push(objarray[1][intIndex]);
        }
        for (var intIndex = arrNumerator.length - 1; intIndex >= 0; intIndex--) {
            var intRefNumber = Number(arrNumerator[intIndex]);
            var intResult = 0;
            var intBorrow = 0;

            for (var intNumberIndex = arrDenominator.length - 1; intNumberIndex >= 0; intNumberIndex--) {
                if (intIndex == intNumberIndex) {
                    var intNumberTosubtract = Number(arrDenominator[intNumberIndex]);
                    if (intRefNumber < intNumberTosubtract) {
                        intRefNumber += 10;
                        intResult = intRefNumber - intNumberTosubtract;
                        arrNumerator[intIndex - 1] = (Number(arrNumerator[intIndex - 1]) - 1).toString();
                        intBorrow = 1;
                        arrcarry.unshift(intBorrow);
                    }
                    else {
                        intBorrow = 0;
                        arrcarry.unshift(intBorrow);
                    }
                    break;
                }
            }
        }
        arrcarry.shift();
        return arrcarry;
    }

    showcarryover(carryid) {
        this.showcarrypopup = true;
        this.showrnumberpopup = false;
        this.carryoverid = carryid;
        this.marginleftsmall = 0;

        for (var y = 0; y < this.arrcarry.length; y++) {
            if (this.arrcarry[y].carryid == this.carryoverid) {
                this.marginleftsmall = 75 + (35 * y);
                break;
            }
        }
    }
    carryoverclick(carryval) {
        for (var icarry = 0; icarry < this.arrcarry.length; icarry++) {
            if (this.arrcarry[icarry].carryid == this.carryoverid) {
                this.arrcarry[icarry].carryval = carryval;
                break;
            }
        }
        this.showcarrypopup = false;
    }
    shownumbers(objresultid) {
        this.showrnumberpopup = true;
        this.showcarrypopup = false;
        this.resultid = objresultid;
        this.marginleft = 0;

        for (var x = 0; x < this.arrresults.length; x++) {
            if (this.arrresults[x].resultid == this.resultid) {
                this.marginleft = 70 + (35 * x);
                break;
            }
        }
    }
    numberspopupclick(numval) {
        for (var inum = 0; inum < this.arrresults.length; inum++) {
            if (this.arrresults[inum].resultid == this.resultid) {
                this.arrresults[inum].value = numval;
                break;
            }
        }
        this.showrnumberpopup = false;
    }
    closecarryoverpopup() {
        this.showcarrypopup = false;
    }
    closenumberpopup() {
        this.showrnumberpopup = false;
        this.marginleft = 0;
    }
    getuniqueid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

