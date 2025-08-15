class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight
    def bark(self):
        return f"{self.name} is barking"
    def run_speed(self):
        return (self.weight / self.age) * 10
    def fight(self, other_dog):
        self_strength = self.run_speed() * self.weight
        other_strength = other_dog.run_speed() * other_dog.weight
        
        if self_strength > other_strength:
            return f"{self.name} won the fight against {other_dog.name}!"
        elif self_strength < other_strength:
            return f"{other_dog.name} won the fight against {self.name}!"
        else:
            return f"The fight between {self.name} and {other_dog.name} was a draw!"

dog1 = Dog("Diana", 5, 20)
dog2 = Dog("Rex", 3, 18)
dog3 = Dog("Simba", 4, 25)

# Test barking
print(dog1.bark())
print(dog2.bark())
print(dog3.bark())
# Test speeds
print(f"{dog1.name} speed:", dog1.run_speed())
print(f"{dog2.name} speed:", dog2.run_speed())
print(f"{dog3.name} speed:", dog3.run_speed())
# Test fights
print(dog1.fight(dog2))
print(dog2.fight(dog3))
print(dog3.fight(dog1))