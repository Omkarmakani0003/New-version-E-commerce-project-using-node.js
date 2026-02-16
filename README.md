
# 🛒 E-Commerce Web Application  

A full-featured E-Commerce web application built using **Node.js, Express.js & MongoDB** following the **MVC architecture pattern**.

This project demonstrates secure authentication, advanced product filtering, cart & order management, and a complete multi-step checkout system.

---

## 🚀 Tech Stack  

### 🖥 Backend  
<p align="left">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" />
</p>

### 🎨 Frontend  
<p align="left">
  <img src="https://skillicons.dev/icons?i=html,css,javascript,bootstrap" />
</p>

### 🗄 Template Engine  
- EJS  

### ☁️ Third-Party Integrations  
<p align="left">
  <!-- Cloudinary Official Logo -->
  <img src="https://cdn.simpleicons.org/cloudinary/3448C5" height="50" alt="Cloudinary"/>

  <!-- Brevo Logo -->
  <img src="https://cdn.simpleicons.org/brevo/00AEEF" height="50" alt="Brevo"/>
  
  <!-- Razorpay -->
  <img src="https://cdn.simpleicons.org/razorpay/0C2451" height="50" alt="Razorpay"/>
  
  <!-- NPM -->
  <img src="https://skillicons.dev/icons?i=npm" height="50" />
</p>

- 📧 Brevo Mail Service  
- 🔐 JWT Authentication  

---

## ✨ Core Features  

### 🔐 Authentication & Authorization
- JWT-based secure authentication  
- Role-Based Access Control (Admin/User)  
- Protected routes & middleware validation  

### 🔎 Product System
- Search functionality  
- Category & Sub-category filters  
- Pagination  
- Variant-based product purchase (Size/Color options)  

### 🛒 Cart Management
- Add to cart  
- Update quantity  
- Remove items  
- Persistent cart handling  

### 📦 Order Management
- Place order  
- Order history  
- Admin order control panel  

### 💳 Multi-Step Checkout Flow
- Address selection  
- Order summary  
- Final confirmation  

### 🖼 Image Upload
- Cloud-based product image storage using Cloudinary  

### 📧 Email System
- Order confirmation emails via Brevo  

### 💳 Payment Integration
- Secure online payments using Razorpay
- Order verification after successful payment
- Payment failure handling

---

## 🏗 Architecture  

This project follows **MVC Architecture** for clean and scalable code structure:

- Models → Database Schemas  
- Views → EJS Templates  
- Controllers → Business Logic  
- Routes → Application Routing  

---

## 🌐 Live Demo  

🔗 **Live Application:**  
👉 https://e-commerce-project-using-node-js-new.onrender.com/

---

## 🧪 Test Credentials  

### 👤 User Login  
Email: test@gmail.com  
Password: 123 

---

## ⚙️ Environment Variables  

Create a `.env` file and configure:
<pre>
  PORT = 
  DBURI = 
  JWTSECRET = 
  CLOUDINARY_NAME = 
  CLOUDINARY_API = 
  CLOUDINARY_SECRET_KEY =
  RAZORPAY_KEY_ID = 
  RAZORPAY_KEY_SECRET = 
  BREVO_API_KEY =
</pre>

## ⚙️ Install Dependencies

npm install

## ⚙️ Run the Application

npm run dev

