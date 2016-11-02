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
        return Scheduler;
    }());
    TSOS.Scheduler = Scheduler;
})(TSOS || (TSOS = {}));
