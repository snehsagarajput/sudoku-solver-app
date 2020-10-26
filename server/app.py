import os
import sys
import time

from flask import Flask, request, make_response, render_template
from flask_cors import CORS
try:
    from cv2 import cv2
except:
    import cv2

from utility.imutils import matrix_to_string
from utility.main import get_board


'''
TYPE : Build Type
0 : Production
1 : Development
'''
TYPE = 0 
CURRENT_FILE = os.path.dirname(os.path.abspath(__file__))
DEBUG_PRINT = False

#Flask App
app = Flask(__name__, template_folder=CURRENT_FILE+"/template")
cors = CORS(app)

# Load Model
DEBUG_PRINT and print("Loading Model....")
model = cv2.dnn.readNetFromTensorflow(CURRENT_FILE + "/model/cv-final-model.pb")
DEBUG_PRINT and print("Model Loaded....")
    


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


@app.route('/activate')
def activate():
    DEBUG_PRINT and print("Server Activated")
    return "Server Activated"


@app.route('/upload', methods=['POST'])
def getImages():
    start = time.time()
    file = request.files['source']
    file_path = os.path.join(CURRENT_FILE, 'source.jpg')
    file.save(file_path)
    try:
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


TYPE and app.run()

