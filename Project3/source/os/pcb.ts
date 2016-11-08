/*
	Process Control Block class to hold state, pid, etc.
*/


module TSOS {
    export class PCB {
        constructor(
            public pcbPID = 0,
            public pcbpc = 0,
            public pcbOp = "",
            public pcbAcc = 0,
            public pcbXReg = 0,
            public pcbYReg = 0,
            public pcbZReg = 0,
            public pcbState = "Ready",
            public pcbStepCounter = 0) {

        }

        public init(): void {
            this.pcbPID = 0;
            this.pcbpc = 0;
			this.pcbOp = "--";
            this.pcbAcc = 0;
            this.pcbXReg = 0;
            this.pcbYReg = 0;
            this.pcbZReg = 0;
            this.pcbState = "Ready";
            this.pcbStepCounter = 0;

        }

		//prints pcb contents in pcb html table
        public printPCB() {
            document.getElementById("pcbTable").rows[1].cells[0].innerHTML = this.pcbPID;
            document.getElementById("pcbTable").rows[1].cells[1].innerHTML = this.pcbpc;
            document.getElementById("pcbTable").rows[1].cells[2].innerHTML = this.pcbOp;
            document.getElementById("pcbTable").rows[1].cells[3].innerHTML = this.pcbAcc;
            document.getElementById("pcbTable").rows[1].cells[4].innerHTML = this.pcbXReg;
            document.getElementById("pcbTable").rows[1].cells[5].innerHTML = this.pcbYReg;
            document.getElementById("pcbTable").rows[1].cells[6].innerHTML = this.pcbZReg;
            document.getElementById("pcbTable").rows[1].cells[7].innerHTML = this.pcbState;
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

            document.getElementById("pcbTable").rows[1].cells[0].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[1].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[2].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[3].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[4].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[5].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[6].innerHTML = "--";
            document.getElementById("pcbTable").rows[1].cells[7].innerHTML = "--";

            
        }

    }


}
}