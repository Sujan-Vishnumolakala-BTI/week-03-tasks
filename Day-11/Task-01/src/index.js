const validateUser = require("./userValidator");

const user = {
  name: "Alice",
  email: "alice@example.com",
  age: 25
};

try {
  const result = validateUser(user);
  console.log(result);
} catch (error) {
  console.error(error.message);
}