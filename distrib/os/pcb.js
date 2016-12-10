/*
    Process Control Block class to hold state, pid, etc.
*/
var TSOS;
(function (TSOS) {
    var PCB = (function () {
        function PCB(pcbPID, pcbpc, pcbOp, pcbAcc, pcbXReg, pcbYReg, pcbZReg, pcbState, pcbLocation, pcbStepCounter) {
            if (pcbPID === void 0) { pcbPID = 0; }
            if (pcbpc === void 0) { pcbpc = 0; }
            if (pcbOp === void 0) { pcbOp = ""; }
            if (pcbAcc === void 0) { pcbAcc = 0; }
            if (pcbXReg === void 0) { pcbXReg = 0; }
            if (pcbYReg === void 0) { pcbYReg = 0; }
            if (pcbZReg === void 0) { pcbZReg = 0; }
            if (pcbState === void 0) { pcbState = "Ready"; }
            if (pcbLocation === void 0) { pcbLocation = "Memory"; }
            if (pcbStepCounter === void 0) { pcbStepCounter = 0; }
            this.pcbPID = pcbPID;
            this.pcbpc = pcbpc;
            this.pcbOp = pcbOp;
            this.pcbAcc = pcbAcc;
            this.pcbXReg = pcbXReg;
            this.pcbYReg = pcbYReg;
            this.pcbZReg = pcbZReg;
            this.pcbState = pcbState;
            this.pcbLocation = pcbLocation;
            this.pcbStepCounter = pcbStepCounter;
        }
        PCB.prototype.init = function () {
            this.pcbPID = 0;
            this.pcbpc = 0;
            this.pcbOp = "--";
            this.pcbAcc = 0;
            this.pcbXReg = 0;
            this.pcbYReg = 0;
            this.pcbZReg = 0;
            this.pcbState = "Ready";
            this.pcbLocation = "Memory";
            this.pcbStepCounter = 0;
        };
        //prints pcb contents in pcb html table
        PCB.prototype.printPCB = function () {
            document.getElementById("pcbTable").rows[1].cells[0].innerHTML = this.pcbPID;
            document.getElementById("pcbTable").rows[1].cells[1].innerHTML = this.pcbpc;
            document.getElementById("pcbTable").rows[1].cells[2].innerHTML = this.pcbOp;
            document.getElementById("pcbTable").rows[1].cells[3].innerHTML = this.pcbAcc;
            document.getElementById("pcbTable").rows[1].cells[4].innerHTML = this.pcbXReg;
            document.getElementById("pcbTable").rows[1].cells[5].innerHTML = this.pcbYReg;
            document.getElementById("pcbTable").rows[1].cells[6].innerHTML = this.pcbZReg;
            document.getElementById("pcbTable").rows[1].cells[7].innerHTML = this.pcbState;
            //document.getElementById("pcbTable").rows[1].cells[8].innerHTML = this.pcbLocation;
        };
        //set pcb contents
        PCB.prototype.setAllPCB = function () {
            this.pcbPID = pidNum;
            this.pcbpc = pc;
            this.pcbOp = opCode;
            this.pcbAcc = _CPU.Acc;
            this.pcbXReg = _CPU.Xreg;
            this.pcbYReg = _CPU.Yreg;
            this.pcbZReg = _CPU.Zflag;
            this.pcbState = "Running";
        };
        //resets all pcb contents
        PCB.prototype.finishedPCB = function () {
            this.pcbPID = pidNum;
            this.pcbpc = 0;
            this.pcbOp = "";
            this.pcbAcc = 0;
            this.pcbXReg = 0;
            this.pcbYReg = 0;
            this.pcbZReg = 0;
            this.pcbState = "Finished";
            document.getElementById("pcbTable").rows[1].cells[0].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[1].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[2].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[3].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[4].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[5].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[6].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[7].innerHTML = "--";
        };
        return PCB;
    }());
    TSOS.PCB = PCB;
})(TSOS || (TSOS = {}));
