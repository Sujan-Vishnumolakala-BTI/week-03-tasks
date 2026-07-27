const users = [
  { id: 1, name: "Alice", age: 25, salary: 50000, active: true },
  { id: 2, name: "Bob", age: 30, salary: 70000, active: false },
  { id: 3, name: "Charlie", age: 22, salary: 45000, active: true },
  { id: 4, name: "David", age: 35, salary: 90000, active: true },
  { id: 5, name: "Eva", age: 28, salary: 60000, active: false }
];

// filter() - Get users with age greater than 25
const filteredUsers = users.filter(user => user.age > 25);
console.log("Filter:", filteredUsers);

// find() - Find the first active user
const foundUser = users.find(user => user.active);
console.log("Find:", foundUser);

// some() - Check if any user earns more than 80000
const hasHighSalary = users.some(user => user.salary > 80000);
console.log("Some:", hasHighSalary);

// every() - Check if all users are adults
const allAdults = users.every(user => user.age >= 18);
console.log("Every:", allAdults);

// map() - Get only user names
const names = users.map(user => user.name);
console.log("Map:", names);

// reduce() - Calculate total salary
const totalSalary = users.reduce((total, user) => total + user.salary, 0);
console.log("Reduce (Total Salary):", totalSalary);

// forEach() - Print each user's name
console.log("ForEach:");
users.forEach(user => console.log(user.name));

// sort() - Sort users by age
const sortedUsers = [...users].sort((a, b) => a.age - b.age);
console.log("Sort:", sortedUsers);

// findIndex() - Find index of Bob
const bobIndex = users.findIndex(user => user.name === "Bob");
console.log("FindIndex:", bobIndex);

// includes() - Check if a name exists
const fruits = ["Apple", "Banana", "Orange"];
console.log("Includes:", fruits.includes("Banana"));

console.log(fruits);
console.log(fruits.reverse());
