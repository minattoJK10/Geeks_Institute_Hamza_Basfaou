import random

def get_random_temp(season):
    """
    Returns a random temperature (float) based on the given season.
    """
    if season == "winter":
        return round(random.uniform(-10, 16), 1)
    elif season == "spring":
        return round(random.uniform(5, 23), 1)
    elif season == "summer":
        return round(random.uniform(16, 40), 1)
    elif season == "autumn":
        return round(random.uniform(0, 24), 1)
    else:
        return round(random.uniform(-10, 40), 1)  # fallback

def month_to_season(month):
    """
    Converts a month number to a season.
    """
    if month in [12, 1, 2]:
        return "winter"
    elif month in [3, 4, 5]:
        return "spring"
    elif month in [6, 7, 8]:
        return "summer"
    elif month in [9, 10, 11]:
        return "autumn"

def main():
    try:
        month = int(input("Enter the month number (1 = Jan, 12 = Dec): "))
        if month < 1 or month > 12:
            print("Invalid month number. Please enter between 1 and 12.")
            return
    except ValueError:
        print("Invalid input. Please enter a number between 1 and 12.")
        return

    season = month_to_season(month)
    temp = get_random_temp(season)
    
    print(f"\nThe temperature right now is {temp}°C ({season.capitalize()}).")

    # Friendly advice based on temperature
    if temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= temp <= 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 17 <= temp <= 23:
        print("Nice weather, enjoy your day!")
    elif 24 <= temp <= 32:
        print("Warm and sunny! Perfect day for the outdoors.")
    elif 33 <= temp <= 40:
        print("It's hot! Stay hydrated and avoid the midday sun.")

# Run the program
main()
