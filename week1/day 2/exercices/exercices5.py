import random

def compare_numbers(user_number):
  
    random_number = random.randint(1, 100)

  
    if user_number == random_number:
        print(f" Success! Both numbers are {user_number}.")
    else:
        print(f" Fail! Your number: {user_number}, Random number: {random_number}")

compare_numbers(50)  
