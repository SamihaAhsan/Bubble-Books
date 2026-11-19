# Bubble Books

*Helping you find your next read, while someone else finds theirs.*

> [!NOTE]
> **Bubble Books is a book trading platform currently in development.**

Bubble Books helps readers exchange books with one another based on their reading interests, available listings, and preferences. Users can discover potential trading partners, browse available books, send and manage trade requests, and receive personalized trade recommendations.

At the core of the platform is a **dual-interest trade recommendation algorithm** designed to identify mutually beneficial exchanges. Rather than evaluating a listing from only one user's perspective, the system considers both traders' interests, available books, preferred genres, and location compatibility to rank potential trades.

**Current focus:** Building the trade recommendation engine and completing the end-to-end book trading workflow.

---
## Inspiration

I used to work part-time at a library. During that time we would get MANY patrons with their own books that they wanted to donate to the library. The hope was to recirculate the book to someone else so that someone new can embark on the adventure the book gave. Unfortunately very few of the books we were given would actually make its way into the library system due to a multitude of small factors such as a title being less popular or not having enough space at the library. Therefore many stories were lost and unable to make it back into circulation.

I've noticed this a lot with books. Stories are supposed to be passed on but physical things like books often have a one way path to the recycling plant. Someone buys a book and intends to give it to someone else somehow, but it's very hard to find the people that are actually interested in the story you want to pass on. Therefore I wanted to find a way so that these books are always able to find a new home in a convenient way.  

That's what inspired me to build Bubble Books: a platform that helps readers find new homes for the books they've already enjoyed while also finding their next reads! By connecting people through their reading interests and the books they have available to trade, I hope to make it easier for stories to keep moving from one reader to the next, rather than gathering dust on a shelf or ending up in a recycling bin.

## What Bubble Books Is Building

- Exchange books with other readers instead of buying every next read.
- Discover trade opportunities based on books a user owns and books they want.
- Find matches with shared interests and compatible locations.
- Build a personalized library and preference profile.
- Browse and search available books.
- Create, receive, and manage book trade requests.

## Project Status

| Area | Status |
| --- | --- |
| React/Vite frontend | **In development** |
| Spring Boot REST API | **In development** |
| Spring Security authentication | **Implemented** |
| PostgreSQL persistence | **Configured / in development** |
| Redis cache support | **Configured / in development** |
| Docker containerization | **Scaffolding in progress** |
| Book search and listings | **In development** |
| Trade requests | **In development** |
| Recommendation algorithm | **Active in-progress build** |

Redis cache support and Docker infrastructure are also under development. Redis is configured for `localhost:6379`, while the Docker setup currently includes a backend image scaffold and an incomplete Compose configuration.

---

## Active Recommendation-Algorithm Work

> [!WARNING]
> **The dual-interest trade-recommendation algorithm is actively being designed and built.**

The engine will evaluate both sides of a possible exchange:

1. **The book the reader wants**
   - Exact title match
   - Author match
   - Genre match

2. **The books and interests the other trader offers**
   - City/location feasibility
   - Exact titles they are interested in
   - Their selected preferred genres
   - Genres belonging to interested titles
   - Similar and adjacent genres

The current implementation is a prototype rather than a final ranking formula. It evaluates one potential trader at a time, awarding a score of up to 100 based on independent match factors. A complete exchange can ultimately be represented by combining the reciprocal values calculated from both users' perspectives. The handling of multiple matching books is still being refined.

| Match factor | Current weight |
| --- | ---: |
| City match | 45 prototype points |
| Exact interested-title match | 30 prototype points |
| Author match | 15 prototype points |
| User preferred-genre match | 5 prototype points |
| Interested-book genre match | 5 prototype points |

These weights and the city-heavy 45-point match are provisional and may change as the matching behavior and trade outcomes are tested. The scoring implementation in `ReccomendationAlgorithm.java` returns a score out of 100. `ReccomendationConstants.java` also defines a planned four-level match classification:

- Excellent match
- Good match
- Potential match
- Weak match

Adjacent genres are planned as a supporting signal, not every genre pair yet. The matching code is intended to grow toward more precise trade recommendations while remaining explainable and configurable.

---

## Tech Stack

### Frontend

- React 19
- Vite
- JavaScript
- Oxlint

### Backend

- Java 17
- Spring Boot
- Spring Web MVC
- Spring Security
- Spring Data JPA
- Spring Validation
- BCrypt password encoding

### Data and Infrastructure

- PostgreSQL
- **Redis** with Spring Data Redis and Spring Cache dependencies
- Gradle
- Docker

---

## Repository Layout

```text
Bubble-Books/
├── bubble-books/                 # React + Vite frontend
│   ├── src/
│   └── docker-compose.yml        # Container setup under construction
├── bubble-books-backend/         # Spring Boot backend
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── build.gradle
│   └── Dockerfile                # Backend container image scaffold
└── README.md
```

---

## Getting Started

### Prerequisites

- Java 17
- PostgreSQL
- Node.js and npm
- Redis, if testing Redis locally
- Docker Desktop, if using the container setup

### Backend Environment

The backend imports an optional `.env` file from `bubble-books-backend/.env`. Configure these Spring property variables:

| Variable | Purpose |
| --- | --- |
| `APP_NAME` | Spring application name |
| `DB_URL` | PostgreSQL JDBC URL |
| `DB_USERNAME` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_DRIVER` | JDBC driver class |
| `JPA_DDL_AUTO` | Hibernate DDL mode |
| `JPA_SHOW_SQL` | Enables SQL logging |

Example variable names only:

```properties
APP_NAME=bubblebooks
DB_URL=jdbc:postgresql://localhost:5432/bubble-books
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
DB_DRIVER=org.postgresql.Driver
JPA_DDL_AUTO=validate
JPA_SHOW_SQL=true
```

Do not commit populated `.env` files or database credentials.

### Run the Frontend

```powershell
cd bubble-books
npm install
npm run dev
```

The Vite development server is normally available at `http://localhost:5173`.

### Run the Backend

```powershell
cd bubble-books-backend
.\gradlew.bat bootRun
```

The backend currently runs on Spring Boot's default port, `8080`.

Build the backend with:

```powershell
cd bubble-books-backend
.\gradlew.bat build
```

Run the backend tests with:

```powershell
cd bubble-books-backend
.\gradlew.bat test
```

## Available Frontend Routes

| Path | Page |
| --- | --- |
| `/` | Landing page |
| `/login` | Login |
| `/signup` | Sign up |
| `/login/preferences` | Reader preferences |
| `/signup/posting` | Initial book posting |
| `/app` | Dashboard |

## Backend API Areas

The backend currently contains route groups for authentication, user information, books and genres, trade requests, and user postings.

Implemented or partially implemented endpoint areas include:

- `POST /signup`
- `POST /login`
- `POST /my-genres`
- `POST /my-books`
- `GET /all-books`
- `POST /interested-titles`
- `POST /new-request`
- `GET /myrequests`

Exact request and response schemas should be treated as under active development.

---

## Contributing

Bubble Books is being developed incrementally. Contributions and improvements are especially welcome around:

- Completing Redis caching
- Finalizing Docker Compose orchestration
- Improving trade recommendation scoring
- Completing adjacent-genre matching
- Connecting the frontend more completely to backend APIs
- Expanding tests and trade workflow edge cases
