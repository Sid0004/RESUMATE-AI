import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { db } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(db), // Uncomment when switching to full DB sessions
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        
        if (credentials.email === "admin@example.com" && credentials.password === "password123") {
          return { id: "1", name: "Admin", email: "admin@example.com" }
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
})
