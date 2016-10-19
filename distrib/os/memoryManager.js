/*
    Memory manager class that prints memory in memory html table and
*/
var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager(posArray) {
            if (posArray === void 0) { posArray = []; }
            this.posArray = posArray;
        }
        MemoryManager.prototype.init = function () {
            this.posArray = [];
        };
        //to be used in next project -- prints memory at correct location
        MemoryManager.prototype.printMemoryAtLocation = function () {
            pidNum = _Memory.processID;
            if (this.posArray[pidNum] == 0) {
                for (var i = 0; i < pid[pidNum].length; i++) {
                    if (cellCount > 8) {
                        rowCount++;
                        cellCount = 1;
                        i--;
                        document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][i];
                    }
                    else {
                        document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][i];
                        cellCount++;
                    }
                }
                rowCount = 0;
                cellCount = 1;
                position1 = true;
            }
            else if (this.posArray[pidNum] == 1) {
                rowCount = 256;
                for (var i = 0; i < pid[pidNum].length; i++) {
                    if (cellCount > 8) {
                        rowCount++;
                        cellCount = 1;
                        i--;
                        document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][i];
                    }
                    else {
                        document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][i];
                        cellCount++;
                    }
                }
                rowCount = 0;
                cellCount = 1;
                position2 = true;
            }
            else if (this.posArray[pidNum] == 2) {
                rowCount = 512;
                for (var i = 0; i < pid[pidNum].length; i++) {
                    if (cellCount > 8) {
                        rowCount++;
                        cellCount = 1;
                        i--;
                        document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][i];
                    }
                    else {
                        document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][i];
                        cellCount++;
                    }
                }
                rowCount = 0;
                cellCount = 1;
                position3 = true;
            }
            else {
                _StdOut.putText("Memory is full");
            }
        };
        //prints memory in html table
        MemoryManager.prototype.printMemory = function () {
            /*
            if (this.posArray[_Memory.processID] == 0) {
                rowCount = 0;
            }
            if (this.posArray[_Memory.processID] == 1) {
                rowCount = 256;
            }
            if (this.posArray[_Memory.processID] == 2) {
                rowCount = 512;
            }*/
            /*
            for (var i = 0; i < pid[pidNum].length; i++) {
                if (cellCount > 8) {
                    rowCount++;
                    cellCount = 1;
                    i--;
                    document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][i];
                } else {
                    document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][i];
                    cellCount++;
                }
            }

           rowCount = 0;
           cellCount = 1;*/
            for (var i = 0; i < _Memory.processArray[_Memory.processID].length; i++) {
                if (_Memory.processArray[_Memory.processID][i] == '') {
                    _Memory.processArray[_Memory.processID][i] = "00";
                }
                if (cellCount > 8) {
                    rowCount++;
                    cellCount = 1;
                    i--;
                    document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = _Memory.processArray[_Memory.processID][i];
                }
                else {
                    document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = _Memory.processArray[_Memory.processID][i];
                    cellCount++;
                }
            }
            rowCount = 0;
            cellCount = 1;
        };
        return MemoryManager;
    }());
    TSOS.MemoryManager = MemoryManager;
})(TSOS || (TSOS = {}));
