require('dotenv').config();

const request = require('supertest');
const server = require('../server');

describe('GET /flight/available-flights', () => {
    it('should return available flights matching query', async () => {
        const query = {
            departure: 'Lagos',
            destination: 'Abuja',
            date: '2023-08-18',
        };

        const response = await request(server)
            .get('/flight/get-available-flights')
            .query(query)
            .expect(200);

        const expected = [
            {
                departure: 'Lagos',
                destination: 'Abuja',
                date: '2023-08-18T08:00:00.000Z',
                price: 25000,
                code: 'ABC123',
            },
            {
                departure: 'Lagos',
                destination: 'Abuja',
                date: '2023-08-18T10:30:00.000Z',
                price: 28000,
                code: 'DEF456',
            },
        ];

        expect(response.body.length).toBeGreaterThan(1);
        expect(response.body).toEqual(expected);
    });

    it('should return proper error when departure is missing', async () => {
        const query = {
            destination: 'Abuja',
            date: '2023-08-18',
        };

        const response = await request(server)
            .get('/flight/get-available-flights')
            .query(query)
            .expect(400);

        const expectedErrorMessage = '"departure" is required';
        expect(response.body.message).toEqual(expectedErrorMessage);
    });

    it('should return proper error when destination is missing', async () => {
        const query = {
            departure: 'Lagos',
            date: '2023-08-18',
        };

        const response = await request(server)
            .get('/flight/get-available-flights')
            .query(query)
            .expect(400);

        const expectedErrorMessage = '"destination" is required';
        expect(response.body.message).toEqual(expectedErrorMessage);
    });

    it('should return proper error when date is missing', async () => {
        const query = {
            departure: 'Lagos',
            destination: 'Abuja',
        };

        const response = await request(server)
            .get('/flight/get-available-flights')
            .query(query)
            .expect(400);

        const expectedErrorMessage = '"date" is required';
        expect(response.body.message).toEqual(expectedErrorMessage);
    });

    it('should return proper error when date format is wrong', async () => {
        const query = {
            departure: 'Lagos',
            destination: 'Abuja',
            date: '2023/08/12',
        };

        const response = await request(server)
            .get('/flight/get-available-flights')
            .query(query)
            .expect(400);

        const expectedErrorMessage =
            'Date must be in the format yyyy-mm-dd, e.g. 2023-08-20';
        expect(response.body.message).toEqual(expectedErrorMessage);
    });

    it('should return proper error when date is less than today', async () => {
        const query = {
            departure: 'Lagos',
            destination: 'Abuja',
            date: '2023-08-11',
        };

        const response = await request(server)
            .get('/flight/get-available-flights')
            .query(query)
            .expect(400);

        const expectedErrorMessage = "Date can't be less than today";
        expect(response.body.message).toEqual(expectedErrorMessage);
    });
});
