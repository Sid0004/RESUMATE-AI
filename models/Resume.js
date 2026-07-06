import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  atsScore: {
    type: Number,
  },
  feedback: {
    type: String,
  },
  // Supporting version tracking as mentioned on the resume
  versions: [{
    content: String,
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
