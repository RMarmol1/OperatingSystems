/*
    CPU Scheduler

*/
var TSOS;
(function (TSOS) {
    var ReadyQueue = (function () {
        function ReadyQueue(pidInQueue) {
            if (pidInQueue === void 0) { pidInQueue = []; }
            this.pidInQueue = pidInQueue;
        }
        ReadyQueue.prototype.init = function () {
            this.pidInQueue = currentPIDInMem;
        };
        ReadyQueue.prototype.loadReadyQueue = function () {
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
            }
        };
        ReadyQueue.prototype.setReadyQueue = function () {
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
            }
        };
        ReadyQueue.prototype.finishProcess = function () {
            if (_MemoryManager.posArray[pidNum] == 0) {
                document.getElementById("queueTable").rows[1].cells[0].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[1].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[2].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[3].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[4].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[5].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[6].innerHTML = "--";
                document.getElementById("queueTable").rows[1].cells[7].innerHTML = "--";
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
            }
        };
        return ReadyQueue;
    }());
    TSOS.ReadyQueue = ReadyQueue;
})(TSOS || (TSOS = {}));
