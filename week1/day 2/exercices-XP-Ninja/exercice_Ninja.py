# =========================
# Exercise 1: Cars
# =========================

cars_str = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

cars_list = [car.strip() for car in cars_str.split(",")]
print("List of manufacturers:", cars_list)
print(f"There are {len(cars_list)} manufacturers in the list.")

print("Manufacturers in reverse order:", sorted(cars_list, reverse=True))

with_o = [car for car in cars_list if "o" in car.lower()]
print(f"{len(with_o)} manufacturers have the letter 'o' -> {with_o}")

without_i = [car for car in cars_list if "i" not in car.lower()]
print(f"{len(without_i)} manufacturers do NOT have the letter 'i' -> {without_i}")

cars_with_duplicates = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]
unique_cars = list(set(cars_with_duplicates))
print(f"Companies without duplicates ({len(unique_cars)}): {', '.join(unique_cars)}")

reversed_names = [car[::-1] for car in sorted(unique_cars)]
print("Reversed letters:", reversed_names)


# =========================
# Exercise 2: What’s your name?
# =========================

def get_full_name(first_name, last_name, middle_name=""):
    if middle_name:
        return f"{first_name.capitalize()} {middle_name.capitalize()} {last_name.capitalize()}"
    else:
        return f"{first_name.capitalize()} {last_name.capitalize()}"

print(get_full_name("john", "lee", "hooker"))
print(get_full_name("bruce", "lee"))


# =========================
# Exercise 3: English <-> Morse
# =========================

morse_dict = {
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".",
    "F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---",
    "K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---",
    "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
    "U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--",
    "Z": "--..",
    "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
    "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
    " ": "/"  
}


reverse_morse_dict = {v: k for k, v in morse_dict.items()}

def to_morse(text):
    return " ".join(morse_dict[char.upper()] for char in text if char.upper() in morse_dict)

def from_morse(code):
    return "".join(reverse_morse_dict[char] for char in code.split(" "))

print(to_morse("hello world"))
print(from_morse(".... . .-.. .-.. --- / .-- --- .-. .-.. -.."))
