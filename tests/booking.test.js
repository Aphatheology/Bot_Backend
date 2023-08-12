require('dotenv').config();

const fs = require('fs').promises;
const server = require('../server');
const request = require('supertest');
const flightData = require('../src/flights/flight.data');

jest.mock('fs', () => ({
    promises: {
        writeFile: jest.fn(),
    },
}));

describe('POST /booking', () => {
    afterAll(async () => {
        if (server) {
            server.close();
        }
    });

    beforeEach(() => {
        fs.writeFile.mockClear();
    });

    it('should create a booking', async () => {
        const mockFlight = flightData[0];
        const mockReqBody = {
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            mobileNumber: '1234567890',
        };

        const result = await request(server)
            .post(`/booking/${mockFlight.code}`)
            .send(mockReqBody)
            .expect(201);

        expect(result.body.email).toBe(mockReqBody.email);
        expect(result.body.flight).toBe(mockFlight.code);
        expect(result.body.status).toBe('UNPAID');
        expect(result.body.amount).toBe(mockFlight.price);
    });
});
