import random
wins = 0
losses = 0
while True:
    user_input = input("Guess a number between 1 and 9 (or type 'quit' to exit): ")
    if user_input.lower() == "q":
        break
    
    if not user_input.isdigit() or not (1 <= int(user_input) <= 9):
        print("Please enter a valid number between 1 and 9.")
        continue
    user_guess = int(user_input)
    
    random_number = random.randint(1, 9)
    
    if user_guess == random_number:
        print("Winner 🎉")
        wins += 1
    else:
        print(f"Better luck next time! The number was {random_number}.")
        losses += 1


print(f"\nGames won: {wins}")
print(f"Games lost: {losses}")
print("Thanks for playing!")
