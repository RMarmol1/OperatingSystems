module TSOS {
    export class Memory {
        constructor(
            public processArray = [],
            public processID = 0,
            public position1 = false,
            public position2 = false,
            public position3 = false) {

        }
		
        public init(): void {
            this.processArray = [];
            this.processID = 0;
            this.position1 = false;
            this.position2 = false;
            this.position3 = false;
            
        }

    }

        
    }
}