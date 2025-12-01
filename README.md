# Playwright-javascript-API-and-UI-tests
1. API tests on the Spotify API using PlayWright with JavaScript 
    - login via OAuth using Client Credentials flow
    - verify basic API functions, incl searching for artists and tracks
    - CRUD test for playlists using Amateur Athletes song that I helped to record

2. Web UI tests on IBJJFRankings.com, a free competition Elo rating calculator for jiu jitsu athletes
    - loads page and verifies title
    - navigates to no-gi rankings tab
    - searches for athlete profile and verifies user data
    - verifies academy name and social media links
    - expands medals section and verifies recent competition medals

3. next project will be mobile testing

## Setup

### Environment Variables
Create a `.env` file in the project root with your Spotify API credentials:
```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

Get these credentials from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

### Running Tests
```bash
npx playwright test                    # Run all tests
npx playwright test spotify-basic      # Run Spotify API tests
npx playwright test ibjjfrankings      # Run IBJJF Rankings UI tests
npx playwright test --ui               # Open UI mode for interactive testing
```