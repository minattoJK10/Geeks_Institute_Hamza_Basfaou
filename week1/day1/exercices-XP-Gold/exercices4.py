names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
user_name = input("Enter your name: ")

if user_name in names:
    index = names.index(user_name)  
    print(f"The index of the first occurrence of {user_name} is {index}.")
else:
    print(f"{user_name} is not in the list.")
