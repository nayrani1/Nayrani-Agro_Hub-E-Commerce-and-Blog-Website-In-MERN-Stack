# Nayrani Agro Hub - E-Commerce and Blog Website

## Description

Nayrani Agro Hub is a comprehensive E-Commerce and Blog platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to purchase agricultural products and read/write blogs related to agriculture.

## Features

- User authentication and authorization
- Product management (CRUD)
- Blog management (CRUD)
- Responsive UI
- Secure REST API
- Dashboard Management
- Sales Graph / Chart
- Agriculture Services

  
## Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/nayrani1/Nayrani-Agro_Hub-E-Commerce-and-Blog-Website-In-MERN-Stack.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Nayrani-Agro_Hub-E-Commerce-and-Blog-Website-In-MERN-Stack
    ```
3. Install dependencies for both backend and frontend:
    ```bash
    npm install
    cd FrontEnd
    npm install
    ```

## Usage

1. Run MongoDB server locally or connect to a remote MongoDB server.
2. Create a `.env` file in the root directory and add your environment variables:
    ```env
    NODE_ENV=development
    PORT=8080
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    
NODE_ENV= DEVELOPMENT

DB_ATLUS_URL= "add yours"
DB_LOCAL_URL= "mongodb://127.0.0.1:27017/AgroHub"

JWT_SECRET_KEY= 8J54NTEU54U02UR046JA238HR0EWKY6VY5FD98353 
JWT_EXPIRE_TIME= 21d
COOKIE_EXPIRE_TIME= 7

UI_HOST_NAME= http://localhost:3000

# nodemailer
SMTP_HOST = "smtp.add yous.io"
SMTP_PORT = add yous
AUTH_USERNAME = 'add yours'
AUTH_PASSWORD = 'add yous'
FROM_EMAIL = 'mr.nayrani@gmail.com'
FROM_NAME = 'Nayrani Agro Hub'

#cloudinary

CLOUDINARY_CLOUD_NAME = add yours
CLOUDINARY_API_KEY = add yours
CLOUDINARY_API_SECRET = add yours

# strip veriables

STRIPE_API_KEY = 'your stripe publishable key'
STRIPE_SECRET_KEY = 'your stripe secret key'
    ```
3. Start the development server:
    ```bash
    npm run prod
    or
    npm run dev

    ```
4. Open your browser and go to `http://localhost:3000`.



## Configuration

- **MongoDB URI**: Update the `MONGO_URI` in your `.env` file with your MongoDB connection string.
- **JWT Secret**: Set the `JWT_SECRET` in your `.env` file for token encryption.
- **Frontend**: Update the API endpoint in your frontend configuration if necessary.

## Testing

Run the following command to execute tests:
```bash
npm test
