import random
class MyList:
    def __init__(self, letters):
        self.letters = letters

    def reversed_list(self):
        return self.letters[::-1]

    def sorted_list(self):
        return sorted(self.letters)

    def random_number_list(self):
        return [random.randint(1, 100) for _ in self.letters]


mylist = MyList(['a','d','c','b'])
print("Original list:", mylist.letters)
print("Reversed list:", mylist.reversed_list())
print("Sorted list:", mylist.sorted_list())
print("Random numbers list:", mylist.random_number_list())
