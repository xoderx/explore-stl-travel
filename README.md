# Cloudflare Workers React Full-Stack Template

[![[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/xoderx/explore-stl-travel)]](https://deploy.workers.cloudflare.com)

A production-ready full-stack starter template for building applications with Cloudflare Workers and React. Features a modern UI with shadcn/ui, Tailwind CSS, and Durable Objects for scalable, SQLite-backed data persistence. Includes users, chat boards, and real-time messaging out of the box.

## ✨ Key Features

- **Full-Stack TypeScript**: Shared types between frontend and backend for type-safe APIs.
- **Durable Objects**: One instance per entity (Users, Chats) with automatic indexing and pagination.
- **Modern UI**: Responsive design with Tailwind CSS, shadcn/ui components, dark/light themes, and animations.
- **React Ecosystem**: TanStack Query for data fetching, React Router, Framer Motion, and more.
- **API-First Backend**: Hono-based routing with CORS, logging, and error handling.
- **Hot Reload**: Vite-powered development with Workers integration.
- **Production-Ready**: Error boundaries, client error reporting, optimistic updates, and deployment scripts.
- **Zero Config Deployment**: One-command deploy to Cloudflare Workers.

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query, React Router, Zustand, Framer Motion, Sonner |
| **Backend** | Cloudflare Workers, Hono, Durable Objects (SQLite) |
| **UI/UX** | Lucide Icons, Tailwind Animate, Glassmorphism effects |
| **Dev Tools** | Bun, ESLint, Wrangler, Cloudflare Vite Plugin |
| **Data** | Shared types, Indexed entities, Pagination |

## 🚀 Quick Start

1. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd <project-name>
   bun install
   ```

2. **Run Locally**:
   ```bash
   bun run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or `$PORT`).

3. **Build for Production**:
   ```bash
   bun run build
   ```

## 🧪 Usage Examples

### Frontend Data Fetching
Uses `api-client.ts` wrapper with TanStack Query:

```tsx
import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

const users = useQuery({
  queryKey: ['users'],
  queryFn: () => api<User[]>('/api/users'),
});
```

### API Endpoints (Worker Routes)
Extend `worker/user-routes.ts`:

```
GET    /api/users              # List users (paginated)
POST   /api/users              # Create user { name: string }
DELETE /api/users/:id          # Delete user

GET    /api/chats              # List chats
POST   /api/chats              # Create chat { title: string }
DELETE /api/chats/:id          # Delete chat

GET    /api/chats/:chatId/messages  # List messages
POST   /api/chats/:chatId/messages  # Send { userId: string, text: string }
```

### Custom Entities
Extend `worker/entities.ts`:

```ts
export class MyEntity extends IndexedEntity<MyState> {
  static readonly entityName = 'myentity';
  static readonly indexName = 'myentities';
  // ...
}
```

Seed data auto-loads on first list. Use `MyEntity.create(env, state)`, `MyEntity.list(env)`, etc.

## 🔧 Development

- **Type Generation**: `bun run cf-typegen` (updates `Env` types).
- **Lint**: `bun run lint`.
- **Preview**: `bun run preview`.
- **Sidebar Layout**: Wrap pages in `AppLayout` from `@/components/layout/AppLayout`.
- **Theme**: Toggle with `useTheme()` hook.
- **Error Reporting**: Auto-sends client errors to `/api/client-errors`.

Customize `src/pages/HomePage.tsx` as your app homepage. Add routes to `src/main.tsx`.

## ☁️ Deployment

Deploy to Cloudflare Workers in one command:

```bash
bun run deploy
```

Or use the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/commands/#deploy):

```bash
bun install -g wrangler
wrangler deploy
```

**[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/xoderx/explore-stl-travel)**

Configuration in `wrangler.jsonc`:
- Assets served as SPA.
- Durable Objects bound as `GlobalDurableObject`.
- Automatic migrations.

### Environment Variables
Set via `wrangler.toml` or Dashboard:
```
[vars]
API_KEY = "your-key"
```

## 📚 Project Structure

```
├── src/              # React app (Vite)
├── worker/           # Cloudflare Workers backend
│   ├── entities.ts   # Durable Object entities
│   └── user-routes.ts # Custom API routes
├── shared/           # Shared types & mocks
├── tailwind.config.js # UI theming
└── wrangler.jsonc    # Workers config
```

## 🤝 Contributing

1. Fork & clone.
2. `bun install`.
3. Make changes.
4. `bun run lint`.
5. Submit PR.

## 📄 License

MIT. See [LICENSE](LICENSE) for details.

Built with ❤️ for Cloudflare Workers. Questions? [Cloudflare Docs](https://developers.cloudflare.com/workers/).