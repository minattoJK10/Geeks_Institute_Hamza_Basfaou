class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []
    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)
            print(f"{new_animal} added to {self.name}.")
        else:
            print(f"{new_animal} is already in the zoo.")

    def get_animals(self):        
        print(f"Animals in {self.name}: {', '.join(self.animals) if self.animals else 'No animals yet.'}")

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"{animal_sold} has been sold.")
        else:
            print(f"{animal_sold} not found in {self.name}.")

    def sort_animals(self):
        sorted_animals = sorted(self.animals)
        groups = {}
        for animal in sorted_animals:
            first_letter = animal[0].upper()
            if first_letter not in groups:
                groups[first_letter] = []
            groups[first_letter].append(animal)

        for key in groups:
            if len(groups[key]) == 1:
                groups[key] = groups[key][0]
        return groups

    def get_groups(self):
        groups = self.sort_animals()
        for key, value in groups.items():
            print(f"{key}: {value}")    

new_york_zoo = Zoo("New York Zoo")

new_york_zoo.add_animal("Giraffe")
new_york_zoo.add_animal("Ape")
new_york_zoo.add_animal("Baboon")
new_york_zoo.add_animal("Bear")
new_york_zoo.add_animal("Cat")
new_york_zoo.add_animal("Cougar")
new_york_zoo.add_animal("Emu")
new_york_zoo.add_animal("Eel")

new_york_zoo.get_animals()

print("\nSelling Baboon...")
new_york_zoo.sell_animal("Baboon")
new_york_zoo.get_animals()

print("\nSorted groups:")
new_york_zoo.get_groups()