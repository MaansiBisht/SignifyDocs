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

