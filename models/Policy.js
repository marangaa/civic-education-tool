import mongoose from 'mongoose'

const PolicySchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['draft', 'published', 'voting', 'passed', 'rejected'], default: 'draft' },
    votes: { type: Number, default: 0 },
})

export default mongoose.models.Policy || mongoose.model('Policy', PolicySchema)