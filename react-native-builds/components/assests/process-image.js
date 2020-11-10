var serverOneFail = false;
var serverTwoFail = false;
var serverThreeFail = false;
var success = false;
let DEBUG = false;

let ProcessImage = async (image, navigation, setModalVisible, setStatusText,
      setShowBackButton) => {
      serverOneFail = false;
      serverTwoFail = false;
      serverThreeFail = false;
      success = false; //again called econd call
      const serverOne = "https://sudoku-solver-app.ml";
      const serverTwo = "https://sudoku-solver-android-app.herokuapp.com";
      const serverThree = "https://sudokusolver.pythonanywhere.com";

      let data = new FormData();

      data.append("source", {
            uri: image,
            name: 'source',
            type: 'image/jpg'
      })

      let serverOneReq = new XMLHttpRequest();
      let serverTwoReq = new XMLHttpRequest();
      let serverThreeReq = new XMLHttpRequest();
      myRequest(serverOneReq, serverTwoReq, serverThreeReq, serverOne, data, 1,
            navigation, setModalVisible, setStatusText, setShowBackButton);
      myRequest(serverTwoReq, serverOneReq, serverThreeReq, serverTwo, data, 2,
            navigation, setModalVisible, setStatusText, setShowBackButton);
      myRequest(serverThreeReq, serverTwoReq, serverOneReq, serverThree, data, 3,
            navigation, setModalVisible, setStatusText, setShowBackButton);
}

export default ProcessImage;

const extractBoardFromResponse = (res) => {
      let singleRowBoard = res.split(" ");
      singleRowBoard.pop();
      singleRowBoard = singleRowBoard.map(x => parseInt(x));
      let board = []
      for (let i = 0; i < 9; ++i) {
            board.push(singleRowBoard.slice(9 * i, 9 * (i + 1)));
      }
      return board;
}



let myRequest = async (request_1, request_2, request_3, site, reqData, serverNo,
      navigation, setModalVisible, setStatusText, setShowBackButton) => {
      return new Promise((resolve, reject) => {
            request_1.onreadystatechange = (e) => {
                  if (request_1.readyState !== 4 || success == true) {
                        DEBUG && console.log("Server : " + serverNo + " Success : " + success + " ReadyState : " + request_1.readyState);
                        return;
                  }
                  if (request_1.status === 200) {
                        let res = request_1.responseText;
                        if (res[0] !== '<') {
                              success = true;
                              request_2.abort();
                              request_3.abort();
                              DEBUG && console.log("Inside success {server-" + serverNo + "} : " + res);
                              setModalVisible(false);
                              setStatusText("Extracting Sudoku\n(Server 1)");//default(for next extraction)
                              navigation.navigate("SudokuScreen",
                                    {
                                          board: extractBoardFromResponse(res),
                                          pressActive: true,
                                          timeReq: "Extracted Sudoku\n(Tap on the cell if required to edit)"
                                    })
                        }
                        else {
                              console.log("Received res[0] as '<'");
                              if (serverNo == 1) {
                                    serverOneFail = true;
                              }
                              else if (serverNo == 2) {
                                    serverTwoFail = true;
                              }
                              else if (serverNo == 3) {
                                    serverThreeFail = true;
                              }
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
                              setStatusText("Server-" + (failCount) + " Failed\n\nExtracting Sudoku\n(Server " + (failCount + 1) + ")");
                              console.log("Server-1 Failed.");
                              serverOneFail = true;
                        }
                        else if (serverNo == 2) {
                              setStatusText("Server-" + (failCount) + " Failed\n\nExtracting Sudoku\n(Server " + (failCount + 1) + ")");
                              console.log("Server-2 Failed.");
                              serverTwoFail = true;
                        }
                        else if (serverNo == 3) {
                              setStatusText("Server-" + (failCount) + " Failed\n\nExtracting Sudoku\n(Server " + (failCount + 1) + ")");
                              console.log("Server-3 Failed.");
                              serverTwoFail = true;
                        }
                  }
            };
            request_1.open('POST', site + "/upload", true);
            request_1.onload = resolve;
            request_1.onerror = reject;
            request_1.send(reqData);
      })
}