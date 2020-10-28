import os

try:
      from cv2 import cv2
except:
      import cv2 
import numpy as np

from utility.preprocess import preprocess_sudoku_board
from utility.imutils import print_board



MNIST_DIMENSION = (28, 28)
EMPTY = 0


def get_board(model, image_path = "", DEBUG_PRINT = False, CURRENT_FILE = os.getcwd()):
    input_sudoku_img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    resized_sudoku_img = cv2.resize(input_sudoku_img, (1200, 900), interpolation=cv2.INTER_AREA)
    processed_sudoku_img = None
    try:
          processed_sudoku_img = preprocess_sudoku_board(resized_sudoku_img.copy(), MNIST_DIMENSION)
    except:
          DEBUG_PRINT and print("Sending Empty Sudoku")
          return np.zeros((9, 9), dtype=np.int8)
    sudoku_board = np.zeros((9, 9), dtype=np.int8)

    for index, square in enumerate(processed_sudoku_img):
        if square[1]:
            blob = cv2.dnn.blobFromImage(np.float32(square[0]), 1.0/255.0, size=(28, 28))
            model.setInput(blob)
            preds=model.forward()
            classId = np.argmax(preds.flatten())
            sudoku_board[int(index / 9)][index % 9] = int(classId) + 1
        else:
            sudoku_board[int(index / 9)][index % 9] = EMPTY

    DEBUG_PRINT and print_board(sudoku_board)
    return sudoku_board
