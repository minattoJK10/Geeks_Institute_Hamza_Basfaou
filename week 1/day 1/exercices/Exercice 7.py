basket = ["Banana", "Apples", "Oranges", "Blueberries"];
print(basket)
basket.pop(0)
print(basket)
basket.pop()
# Add Kiwi to the end of the list
basket.append("Kiwi")
print(basket)
# Add Apples to the beginning of the list
basket.insert(0, "Apples")
print(basket)

# Count how many apples (case-sensitive, so it will only match "Apples")
apple_count = basket.count("Apples")
print("Number of Apples:", apple_count)

basket.clear()

# Print the basket
print(basket)