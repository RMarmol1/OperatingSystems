var TSOS;
(function (TSOS) {
    var Memory = (function () {
        function Memory(processArray, processID, position1, position2, position3) {
            if (processArray === void 0) { processArray = []; }
            if (processID === void 0) { processID = 0; }
            if (position1 === void 0) { position1 = false; }
            if (position2 === void 0) { position2 = false; }
            if (position3 === void 0) { position3 = false; }
            this.processArray = processArray;
            this.processID = processID;
            this.position1 = position1;
            this.position2 = position2;
            this.position3 = position3;
        }
        Memory.prototype.init = function () {
            this.processArray = [];
            this.processID = 0;
            this.position1 = false;
            this.position2 = false;
            this.position3 = false;
        };
        return Memory;
    }());
    TSOS.Memory = Memory;
})(TSOS || (TSOS = {}));
