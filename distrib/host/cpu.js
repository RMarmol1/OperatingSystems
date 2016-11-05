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
        function Cpu(PC, Acc, Xreg, Yreg, Zflag, isExecuting, stillRunning) {
            if (PC === void 0) { PC = 0; }
            if (Acc === void 0) { Acc = 0; }
            if (Xreg === void 0) { Xreg = 0; }
            if (Yreg === void 0) { Yreg = 0; }
            if (Zflag === void 0) { Zflag = 0; }
            if (isExecuting === void 0) { isExecuting = false; }
            if (stillRunning === void 0) { stillRunning = false; }
            this.PC = PC;
            this.Acc = Acc;
            this.Xreg = Xreg;
            this.Yreg = Yreg;
            this.Zflag = Zflag;
            this.isExecuting = isExecuting;
            this.stillRunning = stillRunning;
        }
        Cpu.prototype.init = function () {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
            this.stillRunning = false;
        };
        Cpu.prototype.cycle = function () {
            _Kernel.krnTrace('CPU cycle');
            /*if (step == false) {
                _OSclock += 100;
            }*/
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
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
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
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
            }
            else if (pid[pidNum][stepCounter] === "8d" || pid[pidNum][stepCounter] === "8D") {
                //i++;
                //  _CPU.cycle();
                pc = stepCounter;
                storeLocString = ("0x" + pid[pidNum][stepCounter + 1]);
                storeLocNum = parseInt(storeLocString);
                //keeps within 256 size
                if (storeLocNum > 255) {
                    storeLocNum = storeLocNum - 256;
                }
                pid[pidNum][storeLocNum] = _CPU.Acc.toString(16);
                _MemoryManager.printMemoryAtLocation();
                storeLocString = "";
                //instruction reg
                opCode = "8D";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //pc
                stepCounter += 2;
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                //PCB
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
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
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
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
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
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
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
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
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
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
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
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
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
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
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
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
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
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
                    _MemoryManager.pcbArray[pidNum].setAllPCB();
                    _MemoryManager.pcbArray[pidNum].printPCB();
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
                _MemoryManager.printMemoryAtLocation();
                //instruction reg
                opCode = "EE";
                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                //pc
                stepCounter += 2;
                pc = stepCounter;
                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                //PCB
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
            }
            else if (pid[pidNum][stepCounter] === "ff" || pid[pidNum][stepCounter] === "FF") {
                //     _CPU.cycle();
                //System Call
                if (_CPU.Xreg == 1) {
                    _StdOut.putText("" + _CPU.Yreg);
                }
                if (_CPU.Xreg == 2) {
                    for (var t = _CPU.Yreg; t < pid[pidNum].length; t++) {
                        if (pid[pidNum][t] == "20") {
                            _StdOut.putText(" ");
                        }
                        else if (pid[pidNum][t] == "21") {
                            _StdOut.putText("!");
                        }
                        else if (pid[pidNum][t] == "22") {
                            _StdOut.putText("\"");
                        }
                        else if (pid[pidNum][t] == "23") {
                            _StdOut.putText("#");
                        }
                        else if (pid[pidNum][t] == "24") {
                            _StdOut.putText("$");
                        }
                        else if (pid[pidNum][t] == "25") {
                            _StdOut.putText("%");
                        }
                        else if (pid[pidNum][t] == "26") {
                            _StdOut.putText("&");
                        }
                        else if (pid[pidNum][t] == "27") {
                            _StdOut.putText("\'");
                        }
                        else if (pid[pidNum][t] == "28") {
                            _StdOut.putText("(");
                        }
                        else if (pid[pidNum][t] == "29") {
                            _StdOut.putText(")");
                        }
                        else if (pid[pidNum][t] == "2A" || pid[pidNum][t] == "2a") {
                            _StdOut.putText("*");
                        }
                        else if (pid[pidNum][t] == "2B" || pid[pidNum][t] == "2b") {
                            _StdOut.putText("+");
                        }
                        else if (pid[pidNum][t] == "2C" || pid[pidNum][t] == "2c") {
                            _StdOut.putText(",");
                        }
                        else if (pid[pidNum][t] == "2D" || pid[pidNum][t] == "2d") {
                            _StdOut.putText("-");
                        }
                        else if (pid[pidNum][t] == "2E" || pid[pidNum][t] == "2e") {
                            _StdOut.putText(".");
                        }
                        else if (pid[pidNum][t] == "2F" || pid[pidNum][t] == "2f") {
                            _StdOut.putText("/");
                        }
                        else if (pid[pidNum][t] == "30") {
                            _StdOut.putText("0");
                        }
                        else if (pid[pidNum][t] == "31") {
                            _StdOut.putText("1");
                        }
                        else if (pid[pidNum][t] == "32") {
                            _StdOut.putText("2");
                        }
                        else if (pid[pidNum][t] == "33") {
                            _StdOut.putText("3");
                        }
                        else if (pid[pidNum][t] == "34") {
                            _StdOut.putText("4");
                        }
                        else if (pid[pidNum][t] == "35") {
                            _StdOut.putText("5");
                        }
                        else if (pid[pidNum][t] == "36") {
                            _StdOut.putText("6");
                        }
                        else if (pid[pidNum][t] == "37") {
                            _StdOut.putText("7");
                        }
                        else if (pid[pidNum][t] == "38") {
                            _StdOut.putText("8");
                        }
                        else if (pid[pidNum][t] == "39") {
                            _StdOut.putText("9");
                        }
                        else if (pid[pidNum][t] == "3A" || pid[pidNum][t] == "3a") {
                            _StdOut.putText(":");
                        }
                        else if (pid[pidNum][t] == "3B" || pid[pidNum][t] == "3b") {
                            _StdOut.putText(";");
                        }
                        else if (pid[pidNum][t] == "3C" || pid[pidNum][t] == "3c") {
                            _StdOut.putText("<");
                        }
                        else if (pid[pidNum][t] == "3D" || pid[pidNum][t] == "3d") {
                            _StdOut.putText("=");
                        }
                        else if (pid[pidNum][t] == "3E" || pid[pidNum][t] == "3e") {
                            _StdOut.putText(">");
                        }
                        else if (pid[pidNum][t] == "3F" || pid[pidNum][t] == "3f") {
                            _StdOut.putText("?");
                        }
                        else if (pid[pidNum][t] == "40") {
                            _StdOut.putText("@");
                        }
                        else if (pid[pidNum][t] == "41") {
                            _StdOut.putText("A");
                        }
                        else if (pid[pidNum][t] == "42") {
                            _StdOut.putText("B");
                        }
                        else if (pid[pidNum][t] == "43") {
                            _StdOut.putText("C");
                        }
                        else if (pid[pidNum][t] == "44") {
                            _StdOut.putText("D");
                        }
                        else if (pid[pidNum][t] == "45") {
                            _StdOut.putText("E");
                        }
                        else if (pid[pidNum][t] == "46") {
                            _StdOut.putText("F");
                        }
                        else if (pid[pidNum][t] == "47") {
                            _StdOut.putText("G");
                        }
                        else if (pid[pidNum][t] == "48") {
                            _StdOut.putText("H");
                        }
                        else if (pid[pidNum][t] == "49") {
                            _StdOut.putText("I");
                        }
                        else if (pid[pidNum][t] == "4A" || pid[pidNum][t] == "4a") {
                            _StdOut.putText("J");
                        }
                        else if (pid[pidNum][t] == "4B" || pid[pidNum][t] == "4b") {
                            _StdOut.putText("K");
                        }
                        else if (pid[pidNum][t] == "4C" || pid[pidNum][t] == "4c") {
                            _StdOut.putText("L");
                        }
                        else if (pid[pidNum][t] == "4D" || pid[pidNum][t] == "4d") {
                            _StdOut.putText("M");
                        }
                        else if (pid[pidNum][t] == "4E" || pid[pidNum][t] == "4e") {
                            _StdOut.putText("N");
                        }
                        else if (pid[pidNum][t] == "4F" || pid[pidNum][t] == "4f") {
                            _StdOut.putText("O");
                        }
                        else if (pid[pidNum][t] == "50") {
                            _StdOut.putText("P");
                        }
                        else if (pid[pidNum][t] == "51") {
                            _StdOut.putText("Q");
                        }
                        else if (pid[pidNum][t] == "52") {
                            _StdOut.putText("R");
                        }
                        else if (pid[pidNum][t] == "53") {
                            _StdOut.putText("S");
                        }
                        else if (pid[pidNum][t] == "54") {
                            _StdOut.putText("T");
                        }
                        else if (pid[pidNum][t] == "55") {
                            _StdOut.putText("U");
                        }
                        else if (pid[pidNum][t] == "56") {
                            _StdOut.putText("V");
                        }
                        else if (pid[pidNum][t] == "57") {
                            _StdOut.putText("W");
                        }
                        else if (pid[pidNum][t] == "58") {
                            _StdOut.putText("X");
                        }
                        else if (pid[pidNum][t] == "59") {
                            _StdOut.putText("Y");
                        }
                        else if (pid[pidNum][t] == "5A" || pid[pidNum][t] == "5a") {
                            _StdOut.putText("Z");
                        }
                        else if (pid[pidNum][t] == "5B" || pid[pidNum][t] == "5b") {
                            _StdOut.putText("[");
                        }
                        else if (pid[pidNum][t] == "5C" || pid[pidNum][t] == "5c") {
                            _StdOut.putText("\\");
                        }
                        else if (pid[pidNum][t] == "5D" || pid[pidNum][t] == "5d") {
                            _StdOut.putText("]");
                        }
                        else if (pid[pidNum][t] == "5E" || pid[pidNum][t] == "5e") {
                            _StdOut.putText("^");
                        }
                        else if (pid[pidNum][t] == "5F" || pid[pidNum][t] == "5f") {
                            _StdOut.putText("_");
                        }
                        else if (pid[pidNum][t] == "60") {
                            _StdOut.putText("\'");
                        }
                        else if (pid[pidNum][t] == "61") {
                            _StdOut.putText("a");
                        }
                        else if (pid[pidNum][t] == "62") {
                            _StdOut.putText("b");
                        }
                        else if (pid[pidNum][t] == "63") {
                            _StdOut.putText("c");
                        }
                        else if (pid[pidNum][t] == "64") {
                            _StdOut.putText("d");
                        }
                        else if (pid[pidNum][t] == "65") {
                            _StdOut.putText("e");
                        }
                        else if (pid[pidNum][t] == "66") {
                            _StdOut.putText("f");
                        }
                        else if (pid[pidNum][t] == "67") {
                            _StdOut.putText("g");
                        }
                        else if (pid[pidNum][t] == "68") {
                            _StdOut.putText("h");
                        }
                        else if (pid[pidNum][t] == "69") {
                            _StdOut.putText("i");
                        }
                        else if (pid[pidNum][t] == "6A" || pid[pidNum][t] == "6a") {
                            _StdOut.putText("j");
                        }
                        else if (pid[pidNum][t] == "6B" || pid[pidNum][t] == "6b") {
                            _StdOut.putText("k");
                        }
                        else if (pid[pidNum][t] == "6C" || pid[pidNum][t] == "6c") {
                            _StdOut.putText("l");
                        }
                        else if (pid[pidNum][t] == "6D" || pid[pidNum][t] == "6d") {
                            _StdOut.putText("m");
                        }
                        else if (pid[pidNum][t] == "6E" || pid[pidNum][t] == "6e") {
                            _StdOut.putText("n");
                        }
                        else if (pid[pidNum][t] == "6F" || pid[pidNum][t] == "6f") {
                            _StdOut.putText("o");
                        }
                        else if (pid[pidNum][t] == "70") {
                            _StdOut.putText("p");
                        }
                        else if (pid[pidNum][t] == "71") {
                            _StdOut.putText("q");
                        }
                        else if (pid[pidNum][t] == "72") {
                            _StdOut.putText("r");
                        }
                        else if (pid[pidNum][t] == "73") {
                            _StdOut.putText("s");
                        }
                        else if (pid[pidNum][t] == "74") {
                            _StdOut.putText("t");
                        }
                        else if (pid[pidNum][t] == "75") {
                            _StdOut.putText("u");
                        }
                        else if (pid[pidNum][t] == "76") {
                            _StdOut.putText("v");
                        }
                        else if (pid[pidNum][t] == "77") {
                            _StdOut.putText("w");
                        }
                        else if (pid[pidNum][t] == "78") {
                            _StdOut.putText("x");
                        }
                        else if (pid[pidNum][t] == "79") {
                            _StdOut.putText("y");
                        }
                        else if (pid[pidNum][t] == "7A" || pid[pidNum][t] == "7a") {
                            _StdOut.putText("z");
                        }
                        else if (pid[pidNum][t] == "7B" || pid[pidNum][t] == "7b") {
                            _StdOut.putText("{");
                        }
                        else if (pid[pidNum][t] == "7C" || pid[pidNum][t] == "7c") {
                            _StdOut.putText("|");
                        }
                        else if (pid[pidNum][t] == "7D" || pid[pidNum][t] == "7d") {
                            _StdOut.putText("}");
                        }
                        else if (pid[pidNum][t] == "7E" || pid[pidNum][t] == "7e") {
                            _StdOut.putText("~");
                        }
                        else if (pid[pidNum][t] == "00") {
                            t = 300;
                        }
                        if (_Console.currentXPosition > 490) {
                            _StdOut.advanceLine();
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
                _MemoryManager.pcbArray[pidNum].setAllPCB();
                _MemoryManager.pcbArray[pidNum].printPCB();
            }
            else {
            }
            //_OSclock += 100;
            if (step == true) {
                document.getElementById("btnNext").disabled = false;
            }
        };
        //here
        Cpu.prototype.stepEncode = function (pidNum) {
            if (step == true && stepCounter < pid[pidNum].length) {
                _CPU.isExecuting = true;
                _Kernel.krnTrace('CPU cycle');
                for (var i = stepCounter; i < pid[pidNum].length; i++) {
                    while (pause == false) {
                        //A9 -- load accumulator with constant
                        if (pid[pidNum][i] === "a9" || pid[pidNum][i] === "A9") {
                            //_CPU.Acc = pid[pidNum][i + 1];
                            //_CPU.cycle();
                            accString = ("0x" + pid[pidNum][i + 1]);
                            accNum = parseInt(accString);
                            _CPU.Acc = accNum;
                            document.getElementById("cpuTable").rows[1].cells[2].innerHTML = _CPU.Acc;
                            // _StdOut.putText("Loaded accumulator with: " + _CPU.Acc);
                            stepCounter = i + 2;
                            pause = true;
                            i++;
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                            //instruction reg
                            opCode = "A9";
                            document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                        }
                        else if (pid[pidNum][i] === "8d" || pid[pidNum][i] === "8D") {
                            //i++;
                            // _CPU.cycle();
                            pc = i;
                            storeLocString = ("0x" + pid[pidNum][i + 1]);
                            storeLocNum = parseInt(storeLocString);
                            pid[pidNum][storeLocNum] = _CPU.Acc.toString(16);
                            //_StdOut.puText("test");
                            _MemoryManager.printMemoryAtLocation();
                            storeLocString = "";
                            stepCounter = i + 3;
                            pause = true;
                            //instruction reg
                            opCode = "8D";
                            document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                            //pc
                            i += 2;
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                        }
                        else if (pid[pidNum][i] === "6d" || pid[pidNum][i] === "6D") {
                            //   _CPU.cycle();
                            pc = i;
                            storeLocString = ("0x" + pid[pidNum][i + 1]);
                            storeLocNum = parseInt(storeLocString);
                            _CPU.Acc += parseInt(pid[pidNum][storeLocNum]);
                            document.getElementById("cpuTable").rows[1].cells[2].innerHTML = _CPU.Acc;
                            //_StdOut.puText("test");
                            _MemoryManager.printMemory();
                            storeLocString = "";
                            stepCounter = i + 3;
                            pause = true;
                            //instruction reg
                            opCode = "6D";
                            document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                            //pc
                            i += 2;
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                        }
                        else if (pid[pidNum][i] === "a2" || pid[pidNum][i] === "A2") {
                            //   _CPU.cycle();
                            _CPU.Xreg = parseInt("0x" + pid[pidNum][i + 1]);
                            //  _StdOut.putText("Loaded X reg with: " + _CPU.Xreg);
                            document.getElementById("cpuTable").rows[1].cells[3].innerHTML = _CPU.Xreg;
                            stepCounter = i + 2;
                            pause = true;
                            //instruction reg
                            opCode = "A2";
                            document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                            i++;
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = i;
                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                        }
                        else if (pid[pidNum][i] === "ae" || pid[pidNum][i] === "AE") {
                            //   _CPU.cycle();
                            var valString = "";
                            var valNum = 0;
                            valString = ("0x" + pid[pidNum][i + 1]);
                            valNum = parseInt(valString);
                            _CPU.Xreg = parseInt("0x" + pid[pidNum][valNum]);
                            document.getElementById("cpuTable").rows[1].cells[3].innerHTML = _CPU.Xreg;
                            stepCounter = i + 3;
                            pause = true;
                            //instruction reg
                            opCode = "AE";
                            document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                            //pc
                            i += 2;
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                        }
                        else if (pid[pidNum][i] === "a0" || pid[pidNum][i] === "A0") {
                            //  _CPU.cycle();
                            var valString = "";
                            valString = ("0x" + pid[pidNum][i + 1]);
                            _CPU.Yreg = parseInt(valString);
                            // _StdOut.putText("Loaded Y reg with: " + _CPU.Yreg);
                            document.getElementById("cpuTable").rows[1].cells[4].innerHTML = _CPU.Yreg;
                            stepCounter = i + 2;
                            pause = true;
                            //instruction reg
                            opCode = "A0";
                            document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                            i++;
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = i;
                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                        }
                        else if (pid[pidNum][i] === "ac" || pid[pidNum][i] === "AC") {
                            //     _CPU.cycle();
                            var valString = "";
                            var valNum = 0;
                            valString = ("0x" + pid[pidNum][i + 1]);
                            valNum = parseInt(valString);
                            _CPU.Yreg = parseInt("0x" + pid[pidNum][valNum]);
                            document.getElementById("cpuTable").rows[1].cells[4].innerHTML = _CPU.Yreg;
                            stepCounter = i + 3;
                            pause = true;
                            //instruction reg
                            opCode = "AC";
                            document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                            //pc
                            i += 2;
                            ;
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                        }
                        else if (pid[pidNum][i] === "ea" || pid[pidNum][i] === "EA") {
                            //    _CPU.cycle();
                            //No Operation
                            stepCounter = i + 1;
                            pause = true;
                            //instruction reg
                            opCode = "EA";
                            document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                            //pc
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                        }
                        else if (pid[pidNum][i] === "00") {
                            //    _CPU.cycle();
                            //System Call
                            //Maybe something here to do with steps?
                            stepCounter = i + 1;
                            pause = true;
                            //instruction reg
                            opCode = "00";
                            document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                            //pc
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                            _CPU.isExecuting = false;
                            stepCounter = 999;
                        }
                        else if (pid[pidNum][i] === "ec" || pid[pidNum][i] === "EC") {
                            //   _CPU.cycle();
                            var valString = "";
                            var valNum = 0;
                            valString = ("0x" + pid[pidNum][i + 1]);
                            valNum = parseInt(valString);
                            if (parseInt("0x" + pid[pidNum][valNum]) == _CPU.Xreg) {
                                _CPU.Zflag = 1;
                            }
                            else {
                                _CPU.Zflag = 0;
                            }
                            document.getElementById("cpuTable").rows[1].cells[5].innerHTML = _CPU.Zflag;
                            stepCounter = i + 3;
                            pause = true;
                            //instruction reg
                            opCode = "EC";
                            document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                            //pc
                            i++;
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                        }
                        else if (pid[pidNum][i] === "d0" || pid[pidNum][i] === "D0") {
                            if (_CPU.Zflag === 0) {
                                //      _CPU.cycle();
                                var valString = "";
                                var valNum = 0;
                                valString = ("0x" + pid[pidNum][i + 1]);
                                valNum = parseInt(valString);
                                i += valNum;
                                stepCounter = i + 2;
                                //pause = true;
                                //instruction reg
                                opCode = "D0";
                                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                                //pc
                                i++;
                                pc = i;
                                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                                //keeps within 256 size
                                if (i > 255) {
                                    i = i - 255;
                                    stepCounter = i;
                                }
                                //PCB
                                _PCB.setAllPCB();
                                _PCB.printPCB();
                            }
                            else {
                                stepCounter = i + 2;
                                //pause = true;
                                //instruction reg
                                opCode = "D0";
                                document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                                //pc
                                i++;
                                pc = i;
                                document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                                pause = true;
                            }
                        }
                        else if (pid[pidNum][i] === "ee" || pid[pidNum][i] === "EE") {
                            // _CPU.cycle();
                            var valString = "";
                            var valNum = 0;
                            var incNum = 0;
                            valString = ("0x" + pid[pidNum][i + 1]);
                            valNum = parseInt(valString);
                            incNum = parseInt("0x" + pid[pidNum][valNum]) + 1;
                            pid[pidNum][valNum] = incNum.toString(16);
                            _MemoryManager.printMemoryAtLocation();
                            stepCounter = i + 3;
                            pause = true;
                            //instruction reg
                            opCode = "EE";
                            document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                            //pc
                            i += 2;
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                        }
                        else if (pid[pidNum][i] === "ff" || pid[pidNum][i] === "FF") {
                            //_CPU.cycle();
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
                            stepCounter = i + 1;
                            pause = true;
                            //instruction reg
                            opCode = "FF";
                            document.getElementById("cpuTable").rows[1].cells[1].innerHTML = opCode;
                            //pc
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                        }
                        else {
                        }
                    }
                }
            }
            else {
                _CPU.isExecuting = false;
                if (_CPU.isExecuting === false) {
                    _StdOut.putText("CPU is finished." + String.fromCharCode(13));
                    document.getElementById("btnNext").disabled = true;
                    _PCB.finishedPCB();
                    _Console.buffer = "";
                    stepCounter = 0;
                }
                else {
                    _StdOut.putText("Whats going on?");
                }
            }
        };
        return Cpu;
    }());
    TSOS.Cpu = Cpu;
})(TSOS || (TSOS = {}));
