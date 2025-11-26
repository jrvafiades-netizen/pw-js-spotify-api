import { test, expect } from './auth.fixtures.js';
import { SpotifyClient } from './helpers/spotifyClient.js';

test.describe('Spotify Basic API Tests', () => {

  test('Search for an artist', async ({ token }) => {
    const spotify = new SpotifyClient(token);
    const response = await spotify.searchArtists('Rancid');

    expect(response.status).toBe(200);
    expect(response.data.artists.items.length).toBeGreaterThan(0);

    const firstArtist = response.data.artists.items[0];
    expect(firstArtist.name.toLowerCase()).toContain('rancid');
  });

  test('Get an artist by ID', async ({ token }) => {
    const spotify = new SpotifyClient(token);
    const rancidId = '6H1RjVyNruCmrBEWRbD0VZ'; // Rancid's ID

    const response = await spotify.getArtist(rancidId);

    expect(response.status).toBe(200);
    expect(response.data.id).toBe(rancidId);
    expect(Array.isArray(response.data.genres)).toBe(true);
  });

  test('Get a track by ID', async ({ token }) => {
    const spotify = new SpotifyClient(token);
    const trackId = '7lEptt4wbM0yJTvSG5EBof'; // "Time Bomb"

    const response = await spotify.getTrack(trackId);

    expect(response.status).toBe(200);
    expect(response.data.name).toBe('Time Bomb');
  });

});
