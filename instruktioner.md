Kursnamn: Gränssnittsutveckling
Klass: SYSM9
Termin: VT26
Sida 1 av 9
E-HANDELSPROJEKT
INLEDNING
Bakgrundsbeskrivning
Du ska utveckla en modern e-handelsapplikation som simulerar
hur en verklig webbutik fungerar. E-handel är en central del av
dagens digitala samhälle, där företag säljer produkter och tjänster
via webben med krav på både god användarupplevelse och stabil
teknisk lösning.
I detta projekt får du arbeta med hela processen – från idé och
design till implementation. Du ska designa applikationen i Figma
och utveckla den med React. För högre betyg (VG) ska du även
bygga en egen backend med Node.js och Express, vilket innebär
att du skapar ett mer realistiskt system där frontend och backend
samverkar via ett API.
Målet är att du ska förstå hur en e-handelslösning är uppbyggd,
både ur ett användarperspektiv (UX/UI) och ett tekniskt
perspektiv (frontend och backend), samt utveckla färdigheter
som är direkt relevanta inom webbutveckling.
Varför ska ni utföra detta
arbete?
Denna uppgift är utformad för att ge er praktisk erfarenhet av hur
moderna webbapplikationer byggs i verkligheten. Som utvecklare
förväntas ni kunna kombinera flera kompetenser: design,
frontend-utveckling och i vissa fall även backend.
Genom detta projekt får ni träna på:
• Att planera och designa en applikation utifrån ett
användarperspektiv (UI/UX)
• Att bygga en strukturerad frontend med React
• Att arbeta med routing, state och datahantering
• Att skapa en responsiv applikation som fungerar på både
desktop och mobil
Sida 2 av 9
Vad ska ni leverera?
• (VG) Att utveckla en backend med Node.js och Express
och koppla den till frontend via ett API
Detta är färdigheter som är direkt kopplade till arbetslivet och
som efterfrågas av arbetsgivare inom webbutveckling.
Ni levererar er inlämning via GitHub eftersom det är
industristandard för att dela projekt och kod mellan utvecklare.
Om ni följer undervisningen och implementerar koden steg för
steg har ni goda förutsättningar att bli godkända på kursen. För
att uppnå betyget Väl Godkänt krävs att ni vidareutvecklar
applikationen med en Node.js backend, en genomtänkt design
och en reflekterande projektanalys som visar förståelse för både
teknik och arbetsprocess.
ER PROJEKTUPPGIFT
Vad ska ni göra? Jobba individuellt.
Ni ska utveckla en e-handelsapplikation från grunden.
Applikationen ska innehålla:
• En tydlig design (Figma)
• Ett fungerande användarflöde
• En frontend-applikation (React)
• (VG) En backend med Node.js + Express
Ni väljer själva tema (t.ex. mat, kläder, teknik), men applikationen ska
efterlikna en riktig e-handel där en användare kan gå från startsida till
genomfört köp.
För att få godkänt ska lösningen innehålla följande sidor:
Hem (landing page)
• Hero image (logo, bild, titel, slogan.).
• En enklare showcase av produkter (t.ex. “populära produkter”)
Produktlista
Sida 3 av 9
Hur ska ni lösa
uppgiften?
• Visa alla produkter
• Kunna filtrera på kategori (t.ex. kläder, teknik, mat etc.)
Beställning/varukorg
• Visa valda produkter
• Visa totalpris
• Kunna:
• Lägga till produkter
• Ta bort produkter
• Ändra kvantitet
Betalning
• Formulär för kunduppgifter:
o Namn
• Email
• Val av betalningsmetod (simulerad, t.ex. kort eller Swish)
Ev. användarregistrering och inloggning VG
Bekräftelse
• Tack för att du beställt, etc.
• Överblick över vad man beställt
• Informationssökning på internet.
• Research om bästa praxis för UI/UX (exempelvis studera konkurrenter
som Foodora, Uber Eats om man valt en matsida).
• Workshops/gruppdiskussioner.
• Prototypning i Figma.
• Kodimplementering och testning.
Sida 4 av 9
• Dokumentation och analys.
• AI-POLICY: Du får använda AI för lärande och som ett verktyg. Du får
INTE kopiera färdiga lösningar. Muntlig redovisning testar din
förståelse. Om du inte kan förklara din kod → kan inte godkännas.
Sida 5 av 9
Struktur för arbetet:
arbetsfördelning
och tidsplan
Fas 1 – Research och planering
• Läsa igenom kravspecifikationen noga.
• Samla inspiration för design och strukturera en första idé
om appens upplägg.
Fas 2 – Design i Figma
• Skapa wireframes och färdig design för desktop-versionen.
• (VG: Även skapa mobilanpassad version.)
Fas 3 – Utveckling av frontend
• Skapa projektstruktur i React.
• Implementera navigering (React Router).
• Bygga komponenter för hemsida, meny, varukorg och
betalning.
Fas 4 – Backend (json-server)
• Sätta upp json-server med rätt databasstruktur (produkter,
beställningar, användare).
• json-server ska användas för att tillhandahålla endpoints
för att hämta och skicka data, exempelvis GET /products,
POST /orders, och om ni gör inloggning: GET /users.
• (VG: Sätt upp en Node.js Backend med Express.js)
• Testa API-anrop från frontend.
Fas 5 – Funktionalitet och finjustering
• Implementera sök- och filterfunktionalitet.
• Implementera beställnings- och betalningsflöde.
Fas 6 – Testning
• Testa appens funktioner noggrant på både desktop och
mobil.
• Validera alla formulär.
Fas 7 – Dokumentation och inlämning
• Skriva README med
o Hur man kör projektet
o Kort beskrivning
o (VG) Beskrivning av Backend
o projektanalys och reflektion.
• Lägga in slutlig kod på GitHub.
Sida 6 av 9
Exempel struktur på repot
repo/
├── client/ (React)
├── server/ (endast för VG)
├── docs/
│ └── figma-länk + reflektion
└── README.md
Sida 7 av 9
INLÄMNING OCH REDOVISNING
Inlämning Inlämning sker via Newtons utbildningsportal senast 5/6.
Vid individuellt arbete ska dokumentet döpas enligt logiken:
Kursens namn Förnamn Efternamn Klass.
Redovisning • Redovisning sker muntligen på lektionen 4/6.
• Presentationstid: 10 minuter per grupp.
• Fokus: visa appens flöde, viktig kod och reflektioner.
• Instruktioner och grupper kring redovinsing kommer senare.
BEDÖMNING OCH ÅTERKOPPLING
Bedömning sker
mot följande
betygskriterier:
G-krav
För att klara uppgiften på G-nivå ska följande krav uppfyllas:
• En komplett design av appen, i desktop-variant, ska skapas med
hjälp av Figma.
· Appen ska vara gjord med React.
· React-Router ska användas för att navigera mellan de olika sidorna.
· En användare ska kunna se hela menyn.
· Menyn ska hämtas från en databas (json-server).
· Man kan dynamiskt kunna söka på olika typer av varor med knappar (ex.
Klädesbutik: kläder, skor, accessoarer osv. ) och att kunna ta bort filter för
att se allt.
• Användaren ska kunna lägga till och ta bort varor från sin
beställning (ändra kvantitet).
· Användaren ska kunna se sin beställning och gå vidare till betalningssidan.
· Betalningssidan ska ha ett formulär för att fylla i uppgifter för betalning
(namn, mobilnummer, email osv.).
· Möjliga betalningsalternativ ska vara kontokort och Swish (fake såklart).
· Appen ska vara responsiv och anpassad för både större och mindre
skärmar (dator och mobil åtminstone).
· Inkludera en välformulerad och insiktsfull projektanalys i inlämningen.
Denna analys bör vara cirka en A4-sida lång och innehålla en personlig
reflektion (inte Chat GPTs) över projektets arkitektur och uppbyggnad,
Sida 8 av 9
valda tekniska lösningar, och de utmaningar och lärdomar du stött på
under projektets gång. Beskriv varför vissa beslut togs, hur de påverkade
projektets utfall, och vilka insikter du fått som en framtida
systemutvecklare. Denna analys är din chans att demonstrera din förmåga
att inte bara utföra tekniskt arbete, men också att reflektera över och lära
av processen. Implementera denna analys i din README eller ladda upp
som pdf i repot.
VG-krav
För VG på uppgiften ska du inkludera följande krav:
· Användaren ska kunna välja att lägga till varor till en lista med favoriter.
· Användaren ska kunna (men måste inte för att använda appen) registrera
ett konto.
Backend (Node.js + Express):
Egen server
• API-endpoints (t.ex. products, orders)
• Data lagras och hämtas via API
• Validering av inkommande data
• Korrekt statuskoder (200, 400, 404, 500)
• använda JWT
Arkitektur:
• Separering av routes / logik
• Tydlig struktur i projektet
Integration:
• Frontend hämtar data från din backend
• Checkout skapar riktiga orders via API
• När appen startar ska man kunna logga in med ett användarnamn
"user" (små bokstäver) och lösenord "password" (små bokstäver).
· Appen har en elegant och genomtänkt design och användarupplevelse som
visar att stor omsorg har lagts på varje detalj och inte en ai genererad
design
· Skapa wireframes och färdig design för desktop-versionen samt
mobilanpassad version
Tips och trix
Sida 9 av 9
• Börja med att skapa en grundläggande design med Figma, och skissa
upp ditt "user flow" (hur en användare tar sig från sida till sida i
appen) innan du börjar koda.
• Fundera hur du vill strukturera din app med komponenter innan du
börjar koda, kanske redan när du gör din design med Figma?
· Om VG: Gör en Figma-design både för dator och mobil och fundera på hur
du kan få appen responsiv.
· Testa alla funktioner i appen noga innan du lämnar in den. Var t.ex. noga
med att validera användarens inmatning på betalningssidan (och
eventuellt registrerings samt inloggningssidan).
Återkoppling Du kommer att få återkoppling på Learnpoint, på aktuell kurs i fältet
feedback.

README-filen vill jag att ni lägger extra fokus på denna gång. Den ska vara så tydlig att någon som aldrig har sett projektet tidigare kan följa instruktionerna och starta applikationen utan problem.
 
Det jag vill se i README-filen är:
En kort beskrivning av hemsidan/applikationen
Steg för att starta frontend (t.ex. npm install, npm run dev osv.)
Standardanvändare (testkonto) med inloggningsuppgifter
Steg för att starta backend (t.ex. json-server..., npm run dev osv.)
En beskrivning av projektets mappstruktur