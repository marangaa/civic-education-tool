import dbConnect from '../../lib/mongodb'
import Discussion from '../../models/Discussion'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).json({ error: 'Unauthenticated' })
    }

    await dbConnect()

    switch (req.method) {
        case 'GET':
            try {
                const { topicId } = req.query
                const discussions = await Discussion.find({ topic: topicId }).populate('createdBy', 'name')
                res.status(200).json({ success: true, data: discussions })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const discussion = await Discussion.create({ ...req.body, createdBy: session.user.id })
                res.status(201).json({ success: true, data: discussion })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}