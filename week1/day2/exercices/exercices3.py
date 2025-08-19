# 1. Create the dictionary
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}
# 2. Change the number of stores to 2
brand["number_stores"] = 2
# 3. Print who Zara's clients are
print(f"Zara's clients are: {', '.join(brand['type_of_clothes'])}.")
# 4. Add country_creation
brand["country_creation"] = "Spain"
# 5. Add 'Desigual' if key exists
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")
# 6. Delete creation_date
del brand["creation_date"]
# 7. Print last international competitor
print("Last international competitor:", brand["international_competitors"][-1])
# 8. Print major clothes colors in the US
print("Major clothes colors in the US:", brand["major_color"]["US"])
# 9. Print the amount of key-value pairs
print("Number of key-value pairs:", len(brand))
# 10. Print keys of the dictionary
print("Keys in brand dictionary:", list(brand.keys()))
# 11. Create more_on_zara
more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}
# 12. Update brand with more_on_zara
brand.update(more_on_zara)
# 13. Print the value of number_stores
print("Updated number of stores:", brand["number_stores"])
# What happened? → The value of number_stores was overwritten by more_on_zara's value (10000).
