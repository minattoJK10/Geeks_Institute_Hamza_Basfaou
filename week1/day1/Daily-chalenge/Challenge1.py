number = int(input("Enter a number: "))
length = int(input("Enter the desired length: "))
multiples = []
for i in range(1, length + 1):
    multiples.append(number * i)
print("List of multiples:", multiples)
