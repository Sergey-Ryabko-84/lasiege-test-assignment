# Simple Online Store

This project is a simple online store, consisting of:

1. **Frontend** – built with vanilla JavaScript, which is hosted on [Netlify](https://test-online-store.netlify.app/).
2. **Backend** – a REST API built with Node.js and Express, which is hosted on [Render](https://lasiege-test-assignment.onrender.com).

## Setup Instructions

### Prerequisites

- Ensure you have Node.js and npm installed.

### Local Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Sergey-Ryabko-84/lasiege-test-assignment
   cd root/frontend
   ```

### Backend Setup

1. Navigate to the `backend` directory.
2. Create a `.env` file based on the provided `.env-example` file, filling in any required environment variables.
3. Install dependencies and start the server:
   ```bash
   npm install
   npm start
   ```
4. The server should now be running and accessible at the host and port specified in the .env configuration.

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Create a `.env` file based on the provided `.env-example` file. Ensure it includes the `API_BASE_URL`, pointing to the backend server (e.g., `https://lasiege-test-assignment.onrender.com/api`).
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   npm start
5. Access the frontend locally at http://localhost:8080 or the specified port in your configuration.

### Environment Variables

1. **Backend .env File:**
   The backend requires certain environment variables to connect to services. See .env.example in the backend folder for the required variables.
2. **Frontend .env File:**
   The frontend requires environment variables as well. See .env.example in the frontend folder for the required variables, including API_BASE_URL to specify the backend API endpoint.

## Live Site

The live site is available at: [https://test-online-store.netlify.app/](https://test-online-store.netlify.app/)

**Note:** The API server may take some time to wake up on the first request. Please wait a minute if you encounter a delay when accessing the site for the first time.
