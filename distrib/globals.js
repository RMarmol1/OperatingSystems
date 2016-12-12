/* ------------
   Globals.ts

   Global CONSTANTS and _Variables.
   (Global over both the OS and Hardware Simulation / Host.)

   This code references page numbers in the text book:
   Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
   ------------ */
//
// Global CONSTANTS (TypeScript 1.5 introduced const. Very cool.)
//
var APP_NAME = "OS-MARMOLADE"; // 'cause Bob and I were at a loss for a better name.
var APP_VERSION = "4.00"; // What did you expect?
var CPU_CLOCK_INTERVAL = 100; // This is in ms (milliseconds) so 1000 = 1 second.
var TIMER_IRQ = 0; // Pages 23 (timer), 9 (interrupts), and 561 (interrupt priority).
// NOTE: The timer is different from hardware/host clock pulses. Don't confuse these.
var KEYBOARD_IRQ = 1;
var SOFTWARE_IRQ = 2; //number for software interruot
//
// Global Variables
// TODO: Make a global object and use that instead of the "_" naming convention in the global namespace.
//
var _CPU; // Utilize TypeScript's type annotation system to ensure that _CPU is an instance of the Cpu class.
var _Memory;
var _PCB;
var _MemoryManager;
var _Scheduler;
var _ReadyQueue;
var _FileSystemDeviceDriver;
var _OSclock = 0; // Page 23.
var _Mode = 0; // (currently unused)  0 = Kernel Mode, 1 = User Mode.  See page 21.
var _Canvas; // Initialized in Control.hostInit().
var _DrawingContext; // = _Canvas.getContext("2d");  // Assigned here for type safety, but re-initialized in Control.hostInit() for OCD and logic.
var _DefaultFontFamily = "sans"; // Ignored, I think. The was just a place-holder in 2008, but the HTML canvas may have use for it.
var _DefaultFontSize = 13;
var _FontHeightMargin = 4; // Additional space added to font size when advancing a line.
var _Trace = true; // Default the OS trace to be on.
var date = new Date(); //sets uo date object
var day = date.getDate(); //gets date
var month = date.getMonth() + 1; //gets month
var year = date.getFullYear(); //gets year
var hour = date.getHours(); //gets current hour
var minutes = date.getMinutes(); //gets current minutes
var seconds = date.getSeconds(); //gets current seconds
var loc = "A depression. Fun place to be huh?"; //location for whereami
var num = 0;
var users = ["OS"]; //users array
var pass = ["alpaca"]; //passowrds array
var status = "Running smoothly"; //base status
var logHistory = []; //holds recently used commands
var logDown = []; //going back through commands
var logLength = 0;
var logText = "";
var hexBoolean = false; //helps with load function
var hexArray = []; //holds separate chars of value in user program input
var arrayHex = []; //separates values from hexArray into pairs
var arrayCounter = 0;
var memoryArray = []; //holds memory values
var pc = 0; //program counter
var ir = "0";
var cpuTable = document.getElementById('cpuTable');
var pid = []; //array to hold processes
var pidCounter = 0; //keeps track of pids
var storeLocString = "";
var storeLocNum = 0;
var step = false; //says if in step mode or not
var pause = false; //helps execute one function at a time in step mode
var stepCounter = 0; //keeps track where you are in process
var opCode = ""; //string to hold op code
var rowCount = 0; //row number in html table
var cellCount = 1; //cell number in table
var pidNum = 0; //pid
var posNum = 0; //position in memory 0 = 0, 1 = 256, 2 = 512
var position1 = false; //is the position filled
var position2 = false;
var position3 = false;
var emptyArray = [];
var runPID = 0;
var runAll = false; //used with runall command
var currentPIDInMem = []; //array to store all pids in mem
var pidInMemNum = 0; //keeps track which pid in locations
//var blank = _DrawingContext.getImageData(0, 0, 500, 500);
var capsLock = false; //boolean if caps lock is set or not
var val = "AA"; //helps with value in checking load function
var validChar = "0123456789ABCDEFabcdef "; //valid hex characters
var shifted = false;
var accString = ""; //string used for accumulator
var accNum = 0; //num used for accumulator
var files = [];
var address = [];
var data = [];
var roundRobin = true;
var fcfs = false;
var priority = false;
var formatted = false;
var fileCreated = false;
//var imageData = new ImageData(100, 100);
//   image = _DrawingContext.getImageData(0, 0, 1000, 10000);
// The OS Kernel and its queues.
var _Kernel;
var _KernelInterruptQueue; // Initializing this to null (which I would normally do) would then require us to specify the 'any' type, as below.
var _KernelInputQueue = null; // Is this better? I don't like uninitialized variables. But I also don't like using the type specifier 'any'
var _KernelBuffers = null; // when clearly 'any' is not what we want. There is likely a better way, but what is it?
// Standard input and output
var _StdIn; // Same "to null or not to null" issue as above.
var _StdOut;
// UI
var _Console;
var _OsShell;
// At least this OS is not trying to kill you. (Yet.)
var _SarcasticMode = false;
// Global Device Driver Objects - page 12
var _krnKeyboardDriver; //  = null;
var _hardwareClockID = null;
// For testing (and enrichment)...
var Glados = null; // This is the function Glados() in glados.js on Labouseur.com.
var _GLaDOS = null; // If the above is linked in, this is the instantiated instance of Glados.
var onDocumentLoad = function () {
    TSOS.Control.hostInit();
};
