import { getAccessToken } from './utils';

export default async (req, res) => {
    try {
        const token = await getAccessToken();
        res.status(200).json({ access_token: token });
    } catch (error) {
        console.error
    }
}