# Bot Backend

A Backend API to serve the required services of a Frontend Booking App Bot

The main functionalities of the backend application should include:
1. Retrieving available flights based on the user's input (departure city, destination city, and date).
2. Presenting the user with a list of available flight options.
3. Handling user selection of a specific flight and confirming the booking.
4. Storing the booking information in a mock database or a data file.
5. Integrating with a mock payment system for booking confirmation (no actual payment processing required).
6. Providing appropriate error handling for invalid inputs or unexpected scenarios.

## Built With
- Node
- Express
- MongoDB
- Mongoose
- Paystack


## Quick Start

Clone the repo:

```bash
git clone https://github.com/Aphatheology/Bot_Backend.git
cd Bot_Backend
```

Install the dependencies:

```bash
yarn install
# Or npm install if you are using npm
```

Set the environment variables:

```bash
cp .envExample .env

# open .env and modify the environment variables 
```

To run the project:

```bash
yarn run dev
# will run the server with nodemon

yarn run start
# will run the server with node
```

Thanks