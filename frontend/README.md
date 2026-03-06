<div align="center">

# 🌌 Nexus Dashboard

**The Modern Club Management Portal for AIT Pune**

[![React](https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A centralized, responsive, and beautifully animated frontend platform to manage, showcase, and track events for all technical clubs at Army Institute of Technology, Pune.

</div>

---

## 🔗 Related Repositories

- ⚙️ **Backend API**: [Nexus Backend Repository](https://github.com/MyTricks-code/sync-backend-api)

---

## ✨ Features

- ⚡️ **Blazing Fast**: Powered by Vite and React 18 for lighting-fast HMR and building.
- 🎨 **Modern Aesthetics**: Built with Tailwind CSS, delivering a clean, modern, and dark-mode compatible interface.
- 📱 **Fully Responsive**: Seamless user experience across mobile, tablet, and desktop devices.
- 🏫 **Interactive Club Hubs**: Dedicated, dynamic pages for clubs like OSS, GDG AIT Pune, and CP Club.
- 👥 **Role-Based Profiles**: Custom dashboards and profile management for different user designations.
- 🗓️ **Events Tracking**: Track past and upcoming activities, hackathons, and sessions.

---

## 🚀 Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

- **Node.js**: v20 or higher
- **npm** or **pnpm** package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` if available, or just create a `.env` file in the `frontend` root.
   ```ini
   VITE_API_URL=http://localhost:4000
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Open [http://localhost:5173](http://localhost:5173) to see the magic! 🪄

---

## 🏗️ Project Architecture

```text
frontend/
├── public/           # Static assets, logos, and raw visual media
└── src/
    ├── assets/       # Organized images and theme files
    ├── components/   # Modular, reusable React components
    ├── pages/        # Route-level views (Forms, Profile, Auth)
    ├── sections/     # Complex page sections (AboutUs, Hero, Footer)
    ├── context/      # React contexts for state management (Auth, Theme)
    ├── App.jsx       # Root router and layout wrapper
    └── main.jsx      # Application entry point
```

---

## 🛠️ Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Spins up the local development server |
| `npm run build` | Bundles the application for production |
| `npm run preview` | Serves the production bundle locally for preview |

---

<div align="center">
  <p>Built with ❤️ by GDG AIT Pune</p>
</div>
