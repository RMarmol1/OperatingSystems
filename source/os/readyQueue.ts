/*
	Ready Queue

*/

module TSOS {
    export class ReadyQueue {
        constructor(public pidInQueue = []) {

        }

        init() {
            this.pidInQueue = currentPIDInMem;
        }

        //loads pcb data into ready queue for loaded PID
        public loadReadyQueue() {
            if (_MemoryManager.posArray[pidCounter] == 0 && _Memory.position1 == true) {
                document.getElementById("queueTable").rows[1].cells[0].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbPID;
                document.getElementById("queueTable").rows[1].cells[1].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbpc;
                document.getElementById("queueTable").rows[1].cells[2].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbOp;
                document.getElementById("queueTable").rows[1].cells[3].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbAcc;
                document.getElementById("queueTable").rows[1].cells[4].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbXReg;
                document.getElementById("queueTable").rows[1].cells[5].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbYReg;
                document.getElementById("queueTable").rows[1].cells[6].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbZReg;
                // _MemoryManager.pcbArray[pidNum].pcbState = "Ready";
                document.getElementById("queueTable").rows[1].cells[7].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbState;
                document.getElementById("queueTable").rows[1].cells[8].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbLocation;
            }
            if (_MemoryManager.posArray[pidCounter] == 1 && _Memory.position2 == true) {
                document.getElementById("queueTable").rows[2].cells[0].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbPID;
                document.getElementById("queueTable").rows[2].cells[1].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbpc;
                document.getElementById("queueTable").rows[2].cells[2].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbOp;
                document.getElementById("queueTable").rows[2].cells[3].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbAcc;
                document.getElementById("queueTable").rows[2].cells[4].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbXReg;
                document.getElementById("queueTable").rows[2].cells[5].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbYReg;
                document.getElementById("queueTable").rows[2].cells[6].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbZReg;
                // _MemoryManager.pcbArray[pidNum].pcbState = "Ready";
                document.getElementById("queueTable").rows[2].cells[7].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbState;
                document.getElementById("queueTable").rows[2].cells[8].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbLocation;
            }
            if (_MemoryManager.posArray[pidCounter] == 2 && _Memory.position3 == true) {
                document.getElementById("queueTable").rows[3].cells[0].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbPID;
                document.getElementById("queueTable").rows[3].cells[1].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbpc;
                document.getElementById("queueTable").rows[3].cells[2].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbOp;
                document.getElementById("queueTable").rows[3].cells[3].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbAcc;
                document.getElementById("queueTable").rows[3].cells[4].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbXReg;
                document.getElementById("queueTable").rows[3].cells[5].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbYReg;
                document.getElementById("queueTable").rows[3].cells[6].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbZReg;
                // _MemoryManager.pcbArray[pidNum].pcbState = "Ready";
                document.getElementById("queueTable").rows[3].cells[7].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbState;
                document.getElementById("queueTable").rows[3].cells[8].innerHTML = _MemoryManager.pcbArray[pidCounter].pcbLocation;
            }

        }

        //updates pcb of PID in ready queue
        public setReadyQueue() {
            if (_MemoryManager.posArray[pidNum] == 0 && _Memory.position1 == true) {
                document.getElementById("queueTable").rows[1].cells[0].innerHTML = _MemoryManager.pcbArray[pidNum].pcbPID;
                document.getElementById("queueTable").rows[1].cells[1].innerHTML = _MemoryManager.pcbArray[pidNum].pcbpc;
                document.getElementById("queueTable").rows[1].cells[2].innerHTML = _MemoryManager.pcbArray[pidNum].pcbOp;
                document.getElementById("queueTable").rows[1].cells[3].innerHTML = _MemoryManager.pcbArray[pidNum].pcbAcc;
                document.getElementById("queueTable").rows[1].cells[4].innerHTML = _MemoryManager.pcbArray[pidNum].pcbXReg;
                document.getElementById("queueTable").rows[1].cells[5].innerHTML = _MemoryManager.pcbArray[pidNum].pcbYReg;
                document.getElementById("queueTable").rows[1].cells[6].innerHTML = _MemoryManager.pcbArray[pidNum].pcbZReg;
               // _MemoryManager.pcbArray[pidNum].pcbState = "Ready";
                document.getElementById("queueTable").rows[1].cells[7].innerHTML = _MemoryManager.pcbArray[pidNum].pcbState;
                document.getElementById("queueTable").rows[1].cells[8].innerHTML = _MemoryManager.pcbArray[pidNum].pcbLocation;
            }
            if (_MemoryManager.posArray[pidNum] == 1 && _Memory.position2 == true) {
                document.getElementById("queueTable").rows[2].cells[0].innerHTML = _MemoryManager.pcbArray[pidNum].pcbPID;
                document.getElementById("queueTable").rows[2].cells[1].innerHTML = _MemoryManager.pcbArray[pidNum].pcbpc;
                document.getElementById("queueTable").rows[2].cells[2].innerHTML = _MemoryManager.pcbArray[pidNum].pcbOp;
                document.getElementById("queueTable").rows[2].cells[3].innerHTML = _MemoryManager.pcbArray[pidNum].pcbAcc;
                document.getElementById("queueTable").rows[2].cells[4].innerHTML = _MemoryManager.pcbArray[pidNum].pcbXReg;
                document.getElementById("queueTable").rows[2].cells[5].innerHTML = _MemoryManager.pcbArray[pidNum].pcbYReg;
                document.getElementById("queueTable").rows[2].cells[6].innerHTML = _MemoryManager.pcbArray[pidNum].pcbZReg;
               // _MemoryManager.pcbArray[pidNum].pcbState = "Ready";
                document.getElementById("queueTable").rows[2].cells[7].innerHTML = _MemoryManager.pcbArray[pidNum].pcbState;
                document.getElementById("queueTable").rows[2].cells[8].innerHTML = _MemoryManager.pcbArray[pidNum].pcbLocation;
            }
            if (_MemoryManager.posArray[pidNum] == 2 && _Memory.position3 == true) {
                document.getElementById("queueTable").rows[3].cells[0].innerHTML = _MemoryManager.pcbArray[pidNum].pcbPID;
                document.getElementById("queueTable").rows[3].cells[1].innerHTML = _MemoryManager.pcbArray[pidNum].pcbpc;
                document.getElementById("queueTable").rows[3].cells[2].innerHTML = _MemoryManager.pcbArray[pidNum].pcbOp;
                document.getElementById("queueTable").rows[3].cells[3].innerHTML = _MemoryManager.pcbArray[pidNum].pcbAcc;
                document.getElementById("queueTable").rows[3].cells[4].innerHTML = _MemoryManager.pcbArray[pidNum].pcbXReg;
                document.getElementById("queueTable").rows[3].cells[5].innerHTML = _MemoryManager.pcbArray[pidNum].pcbYReg;
                document.getElementById("queueTable").rows[3].cells[6].innerHTML = _MemoryManager.pcbArray[pidNum].pcbZReg;
               // _MemoryManager.pcbArray[pidNum].pcbState = "Ready";
                document.getElementById("queueTable").rows[3].cells[7].innerHTML = _MemoryManager.pcbArray[pidNum].pcbState;
                document.getElementById("queueTable").rows[3].cells[8].innerHTML = _MemoryManager.pcbArray[pidNum].pcbLocation;
            }
			
        }

        //sets finished pcb in ready queue
        public finishProcess() {
            if (_MemoryManager.posArray[pidNum] == 0) {
                document.getElementById("queueTable").rows[1].cells[0].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[1].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[2].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[3].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[4].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[5].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[6].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[7].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[8].innerHTML = "--";
            }
            if (_MemoryManager.posArray[pidNum] == 1) {
                document.getElementById("queueTable").rows[2].cells[0].innerHTML = "--";
                document.getElementById("queueTable").rows[2].cells[1].innerHTML = "--";
                document.getElementById("queueTable").rows[2].cells[2].innerHTML = "--";
                document.getElementById("queueTable").rows[2].cells[3].innerHTML = "--";
                document.getElementById("queueTable").rows[2].cells[4].innerHTML = "--";
                document.getElementById("queueTable").rows[2].cells[5].innerHTML = "--";
                document.getElementById("queueTable").rows[2].cells[6].innerHTML = "--";
                document.getElementById("queueTable").rows[2].cells[7].innerHTML = "--";
                document.getElementById("queueTable").rows[2].cells[8].innerHTML = "--";
            }
            if (_MemoryManager.posArray[pidNum] == 2) {
                document.getElementById("queueTable").rows[3].cells[0].innerHTML = "--";
                document.getElementById("queueTable").rows[3].cells[1].innerHTML = "--";
                document.getElementById("queueTable").rows[3].cells[2].innerHTML = "--";
                document.getElementById("queueTable").rows[3].cells[3].innerHTML = "--";
                document.getElementById("queueTable").rows[3].cells[4].innerHTML = "--";
                document.getElementById("queueTable").rows[3].cells[5].innerHTML = "--";
                document.getElementById("queueTable").rows[3].cells[6].innerHTML = "--";
                document.getElementById("queueTable").rows[3].cells[7].innerHTML = "--";
                document.getElementById("queueTable").rows[3].cells[8].innerHTML = "--";
            }
        }

        
       

    }

        
    }
