const request = require('supertest');
const server = require('../api/server');
const db = require("../database/dbConfig");

let overRes = {}

describe('testing setup', () => {
  it("should be using a testing db", () => {
    expect(process.env.DB_ENV).toBe('testing')
  })
  
})

describe('auth-router', () => {
  beforeAll(async () => {
    await db('users').truncate();
  })
  it('POST /register added a new user to db and aquire token', async () => {
    const user = {username: "testUser", password: "12345"}
    const res = await request(server).post("/api/auth/register").send(user)
    expect(res.body.token).toBeTruthy();
    expect(res.body.message).toBe("Welcome testUser")
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application/json")
  })
  it('POST /login can login and aquire token', async () => {
    const user = {username: "testUser", password: "12345"}
    let res = await request(server).post('/api/auth/login').send(user)
    overRes = res
    expect(res.body.token).toBeTruthy();
    expect(res.body.message).toBe("Logged in")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
  })
  it('GET /api/jokes allows the token to access restrected routes.', async () => {
    const res = await request(server).get('/api/jokes').set("Authorization", overRes.body.token)
    expect(res.body).toHaveLength(20)
    expect(res.body).toBeDefined();
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
  })
})

