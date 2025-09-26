# 🏢 ApnrGhor – Building Management System  

A full-stack **Building Management System (BMS)** designed for managing a single building with role-based dashboards for **users, members, and admins**. The system provides apartment listings, agreement requests, payments with coupons, and admin-controlled announcements, all wrapped in a modern, responsive design.  

🔗 **Live Site:** [ApnrGhor](https://apnr-ghor.vercel.app/)  
📂 **Client Repository:** [ApnrGhor Client](https://github.com/j-ami-l/ApnrGhor) 

---

## ✨ Key Features  

### 🌐 Public (Unauthenticated)  
- Modern **Home Page** with banner slider, building details, coupons, and location/map section.  
- Apartment listing page with:  
  - Image, floor no, block, apartment no, and rent.  
  - Pagination (6 per page).  
  - Search functionality (by rent range).  
- Fully responsive UI for **mobile, tablet, and desktop**.  

### 🔑 Authentication  
- Email & password-based login/register.  
- Google/GitHub social login (one required).  
- Password validation:  
  - At least 1 uppercase, 1 lowercase, and minimum 6 characters.  
- Secure login/register with toast/sweet alert feedback.  

### 👤 User Dashboard  
- View profile (name, email, image, rented apartment info = `none`).  
- View announcements.  

### 🏠 Member Dashboard  
- View profile (with rented apartment info).  
- **Make Payment** form (apartment info prefilled).  
- Coupon system (apply discount on rent).  
- Payment history (table view).  
- View announcements.  

### 👨‍💼 Admin Dashboard  
- Manage Members (remove member → revert to user).  
- Make Announcements (title + description).  
- Agreement Requests (accept/reject with role updates).  
- Manage Coupons (add/update availability).  
- Admin Profile analytics:  
  - Total rooms  
  - % available/unavailable rooms  
  - No. of users & members  

### ⚙️ Tech & Security  
- **TanStack Query** for all GET requests.  
- Firebase Authentication with environment variables.  
- MongoDB with secured environment variables.  
- Private routes secured with **JWT / Firebase Admin SDK middleware**.  
- Deployed with no CORS/404/504 issues.  

---

## 📸 Screens & Pages  
- ✅ Home Page (banner, building details, coupons, location, footer)  
- ✅ Authentication (Login/Register)  
- ✅ Apartments (with pagination + search)  
- ✅ Dashboards: User, Member, Admin  
- ✅ Admin CRUD features (members, coupons, announcements, agreements)  
- ✅ Responsive Design  

---

## 📦 Packages Used  

### Client Side  
- `react`  
- `react-router-dom`  
- `@tanstack/react-query`  
- `firebase`  
- `axios`  
- `sweetalert2` / `react-toastify`  
- `tailwindcss`  
- `daisyui` / `shadcn/ui`  
- `framer-motion` (animations)  

### Server Side  
- `express`  
- `cors`  
- `dotenv`  
- `jsonwebtoken`  
- `mongodb`  
- `firebase-admin`  

---

## 🚀 Deployment  
- Frontend: **Vercel**  
- Backend: (Add deployment link here, e.g., Render/Heroku/Vercel/ Railway)  

---

## 📝 Submission Info  

- **Admin Email:** (Add here)  
- **Admin Password:** (Add here)  
- **Frontend Live Site:** [ApnrGhor](https://apnr-ghor.vercel.app/)  
- **Client Repo:** [ApnrGhor Client](https://github.com/j-ami-l/ApnrGhor)  
- **Server Repo:** (Add here)  

---

## 👨‍💻 Developer Notes  
This project is built to demonstrate full-stack skills with authentication, role-based authorization, state management, and database-driven CRUD operations. It is optimized for recruiter-friendly UI/UX with **clean design, proper spacing, and color contrast**.  

