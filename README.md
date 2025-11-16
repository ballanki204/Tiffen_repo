# Tiffin Admin Hub

A modern, responsive admin dashboard for managing tiffin services, built with React, TypeScript, and ShadCN UI. This application provides comprehensive tools for administrators to oversee outlets, items, vendors, and generate detailed reports.

## Features

- **Dashboard**: Overview of key metrics and performance indicators
- **Outlets Management**: Manage multiple tiffin service locations
- **Items Management**: Handle menu items and inventory
- **Purchase Vendors**: Manage supplier relationships and purchases
- **Reports**: Comprehensive reporting suite including:
  - P&L Statement
  - Daily Sales Report
  - Consumption vs Sales Analysis
  - Wastage Report
  - Food Cost Analysis
- **Admin Profile**: User profile management and settings
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Clean, intuitive interface using ShadCN UI components

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI (Radix UI primitives)
- **Routing**: React Router DOM
- **State Management**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns
- **Package Manager**: npm/bun

## Prerequisites

- Node.js (version 18 or higher)
- npm or bun package manager

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd tiffin-admin-hub-main
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Login**: Access the application through the login page
2. **Dashboard**: View key metrics and navigate to different sections
3. **Manage Outlets**: Add, edit, or remove service locations
4. **Manage Items**: Update menu items and inventory levels
5. **Vendor Management**: Handle supplier information and purchase orders
6. **Reports**: Generate and view various business reports
7. **Profile**: Update admin settings and preferences

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (AdminLayout, SideNav, TopNav)
│   ├── ui/              # Reusable UI components (buttons, forms, etc.)
│   └── NavLink.jsx      # Navigation link component
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
├── pages/
│   ├── admin/           # Admin pages (Dashboard, Items, Outlets, etc.)
│   ├── admin/reports/   # Report pages
│   ├── Login.jsx        # Login page
│   ├── NotFound.jsx     # 404 page
│   └── Index.jsx        # Home/index page
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
