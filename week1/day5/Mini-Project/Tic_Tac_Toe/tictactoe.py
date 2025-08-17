def display_board(board):
    print("\nTIC TAC TOE")
    print("****************")
    for row in board:
        print("* " + " | ".join(row) + " *")
    print("****************\n")


def player_input(player, board):
    while True:
        try:
            row = int(input(f"Player {player}'s turn...\nEnter row (1-3): ")) - 1
            col = int(input("Enter column (1-3): ")) - 1

            if row not in range(3) or col not in range(3):
                print("Invalid position! Choose row and column between 1 and 3.")
                continue

            if board[row][col] == " ":
                board[row][col] = player
                break
            else:
                print("That spot is already taken! Try again.")
        except ValueError:
            print("Please enter numbers only.")


def check_win(board, player):
    # Check rows
    for row in board:
        if all(s == player for s in row):
            return True

    # Check columns
    for col in range(3):
        if all(board[row][col] == player for row in range(3)):
            return True

    # Check diagonals
    if all(board[i][i] == player for i in range(3)):
        return True
    if all(board[i][2 - i] == player for i in range(3)):
        return True

    return False


def check_full(board):
    return all(cell != " " for row in board for cell in row)


def play():
    board = [[" " for _ in range(3)] for _ in range(3)]
    current_player = "X"

    print("Welcome to TIC TAC TOE!")
    display_board(board)

    while True:
        player_input(current_player, board)
        display_board(board)

        if check_win(board, current_player):
            print(f"Player {current_player} wins!")
            break
        elif check_full(board):
            print("It's a tie!")
            break

        # Switch player
        current_player = "O" if current_player == "X" else "X"


if __name__ == "__main__":
    play()
