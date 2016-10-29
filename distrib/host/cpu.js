///<reference path="../globals.ts" />
/* ------------
     CPU.ts

     Requires global.ts.

     Routines for the host CPU simulation, NOT for the OS itself.
     In this manner, it's A LITTLE BIT like a hypervisor,
     in that the Document environment inside a browser is the "bare metal" (so to speak) for which we write code
     that hosts our client OS. But that analogy only goes so far, and the lines are blurred, because we are using
     TypeScript/JavaScript in both the host and client environments.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */
var TSOS;
(function (TSOS) {
    var Cpu = (function () {
        function Cpu(PC, Acc, Xreg, Yreg, Zflag, isExecuting) {
            if (PC === void 0) { PC = 0; }
            if (Acc === void 0) { Acc = 0; }
            if (Xreg === void 0) { Xreg = 0; }
            if (Yreg === void 0) { Yreg = 0; }
            if (Zflag === void 0) { Zflag = 0; }
            if (isExecuting === void 0) { isExecuting = false; }
            this.PC = PC;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.isExecuting = isExecuting;
        }
        Cpu.prototype.init = function () {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        };
        Cpu.prototype.cycle = function () {
            _Kernel.krnTrace('CPU cycle');
            if (step == false) {
                _OSclock += 100;
            }
            // TODO: Accumulate CPU usage and profiling statistics here.
            // Do the real work here. Be sure to set this.isExecuting appropriately.
            //pidNum = args[0];
            //A9 -- load accumulator with constant
            if (pid[pidNum][stepCounter] === "a9" || pid[pidNum][stepCounter] === "A9") {
                //_CPU.Acc = pid[pidNum][i + 1];
                //_CPU.cycle();
                accString = ("0x" + pid[pidNum][stepCounter + 1]);
                accNum = parseInt(accString);
                _CPU.Acc = accNum;
                document.getElementById("cpuTable").rows[1].cells[2].innerHTML = _CPU.Acc;
                // _StdOut.putText("Loaded accumulator with: " + _CPU.Acc);
                stepCounter++;
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                //instruction reg
                opCode = "A9";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
            }
            else if (pid[pidNum][stepCounter] === "ad" || pid[pidNum][stepCounter] === "AD") {
                // _CPU.cycle();
                var valString = "";
                var valNum = 0;
                valString = ("0x" + pid[pidNum][stepCounter + 1]);
                valNum = parseInt(valString);
                _CPU.Acc = parseInt("0x" + pid[pidNum][valNum]);
                document.getElementById("cpuTable").rows[1].cells[2].innerHTML = _CPU.Acc;
                //pc
                stepCounter += 2;
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                // _StdOut.putText("Loaded accumulator with: " + _CPU.Acc);
                //instruction reg
                opCode = "AD";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
            }
            else if (pid[pidNum][stepCounter] === "8d" || pid[pidNum][stepCounter] === "8D") {
                //i++;
                //  _CPU.cycle();
                pc = stepCounter;
                storeLocString = ("0x" + pid[pidNum][stepCounter + 1]);
                storeLocNum = parseInt(storeLocString);
                pid[pidNum][storeLocNum] = _CPU.Acc.toString(16);
                _MemoryManager.printMemory();
                storeLocString = "";
                //instruction reg
                opCode = "8D";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //pc
                stepCounter += 2;
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
            }
            else if (pid[pidNum][stepCounter] === "6d" || pid[pidNum][stepCounter] === "6D") {
                //     _CPU.cycle();
                pc = stepCounter;
                storeLocString = ("0x" + pid[pidNum][stepCounter + 1]);
                storeLocNum = parseInt(storeLocString);
                _CPU.Acc += parseInt(pid[pidNum][storeLocNum]);
                document.getElementById("cpuTable").rows[1].cells[2].innerHTML = _CPU.Acc;
                _MemoryManager.printMemory();
                storeLocString = "";
                //instruction reg
                opCode = "6D";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //pc
                stepCounter += 2;
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
            }
            else if (pid[pidNum][stepCounter] === "a2" || pid[pidNum][stepCounter] === "A2") {
                //   _CPU.cycle();
                _CPU.Xreg = parseInt("0x" + pid[pidNum][stepCounter + 1]);
                //  _StdOut.putText("Loaded X reg with: " + _CPU.Xreg);
                document.getElementById("cpuTable").rows[1].cells[3].innerHTML = _CPU.Xreg;
                stepCounter++;
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = stepCounter;
                //instruction reg
                opCode = "A2";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
            }
            else if (pid[pidNum][stepCounter] === "ae" || pid[pidNum][stepCounter] === "AE") {
                //  _CPU.cycle();
                var valString = "";
                var valNum = 0;
                valString = ("0x" + pid[pidNum][stepCounter + 1]);
                valNum = parseInt(valString);
                _CPU.Xreg = parseInt("0x" + pid[pidNum][valNum]);
                document.getElementById("cpuTable").rows[1].cells[3].innerHTML = _CPU.Xreg;
                //instruction reg
                opCode = "AE";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //pc
                stepCounter += 2;
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
            }
            else if (pid[pidNum][stepCounter] === "a0" || pid[pidNum][stepCounter] === "A0") {
                //   _CPU.cycle();
                _CPU.Yreg = parseInt("0x" + pid[pidNum][stepCounter + 1]);
                // _StdOut.putText("Loaded Y reg with: " + _CPU.Yreg);
                document.getElementById("cpuTable").rows[1].cells[4].innerHTML = _CPU.Yreg;
                stepCounter++;
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = stepCounter;
                //instruction reg
                opCode = "A0";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
            }
            else if (pid[pidNum][stepCounter] === "ac" || pid[pidNum][stepCounter] === "AC") {
                //     _CPU.cycle();
                var valString = "";
                var valNum = 0;
                valString = ("0x" + pid[pidNum][stepCounter + 1]);
                valNum = parseInt(valString);
                _CPU.Yreg = parseInt("0x" + pid[pidNum][valNum]);
                document.getElementById("cpuTable").rows[1].cells[4].innerHTML = _CPU.Yreg;
                //instruction reg
                opCode = "AC";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //pc
                stepCounter += 2;
                ;
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
            }
            else if (pid[pidNum][stepCounter] === "ea" || pid[pidNum][stepCounter] === "EA") {
                //    _CPU.cycle();
                //No Operation
                //instruction reg
                opCode = "EA";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //pc
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
            }
            else if (pid[pidNum][stepCounter] === "00") {
                //    _CPU.cycle();
                //System Call
                //Maybe something here to do with steps?
                //instruction reg
                opCode = "00";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //pc
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
                if (pid[pidNum][stepCounter + 1] == "00") {
                    _CPU.isExecuting = false;
                }
            }
            else if (pid[pidNum][stepCounter] === "ec" || pid[pidNum][stepCounter] === "EC") {
                //    _CPU.cycle();
                var valString = "";
                var valNum = 0;
                valString = ("0x" + pid[pidNum][stepCounter + 1]);
                valNum = parseInt(valString);
                if (parseInt("0x" + pid[pidNum][valNum]) == _CPU.Xreg) {
                    _CPU.Zflag = 1;
                }
                else {
                    _CPU.Zflag = 0;
                }
                document.getElementById("cpuTable").rows[1].cells[5].innerHTML = _CPU.Zflag;
                //instruction reg
                opCode = "EC";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //pc
                stepCounter += 2;
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
            }
            else if (pid[pidNum][stepCounter] === "d0" || pid[pidNum][stepCounter] === "D0") {
                if (_CPU.Zflag === 0) {
                    //        _CPU.cycle();
                    var valString = "";
                    var valNum = 0;
                    valString = ("0x" + pid[pidNum][stepCounter + 1]);
                    valNum = parseInt(valString);
                    stepCounter += valNum;
                    //instruction reg
                    opCode = "D0";
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                    //pc
                    stepCounter++;
                    pc = stepCounter;
                    document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                    //keeps within 256 size
                    if (stepCounter > 255) {
                        stepCounter = stepCounter - 256;
                    }
                    //PCB
                    _PCB.setAllPCB();
                    _PCB.printPCB();
                }
                else {
                    //pause = true;
                    //instruction reg
                    opCode = "D0";
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                    //pc
                    stepCounter++;
                    pc = stepCounter;
                    document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                }
            }
            else if (pid[pidNum][stepCounter] === "ee" || pid[pidNum][stepCounter] === "EE") {
                //       _CPU.cycle();
                var valString = "";
                var valNum = 0;
                var incNum = 0;
                valString = ("0x" + pid[pidNum][stepCounter + 1]);
                valNum = parseInt(valString);
                incNum = parseInt("0x" + pid[pidNum][valNum]) + 1;
                pid[pidNum][valNum] = incNum.toString(16);
                _MemoryManager.printMemory();
                //instruction reg
                opCode = "EE";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //pc
                stepCounter += 2;
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
            }
            else if (pid[pidNum][stepCounter] === "ff" || pid[pidNum][stepCounter] === "FF") {
                //     _CPU.cycle();
                //System Call
                if (_CPU.Xreg == 1) {
                    _StdOut.putText("" + _CPU.Yreg);
                }
                if (_CPU.Xreg == 2) {
                    for (var t = _CPU.Yreg; t < pid[pidNum].length; t++) {
                        if (pid[pidNum][t] == "44") {
                            _StdOut.putText("D");
                        }
                        else if (pid[pidNum][t] == "4f" || pid[pidNum][t] == "4F") {
                            _StdOut.putText("O");
                        }
                        else if (pid[pidNum][t] == "4e" || pid[pidNum][t] == "4E") {
                            _StdOut.putText("N");
                        }
                        else if (pid[pidNum][t] == "45") {
                            _StdOut.putText("E");
                        }
                        else if (pid[pidNum][t] == "00") {
                            t = 300;
                        }
                    }
                }
                //instruction reg
                opCode = "FF";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //pc
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                //PCB
                _PCB.setAllPCB();
                _PCB.printPCB();
            }
            else {
            }
            //_OSclock += 100;
            if (step == true) {
                document.getElementById("btnNext").disabled = false;
            }
        };
        return Cpu;
    }());
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
