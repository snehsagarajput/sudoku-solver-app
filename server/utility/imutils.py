def print_board(sudoku_board):
    for row_index, row in enumerate(sudoku_board):
        if row_index % 3 == 0:
            print(" -------------------------")
        for col_index, number in enumerate(row):
            if col_index % 3 == 0:
                print(" |", end='')
            if number != 0:
                print(" " + str(number), end='')
            else:
                print("  ", end='')
        print(" |")
    print(" -------------------------")

def matrix_to_string(matrix):
    st = "" 
    for sub_array in matrix:
        for element in sub_array:
            st += str(element) + " "
    return st
        
