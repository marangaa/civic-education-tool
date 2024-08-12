import dbConnect from '../../lib/mongodb'
import User from '../../models/User'
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
                const user = await User.findById(session.user.id)
                res.status(200).json({ success: true, data: user })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try {
                const updatedUser = await User.findByIdAndUpdate(session.user.id, req.body, { new: true })
                res.status(200).json({ success: true, data: updatedUser })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}