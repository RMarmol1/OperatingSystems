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
            //  _StdOut.putText("CUNT");
            var pidNum = args[0];
            // var rowCount = 0;
            //var cellCount = 1;
            //this.rewriteMemoryTable(pidNum);
            _CPU.isExecuting = true;
            if (_CPU.isExecuting === true) {
                _StdOut.putText("CPU is executing...");
            }
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
            for (var i = 0; i < pid[pidNum].length; i++) {
                //A9 -- load accumulator with constant
                if (pid[pidNum][i] === "a9" || pid[pidNum][i] === "A9") {
                    //_CPU.Acc = pid[pidNum][i + 1];
                    _CPU.cycle();
                    accString = ("0x" + pid[pidNum][i + 1]);
                    accNum = parseInt(accString);
                    _CPU.Acc = accNum;
                    document.getElementById("cpuTable").rows[1].cells[2].innerHTML = _CPU.Acc;
                    // _StdOut.putText("Loaded accumulator with: " + _CPU.Acc);
                    i++;
                    pc = i;
                    document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "A9";
                }
                else if (pid[pidNum][i] === "ad" || pid[pidNum][i] === "AD") {
                    _CPU.cycle();
                    var valString = "";
                    var valNum = 0;
                    valString = ("0x" + pid[pidNum][i + 1]);
                    valNum = parseInt(valString);
                    _CPU.Acc = parseInt("0x" + pid[pidNum][valNum]);
                    document.getElementById("cpuTable").rows[1].cells[2].innerHTML = _CPU.Acc;
                    pc = i + 1;
                    document.getElementById("cpuTable").rows[1].cells[0].innerHTML = pc;
                    // _StdOut.putText("Loaded accumulator with: " + _CPU.Acc);
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "AD";
                }
                else if (pid[pidNum][i] === "8d" || pid[pidNum][i] === "8D") {
                    //i++;
                    _CPU.cycle();
                    pc = i;
                    storeLocString = ("0x" + pid[pidNum][i + 1]);
                    storeLocNum = parseInt(storeLocString);
                    pid[pidNum][storeLocNum] = _CPU.Acc.toString(16);
                    //_StdOut.puText("test");
                    for (var t = 0; t < pid[pidNum].length; t++) {
                        if (cellCount > 8) {
                            rowCount++;
                            cellCount = 1;
                            t--;
                            document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][t];
                        }
                        else {
                            document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][t];
                            cellCount++;
                        }
                    }
                    rowCount = 0;
                    cellCount = 1;
                    storeLocString = "";
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "8D";
                }
                else if (pid[pidNum][i] === "6d" || pid[pidNum][i] === "6D") {
                    _CPU.cycle();
                    pc = i;
                    storeLocString = ("0x" + pid[pidNum][i + 1]);
                    storeLocNum = parseInt(storeLocString);
                    _CPU.Acc += parseInt(pid[pidNum][storeLocNum]);
                    document.getElementById("cpuTable").rows[1].cells[2].innerHTML = _CPU.Acc;
                    //_StdOut.puText("test");
                    for (var t = 0; t < pid[pidNum].length; t++) {
                        if (cellCount > 8) {
                            rowCount++;
                            cellCount = 1;
                            t--;
                            document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][t];
                        }
                        else {
                            document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][t];
                            cellCount++;
                        }
                    }
                    rowCount = 0;
                    cellCount = 1;
                    storeLocString = "";
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "6D";
                }
                else if (pid[pidNum][i] === "a2" || pid[pidNum][i] === "A2") {
                    _CPU.cycle();
                    _CPU.Xreg = parseInt("0x" + pid[pidNum][i + 1]);
                    //  _StdOut.putText("Loaded X reg with: " + _CPU.Xreg);
                    document.getElementById("cpuTable").rows[1].cells[3].innerHTML = _CPU.Xreg;
                    i++;
                    pc = i;
                    document.getElementById("cpuTable").rows[1].cells[0].innerHTML = i;
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "A2";
                }
                else if (pid[pidNum][i] === "ae" || pid[pidNum][i] === "AE") {
                    _CPU.cycle();
                    var valString = "";
                    var valNum = 0;
                    valString = ("0x" + pid[pidNum][i + 1]);
                    valNum = parseInt(valString);
                    _CPU.Xreg = parseInt("0x" + pid[pidNum][valNum]);
                    document.getElementById("cpuTable").rows[1].cells[3].innerHTML = _CPU.Xreg;
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "AE";
                }
                else if (pid[pidNum][i] === "a0" || pid[pidNum][i] === "A0") {
                    _CPU.cycle();
                    _CPU.Yreg = pid[pidNum][i + 1];
                    // _StdOut.putText("Loaded Y reg with: " + _CPU.Yreg);
                    document.getElementById("cpuTable").rows[1].cells[4].innerHTML = _CPU.Yreg;
                    i++;
                    pc = i;
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = i;
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "A0";
                }
                else if (pid[pidNum][i] === "ac" || pid[pidNum][i] === "AC") {
                    _CPU.cycle();
                    var valString = "";
                    var valNum = 0;
                    valString = ("0x" + pid[pidNum][i + 1]);
                    valNum = parseInt(valString);
                    _CPU.Yreg = parseInt("0x" + pid[pidNum][valNum]);
                    document.getElementById("cpuTable").rows[1].cells[4].innerHTML = _CPU.Yreg;
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "AC";
                }
                else if (pid[pidNum][i] === "ea" || pid[pidNum][i] === "EA") {
                    _CPU.cycle();
                    //No Operation
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "EA";
                }
                else if (pid[pidNum][i] === "00") {
                    _CPU.cycle();
                    //System Call
                    //Maybe something here to do with steps?
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "00";
                }
                else if (pid[pidNum][i] === "ec" || pid[pidNum][i] === "EC") {
                    _CPU.cycle();
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
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "EC";
                }
                else if (pid[pidNum][i] === "d0" || pid[pidNum][i] === "D0") {
                    _CPU.cycle();
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "D0";
                }
                else if (pid[pidNum][i] === "ee" || pid[pidNum][i] === "EE") {
                    _CPU.cycle();
                    var valString = "";
                    var valNum = 0;
                    var incNum = 0;
                    valString = ("0x" + pid[pidNum][i + 1]);
                    valNum = parseInt(valString);
                    incNum = parseInt("0x" + pid[pidNum][valNum]) + 1;
                    pid[pidNum][valNum] = incNum.toString(16);
                    for (var t = 0; t < pid[pidNum].length; t++) {
                        if (cellCount > 8) {
                            rowCount++;
                            cellCount = 1;
                            t--;
                            document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][t];
                        }
                        else {
                            document.getElementById("memoryTable").rows[rowCount].cells[cellCount].innerHTML = pid[pidNum][t];
                            cellCount++;
                        }
                    }
                    rowCount = 0;
                    cellCount = 1;
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "EE";
                }
                else if (pid[pidNum][i] === "ff" || pid[pidNum][i] === "ff") {
                    _CPU.cycle();
                    //System Call
                    //instruction reg
                    document.getElementById("cpuTable").rows[1].cells[1].innerHTML = "FF";
                }
                else {
                }
            }
            _CPU.isExecuting = false;
            if (_CPU.isExecuting === false) {
                _StdOut.putText("CPU is finished.");
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
                pid.push(arrayHex);
                /*for (var i = 0; i < hexArray.length; i++) {
                    _StdOut.putText(hexArray[i]);
                }*/
                _StdOut.putText("PID[" + pidCounter + "] has been added.");
                pidCounter++;
            }
            else {
                _StdOut.putText("Value is not in Hex!");
            }
        };
        return Shell;
    }());
    TSOS.Shell = Shell;
})(TSOS || (TSOS = {}));
