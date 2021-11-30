'use strict';

process.env.SECRET = 'secret';

const supertest = require('supertest');
const { server } = require('../src/server');
const { db } = require('../src/model/index');
const mockRequest = supertest(server);

let users = {
    manager: { username: 'manager', password: 'password', role: 'manager', lastname: "saber" },
    employee: { username: 'employee', password: 'password', role: 'employee', lastname: "saber" },
    client: { username: 'client', password: 'password', role: 'client', lastname: "saber" },
};

beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});


Object.keys(users).forEach(userType => {
    describe(`${userType} users`, () => {
        it('create user', async () => {
            const response = await mockRequest.post('/signup').send(users[userType]);
            const userObject = response.body;
            expect(response.status).toBe(201);
            expect(userObject.token).toBeDefined();
            expect(userObject.user.username).toEqual(users[userType].username);
            expect(userObject.user.role).toEqual(users[userType].role);
        });

        it('signin basic auth', async () => {
            const response = await mockRequest.post('/sign-in').auth(users[userType].username, users[userType].password);
            const userObject = response.body;
            expect(response.status).toBe(200);
            expect(userObject.token).toBeDefined();
            expect(userObject.username).toEqual(users[userType].username);
            expect(userObject.role).toEqual(users[userType].role);
        });
        if (userType === 'manager') {
            it('signin bearer auth', async () => {
                const response = await mockRequest.post('/sign-in').auth(users[userType].username, users[userType].password);
                const token = response.body.token;
                const bearerResponse = await mockRequest.get('/users').set('Authorization', `Bearer ${token}`)
                expect(bearerResponse.status).toBe(200);
            });
        }

    });
});

describe('login errors', () => {
    it('signin in incorrect password', async () => {
        const response = await mockRequest.post('/sign-in').auth('manager', 'xyz')
        const userObject = response.body;
        expect(response.status).toBe(500);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();
    });

    it('signin in with invalid user', async () => {
        const response = await mockRequest.post('/sign-in').auth('nobody', 'xyz')
        const userObject = response.body;
        expect(response.status).toBe(500);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined();
    });

    it('bearer invalid token', async () => {
        const bearerResponse = await mockRequest.get('/users').set('Authorization', 'Bearer foobar');
        expect(bearerResponse.status).not.toBe(200);
    });
});