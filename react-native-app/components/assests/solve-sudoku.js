var serverOneFail = false;
var serverTwoFail = false;
var serverThreeFail = false;
var success = false;
let DEBUG = false;


async function FetchSolvedSudoku(board, navigation, setModalVisible, setStatusText, setShowBackButton, manual) {

      serverOneFail = false;
      serverTwoFail = false;
      serverThreeFail = false;
      success = false; //again called econd call
      const serverOne = "https://sudoku-solver-app.ml";
      const serverTwo = "https://sudoku-solver-android-app.herokuapp.com";
      const serverThree = "https://sudokusolver.pythonanywhere.com";

      const boardAsString = matrixToString(board);
      DEBUG && console.log("Sending : " + boardAsString);


      let serverOneReq = new XMLHttpRequest();
      let serverTwoReq = new XMLHttpRequest();
      let serverThreeReq = new XMLHttpRequest();

      myRequest(serverOneReq, serverTwoReq, serverThreeReq, serverOne, boardAsString, 1,
            navigation, setModalVisible, setStatusText, setShowBackButton, manual);
      myRequest(serverTwoReq, serverOneReq, serverThreeReq, serverTwo, boardAsString, 2,
            navigation, setModalVisible, setStatusText, setShowBackButton, manual);
      myRequest(serverThreeReq, serverTwoReq, serverOneReq, serverThree, boardAsString, 3,
            navigation, setModalVisible, setStatusText, setShowBackButton, manual);
}


let myRequest = async (request_1, request_2, request_3, site, reqData, serverNo,
      navigation, setModalVisible, setStatusText, setShowBackButton, manual) => {
      return new Promise((resolve, reject) => {
            request_1.onreadystatechange = (e) => {
                  if (request_1.readyState !== 4 || success == true) {
                        DEBUG && console.log("Server : " + serverNo + " Success : " + success + " ReadyState : " + request_1.readyState);
                        return;
                  }
                  if (request_1.status === 200) {
                        let res = request_1.responseText;
                        if (res.length == 170 && res[res.length - 1] == "1") {
                              success = true;
                              request_2.abort();
                              request_3.abort();
                              DEBUG && console.log("Inside success {server-" + serverNo + "} : " + res);
                              setModalVisible(false);
                              const [board, timeReq] = extractBoardFromResponse(res.substring(0, 168));
                              navigation.push("SudokuScreen",
                                    {
                                          board: board,
                                          pressActive: false,
                                          timeReq: "Sudoku Solved\nin " + timeReq + " Seconds"
                                    })

                        }
                        else if (res.length == 10) { //received invalid rowNo
                              success = true;
                              request_2.abort();
                              request_3.abort();
                              DEBUG && console.log("Received invalid rowNo : " + res);
                              setStatusText("Puzzle Invalid\nCheck Row " + res[0]);
                              setShowBackButton(true);
                        }
                        else if (res.substring(0, 7) === "invalid") {
                              success = true;
                              request_2.abort();
                              request_3.abort();
                              DEBUG && console.log("Invalid Puzzle :: {server-" + serverNo + "} : " + res);
                              let add = (manual === 1 ? "\nGo Back and Check for errors" : "Correct it manually\nOR\nScan Properly");
                              setStatusText("Invalid Sudoku\n" + add);
                              setShowBackButton(true);
                        }
                        else if (res.substring(0, 8) == "unsolved") {
                              success = true;
                              request_2.abort();
                              request_3.abort();
                              DEBUG && console.log("Unsolvable");
                              setStatusText("No Solution Found");
                              setShowBackButton(true);
                        }
                        else {
                              DEBUG && console.log("Server : " + serverNo + " Failed");
                        }
                  }
                  else {
                        let failCount = (request_1.readyState == 4) + (request_2.readyState == 4) + (request_3.readyState == 4);
                        if (failCount == 3) {
                              DEBUG && console.log("Error : " + request_1.response);
                              setStatusText("Check Internet Connection\nOR\nContact Admin");
                              setShowBackButton(true);
                        }
                        else if (serverNo == 1) {
                              setStatusText("Server-" + (failCount) + " Failed\n\nSolving Sudoku\n(Server " + (failCount + 1) + ")");
                              console.log("Server-1 Failed.");
                              serverOneFail = true;
                        }
                        else if (serverNo == 2) {
                              setStatusText("Server-" + (failCount) + " Failed\n\nSolving Sudoku\n(Server " + (failCount + 1) + ")");
                              console.log("Server-2 Failed.");
                              serverTwoFail = true;
                        }
                        else if (serverNo == 3) {
                              setStatusText("Server-" + (failCount) + " Failed\n\nSolving Sudoku\n(Server " + (failCount + 1) + ")");
                              console.log("Server-3 Failed.");
                              serverTwoFail = true;
                        }
                  }
            };
            request_1.open('GET', site + "/solve/" + reqData, true);
            request_1.onload = resolve;
            request_1.onerror = reject;
            request_1.send();
      })
}

const matrixToString = (matrix) => {
      let boardAsString = "";
      for (let i = 0; i < 9; ++i) {
            for (let j = 0; j < 9; ++j) {
                  boardAsString += matrix[i][j];
            }
      }
      return boardAsString;
}

const extractBoardFromResponse = (res) => {
      let singleRowBoard = res.split(" ");
      let time_req = singleRowBoard.pop();
      singleRowBoard = singleRowBoard.map(x => parseInt(x));
      let board = []
      for (let i = 0; i < 9; ++i) {
            board.push(singleRowBoard.slice(9 * i, 9 * (i + 1)));
      }
      return [board, time_req];
}

export default FetchSolvedSudoku;