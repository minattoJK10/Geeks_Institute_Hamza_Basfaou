class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type, count=1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
        else:
            self.animals[animal_type] = count

    def get_info(self):
        info_lines = [f"{self.name}'s farm\n"]
        for animal, count in self.animals.items():
            info_lines.append(f"{animal} : {count}")
        info_lines.append("\n    E-I-E-I-0!")
        return "\n".join(info_lines)

    # Bonus Step 6
    def get_animal_types(self):
        return sorted(self.animals.keys())

    # Bonus Step 7
    def get_short_info(self):
        animal_list = self.get_animal_types()
        formatted_animals = []
        for animal in animal_list:
            if self.animals[animal] > 1:
                formatted_animals.append(animal + 's')
            else:
                formatted_animals.append(animal)
        if len(formatted_animals) > 1:
            short_animals = ", ".join(formatted_animals[:-1]) + " and " + formatted_animals[-1]
        else:
            short_animals = formatted_animals[0]
        return f"{self.name}'s farm has {short_animals}."

macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)


print(macdonald.get_info())


print(macdonald.get_short_info())
