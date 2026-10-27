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
