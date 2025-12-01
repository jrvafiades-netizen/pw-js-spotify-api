import { test, expect } from './auth.fixtures.js';
import { SpotifyClient } from './helpers/spotifyClient.js';

test.describe('Spotify API CRUD Test', () => {

  test('Create a playlist, add a track, then delete the playlist', async ({ token }) => {
    const spotify = new SpotifyClient(token);
    const userId = '1281728910'; // from Spotify profile
  
    // Create playlist
    const playlistResponse = await spotify.createPlaylist(userId, {
      name: 'my new playlist - ammy aths',
      public: false,
      description: 'A test playlist'
    });
    
    expect(playlistResponse.status).toBe(201);
    expect(playlistResponse.data.name).toBe('my new playlist - ammy aths');
    expect(playlistResponse.data.owner.id).toBe(userId)
    expect(playlistResponse.data.public).toBe(false)
    expect(playlistResponse.data.description).toBe('A test playlist') 

    const playlistId = playlistResponse.data.id;

    // Search for the track
    const trackSearch = await spotify.searchTracks('Angels With Dirty Faces Amateur Athletes');
    const track = trackSearch.data.tracks.items[0];
    const trackUri = track.uri;

    // Add track to playlist
    const addTrackResponse = await spotify.addSongToPlaylist(playlistId, trackUri);
    
    expect(addTrackResponse.status).toBe(201);
    expect(addTrackResponse.data.snapshot_id).toBeDefined();

    // Query playlist to confirm track is present
    const playlistTracks = await spotify.getPlaylistTracks(playlistId);
    
    expect(playlistTracks.status).toBe(200);
    expect(playlistTracks.data.items.length).toBeGreaterThan(0);
    
    const trackInPlaylist = playlistTracks.data.items.find(item => item.track.uri === trackUri);
    expect(trackInPlaylist).toBeDefined();
    expect(trackInPlaylist.track.name).toContain('Angels With Dirty Faces')
    expect(playlistTracks.data.total).toBe(1)
    expect(trackInPlaylist.track.artists[0].name).toContain('Amateur Athletes')
    expect(trackInPlaylist.added_at).toBeDefined()

      // Cleanup step - delete the playlist
    const deleteResponse = await spotify.deletePlaylist(playlistId);
    expect(deleteResponse.status).toBe(200);

});


});
