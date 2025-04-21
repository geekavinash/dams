# 🩺 Doctor Appointment Management System (DAMS)

A full-stack web application that enables patients to book appointments with doctors, doctors to manage their schedules, and administrators to oversee the entire healthcare workflow. DAMS offers a secure, scalable, and user-friendly interface for managing healthcare appointments efficiently.

---

## 📌 Features

### 🔐 Authentication & Authorization
- Secure login and registration using **JWT**
- Role-based access for **Patient**, **Doctor**, and **Admin**

### 👥 Patient Module
- Register and login securely
- Browse and search for doctors by specialization
- Book, view, or cancel appointments
- Manage profile and view notifications

### 🩺 Doctor Module
- View and manage scheduled appointments
- Update consultation status
- Set availability and edit profile
- Receive notifications for new bookings

### 🧑‍💼 Admin Module
- View all users and doctors
- Approve or reject doctor applications
- View system-wide appointments
- Manage doctor profiles and patient lists

---

## 🛠️ Tech Stack

| Layer       | Technology                   |
|-------------|-------------------------------|
| Frontend    | ReactJS, Redux Toolkit, Ant Design |
| Backend     | Node.js, Express.js           |
| Database    | MongoDB with Mongoose         |
| Auth        | JSON Web Tokens (JWT)         |
| Styling     | CSS, AntD, Lottie             |
| Tools       | Postman, Git, Vite, Dotenv    |

---

## 🗂️ Project Structure

```bash
project-root/
├── api/               # Backend API (Node.js + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── server.js
├── src/               # Frontend (React)
│   ├── pages/
│   ├── components/
│   ├── redux/
│   ├── axios/
│   └── App.tsx
├── public/
├── .env
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dams.git
cd dams
```

### 2. Install Dependencies

```bash
# For frontend
cd src
npm install

# For backend
cd ../api
npm install
```

### 3. Environment Variables

Create a `.env` file in the `/api` folder with the following variables:

```env
PORT=8080
MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/dams
JWT_SECRET=your_secret_key
```

### 4. Start the Application

```bash
# Start backend
cd api
npm start

# Start frontend (in separate terminal)
cd src
npm run dev
```

---

## 🚀 Future Enhancements

- Integration with telemedicine for virtual consultations
- E-prescription handling and pharmacy APIs
- AI-driven doctor suggestions
- Health record management
- Multi-clinic and hospital support

---

## 📸 Screenshots

> Include images of:
> - Login/Register Pages
> - Patient Booking Flow
> - Doctor Dashboard
> - Admin Panel

---

## 📃 License

This project is open-source and free to use for academic or non-commercial purposes.

---

## 🙋‍♂️ Author

**Avinash Kumar**  
[GitHub](https://github.com/geekavinash)
