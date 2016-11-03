/*
    CPU Scheduler

*/
var TSOS;
(function (TSOS) {
    var Scheduler = (function () {
        function Scheduler(quantum, quantumCounter) {
            if (quantum === void 0) { quantum = 0; }
            if (quantumCounter === void 0) { quantumCounter = 0; }
            this.quantum = quantum;
            this.quantumCounter = quantumCounter;
        }
        Scheduler.prototype.init = function () {
            this.quantum = 6;
            this.quantumCounter = 0;
        };
        Scheduler.prototype.setQuantum = function (q) {
            this.quantum = q;
        };
        Scheduler.prototype.roundRobin = function () {
            _MemoryManager.pcbArray[pidNum].pcbStepCounter = stepCounter;
            _StdOut.putText("Switch" + pidNum);
            if (pidInMemNum < currentPIDInMem.length - 1) {
                pidNum = currentPIDInMem[pidInMemNum + 1];
            }
            else {
                pidNum = currentPIDInMem[0];
            }
            _StdOut.putText("Switch" + pidNum);
            _Kernel.krnTrace('Round Robin');
            stepCounter = _MemoryManager.pcbArray[pidNum].pcbStepCounter;
            _CPU.PC = _MemoryManager.pcbArray[pidNum].pcbpc;
            _CPU.Acc = _MemoryManager.pcbArray[pidNum].pcbAcc;
            _CPU.Xreg = _MemoryManager.pcbArray[pidNum].pcbXReg;
            _CPU.Yreg = _MemoryManager.pcbArray[pidNum].pcbYReg;
            _CPU.Zflag = _MemoryManager.pcbArray[pidNum].pcbZReg;
            /*var arr = [];
            arr[0] = currentPIDInMem[pidInMemNum];
            _OsShell.shellRun(arr);*/
        };
        return Scheduler;
    }());
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
