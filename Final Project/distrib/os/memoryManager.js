/*
    Memory manager class that prints memory in memory html table and
*/
var TSOS;
(function (TSOS) {
    var MemoryManager = (function () {
        function MemoryManager(posArray, pcbArray, priorityArray) {
            if (posArray === void 0) { posArray = []; }
            if (pcbArray === void 0) { pcbArray = []; }
            if (priorityArray === void 0) { priorityArray = []; }
            this.posArray = posArray;
            this.pcbArray = pcbArray;
            this.priorityArray = priorityArray;
        }
        MemoryManager.prototype.init = function () {
            this.posArray = [];
            this.pcbArray = [];
            this.priorityArray = [];
        };
        //prints memory at correct location
        MemoryManager.prototype.printMemoryAtLocation = function () {
            //pidNum = _Memory.processID;
            if (_MemoryManager.posArray[_Memory.processID] == 0) {
                for (var i = 0; i < _Memory.processArray[_Memory.processID].length; i++) {
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
                position1 = true;
            }
            else if (_MemoryManager.posArray[_Memory.processID] == 1) {
                rowCount = 32;
                for (var i = 0; i < _Memory.processArray[_Memory.processID].length; i++) {
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
                position2 = true;
            }
            else if (_MemoryManager.posArray[_Memory.processID] == 2) {
                rowCount = 64;
                for (var i = 0; i < _Memory.processArray[_Memory.processID].length; i++) {
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
                position3 = true;
            }
            else {
            }
        };
        //prints memory in html table
        MemoryManager.prototype.printMemory = function () {
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
        //prints cleared mem
        MemoryManager.prototype.printClearedMem = function () {
            for (var i = 0; i < 256; i++) {
                emptyArray[i] = "00";
            }
            for (var i = 0; i < emptyArray.length; i++) {
                if (cellCount > 8) {
                    rowCount++;
                    cellCount = 1;
                    i--;
                    document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = emptyArray[i];
                }
                else {
                    document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = emptyArray[i];
                    cellCount++;
                }
            }
            rowCount = 32;
            cellCount = 1;
            for (var i = 0; i < emptyArray.length; i++) {
                if (cellCount > 8) {
                    rowCount++;
                    cellCount = 1;
                    i--;
                    document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = emptyArray[i];
                }
                else {
                    document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = emptyArray[i];
                    cellCount++;
                }
            }
            rowCount = 64;
            cellCount = 1;
            for (var i = 0; i < emptyArray.length; i++) {
                if (cellCount > 8) {
                    rowCount++;
                    cellCount = 1;
                    i--;
                    document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = emptyArray[i];
                }
                else {
                    document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = emptyArray[i];
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
