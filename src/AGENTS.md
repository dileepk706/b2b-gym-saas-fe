# Frontend Architecture Rules

Frontend uses:

- TypeScript
- MUI react
- Feature-Sliced Design (FSD)

Reference Architecture:
https://github.com/yurisldk/realworld-react-fsd

---

# FSD Layers

src/
app/
processes/
pages/
widgets/
features/
entities/
shared/

Dependency direction must always flow downward.

Allowed imports:
app -> all
pages -> widgets/features/entities/shared
widgets -> features/entities/shared
features -> entities/shared
entities -> shared
shared -> no upward imports

Never violate layer boundaries.

---

# Shared Layer Rules

shared/ contains:

- ui
- lib
- api
- config
- hooks
- constants
- types

shared must remain business-agnostic.

Never place domain logic inside shared.

---

# Entity Rules

entities represent core business models.

Examples:

- member
- trainer
- subscription
- attendance

Entities may contain:

- model
- api
- ui
- hooks

Entities must not depend on features.

---

# Feature Rules

Features represent user actions.

Examples:

- login
- check-in member
- renew subscription
- create workout plan

Feature folders:
index.ts
model/
ui/
api/
lib/

Features should remain isolated.

---

# Widget Rules

Widgets compose features/entities into UI sections.

Examples:

- attendance dashboard
- trainer table
- subscription overview

Widgets should avoid heavy business logic.

---

# App Layer Rules

app/ handles:

- providers
- routing
- layouts
- global styles

Avoid business logic inside app/.

---

# State Management

Preferred order:

1. server state
2. local state
3. global state only when necessary

Use:

- TanStack Query
- Zustand (minimal)
- React Hook Form

Avoid:

- Redux
- prop drilling across layers

---

# API Rules

- all API logic inside shared/api or entity api
- never fetch directly in components
- use typed API clients
- centralize error handling

---

# UI Rules

Use:

- MUI
- mobile-first layouts

Avoid:

- inline styles
- deeply nested JSX
- duplicated UI logic

---

# Component Rules

Prefer:

- small composable components
- explicit props
- container/presentation separation

Avoid:

- god components
- business logic in UI files

---

# Forms

Use:

- react-hook-form
- zod validation

Validation must exist:

- client side
- server side

---

# Naming Conventions

Features:
feature-name/

Components:
PascalCase.tsx

Hooks:
useSomething.ts

Utilities:
camelCase.ts

---

# Performance Rules

- lazy load heavy widgets
- memoize expensive renders
- avoid unnecessary re-renders

---

# Multi Tenant Rules

Every frontend request must include:

- tenant context
- gym context

Never cache cross-tenant data.

---

# AI Agent Expectations

Before creating new code:

- search for existing feature patterns
- reuse existing primitives
- preserve FSD boundaries

Never:

- bypass architecture
- move files between layers incorrectly
- create circular dependencies
