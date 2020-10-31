import os
import sys
import time

from flask import Flask, request, make_response, render_template
from flask_cors import CORS
try:
    from cv2 import cv2
except:
    import cv2

from utility.imutils import matrix_to_string, string_to_board
from utility.main import get_board
from utility.masterSolver import solve_board


'''
TYPE : Build Type
0 : Production
1 : Development
'''
TYPE = 0
CURRENT_FILE = os.path.dirname(os.path.abspath(__file__))
DEBUG_PRINT = False
TIMEOUT = 3


#Flask App
app = Flask(__name__, template_folder=CURRENT_FILE+"/template")
cors = CORS(app)


# Load Model
print("Loading Model....")
model = cv2.dnn.readNetFromTensorflow(CURRENT_FILE + "/model/cv-final-model.pb")
print("Model Loaded....")


@app.route('/')
def home():
    DEBUG_PRINT and print("Home Page Accessed.")
    return render_template('index.html')


@app.route('/debug/<state>')
def debug(state):
    global DEBUG_PRINT
    if state=="1" or state=="true" or state=="True" or state=="TRUE":
        DEBUG_PRINT = True
    else:
        DEBUG_PRINT = False
    return "Debugging : " + str(DEBUG_PRINT)


@app.route('/debug')
def debug_status():
    return "Debugging : " + str(DEBUG_PRINT)


@app.route('/timeout/<state>')
def timeout(state):
    global TIMEOUT
    if ord(state) in range(ord("1"),ord("9")+1):
        TIMEOUT = int(state)
    return "Timeout : " + str(TIMEOUT)


@app.route('/timeout')
def timeout_status():
    return "Timeout : " + str(TIMEOUT)


@app.route('/activate')
def activate():
    DEBUG_PRINT and print("Server Activated")
    return "Server Activated"


@app.route('/upload', methods=['POST'])
def getImages():
    file = request.files['source']
    file_path = os.path.join(CURRENT_FILE, 'source.jpg')
    file.save(file_path)
    try:
        start = time.time()
        DEBUG_PRINT and print("Starting Process......")
        board = get_board(model, file_path, DEBUG_PRINT, CURRENT_FILE)
        board_as_string = matrix_to_string(board)
        DEBUG_PRINT and print(board_as_string)
        response = make_response(board_as_string, 200)
        response.mimetype = 'text/plain'
        DEBUG_PRINT and print("Done in : ", str(time.time() - start)[:4] , "seconds .")
        return response
    except Exception as e:
        if DEBUG_PRINT:
            print("\n..........ERROR..........\nCheck for following error:")
            print(e, file=sys.stderr)
            print("\nCheck for above error\n..........ERROR..........\n")
        response = make_response('Some error Occured', 400)
        response.mimetype = 'text/plain'
        return response

@app.route('/solve/<board_as_string>')
def solve(board_as_string):
    try:
        board = string_to_board(board_as_string)
        DEBUG_PRINT and print("Received Board : ",board)
        status, solved_board, time_taken = solve_board(board)
        DEBUG_PRINT and print("Solved in : "+ time_taken +" Seconds")
        DEBUG_PRINT and solved_board
        return solved_board + time_taken + " " + str(int(status))
    except Exception as e:
        DEBUG_PRINT and print("\n..........ERROR..........\nCheck for following error:")
        DEBUG_PRINT and print(e, file=sys.stderr)
        DEBUG_PRINT and print("\nCheck for above error\n..........ERROR..........\n")
        return "failed"


TYPE and app.run()

