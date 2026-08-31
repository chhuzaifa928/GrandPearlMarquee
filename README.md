# Grand Pearl Marquee

A full-stack web application for **Grand Pearl Marquee**, an event & wedding banquet venue. The platform consists of a polished public marketing website, a multi-step customer booking wizard, and a password-protected admin dashboard for managing bookings, decor, food, gallery, contact messages, and website settings.

## Features

### Public Website
- **Home, About, Decor, Food, Gallery, Booking, Contact** pages with a luxury gold/black design theme.
- Dynamic content driven by the API (hero image, decor packages, food menu, gallery) with static fallback data.
- Scroll-reveal animations (AOS) and page transitions (framer-motion).
- Responsive, mobile-first layout built on Bootstrap 5.
- Route-level code splitting via `React.lazy` + `Suspense` -- pages load on demand, keeping the initial bundle small.
- SEO meta tags per page, JSON-LD structured data, and Open Graph tags.

### Booking Wizard
- 8-step booking flow: Customer -> Event -> Guests -> Arrangement -> Decor -> Food -> Extras -> Review.
- Custom DatePicker and SelectMenu components built from scratch for consistent cross-platform behavior.
- Real-time validation via pure utility functions, live food categories from the API, decor selection, extra services, and a final review screen before submission.

### Admin Dashboard
- JWT-based admin authentication.
- **Dashboard** with stats, today's events, recent bookings, and quick actions.
- **Bookings management** -- filter, search, view details, approve, reject, and delete bookings.
- **Decor management** -- CRUD for decor items and their images/videos.
- **Food management** -- CRUD for food categories and food items.
- **Gallery management** -- upload images/videos, create categories, manage media.
- **Contact messages** -- read and delete enquiries.
- **Settings** -- edit website information and upload the hero image.

## Tech Stack

### Frontend (`/client`)

| Category       | Technology                        |
|----------------|-----------------------------------|
| Language       | JavaScript (JSX)                  |
| UI Library     | React 19                          |
| Build Tool     | Vite 8                            |
| Routing        | React Router DOM 7                |
| Styling        | Bootstrap 5.3, custom CSS design tokens |
| HTTP Client    | Axios                             |
| Animation      | framer-motion, AOS                |
| Icons          | react-icons                       |
| Charts         | recharts                          |
| SEO            | react-helmet-async                |
| Linting        | ESLint 10                         |

### Backend (`/server`)

| Category          | Technology                        |
|-------------------|-----------------------------------|
| Language          | Node.js (CommonJS)                |
| Web Framework     | Express 5                         |
| Database          | MySQL 2 (mysql2 driver)           |
| Authentication    | JSON Web Tokens (jsonwebtoken)    |
| Password Hashing  | bcrypt                            |
| Validation        | express-validator                 |
| File Uploads      | multer                            |
| Email             | nodemailer                        |
| Middleware        | cors, cookie-parser, dotenv       |
| Dev Server        | nodemon                           |

## Project Structure

```
GrandPearlMarquee/
├── client/                              # React frontend
│   ├── public/                          # Static assets
│   ├── src/
│   │   ├── assets/                      # Images (logo, hero, decor, food, gallery)
│   │   ├── components/
│   │   │   ├── About/                   # About page sections
│   │   │   ├── Admin/                   # Dashboard, Bookings, Food, Decor, Gallery, Settings, Contact
│   │   │   ├── Booking/                 # Wizard + 8 step components
│   │   │   ├── Common/                  # Navbar, Footer, ScrollProgress, WhatsAppButton, etc.
│   │   │   ├── Contact/                 # Contact form
│   │   │   ├── Decor/                   # Decor listing (DecorGallery, DecorCard, DecorGalleryLightbox)
│   │   │   ├── Food/                    # Food menu display
│   │   │   ├── Gallery/                 # Gallery grid and lightbox
│   │   │   ├── Hero/                    # Hero section with dynamic content
│   │   │   ├── Home/                    # Home page section components
│   │   │   ├── SEO/                     # Helmet meta tags, JSON-LD structured data
│   │   │   └── Venue/                   # Venue-related components
│   │   ├── config/                      # API base URL configuration
│   │   ├── data/                        # Static fallback data (decor, food, gallery, extras)
│   │   ├── hooks/                       # Custom hooks (useFetch, useWebsiteSettings)
│   │   ├── layouts/                     # MainLayout & AdminLayout
│   │   ├── pages/                       # Route pages (public + admin)
│   │   ├── services/                    # Axios API service modules (public + admin)
│   │   ├── styles/                      # Global design-token CSS (10 files)
│   │   ├── utils/                       # Booking calculations & validation
│   │   ├── App.jsx                      # Route definitions (React.lazy + Suspense code splitting)
│   │   └── main.jsx                     # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── eslint.config.js
├── server/                              # Express backend
│   ├── config/
│   │   └── db.js                        # MySQL connection (supports SSL for Aiven)
│   ├── controllers/                     # Request handlers (9 files)
│   ├── models/                          # MySQL query functions (9 files)
│   ├── routes/                          # Express router definitions (8 files)
│   ├── middleware/                       # Auth + file upload middleware (5 files)
│   ├── validators/                      # express-validator rules
│   ├── uploads/                         # Uploaded media (decor/, food/, gallery/, settings/)
│   ├── app.js                           # Express app setup and route mounting
│   └── server.js                        # Entry point
└── package.json                         # Root dependencies (react-helmet-async)
```

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **MySQL** server (local or remote, e.g. Aiven)

### 1. Database Setup

Create a MySQL database and the required tables. The application expects the following tables (columns are managed through the models in `server/models/`):

| Table                | Key Columns                                                             |
|----------------------|-------------------------------------------------------------------------|
| `admins`             | `id`, `full_name`, `email`, `password`, `role`                         |
| `bookings`           | `id`, `customer_name`, `email`, `phone`, `whatsapp`, `city`, `event_type`, `event_date`, `event_time`, `guests`, `male_guests`, `female_guests`, `vip_guests`, `male_vip`, `female_vip`, `partition_required`, `food_category`, `custom_food`, `decor_theme`, `additional_requirements`, `sound_system`, `ac_required`, `heater_required`, `extra_services`, `booking_status`, `created_at` |
| `website_settings`   | `id`, `website_name`, `tagline`, `phone`, `whatsapp`, `email`, `address`, `facebook`, `instagram`, `youtube`, `tiktok`, `hero_tagline`, `hero_title_line1`, `hero_title_line2`, `hero_description`, `hero_image` |
| `decor`              | `id`, `category`, `title`, `description`, `image`, `created_at`        |
| `decor_media`        | `id`, `decor_id`, `media_type`, `media_url`, `created_at`              |
| `food_categories`    | `id`, `category_name`, `image`                                         |
| `food_items`         | `id`, `category_id`, `item_name`, `description`                        |
| `gallery_categories` | `id`, `name`                                                           |
| `gallery`            | `id`, `title`, `image`, `category`, `media_type`, `uploaded_at`        |
| `contact_messages`   | `id`, `full_name`, `email`, `phone`, `subject`, `message`, `created_at`|

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
DB_SSL=false
JWT_SECRET=your_secret_key
```

> For Aiven or other cloud MySQL providers, set `DB_SSL=true`.

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

> **Note:** The frontend calls the backend at `http://localhost:5000` by default. To change this, set the `VITE_API_URL` environment variable or update `client/src/config/api.js`.

## API Overview

### Authentication

| Method | Endpoint                | Auth | Description                  |
|--------|-------------------------|------|------------------------------|
| POST   | `/api/admin/register`   | No   | Register a new admin         |
| POST   | `/api/admin/login`      | No   | Admin login (returns JWT)    |
| GET    | `/api/admin/dashboard`  | Yes  | Dashboard statistics         |
| GET    | `/api/admin/profile`    | Yes  | Get current admin profile    |

### Bookings

| Method | Endpoint                | Auth | Description                              |
|--------|-------------------------|------|------------------------------------------|
| POST   | `/api/bookings`         | No   | Submit a public booking                  |
| GET    | `/api/bookings`         | Yes  | List all bookings                        |
| GET    | `/api/bookings/:id`     | Yes  | Get a single booking                     |
| PUT    | `/api/bookings/:id`     | Yes  | Update booking status                    |
| DELETE | `/api/bookings/:id`     | Yes  | Delete a booking                         |

### Decor

| Method | Endpoint                    | Auth | Description                      |
|--------|-----------------------------|------|----------------------------------|
| GET    | `/api/decor`                | No   | List decor packages              |
| GET    | `/api/decor/:id`            | No   | Get a single decor package       |
| POST   | `/api/decor`                | Yes  | Create decor (with image upload) |
| PUT    | `/api/decor/:id`            | Yes  | Update decor (with image upload) |
| DELETE | `/api/decor/:id`            | Yes  | Delete decor                     |
| GET    | `/api/decor-media/:decorId` | No   | List media for a decor package   |
| POST   | `/api/decor-media/:decorId` | Yes  | Upload media (up to 20 files)    |
| DELETE | `/api/decor-media/:id`      | Yes  | Delete decor media               |

### Food

| Method | Endpoint                    | Auth | Description                      |
|--------|-----------------------------|------|----------------------------------|
| GET    | `/api/food/categories`      | No   | List food categories             |
| GET    | `/api/food/items`           | No   | List food items                  |
| POST   | `/api/food/categories`      | Yes  | Create food category (with image)|
| DELETE | `/api/food/categories/:id`  | Yes  | Delete food category             |
| POST   | `/api/food/items`           | Yes  | Create food item                 |
| PUT    | `/api/food/items/:id`       | Yes  | Update food item                 |
| DELETE | `/api/food/items/:id`       | Yes  | Delete food item                 |

### Gallery

| Method | Endpoint                          | Auth | Description                      |
|--------|-----------------------------------|------|----------------------------------|
| GET    | `/api/gallery`                    | No   | List gallery media               |
| GET    | `/api/gallery/categories`         | No   | List gallery categories          |
| POST   | `/api/gallery`                    | Yes  | Upload gallery media             |
| DELETE | `/api/gallery/:id`                | Yes  | Delete gallery media             |
| POST   | `/api/gallery/categories`         | Yes  | Create gallery category          |
| DELETE | `/api/gallery/categories/:id`     | Yes  | Delete gallery category          |

### Contact

| Method | Endpoint            | Auth | Description                  |
|--------|---------------------|------|------------------------------|
| POST   | `/api/contact`      | No   | Submit a contact message     |
| GET    | `/api/contact`      | Yes  | List all contact messages    |
| DELETE | `/api/contact/:id`  | Yes  | Delete a contact message     |

### Settings

| Method | Endpoint                  | Auth | Description                  |
|--------|---------------------------|------|------------------------------|
| GET    | `/api/settings/public`    | No   | Public website settings      |
| GET    | `/api/settings`           | Yes  | Get full settings            |
| PUT    | `/api/settings`           | Yes  | Update settings              |
| POST   | `/api/settings/hero-image`| Yes  | Upload hero image            |

All protected routes require an `Authorization: Bearer <token>` header.

## Design System

The frontend uses a custom CSS design token system defined in `client/src/styles/`:

| File             | Purpose                                             |
|------------------|-----------------------------------------------------|
| `variables.css`  | CSS custom properties: colors (gold `#D4AF37`), typography (Playfair Display + Poppins), spacing, shadows, radii, transitions |
| `buttons.css`    | `.btn-gold`, `.btn-dark`, `.btn-outline`, sizes, disabled states |
| `typography.css` | Heading scales, paragraph, link, selection styles    |
| `layout.css`     | `.section`, grid utilities (`.grid-2/3/4`), background classes |
| `animations.css` | fadeIn, fadeLeft, fadeRight, scaleUp, floating, pulse, hover effects |
| `cards.css`      | Card component styles                               |
| `forms.css`      | Form input, select, textarea styles                 |
| `packageCards.css`| Package/card display styles                         |
| `utilities.css`  | Utility classes                                     |
| `global.css`     | Base resets and global styles                       |

Components use co-located CSS files alongside their JSX files.

## Scripts

### Client

| Script           | Description                     |
|------------------|---------------------------------|
| `npm run dev`    | Start Vite dev server           |
| `npm run build`  | Build for production            |
| `npm run lint`   | Run ESLint                      |
| `npm run preview`| Preview production build        |

### Server

| Script           | Description                     |
|------------------|---------------------------------|
| `npm run dev`    | Start server with nodemon       |
| `npm start`      | Start server                    |

## Dependencies

### Client

**Runtime:** `react`, `react-dom`, `react-router-dom`, `bootstrap`, `axios`, `framer-motion`, `aos`, `react-icons`, `recharts`, `react-helmet-async`

**Dev:** `vite`, `@vitejs/plugin-react`, `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `@types/react`, `@types/react-dom`, `globals`

### Server

**Runtime:** `express`, `mysql2`, `jsonwebtoken`, `bcrypt`, `express-validator`, `multer`, `nodemailer`, `cors`, `cookie-parser`, `dotenv`

**Dev:** `nodemon`

## License

This project is licensed under the **ISC License** (server) -- see `server/package.json`.
