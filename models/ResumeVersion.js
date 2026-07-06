import mongoose from 'mongoose';

const ResumeVersionSchema = new mongoose.Schema({
  clerkUserId: {
    type: String,
    required: true,
    index: true,
  },
  content: {
    type: String,
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

export default mongoose.models.ResumeVersion || mongoose.model('ResumeVersion', ResumeVersionSchema);
