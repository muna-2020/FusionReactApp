import {Component, NgZone} from '@angular/core';

@Component({
    selector: 'Division-App',
    templateUrl: 'Division.html',
    styleUrls: ['Styles/style.css']
})

export class Division {
    arrnumbers = []; arrvalues = [];
    arrfirstnum = []; arrsecondnum = [];
    arrfinal = new Array(); Mode = '';
    arrquotient = []; arrremainder = [];

    showquotientpopup: boolean; showrremainderpopup: boolean; showintermediatenumberpopup: boolean;
    remainderfirstnumbers = []; remaindersecondnumbers = [];
    quotientfirstnumbers = []; quotientsecondnumbers = [];
    interfirstnumbers = []; intersecondnumbers = [];
    quotientid; remainderid; intervalid;
    marginleftquo; marginleftrem; marginleftinter;
    margintopquo; margintoprem; margintopinter;
    framewidth;
    constructor(public zone: NgZone) {
        (<any>window).angularComponentRef = {
            zone: this.zone,
            LoadInitialize: (arrval) => this.LoadInitialize(arrval),
            LoadSolution: (arrsol) => this.LoadSolution(arrsol),
            GetData: () => this.GetData(),
            HidePopover: () => this.HidePopover(),
            GetContextMenuData: (objTargetElement) => this.GetContextMenuData(objTargetElement),
            InvokeMethod: (strActionMethod, objTargetElement) => this.InvokeMethod(strActionMethod, objTargetElement),
            component: this
        };
        this.arrnumbers = [25, 5];
        this.Mode = 'Edit';//mode is either Display or Edit or Solution
        this.quotientid = ''; this.remainderid = ''; this.intervalid = '';
        this.marginleftquo = 0; this.marginleftrem = 0; this.marginleftinter = 0;
        this.margintoprem = 98; this.margintopquo = 15;
        this.framewidth = '600';

        this.remainderfirstnumbers = [{ value: '1', id: 1 }, { value: '2', id: 2 }, { value: '3', id: 3 }, { value: '4', id: 4 }, { value: '5', id: 5 }];
        this.remaindersecondnumbers = [{ value: '6', id: 6 }, { value: '7', id: 7 }, { value: '8', id: 8 }, { value: '9', id: 9 }, { value: '0', id: 10 }];

        this.quotientfirstnumbers = [{ value: '1', id: 101 }, { value: '2', id: 102 }, { value: '3', id: 103 }, { value: '4', id: 104 }, { value: '5', id: 105 }];
        this.quotientsecondnumbers = [{ value: '6', id: 106 }, { value: '7', id: 107 }, { value: '8', id: 108 }, { value: '9', id: 109 }, { value: '0', id: 111 }];


        this.interfirstnumbers = [{ value: '1', id: 1 }, { value: '2', id: 2 }, { value: '3', id: 3 }, { value: '4', id: 4 }, { value: '5', id: 5 }];
        this.intersecondnumbers = [{ value: '6', id: 6 }, { value: '7', id: 7 }, { value: '8', id: 8 }, { value: '9', id: 9 }, { value: '0', id: 10 }];


        this.showquotientpopup = false;
        this.showrremainderpopup = false;
        this.showintermediatenumberpopup = false;
        this.FrameArrayList();
    }

    HidePopover() {
        this.showquotientpopup = false;
        this.showrremainderpopup = false;
        this.showintermediatenumberpopup = false;
    }
    FrameArrayList() {
        var strfirstnum; var strsecondnum;
        this.arrvalues = [];

        if (this.arrnumbers.length > 0) {
            this.arrfirstnum = []; this.arrsecondnum = [];
            strfirstnum = new String(this.arrnumbers[0]);
            strsecondnum = new String(this.arrnumbers[1]);
            for (var i = 0; i < strfirstnum.length; i++) {
                this.arrfirstnum.push({ numid: this.getuniqueid(), numval: strfirstnum[i] });
            }
            for (var j = 0; j < strsecondnum.length; j++) {
                this.arrsecondnum.push({ numid: this.getuniqueid(), numval: strsecondnum[j] });
            }
        }
        //check for division by 0
        if (Number(this.arrnumbers[1]) != 0) {
            if (this.Mode != 'Solution' && this.Mode != '' && this.Mode != null && this.Mode != undefined) {
                this.calculatevalue(strfirstnum, strsecondnum, 0, '');

                this.arrquotient = []; this.arrremainder = [];
                var objquotient = String(Math.floor(Number(strfirstnum) / Number(strsecondnum)));
                var objremainder = String(Number(strfirstnum) % Number(strsecondnum));

                var objarrquotient = objquotient.split('');
                var objarrremainder = objremainder.split('');

                for (let v = 0; v < objarrquotient.length; v++) {
                    var strvalue = '';
                    if (this.Mode == 'Edit') {
                        strvalue = objarrquotient[v];
                    }
                    this.arrquotient.push({ id: this.getuniqueid(), value: strvalue });
                }
                for (let w = 0; w < objarrremainder.length; w++) {
                    var strremvalue = '';
                    if (this.Mode == 'Edit') {
                        strremvalue = objarrremainder[w];
                    }
                    this.arrremainder.push({ id: this.getuniqueid(), value: strremvalue });
                }
            }
            if (this.Mode == 'Display' && this.Mode != '' && this.Mode != null && this.Mode != undefined) {
                for (var i = 0; i < this.arrvalues.length; i++) {
                    var ival = this.arrvalues[i];
                    for (let j = 0; j < ival.length; j++) {
                        if (ival[j].isvisible) {
                            ival[j].number = '';
                        }
                    }
                }
            }
        }
        else {
            this.arrvalues = [];
            this.arrquotient = []; this.arrremainder = [];
        }
    }

    calculatevalue(strfirstnum, strsecondnum, index, strnum) {
        var strquotient = ''; var strremainder = ''; var strdividend = '';
        if (index <= strfirstnum.length + 1) {
            if (Number(strnum) >= parseInt(strsecondnum)) {
                var arrretval = this.divide(Number(strnum), Number(strsecondnum));
                strquotient += arrretval['Quotient'];
                strremainder = String(arrretval['Remainder']);
                strdividend = String(arrretval['Dividend']);

                this.arrvalues.push(this.GetRowArray(strdividend, strfirstnum.length, index - 1));
                if ((index) <= strfirstnum.length) {
                    if (strfirstnum[index] != undefined) {
                        strremainder += strfirstnum[index];
                    }
                    this.arrvalues.push(this.GetRowArray(strremainder, strfirstnum.length, index));
                    this.calculatevalue(strfirstnum, strsecondnum, index + 1, strremainder);
                }
            }
            else {
                strnum += strfirstnum[index];
                this.calculatevalue(strfirstnum, strsecondnum, index + 1, strnum);
            }
        }
    }
    GetRowArray(strremainder, intLength, intIndex) {
        var arrvalstring = strremainder.split("");
        var arrnew = [];
        for (let iarray = 0; iarray < intLength; iarray++) {
            arrnew.push({ number: '', numid: this.getuniqueid(), isvisible: false });
        }
        if (intIndex >= intLength - 1) {
            intIndex = intLength - 1;
        }
        for (let j = intIndex, i = arrvalstring.length - 1; j >= 0; j-- , i--) {
            if (i > -1 && j <= intLength - 1) {
                arrnew[j].number = arrvalstring[i];
                arrnew[j].isvisible = true;
            }
        }
        return arrnew;
    }
    divide(intfirstnum, intsecondnum) {
        var arrretvalues = [];
        var intquotient = Math.floor(intfirstnum / intsecondnum);

        var intremainder = intfirstnum % intsecondnum;
        var intnextno = intquotient * intsecondnum;
        arrretvalues['Remainder'] = intremainder;
        arrretvalues['Quotient'] = intquotient;
        arrretvalues['Dividend'] = intnextno;
        return arrretvalues;
    }
    validate(blnisadd: boolean) {
        var strfirstnum = ''; var strsecondnum = '';
        for (var inum = 0; inum < this.arrfirstnum.length; inum++) {
            if (this.arrfirstnum[inum].numval == '') {
                strfirstnum += '1';
                this.arrfirstnum[inum].numval = '0';
            }
            else
                strfirstnum += this.arrfirstnum[inum].numval;
        }
        for (var isecondnum = 0; isecondnum < this.arrsecondnum.length; isecondnum++) {

            if (this.arrsecondnum[isecondnum].numval == '') {
                strsecondnum += '1';
                this.arrsecondnum[isecondnum].numval = '1';
            }
            else
                strsecondnum += this.arrsecondnum[isecondnum].numval;
        }
        this.arrvalues = []; this.arrquotient = []; this.arrremainder = [];

        //check for division by 0
        if (Number(strsecondnum) != 0) {
            this.calculatevalue(strfirstnum, strsecondnum, 0, '');

            var objquotient = String(Math.floor(Number(strfirstnum) / Number(strsecondnum)));
            var objremainder = String(Number(strfirstnum) % Number(strsecondnum));
            var arrquotient = objquotient.split('');
            var arrremainder = objremainder.split('');
            for (let v = 0; v < arrquotient.length; v++) {

                this.arrquotient.push({ id: this.getuniqueid(), value: arrquotient[v] });
            }
            for (let w = 0; w < arrremainder.length; w++) {

                this.arrremainder.push({ id: this.getuniqueid(), value: arrremainder[w] });
            }
        }
        else {
            this.arrquotient = []; this.arrremainder = [];
            this.arrvalues = [];
        }

        //to calculate iframe width
        var collength = (this.arrfirstnum.length + this.arrsecondnum.length + this.arrquotient.length) + 2;
        this.framewidth = (320 + (35 * collength)).toString();

        if (blnisadd) {
            this.UpdateOfficeRibbonData();
        }
    }
    firstnumchange(obj) {
        this.UpdateOfficeRibbonData();
    }
    secondnumchange(obj) {
        this.UpdateOfficeRibbonData();
    }
    UpdateOfficeRibbonData() {
        if ((<any>window).parent.parent.JEditorWorkArea_AddToCollection != undefined && (<any>window).parent.parent.JEditorWorkArea_AddToCollection != null) {
            (<any>window).parent.parent.JEditorWorkArea_AddToCollection();
        }
    }

    //on pressing tab key
    addfirstnum(numid) {
        var objarrlastnumid = this.arrfirstnum[this.arrfirstnum.length - 1].numid;
        if (objarrlastnumid == numid) {
            this.arrfirstnum.push({ numid: this.getuniqueid(), numval: '0' });
        }
        this.validate(true);
    }
    addsecondnum(numid) {
        var objarrlastnumid = this.arrsecondnum[this.arrsecondnum.length - 1].numid;
        if (objarrlastnumid == numid) {
            this.arrsecondnum.push({ numid: this.getuniqueid(), numval: '1' });
        }
        this.validate(true);
    }
    // on pressing delete key
    deletefirstnum(numid, event) {
        if (this.arrfirstnum.length > 1) {
            var objSrcElement = null;
            if (event.target)
                objSrcElement = event.target;
            else if (event.srcElement)
                objSrcElement = event.srcElement;

            for (var i = 0; i < this.arrfirstnum.length; i++) {
                if (this.arrfirstnum[i].numid == numid) {
                    this.arrfirstnum.splice(i, 1);
                    objSrcElement.parentElement.previousElementSibling.firstElementChild.focus();
                    break;
                }
            }
            this.validate(true);
        }
    }

    deletesecondnum(numid, ev) {
        if (this.arrsecondnum.length > 1) {
            var objSrcElement = null;
            if (ev.target)
                objSrcElement = ev.target;
            else if (ev.srcElement)
                objSrcElement = ev.srcElement;

            for (var i = 0; i < this.arrsecondnum.length; i++) {
                if (this.arrsecondnum[i].numid == numid) {
                    this.arrsecondnum.splice(i, 1);
                    objSrcElement.parentElement.previousElementSibling.firstElementChild.focus();
                    break;
                }
            }
            this.validate(true);
        }
    }
    //on pressing backspace key
    removefirstnum(numid, event) {
        if (this.arrfirstnum.length > 1) {
            for (var j = 0; j < this.arrfirstnum.length; j++) {
                if (this.arrfirstnum[j].numid == numid) {
                    if (this.arrfirstnum[j].numval == '') {
                        this.deletefirstnum(numid, event);
                    }
                    else
                        this.arrfirstnum[j].numval = '';
                }
            }
        }
    }
    removesecondnum(numid, event) {
        if (this.arrsecondnum.length > 1) {
            for (var j = 0; j < this.arrsecondnum.length; j++) {
                if (this.arrsecondnum[j].numid == numid) {
                    if (this.arrsecondnum[j].numval == '') {
                        this.deletesecondnum(numid, event);
                    }
                    else
                        this.arrsecondnum[j].numval = '';
                }
            }
        }
    }
    //keydown event for first num
    checkfirstnum(numid, event) {
        if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
            //backspace
            if (event.keyCode == 8) {
                this.removefirstnum(numid, event);
                //event.preventDefault();
                event.stopPropagation();
            }
            //tab
            else if (event.keyCode == 9) {
                this.addfirstnum(numid);
                // event.preventDefault();
                event.stopPropagation();
            }
            //delete
            else if (event.keyCode == 46) {
                this.deletefirstnum(numid, event);
                event.stopPropagation();
            }
            else {
                //event.preventDefault();
                event.stopPropagation();
                return;
            }
        }
    }
    //keydown event for second num
    checksecondnum(numid, event) {
        if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
            //backspace
            if (event.keyCode == 8) {
                this.removesecondnum(numid, event);
                // event.preventDefault();
                event.stopPropagation();
            }
            //tab
            else if (event.keyCode == 9) {
                this.addsecondnum(numid);
                event.stopPropagation();
                //event.preventDefault();
            }
            //delete
            else if (event.keyCode == 46) {
                this.deletesecondnum(numid, event);
                event.stopPropagation();
            }
            else {
                // event.preventDefault();
                event.stopPropagation();
                return;
            }
        }
    }
    //keydown event for second num
    checkquotient(event) {
        if (event.keyCode == 8) {
            event.preventDefault();
        }
    }
    //keydown event for second num
    checkremainder(event) {
        if (event.keyCode == 8) {
            event.preventDefault();
        }
    }

    LoadInitialize(arrayinitialise) {
        for (var strkey in arrayinitialise) {
            if (strkey == 'InitialArcadix_Numbers') {
                this.arrnumbers = arrayinitialise['InitialArcadix_Numbers'];
            }

            else if (strkey == 'InitialArcadix_Mode') {
                this.Mode = arrayinitialise['InitialArcadix_Mode'];
            }
        }
        this.FrameArrayList();
    }
    LoadSolution(arraysolution) {
        var arrintermediate = []; var arrquotient = []; var arrremainder = [];

        for (var strkey in arraysolution) {
            if (strkey == 'InitialArcadix_Numbers') {
                this.arrnumbers = arraysolution['InitialArcadix_Numbers'];
            }
            else if (strkey == 'InitialArcadix_Mode') {
                this.Mode = arraysolution['InitialArcadix_Mode'];
            }
            else if (strkey == 'ResultArcadix_IntermediateValue') {
                try {
                    arrintermediate = JSON.parse(arraysolution['ResultArcadix_IntermediateValue'].replace(/'/g, '"'));
                }
                catch (err) {
                    arrintermediate = arraysolution['ResultArcadix_IntermediateValue'];
                }
            }
            else if (strkey == 'ResultArcadix_Quotient') {
                try {
                    arrquotient = JSON.parse(arraysolution['ResultArcadix_Quotient'].replace(/'/g, '"'));
                }
                catch (err) {
                    arrquotient = arraysolution['ResultArcadix_Quotient'];
                }

            }
            else if (strkey == 'ResultArcadix_Remainder') {
                try {
                    arrremainder = JSON.parse(arraysolution['ResultArcadix_Remainder'].replace(/'/g, '"'));
                }
                catch (err) {
                    arrremainder = arraysolution['ResultArcadix_Remainder'];
                }
            }
        }
        this.FrameArrayList();
        this.frameintermediatedata(arrintermediate);
        this.framequotientdata(arrquotient);
        this.frameremainderdata(arrremainder);
    }
    GetData() {
        var objarcadix = new Array();
        var objarraynumbers = this.getarraydata();
        var objinterdata = this.getintermediatedata();
        var arrquodata = this.getquotientdata(this.arrquotient);
        var arrremdata = this.getremdata(this.arrremainder);

        objarcadix['InitialArcadix_Numbers'] = objarraynumbers;
        objarcadix["ResultArcadix_IntermediateValue"] = objinterdata;
        objarcadix['InitialArcadix_Mode'] = this.Mode;
        objarcadix['InitialArcadix_FrameWidth'] = this.framewidth;
        objarcadix['ResultArcadix_Quotient'] = arrquodata;//this.quotient;
        objarcadix['ResultArcadix_Remainder'] = arrremdata;// this.remainder;
        return objarcadix;
    }
    GetContextMenuData(objTargetElement) {
        var strContextMenuData = '';
        var blnisfirstnum = false; var blnissecondnum = false;
        if (objTargetElement.id != undefined && objTargetElement.id != null && objTargetElement.id != '') {
            var objid = objTargetElement.id;
            for (let i = 0; i < this.arrfirstnum.length; i++) {
                if ('txt_' + this.arrfirstnum[i].numid == objid) {
                    blnisfirstnum = true;
                    break;
                }
            }
            for (let j = 0; j < this.arrsecondnum.length; j++) {
                if ('txt_' + this.arrsecondnum[j].numid == objid) {
                    blnissecondnum = true;
                    break;
                }
            }
            if (blnisfirstnum) {
                if (this.arrfirstnum.length > 1) {
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'DeleteColumn', ContextMenuAction: 'JConstruct_DeleteColumn', ContextMenuKey: 'DeleteColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 4, cIsCommitted: 'Y', Id: 00103, PId: 0 },";
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddColumn', ContextMenuAction: 'JConstruct_AddColumn', ContextMenuKey: 'AddColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 3, cIsCommitted: 'Y', Id: 00102, PId: 0 }";

                }
                else {
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddColumn', ContextMenuAction: 'JConstruct_AddColumn', ContextMenuKey: 'AddColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 3, cIsCommitted: 'Y', Id: 00102, PId: 0 }";
                }
            }
            else if (blnissecondnum) {
                if (this.arrsecondnum.length > 1) {
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'DeleteColumn', ContextMenuAction: 'JConstruct_DeleteColumn', ContextMenuKey: 'DeleteColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 4, cIsCommitted: 'Y', Id: 00103, PId: 0 },";
                    strContextMenuData += "{  NewContextMenu:'Y',ContextMenuItemType: 1, ContextMenuText: 'AddColumn', ContextMenuAction: 'JConstruct_AddColumn', ContextMenuKey: 'AddColumnConstructKey', ContextMenuActiveImage: '', ContextMenuInActiveImage: '', ContextMenuOrderId: 3, cIsCommitted: 'Y', Id: 00102, PId: 0 }";

                }
                else {
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

    AddColumn(objTargetElement) {
        if (objTargetElement.id != undefined && objTargetElement.id != null && objTargetElement.id != '') {
            var objid = objTargetElement.id;
            var objnumber = { numid: this.getuniqueid(), numval: '0' };
            var blnisfirstnum = false;
            var blnissecondnum = false;

            for (let i = 0; i < this.arrfirstnum.length; i++) {
                if ('txt_' + this.arrfirstnum[i].numid == objid) {
                    this.arrfirstnum.splice((i + 1), 0, objnumber);
                    blnisfirstnum = true;
                    break;
                }

            }
            if (!blnisfirstnum) {
                var objnewnumber = { numid: this.getuniqueid(), numval: '1' };
                for (let j = 0; j < this.arrsecondnum.length; j++) {
                    if ('txt_' + this.arrsecondnum[j].numid == objid) {
                        this.arrsecondnum.splice((j + 1), 0, objnewnumber);
                        blnissecondnum = true;
                        break;
                    }
                }
            }
            if (blnisfirstnum || blnissecondnum) {
                this.validate(true);
            }
        }
    }
    DeleteColumn(objTargetElement) {
        if (objTargetElement.id != undefined && objTargetElement.id != null && objTargetElement.id != '') {
            var objid = objTargetElement.id;

            var blnisfirstnum = false;
            var blnissecondnum = false;
            if (this.arrfirstnum.length > 1) {
                for (let i = 0; i < this.arrfirstnum.length; i++) {
                    if ('txt_' + this.arrfirstnum[i].numid == objid) {
                        this.arrfirstnum.splice(i, 1);
                        blnisfirstnum = true;
                        break;
                    }

                }
            }
            if (!blnisfirstnum && this.arrsecondnum.length > 1) {
                for (let j = 0; j < this.arrsecondnum.length; j++) {
                    if ('txt_' + this.arrsecondnum[j].numid == objid) {
                        this.arrsecondnum.splice(j, 1);
                        blnissecondnum = true;
                        break;
                    }
                }
            }
            if (blnisfirstnum || blnisfirstnum) {
                this.validate(true);
            }
        }
    }
    getarraydata() {
        var objarrlist = []; var strValue = ""; var strsecValue = "";
        for (var i = 0; i < this.arrfirstnum.length; i++) {
            strValue += this.arrfirstnum[i].numval;
        }
        objarrlist.push(strValue);
        for (var j = 0; j < this.arrsecondnum.length; j++) {
            strsecValue += this.arrsecondnum[j].numval;
        }
        objarrlist.push(strsecValue);
        return objarrlist;
    }
    getintermediatedata() {
        var arrinter = []; var objretval = '';
        for (let iinter = 0; iinter < this.arrvalues.length; iinter++) {
            var objval = this.arrvalues[iinter];
            var arrvalue = [];
            for (var iinerarray = 0; iinerarray < objval.length; iinerarray++) {
                arrvalue.push(objval[iinerarray].number);
            }
            arrinter.push(arrvalue);
        }
        return arrinter;
    }
    getquotientdata(arrquotient) {
        var arrquotientdata = [];
        var blnzeroesadded = true;
        for (var j = 0; j < arrquotient.length; j++) {
            var objvalue = arrquotient[j].value;
            arrquotientdata.push(objvalue);
        }
        return arrquotientdata;
    }
    getremdata(arrremainder) {
        var arrremainderdata = [];
        var blnzeroesadded = true;
        for (var k = 0; k < arrremainder.length; k++) {
            var objvalue = arrremainder[k].value;
            arrremainderdata.push(objvalue);
        }
        return arrremainderdata;
    }

    frameintermediatedata(arrintermediate) {
        this.arrvalues = [];

        var arrrow = [];
        var arrnewrow = [];
        for (let i = 0; i < arrintermediate.length; i++) {
            var arrnewcol = [];
            arrrow = arrintermediate[i];
            var blnisvisible = true;
            for (let j = 0; j < arrrow.length; j++) {
                if (arrrow[j] == '' || arrrow[j] == undefined || arrrow[j] == null) {
                    blnisvisible = false;
                }
                else
                    blnisvisible = true;

                arrnewcol.push({ number: arrrow[j], numid: this.getuniqueid(), isvisible: blnisvisible });
            }
            arrnewrow.push(arrnewcol);
        }
        this.arrvalues = arrnewrow;
    }
    framequotientdata(arrobjquo) {
        this.arrquotient = [];
        for (let k = 0; k < arrobjquo.length; k++) {
            this.arrquotient.push({
                value: arrobjquo[k],
                id: this.getuniqueid()
            });
        }
    }
    frameremainderdata(arrobjrem) {
        this.arrremainder = [];
        for (let x = 0; x < arrobjrem.length; x++) {
            this.arrremainder.push({
                value: arrobjrem[x],
                id: this.getuniqueid()
            });
        }
    }

    showquotient(quoid) {
        this.showquotientpopup = true;
        this.showrremainderpopup = false;
        this.showintermediatenumberpopup = false;
        this.quotientid = quoid;
        this.marginleftquo = 0;

        var ilength = this.arrfirstnum.length + this.arrsecondnum.length + 2;
        for (var y = 0; y < this.arrquotient.length; y++) {
            if (this.arrquotient[y].id == this.quotientid) {
                this.marginleftquo = 36 * (ilength + y + 1);
                break;
            }
        }
    }
    quotientpopupclick(quoval) {
        for (var i = 0; i < this.arrquotient.length; i++) {
            if (this.arrquotient[i].id == this.quotientid) {
                this.arrquotient[i].value = quoval;
                break;
            }
        }
        this.showquotientpopup = false;
    }

    showremainder(remid, intIndex) {
        this.showrremainderpopup = true;
        this.showquotientpopup = false;
        this.showintermediatenumberpopup = false;

        this.remainderid = remid;
        var ilength = this.arrfirstnum.length + this.arrsecondnum.length + 2;
        var intResultIndex = this.arrremainder.length - intIndex;
        if (intResultIndex > 0)
            this.marginleftrem = (36 * (ilength)) + 75 - (30 * (intResultIndex - 1));
        else
            this.marginleftrem = (36 * (ilength)) + 75 - (30);
    }
    remainderpopupclick(remval) {
        for (var j = 0; j < this.arrremainder.length; j++) {
            if (this.arrremainder[j].id == this.remainderid) {
                this.arrremainder[j].value = remval;
                break;
            }
        }
        this.showrremainderpopup = false;
    }
    showinternumbers(interid) {
        this.showquotientpopup = false;
        this.showrremainderpopup = false;
        this.showintermediatenumberpopup = true;

        this.intervalid = interid;
        var iindex = 1; var irowindex = 1;

        for (var inum = 0; inum < this.arrvalues.length; inum++) {
            var arrrow = this.arrvalues[inum];
            for (let irow = 0; irow < arrrow.length; irow++) {
                if (arrrow[irow].numid == this.intervalid) {
                    iindex = irow;
                    irowindex = inum;
                    break;
                }
            }
        }
        this.marginleftinter = 30 + 35 * (iindex);
        this.margintopinter = 55 + 40 * (irowindex);
    }
    internumberspopupclick(numval) {
        for (var inum = 0; inum < this.arrvalues.length; inum++) {
            var arrrow = this.arrvalues[inum];
            for (let irow = 0; irow < arrrow.length; irow++) {
                if (arrrow[irow].numid == this.intervalid) {
                    arrrow[irow].number = numval;
                    break;
                }
            }
        }
        this.showintermediatenumberpopup = false;
    }

    closequotientpopup() {
        this.showquotientpopup = false;
    }
    closeremainderpopup() {
        this.showrremainderpopup = false;
    }
    closeinternumberpopup() {
        this.showintermediatenumberpopup = false;
    }
    getuniqueid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}