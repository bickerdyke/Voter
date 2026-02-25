**Voter**

Small web application for creating and running simple named voting sessions (deployed at https://vote.kurpfaelzer-bierclub.de).

Overview

- Create voting sessions that contain multiple items/positions.
- Voters submit a rating for each position; results and averages are shown on a results overview.
- Sessions can be prepared in advance and shared with voters via per-item links (QR codes are supported).
- No user account is required for basic use — sessions are accessed by ID and optional encoded voter identifiers.

Live demo

- Production instance: https://vote.kurpfaelzer-bierclub.de

Key features

- Multiple voting modes (score, school grades, thumbs, ...).
- Session sharing with per-item links and QR-code generation.
- Anonymous or token-based Firebase authentication for backend access.
- Internationalization support (translations managed under `src/lang`).

Tech stack

- Vue 3 + Vuex + Vue Router
- Vite build tool
- Firebase Realtime Database (client-side REST calls and token-based auth)
- Common UI libs: Bootstrap, FontAwesome

Getting started (development)

Prerequisites

- Node.js (recommended v18+)
- npm or compatible package manager

Install and run

1. Open a shell and change to the app folder:

	```bash
	cd voter_app
	npm install
	npm run dev
	```

2. Build for production:

	```bash
	npm run build
	npm run serve   # preview built site
	```

Useful npm scripts are defined in `voter_app/package.json` (dev, build, serve, lint, test:unit, translation commands).

Environment / configuration

- The app expects a Firebase project id and an API key to access Authentication and the Realtime DB. These are passed as Vite env variables:

- `VITE_FIREBASE_PROJECTID` — your Firebase project id
- `VITE_FIREBASE_APIKEY` — API key (the app expects a base32-encoded string; see `src/config/firebase.js`)

Set them in a `.env.local` file inside `voter_app` or export them in your environment before running Vite. See `voter_app/src/config/firebase.js` for how these are used: [voter_app/src/config/firebase.js](voter_app/src/config/firebase.js#L1-L20).

Security notes

- This client-side app uses a Firebase API key (decoded on the client) and writes to the Realtime DB. The repository contains warnings about limiting stored data and hardening server-side validation. Consider adding server-side validation, authentication rules and cleanup functions to avoid abuse.

Testing and translations

- Unit tests: `npm run test:unit` (Vite test runner)
- Linting: `npm run lint`
- Translation helpers: `npm run translation:report` and `npm run translation:update`

Where to look in the code

- Main entry: [voter_app/src/main.js](voter_app/src/main.js#L1-L40)
- Router: [voter_app/src/router/index.js](voter_app/src/router/index.js#L1-L40)
- Store modules (auth, voting, search): `voter_app/src/store/modules`
- Firebase config and endpoints: [voter_app/src/config/firebase.js](voter_app/src/config/firebase.js#L1-L20)
Contributing

- Fork and open a pull request. Run and test locally using the scripts above. Keep translations in `src/lang` in sync using the translation scripts.

License

- No license file is included in this repository. Add a `LICENSE` file if you want to make the terms explicit.

Contact / more info

- Project website: https://vote.kurpfaelzer-bierclub.de
- For implementation details, check the source under `voter_app/src`.


# Voter

Kleines Web-Tool für gemeinsame Bewertungen.

Voter ermöglicht das Anlegen von Bewertungs-Sessions mit namentlicher Abstimmung. In jeder Session können mehrere Positionen zur Abstimmung kommen. Stimmberechtigte vergeben für jede Position eine Bewertung. Auf einer Übersichtsseite werden die Ergebnisse angezeigt, sowohl die einzelnen abgegebenen Bewertungen als auch ein Gesamtergebnis (Durchschnitt)

Die Abstimmungen können vorab angelegt werden und die Stimmberechtigten können über vorbereitete Links direkt zu den einzelnen Positionen gelangen (z.B. QR-Codes). Der Name der Stimmberechtigten wird über den Link verschlüsselt mit übergeben.

Es soll kein Benutzerkonto zur Nutzung nötig sein. Jede Session bekommt beim Anlegen eine ID über die der Zugriff möglich ist.

## Benötigte Elemente

- Startseite
- Abstimmungslinks (druckbar)
- Impressum/About/Contact
- Wartungsseite (mit script zum aktivieren)
- NotFoundPage überarbeiten oder löschen

## Benötigte Features

- Begrenzte Lebenszeit der Abstimmsessions (Älter als einen Monat wird nicht geladen)
- Backend-Anbindung

## Wunschfeatures

- verschiedene Bewertungssysteme (Schulnoten, Punkte 1-10, Dafür/Dagegen/Enthaltung)
- CSV-Download der Ergebnisse
- verstecken der Ergebnisse bis alle Stimmen oder Stimmanteil abgegeben sind
- Erzeugung druckbarer/klickbarer Liste mit Links zu den einzelnen Positionen für jeden Stimmberechtigten
- Offene Abstimmung (kein vorheriges Anlegen der Stimmberechtigten)
- externe Profilbilder für die Stimmberechtigten: https://github.com/eldimious/network-avatar-picker
- Ersatz-"einloggen". Namen des Abstimmenden wird einmalig festgelegt und in einem Cookie gespeichert. Alle Abstimmenden können dann den selben Link zum abstimmen nutzen.
- Admin-Feature: Besitzer einer Session kann nachträglich Parameter ändern
- Admin-Feature: Mit firebase-Authentication übersicht über alle Votings, alte löschen
- Umstellung von firebase REST-API auf npm-Bibliothek um direkte Updates bei Änderungen zu bekommen

### Serverseitig

- (!) starke Limitierung der zu speichernden Daten. (API-Key zum schreiben ist in der App und keine Benutzer-Authentifizierung geplant!!)
- starke Längenbeschränkung, es dürfen nur bestimmte Felder angelegt werden. (NoSQL-DB)
- (!) serverseitige Prüfung und Validierung der ankommenden Daten
- serverseitige Berechnung der Ergebnisse (keine Einzelergebnisse an Client schicken)
- automatisches Aufräumen der DB
- nur Abruf einzelner Votings möglich
- Rate Limit beim Anlegen von Sessions
