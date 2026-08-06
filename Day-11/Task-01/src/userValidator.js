function validateUser(user) {
  if (!user) {
    throw new Error("User object is required");
  }

  const { name, email, age } = user;

  if (!name || name.trim().length < 3) {
    throw new Error("Name must be at least 3 characters long");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error("Invalid email address");
  }

  if (age < 18) {
    throw new Error("User must be at least 18 years old");
  }

  return {
    status: "SUCCESS",
    message: "User validation completed successfully."
  };
}

module.exports = validateUser;