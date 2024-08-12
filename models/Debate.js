import mongoose from 'mongoose'

const DebateSchema = new mongoose.Schema({
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    title: String,
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    arguments: [{
        side: { type: String, enum: ['for', 'against'] },
        content: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
    }],
})

export default mongoose.models.Debate || mongoose.model('Debate', DebateSchema)