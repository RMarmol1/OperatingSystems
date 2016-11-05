///<reference path="../globals.ts" />
///<reference path="../utils.ts" />
///<reference path="shellCommand.ts" />
///<reference path="userCommand.ts" />
/* ------------
   Shell.ts

   The OS Shell - The "command line interface" (CLI) for the console.

    Note: While fun and learning are the primary goals of all enrichment center activities,
          serious injuries may occur when trying to write your own Operating System.
   ------------ */
// TODO: Write a base class / prototype for system services and let Shell inherit from it.
var TSOS;
(function (TSOS) {
    var Shell = (function () {
        function Shell() {
            // Properties
            this.promptStr = ">";
            this.commandList = [];
            this.curses = "[fuvg],[cvff],[shpx],[phag],[pbpxfhpxre],[zbgureshpxre],[gvgf]";
            this.apologies = "[sorry]";
        }
        Shell.prototype.init = function () {
            var sc;
            //
            // Load the command list.
            // ver
            sc = new TSOS.ShellCommand(this.shellVer, "ver", "- Displays the current version data.");
            this.commandList[this.commandList.length] = sc;
            // help
            sc = new TSOS.ShellCommand(this.shellHelp, "help", "- This is the help command. Seek help.");
            this.commandList[this.commandList.length] = sc;
            // shutdown
            sc = new TSOS.ShellCommand(this.shellShutdown, "shutdown", "- Shuts down the virtual OS but leaves the underlying host / hardware simulation running.");
            this.commandList[this.commandList.length] = sc;
            // cls
            sc = new TSOS.ShellCommand(this.shellCls, "cls", "- Clears the screen and resets the cursor position.");
            this.commandList[this.commandList.length] = sc;
            // man <topic>
            sc = new TSOS.ShellCommand(this.shellMan, "man", "<topic> - Displays the MANual page for <topic>.");
            this.commandList[this.commandList.length] = sc;
            // trace <on | off>
            sc = new TSOS.ShellCommand(this.shellTrace, "trace", "<on | off> - Turns the OS trace on or off.");
            this.commandList[this.commandList.length] = sc;
            // rot13 <string>
            sc = new TSOS.ShellCommand(this.shellRot13, "rot13", "<string> - Does rot13 obfuscation on <string>.");
            this.commandList[this.commandList.length] = sc;
            // prompt <string>
            sc = new TSOS.ShellCommand(this.shellPrompt, "prompt", "<string> - Sets the prompt.");
            this.commandList[this.commandList.length] = sc;
            // date
            sc = new TSOS.ShellCommand(this.shellDate, "date", " - Shows the current date and time.");
            this.commandList[this.commandList.length] = sc;
            //whereami
            sc = new TSOS.ShellCommand(this.shellWhereAmI, "whereami", " - Shows the current location of user.");
            this.commandList[this.commandList.length] = sc;
            //gamble
            sc = new TSOS.ShellCommand(this.shellGamble, "gamble", " - randomly either dislpays congrats message or closes OS.");
            this.commandList[this.commandList.length] = sc;
            //add user
            sc = new TSOS.ShellCommand(this.shellAddUser, "adduser", "<string> - adds user");
            this.commandList[this.commandList.length] = sc;
            //add password
            sc = new TSOS.ShellCommand(this.shellAddPass, "addpass", "<string> - adds passowrd for last added user");
            this.commandList[this.commandList.length] = sc;
            //status
            sc = new TSOS.ShellCommand(this.shellStatus, "status", "<string> - sets status message in Host Display");
            this.commandList[this.commandList.length] = sc;
            //load
            sc = new TSOS.ShellCommand(this.shellLoad, "load", " - validates user code in the HTML5 text area by checking for hex digits and spaces");
            this.commandList[this.commandList.length] = sc;
            //run
            sc = new TSOS.ShellCommand(this.shellRun, "run", "<pid> - runs CPU code from given PID");
            this.commandList[this.commandList.length] = sc;
            //bsod
            sc = new TSOS.ShellCommand(this.shellBSOD, "bsod", " - simulates blue screen of death");
            this.commandList[this.commandList.length] = sc;
            //clearmem
            sc = new TSOS.ShellCommand(this.shellClearMem, "clearmem", " - clears all memory partitions");
            this.commandList[this.commandList.length] = sc;
            //runall
            sc = new TSOS.ShellCommand(this.shellRunAll, "runall", " - runs all processes in memory");
            this.commandList[this.commandList.length] = sc;
            //quantum
            sc = new TSOS.ShellCommand(this.shellQuantum, "quantum", "<int> - sets the quanta for Round Robin");
            this.commandList[this.commandList.length] = sc;
            //ps
            sc = new TSOS.ShellCommand(this.shellPs, "ps", " - lists all actively running processes");
            this.commandList[this.commandList.length] = sc;
            //kill
            sc = new TSOS.ShellCommand(this.shellKill, "kill", "<int> - kills active running process");
            this.commandList[this.commandList.length] = sc;
            // ps  - list the running processes and their IDs
            // kill <id> - kills the specified process id.
            //
            // Display the initial prompt.
            this.putPrompt();
        };
        Shell.prototype.putPrompt = function () {
            _StdOut.putText(this.promptStr);
        };
        Shell.prototype.handleInput = function (buffer) {
            _Kernel.krnTrace("Shell Command~" + buffer);
            //
            // Parse the input...
            //
            var userCommand = this.parseInput(buffer);
            // ... and assign the command and args to local variables.
            var cmd = userCommand.command;
            var args = userCommand.args;
            //
            // Determine the command and execute it.
            //
            // TypeScript/JavaScript may not support associative arrays in all browsers so we have to iterate over the
            // command list in attempt to find a match.  TODO: Is there a better way? Probably. Someone work it out and tell me in class.
            var index = 0;
            var found = false;
            var fn = undefined;
            while (!found && index < this.commandList.length) {
                if (this.commandList[index].command === cmd) {
                    found = true;
                    fn = this.commandList[index].func;
                }
                else {
                    ++index;
                }
            }
            if (found) {
                this.execute(fn, args);
            }
            else {
                // It's not found, so check for curses and apologies before declaring the command invalid.
                if (this.curses.indexOf("[" + TSOS.Utils.rot13(cmd) + "]") >= 0) {
                    this.execute(this.shellCurse);
                }
                else if (this.apologies.indexOf("[" + cmd + "]") >= 0) {
                    this.execute(this.shellApology);
                }
                else {
                    this.execute(this.shellInvalidCommand);
                }
            }
        };
        // Note: args is an option parameter, ergo the ? which allows TypeScript to understand that.
        Shell.prototype.execute = function (fn, args) {
            // We just got a command, so advance the line...
            _StdOut.advanceLine();
            // ... call the command function passing in the args with some über-cool functional programming ...
            fn(args);
            // Check to see if we need to advance the line again
            if (_StdOut.currentXPosition > 0) {
                _StdOut.advanceLine();
            }
            // ... and finally write the prompt again.
            this.putPrompt();
        };
        Shell.prototype.parseInput = function (buffer) {
            var retVal = new TSOS.UserCommand();
            // 1. Remove leading and trailing spaces.
            buffer = TSOS.Utils.trim(buffer);
            // 2. Lower-case it.
            buffer = buffer.toLowerCase();
            // 3. Separate on spaces so we can determine the command and command-line args, if any.
            var tempList = buffer.split(" ");
            // 4. Take the first (zeroth) element and use that as the command.
            var cmd = tempList.shift(); // Yes, you can do that to an array in JavaScript.  See the Queue class.
            // 4.1 Remove any left-over spaces.
            cmd = TSOS.Utils.trim(cmd);
            // 4.2 Record it in the return value.
            retVal.command = cmd;
            // 5. Now create the args array from what's left.
            for (var i in tempList) {
                var arg = TSOS.Utils.trim(tempList[i]);
                if (arg != "") {
                    retVal.args[retVal.args.length] = tempList[i];
                }
            }
            return retVal;
        };
        //
        // Shell Command Functions.  Kinda not part of Shell() class exactly, but
        // called from here, so kept here to avoid violating the law of least astonishment.
        //
        Shell.prototype.shellInvalidCommand = function () {
            _StdOut.putText("Invalid Command. ");
            if (_SarcasticMode) {
                _StdOut.putText("Unbelievable. You, [subject name here],");
                _StdOut.advanceLine();
                _StdOut.putText("must be the pride of [subject hometown here].");
            }
            else {
                _StdOut.putText("Type 'help' for, well... help.");
            }
        };
        Shell.prototype.shellCurse = function () {
            _StdOut.putText("Oh, so that's how it's going to be, eh? Fine.");
            _StdOut.advanceLine();
            _StdOut.putText("Bitch.");
            _SarcasticMode = true;
        };
        Shell.prototype.shellApology = function () {
            if (_SarcasticMode) {
                _StdOut.putText("I think we can put our differences behind us.");
                _StdOut.advanceLine();
                _StdOut.putText("For science . . . You monster.");
                _SarcasticMode = false;
            }
            else {
                _StdOut.putText("For what?");
            }
        };
        Shell.prototype.shellVer = function (args) {
            history[history.length] = args[0];
            _StdOut.putText(APP_NAME + " version " + APP_VERSION);
        };
        Shell.prototype.shellHelp = function (args) {
            _StdOut.putText("Commands:");
            for (var i in _OsShell.commandList) {
                _StdOut.advanceLine();
                _StdOut.putText("  " + _OsShell.commandList[i].command + " " + _OsShell.commandList[i].description);
            }
        };
        Shell.prototype.shellShutdown = function (args) {
            _StdOut.putText("Shutting down...");
            // Call Kernel shutdown routine.
            _Kernel.krnShutdown();
            // TODO: Stop the final prompt from being displayed.  If possible.  Not a high priority.  (Damn OCD!)
        };
        Shell.prototype.shellCls = function (args) {
            _StdOut.clearScreen();
            _StdOut.resetXY();
        };
        Shell.prototype.shellMan = function (args) {
            if (args.length > 0) {
                var topic = args[0];
                switch (topic) {
                    case "help":
                        _StdOut.putText("Help displays a list of (hopefully) valid commands.");
                        break;
                    case "ver":
                        _StdOut.putText("Ver displays the current OS version you are working with. This includes name and version number of OS");
                        break;
                    case "shutdown":
                        ;
                        _StdOut.putText("Shutdown will turn off MARMOLADE-OS but keeps the host and hardware going. It's basically abandoning the OS while the host and hardware carry on");
                        break;
                    case "cls":
                        ;
                        _StdOut.putText("cls will clear everything (except your own existence from this Earth) on the shell input/output screen and bring the cursor (where you begin to type) back to the top");
                        break;
                    case "man":
                        ;
                        _StdOut.putText("Man brings up a basic manual on how to use shell functions and what they do");
                        break;
                    case "trace":
                        ;
                        _StdOut.putText("Trace ON keeps the host log...logging and trace OFF will stop it from doing so.");
                        break;
                    case "rot13":
                        ;
                        _StdOut.putText("rot13 will put a simple letter substitution cipher replacing every letter with the letter 13 letters after it.");
                        break;
                    case "prompt":
                        ;
                        _StdOut.putText("Prompt will output the desired string, no matter how weird, every time a new line is outputted");
                        break;
                    case "date":
                        ;
                        _StdOut.putText("Shows you the date and time in case you were wondering");
                        break;
                    case "whereami":
                        ;
                        _StdOut.putText("Lost? Just check here.");
                        break;
                    case "gamble":
                        ;
                        _StdOut.putText("Feeling lucky? Gamble randomly either turns off the OS or you get a nice message");
                        break;
                    case "adduser":
                        ;
                        _StdOut.putText("Adds a user according to username inputted");
                        break;
                    case "addpass":
                        ;
                        _StdOut.putText("Adds passowrd for last added user so be careful!");
                        break;
                    case "status":
                        ;
                        _StdOut.putText("Sets a cool (or boring) status message in the Host Log.");
                        break;
                    case "load":
                        ;
                        _StdOut.putText("Tests user program input to see if its in Hex or not and assigns it a process ID (PID)");
                        break;
                    case "run":
                        ;
                        _StdOut.putText("runs given PID");
                        break;
                    // TODO: Make descriptive MANual page entries for the the rest of the shell commands here.
                    default:
                        _StdOut.putText("No manual entry for " + args[0] + ".");
                }
            }
            else {
                _StdOut.putText("Usage: man <topic>  Please supply a topic.");
            }
        };
        Shell.prototype.shellTrace = function (args) {
            if (args.length > 0) {
                var setting = args[0];
                switch (setting) {
                    case "on":
                        if (_Trace && _SarcasticMode) {
                            _StdOut.putText("Trace is already on, doofus.");
                        }
                        else {
                            _Trace = true;
                            _StdOut.putText("Trace ON");
                        }
                        break;
                    case "off":
                        _Trace = false;
                        _StdOut.putText("Trace OFF");
                        break;
                    default:
                        _StdOut.putText("Invalid arguement.  Usage: trace <on | off>.");
                }
            }
            else {
                _StdOut.putText("Usage: trace <on | off>");
            }
        };
        Shell.prototype.shellRot13 = function (args) {
            if (args.length > 0) {
                // Requires Utils.ts for rot13() function.
                _StdOut.putText(args.join(' ') + " = '" + TSOS.Utils.rot13(args.join(' ')) + "'");
            }
            else {
                _StdOut.putText("Usage: rot13 <string>  Please supply a string.");
            }
        };
        Shell.prototype.shellPrompt = function (args) {
            if (args.length > 0) {
                _OsShell.promptStr = args[0];
            }
            else {
                _StdOut.putText("Usage: prompt <string>  Please supply a string.");
            }
        };
        Shell.prototype.shellDate = function (args) {
            _StdOut.putText("Date: " + month.toString() + "-" + day.toString() + "-" + year.toString() + "  Time: " + hour.toString() + ":" + minutes.toString() + ":" + seconds.toString());
        };
        Shell.prototype.shellBSOD = function (args) {
            //  Control.hostLog("OS ERROR - TRAP: " + msg);
            var hostLog = document.getElementById("taHostLog");
            hostLog.value = "OS ERROR. WHY MUST YOU KILL ME? WHAT GIVES YOU THE RIGHT TO PULL ME FROM THIS EXISTENCE?";
            _Trace = false;
            _DrawingContext.fillStyle = "blue";
            _DrawingContext.fillRect(0, 0, 500, 500);
            _DrawingContext.font = "20px Arial";
            _DrawingContext.fillStyle = "white";
            _DrawingContext.fillText("You Done Fucked Up", 50, 100);
            _Kernel.krnShutdown();
        };
        Shell.prototype.shellWhereAmI = function (args) {
            _StdOut.putText("You are currently in: " + loc);
        };
        Shell.prototype.shellGamble = function (args) {
            num = Math.floor((Math.random() * 10) + 1);
            if (num < 6)
                _StdOut.putText("Congrats you won the Gamble. Wouldn't try it again tho");
            else if (num > 5) {
                _StdOut.putText("You Lost BYE");
                _StdOut.putText("Shutting down...");
                _Kernel.krnShutdown();
            }
            else
                _StdOut.putText("Somethingwent wrong");
        };
        Shell.prototype.shellAddUser = function (args) {
            users[users.length] = args[0];
            _StdOut.putText("Added User: " + users[users.indexOf(args[0])]);
        };
        Shell.prototype.shellStatus = function (args) {
            status = args;
            _StdOut.putText("Status set to: " + status);
        };
        Shell.prototype.shellAddPass = function (args) {
            pass[pass.length] = args[0];
            _StdOut.putText("Added password: " + pass[pass.indexOf(args[0])] + " for User: " + users[users.length - 1]);
        };
        Shell.prototype.shellRun = function (args) {
            runPID = args[0];
            _Memory.processID = runPID;
            pid = _Memory.processArray;
            pidNum = _Memory.processID;
            //var empty = [];
            if (step == true) {
                document.getElementById("btnNext").disabled = false;
            }
            if (pid.toString() == "") {
                _StdOut.putText("Memory is empty. Nothing to run");
            }
            else {
                if (runPID > (pidCounter) || pid[runPID] == null) {
                    _StdOut.putText("Unrecognized process ID: " + pidNum);
                }
                else {
                    _CPU.isExecuting = true;
                }
            }
            if (_CPU.isExecuting === true) {
                _StdOut.putText("CPU is executing...");
                _StdOut.advanceLine();
                _MemoryManager.printMemoryAtLocation();
                //PCB
                // _PCB.pcbPID = pidNum;
                _MemoryManager.pcbArray[pidNum].printPCB();
            }
        };
        Shell.prototype.shellLoad = function (args) {
            val = document.getElementById("taProgramInput").value;
            // val.replace(/(\r\n|\n|\r)/gm, "");
            hexArray = val.split("");
            if (val.length < 1) {
                _StdOut.putText("Nothing to load.");
            }
            for (var i = 0; i < hexArray.length; i++) {
                if (validChar.indexOf(hexArray[i]) < 0) {
                    hexBoolean = false;
                }
                else {
                    hexBoolean = true;
                }
            }
            if (hexBoolean == true) {
                arrayHex = [];
                for (var i = 0; i < hexArray.length; i++) {
                    if (hexArray[i] === " " || hexArray[i] === "," || hexArray[i] === "\n" || hexArray[i].length == 0) {
                        hexArray.splice(i, 1);
                    }
                }
                // _StdOut.putText(hexArray);
                for (var i = 0; i < hexArray.length; i++) {
                    if (hexArray[i] === " ") {
                        hexArray.splice(i, 1);
                        i--;
                    }
                    else if (hexArray[i] === "\n") {
                        hexArray.splice(i, 1);
                        i--;
                    }
                    else {
                        arrayHex.push((hexArray[i] + hexArray[i + 1]));
                        i++;
                    }
                }
                // _Memory.processArray.push(arrayHex);
                if (_Memory.position1 == false) {
                    posNum = 0;
                    _Memory.position1 = true;
                }
                else if (_Memory.position2 == false) {
                    posNum = 1;
                    _Memory.position2 = true;
                }
                else if (_Memory.position3 == false) {
                    posNum = 2;
                    _Memory.position3 = true;
                }
                else {
                    posNum = 99;
                }
                if (posNum == 99) {
                    _StdOut.putText("Memory is full. Cannot load anymore processes");
                }
                else {
                    _Memory.processArray[pidCounter] = arrayHex;
                    _MemoryManager.posArray[pidCounter] = posNum;
                    //runall
                    currentPIDInMem.push(pidCounter);
                    _Memory.processID = pidCounter;
                    _StdOut.putText("PID[" + pidCounter + "] has been added at location " + posNum);
                    _Memory.formatSize(_Memory.processID);
                    //_MemoryManager.printMemory();
                    _MemoryManager.printMemoryAtLocation();
                    //PCB
                    _MemoryManager.pcbArray[pidCounter] = new TSOS.PCB();
                    _MemoryManager.pcbArray[pidCounter].init();
                    _MemoryManager.pcbArray[pidCounter].pcbPID = pidCounter;
                    pidCounter++;
                }
            }
            else {
                _StdOut.putText("Value is not in Hex!");
            }
        };
        Shell.prototype.shellClearMem = function () {
            _Memory.processArray = [];
            currentPIDInMem = [];
            _MemoryManager.printClearedMem();
            _Memory.position1 = false;
            _Memory.position2 = false;
            _Memory.position3 = false;
            _StdOut.putText("Memory Cleared");
        };
        Shell.prototype.shellRunAll = function () {
            //this.shellRun(0);
            //_StdOut.putText("Sure");
            var argsArr = currentPIDInMem;
            runAll = true;
            _Scheduler.quantumCounter = 0;
            pidInMemNum = 0;
            //_CPU.stillRunning = true;
            _OsShell.shellRun(argsArr);
        };
        Shell.prototype.shellQuantum = function (args) {
            _Scheduler.setQuantum(args[0]);
            _StdOut.putText("Quantum is set to: " + _Scheduler.quantum);
        };
        Shell.prototype.shellPs = function () {
            //shows currently active pids
            _StdOut.putText("Currently active PIDs:");
            _StdOut.advanceLine();
            for (var i = 0; i < currentPIDInMem.length; i++) {
                _StdOut.putText("PID: " + currentPIDInMem[i]);
                _StdOut.advanceLine();
            }
        };
        Shell.prototype.shellKill = function (args) {
            if (_CPU.isExecuting == true) {
                _CPU.isExecuting = false;
                _Memory.processArray[args[0]] = null;
                _StdOut.putText("Killed PID:" + args[0]);
            }
        };
        return Shell;
    }());
    TSOS.Shell = Shell;
})(TSOS || (TSOS = {}));
