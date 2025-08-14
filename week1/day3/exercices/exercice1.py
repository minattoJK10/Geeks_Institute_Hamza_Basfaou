
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

def find_oldest_cat(cats):
    return max(cats, key=lambda cat: cat.age)

cat1 = Cat("mimi", 3)
cat2 = Cat("Buu", 4)
cat3 = Cat("Shadow", 5)
cats = [cat1, cat2, cat3]

oldest = find_oldest_cat(cats)

print(f"The oldest cat is {oldest.name}, and is {oldest.age} years old.")
