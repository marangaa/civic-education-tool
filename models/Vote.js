import mongoose from 'mongoose'

const VoteSchema = new mongoose.Schema({
    policy: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vote: { type: String, enum: ['for', 'against'] },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Vote || mongoose.model('Vote', VoteSchema)