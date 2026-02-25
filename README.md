# Ashmita Software Solutions Portal

A premium, role-based management portal for software companies. This application allows Admins to manage employees, clients, and services; Clients to request services and track projects; and Employees to manage their assigned tasks and communicate across roles.

## 🚀 Features

- **Role-Based Access Control (RBAC)**: secure portals for Admin, Employee, and Client.
- **Service Management**: Admin can create and manage service offerings.
- **Project Tracking**: Lifecycle management from service request to project completion.
- **Real-time Messaging**: Multi-user chat system for collaborative communication.
- **Premium UI**: Modern dark-themed interface with glassmorphism and responsive design.

---

## 🛠 Tech Stack

### Frontend
- **React 18** (Vite)
- **TypeScript**
- **Vanilla CSS** (Custom Design System)
- **Lucide React** (Icons)
- **Axios** (API Client)

### Backend
- **Node.js** & **Express**
- **TypeScript**
- **MongoDB** (Mongoose ODM)
- **JWT** (Authentication)
- **Bcryptjs** (Password Hashing)

---

## 📦 Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 1. Database Setup
Ensure you have a MongoDB instance running. Create a `.env` file in the `server` directory and add your connection string.

### 2. Backend Installation
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@ashmita.com
ADMIN_PASSWORD=admin123
```

**Seed Initial Admin:**
```bash
npx ts-node src/seedAdmin.ts
```

**Start Server:**
```bash
npm run dev
```

### 3. Frontend Installation
```bash
cd client
npm install
npm run dev
```

---

## 🔑 Test Login Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@ashmita.com` | `admin123` |
| **Employee** | *Create via Admin Portal* | *Self-set* | `emp1@gmail.com`| `admin123`
| **Client** | *Create via Admin Portal* | *Self-set* | `client1@gmail.com` | `admin123`

---


Developed with ❤️ by Ashmita Software Solutions.
