import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  industry: {
    type: String,
  },
  bio: {
    type: String,
  },
  experience: {
    type: Number,
  },
  skills: [{
    type: String,
  }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
