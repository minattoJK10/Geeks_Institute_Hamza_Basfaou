import math

class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        return 2 * math.pi * self.radius

    def area(self):
        return math.pi * self.radius ** 2

    def definition(self):
        print("A circle is a set of all points in a plane that are at a given distance (radius) from a given point (center).")

circle = Circle(5)
print("Circle perimeter:", round(circle.perimeter(), 2))
print("Circle area:", round(circle.area(), 2))
circle.definition()
print("\n")