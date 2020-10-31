try:
    from utility.solver_1 import solve_board_1
except:
    from solver_1 import solve_board_1
try:
    from utility.solver_2 import solve_board_2
except:
    from solver_2 import solve_board_2
from threading import Thread, Event 
import time



def solve_board(board, timeout=2):
    '''
        Returns result[0]=True/False(Solved/Unsolved)
        Returns result[1]=solved board/{"error", "invalid", "unsolved"}
    '''
    result = []
    stop_it = Event()
    start = time.time()
    stuff_doing_thread = Thread(target=solve_board_1, args=(board, stop_it,result,)) 
    stuff_doing_thread.start() 
    stuff_doing_thread.join(timeout=timeout)
    end = time.time()
    if (not stop_it.is_set()) or (result[0]==False and result[1]=="error"):
        start = time.time()
        status = solve_board_2(board)
        end = time.time()
        if status==True:
            bas = ""
            for row in board:
                for element in row:
                    bas+=str(element)+" "
            result.extend([True,bas])
        else:
            result.extend([False,"unsolved"])
    time_taken = str(end-start)
    time_taken = time_taken[:min(6,len(time_taken))]
    return result[0], result[1], time_taken
        
    


'''

###Testing Code 
if __name__ == "__main__":
    sud=[[5, 3, 0, 0, 7, 0, 0, 0, 0], [6, 0, 0, 1, 9, 5, 0, 0, 0], [0, 9, 8, 0, 0, 0, 0, 6, 0], [8, 0, 0, 0, 6, 0, 0, 0, 3], [4, 0, 0, 8, 0, 3, 0, 0, 1], [7, 0, 0, 0, 2, 0, 0, 0, 6], [0, 6, 0, 0, 0, 0, 2, 8, 0], [0, 0, 0, 4, 1, 9, 0, 0, 5], [0, 0, 0, 0, 8, 0, 0, 7, 9]]
    sud1=[[7, 1, 3, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 9], [6, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
    sud2=[[0, 1, 3, 2, 4, 9, 5, 6, 8], [0, 4, 5, 1, 6, 8, 3, 7, 9], [0, 8, 9, 3, 5, 7, 1, 2, 4], [1, 2, 4, 5, 3, 6, 8, 9, 7], [3, 5, 7, 8, 9, 2, 4, 1, 6], [8, 9, 6, 4, 7, 1, 2, 3, 5], [4, 6, 1, 7, 2, 5, 9, 8, 3], [5, 7, 2, 9, 8, 3, 6, 4, 1], [9, 3, 8, 6, 1, 4, 7, 5, 2]]

    print(solve_board(sud1))

'''
