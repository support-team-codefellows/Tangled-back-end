'use strict';

const { server } = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);

describe('API Server Testing', () => {
    test('if theres a Home route', async () => {
        const response = await request.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Ohayō 🤗');
    });
    test('invalid URLS', async () => {
        const response = await request.get('/*');
        expect(response.status).toEqual(404);
    });
    test('/internal server 500', async () => {
        const response = await request.get('/users');
        expect(response.status).toEqual(500);
    });
});