# TaskFlow — Team Task Manager

A production-ready team task management application built with the MERN stack. Features a modern SaaS dashboard UI with Kanban board, project management, role-based access control, and real-time feeling interactions.

![TaskFlow](https://img.shields.io/badge/TaskFlow-v1.0.0-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)

## ✨ Features

### Core
- **JWT Authentication** — Secure signup, login, and protected routes
- **Role-Based Access** — Admin and Member roles with different permissions
- **Project Management** — Create, edit, delete projects. Add/remove team members
- **Kanban Task Board** — Drag-and-drop tasks between To Do, In Progress, In Review, and Done
- **Dashboard Analytics** — Stats cards with animated counters, donut chart, activity feed
- **Team Management** — View all team members with roles and contact info
- **Comments** — Add comments to tasks for team communication
- **Activity Logging** — Track all actions across the platform

### UI/UX
- **Dark/Light Mode** — Theme toggle with persistent preference
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Framer Motion Animations** — Page transitions, stagger effects, layout animations
- **Skeleton Loaders** — Loading states for all data-dependent views
- **Toast Notifications** — Feedback for all user actions
- **Glassmorphism** — Modern frosted glass effects on sidebar and navbar
- **Empty States** — Beautiful placeholder views when no data exists

## 🛠 Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS 3
- Framer Motion
- Zustand (state management)
- React Router DOM v6
- React Hook Form
- Recharts
- @dnd-kit (drag and drop)
- Axios
- Lucide React Icons
- React Hot Toast

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- morgan

## 📁 Project Structure

```
Team Task Manager/
├── client/                   # React frontend
│   ├── src/
│   │   ├── api/              # Axios API service layer
│   │   ├── animations/       # Framer Motion presets
│   │   ├── components/
│   │   │   ├── common/       # Button, Input, Modal, Avatar, etc.
│   │   │   ├── dashboard/    # StatCard, ProgressChart, RecentActivity
│   │   │   ├── projects/     # ProjectCard, ProjectForm
│   │   │   ├── tasks/        # KanbanBoard, TaskCard, TaskForm, TaskDetail
│   │   │   └── ui/           # Sidebar, Navbar, ThemeToggle, SearchBar
│   │   ├── hooks/            # useDebounce, useClickOutside, useMediaQuery
│   │   ├── layouts/          # DashboardLayout, AuthLayout
│   │   ├── pages/            # All page components
│   │   ├── routes/           # AppRoutes, ProtectedRoute
│   │   ├── store/            # Zustand stores
│   │   ├── styles/           # Global CSS
│   │   └── utils/            # Helpers, constants, date formatting
│   └── ...
├── server/                   # Express backend
│   ├── config/               # Database connection
│   ├── controllers/          # Route handlers
│   ├── middleware/            # Auth, error handler, validation
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── services/             # Business logic
│   ├── utils/                # AppError, asyncHandler
│   ├── validations/          # express-validator rules
│   └── server.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd "Team Task Manager"
```

### 2. Backend Setup
```bash
cd server
npm install

# Create .env file (copy from .env.example)
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

#### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/team-task-manager
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

#### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List projects |
| POST | `/api/projects` | Create project (admin) |
| GET | `/api/projects/:id` | Get project |
| PUT | `/api/projects/:id` | Update project (admin) |
| DELETE | `/api/projects/:id` | Delete project (admin) |
| POST | `/api/projects/:id/members` | Add member (admin) |
| DELETE | `/api/projects/:id/members/:userId` | Remove member (admin) |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List tasks |
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks/:id` | Get task |
| PUT | `/api/tasks/:id` | Update task |
| PATCH | `/api/tasks/:id/status` | Change status |
| DELETE | `/api/tasks/:id` | Delete task (admin) |
| POST | `/api/tasks/:id/comments` | Add comment |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Get stats |
| GET | `/api/dashboard/activity` | Get activity feed |

## 🌐 Deployment

### MongoDB Atlas
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a database user
3. Whitelist `0.0.0.0/0` under Network Access
4. Get your connection string

### Backend → Render
1. Push code to GitHub
2. Create a new Web Service on [render.com](https://render.com)
3. Connect your repo, set root directory to `server`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables from `.env`

### Frontend → Vercel
1. Import project on [vercel.com](https://vercel.com)
2. Set root directory to `client`
3. Framework preset: Vite
4. Build: `npm run build`, output: `dist`
5. Add env: `VITE_API_URL=https://your-backend.onrender.com/api`

## 📄 License

MIT
