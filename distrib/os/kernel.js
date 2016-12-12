///<reference path="../globals.ts" />
///<reference path="queue.ts" />
/* ------------
     Kernel.ts

     Requires globals.ts
              queue.ts

     Routines for the Operating System, NOT the host.

     This code references page numbers in the text book:
     Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
     ------------ */
var TSOS;
(function (TSOS) {
    var Kernel = (function () {
        function Kernel() {
        }
        //
        // OS Startup and Shutdown Routines
        //
        Kernel.prototype.krnBootstrap = function () {
            TSOS.Control.hostLog("bootstrap", "host"); // Use hostLog because we ALWAYS want this, even if _Trace is off.
            // Initialize our global queues.
            _KernelInterruptQueue = new TSOS.Queue(); // A (currently) non-priority queue for interrupt requests (IRQs).
            _KernelBuffers = new Array(); // Buffers... for the kernel.
            _KernelInputQueue = new TSOS.Queue(); // Where device input lands before being processed out somewhere.
            // Initialize the console.
            _Console = new TSOS.Console(); // The command line interface / console I/O device.
            _Console.init();
            // Initialize standard input and output to the _Console.
            _StdIn = _Console;
            _StdOut = _Console;
            // Load the Keyboard Device Driver
            this.krnTrace("Loading the keyboard device driver.");
            _krnKeyboardDriver = new TSOS.DeviceDriverKeyboard(); // Construct it.
            _krnKeyboardDriver.driverEntry(); // Call the driverEntry() initialization routine.
            this.krnTrace(_krnKeyboardDriver.status);
            //
            // ... more?
            //
            // Initialize memory
            _Memory = new TSOS.Memory();
            _Memory.init();
            //Initialize PCB
            //_PCB = new PCB();
            //_PCB.init();
            //Initialize mem manager
            _MemoryManager = new TSOS.MemoryManager();
            _MemoryManager.init();
            //Initialize scheduler
            _Scheduler = new TSOS.Scheduler();
            _Scheduler.init();
            //intialize ready queue
            _ReadyQueue = new TSOS.ReadyQueue();
            _ReadyQueue.init();
            //intializes file system device driver
            _FileSystemDeviceDriver = new TSOS.FileSystemDeviceDriver();
            // Enable the OS Interrupts.  (Not the CPU clock interrupt, as that is done in the hardware sim.)
            this.krnTrace("Enabling the interrupts.");
            this.krnEnableInterrupts();
            // Launch the shell.
            this.krnTrace("Creating and Launching the shell.");
            _OsShell = new TSOS.Shell();
            _OsShell.init();
            // Finally, initiate student testing protocol.
            /*
            if (_GLaDOS) {
                _GLaDOS.afterStartup();
            }*/
        };
        Kernel.prototype.krnShutdown = function () {
            this.krnTrace("begin shutdown OS");
            // TODO: Check for running processes.  If there are some, alert and stop. Else...
            // ... Disable the Interrupts.
            this.krnTrace("Disabling the interrupts.");
            this.krnDisableInterrupts();
            //
            // Unload the Device Drivers?
            // More?
            //
            this.krnTrace("end shutdown OS");
        };
        Kernel.prototype.krnOnCPUClockPulse = function () {
            /* This gets called from the host hardware simulation every time there is a hardware clock pulse.
               This is NOT the same as a TIMER, which causes an interrupt and is handled like other interrupts.
               This, on the other hand, is the clock pulse from the hardware / VM / host that tells the kernel
               that it has to look for interrupts and process them if it finds any.                           */
            // Check for an interrupt, are any. Page 560
            if (_KernelInterruptQueue.getSize() > 0) {
                // Process the first interrupt on the interrupt queue.
                // TODO: Implement a priority queue based on the IRQ number/id to enforce interrupt priority.
                var interrupt = _KernelInterruptQueue.dequeue();
                this.krnInterruptHandler(interrupt.irq, interrupt.params);
            }
            else if (_CPU.isExecuting) {
                //_CPU.cycle();
                if (_CPU.isExecuting == true) {
                    _MemoryManager.pcbArray[pidNum].pcbState = "Running";
                    _CPU.PC = _MemoryManager.pcbArray[pidNum].pcbpc;
                    _CPU.Acc = _MemoryManager.pcbArray[pidNum].pcbAcc;
                    _CPU.Xreg = _MemoryManager.pcbArray[pidNum].pcbXReg;
                    _CPU.Yreg = _MemoryManager.pcbArray[pidNum].pcbYReg;
                    _CPU.Zflag = _MemoryManager.pcbArray[pidNum].pcbZReg;
                    //stepCounter = _MemoryManager.pcbArray[pidNum].pcbStepCounter;
                    //_StdOut.putText("step is " + stepCounter);
                    //_StdOut.advanceLine();
                    _CPU.cycle();
                    _ReadyQueue.setReadyQueue();
                    _CPU.waitTime++;
                    stepCounter++;
                    //if all processes running add to quantum counter
                    if (runAll == true) {
                        if (roundRobin == true) {
                            _Scheduler.quantumCounter++;
                        }
                    }
                    //RR scheduling
                    if (roundRobin == true) {
                        if (_Scheduler.quantumCounter > _Scheduler.quantum && runAll == true) {
                            _MemoryManager.pcbArray[pidNum].pcbState = "Ready";
                            _ReadyQueue.setReadyQueue();
                            _Scheduler.roundRobin(); //intiialzes context switch with rr scheduling and uses system call
                            _Mode = 1; //sets back to user mode
                            //_StdOut.putText("step is " + stepCounter);
                            //_StdOut.advanceLine();
                            _Scheduler.quantumCounter = 0;
                        }
                    }
                    //FCFS scheduling
                    if (fcfs == true) {
                        _Scheduler.quantum = 999999;
                        if (_Scheduler.quantumCounter > _Scheduler.quantum && runAll == true) {
                            _MemoryManager.pcbArray[pidNum].pcbState = "Ready";
                            _ReadyQueue.setReadyQueue();
                            _Scheduler.roundRobin(); //intiialzes context switch with rr scheduling and uses system call
                            _Mode = 1; //sets back to user mode
                            //_StdOut.putText("step is " + stepCounter);
                            //_StdOut.advanceLine();
                            _Scheduler.quantumCounter = 0;
                        }
                    }
                    if (stepCounter >= pid[pidNum].length) {
                        _CPU.isExecuting = false;
                        step = false;
                    }
                    if (step == true && _CPU.isExecuting == true) {
                        _CPU.isExecuting = false;
                    }
                    if (_CPU.isExecuting === false && step == false) {
                        _MemoryManager.pcbArray[pidNum].finishedPCB();
                        // stepCounter = 0;
                        _Scheduler.quantumCounter = 0;
                        // pidInMemNum = currentPIDInMem.indexOf(pidNum);
                        _StdOut.advanceLine();
                        _StdOut.putText("CPU is finished PID: " + pidNum + ". TT = " + _CPU.waitTime);
                        //_CPU.waitTime = 0;
                        _ReadyQueue.finishProcess();
                        _CPU.clearCPU();
                        _MemoryManager.priorityArray[pidNum] = 99999999999999999999999999999999999999999;
                        stepCounter = 0;
                        for (var i = 0; i < 256; i++) {
                            _Memory.processArray[pidNum][i] = "00";
                        }
                        if (_MemoryManager.posArray[pidNum] == 0) {
                            _Memory.position1 = false;
                        }
                        if (_MemoryManager.posArray[pidNum] == 1) {
                            _Memory.position2 = false;
                        }
                        if (_MemoryManager.posArray[pidNum] == 2) {
                            _Memory.position3 = false;
                        }
                        //swap
                        if (_ReadyQueue.position4 == true) {
                            var swapInPID = _MemoryManager.posArray.indexOf(99);
                            if (_Memory.position1 == false) {
                                _ReadyQueue.position4 = false;
                                _Memory.position1 = true;
                                _MemoryManager.posArray[swapInPID] = 0;
                                _MemoryManager.pcbArray[swapInPID].pcbLocation = "Memory";
                                currentPIDInMem[0] = swapInPID;
                                pidNum = swapInPID;
                                _Memory.formatSize(swapInPID);
                                _ReadyQueue.setReadyQueue();
                                _MemoryManager.printMemoryAtLocation();
                                _ReadyQueue.clearHardDrivePCB();
                            }
                            else if (_Memory.position2 == false) {
                                _ReadyQueue.position4 = false;
                                _Memory.position2 = true;
                                _MemoryManager.posArray[swapInPID] = 1;
                                _MemoryManager.pcbArray[swapInPID].pcbLocation = "Memory";
                                currentPIDInMem[1] = swapInPID;
                                pidNum = swapInPID;
                                _Memory.formatSize(swapInPID);
                                _ReadyQueue.setReadyQueue();
                                _MemoryManager.printMemoryAtLocation();
                                _ReadyQueue.clearHardDrivePCB();
                            }
                            else if (_Memory.position3 == false) {
                                _ReadyQueue.position4 = false;
                                _Memory.position3 = true;
                                _MemoryManager.posArray[swapInPID] = 2;
                                _MemoryManager.pcbArray[swapInPID].pcbLocation = "Memory";
                                currentPIDInMem[2] = swapInPID;
                                pidNum = swapInPID;
                                _Memory.formatSize(swapInPID);
                                _ReadyQueue.setReadyQueue();
                                _MemoryManager.printMemoryAtLocation();
                                _ReadyQueue.clearHardDrivePCB();
                            }
                            else {
                            }
                        }
                        if (_Memory.position1 == false && _Memory.position2 == false && _Memory.position3 == false) {
                            //_Memory.processArray = [];
                            //currentPIDInMem = [];
                            for (var i = 0; i < currentPIDInMem.length; i++) {
                                pidNum = currentPIDInMem[i];
                                _ReadyQueue.finishProcess();
                            }
                            //_PCB.finishedPCB();
                            _Memory.processArray = [];
                            currentPIDInMem = [];
                            _MemoryManager.printClearedMem();
                            _Memory.position1 = false;
                            _Memory.position2 = false;
                            _Memory.position3 = false;
                            //fix regular run
                            runAll = false;
                        }
                        _MemoryManager.printMemoryAtLocation();
                        _StdOut.advanceLine();
                        //runall
                        if (runAll == true && pidInMemNum < currentPIDInMem.length - 1) {
                            // _StdOut.putText("current pidinmemnum is "+pidInMemNum);
                            var argsArray = [];
                            // pidInMemNum++;
                            //moving from 0 to 1 or 2
                            if (_Memory.position2 == true && pidInMemNum == 0) {
                                pidInMemNum++;
                                //priority
                                if (priority == true) {
                                    _Scheduler.priorityScheduling();
                                }
                                argsArray[0] = currentPIDInMem[pidInMemNum];
                                pidNum = currentPIDInMem[pidInMemNum];
                                stepCounter = _MemoryManager.pcbArray[pidNum].pcbStepCounter;
                                //_StdOut.putText("step" + stepCounter);
                                _OsShell.shellRun(argsArray);
                            }
                            else if (_Memory.position2 == false && _Memory.position3 == true && pidInMemNum == 0) {
                                pidInMemNum += 2;
                                //priority
                                if (priority == true) {
                                    _Scheduler.priorityScheduling();
                                }
                                argsArray[0] = currentPIDInMem[pidInMemNum];
                                pidNum = currentPIDInMem[pidInMemNum];
                                stepCounter = _MemoryManager.pcbArray[pidNum].pcbStepCounter;
                                _OsShell.shellRun(argsArray);
                            }
                            else if (_Memory.position3 == false && pidInMemNum == 0) {
                                _CPU.isExecuting == false;
                                runAll = false;
                                _StdOut.putText("Done");
                            }
                            else if (_Memory.position3 == true && pidInMemNum == 1) {
                                pidInMemNum++;
                                //priority
                                if (priority == true) {
                                    _Scheduler.priorityScheduling();
                                }
                                argsArray[0] = currentPIDInMem[pidInMemNum];
                                pidNum = currentPIDInMem[pidInMemNum];
                                stepCounter = _MemoryManager.pcbArray[pidNum].pcbStepCounter;
                                _OsShell.shellRun(argsArray);
                            }
                            else if (_Memory.position3 == false && _Memory.position1 == true && pidInMemNum == 1) {
                                pidInMemNum = 0;
                                //priority
                                if (priority == true) {
                                    _Scheduler.priorityScheduling();
                                }
                                argsArray[0] = currentPIDInMem[pidInMemNum];
                                pidNum = currentPIDInMem[pidInMemNum];
                                stepCounter = _MemoryManager.pcbArray[pidNum].pcbStepCounter;
                                _OsShell.shellRun(argsArray);
                            }
                            else if (_Memory.position1 == false && pidInMemNum == 1) {
                                _CPU.isExecuting == false;
                                runAll = false;
                                _StdOut.putText("Done");
                            }
                            else {
                                _StdOut.putText("What?");
                            }
                        }
                        else {
                            //runAll = false;
                            var argsArray = [];
                            //move from 2 to 0
                            if (_Memory.position1 == true && pidInMemNum == 2) {
                                pidInMemNum = 0;
                                //priority
                                if (priority == true) {
                                    _Scheduler.priorityScheduling();
                                }
                                argsArray[0] = currentPIDInMem[pidInMemNum];
                                pidNum = currentPIDInMem[pidInMemNum];
                                stepCounter = _MemoryManager.pcbArray[pidNum].pcbStepCounter;
                                _OsShell.shellRun(argsArray);
                            }
                            //move from 2 to 1
                            if (_Memory.position1 == false && _Memory.position2 == true && pidInMemNum == 2) {
                                pidInMemNum = 1;
                                //priority
                                if (priority == true) {
                                    _Scheduler.priorityScheduling();
                                }
                                argsArray[0] = currentPIDInMem[pidInMemNum];
                                pidNum = currentPIDInMem[pidInMemNum];
                                stepCounter = _MemoryManager.pcbArray[pidNum].pcbStepCounter;
                                _OsShell.shellRun(argsArray);
                            }
                        }
                    }
                }
            }
            else {
                this.krnTrace("Idle");
            }
        };
        //
        // Interrupt Handling
        //
        Kernel.prototype.krnEnableInterrupts = function () {
            // Keyboard
            TSOS.Devices.hostEnableKeyboardInterrupt();
            // Put more here.
        };
        Kernel.prototype.krnDisableInterrupts = function () {
            // Keyboard
            TSOS.Devices.hostDisableKeyboardInterrupt();
            // Put more here.
        };
        Kernel.prototype.krnInterruptHandler = function (irq, params) {
            // This is the Interrupt Handler Routine.  See pages 8 and 560.
            // Trace our entrance here so we can compute Interrupt Latency by analyzing the log file later on. Page 766.
            this.krnTrace("Handling IRQ~" + irq);
            // Invoke the requested Interrupt Service Routine via Switch/Case rather than an Interrupt Vector.
            // TODO: Consider using an Interrupt Vector in the future.
            // Note: There is no need to "dismiss" or acknowledge the interrupts in our design here.
            //       Maybe the hardware simulation will grow to support/require that in the future.
            switch (irq) {
                case TIMER_IRQ:
                    this.krnTimerISR(); // Kernel built-in routine for timers (not the clock).
                    break;
                case KEYBOARD_IRQ:
                    _krnKeyboardDriver.isr(params); // Kernel mode device driver
                    _StdIn.handleInput();
                    break;
                case SOFTWARE_IRQ:
                    _Mode = 0; //sets to kernel mode
                    break;
                default:
                    this.krnTrapError("Invalid Interrupt Request. irq=" + irq + " params=[" + params + "]");
            }
        };
        Kernel.prototype.krnTimerISR = function () {
            // The built-in TIMER (not clock) Interrupt Service Routine (as opposed to an ISR coming from a device driver). {
            // Check multiprogramming parameters and enforce quanta here. Call the scheduler / context switch here if necessary.
        };
        //
        // System Calls... that generate software interrupts via tha Application Programming Interface library routines.
        //
        // Some ideas:
        // - ReadConsole
        // - WriteConsole
        // - CreateProcess
        // - ExitProcess
        // - WaitForProcessToExit
        // - CreateFile
        // - OpenFile
        // - ReadFile
        // - WriteFile
        // - CloseFile
        //
        // OS Utility Routines
        //
        Kernel.prototype.krnTrace = function (msg) {
            // Check globals to see if trace is set ON.  If so, then (maybe) log the message.
            if (_Trace) {
                if (msg === "Idle") {
                    // We can't log every idle clock pulse because it would lag the browser very quickly.
                    if (_OSclock % 10 == 0) {
                        // Check the CPU_CLOCK_INTERVAL in globals.ts for an
                        // idea of the tick rate and adjust this line accordingly.
                        TSOS.Control.hostLog(msg, "OS");
                    }
                }
                else {
                    TSOS.Control.hostLog(msg, "OS");
                }
            }
        };
        Kernel.prototype.krnTrapError = function (msg) {
            TSOS.Control.hostLog("OS ERROR - TRAP: " + msg);
            _DrawingContext.fillStyle = "blue";
            _DrawingContext.fillRect(0, 0, 500, 500);
            _DrawingContext.font = "20px Arial";
            _DrawingContext.fillStyle = "white";
            _DrawingContext.fillText("You Done Fucked Up", 50, 100);
            // TODO: Display error on console, perhaps in some sort of colored screen. (Maybe blue?)
            this.krnShutdown();
        };
        return Kernel;
    }());
    TSOS.Kernel = Kernel;
})(TSOS || (TSOS = {}));
