/*
	CPU Scheduler

*/

module TSOS {
    export class Scheduler {
        constructor(public quantum = 0, public quantumCounter = 0) {

        }
		
        public init(): void {
            this.quantum = 6;
            this.quantumCounter = 0;
            
        }

        public setQuantum(q) {
            this.quantum = q;
        }

        public roundRobin() {
            _MemoryManager.pcbArray[pidNum].pcbStepCounter = stepCounter;
            _StdOut.putText("Switch" + pidNum);
            if (pidInMemNum < currentPIDInMem.length - 1) {
                pidNum = currentPIDInMem[pidInMemNum + 1];
            } else {
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

        }

       

    }

        
    }
