# Grand Pearl Marquee

A full-stack web application for **Grand Pearl Marquee**, an event & wedding banquet venue. The platform consists of a polished public marketing website, a multi-step customer booking wizard, and a password-protected admin dashboard for managing bookings, decor, food, gallery, contact messages, and website settings.

## ✨ Features

### Public Website
- **Home, About, Decor, Food, Gallery, Booking, Contact** pages with a luxury gold/black design theme.
- Dynamic content driven by the API (hero image, decor packages, food menu, gallery) with static fallback data.
- Scroll-reveal animations (AOS) and page transitions (framer-motion).
- Responsive, mobile-first layout built on Bootstrap 5.

### Booking Wizard
- 8-step booking flow: Customer → Event → Guests → Arrangement → Decor → Food → Extras → Review.
- Real-time validation, live food categories from the API, decor selection, extra services, and a final review screen before submission.

### Admin Dashboard
- Secure JWT-based admin authentication.
- **Dashboard** with stats, today's events, recent bookings, and quick actions.
- **Bookings management** — filter, search, view details, approve, reject, and delete bookings.
- **Decor management** — CRUD for decor items and their images/videos.
- **Food management** — CRUD for food categories and food items.
- **Gallery management** — upload images/videos, create categories, manage media.
- **Contact messages** — read and delete enquiries.
- **Settings** — edit website information and upload the hero image.

## 🛠 Tech Stack

### Frontend (`/client`)
| Category       | Technology |
|----------------|------------|
| Language       | JavaScript (JSX) |
| UI Library     | React 19 |
| Build Tool     | Vite 8 |
| Routing        | React Router DOM 7 |
| Styling        | Bootstrap 5.3, custom CSS design tokens |
| HTTP Client    | Axios |
| Animation      | framer-motion, AOS |
| Icons          | react-icons |
| Charts         | recharts |
| Linting        | ESLint 10 |

### Backend (`/server`)
| Category       | Technology |
|----------------|------------|
| Language       | Node.js (CommonJS) |
| Web Framework  | Express 5 |
| Database       | MySQL 2 (mysql2 driver) |
| Authentication | JSON Web Tokens (jsonwebtoken) |
| Password Hashing | bcrypt |
| Validation     | express-validator |
| File Uploads   | multer |
| Email          | nodemailer |
| Middleware     | cors, cookie-parser, dotenv |
| Dev Server     | nodemon |

## 📁 Project Structure

```
GrandPearlMarquee/
├── client/                          # React frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # Reusable UI components (Common, Home, Booking, Admin, ...)
│   │   ├── pages/                   # Route pages (public + Admin)
│   │   ├── layouts/                 # MainLayout & AdminLayout
│   │   ├── services/                # Axios API service modules
│   │   ├── hooks/                   # Custom hooks
│   │   ├── data/                    # Static fallback data
│   │   ├── styles/                  # Global design-token CSS
│   │   └── utils/                   # Booking calculations & validation
│   └── package.json
└── server/                          # Express backend
    ├── config/                      # Database connection
    ├── controllers/                 # Request handlers
    ├── models/                      # MySQL queries
    ├── routes/                      # API route definitions
    ├── middleware/                  # Auth & file upload middleware
    ├── validators/                  # express-validator rules
    ├── uploads/                     # Uploaded media (decor, food, gallery, settings)
    ├── app.js                       # Express app setup
    └── server.js                    # Entry point
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18
- **MySQL** server (local or remote)

### 1. Database Setup
Create a MySQL database and the required tables. The application expects the following tables (columns are managed through the models in `server/models/`):

- `admins` — `full_name`, `email`, `password`, `role`
- `bookings` — customer & event details, guests, food, decor, extra services
- `website_settings` — website name, contact info, hero image, etc.
- `decor` & `decor_media` — decor packages and their images/videos
- `food_categories` & `food_items` — food menu
- `gallery_categories` & `gallery` — gallery media
- `contact_messages` — contact form enquiries

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=grand_pearl_marquee
JWT_SECRET=your_secret_key
```

Start the server:

```bash
npm run dev        # development (nodemon)
npm start          # production
```

The API runs at `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev        # development (Vite)
npm run build      # production build
npm run preview    # preview production build
```

The app runs at `http://localhost:5173`.

> **Note:** The frontend currently calls the backend at `http://localhost:5000`. For other environments, update the API base URL in `client/src/services/` or configure a Vite proxy.

## 🔌 API Overview

| Method | Endpoint                          | Auth | Description                              |
|--------|-----------------------------------|------|------------------------------------------|
| POST   | `/api/admin/register`             | No   | Register a new admin                     |
| POST   | `/api/admin/login`                | No   | Admin login (returns JWT)                |
| GET    | `/api/admin/dashboard`            | Yes  | Dashboard statistics                     |
| GET    | `/api/bookings`                   | Yes  | List all bookings                        |
| POST   | `/api/bookings`                   | No   | Submit a public booking                  |
| GET/PUT/DELETE | `/api/bookings/:id`        | Yes  | View / update status / delete booking    |
| GET    | `/api/decor`                      | No   | List decor packages                      |
| POST/PUT/DELETE | `/api/decor`            | Yes  | Manage decor                             |
| GET/POST | `/api/decor-media/:decorId`     | Mixed | List / upload decor media                |
| GET    | `/api/food/categories`            | No   | List food categories                     |
| GET    | `/api/food/items`                 | No   | List food items                          |
| POST/PUT/DELETE | `/api/food/*`            | Yes  | Manage food categories & items           |
| GET    | `/api/gallery`                    | No   | List gallery media                       |
| POST/DELETE | `/api/gallery`               | Yes  | Upload / delete gallery media            |
| POST/DELETE | `/api/gallery/categories`    | Yes  | Manage gallery categories                |
| POST   | `/api/contact`                    | No   | Submit a contact message                 |
| GET/DELETE | `/api/contact`               | Yes  | Read / delete contact messages           |
| GET    | `/api/settings/public`            | No   | Public website settings                  |
| GET/PUT | `/api/settings`                  | Yes  | Manage settings                          |
| POST   | `/api/settings/hero-image`        | Yes  | Upload hero image                        |

All protected routes require a `Authorization: Bearer <token>` header.

## 📜 Scripts

### Client
| Script    | Description                     |
|-----------|---------------------------------|
| `npm run dev` | Start Vite dev server         |
| `npm run build` | Build for production        |
| `npm run lint` | Run ESLint                    |
| `npm run preview` | Preview production build  |

### Server
| Script    | Description                     |
|-----------|---------------------------------|
| `npm run dev` | Start server with nodemon    |
| `npm start`   | Start server                  |

## 📦 Dependencies

### Client
`react`, `react-dom`, `react-router-dom`, `bootstrap`, `axios`, `framer-motion`, `aos`, `react-icons`, `recharts` — plus dev dependencies `vite`, `@vitejs/plugin-react`, `eslint`, `@types/react`, `@types/react-dom`.

### Server
`express`, `mysql2`, `jsonwebtoken`, `bcrypt`, `express-validator`, `multer`, `nodemailer`, `cors`, `cookie-parser`, `dotenv` — plus dev dependency `nodemon`.

## 📄 License

This project is licensed under the **ISC License** (server) — see `server/package.json`.
