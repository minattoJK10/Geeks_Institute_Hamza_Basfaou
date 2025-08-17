class BankAccount:
    def __init__(self, username, password, balance=0):
        self.username = username
        self.password = password
        self.balance = balance
        self.authenticated = False

    def authenticate(self, username, password):
        
        if self.username == username and self.password == password:
            self.authenticated = True
            print(f"{self.username} authenticated successfully.")
            return True
        else:
            print(" Authentication failed.")
            return False

    def deposit(self, amount):
        
        if not self.authenticated:
            raise Exception("User not authenticated.")
        if amount <= 0:
            raise Exception("Deposit must be positive.")
        self.balance += amount
        print(f"Deposited {amount}. New balance: {self.balance}")

    def withdraw(self, amount):
        
        if not self.authenticated:
            raise Exception("User not authenticated.")
        if amount <= 0:
            raise Exception("Withdrawal must be positive.")
        if amount > self.balance:
            raise Exception("Insufficient funds.")
        self.balance -= amount
        print(f"Withdrew {amount}. New balance: {self.balance}")


# ---------------- Part II: MinimumBalanceAccount ----------------
class MinimumBalanceAccount(BankAccount):
    def __init__(self, username, password, balance=0, minimum_balance=0):
        super().__init__(username, password, balance)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        """Only allow withdrawal if balance stays above minimum_balance"""
        if not self.authenticated:
            raise Exception("User not authenticated.")
        if amount <= 0:
            raise Exception("Withdrawal must be positive.")
        if self.balance - amount < self.minimum_balance:
            raise Exception("Withdrawal denied. Balance would drop below minimum balance.")
        self.balance -= amount
        print(f"Withdrew {amount}. New balance: {self.balance}")


# ---------------- Part IV: ATM ----------------
class ATM:
    def __init__(self, account_list, try_limit=2):
        # validate account_list
        if not isinstance(account_list, list) or not all(
            isinstance(acc, BankAccount) for acc in account_list
        ):
            raise Exception("account_list must contain only BankAccount or MinimumBalanceAccount instances.")

        # validate try_limit
        if not isinstance(try_limit, int) or try_limit <= 0:
            print(" Invalid try_limit, setting to default (2).")
            try_limit = 2

        self.account_list = account_list
        self.try_limit = try_limit
        self.current_tries = 0

        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n===== ATM Main Menu =====")
            print("1. Log In")
            print("2. Exit")
            choice = input("Choose an option: ")

            if choice == "1":
                username = input("Enter username: ")
                password = input("Enter password: ")
                self.log_in(username, password)
            elif choice == "2":
                print(" Exiting ATM. Goodbye!")
                break
            else:
                print(" Invalid choice, try again.")

    def log_in(self, username, password):
        for account in self.account_list:
            if account.authenticate(username, password):
                self.show_account_menu(account)
                return

        # failed attempt
        self.current_tries += 1
        print(f" Wrong credentials. Tries left: {self.try_limit - self.current_tries}")
        if self.current_tries >= self.try_limit:
            print(" Maximum login attempts reached. Shutting down ATM.")
            exit()

    def show_account_menu(self, account):
        while True:
            print(f"\n===== Account Menu ({account.username}) =====")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Exit to Main Menu")
            choice = input("Choose an option: ")

            if choice == "1":
                try:
                    amt = int(input("Enter deposit amount: "))
                    account.deposit(amt)
                except Exception as e:
                    print("Invalid choice", e)

            elif choice == "2":
                try:
                    amt = int(input("Enter withdrawal amount: "))
                    account.withdraw(amt)
                except Exception as e:
                    print("Invalid choice", e)

            elif choice == "3":
                print(" Returning to Main Menu.")
                break
            else:
                print(" Invalid choice, try again.")
if __name__ == "__main__":
    # create some accounts
    acc1 = BankAccount("alice", "pass123", 1000)
    acc2 = MinimumBalanceAccount("bob", "secret", 500, minimum_balance=200)
    # start ATM with accounts
    atm = ATM([acc1, acc2], try_limit=3)

