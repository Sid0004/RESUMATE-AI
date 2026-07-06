"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import ResumeVersion from "@/models/ResumeVersion";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    // MONGODB VERSION TRACKING:
    // This logs every change to the resume content in our MongoDB cluster
    // allowing for full historical rollbacks in the future.
    try {
      await connectToDatabase();
      await ResumeVersion.create({
        clerkUserId: userId,
        content: content
      });
    } catch (mongoError) {
      console.error("Non-fatal: Failed to save version history to MongoDB:", mongoError);
      // We don't throw here so the main Postgres save still succeeds
    }

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const improvedContent = response.text().trim();
    return improvedContent;
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}

export async function getResumeVersions() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    await connectToDatabase();
    
    // Fetch all versions for this user from MongoDB, newest first
    const versions = await ResumeVersion.find({ clerkUserId: userId })
      .sort({ savedAt: -1 })
      .lean();
      
    // Serialize MongoDB objects (convert ObjectId to string for Next.js Server Actions)
    return versions.map(v => ({
      _id: v._id.toString(),
      content: v.content,
      savedAt: v.savedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching version history from MongoDB:", error);
    return [];
  }
}