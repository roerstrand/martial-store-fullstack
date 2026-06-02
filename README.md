# Apex Core — Martial Arts Store

Apex Core är en fullstack-webshop för kampsportsutrustning. Besökare kan bläddra bland produkter, läsa artiklar om olika kampsporter, lägga till produkter i kundvagnen och spara favoriter. Inloggade användare kan slutföra köp och se sin orderhistorik via Mina sidor. Applikationen stöder både gäst- och inloggat läge, med data persisterad i MongoDB.

## Stack

- **Klient** — React + Vite + Bootstrap
- **Server** — Node.js + Express + MongoDB (Atlas)

---

## Projektstruktur

```
martial-store-fullstack/
├── client/                     # React-klient
│   └── src/
│       ├── components/         # Återanvändbara komponenter (Navbar, Hero, kundvagn, produkter, favoriter)
│       ├── context/            # Global state: AuthContext, CartContext, FavoriteContext
│       ├── data/               # Statisk data (artiklar)
│       ├── hooks/              # Custom hooks (useFetch, useInput)
│       ├── layouts/            # Sidlayouter (MainLayout, MinimalLayout)
│       ├── pages/              # Sidor (HomePage, ProductsPage, CartPage, auth-sidor m.fl.)
│       └── services/           # API-anrop mot backend (auth, cart, orders, products, favorites)
└── server/                     # Express-backend
    ├── config/                 # Databasanslutning (MongoDB)
    ├── controllers/            # Request-handlers per resurs
    ├── middleware/             # JWT-validering och global felhantering
    ├── models/                 # Mongoose-modeller (User, Product, Order m.fl.)
    ├── repositories/           # Databasfrågor (datalagret)
    ├── routes/                 # Express-routes per resurs
    ├── services/               # Affärslogik
    └── seeder.js               # Skript för att populera databasen med testdata
```

---

## Kom igång

### Förutsättningar

- Node.js v18+
- MongoDB Atlas-konto (eller lokal MongoDB)

### 1. Klona repot

```bash
git clone https://github.com/roerstrand/martial-store-fullstack.git
cd martial-store-fullstack
```

### 2. Miljövariabler

Skapa filen `server/.env` med följande innehåll (`.env`-filen bifogas även vid inlämning):

```env
PORT=3000
CLIENT_URL=http://localhost:5173
MONGO_URI=<din MongoDB Atlas-anslutningssträng>
ACCESS_TOKEN_SECRET=<valfri hemlig nyckel>
```

### 3. Installera beroenden

```bash
# Rotmapp (installerar concurrently)
npm install

# Server
cd server && npm install

# Klient
cd ../client && npm install
```

### 4. Seeda databasen

```bash
cd server
node seeder.js
```

Skapar konton och populerar alla produkter och artiklar:

> **OBS:** Inloggning sker med **användarnamn** (namn), inte e-post.

| Användarnamn | Lösenord     |
|--------------|--------------|
| Admin        | admin1234    |
| Customer     | customer1234 |
| user         | password     |

### 5. Starta applikationen

Från **rotmappen**:

```bash
npm run dev
```

Startar klient och server samtidigt via `concurrently`.

| Tjänst  | URL                     |
|---------|-------------------------|
| Klient  | http://localhost:5173   |
| Server  | http://localhost:3000   |

---

## Backend

Servern är byggd med Node.js och Express, med MongoDB som databas via Mongoose. Arkitekturen följer ett 4-lagersmönster: routes → controllers → services → repositories.

**API-endpoints:**

| Metod | Endpoint | Åtkomst | Beskrivning |
|-------|----------|---------|-------------|
| POST | `/api/users/register` | Publik | Registrera konto |
| POST | `/api/users/login` | Publik | Logga in, returnerar JWT |
| GET | `/api/users/current` | Privat | Hämta inloggad användare |
| GET | `/api/products` | Publik | Lista alla produkter |
| GET | `/api/products/:id` | Publik | Hämta enskild produkt |
| GET | `/api/orders/me` | Privat | Hämta egna ordrar |
| POST | `/api/orders` | Privat | Skapa order (checkout) |
| GET | `/api/favorites/me` | Privat | Hämta favoriter |
| POST | `/api/favorites/products/:id` | Privat | Lägg till favorit |
| DELETE | `/api/favorites/products/:id` | Privat | Ta bort favorit |
| GET | `/api/carts/me` | Privat | Hämta kundvagn |
| GET | `/api/articles` | Publik | Lista artiklar |

**Autentisering:** JWT (Bearer-token). Privata routes kräver en giltig token i `Authorization`-headern. Token löper ut efter 24 timmar.

**Validering:** Alla endpoints validerar obligatoriska fält och returnerar korrekta HTTP-statuskoder — `200`, `201`, `400`, `404`, `500` — via en global `errorMiddleware`.

---

## Projektanalys

### Projektets struktur och arkitektur

Projektets struktur består av React-klient och Node/Express-backend. Backend har 4-lagers dataflöden med repos, services, controllers och routes för produkter, användare, kundvagn, ordrar, favoriter och artiklar (som ska skapa intresse för sporter/produkter). I backend finns global felhanterare (errorMiddleware) samt tokenvalidering som används i routes.

### Valda tekniska lösningar

I frontend finns noterbart global state för inloggad användare som lösts genom custom React context — `AuthContext` — som wrappar hela appen. AuthContext med tillagda värden från provider importeras genom custom hook `useAuth` där det behövs. Importerande komponent/fil får därav tillgång till global AuthContext (som återfinns i `main.jsx`). Ytterligare två kontexter finns för favoritprodukter och kundvagn. Kontexterna hanterar både gästanvändare genom localStorage och inloggade användares data sparas i backend.

JWT valdes som autentiseringsmetod och token sparas i localStorage samt hanteras av `validateTokenHandler` i klienten.

### Utmaningar och lärdomar under projektets gång

Node/Express-kulturen har ett mer "production ready first"-perspektiv jämfört med .NET som fokuserar mer på skalbarhet direkt. Detta var både en lärdom och utmaning under projektets gång där man började skapa endpoints i controllers och testade dessa. Därefter flyttades successivt logik till services och repositories. Det upplevdes mer flexibelt jämfört med .NET där man kan testa sin logik i ett tidigare skede, men kunde emellertid upplevas som extra arbete när man senare flyttar logik som hade kunnat läggas i services/repos från början.

En annan lärdom är att ett React-projekt kan bli väldigt stort snabbt och kräver tydlig struktur och ordning för att arbeta effektivt mot backend och respektive endpoints. Namnkonvention blev väldigt viktigt allteftersom projektet växte — tydligt postfix "Page" för faktiska sidor samt indelning i JSX-filers kategorier (cart, products, auth osv.).
