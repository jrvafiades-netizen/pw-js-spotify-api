import { test, expect } from './auth.fixtures.js';
import { SpotifyClient } from './helpers/spotifyClient.js';

test.describe('Spotify API Test Edge Cases', () => {

  test('Create a playlist, add the same track twice, then delete the playlist', async ({ token }) => {
    const spotify = new SpotifyClient(token);
    const userId = '1281728910'; // from Spotify profile
  
    // Create playlist
    const playlistResponse = await spotify.createPlaylist(userId, {
      name: 'Playlist with the same song twice',
      public: false,
      description: 'A test playlist with A World of Difference on it twice'
    });
    
    expect(playlistResponse.status).toBe(201);
    expect(playlistResponse.data.name).toBe('Playlist with the same song twice');
    expect(playlistResponse.data.owner.id).toBe(userId)
    expect(playlistResponse.data.public).toBe(false)
    expect(playlistResponse.data.description).toBe('A test playlist with A World of Difference on it twice') 

    const playlistId = playlistResponse.data.id;

    // Search for the track
    const trackSearch = await spotify.searchTracks('A World of Difference Amateur Athletes');
    const track = trackSearch.data.tracks.items[0];
    const trackUri = track.uri;

    // Add track to playlist
    const addTrackResponse = await spotify.addSongToPlaylist(playlistId, trackUri);
    
    expect(addTrackResponse.status).toBe(201);
    expect(addTrackResponse.data.snapshot_id).toBeDefined();

    // Add the same track tothe  playlist again
    const addDuplicateTrackResponse = await spotify.addSongToPlaylist(playlistId, trackUri);
    
    expect(addDuplicateTrackResponse.status).toBe(201);
    expect(addDuplicateTrackResponse.data.snapshot_id).toBeDefined();

    // Query playlist to confirm track is present
    const playlistTracks = await spotify.getPlaylistTracks(playlistId);
    
    expect(playlistTracks.status).toBe(200);
    expect(playlistTracks.data.items.length).toBeGreaterThan(0);
    
    const trackInPlaylist = playlistTracks.data.items.find(item => item.track.uri === trackUri);
    expect(trackInPlaylist).toBeDefined();
    expect(trackInPlaylist.track.name).toContain('A World of Difference')
    expect(playlistTracks.data.total).toBe(2)
    expect(trackInPlaylist.track.artists[0].name).toContain('Amateur Athletes')
    expect(trackInPlaylist.added_at).toBeDefined()

    // Cleanup step - delete the playlist
    const deleteResponse = await spotify.deletePlaylist(playlistId);
    expect(deleteResponse.status).toBe(200);

});

  test('Test a search that returns nothing', async ({ token }) => {
    const spotify = new SpotifyClient(token);
    const userId = '1281728910'; // from Spotify profile
  
    const trackSearch = await spotify.searchTracks(' ');
    expect(trackSearch.status).toBe(400);
    expect(trackSearch.data.tracks).toBeUndefined();
});

  
  test('Attempt to delete a playlist that does not exist', async ({ token }) => {
    const spotify = new SpotifyClient(token);
    const userId = '1281728910'; // from Spotify profile
    const playlistId = 'nonexistentplaylistid12345';
    const deleteResponse = await spotify.deletePlaylist(playlistId);
    expect(deleteResponse.status).toBe(400);

});

});
