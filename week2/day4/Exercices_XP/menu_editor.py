from menu_item import MenuItem
from menu_manager import MenuManager

def show_user_menu():
    while True:
        print("\n--- Restaurant Menu Manager ---")
        print("(V) View an Item")
        print("(A) Add an Item")
        print("(D) Delete an Item")
        print("(U) Update an Item")
        print("(S) Show Menu")
        print("(E) Exit")

        choice = input("Enter your choice: ").strip().upper()

        if choice == "V":
            name = input("Enter item name: ")
            item = MenuManager.get_by_name(name)
            if item:
                print(f"Item: {item['name']} | Price: {item['price']}")
            else:
                print("Item not found.")
        elif choice == "A":
            add_item_to_menu()
        elif choice == "D":
            remove_item_from_menu()
        elif choice == "U":
            update_item_from_menu()
        elif choice == "S":
            show_restaurant_menu()
        elif choice == "E":
            print("\nExiting program...")
            show_restaurant_menu()
            break
        else:
            print("Invalid choice, please try again.")

def add_item_to_menu():
    name = input("Enter item name: ")
    price = int(input("Enter item price: "))
    item = MenuItem(name, price)
    item.save()

def remove_item_from_menu():
    name = input("Enter the name of the item to delete: ")
    item = MenuItem(name, 0)
    if item.delete():
        print(f"{name} deleted successfully!")
    else:
        print("Error: Item not found.")

def update_item_from_menu():
    old_name = input("Enter the item name to update: ")
    new_name = input("Enter new name: ")
    new_price = int(input("Enter new price: "))
    item = MenuItem(old_name, 0)
    if item.update(new_name, new_price):
        print("Item updated successfully!")
    else:
        print("Error: Item not found.")

def show_restaurant_menu():
    items = MenuManager.all_items()
    print("\n--- Restaurant Menu ---")
    for i in items:
        print(f"{i['id']}. {i['name']} - {i['price']}")

if __name__ == "__main__":
    """If the Table MenuItem it Has no Data Desactivate the Comment"""
    """
    item = MenuItem('Burger', 35)
    item.save()

    item.update('Veggie Burger', 37)
    item.delete()

    item2 = MenuManager.get_by_name('Beef Stew')
    items = MenuManager.all_items()
    """
    show_user_menu()
