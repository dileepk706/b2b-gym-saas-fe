🏋️ B2B Gym SaaS Frontend 🍰 Feature-Sliced Design

A modern B2B Gym management SaaS application built with React, TypeScript, Vite, React Router, TanStack React Query, and Zod, following the Feature-Sliced Design (FSD) architectural methodology.

## About the Project

This project is a comprehensive B2B gym management platform designed for large-scale gym operations and franchises. It provides a feature-rich interface for managing memberships, classes, trainers, schedules, and member interactions. Built with modern frontend technologies and enterprise-grade architecture patterns (FSD), it serves as a robust foundation for B2B SaaS applications.

## Tech Stack

- **React 18** — UI library
- **TypeScript** — Type-safe development
- **Vite 4** — Lightning-fast build tool
- **React Router 6** — Client-side routing
- **TanStack React Query 5** — Server state management
- **Zod 4** — Schema validation
- **Redux Toolkit & Redux Persist** — Client state management
- **Zustand** — Alternative lightweight state management
- **MUI (Material-UI) 5** — Component library
- **Emotion** — CSS-in-JS styling
- **Auth0** — Authentication & authorization
- **FullCalendar** — Calendar scheduling
- **Mapbox GL** — Map integration
- **Axios** — HTTP client
- **i18next** — Internationalization
- **ESLint & Prettier** — Code quality & formatting

## Project Structure

Following **Feature-Sliced Design (FSD)** principles:

```
src/
├── app/              — Application shell, root router, layout, providers, error handling
├── pages/            — Page-scoped route modules and page UI components
├── shared/           — Reusable API layer, utilities, hooks, router helpers, shared UI
├── features/         — Independent business features (if using full FSD structure)
└── entities/         — Domain entities and models (if using full FSD structure)
```

### Key Directories

- **src/app** — Application entry point, global layout, providers setup, error boundaries
- **src/pages** — Page components organized by routes
- **src/shared** — Shared utilities, API clients, common components, constants

## Architecture Notes

The codebase implements a **page-scoped Feature-Sliced Design** structure optimized for maintainability and scalability:

- **Route-based code splitting**: Page components and logic are lazy-loaded to minimize initial bundle
- **API integration**: Axios with centralized API configuration and error handling
- **State management**: Redux Toolkit for global state + React Query for server state + Zustand for lightweight state needs
- **Form validation**: Zod-based schema validation for type-safe form handling
- **Authentication**: Auth0 integration for secure user authentication
- **Error handling**: Global error boundaries and route-level error fallbacks
- **Styling**: Emotion CSS-in-JS with MUI theming for consistent UI

## Runtime Patterns

- **Lazy route loading**: Page components and loaders are loaded on-demand
- **Server state with React Query**: Efficient data fetching, caching, and synchronization
- **Client state with Redux**: Global state for auth, user preferences, and app configuration
- **Form handling**: React Hook Form with Zod validation
- **Optimistic UI**: Interactive actions use optimistic state updates for better UX
- **Error boundaries**: Comprehensive error handling with fallback UI
- **Protected routes**: Auth middleware protects authenticated-only flows
- **API abstraction**: Centralized Axios instance with request/response interceptors

## Development Workflow

- **Vite Dev Server** — Fast HMR for local development
- **ESLint & Prettier** — Automated code quality checks
- **TypeScript** — Strict type checking for type safety
- **Hot Module Replacement (HMR)** — Instant feedback during development

## Scripts

### Development
```bash
yarn dev              # Start development server
yarn build            # Build production bundle
yarn build-dev        # Build development bundle
yarn start            # Preview production build locally
```

### Code Quality
```bash
yarn lint             # Run ESLint
yarn lint:fix         # Fix linting issues automatically
yarn prettier         # Format code with Prettier
```

### Maintenance
```bash
yarn clear-all        # Remove all generated files and dependencies
yarn re-start         # Clean install and start development
yarn re-build         # Clean build for production
```

## Getting Started

### Prerequisites

- **Node.js** 18+ or **pnpm** / **yarn** package manager
- **Yarn** (recommended) or **npm**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dileepk706/b2b-gym-saas-fe.git
cd b2b-gym-saas-fe
```

2. Install dependencies:
```bash
yarn install
```

3. Configure environment variables:
Create a `.env.local` file in the project root:
```env
VITE_API_URL=http://localhost:3000/api
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
```

4. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## Development

### Running the Dev Server

```bash
yarn dev
```

The application supports **Hot Module Replacement (HMR)** for instant feedback during development.

### Building for Production

```bash
yarn build
```

This creates an optimized production bundle in the `dist/` directory.

### Linting and Formatting

```bash
# Check for linting issues
yarn lint

# Fix linting issues automatically
yarn lint:fix

# Format code with Prettier
yarn prettier
```

## Project Features

### Core Functionality
- 💪 **Membership Management** — Track and manage gym memberships
- 📅 **Class Scheduling** — Schedule and manage fitness classes
- 👥 **Member Portal** — Member dashboard and profile management
- 📊 **Analytics Dashboard** — Business insights and metrics
- 🏢 **Multi-branch Management** — Support for multiple gym locations
- 👨‍🏫 **Trainer Management** — Trainer profiles and schedules
- 💳 **Billing & Payments** — Integrated payment processing
- 🌍 **Multi-language Support** — i18n support for multiple languages
- 🗺️ **Location Mapping** — Mapbox integration for branch locations

### Technical Features
- 🔐 **Secure Authentication** — Auth0 integration
- 🚀 **High Performance** — Optimized with Vite and code splitting
- 📱 **Responsive Design** — Mobile-friendly UI with MUI
- ♿ **Accessibility** — WCAG compliant components
- 🌙 **Dark Mode Support** — Theme switching capability
- 📈 **Type Safety** — Full TypeScript coverage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Building for Deployment

```bash
yarn build
```

The optimized bundle is created in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options

- **Vercel** — Recommended for automatic deployments
- **Netlify** — Git-based deployment
- **AWS S3 + CloudFront** — AWS infrastructure
- **Docker** — Containerized deployment
- **GitHub Pages** — Static hosting

### Environment Configuration

Update environment variables for your deployment environment in `.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-production-client-id
```

## Performance

- **Initial Load**: Optimized with lazy loading and code splitting
- **Bundle Size**: Tree-shaking enabled for minimal bundle
- **Caching**: Intelligent cache strategies with React Query
- **Rendering**: React 18 with concurrent rendering support

## Contributing

Contributions are welcome! Please follow the established code style:

1. Use ESLint and Prettier configurations
2. Write TypeScript with strict mode enabled
3. Follow FSD principles when adding new features
4. Add tests for new functionality
5. Keep components small and focused

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for efficient gym management**
