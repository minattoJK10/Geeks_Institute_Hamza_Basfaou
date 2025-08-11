word = input("Enter a word: ")
new_word = ""
for i in range(len(word)):
    if i == 0 or word[i] != word[i - 1]:
        new_word += word[i]
print("Word without consecutive duplicates:", new_word)