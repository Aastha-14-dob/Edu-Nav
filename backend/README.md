# Edu-Nav Backend

Overview
This is the backend service for **Edu-Nav**, an education navigation platform.  
It provides APIs for authentication, user management, and course navigation features, connecting with MongoDB for data persistence.


Features
- User registration & login with JWT authentication  
- RESTful APIs for frontend integration  
- MongoDB models for users, courses, and navigation data  
- Error handling & middleware support  

Tech Stack
- Runtime: Node.js  
- Framework: Express.js  
- Database: MongoDB with Mongoose ODM  
- Authentication: JWT  
- Environment Management: dotenv  

Installation

Clone the repository and install dependencies:

bash
git clone https://github.com/Aastha-14-dob/Edu-Nav.git
cd Edu-Nav/backend
npm install

Configuration

Create a .env file in the backend directory:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Running the Server

For development: (bash)
npm run dev

For production: (bash)
npm start

Server will run at:
http://localhost:5000/
