# Unit Testing Demo

- JUnit 5
- Assertions
- Test lifecycle annotations
- Parameterized tests
- Exception testing
- Mockito mocks
- Stubbing with `when(...).thenReturn(...)`
- Interaction verification with `verify(...)`
- `ArgumentCaptor`
- JaCoCo test coverage
- Docker
- Docker Compose

## Project Structure

```text
unit-testing-demo/
├── pom.xml
├── Dockerfile
├── compose.yaml
├── src/
│   ├── main/java/com/spanlet/testing/
│   │   ├── Calculator.java
│   │   ├── NotificationService.java
│   │   ├── User.java
│   │   ├── UserRepository.java
│   │   └── UserService.java
│   └── test/java/com/spanlet/testing/
│       ├── CalculatorTest.java
│       ├── UserTest.java
│       └── UserServiceTest.java

# Running Specific Tests in JUnit 5 with Maven and Docker

This project uses Maven, JUnit 5, Mockito, and Docker. Tests can be executed at different levels:

- Run all tests
- Run a specific test class
- Run a specific test method
- Run multiple test classes
- Run tests using patterns

## Run All Tests

### Local Maven

```bash
mvn clean test
```

Runs all test classes:

```
CalculatorTest
UserTest
UserServiceTest
```

### Docker

```bash
docker run --rm unit-testing-demo
```

---

# Run a Specific Test Class

A test class means a complete test file.

Example:

```
CalculatorTest.java
```

## Local Maven

```bash
mvn -Dtest=CalculatorTest test
```

## Docker

```bash
docker run --rm unit-testing-demo mvn -Dtest=CalculatorTest test
```

Only:

```
CalculatorTest
```

will execute.

---

# Run a Specific Test Method

A test method means only one `@Test` method inside a class.

Example:

```java
@Test
void addShouldReturnSum() {

}
```

## Local Maven

```bash
mvn -Dtest=CalculatorTest#addShouldReturnSum test
```

## Docker

```bash
docker run --rm unit-testing-demo mvn -Dtest=CalculatorTest#addShouldReturnSum test
```

Only this method runs:

```
CalculatorTest.addShouldReturnSum()
```

---

# Run Multiple Test Classes

Example:

Run:

```
CalculatorTest
UserTest
```

## Local Maven

```bash
mvn -Dtest=CalculatorTest,UserTest test
```

## Docker

```bash
docker run --rm unit-testing-demo mvn -Dtest=CalculatorTest,UserTest test
```

---

# Run Tests Using Pattern Matching

## Run all Service tests

```bash
mvn -Dtest=*ServiceTest test
```

Docker:

```bash
docker run --rm unit-testing-demo mvn -Dtest=*ServiceTest test
```

Example:

```
UserServiceTest
```

will execute.

---

# Project Test Classes

Current test files:

```
src/test/java/com/spanlet/testing

CalculatorTest.java
UserTest.java
UserServiceTest.java
```

---

# Commands for This Project

## Run Calculator Tests

```bash
docker run --rm unit-testing-demo mvn -Dtest=CalculatorTest test
```

---

## Run User Tests

```bash
docker run --rm unit-testing-demo mvn -Dtest=UserTest test
```

---

## Run UserService Mockito Tests

```bash
docker run --rm unit-testing-demo mvn -Dtest=UserServiceTest test
```

---

# Run a Mockito Test Method

Example:

```java
@Test
void shouldSendWelcomeEmail(){

}
```

Command:

```bash
docker run --rm unit-testing-demo mvn -Dtest=UserServiceTest#shouldSendWelcomeEmail test
```

---

# Keep JaCoCo Coverage Report After Docker Execution

Normally:

```bash
docker run --rm unit-testing-demo
```

removes the container and generated reports.

To keep the coverage report:

```bash
docker run --rm \
-v "$(pwd)/target:/workspace/target" \
unit-testing-demo \
mvn clean test
```

Coverage report location:

```
target/site/jacoco/index.html
```

---

# Common Maven Test Commands

## Run everything

```bash
mvn clean test
```

## Run one class

```bash
mvn -Dtest=ClassName test
```

## Run one method

```bash
mvn -Dtest=ClassName#methodName test
```

## Run multiple classes

```bash
mvn -Dtest=ClassOne,ClassTwo test
```

## Run pattern

```bash
mvn -Dtest=*Pattern test
```

---

# Docker Test Commands

## Run all tests

```bash
docker run --rm unit-testing-demo
```

## Run one class

```bash
docker run --rm unit-testing-demo mvn -Dtest=ClassName test
```

## Run one method

```bash
docker run --rm unit-testing-demo mvn -Dtest=ClassName#methodName test
```

---

# Test Execution Flow

```
Docker Container
        |
        |
        v
Maven
        |
        |
        v
Compile Java Source
        |
        |
        v
Compile Test Source
        |
        |
        v
JUnit 5 Execution
        |
        |
        v
Mockito Verification
        |
        |
        v
JaCoCo Coverage Report
        |
        |
        v
BUILD SUCCESS
```