import mongoose from 'mongoose'

const TopicSchema = new mongoose.Schema({
    title: String,
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema)