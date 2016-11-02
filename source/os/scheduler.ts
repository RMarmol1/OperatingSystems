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

       

    }

        
    }
