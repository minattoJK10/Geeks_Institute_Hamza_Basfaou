import random

# -------------------------------
# Exercise 1 & 2: Birthday Look-up
# -------------------------------

def birthday_lookup():
    birthdays = {
        "Alice": "1995/05/14",
        "Bob": "1988/11/23",
        "Charlie": "2000/07/01",
        "Diana": "1992/02/17",
        "Ethan": "1985/09/30"
    }

    print(" Welcome to the Birthday Look-up program! ")
    print("You can look up the birthdays of the people in the list.\n")

    # Show all names (Exercise 2)
    print("Here are the people we know:")
    for name in birthdays.keys():
        print(f"- {name}")

    # Ask for input
    person = input("\nWhose birthday do you want to look up? ")

    # Check and print result
    if person in birthdays:
        print(f"{person}'s birthday is on {birthdays[person]} 🎂")
    else:
        print(f" Sorry, we don’t have the birthday information for {person}.")


# -------------------------------
# Exercise 3: Sum (X+XX+XXX+XXXX)
# -------------------------------

def special_sum(x: int) -> int:
    
    return sum(int(str(x) * i) for i in range(1, 5))


# -------------------------------
# Exercise 4: Double Dice
# -------------------------------

def throw_dice() -> int:
    """Simulate rolling one dice (1–6)."""
    return random.randint(1, 6)

def throw_until_doubles() -> int:
    """Throw two dice until doubles appear. Return number of throws."""
    throws = 0
    while True:
        d1, d2 = throw_dice(), throw_dice()
        throws += 1
        if d1 == d2:
            break
    return throws

def main():
    results = []
    for _ in range(100):  # throw doubles 100 times
        results.append(throw_until_doubles())

    total_throws = sum(results)
    average_throws = total_throws / len(results)

    print("\n Dice Simulation Results ")
    print(f"Total throws: {total_throws}")
    print(f"Average throws to reach doubles: {average_throws:.2f}")


# -------------------------------
# Run all exercises
# -------------------------------
if __name__ == "__main__":
    # Exercise 1 & 2
    birthday_lookup()

    # Exercise 3
    x = int(input("\nEnter a number X to calculate X+XX+XXX+XXXX: "))
    print(f"Result: {special_sum(x)}")

    # Exercise 4
    main()
