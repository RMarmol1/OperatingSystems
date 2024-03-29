/* ------------------------------
     DeviceDriver.ts

     The "base class" for all Device Drivers.
     ------------------------------ */
var TSOS;
(function (TSOS) {
    var DeviceDriver = (function () {
        function DeviceDriver() {
            this.version = '0.01';
            this.status = 'unloaded';
            this.preemptable = false;
            this.driverEntry = null;
            this.isr = null;
        }
        return DeviceDriver;
    }());
    TSOS.DeviceDriver = DeviceDriver;
})(TSOS || (TSOS = {}));
