# Authentication CLI - PART 1

# Predefined users (username: password)

users = {
    "alice": "1234",
    "bob": "abcd",
    "charlie": "qwerty"
}

logged_in = None

while True:
    action = input("Enter command (login / signup / exit): ").strip().lower()

    if action == "exit":
        print("Goodbye!")
        break

    elif action == "login":
        username = input("Enter username: ")
        password = input("Enter password: ")

        if username in users and users[username] == password:
            print("You are now logged in!")
            logged_in = username
        else:
            print("Invalid username or password.")
# Authentication CLI - PART 2 (with signup)
    elif action == "signup":
        while True:
            new_username = input("Choose a username: ")
            if new_username in users:
                print("Username already exists, try again.")
            else:
                break

        new_password = input("Choose a password: ")
        users[new_username] = new_password
        print(f"User '{new_username}' successfully registered!")
#######################################################
    else:
        print("Invalid command.")

