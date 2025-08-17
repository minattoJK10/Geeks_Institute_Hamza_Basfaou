from game import Game

def get_user_menu_choice():
    print("\nMenu:")
    print("(g) Play a new game")
    print("(x) Show scores and exit")
    choice = input(": ").lower()
    if choice in ["g", "x"]:
        return choice
    else:
        print("Invalid choice, please select again.")
        return get_user_menu_choice()

def print_results(results):
    print("\nGame Results:")
    print(f"You won {results['win']} times")
    print(f"You lost {results['loss']} times")
    print(f"You drew {results['draw']} times")
    print("\nThank you for playing!")

def main():
    results = {"win": 0, "loss": 0, "draw": 0}

    while True:
        choice = get_user_menu_choice()

        if choice == "g":
            game = Game()
            result = game.play()
            results[result] += 1

        elif choice == "x":
            print_results(results)
            break

if __name__ == "__main__":
    main()
