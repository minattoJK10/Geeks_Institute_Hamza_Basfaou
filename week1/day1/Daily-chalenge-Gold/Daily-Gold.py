from datetime import datetime

birthdate = input("Enter your birthdate (DD/MM/YYYY): ")
try:
    bdate = datetime.strptime(birthdate, "%d/%m/%Y")
except ValueError:
    exit("Invalid date format! Please use DD/MM/YYYY.")

age = datetime.today().year - bdate.year - ((datetime.today().month, datetime.today().day) < (bdate.month, bdate.day))
candles = "i" * (age % 10)

cake = f"""
       ___{candles}___
      |:H:a:p:p:y:|
    __|___________|__
   |^^^^^^^^^^^^^^^^^|
   |:B:i:r:t:h:d:a:y:|
   |                 |
   ~~~~~~~~~~~~~~~~~~~
"""

if (bdate.year % 4 == 0 and bdate.year % 100 != 0) or (bdate.year % 400 == 0):
    print("Leap year baby! Double cakes for you!\n" + cake * 2)
else:
    print(cake)

print(f" You are {age} years old! ")
