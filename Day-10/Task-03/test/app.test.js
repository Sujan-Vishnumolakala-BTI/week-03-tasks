const request = require("supertest");

const app = require("../src/app");


test("Application health check", async () => {


    const response = await request(app).get("/");


    expect(response.statusCode).toBe(200);


});