# 💰 AI-Powered Expense Tracker

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)

---

## 📌 Overview

An **AI-powered full-stack Expense Tracker web application** built using **Java, Spring Boot, React.js, and PostgreSQL**, following **RESTful architecture**.  
The application enables users to securely manage expenses while receiving real-time guidance via an integrated AI chatbot.

---

## 🚀 Features

- 🔐 Secure authentication and authorization using **JWT**
- 🧾 Complete **CRUD operations** for expense management
- 📊 Track income and expenses
- 🤖 AI chatbot integration using **Groq API**
- 📧 Email notifications using **Brevo API**
- ⚡ Responsive UI built with **React.js & Tailwind CSS**
- 🧪 REST API testing and validation using **Postman**

---

## 🛠️ Tech Stack

### Backend
- Java
- Spring Boot
- JPA / Hibernate
- PostgreSQL
- JWT Authentication

### Frontend
- React.js
- Tailwind CSS

### Tools & APIs
- Groq API (AI Assistant)
- Brevo API (Email Service)
- Postman (API Testing)

---

## 📂 Project Structure


expensetracker/
│
├── expensetracker/          # Spring Boot Backend
├── expensetrackerwebapp/    # React Frontend
└── README.md


⚙️ Setup & Installation


🔹 Backend Setup

Clone the repository:

git clone https://github.com/your-username/expense-tracker.git
Configure the database in application.properties

Run the backend:

.\mvnw spring-boot:run


🔹 Frontend Setup

Navigate to frontend folder:
cd expensetrackerwebapp

Install dependencies:
npm install


Start the frontend:
npm run dev


🔐 Environment Variables
Create a .env file and add:

env
Copy code
GROQ_API_KEY=your_groq_api_key
BREVO_API_KEY=your_brevo_api_key
JWT_SECRET=your_jwt_secret
🧪 API Testing
APIs tested using Postman

RESTful endpoints ensure clean and reliable data flow

👩‍💻 Author & Contact

Astha Mishra
📧 Email: asthamisracse@gmail.com
🔗 LinkedIn: www.linkedin.com/in/astha-mishra-8a7116299
