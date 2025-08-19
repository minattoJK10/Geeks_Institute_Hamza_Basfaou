#Exercice 2
# --- Bonus: Ask the user for names and ages ---
family = {}
while True:
    name = input("Enter a family member's name (or type 'done' to finish): ").strip()
    if name.lower() == "done":
        break
    age_input = input(f"Enter {name}'s age: ")
    if age_input.isdigit():
        family[name] = int(age_input)
    else:
        print("Please enter a valid number for age.")

# --- Ticket pricing ---
total_cost = 0

for member, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15

    total_cost += price
    print(f"{member.capitalize()} has to pay ${price}")

# --- Display total cost ---
print(f"\nTotal cost for the family: ${total_cost}")
