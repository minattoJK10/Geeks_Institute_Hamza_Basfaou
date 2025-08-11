sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
print("The deli has run out of pastrami!\n")

# Remove all occurrences of Pastrami sandwich
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")

# Create empty list for finished sandwiches
finished_sandwiches = []

# Prepare orders
while sandwich_orders:
    current_sandwich = sandwich_orders.pop(0)  # take first sandwich
    print(f"I made your {current_sandwich.lower()}")
    finished_sandwiches.append(current_sandwich)

print("\nAll sandwiches made:")
for sandwich in finished_sandwiches:
    print(sandwich)