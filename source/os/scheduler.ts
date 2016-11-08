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

        //sets the quantum
        public setQuantum(q) {
            this.quantum = q;
        }

        //schedules processes with round robin scheduling and performs a context switch via a software interrupt
        public roundRobin() {//remember to check if loactions are filled
            //interrupt
            //_CPU.isExecuting = false;
            _KernelInterruptQueue.enqueue(new Interrupt(SOFTWARE_IRQ, 1)); //software interrupt
            //_CPU.isExecuting = true;


            _MemoryManager.pcbArray[pidNum].pcbStepCounter = stepCounter;
            _StdOut.putText("Switching from " + pidNum);
            if (pidInMemNum < currentPIDInMem.length - 1) {
                //from 0 to 1 or 2
                if (_Memory.position2 == true && pidInMemNum == 0) {
                    pidNum = currentPIDInMem[pidInMemNum + 1];
                } else if (_Memory.position2 == false && _Memory.position3 == true && pidInMemNum == 0) {
                    pidNum = currentPIDInMem[pidInMemNum + 2];
                } else if (_Memory.position3 == true && pidInMemNum == 1) {
                    pidNum = currentPIDInMem[pidInMemNum + 1];
                } else if (_Memory.position3 == false && _Memory.position1 == true && pidInMemNum == 1) {
                    pidNum = currentPIDInMem[0];
                } else {
					//nothing
                }
				
				
               
            } else {
                //2 to 0 or 1
                if (_Memory.position1 == true && pidInMemNum == 2) {
                    pidNum = currentPIDInMem[0];
                } else if (_Memory.position1 == false && _Memory.position2 == true && pidInMemNum == 2) {
                    pidNum = currentPIDInMem[1];
                } else {
					//nothing
                }
                pidNum = currentPIDInMem[0];
            }
            pidInMemNum++;
            if (pidInMemNum >= currentPIDInMem.length) {
                if (_Memory.position1 == true) {
                    pidInMemNum = 0;
                } else if (_Memory.position2 == true) {
                    pidInMemNum = 1;
                } else if (_Memory.position3 == true) {
                    pidInMemNum = 2;
                } else {
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

            
            

        }

       

    }

        
    }
