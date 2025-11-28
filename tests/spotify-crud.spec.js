import { test, expect } from './auth.fixtures.js';
import { SpotifyClient } from './helpers/spotifyClient.js';

test.describe('Spotify API CRUD Test', () => {

  test('Create a playlist', async ({ token }) => {
  const spotify = new SpotifyClient(token);
  const userId = '1281728910'; // from Spotify profile
  
  const response = await spotify.createPlaylist(userId, {
    name: 'my new playlist',
    public: false,
    description: 'A test playlist'
  });

  expect(response.status).toBe(201);
  expect(response.data.name).toBe('my new playlist');
  expect(response.data.id).toBeDefined();
});



});
