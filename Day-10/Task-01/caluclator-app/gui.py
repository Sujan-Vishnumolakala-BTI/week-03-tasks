import tkinter as tk
from tkinter import messagebox

from calculator import Calculator

calc = Calculator()


def calculate():
    try:
        num1 = float(entry1.get())
        num2 = float(entry2.get())
        operation = operation_var.get()

        if operation == "+":
            result = calc.add(num1, num2)
        elif operation == "-":
            result = calc.subtract(num1, num2)
        elif operation == "*":
            result = calc.multiply(num1, num2)
        elif operation == "/":
            result = calc.divide(num1, num2)
        else:
            result = "Invalid Operation"

        result_label.config(text=f"Result: {result}")

    except ValueError:
        messagebox.showerror("Input Error", "Please enter valid numbers.")

    except ZeroDivisionError as e:
        messagebox.showerror("Math Error", str(e))


root = tk.Tk()
root.title("Simple Calculator")
root.geometry("350x250")
root.resizable(False, False)

tk.Label(root, text="Simple Calculator",
         font=("Arial", 16, "bold")).pack(pady=10)

tk.Label(root, text="First Number").pack()
entry1 = tk.Entry(root, width=25)
entry1.pack()

tk.Label(root, text="Second Number").pack()
entry2 = tk.Entry(root, width=25)
entry2.pack()

operation_var = tk.StringVar(value="+")

operations = tk.Frame(root)
operations.pack(pady=10)

for op in ["+", "-", "*", "/"]:
    tk.Radiobutton(
        operations,
        text=op,
        variable=operation_var,
        value=op
    ).pack(side=tk.LEFT, padx=10)

tk.Button(
    root,
    text="Calculate",
    command=calculate,
    bg="#4CAF50",
    fg="white",
    width=15
).pack(pady=10)

result_label = tk.Label(root, text="Result: ", font=("Arial", 12))
result_label.pack()

root.mainloop()