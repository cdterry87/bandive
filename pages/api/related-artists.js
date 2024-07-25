import SpotifyWebApi from 'spotify-web-api-node';

export default async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Failed to get id of selected artist.' });
    }

    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    });

    try {
        const tokenData = await spotifyApi.clientCredentialsGrant();
        const accessToken = tokenData.body['access_token'];
        spotifyApi.setAccessToken(accessToken);

        const data = await spotifyApi.getArtistRelatedArtists(id);

        res.status(200).json(data.body);
    } catch (error) {
        console.error('Error fetching related artists:', error);
        res.status(500).json({ error: 'Error fetching related artists' });
    }
};
