import dbConnect from '../../lib/mongodb'
import Policy from '../../models/Policy'
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
                const policies = await Policy.find({}).populate('createdBy', 'name')
                res.status(200).json({ success: true, data: policies })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const policy = await Policy.create({ ...req.body, createdBy: session.user.id })
                res.status(201).json({ success: true, data: policy })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}