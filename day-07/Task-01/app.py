def create(name):
    if not name:
        print("Invalid name")
        return

    print(f"{name} created successfully")

def update(old_name, new_name):
    print(f"{old_name} updated to {new_name}")

print("CRUD Application")

create("Student")
update("Student", "Student1")