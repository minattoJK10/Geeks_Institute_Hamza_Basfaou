from exercices4 import Family

class TheIncredibles(Family):
    def use_power(self, name):
        for member in self.members:
            if member['name'].lower() == name.lower():
                if member['age'] >= 18:
                    print(f"{member['name']}'s power is: {member['power']}")
                else:
                    raise Exception(f"{member['name']} is not over 18 years old and cannot use their power.")
                return
        print(f"No member named {name} found.")

    def incredible_presentation(self):
        print("\n* Here is our powerful family *")
        super().family_presentation()

# -----------------------------
# Testing TheIncredibles Class
# -----------------------------
# Initial members with extra keys
incredibles_members = [
    {'name': 'Michael', 'age': 35, 'gender': 'Male', 'is_child': False, 'power': 'fly', 'incredible_name': 'MikeFly'},
    {'name': 'Sarah', 'age': 32, 'gender': 'Female', 'is_child': False, 'power': 'read minds', 'incredible_name': 'SuperWoman'}
]

incredible_family = TheIncredibles("Incredibles", incredibles_members)
incredible_family.incredible_presentation()
incredible_family.use_power("Michael")
incredible_family.use_power("Sarah")
incredible_family.born(
    name="Baby Jack",
    age=1,
    gender="Male",
    is_child=True,
    power="Unknown Power",
    incredible_name="BabyJack"
)
incredible_family.incredible_presentation()

try:
    incredible_family.use_power("Baby Jack")
except Exception as e:
    print("Error:", e)
