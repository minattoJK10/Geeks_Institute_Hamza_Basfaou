class MenuManager:
    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True}
        ]

    def add_item(self, name, price, spice, gluten):
        self.menu.append({"name": name, "price": price, "spice": spice, "gluten": gluten})
        print(f"Added {name} to the menu.")

    def update_item(self, name, price=None, spice=None, gluten=None):
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                if price is not None:
                    dish["price"] = price
                if spice is not None:
                    dish["spice"] = spice
                if gluten is not None:
                    dish["gluten"] = gluten
                print(f"{name} has been updated.")
                return
        print(f"{name} is not in the menu.")

    def remove_item(self, name):
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                self.menu.remove(dish)
                print(f"{name} has been removed. Updated menu:")
                print(self.menu)
                return
        print(f"{name} is not in the menu.")


manager = MenuManager()
print("Initial menu:", manager.menu)

manager.add_item("Pizza", 20, "A", True)
manager.update_item("Salad", price=20, spice="B")
manager.remove_item("Hamburger")
manager.remove_item("Steak")  