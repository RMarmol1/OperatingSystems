///<reference path="../globals.ts" />
///<reference path="deviceDriver.ts" />

/* ----------------------------------
   DeviceDriverKeyboard.ts

   Requires deviceDriver.ts

   The Kernel Keyboard Device Driver.
   ---------------------------------- */

module TSOS {

    // Extends DeviceDriver
    export class DeviceDriverKeyboard extends DeviceDriver {

        constructor() {
            // Override the base method pointers.

            // The code below cannot run because "this" can only be
            // accessed after calling super.
            //super(this.krnKbdDriverEntry, this.krnKbdDispatchKeyPress);
            super();
            this.driverEntry = this.krnKbdDriverEntry;
            this.isr = this.krnKbdDispatchKeyPress;
        }

        public krnKbdDriverEntry() {
            // Initialization routine for this, the kernel-mode Keyboard Device Driver.
            this.status = "loaded";
            // More?
        }

        public krnKbdDispatchKeyPress(params) {
            // Parse the params.    TODO: Check that the params are valid and osTrapError if not.
            var keyCode = params[0];
            var isShifted = params[1];
            //sets cap lock on or off
            if (keyCode == 20) { //capslock key -- checks if capslock is set or not
                capsLock = !capsLock;
            }
            _Kernel.krnTrace("Key code:" + keyCode + " shifted:" + isShifted + " capsLocked:" + capsLock);
            var chr = "";
            // Check to see if we even want to deal with the key that was pressed.
            if (((keyCode >= 65) && (keyCode <= 90)) ||   // A..Z
                ((keyCode >= 97) && (keyCode <= 123))) {  // a..z {
                // Determine the character we want to display.
                // Assume it's lowercase...
                chr = String.fromCharCode(keyCode + 32);

                // ... then check the shift key and re-adjust if necessary.
                if (isShifted) {
                    chr = String.fromCharCode(keyCode);
                }
                if (capsLock == true) {
                    chr = String.fromCharCode(keyCode);
                }
                // TODO: Check for caps-lock and handle as shifted if so.
                _KernelInputQueue.enqueue(chr);
            } else if (((keyCode >= 48) && (keyCode <= 57)) ||   // digits
                (keyCode == 32) ||   // space
                (keyCode == 13)) {                       // enter
                chr = String.fromCharCode(keyCode);
                if (isShifted) { //special characters

                    if (keyCode == 48) {
                        chr = String.fromCharCode(41);
                    }

                    if (keyCode == 49) {
                        chr = String.fromCharCode(33);
                    }

                    if (keyCode == 50) {
                        chr = String.fromCharCode(64);
                    }

                    if (keyCode == 51) {
                        chr = String.fromCharCode(35);
                    }

                    if (keyCode == 52) {
                        chr = String.fromCharCode(36);
                    }

                    if (keyCode == 53) {
                        chr = String.fromCharCode(37);
                    }

                    if (keyCode == 54) {
                        chr = String.fromCharCode(94);
                    }

                    if (keyCode == 55) {
                        chr = String.fromCharCode(38);
                    }

                    if (keyCode == 56) {
                        chr = String.fromCharCode(42);
                    }

                    if (keyCode == 57) {
                        chr = String.fromCharCode(40);
                    }


                }
                _KernelInputQueue.enqueue(chr);
            }

            else if (keyCode == 8) { //backspace
                //Backspace
                chr = String.fromCharCode(8);
                _KernelInputQueue.enqueue(chr);

            }

            else if (keyCode == 38) { //up key
                //arrow keys
                
                chr = String.fromCharCode(38);
                _KernelInputQueue.enqueue(chr);

            } else if (keyCode == 40) { //down key
                chr = String.fromCharCode(40);
                _KernelInputQueue.enqueue(chr);

            } else if (keyCode == 9) { //tab key
                chr = String.fromCharCode(9);
                _KernelInputQueue.enqueue(chr);
            }
        }
    }
}
