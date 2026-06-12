# EstateHub – Real Estate Listing Manager

EstateHub is a modern, responsive **MERN Stack** real estate property listing management application built for college internships and project submissions. It features a clean, responsive user experience to browse housing details, search by location, filter by property type, and a dedicated admin portal to add and delete listings.

---

## 🚀 Features

### **1. Home Page (User Portal)**
- **Hero Banner**: High-quality project branding with premium styling and animations.
- **Search Functionality**: Search properties by location in real-time.
- **Filter Controls**: Filter properties dynamically by property type (Apartment, House, Villa, Condo, Townhouse, Land).
- **Responsive Property Grid**: Beautiful, premium listing cards exhibiting real estate image, title, location, type badge, price, and description.

### **2. Admin Dashboard**
- **Add Property Form**: A fully-validated form allowing admins to create new property listings (Title, Location, Price, Type, Image URL, Description).
- **Inventory Management**: A list displaying all active listings in the database with a deletion option.
- **Delete Property Functionality**: Instantly remove listing cards from both the admin dashboard and database.

---

## 🛠️ Technology Stack

- **Frontend**: React.js (built with Vite), CSS (modern CSS variables & custom responsive layouts), Lucide React (premium icons)
- **Backend**: Node.js, Express.js, CORS, Dotenv
- **Database**: MongoDB with Mongoose ODM

---

## 📂 Project Structure

```text
EstateHub/
├── client/                 # React frontend
│   ├── public/             # Static public assets
│   ├── src/
│   │   ├── components/     # Navbar, PropertyCard, PropertyForm
│   │   ├── pages/          # Home.jsx, AdminDashboard.jsx
│   │   ├── App.jsx         # App state manager & main view controller
│   │   ├── index.css       # Core design tokens and custom styles
│   │   └── main.jsx        # App entry point
│   ├── package.json
│   └── vite.config.js      # Vite configuration (with proxy to port 5000)
├── server/                 # Express backend
│   ├── config/             # Database connection helper
│   │   └── db.js
│   ├── models/             # Mongoose schemas
│   │   └── Property.js
│   ├── routes/             # REST API routes
│   │   └── propertyRoutes.js
│   ├── seed/               # Initial database seeder script
│   │   └── seed.js
│   ├── .env                # Local environment variables
│   ├── package.json
│   └── server.js           # Server startup script
└── README.md               # Quickstart and setup instructions
```

---

## ⚙️ Setup Instructions

### **Prerequisites**
- [Node.js](https://nodejs.org/) installed (v16.x or higher recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and running locally on port `27017` (or access to a MongoDB Atlas cluster)

---

### **1. Backend Server Configuration**

1. Open a terminal, navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. The dependencies are already configured in `package.json`. If you need to re-install:
   ```bash
   npm install
   ```
3. A default environment file `.env` has been created with:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/estatehub
   ```
4. **Seed the Database**: Load beautiful initial real estate listings to display right away:
   ```bash
   npm run seed
   ```
5. **Start Backend Server**: Start the server in hot-reloading development mode using Nodemon:
   ```bash
   npm run dev
   ```
   *The server will start running at `http://localhost:5000`.*

---

### **2. Frontend React Configuration**

1. Open another terminal window and navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. The frontend dependencies are already configured. If needed:
   ```bash
   npm install
   ```
3. **Start React Application**: Run the local Vite dev server:
   ```bash
   npm run dev
   ```
   *The frontend dev server will launch at `http://localhost:5173`.*

---

## 📡 REST API Specifications

The server exposes the following RESTful API routes under `/api/properties`:

| Method | Endpoint | Description | Payload (JSON) |
|:---|:---|:---|:---|
| **GET** | `/api/properties` | Fetch all properties sorted by creation date | *None* |
| **POST** | `/api/properties` | Create a new property listing | `{ title, location, price, type, image, description }` |
| **DELETE** | `/api/properties/:id` | Delete a property by database ID | *None* |

### **Mongoose Schema Reference**
```javascript
{
  title: String,
  location: String,
  price: Number,
  type: String,
  image: String,
  description: String,
  createdAt: Date
}
```

---

## 🎨 Design System Details
- **Fonts**: Curated Google Font `Outfit` for premium look and readability.
- **Glassmorphism**: Header navigation bar utilizes backdrop filter blur effect for seamless styling.
- **Responsive Design**: Property grids adjust from 1-column layout on mobile to 3-column layout on large desktops.
- **UI Elements**: Hover micro-interactions, responsive inputs, dynamic category badges, and active state styles.
