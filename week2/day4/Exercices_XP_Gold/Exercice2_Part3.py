from config import connect
import bcrypt

def add_user_to_db(username, password):
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    conn = connect()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO users (username, password) VALUES (%s, %s)",
        (username, hashed.decode('utf-8'))
    )
    conn.commit()
    cur.close()
    conn.close()

def get_user_from_db(username):
    conn = connect()
    cur = conn.cursor()
    cur.execute("SELECT username, password FROM users WHERE username=%s", (username,))
    result = cur.fetchone()
    cur.close()
    conn.close()
    return result
# CLI
def login():
    username = input("Enter username: ")
    password = input("Enter password: ")

    user = get_user_from_db(username)
    if user and bcrypt.checkpw(password.encode('utf-8'), user[1].encode('utf-8')):
        print("You are now logged in!")
        return username
    else:
        print("Invalid username or password.")
        return None

def signup():
    while True:
        username = input("Enter a new username: ")
        if get_user_from_db(username):
            print("Username already exists. Try again.")
        else:
            break
    password = input("Enter a password: ")
    add_user_to_db(username, password)
    print("Signup successful!")

def main():
    logged_in = None
    while True:
        action = input("\nType 'login', 'signup', or 'exit': ").lower()
        if action == "exit":
            print("Exiting program...")
            break
        elif action == "login":
            logged_in = login()
        elif action == "signup":
            signup()
        else:
            print("Invalid input. Try again.")
        if logged_in:
            print(f"Current logged in user: {logged_in}")

if __name__ == "__main__":
    main()