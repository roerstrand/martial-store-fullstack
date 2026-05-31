# Apex Core — Martial Arts Store

Fullstack webshop for martial arts equipment.

## Stack

- **Client** — React + Vite + Bootstrap
- **Server** — Node.js + Express + MongoDB

## Project structure

```
martial-store-fullstack/
├── client/   # React frontend
└── server/   # Express backend
```

## Getting started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repo

```bash
git clone <repo-url>
cd martial-store-fullstack
```

### 2. Environment variables

Create `server/.env` — example values:

```env
MONGO_URI=mongodb://localhost:27017/apexcore   # or your Atlas connection string
JWT_SECRET=your_secret_here
PORT=5000                                       # optional, defaults to 5000
```

### 3. Install dependencies

```bash
# Root (concurrently)
npm install

# Server
cd server && npm install

# Client
cd ../client && npm install
```

### 4. Seed the database

```bash
cd server
node seeder.js
```

Creates two accounts and seeds all products and articles:

| Role     | Email                 | Password     |
|----------|-----------------------|--------------|
| Admin    | admin@apexcore.com    | admin1234    |
| Customer | customer@apexcore.com | customer1234 |

### 5. Run the app

From the root directory:

```bash
npm run dev
```

Starts both client and server concurrently. Client on `http://localhost:5173`, server on `http://localhost:5000`.

Projektanalays

Projektets struktur och arkitektur

Projektets struktur består av React klient och node/express backend. Backend har 4-lagers dataflöden med repos, services, controllers, routes för produkter, användare, kundvagn, ordrar, favoriter och artiklar (som ska skapa intresse för sporter/produkter). I backend finns global felhanterare (errorMiddleware) samt tokenvalidering som används i routes.

Valda tekniska lösningar

I frontend finns noterbart global state för inloggad användare som lösts genom custom React context AuthContext som wrappar hela app. AuthContext med tillagda värden från provider importeras genom custom hook useAuth där det behövs. Importerande komponent/fil får därav tillgång till global AuthContext (som återfinns i main.jsx). Ytterligare två stycken kontexter finns för favoriteprodukter och kundvagn. Kontexterna hanterar både gästanvändare genom localstorage och inloggade användares data sparas i backend.

JWT valdes som autentiseringsmetod och token sparas i localstorage samt hanteras av validateTokenHandler i klienten.

Utmaningar och lärdomar under projektets gång

Node/express kultur har ett mer "production ready first" perspektiv jämfört med .NET som fokuserar mer på skalbarhet direkt. Detta var både en lärdom och utmaning under projektets gång där man började skapa endpoints i controllers och testade dessa. Därefter flyttade man successivt logik till services och repositories efterhand. Det upplevdes därför mer flexibelt jämfört .NET där man kan testa sin logik i ett tidigare skede, men kunde emellertid upplevas som extra arbete när man senare flyttar logik som hade kunnat lägga i services/repos från början.

En annan lärdom är att ett React-projekt kan bli väldigt stort snabbt och kräver tydlig struktur och ordning för att kunna arbeta effektivt mot backend och respektive endpoints där man kan följa flöden. Namnkonvention blev väldigt viktigt allteftersom projektet växte och då valdes tydligt postfix av "Page" för faktiska sidor, samt indelning i jsx-filers kategorier (cart, products, auth etc).