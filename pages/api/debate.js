import dbConnect from '../../lib/mongodb'
import Debate from '../../models/Debate'
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
                const debates = await Debate.find({ topic: topicId }).populate('createdBy', 'name')
                res.status(200).json({ success: true, data: debates })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const debate = await Debate.create({ ...req.body, createdBy: session.user.id })
                res.status(201).json({ success: true, data: debate })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try {
                const { debateId, argument } = req.body
                const debate = await Debate.findByIdAndUpdate(
                    debateId,
                    { $push: { arguments: { ...argument, createdBy: session.user.id } } },
                    { new: true }
                )
                res.status(200).json({ success: true, data: debate })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}