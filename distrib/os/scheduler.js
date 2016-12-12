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
        //sets the quantum
        Scheduler.prototype.setQuantum = function (q) {
            this.quantum = q;
        };
        //schedules processes with round robin scheduling and performs a context switch via a software interrupt
        Scheduler.prototype.roundRobin = function () {
            //interrupt
            //_CPU.isExecuting = false;
            var traceNum = 0;
            traceNum = pidNum;
            _KernelInterruptQueue.enqueue(new TSOS.Interrupt(SOFTWARE_IRQ, 1)); //software interrupt
            //_CPU.isExecuting = true;
            _MemoryManager.pcbArray[pidNum].pcbStepCounter = stepCounter;
            // _StdOut.putText("Switching from " + pidNum);
            // _Kernel.krnTrace("Context Switch from PID " + pidNum);
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
                if (_ReadyQueue.position4 == true && pidInMemNum == 2) {
                    //swap out/in
                    var swapOutPID = currentPIDInMem[2];
                    var swapInPID = _MemoryManager.posArray.indexOf(99);
                    if (fileCreated == false) {
                        fileCreated = true;
                        _FileSystemDeviceDriver.createFile(currentPIDInMem[2].toString());
                        _StdOut.advanceLine();
                        _FileSystemDeviceDriver.writeToFile(currentPIDInMem[2].toString(), _Memory.processArray[currentPIDInMem[2]].toString());
                        _StdOut.advanceLine();
                    }
                    // _StdOut.putText(swapInPID.toString());
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(SOFTWARE_IRQ, 1)); //software interrupt
                    _FileSystemDeviceDriver.writeToFile(currentPIDInMem[2].toString(), _Memory.processArray[currentPIDInMem[2]].toString());
                    _StdOut.advanceLine();
                    _MemoryManager.posArray[swapOutPID] = 99;
                    _MemoryManager.pcbArray[swapOutPID].pcbLocation = "Hard Drive";
                    _ReadyQueue.setReadyQueue();
                    _Kernel.krnTrace('SwapOut: to Hard Drive');
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(SOFTWARE_IRQ, 1)); //software interrupt
                    _MemoryManager.posArray[swapInPID] = 2;
                    _MemoryManager.pcbArray[swapInPID].pcbLocation = "Memory";
                    currentPIDInMem[2] = swapInPID;
                    pidNum = swapInPID;
                    _Memory.formatSize(swapInPID);
                    _ReadyQueue.setReadyQueue();
                    _MemoryManager.printMemoryAtLocation();
                    _Kernel.krnTrace('SwapIn: to Memory');
                }
                if (_Memory.position1 == true && pidInMemNum == 2) {
                    pidNum = currentPIDInMem[0];
                }
                else if (_Memory.position1 == false && _Memory.position2 == true && pidInMemNum == 2) {
                    pidNum = currentPIDInMem[1];
                }
                else if (_Memory.position1 == true && pidInMemNum == 1) {
                    // _StdOut.putText("hi");
                    pidNum = currentPIDInMem[0];
                }
                else {
                }
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
            // _StdOut.putText(" to " + pidNum);
            _Kernel.krnTrace("Context Switch: PID " + traceNum + " to PID " + pidNum);
            _Kernel.krnTrace('Round Robin');
            stepCounter = _MemoryManager.pcbArray[pidNum].pcbStepCounter;
            _CPU.PC = _MemoryManager.pcbArray[pidNum].pcbpc;
            _CPU.Acc = _MemoryManager.pcbArray[pidNum].pcbAcc;
            _CPU.Xreg = _MemoryManager.pcbArray[pidNum].pcbXReg;
            _CPU.Yreg = _MemoryManager.pcbArray[pidNum].pcbYReg;
            _CPU.Zflag = _MemoryManager.pcbArray[pidNum].pcbZReg;
        };
        Scheduler.prototype.fcfs = function () {
            //interrupt
            //_CPU.isExecuting = false;
            var traceNum = 0;
            traceNum = pidNum;
            _KernelInterruptQueue.enqueue(new TSOS.Interrupt(SOFTWARE_IRQ, 1)); //software interrupt
            //_CPU.isExecuting = true;
            _MemoryManager.pcbArray[pidNum].pcbStepCounter = stepCounter;
            // _StdOut.putText("Switching from " + pidNum);
            // _Kernel.krnTrace("Context Switch from PID " + pidNum);
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
                else if (_Memory.position1 == true && pidInMemNum == 1) {
                    // _StdOut.putText("hi");
                    pidNum = currentPIDInMem[0];
                }
                else {
                }
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
            // _StdOut.putText(" to " + pidNum);
            _Kernel.krnTrace("Context Switch: PID " + traceNum + " to PID " + pidNum);
            _Kernel.krnTrace('FCFS');
            stepCounter = _MemoryManager.pcbArray[pidNum].pcbStepCounter;
            _CPU.PC = _MemoryManager.pcbArray[pidNum].pcbpc;
            _CPU.Acc = _MemoryManager.pcbArray[pidNum].pcbAcc;
            _CPU.Xreg = _MemoryManager.pcbArray[pidNum].pcbXReg;
            _CPU.Yreg = _MemoryManager.pcbArray[pidNum].pcbYReg;
            _CPU.Zflag = _MemoryManager.pcbArray[pidNum].pcbZReg;
        };
        Scheduler.prototype.priorityScheduling = function () {
            //get highest priority and order
            //run highest priority
            if (priority == true) {
                _KernelInterruptQueue.enqueue(new TSOS.Interrupt(SOFTWARE_IRQ, 1)); //software interrupt
                _MemoryManager.pcbArray[pidNum].pcbStepCounter = stepCounter;
                //find pid with largest priority
                var highestPriority = 999;
                var priorityPID = 0;
                for (var i = 0; i < currentPIDInMem.length; i++) {
                    if (_MemoryManager.priorityArray[currentPIDInMem[i]] < highestPriority) {
                        highestPriority = _MemoryManager.priorityArray[currentPIDInMem[i]];
                        priorityPID = currentPIDInMem[i];
                    }
                }
                pidInMemNum = currentPIDInMem.indexOf(priorityPID);
                _Kernel.krnTrace('Context Switch');
                _Kernel.krnTrace('Priority');
                stepCounter = _MemoryManager.pcbArray[pidNum].pcbStepCounter;
                _CPU.PC = _MemoryManager.pcbArray[pidNum].pcbpc;
                _CPU.Acc = _MemoryManager.pcbArray[pidNum].pcbAcc;
                _CPU.Xreg = _MemoryManager.pcbArray[pidNum].pcbXReg;
                _CPU.Yreg = _MemoryManager.pcbArray[pidNum].pcbYReg;
                _CPU.Zflag = _MemoryManager.pcbArray[pidNum].pcbZReg;
            }
        };
        Scheduler.prototype.prioritySetUp = function () {
            //find pid with largest priority
            var highestPriority = 999;
            var lowestPriority = 0;
            var lowestPID = 0;
            var priorityPID = 0;
            if (_ReadyQueue.position4 == true) {
                //swap out/in
                var swapOutPID = 0;
                var swapInPID = _MemoryManager.posArray.indexOf(99);
                var swapOutPIDLoc = 0;
                //find lowest and swap
                for (var i = 0; i < currentPIDInMem.length; i++) {
                    if (_MemoryManager.priorityArray[currentPIDInMem[i]] > lowestPriority) {
                        lowestPriority = _MemoryManager.priorityArray[currentPIDInMem[i]];
                        lowestPID = currentPIDInMem[i];
                    }
                }
                swapOutPID = lowestPID;
                swapOutPIDLoc = _MemoryManager.posArray[swapOutPID];
                if (_MemoryManager.priorityArray[swapInPID] < _MemoryManager.priorityArray[swapOutPID]) {
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(SOFTWARE_IRQ, 1)); //software interrupt
                    _FileSystemDeviceDriver.createFile(swapOutPID.toString());
                    _StdOut.advanceLine();
                    _FileSystemDeviceDriver.writeToFile(swapOutPID.toString(), _Memory.processArray[swapOutPID].toString());
                    _StdOut.advanceLine();
                    _MemoryManager.posArray[swapOutPID] = 99;
                    _MemoryManager.pcbArray[swapOutPID].pcbLocation = "Hard Drive";
                    pidNum = swapOutPID;
                    _ReadyQueue.setReadyQueue();
                    _Kernel.krnTrace('SwapOut: to Hard Drive');
                    _KernelInterruptQueue.enqueue(new TSOS.Interrupt(SOFTWARE_IRQ, 1)); //software interrupt
                    _MemoryManager.posArray[swapInPID] = swapOutPIDLoc;
                    _MemoryManager.pcbArray[swapInPID].pcbLocation = "Memory";
                    currentPIDInMem[swapOutPIDLoc] = swapInPID;
                    pidNum = swapInPID;
                    _Memory.formatSize(swapInPID);
                    _ReadyQueue.setReadyQueue();
                    _Kernel.krnTrace('SwapIn: to Memory');
                    _MemoryManager.printMemoryAtLocation();
                }
            }
            for (var i = 0; i < currentPIDInMem.length; i++) {
                if (_MemoryManager.priorityArray[currentPIDInMem[i]] < highestPriority) {
                    highestPriority = _MemoryManager.priorityArray[currentPIDInMem[i]];
                    priorityPID = currentPIDInMem[i];
                }
            }
            pidInMemNum = currentPIDInMem.indexOf(priorityPID);
        };
        return Scheduler;
    }());
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
