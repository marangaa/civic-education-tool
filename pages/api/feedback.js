import dbConnect from '../../lib/mongodb'
import Feedback from '../../models/Feedback'
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
                const feedback = await Feedback.find({ topicId })
                res.status(200).json({ success: true, data: feedback })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const feedback = await Feedback.create({ ...req.body, createdBy: session.user.id })
                res.status(201).json({ success: true, data: feedback })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try {
                const { id, vote } = req.body
                const feedback = await Feedback.findByIdAndUpdate(id, { $inc: { votes: vote } }, { new: true })
                res.status(200).json({ success: true, data: feedback })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}