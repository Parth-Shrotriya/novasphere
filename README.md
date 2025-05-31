# 🌐 Novasphere

A modern full-stack web application built with **React (Vite)** for the frontend and **Node.js + Express** for the backend, designed to manage event registration, user access, and real-time features.

---

## 📁 Project Structure

```
novasphere/
├── client/       # React frontend (Vite)
├── server/       # Express backend (Node.js)
```

---

## 🚀 Tech Stack

### Frontend:
- React.js (with Vite)
- Context API for state management
- Tailwind CSS or custom CSS
- React Router

### Backend:
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT Authentication
- Role-based Access Control

---

## 🧪 Features

- 🔐 User Signup/Login with JWT
- 🧾 Role-based Dashboard (Admin/User)
- 🗕️ Event Registration & Listings
- 🔍 Search & Filter Events
- 🔒 Protected Routes
- ✅ Responsive UI
- 🌍 API Routing with Controllers

---

## 🔧 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/Parth-Shrotriya/novasphere.git
cd novasphere
```

---

### 2. Setup Backend (`server/`)

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:
```bash
npm start
```

---

### 3. Setup Frontend (`client/`)

```bash
cd ../client
npm install
npm run dev
```

For production build:
```bash
npm run build
```

---

## 🌐 Deployment Ready

Once built (`npm run build` in client), the static files in `client/dist` can be served via Nginx, Express, or any static file server.

---

## 📂 Important Notes

- `.env` files are **ignored** by Git for security
- Make sure MongoDB is running locally or via a cloud URI
- CORS and token protection are handled in middleware

---

## 🙏 Acknowledgements

Made with 💻 by [Parth Shrotriya](https://github.com/Parth-Shrotriya)

---

## 📜 License

This project is licensed under [MIT](LICENSE)
