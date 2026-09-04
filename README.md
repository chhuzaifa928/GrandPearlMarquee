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
| HTTP Security     | helmet, cors, express-rate-limit  |
| Configuration     | dotenv                            |
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
│   │   └── db.js                        # MySQL connection (supports SSL for cloud providers)
│   ├── controllers/                     # Request handlers (9 files)
│   ├── models/                          # MySQL query functions (9 files, all parameterized)
│   ├── routes/                          # Express router definitions (8 files)
│   ├── middleware/                       # Auth + 5 file-upload configs + error handlers (8 files)
│   ├── validators/                      # express-validator rules (booking, contact, settings)
│   ├── utils/                           # Upload file cleanup (safe path resolution)
│   ├── uploads/                         # Uploaded media (decor/, food/, gallery/, settings/)
│   ├── app.js                           # Express app setup and route mounting
│   └── server.js                        # Entry point
└── package.json                         # Root dependencies (react-helmet-async)
```

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **MySQL** server (local or remote, e.g. Hostinger)

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
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=grand_pearl_marquee
DB_SSL=false
DB_SSL_CA=
JWT_SECRET=your_long_random_secret
FRONTEND_URL=http://localhost:5173
```

> **For cloud MySQL providers (e.g. Hostinger, Aiven):** set `DB_SSL=true` and
> put the CA certificate contents in `DB_SSL_CA` (escaped as a single line, e.g.
> with `\n` literals or base64). Some providers also use a custom `DB_PORT`.
>
> `FRONTEND_URL` is the only production origin allowed by CORS. In development
> `http://localhost:5173` is added automatically. In production, `NODE_ENV=production`
> must be set and `FRONTEND_URL` is required — the server exits on startup if it is missing.
>
> The first admin account cannot be created via the API (registration requires
> an existing valid JWT), so it must be created manually in the production MySQL
> database. The password stored in the `admins` table **MUST be a bcrypt hash**,
> never the plaintext password. To bootstrap the first admin:
>
> 1. Generate a bcrypt hash **locally** using the project's existing `bcrypt`
>    dependency:
>    ```bash
>    cd server
>    node -e "require('bcrypt').hash('<your-password>',10).then(h=>console.log(h))"
>    ```
>    - `<your-password>` is a placeholder — do **not** commit a real password to
>      the repository, source code, Git history, or chat.
>    - The command prints a bcrypt hash.
> 2. Paste the generated hash in place of the `<bcrypt-hash>` placeholder below,
>    then insert the first admin directly into MySQL (e.g. via `mysql2`):
>    `INSERT INTO admins (full_name, email, password, role) VALUES ('Admin', 'admin@example.com', '<bcrypt-hash>', 'superadmin');`
>    - The first admin should be bootstrapped with `role = 'superadmin'`, because
>      only a superadmin can create further admin accounts (see the authorization
>      note below).
> 3. The generated hash is sensitive — treat it as a secret and do **not** commit
>    it to the repository.
>
> Sequence for a fresh deployment: **generate hash → insert first admin →
> start/use the production API → log in at `/admin/login`**.
>
> **Admin authorization model:** `role` is carried in the signed JWT on login.
> Two roles exist: `superadmin` (can create further admin accounts via
> `POST /api/admin/register`) and `admin` (full normal admin functionality, but
> **cannot** create new admins). The role is never taken from the request body —
> new admins are always created with `role = 'admin'`. The user who seeds the
> first admin should therefore give that account `role = 'superadmin'` (as shown
> above). If an existing deployment bootstrapped its first account as `'admin'`,
> a MySQL operator can promote it once by running
> `UPDATE admins SET role = 'superadmin' WHERE email = '<that-admin-email>';`
> — do this manually in the production database as needed.

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

> **Note:** The frontend calls the backend at `http://localhost:5000` by default. To change this, set the `VITE_API_URL` environment variable or update `client/src/config/api.js`. **Production builds must set `VITE_API_URL`** — the `localhost` value is a development-only fallback and the deployed site will be broken if it is left unset.

### 4. Production Deployment (Hostinger)

- **Build the client with the real API URL:** `VITE_API_URL=https://your-api-domain` (set it at build time — Vite bakes it into the bundle).
- **Server environment variables on the host:** `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SSL=true`, `DB_SSL_CA`, `JWT_SECRET` (a long random value), `NODE_ENV=production`, `FRONTEND_URL` (your production frontend origin, e.g. `https://grandpearlmarquee.com`), and `TRUST_PROXY=true` (so the rate limiter keys on the real client IP behind the reverse proxy).
- **Reverse proxy / rate limiting:** the login limiter keys on client IP, so set your proxy correctly (see `server/app.js`) so all visitors don't share one rate-limit bucket.
- **Persistent storage:** uploaded media lives on the server's local disk under `server/uploads/` (`uploads/` is gitignored). Back it up or migrate to object storage — it is lost if the deploy directory is replaced.
- **Seed the first admin** as described above before logging into `/admin/login`.

> **Content Security Policy (production):** the final production frontend should receive a `Content-Security-Policy` HTTP response header from the Hostinger frontend host/proxy serving `client/dist`. Use this production policy template:
>
> ```
> default-src 'self';
> script-src 'self';
> style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
> font-src 'self' https://fonts.gstatic.com;
> img-src 'self' data: <API_ORIGIN>;
> media-src 'self' <API_ORIGIN>;
> connect-src 'self' <API_ORIGIN>;
> frame-src https://www.google.com;
> object-src 'none';
> base-uri 'self';
> frame-ancestors 'self';
> form-action 'self';
> ```
>
> Notes on this policy:
> - Replace `<API_ORIGIN>` with the actual production API origin (the same value as `VITE_API_URL`).
> - The API origin is also the origin serving uploaded images/videos.
> - This policy is intended for **production only**; do **not** enforce it blindly during Vite development (Vite injects inline scripts, uses `ws://` HMR, and `http://localhost:5000`).
> - `'unsafe-inline'` applies to `style-src` only, because the app currently uses React inline styles. Do **not** add `'unsafe-inline'` to `script-src`, and do **not** add `'unsafe-eval'` to the production `script-src`.
> - Google Fonts and the Google Maps iframe require the listed origins (`fonts.googleapis.com`, `fonts.gstatic.com`, and `https://www.google.com` for `frame-src`).
> - Deploy the CSP as an HTTP response header rather than a meta tag where Hostinger allows it.
> - After deployment, verify fonts, Google Maps, API requests, uploaded images/videos, and admin functionality before treating the CSP as fully validated.
> - If the final deployment topology changes, review the policy before applying it.
> - Optionally add `upgrade-insecure-requests` after production HTTPS is confirmed.

> **Planned authentication hardening (deferred):** Admin authentication currently uses a JWT Bearer token that the frontend stores in `localStorage`. Because JavaScript on the origin can read `localStorage`, this storage approach carries an XSS token-theft risk. The current implementation is intentionally kept stable for the initial deployment and is **not** being redesigned here. As a dedicated authentication task **after the Hostinger deployment is stable**, plan to: (1) migrate the JWT to an HttpOnly + Secure cookie; (2) choose an appropriate `SameSite` setting based on the final frontend/backend deployment topology; (3) use `credentials` correctly for any cross-origin requests; (4) add appropriate CSRF protection as part of cookie-based auth; and (5) provide server-side logout that clears the authentication cookie.

## API Overview

### Authentication

| Method | Endpoint                | Auth | Description                  |
|--------|-------------------------|------|------------------------------|
| POST   | `/api/admin/register`   | Yes  | Create a new admin (existing JWT required) |
| POST   | `/api/admin/login`      | No   | Admin login (returns JWT)    |
| GET    | `/api/admin/dashboard`  | Yes  | Dashboard statistics         |
| GET    | `/api/admin/me`         | Yes  | Verify admin session         |
| GET    | `/api/admin/profile`    | Yes  | Protected test route         |

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

**Runtime:** `express`, `mysql2`, `jsonwebtoken`, `bcrypt`, `express-validator`, `multer`, `cors`, `helmet`, `express-rate-limit`, `dotenv`

**Dev:** `nodemon`

## License

This project is licensed under the **ISC License** (server) -- see `server/package.json`.
