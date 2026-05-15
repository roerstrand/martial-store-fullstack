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

```bash
# Client
cd client && npm install && npm run dev

# Server
cd server && npm install && node server.js
```

Projektanalays

Projektets struktur och arkitektur

Valda tekniska lösningar

Utmaningar och lärdomar under projektets gång

Node/express kultur har ett mer "production ready first" perspektiv jämfört med .NET som fokuserar mer på skalbarhet direkt. Detta var både en lärdom och utmaning under projektets gång där man började skapa endpoints i controllers och testade dessa. Därefter flyttade man successivt logik till services och repositories efterhand. Det upplevdes därför mer flexibelt jämfört .NET där man kan testa sin logik i ett tidigare skede, men kunde emellertid upplevas som extra arbete när man senare flyttar logik som hade kunnat lägga i services/repos från början.