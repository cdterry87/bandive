import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

let tokenExpirationTime;

const getAccessToken = async () => {
    if (Date.now() < tokenExpirationTime) {
        return spotifyApi.getAccessToken();
    }

    const data = await spotifyApi.clientCredentialsGrant();
    const { access_token, expires_in } = data.body;
    spotifyApi.setAccessToken(access_token);
    tokenExpirationTime = Date.now() + expires_in * 1000 - 60000; // Refresh token 1 minute before expiry
    return access_token;
};

export { spotifyApi, getAccessToken };
