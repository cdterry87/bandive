import SpotifyWebApi from 'spotify-web-api-node';

export default async (req, res) => {
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    try {
        const data = await spotifyApi.clientCredentialsGrant();
        const accessToken = data.body['access_token'];
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error('Error getting access token:', error);
        res.status(500).json({ error: 'Failed to get access token' });
    }
};
