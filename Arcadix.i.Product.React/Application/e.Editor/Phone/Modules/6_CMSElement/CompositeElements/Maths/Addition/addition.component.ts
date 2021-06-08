import { Component, NgZone, EventEmitter } from '@angular/core';

@Component({
    selector: 'Addition-App',
    templateUrl: 'Addition.html',
    styleUrls: ['Styles/style.css']
})
export class Addition {
    arrnumbers = []; arrlist = [];
    marginleft; marginleftsmall;
    margintop; margintopsmall;
    rowcount: number; colcount: number;
    carryoverid; resultid;
    arrcarry = []; arrresults = [];
    arrfirstrownumbers = [];
    arrsecondrownumbers = [];
    arrfirstrowcarryover = [];
    arrsecondrowcarryover = [];
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
        this.margintop = 0;
        this.margintopsmall = 0;

        this.arrnumbers = [];
        this.rowcount = 2;
        this.colcount = 5;
        this.framewidth = '510';

        this.showcarrypopup = false;
        this.showrnumberpopup = false;
        this.arrfirstrownumbers = [{ value: '1', id: 1 }, { value: '2', id: 2 }, { value: '3', id: 3 }, { value: '4', id: 4 }, { value: '5', id: 5 },
        { value: '6', id: 6 }];
        this.arrsecondrownumbers = [{ value: '7', id: 7 }, { value: '8', id: 8 }, { value: '9', id: 9 }, { value: '0', id: 10 }, { value: '', id: 11 }];

        this.arrfirstrowcarryover = [{ value: '1', id: 101 }, { value: '2', id: 102 }, { value: '3', id: 103 }, { value: '4', id: 104 }, { value: '5', id: 105 }];
        this.arrsecondrowcarryover = [{ value: '6', id: 106 }, { value: '7', id: 107 }, { value: '8', id: 108 }, { value: '9', id: 109 }, { value: '', id: 111 }];
    }
    numchange(ev) {
        this.UpdateOfficeRibbonData();
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
            //5 >3
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
        for (var k = 0; k < (this.colcount + 1); k++) {
            this.arrresults.push({
                value: '',
                resultid: this.getuniqueid()
            });
        }
        if (this.Mode == 'Edit') {
            this.validate(true);
        }

    }

    LoadInitialize(arrayinitialise) {
        var objcarry = ''; var objresults = '';
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
            else if (strkey == 'InitialArcadix_FrameWidth') {
                this.framewidth = arrayinitialise['InitialArcadix_FrameWidth'];
            }
            else if (strkey == 'ResultArcadix_CarryOver') {
                objcarry = arrayinitialise['ResultArcadix_CarryOver'];
            }
            else if (strkey == 'ResultArcadix_ResultValue') {
                objresults = arrayinitialise['ResultArcadix_ResultValue'];
            }

        }
        this.FrameArrayList();
    }
    LoadSolution(arraysolution) {
        this.showcarrypopup = false;
        this.showrnumberpopup = false;
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
        var strframewidth = this.getframewidth(this.arrresults);

        objarcadix['InitialArcadix_Numbers'] = objarraynumbers;
        objarcadix['InitialArcadix_RowCount'] = this.rowcount;
        objarcadix['InitialArcadix_ColumnCount'] = this.colcount;
        objarcadix['InitialArcadix_Mode'] = this.Mode;
        objarcadix['InitialArcadix_FrameWidth'] = strframewidth;
        objarcadix['ResultArcadix_CarryOver'] = objarrcarry;
        objarcadix['ResultArcadix_ResultValue'] = objarranswer;
        return objarcadix;
    }
    GetContextMenuData(objRelatedTarget) {
        var strContextMenuData = '';
        if (objRelatedTarget != null && objRelatedTarget != undefined) {
            if (objRelatedTarget.tagName.toUpperCase() == "INPUT") {
                if (this.rowcount > 2 && this.colcount > 2) {
                    strContextMenuData += "{ NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddRow', ContextMenuAction: 'JConstruct_AddRow', ContextMenuKey: 'AddRowConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 1, cIsCommitted: 'Y', Id: 100, PId: 0 },";
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'DeleteRow', ContextMenuAction: 'JConstruct_DeleteRow', ContextMenuKey: 'DeleteRowConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 2, cIsCommitted: 'Y', Id: 101, PId: 0 },";
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddColumn', ContextMenuAction: 'JConstruct_AddColumn', ContextMenuKey: 'AddColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 3, cIsCommitted: 'Y', Id: 102, PId: 0 },";
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'DeleteColumn', ContextMenuAction: 'JConstruct_DeleteColumn', ContextMenuKey: 'DeleteColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 4, cIsCommitted: 'Y', Id: 103, PId: 0 }";
                }
                else if (this.rowcount == 2 && this.colcount > 2) {
                    strContextMenuData += "{ NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddRow', ContextMenuAction: 'JConstruct_AddRow', ContextMenuKey: 'AddRowConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 1, cIsCommitted: 'Y', Id: 100, PId: 0 },";
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddColumn', ContextMenuAction: 'JConstruct_AddColumn', ContextMenuKey: 'AddColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 3, cIsCommitted: 'Y', Id: 102, PId: 0 },";
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'DeleteColumn', ContextMenuAction: 'JConstruct_DeleteColumn', ContextMenuKey: 'DeleteColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 4, cIsCommitted: 'Y', Id: 103, PId: 0 }";
                }
                else if (this.rowcount > 2 && this.colcount == 2) {
                    strContextMenuData += "{ NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddRow', ContextMenuAction: 'JConstruct_AddRow', ContextMenuKey: 'AddRowConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 1, cIsCommitted: 'Y', Id: 100, PId: 0 },";
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'DeleteRow', ContextMenuAction: 'JConstruct_DeleteRow', ContextMenuKey: 'DeleteRowConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 2, cIsCommitted: 'Y', Id: 101, PId: 0 },";
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddColumn', ContextMenuAction: 'JConstruct_AddColumn', ContextMenuKey: 'AddColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 3, cIsCommitted: 'Y', Id: 102, PId: 0 }";
                }
                else if (this.rowcount == 2 && this.colcount == 2) {
                    strContextMenuData += "{ NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddRow', ContextMenuAction: 'JConstruct_AddRow', ContextMenuKey: 'AddRowConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 1, cIsCommitted: 'Y', Id: 100, PId: 0 },";
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddColumn', ContextMenuAction: 'JConstruct_AddColumn', ContextMenuKey: 'AddColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 3, cIsCommitted: 'Y', Id: 102, PId: 0 }";
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
        else if (strActionMethod == 'AddRow') {
            this.AddRow();

        }
        else if (strActionMethod == 'DeleteRow') {
            this.DeleteRow();
        }
    }
    //Context Menu Actions
    AddColumn(objTargetElement) {
        var strid = objTargetElement.id;
        var ypos = 0; var xpos = 0;
        var blnisinserted = false;
        for (let x = 0; x < this.arrlist.length; x++) {
            var objrow = this.arrlist[x];
            var objval = { value: '0', id: this.getuniqueid() };
            for (let y = 0; y < objrow.length; y++) {
                if ('txt_' + objrow[y].id == strid) {
                    objrow.splice((y + 1), 0, objval);
                    ypos = y + 1; xpos = x;
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
            for (let i = 0; i < this.arrlist.length; i++) {
                var objnewval = { value: '0', id: this.getuniqueid() };
                if (i == xpos) {
                    continue;
                }
                else {
                    if (this.arrlist[i].length < this.colcount) {
                        this.arrlist[i].splice(ypos, 0, objnewval);
                    }
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
        for (var k = 0; k < this.colcount + 1; k++) {
            this.arrresults.push({
                value: '',
                resultid: this.getuniqueid()
            });
        }
        this.validate(true);
    }
    DeleteColumn(objTargetElement) {
        var strid = objTargetElement.id;
        var ypos = 0; var xpos = 0;
        var blnisdeleted = false;
        for (let x = 0; x < this.arrlist.length; x++) {
            var objrow = this.arrlist[x];
            for (let y = 0; y < objrow.length; y++) {
                if ('txt_' + objrow[y].id == strid) {
                    objrow.splice(y, 1);
                    ypos = y; xpos = x;
                    blnisdeleted = true;
                    this.colcount = this.colcount - 1;
                    break;
                }
            }
            if (blnisdeleted) {
                break;
            }
        }
        if (blnisdeleted) {
            for (let i = 0; i < this.arrlist.length; i++) {
                var objnewval = { value: '0', id: this.getuniqueid() };
                if (i == xpos) {
                    continue;
                }
                else {
                    if (this.arrlist[i].length > this.colcount) {
                        this.arrlist[i].splice(ypos, 1);
                    }
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
        for (var k = 0; k < this.colcount + 1; k++) {
            this.arrresults.push({
                value: '',
                resultid: this.getuniqueid()
            });
        }
        this.validate(true);
    }
    AddRow() {
        this.rowcount = this.rowcount + 1;
        this.updaterow('ADD');
    }
    DeleteRow() {
        if (this.arrlist.length > 2) {
            this.updaterow('DELETE');
        }
    }
    updaterow(strparam) {
        if (strparam == 'ADD') {
            var ilength = this.arrlist[0].length;
            var arrrow = [];
            for (let j = 0; j < ilength; j++) {
                arrrow.push({ value: '0', id: this.getuniqueid() });
            }
            this.arrlist.push(arrrow);
            this.UpdateOfficeRibbonData();
        }
        else if (strparam == 'DELETE') {
            this.arrlist.pop();
            this.rowcount = this.rowcount - 1;
            this.validate(true);
        }
    }
    UpdateOfficeRibbonData() {
        if ((<any>window).parent.parent.JEditorWorkArea_AddToCollection != undefined && (<any>window).parent.parent.JEditorWorkArea_AddToCollection != null) {
            (<any>window).parent.parent.JEditorWorkArea_AddToCollection();
        }
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
        var arrresultsdata = []; var blnzeroesadded = true;
        var blnzeroesbeforeemptystring = false;
        for (var j = 0; j < arrresults.length; j++) {
            var objvalue = arrresults[j].value;

            if (j == (arrresults.length - 1) && objvalue == '0' && blnzeroesadded) {
                arrresultsdata.push('0');
            }
            else if (objvalue == '0' && blnzeroesadded) {
                arrresultsdata.push('');
                blnzeroesbeforeemptystring = true;
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
                if (blnzeroesbeforeemptystring) {
                    arrresultsdata[arrresultsdata.length - 1] = '0';
                }
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
            arrcarrydata.push(arrcarry[j].carryval);
        }
        return arrcarrydata;
    }
    getframewidth(arrresults) {
        var strframewidth;
        var collength = arrresults.length;
        strframewidth = (320 + (35 * collength)).toString();
        return strframewidth;
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

    validate(blnisadd: boolean) {
        var objarray = [];
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
        //calculate carry
        var objarrcarry = this.calculatecarryover(objarray);
        for (var x = 0; x < objarrcarry.length; x++) {
            if (objarrcarry[x] == '0') {
                this.arrcarry[x].carryval = '';
            }
            else
                this.arrcarry[x].carryval = objarrcarry[x];
        }
        // calculate result
        var objresult = 0;
        for (var i = 0; i < objarray.length; i++) {
            objresult += parseInt(objarray[i]);
        }
        var strstring; var objstring = [];
        strstring = new String(objresult);
        objstring = strstring.split("");
        while (objstring.length < this.arrresults.length) {
            objstring.unshift('');
        }
        for (var j = objstring.length; j > 0; j--) {
            this.arrresults[j - 1].value = objstring[j - 1];
        }
        //to calculate iframe width
        var collength = this.arrresults.length;
        this.framewidth = (320 + (35 * collength)).toString();
        if (blnisadd) {
            this.UpdateOfficeRibbonData();
        }

    }
    calculatecarryover(objarray) {
        var arrcarry = [];
        var irem = 0;
        for (var i = objarray[0].length - 1; i >= 0; i--) {
            var itotal = 0;
            var irefno = Number(objarray[0][i]);
            itotal += irefno;

            for (var j = 0; j < objarray.length; j++) {
                if (j > 0) {
                    for (var k = objarray[j].length - 1; k >= 0; k--) {
                        if (i == k) {
                            var iaddnum = 0;
                            iaddnum += Number(objarray[j][k]);
                            itotal += iaddnum;
                            var inet = itotal + irem;
                            if (inet >= 10) {
                                if (inet == 10) {
                                    irem = 1;
                                }
                                else
                                    irem = Math.floor((inet) / 10);
                            }
                        }
                    }
                }
            }
            var intQuotient = Math.floor((inet) / 10);
            arrcarry.unshift(intQuotient);
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
                this.marginleftsmall = 75 + (35 * y);// 55 + 35*y
                this.margintopsmall = 70 + 55 * (this.rowcount - 2)
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
                this.marginleft = 25 + (35 * x);
                this.margintop = 125 + 55 * (this.rowcount - 2)
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

