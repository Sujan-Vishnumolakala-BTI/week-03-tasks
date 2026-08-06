const validateUser = require("../src/userValidator");

describe("User Validator", () => {
  test("should validate a valid user", () => {
    const user = {
      name: "Alice",
      email: "alice@example.com",
      age: 25
    };

    expect(validateUser(user)).toEqual({
      status: "SUCCESS",
      message: "User validation completed successfully."
    });
  });

  test("should throw error for invalid name", () => {
    const user = {
      name: "Al",
      email: "alice@example.com",
      age: 25
    };

    expect(() => validateUser(user)).toThrow(
      "Name must be at least 3 characters long"
    );
  });

  test("should throw error for invalid email", () => {
    const user = {
      name: "Alice",
      email: "aliceexample.com",
      age: 25
    };

    expect(() => validateUser(user)).toThrow(
      "Invalid email address"
    );
  });

  test("should throw error for underage user", () => {
    const user = {
      name: "Alice",
      email: "alice@example.com",
      age: 16
    };

    expect(() => validateUser(user)).toThrow(
      "User must be at least 18 years old"
    );
  });

  test("should throw error when user object is missing", () => {
    expect(() => validateUser()).toThrow(
      "User object is required"
    );
  });
});