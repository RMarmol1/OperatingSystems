///<reference path="../globals.ts" />
/* ------------
     Console.ts

     Requires globals.ts

     The OS Console - stdIn and stdOut by default.
     Note: This is not the Shell. The Shell is the "command line interface" (CLI) or interpreter for this console.
     ------------ */
var TSOS;
(function (TSOS) {
    var Console = (function () {
        function Console(currentFont, currentFontSize, currentXPosition, currentYPosition, buffer, imageArray, //holds images for backspace
            xArray) {
            if (currentFont === void 0) { currentFont = _DefaultFontFamily; }
            if (currentFontSize === void 0) { currentFontSize = _DefaultFontSize; }
            if (currentXPosition === void 0) { currentXPosition = 0; }
            if (currentYPosition === void 0) { currentYPosition = _DefaultFontSize; }
            if (buffer === void 0) { buffer = ""; }
            if (imageArray === void 0) { imageArray = []; }
            if (xArray === void 0) { xArray = []; }
            this.currentFont = currentFont;
            this.currentFontSize = currentFontSize;
            this.currentXPosition = currentXPosition;
            this.currentYPosition = currentYPosition;
            this.buffer = buffer;
            this.imageArray = imageArray;
            this.xArray = xArray;
        }
        Console.prototype.init = function () {
            this.clearScreen();
            this.resetXY();
        };
        Console.prototype.clearScreen = function () {
            _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
        };
        Console.prototype.resetXY = function () {
            this.currentXPosition = 0;
            this.currentYPosition = this.currentFontSize;
        };
        Console.prototype.handleInput = function () {
            while (_KernelInputQueue.getSize() > 0) {
                // Get the next character from the kernel input queue.
                var chr = _KernelInputQueue.dequeue();
                // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
                if (chr === String.fromCharCode(13)) {
                    // The enter key marks the end of a console command, so ...
                    // ... tell the shell ...
                    _OsShell.handleInput(this.buffer);
                    /*for (var i = 0; i < (this.buffer).length; i++) {
                        logHistory.push(this.buffer.charAt(i));
                    }
                    logLength.push( (this.buffer).length);*/
                    logHistory.push(this.buffer);
                    // ... and reset our buffer.
                    this.buffer = "";
                }
                else if (chr === String.fromCharCode(8)) {
                    _DrawingContext.putImageData(this.imageArray.pop(), 0, 0); //draws before char to be backspaced was added
                    this.currentXPosition = this.xArray.pop(); //brings back last x position
                    this.buffer = (this.buffer).substring(0, (this.buffer).length - 1); //removes last char from buffer
                }
                else if (chr === String.fromCharCode(38)) {
                    logText = logHistory.pop();
                    logDown.push(logText);
                    this.putText(logText);
                    this.buffer += logText;
                }
                else if (chr === String.fromCharCode(40) && chr !== String.fromCharCode(57)) {
                    logText = logDown.pop();
                    logHistory.push(logText);
                    this.putText(logText);
                    this.buffer += logText;
                }
                else if (shifted == true) {
                    if (chr === String.fromCharCode(55)) {
                        this.putText("&");
                        this.buffer += "&";
                        shifted = false;
                    }
                    if (chr === String.fromCharCode(57)) {
                        this.putText("(");
                        this.buffer += "(";
                        shifted = false;
                    }
                }
                else if (chr === String.fromCharCode(9)) {
                    //ver
                    if ((this.buffer).indexOf("v") >= 0 && (this.buffer).indexOf("ver") < 0) {
                        if ((this.buffer).indexOf("e") < 0) {
                            this.putText("er");
                        }
                        else {
                            this.putText("r");
                        }
                        this.buffer = "ver";
                    }
                    //help
                    if (this.buffer === "h" || this.buffer === "he" || this.buffer === "hel") {
                        if (this.buffer === "h") {
                            this.putText("elp");
                            this.buffer += "elp";
                        }
                        if (this.buffer === "he") {
                            this.putText("lp");
                            this.buffer += "lp";
                        }
                        if (this.buffer === "hel") {
                            this.putText("p");
                            this.buffer += "p";
                        }
                    }
                    //shutdown
                    if (this.buffer === "sh" || this.buffer === "shu" || this.buffer === "shut" || this.buffer === "shutd" || this.buffer === "shutdo" || this.buffer === "shutdow") {
                        if (this.buffer === "sh") {
                            this.putText("utdown");
                            this.buffer += "utdown";
                        }
                        if (this.buffer === "shu") {
                            this.putText("tdown");
                            this.buffer += "tdown";
                        }
                        if (this.buffer === "shut") {
                            this.putText("down");
                            this.buffer += "down";
                        }
                        if (this.buffer === "shutd") {
                            this.putText("own");
                            this.buffer += "own";
                        }
                        if (this.buffer === "shutdo") {
                            this.putText("wn");
                            this.buffer += "wn";
                        }
                        if (this.buffer === "shutdow") {
                            this.putText("n");
                            this.buffer += "n";
                        }
                    }
                    //cls
                    if (this.buffer === "c" || this.buffer === "l") {
                        if (this.buffer === "c") {
                            this.putText("ls");
                            this.buffer += "ls";
                        }
                        if (this.buffer === "cl") {
                            this.putText("s");
                            this.buffer += "s";
                        }
                    }
                    //man
                    if (this.buffer === "m" || this.buffer === "a") {
                        if (this.buffer === "m") {
                            this.putText("an");
                            this.buffer += "an";
                        }
                        if (this.buffer === "ma") {
                            this.putText("n");
                            this.buffer += "n";
                        }
                    }
                    //trace
                    if (this.buffer === "t" || this.buffer === "tr" || this.buffer === "tra" || this.buffer === "trac") {
                        if (this.buffer === "t") {
                            this.putText("race");
                            this.buffer += "race";
                        }
                        if (this.buffer === "tr") {
                            this.putText("ace");
                            this.buffer += "ace";
                        }
                        if (this.buffer === "tra") {
                            this.putText("ce");
                            this.buffer += "ce";
                        }
                        if (this.buffer === "trac") {
                            this.putText("e");
                            this.buffer += "e";
                        }
                    }
                    //rot13
                    if (this.buffer === "r" || this.buffer === "ro" || this.buffer === "rot" || this.buffer === "rot1") {
                        if (this.buffer === "r") {
                            this.putText("ot13");
                            this.buffer += "ot13";
                        }
                        if (this.buffer === "ro") {
                            this.putText("t13");
                            this.buffer += "t13";
                        }
                        if (this.buffer === "rot") {
                            this.putText("13");
                            this.buffer += "13";
                        }
                        if (this.buffer === "rot1") {
                            this.putText("3");
                            this.buffer += "3";
                        }
                    }
                    //prompt
                    if (this.buffer === "p" || this.buffer === "pr" || this.buffer === "pro" || this.buffer === "prom" || this.buffer === "promp") {
                        if (this.buffer === "p") {
                            this.putText("rompt");
                            this.buffer += "rompt";
                        }
                        if (this.buffer === "pr") {
                            this.putText("ompt");
                            this.buffer += "ompt";
                        }
                        if (this.buffer === "pro") {
                            this.putText("mpt");
                            this.buffer += "mpt";
                        }
                        if (this.buffer === "prom") {
                            this.putText("pt");
                            this.buffer += "pt";
                        }
                        if (this.buffer === "promp") {
                            this.putText("t");
                            this.buffer += "t";
                        }
                    }
                    //date
                    if (this.buffer === "d" || this.buffer === "da" || this.buffer === "dat") {
                        if (this.buffer === "d") {
                            this.putText("ate");
                            this.buffer += "ate";
                        }
                        if (this.buffer === "da") {
                            this.putText("te");
                            this.buffer += "te";
                        }
                        if (this.buffer === "dat") {
                            this.putText("e");
                            this.buffer += "e";
                        }
                    }
                    //whereami
                    if (this.buffer === "w" || this.buffer === "wh" || this.buffer === "whe" || this.buffer === "wher" || this.buffer === "where" || this.buffer === "wherea" || this.buffer === "wheream") {
                        if (this.buffer === "w") {
                            this.putText("hereami");
                            this.buffer += "hereami";
                        }
                        if (this.buffer === "wh") {
                            this.putText("ereami");
                            this.buffer += "ereami";
                        }
                        if (this.buffer === "whe") {
                            this.putText("reami");
                            this.buffer += "reami";
                        }
                        if (this.buffer === "wher") {
                            this.putText("eami");
                            this.buffer += "eami";
                        }
                        if (this.buffer === "where") {
                            this.putText("ami");
                            this.buffer += "ami";
                        }
                        if (this.buffer === "wherea") {
                            this.putText("mi");
                            this.buffer += "mi";
                        }
                        if (this.buffer === "wheream") {
                            this.putText("t");
                            this.buffer += "i";
                        }
                    }
                    //gamble
                    if (this.buffer === "g" || this.buffer === "ga" || this.buffer === "gam" || this.buffer === "gamb" || this.buffer === "gambl") {
                        if (this.buffer === "g") {
                            this.putText("amble");
                            this.buffer += "amble";
                        }
                        if (this.buffer === "ga") {
                            this.putText("mble");
                            this.buffer += "mble";
                        }
                        if (this.buffer === "gam") {
                            this.putText("ble");
                            this.buffer += "ble";
                        }
                        if (this.buffer === "gamb") {
                            this.putText("le");
                            this.buffer += "le";
                        }
                        if (this.buffer === "gambl") {
                            this.putText("e");
                            this.buffer += "e";
                        }
                    }
                    //adduser
                    if (this.buffer === "addu" || this.buffer === "addus" || this.buffer === "adduse") {
                        if (this.buffer === "addu") {
                            this.putText("ser");
                            this.buffer += "ser";
                        }
                        if (this.buffer === "addus") {
                            this.putText("er");
                            this.buffer += "er";
                        }
                        if (this.buffer === "adduse") {
                            this.putText("r");
                            this.buffer += "r";
                        }
                    }
                    //addpass
                    if (this.buffer === "addp" || this.buffer === "addpa" || this.buffer === "addpas") {
                        if (this.buffer === "addp") {
                            this.putText("ass");
                            this.buffer += "ass";
                        }
                        if (this.buffer === "addpa") {
                            this.putText("ss");
                            this.buffer += "ss";
                        }
                        if (this.buffer === "addpas") {
                            this.putText("s");
                            this.buffer += "s";
                        }
                    }
                    //status
                    if (this.buffer === "st" || this.buffer === "sta" || this.buffer === "stat" || this.buffer === "statu") {
                        if (this.buffer === "st") {
                            this.putText("atus");
                            this.buffer += "atus";
                        }
                        if (this.buffer === "sta") {
                            this.putText("tus");
                            this.buffer += "tus";
                        }
                        if (this.buffer === "stat") {
                            this.putText("us");
                            this.buffer += "us";
                        }
                        if (this.buffer === "statu") {
                            this.putText("s");
                            this.buffer += "s";
                        }
                    }
                    //load
                    if (this.buffer === "l" || this.buffer === "lo" || this.buffer === "loa") {
                        if (this.buffer === "l") {
                            this.putText("oad");
                            this.buffer += "oad";
                        }
                        if (this.buffer === "lo") {
                            this.putText("ad");
                            this.buffer += "ad";
                        }
                        if (this.buffer === "loa") {
                            this.putText("d");
                            this.buffer += "d";
                        }
                    }
                }
                else {
                    // This is a "normal" character, so ...
                    // ... draw it on the screen...
                    this.imageArray.push(_DrawingContext.getImageData(0, 0, 500, 500));
                    this.xArray.push(this.currentXPosition);
                    this.putText(chr);
                    // ... and add it to our buffer.
                    this.buffer += chr;
                }
            }
        };
        Console.prototype.putText = function (text) {
            // My first inclination here was to write two functions: putChar() and putString().
            // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
            // between the two.  So rather than be like PHP and write two (or more) functions that
            // do the same thing, thereby encouraging confusion and decreasing readability, I
            // decided to write one function and use the term "text" to connote string or char.
            //
            // UPDATE: Even though we are now working in TypeScript, char and string remain undistinguished.
            //         Consider fixing that.
            if (text !== "") {
                // Draw the text at the current X and Y coordinates.
                _DrawingContext.drawText(this.currentFont, this.currentFontSize, this.currentXPosition, this.currentYPosition, text);
                // Move the current X position.
                var offset = _DrawingContext.measureText(this.currentFont, this.currentFontSize, text);
                this.currentXPosition = this.currentXPosition + offset;
            }
        };
        Console.prototype.advanceLine = function () {
            this.currentXPosition = 0;
            /*
             * Font size measures from the baseline to the highest point in the font.
             * Font descent measures from the baseline to the lowest point in the font.
             * Font height margin is extra spacing between the lines.
             */
            if (this.currentYPosition > (500 - _DefaultFontSize)) {
                // var scroll = _DrawingContext.getImageData(0, (0 + (2 * _DefaultFontSize) + _FontHeightMargin), 500, (500 - ( (2*_DefaultFontSize) + _FontHeightMargin));
                var scroll = _DrawingContext.getImageData(0, (_DefaultFontSize + (_FontHeightMargin * 2)), 500, (500 - _DefaultFontSize + (_FontHeightMargin * 3)));
                _DrawingContext.putImageData(scroll, 0, 0);
            }
            else {
                this.currentYPosition += _DefaultFontSize +
                    _DrawingContext.fontDescent(this.currentFont, this.currentFontSize) +
                    _FontHeightMargin;
            }
            // TODO: Handle scrolling. (iProject 1)
        };
        return Console;
    }());
    TSOS.Console = Console;
})(TSOS || (TSOS = {}));
