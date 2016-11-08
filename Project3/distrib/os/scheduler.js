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
            //interrupt
            //_CPU.isExecuting = false;
            _KernelInterruptQueue.enqueue(new TSOS.Interrupt(SOFTWARE_IRQ, 1));
            //_CPU.isExecuting = true;
            _MemoryManager.pcbArray[pidNum].pcbStepCounter = stepCounter;
            _StdOut.putText("Switching from " + pidNum);
            if (pidInMemNum < currentPIDInMem.length - 1) {
                //from 0 to 1 or 2
                if (_Memory.position2 == true && pidInMemNum == 0) {
                    pidNum = currentPIDInMem[pidInMemNum + 1];
                }
                else if (_Memory.position2 == false && _Memory.position3 == true && pidInMemNum == 0) {
                    pidNum = currentPIDInMem[pidInMemNum + 2];
                }
                else if (_Memory.position3 == true && pidInMemNum == 1) {
                    pidNum = currentPIDInMem[pidInMemNum + 1];
                }
                else if (_Memory.position3 == false && _Memory.position1 == true && pidInMemNum == 1) {
                    pidNum = currentPIDInMem[0];
                }
                else {
                }
            }
            else {
                //2 to 0 or 1
                if (_Memory.position1 == true && pidInMemNum == 2) {
                    pidNum = currentPIDInMem[0];
                }
                else if (_Memory.position1 == false && _Memory.position2 == true && pidInMemNum == 2) {
                    pidNum = currentPIDInMem[1];
                }
                else {
                }
                pidNum = currentPIDInMem[0];
            }
            pidInMemNum++;
            if (pidInMemNum >= currentPIDInMem.length) {
                if (_Memory.position1 == true) {
                    pidInMemNum = 0;
                }
                else if (_Memory.position2 == true) {
                    pidInMemNum = 1;
                }
                else if (_Memory.position3 == true) {
                    pidInMemNum = 2;
                }
                else {
                }
            }
            _StdOut.putText(" to " + pidNum);
            _Kernel.krnTrace('Round Robin');
            stepCounter = _MemoryManager.pcbArray[pidNum].pcbStepCounter;
            _CPU.PC = _MemoryManager.pcbArray[pidNum].pcbpc;
            _CPU.Acc = _MemoryManager.pcbArray[pidNum].pcbAcc;
            _CPU.Xreg = _MemoryManager.pcbArray[pidNum].pcbXReg;
            _CPU.Yreg = _MemoryManager.pcbArray[pidNum].pcbYReg;
            _CPU.Zflag = _MemoryManager.pcbArray[pidNum].pcbZReg;
        };
        return Scheduler;
    }());
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
