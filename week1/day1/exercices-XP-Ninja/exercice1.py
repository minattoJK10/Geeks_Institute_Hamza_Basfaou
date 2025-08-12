# Exercise 1: Predict outputs and print them

print(3 <= 3 < 9)               # True
print(3 == 3 == 3)              # True
print(bool(0))                  # False
print(bool(5 == "5"))           # False
print(bool(4 == 4) == bool("4" == "4"))  # True
print(bool(bool(None)))         # False

x = (1 == True)
y = (1 == False)
a = True + 4
b = False + 10

print("x is", x)
print("y is", y)
print("a:", a)
print("b:", b)
