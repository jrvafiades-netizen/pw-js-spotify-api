import axios from 'axios';

export class SpotifyClient {
  constructor(token) {
    this.token = token;
  }

  async searchArtists(query) {
    return axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${this.token}` },
      params: { q: query, type: 'artist', limit: 5 }
    });
  }

  async getArtist(id) {
    return axios.get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }

  async getTrack(id) {
    return axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }

  async createPlaylist(userId, playlistData) {
    return axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, playlistData, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }

  async addSongToPlaylist(playlistId, trackUri) {
    return axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 
      { uris: [trackUri] },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
  }

  async deletePlaylist(playlistId) {
    return axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }
}
