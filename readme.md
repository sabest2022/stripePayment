
English version:
Stripe Payment App
A simple web application that allows users to make payments using Stripe. The application includes a basic header with a checkout button, which upon being clicked will initiate the Stripe payment process.

Features:
Integration with Stripe for handling payments.
Uses Stripe webhooks to manage payment events and store order details.
Provides user feedback for expired sessions and login requirements.

Prerequisites:
Ensure you have the following installed on your machine:
Node.js and npm
Installation & Setup:
Clone the Repository

Install Dependencies:
Navigate to the server directory and install the required packages.

Dependencies:

Client:
autoprefixer (^10.4.15): Helps in processing CSS.
axios (^1.5.0): Used for making HTTP requests.
postcss (^8.4.29): A tool for transforming CSS with JavaScript.
react (^18.2.0) & react-dom (^18.2.0): Core libraries for building the user interface.
react-router-dom (^6.15.0): Enables routing and navigation in the application.
tailwindcss (^3.3.3): A utility-first CSS framework for rapidly building custom user interfaces.

Server:
bcrypt (^5.1.1): Used for hashing passwords and ensuring security.
cookie-parser (^1.4.6): Middleware for parsing cookie headers.
cors (^2.8.5): Enables CORS (Cross-Origin Resource Sharing) for the server.
dotenv (^16.3.1): Loads environment variables from a .env file.
express (^4.18.2): Web application framework for building APIs.
jsonwebtoken (^9.0.2): Allows authentication using JWT (JSON Web Tokens).
stripe (^13.4.0): Node library for Stripe API, handling payments.

bash
Copy code:
cd server
npm install
Environment Variables:
Set up your environment variables. You'll need to create a .env file in your server directory and configure it with your Stripe API keys and any other necessary information.

Example .env configuration:

makefile
Copy code:
STRIPE_SECRET_KEY=your_stripe_secret_key
ENDPOINT_SECRET=your_endpoint_secret_key
JWT_SECRET=your_jwt_secret
Replace your_stripe_secret_key, your_jwt_secret and your_stripe_endpoint_secret_key with your actual Stripe and JWT keys.

Running the App:
In the server directory, run the following command:bash
Copy code: 
npm start
This will start the server.

Running the Client:
Once you've installed all the dependencies, you can start the client-side application using the following command:
cd Client
npm run dev

Open a web browser and navigate to http://localhost:5173 to access the app.

Webhooks:
This application listens to Stripe webhooks for events such as successful payments. Set up Stripe CLI to forward events to localhost: stripe listen --forward-to localhost:3000/webhook   
When a payment event occurs, the app handles it accordingly and may store relevant order details.

Usage:
Initiate Payment:
Click on the Checkout! button in the header to initiate the payment process.

Handle Payment:
Upon clicking the checkout button, the application will communicate with the Stripe API to create a payment session and redirect the user to the Stripe payment page.

Sign in/Register:
Users must be logged in to finalize their checkout. If a user doesn't have an existing account, they need to register with a valid email address. Client-side validation checks if the entered username is in the format of an email. If it isn't, the user will receive a prompt indicating that a valid email is required to proceed.

Session Expiry:
If a user's session has expired or the user is not logged in, they will be alerted and redirected to the login page.

Cart Management
The application ensures that user's cart data is preserved even if they are not logged in. We achieve this by storing cart content in the sessionStorage. When a user revisits or logs in, their previous cart state is retrieved and displayed, enhancing user experience.



Swedish version: 
Stripe Payment App 

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
- Integration med Stripe för betalningshantering.
- Använder Stripe webhooks för att hantera betalningshändelser och lagra orderinformation.
- Ger användarfeedback för utgångna sessioner och inloggningskrav.

Förutsättningar:
Se till att du har följande installerat på din dator:
- Node.js och npm

Installation & Konfiguration:
- Klona Repositoryt
- Installera Beroenden:
Navigera till serverkatalogen och installera nödvändiga paket.


Kör Appen:
- I serverkatalogen, kör följande kommando: `npm start`
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
