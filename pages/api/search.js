import SpotifyWebApi from 'spotify-web-api-node';

export default async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    try {
        const tokenData = await spotifyApi.clientCredentialsGrant();
        const accessToken = tokenData.body['access_token'];

        spotifyApi.setAccessToken(accessToken);
        const searchData = await spotifyApi.searchArtists(q, {
            limit: 12
        });
        res.status(200).json(searchData.body);
    } catch (error) {
        console.error('Error searching for artists:', error);
        res.status(500).json({ error: 'Failed to search for artists' });
    }
};
