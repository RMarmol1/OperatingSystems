/*
	Process Control Block class to hold state, pid, etc.
*/


module TSOS {
    export class PCB {
        constructor(
            public pcbPID,
            public pcbpc = 0;
            public pcbOp = "";
            public pcbAcc = 0,
            public pcbXReg = 0,
            public pcbYReg = 0,
            public pcbZReg = 0,
            public pcbState = "Running") {

        }

        public init(): void {
            this.pcbPID = 0;
            this.pcbpc = 0;
			this.pcbOp = "--";
            this.pcbAcc = 0;
            this.pcbXReg = 0;
            this.pcbYReg = 0;
            this.pcbZReg = 0;
            this.pcbState = "Running";

        }

		//prints pcb contents in pcb html table
        public printPCB() {
            document.getElementById("pcbTable").rows[1].cells[0].innerHTML = _PCB.pcbPID;
            document.getElementById("pcbTable").rows[1].cells[1].innerHTML = _PCB.pcbpc;
            document.getElementById("pcbTable").rows[1].cells[2].innerHTML = _PCB.pcbOp;
            document.getElementById("pcbTable").rows[1].cells[3].innerHTML = _PCB.pcbAcc;
            document.getElementById("pcbTable").rows[1].cells[4].innerHTML = _PCB.pcbXReg;
            document.getElementById("pcbTable").rows[1].cells[5].innerHTML = _PCB.pcbYReg;
            document.getElementById("pcbTable").rows[1].cells[6].innerHTML = _PCB.pcbZReg;
            document.getElementById("pcbTable").rows[1].cells[7].innerHTML = _PCB.pcbState;
        }

		//set pcb contents
        public setAllPCB() {
            this.pcbPID = pidNum;
            this.pcbpc = pc;
            this.pcbOp = opCode;
            this.pcbAcc = _CPU.Acc;
            this.pcbXReg = _CPU.Xreg;
            this.pcbYReg = _CPU.Yreg;
            this.pcbZReg = _CPU.Zflag;
            this.pcbState = "Running";
        }

		//resets all pcb contents
        public finishedPCB() {
            this.pcbPID = pidNum;
            this.pcbpc = 0;
            this.pcbOp = "";
            this.pcbAcc = 0;
            this.pcbXReg = 0;
            this.pcbYReg = 0;
            this.pcbZReg = 0;
            this.pcbState = "Finished";

            document.getElementById("pcbTable").rows[1].cells[0].innerHTML = _PCB.pcbPID;
            document.getElementById("pcbTable").rows[1].cells[1].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[2].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[3].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[4].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[5].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[6].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[7].innerHTML = _PCB.pcbState;
        }

    }


}
}