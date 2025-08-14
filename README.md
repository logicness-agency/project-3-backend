# tinqs — Backend (Express API)

## Description
This is the **backend** of the tinqs MERN app.  
It’s built with Express and MongoDB (Mongoose).  
It provides the API used by the React frontend.

The frontend repository can be found here:  
https://github.com/logicness-agency/project-3-frontend

## How to run this project locally

### 1. Clone this repo
```bash
git clone https://github.com/logicness-agency/project-3-backend.git
cd project-3-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a file called **`.env`** in the root of the backend folder.  
Add the following :

```
PORT=5005
ORIGIN=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/backend
TOKEN_SECRET=some_secret_string
```
### 4. Start the server
For development:
```bash
npm run dev
```
For production:
```bash
npm start
```

By default, the API will be available at:  
http://localhost:5005/api

