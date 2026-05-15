<div align="center">

# ⚡ TaskFlow — Team Task Manager

### A full-stack MERN application for modern team collaboration and project management

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-blue?style=for-the-badge)](CONTRIBUTING.md)

<br/>

**[🌐 Live Demo](https://team-task-manager-one-rho.vercel.app)** &nbsp;•&nbsp;
**[🔗 API Health](https://team-task-manager-nnlo.onrender.com/api/health)** &nbsp;•&nbsp;
**[📂 Repository](https://github.com/snehsrivastava/Team-Task-Manager)**

<br/>

</div>

---

## 📌 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Flow](#-project-flow)
- [Folder Structure](#-folder-structure)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Local Setup](#-local-setup)
- [Deployment Guide](#-deployment-guide)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Problem Statement

Managing tasks across a team is chaotic without the right tools. Most teams face these real problems daily:

- 📋 **No visibility** — team members don't know what others are working on
- 🔀 **No workflow** — tasks jump from idea to done with no structured stages
- 👥 **No role control** — everyone can edit or delete anything, causing conflicts
- 📊 **No analytics** — managers have no real-time view of project progress
- 🔔 **No activity tracking** — no history of who did what and when
- 💻 **Poor UX** — existing tools are either too complex or too basic

---

## ✅ Solution

**TaskFlow** is a production-ready, full-stack MERN team task manager that solves all of the above:

| Problem | TaskFlow Solution |
|---|---|
| No visibility | Kanban board with real-time task status across 4 columns |
| No workflow | Structured pipeline: `Todo → In Progress → In Review → Done` |
| No role control | JWT-based role system: `Admin` manages, `Member` executes |
| No analytics | Dashboard with live stats, charts, and progress tracking |
| No activity tracking | Activity feed logs every action with user and timestamp |
| Poor UX | Modern glassmorphism UI with dark mode, animations, and full responsiveness |

---

## 🌐 Live Demo

| Service | URL |
|---|---|
| 🖥️ Frontend (Vercel) | https://team-task-manager-one-rho.vercel.app |
| ⚙️ Backend API (Railway) | https://team-task-manager-production.up.railway.app |
| 🏥 Health Check | https://team-task-manager-production.up.railway.app/api/health |

> ⚠️ Update the Railway URL above after deployment is complete.

**Test Credentials:**
```
Admin  →  email: admin@test.com   password: 123456
Member →  email: member@test.com  password: 123456
```

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure JWT-based login and registration
- Role-based access control — `Admin` and `Member` roles
- Persistent sessions via localStorage token
- Auto logout on token expiry with global 401 interceptor
- Password hashing with bcryptjs (12 salt rounds)
- Input validation on both client and server side

### 📊 Dashboard
- Real-time stats: Total Projects, Completed Tasks, Pending Tasks, Overdue Tasks
- Visual progress chart (bar chart) showing task status breakdown
- Recent activity feed showing all team actions
- Role-aware data — admins see all, members see their own

### 📁 Project Management
- Create, update, delete projects (Admin only)
- Add and remove team members per project
- Project status: `Active`, `Completed`, `Archived`
- Per-project task count and progress percentage
- Search and filter projects by status

### ✅ Task Management
- Full CRUD for tasks with title, description, priority, due date
- 4-priority system: `Low`, `Medium`, `High`, `Urgent`
- Assign tasks to specific team members
- Task comments with user attribution
- Members see only tasks assigned to them or in their projects

### 🗂️ Kanban Board
- Drag-and-drop interface powered by `@dnd-kit`
- 4 columns: `Todo`, `In Progress`, `In Review`, `Done`
- Real-time optimistic UI updates on drag
- Filter tasks by project
- Visual task cards with priority badges, assignee avatar, due date

### 👥 Team Management
- View all team members with roles and avatars
- Auto-generated avatars from user initials via UI Avatars API
- Admin can manage project membership

### 🎨 UI/UX
- Dark / Light mode toggle with localStorage persistence
- Glassmorphism design with custom Tailwind v4 theme tokens
- Framer Motion animations and page transitions
- 3D floating shapes on landing page (Three.js + React Three Fiber)
- Fully responsive — mobile, tablet, desktop
- Custom scrollbar, skeleton loaders, toast notifications

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.3 | UI library |
| Vite | 5.4 | Build tool & dev server |
| Tailwind CSS | v4 | Utility-first styling |
| Framer Motion | 12.0 | Animations & transitions |
| React Router DOM | 6.26 | Client-side routing |
| Axios | 1.7 | HTTP client with interceptors |
| Zustand | 4.5 | Global state management |
| @dnd-kit | 6.1 | Drag and drop |
| Recharts | 2.12 | Dashboard charts |
| React Hook Form | 7.53 | Form handling & validation |
| Three.js + R3F | 0.170 | 3D landing page animations |
| Lucide React | 0.441 | Icon library |
| React Hot Toast | 2.4 | Toast notifications |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.21 | Web framework |
| MongoDB Atlas | — | Cloud database |
| Mongoose | 8.7 | ODM for MongoDB |
| JSON Web Token | 9.0 | Authentication tokens |
| bcryptjs | 2.4 | Password hashing |
| express-validator | 7.2 | Request validation |
| cors | 2.8 | Cross-origin resource sharing |
| morgan | 1.10 | HTTP request logger |
| dotenv | 16.4 | Environment variable management |

### DevOps & Deployment
| Tool | Purpose |
|---|---|
| Vercel | Frontend hosting with SPA routing |
| Railway | Backend API hosting |
| MongoDB Atlas | Cloud database (M0 free tier) |
| GitHub | Version control & CI/CD trigger |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Vercel)                          │
│                                                                 │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌─────────┐  │
│   │  Landing  │    │  Auth    │    │Dashboard │    │ Kanban  │  │
│   │   Page    │    │Login/Reg │    │Stats/Chart│   │  Board  │  │
│   └──────────┘    └──────────┘    └──────────┘    └─────────┘  │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              Zustand Global State                       │   │
│   │   useAuthStore │ useThemeStore │ useUIStore             │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │           Axios Instance (with JWT interceptor)         │   │
│   └───────────────────────┬─────────────────────────────────┘   │
└───────────────────────────│─────────────────────────────────────┘
                            │ HTTPS REST API
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVER (Railway)                           │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                    Express.js App                       │   │
│   │                                                         │   │
│   │  CORS Middleware → Auth Middleware → Role Guard         │   │
│   │                                                         │   │
│   │  /api/auth      /api/projects    /api/tasks             │   │
│   │  /api/users     /api/dashboard   /api/health            │   │
│   └───────────────────────┬─────────────────────────────────┘   │
│                           │                                     │
│   ┌───────────────────────▼─────────────────────────────────┐   │
│   │              Controllers + Services                     │   │
│   │  authController │ projectController │ taskController    │   │
│   │  userController │ dashboardController                   │   │
│   └───────────────────────┬─────────────────────────────────┘   │
│                           │                                     │
│   ┌───────────────────────▼─────────────────────────────────┐   │
│   │              Mongoose ODM Models                        │   │
│   │     User │ Project │ Task │ Activity                    │   │
│   └───────────────────────┬─────────────────────────────────┘   │
└───────────────────────────│─────────────────────────────────────┘
                            │ MongoDB Driver
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   MongoDB Atlas (Cloud)                         │
│                                                                 │
│   Collections:  users │ projects │ tasks │ activities          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Project Flow

### User Authentication Flow
```
User visits app
      │
      ▼
App loads → checks localStorage for JWT token
      │
      ├── Token exists → GET /api/auth/me → validate token
      │         │
      │         ├── Valid   → load user into Zustand store → show Dashboard
      │         └── Invalid → clear token → redirect to /login
      │
      └── No token → show Landing page
```

### Task Lifecycle Flow
```
Admin creates Project
      │
      ▼
Admin adds Members to Project
      │
      ▼
Admin creates Task → assigns to Member → sets Priority & Due Date
      │
      ▼
Task appears on Member's Kanban Board (Todo column)
      │
      ▼
Member drags task → In Progress → In Review
      │
      ▼
Member/Admin marks task → Done
      │
      ▼
Activity logged → Dashboard stats updated → Progress % recalculated
```

### Role-Based Access Flow
```
Every API request
      │
      ▼
Auth Middleware → verify JWT → attach req.user
      │
      ▼
Role Guard (if protected route)
      │
      ├── role === 'admin' → full access (CRUD all projects/tasks)
      │
      └── role === 'member'
                │
                ├── Projects → only see projects they belong to
                ├── Tasks    → see tasks in their projects OR assigned to them
                └── Delete   → not allowed (admin only)
```

---

## 📁 Folder Structure

```
Team Task Manager/
│
├── client/                          # React + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── animations/
│   │   │   └── variants.js          # Framer Motion animation variants
│   │   ├── api/
│   │   │   ├── axios.js             # Axios instance with JWT interceptor
│   │   │   ├── authApi.js           # Auth API calls
│   │   │   ├── projectApi.js        # Project API calls
│   │   │   ├── taskApi.js           # Task API calls
│   │   │   ├── userApi.js           # User API calls
│   │   │   └── dashboardApi.js      # Dashboard API calls
│   │   ├── components/
│   │   │   ├── common/              # Reusable UI components
│   │   │   │   ├── Avatar.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── ConfirmDialog.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Skeleton.jsx
│   │   │   ├── dashboard/           # Dashboard widgets
│   │   │   │   ├── ProgressChart.jsx
│   │   │   │   ├── RecentActivity.jsx
│   │   │   │   └── StatCard.jsx
│   │   │   ├── projects/            # Project components
│   │   │   │   ├── ProjectCard.jsx
│   │   │   │   └── ProjectForm.jsx
│   │   │   ├── tasks/               # Task & Kanban components
│   │   │   │   ├── KanbanBoard.jsx
│   │   │   │   ├── KanbanColumn.jsx
│   │   │   │   ├── TaskCard.jsx
│   │   │   │   ├── TaskDetail.jsx
│   │   │   │   └── TaskForm.jsx
│   │   │   └── ui/                  # Layout UI components
│   │   │       ├── FloatingShapes.jsx
│   │   │       ├── MobileSidebar.jsx
│   │   │       ├── Navbar.jsx
│   │   │       ├── SearchBar.jsx
│   │   │       ├── Sidebar.jsx
│   │   │       └── ThemeToggle.jsx
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useClickOutside.js
│   │   │   ├── useDebounce.js
│   │   │   └── useMediaQuery.js
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx       # Login/Register layout
│   │   │   └── DashboardLayout.jsx  # Protected app layout
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   ├── TaskBoard.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── NotFound.jsx
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx        # All route definitions
│   │   │   └── ProtectedRoute.jsx   # Auth guard wrapper
│   │   ├── store/
│   │   │   ├── useAuthStore.js      # Auth state (Zustand)
│   │   │   ├── useThemeStore.js     # Dark/light mode state
│   │   │   └── useUIStore.js        # UI state (sidebar, modals)
│   │   ├── styles/
│   │   │   └── index.css            # Tailwind v4 theme + custom classes
│   │   ├── utils/
│   │   │   ├── constants.js         # App-wide constants
│   │   │   ├── formatDate.js        # Date formatting helpers
│   │   │   └── helpers.js           # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                         # Local env variables
│   ├── .env.production              # Production env variables
│   ├── vercel.json                  # Vercel SPA routing config
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                          # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                    # MongoDB Atlas connection
│   ├── controllers/
│   │   ├── authController.js        # Register, Login, GetMe
│   │   ├── projectController.js     # Project CRUD + members
│   │   ├── taskController.js        # Task CRUD + comments + status
│   │   ├── userController.js        # Get users, update profile
│   │   └── dashboardController.js   # Stats and activity
│   ├── middleware/
│   │   ├── auth.js                  # JWT verification middleware
│   │   ├── roleGuard.js             # Role-based access control
│   │   ├── errorHandler.js          # Global error handler
│   │   └── validate.js              # express-validator middleware
│   ├── models/
│   │   ├── User.js                  # User schema + bcrypt hooks
│   │   ├── Project.js               # Project schema
│   │   ├── Task.js                  # Task schema + comments
│   │   └── Activity.js              # Activity log schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── userRoutes.js
│   │   └── dashboardRoutes.js
│   ├── services/
│   │   ├── authService.js           # JWT token generation
│   │   └── dashboardService.js      # Stats aggregation logic
│   ├── utils/
│   │   ├── AppError.js              # Custom error class
│   │   └── asyncHandler.js          # Async try/catch wrapper
│   ├── validations/
│   │   ├── authValidation.js        # Register/login rules
│   │   ├── projectValidation.js     # Project input rules
│   │   └── taskValidation.js        # Task input rules
│   ├── .env                         # Local env variables
│   ├── .env.example                 # Env template
│   ├── server.js                    # App entry point
│   └── package.json
│
├── render.yaml                      # Render deployment config
├── .gitignore
└── README.md
```

---

## 📡 API Reference

**Base URL:** `https://team-task-manager-production.up.railway.app/api`

All protected routes require header:
```
Authorization: Bearer <jwt_token>
```

### 🔐 Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Register new user |
| `POST` | `/auth/login` | Public | Login and get JWT |
| `GET` | `/auth/me` | Protected | Get current user |

### 👥 Users
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/users` | Protected | Get all users |
| `PUT` | `/users/profile` | Protected | Update own profile |

### 📁 Projects
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/projects` | Protected | Get all projects |
| `POST` | `/projects` | Admin | Create project |
| `GET` | `/projects/:id` | Protected | Get single project |
| `PUT` | `/projects/:id` | Admin | Update project |
| `DELETE` | `/projects/:id` | Admin | Delete project |
| `POST` | `/projects/:id/members` | Admin | Add member |
| `DELETE` | `/projects/:id/members/:userId` | Admin | Remove member |

### ✅ Tasks
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/tasks` | Protected | Get tasks (role-filtered) |
| `POST` | `/tasks` | Protected | Create task |
| `GET` | `/tasks/:id` | Protected | Get single task |
| `PUT` | `/tasks/:id` | Protected | Update task |
| `DELETE` | `/tasks/:id` | Admin | Delete task |
| `PATCH` | `/tasks/:id/status` | Protected | Update task status |
| `POST` | `/tasks/:id/comments` | Protected | Add comment |

### 📊 Dashboard
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/dashboard/stats` | Protected | Get stats summary |
| `GET` | `/dashboard/activity` | Protected | Get activity feed |

### 🏥 Health
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/health` | Public | Server health check |

---

## 🔑 Environment Variables

### Backend — `server/.env`
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/team-task-manager?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173,http://localhost:5174
```

### Frontend — `client/.env`
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Frontend Production — `client/.env.production`
```env
VITE_API_BASE_URL=https://your-railway-url.up.railway.app/api
```

---

## 💻 Local Setup

### Prerequisites
- Node.js `v18+`
- npm `v9+`
- MongoDB Atlas account (free)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/snehsrivastava/Team-Task-Manager.git
cd Team-Task-Manager
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create `server/.env` file:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Start backend:
```bash
npm run dev
```
Backend runs at → `http://localhost:5000`

### 3. Setup Frontend
```bash
cd ../client
npm install
```

Create `client/.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```
Frontend runs at → `http://localhost:5173`

---

## 🚀 Deployment Guide

### Step 1 — MongoDB Atlas
1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create database user with password
3. Network Access → Allow `0.0.0.0/0`
4. Get connection string → `mongodb+srv://...`

### Step 2 — Deploy Backend on Railway
1. Go to [railway.app](https://railway.app) → Login with GitHub
2. Click **New Project** → **Deploy from GitHub repo**
3. Select `snehsrivastava/Team-Task-Manager`
4. Click on the service → **Settings** → set **Root Directory** to `server`
5. Go to **Variables** tab → add:
```
NODE_ENV      = production
PORT          = 5000
MONGO_URI     = your_atlas_uri
JWT_SECRET    = your_secret
JWT_EXPIRES_IN= 7d
CLIENT_URL    = https://your-app.vercel.app
```
6. Go to **Settings** → **Networking** → **Generate Domain**
7. Copy your Railway URL → `https://your-app.up.railway.app`

### Step 3 — Deploy Frontend on Vercel
1. Go to [vercel.com](https://vercel.com) → Import Project
2. Connect `snehsrivastava/Team-Task-Manager`
3. Configure:
   - Root Directory: `client`
   - Framework: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
```
VITE_API_BASE_URL = https://your-railway-url.up.railway.app/api
```
5. Deploy → copy your Vercel URL

### Step 4 — Connect Both
- Go back to Railway → update `CLIENT_URL` to your Vercel URL
- Railway auto-redeploys on variable change

### Step 5 — Verify
```bash
# Test backend health
curl https://your-railway-url.up.railway.app/api/health

# Expected response
{ "status": "ok", "env": "production" }
```

---

## 📸 Screenshots

> 🖼️ Screenshots will be added after final deployment

| Page | Preview |
|---|---|
| 🏠 Landing Page | *Coming soon* |
| 🔐 Login / Register | *Coming soon* |
| 📊 Dashboard | *Coming soon* |
| 🗂️ Kanban Board | *Coming soon* |
| 📁 Projects | *Coming soon* |
| 👥 Team | *Coming soon* |
| 🌙 Dark Mode | *Coming soon* |

---

## 🔮 Future Enhancements

- [ ] 🔔 Real-time notifications with Socket.io
- [ ] 📧 Email notifications for task assignments
- [ ] 📎 File attachments on tasks
- [ ] 📅 Calendar view for due dates
- [ ] 🏷️ Custom labels and tags on tasks
- [ ] 📈 Advanced analytics with export to PDF/CSV
- [ ] 🔍 Global search across projects and tasks
- [ ] 📱 Progressive Web App (PWA) support
- [ ] 🌍 Multi-language / i18n support
- [ ] 🔗 GitHub / Jira integration
- [ ] 🤖 AI-powered task priority suggestions
- [ ] 👤 Google OAuth login

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Clone** your fork
```bash
git clone https://github.com/your-username/Team-Task-Manager.git
```
3. **Create** a feature branch
```bash
git checkout -b feature/your-feature-name
```
4. **Make** your changes and commit
```bash
git commit -m "feat: add your feature description"
```
5. **Push** to your branch
```bash
git push origin feature/your-feature-name
```
6. Open a **Pull Request** against `main`

### Commit Convention
```
feat:     new feature
fix:      bug fix
docs:     documentation changes
style:    formatting, no logic change
refactor: code restructure
perf:     performance improvement
```

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License — free to use, modify, and distribute with attribution.
```

---

## 📬 Contact

<div align="center">

Built with ❤️ by **Sneh Ranjan**

[![GitHub](https://img.shields.io/badge/GitHub-snehsrivastava-181717?style=for-the-badge&logo=github)](https://github.com/snehsrivastava?tab=repositories)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sneh_Ranjan-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sneh-ranjan-a7143b27a/)
[![Email](https://img.shields.io/badge/Email-rsneh64@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rsneh64@gmail.com)

---

⭐ **If you found this project helpful, please give it a star!** ⭐

</div>
