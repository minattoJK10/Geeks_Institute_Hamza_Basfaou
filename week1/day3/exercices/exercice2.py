class Dog():
    # Initializer / Instance Attributes
    def __init__(self, name_of_the_dog,height_of_the_dog):
        self.name = name_of_the_dog
        self.height = height_of_the_dog
        print(f"David's dog: Name = {self.name}, Height = {self.height} cm")

    def bark(self):
        print(f"{self.name} barks ! WAF")
    def jump(self):
        print(f"{self.name} jumps {self.height*2} cm high!")


davids_dog = Dog("Rex",50)
davids_dog.bark()
davids_dog.jump()
sarahs_dog = Dog("Teacup",20)
sarahs_dog.bark()
sarahs_dog.jump()
if davids_dog.height > sarahs_dog.height:
    print(f"The bigger dog is {davids_dog.name}.")
elif sarahs_dog.height > davids_dog.height:
    print(f"The bigger dog is {sarahs_dog.name}.")
else:
    print("Both dogs are the same height!")