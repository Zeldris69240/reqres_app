# User Management System

This project is a **User Management System** built with **React, TypeScript, and Axios**, featuring authentication, user listing with pagination, search & filtering, and CRUD operations (Edit, Delete, and Update). The project is hosted on **Netlify**.

## 🚀 Live Demo
🔗 **[Deployed App](https://67e6f0009c3eb71c889306c3--joyful-blini-b6bd3b.netlify.app/)**

---

## 📌 Features
- **Login Authentication** (Uses `https://reqres.in` for demo login API)
- **User List with Pagination** (Fetched from `https://reqres.in/api/users`)
- **Edit, Delete, and Update Users**
- **Client-side Search and Filtering**
- **React Router for Navigation**
- **Beautiful UI with Styled Components**

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Zeldris69240/user-management-system.git
cd user-management-system
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Development Server
```sh
npm start
```
🔹 Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 API Endpoints Used

| Action       | Endpoint                  | Method |
|-------------|--------------------------|--------|
| Login       | `/api/login`              | `POST` |
| Fetch Users | `/api/users?page=1`       | `GET`  |
| Update User | `/api/users/{id}`         | `PUT`  |
| Delete User | `/api/users/{id}`         | `DELETE` |

**API Used:** [Reqres.in](https://reqres.in) (Fake API for testing purposes)

---

## 🚀 Deploying to Netlify
1. **Install Netlify CLI** (if not installed)
   ```sh
   npm install -g netlify-cli
   ```
2. **Login to Netlify**
   ```sh
   netlify login
   ```
3. **Deploy the App**
   ```sh
   netlify deploy --prod
   ```
4. **Get the Live Link** (from the Netlify dashboard)

---

## 🎯 Assumptions & Considerations
- This project **uses a mock API (`reqres.in`)**, so user data resets every request.
- No actual authentication; the login API returns a fake token.
- **Pagination is hardcoded** to fetch only the first page.
- **Deleting a user removes them from the UI only** (since the API is not persistent).
- Hosted on **Netlify** (can be deployed to **Vercel/Heroku** as well).

---

## 📜 License
This project is open-source and available under the **MIT License**.

📌 _Made with ❤️ by [Ricky Oinam]_
