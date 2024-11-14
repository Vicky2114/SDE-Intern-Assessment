
# Car Management Application

This is a Car Management Application that allows users to manage cars, including features for creating, viewing, updating, and deleting cars. It integrates Cloudinary for image storage, JWT for authentication, and MongoDB for data persistence.

## **Tech Stack**

- **Frontend**: React.js, Material UI, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (hosted on MongoDB Atlas)
- **Authentication**: JWT (JSON Web Token)
- **Image Storage**: Cloudinary
- **Deployment**: 
  - Backend deployed on **Azure Web Services**
  - Frontend deployed on **Vercel**

## **Features**

- **User Authentication** (Sign up/Login with JWT)
- **Car Management** (Create, View, Update, Delete cars)
- **Image Storage** (Up to 10 images per car, stored in Cloudinary)
- **Search Functionality** (Global search by title, description, tags)
- **Pagination** (For viewing car listings)
- **Protected Routes** (Secured APIs using JWT and middleware)

---

## **Installation Guide**

Follow these steps to set up the Car Management Application locally:

### 1. **Clone the Repository**

```bash
git clone https://github.com/Vicky2114/SDE-Intern-Assessment
cd SDE-Intern-Assessment

```

### 2. **Frontend Setup (React.js)**

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

### 3. **Backend Setup (Node.js, Express)**

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 4. **Environment Variables Setup**

Create a `.env` file in the root of the `backend` directory and add the following credentials:

```env
# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# JWT Secret
JWT_SECRET=your-jwt-secret

# MongoDB URI
MONGO_URI=mongodb://localhost:27017/carMangment

# Server Port
PORT=8080
```

Replace the values with your actual credentials:
- **Cloudinary Credentials**: Sign up at [Cloudinary](https://cloudinary.com) and get your credentials.
- **JWT Secret**: Choose a strong secret key for JWT authentication.
- **MongoDB URI**: If you're using a local MongoDB setup, ensure MongoDB is running locally. For cloud-based MongoDB, use your Atlas URI.
  
### 5. **Run the Backend**

After setting up the `.env` file, start the backend server:

```bash
cd backend
nodemon index.js
```

This will start the backend server on port `8080`.

### 6. **Run the Frontend**

Navigate to the frontend directory and start the React app:

```bash
cd frontend
npm start
```

This will start the frontend React app and it will be accessible at `http://localhost:3000`.

---

## **API Documentation**

The backend is documented using **Swagger UI**. After starting the backend, you can access the documentation at:

```
http://localhost:8080/api/docs
```

---

## **Authentication Flow**

### **Sign Up**

1. Navigate to the **Sign Up** page in the frontend.
2. Enter a **username**, **email**, and **password**.
3. Upon successful registration, the user will be redirected to the **Login** page.

### **Login**

1. Navigate to the **Login** page.
2. Enter **email** and **password**.
3. Upon successful login, a **JWT token** is generated and stored in **localStorage**.
4. The user will be redirected to the **Product List Page**.

---

## **Protected Routes**

The routes in the application are protected using JWT authentication.
- After login, the **JWT token** is stored in **localStorage** and included in the headers for any requests that require authentication.
- If the token is missing or invalid, the user will be redirected to the **Login** page.

---

## **Frontend Pages**

- **Sign Up / Login Page**: Allows users to sign up and log in using their credentials.
- **Product List Page**: Displays a list of cars the user has created, with a search bar and pagination.
- **Product Creation Page**: Allows users to create new car listings with images, title, and description.
- **Product Detail Page**: Displays detailed information about a car, with options to update or delete.

---

## **Additional Information**

- **Pagination** is used on the product list to handle large numbers of car listings efficiently.
- **Cloudinary** is used to store car images securely, preventing local file storage on the server.
- The backend uses **Joi** validation to ensure secure and robust form data handling.

---

## **Deployment**

- **Frontend** is deployed on **Vercel**.
- **Backend** is deployed on **Azure Web Services**.
  
To deploy the project, refer to the respective deployment platform documentation for both frontend and backend.

---

## **Contributing**

If you would like to contribute to this project, please fork the repository, create a new branch, and submit a pull request. Ensure that you follow the standard coding conventions and write tests for new features.

---

### **Support**

If you face any issues or need further clarification, feel free to open an issue on the GitHub repository or reach out to the project maintainer.
