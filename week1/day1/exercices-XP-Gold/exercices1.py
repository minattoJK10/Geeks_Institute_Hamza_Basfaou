month = int(input("Enter the month number (1-12): "))

if month in (3, 4, 5):
    season = "Spring"
elif month in (6, 7, 8):
    season = "Summer"
elif month in (9, 10, 11):
    season = "Autumn"
elif month in (12, 1, 2):
    season = "Winter"
else:
    season = None
    
if season:
    print(f"The season for month {month} is {season}.")
else:
    print("Invalid month number. Please enter a number between 1 and 12.")
