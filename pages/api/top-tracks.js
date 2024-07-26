import { spotifyApi, getAccessToken } from './utils';

export default async (req, res) => {
    const { id } = req.query;

    if (!id) return res.status(400).json({ error: 'Could not get top tracks. Failed to get id of selected artist.' });

    try {
        await getAccessToken();
        const data = await spotifyApi.getArtistTopTracks(id, 'US');
        res.status(200).json(data.body);
    } catch (error) {
        console.error('Error fetching top tracks:', error);
        res.status(500).json({ error: 'Error fetching top tracks' });
    }
};
