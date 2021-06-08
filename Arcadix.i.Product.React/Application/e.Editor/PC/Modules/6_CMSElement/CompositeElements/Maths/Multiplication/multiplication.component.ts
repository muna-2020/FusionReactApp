import {Component, NgZone } from '@angular/core';

@Component({
    selector: 'Multiplication-App',
    templateUrl: 'Multiplication.html',
    styleUrls: ['Styles/style.css']
})

export class Multiplication {
    arrnumbers = []; arrlist = []; arrvalues = [];
    arrcarry = []; arrresults = [];
    colcount: number; Mode;
    arrfirstnum = []; arrsecondnum = [];
    showcarrypopup: boolean; showrnumberpopup: boolean; showintermediatenumberpopup: boolean;
    arrfirstnumbers = []; arrsecondnumbers = [];
    arrfirstcarryover = []; arrsecondcarryover = [];
    arrfirstinternumbers = []; arrsecondinternumbers = [];
    carryoverid; resultid; intervalid;
    marginleft; marginleftsmall; marginleftinter;
    margintop; margintopsmall; margintopinter;
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

        this.arrnumbers = [10, 10];
        this.Mode = '';//mode is either Display or Edit or Solution
        this.FrameArrayList();

        this.carryoverid = '';
        this.resultid = '';
        this.intervalid = '';
        this.marginleft = 0;
        this.marginleftsmall = 0;
        this.margintop = 0;
        this.margintopsmall = 0;
        this.margintopinter = 0;
        this.framewidth = '400';

        this.arrfirstnumbers = [{ value: '1', id: 1 }, { value: '2', id: 2 }, { value: '3', id: 3 }, { value: '4', id: 4 }, { value: '5', id: 5 },
            { value: '6', id: 6 }];
        this.arrsecondnumbers = [{ value: '7', id: 7 }, { value: '8', id: 8 }, { value: '9', id: 9 }, { value: '0', id: 10 }, { value: '', id: 11 }];


        this.arrfirstcarryover = [{ value: '1', id: 101 }, { value: '2', id: 102 }, { value: '3', id: 103 }, { value: '4', id: 104 }, { value: '5', id: 105 }];
        this.arrsecondcarryover = [{ value: '6', id: 106 }, { value: '7', id: 107 }, { value: '8', id: 108 }, { value: '9', id: 109 }, { value: '', id: 111 }];


        this.arrfirstinternumbers = [{ value: '1', id: 1 }, { value: '2', id: 2 }, { value: '3', id: 3 }, { value: '4', id: 4 }, { value: '5', id: 5 },
            { value: '6', id: 6 }];
        this.arrsecondinternumbers = [{ value: '7', id: 7 }, { value: '8', id: 8 }, { value: '9', id: 9 }, { value: '0', id: 10 }, { value: '', id: 11 }];


        this.showcarrypopup = false;
        this.showrnumberpopup = false;
        this.showintermediatenumberpopup = false;
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
    HidePopover() {
        this.showcarrypopup = false;
        this.showrnumberpopup = false;
        this.showintermediatenumberpopup = false;
    }

    FrameArrayList() {
        if (this.arrnumbers.length > 0) {
            var strfirstnum; var strsecondnum;
            this.arrfirstnum = []; this.arrsecondnum = [];
            this.arrcarry = []; this.arrresults = [];
            strfirstnum = new String(this.arrnumbers[0]);
            strsecondnum = new String(this.arrnumbers[1]);
            for (var i = 0; i < strfirstnum.length; i++) {
                this.arrfirstnum.push({ numid: this.getuniqueid(), numval: strfirstnum[i] });
            }
            for (var j = 0; j < strsecondnum.length; j++) {
                this.arrsecondnum.push({ numid: this.getuniqueid(), numval: strsecondnum[j] });
            }
            this.colcount = this.arrfirstnum.length + this.arrsecondnum.length;

            this.arrvalues = [];

            let carrylength = (this.colcount) - 1;
            while (this.arrcarry.length < carrylength) {
                this.arrcarry.push({
                    carryval: '',
                    carryid: this.getuniqueid()
                });
            }
            while (this.arrresults.length < this.colcount) {
                this.arrresults.push({
                    value: '',
                    resultid: this.getuniqueid()
                });
            }
        }
        if (this.Mode == 'Edit' || this.Mode == 'Display') {
            this.validate(true);
        }
    }
    //on pressing tab key
    addfirstnum(numid) {
        var objarrlastnumid = this.arrfirstnum[this.arrfirstnum.length - 1].numid;
        if (objarrlastnumid == numid) {
            this.arrfirstnum.push({ numid: this.getuniqueid(), numval: '' });
        }
        this.validate(true);
    }
    addsecondnum(numid) {
        var objarrlastnumid = this.arrsecondnum[this.arrsecondnum.length - 1].numid;
        if (objarrlastnumid == numid) {
            this.arrsecondnum.push({ numid: this.getuniqueid(), numval: '' });
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
            }
            //delete
            else if (event.keyCode == 46) {
                this.deletesecondnum(numid, event);
                event.stopPropagation();
            }
            else {
                //event.preventDefault();
                event.stopPropagation();
                return;
            }
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

    validate(blnisadd: boolean) {
        var ifirstno = ''; var isecondno = '';
        for (var inum = 0; inum < this.arrfirstnum.length; inum++) {
            if (this.arrfirstnum[inum].numval == '') {
                ifirstno += '0';
                this.arrfirstnum[inum].numval = '0';
            }
            else
                ifirstno += this.arrfirstnum[inum].numval;
        }
        var arrmulval = []; var arrnetval = [];
        for (var isecondnum = 0; isecondnum < this.arrsecondnum.length; isecondnum++) {
            if (this.arrsecondnum[isecondnum].numval == '') {
                isecondno = '0';
                this.arrsecondnum[isecondnum].numval = '0';
            }
            else
                isecondno = this.arrsecondnum[isecondnum].numval;


            var objmultinum = Number(isecondno);
            arrmulval.unshift(String(Number(ifirstno) * objmultinum));
        }

        for (var imulval = 0; imulval < arrmulval.length; imulval++) {
            if (imulval == 0) {
                arrnetval.unshift(arrmulval[imulval]);
            }
            else {
                var objval = arrmulval[imulval];
                for (var x = 0; x < imulval; x++) {
                    objval += '0';
                }
                arrnetval.unshift(objval);
            }
        }

        this.arrvalues = []; var objarrsplit = [];
        this.colcount = this.arrfirstnum.length + this.arrsecondnum.length;

        for (var irow = 0; irow < arrnetval.length; irow++) {
            var arrcolvalues = [];

            var strstring = new String(arrnetval[irow]);
            var objstring = strstring.split("");
            while (objstring.length < (this.arrfirstnum.length + this.arrsecondnum.length)) {
                objstring.unshift('');
            }

            for (let str of objstring) {
                if (str == '' || str == null || str == undefined) {
                    arrcolvalues.push({ number: str, numid: this.getuniqueid(), isvisible: false });
                }
                else
                    arrcolvalues.push({ number: str, numid: this.getuniqueid(), isvisible: true });
            }
            this.arrvalues.push(arrcolvalues);
        }

        let carrylength = (this.colcount) - 1;
        while (this.arrcarry.length < carrylength) {
            this.arrcarry.push({
                carryval: '',
                carryid: this.getuniqueid()
            });
        }
        if (this.arrcarry.length > carrylength) {
            this.arrcarry = [];
            while (this.arrcarry.length < carrylength) {
                this.arrcarry.push({
                    carryval: '',
                    carryid: this.getuniqueid()
                });
            }
        }
        while (this.arrresults.length < this.colcount) {
            this.arrresults.push({
                value: '',
                resultid: this.getuniqueid()
            });
        }
        if (this.arrresults.length > this.colcount) {
            this.arrresults = [];
            while (this.arrresults.length < this.colcount) {
                this.arrresults.push({
                    value: '',
                    resultid: this.getuniqueid()
                });
            }
        }

        var arrfinal = [];
        for (var y = 0; y < this.arrvalues.length; y++) {
            var arrcal = this.arrvalues[y];
            var objvar = '';
            for (var z = 0; z < arrcal.length; z++) {
                if (arrcal[z].number == '' || arrcal[z].number == undefined || arrcal[z].number == null) {
                    objvar += '0';
                }
                else
                    objvar += arrcal[z].number;
            }
            arrfinal.push(objvar);
        }

        this.calculateresults(arrfinal);
        //to calculate iframe width
        var collength = (this.arrfirstnum.length + this.arrsecondnum.length) + 1;
        this.framewidth = (320 + (32 * collength)).toString();

        if (blnisadd) {
            this.UpdateOfficeRibbonData();
        }

    }
    calculateresults(objarray) {
        var objarrcarry = this.calculatecarryover(objarray);
        for (var x = 0; x < objarrcarry.length; x++) {
            if (objarrcarry[x] == '0') {
                this.arrcarry[x].carryval = '';//0
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
    }
    calculatecarryover(objarray) {
        var arrcarry = [];
        for (var intIndex = objarray[0].length - 1; intIndex >= 0; intIndex--) {
            var intOverallAdditionNumber = 0;
            var intRefNumber = Number(objarray[0][intIndex]);

            intOverallAdditionNumber += intRefNumber;
            for (var intArrIndex = 0; intArrIndex < objarray.length; intArrIndex++) {
                if (intArrIndex > 0) {
                    for (var intNumberIndex = objarray[intArrIndex].length - 1; intNumberIndex >= 0; intNumberIndex--) {
                        if (intIndex == intNumberIndex) {
                            var intNumberToAdd = Number(objarray[intArrIndex][intNumberIndex]);
                            intOverallAdditionNumber += intNumberToAdd;
                        }
                    }
                }
            }
            var intRemainder = intOverallAdditionNumber % 10;
            var intQuotient = Math.floor(intOverallAdditionNumber / 10);
            arrcarry.unshift(intQuotient);
        }
        arrcarry.shift();
        return arrcarry;
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
        if (this.Mode == 'Display') {
            for (var i = 0; i < this.arrvalues.length; i++) {
                var objval = this.arrvalues[i];
                for (var j = 0; j < objval.length; j++) {
                    if (objval[j].isvisible) {
                        objval[j].number = '';
                    }
                }
            }
            for (var k = 0; k < this.arrresults.length; k++) {
                this.arrresults[k].value = '';
            }
            for (var x = 0; x < this.arrcarry.length; x++) {
                this.arrcarry[x].carryval = '';
            }

        }

    }
    LoadSolution(arraysolution) {
        var objcarry = '';
        var objresults = '';
        var arrintermediate = [];
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
        this.FrameArrayList();
        this.frameintermediatedata(arrintermediate);
        this.framecarryoverdata(objcarry);
        this.frameresultsdata(objresults);
    }
    GetData() {
        var objarcadix = new Array();
        var objarraynumbers = this.getarraydata();
        var objinterdata = this.getintermediatedata();
        var objarrcarry = this.getcarrydata(this.arrcarry);
        var objarranswer = this.getresultdata(this.arrresults);

        objarcadix['InitialArcadix_Numbers'] = objarraynumbers;
        objarcadix["ResultArcadix_IntermediateValue"] = objinterdata;
        objarcadix['InitialArcadix_Mode'] = this.Mode;
        objarcadix['InitialArcadix_FrameWidth'] = this.framewidth;
        objarcadix['ResultArcadix_CarryOver'] = objarrcarry;
        objarcadix['ResultArcadix_ResultValue'] = objarranswer;
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
            var objnumber = { numid: this.getuniqueid(), numval: '' };
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
                for (let j = 0; j < this.arrsecondnum.length; j++) {
                    if ('txt_' + this.arrsecondnum[j].numid == objid) {
                        this.arrsecondnum.splice((j + 1), 0, objnumber);
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
            if (arrcarry[j].carryval == '0') {
                arrcarrydata.push('');
            }
            else
                arrcarrydata.push(arrcarry[j].carryval);
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

    showcarryover(carryid) {
        this.showcarrypopup = true;
        this.showrnumberpopup = false;
        this.showintermediatenumberpopup = false;
        this.carryoverid = carryid;
        this.marginleftsmall = 0;

        for (var y = 0; y < this.arrcarry.length; y++) {
            if (this.arrcarry[y].carryid == this.carryoverid) {
                this.marginleftsmall = 30 + 30 * (y+1);// 55 + 35*y
                this.margintopsmall = 20 + 40 * (this.arrvalues.length);
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
        this.showintermediatenumberpopup = false;

        this.resultid = objresultid;
        this.marginleft = 0;

        for (var x = 0; x < this.arrresults.length; x++) {
            if (this.arrresults[x].resultid == this.resultid) {
                this.marginleft = 30 + 30 * (x + 1);;
                this.margintop = 25 + 40 * (this.arrvalues.length + 1);
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

    showinternumbers(objinterid) {
        this.showrnumberpopup = false;
        this.showcarrypopup = false;
        this.showintermediatenumberpopup = true;

        this.intervalid = objinterid;
        this.marginleft = 0;
        var rowcount = this.arrvalues.length;
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
        this.marginleftinter = 30 + 30 * (iindex + 1);
        this.margintopinter = 20 + 40 * (irowindex);
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

    closecarryoverpopup() {
        this.showcarrypopup = false;
    }
    closenumberpopup() {
        this.showrnumberpopup = false;
        this.marginleft = 0;
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

