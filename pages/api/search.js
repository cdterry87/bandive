import { spotifyApi, getAccessToken } from './utils';

export default async (req, res) => {
    const { q } = req.query;

    if (!q) return res.status(400).json({ error: 'Could not search artists. Query parameter "q" is required.' });

    try {
        await getAccessToken();
        const data = await spotifyApi.searchArtists(q, {
            limit: 12
        });
        res.status(200).json(data.body);
    } catch (error) {
        console.error('Error searching for artists:', error);
        res.status(500).json({ error: 'Failed to search for artists' });
    }
};
