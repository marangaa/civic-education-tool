import dbConnect from '../../lib/mongodb';
import Topic from '../../models/Topic.js';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    await dbConnect();

    // Fetch session
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ error: 'Unauthenticated' });
    }

    switch (req.method) {
        case 'GET':
            try {
                const topics = await Topic.find({});
                res.status(200).json({ success: true, data: topics });
            } catch (error) {
                res.status(400).json({ success: false, message: 'Failed to fetch topics' });
            }
            break;
        case 'POST':
            try {
                const topic = await Topic.create({ ...req.body, createdBy: session.user.id });
                res.status(201).json({ success: true, data: topic });
            } catch (error) {
                res.status(400).json({ success: false, message: 'Failed to add topic' });
            }
            break;
        default:
            res.status(405).json({ success: false, message: 'Method not allowed' });
            break;
    }
}