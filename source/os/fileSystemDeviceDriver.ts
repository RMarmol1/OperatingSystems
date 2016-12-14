/*
	File System Device Driver

*/

module TSOS {
    export class FileSystemDeviceDriver extends DeviceDriver {
       
		//formats file system in session storage
        public fileSystemFormat() {
            if (typeof (Storage) !== "undefined") {
                formatted = true;
                var i = 0;
                for (var x = 0; x < 4; x++) {
                        for (var y = 0; y < 8; y++) {
                            for (var z = 0; z < 8; z++) {
                                files[i] = [x.toString(), y.toString(), z.toString(), "0", "0", "0", "0", ""];
                                i++;
                            }
                        }
                }

                sessionStorage["files"] = JSON.stringify(files);
                
                _StdOut.putText("Hard Drive Formatted.");

            } else {
                // Sorry! No Web Storage support..
                _StdOut.putText("Session Storage Cannot Be Supported in this Browser.");
            }
        }

        public krnFsDriverEntry() {
            this.status = "loaded";
        }

		//creates a file in the file system
        public createFile(val) {
            if (formatted == true) {
                var fileName = val;
                var availTSB = 0;
                var row = 0;
                var alreadyExists = false;

                for (var i = 1; i < 63; i++) {
                    if (files[i][7] == this.convertTextToHex(fileName)) {
                        alreadyExists = true;
                    }
                }

                if (alreadyExists == false) {

                    for (var i = 1; i < 63; i++) {

                        if (files[i][3] == "0") {
                            availTSB = i;
                            row = i + 1;
                            files[i][3] = "1";

                            files[i][7] = this.convertTextToHex(fileName);
                            i = 999;
                            _StdOut.putText("Successfully created file: " + fileName);


                        }
                        else {
                            //_StdOut.putText("No memory left on hard drive.");
                        }
                    }

                    document.getElementById("hardDriveTable").rows[row].cells[1].innerHTML = files[availTSB][3];
                    document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = files[availTSB][7];

                    sessionStorage["files"] = JSON.stringify(files);

                    this.writeToFile(fileName, "");
                } else {
                    _StdOut.putText("File already exists.");
                }
            } else {
                _StdOut.putText("Need to format Hard Drive to create files.");
            }

        }

		//deletes file and data that accompanies it
        public deleteFile(val) {
            if (formatted == true) {
                var fileName = val;
                var row = 0;
                var tsb = 0;
                var metaT = "";
                var metaS = "";
                var metaB = "";
                var found = false;

                for (var i = 1; i < 63; i++) {
                    if (files[i][7] == this.convertTextToHex(fileName)) {

                        files[i][7] = "";
                        row = i + 1;
                        tsb = i;
                        metaT = files[i][4];
                        metaS = files[i][5];
                        metaB = files[i][6];

                        files[i][3] = "0";
                        files[i][4] = "0";
                        files[i][5] = "0";
                        files[i][6] = "0";
                        
                        document.getElementById("hardDriveTable").rows[row].cells[1].innerHTML = files[i][3];
                        document.getElementById("hardDriveTable").rows[row].cells[2].innerHTML = files[i][4];
                        document.getElementById("hardDriveTable").rows[row].cells[3].innerHTML = files[i][5];
                        document.getElementById("hardDriveTable").rows[row].cells[4].innerHTML = files[i][6];
                        document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = "000000000000000000000000000000000000000000000000000000000000";

                       

                        for (var x = 64; x < 256; x++) {
                            if (files[x][0] == metaT && files[x][1] == metaS && files[x][2] == metaB) {
                                files[x][3] = "0";
                                files[x][7] = "";
                                metaT = files[x][4];
                                metaS = files[x][5];
                                metaB = files[x][6];
                                tsb = x;
                                row = x + 1;
                                files[x][3] = "0";
                                files[x][4] = "0";
                                files[x][5] = "0";
                                files[x][6] = "0";
                                document.getElementById("hardDriveTable").rows[row].cells[1].innerHTML = files[tsb][3];
                                document.getElementById("hardDriveTable").rows[row].cells[2].innerHTML = files[tsb][4];
                                document.getElementById("hardDriveTable").rows[row].cells[3].innerHTML = files[tsb][5];
                                document.getElementById("hardDriveTable").rows[row].cells[4].innerHTML = files[tsb][6];
                                document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = "000000000000000000000000000000000000000000000000000000000000";
                                //x = 999;
                            }
                        }

                        

                        i = 999;

                        _StdOut.putText("Successfully deleted file: " + fileName);
                        found = true;
                    }
                }

                if (found == false) {
                    _StdOut.putText("Error file not found.");
                }



               /* document.getElementById("hardDriveTable").rows[row].cells[1].innerHTML = files[tsb][3];
                document.getElementById("hardDriveTable").rows[row].cells[2].innerHTML = files[tsb][4];
                document.getElementById("hardDriveTable").rows[row].cells[3].innerHTML = files[tsb][5];
                document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = files[tsb][6];
                document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = "000000000000000000000000000000000000000000000000000000000000";*/

                sessionStorage["files"] = JSON.stringify(files);
            } else {
                _StdOut.putText("Need to format Hard Drive to delete files.");
            }
        }


       
        //deletes file and data that accompanies it
        public reWriteFile(val) {
            if (formatted == true) {
                var fileName = val;
                var row = 0;
                var tsb = 0;
                var metaT = "";
                var metaS = "";
                var metaB = "";
                var found = false;

                for (var i = 1; i < 63; i++) {
                    if (files[i][7] == this.convertTextToHex(fileName)) {

                        //files[i][7] = "";
                        row = i + 1;
                        tsb = i;
                        metaT = files[i][4];
                        metaS = files[i][5];
                        metaB = files[i][6];

                        /*files[i][3] = "0";
                        files[i][4] = "0";
                        files[i][5] = "0";
                        files[i][6] = "0";

                        document.getElementById("hardDriveTable").rows[row].cells[1].innerHTML = files[i][3];
                        document.getElementById("hardDriveTable").rows[row].cells[2].innerHTML = files[i][4];
                        document.getElementById("hardDriveTable").rows[row].cells[3].innerHTML = files[i][5];
                        document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = files[i][6];
                        document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = "000000000000000000000000000000000000000000000000000000000000";
                        */


                        for (var x = 64; x < 256; x++) {
                            if (files[x][0] == metaT && files[x][1] == metaS && files[x][2] == metaB) {
                                files[x][3] = "0";
                                files[x][7] = "";
                                metaT = files[x][4];
                                metaS = files[x][5];
                                metaB = files[x][6];
                                tsb = x;
                                row = x + 1;
                                //files[x][3] = "0";
                                files[x][4] = "0";
                                files[x][5] = "0";
                                files[x][6] = "0";
                                document.getElementById("hardDriveTable").rows[row].cells[1].innerHTML = files[tsb][3];
                                document.getElementById("hardDriveTable").rows[row].cells[2].innerHTML = files[tsb][4];
                                document.getElementById("hardDriveTable").rows[row].cells[3].innerHTML = files[tsb][5];
                                document.getElementById("hardDriveTable").rows[row].cells[4].innerHTML = files[tsb][6];
                                document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = "000000000000000000000000000000000000000000000000000000000000";
                                //x = 999;
                            }
                        }



                        i = 999;

                        //_StdOut.putText("Successfully deleted file: " + fileName);
                        found = true;
                    }
                }

                if (found == false) {
                    _StdOut.putText("Error file not found.");
                }



                /* document.getElementById("hardDriveTable").rows[row].cells[1].innerHTML = files[tsb][3];
                 document.getElementById("hardDriveTable").rows[row].cells[2].innerHTML = files[tsb][4];
                 document.getElementById("hardDriveTable").rows[row].cells[3].innerHTML = files[tsb][5];
                 document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = files[tsb][6];
                 document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = "000000000000000000000000000000000000000000000000000000000000";*/

                sessionStorage["files"] = JSON.stringify(files);
            } else {
                _StdOut.putText("Need to format Hard Drive to delete files.");
            }
        }


		//finds available space, writes in data, and connects to filename
        public writeToFile(file, data) {

            if (formatted == true) {

                

                var fileName = this.convertTextToHex(file);
                var dataString = this.convertTextToHex(data);
                var dataSubString1 = "";
                var dataSubString2 = "";
                var dataSubString3 = "";
                var dataSubString4 = "";
                var dataSubString5 = "";
                var dataSubString6 = "";
                var dataSubString7 = "";
                var dataSubString8 = "";
                var dataSubString9 = "";
                var dataSubStringA = "";
                var dataSubStringB = "";
                var dataSubStringC = "";
                var dataSubStringD = "";
                var dataSubStringE = "";
                var dataSubStringF = "";
                var dataSubString10 = "";
                var dataSubString11 = "";
                var dataSubstring12 = "";
                var dataSubString13 = "";
                var subArray = [];
                var tsb = 0;
                var availTSB = 0;
                var row = 0;
                /*var metaT = 0;
                var metaS = 0;
                var metaB = 0*/

                var reWrite = "";

                //whenever a file is rewritten to it deletes all its data and rewrites it
                for (var i = 1; i < 63; i++) {
                    if (files[i][7] == fileName) {
                        reWrite = this.convertHexToText(files[i][7]);
                        if (files[i][4] == "0" && files[i][5] == "0" && files[i][6] == "0") {
                        } else {
                            //_StdOut.putText("Made it");
                            this.reWriteFile(reWrite);
                        }
                    }
                }
                
                


                

                if (dataString.length > 60) {
                    dataSubString1 = dataString.substring(0, 60);
                    subArray.push(dataSubString1);
                    if (dataString.length < 120) {
                        dataSubString2 = dataString.substring(60, dataString.length);
                        dataSubString2 += this.addZeros(dataSubString2);
                    } else {
                        dataSubString2 = dataString.substring(60, 120);
                    }
                    subArray.push(dataSubString2);
                    if (dataString.length > 120) {
                        if (dataString.length < 180) {
                            dataSubString3 = dataString.substring(120, dataString.length);
                            dataSubString3 += this.addZeros(dataSubString3);
                        } else {
                            dataSubString3 = dataString.substring(120, 180);
                        }
                        subArray.push(dataSubString3);
                        if (dataString.length > 180) {
                            if (dataString.length < 240) {
                                dataSubString4 = dataString.substring(180, dataString.length);
                                dataSubString4 += this.addZeros(dataSubString4);
                            } else {
                                dataSubString4 = dataString.substring(180, 240);
                            }
                            subArray.push(dataSubString4);
                            if (dataString.length > 240) {
                                if (dataString.length < 300) {
                                    dataSubString5 = dataString.substring(240, dataString.length);
                                    dataSubString5 += this.addZeros(dataSubString5);
                                } else {
                                    dataSubString5 = dataString.substring(240, 300);
                                }
                                subArray.push(dataSubString5);
                                if (dataString.length > 300) {
                                    if (dataString.length < 360) {
                                        dataSubString6 = dataString.substring(300, dataString.length);
                                        dataSubString6 += this.addZeros(dataSubString6);
                                    } else {
                                        dataSubString6 = dataString.substring(300, 360);
                                    }
                                    subArray.push(dataSubString6);
                                    if (dataString.length > 360) {
                                        if (dataString.length < 420) {
                                            dataSubString7 = dataString.substring(360, dataString.length);
                                            dataSubString7 += this.addZeros(dataSubString7);
                                        } else {
                                            dataSubString7 = dataString.substring(360, 420);
                                        }
                                        subArray.push(dataSubString7);
                                        if (dataString.length > 420) {
                                            if (dataString.length < 480) {
                                                dataSubString8 = dataString.substring(420, dataString.length);
                                                dataSubString8 += this.addZeros(dataSubString8);
                                            } else {
                                                dataSubString8 = dataString.substring(420, 480);
                                            }
                                            subArray.push(dataSubString8);
                                            if (dataString.length > 480) {
                                                if (dataString.length < 540) {
                                                    dataSubString9 = dataString.substring(480, dataString.length);
                                                    dataSubString9 += this.addZeros(dataSubString9);
                                                } else {
                                                    dataSubString9 = dataString.substring(480, 540);
                                                }
                                                subArray.push(dataSubString9);
                                                if (dataString.length > 540) {
                                                    if (dataString.length < 600) {
                                                        dataSubStringA = dataString.substring(540, dataString.length);
                                                        dataSubStringA += this.addZeros(dataSubStringA);
                                                    } else {
                                                        dataSubStringA = dataString.substring(540, 600);
                                                    }
                                                    subArray.push(dataSubStringA);
                                                    if (dataString.length > 600) {
                                                        if (dataString.length < 660) {
                                                            dataSubStringB = dataString.substring(600, dataString.length);
                                                            dataSubStringB += this.addZeros(dataSubStringB);
                                                        } else {
                                                            dataSubStringB = dataString.substring(600, 660);
                                                        }
                                                        subArray.push(dataSubStringB);
                                                        if (dataString.length > 660) {
                                                            if (dataString.length < 720) {
                                                                dataSubStringC = dataString.substring(660, dataString.length);
                                                                dataSubStringC += this.addZeros(dataSubStringC);
                                                            } else {
                                                                dataSubStringC = dataString.substring(660, 720);
                                                            }
                                                            subArray.push(dataSubStringC);
                                                            if (dataString.length > 780) {
                                                                if (dataString.length < 840) {
                                                                    dataSubStringD = dataString.substring(780, dataString.length);
                                                                    dataSubStringD += this.addZeros(dataSubStringD);
                                                                } else {
                                                                    dataSubStringD = dataString.substring(780, 840);
                                                                }
                                                                subArray.push(dataSubStringD);
                                                                if (dataString.length > 840) {
                                                                    if (dataString.length < 900) {
                                                                        dataSubStringE = dataString.substring(840, dataString.length);
                                                                        dataSubStringE += this.addZeros(dataSubStringE);
                                                                    } else {
                                                                        dataSubStringE = dataString.substring(840, 900);
                                                                    }
                                                                    subArray.push(dataSubStringE);
                                                                    if (dataString.length > 900) {
                                                                        if (dataString.length < 960) {
                                                                            dataSubStringF = dataString.substring(900, dataString.length);
                                                                            dataSubStringF += this.addZeros(dataSubStringF);
                                                                        } else {
                                                                            dataSubStringF = dataString.substring(900, 960);
                                                                        }
                                                                        subArray.push(dataSubStringF);
                                                                        if (dataString.length > 960) {
                                                                            if (dataString.length < 1020) {
                                                                                dataSubString10 = dataString.substring(960, dataString.length);
                                                                                dataSubString10 += this.addZeros(dataSubString10);
                                                                            } else {
                                                                                dataSubString10 = dataString.substring(960, 1020);
                                                                            }
                                                                            subArray.push(dataSubString10);
                                                                            if (dataString.length > 1020) {
                                                                                if (dataString.length < 1080) {
                                                                                    dataSubString11 = dataString.substring(1020, dataString.length);
                                                                                    dataSubString11 += this.addZeros(dataSubString11);
                                                                                } else {
                                                                                    dataSubString11 = dataString.substring(1020, 1080);
                                                                                }
                                                                                subArray.push(dataSubString11);
                                                                                if (dataString.length > 1080) {
                                                                                    if (dataString.length < 1140) {
                                                                                        dataSubstring12 = dataString.substring(1080, dataString.length);
                                                                                        dataSubstring12 += this.addZeros(dataSubstring12);
                                                                                    } else {
                                                                                        dataSubstring12 = dataString.substring(1080, 1140);
                                                                                    }
                                                                                    subArray.push(dataSubstring12);
                                                                                    if (dataString.length > 1200) {
                                                                                        dataSubString13 = dataString.substring(1200, dataString.length);
                                                                                        dataSubString13 += this.addZeros(dataSubString13);
                                                                                    } else {
                                                                                        dataSubString13 = dataString.substring(1200, 1260);
                                                                                    }
                                                                                    subArray.push(dataSubString13);
                                                                                }

                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                for (var i = 1; i < 63; i++) {
                    if (files[i][7] == fileName) {
                        tsb = i;
                        row = i + 1;
                        i = 999;
                       /* metaT = files[i][4];
                        metaS = files[i][5];
                        metaB = files[i][6];*/

                    }
                }

                if (subArray.length > 0) {
                    var counterNum = 0;
                    for (var t = 0; t < subArray.length; t++) {

                        for (var i = 64; i < 256; i++) {
                            

                            if (files[i][3] == "0") {
                                if (counterNum == 0) { //first section
                                    files[tsb][4] = files[i][0];
                                    files[tsb][5] = files[i][1];
                                    files[tsb][6] = files[i][2];

                                    document.getElementById("hardDriveTable").rows[row].cells[2].innerHTML = files[tsb][4];
                                    document.getElementById("hardDriveTable").rows[row].cells[3].innerHTML = files[tsb][5];
                                    document.getElementById("hardDriveTable").rows[row].cells[4].innerHTML = files[tsb][6];

                                    counterNum++;

                                    files[i][4] = files[i + 1][0];
                                    files[i][5] = files[i + 1][1];
                                    files[i][6] = files[i + 1][2];
                                    if (t == subArray.length - 1) {
                                        files[i][4] = "0";
                                        files[i][5] = "0";
                                        files[i][6] = "0";
                                    }
                                    row = i + 1;
                                    document.getElementById("hardDriveTable").rows[row].cells[2].innerHTML = files[i][4];
                                    document.getElementById("hardDriveTable").rows[row].cells[3].innerHTML = files[i][5];
                                    document.getElementById("hardDriveTable").rows[row].cells[4].innerHTML = files[i][6];
                                } else { //rest of data

                                    files[i][4] = files[i + 1][0];
                                    files[i][5] = files[i + 1][1];
                                    files[i][6] = files[i + 1][2];
                                    if (t == subArray.length - 1) {
                                        files[i][4] = "0";
                                        files[i][5] = "0";
                                        files[i][6] = "0";
                                    }
                                    row = i + 1;
                                    document.getElementById("hardDriveTable").rows[row].cells[2].innerHTML = files[i][4];
                                    document.getElementById("hardDriveTable").rows[row].cells[3].innerHTML = files[i][5];
                                    document.getElementById("hardDriveTable").rows[row].cells[4].innerHTML = files[i][6];
                                }

                                //document.getElementById("hardDriveTable").rows[row].cells[2].innerHTML = files[tsb][4];
                                //document.getElementById("hardDriveTable").rows[row].cells[3].innerHTML = files[tsb][5];
                                // document.getElementById("hardDriveTable").rows[row].cells[4].innerHTML = files[tsb][6];

                                files[i][3] = "1";

                                // files[i][7] = dataString;
                                files[i][7] = subArray[t];
                                availTSB = i;
                                row = i + 1;
                                i = 999;
                                document.getElementById("hardDriveTable").rows[row].cells[1].innerHTML = files[availTSB][3];
                                document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = files[availTSB][7];

                            }
                        }
                    }
                } else {

                    for (var i = 64; i < 256; i++) {
                        if (files[i][3] == "0") {
                            files[tsb][4] = files[i][0];
                            files[tsb][5] = files[i][1];
                            files[tsb][6] = files[i][2];

                            document.getElementById("hardDriveTable").rows[row].cells[2].innerHTML = files[tsb][4];
                            document.getElementById("hardDriveTable").rows[row].cells[3].innerHTML = files[tsb][5];
                            document.getElementById("hardDriveTable").rows[row].cells[4].innerHTML = files[tsb][6];

                            files[i][3] = "1";

                            files[i][7] = dataString;
                            //files[i][7] = subArray[t];
                            availTSB = i;
                            row = i + 1;
                            i = 999;
                            document.getElementById("hardDriveTable").rows[row].cells[1].innerHTML = files[availTSB][3];
                            document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = files[availTSB][7];

                        }
                    }

                }


                //document.getElementById("hardDriveTable").rows[row].cells[1].innerHTML = files[availTSB][3];
                //document.getElementById("hardDriveTable").rows[row].cells[5].innerHTML = files[availTSB][7];

                if (data == "") {
                } else {
                    _StdOut.putText("Successfully wrote data to file.");
                }

                

                sessionStorage["files"] = JSON.stringify(files);
            } else {
                _StdOut.putText("Need to format Hard Drive to edit files.");
            }
        }

		//reads the data connected to a file name
        public readFile(val) {
            if (formatted == true) {

                var fileName = this.convertTextToHex(val);
                var dataRead = "";
                var metaT = "";
                var metaS = "";
                var metaB = "";

                for (var i = 1; i < 63; i++) {
                    if (files[i][7] == fileName) {
                        metaT = files[i][4];
                        metaS = files[i][5];
                        metaB = files[i][6];

                        i = 999;
                    }
                }

                for (var x = 64; x < 256; x++) {
                    if (files[x][0] == metaT && files[x][1] == metaS && files[x][2] == metaB) {
                        if (metaT == "0" && metaS == "0" && metaB == "0") {

                            //x = 999;
                        } else {
                            dataRead = this.convertHexToText(files[x][7]);
                            _StdOut.putText(dataRead);
                            _StdOut.advanceLine();
                            metaT = files[x][4];
                            metaS = files[x][5];
                            metaB = files[x][6];
                            x = 64;
                        }
                    }
                }
            } else {
                _StdOut.putText("Need to format Hard Drive to read files.");
            }

        }

		//lists all files in file system
        public ls() {
            if (formatted == true) {

                var fileName = "";
                var empty = true;

                for (var i = 1; i < 63; i++) {

                    if (files[i][3] == "1") {
                        empty = false;
                        fileName = this.convertHexToText(files[i][7]);
                        _StdOut.putText(fileName);
                        _StdOut.advanceLine();
                    } else {
                        if (i == 62 && empty == true) {
                            _StdOut.putText("No files currently exist.");
                        }
                    }

                }
            } else {
                _StdOut.putText("Need to format Hard Drive to see files.");
            }
        }

        //converts text value to hex value
        public convertTextToHex(input) {

            var inputArray = [];
            var inputHex = [];
            var newInput = "";
            var diffNum = 0;
            inputArray = input.split("");

            for (var t = 0; t < inputArray.length; t++) {
                if (inputArray[t] == " ") {
                    inputHex.push("2");
                    inputHex.push("0");
                }
                else if (inputArray[t] == "0") {
                    inputHex.push("3");
                    inputHex.push("0");
                }
                else if (inputArray[t] == "1") {
                    inputHex.push("3");
                    inputHex.push("1");
                }
                else if (inputArray[t] == "2") {
                    inputHex.push("3");
                    inputHex.push("2");
                }
                else if (inputArray[t] == "3") {
                    inputHex.push("3");
                    inputHex.push("3");
                }
                else if (inputArray[t] == "4") {
                    inputHex.push("3");
                    inputHex.push("4");
                }
                else if (inputArray[t] == "5") {
                    inputHex.push("3");
                    inputHex.push("5");
                }
                else if (inputArray[t] == "6") {
                    inputHex.push("3");
                    inputHex.push("6");
                }
                else if (inputArray[t] == "7") {
                    inputHex.push("3");
                    inputHex.push("7");
                }
                else if (inputArray[t] == "8") {
                    inputHex.push("3");
                    inputHex.push("8");
                }
                else if (inputArray[t] == "9") {
                    inputHex.push("3");
                    inputHex.push("9");
                }
                else if (inputArray[t] == "A") {
                    inputHex.push("4");
                    inputHex.push("1");
                }
                else if (inputArray[t] == "B") {
                    inputHex.push("4");
                    inputHex.push("2");
                }
                else if (inputArray[t] == "C") {
                    inputHex.push("4");
                    inputHex.push("3");
                }
                else if (inputArray[t] == "D") {
                    inputHex.push("4");
                    inputHex.push("4");
                }
                else if (inputArray[t] == "E") {
                    inputHex.push("4");
                    inputHex.push("5");
                }
                else if (inputArray[t] == "F") {
                    inputHex.push("4");
                    inputHex.push("6");
                }
                else if (inputArray[t] == "G") {
                    inputHex.push("4");
                    inputHex.push("7");
                }
                else if (inputArray[t] == "H") {
                    inputHex.push("4");
                    inputHex.push("8");
                }
                else if (inputArray[t] == "I") {
                    inputHex.push("4");
                    inputHex.push("9");
                }
                else if (inputArray[t] == "J") {
                    inputHex.push("4");
                    inputHex.push("A");
                }
                else if (inputArray[t] == "K") {
                    inputHex.push("4");
                    inputHex.push("B");
                }
                else if (inputArray[t] == "L") {
                    inputHex.push("4");
                    inputHex.push("C");
                }
                else if (inputArray[t] == "M") {
                    inputHex.push("4");
                    inputHex.push("D");
                }
                else if (inputArray[t] == "N") {
                    inputHex.push("4");
                    inputHex.push("E");
                }
                else if (inputArray[t] == "O") {
                    inputHex.push("4");
                    inputHex.push("F");
                }
                else if (inputArray[t] == "P") {
                    inputHex.push("5");
                    inputHex.push("0");
                }
                else if (inputArray[t] == "Q") {
                    inputHex.push("5");
                    inputHex.push("1");
                }
                else if (inputArray[t] == "R") {
                    inputHex.push("5");
                    inputHex.push("2");
                }
                else if (inputArray[t] == "S") {
                    inputHex.push("5");
                    inputHex.push("3");
                }
                else if (inputArray[t] == "T") {
                    inputHex.push("5");
                    inputHex.push("4");
                }
                else if (inputArray[t] == "U") {
                    inputHex.push("5");
                    inputHex.push("5");
                }
                else if (inputArray[t] == "V") {
                    inputHex.push("5");
                    inputHex.push("6");
                }
                else if (inputArray[t] == "W") {
                    inputHex.push("5");
                    inputHex.push("7");
                }
                else if (inputArray[t] == "X") {
                    inputHex.push("5");
                    inputHex.push("8");
                }
                else if (inputArray[t] == "Y") {
                    inputHex.push("5");
                    inputHex.push("9");
                }
                else if (inputArray[t] == "Z") {
                    inputHex.push("5");
                    inputHex.push("A");
                }
                else if (inputArray[t] == "a") {
                    inputHex.push("6");
                    inputHex.push("1");
                }
                else if (inputArray[t] == "b") {
                    inputHex.push("6");
                    inputHex.push("2");
                }
                else if (inputArray[t] == "c") {
                    inputHex.push("6");
                    inputHex.push("3");
                }
                else if (inputArray[t] == "d") {
                    inputHex.push("6");
                    inputHex.push("4");
                }
                else if (inputArray[t] == "e") {
                    inputHex.push("6");
                    inputHex.push("5");
                }
                else if (inputArray[t] == "f") {
                    inputHex.push("6");
                    inputHex.push("6");
                }
                else if (inputArray[t] == "g") {
                    inputHex.push("6");
                    inputHex.push("7");
                }
                else if (inputArray[t] == "h") {
                    inputHex.push("6");
                    inputHex.push("8");
                }
                else if (inputArray[t] == "i") {
                    inputHex.push("6");
                    inputHex.push("9");
                }
                else if (inputArray[t] == "j") {
                    inputHex.push("6");
                    inputHex.push("A");
                }
                else if (inputArray[t] == "k") {
                    inputHex.push("6");
                    inputHex.push("B");
                }
                else if (inputArray[t] == "l") {
                    inputHex.push("6");
                    inputHex.push("C");
                }
                else if (inputArray[t] == "m") {
                    inputHex.push("6");
                    inputHex.push("D");
                }
                else if (inputArray[t] == "n") {
                    inputHex.push("6");
                    inputHex.push("E");
                }
                else if (inputArray[t] == "o") {
                    inputHex.push("6");
                    inputHex.push("F");
                }
                else if (inputArray[t] == "p") {
                    inputHex.push("7");
                    inputHex.push("0");
                }
                else if (inputArray[t] == "q") {
                    inputHex.push("7");
                    inputHex.push("1");
                }
                else if (inputArray[t] == "r") {
                    inputHex.push("7");
                    inputHex.push("2");
                }
                else if (inputArray[t] == "s") {
                    inputHex.push("7");
                    inputHex.push("3");
                }
                else if (inputArray[t] == "t") {
                    inputHex.push("7");
                    inputHex.push("4");
                }
                else if (inputArray[t] == "u") {
                    inputHex.push("7");
                    inputHex.push("5");
                }
                else if (inputArray[t] == "v") {
                    inputHex.push("7");
                    inputHex.push("6");
                }
                else if (inputArray[t] == "w") {
                    inputHex.push("7");
                    inputHex.push("7");
                }
                else if (inputArray[t] == "x") {
                    inputHex.push("7");
                    inputHex.push("8");
                }
                else if (inputArray[t] == "y") {
                    inputHex.push("7");
                    inputHex.push("9");
                }
                else if (inputArray[t] == "z") {
                    inputHex.push("7");
                    inputHex.push("A");
                }

            }

            for (var x = 0; x < inputHex.length; x++) {
                newInput += inputHex[x];
            }

            diffNum = 60 - newInput.length;

            for (var y = 0; y < diffNum; y++) {
                newInput += "0";
            }

            return newInput;
        }

        //add zeros
        public addZeros(input) {
            var diffNum = 0;
            var zerosNeeded = "";

            diffNum = 60 - input.length;

            for (var y = 0; y < diffNum; y++) {
                zerosNeeded += "0";
            }

            return zerosNeeded;
        }

		//converts hex value to text value
        public convertHexToText(hexInput) {

            var hexInputArray = [];
            var pairedHexArray = [];
            var newInput = "";

            hexInputArray = hexInput.split("");


            for (var i = 0; i < hexInputArray.length; i++) {
                    pairedHexArray.push((hexInputArray[i] + hexInputArray[i + 1]));
                    i++;
            }

            for (var t = 0; t < pairedHexArray.length; t++) {
                if (pairedHexArray[t] == "20") {
                    newInput += " ";
                }
                else if (pairedHexArray[t] == "21") {
                    newInput += "!";
                }
                else if (pairedHexArray[t] == "22") {
                    newInput += "\"";
                }
                else if (pairedHexArray[t] == "23") {
                    newInput += "#";
                }
                else if (pairedHexArray[t] == "24") {
                    newInput += "$";
                }
                else if (pairedHexArray[t] == "25") {
                    newInput += "%";
                }
                else if (pairedHexArray[t] == "26") {
                    newInput += "&";
                }
                else if (pairedHexArray[t] == "27") {
                    newInput += "\'";
                }
                else if (pairedHexArray[t] == "28") {
                    newInput += "(";
                }
                else if (pairedHexArray[t] == "29") {
                    newInput += ")";
                }
                else if (pairedHexArray[t] == "2A" || pairedHexArray[t] == "2a") {
                    newInput += "*";
                }
                else if (pairedHexArray[t] == "2B" || pairedHexArray[t] == "2b") {
                    newInput += "+";
                }
                else if (pairedHexArray[t] == "2C" || pairedHexArray[t] == "2c") {
                    newInput += ",";
                }
                else if (pairedHexArray[t] == "2D" || pairedHexArray[t] == "2d") {
                    newInput += "-";
                }
                else if (pairedHexArray[t] == "2E" || pairedHexArray[t] == "2e") {
                    newInput += ".";
                }
                else if (pairedHexArray[t] == "2F" || pairedHexArray[t] == "2f") {
                    newInput += "/";
                }
                else if (pairedHexArray[t] == "30") {
                    newInput += "0";
                }
                else if (pairedHexArray[t] == "31") {
                    newInput += "1";
                }
                else if (pairedHexArray[t] == "32") {
                    newInput += "2";
                }
                else if (pairedHexArray[t] == "33") {
                    newInput += "3";
                }
                else if (pairedHexArray[t] == "34") {
                    newInput += "4";
                }
                else if (pairedHexArray[t] == "35") {
                    newInput += "5";
                }
                else if (pairedHexArray[t] == "36") {
                    newInput += "6";
                }
                else if (pairedHexArray[t] == "37") {
                    newInput += "7";
                }
                else if (pairedHexArray[t] == "38") {
                    newInput += "8";
                }
                else if (pairedHexArray[t] == "39") {
                    newInput += "9";
                }
                else if (pairedHexArray[t] == "3A" || pairedHexArray[t] == "3a") {
                    newInput += ":";
                }
                else if (pairedHexArray[t] == "3B" || pairedHexArray[t] == "3b") {
                    newInput += ";";
                }
                else if (pairedHexArray[t] == "3C" || pairedHexArray[t] == "3c") {
                    newInput += "<";
                }
                else if (pairedHexArray[t] == "3D" || pairedHexArray[t] == "3d") {
                    newInput += "=";
                }
                else if (pairedHexArray[t] == "3E" || pairedHexArray[t] == "3e") {
                    newInput += ">";
                }
                else if (pairedHexArray[t] == "3F" || pairedHexArray[t] == "3f") {
                    newInput += "?";
                }
                else if (pairedHexArray[t] == "40") {
                    newInput += "@";
                }
                else if (pairedHexArray[t] == "41") {
                    newInput += "A";
                }
                else if (pairedHexArray[t] == "42") {
                    newInput += "B";
                }
                else if (pairedHexArray[t] == "43") {
                    newInput += "C";
                }
                else if (pairedHexArray[t] == "44") {
                    newInput += "D";
                }
                else if (pairedHexArray[t] == "45") {
                    newInput += "E";
                }
                else if (pairedHexArray[t] == "46") {
                    newInput += "F";
                }
                else if (pairedHexArray[t] == "47") {
                    newInput += "G";
                }
                else if (pairedHexArray[t] == "48") {
                    newInput += "H";
                }
                else if (pairedHexArray[t] == "49") {
                    newInput += "I";
                }
                else if (pairedHexArray[t] == "4A" || pairedHexArray[t] == "4a") {
                    newInput += "J";
                }
                else if (pairedHexArray[t] == "4B" || pairedHexArray[t] == "4b") {
                    newInput += "K";
                }
                else if (pairedHexArray[t] == "4C" || pairedHexArray[t] == "4c") {
                    newInput += "L";
                }
                else if (pairedHexArray[t] == "4D" || pairedHexArray[t] == "4d") {
                    newInput += "M";
                }
                else if (pairedHexArray[t] == "4E" || pairedHexArray[t] == "4e") {
                    newInput += "N";
                }
                else if (pairedHexArray[t] == "4F" || pairedHexArray[t] == "4f") {
                    newInput += "O";
                }
                else if (pairedHexArray[t] == "50") {
                    newInput += "P";
                }
                else if (pairedHexArray[t] == "51") {
                    newInput += "Q";
                }
                else if (pairedHexArray[t] == "52") {
                    newInput += "R";
                }
                else if (pairedHexArray[t] == "53") {
                    newInput += "S";
                }
                else if (pairedHexArray[t] == "54") {
                    newInput += "T";
                }
                else if (pairedHexArray[t] == "55") {
                    newInput += "U";
                }
                else if (pairedHexArray[t] == "56") {
                    newInput += "V";
                }
                else if (pairedHexArray[t] == "57") {
                    newInput += "W";
                }
                else if (pairedHexArray[t] == "58") {
                    newInput += "X";
                }
                else if (pairedHexArray[t] == "59") {
                    newInput += "Y";
                }
                else if (pairedHexArray[t] == "5A" || pairedHexArray[t] == "5a") {
                    newInput += "Z";
                }
                else if (pairedHexArray[t] == "5B" || pairedHexArray[t] == "5b") {
                    newInput += "[";
                }
                else if (pairedHexArray[t] == "5C" || pairedHexArray[t] == "5c") {
                    newInput += "\\";
                }
                else if (pairedHexArray[t] == "5D" || pairedHexArray[t] == "5d") {
                    newInput += "]";
                }
                else if (pairedHexArray[t] == "5E" || pairedHexArray[t] == "5e") {
                    newInput += "^";
                }
                else if (pairedHexArray[t] == "5F" || pairedHexArray[t] == "5f") {
                    newInput += "_";
                }
                else if (pairedHexArray[t] == "60") {
                    newInput += "\'";
                }
                else if (pairedHexArray[t] == "61") {
                    newInput += "a";
                }
                else if (pairedHexArray[t] == "62") {
                    newInput += "b";
                }
                else if (pairedHexArray[t] == "63") {
                    newInput += "c";
                }
                else if (pairedHexArray[t] == "64") {
                    newInput += "d";
                }
                else if (pairedHexArray[t] == "65") {
                    newInput += "e";
                }
                else if (pairedHexArray[t] == "66") {
                    newInput += "f";
                }
                else if (pairedHexArray[t] == "67") {
                    newInput += "g";
                }
                else if (pairedHexArray[t] == "68") {
                    newInput += "h";
                }
                else if (pairedHexArray[t] == "69") {
                    newInput += "i";
                }
                else if (pairedHexArray[t] == "6A" || pairedHexArray[t] == "6a") {
                    newInput += "j";
                }
                else if (pairedHexArray[t] == "6B" || pairedHexArray[t] == "6b") {
                    newInput += "k";
                }
                else if (pairedHexArray[t] == "6C" || pairedHexArray[t] == "6c") {
                    newInput += "l";
                }
                else if (pairedHexArray[t] == "6D" || pairedHexArray[t] == "6d") {
                    newInput += "m";
                }
                else if (pairedHexArray[t] == "6E" || pairedHexArray[t] == "6e") {
                    newInput += "n";
                }
                else if (pairedHexArray[t] == "6F" || pairedHexArray[t] == "6f") {
                    newInput += "o";
                }
                else if (pairedHexArray[t] == "70") {
                    newInput += "p";
                }
                else if (pairedHexArray[t] == "71") {
                    newInput += "q";
                }
                else if (pairedHexArray[t] == "72") {
                    newInput += "r";
                }
                else if (pairedHexArray[t] == "73") {
                    newInput += "s";
                }
                else if (pairedHexArray[t] == "74") {
                    newInput += "t";
                }
                else if (pairedHexArray[t] == "75") {
                    newInput += "u";
                }
                else if (pairedHexArray[t] == "76") {
                    newInput += "v";
                }
                else if (pairedHexArray[t] == "77") {
                    newInput += "w";
                }
                else if (pairedHexArray[t] == "78") {
                    newInput += "x";
                }
                else if (pairedHexArray[t] == "79") {
                    newInput += "y";
                }
                else if (pairedHexArray[t] == "7A") {
                    newInput += "z";
                }
                else if (pairedHexArray[t] == "7B") {
                    newInput += "{";
                }
                else if (pairedHexArray[t] == "7C") {
                    newInput += "|";
                }
                else if (pairedHexArray[t] == "7D") {
                    newInput += "}";
                }
                else if (pairedHexArray[t] == "7E") {
                    newInput += "~";
                }
                else if (pairedHexArray[t] == "00") {
                    t = 300;
                }

            }

            return newInput;

        }

        

       

    }

        
    }
