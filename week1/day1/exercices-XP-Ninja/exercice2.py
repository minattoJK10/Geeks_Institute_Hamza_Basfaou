# Exercise 2: Longest sentence without 'A'

longest_sentence = ""

while True:
    sentence = input("Enter a sentence without the letter 'A' (or type 'exit' to quit): ")
    if sentence.lower() == "q":
        print("Goodbye!")
        break

    if "A" in sentence.lower():
        print("Oops! Your sentence contains the letter 'A'. Try again.")
        continue

    if len(sentence) > len(longest_sentence):
        longest_sentence = sentence
        print(" Congratulations! This is the longest valid sentence so far.")
    else:
        print("Try to beat the longest sentence so far.")
