# News Verification Web App

A full-stack web application that fetches news headlines from multiple sources (BBC News and NBC New York) and verifies their credibility using Wikipedia data.

## Tech Stack

- **Frontend**: Angular 17+ with standalone components
- **Backend**: Node.js using only the `http` module (no Express)
- **Libraries**: rss-parser, node-fetch

## Features

- Fetches latest news headlines from multiple sources:
  - **BBC News** - International news
  - **NBC New York** - Local New York news
- Source selector to switch between news sources
- Displays news items with title, description, and publication date
- Verifies news credibility using Wikipedia API
- Calculates credibility score (0-100) based on Wikipedia data
- Displays verification results with Wikipedia extract and link

## Project Structure

```
cursor_news_verification_app/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── utils/
│       ├── news.js
│       ├── wiki.js
│       └── credibility.js
├── src/
│   ├── app/
│   │   ├── news/
│   │   │   ├── news.component.ts
│   │   │   ├── news.component.html
│   │   │   └── news.component.css
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │   └── news.service.ts
│   ├── main.ts
│   ├── index.html
│   └── styles.css
├── package.json
├── angular.json
└── tsconfig.json
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

The backend server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the project root:
```bash
cd /Users/foramupadhyay/Desktop/Final_projects/cursor_news_verification_app
```

2. Install dependencies:
```bash
npm install
```

3. Start the Angular development server:
```bash
ng serve
```

The frontend will be available at `http://localhost:4200`

## API Endpoints

### GET /news?source=<source>
Fetches the latest 5 news items from the specified RSS feed.

**Parameters:**
- `source` (optional): News source to fetch from. Options: `bbc` (default) or `nbc`

**Response:**
```json
[
  {
    "title": "News Title",
    "link": "https://...",
    "description": "News description",
    "pubDate": "Date string"
  }
]
```

### GET /verify?title=<ENCODED_TITLE>
Verifies a news headline using Wikipedia API.

**Response:**
```json
{
  "title": "News Title",
  "credibility": 80,
  "wiki": {
    "extract": "Wikipedia extract text",
    "description": "Wikipedia description",
    "content_urls": {
      "desktop": {
        "page": "https://en.wikipedia.org/wiki/..."
      }
    }
  }
}
```

## Credibility Score Calculation

The credibility score is calculated as follows:
- Base score: 40
- +20 if Wikipedia extract contains the first word of the title
- +20 if Wikipedia description exists
- Maximum score: 100

## Running the Application

1. **Start the backend server first:**
   ```bash
   cd backend
   npm install
   node server.js
   ```

2. **In a new terminal, start the frontend:**
   ```bash
   npm install
   ng serve
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:4200
   ```

## Notes

- Make sure both servers are running simultaneously
- The backend must be running on port 3000
- CORS is enabled on the backend to allow frontend requests
- The app fetches the latest 5 news items from the selected RSS feed (BBC or NBC New York)
- Use the source selector dropdown to switch between news sources
- Each news item can be verified individually by clicking the "Verify" button
- Verification results are cleared when switching news sources

