import mongoose from 'mongoose'

const DiscussionSchema = new mongoose.Schema({
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    title: String,
    content: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    comments: [{
        content: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
    }],
})

export default mongoose.models.Discussion || mongoose.model('Discussion', DiscussionSchema)