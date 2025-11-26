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
}
