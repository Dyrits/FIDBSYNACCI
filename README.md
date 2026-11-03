# Fidbsynacci

A full-stack refresher project using a modern TypeScript stack (Deno with Hono, and React), focused on implementing and containerizing multiple services.

## About The Project

A containerized multi-service application: a Deno + Hono API backed by PostgreSQL and Redis, a Deno worker consuming Redis, and a React client, all orchestrated with Docker Compose behind an nginx reverse proxy.

### Built With

- Deno + Hono (API and worker)
- PostgreSQL + Redis (data and messaging)
- React + Vite (client)
- Docker Compose + nginx

## Getting Started

### Prerequisites

- Docker and Docker Compose
- A `.env` file at the repository root (consumed by the postgres and api services)

### Installation

Build and launch the whole stack:

```sh
docker compose up --build
```

Compose watch is configured for development: changes under `api/src`, `worker/src` and `client/src` sync (and restart where needed) inside the running containers.

The nginx service exposes the application on http://localhost (port 80).

## Project structure

| Service | Role |
| --- | --- |
| `api/` | Deno + Hono API (`deno task watch`), PostgreSQL and Redis clients |
| `worker/` | Deno worker consuming Redis |
| `client/` | React + Vite front end |
| `nginx/` | Reverse proxy serving the stack on port 80 |
| `compose.yml` | Service orchestration, including postgres and redis |

## License

No license file is present in this repository.

## Contact

Dyrits - https://github.com/Dyrits

## Client dependency verification

The client uses Deno's npm compatibility and `client/deno.lock`, not an npm lockfile. With Deno 2.9.8, run `deno install --frozen-lockfile`, `deno task build`, `deno task lint`, and `deno audit` from `client/`. Explicit `nodeModulesDir: auto` supplies the local dependency tree used by TypeScript, Vite, and ESLint. The client Dockerfile pins this tested Deno version and installs the committed lockfile; the Docker image itself has not been built in this verification environment.

The November 3, 2026 client refresh pairs Vite 8.3.5 with plugin-react 6.2.1, Axios 1.21.0, and compatible lint/type dependency updates. Deno audit findings fell from 110 (1 critical, 47 high) in the original client lockfile to 1 moderate minimatch advisory, with distinct advisory IDs falling from 98 to 1 and no new advisory IDs. This is a partial audit result for the client only, not a security assessment of the whole stack.

The production client build, lint, frozen clean install, and browser rendering/submission/reload against a fixture API were checked. The API, worker, PostgreSQL, Redis, nginx, and full Docker Compose stack were not run or changed. The client still sends index values as strings, matching its existing behavior. No deployment or database write was performed.
