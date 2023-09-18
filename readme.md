Stripe Payment App (Swedish Translation)

En enkel webbapplikation som gör det möjligt för användare att göra betalningar med Stripe. Applikationen innehåller en grundläggande header med en betalningsknapp. När den klickas på kommer betalningsprocessen via Stripe att påbörjas.

Funktioner:

Integration med Stripe för betalningshantering.
Använder Stripe webhooks för att hantera betalningshändelser och lagra orderinformation.
Ger användarfeedback för utgångna sessioner och inloggningskrav.
Förutsättningar:
Se till att du har följande installerat på din dator:

Node.js och npm
Installation & Konfiguration:

Klona Repositoryt
Installera Beroenden:
Navigera till serverkatalogen och installera nödvändiga paket.
Beroenden:

Klient:

autoprefixer (^10.4.15): Hjälper till med att bearbeta CSS.
axios (^1.5.0): Används för att göra HTTP-förfrågningar.
postcss (^8.4.29): Ett verktyg för att omvandla CSS med JavaScript.
react (^18.2.0) & react-dom (^18.2.0): Huvudbibliotek för att bygga användargränssnittet.
react-router-dom (^6.15.0): Möjliggör routing och navigation i applikationen.
tailwindcss (^3.3.3): Ett CSS-ramverk för att snabbt bygga anpassade användargränssnitt.
Server:

bcrypt (^5.1.1): Används för att hash lösenord och garantera säkerhet.
cookie-parser (^1.4.6): Middleware för att tolka cookie headers.
cors (^2.8.5): Aktiverar CORS (Cross-Origin Resource Sharing) för servern.
dotenv (^16.3.1): Laddar miljövariabler från en .env-fil.
express (^4.18.2): Webbapplikationsramverk för att bygga API:er.
jsonwebtoken (^9.0.2): Gör det möjligt med autentisering med hjälp av JWT (JSON Web Tokens).
stripe (^13.4.0): Node-bibliotek för Stripe API, för betalningshantering.
Kör Appen:

I serverkatalogen, kör följande kommando: npm start
Detta startar servern.

Köra Klienten:
När du har installerat alla beroenden kan du starta klientapplikationen med följande kommando:
cd Client
npm run dev
Öppna en webbläsare och navigera till http://localhost:5173 för att komma åt appen.

Webhooks:
Denna applikation lyssnar på Stripe webhooks för händelser som framgångsrika betalningar. Konfigurera Stripe CLI för att vidarebefordra händelser till localhost med kommandot: stripe listen --forward-to localhost:3000/webhook.
När en betalningshändelse inträffar hanterar appen den på lämpligt sätt och kan lagra relevanta orderuppgifter.

Användning:
Initiera Betalning:
Klicka på "Checkout!"-knappen i headern för att starta betalningsprocessen.

Hantera Betalning:
När du klickar på utcheckningsknappen kommer applikationen att kommunicera med Stripe API för att skapa en betalningssession och omdirigera användaren till Stripe's betalningssida.

Logga in/Registrera:
Användare måste vara inloggade för att slutföra sin utcheckning. Om en användare inte har ett befintligt konto behöver de registrera sig med en giltig e-postadress. Validering på klientsidan kontrollerar om det angivna användarnamnet är i formatet av en e-post. Om det inte är det får användaren ett meddelande som indikerar att en giltig e-post krävs för att fortsätta.

Sessionsutgång:
Om en användares session har gått ut eller användaren inte är inloggad kommer de att bli varnade och omdirigerade till inloggningssidan.

Varukorgshantering:
Applikationen säkerställer att användarens varukorgsdata bevaras även om de inte är inloggade. Detta uppnås genom att lagra varukorgens innehåll i sessionStorage. När en användare återbesöker eller loggar in hämtas deras tidigare varukorgstillstånd och visas, vilket förbättrar användarupplevelsen.