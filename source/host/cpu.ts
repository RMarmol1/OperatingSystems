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

module TSOS {

    export class Cpu {

        constructor(public PC: number = 0,
                    public Acc: number = 0,
                    public Xreg: number = 0,
                    public Yreg: number = 0,
                    public Zflag: number = 0,
                    public isExecuting: boolean = false) {

        }

        public init(): void {
            this.PC = 0;
            this.Acc = 0;
            this.Xreg = 0;
            this.Yreg = 0;
            this.Zflag = 0;
            this.isExecuting = false;
        }

        public cycle(): void {
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

                        //AD -- load accumulator from memory
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

                        //8D -- store A in given location
            else if (pid[pidNum][stepCounter] === "8d" || pid[pidNum][stepCounter] === "8D") {
                            //i++;

                          //  _CPU.cycle();
                pc = stepCounter;
                storeLocString = ("0x" + pid[pidNum][stepCounter + 1]);
                            storeLocNum = parseInt(storeLocString);

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
                            _PCB.setAllPCB();
                            _PCB.printPCB();

                            

                        }

                        //6D -- takes value at location and adds to ACC and keeps in ACC
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

                        //A2 -- load X reg with a constant
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

                        //AE -- loads X reg from memory
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

                        //A0 -- load Y reg with a constant
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

                        //AC -- loads Y reg from memory
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
                            stepCounter += 2;;
                            pc = stepCounter;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;

                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();

                        }

                        //EA
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

                        //00
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

                        //EC -- compare value at loaction to X reg, if > set Z flag to 1
            else if (pid[pidNum][stepCounter] === "ec" || pid[pidNum][stepCounter] === "EC") {
                        //    _CPU.cycle();
                            var valString = "";
                            var valNum = 0;
                            valString = ("0x" + pid[pidNum][stepCounter + 1]);
                            valNum = parseInt(valString);

                            if (parseInt("0x" + pid[pidNum][valNum]) == _CPU.Xreg) {
                                _CPU.Zflag = 1;
                            } else {
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

                        //D0 -- branch n bytes if z flag = 0
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

                            } else {


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

                        //EE -- increment value of byte at location by 1
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
                            _PCB.setAllPCB();
                            _PCB.printPCB();
                        }

                        //FF
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

                            // _StdOut.putText("Done");
            }

            //_OSclock += 100;

            if (step == true) {
                (<HTMLButtonElement>document.getElementById("btnNext")).disabled = false;
            }

           

        }

        //here
        public stepEncode(pidNum) {
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

                        //8D -- store A in given location
                        else if (pid[pidNum][i] === "8d" || pid[pidNum][i] === "8D") {
                            //i++;

                           // _CPU.cycle();
                            pc = i;
                            storeLocString = ("0x" + pid[pidNum][i + 1]);
                            storeLocNum = parseInt(storeLocString);
                            pid[pidNum][storeLocNum] = _CPU.Acc.toString(16);

                            //_StdOut.puText("test");
                            _MemoryManager.printMemory();


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

                        //6D -- takes value at location and adds to ACC and keeps in ACC
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

                        //A2 -- load X reg with a constant
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

                        //AE -- loads X reg from memory
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

                        //A0 -- load Y reg with a constant
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

                        //AC -- loads Y reg from memory
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
                            i += 2;;
                            pc = i;
                            document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;

                            //PCB
                            _PCB.setAllPCB();
                            _PCB.printPCB();

                        }

                        //EA
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

                        //00
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

                        //EC -- compare value at loaction to X reg, if > set Z flag to 1
                        else if (pid[pidNum][i] === "ec" || pid[pidNum][i] === "EC") {
                         //   _CPU.cycle();
                            var valString = "";
                            var valNum = 0;
                            valString = ("0x" + pid[pidNum][i + 1]);
                            valNum = parseInt(valString);

                            if (parseInt("0x" + pid[pidNum][valNum]) == _CPU.Xreg) {
                                _CPU.Zflag = 1;
                            } else {
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

                        //D0 -- branch n bytes if z flag = 0
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

                            } else {

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


                        //EE -- increment value of byte at location by 1
                        else if (pid[pidNum][i] === "ee" || pid[pidNum][i] === "EE") {
                           // _CPU.cycle();

                            var valString = "";
                            var valNum = 0;
                            var incNum = 0;

                            valString = ("0x" + pid[pidNum][i + 1]);
                            valNum = parseInt(valString);
                            incNum = parseInt("0x" + pid[pidNum][valNum]) + 1;
                            pid[pidNum][valNum] = incNum.toString(16);

                            _MemoryManager.printMemory();

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

                        //FF
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
                            // _StdOut.putText("Done");
                        }

                    }
                }
            } else {
                _CPU.isExecuting = false;


                if (_CPU.isExecuting === false) {
                    _StdOut.putText("CPU is finished." + String.fromCharCode(13));

                    (<HTMLButtonElement>document.getElementById("btnNext")).disabled = true;
                    _PCB.finishedPCB();
                    _Console.buffer = "";
                    stepCounter = 0;


                } else {
                    _StdOut.putText("Whats going on?");
                }
            }
        }
    }

   
}
