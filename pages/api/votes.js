import dbConnect from '../../lib/mongodb'
import Vote from '../../models/Vote'
import Policy from '../../models/Policy'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).json({ error: 'Unauthenticated' })
    }

    await dbConnect()

    switch (req.method) {
        case 'POST':
            try {
                const { policyId, vote } = req.body
                const existingVote = await Vote.findOne({ policy: policyId, user: session.user.id })

                if (existingVote) {
                    return res.status(400).json({ success: false, message: 'You have already voted on this policy' })
                }

                const newVote = await Vote.create({ policy: policyId, user: session.user.id, vote })

                // Update policy votes count
                const voteIncrement = vote === 'for' ? 1 : -1
                await Policy.findByIdAndUpdate(policyId, { $inc: { votes: voteIncrement } })

                res.status(201).json({ success: true, data: newVote })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}