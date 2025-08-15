#import Dog in exercices2
from exercices2 import Dog
import random

class PetDog(Dog):
    def __init__(self, name, age, weight, trained=False):
        super().__init__(name, age, weight)
        self.trained = trained

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        dog_names = [self.name] + [dog.name for dog in args]
        print(f"{', '.join(dog_names)} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                f"{self.name} does a barrel roll",
                f"{self.name} stands on his back legs",
                f"{self.name} shakes your hand",
                f"{self.name} plays dead"
            ]
            print(random.choice(tricks))
        else:
            print(f"{self.name} isn't trained yet and refuses to do a trick.")

#Test Part
dog1 = PetDog("Rex", 5, 20)
dog2 = PetDog("Buddy", 3, 18)
dog3 = PetDog("Max", 4, 25)

dog1.play(dog2, dog3)

dog1.train()
dog1.do_a_trick()

dog2.do_a_trick()
