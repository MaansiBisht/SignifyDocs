# SignifyDocs Application

This project is a document management system where users can create, submit, and manage documents. Admins have the ability to approve or reject submitted documents. The application is built with a modern tech stack, including React.js, Tailwind CSS, Node.js, Express.js, Firebase Authentication, and MongoDB. 

## Core Features

### 1. User Authentication:
- **Login and Registration:** Implemented using **Firebase Authentication**.
- **Role-based Access:**
  - **Admin:** Can manage user roles and approve/reject submitted documents.
  - **User:** Can create and submit documents.

### 2. Dynamic Document Creation:
- **Form.io** is used to allow users to create custom documents.
- Fields include:
  - **Text Input:** (e.g., Title, Description)
  - **Dropdowns/Checklists** for structured data.
  - **Digital Signature Fields** for document finalization.

### 3. Document Submission and Approval:
- After document creation, users can sign and submit it for approval.
- Admins can:
  - View submitted documents.
  - Approve or reject documents.
  - **Document Statuses:** Pending, Approved, Rejected.
- All status changes are stored in the database.

### 4. Dashboard:
- **For Admins:**
  - View submitted documents that are pending approval.
  - Admin action panel to approve or reject documents.
  
- **For Users:**
  - Display a list of their created and submitted documents along with current statuses.

##  Implemented Bonus Features

### 1. Mobile Responsiveness:
- The application is mobile-friendly, ensuring a smooth user experience across devices.

## Tech Stack

### 1. Frontend:
- **React.js** for building the user interface.
- **Tailwind CSS** for styling.
- **Form.io** (Free tier available) for creating dynamic forms and document creation.

### 2. Backend:
- **Node.js** with **Express.js** to handle API requests.
- **MongoDB** (Free tier via MongoDB Atlas) for storing user data, documents, and statuses.

### 3. Authentication:
- **Firebase Authentication** for managing user authentication.

### 4. Deployment:
- **Vercel** for deploying both frontend and backend.

## Setup Instructions

### Prerequisites:
- Node.js and npm installed on your system.
- MongoDB Atlas account for the database.
- Firebase account for user authentication.

### 1. Clone the repository:
```bash
git clone https://github.com/MaansiBisht/SignifyDocs.git
cd SignifyDocs
npm install //install frontend dependencies
```
### 2. Setup Firebase in firebase.js and setup your .env files
```bash
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
```
### 3. Run frontend using
  ```bash
    npm start
  ```
## Backend Setup 
  ```bash
      cd backend
      npm install
      touch .env
  ```
### setup your .env and firebaseServiceAccount.json
```
  PORT=5000
  MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
  FIREBASE_ADMIN_SDK=./firebaseServiceAccount.json
```
create firebaseServiceAccount.json
``` bash
  const serviceAccount = {
   type: process.env.FIREBASE_TYPE,
   project_id: process.env.FIREBASE_PROJECT_ID,
   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
   private_key: process.env.FIREBASE_PRIVATE_KEY,
   client_email: process.env.FIREBASE_CLIENT_EMAIL,
   client_id: process.env.FIREBASE_CLIENT_ID,
   auth_uri: process.env.FIREBASE_AUTH_URI,
   token_uri: process.env.FIREBASE_TOKEN_URI,
   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
 };
```
### start backend 
```bash
  node server.js
```



