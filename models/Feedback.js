import mongoose from 'mongoose'

const FeedbackSchema = new mongoose.Schema({
    content: String,
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    votes: { type: Number, default: 0 },
})

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema)