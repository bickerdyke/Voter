# Easy-Vote

Small web application for creating and running simple named voting sessions.

## Overview

Voter is a web application lets you create voting sessions that contain multiple items/positions. Voters submit a rating for each position; results and averages are shown on a results overview. Sessions can be prepared in advance and shared with voters via links (printed handouts with QR codes are supported).

## Live site

A free and public instance of Vote is provided by [Kurpfälzer Bierclub](https://www.kurpfaelzer-bierclub.de) at [https://vote.kurpfaelzer-bierclub.de](https://vote.kurpfaelzer-bierclub.de)

## Features

- Create voting session
- No sign-up or user account is required. Can be used anonymously.
- Invite people to sessions by url, text or QR codes. Links can be either to
  - specific item within a session or
  - to a list of all voting items
- Add image by url urls to polls, items and users
- Direct link to voting results can be opened on any device with a browser. Can be presented to a group on TV or Tablets, or link can be shared online.
- Voting results can be visible immediately or after minimum number of votes have been casted.
- Multiple voting modes available
  - Yes or No (Thumbs up / Thumbs down)
  - Scale or Points from 1 (bad) to 10 (good)
  - School Grades
    - US system: A (good) - F (fail)
    - European system: 1 (good) - 6 (fail)
- Available Languages
  - English
  - German

## Development

### Tech stack

- Vue 3 + Vuex + Vue Router
- vue-i18n for language support
- Vite build tool
- Firebase Realtime Database (client-side REST calls and token-based auth)
- Common UI libs: Bootstrap, FontAwesome

### Getting started (development)

#### Prerequisites

- Node.js with npm or compatible package manager
- Firebase account with active project (firebase emulator not yet supported out of the box)
  - activate Firebase Realtime Database in your firebase console
  - apply security rules from [databse.rules.json](databse.rules.json)
  - upload test and dev data from [database_seed.json](voter_app/src/store/modules/voting/database_seed.json) to database
- Download or checkout source code

#### Configuration

1. Copy and rename voter_app/env.local.example to env.local
1. Open and edit to include your firebase project ID
1. base32-encode your firebase API-Key and add it to env.local

env.local is excluded from source control in .gitignore. Don't upload it anywhere.

If you want to use the firebase local emulator, you would need to edit [config/firebase.js](voter_app/src/config/firebase.js) to provide local URLs

The app expects a Firebase project id and an API key to access Authentication and the Realtime DB. These are passed as Vite env variables:

- `VITE_FIREBASE_PROJECTID` - your Firebase project id
- `VITE_FIREBASE_APIKEY` - API key (the app expects a base32-encoded string; see `src/config/firebase.js`)
- `VITE_HOMEPAGE_URL` - provides the canonical url for the open graph links
- `VITE_SOFTWARE_VERSION` - displayed on the imprint page. Override in your production build process.

Set them in a `.env.local` file inside `voter_app` or export them in your environment before running Vite. See `voter_app/src/config/firebase.js` for how these are used: [voter_app/src/config/firebase.js](voter_app/src/config/firebase.js#L1-L20).

#### Install and run

1. Open a shell and change to the app folder:

   ```bash
   cd voter_app
   npm install
   npm run dev
   ```

2. Build for production:

   ```bash
   npm ci
   npm run lint
   npm run build
   npm run serve   # preview built site
   ```

#### Deployment

I'm using github actions to deploy the static files of the web app to firebase static file hosting. The provided action will take the configuration from github variables and secrets. Firebase hosting is recommended as you will need a firebase realtime database.

## License

This project is licensed under the GNU General Public License version 3.

Contact / more info

- Project website: https://vote.kurpfaelzer-bierclub.de
- For implementation details, check the source under `voter_app/src`.

## Ideas for features

(this is more of a wishlist than a roadmap)

- Proper backend for increased security
- Prune database from old polls
- CSV-Download for results
- Open voting (not restricted to existing users)
- pick profile pictures from other sources or social networks profiles. [probably this library](https://github.com/eldimious/network-avatar-picker)
- Voter sign-in to select voter ID. personalized links would be no longer needed
- Admins can change parameters after creation (add/remove items or users)
- User login (restrct voting, permanent link to created sessions)
- Switch firebase from REST-API to npm to receive push updates
- calculate results on server (client would no longer need access to voter records)
- Rate limit for creating sessions

### not planned

- Image upload. (I'm not offering that without reliable user login and a lawyer)
