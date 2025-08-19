# Daily Challenge: Map letters to their positions in a word
# Ask the user for a word
word = input("Enter a word: ").strip().lower()  # Lowercase to handle case-insensitivity
# Initialize empty dictionary to store results
positions = {}
# Loop through the word with index
for index, letter in enumerate(word):
    # If letter is not yet in dictionary, create a new list
    if letter not in positions:
        positions[letter] = []
    # Append the index to the letter's list
    positions[letter].append(index)
# Display the dictionary
print(positions)
