import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, required: true },
    image: String,
    deleted: { type: Boolean, default: false },
    reputation: { type: Number, default: 0 },
    badges: [String],
})


// Add a pre-save hook to hash the password
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Add a method to check the password
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;