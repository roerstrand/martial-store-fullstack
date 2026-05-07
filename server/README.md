Node

Node.js är runtime för javascript

SYFTE med BACKEND: 
- Hantera data
- API kommunikation
- Säkerhet (DATA, GDPR, Hashade lösenord)

Frontend <- Backend (SERVER) -> Databas

1. Client (thunderclient, postman, FRONTEND)
skickar request
POST /api/contacts
body: {name: "Hassan", "email": "...."}

2. server.js tar emot request => ROUTES

3. ROUTES matchar URL och metod => Anropar CONTROLLER (metoden)

4. CONTROLLER => createContact()
- Hämtar data från req.body
- validerar datan (inget saknas)
- Anropar DATABAS.create()

5. contactMODEL => mongoose
- validerar mot SCHEMA
- sparar i MongoDB

6. Mongoose objektet i vårt response

7. Controllern skickar JSON-svar till oss

8. Client får svar med ny kontakt + ID