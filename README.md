<pre>
# 📝 MERN To-Do App

A full-stack To-Do List application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. It allows users to **create**, **read**, **update**, and **delete** tasks with a clean and modern UI.

---

## 🔧 Features

- ✅ Add new tasks
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Toggle task status (Pending / Completed)
- ✅ Responsive and interactive UI with Framer Motion animations
- ✅ Toast notifications for user feedback

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Lucide Icons
- Framer Motion
- React Hot Toast

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📁 Project Structure

```bash
├── backend/ # Express.js backend
│ ├── controllers/ # Controller logic for API
│ ├── database/ # MongoDB connection setup
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes
│ └── index.js # Backend entry point
│
├── frontend/ # React frontend (Vite)
│ ├── public/ # Public assets
│ ├── src/ # Source files (components, pages)
│ │ ├── components/ # Reusable UI components
│ │ └── App.jsx # Main app
│ └── index.html
│
├── .env # Environment variables
├── package.json # Root-level dependencies

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/xxemat20xx/CRUD-Mern.git

cd CRUD-Mern

Create a .env file in the root folder:
PORT=3000
MONGO_URI=your_mongodb_connection_string

on the root file:
npm run start

Install the Frontend Dependencies:
cd .\frontend
npm install
npm run dev
</pre>